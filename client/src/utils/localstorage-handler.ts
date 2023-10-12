import { IAddressData } from "@/type/addressData";

export const setLocalStorage = (collection: IAddressData[]): void => {
  localStorage.setItem(
    'addressContract', 
    JSON.stringify(collection)
  );
}

export const getLocalStorage = (): IAddressData[] => {
  const myAddress = localStorage.getItem('addressContract');
  const addressContract: IAddressData[] = myAddress 
    ? JSON.parse(myAddress)
    : [];

  return addressContract;
}