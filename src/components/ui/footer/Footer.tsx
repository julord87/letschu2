import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>

        <Link
            href='/'
            className='flex items-center text-gray-500 hover:text-gray-800'
        >
            <span className={`${titleFont.className} antialiased font-bold mr-2`}>Lets Chu!</span>
            <span className='mr-2'>| shop</span>
            <span>© {new Date().getFullYear()}</span>
        </Link>

        <Link
            href='/'
            className='flex items-center text-gray-500 hover:text-gray-800 ml-2'
        > | Privacidad
        </Link>

    </div>
  )
}
