const COLORS = [
  "var(--color-blue)",
  "var(--color-orange)",
  "var(--color-pink)",
] as const;

interface ColorDotsProps {
  size?: number;
  gap?: number;
}

export const ColorDots = ({ size = 20, gap = 30 }: ColorDotsProps) => {
  return (
    <div className="flex" style={{ gap }}>
      {COLORS.map((color) => (
        <span
          key={color}
          style={{ width: size, height: size, backgroundColor: color }}
        />
      ))}
    </div>
  );
};
