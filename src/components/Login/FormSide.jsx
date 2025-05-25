import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Spinner from "../../components/common/Spinner";

export default function FormSide() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { userName, password };
        await login(credentials);
    };

    return (
        <div className="dark:bg-secondary-dark w-full lg:w-1/2 p-6 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold dark:text-primary-light mb-2">Log in</h1>
                <p className="text-gray-500 dark:text-gray-300 mb-8">
                    Don't have an account?
                    <Link to="/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>

                <form onSubmit={handleSubmit}>
                    {/* userName input */}
                    <div className="mb-5">
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={handleInputChange(setUserName)}
                            required
                            disabled={isLoading}
                            className="w-full p-4 border border-gray-300 dark:border-neutral-500 rounded-xl text-gray-800 dark:text-primary-light placeholder-gray-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* password input */}
                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            required
                            disabled={isLoading}
                            className="w-full p-4 border border-gray-300 dark:border-neutral-500 rounded-xl text-gray-800 dark:text-primary-light placeholder-gray-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        {/* show password btn */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2  cursor-pointer hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeIcon color="currentColor" className="text-gray-700 dark:text-primary-light" />
                            ) : (
                                <EyeSlashIcon color="currentColor" className="text-gray-700 dark:text-primary-light" />
                            )}
                        </button>
                    </div>

                    {/* Forgot password */}
                    {/* <div className="text-right mb-5">
                        <Link
                            to="/forgot-password"
                            className={`text-primary text-sm hover:underline ${
                                isLoading ? "pointer-events-none opacity-50" : ""
                            }`}
                            aria-disabled={isLoading}
                        >
                            Forgot password?
                        </Link>
                    </div> */}

                    {/* submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center p-4 bg-primary text-white rounded-xl font-semibold mb-8 hover:bg-secondary transition-colors shadow-md cursor-pointer duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Spinner /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
