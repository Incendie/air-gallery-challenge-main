import Image from "next/image";
import styles from "./GalleryItem.module.scss";

interface IGalleryItem {
  id: string;
  thumbnails: string[];
  title: string;
}

const GalleryItem = ({ id, thumbnails, title }: IGalleryItem) => {
  // const boardTitles = [Brand Guidelines]
  return (
    <li key={id} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={thumbnails[0]} alt="gallery thumbnail" />
        <div className={styles.overlay}>
          <h4>{title}</h4>{" "}
        </div>
      </div>
    </li>
  );
};

export default GalleryItem;
