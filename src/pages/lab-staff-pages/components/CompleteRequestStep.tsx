import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TestRequestDetails from "./TestRequestDetails";
import TestRequestSkeleton from "./TestRequestSkeleton";
import { FaFilePdf, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  completeTestRequest,
  fetchSingleLabRequests,
} from "../../../api/lab-staff/labRequestService";

interface CompleteRequestStepProps {
  testRequestId: string;
  onComplete: () => void;
}

const CompleteRequestStep: React.FC<CompleteRequestStepProps> = ({
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

  const generatePDFMutation = useMutation({
    mutationFn: () => completeTestRequest(testRequestId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testRequest", testRequestId],
      });
    },
  });

  const handleGeneratePDF = async () => {
    await generatePDFMutation.mutateAsync();
    onComplete();
  };

  if (isLoading) {
    return <TestRequestSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <FaCheckCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
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

  const hasPDF = !!testRequest?.data.pdfLink;

  return (
    <div className="space-y-6">
      <TestRequestDetails
        testRequest={testRequest?.data}
        showAISuggestion={true}
      />

      {!hasPDF ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
          <FaFilePdf className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Complete Test Request
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Generate the final PDF report and automatically send it to the
            patient via email. This will complete the test request process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGeneratePDF}
              disabled={generatePDFMutation.isPending}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {generatePDFMutation.isPending ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating PDF...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaFilePdf className="w-4 h-4 mr-2" />
                  Generate PDF & Send Email
                </span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Request Completed Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            The PDF report has been generated and sent to the patient via email.
          </p>
          {testRequest?.data.pdfLink && (
            <a
              href={testRequest?.data.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <FaFilePdf className="w-4 h-4 mr-2" />
              View Generated PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default CompleteRequestStep;
