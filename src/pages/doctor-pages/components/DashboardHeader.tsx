import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

interface DashboardHeaderProps {
  brandNavigationTo?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  brandNavigationTo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-white py-2 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={`${brandNavigationTo}`}>
              <img className="h-16 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Signup button on the right */}
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              onClick={logoutHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-green-600 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
