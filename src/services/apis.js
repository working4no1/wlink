import ModelResponse from "@/models/model_response";
import axios from "axios";

const SuccessParser = (response = null) => {
  return new ModelResponse({
    status: response["status"],
    data: response["data"]["data"],
    message: response["data"]["message"],
  });
};

const ErrorParser = (error = null) => {
  if (error["response"] === undefined) {
    return new ModelResponse({
      status: error["status"],
      data: null,
      message: null,
    });
  }

  return new ModelResponse({
    status: error["status"],
    data: null,
    message: error["response"]["data"]["message"],
  });
};

class Apis {
  static async get({ path = "", headers = {} }) {
    try {
      const response = await axios.get(path, {
        headers: headers,
      });
      return SuccessParser(response);
    } catch (error) {
      throw ErrorParser(error);
    }
  }

  static async post({ path = "", headers = {}, payload = {} }) {
    try {
      const response = await axios.post(path, payload, {
        headers: headers,
      });
      return SuccessParser(response);
    } catch (error) {
      throw ErrorParser(error);
    }
  }
}

export default Apis;
