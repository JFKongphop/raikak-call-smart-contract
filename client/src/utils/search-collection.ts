import WalletContext from "@/context/WalletContext";
import { IAddressData } from "@/type/addressData";
import { useContext } from "react";

export const searchCollectionHandler = (word: string): IAddressData[] => {
  const { contractCollections } = useContext(WalletContext);

  return contractCollections.filter((collection: any) => {
    return ['name'].some((collectionName) => {
      return (
        collection[collectionName]
          .toString()
          .toLowerCase()
          .indexOf(word.toLowerCase()) > -1
      );
    });
  });
};