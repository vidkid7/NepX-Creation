import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
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

    const response = NextResponse.json({ success: true, data: content.content });
    
    // Disable caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching content section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content section' },
      { status: 500 }
    );
  }
}
