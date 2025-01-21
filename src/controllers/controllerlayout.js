import { create } from "zustand";

const ControllerLayout = create((set) => ({
  open: false,
  message: null,
  type: null,
  loadingComponent: false,
  setLoadingComponent: (value = false) => {
    set({ loadingComponent: value });
  },
  setOpen: ({ value = false, message = null, type = null }) => {
    if (value === true) {
      set({
        open: true,
        message:
          message ?? "Terjadi kesalahan. Silahkan coba beberapa saat kembali!",
        type: type,
      });
    } else {
      set({ open: false, type: null });
    }
  },
}));

export default ControllerLayout;
