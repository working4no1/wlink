"use client";
import "./globals.css";
import { useStore } from "zustand";
import ControllerLayout from "@/controllers/controllerlayout";
import { Alert, Snackbar } from "@mui/material";

export default function RootLayout({ children }) {
  const { open, message, type, setOpen } = useStore(ControllerLayout);

  return (
    <html lang="en">
      <body
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {children}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => {
            setOpen({ value: false });
          }}
        >
          <Alert
            onClose={() => {
              setOpen({ value: false });
            }}
            severity={type === "green" ? "success" : "warning"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </body>
    </html>
  );
}
