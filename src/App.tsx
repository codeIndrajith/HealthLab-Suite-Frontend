import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";
import UnauthorizedPage from "./pages/401/UnauthorizedPage";
import OnboardingPage from "./pages/onboarding-page/OnboardingPage";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/auth/signin/SignInPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import PersistAuth from "./components/auth/PersisAuth";
import DoctorLayoutPage from "./pages/doctor-pages/DoctorLayoutPage";
import DoctorDashboardPage from "./pages/doctor-pages/pages/DoctorDashboardPage";
import DoctorLabTestMangePage from "./pages/doctor-pages/pages/DoctorLabTestMangePage";
import DoctorPatientTestManage from "./pages/doctor-pages/pages/DoctorPatientTestManage";
import DoctorViewAllLabTestPage from "./pages/doctor-pages/pages/DoctorViewAllLabTestPage";
import CollectionAgentLayoutPage from "./pages/collectionAgent-pages/CollectionAgentLayoutPage";
import ManageRequstsPage from "./pages/dashboard-pages/collection-agent/manage-requests/ManageRequstsPage";
import LabStaffLayoutPage from "./pages/lab-staff-pages/LabStaffLayoutPage";
import LabStaffTestManagePage from "./pages/lab-staff-pages/pages/LabStaffTestManagePage";
import LabStaffResultProcessPage from "./pages/lab-staff-pages/pages/LabStaffResultProcessPage";
import CompleteRequestPage from "./pages/dashboard-pages/collection-agent/complete-request/CompleteRequestPage";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<PersistAuth />}> */}

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PersistAuth />}>
          <Route index element={<HomePage />} />
          {/* Doctor Routes */}
          <Route path="/dashboard" element={<DoctorLayoutPage />}>
            <Route path="/dashboard/doctor" element={<DoctorDashboardPage />} />
            <Route
              path="/dashboard/doctor/lab-tests/new"
              element={<DoctorLabTestMangePage />}
            />
            <Route
              path="/dashboard/doctor/lab-tests/:testId/update"
              element={<DoctorLabTestMangePage />}
            />
            <Route
              path="/dashboard/doctor/lab-tests"
              element={<DoctorViewAllLabTestPage />}
            />
            <Route
              path="/dashboard/doctor/patient-tests"
              element={<DoctorPatientTestManage />}
            />
          </Route>

          {/* Collection Agent Route */}
          <Route
            path="/dashboard/collection-agent"
            element={<CollectionAgentLayoutPage />}
          >
            <Route
              path="/dashboard/collection-agent/manage-requests"
              element={<ManageRequstsPage />}
            />
          </Route>

          {/* Lab Staff Route */}
          <Route path="/dashboard/lab-staff" element={<LabStaffLayoutPage />}>
            <Route
              path="/dashboard/lab-staff/manage-requests"
              element={<LabStaffTestManagePage />}
            />

            <Route
              path="/dashboard/lab-staff/manage-requests/:testRequestId/results-process"
              element={<LabStaffResultProcessPage />}
            />

            <Route
              path="/dashboard/lab-staff/complete-requests"
              element={<CompleteRequestPage />}
            />
          </Route>
        </Route>

        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* 401 - Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 404 - Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
