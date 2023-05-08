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
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const BrandImageSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "20vh",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
    height: "100vh",
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "30vh",
  [theme.breakpoints.up("md")]: {
    width: "30%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const LoginFormContainer = styled(Card)`
  min-height: 25%;
  background-color: #ffffff;
  padding: 1rem;
  margin: 24px;
  padding: 24px;
`;

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
