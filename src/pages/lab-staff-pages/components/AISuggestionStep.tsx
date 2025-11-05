import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TestRequestDetails from "./TestRequestDetails";
import TestRequestSkeleton from "./TestRequestSkeleton";
import { FaRobot, FaExclamationTriangle } from "react-icons/fa";
import {
  fetchSingleLabRequests,
  getAiSuggestion,
} from "../../../api/lab-staff/labRequestService";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

interface AISuggestionStepProps {
  testRequestId: string;
  onComplete: () => void;
}

const AISuggestionStep: React.FC<AISuggestionStepProps> = ({
  testRequestId,
  onComplete,
}) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: testRequest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testRequest", testRequestId],
    queryFn: () => fetchSingleLabRequests(testRequestId, axiosPrivate),
  });

  const reqData = testRequest?.data
    ? {
        resultValue: testRequest.data.resultValue,
        resultUnit: testRequest.data.resultUnit,
        referenceRange: testRequest.data.referenceRange,
        remarks: testRequest.data.remarks,
      }
    : null;

  const aiSuggestionMutation = useMutation({
    mutationFn: () => {
      if (!reqData) {
        throw toast.error("Test request data is not available");
      }
      return getAiSuggestion(testRequestId, reqData, axiosPrivate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testRequest", testRequestId],
      });
    },
  });

  const handleGetAISuggestion = async () => {
    await aiSuggestionMutation.mutateAsync();
  };

  if (isLoading) {
    return <TestRequestSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error Loading Test Request
        </h3>
        <p className="text-red-600">
          Failed to load test request details. Please try again.
        </p>
      </div>
    );
  }

  if (!testRequest) {
    return null;
  }

  const hasAISuggestion = !!testRequest.data?.aiSuggestion;

  return (
    <div className="space-y-6">
      <TestRequestDetails
        testRequest={testRequest?.data}
        showAISuggestion={hasAISuggestion}
      />

      {!hasAISuggestion ? (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 text-center">
          <FaRobot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Get AI-Powered Clinical Insights
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our AI will analyze the test results along with clinical notes to
            provide intelligent suggestions and interpretations to assist in
            diagnosis.
          </p>
          <button
            onClick={handleGetAISuggestion}
            disabled={aiSuggestionMutation.isPending}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiSuggestionMutation.isPending ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating AI Suggestion...
              </span>
            ) : (
              "Generate AI Suggestion"
            )}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
          >
            Continue to Final Step
          </button>
        </div>
      )}
    </div>
  );
};

export default AISuggestionStep;
