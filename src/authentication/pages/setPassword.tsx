import { Typography, Alert, Box } from "@mui/material";
import { useCallback, useState } from "react";
import { CenterContent } from "../../components/centerContent";
import AuthenticationLayout from "../layout";
import { NewPassword } from "../../components/newPassword";
import ProgressButton from "../../components/button";

type SetPasswordFormProps = {
  onSubmit: (password: string) => void;
  loading: boolean;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
};

export function SetPasswordForm(props: SetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { onSubmit, errorMessage, setErrorMessage, loading } = props;

  const setPasswordButtonHandler = useCallback(async () => {
    if (!password) {
      setErrorMessage("Enter password");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password did not match");
      return;
    }
    onSubmit(password);
  }, [onSubmit, password, confirmPassword, setErrorMessage]);

  return (
    <AuthenticationLayout>
      <CenterContent>
        <Box>
          <Typography variant="h5">Set new password</Typography>

          {errorMessage && (
            <Alert severity="error" color="error">
              {errorMessage}
            </Alert>
          )}

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
