import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { section: params.section },
    });

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: content.content });
  } catch (error) {
    console.error('Error fetching content section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content section' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { section: string } }
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

    const content = await prisma.siteContent.upsert({
      where: { section: params.section },
      update: { content: body },
      create: { section: params.section, content: body },
    });

    return NextResponse.json({ success: true, data: content.content });
  } catch (error) {
    console.error('Error updating content section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content section' },
      { status: 500 }
    );
  }
}
