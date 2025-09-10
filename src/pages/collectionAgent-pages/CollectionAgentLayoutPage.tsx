import React from "react";
import DashboardSidebarNav from "../dashboard-pages/components/DashboardSidebarNav";
import { Outlet } from "react-router-dom";
import CollectionAgentDashboardSideNavContent from "../dashboard-pages/collection-agent/CollectionAgentDashboardSideNavContent";
import DashboardHeader from "../doctor-pages/components/DashboardHeader";

const CollectionAgentLayoutPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen max-h-screen h-screen overflow-x-hidden overflow-y-hidden flex">
      <DashboardSidebarNav brandNavigationTo="/dashboard/doctor">
        {({ handleNavLinkChange, currentPath }) => (
          <CollectionAgentDashboardSideNavContent
            handleNavLinkChange={handleNavLinkChange}
            currentPath={currentPath}
          />
        )}
      </DashboardSidebarNav>
      <div className="w-full overflow-x-hidden overflow-y-hidden">
        {/* Dashboard Header */}
        <DashboardHeader brandNavigationTo="/" />

        {/* Dashboard Content */}
        <div className="w-full h-[calc(100vh-130px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CollectionAgentLayoutPage;
