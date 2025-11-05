import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFlask, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import {
  fetchLabRequests,
  type LabRequest,
} from "../../../api/lab-staff/labRequestService";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SkeletonLoader from "../../../skeltons/lab-staff/SkeletonLoader";
import LabRequestCard from "../components/LabRequestCard";

const LabStaffTestManagePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data: labRequestsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["labRequests"],
    queryFn: () => fetchLabRequests(axiosPrivate),
  });

  const labRequests = labRequestsData?.data || [];

  const stats = {
    total: labRequests.length,
    urgent: labRequests.filter((req) => req.priority === "URGENT").length,
    completed: labRequests.filter((req) => req.status === "COMPLETED").length,
    pending: labRequests.filter((req) => req.status === "SENDING_LAB").length,
  };

  if (error) {
    return (
      <div className="py-8 px-6 md:px-16 h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <FaExclamationTriangle className="mx-auto text-red-500 text-3xl mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Failed to load lab requests
            </h3>
            <p className="text-red-600">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 md:px-16 h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <FaFlask className="mr-3" />
                Lab Test Management
              </h1>
              <p className="text-blue-100 text-lg">
                Manage and process laboratory test requests efficiently
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90">Active Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FaFlask className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.urgent}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <FaFlask className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Lab Requests
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Manage all laboratory test requests and processing
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <SkeletonLoader />
            ) : labRequests.length === 0 ? (
              <div className="text-center py-12">
                <FaFlask className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No lab requests found
                </h3>
                <p className="text-gray-500">
                  There are currently no lab requests to display.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {labRequests.map((request: LabRequest) => (
                  <LabRequestCard
                    key={request.id}
                    request={request}
                    // onFinalize={handleFinalize}
                    // isFinalizing={finalizeMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabStaffTestManagePage;
