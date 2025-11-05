import React from "react";
import DashboardSidebarNav from "../dashboard-pages/components/DashboardSidebarNav";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../doctor-pages/components/DashboardHeader";
import LabStaffDashboardSideNavContent from "../dashboard-pages/labstaff/LabStaffDashboardSideNavContent";

const LabStaffLayoutPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen max-h-screen h-screen overflow-x-hidden overflow-y-hidden flex">
      <DashboardSidebarNav brandNavigationTo="/dashboard/doctor">
        {({ handleNavLinkChange, currentPath }) => (
          <LabStaffDashboardSideNavContent
            handleNavLinkChange={handleNavLinkChange}
            currentPath={currentPath}
          />
        )}
      </DashboardSidebarNav>
      <div className="w-full overflow-x-hidden overflow-y-hidden">
        <DashboardHeader brandNavigationTo="/" />

        <div className="w-full h-[calc(100vh-130px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LabStaffLayoutPage;
