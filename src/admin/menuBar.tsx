import { Button, Stack } from "@mui/material";
import { MenuButton } from "../components/button";

type MenuBarProps = {
  signOut?: () => void;
  username?: string;
};

export default function MenuBar(props: MenuBarProps) {
  const { signOut, username } = props;

  const UserMenuItems = [{ text: "Sign out", onClick: signOut }];

  return (
    <Stack direction="row" justifyContent="flex-end">
      <Button variant="text">Menu 1</Button>
      <MenuButton menuItems={UserMenuItems}>{username ?? "You"}</MenuButton>
    </Stack>
  );
}
