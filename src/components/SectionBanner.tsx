import React from "react";

interface SectionBannerProps {
  title: string;
  description: string;
  step: number;
}

const SectionBanner: React.FC<SectionBannerProps> = ({
  title,
  description,
  step,
}) => {
  const gradientClass =
    step === 1
      ? "from-blue-500 to-cyan-500"
      : step === 2
      ? "from-purple-500 to-pink-500"
      : "from-green-500 to-emerald-500";

  return (
    <div
      className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-6 text-white mb-8 shadow-lg`}
    >
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center mr-3">
          <span className="font-bold text-sm">{step}</span>
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-blue-50 opacity-90">{description}</p>
    </div>
  );
};

export default SectionBanner;
