import ServiceMaster from "@/services/servicemaster";
import { create } from "zustand";
import ControllerLayout from "./controllerlayout";

const ControllerDetail = create((set) => ({
  detailData: null,
  detailLoading: false,
  detailGet: async (
    data = {
      username: null,
      origin: null,
    }
  ) => {
    try {
      set({ detailLoading: true, detailData: null });
      const resData = await ServiceMaster.post({
        path: origin + "/api/detail",
        payload: data,
      });
      set({ detailData: resData.data });
    } catch (error) {
      ControllerLayout.getState().setOpen({
        value: true,
        message: error["message"],
        type: "warning",
      });
    } finally {
      set({ detailLoading: false });
    }
  },
}));

export default ControllerDetail;
