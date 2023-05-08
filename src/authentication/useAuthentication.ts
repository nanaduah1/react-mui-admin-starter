import { Auth } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";

const AuthState = {
  SignedIn: "SignedIn",
  SignedOut: "SignedOut",
};

type User = {
  username: string;
  attributes: any;
};

export default function useAuthentication() {
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(AuthState.SignedOut);
  const [user, setUser] = useState<User | undefined>();

  const signIn = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      const result = await Auth.signIn({ username, password });
      if (await Auth.currentUserInfo()) {
        setAuthStatus(AuthState.SignedIn);
      }

      setLoading(false);
      return result;
    },
    [setAuthStatus]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    await Auth.signOut({ global: true });
    setAuthStatus(AuthState.SignedOut);
    setUser(undefined);
    setLoading(false);
  }, []);

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [authStatus, setUser]);

  const forgotPassword = useCallback(async (username: string) => {
    setLoading(true);
    await Auth.forgotPassword(username);
    setLoading(false);
  }, []);

  const confirmForgotPassword = useCallback(
    async (otp: string, username: string, newPassword: string) => {
      setLoading(true);
      await Auth.forgotPasswordSubmit(username, otp, newPassword);
      setLoading(false);
    },
    []
  );

  const setupPassword = useCallback(async (user: any, newPassword: string) => {
    setLoading(true);
    await Auth.completeNewPassword(user, newPassword);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut,
    forgotPassword,
    confirmForgotPassword,
    setupPassword,
  };
}
