import Image from "next/image";
import { Typography } from "../components/common/typography";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-40 text-[var(--color-ink)]">
      <Image src="/assets/icons/no.svg" alt="" width={32} height={32} />
      <Typography as="h1" size="heading-2" weight="bold">
        Oops!
      </Typography>
      <Typography size="subtitle" className="text-center">
        해당 페이지가 없거나
        <br />
        링크를 잘못 입력하셨어요.
      </Typography>
    </div>
  );
}
