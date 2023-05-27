import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "../Firebase";
import React, { useEffect, useState } from "react";
import "../Styles/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsername(getUserName() || "");
      } else {
        signOutUser();
        setUsername("");
      }
    });
  }, []);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  function signOutUser() {
    signOut(getAuth());
  }

  function getUserName() {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      return currentUser.displayName;
    }
    return "Unknown";
  }
  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  function showButtons() {
    if (isUserSignedIn() && username) {
      return (
        <div className="username">
          <p>{username}</p>
          <p onClick={() => signOutUser()} className="signOutButton">
            Sign Out
          </p>
        </div>
      );
    } else {
      return (
        <button onClick={() => signIn()} className="signInButton">
          Sign In
        </button>
      );
    }
  }

  return (
    <nav>
      <ul>
        <Link to="/" id="navLogo">
          WimmelBilder
        </Link>
        <Link to="/" className="leftMenu">
          Home
        </Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {showButtons()}
      </ul>
    </nav>
  );
};

export default Nav;
