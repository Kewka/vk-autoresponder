import VK from '~/vk'

export default class CallMethod {
    static async fetch(req, res){
        res.json(await VK.callMethod(req.props.method, req.props));
    }
}