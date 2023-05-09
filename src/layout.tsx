import { Box, Typography, styled } from "@mui/material";
import theme from "./theme";
import config from "./appConfig.json";

type AppLayoutProps = {
  children: JSX.Element | JSX.Element[];
  menuComponent?: JSX.Element;
};

const PageContainer = styled(Box)`
  background-color: ${() => theme.palette.background.default};
  margin: 0;
  width: 100%;
  height: 100vh;
`;

const ContentPane = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "80vh",
}));

const HeaderSection = styled(Box)`
  width: 100%;
  height: 6vh;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

const FooterSection = styled(Box)`
  width: 100%;
  height: 10vh;
  text-align: center;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { children, menuComponent } = props;
  const { appName } = config;
  return (
    <PageContainer>
      <HeaderSection>
        <Typography variant="h6">{appName}</Typography>
        {menuComponent}
      </HeaderSection>
      <ContentPane>{children}</ContentPane>
      <FooterSection>
        <Typography>All rights reserved. {new Date().getFullYear()}</Typography>
      </FooterSection>
    </PageContainer>
  );
}
