import React from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { GrDocumentPerformance } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";

interface LabStaffDashboardSideNavContentProps {
  handleNavLinkChange: (path: string) => void;
  currentPath: string;
}

const LabStaffDashboardSideNavContent: React.FC<
  LabStaffDashboardSideNavContentProps
> = ({ handleNavLinkChange, currentPath }) => {
  return (
    <>
      {/* <button
        className="w-full"
        onClick={() => handleNavLinkChange("/dashboard/lab-staff")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/lab-staff"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <LuLayoutDashboard fontSize={20} className="" />
          Dashboard
        </li>
      </button> */}

      <button
        className="w-full"
        onClick={() =>
          handleNavLinkChange("/dashboard/lab-staff/manage-requests")
        }
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/lab-staff/manage-requests"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <GrDocumentPerformance fontSize={22} className="" />
          Test Requests Manage
        </li>
      </button>

      <button
        className="w-full"
        onClick={() =>
          handleNavLinkChange("/dashboard/lab-staff/complete-requests")
        }
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/lab-staff/complete-requests"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <FaNoteSticky fontSize={22} className="" />
          Complete Test Requests
        </li>
      </button>
    </>
  );
};

export default LabStaffDashboardSideNavContent;
