import axios from 'axios';
import Cookies from 'js-cookie'

export const getAuth = () => {
  return axios({
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + Cookies.get('access_token') },
    url: 'http://127.0.0.1:8000/accounts/user/auth/',
  });
}