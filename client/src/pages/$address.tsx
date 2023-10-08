import WalletContext from '@/context/WalletContext';
import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const $address = () => {
  const { address: abiPath } = useParams();

  const { onConnectWallet } = useContext(WalletContext);
  

  return (
    <div>$address
      <button onClick={onConnectWallet}>connect</button>
    </div>
  )
}

export default $address;