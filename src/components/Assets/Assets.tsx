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
      if (!isFetching) {
        const { data, pagination } = await fetchAssets({ cursor });
        setIsFetching(false);

        if (data?.total) {
          setBoardAssets(prev => [...prev, ...data.clips]);
          setTotal(data.total);
        }

        if (pagination) setCursor(pagination.cursor ?? "");
      }
    },
    [isFetching]
  );

  // Fetch on infinite load w/intersection observer
  useEffect(() => {
    if (isBottomVisible && cursor && total) {
      getAssets(cursor);
    }
  }, [
    boardAssets.length,
    cursor,
    getAssets,
    isBottomVisible,
    isFetching,
    total,
  ]);

  // Used for infinite load
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log({ entry });
      setIsBottomVisible(entry.isIntersecting);
    });

    console.log({ bottomRef }.bottomRef.current);
    if (bottomRef.current) {
      console.log("obs");
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Init Fetch
  useEffect(() => {
    if (!boardAssets.length) {
      setIsFetching(true);
      getAssets(null);
    }
  }, [boardAssets.length, getAssets]);

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
                    previewVideo={assets.previewVideo ?? ""}
                    thumbnail={assets.image}
                    title={displayName}
                  />
                );
              }
            )}
          </ul>
          <div className="bottom" ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default Assets;
