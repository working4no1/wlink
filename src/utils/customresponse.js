import CustomMoment from "./custommoment";

const errorModelAccount = {
  DBAC1: "...",
};

const errorCode = {
  A0001: "Data tidak ditemukan.",
  ...errorModelAccount,
};

class CustomResponse {
  date = new CustomMoment().now();
  success(res, data = null) {
    res.json({
      message: "success",
      data: data,
      responseTime: this.date,
    });
  }
  fail(res, error) {
    if (typeof error === "string") {
      if (errorCode[error] === undefined) {
        res.status(400).json({
          message: error,
          data: null,
          responseTime: this.date,
        });
      } else {
        res.status(400).json({
          message: errorCode[error],
          data: null,
          responseTime: this.date,
        });
      }
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        data: null,
        responseTime: this.date,
      });
    }
  }
}

export default CustomResponse;
