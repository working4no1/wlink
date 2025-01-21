"use client";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import React from "react";
import ServiceMaster from "@/services/servicemaster";
import { useStore } from "zustand";
import ControllerLogin from "@/controllers/controllerlogin";
import ControllerDetail from "@/controllers/controllerdetail";
import ControllerCheck from "@/controllers/controllercheck";

export default function Home() {
  const { loginStatus } = useStore(ControllerLogin);
  if (loginStatus) {
    return <DashboardComponent />;
  } else {
    return <LoginComponent />;
  }
}

function DashboardComponent({}) {
  const { detailGet, detailData, detailLoading } = useStore(ControllerDetail);
  const { loginUsername } = useStore(ControllerLogin);
  const { checkLoading, checkSet } = useStore(ControllerCheck);
  React.useEffect(() => {
    detailGet({
      username: loginUsername,
      origin: window.location.origin,
    });
  }, []);

  function nullCheck(value = null) {
    return value === null || value === undefined || value === ""
      ? "Tidak tersedia"
      : value;
  }

  if (detailLoading === true) {
    return (
      <div
        style={{
          padding: "10px",
        }}
      >
        Loading...
      </div>
    );
  } else {
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <div>Hai, {loginUsername}</div>
        </div>
        <div>
          <div>Check-In</div>
          <div>waktu: {nullCheck(detailData?.checkIn)}</div>
          <div>lokasi: {nullCheck(detailData?.checkInLoc)}</div>
        </div>
        <div>
          <div>Check-Out</div>
          <div>waktu: {nullCheck(detailData?.checkOut)}</div>
          <div>lokasi: {nullCheck(detailData?.checkOutLoc)}</div>
        </div>
        <LoadingButton
          onClick={() => {
            detailGet({
              username: loginUsername,
              origin: window.location.origin,
            });
          }}
          loading={detailLoading || checkLoading}
          style={{
            fontSize: "12px",
          }}
          variant="outlined"
        >
          Refresh
        </LoadingButton>
        {detailData?.checkInLoc === null && (
          <LoadingButton
            onClick={() => {
              checkSet({
                type: "in",
                username: loginUsername,
                origin: window.location.origin,
              });
            }}
            loading={detailLoading || checkLoading}
            style={{
              fontSize: "12px",
            }}
            variant="contained"
          >
            CheckIn
          </LoadingButton>
        )}
        {detailData?.checkInLoc !== null && (
          <LoadingButton
            onClick={() => {
              checkSet({
                type: "out",
                username: loginUsername,
                origin: window.location.origin,
              });
            }}
            loading={detailLoading || checkLoading}
            style={{
              fontSize: "12px",
            }}
            variant="contained"
          >
            CheckOut
          </LoadingButton>
        )}
      </div>
    );
  }
}

function LoginComponent({}) {
  const { loginLoading, loginCheck } = useStore(ControllerLogin);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) =>
        loginCheck({
          ...values,
          origin: window.location.origin,
        })
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="username"
            value={values.username}
            onChange={handleChange}
            style={{
              width: "100%",
            }}
            slotProps={{
              input: {
                style: {
                  fontSize: "12px", // Adjust font size of input text
                },
              },
              inputLabel: {
                style: {
                  fontSize: "12px", // Adjust font size of label
                },
              },
            }}
            label="Username"
            variant="filled"
          />
          <FormControl variant="filled">
            <InputLabel
              htmlFor="filled-adornment-password"
              style={{ fontSize: "12px" }}
            >
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              style={{ fontSize: "12px" }}
              name="password" // Add the name prop
              value={values.password} // Bind the value to your form's state
              onChange={handleChange} // Handle the change for the input
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <LoadingButton
            loading={loginLoading}
            type="submit"
            style={{
              fontSize: "12px",
            }}
            variant="contained"
          >
            Simpan
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
}
