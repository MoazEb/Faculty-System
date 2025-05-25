import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center px-2 py-4 text-sm w-full cursor-pointer rounded-md transition-colors duration-150 ease-in-out 
                        text-gray-600 dark:text-primary-light hover:bg-gray-100 dark:hover:bg-secondary-dark dark:hover:text-primary-light hover:text-gray-900`}
        >
            {theme === "light" ? (
                <svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"
                    />
                </svg>
            ) : (
                <svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 256 256">
                    <path
                        fill="currentColor"
                        d="M128 40a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0ZM51.7 59.3a8 8 0 0 1 11.3 0l11.3 11.4a8 8 0 0 1-11.4 11.3L51.6 70.6a8 8 0 0 1 0-11.3Zm152.7 0a8 8 0 0 1 0 11.3l-11.3 11.3a8 8 0 1 1-11.3-11.3l11.3-11.3a8 8 0 0 1 11.3 0ZM128 200a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 8-8Zm87.9-71.9a8 8 0 0 1-8 8h-16a8 8 0 0 1 0-16h16a8 8 0 0 1 8 8ZM48 136H32a8 8 0 0 1 0-16h16a8 8 0 0 1 0 16Zm8.6 60.7a8 8 0 0 1 0-11.3l11.3-11.3a8 8 0 0 1 11.3 11.3l-11.3 11.3a8 8 0 0 1-11.3 0Zm139.1-11.3a8 8 0 0 1 11.3 11.3l-11.3 11.3a8 8 0 1 1-11.3-11.3l11.3-11.3ZM128 72a56 56 0 1 1 0 112a56 56 0 0 1 0-112Zm0 16a40 40 0 1 0 0 80a40 40 0 0 0 0-80Z"
                    />
                </svg>
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

export default ThemeToggle;
