import { Button, Stack, Typography } from "@mui/material";
import Spacing from "./space";
import {
  CheckCircle,
  ErrorOutline,
  InfoOutlined,
  WarningOutlined,
} from "@mui/icons-material";

type StatusCardProps = {
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  primaryAction?: { text: string; onClick?: () => void };
  secondaryAction?: { text: string; onClick?: () => void };
};

export function StatusCard(props: StatusCardProps) {
  const { severity, message, primaryAction, secondaryAction } = props;

  return (
    <Stack p={2} alignItems="center">
      {severity === "success" ? (
        <CheckCircle color="success" fontSize="large" />
      ) : null}
      {severity === "warning" ? (
        <WarningOutlined color="warning" fontSize="large" />
      ) : null}
      {severity === "error" ? (
        <ErrorOutline color="error" fontSize="large" />
      ) : null}
      {severity === "info" ? (
        <InfoOutlined color="info" fontSize="large" />
      ) : null}

      <Spacing />
      <Typography>{message}</Typography>
      <Spacing />
      <Stack justifyContent="space-around" direction="row" width="100%">
        {primaryAction ? (
          <Button onClick={primaryAction?.onClick} variant="contained">
            {primaryAction?.text}
          </Button>
        ) : null}
        {secondaryAction ? (
          <Button variant="outlined" onClick={secondaryAction?.onClick}>
            {secondaryAction?.text}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
