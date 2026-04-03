import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { requireRole } from "@/lib/role";
import bcrypt from "bcrypt";

// CREATE USER
export async function POST(req) {
    try {
        await connectDB();
        const admin = verifyToken(req);

        requireRole(admin, ["admin"]);

        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
            createdBy: admin.id
        });

        return Response.json(user);

    } catch (err) {
        return Response.json({ error: err.message }, { status: 403 });
    }
}

// GET USERS (only own)
export async function GET(req) {
    try {
        await connectDB();
        const admin = verifyToken(req);

        requireRole(admin, ["admin"]);

        const users = await User.find({ createdBy: admin.id });

        return Response.json(users);

    } catch (err) {
        return Response.json({ error: err.message }, { status: 403 });
    }
}