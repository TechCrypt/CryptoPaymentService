import axios from 'axios'
import { apiBaseUrl } from '../app.config'


export const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Security-Policy': 'connect-src "https://jsonplaceholder.typicode.com/"'
  }

})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

// instance.interceptors.response.use(
//   (value) => value.data,
//   (error) => {
//     console.log(error);
//     return error;
//   });
