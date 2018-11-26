import axios from 'axios'  
  
axios.defaults.baseURL = 'http://localhost:8080';  
  
  
export const requestLogin = params => { return axios.post('/login', params).then(res => res.data) }  
