import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
	try {
		const { email, username, password } = await req.json();

		const existingUserByEmail = await db.user.findUnique({
			where: { email: email },
		});
		if (existingUserByEmail) {
			return NextResponse.json({ user: null, error: "Email already exists" }, { status: 409 });
		}

		const existingUserByUsername = await db.user.findUnique({
				where: { username: username },
		});
		if (existingUserByUsername) {
			return NextResponse.json({ user: null, error: "Username already exists" }, { status: 409 });
		}

		const hashedPassword = await hash(password, 10);

		const newUser = await db.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
        message: "User created successfully",
      },
      { status: 201 }
    );
	} catch {
		return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
	}
}