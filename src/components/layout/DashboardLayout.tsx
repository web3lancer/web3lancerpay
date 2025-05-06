import React from "react";
import Sidebar from "@/components/Sidebar";
import Bottombar from "@/components/Bottombar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar for desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Bottombar for mobile */}
            <div className="block md:hidden fixed bottom-0 w-full">
                <Bottombar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;