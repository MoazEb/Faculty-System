import React from "react";
import { Outlet } from "react-router-dom";
import MobileNavToggle from "../components/Sidebar/MobileNavToggle";
import MobileSidebar from "../components/Sidebar/MobileSidebar";
import DesktopSidebar from "../components/Sidebar/DesktopSidebar";
import useSidebarStore from "../stores/useSidebarStore";

export default function Sidebar() {
    const { isSidebarOpen, toggle } = useSidebarStore();

    return (
        <>
            {/* Background overlay for mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => toggle()} aria-hidden="true" />
            )}

            {/* Mobile Sidebar panel */}
            <MobileSidebar />

            {/* Desktop Sidebar layout */}
            <div className="flex h-screen bg-gray-100 dark:bg-primary-dark dark:text-primary-light">
                {/* --- Static Sidebar for Desktop --- */}
                <DesktopSidebar />

                {/* --- Main Content Area --- */}
                <div className="flex flex-col flex-1 w-0 overflow-hidden">
                    <MobileNavToggle />
                    <main className="flex-1 relative focus:outline-none overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
