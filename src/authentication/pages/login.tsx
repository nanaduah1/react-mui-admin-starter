import { Link, useNavigate } from "react-router-dom";
import AuthenticationLayout from "../layout";
import { useCallback, useState } from "react";
import { Alert, Box, TextField, Typography } from "@mui/material";
import ProgressButton from "../../components/button";
import useAuthentication from "../useAuthentication";
import Spacing from "../../components/space";
import { CenterContent } from "../../components/centerContent";
import appConfig from "../../appConfig.json";
import { Logger } from "../../common/logger";
import { SetPasswordForm } from "./setPassword";
import { StatusCard } from "../../components/statusCard";

enum FormStates {
  Login,
  SetNewPassword,
  Success,
}

export function LoginPage() {
  const [formsState, setFormState] = useState(FormStates.Login);
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const { loading, signIn, setupPassword } = useAuthentication();
  const [tempUser, setTempUser] = useState();

  const { username, password } = credentials;

  const loginButtonHandler = useCallback(async () => {
    if (username && password) {
      try {
        const response = await signIn(username, password);
        if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
          setTempUser(response);
          setFormState(FormStates.SetNewPassword);
        } else {
          navigateTo(appConfig.loginRedirect);
        }
      } catch (err) {
        setErrorMessage("Unable to log in");
        Logger.error(err);
      }
    } else {
      setErrorMessage("Enter username and password");
    }
  }, [username, password, navigateTo, signIn]);

  const setPasswordButtonHandler = useCallback(
    async (password: string) => {
      try {
        await setupPassword(tempUser, password);
        setFormState(FormStates.Success);
      } catch (err) {
        setErrorMessage("Unable to set password");
        Logger.error(err);
      }
    },
    [tempUser, setErrorMessage, setupPassword]
  );

  const onInputChanged = useCallback(
    (field: string, value: any) => {
      const updatedCredentials = { ...credentials, [field]: value };
      setCredentials(updatedCredentials);
    },
    [setCredentials, credentials]
  );

  const resetForm = useCallback(() => {
    setErrorMessage("");
    setTempUser(undefined);
    setFormState(FormStates.Login);
  }, [setErrorMessage, setFormState, setTempUser]);

  if (formsState === FormStates.SetNewPassword) {
    return (
      <SetPasswordForm
        onSubmit={setPasswordButtonHandler}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        loading={loading}
      />
    );
  }
  if (formsState === FormStates.Success) {
    return (
      <AuthenticationLayout>
        <CenterContent>
          <StatusCard
            severity="success"
            message="Your password has been accepted."
            secondaryAction={{
              text: "Continue",
              onClick: resetForm,
            }}
          />
        </CenterContent>
      </AuthenticationLayout>
    );
  }

  return (
    <LoginForm
      errorMessage={errorMessage}
      username={username}
      password={password}
      onSubmit={loginButtonHandler}
      inputChanged={onInputChanged}
      isBusy={loading}
    />
  );
}

type LoginFormProps = {
  errorMessage?: string;
  username?: string;
  password?: string;
  inputChanged?: (field: string, value: any) => void;
  onSubmit?: () => void;
  isBusy?: boolean;
};

function LoginForm(props: LoginFormProps) {
  const { isBusy, errorMessage, username, password, onSubmit, inputChanged } =
    props;
  return (
    <AuthenticationLayout>
      <CenterContent>
        <Box>
          <Typography variant="h5">Sign in</Typography>

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
            onChange={(e) =>
              inputChanged && inputChanged(e.target.name, e.currentTarget.value)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            size="small"
            onChange={(e) =>
              inputChanged && inputChanged(e.target.name, e.currentTarget.value)
            }
          />
          <Spacing />
          <ProgressButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={!(username && password)}
            isBusy={isBusy}
          >
            Sign In
          </ProgressButton>
          <Box padding={1}>
            <Link to="/forgot-password">Forgot password?</Link>
          </Box>
        </Box>
      </CenterContent>
    </AuthenticationLayout>
  );
}
