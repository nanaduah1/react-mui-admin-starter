import { Box, Card, styled } from "@mui/material";
import AppLayout from "../layout";
type AuthenticationLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const MainContent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const BrandImageSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "20vh",
  [theme.breakpoints.up("lg")]: {
    width: "50%",
    height: "100vh",
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "30vh",
  [theme.breakpoints.up("lg")]: {
    width: "30%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const LoginFormContainer = styled(Card)(({ theme }) => ({
  minHeight: "25%",
  backgroundColor: "#ffffff",
  margin: "24px",
  padding: "24px",
  [theme.breakpoints.up("md")]: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function AuthenticationLayout(props: AuthenticationLayoutProps) {
  const { children } = props;

  return (
    <AppLayout>
      <MainContent>
        <BrandImageSection />
        <FormSection>
          <LoginFormContainer>{children}</LoginFormContainer>
        </FormSection>
      </MainContent>
    </AppLayout>
  );
}
