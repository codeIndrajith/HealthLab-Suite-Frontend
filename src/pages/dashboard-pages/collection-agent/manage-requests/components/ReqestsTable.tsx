"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  FiX,
  FiClock,
  FiUser,
  FiMail,
  FiCheckCircle,
  FiSend,
  FiAlertCircle,
  FiEye,
} from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  collectSample,
  sendLabToTheRequest,
  type IPatientRequest,
} from "../../../../../api/public/reqeustFilter.api";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { REQUST_FILTER } from "../../../../../queris/public.queries";
import ConfirmationModal from "./ConfirmationModal";
import { useAppSelector } from "../../../../../redux/reactReduxTypedHooks";
import { selectAuthSliceUser } from "../../../../../redux/slices/authSlice";

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

interface RequestsTableProps {
  isLoading?: boolean;
  filteredData?: IPatientRequest | null;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENDING_LAB":
        return "rounded-sm bg-blue-50 text-blue-700 border border-blue-200";
      case "COMPLETED":
        return "rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "PENDING":
        return "rounded-sm bg-amber-50 text-amber-700 border border-amber-200";
      case "CANCELLED":
        return "rounded-sm bg-red-50 text-red-700 border border-red-200";
      default:
        return "rounded-sm bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
};

const ReqestsTable: React.FC<RequestsTableProps> = ({
  isLoading = false,
  filteredData,
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
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const authUser = useAppSelector(selectAuthSliceUser);
  const role = authUser?.user_role;

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

  const { mutate: updateStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: (id: string) =>
      sendLabToTheRequest({ testRequestId: id, axiosPrivate }),
    onSuccess: () => {
      toast.success("Request sent to lab successfully!");
      queryClient.invalidateQueries({
        queryKey: [REQUST_FILTER],
      });
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send request to lab");
    },
  });

  const { mutate: updateSampleCollection, isPending: isSampleUpdating } =
    useMutation({
      mutationFn: ({
        requestId,
        isCollected,
      }: {
        requestId: string;
        isCollected: boolean;
      }) => collectSample({ testRequestId: requestId, axiosPrivate }),
      onSuccess: () => {
        toast.success("Sample collection status updated!");
        queryClient.invalidateQueries({
          queryKey: [REQUST_FILTER],
        });
        handleCloseModal();
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update sample collection");
      },
    });

  const handleSendToLabClick = (id: string) => {
    setModalState({
      isOpen: true,
      type: "status",
      requestId: id,
      newValue: "SENDING_LAB",
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

  const handleConfirm = () => {
    if (modalState.type === "status") {
      updateStatus(modalState.requestId);
    } else if (modalState.type === "sample") {
      updateSampleCollection({
        requestId: modalState.requestId,
        isCollected: modalState.newValue as boolean,
      });
    }
  };

  const getModalContent = () => {
    if (modalState.type === "status") {
      return {
        title: "Send to Laboratory",
        message:
          "Are you sure you want to send this request to the laboratory? This action will update the request status.",
        type: "default" as const,
      };
    } else if (modalState.type === "sample") {
      return {
        title: "Update Sample Collection",
        message: `Are you sure you want to mark this sample as ${
          modalState.newValue ? "collected" : "not collected"
        }?`,
        type: modalState.newValue ? ("success" as const) : ("default" as const),
      };
    }

    return {
      title: "Confirm Action",
      message: "Are you sure you want to perform this action?",
      type: "default" as const,
    };
  };

  const modalContent = getModalContent();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Loading patient requests...
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Please wait while we fetch the data
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {filteredData ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-900">
              Patient Request Details
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track patient test requests
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Test & Schedule
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  {role === "CollectionAgent" && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sample Status
                    </th>
                  )}
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {filteredData?.requestId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {filteredData?.patient?.name}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <FiMail className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">
                              {filteredData?.patient?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col space-y-2">
                      <div className="bg-purple-50 px-3 py-1 rounded-lg inline-block">
                        <p className="text-sm font-medium text-purple-700">
                          {filteredData?.labTest?.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-600">
                          {formatDate(filteredData?.collectionTimeSlot || "")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <StatusBadge status={filteredData?.status || ""} />
                  </td>
                  {role === "CollectionAgent" && (
                    <td className="px-6 py-6">
                      <button
                        onClick={() =>
                          handleSampleCollectionClick(
                            filteredData?.id || "",
                            !filteredData?.isSampleCollected
                          )
                        }
                        disabled={
                          isSampleUpdating ||
                          filteredData?.status === "COLLECTED_SAMPLE" ||
                          filteredData?.status === "SENDING_LAB"
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          filteredData?.isSampleCollected
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 focus:ring-emerald-500"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 focus:ring-gray-500"
                        }`}
                      >
                        {isSampleUpdating ? (
                          <FiClock className="w-4 h-4 animate-spin" />
                        ) : filteredData?.isSampleCollected ? (
                          <FiCheckCircle className="w-4 h-4" />
                        ) : (
                          <FiX className="w-4 h-4" />
                        )}
                        {filteredData?.status === "COLLECTED_SAMPLE"
                          ? "Collected"
                          : filteredData?.status === "SENDING_LAB"
                          ? "Sending Lab"
                          : "Not Collected"}
                      </button>
                    </td>
                  )}
                  <td className="px-6 py-6">
                    {role === "CollectionAgent" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleSendToLabClick(filteredData?.id)}
                          disabled={
                            isStatusUpdating ||
                            filteredData?.status === "SENDING_LAB" ||
                            filteredData?.status === "INCOMPLETE"
                          }
                          className="group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                        >
                          {isStatusUpdating ? (
                            <FiClock className="w-4 h-4 animate-spin" />
                          ) : (
                            <FiSend className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          )}
                          <span className="hidden sm:inline">
                            {filteredData?.status === "SENDING_LAB"
                              ? "Sent"
                              : "Send to Lab"}
                          </span>
                          <span className="sm:hidden">
                            {filteredData?.status === "SENDING_LAB"
                              ? "✓"
                              : "Send"}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 justify-end">
                        {/* View Report Button */}
                        <button className="flex text-xs cursor-pointer items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 shadow-sm">
                          <FiEye className="w-4 h-4" />
                          View Report
                        </button>

                        {/* Finalize Report Button */}
                        <button className="flex text-xs cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-md">
                          <FiCheckCircle className="w-4 h-4" />
                          Finalize Report
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm rounded-2xl p-8 w-full text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuSlidersHorizontal className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Requests Found
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No patient requests match your current filters. Try adjusting your
              search criteria or check back later.
            </p>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
        isLoading={isStatusUpdating || isSampleUpdating}
      />
    </>
  );
};

export default ReqestsTable;
