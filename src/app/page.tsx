import Header from "@/components/Header";
import Main from "@/components/Main";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <Main />
    </div>
  );
}
