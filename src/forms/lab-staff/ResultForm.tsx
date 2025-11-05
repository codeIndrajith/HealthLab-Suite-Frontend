import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resultFormSchema,
  type ResultFormSchemaType,
} from "../../schema/lab-staff/labTestReqSchema";
import HIMSTextField from "../../components/inputs/HIMSTextField";
import { ImLab } from "react-icons/im";
import { MdNotes, MdScience } from "react-icons/md";
import { BiAbacus } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";

interface ResultFormProps {
  onSubmit: (data: ResultFormSchemaType) => void;
  initialData?: Partial<ResultFormSchemaType>;
  isLoading?: boolean;
}

const ResultForm: React.FC<ResultFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultFormSchemaType>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <HIMSTextField
            Icon={MdScience}
            displayLabel="Result Value"
            isRequired
            placeholderText="Enter Result Value"
            {...register("resultValue")}
            error={errors?.resultValue?.message?.toString()}
          />
        </div>

        <div>
          <HIMSTextField
            Icon={BiAbacus}
            displayLabel="Result Unit"
            isRequired
            placeholderText="Enter Result Unit"
            {...register("resultUnit")}
            error={errors?.resultUnit?.message?.toString()}
          />
        </div>

        <div className="md:col-span-2">
          <HIMSTextField
            Icon={FaChartLine}
            displayLabel="ReferenceRange"
            isRequired
            placeholderText="Enter ReferenceRange"
            {...register("referenceRange")}
            error={errors?.referenceRange?.message?.toString()}
          />
        </div>

        <div className="md:col-span-2">
          <HIMSTextField
            Icon={MdNotes}
            displayLabel="Remarks"
            isRequired
            placeholderText="Enter Remarks"
            {...register("remarks")}
            error={errors?.remarks?.message?.toString()}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Result & Continue"}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
