import { useState, useEffect } from "react";

const HttpErrorHandler =  httpClient => {
  const [error, setError] = useState(null);
  const requestInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const responseInterceptor = httpClient.interceptors.response.use(
    res => res,
    error => {
      setError(error);
      console.log('With Error Handler: ', error);
      return Promise.reject(error);
    },
  );
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [httpClient.interceptors.request, httpClient.interceptors.response, requestInterceptor, responseInterceptor]);

  const errorConfirmHandler = () => {
    setError(null);
  };

  return [error, errorConfirmHandler];
};

export default HttpErrorHandler;