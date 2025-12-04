import type { AxiosInstance } from "axios";

// types/labRequest.ts
export interface LabRequest {
  id: string;
  patientId: string;
  testId: string;
  requestId: string;
  priority: "URGENT" | "NON_URGENT";
  clinicalNotes: string;
  status: string;
  collectionLocation: string;
  patientVerification: boolean;
  isSampleCollected: boolean;
  paymentMethod: string;
  isPaid: boolean;
  aiSuggestion?: string;
  pdfLink?: string;
  collectionTimeSlot: string;
  resultValue: string | null;
  resultUnit: string | null;
  referenceRange: string | null;
  remarks: string | null;
  resultDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LabRequestsResponse {
  success: boolean;
  statusCode: number;
  data: LabRequest[];
}

export interface SingleLabRequestResponse {
  success: boolean;
  statusCode: number;
  data: LabRequest;
}

export interface AISuggestionRequest {
  testRequestId: string;
}

export interface GeneratePDFRequest {
  testRequestId: string;
}

export const fetchLabRequests = async (
  axiosPrivate: AxiosInstance
): Promise<LabRequestsResponse> => {
  try {
    const response = await axiosPrivate.get("/api/v1/lab-staff/sending-lab");
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

// Fetch single record
export const fetchSingleLabRequests = async (
  labTestId: string,
  axiosPrivate: AxiosInstance
): Promise<SingleLabRequestResponse> => {
  try {
    const response = await axiosPrivate.get(
      `/api/v1/lab-staff/sending-lab/${labTestId}`
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

// Result Update
export const updateTestResult = async (
  labTestId: string,
  reqData: {
    resultValue: string;
    resultUnit: string;
    referenceRange: string;
    remarks: string;
  },
  axiosPrivate: AxiosInstance
): Promise<any> => {
  try {
    const response = await axiosPrivate.put(
      `/api/v1/lab-staff/${labTestId}/result`,
      JSON.stringify(reqData)
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

// Get AI suggestion
export const getAiSuggestion = async (
  labTestId: string,
  reqData: {
    resultValue: string | null;
    resultUnit: string | null;
    referenceRange: string | null;
    remarks: string | null;
  },
  axiosPrivate: AxiosInstance
): Promise<any> => {
  try {
    console.log("calling api");
    const response = await axiosPrivate.put(
      `/api/v1/lab-staff/${labTestId}/ai-suggestion`,
      JSON.stringify(reqData)
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

// Complete test request
export const completeTestRequest = async (
  labTestId: string,
  axiosPrivate: AxiosInstance
): Promise<any> => {
  try {
    const response = await axiosPrivate.put(
      `/api/v1/lab-staff/${labTestId}/complete`
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

export const getAllCompleteTestRequest = async (
  axiosPrivate: AxiosInstance
): Promise<any> => {
  try {
    const response = await axiosPrivate.get(`/api/v1/lab-staff/complete`);
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
