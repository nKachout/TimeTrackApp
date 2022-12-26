import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useMediaQuery,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  LoginOutlined,
  AccountCircleOutlined,
  PasswordOutlined,
} from "@mui/icons-material";
const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [notifData, setNotifData] = React.useState({
    severity: "",
    message: "",
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormConnect = (values) => {
    fetch("http://127.0.0.1:8080/user/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          !result.hasOwnProperty("severity") &&
          result.hasOwnProperty("userData")
        ) {
          navigate("/dashboard");
        } else {
          setNotifData({ severity: result.severity, message: result.message });
          setOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setNotifData({ severity: "", message: "" });
  };

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormConnect}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="nom d'utilisateur"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlined />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="mot de passe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlined />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                startIcon={<LoginOutlined />}
              >
                Connexion
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={notifData.severity}
          sx={{ width: "100%" }}
        >
          {notifData.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("Un identifiant est requis"),
  password: yup.string().required("Un mot de passe est requis"),
});
const initialValues = {
  userName: "",
  password: "",
};

export default Login;
