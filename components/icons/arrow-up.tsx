import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowUp = (props: SvgProps) => (
  <Svg
    {...props}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
    />
  </Svg>
);
