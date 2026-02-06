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

    const [
      totalUsers,
      activeProjects,
      activeServices,
      unreadMessages,
      totalTestimonials,
      totalTechnologies,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.project.count({ where: { active: true } }),
      prisma.service.count({ where: { active: true } }),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.testimonial.count({ where: { active: true } }),
      prisma.technology.count({ where: { active: true } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        activeProjects,
        activeServices,
        unreadMessages,
        totalTestimonials,
        totalTechnologies,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
