import SidebarContent from "./SidebarContent";

export default function DesktopSidebar() {
    return (
        <div className="hidden md:flex md:flex-col md:w-64">
            <div className="flex flex-col flex-grow bg-white dark:bg-tertiary-dark overflow-y-auto border-r border-gray-200 dark:border-secondary-dark">
                <SidebarContent />
            </div>
        </div>
    );
}
