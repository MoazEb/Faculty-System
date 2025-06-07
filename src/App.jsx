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

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <Sidebar />
                        </ProtectedRoute>
                    }
                >
                    <Route path="explore" element={<h1>Explore</h1>} />
                    <Route path="manage-timetables" element={<TimeTable />} />
                    <Route path="manage-places" element={<ManageTeachingPlaces />} />
                    <Route path="manage-students" element={<ManageStudents />} />
                    <Route path="manage-courses" element={<ManageCourses />} />
                    <Route path="manage-teaching-staff" element={<ManageTeachingStaff />} />
                    <Route path="manage-schedules" element={<ManageSchedules />} />
                </Route>

                {/* public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignUp" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
