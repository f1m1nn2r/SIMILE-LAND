import { ColorDots } from "@/src/components/common/color-dots";
import { Typography } from "@/src/components/common/typography";
import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <Typography as="h2" weight="bold" size="heading-2">
        {children}
      </Typography>
      <ColorDots />
    </div>
  );
};
