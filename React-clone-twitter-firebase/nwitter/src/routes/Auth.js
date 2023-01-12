import { React, useState } from "react";
import { authService, GoogleAuthProvider, GithubAuthProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  // sendEmailVerification
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create newAccount
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
          );
        // sendEmail();
      } else {
        // Log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log("test", data);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  }
  // const sendEmail = async () => {
  //   try {
  //     const message = await sendEmailVerification(authService.currentUser);
  //     console.log('22222',message);

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();

    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
          autoComplete="off"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
        <div>
          <button onClick={onSocialClick} name="google">Continue with Google</button>
          <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
  );
};

export default Auth;
