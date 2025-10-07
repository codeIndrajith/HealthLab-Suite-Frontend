import React from "react";
import ManageRequstsPage from "../../dashboard-pages/collection-agent/manage-requests/ManageRequstsPage";

const DoctorPatientTestManage: React.FC = () => {
  return (
    <div className="py-8 px-6 md:px-16 overflow-y-auto h-full">
      <ManageRequstsPage />
    </div>
  );
};

export default DoctorPatientTestManage;
