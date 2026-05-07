import type { ComponentPropsWithoutRef, ElementType } from "react";

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const sizeMap = {
  "heading-1": "text-heading-1",
  "heading-2": "text-heading-2",
  "heading-3": "text-heading-3",
  "heading-4": "text-heading-4",
  "heading-5": "text-heading-5",
  subtitle: "text-subtitle",
  body: "text-body",
  caption: "text-caption",
} as const;

export type Weight = keyof typeof weightMap;
export type Size = keyof typeof sizeMap;

type TypographyProps<T extends ElementType> = {
  as?: T;
  weight?: Weight;
  size?: Size;
} & Omit<ComponentPropsWithoutRef<T>, "weight" | "size">;

export const Typography = <T extends ElementType = "p">({
  as,
  weight,
  size,
  className,
  ...props
}: TypographyProps<T>) => {
  const Tag = as ?? "p";

  return (
    <Tag
      className={[weight && weightMap[weight], size && sizeMap[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
};
