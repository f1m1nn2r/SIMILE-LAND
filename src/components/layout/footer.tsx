import style from "./layout.module.scss";
import { Happy } from "../common/happy";
import { Typography } from "../common/typography";

export const Footer = () => {
  return (
    <footer className={style["site-footer"]}>
      <div className={style["site-footer__inner"]}>
        <Typography
          weight="bold"
          size="heading-3"
          className={style["site-footer__title"]}
        >
          SIMILE LAND
        </Typography>

        <div className={style["site-footer__decoration"]}>
          <Happy />
        </div>
      </div>
    </footer>
  );
};
