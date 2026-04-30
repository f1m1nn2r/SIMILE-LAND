import Image from "next/image";

export const Happy = () => {
  return (
    <div className="happy flex w-full justify-between">
      {}
      <Image src="/assets/happy.svg" alt="행복" width={32} height={32}></Image>
      <Image src="/assets/happy.svg" alt="행복" width={32} height={32}></Image>
      <Image src="/assets/happy.svg" alt="행복" width={32} height={32}></Image>
    </div>
  );
};
