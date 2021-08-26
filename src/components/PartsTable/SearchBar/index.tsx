import { Button, Input, Select } from "antd";
import styles from "./styles.module.css";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useState } from "react";
import nextId from "react-id-generator";

interface IProps {
  menuItems: string[];
  handleOrderByPrice: (isDescending: boolean) => void;
  handleFilterByType: (type: string) => void;
  handleSearch: (input: string) => void;
}

const SearchBar = ({
  menuItems,
  handleOrderByPrice,
  handleFilterByType,
  handleSearch,
}: IProps) => {
  const [isDescendingOrder, setIsDescendingOrder] = useState<boolean>(false);

  const renderIcon = () =>
    isDescendingOrder ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

  const handleClick = () => {
    handleOrderByPrice(isDescendingOrder);
    setIsDescendingOrder(!isDescendingOrder);
  };

  return (
    <div className={styles.searchBar}>
      <Input.Search
        placeholder="Search..."
        allowClear
        enterButton
        onSearch={handleSearch}
      />
      <Select
        placeholder="Filter..."
        className={styles.select}
        onChange={handleFilterByType}
        allowClear
      >
        {!!menuItems.length &&
          menuItems.map((item) => (
            <Select.Option key={nextId()} value={item}>
              {item}
            </Select.Option>
          ))}
      </Select>
      <Button
        onClick={handleClick}
        className={styles.button}
        style={{ display: "flex" }}
      >
        Order by Price {renderIcon()}
      </Button>
    </div>
  );
};
export default SearchBar;
