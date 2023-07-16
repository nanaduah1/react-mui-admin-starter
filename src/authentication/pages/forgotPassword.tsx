import { Box, Typography, Alert, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CenterContent } from "../../components/centerContent";
import AuthenticationLayout from "../layout";
import ProgressButton from "../../components/button";
import useAuthentication from "../useAuthentication";
import { EnterOTPForm } from "../../components/otpForm";
import Spacing from "../../components/space";
import { NewPassword } from "../../components/newPassword";
import { Logger } from "../../common/logger";

const FormStates = {
  Initial: "initial",
  EnterCode: "code",
};

export function ForgotPasswordPage() {
  const [formMode, setFormMode] = useState(FormStates.Initial);
  const [otp, setOTP] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, forgotPassword, confirmForgotPassword } =
    useAuthentication();
  const navigateTo = useNavigate();

  const resetButtonHandler = useCallback(async () => {
    if (username) {
      try {
        await forgotPassword(username);
        setFormMode(FormStates.EnterCode);
      } catch (err) {
        setErrorMessage("Unable send your request");
        Logger.error(err);
      }
    } else {
      setErrorMessage("Enter username and password");
    }
  }, [setFormMode, forgotPassword, username]);

  const setNewPasswordButtonHandler = useCallback(async () => {
    if (!otp) {
      setErrorMessage("Enter the code we sent you");
      return;
    }

    if (!password) {
      setErrorMessage("Enter a new password");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Your passwords did not match");
      return;
    }
    try {
      await confirmForgotPassword(otp, username, password);
      navigateTo("/");
    } catch (err) {
      setErrorMessage("Unable to set new password");
      Logger.error(err);
    }
  }, [
    username,
    otp,
    password,
    confirmPassword,
    confirmForgotPassword,
    navigateTo,
  ]);

  const empty = <></>;
  const NewPasswordFields = (
    <NewPassword
      password={password}
      password2={confirmPassword}
      setPassword={setPassword}
      setPassword2={setConfirmPassword}
    />
  );

  return (
    <AuthenticationLayout>
      <CenterContent>
        {formMode === FormStates.Initial ? (
          <ForgotPasswordForm
            onSubmit={resetButtonHandler}
            username={username}
            setUsername={setUsername}
            errorMessage={errorMessage}
            loading={loading}
          />
        ) : (
          empty
        )}
        {formMode === FormStates.EnterCode ? (
          <EnterOTPForm
            extraFields={NewPasswordFields}
            onSubmit={setNewPasswordButtonHandler}
            otp={otp}
            setOTP={setOTP}
            errorMessage={errorMessage}
            loading={loading}
            resendOtp={resetButtonHandler}
          />
        ) : (
          empty
        )}
      </CenterContent>
    </AuthenticationLayout>
  );
}

type ForgotPasswordFormProps = {
  errorMessage?: string;
  username?: string;
  setUsername: (val: string) => void;
  loading?: boolean;
  onSubmit: () => void;
};

function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { username, errorMessage, setUsername, loading, onSubmit } = props;
  return (
    <Box>
      <Typography variant="h5">Forgot password</Typography>

      {errorMessage && (
        <Alert severity="error" color="error">
          {errorMessage}
        </Alert>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        size="small"
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Spacing />
      <ProgressButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
        disabled={!username}
        isBusy={loading}
      >
        Reset Password
      </ProgressButton>
      <Box padding={1}>
        Remembered password? <Link to="/">Login</Link>
      </Box>
    </Box>
  );
}
