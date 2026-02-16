import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  width = 235,
  height = 34,
  className = "",
}) => {
  return (
    <Image
      src="/images/logo.png"
      alt="Noah Estate"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
};
