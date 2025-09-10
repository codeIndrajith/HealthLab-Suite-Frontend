import React, { useState } from "react";
import HIMSTextField from "../../../components/inputs/HIMSTextField";
import { FaUser, FaUserLock } from "react-icons/fa";
import HIMSEmailField from "../../../components/inputs/HIMSEmailField";
import { MdEmail } from "react-icons/md";
import HIMSPasswordField from "../../../components/inputs/HIMSPasswordField";
import { useForm } from "react-hook-form";
import {
  signUpSchema,
  type SignUpSchemaType,
} from "../../../schema/auth/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../../api/auth/signup";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../redux/reactReduxTypedHooks";
import { setAuthUser } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "Doctor",
    },
  });

  const selectedRole = watch("role");

  const signUpHandler = async (data: SignUpSchemaType) => {
    setIsLoading(true);
    try {
      const response = await userSignup({ formData: data, axiosPrivate });
      if (response.success) {
        const token = response?.token ?? "";
        localStorage.setItem("token", token);
        const authData = {
          id: response.user?.id,
          name: response.user?.name,
          email: response.user?.email,
          user_role: response.user?.user_role,
        };
        dispatch(setAuthUser(authData));
        if (response?.user.user_role === "Doctor") {
          navigate("/dashboard/doctor");
        } else if (response?.user.user_role === "CollectionAgent") {
          navigate("/dashboard/collection-agent");
        } else {
          navigate("/dashboard/lab-staf");
        }
        toast.success("Sign Up Complete");
      }
    } catch (error: any) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LabFlow
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Sign In Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to your LabFlow account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(signUpHandler)} className="space-y-6">
              {/* Name */}
              <div>
                <HIMSTextField
                  Icon={FaUser}
                  displayLabel="Name"
                  isRequired
                  placeholderText="Enter Name"
                  {...register("name")}
                  error={errors.name?.message?.toString()}
                />
              </div>
              {/* Email Field */}
              <div>
                <HIMSEmailField
                  Icon={MdEmail}
                  displayLabel="Email"
                  isRequired
                  placeholderText="Enter Email"
                  {...register("email")}
                  error={errors.email?.message?.toString()}
                />
              </div>

              {/* Password Field */}
              <div>
                <HIMSPasswordField
                  Icon={FaUserLock}
                  isRequired
                  placeholderText="Enter Password"
                  {...register("password")}
                  error={errors.password?.message?.toString()}
                />
              </div>

              {/* Role Selection - Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["Doctor", "CollectionAgent", "LabStaff"].map((role) => (
                    <div key={role} className="flex items-center">
                      <input
                        type="radio"
                        id={role}
                        value={role}
                        {...register("role", {
                          required: "Please select a role",
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={role}
                        className={`ml-2 block text-sm font-medium cursor-pointer rounded-lg px-3 py-2 w-full ${
                          selectedRole === role
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "text-gray-700 bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {role === "CollectionAgent"
                          ? "Collection Agent"
                          : role === "LabStaff"
                          ? "Lab Staff"
                          : role}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link
                  to="/signin"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
