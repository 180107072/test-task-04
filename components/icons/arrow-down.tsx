import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowDown = (props: SvgProps) => (
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
      d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
    />
  </Svg>
);
