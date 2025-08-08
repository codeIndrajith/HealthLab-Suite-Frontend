import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../redux/reactReduxTypedHooks";
import { selectAuthSliceUser } from "../../../redux/slices/authSlice";

import Logo from "../../../assets/brand-logo-1.png";

// icons
import { LuLayoutDashboard } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

import { CiMedicalClipboard } from "react-icons/ci";
import { PiUserCirclePlusFill } from "react-icons/pi";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaUserDoctor,
} from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import { MdAssignmentInd, MdFamilyRestroom } from "react-icons/md";

import { AiFillSchedule } from "react-icons/ai";

interface DashboardSidebarNavProps {
  brandNavigationTo?: string;
  children?: (props: {
    handleNavLinkChange: (path: string) => void;
    currentPath: string;
  }) => React.ReactNode;
}

const DashboardSidebarNav: React.FC<DashboardSidebarNavProps> = ({
  brandNavigationTo = "/dashboard",
  children,
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  const navigate = useNavigate();
  const authUser = useAppSelector(selectAuthSliceUser);

  const handleNavLinkChange = (path: string) => {
    setCurrentPath(path);
    navigate(path);
    setIsMinimized(true);
  };

  return (
    <div
      className={`min-w-[350px] w-[350px] max-w-[350px] ${
        isMinimized ? "-translate-x-full" : ""
      } border-r-2 border-slate-100 transition-transform min-h-screen h-screen max-h-screen bg-slate-50 fixed top-0 left-0 z-50 shadow-xl`}
    >
      <div className="w-full relative border-white z-30 max-h-[80px]">
        <div className="w-full max-h-[78px] overflow-hidden">
          <DashboardSidebarNavBrand
            brandNavigationTo={brandNavigationTo}
            isBgApplied
          />
        </div>
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 translate-x-full z-30 right-0 w-[40px] h-[40px] rounded-sm text-white flex items-center justify-center border-2 border-white custom-bg-gradient"
          onClick={() => setIsMinimized((prev) => !prev)}
        >
          {isMinimized ? (
            <FaArrowRightLong fontSize={20} />
          ) : (
            <FaArrowLeftLong fontSize={20} />
          )}
        </button>
      </div>
      {/* <div className="h-[80px] w-full"></div> */}
      <nav className="h-full pt-10 overflow-y-scroll no-scrollbar">
        <ul>
          {children ? (
            children({ handleNavLinkChange, currentPath })
          ) : (
            <>
              <button
                className="w-full"
                onClick={() => handleNavLinkChange("/dashboard")}
              >
                <li
                  className={`w-full flex items-center gap-5 px-8 py-4 ${
                    currentPath === "/dashboard"
                      ? "text-primary"
                      : "text-gray-500"
                  } transition-all text-sm hover:custom-bg-gradient hover:text-white`}
                >
                  <LuLayoutDashboard fontSize={20} className="" />
                  Dashboard
                </li>
              </button>

              {/* Doctor schedule*/}
              {authUser?.user_role === "Doctor" && (
                <button
                  className="w-full"
                  onClick={() => handleNavLinkChange("/dashboard/schedule")}
                >
                  <li
                    className={`w-full flex items-center gap-5 px-8 py-4 transition-all text-sm ${
                      currentPath === "/dashboard/schedule"
                        ? "text-primary"
                        : "text-gray-500"
                    } hover:custom-bg-gradient hover:text-white`}
                  >
                    <AiFillSchedule fontSize={22} className="" />
                    My Channelling
                  </li>
                </button>
              )}

              <button
                className="w-full"
                onClick={() => handleNavLinkChange("/dashboard/health-profile")}
              >
                <li
                  className={`w-full flex items-center gap-5 px-8 py-4 transition-all text-sm ${
                    currentPath === "/dashboard/health-profile"
                      ? "text-primary"
                      : "text-gray-500"
                  } hover:custom-bg-gradient hover:text-white`}
                >
                  <PiUserCirclePlusFill fontSize={22} className="" />
                  My Health Profile
                </li>
              </button>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

interface DashboardSidebarNavBrandProps {
  isUsedInMainHeader?: boolean;
  brandNavigationTo?: string;
  isBgApplied?: boolean;
}

export const DashboardSidebarNavBrand: React.FC<
  DashboardSidebarNavBrandProps
> = ({
  isUsedInMainHeader = false,
  brandNavigationTo = "/dashboard",
  isBgApplied = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`md:gap-3 flex items-center justify-start gap-2 max-h-[80px] min-h-[80px] py-8 pr-8 cursor-pointer ${
        !isUsedInMainHeader ? "pl-8" : undefined
      } ${isBgApplied && "custom-bg-gradient"}`}
      onClick={() => navigate(brandNavigationTo)}
    >
      <img
        src={Logo}
        alt="Norvestra Health"
        className="w-8 h-8 object-contain rounded-sm"
      />
      <span className="md:text-base font-semibold text-sm text-white">
        Novestra Health
      </span>
    </div>
  );
};

export default DashboardSidebarNav;
