"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import AssetItem from "./components/AssetItem";
import styles from "./Assets.module.scss";
import { Clip, fetchAssets } from "@/app/api/clips";

const Assets = () => {
  const bottomRef = useRef(null);
  const [boardAssets, setBoardAssets] = useState<Clip[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [total, setTotal] = useState<number>(0);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getAssets = useCallback(
    async (cursor: string | null) => {
      console.log({ isFetching });
      if (!isFetching) {
        const { data, pagination } = await fetchAssets({ cursor });
        setIsFetching(false);
        console.log({ data, pagination, cursor });
        if (data?.total) {
          setBoardAssets(prev => [...prev, ...data.clips]);
          setTotal(data.total);
        }

        if (pagination) setCursor(pagination.cursor ?? "");
      }
    },
    [isFetching]
  );

  useEffect(() => {
    console.log(boardAssets.length);
    if (isBottomVisible && cursor && total) {
      console.log("get", { cursor });
      setIsFetching(true);
      getAssets(cursor);
    } else if (!boardAssets.length) {
      console.log("init fetch");
      setIsFetching(true);
      getAssets(null);
    }
  }, [boardAssets.length, cursor, getAssets, isBottomVisible, total]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry);
      setIsBottomVisible(entry.isVisible);
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log("boardAssets.length", boardAssets.length);
  }, [boardAssets.length]);

  return (
    <div className="Assets">
      {boardAssets && total > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>Assets ({boardAssets.length})</h3>
          <ul className={styles.assetsContainer}>
            {boardAssets.map(
              ({ assets, assetId, displayName, duration, ext, id }) => {
                return (
                  <AssetItem
                    duration={duration}
                    key={assetId}
                    isVideo={ext === "mp4"}
                    previewVideo={assets.previewVideo}
                    thumbnail={assets.image}
                    title={displayName}
                    hover
                  />
                );
              }
            )}
          </ul>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default Assets;
