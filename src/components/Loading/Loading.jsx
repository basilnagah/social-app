import React from 'react'
import { Atom } from 'react-loading-indicators'

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Atom color="#1c64f2" size="medium" />
    </div>
  )
}
