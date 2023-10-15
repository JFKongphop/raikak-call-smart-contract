# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


{
    "hash": "0xdaefe92529e838793f12b34ce7a534ac2780f9dc922f71066a92658c33bddbb0",
    "type": 2,
    "accessList": null,
    "blockHash": null,
    "blockNumber": null,
    "transactionIndex": null,
    "confirmations": 0,
    "from": "0xd73F821fcA522Cbb672F8354d25470DBf4948c9C",
    "gasPrice": {
        "type": "BigNumber",
        "hex": "0x59682f0d"
    },
    "maxPriorityFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682f00"
    },
    "maxFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682f0d"
    },
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x7f5f"
    },
    "to": "0x235BE3396C94942Dccd7788C32E65f23154A8ED6",
    "value": {
        "type": "BigNumber",
        "hex": "0x00"
    },
    "nonce": 75,
    "data": "0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000066c656f6c656f0000000000000000000000000000000000000000000000000000",
    "r": "0x0c73b6200fd41cbe934e04efcb7eba1211f5ed7ebca5fcdcd2fc44909209d80a",
    "s": "0x76d35e62eac8f031bf70d413a21f7f2c728f35f248b2878762f928a947d817df",
    "v": 1,
    "creates": null,
    "chainId": 0
}