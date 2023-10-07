import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { fetchContractABI } from './utils/fetchContractABI';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  running(): string {
    throw new HttpException({ message: 'API is running' }, HttpStatus.OK);
  }

  async getContractABI(address: string, chainId: number) {
    if (!address || !chainId) {
      throw new HttpException(
        'Invalid address or chain id',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const cachedAbi = await this.cacheManager.get(`${address}/${chainId}`);

      if (cachedAbi) {
        return cachedAbi;
      }

      const abi = await fetchContractABI(address, chainId);
      this.cacheManager.set(`${address}/${chainId}`, abi, 3600000);
      return abi;
    } catch {
      throw new HttpException(
        'Server is error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
