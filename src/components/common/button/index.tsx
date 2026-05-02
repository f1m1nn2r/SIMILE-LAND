import Image from "next/image";
import { ReactNode } from "react";
import { Typography, type Weight, type Size } from "../typography";

type ButtonColor = "lavender" | "yellow" | "teal" | "blue" | "orange" | "pink";

type BaseButtonProps = {
  bgColor: ButtonColor;
  children: ReactNode;
  className?: string;
  textSize?: Size;
  textWeight?: Weight;
  onClick?: () => void;
};

type EmojiButtonProps = BaseButtonProps & { variant: "emoji" };
type DefaultButtonProps = BaseButtonProps & { variant: "default" };

type ButtonProps = EmojiButtonProps | DefaultButtonProps;

const colorClass: Record<ButtonColor, string> = {
  lavender: "bg-lavender",
  yellow: "bg-yellow",
  teal: "bg-teal",
  blue: "bg-blue",
  orange: "bg-orange",
  pink: "bg-pink",
};

export const Button = ({
  variant,
  bgColor,
  children,
  className,
  textSize,
  textWeight,
  onClick,
}: ButtonProps) => {
  if (variant === "emoji") {
    return (
      <button
        onClick={onClick}
        className={`group flex items-center gap-0 overflow-hidden rounded-full px-10 py-4 transition-all duration-300 cursor-pointer ${colorClass[bgColor]} ${className ?? ""}`}
      >
        <span className="flex w-0 overflow-hidden transition-all duration-300 group-hover:mr-2 group-hover:w-6">
          <Image src="/assets/smile.svg" alt="" width={20} height={20} />
        </span>
        <Typography size={textSize} weight={textWeight}>
          {children}
        </Typography>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-5 cursor-pointer ${colorClass[bgColor]} ${className ?? ""}`}
    >
      <Typography size={textSize} weight={textWeight}>
        {children}
      </Typography>
    </button>
  );
};
