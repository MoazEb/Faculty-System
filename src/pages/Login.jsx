import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Spinner from "../components/common/Spinner";

const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ userName, password });
    };

    const lightPatternStyle = {
        backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
    };

    const darkPatternStyle = {
        backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-50 dark:bg-primary-dark overflow-hidden">
            <div className="absolute inset-0 dark:hidden" style={lightPatternStyle }></div>
            <div className="hidden absolute inset-0 dark:block" style={darkPatternStyle}></div>
            <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-secondary-dark">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-primary-light">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Sign in to continue to Faculty System
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                disabled={isLoading}
                                value={userName}
                                onChange={handleInputChange(setUserName)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-neutral-500 placeholder-gray-500 text-gray-900 dark:text-primary-light rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-secondary-dark transition-all"
                                placeholder="Username"
                            />
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-neutral-500 placeholder-gray-500 text-gray-900 dark:text-primary-light rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-secondary-dark transition-all"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? (
                                    <EyeIcon
                                        className="h-5 w-5 text-gray-500 dark:text-gray-300"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <EyeSlashIcon
                                        className="h-5 w-5 text-gray-500 dark:text-gray-300"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Spinner /> : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 