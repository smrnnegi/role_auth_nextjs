import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // 1. Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json({ error: "Invalid password" }, { status: 400 });
        }

        // 3. Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return Response.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}