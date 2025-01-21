import ServiceMaster from "@/services/servicemaster";
import { create } from "zustand";
import ControllerLayout from "./controllerlayout";

const ControllerLogin = create((set) => ({
  loginLoading: false,
  loginStatus: false,
  loginUsername: null,
  loginCheck: async (
    data = {
      username: null,
      password: null,
      origin: null,
    }
  ) => {
    try {
      set({ loginLoading: true, loginStatus: false, loginUsername: null });
      await ServiceMaster.post({
        path: origin + "/api/login",
        payload: data,
      });
      set({ loginStatus: true, loginUsername: data.username });
    } catch (error) {
      ControllerLayout.getState().setOpen({
        value: true,
        message: error["message"],
        type: "warning",
      });
    } finally {
      set({ loginLoading: false });
    }
  },
}));

export default ControllerLogin;
