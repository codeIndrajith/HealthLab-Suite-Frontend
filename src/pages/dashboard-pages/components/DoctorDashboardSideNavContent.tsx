import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdLocalPharmacy,
  MdMedicalServices,
  MdPeople,
  MdPersonAdd,
} from "react-icons/md";

interface DoctorDashboardSideNavContentProps {
  handleNavLinkChange: (path: string) => void;
  currentPath: string;
}

const DoctorDashboardSideNavContent: React.FC<
  DoctorDashboardSideNavContentProps
> = ({ handleNavLinkChange, currentPath }) => {
  return (
    <>
      <button
        className="w-full"
        onClick={() => handleNavLinkChange("/pharmacy/dashboard")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/pharmach/dashboard"
              ? "text-primary"
              : "text-gray-500"
          } transition-all text-sm hover:custom-bg-gradient hover:text-white`}
        >
          <LuLayoutDashboard fontSize={20} className="" />
          Dashboard
        </li>
      </button>

      <button
        className="w-full"
        onClick={() =>
          handleNavLinkChange("/pharmacy/dashboard/register/pharmacist")
        }
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 transition-all text-sm ${
            currentPath === "/pharmacy/dashboard/register/pharmacist"
              ? "text-primary"
              : "text-gray-500"
          } hover:custom-bg-gradient hover:text-white`}
        >
          <MdPersonAdd fontSize={22} className="" />
          Register pharmacist
        </li>
      </button>

      <button
        className="w-full"
        onClick={() =>
          handleNavLinkChange("/pharmacy/dashboard/manage/pharmacists")
        }
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 transition-all text-sm ${
            currentPath === "/pharmacy/dashboard/manage/pharmacists"
              ? "text-primary"
              : "text-gray-500"
          } hover:custom-bg-gradient hover:text-white`}
        >
          <MdPeople fontSize={22} className="" />
          Manage pharmacists
        </li>
      </button>

      <button
        className="w-full"
        onClick={() => handleNavLinkChange("/pharmacy/dashboard/add/pharmacy")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 transition-all text-sm ${
            currentPath === "/pharmacy/dashboard/add/pharmacy"
              ? "text-primary"
              : "text-gray-500"
          } hover:custom-bg-gradient hover:text-white`}
        >
          <MdLocalPharmacy fontSize={22} className="" />
          Add pharmacy
        </li>
      </button>
    </>
  );
};

export default DoctorDashboardSideNavContent;
