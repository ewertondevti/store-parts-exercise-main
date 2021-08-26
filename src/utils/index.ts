export interface IMockDataType {
  name: string;
  price: string;
  type: string;
}

export type Type = "mouse" | "keyboard" | "monitor" | "mousepad";

export const API_PATH = "http://localhost:8081";

export const fetchData = async (params?: string) => {
  let url = `${API_PATH}/store/parts`;

  if (params) url += `?type=${params}`;

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export const fetchTypes = async () => {
  let url = `${API_PATH}/store/part-types`;

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export const fetchPartsByName = async (name: string) => {
  let url = `${API_PATH}/store/parts/${name}`;

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export const orderByPrice = (
  a: IMockDataType,
  b: IMockDataType,
  isDescending: boolean
) => {
  if (isDescending) {
    if (parseStringToNumber(a.price) > parseStringToNumber(b.price)) return -1;
    if (parseStringToNumber(a.price) < parseStringToNumber(b.price)) return 1;
    return 0;
  } else {
    if (parseStringToNumber(a.price) > parseStringToNumber(b.price)) return 1;
    if (parseStringToNumber(a.price) < parseStringToNumber(b.price)) return -1;
    return 0;
  }
};

export const parseStringToNumber = (price: string) =>
  Number(price.split("$")[0]);

export interface IParams {
  name: string;
}

export const getAssetPathname = (partsName: string) =>
  partsName.toLowerCase().replace(/\s*/g, "");
