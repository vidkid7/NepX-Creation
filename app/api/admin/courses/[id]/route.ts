import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
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

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        title: body.title,
        shortDescription: body.shortDescription,
        category: body.category,
        level: body.level,
        duration: body.duration,
        projects: body.projects,
        mode: body.mode,
        priceOnline: body.priceOnline,
        priceOffline: body.priceOffline,
        icon: body.icon,
        gradient: body.gradient,
        curriculum: body.curriculum,
        tools: body.tools,
        features: body.features,
        popular: body.popular,
        order: body.order,
        active: body.active,
      },
    });

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
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

    await prisma.course.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
