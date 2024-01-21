"use client";
import { Board, fetchBoards } from "@/app/api/boards";
import { useEffect, useState } from "react";
import BoardItem from "./components/BoardItem";
import styles from "./Boards.module.scss";

const Boards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const getBoards = async () => {
      const { data } = await fetchBoards();

      if (Object.keys(data).length) setBoards(data);
    };

    if (!boards.length) getBoards();
  }, [boards.length]);

  return (
    <div className="Boards">
      {boards.length > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>Boards ({boards.length})</h3>
          <ul className={styles.boardsContainer}>
            {boards.map(({ id, thumbnails, title }) => (
              <BoardItem
                key={id}
                id={id}
                thumbnail={thumbnails?.[0] ?? ""}
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
