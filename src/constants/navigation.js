import { HouseIcon, CalendarIcon, BookIcon, UsersIcon, BriefcaseIcon, ChalkboardTeacherIcon, CalendarCheckIcon, UserIcon } from "@phosphor-icons/react";

export const adminNavigation = [
    { name: "Home", href: "/", icon: HouseIcon },
    { name: "Manage Timetables", href: "/manage-timetables", icon: CalendarIcon },
    { name: "Manage Courses", href: "/manage-courses", icon: BookIcon },
    { name: "Manage Students", href: "/manage-students", icon: UsersIcon },
    { name: "Manage Teaching Staff", href: "/manage-teaching-staff", icon: ChalkboardTeacherIcon },
    { name: "Manage Teaching Places", href: "/manage-places", icon: BriefcaseIcon },
    { name: "Manage Schedules", href: "/manage-schedules", icon: CalendarCheckIcon },
    { name: "Profile", href: "/profile", icon: UserIcon }

];

export const teachingStaffNavigation = [
    // { name: "Home", href: "/", icon: HouseIcon },
    { name: "My Schedule", href: "/my-schedule", icon: CalendarIcon },
    { name: "Profile", href: "/profile", icon: UserIcon }
];

export const studentsNavigation = [
    // { name: "Home", href: "/", icon: HouseIcon },
    { name: "My Schedule", href: "/my-schedule", icon: CalendarIcon },
    { name: "Profile", href: "/profile", icon: UserIcon }
];