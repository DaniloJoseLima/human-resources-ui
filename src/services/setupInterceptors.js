import axiosInstance from "./api";
import TokenService from "./token.service";


const setup = async (store) => {
  debugger
  axiosInstance.interceptors.request.use(async (config) => {
    const token = await TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      if (originalConfig.url !== "/login" && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;          
          store.dispatch('auth/logout')
          window.location = '#/'
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setup;
