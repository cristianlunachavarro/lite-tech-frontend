import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../modal";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = () => {
    setIsModalOpen(false);
    navigate("/posts/");
  };

  return (
    <div className={styles.headerContainer}>
      <h3 onClick={handleNavigate} className={styles.titleContainer}>
        <span className={styles.asterisk}>*</span>lite-tech
      </h3>
      <h6 onClick={handleOpenModal} className={styles.buttonContainer}>New Post <span className={styles.arrow}>→</span></h6>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default Header;
