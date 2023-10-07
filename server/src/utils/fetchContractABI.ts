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

  if (!url.includes('https'))
    throw new HttpException(
      'Invalid address or chain id',
      HttpStatus.NOT_FOUND,
    );

  const mainTage = 'main#content';
  const abiTage = 'div#dividcode div pre#js-copytextarea2';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const item = $(mainTage);
  const ABI = [...JSON.parse($(item).find(abiTage).text())];

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
