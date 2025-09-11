import React, { useState, useEffect } from "react";
import {
  FiCheck,
  FiX,
  FiClock,
  FiUser,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";
import type { IPatientRequest } from "../../../../../api/public/reqeustFilter.api";

interface LabTest {
  id: string;
  name: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  user_role: string;
}

interface Request {
  id: string;
  requestId: string;
  status: string;
  collectionTimeSlot: string;
  isSampleCollected: boolean;
  labTest: LabTest;
  patient: Patient;
}

interface RequestsTableProps {
  filteredData?: IPatientRequest | null;
  onStatusChange?: (requestId: string, newStatus: string) => void;
  onSampleCollectionChange?: (requestId: string, isCollected: boolean) => void;
  isLoading?: boolean;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENDING_LAB":
        return "bg-blue-100 text-blue-800 rounded-sm";
      case "COMPLETED":
        return "bg-green-100 text-green-800 rounded-sm";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 rounded-sm";
      case "CANCELLED":
        return "bg-red-100 text-red-800 rounded-sm";
      default:
        return "bg-gray-100 text-gray-800 rounded-sm";
    }
  };

  const getStatusText = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, title, message, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <FiClock className="w-4 h-4 animate-spin" />}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ReqestsTable: React.FC<RequestsTableProps> = ({
  filteredData,
  onStatusChange,
  onSampleCollectionChange,
  isLoading = false,
}) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "status" | "sample";
    requestId: string;
    newValue: string | boolean | null;
  }>({
    isOpen: false,
    type: "status",
    requestId: "",
    newValue: null,
  });

  const [localRequests, setLocalRequests] = useState<IPatientRequest>();
  const [isUpdating, setIsUpdating] = useState(false);

  // Update localRequests when filteredData changes
  useEffect(() => {
    if (filteredData) {
      setLocalRequests(filteredData);
    } else {
      setLocalRequests(undefined);
    }
  }, [filteredData]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleStatusChangeClick = (requestId: string, newStatus: string) => {
    setModalState({
      isOpen: true,
      type: "status",
      requestId,
      newValue: newStatus,
    });
  };

  const handleSampleCollectionClick = (
    requestId: string,
    isCollected: boolean
  ) => {
    setModalState({
      isOpen: true,
      type: "sample",
      requestId,
      newValue: isCollected,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: "status",
      requestId: "",
      newValue: null,
    });
  };

  const getModalContent = () => {
    if (!modalState.newValue) {
      return {
        title: "Confirm Action",
        message: "Are you sure you want to perform this action?",
      };
    }

    if (
      modalState.type === "status" &&
      typeof modalState.newValue === "string"
    ) {
      return {
        title: "Confirm Status Change",
        message: `Are you sure you want to change the status to "${modalState.newValue
          .split("_")
          .map((word: string) => word.charAt(0) + word.slice(1).toLowerCase())
          .join(" ")}"?`,
      };
    } else if (
      modalState.type === "sample" &&
      typeof modalState.newValue === "boolean"
    ) {
      return {
        title: "Confirm Sample Collection",
        message: `Are you sure you want to mark this sample as ${
          modalState.newValue ? "collected" : "not collected"
        }?`,
      };
    }

    return {
      title: "Confirm Action",
      message: "Are you sure you want to perform this action?",
    };
  };

  const modalContent = getModalContent();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <FiClock className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600">Loading requests...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sample Collected
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 min-h-[10px]">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredData?.requestId}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <FiUser className="w-3 h-3" />
                        {filteredData?.patient?.name || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FiMail className="w-3 h-3" />
                        {filteredData?.patient?.email || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {filteredData?.labTest?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(filteredData?.collectionTimeSlot || "")}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={filteredData?.status || ""} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleSampleCollectionClick(
                          filteredData?.patient.id || "",
                          !filteredData?.isSampleCollected
                        )
                      }
                      disabled={isUpdating}
                      className={`flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        filteredData?.isSampleCollected
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {filteredData?.isSampleCollected ? (
                        <FiCheckCircle className="w-4 h-4" />
                      ) : (
                        <FiX className="w-4 h-4" />
                      )}
                      {filteredData?.isSampleCollected
                        ? "Collected"
                        : "Not Collected"}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleStatusChangeClick(
                            filteredData?.patient.id || "",
                            "SENDING_LAB"
                          )
                        }
                        disabled={
                          isUpdating || filteredData?.status === "SENDING_LAB"
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-sm cursor-pointer hover:bg-blue-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiCheck className="w-4 h-4" />
                        Send to Lab
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChangeClick(
                            filteredData?.patient.id || "",
                            "COMPLETED"
                          )
                        }
                        disabled={
                          isUpdating || filteredData?.status === "COMPLETED"
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-sm cursor-pointer hover:bg-green-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiCheck className="w-4 h-4" />
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        // onConfirm={handleConfirm}
        title={modalContent.title}
        message={modalContent.message}
        isLoading={isUpdating}
      />
    </>
  );
};

export default ReqestsTable;
