import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const courses = await prisma.course.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const course = await prisma.course.create({
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
        icon: body.icon || 'BookOpen',
        gradient: body.gradient || 'from-blue-500 to-cyan-500',
        curriculum: body.curriculum || [],
        tools: body.tools || [],
        features: body.features || [],
        popular: body.popular || false,
        order: body.order || 0,
        active: body.active !== undefined ? body.active : true,
      },
    });

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
