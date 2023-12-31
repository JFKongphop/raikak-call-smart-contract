export interface IAddressData {
  name: string;
  address: string;
  chainId: number;
}

export interface ParameterFunction {
  internalType: string;
  name: string;
  type: string;
}

export interface ABIElement {
  function: string,
  parameter: ParameterFunction[],
  stateMutability: string,
  outputs: string;
}

export interface FunctionName {
  function: string;
  method: string,
}

export const initialABIElement: ABIElement = {
  function: '',
  parameter: [],
  stateMutability: '',
  outputs: ''
}

export const initialCollection: IAddressData = {
  name: '',
  address: '',
  chainId: 0
}