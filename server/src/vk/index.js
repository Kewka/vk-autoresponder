import axios from 'axios'
import appConfig from './appConfig.json'

export default class VK {
    static config = {
        client_id: '3140623',
        client_secret: 'VeWdmVclDCtn6ihuP1nt',
        lang: 'ru',
        v: '5.69'
    };

    static async callMethod (method, props = {}) {
        const url = `https://api.vk.com/method/${method}`;
        const params = { ...props, ...(props.access_token ? VK.config : {}) };
        const { data } = await axios.get(url, { params });
        return data;
    }

    static async authDirect(props){
        const url = `https://oauth.vk.com/token?grant_type=password&2fa_supported=1&force_sms=1`;
        const params = { ...props, ...VK.config };
        const { data } = await axios.get(url, { params, validateStatus: status => !!status });
        return data;
    }

    static async authByCode(props){
        const url = "https://oauth.vk.com/access_token";
        const params = { ...appConfig, code: props.code };
        const { data } = await axios.get(url, { params, validateStatus: status => !!status });
        return data;
    }

}