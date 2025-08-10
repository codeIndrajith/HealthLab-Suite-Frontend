import type { AxiosInstance } from "axios";
import type { LabTestSchemaType } from "../../../schema/doctor/lab-test/labTestSchema";

interface CreateLabTestParams {
  formData: LabTestSchemaType;
  axiosPrivate: AxiosInstance;
}

interface getLabTestsParams {
  axiosPrivate: AxiosInstance;
}

interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Test {
  id: string;
  categoryId: string;
  code: string;
  name: string;
  decription: string;
  preparation_instructions: string;
  turnaround_time_hours: number;
  is_fasting_required: boolean;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface LabTestResponse {
  success: boolean;
  statusCode: number;
  data: Test[];
}

export interface LabTestOneResponse {
  success: boolean;
  statusCode: number;
  data: Test;
}

interface getLabTestParams {
  testId: string;
  axiosPrivate: AxiosInstance;
}

interface deleteTestParams {
  testId: string;
  axiosPrivate: AxiosInstance;
}

interface updateTestParams {
  formData: LabTestSchemaType;
  testId: string;
  axiosPrivate: AxiosInstance;
}

// Create lab test
export const createLabTest = async ({
  formData,
  axiosPrivate,
}: CreateLabTestParams) => {
  try {
    const data = {
      categoryId: formData.categoryId,
      code: formData.code,
      name: formData.name,
      decription: formData.description,
      preparation_instructions: formData.preparationInstructions,
      turnaround_time_hours: formData.turnaroundTime,
      is_fasting_required: formData.fasting?.id,
      price: formData.price,
      isActive: true,
    };

    const response = await axiosPrivate.post(
      "/api/v1/doctors/lab-tests/new",
      JSON.stringify(data)
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

// Retrvice Lab Test
export const getLabTests = async ({ axiosPrivate }: getLabTestsParams) => {
  try {
    const response = await axiosPrivate.get<LabTestResponse>(
      "/api/v1/doctors/lab-tests"
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

// Retrvice single Lab Test
export const getLabTest = async ({
  testId,
  axiosPrivate,
}: getLabTestParams) => {
  try {
    const response = await axiosPrivate.get<LabTestOneResponse>(
      `/api/v1/doctors/lab-tests/${testId}`
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

export const updateTest = async ({
  formData,
  testId,
  axiosPrivate,
}: updateTestParams) => {
  try {
    const data = {
      categoryId: formData.categoryId,
      code: formData.code,
      name: formData.name,
      decription: formData.description,
      preparation_instructions: formData.preparationInstructions,
      turnaround_time_hours: formData.turnaroundTime,
      is_fasting_required: formData.fasting?.id,
      price: formData.price,
      isActive: true,
    };
    const response = await axiosPrivate.put(
      `/api/v1/doctors/lab-tests/${testId}/update`,
      JSON.stringify(data)
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

export const deleteTest = async ({
  testId,
  axiosPrivate,
}: deleteTestParams) => {
  try {
    const response = await axiosPrivate.delete(
      `/api/v1/doctors/lab-tests/${testId}/delete`
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
