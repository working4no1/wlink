import Apis from "./apis";

class ServiceMaster {
  static async post({ path = "", headers = {}, payload = {} }) {
    try {
      return await Apis.post({
        path: path,
        headers: headers,
        payload: payload,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default ServiceMaster;
