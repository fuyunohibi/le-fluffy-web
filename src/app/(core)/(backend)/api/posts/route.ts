import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const { name, species, sex, description, reward, photo, status, age } =
      await req.json();

    // Create the post without the location field
    const newPost = await db.post.create({
      data: {
        name,
        species,
        sex,
        description,
        reward,
        photo,
        status: status ?? 'MISSING',
        age,
        userId,
      },
    });

    return NextResponse.json(
      { message: `Post for ${newPost.name} created successfully` },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
