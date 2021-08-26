import { Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchData,
  fetchTypes,
  IMockDataType,
  orderByPrice,
} from "../../utils";
import SearchBar from "./SearchBar";
import styles from "./styles.module.css";
import nextId from "react-id-generator";

const PartsTable = () => {
  const [dataSource, setDataSource] = useState<IMockDataType[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paramToFilter, setParamToFilter] = useState("");
  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(paramToFilter);
      const types = await fetchTypes();

      setDataSource(data);
      setTypes(types);
      setIsLoading(false);
    };

    isLoading && getData();
  }, [isLoading, paramToFilter]);

  const handleOrderByPrice = (isDescending: boolean) => {
    const filteredData = [...dataSource];
    filteredData.sort((a, b) => orderByPrice(a, b, isDescending));

    setDataSource(filteredData);
  };

  const handleFilterByType = (type: string) => {
    setParamToFilter(type);
    setIsLoading(true);
  };

  const handleSearch = (input: string) => setSearchByName(input);

  const filterByName = () =>
    dataSource.filter((data) =>
      data.name.toLowerCase().includes(searchByName.toLowerCase())
    );

  const columns: ColumnsType<IMockDataType> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
    },
    {
      key: "detail",
      render: (record: IMockDataType) => (
        <Link to={`/details/${record.name}`}>Detail</Link>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading} style={{ width: "100%" }}>
      <Table
        rowKey={() => nextId()}
        title={() => (
          <SearchBar
            menuItems={types}
            handleOrderByPrice={handleOrderByPrice}
            handleFilterByType={handleFilterByType}
            handleSearch={handleSearch}
          />
        )}
        dataSource={filterByName()}
        columns={columns}
        size="middle"
        className={styles.partsTable}
        pagination={{ position: ["bottomCenter"] }}
      />
    </Spin>
  );
};
export default PartsTable;
