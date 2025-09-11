import React from "react";
import { CiBeaker1 } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdLocalPharmacy,
  MdMedicalServices,
  MdPeople,
  MdPersonAdd,
} from "react-icons/md";

interface CollectionAgentDashboardSideNavContentProps {
  handleNavLinkChange: (path: string) => void;
  currentPath: string;
}

const CollectionAgentDashboardSideNavContent: React.FC<
  CollectionAgentDashboardSideNavContentProps
> = ({ handleNavLinkChange, currentPath }) => {
  return (
    <>
      <button
        className="w-full"
        onClick={() => handleNavLinkChange("/dashboard/collection-agent")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/collection-agent"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <LuLayoutDashboard fontSize={20} className="" />
          Dashboard
        </li>
      </button>

      <button
        className="w-full"
        onClick={() =>
          handleNavLinkChange("/dashboard/collection-agent/manage-requests")
        }
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/collection-agent/manage-request"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <GrDocumentPerformance fontSize={22} className="" />
          Patient Request Manage
        </li>
      </button>
    </>
  );
};

export default CollectionAgentDashboardSideNavContent;
