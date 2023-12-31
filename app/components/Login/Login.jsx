import { useState } from "react";
import InputText from "../Input/InputText";
import SubHeader from "../Header/SubHeader";
import SingleButton from "../Button/SingleButton";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormLogin from "../Card/FormLogin";
import { signIn } from "next-auth/react";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";
import Image from "next/image";

function LoginComponent() {
  const theme = useTheme();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    console.log("Login button clicked");
    signIn("credentials", { ...credentials }, { redirect: false });
  };

  const handleLinkClick = (text) => {
    console.log(`${text} clicked`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <FormLogin>
      <Typography style={{ fontSize: "3rem" }}>Login</Typography>
      <Box sx={{ width: "80%" }}>
        <InputText
          name="email"
          id="email"
          placeholder="Email or username"
          value={credentials.email}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ marginBottom: "2rem", width: "80%" }}>
        <InputText
          name="password"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
        />
      </Box>
      <SingleButtonNoIcon text="Log in" onClick={handleLogin} width="80%" />
      <Box sx={{ my: 1 }}></Box>
      <Button
        onClick={() => signIn("google")}
        sx={{
          display: "flex",
          height: "44px",
          padding: "12px 24px",
          marginBottom: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          color: "black",
          borderColor: "#A9A9A9",
          width:"80%",
          minWidth: "64px",
        }}
        variant="outlined"
      >
        <Image
          src="/assets_landingPage/google.svg"
          width="24"
          height="24"
          alt="logo"
        />
        Google
      </Button>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Image
          src="/assets_landingPage/loginLogo.svg"
          width="110"
          height="110"
          alt="logo"
        />
      </Box>
    </FormLogin>
  );
}

export default LoginComponent;
