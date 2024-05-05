import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  //   const [finalProduct, setFinalProduct] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const UpdatePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    const varification = await reauthenticateWithCredential(user, credential);

    if (!varification?.user) {
      throw new Error("Validation Error");
    }

    await updatePassword(user, newPassword);

    return "Successfully Reset";
  };

  const DeleteAccount = () => {
    return deleteUser(auth.currentUser);
  };

  const ResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const EmailVarification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    updateUserProfile,
    EmailVarification,
    googleLogin,
    UpdatePassword,
    logOut,
    ResetPassword,
    DeleteAccount,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
