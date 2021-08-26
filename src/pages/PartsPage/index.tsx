import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPartsByName,
  getAssetPathname,
  IMockDataType,
  IParams,
} from "../../utils";
import styles from "./styles.module.css";

const PartsPage = () => {
  const [partDetail, setPartDetail] = useState<IMockDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams<IParams>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPartsByName(name);

      setPartDetail(data);
      setIsLoading(false);
    };

    isLoading && name && getData();
  }, [isLoading, name]);

  return (
    <Spin spinning={isLoading} style={{ width: "100%" }}>
      <div className={styles.content}>
        {partDetail?.name && (
          <img
            className={styles.image}
            src={`/assets/images/${getAssetPathname(partDetail.name)}.jpg`}
            alt={partDetail.name}
          />
        )}
        <div className={styles.simpleTable}>
          <div className={styles.title}>
            <h1>Details</h1>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h3 className={styles.h3}>Name:</h3>
            </div>
            <div className={styles.column}>
              <span className={styles.span}>{partDetail?.name}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h3 className={styles.h3}>Type:</h3>
            </div>
            <div className={styles.column}>
              <span className={styles.span}>{partDetail?.type}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h3 className={styles.h3}>Price:</h3>
            </div>
            <div className={styles.column}>
              <span className={styles.span}>{partDetail?.price}</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="primary"
        role="link"
        icon={<LeftCircleOutlined />}
        className={styles.button}
        href="/"
      >
        Voltar
      </Button>
    </Spin>
  );
};
export default PartsPage;
