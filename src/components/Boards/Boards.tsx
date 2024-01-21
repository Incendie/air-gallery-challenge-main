"use client";
import { Board, fetchBoards } from "@/app/api/boards";
import { useEffect, useState } from "react";
import GalleryItem from "../GalleryItem";
import styles from "./Boards.module.scss";

const Boards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const getBoards = async () => {
      const { data } = await fetchBoards();
      console.log(data);
      if (data) setBoards(data);
    };

    getBoards();
  }, []);

  return (
    <div className="Boards">
      {boards.length > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>Boards ({boards.length})</h3>
          <ul className={styles.boardsContainer}>
            {boards.map(({ id, thumbnails, title }) => (
              <GalleryItem
                key={id}
                id={id}
                thumbnails={thumbnails ?? []}
                title={title}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Boards;
