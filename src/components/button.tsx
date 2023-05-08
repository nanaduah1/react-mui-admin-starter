import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import { useState } from "react";

type ProgressButtonProps = {
  isBusy?: boolean;
  busyMessage?: string;
} & ButtonProps;

const Progress = styled(CircularProgress)`
  width: 14px !important;
  height: 14px !important;
  margin: 2px 4px;
`;

export default function ProgressButton(props: ProgressButtonProps) {
  const { isBusy, busyMessage, size, children, ...baseProps } = props;
  const busyDisplay = busyMessage ?? "Please wait...";
  const title = isBusy ? busyDisplay : "";

  const content = isBusy ? (
    <>
      <span>{busyDisplay}</span>
      <Progress />
    </>
  ) : (
    children
  );

  return (
    <Button
      {...baseProps}
      size={size ?? "medium"}
      disabled={isBusy}
      title={title}
    >
      {content}
    </Button>
  );
}

type MenuButtonProps = {
  children: string | JSX.Element;
  icon?: any;
  menuItems?: { text: string; icon?: JSX.Element; onClick?: () => void }[];
};

export function MenuButton(props: MenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { children, menuItems } = props;
  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={menuButtonClickHandler}
      >
        <Stack direction="row" justifyContent="space-between">
          {children}
          <AccountCircle />
        </Stack>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems
          ? menuItems.map(({ text, onClick }) => (
              <MenuItem onClick={onClick}>{text}</MenuItem>
            ))
          : null}
      </Menu>
    </div>
  );
}
