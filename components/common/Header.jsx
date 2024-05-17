import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-500 py-4 shadow-md">
            <div className="container mx-auto  flex justify-evenly items-center">
                <div>
                    <Link href="/" className="text-white font-bold text-2xl">
                        Rentify
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/properties" className="text-white hover:text-blue-200 transition duration-300">
                                Properties
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="text-white hover:text-blue-200 transition duration-300">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href="/register" className="text-white hover:text-blue-200 transition duration-300">
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
