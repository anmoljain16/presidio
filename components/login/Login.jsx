'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
            await loginUser(formData);

            // You can add your logic to handle successful login here

        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const loginUser = async (userData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (data.error) {
                setErrors({ general: data.error });
            } else {
                router.push('/');
            }

            // console.log('Response from API:', data);
            // You can add additional logic here to handle the response from the API
        } catch (error) {
            console.error('Error logging in:', error);
            setErrors({ general: 'An error occurred during login. Please try again.' });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {errors.general && (
                        <div className="mb-4">
                            <p className="text-red-500 text-sm">{errors.general}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
