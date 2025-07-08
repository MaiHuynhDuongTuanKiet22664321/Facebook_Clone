"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AnimatePresence ,motion} from 'framer-motion'
import { UserMinus2, UserPlus, UserPlus2 } from 'lucide-react'
import React from 'react'

const FriendRequest = ({friend}) => {
  return (
    <AnimatePresence>
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-white dark:bg-gray-800 p-4 rounded-lg '
        >
            <Avatar className='w-32 h-32 rounded mx-auto mb-4'>
                <AvatarImage />
                <AvatarFallback className="dark:bg-gray-400">
                    A
                </AvatarFallback>
            </Avatar>
            <h3 className='text-lg font-semibold text-center mb-4'>Mai Duong Tuan</h3>
            <div className='flex flex-col justify-center'>
                <Button className='bg-blue-500 ' size='lg' onClick={() => {}}>
                    <UserPlus2 className='mr-2 h-4 w-4 '/>Confirm
                </Button>

                <Button className='mt-2' size='lg' onClick={() => {}}>
                    <UserMinus2 className='mr-2 h-4 w-4 '/>Delete
                </Button>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default FriendRequest
