import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div>
      <input className={styles.Search} placeholder="Search board" />
    </div>
  );
};

export default Search;
