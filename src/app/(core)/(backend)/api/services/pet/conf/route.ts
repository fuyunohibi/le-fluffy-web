import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { postId, isFound } = await req.json();

    if (typeof postId !== 'string' || typeof isFound !== 'boolean') {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }


    // Find the post and check if the authenticated user is the owner
    const post = await db.post.findUnique({
      where: { id: parseInt(postId) },
      select: { userId: true }
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }


    // Update the post status
    const updatedPost = await db.post.update({
      where: { id: parseInt(postId) },
      data: {
        status: isFound ? 'FOUND' : 'MISSING'
      }
    });

    return NextResponse.json(
      { message: `Post status updated to ${updatedPost.status}` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}