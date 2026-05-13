import Image from "next/image";
import { ReactNode } from "react";
import { Typography } from "../typography";

type EmptyProps = {
  children: ReactNode;
};

export const FetchError = ({ children }: EmptyProps) => {
  return (
    <div className="empty space-y-5">
      <Image src="/assets/icon/dead-dazed.svg" alt="" width={32} height={32} />
      <Typography>{children}</Typography>
    </div>
  );
};
