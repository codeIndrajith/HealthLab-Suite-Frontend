import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";
import UnauthorizedPage from "./pages/401/UnauthorizedPage";
import OnboardingPage from "./pages/onboarding-page/OnboardingPage";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/auth/signin/SignInPage";
import SignupPage from "./pages/auth/signup/SignupPage";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<PersistAuth />}> */}
        <Route index element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Helpdesk Dashboard Routes Group */}
        {/* {DoctorRoutesGroup()} */}

        {/* 401 - Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 404 - Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
