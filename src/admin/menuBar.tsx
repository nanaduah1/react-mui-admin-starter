import { Stack } from "@mui/material";
import { MenuButton, MenuItemButton } from "../components/button";

type MenuBarProps = {
  username: string;
  menuItems?: { text: string; onClick: () => void }[];
  userMenu?: { text: string; onClick: () => void }[];
};

export default function MenuBar(props: MenuBarProps) {
  const { menuItems, userMenu, username } = props;

  return (
    <Stack direction="row" justifyContent="flex-end">
      {menuItems?.map(({ text, onClick }) => (
        <MenuItemButton variant="text" onClick={onClick}>
          {text}
        </MenuItemButton>
      ))}
      <MenuButton menuItems={userMenu}>{username ?? "You"}</MenuButton>
    </Stack>
  );
}
