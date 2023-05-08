import { Box, styled } from "@mui/material";

type SpacingProps = {
  variant?: "vertical" | "horizontal";
  size?: number;
};

const HorizontalSpace = styled(Box)`
  width: 100%;
  height: ${(props) => props.style?.height};
`;

const VerticalSpace = styled(Box)`
  height: 100%;
  width: ${(props) => props.style?.width};
`;

const defaultSpacing = 16;

export default function Spacing(props: SpacingProps) {
  const { size, variant } = props;

  if (!variant || variant === "horizontal") {
    return <HorizontalSpace style={{ height: size ?? defaultSpacing }} />;
  }

  return <VerticalSpace style={{ width: size ?? defaultSpacing }} />;
}
