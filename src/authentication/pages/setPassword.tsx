import { Typography, Alert, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterContent } from "../../components/centerContent";
import AuthenticationLayout from "../layout";
import { NewPassword } from "../../components/newPassword";
import ProgressButton from "../../components/button";
import useAuthentication from "../useAuthentication";
import appConfig from "../../appConfig.json";

export function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, user, setupPassword } = useAuthentication();

  const navigateTo = useNavigate();

  const setPasswordButtonHandler = async () => {
    if (!password) {
      setErrorMessage("Enter password");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password did not match");
      return;
    }

    await setupPassword(user, password);
    navigateTo(appConfig.loginRedirect);
  };

  return (
    <AuthenticationLayout>
      <CenterContent>
        <Box>
          <Typography variant="h5">Set new password</Typography>

          {errorMessage && <Alert color="error">{errorMessage}</Alert>}

          <NewPassword
            password={password}
            password2={confirmPassword}
            setPassword2={setConfirmPassword}
            setPassword={setPassword}
          />

          <ProgressButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={setPasswordButtonHandler}
            disabled={
              !password || !confirmPassword || password !== confirmPassword
            }
            isBusy={loading}
          >
            Set Password
          </ProgressButton>
        </Box>
      </CenterContent>
    </AuthenticationLayout>
  );
}
