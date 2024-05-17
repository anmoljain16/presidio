import { connect } from '@/dbConnection/connect';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connect(); // Connect to the database

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return new Response(JSON.stringify({ token, user }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.error('Error:', e);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
