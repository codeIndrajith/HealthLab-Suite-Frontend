import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../redux/reactReduxTypedHooks";
import { authUserProfile } from "../../api/auth/signin";
import { setAuthUser, logout } from "../../redux/slices/authSlice";
import { ImSpinner6 } from "react-icons/im";

const PersistAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await authUserProfile(axiosPrivate);
        if (response && response?.data?.user_role === "Doctor") {
          const authData = {
            id: response.data?.id,
            name: response.data?.name,
            email: response.data?.email,
            user_role: response.data?.user_role,
          };
          dispatch(setAuthUser(authData));
        } else {
          dispatch(logout());
          navigate("/");
          toast.error("Unauthorized");
        }
      } catch (error: any) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, navigate, axiosPrivate, location]);
  if (isLoading) {
    return (
      <div className="w-screen h-screen min-h-screen max-h-screen overflow-hidden flex items-center justify-center">
        <ImSpinner6 className="animate-spin size-24 text-blue-500" />
      </div>
    );
  }

  return <Outlet />;
};

export default PersistAuth;
