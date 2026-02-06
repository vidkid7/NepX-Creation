import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Valid image URL is required'),
  category: z.string().min(1, 'Category is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  link: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
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
    const validatedData = projectSchema.parse(body);

    // Get the highest order number and add 1
    const maxOrder = await prisma.project.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder?.order ?? 0) + 1,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
