import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const LoginPlain = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };

  const handleNewUser = async () => {
    //setError(null);

    // basic client-side validation
    // if (!email) return setError("Email is required");
    // if (password.length < 6)
    //   return setError("Password must be at least 6 chars");

    //setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      // after sign up, get token and redirect
      try {
        const t = await auth.currentUser?.getIdToken();
        console.log("Signed up user:", user.uid, "token:", t);
      } catch (err) {
        console.warn("Could not get token immediately after signup", err);
      }
      // success: navigate or close modal here
      navigate("/newsfeed");
    } catch (err: any) {
      // map known Firebase codes to friendly messages
      const code = err?.code;
      console.error("Signup error", code, err);
      //   if (code === "auth/email-already-in-use") {
      //     setError("That email is already in use.");
      //   } else if (code === "auth/invalid-email") {
      //     setError("Invalid email address.");
      //   } else if (code === "auth/weak-password") {
      //     setError("Password is too weak.");
      //   } else {
      //     setError(err?.message ?? "Signup failed");
      //   }
    } finally {
      // only update state if component is still mounted
      //if (mountedRef.current) setLoading(false);
    }
  };

  const handleLogin = async () => {
    //setError(null);

    // basic client-side validation
    // if (!email) return setError("Email is required");
    // if (password.length < 6)
    //   return setError("Password must be at least 6 chars");

    //setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      // fetch token then redirect to newsfeed
      try {
        const t = await auth.currentUser?.getIdToken();
        console.log("logged in user:", user.uid, "token:", t);
      } catch (err) {
        console.warn("Could not get token immediately after login", err);
      }
      // success: navigate or close modal here
      navigate("/newsfeed");
    } catch (err: any) {
      // map known Firebase codes to friendly messages
      const code = err?.code;
      console.error("Login error", code, err);
      //   if (code === "auth/email-already-in-use") {
      //     setError("That email is already in use.");
      //   } else if (code === "auth/invalid-email") {
      //     setError("Invalid email address.");
      //   } else if (code === "auth/weak-password") {
      //     setError("Password is too weak.");
      //   } else {
      //     setError(err?.message ?? "Signup failed");
      //   }
    } finally {
      // only update state if component is still mounted
      //if (mountedRef.current) setLoading(false);
    }
  };

  return (
    <div>
      <label>Email: </label>
      <input
        name="Email"
        value={email}
        onChange={(e) => handleChange(e, setEmail)}
      ></input>

      <label>Password: </label>
      <input
        name="Password"
        value={password}
        onChange={(e) => handleChange(e, setPassword)}
      ></input>
      <button onClick={() => handleLogin()}>Login</button>
      <button onClick={() => handleNewUser()}>Signup</button>
    </div>
  );
};
