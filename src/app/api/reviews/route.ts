import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({})
      .sort({ createdAt: -1 }) // newest first
      .lean();                 // plain JS objects — faster, smaller

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('[GET /api/reviews]', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, name, org, role, rating, feedback, avatar } = body;

    // Auth check
    if (!password || password !== process.env.REV_PASS) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    // Basic presence check (schema handles the rest)
    if (!name || !role || !feedback) {
      return NextResponse.json({ error: 'Missing required fields: name, role, feedback' }, { status: 400 });
    }

    await connectDB();

    const review = await Review.create({
      name: name.trim(),
      org: org?.trim() ?? '',
      role: role.trim(),
      rating: Number(rating) || 5,
      feedback: feedback.trim(),
      avatar: avatar ?? '😊',
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: unknown) {
    console.error('[POST /api/reviews]', error);

    // Mongoose validation errors → 400
    if (
      error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      (error as { name: string }).name === 'ValidationError'
    ) {
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
