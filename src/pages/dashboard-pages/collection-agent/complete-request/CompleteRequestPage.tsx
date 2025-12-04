import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaExclamationTriangle,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaFilePdf,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaIdCard,
  FaNotesMedical,
  FaVial,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getAllCompleteTestRequest } from "../../../../api/lab-staff/labRequestService";

// Types based on your API response
interface Patient {
  name: string;
  email: string;
}

interface LabTest {
  name: string;
  description: string;
  preparation_instructions: string;
  turnaround_time_hours: number;
  is_fasting_required: boolean;
}

interface TestRequest {
  id: string;
  patientId: string;
  testId: string;
  requestId: string;
  priority: "URGENT" | "ROUTINE";
  clinicalNotes: string;
  status: "COMPLETE";
  collectionLocation: string;
  patientVerification: boolean;
  isSampleCollected: boolean;
  paymentMethod: "CASH" | "CARD" | "INSURANCE";
  isPaid: boolean;
  collectionTimeSlot: string;
  aiSuggestion: string;
  pdfLink: string;
  resultValue: string;
  resultUnit: string;
  referenceRange: string;
  remarks: string;
  resultDate: string;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
  labTest: LabTest;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  data: TestRequest[];
}

const CompleteRequestPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["complete-test-requests"],
    queryFn: () => getAllCompleteTestRequest(axiosPrivate),
    refetchOnWindowFocus: false,
  });

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const downloadReport = (pdfLink: string, requestId: string) => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = `lab-report-${requestId}.pdf`;
    link.target = "_blank";
    link.click();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 border border-red-300";
      case "ROUTINE":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
            <div className="h-4 w-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-200"
              >
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="p-5 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-20 w-full bg-gray-200 rounded"></div>
                </div>
                <div className="p-5 border-t border-gray-200">
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="flex items-start">
              <FiAlertCircle className="h-6 w-6 text-red-500 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">
                  Error Loading Data
                </h3>
                <p className="text-red-700">
                  {error.message ||
                    "Failed to load complete test requests. Please try again."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const testRequests = response?.data || [];

  if (testRequests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <FaCheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Complete Test Requests
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              All test requests are currently being processed. Completed results
              will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const urgentCount = testRequests.filter(
    (t) => t.priority === "URGENT"
  ).length;
  const pendingPaymentCount = testRequests.filter((t) => !t.isPaid).length;
  const averageTurnaround = Math.round(
    testRequests.reduce((acc, t) => acc + t.labTest.turnaround_time_hours, 0) /
      testRequests.length
  );

  return (
    <div className="py-8 px-6 md:px-16 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Test Requests
          </h1>
          <p className="text-gray-600 mb-4">
            View all completed lab tests with results and AI insights
          </p>
          <div className="flex items-center text-gray-700">
            <FaCheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>{testRequests.length} completed requests</span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Completed */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {testRequests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Urgent Priority */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Urgent Priority
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {urgentCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaExclamationTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Pending Payment */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Payment
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {pendingPaymentCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Average Turnaround */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Turnaround
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {averageTurnaround}h
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaClock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Test Request Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaFileMedical className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {request.labTest.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <FaUser className="h-3 w-3 mr-1" />
                        <span>{request.patient.name}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                      request.priority
                    )}`}
                  >
                    {request.priority}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <FaEnvelope className="h-3 w-3 mr-1" />
                  <span className="truncate">{request.patient.email}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 ">
                {/* Request Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <FaIdCard className="h-3 w-3 mr-1" />
                      <span>Request ID</span>
                    </div>
                    <p className="font-mono text-gray-900 font-medium">
                      {request.requestId}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <FaCalendarAlt className="h-3 w-3 mr-1" />
                      <span>Completed</span>
                    </div>
                    <p className="text-gray-900">
                      {formatDate(request.resultDate)}
                    </p>
                  </div>
                </div>

                {/* Clinical Notes */}
                {request.clinicalNotes && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <FaNotesMedical className="h-3 w-3 mr-1" />
                      <span>Clinical Notes</span>
                    </div>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                      {request.clinicalNotes}
                    </p>
                  </div>
                )}

                {/* Test Results */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaVial className="h-3 w-3 mr-1" />
                      <span>Test Results</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Ref: {request.referenceRange}
                    </span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-blue-700 mr-2">
                        {request.resultValue}
                      </span>
                      <span className="text-gray-700">
                        {request.resultUnit}
                      </span>
                    </div>
                    {request.remarks && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        "{request.remarks}"
                      </p>
                    )}
                  </div>
                </div>

                {/* AI Suggestion - Expandable */}
                {expandedCard === request.id && (
                  <div className="transform translate-y-0 animate-fade-in">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4 mt-4 shadow-lg">
                      <div className="flex items-center mb-2">
                        <FaChartLine className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800 text-sm">
                          AI Insights
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {request.aiSuggestion}
                      </p>
                    </div>
                  </div>
                )}

                {/* Test Details */}
                <div className="text-xs text-gray-600 flex items-center justify-between mb-4 mt-4">
                  <div className="flex items-center">
                    <FaClock className="h-3 w-3 mr-1" />
                    <span>
                      Turnaround: {request.labTest.turnaround_time_hours}h
                    </span>
                  </div>
                  <span
                    className={
                      request.labTest.is_fasting_required
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {request.labTest.is_fasting_required
                      ? "Fasting Required"
                      : "No Fasting"}
                  </span>
                </div>

                {/* Card Footer */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => toggleExpand(request.id)}
                    className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    {expandedCard === request.id ? (
                      <>
                        <FaChevronUp className="h-4 w-4 mr-2" />
                        Hide Insights
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="h-4 w-4 mr-2" />
                        View Insights
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      downloadReport(request.pdfLink, request.requestId)
                    }
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <FaFilePdf className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-700">
                Showing <span className="font-bold">{testRequests.length}</span>{" "}
                completed test requests
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {formatDate(new Date().toISOString())}
              </p>
            </div>
            <div className="flex items-center text-green-700 font-medium">
              <FaCheckCircle className="h-5 w-5 mr-2" />
              <span>
                All tests have been completed and results are available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteRequestPage;
