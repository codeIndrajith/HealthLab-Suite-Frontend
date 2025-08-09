import { useEffect } from "react";

import { axiosPrivate } from "../config/axios";

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      async (req) => {
        const accessToken = localStorage.getItem("token") || null;
        if (!req.headers["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return req;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosPrivate.interceptors.request.eject(requestInterceptor);
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
