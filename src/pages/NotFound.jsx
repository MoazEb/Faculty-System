import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#f5f5f0] dark:bg-primary-dark">
            <div className="w-full max-w-md text-center">
                <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-primary-light mb-3">Oops! Page Not Found</h2>
                <p className="text-gray-500 dark:text-neutral-400 mb-8">
                    Sorry, the page you are looking for doesn't exist, might have been removed, or is temporarily
                    unavailable.
                </p>
                <Link
                    to="/"
                    className="inline-block w-full max-w-xs p-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors shadow-md"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
