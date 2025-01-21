import ServiceMaster from "@/services/servicemaster";
import { create } from "zustand";
import ControllerLayout from "./controllerlayout";
import ControllerDetail from "./controllerdetail";

const ControllerCheck = create((set) => ({
  checkLoading: null,
  checkSet: async (
    data = {
      type: null,
      username: null,
      origin: null,
    }
  ) => {
    try {
      console.log(data);
      set({ checkLoading: true });
      await ServiceMaster.post({
        path: origin + `/api/${data.type}`,
        payload: {
          username: data.username.toLowerCase(),
          lat: "-6.190886",
          lon: "106.798207",
        },
      });
      await ControllerDetail.getState().detailGet({
        username: data.username,
        origin: origin,
      });
    } catch (error) {
      console.log(error);

      ControllerLayout.getState().setOpen({
        value: true,
        message: error["message"],
        type: "warning",
      });
    } finally {
      set({ checkLoading: false });
    }
  },
}));

export default ControllerCheck;
