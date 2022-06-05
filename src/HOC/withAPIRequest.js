import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';

export function withAPIRequest(Component) {
  const WithAPIRequest = (props) => {
    const fetchAPI = (
      { url, method, headers = null, body = null, setLoading },
      callback
    ) => {
      // console.log('[fetchAPI]', url, method, headers, body);
      setLoading(true);
      axios({
        url: url,
        method: method,
        baseURL: BASE_URL,
        headers: headers,
        data: body,
      })
        .then((res) => {
          callback(null, res.data);
        })
        .catch((err) => {
          callback(new Error(err));
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return <Component {...props} fetchAPI={fetchAPI} />;
  };

  return WithAPIRequest;
}
