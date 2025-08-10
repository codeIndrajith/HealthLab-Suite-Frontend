import {
  FiClock,
  FiDollarSign,
  FiEdit3,
  FiEye,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import {
  deleteTest,
  type Test,
} from "../../../api/doctor/lab-tests/labTest.api";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LAB_TEST } from "../../../queris/public.queries";

// Lab Test Card Component
const LabTestCard: React.FC<{ labTest: Test }> = ({ labTest }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [testId, setTestId] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const handleEdit = (id: string) => {
    navigate(`/dashboard/doctor/lab-tests/${id}/update`);
  };

  const deleteMutation = useMutation({
    mutationFn: (testId: string) => deleteTest({ testId, axiosPrivate }),
    onSuccess: () => {
      toast.success("Test deleted successfully");
      setIsModalOpen(false);
      // Invalidate and refetch the tests query
      queryClient.invalidateQueries({
        queryKey: [LAB_TEST], // Use your actual query key here
      });
    },
    onError: () => {
      toast.error("Failed to delete test");
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate(labTest.id);
  };

  return (
    <div className="bg-white h-full rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {labTest?.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {labTest.code}
              </span>
              <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                {labTest.category.name}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {labTest.decription}
        </p>

        {/* Key Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-green-600 w-4 h-4" />
            <span className="text-sm text-gray-600">Price:</span>
            <span className="text-sm font-semibold text-gray-900">
              ${labTest.price}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-blue-600 w-4 h-4" />
            <span className="text-sm text-gray-600">TAT:</span>
            <span className="text-sm font-semibold text-gray-900">
              {labTest.turnaround_time_hours}h
            </span>
          </div>
        </div>

        {/* Fasting Required */}
        {labTest.is_fasting_required && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Fasting Required
            </span>
          </div>
        )}

        {/* Preparation Instructions */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">
            Preparation Instructions:
          </p>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md">
            {labTest.preparation_instructions}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Created: {new Date(labTest.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(labTest.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors duration-200"
            >
              <FiEdit3 className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setTestId(labTest?.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200"
            >
              <FiTrash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          {/* Overlay with blur effect */}
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Deletion
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{labTest.name}</span>? This
                action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="animate-spin">...</span>
                  ) : (
                    <FiTrash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LabTestCard;
