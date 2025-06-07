import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStatistics } from "../../API/endpoints";
import {
    UsersIcon,
    ChalkboardTeacherIcon,
    BriefcaseIcon,
    BookIcon,
    ClockIcon,
    ChartPieIcon,
    PlusCircleIcon,
    CalendarPlusIcon,
    UsersFourIcon,
    LightningIcon,
} from "@phosphor-icons/react";
import Spinner from "../components/common/Spinner";

// A simple, modern card for displaying statistics.
const StatCard = ({ icon: Icon, title, value, colorClass }) => (
    <div className="bg-white dark:bg-secondary-dark p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
                <p className="text-3xl font-semibold text-gray-800 dark:text-primary-light mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${colorClass}`}>
                <Icon size={24} weight="bold" className="text-white" />
            </div>
        </div>
    </div>
);

// A list item for displaying course information in a clean, list-like format.
const CourseListItem = ({ course, formatCourseType }) => (
    <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0">
            <p className="font-semibold text-base text-gray-800 dark:text-primary-light">{course.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.code} &bull; Level {course.level} &bull; {course.creditHours} Credit Hours
            </p>
        </div>
        <div className="flex-shrink-0">
            {/* <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    course.type === 0
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                }`}
            >
                {formatCourseType(course.type)}
            </span> */}
        </div>
    </div>
);

// A component for quick action links.
const QuickAction = ({ icon: Icon, title, to, colorClass }) => (
    <Link
        to={to}
        className="flex items-center p-3 -m-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/50"
    >
        <div className={`p-2.5 rounded-lg mr-4 ${colorClass}`}>
            <Icon size={20} weight="bold" className="text-white" />
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
    </Link>
);

export default function Statistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await getStatistics();
                setStats(response.data);
            } catch (err) {
                console.error("Error fetching statistics:", err);
                setError("Failed to load statistics. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const formatCourseType = (type) => {
        return type === 0 ? "Theoretical" : "Practical";
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <Spinner size="10" color="text-primary" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">Loading statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                        Failed to load data
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            <div className="bg-white dark:bg-secondary-dark p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-primary-light">Welcome Back!</h1>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                        Here's a quick overview of the system statistics and your available actions.
                    </p>
                </div>
                <ChartPieIcon
                    size={160}
                    className="absolute -right-12 -top-8 text-gray-100 dark:text-gray-200/50"
                    weight="light"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={UsersIcon}
                    title="Total Students"
                    value={stats?.totalStudents || 0}
                    colorClass="bg-blue-500"
                />
                <StatCard
                    icon={ChalkboardTeacherIcon}
                    title="Teaching Staff"
                    value={stats?.totalTeachingStaff || 0}
                    colorClass="bg-purple-500"
                />
                <StatCard
                    icon={BriefcaseIcon}
                    title="Teaching Places"
                    value={stats?.totalTeachingPlaces || 0}
                    colorClass="bg-amber-500"
                />
                <StatCard
                    icon={BookIcon}
                    title="Total Courses"
                    value={stats?.totalCourses || 0}
                    colorClass="bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white dark:bg-secondary-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50">
                    <div className="p-6">
                        <div className="flex items-center">
                            <ClockIcon size={24} className="text-primary mr-3" />
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-light">
                                Recently Added Courses
                            </h2>
                        </div>
                    </div>
                    
                    {stats?.recentlyAddedCourses?.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {stats.recentlyAddedCourses.map((course) => (
                               <div className="px-6" key={course.id}>
                                    <CourseListItem
                                        course={course}
                                        formatCourseType={formatCourseType}
                                    />
                               </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">No recent courses found.</p>
                        </div>
                    )}
                </div>
                
                <div className="space-y-8">
                    <div className="bg-white dark:bg-secondary-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50">
                        <div className="p-6">
                            <div className="flex items-center">
                                <LightningIcon size={24} className="text-primary mr-3" />
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-light">
                                    Quick Actions
                                </h2>
                            </div>
                        </div>
                        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700/50">
                            <div className="flex flex-col gap-[2.1rem] pt-5">
                                <QuickAction
                                    icon={PlusCircleIcon}
                                    title="Add New Course"
                                    to="/manage-courses"
                                    colorClass="bg-green-500"
                                />
                                <QuickAction
                                    icon={CalendarPlusIcon}
                                    title="Schedule Class"
                                    to="/manage-schedules"
                                    colorClass="bg-sky-500"
                                />
                                <QuickAction
                                    icon={UsersFourIcon}
                                    title="Manage Students"
                                    to="/manage-students"
                                    colorClass="bg-orange-500"
                                />
                                <QuickAction
                                    icon={ChalkboardTeacherIcon}
                                    title="Manage Teaching Staff"
                                    to="/manage-teaching-staff"
                                    colorClass="bg-purple-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}