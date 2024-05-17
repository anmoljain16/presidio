import { connect } from '@/dbConnection/connect';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { email, firstName, lastName, password, phoneNumber, userType } = await request.json();

        await connect(); // Connect to the database

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user
        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            phoneNumber,
            userType
        });

        return new Response(JSON.stringify({ newUser }), {
            status: 201,
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
