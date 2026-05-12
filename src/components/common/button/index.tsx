import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Typography, type Weight, type Size } from "../typography";

type ButtonColor =
  | "lavender"
  | "yellow"
  | "teal"
  | "blue"
  | "orange"
  | "pink"
  | "graylighter";

type BaseButtonProps = {
  bgColor: ButtonColor;
  children: ReactNode;
  className?: string;
  textSize?: Size;
  textWeight?: Weight;
  onClick?: () => void;
  href?: string;
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
  graylighter: "bg-gray-lighter",
};

export const Button = ({
  variant,
  bgColor,
  children,
  className,
  textSize,
  textWeight,
  onClick,
  href,
}: ButtonProps) => {
  if (variant === "emoji") {
    const emojiClass = `group flex items-center gap-0 overflow-hidden rounded-full px-10 py-4 transition-all duration-300 cursor-pointer ${colorClass[bgColor]} ${className ?? ""}`;
    const emojiContent = (
      <>
        <span className="flex w-0 overflow-hidden transition-all duration-300 group-hover:mr-2 group-hover:w-6">
          <Image src="/assets/icons/smile.svg" alt="" width={20} height={20} />
        </span>
        <Typography size={textSize} weight={textWeight}>
          {children}
        </Typography>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={emojiClass}>
          {emojiContent}
        </Link>
      );
    }
    return (
      <button type="button" onClick={onClick} className={emojiClass}>
        {emojiContent}
      </button>
    );
  }

  const defaultClass = `rounded-xl p-5 cursor-pointer ${colorClass[bgColor]} ${className ?? ""}`;
  const defaultContent = (
    <Typography size={textSize} weight={textWeight}>
      {children}
    </Typography>
  );

  if (href) {
    return (
      <Link href={href} className={defaultClass}>
        {defaultContent}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={defaultClass}>
      {defaultContent}
    </button>
  );
};
