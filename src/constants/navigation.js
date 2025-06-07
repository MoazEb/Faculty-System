import { HouseIcon, CalendarIcon, BookIcon, UsersIcon, BriefcaseIcon, ChalkboardTeacherIcon, CalendarCheckIcon } from "@phosphor-icons/react";

export const adminNavigation = [
    { name: "Home", href: "/", icon: HouseIcon },
    { name: "Manage Timetables", href: "/manage-timetables", icon: CalendarIcon },
    { name: "Manage Courses", href: "/manage-courses", icon: BookIcon },
    { name: "Manage Students", href: "/manage-students", icon: UsersIcon },
    { name: "Manage Teaching Staff", href: "/manage-teaching-staff", icon: ChalkboardTeacherIcon },
    { name: "Manage Teaching Places", href: "/manage-places", icon: BriefcaseIcon },
    { name: "Manage Schedules", href: "/manage-schedules", icon: CalendarCheckIcon },
];

export const teachingStaffNavigation = [
    { name: "Home", href: "/", icon: HouseIcon },
    { name: "View Timetable", href: "/timetables", icon: CalendarIcon },
];

export const studentsNavigation = [
    { name: "Home", href: "/", icon: HouseIcon },
    { name: "View Timetable", href: "/timetables", icon: CalendarIcon },
];