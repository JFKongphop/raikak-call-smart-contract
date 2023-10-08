/// <reference types="vite/client" />
interface Window {
  ethereum: import('ethers').providers.ExternalProvider & {
    on(event: string, callback: (accounts: string[]) => void): void;
  };
}