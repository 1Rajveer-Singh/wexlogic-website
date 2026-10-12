import { prisma } from '@/lib/prisma'
import { CafeManagerClient } from './CafeManagerClient'

export const dynamic = 'force-dynamic'

export default async function CafeManagerPage() {
  let cafes: any[] = []
  try {
    cafes = await prisma.cafe.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.warn('Database unavailable during render, using empty fallback:', error)
  }

  return <CafeManagerClient initialCafes={cafes} />
}

