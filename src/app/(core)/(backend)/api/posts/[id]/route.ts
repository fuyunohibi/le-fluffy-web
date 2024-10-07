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

export async function PATCH(req: Request, context: { params: { id: string } }) {
    try {
        const postId = +context.params.id;
        const {
            name, species, breed, sex, description, reward, photo, status, age, location, contact
        } = await req.json();

        // Check if the post exists before attempting to update
        const post = await db.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Build the data object dynamically to exclude undefined values
        const dataToUpdate: any = {
            ...(name && { name }),
            ...(species && { species }),
            ...(breed && { breed }),
            ...(sex && { sex }),
            ...(description && { description }),
            ...(reward !== undefined && { reward }), // Handle undefined explicitly
            ...(photo && { photo }),
            ...(status && { status }),
            ...(age !== undefined && { age }), // Handle undefined explicitly
            ...(contact && { contact }), // Contact info
        };

        // Handle location update separately
        if (location === null) {
            // If location is null, remove the relation
            dataToUpdate.location = {
                delete: true,
            };
        } else if (location && location.latitude !== undefined && location.longitude !== undefined) {
            // If location is provided, update the location details
            dataToUpdate.location = {
                upsert: {
                    create: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                    update: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                },
            };
        }

        // Update the post with new data
        const updatedPost = await db.post.update({
            where: { id: postId },
            data: dataToUpdate
        });

        return NextResponse.json(
            { message: `Post for ${updatedPost.name} updated successfully`, post: updatedPost },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
