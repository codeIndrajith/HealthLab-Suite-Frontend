import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "../../../components/Breadcrumb";
import ProgressBar from "../../../components/ProgressBar";
import SectionBanner from "../../../components/SectionBanner";
import type { ResultFormSchemaType } from "../../../schema/lab-staff/labTestReqSchema";
import { updateTestResult } from "../../../api/lab-staff/labRequestService";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ResultForm from "../../../forms/lab-staff/ResultForm";
import AISuggestionStep from "../components/AISuggestionStep";
import CompleteRequestStep from "../components/CompleteRequestStep";

const LabStaffResultProcessPage: React.FC = () => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { testRequestId } = params;
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);

  const updateResultMutation = useMutation({
    mutationFn: (data: ResultFormSchemaType) =>
      updateTestResult(testRequestId!, data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testRequest", testRequestId],
      });
      setCurrentStep(2);
    },
  });

  const handleResultSubmit = async (data: ResultFormSchemaType) => {
    await updateResultMutation.mutateAsync(data);
  };

  const handleAISuggestionComplete = () => {
    setCurrentStep(3);
  };

  const handleRequestComplete = () => {
    // You can add any completion logic here, like showing a success message
    // or redirecting to another page
    console.log("Request process completed!");
  };

  if (!testRequestId) {
    return (
      <div className="py-8 px-6 md:px-16 h-full overflow-y-auto">
        <div className="text-center text-red-600">Invalid test request ID</div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 md:px-16 h-full overflow-y-auto">
      <div className="mb-8">
        <Breadcrumb
          items={[
            {
              label: "Manage Request",
              path: "/dashboard/lab-staff/manage-requests",
            },
            { label: "Result Process" },
          ]}
        />
      </div>

      <ProgressBar currentStep={currentStep} />

      <div className="w-full h-full">
        {currentStep === 1 && (
          <div>
            <SectionBanner
              title="Fill Result Details"
              description="Enter the laboratory test results with appropriate values, units, reference ranges, and clinical remarks."
              step={1}
            />
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <ResultForm
                onSubmit={handleResultSubmit}
                isLoading={updateResultMutation.isPending}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <SectionBanner
              title="AI Clinical Suggestion"
              description="Get AI-powered insights and interpretations based on the test results and clinical context."
              step={2}
            />
            <AISuggestionStep
              testRequestId={testRequestId}
              onComplete={handleAISuggestionComplete}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <SectionBanner
              title="Complete Request"
              description="Generate the final PDF report and send it to the patient to complete the test request process."
              step={3}
            />
            <CompleteRequestStep
              testRequestId={testRequestId}
              onComplete={handleRequestComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LabStaffResultProcessPage;
