import styled from "@emotion/styled";
import { Box } from "@mui/system";

type CenterContentProps = {
  children: JSX.Element | JSX.Element[];
};

export function CenterContent({ children }: CenterContentProps) {
  return <CenteredBoxContainer>{children}</CenteredBoxContainer>;
}

const CenteredBoxContainer = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;
