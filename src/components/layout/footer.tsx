import { Happy } from "../common/happy";
import { Typography } from "../common/typography";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Typography
          weight="bold"
          size="heading-3"
          className="site-footer__title text-white"
        >
          SIMILE LAND
        </Typography>

        <div className="site-footer__decoration">
          <Happy />
        </div>
      </div>
    </footer>
  );
};
