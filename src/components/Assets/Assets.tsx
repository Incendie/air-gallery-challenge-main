"use client";
import { useEffect, useState } from "react";
import AssetItem from "./components/AssetItem";
import styles from "./Assets.module.scss";
import { Clip, fetchAssets } from "@/app/api/clips";

const Assets = () => {
  const [boardAssets, setBoardAssets] = useState<Clip[]>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await fetchAssets({ cursor: null });
      console.log({ data }, data.clips[0]);
      if (data) {
        setBoardAssets(data.clips);
        setTotal(data.total);
      }
    };

    getAssets();
  }, []);

  return (
    <div className="Assets">
      {boardAssets && total > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>Assets ({boardAssets.length})</h3>
          <ul className={styles.assetsContainer}>
            {boardAssets.map(
              ({ assets, assetId, displayName, duration, ext, id }) => (
                <AssetItem
                  duration={duration}
                  key={assetId}
                  id={id}
                  isVideo={ext === "mp4"}
                  thumbnail={assets.image}
                  title={displayName}
                  hover
                />
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Assets;
