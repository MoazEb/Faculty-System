import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import FormSide from "../components/Login/FormSide";
import StaticSide from "../components/Login/StaticSide";

const LoginPage = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    // const dotPatternStyle = {
    //     backgroundImage: "radial-gradient(circle, #a0a0a0 1px, transparent 1px)", // Dot color and size
    //     backgroundSize: "32px 32px", // Spacing of the dots
    // };

    return (
        // <div className="flex h-screen w-screen bg-[#f5f5f0]" style={dotPatternStyle}>
        <div className="flex h-screen w-screen">
            <StaticSide />
            <FormSide />
        </div>
    );
};

export default LoginPage;
