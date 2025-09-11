import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiFilter, FiX, FiLoader } from "react-icons/fi";
import HIMSTextField from "../../../../../components/inputs/HIMSTextField";
import { FaHospital } from "react-icons/fa";
import { patientRequestFilter } from "../../../../../api/public/reqeustFilter.api";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { REQUST_FILTER } from "../../../../../queris/public.queries";
import toast from "react-hot-toast";

// Zod schema for validation
export const filterSchema = z.object({
  requestId: z.string().min(1, "Request ID is required"),
});

export type FilterValues = z.infer<typeof filterSchema>;

interface RequestFilterProps {
  setFilteredData: any;
  setIsLoading?: any;
}

const RequestFilter: React.FC<RequestFilterProps> = ({
  setFilteredData,
  setIsLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      requestId: "",
    },
  });

  const requestId = watch("requestId");

  const {
    // data: patientRequest,
    isLoading: loadingFilter,
    refetch,
  } = useQuery({
    queryKey: [REQUST_FILTER, requestId],
    queryFn: () =>
      patientRequestFilter({
        reqeustId: requestId!,
        axiosPrivate,
      }),
    enabled: false,
  });

  const onSubmit = () => {
    setIsLoading(true);
    refetch()
      .then((result) => {
        if (result.data?.success) {
          setFilteredData(result.data.data[0]);
        }
      })
      .catch((error: any) => {
        toast.error(error?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    reset();
    clearErrors();
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <HIMSTextField
              Icon={FaHospital}
              displayLabel="Request Id"
              placeholderText="Enter Patient Request Id"
              classNames="text-xs"
              {...register("requestId")}
              error={errors?.requestId?.message?.toString()}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loadingFilter}
              className="flex items-center text-xs gap-2 px-4 py-2 bg-blue-500 text-white rounded-sm cursor-pointer"
            >
              {loadingFilter ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Filtering...</span>
                </>
              ) : (
                <>
                  <FiFilter className="w-4 h-4" />
                  <span>Apply Filter</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex text-xs items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestFilter;
