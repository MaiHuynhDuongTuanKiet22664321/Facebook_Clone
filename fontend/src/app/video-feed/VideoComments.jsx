"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

const VideoComments = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <div className='flex items-start space-x-2 mb-4' key={index}>
          <Avatar className="w-8 h-8 rounded mr-3">
            <AvatarImage />
            <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <div className='bg-gray-100 dark:bg-gray-700 p-2 rounded'>
              <p className='font-semibold text-sm'>{comment?.user?.username}</p>
              <p className='text-sm'>{comment?.text}</p>
            </div>
            <div className='flex items-center mt-1 text-xs text-gray-400'>
              <Button variant='ghost' size="sm">Like</Button>
              <Button variant='ghost' size="sm">Reply</Button>
              <span>{comment?.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default VideoComments
