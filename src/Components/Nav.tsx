import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "../Firebase";
import React, { useEffect, useState } from "react";
import "../Styles/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [username, setUsername] = useState("");

  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    if (isUserSignedIn()) {
      setUsername(getUserName() || "");
    }
  }
  function signOutUser() {
    signOut(getAuth());
    setUsername("");
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
        <li id="navLogo">WimmelBilder</li>
        <Link to="/" className="leftMenu">
          Home
        </Link>
        <li>Maps</li>
        <Link to="/leaderboard">Leaderboard</Link>
        {showButtons()}
      </ul>
    </nav>
  );
};

export default Nav;
