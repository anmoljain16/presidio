import React from 'react';
import Link from 'next/link';

const SellerProfilePage = () => {
    const sellerName = 'John Doe'; // Replace with the actual seller's name
    const email = 'john.doe@example.com'; // Replace with the actual seller's email
    const phoneNumber = '+1 123-456-7890'; // Replace with the actual seller's phone number
    const properties = [
        {
            id: 1,
            title: '3BHK Apartment for Rent',
            location: 'New York City, NY',
            price: 2500,
        },
        {
            id: 2,
            title: 'Luxury Villa for Sale',
            location: 'Los Angeles, CA',
            price: 750000,
        },
        // Add more properties as needed
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <div className="mb-4">
                    <p className="font-semibold">Name:</p>
                    <p>{sellerName}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Email:</p>
                    <p>{email}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Phone Number:</p>
                    <p>{phoneNumber}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Listed Properties</h2>
                {properties.length === 0 ? (
                    <p>You have not listed any properties yet.</p>
                ) : (
                    <ul>
                        {properties.map((property) => (
                            <li key={property.id} className="mb-4">
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">{property.title}</h3>
                                    <p>Location: {property.location}</p>
                                    <p>Price: ${property.price.toLocaleString()}</p>
                                    <div className="mt-2">
                                        <Link href={`/properties/${property.id}`}
                                             className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                View Property
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SellerProfilePage;
