import React from "react";
import DashboardSidebarNav from "../dashboard-pages/components/DashboardSidebarNav";
import DoctorDashboardSideNavContent from "../dashboard-pages/components/DoctorDashboardSideNavContent";
import DashboardHeader from "./components/DashboardHeader";
import { Outlet } from "react-router-dom";

const DoctorLayoutPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen max-h-screen h-screen overflow-x-hidden overflow-y-hidden flex">
      <DashboardSidebarNav brandNavigationTo="/doctor/dashboard">
        {({ handleNavLinkChange, currentPath }) => (
          <DoctorDashboardSideNavContent
            handleNavLinkChange={handleNavLinkChange}
            currentPath={currentPath}
          />
        )}
      </DashboardSidebarNav>
      <div className="w-full overflow-x-hidden overflow-y-hidden">
        {/* Dashboard Header */}
        <DashboardHeader brandNavigationTo="/pharmacy/dashboard" />

        {/* Dashboard Content */}
        <div className="w-full h-[calc(100vh-130px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorLayoutPage;
