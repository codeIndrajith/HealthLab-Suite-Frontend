"use client";

import type React from "react";
import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiTrendingUp,
  FiPlus,
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import { useAppSelector } from "../../../redux/reactReduxTypedHooks";
import { selectAuthSliceUser } from "../../../redux/slices/authSlice";

// Mock data
const dashboardStats = {
  totalPatients: 1247,
  appointmentsToday: 12,
  pendingLabResults: 8,
  completedToday: 15,
};

const recentActivities = [
  {
    id: 1,
    type: "appointment",
    message: "Appointment completed with John Doe",
    time: "2 hours ago",
    icon: FiCheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "lab",
    message: "Lab results received for Sarah Wilson",
    time: "3 hours ago",
    icon: FiActivity,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "alert",
    message: "Critical lab values for Patient #1234",
    time: "4 hours ago",
    icon: FiAlertCircle,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "appointment",
    message: "New appointment scheduled with Mike Johnson",
    time: "5 hours ago",
    icon: FiCalendar,
    color: "text-purple-600",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patientName: "Emma Thompson",
    time: "10:00 AM",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "David Miller",
    time: "11:30 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    patientName: "Lisa Anderson",
    time: "2:00 PM",
    type: "Lab Review",
    status: "pending",
  },
  {
    id: 4,
    patientName: "Robert Brown",
    time: "3:30 PM",
    type: "Consultation",
    status: "confirmed",
  },
];

const recentLabTests = [
  {
    id: 1,
    patientName: "Alice Johnson",
    testName: "Complete Blood Count",
    status: "completed",
    date: "Today",
    priority: "normal",
  },
  {
    id: 2,
    patientName: "Mark Wilson",
    testName: "Lipid Panel",
    status: "pending",
    date: "Yesterday",
    priority: "high",
  },
  {
    id: 3,
    patientName: "Jennifer Davis",
    testName: "Thyroid Function",
    status: "completed",
    date: "2 days ago",
    priority: "normal",
  },
];

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: string;
}> = ({ title, value, icon: Icon, color, bgColor, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value.toLocaleString()}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <FiTrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem: React.FC<{
  activity: {
    id: number;
    type: string;
    message: string;
    time: string;
    icon: React.ElementType;
    color: string;
  };
}> = ({ activity }) => {
  const { message, time, icon: Icon, color } = activity;

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className={`${color} bg-gray-50 p-2 rounded-lg`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 font-medium">{message}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

// Appointment Item Component
const AppointmentItem: React.FC<{
  appointment: {
    id: number;
    patientName: string;
    time: string;
    type: string;
    status: string;
  };
}> = ({ appointment }) => {
  const { patientName, time, type, status } = appointment;

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {patientName.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{patientName}</p>
          <p className="text-xs text-gray-500">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{time}</p>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

// Lab Test Item Component
const LabTestItem: React.FC<{
  labTest: {
    id: number;
    patientName: string;
    testName: string;
    status: string;
    date: string;
    priority: string;
  };
}> = ({ labTest }) => {
  const { patientName, testName, status, date, priority } = labTest;

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
          <FiActivity className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{testName}</p>
          <p className="text-xs text-gray-500">{patientName}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
          {priority === "high" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              High
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </div>
  );
};

// Quick Action Button Component
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Patients"
            value={dashboardStats.totalPatients}
            icon={FiUsers}
            color="text-blue-600"
            bgColor="bg-blue-100"
            change="+12% from last month"
          />
          <StatsCard
            title="Appointments Today"
            value={dashboardStats.appointmentsToday}
            icon={FiCalendar}
            color="text-green-600"
            bgColor="bg-green-100"
            change="+3 from yesterday"
          />
          <StatsCard
            title="Pending Lab Results"
            value={dashboardStats.pendingLabResults}
            icon={FiActivity}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
          <StatsCard
            title="Completed Today"
            value={dashboardStats.completedToday}
            icon={FiCheckCircle}
            color="text-purple-600"
            bgColor="bg-purple-100"
            change="+5 from yesterday"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickActionButton
              title="View Lab Tests"
              description="Check pending results"
              icon={FiActivity}
              color="text-orange-600"
              bgColor="bg-orange-100"
              onClick={() => handleQuickAction("view-lab-tests")}
            />
            <QuickActionButton
              title="Patient Request"
              description="Access lab test records"
              icon={FiFileText}
              color="text-purple-600"
              bgColor="bg-purple-100"
              onClick={() => handleQuickAction("patient-records")}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Lab Tests */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Lab Tests
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {recentLabTests.map((labTest) => (
                  <LabTestItem key={labTest.id} labTest={labTest} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
