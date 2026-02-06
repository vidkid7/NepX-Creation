import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const technologySchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: technology });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update technology' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await prisma.technology.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Technology deleted' });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete technology' },
      { status: 500 }
    );
  }
}
