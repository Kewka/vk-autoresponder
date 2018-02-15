import axios from 'axios'
import qs from 'qs'

const HOST = process.env.NODE_ENV !== 'production' ? 'http://localhost' : '';

export const callMethod = async (method, params = {}) =>{
    const { data } = await axios.post(`${HOST}/api/${method}`, qs.stringify({ ...params, access_token: localStorage.getItem('access_token') }))
    return data;
}