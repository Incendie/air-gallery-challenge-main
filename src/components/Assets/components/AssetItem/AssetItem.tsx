import Image from "next/image";
import styles from "./AssetItem.module.scss";
import { useMemo } from "react";

interface IAssetItem {
  duration?: number;
  hover?: boolean;
  id: string;
  isVideo: boolean;
  thumbnail: string;
  title: string;
}

const AssetItem = ({
  duration = 0,
  hover,
  id,
  isVideo,
  thumbnail,
  title,
}: IAssetItem) => {
  const videoLength = useMemo(() => {
    const minutes = Math.floor(duration / 60) ?? 0;
    const seconds = Math.floor(duration % 60) ?? 0;

    const secondsStr = seconds > 9 ? seconds.toString() : `0${seconds}`;

    return `${minutes.toString()}:${secondsStr}`;
  }, [duration]);

  return (
    <li key={id} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={thumbnail} alt="gallery thumbnail" />
        <div className={styles.overlay}>
          <h4>{title}</h4>
        </div>
        {isVideo && <p className={styles.videoLength}>{videoLength}</p>}
      </div>
    </li>
  );
};

export default AssetItem;
