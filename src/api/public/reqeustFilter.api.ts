import type { AxiosInstance } from "axios";

export interface LabTestCategory {
  id: string;
  name: string;
}

export interface LabTest {
  id: string;
  categoryId: string;
  code: string;
  name: string;
  decription: string; // typo in API response (should be "description")
  preparation_instructions: string;
  turnaround_time_hours: number;
  is_fasting_required: boolean;
  price: number;
  category: LabTestCategory;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  user_role: string;
}

export interface IPatientRequest {
  id: string;
  patientId: string;
  testId: string;
  requestId: string;
  priority: "URGENT" | "NON_URGENT" | string;
  clinicalNotes: string;
  status:
    | "INCOMPLETE"
    | "COLLECTED_SAMPLE"
    | "SENDING_LAB"
    | "PENDING"
    | "COMPLETE"
    | string;
  collectionLocation: string;
  collectionTimeSlot: string;
  aiSuggestion: string;
  pdfLink: string;
  patientVerification: boolean;
  isSampleCollected: boolean;
  paymentMethod: "CASH" | "CARD" | string;
  labTest: LabTest;
  patient: Patient;
}

interface CollectSampleParams {
  testRequestId: string;
  axiosPrivate: AxiosInstance;
}

interface PatientRequestFilterParams {
  reqeustId: string;
  axiosPrivate: AxiosInstance;
}

export const patientRequestFilter = async ({
  reqeustId,
  axiosPrivate,
}: PatientRequestFilterParams) => {
  try {
    const response = await axiosPrivate.get(
      `/api/v1/lab-test?requestId=${reqeustId}`
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

export const collectSample = async ({
  testRequestId,
  axiosPrivate,
}: CollectSampleParams) => {
  try {
    const response = await axiosPrivate.put(
      `/api/v1/collection-agents/samples/${testRequestId}/collected`
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

export const sendLabToTheRequest = async ({
  testRequestId,
  axiosPrivate,
}: CollectSampleParams) => {
  try {
    const response = await axiosPrivate.put(
      `/api/v1/collection-agents/samples/${testRequestId}/sent-lab`
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
