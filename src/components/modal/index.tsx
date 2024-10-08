import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostRelated, uploadImage } from "../../actions/posts";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [article, setArticle] = useState<string>("");

  const [titleError, setTitleError] = useState<string>("");
  const [articleError, setArticleError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const [postSuccess, setPostSuccess] = useState<boolean>(false);

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const validPost = () => {
    let isValid = true;
    setTitleError("");
    setArticleError("");
    setImageError("");

    if (!title) {
      setTitleError("Title cannot be empty");
      isValid = false;
    }
    if (!article) {
      setArticleError("Article cannot be empty");
      isValid = false;
    }
    if (!image) {
      setImageError("Image cannot be empty");
      isValid = false;
    }
    return isValid;
  };

  const createNewPost = async () => {
    if (validPost()) {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }
      dispatch(createPostRelated({ title, article, imageUrl }, setPostSuccess));
      setTitle("");
      setImage(null);
      setArticle("");
      setUploadProgress(0);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleArticle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setArticle(value);
  };

  const handleSubmit = () => {
    createNewPost();
  };

  if (postSuccess) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div
            onClick={onClose}
            className={styles.closeButton}
            style={{ alignSelf: "end", fontWeight: "700" }}
          >
            X
          </div>
          <h3 style={{ textAlign: "center" }}>
            Your post was <br /> successfully uploaded!
          </h3>
          <button onClick={onClose} className={styles.confirmButton}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div
          onClick={onClose}
          className={styles.closeButton}
          style={{ alignSelf: "end", fontWeight: "700" }}
        >
          X
        </div>
        <h2>Upload your post</h2>
        <p className={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="Post title"
          className={titleError && styles.errorInput}
        />
        <p className={styles.error}>{titleError}</p>

        <textarea
          value={article}
          onChange={handleArticle}
          placeholder="Post text"
          className={articleError && styles.errorInput}
        />
        <p className={styles.error}>{articleError}</p>

        <label className={styles.fileLabel}>
          {image ? image.name : "Upload Image ↑"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ display: "none" }}
          />
        </label>
        <p className={styles.error}>{imageError}</p>

        {/* {uploadProgress > 0 && (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${uploadProgress}%` }}
            />
            <span>{uploadProgress.toFixed(0)}%</span>
          </div>
        )} */}

        <button onClick={handleSubmit} className={styles.confirmButton}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
