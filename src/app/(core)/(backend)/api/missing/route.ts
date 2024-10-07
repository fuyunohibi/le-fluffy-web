import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const missingPets = await db.post.findMany({
      where: { status: 'MISSING' }
    });

    return NextResponse.json({ pets: missingPets }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
