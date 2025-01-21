class ModelResponse {
  status = null;
  message = null;
  data = null;
  constructor({ status = null, message = null, data = null }) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ModelResponse;
