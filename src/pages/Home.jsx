import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import Statistics from "./Statistics";

export default function Home() {
    const { role } = useAuthStore();
    if (role === "Student" || role === "TeachingStaff") {
        return <Navigate to="/my-schedule" replace />;
    }
    return <Statistics />;
}