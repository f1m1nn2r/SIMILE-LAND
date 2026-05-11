import Image from "next/image";
import style from "./discography-list.module.scss";
import { Happy } from "@/src/components/common/happy";
import { DiscographyCard } from "@/src/features/discography";
import { discographyData } from "@/src/features/discography/constants";
import { Typography } from "@/src/components/common/typography";

export default function DiscographyList() {
  return (
    <div className={style["discography-list"]}>
      <div className={style["discography-list__hero"]}>
        <Typography
          size="display"
          weight="bold"
          className={style["discography-list__title"]}
        >
          <span>DISCO</span>
          <span className={style["discography-list__title-line2"]}>GRAPHY</span>
        </Typography>
        <div className={style["discography-list__deco1"]}>
          <Image
            src="/assets/images/discography-deco1.png"
            alt=""
            width={360}
            height={450}
            priority
          />
        </div>
        <div className={style["discography-list__deco2"]}>
          <Image
            src="/assets/images/discography-deco2.png"
            alt=""
            width={250}
            height={380}
            priority
          />
        </div>
        <div className={style["discography-list__happy"]}>
          <Happy />
        </div>
      </div>

      <div className={style["discography-list__grid"]}>
        {discographyData.map((album) => (
          <DiscographyCard
            key={album.id}
            {...album}
            href={`/discography/${album.id}`}
          />
        ))}
      </div>
    </div>
  );
}
