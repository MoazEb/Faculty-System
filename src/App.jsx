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
                    <Route path="manage-timetables" element={<h1>Manage Timetables</h1>} />
                    <Route path="manage-places" element={<h1>Manage Places</h1>} />
                    <Route path="manage-students" element={<ManageStudents />} />
                    <Route path="manage-courses" element={<ManageCourses />} />
                    <Route path="manage-teaching-staff" element={<h1>Manage Teaching Staff</h1>} />
                </Route>

                {/* public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignUp" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
