import React, { useState } from "react";
import RequestFilter from "./components/RequestFilter";
import ReqestsTable from "./components/ReqestsTable";
import type { IPatientRequest } from "../../../../api/public/reqeustFilter.api";

const ManageRequstsPage: React.FC = () => {
  const [filteredData, setFilteredData] = useState<IPatientRequest | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="py-8 px-6 md:px-16 overflow-y-auto">
      {/* Filter Section */}
      <div>
        <RequestFilter
          setFilteredData={setFilteredData}
          setIsLoading={setIsLoading}
        />
      </div>

      {/* Request data show table section */}
      <div className="mt-6">
        <ReqestsTable isLoading={isLoading} filteredData={filteredData} />
      </div>
    </div>
  );
};

export default ManageRequstsPage;
