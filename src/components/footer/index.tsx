import facebookIcon from "../../assets/images/icons/facebook-icon.png";
import linkedinIcon from "../../assets/images/icons/linkedin-icon.png";
import twitterIcon from "../../assets/images/icons/twitter-icon.png";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.sectionContainer}>
        <h2>
          <span className={styles.asterisk}>*</span>lite-tech
        </h2>{" "}
        <div className={styles.iconsContainer}>
          <img src={facebookIcon} alt="facebook-icon" />
          <img src={linkedinIcon} alt="linkedin-icon" />
          <img src={twitterIcon} alt="twitter-icon" />
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <p>© Copyright Lite-Tech. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
