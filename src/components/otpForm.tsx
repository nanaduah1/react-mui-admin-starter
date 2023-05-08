import { Box, Typography, Alert, TextField, Stack } from "@mui/material";
import ProgressButton from "./button";

type OtpFormProps = {
  errorMessage?: string;
  otp?: string;
  setOTP?: (val: string) => void;
  loading?: boolean;
  onSubmit?: () => void;
  resendOtp?: () => void;
  headerText?: string;
  extraFields?: JSX.Element | JSX.Element[];
};

export function EnterOTPForm(props: OtpFormProps) {
  const {
    headerText,
    setOTP,
    errorMessage,
    otp,
    loading,
    onSubmit,
    resendOtp,
    extraFields,
  } = props;
  return (
    <Box>
      <Typography variant="h5">{headerText ?? "Forgot password"}</Typography>
      {errorMessage && <Alert color="error">{errorMessage}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="otp"
        label={otp ? "OTP" : undefined}
        name="otp"
        autoComplete="off"
        autoFocus
        value={otp}
        size="small"
        placeholder="Enter the code you received"
        onChange={(e) => setOTP && setOTP(e.currentTarget.value)}
      />

      {extraFields}

      <ProgressButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
        disabled={!otp}
        isBusy={loading}
      >
        Confirm
      </ProgressButton>
      <Stack justifyContent="center" direction="row" padding={1}>
        <Typography marginRight={1}>Didn't receive code?</Typography>
        <a href="#resend" onClick={resendOtp}>
          Resend
        </a>
      </Stack>
    </Box>
  );
}
