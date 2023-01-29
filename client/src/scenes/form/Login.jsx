import React,{ useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { InputAdornment } from "@mui/material";
import {
  LoginOutlined,
  AccountCircleOutlined,
  PasswordOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken, login } from "../../services/services";
import { getToken } from "../../utils/HelperFunctions";
const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() && !token) {
      dispatch(checkToken(getToken())).unwrap().then(() => {
        navigate("/timely/dashboard");
      });
    }
  }, [token]);

  const handleFormConnect = async (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate("/timely/dashboard");
      }).catch((err) => {});
  };

  return (
    <Box>
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "660px",
          height: "409px",
        }}
      >
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
      </Box>
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
