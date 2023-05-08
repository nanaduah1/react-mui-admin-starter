import { PasswordEntryField } from "./styledFields";

type NewPasswordProps = {
  password?: string;
  password2?: string;
  setPassword?: (pass: string) => void;
  setPassword2?: (pass: string) => void;
};

export function NewPassword(props: NewPasswordProps) {
  const { password2, password, setPassword2, setPassword } = props;
  return (
    <>
      <PasswordEntryField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="off"
        value={password}
        size="small"
        onChange={(e) => setPassword && setPassword(e.currentTarget.value)}
      />

      <PasswordEntryField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="off"
        value={password2}
        size="small"
        onChange={(e) => setPassword2 && setPassword2(e.currentTarget.value)}
      />
    </>
  );
}
