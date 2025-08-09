import React from "react";
import { CiBeaker1 } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
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
        onClick={() => handleNavLinkChange("/dashboard/doctor")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/doctor" ? "text-white" : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <LuLayoutDashboard fontSize={20} className="" />
          Dashboard
        </li>
      </button>

      <button
        className="w-full"
        onClick={() => handleNavLinkChange("/dashboard/doctor/lab-tests")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/doctor/lab-tests"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <CiBeaker1 fontSize={22} className="" />
          Lab Test Manage
        </li>
      </button>

      <button
        className="w-full"
        onClick={() => handleNavLinkChange("/dashboard/doctor/patient-tests")}
      >
        <li
          className={`w-full flex items-center gap-5 px-8 py-4 ${
            currentPath === "/dashboard/doctor/patient-tests"
              ? "text-white"
              : "text-gray-500"
          } transition-all text-sm hover:text-gray-400 cursor-pointer`}
        >
          <FaUser fontSize={22} className="" />
          Patient Test Manage
        </li>
      </button>

      {/* <button
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
      </button> */}
    </>
  );
};

export default DoctorDashboardSideNavContent;
