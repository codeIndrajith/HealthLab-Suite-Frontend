import React from "react";
import { FaExclamationTriangle, FaCheckCircle, FaClock } from "react-icons/fa";
import type { LabRequest } from "../../../api/lab-staff/labRequestService";

interface TestRequestDetailsProps {
  testRequest: LabRequest;
  showAISuggestion?: boolean;
}

const TestRequestDetails: React.FC<TestRequestDetailsProps> = ({
  testRequest,
  showAISuggestion = false,
}) => {
  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      URGENT: "bg-red-100 text-red-800 border-red-200",
      HIGH: "bg-orange-100 text-orange-800 border-orange-200",
      MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
      LOW: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          priorityStyles[priority as keyof typeof priorityStyles]
        }`}
      >
        {priority === "URGENT" && (
          <FaExclamationTriangle className="w-3 h-3 mr-1" />
        )}
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
        <FaClock className="w-3 h-3 mr-1" />
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Request Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Request ID</span>
              <p className="font-mono text-gray-900">{testRequest.requestId}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Priority</span>
              <div className="mt-1">
                {getPriorityBadge(testRequest.priority)}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <div className="mt-1">{getStatusBadge(testRequest.status)}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Clinical Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Clinical Notes</span>
              <p className="text-gray-900 mt-1">{testRequest.clinicalNotes}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Sample Collected</span>
              <div className="mt-1">
                {testRequest.isSampleCollected ? (
                  <span className="inline-flex items-center text-green-600">
                    <FaCheckCircle className="w-4 h-4 mr-1" />
                    Yes
                  </span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Test Results
          </h3>
          <div className="space-y-3">
            {testRequest.resultValue && (
              <>
                <div>
                  <span className="text-sm text-gray-500">Result</span>
                  <p className="text-xl font-bold text-gray-900">
                    {testRequest.resultValue} {testRequest.resultUnit}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Reference Range</span>
                  <p className="text-gray-900">{testRequest.referenceRange}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Remarks</span>
                  <p className="text-gray-900">{testRequest.remarks}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showAISuggestion && testRequest.aiSuggestion && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            AI Suggestion
          </h3>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-900">{testRequest.aiSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestRequestDetails;
