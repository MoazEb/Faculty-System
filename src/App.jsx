import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ForgotPasswordPage from "./pages/ForgotPassword";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Sidebar from "./pages/Sidebar";
import ManageCourses from "./pages/ManageCourses";
import ManageStudents from "./pages/ManageStudents";
import ManageTeachingStaff from "./pages/ManageTeachingStaff";
import ManageTeachingPlaces from "./pages/ManageTeachingPlaces";
import TimeTable from "./components/TimeTable/TimeTable";
import ManageSchedules from "./pages/ManageSchedules";
import Profile from "./pages/Profile";
import TimeTableSchedule from "./pages/TimeTableSchedule";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignUp" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* protected routes */}
                <Route
                    element={
                        <ProtectedRoute allowedRoles={["Admin", "Student", "TeachingStaff"]}>
                            <Sidebar />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["Admin"]}
                            ></ProtectedRoute>
                        }
                    >
                        <Route
                            path="manage-timetables"
                            element={<TimeTable />}
                        />
                        <Route
                            path="manage-places"
                            element={<ManageTeachingPlaces />}
                        />
                        <Route
                            path="manage-students"
                            element={<ManageStudents />}
                        />
                        <Route
                            path="manage-courses"
                            element={<ManageCourses />}
                        />
                        <Route
                            path="manage-teaching-staff"
                            element={<ManageTeachingStaff />}
                        />
                        <Route
                            path="manage-schedules"
                            element={<ManageSchedules />}
                        />
                    </Route>
                    <Route path="my-schedule" element={<TimeTableSchedule />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster
                toastOptions={{
                    success: {
                        duration: 4000,
                    },
                    error: {
                        duration: 4000,
                    },
                }}
            />
        </>
    );
}

export default App;
