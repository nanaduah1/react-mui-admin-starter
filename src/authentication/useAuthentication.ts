import { Auth, Hub } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";

type User = {
  username: string;
  attributes: any;
  roles?: string[];
};

Hub.listen("auth", (data) => {
  const { payload } = data;
  switch (payload.event) {
    case "signIn": {
      break;
    }
  }
});

export default function useAuthentication() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  const signIn = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      try {
        const result = await Auth.signIn({ username, password });

        setLoading(false);
        return result;
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [setLoading]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await Auth.signOut({ global: true });
      setUser(undefined);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [setUser, setLoading]);

  const loadUserSession = useCallback(async () => {
    try {
      const session: any = await Auth.currentSession();
      const user = await Auth.currentUserInfo();
      user.roles = session.accessToken.payload["cognito:groups"];
      setUser(user);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [setUser, setLoading]);

  useEffect(() => {
    loadUserSession();
  }, [loadUserSession]);

  const getAccessToken = useCallback(async () => {
    const userData = await Auth.currentAuthenticatedUser();
    return userData?.signInUserSession?.accessToken?.jwtToken;
  }, []);

  const forgotPassword = useCallback(async (username: string) => {
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, []);

  const confirmForgotPassword = useCallback(
    async (otp: string, username: string, newPassword: string) => {
      setLoading(true);
      try {
        await Auth.forgotPasswordSubmit(username, otp, newPassword);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [setLoading]
  );

  const setupPassword = useCallback(
    async (user: any, newPassword: string) => {
      setLoading(true);
      try {
        await Auth.completeNewPassword(user, newPassword);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [setLoading]
  );

  const hasRole = useCallback(
    (role: string) => {
      return user && user.roles && user.roles.includes(role);
    },
    [user]
  );

  return {
    user,
    loading,
    signIn,
    signOut,
    forgotPassword,
    confirmForgotPassword,
    setupPassword,
    getAccessToken,
    hasRole,
  };
}
