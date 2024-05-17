'use client'

import React, { useState } from 'react';
import {useRouter} from "next/navigation";

const RegistrationForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        userType: '',
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
            await registerUser(formData);

            // You can add your logic to register the user here

        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits long';
        }

        if (!formData.userType.trim()) {
            errors.userType = 'User type is required';
        }

        return errors;
    };

    const registerUser = async (userData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log()
            if(data.error === "User already exists"){
                router.push('/login')
            }

            // console.log('Response from API:', data);
            // You can add additional logic here to handle the response from the API
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 rounded-lg my-12 md:w-1/2  shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>

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
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">
                            Are you a Seller or a Buyer?
                        </label>
                        <select
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.userType ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select an option</option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                        {errors.userType && (
                            <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
