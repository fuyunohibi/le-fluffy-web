import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: { id: string } }) {
    try {
        console.log(context, "context")
        const postId = +context.params.id
        console.log(postId, "postId")
        const post = await db.post.findFirst({
            where: { id: postId }
        })

        if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 })
        return NextResponse.json({ post }, { status: 200 });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
    try {
        const postId = +context.params.id;

        // Check if the post exists before attempting to delete
        const post = await db.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Delete the post
        await db.post.delete({
            where: { id: postId }
        });

        return NextResponse.json(
            { message: `Post for ${post.name} deleted successfully` },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
