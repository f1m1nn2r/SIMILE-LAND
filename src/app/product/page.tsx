import Image from "next/image";
import style from "./product.module.scss";
import { MerchCard } from "@/src/features/merch";
import { merchData } from "@/src/features/merch/constants";

export default function ProductList() {
  return (
    <div className={style.product}>
      <div className={style["product__banner"]}>
        <Image
          src="/assets/images/merch-banner.png"
          alt="Merch Banner"
          fill
          className={style["product__banner-img"]}
          priority
        />
      </div>
      <div className={style["product__grid"]}>
        {merchData.map((item, index) => (
          <MerchCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
