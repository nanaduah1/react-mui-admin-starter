import { CircularProgress } from "@mui/material";
import useAuthentication from "../authentication/useAuthentication";
import { CenterContent } from "../components/centerContent";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout";
import MenuBar from "./menuBar";

type AdminLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export default function AdminLayout(props: AdminLayoutProps) {
  const navigateTo = useNavigate();
  const { loading, user, signOut } = useAuthentication();

  const { children } = props;

  useEffect(() => {
    if (!user && !loading) {
      navigateTo("/");
    }
  }, [user, loading, navigateTo]);

  const MenuComponent = useMemo(
    () => <MenuBar signOut={signOut} username={user?.attributes?.given_name} />,
    [signOut, user?.attributes?.given_name]
  );

  if (loading) {
    return (
      <AppLayout>
        <CenterContent>
          <CircularProgress />
        </CenterContent>
      </AppLayout>
    );
  }

  return (
    <AppLayout menuComponent={MenuComponent}>
      <CenterContent>{children}</CenterContent>
    </AppLayout>
  );
}
