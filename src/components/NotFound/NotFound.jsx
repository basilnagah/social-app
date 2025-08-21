import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <h2 className=' text-4xl font-semibold'>NOT FOUND 😁 ....</h2>
            <Link className='text-4xl' to={'/home'}>return to home page</Link>
        </div>
    )
}
