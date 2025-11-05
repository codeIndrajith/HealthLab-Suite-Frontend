import type React from "react";
import { FiActivity, FiFileText, FiArrowRight } from "react-icons/fi";
import { useAppSelector } from "../../../redux/reactReduxTypedHooks";
import { selectAuthSliceUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// Mock data
const dashboardStats = {
  totalPatients: 1247,
  appointmentsToday: 12,
  pendingLabResults: 8,
  completedToday: 15,
};

const QuickActionButton: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick: () => void;
}> = ({ title, description, icon: Icon, color, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 text-left w-full group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`${bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <FiArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-gray-600 transition-colors duration-200" />
      </div>
    </button>
  );
};

// Main Dashboard Component
const DoctorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const authUser = useAppSelector(selectAuthSliceUser);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Implement navigation or modal opening logic here
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-y-auto h-full pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {getGreeting()}, Dr. {authUser?.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentDate} • {currentTime}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  You have {dashboardStats.appointmentsToday} appointments
                  scheduled for today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickActionButton
              title="Create Lab Tests"
              description="Manage lab tests"
              icon={FiActivity}
              color="text-orange-600"
              bgColor="bg-orange-100"
              onClick={() => navigate("/dashboard/doctor/lab-tests/new")}
            />
            <QuickActionButton
              title="Patient Request"
              description="Access lab test records"
              icon={FiFileText}
              color="text-purple-600"
              bgColor="bg-purple-100"
              onClick={() => navigate("/dashboard/doctor/patient-tests")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
