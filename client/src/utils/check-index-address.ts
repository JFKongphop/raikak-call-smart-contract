import { utils } from "ethers";

const locatedIndexAddress = (params: string[]): number[] => {
  const indexOfAddress: number[] = []
  params.forEach((
    element: string, 
    index: number
  ) => {
    if (element === 'address') {
      indexOfAddress.push(index);
    }
  });

  return indexOfAddress;
}

export const checkAddressIndexIsValid = (
  sortedArguments: (string | number)[],
  parametersType: string[]
): boolean => {
  const indexOfAddress = locatedIndexAddress(parametersType);
  const lengthOfIndexAddress = indexOfAddress.length;
  const statusIsAddress: boolean[] = []
  for (let index = 0; index < lengthOfIndexAddress; index++) {
    statusIsAddress.push(
      utils.isAddress(
        sortedArguments[indexOfAddress[index]].toString()
      )
    );
  }
  const filterStatusAddress = statusIsAddress.filter(Boolean);

  return statusIsAddress.length !== filterStatusAddress.length;
}