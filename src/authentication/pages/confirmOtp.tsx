import { Box, Typography, Alert, TextField, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CenterContent } from "../../components/centerContent";
import AuthenticationLayout from "../layout";
import ProgressButton from "../../components/button";
import useAuthentication from "../useAuthentication";
import { Logger } from "../../common/logger";

export function ConfirmOtpPage() {
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const { loading, forgotPassword } = useAuthentication();

  const resetButtonHandler = useCallback(async () => {
    if (otp) {
      try {
        await forgotPassword(otp);
        navigateTo("/dashboard/contacts");
      } catch (err) {
        setErrorMessage("Unable to confirm OTP");
        Logger.error(err);
      }
    } else {
      setErrorMessage("Enter the code you received");
    }
  }, [navigateTo, forgotPassword, otp]);

  return (
    <AuthenticationLayout>
      <CenterContent>
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
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="off"
            autoFocus
            value={otp}
            size="small"
            onChange={(e) => setOTP(e.currentTarget.value)}
          />

          <ProgressButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={resetButtonHandler}
            disabled={!otp}
            isBusy={loading}
          >
            Confirm
          </ProgressButton>
          <Box padding={1}>
            Remembered password? <Link to="/">Login</Link>
          </Box>
        </Box>
      </CenterContent>
    </AuthenticationLayout>
  );
}
