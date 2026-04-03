import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { verifyToken } from "@/lib/auth";

// CREATE NOTE
export async function POST(req) {
    await connectDB();
    const user = verifyToken(req);

    const { title, content } = await req.json();

    const note = await Note.create({
        title,
        content,
        userId: user.id
    });

    return Response.json(note);
}

// GET NOTES
export async function GET(req) {
    await connectDB();
    const user = verifyToken(req);

    const notes = await Note.find({ userId: user.id });

    return Response.json(notes);
}