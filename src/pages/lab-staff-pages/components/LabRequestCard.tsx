import React from "react";
import {
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCheck,
} from "react-icons/fa";
import type { LabRequest } from "../../../api/lab-staff/labRequestService";
import { useNavigate } from "react-router-dom";

interface LabRequestCardProps {
  request: LabRequest;
  isFinalizing?: boolean;
}

const LabRequestCard: React.FC<LabRequestCardProps> = ({
  request,
  isFinalizing = false,
}) => {
  const navigate = useNavigate();
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "NORMAL":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENDING_LAB":
        return "bg-purple-100 text-purple-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <span className="text-white font-bold text-sm">
              {request.requestId.slice(-4)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Request ID - {request.requestId}
            </h3>
            <p className="text-sm text-gray-500">
              Created: {formatDate(request.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium border ${getPriorityColor(
              request.priority
            )}`}
          >
            <FaExclamationTriangle className="mr-1" />
            {request.priority}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(
              request.status
            )}`}
          >
            <FaClock className="mr-1" />
            {request.status.replace("_", " ")}
          </span>
          {request.patientVerification && (
            <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-green-100 text-green-800">
              <FaUserCheck className="mr-1" />
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Patient ID</p>
          <p className="font-medium text-gray-900">
            {request.patientId.slice(0, 8)}...
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Collection Time</p>
          <p className="font-medium text-gray-900">
            {formatDate(request.collectionTimeSlot)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Payment</p>
          <p className="font-medium text-gray-900">
            {request.paymentMethod} • {request.isPaid ? "Paid" : "Pending"}
          </p>
        </div>
      </div>

      {request.clinicalNotes && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Clinical Notes</p>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {request.clinicalNotes}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <div
            className={`w-3 h-3 rounded-full ${
              request.isSampleCollected ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            Sample{" "}
            {request.isSampleCollected ? "Collected" : "Pending Collection"}
          </span>
        </div>

        <button
          onClick={() =>
            navigate(`${location?.pathname}/${request?.id}/results-process`)
          }
          disabled={isFinalizing}
          className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
        >
          <FaCheckCircle className="mr-2" />
          {isFinalizing ? "Finalizing..." : "Finalize Process"}
        </button>
      </div>
    </div>
  );
};

export default LabRequestCard;
