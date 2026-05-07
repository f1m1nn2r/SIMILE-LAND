import Image from "next/image";

const ICON_SIZE = "clamp(32px, 1.6667vw, 64px)";

export const Happy = () => {
  return (
    <div className="happy flex w-full justify-between">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={`happy-${index}`} style={{ width: ICON_SIZE }}>
          <Image
            src="/assets/icons/happy.svg"
            alt="행복"
            width={32}
            height={32}
            style={{ width: "100%", height: "auto" }}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
};
