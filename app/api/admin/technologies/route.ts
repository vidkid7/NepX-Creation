import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const technologySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().default('🔧'),
  expertise: z.number().int().min(0).max(100).default(80),
  color: z.string().min(1, 'Color is required'),
  active: z.boolean().default(true),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: technologies });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = technologySchema.parse(body);

    const maxOrder = await prisma.technology.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const technology = await prisma.technology.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder?.order ?? 0) + 1,
      },
    });

    return NextResponse.json({ success: true, data: technology }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create technology' },
      { status: 500 }
    );
  }
}
