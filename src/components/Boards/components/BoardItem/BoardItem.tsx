import Image from "next/image";
import styles from "./BoardItem.module.scss";

interface IGalleryItem {
  hover?: boolean;
  id: string;
  thumbnail: string;
  title: string;
}

const BoardItem = ({ hover, id, thumbnail, title }: IGalleryItem) => {
  return (
    <li key={id} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={thumbnail} alt="gallery thumbnail" />
        <div className={`${styles.overlay} ${hover ? styles.hover : ""}`}>
          <h4>{title}</h4>
        </div>
      </div>
    </li>
  );
};

export default BoardItem;
