import axiosInstance from "./api";
import TokenService from "./token.service";


const setup = (store) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}` ;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => { 
      const originalConfig = error.config;
      if (originalConfig.url !== "/auth" && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;  
          try {
            const refreshToken =  TokenService.getLocalRefreshToken()                                
            const rs = await axiosInstance.post('/auth/refresh-token', { refreshToken })
            const { accessToken } = rs.data;

            store.dispatch('auth/refresh-token', accessToken)
            TokenService.updateLocalAccessToken(accessToken)

            return axiosInstance(originalConfig)
          } catch (_error) {                        
            store.dispatch('auth/logout')
            window.location = '#/'             
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setup;
