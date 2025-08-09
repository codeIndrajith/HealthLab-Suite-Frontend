import { email } from "zod";
import type { SignInSchemaType } from "../../schema/auth/signInSchema";
import type { AxiosInstance } from "axios";

interface UserSigninParams {
  formData: SignInSchemaType;
  axiosPrivate: AxiosInstance;
}
// User sign in
export const userSignin = async ({
  formData,
  axiosPrivate,
}: UserSigninParams) => {
  try {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const response = await axiosPrivate.post(
      "/api/v1/auth/signin",
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

// auth user profile
export const authUserProfile = async (axiosPrivate: AxiosInstance) => {
  try {
    const response = await axiosPrivate.get("/api/v1/auth/profile");
    return response.data;
  } catch (error: any) {
    let errMsg: string = error.response.data.error;
    if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
