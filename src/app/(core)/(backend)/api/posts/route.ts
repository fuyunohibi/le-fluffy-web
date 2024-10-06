import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            name, species, breed, sex, description, reward, photo, userId
        } = await req.json();

        const newPost = await db.post.create({
            data: { name, species, breed, sex, description, reward, photo, userId }
        });

        return NextResponse.json(
            { message: `Post for ${newPost.name} created successfully` },
            { status: 201 }
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}