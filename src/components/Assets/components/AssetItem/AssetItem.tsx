import styles from "./AssetItem.module.scss";
import { useMemo, useState } from "react";

interface IAssetItem {
  duration?: number;
  isVideo: boolean;
  previewVideo: string;
  thumbnail: string;
  title: string;
}

const AssetItem = ({
  duration = 0,
  isVideo,
  previewVideo,
  thumbnail,
  title,
}: IAssetItem) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoLength = useMemo(() => {
    const minutes = Math.floor(duration / 60) ?? 0;
    const seconds = Math.floor(duration % 60) ?? 0;

    const secondsStr = seconds > 9 ? seconds.toString() : `0${seconds}`;

    return `${minutes.toString()}:${secondsStr}`;
  }, [duration]);

  return (
    <li
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.mediaContainer}>
        {(!isHovered || !isVideo) && (
          <img src={thumbnail} alt="gallery thumbnail" />
        )}
        {isHovered && isVideo && (
          <video autoPlay loop>
            <source src={previewVideo} type="video/mp4" />
          </video>
        )}

        <div className={styles.overlay}>
          <h4>{title}</h4>
        </div>
        {isVideo && <p className={styles.videoLength}>{videoLength}</p>}
      </div>
    </li>
  );
};

export default AssetItem;
