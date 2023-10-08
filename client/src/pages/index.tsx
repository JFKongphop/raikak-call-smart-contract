import { VITE_API_ENDPOINT } from '@/configs/enviroment'
import React from 'react'

const index = () => {
  console.log(VITE_API_ENDPOINT)
  return (
    <div>index</div>
  )
}

export default index