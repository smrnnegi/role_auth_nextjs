import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { requireRole } from "@/lib/role";
import bcrypt from "bcrypt";

// CREATE ADMIN
export async function POST(req) {
    try {
        await connectDB();
        const user = verifyToken(req);

        requireRole(user, ["super_admin"]);

        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        return Response.json(admin);

    } catch (err) {
        return Response.json({ error: err.message }, { status: 403 });
    }
}

// GET ADMINS
export async function GET(req) {
    try {
        await connectDB();
        const user = verifyToken(req);

        requireRole(user, ["super_admin"]);

        const admins = await User.find({ role: "admin" });

        return Response.json(admins);

    } catch (err) {
        return Response.json({ error: err.message }, { status: 403 });
    }
}