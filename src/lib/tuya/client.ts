import crypto from 'crypto'

interface TuyaToken {
  access_token: string
  expire_time: number
  refresh_token: string
  uid: string
}

interface TuyaDevice {
  id: string
  name: string
  category: string
  status: Array<{
    code: string
    value: unknown
  }>
}

interface TuyaResponse<T> {
  success: boolean
  result?: T
  code?: number
  msg?: string
}

class TuyaClient {
  private baseUrl: string
  private clientId: string
  private clientSecret: string
  private token: TuyaToken | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.baseUrl = process.env.TUYA_BASE_URL || 'https://openapi.tuyaeu.com'
    this.clientId = process.env.TUYA_CLIENT_ID || ''
    this.clientSecret = process.env.TUYA_CLIENT_SECRET || ''

    if (!this.clientId || !this.clientSecret) {
      console.warn('Tuya credentials not configured')
    }
  }

  private generateSign(
    method: string,
    path: string,
    timestamp: string,
    accessToken: string = '',
    body: string = ''
  ): string {
    const str = this.clientId + accessToken + timestamp + method + '\n' + body + '\n' + path
    return crypto
      .createHmac('sha256', this.clientSecret)
      .update(str)
      .digest('hex')
      .toUpperCase()
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now()

    // Return cached token if still valid
    if (this.token && now < this.tokenExpiry - 60000) {
      return this.token.access_token
    }

    const timestamp = Date.now().toString()
    const path = '/v1.0/token?grant_type=1'
    const sign = this.generateSign('GET', path, timestamp)

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'client_id': this.clientId,
        'sign': sign,
        't': timestamp,
        'sign_method': 'HMAC-SHA256',
      },
    })

    const data: TuyaResponse<{ access_token: string; expire_time: number; refresh_token: string; uid: string }> =
      await response.json()

    if (!data.success || !data.result) {
      throw new Error(`Failed to get Tuya token: ${data.msg}`)
    }

    this.token = data.result
    this.tokenExpiry = now + data.result.expire_time * 1000

    return data.result.access_token
  }

  private async request<T>(
    method: string,
    path: string,
    body?: object
  ): Promise<TuyaResponse<T>> {
    const accessToken = await this.getAccessToken()
    const timestamp = Date.now().toString()
    const bodyStr = body ? JSON.stringify(body) : ''
    const sign = this.generateSign(method, path, timestamp, accessToken, bodyStr)

    const headers: Record<string, string> = {
      'client_id': this.clientId,
      'access_token': accessToken,
      'sign': sign,
      't': timestamp,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json',
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: bodyStr || undefined,
    })

    return await response.json()
  }

  // Device management
  async getDevices(): Promise<TuyaResponse<{ devices: TuyaDevice[]; total: number }>> {
    return this.request('GET', '/v1.0/devices')
  }

  async getDeviceStatus(deviceId: string): Promise<TuyaResponse<{ status: Array<{ code: string; value: unknown }> }>> {
    return this.request('GET', `/v1.0/devices/${deviceId}/status`)
  }

  async getDeviceInfo(deviceId: string): Promise<TuyaResponse<TuyaDevice>> {
    return this.request('GET', `/v1.0/devices/${deviceId}`)
  }

  async controlDevice(
    deviceId: string,
    commands: Array<{ code: string; value: unknown }>
  ): Promise<TuyaResponse<unknown>> {
    return this.request('POST', `/v1.0/devices/${deviceId}/commands`, {
      commands,
    })
  }

  // Common device operations
  async turnOn(deviceId: string): Promise<boolean> {
    const response = await this.controlDevice(deviceId, [{ code: 'switch_led', value: true }])
    return response.success
  }

  async turnOff(deviceId: string): Promise<boolean> {
    const response = await this.controlDevice(deviceId, [{ code: 'switch_led', value: false }])
    return response.success
  }

  async setBrightness(deviceId: string, brightness: number): Promise<boolean> {
    // Brightness is typically 0-1000 in Tuya
    const value = Math.max(0, Math.min(1000, brightness * 10))
    const response = await this.controlDevice(deviceId, [{ code: 'bright_value', value }])
    return response.success
  }

  async setColor(deviceId: string, h: number, s: number, v: number): Promise<boolean> {
    const response = await this.controlDevice(deviceId, [
      { code: 'colour_data', value: { h, s, v } },
    ])
    return response.success
  }

  async setTemperature(deviceId: string, temperature: number): Promise<boolean> {
    // Temperature in Celsius
    const response = await this.controlDevice(deviceId, [
      { code: 'temp_set', value: temperature },
    ])
    return response.success
  }

  async setACMode(deviceId: string, mode: 'cold' | 'hot' | 'wet' | 'wind' | 'auto'): Promise<boolean> {
    const modeMap = {
      cold: '0',
      hot: '1',
      wet: '2',
      wind: '3',
      auto: '4',
    }
    const response = await this.controlDevice(deviceId, [
      { code: 'mode', value: modeMap[mode] },
    ])
    return response.success
  }

  async unlockDoor(deviceId: string): Promise<boolean> {
    const response = await this.controlDevice(deviceId, [
      { code: 'unlock', value: true },
    ])
    return response.success
  }
}

// Export singleton instance
export const tuyaClient = new TuyaClient()

// Export types
export type { TuyaDevice, TuyaResponse }