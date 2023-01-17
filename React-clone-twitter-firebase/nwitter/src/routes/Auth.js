import { React } from "react";
import {
  authService,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "../firebase";
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  signInWithPopup,
  // sendEmailVerification
} from "firebase/auth";
import AuthForm from "../components/AuthForm"


const Auth = () => {
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
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
