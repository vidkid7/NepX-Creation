import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.siteContent.findMany();
    
    // Transform to object format for easier access
    const contentObj = content.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({ success: true, data: contentObj });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
