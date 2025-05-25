import React from "react";
import { NavLink } from "react-router-dom";
import useSidebarStore from "../../stores/useSidebarStore";
import { HouseIcon, SignOutIcon, XIcon } from "@phosphor-icons/react";
import useAuthStore from "../../stores/useAuthStore";
import { adminNavigation, teachingStaffNavigation, studentsNavigation } from "../../constants/navigation";
import ThemeToggle from "../common/ThemeToggle";

export default function SidebarContent() {
    const activeLinkStyle = "bg-[#ede7f6] dark:bg-gray-100/5 text-primary font-semibold";
    const defaultLinkStyle =
        "text-gray-600 dark:text-primary-light hover:bg-gray-100 dark:hover:bg-secondary-dark dark:hover:text-primary-light hover:text-gray-900";
    const { toggle } = useSidebarStore();
    const { role, logout } = useAuthStore();
    let navigation = [];

    switch (role) {
        case "Admin":
            navigation = adminNavigation;
            break;
        case "TeachingStaff":
            navigation = teachingStaffNavigation;
            break;
        case "Student":
            navigation = studentsNavigation;
            break;
        default:
            navigation = [{ name: "Home", href: "/", icon: HouseIcon }];
            break;
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0 px-4 h-16 border-b border-gray-200 dark:border-secondary-dark">
                <h1 className="text-lg font-semibold text-primary dark:text-primary-light truncate">Welcome, {role}</h1>
                {/* Close button - only for mobile view*/}
                <button
                    type="button"
                    className="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    onClick={() => toggle()}
                >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                            `group flex items-center px-3 py-2.5 text-sm rounded-md transition-colors duration-150 ease-in-out ${
                                isActive ? activeLinkStyle : defaultLinkStyle
                            }`
                        }
                        onClick={() => toggle()}
                    >
                        <item.icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="flex-shrink-0 px-2 pt-4 pb-4 border-t border-gray-200 dark:border-secondary-dark">
                <ThemeToggle />
                <button
                    onClick={logout}
                    className={`group flex items-center px-2 py-4 text-sm  w-full cursor-pointer rounded-md transition-colors duration-150 ease-in-out ${defaultLinkStyle}`}
                >
                    <SignOutIcon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    Logout
                </button>
            </div>
        </>
    );
}
