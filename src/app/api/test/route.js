import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
    await connectDB();

    try {
        const user = verifyToken(req);

        return Response.json({
            message: "Protected route working",
            user
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 401 });
    }
}