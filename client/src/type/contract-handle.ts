import { BigNumber } from "ethers";

export interface CustomTypeArguments {
  [key: string]: number | string;
}

export interface ResponseData {
  message: string;
  data?: string;
  hash?: string;
  gasPrice?: string;
}

export const initialResponseData: ResponseData = {
  message: '',
  data: '',
  hash: '',
  gasPrice: ''
}
