import styles from "./styles.module.css";

interface IProps {
  children?: any;
}

const Content = ({ children }: IProps) => {
  return <div className={styles.content}>{children}</div>;
};
export default Content;
