import Image from "next/image";
import style from "./product.module.scss";
import { MerchCard } from "@/src/features/merch";
import { merchData } from "@/src/features/merch/constants";

export default function MerchList() {
  return (
    <div className={style.merch}>
      <div className={style["merch__banner"]}>
        <Image
          src="/assets/images/merch-banner.png"
          alt="Merch Banner"
          fill
          className={style["merch__banner-img"]}
          priority
        />
      </div>
      <div className={style["merch__grid"]}>
        {merchData.map((item) => (
          <MerchCard key={item.id} {...item} href={`/merch/${item.id}`} />
        ))}
      </div>
    </div>
  );
}
