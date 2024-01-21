import Assets from "../Assets";
import Boards from "../Boards";
import styles from "./Gallery.module.scss";

const Gallery = () => {
  return (
    <div className={styles.Gallery}>
      <Boards />
      <Assets />
    </div>
  );
};

export default Gallery;
