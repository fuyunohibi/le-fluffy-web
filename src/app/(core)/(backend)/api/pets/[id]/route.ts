import { db } from "@/lib/db";  
import { getServerSession } from "next-auth";  
import { authOptions } from "@/lib/auth";  
import { NextResponse } from "next/server";


export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(context.params.id);

    const authenticatedUserId = parseInt(session.user.id);
    if (authenticatedUserId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    
    const pets = await db.post.findMany({
      where: { userId: authenticatedUserId },  
      include: {
        location: true,  
      },
    });
    
    if (!pets.length) {
      return NextResponse.json({ message: "No pets found" }, { status: 404 });
    }
    
    return NextResponse.json({ pets }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
