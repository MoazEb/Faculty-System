import { useEffect } from "react";
import { useProfileStore } from "../stores/useProfileStore";
import Spinner from "../components/common/Spinner";
import {
    IdentificationBadgeIcon,
    GenderIntersexIcon,
    CalendarBlankIcon,
    GraduationCapIcon,
    UserIcon,
    StudentIcon,
    ChalkboardTeacherIcon,
    UserGearIcon,
    BriefcaseIcon,
    BookIcon,
    HouseIcon,
    UsersIcon
} from "@phosphor-icons/react";

export default function Profile() {
    const { personalInfo, isLoading, getPersonalInfo } = useProfileStore();

    useEffect(() => {
        getPersonalInfo();
    }, [getPersonalInfo]);

    const getInitials = (name = "") =>
        name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    const GENDER_MAP = {
        0: "Male",
        1: "Female",
    };

    const LEVEL_MAP = {
        1: "Level 1",
        2: "Level 2",
        3: "Level 3",
        4: "Level 4",
        5: "Not Set Yet",
        6: "Teaching Assistant",
        7: "Teaching Lecturer",
    };

    const ROLE_MAP = {
        0: "Admin",
        1: "Teaching Staff",
        2: "Student",
    };

    const ROLE_ICON_MAP = {
        0: <UserGearIcon size={20} className="text-gray-500 dark:text-gray-400" />,
        1: <ChalkboardTeacherIcon size={20} className="text-gray-500 dark:text-gray-400" />,
        2: <StudentIcon size={20} className="text-gray-500 dark:text-gray-400" />,
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner size={8} color="text-primary dark:text-primary-light" />
            </div>
        );
    }

    if (!personalInfo) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Could not load personal info.</p>
            </div>
        );
    }

    const DetailItem = ({ icon, label, value }) => (
        <div className="bg-gray-50 dark:bg-neutral-700/50 p-4 py-6 rounded-xl flex items-center gap-4 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
            <div className="bg-primary/10 dark:bg-primary-light/10 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="max-h-screen bg-gray-50 dark:bg-primary-dark">
            <div>
                <div className="bg-white dark:bg-primary-dark overflow-hidden">
                    <div className="relative h-32 md:h-40 bg-primary/5 dark:bg-primary-dark overflow-hidden">
                        <UserIcon
                            size={96}
                            className="absolute -top-4 -left-8 text-primary/10 dark:text-primary-light/5"
                            weight="thin"
                        />
                        <GraduationCapIcon
                            size={128}
                            className="absolute -bottom-10 -right-4 text-primary/10 dark:text-primary-light/5"
                            weight="thin"
                        />
                        <ChalkboardTeacherIcon
                            size={80}
                            className="absolute top-1/2 left-1/4 -translate-y-1/2 text-primary/10 dark:text-primary-light/5"
                            weight="thin"
                        />
                        <StudentIcon
                            size={80}
                            className="absolute top-8 right-1/4 text-primary/10 dark:text-primary-light/5"
                            weight="thin"
                        />
                    </div>

                    <div className="px-6 py-2">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
                            <div className="flex justify-center sm:justify-start">
                                <div className="w-32 h-32 z-10 md:w-36 md:h-36 bg-gray-200 dark:bg-neutral-700 rounded-full border-4 sm:border-8 border-gray-100 dark:border-neutral-800 flex items-center justify-center -mt-20 sm:-mt-24">
                                    <span className="text-4xl md:text-5xl font-bold text-neutral-600 dark:text-neutral-300">
                                        {getInitials(personalInfo.fullName)}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center sm:text-left mt-4 sm:mt-0 sm:pb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-primary-light">
                                    {personalInfo.fullName}
                                </h2>
                                {personalInfo.role !== undefined && (
                                    <div className="mt-1 flex items-center justify-center sm:justify-start gap-2 text-gray-500 dark:text-gray-400">
                                        {ROLE_ICON_MAP[personalInfo.role]}
                                        <p>{ROLE_MAP[personalInfo.role]}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <h3 className="hidden sm:block text-xl font-semibold text-gray-700 dark:text-primary-light mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem
                                icon={<UserIcon size={24} className="text-primary dark:text-primary-light" />}
                                label="First Name"
                                value={personalInfo.firstName}
                            />
                            <DetailItem
                                icon={<UserIcon size={24} className="text-primary dark:text-primary-light" />}
                                label="Last Name"
                                value={personalInfo.lastName}
                            />
                            <DetailItem
                                icon={<IdentificationBadgeIcon size={24} className="text-primary dark:text-primary-light" />}
                                label="Username"
                                value={personalInfo.userName}
                            />
                            <DetailItem
                                icon={<GenderIntersexIcon size={24} className="text-primary dark:text-primary-light" />}
                                label="Gender"
                                value={GENDER_MAP[personalInfo.gender]}
                            />
                            {personalInfo.level && (
                                <DetailItem
                                    icon={<GraduationCapIcon size={24} className="text-primary dark:text-primary-light" />}
                                    label="Level"
                                    value={LEVEL_MAP[personalInfo.level]}
                                />
                            )}
                            <DetailItem
                                icon={<CalendarBlankIcon size={24} className="text-primary dark:text-primary-light" />}
                                label="Date of Birth"
                                value={new Date(personalInfo.dateOfBirth).toLocaleDateString()}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-32 md:h-40 overflow-hidden">
                  
                   <BookIcon
                    size={80}
                     className="absolute bottom-8 right-1/4 text-primary/10 dark:text-primary-light/5"
                     weight="thin"
                   />
                   <BriefcaseIcon
                      size={80}
                       className="absolute top-1/2 left-1/4 -translate-y-1/2 text-primary/10 dark:text-primary-light/5"
                       weight="thin"
                   />
                <HouseIcon
                    size={128}
                       className="absolute -bottom-10 -right-4 text-primary/10 dark:text-primary-light/5"
                    weight="thin"
                 />
                 
                   <UsersIcon
                      size={96}
                       className="absolute -top-4 -left-8 text-primary/10 dark:text-primary-light/5"
                       weight="thin"
                />
              </div>
        </div>
    );
}