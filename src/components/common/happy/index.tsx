import Image from "next/image";

export const Happy = () => {
  return (
    <div className="happy flex w-full justify-between">
      {Array.from({ length: 3 }, (_, index) => (
        <Image
          key={`happy-${index}`}
          src="/assets/happy.svg"
          alt="행복"
          width={32}
          height={32}
          loading="eager"
        />
      ))}
    </div>
  );
};
