"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// mui imports
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// login
import { signIn } from "next-auth/react";

const Register = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const urlParams = params.typeUser;

  useEffect(() => {
    if (session) {
      if (urlParams.includes("owner")) {
        router.push("/login/owner");
      } else {
        router.push(`/login/superCustomer`);
      }
    }
  }, [session]);

  const styles = {
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid black",
      padding: "1rem",
      height: "fit-content",
    },
    label: {
      margin: "0.5rem",
    },
    input: {
      margin: "0.5rem",
      alignSelf: "flex-start",
    },
    button: {
      margin: "0.5rem",
      padding: "0.5rem",
      width: "fit-content",
      border: "1px solid black",
      borderRadius: "5px",
      backgroundColor: "lightblue",
    },
  };

  // ADD USER TO THE DATABASE
  const handleSubmit = async function (e) {
    e.preventDefault();

    // get the form data
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      phone: e.target.phone.value,
    };

    // send the form data to the server
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        if (urlParams.includes("owner")) {
          router.push("/login/owner");
        } else {
          router.push(`/login/superCustomer`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  return (
    // create a form to register a new user
    <main style={styles.main}>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.input} htmlFor="firstname">
          First Name
        </label>
        <input
          style={styles.input}
          type="text"
          name="firstname"
          id="firstname"
        />
        <label style={styles.input} htmlFor="lastname">
          Last Name
        </label>
        <input style={styles.input} type="text" name="lastname" id="lastname" />
        <label style={styles.input} htmlFor="email">
          Email
        </label>
        <input style={styles.input} type="email" name="email" id="email" />
        <label style={styles.input} htmlFor="password">
          Password
        </label>
        <input
          style={styles.input}
          type="password"
          name="password"
          id="password"
        />
        <label style={styles.input} htmlFor="phone">
          Phone
        </label>
        <input style={styles.input} type="tel" name="phone" id="phone" />
        <button style={styles.button}>Submit</button>
      </form>
      <br></br>
      <Button
        onClick={() => signIn("google")}
        sx={{
          display: "flex",
          height: "44px",
          width: "326px",
          padding: "12px 24px",
          marginBottom: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          color: "black",
          borderColor: "#A9A9A9",
        }}
        variant="outlined"
      >
        <GoogleIcon />
        Google
      </Button>
      <Link href="/login">Login with existing account</Link>
    </main>
  );
};

export default Register;
