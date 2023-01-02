import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useMediaQuery,
  InputAdornment,
  Snackbar,
  MuiAlert,
  Stack,
  Alert,
} from "@mui/material";
import {
  AssignmentOutlined,
  AccountCircleOutlined,
  PasswordOutlined,
  MailOutlined,
} from "@mui/icons-material";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [notifData, setNotifData] = React.useState({
    severity: "",
    message: "",
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    fetch("http://127.0.0.1:8080/user/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.hasOwnProperty("severity")) {
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
    <Box
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
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
            <Box>
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
                sx={{ marginBottom: "20px" }}
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
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="E-mail"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlined />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ marginBottom: "20px" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                startIcon={<AssignmentOutlined />}
              >
                S'inscrire
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
  email: yup
    .string()
    .email("adresse mail invalide")
    .required("Une adresse mail est requise"),
});
const initialValues = {
  userName: "",
  password: "",
  email: "",
};

export default Login;
