import type { AxiosInstance } from "axios";

interface GetAllTestCategoriesParams {
  axiosPrivate: AxiosInstance;
}

export const getAllTestCategories = async ({
  axiosPrivate,
}: GetAllTestCategoriesParams) => {
  try {
    const response = await axiosPrivate.get("/api/v1/test-categories");
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
