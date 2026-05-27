import styles from "./sidebar.module.css"
interface IProps {
  children: React.ReactNode;
}
export default function Sidebar({children}: IProps) {
    return <div className={styles.sidebar}>
        <section className={styles.leftsidebar}></section>
        <section className={styles.sidebar_children}>{children}</section>
    </div>
}