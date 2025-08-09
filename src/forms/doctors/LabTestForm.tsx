"use client";

import type React from "react";

import { useState } from "react";
import { BiChevronDown, BiSave } from "react-icons/bi";

interface LabTestForm {
  categoryId: string;
  code: string;
  name: string;
  description: string;
  preparation_instructions: string;
  turnaround_time_hours: number;
  is_fasting_required: boolean;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a001", name: "Blood Tests" },
  { id: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a002", name: "Urine Tests" },
  { id: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a003", name: "Imaging Tests" },
  { id: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a004", name: "Cardiac Tests" },
  { id: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a005", name: "Metabolic Tests" },
];

export default function LabTestForm() {
  const [formData, setFormData] = useState<LabTestForm>({
    categoryId: "8a4e2b01-1f34-4d3a-9f1a-7d2b36a6a001",
    code: "BT-001",
    name: "Complete Blood Count (CBC)",
    description:
      "Measures red and white blood cells, platelets, hemoglobin, and hematocrit.",
    preparation_instructions:
      "No special preparation needed unless instructed.",
    turnaround_time_hours: 24,
    is_fasting_required: false,
    price: 1500.0,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<LabTestForm>>({});

  const handleInputChange = (
    field: keyof LabTestForm,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.categoryId
  );

  return (
    <div className="bg-white overflow-y-auto">
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
      <form onSubmit={handleSubmit} className="p-8 sm:px-16 sm:py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Test Category *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 text-left bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.categoryId
                    ? "border-red-500"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <span className="block truncate">
                  {selectedCategory
                    ? selectedCategory.name
                    : "Select a category"}
                </span>
                <BiChevronDown
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        handleInputChange("categoryId", category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 ${
                        formData.categoryId === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Test Code */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Test Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.code
                  ? "border-red-500"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              placeholder="Enter test code (e.g., BT-001)"
            />
          </div>
        </div>

        {/* Test Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Test Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
            placeholder="Enter test name"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
            placeholder="Describe what this test measures"
          />
        </div>

        {/* Preparation Instructions */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Preparation Instructions *
          </label>
          <textarea
            value={formData.preparation_instructions}
            onChange={(e) =>
              handleInputChange("preparation_instructions", e.target.value)
            }
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
              errors.preparation_instructions
                ? "border-red-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
            placeholder="Enter preparation instructions for patients"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Turnaround Time */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Turnaround Time (Hours) *
            </label>
            <input
              type="number"
              value={formData.turnaround_time_hours}
              onChange={(e) =>
                handleInputChange(
                  "turnaround_time_hours",
                  Number.parseInt(e.target.value) || 0
                )
              }
              min="1"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.turnaround_time_hours
                  ? "border-red-500"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              placeholder="24"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Price ($) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                handleInputChange(
                  "price",
                  Number.parseFloat(e.target.value) || 0
                )
              }
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.price
                  ? "border-red-500"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              placeholder="1500.00"
            />
          </div>

          {/* Fasting Required */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Fasting Required
            </label>
            <div className="flex items-center space-x-4 pt-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="fasting"
                  checked={formData.is_fasting_required === true}
                  onChange={() =>
                    handleInputChange("is_fasting_required", true)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                    formData.is_fasting_required === true
                      ? "border-blue-500 bg-gradient-to-r from-blue-600 to-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {formData.is_fasting_required === true && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="fasting"
                  checked={formData.is_fasting_required === false}
                  onChange={() =>
                    handleInputChange("is_fasting_required", false)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                    formData.is_fasting_required === false
                      ? "border-blue-500 bg-gradient-to-r from-blue-600 to-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {formData.is_fasting_required === false && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <BiSave className="w-5 h-5" />
            Save Lab Test
          </button>
        </div>
      </form>
    </div>
  );
}
