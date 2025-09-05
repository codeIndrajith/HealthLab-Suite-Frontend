"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import HIMSSelectField from "../../components/inputs/HIMSSelectField";
import { CiBeaker1 } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { TEST_CATEGORY } from "../../queris/public.queries";
import { getAllTestCategories } from "../../api/public/testCategory.api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HIMSTextField from "../../components/inputs/HIMSTextField";
import {
  FaCentercode,
  FaPrescriptionBottleAlt,
  FaRupeeSign,
  FaUtensils,
} from "react-icons/fa";
import { GrDocumentTest } from "react-icons/gr";
import HIMSTextareaField from "../../components/inputs/HIMSTextareaField";
import {
  MdOutlineAccessTimeFilled,
  MdOutlineDescription,
} from "react-icons/md";
import HIMSNumberField from "../../components/inputs/HIMSNumberField";
import HIMSRadioGroup from "../../components/inputs/HIMSRadioGroup";
import { Controller, useForm } from "react-hook-form";
import {
  labTestSchema,
  type LabTestSchemaType,
} from "../../schema/doctor/lab-test/labTestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLabTest,
  getLabTest,
  updateTest,
} from "../../api/doctor/lab-tests/labTest.api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export interface FastingOption {
  id: boolean;
  label: string;
}

export const fastingOptions: FastingOption[] = [
  { id: true, label: "Yes" },
  { id: false, label: "No" },
];

const LabTestForm: React.FC = () => {
  const params = useParams();
  const testId = params?.testId || null;
  const axiosPrivate = useAxiosPrivate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: testCategories, isLoading } = useQuery({
    queryKey: [TEST_CATEGORY],
    queryFn: () =>
      getAllTestCategories({
        axiosPrivate,
      }),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LabTestSchemaType>({
    resolver: zodResolver(labTestSchema),
    defaultValues: {
      categoryId: "",
      code: "",
      name: "",
      description: "",
      preparationInstructions: "",
      turnaroundTime: 0,
      price: 0,
      fasting: {
        id: false,
        label: "No",
      },
    },
  });

  useEffect(() => {
    if (testId === null) return;

    const fetchTestData = async () => {
      try {
        const fetchTest = await getLabTest({ testId, axiosPrivate });
        if (fetchTest) {
          reset({
            categoryId: fetchTest?.data?.categoryId,
            code: fetchTest?.data?.code,
            name: fetchTest?.data?.name,
            description: fetchTest?.data?.decription,
            preparationInstructions: fetchTest?.data?.preparation_instructions,
            turnaroundTime: fetchTest?.data?.turnaround_time_hours,
            price: fetchTest?.data?.price,
            fasting: {
              id: fetchTest?.data?.is_fasting_required,
              label:
                fetchTest?.data?.is_fasting_required === true ? "Yes" : "No",
            },
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch test data:", error);
      }
    };

    fetchTestData();
  }, [testId]);

  const testHandler = async (data: LabTestSchemaType) => {
    setIsSubmitting(true);
    try {
      if (testId === null) {
        const res = await createLabTest({ formData: data, axiosPrivate });
        if (res.success) {
          toast.success("Lab test create successfull");
          reset({
            categoryId: "",
            code: "",
            name: "",
            description: "",
            preparationInstructions: "",
            turnaroundTime: 0,
            price: 0,
            fasting: {
              id: false,
              label: "No",
            },
          });
        }
      } else {
        const res = await updateTest({ formData: data, testId, axiosPrivate });
        if (res.success) {
          toast.success("Lab test update successfull");
          navigate("/dashboard/doctor/lab-tests");
        }
      }
    } catch (error: any) {
      toast.error(error.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white h-screen overflow-y-auto pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 sm:px-16 sm:py-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create Lab Test For Patient
        </h1>
        <p className="text-blue-100">
          Configure and manage laboratory test parameters
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(testHandler)} className="p-8 sm:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Category Dropdown */}
          <div className="">
            {isLoading ? (
              <div className="flex flex-col gap-2 relative pb-5 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full" />
                  <div className="w-24 h-4 bg-gray-300 rounded" />
                </div>
                <div className="w-32 h-3 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded-md" />
                <div className="w-20 h-3 bg-gray-200 rounded absolute bottom-1 left-0" />
              </div>
            ) : (
              <HIMSSelectField
                Icon={CiBeaker1}
                displayLabel="Test Category"
                isRequired
                options={testCategories?.data}
                optionKey="id"
                optionValue="id"
                optionDisplayText="name"
                isDefaultOptionRequired
                defaultOptionText="--select lab test category--"
                {...register("categoryId")}
                error={errors.categoryId?.message?.toString()}
              />
            )}
          </div>

          {/* Test Code */}
          <div className="">
            <HIMSTextField
              Icon={FaCentercode}
              displayLabel="Test Code"
              placeholderText="Enter Test Code"
              isRequired
              {...register("code")}
              error={errors.code?.message?.toString()}
            />
          </div>

          {/* Test Name */}
          <div className="">
            <HIMSTextField
              Icon={GrDocumentTest}
              displayLabel="Test Name"
              placeholderText="Enter Test Name"
              isRequired
              {...register("name")}
              error={errors.name?.message?.toString()}
            />
          </div>

          <div className="md:col-span-3">
            {/* Description */}
            <div>
              <HIMSTextareaField
                Icon={MdOutlineDescription}
                displayLabel="Description"
                placeholderText="Enter Description"
                isRequired
                {...register("description")}
                error={errors.description?.message?.toString()}
              />
            </div>

            {/* Preparation Instructions */}
            <div>
              <HIMSTextareaField
                Icon={FaPrescriptionBottleAlt}
                displayLabel="Preparation Instructions"
                placeholderText="Enter Preparation Instructions"
                isRequired
                {...register("preparationInstructions")}
                error={errors.preparationInstructions?.message?.toString()}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            {/* Turnaround Time */}
            <div className="">
              <HIMSNumberField
                Icon={MdOutlineAccessTimeFilled}
                displayLabel="Turnaround Time"
                placeholderText="Enter Turnaround Time"
                min={0}
                isRequired
                extraInfo="(turnaround time (TAT) is the total duration from the ordering of a test, or the receipt of the sample at the lab, to the delivery of the final, verified report to the patient)"
                {...register("turnaroundTime", {
                  setValueAs: (value: string) => (value ? Number(value) : 0),
                })}
                error={errors.turnaroundTime?.message?.toString()}
              />
            </div>

            {/* Price */}
            <div className="">
              <HIMSNumberField
                Icon={FaRupeeSign}
                displayLabel="Price"
                placeholderText="Enter Price"
                min={0}
                isRequired
                {...register("price", {
                  setValueAs: (value: string) => (value ? Number(value) : 0),
                })}
                error={errors.price?.message?.toString()}
              />
            </div>

            {/* Fasting Required */}
            <div className="">
              <Controller
                name="fasting"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <HIMSRadioGroup
                    Icon={FaUtensils}
                    displayLabel="Fasting"
                    name="fasting"
                    options={fastingOptions}
                    optionKey="id"
                    displayKey="label"
                    onChange={onChange}
                    value={value}
                    error={errors.fasting?.message?.toString()}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 pb-12">
          <button
            type="submit"
            className="px-8 py-3 w-full sm:w-max flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <BiSave className="w-5 h-5" />
            {isSubmitting ? (
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
                please wait...
              </div>
            ) : (
              <>{testId === null ? "Save Lab Test" : "Update Lab Test"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LabTestForm;
