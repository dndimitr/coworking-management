// Mock PrismaClient for build time
const mockPrisma = {
  user: {
    findUnique: () => null,
  },
  booking: {
    findMany: () => [],
    count: () => 0,
    create: () => ({}),
  },
  space: {
    findMany: () => [],
  },
  device: {
    findMany: () => [],
  },
}

export const prisma = mockPrisma as any