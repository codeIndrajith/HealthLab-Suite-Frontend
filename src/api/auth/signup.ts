import type { AxiosInstance } from "axios";
import type { SignUpSchemaType } from "../../schema/auth/signupSchema";

interface UserSigninParams {
  formData: SignUpSchemaType;
  axiosPrivate: AxiosInstance;
}
// User sign in
export const userSignup = async ({
  formData,
  axiosPrivate,
}: UserSigninParams) => {
  try {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "Doctor",
    };

    const response = await axiosPrivate.post(
      "/api/v1/auth/signup",
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
