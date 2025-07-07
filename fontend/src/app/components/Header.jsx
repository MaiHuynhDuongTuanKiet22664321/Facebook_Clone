"use client"
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

import Image from 'next/image'
import React, { useState } from 'react'

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    return (
        <header className='bg-white dark:bg-[rgb(36,37,38)] text-foreground shadow-md h-16 fixed top-0 left-0 right-0 z-50 p-2'>
            <div className='mx-auto flex justify-between items-center p-2'>
                <div className='flex items-center gap-2 md:gap-4'>
                    <Image
                        src='/images/logoFB.png'
                        width={45}
                        height={45}
                        alt='facebook_logo'
                    />
                     <div className='relative'>
                    <form>
                        <div className='relative'>
                            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <Input
                                className='pl-8 w-40 md:w-64 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full'
                                placeholder='search facebook...'
                                onFocus={() => setIsSearchOpen(true)}
                                onBlur={() => setIsSearchOpen(false)}
                            />
                        </div>
                        {isSearchOpen && (
                            <div className='absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg mt-1 z-50'>
                                <div className='p-2'>
                                    <div className='flex items-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer'>
                                        {/* Search results go here */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                </div>    
            </div>
        </header>
    )
}

export default Header
