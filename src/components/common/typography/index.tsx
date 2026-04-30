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
  body: "text-body",
  caption: "text-caption",
} as const;

type Weight = keyof typeof weightMap;
type Size = keyof typeof sizeMap;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  weight?: Weight;
  size?: Size;
} & Omit<React.ComponentPropsWithoutRef<T>, "weight" | "size">;

export const Typography = <T extends React.ElementType = "p">({
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
