import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import LabTestCard from "../components/LabTestCard";
import { LAB_TEST } from "../../../queris/public.queries";
import {
  getLabTests,
  type LabTestResponse,
  type Test,
} from "../../../api/doctor/lab-tests/labTest.api";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// Main Component
const DoctorViewAllLabTestPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const axiosPrivate = useAxiosPrivate();

  const {
    data: labTests,
    isLoading,
    error,
  } = useQuery({
    queryKey: [LAB_TEST],
    queryFn: () => getLabTests({ axiosPrivate }),
  });

  // Filter lab tests based on search term and category
  const filteredLabTests = React.useMemo(() => {
    if (labTests?.success === false) return [];

    return labTests?.data?.filter((test: Test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.decription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || test.category.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [labTests, searchTerm, selectedCategory]);

  // Get unique categories for filter
  const categories = React.useMemo(() => {
    if (!labTests) return [];
    return Array.from(
      new Set(labTests?.data.map((test: Test) => test.category.name))
    );
  }, [labTests]);

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto pb-24">
      {isLoading ? (
        <div className=" px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Skeleton */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md pl-10"></div>
                </div>
              </div>

              {/* Category Filter Skeleton */}
              <div className="sm:w-64">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md pl-10"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-40"></div>
          </div>

          {/* Lab Tests Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-green-600 py-8 px-6 md:px-16">
            <h1 className="text-3xl font-bold text-white mb-2">
              Lab Tests Management
            </h1>
            <p className="text-white">
              Manage and view all available lab tests
            </p>
          </div>

          <div className=" px-4 sm:px-6 lg:px-16 py-8">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search lab tests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="sm:w-64">
                  <div className="relative">
                    <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={index + 1} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Tests Grid */}
            {filteredLabTests?.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    No lab tests found
                  </h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLabTests?.map((labTest: any) => (
                  <LabTestCard key={labTest.id} labTest={labTest} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorViewAllLabTestPage;
