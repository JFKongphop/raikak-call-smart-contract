import cheerio from 'cheerio';
import axios from 'axios';
import { generateUrlContract } from './generateUrlContract';
import { ABIInterface } from 'src/app.type';
import { HttpException, HttpStatus } from '@nestjs/common';

export const fetchContractABI = async (
  address: string,
  chainId: number,
): Promise<string | ABIInterface[]> => {
  const url = generateUrlContract(address, +chainId);

  if (url.length === 0) {
    throw new HttpException(
      'Invalid address or chain id',
      HttpStatus.NOT_FOUND,
    );
  }

  const mainTage = 'main#content';
  const abiTage = 'div#dividcode div pre#js-copytextarea2';
  let ABI = [];
  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);
    const item = $(mainTage);
    ABI = [...JSON.parse($(item).find(abiTage).text())];
  } catch {
    throw new HttpException(
      'Invalid address or chain id',
      HttpStatus.NOT_FOUND,
    );
  }

  const contractElements: ABIInterface[] = [];
  ABI.filter((data) => data.type === 'function').map((element) =>
    contractElements.push({
      function: element.name,
      parameter: element.inputs,
      stateMutability: element.stateMutability,
      outputs: element.outputs[0]?.type,
    }),
  );

  return contractElements;
};
