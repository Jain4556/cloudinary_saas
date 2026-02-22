import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function GET(request: NextRequest) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching videos" },
            { status: 500 }
        )
    }
}