"use client"
import React, { useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import { FriendCardSkeleton, NoFriendsMessage } from '@/lib/Skeleten'
import FriendRequest from './FriendRequest'
import FriendSuggestion from './FriendSuggestion'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)
    const friendRequest = [{

    }]
    const friendSuggestions = [{

    }]
  return (
    <div className='nim-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)]'>
        <LeftSideBar/>
        <main className='ml-0 md:ml-64 mt-16 p-6'>
            <h1 className='text-2xl font-bold mb-6'>Friends Request</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                {loading ? (
                    <FriendCardSkeleton/>
                ):friendRequest.length  === 0 ? (
                    <NoFriendsMessage
                    text="No Friend Request"
                    description="Looks like you are all caught up! Why not explore and connect with new people?"
                    />
                ):(
                    friendRequest.map((friend,index) =>(
                        // eslint-disable-next-line react/jsx-key
                        <FriendRequest
                        friend={friend}
                        key={index}
                        
                        />
                    ))
                )}
            </div>

            <h1 className='text-2xl font-bold mb-6'>Pepole you may know</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                {loading ? (
                    <FriendCardSkeleton/>
                ):friendSuggestions.length  === 0 ? (
                    <NoFriendsMessage
                    text="No Friend Suggestions"
                    description="Looks like you are all caught up! Why not explore and connect with new people?"
                    />
                ):(
                    friendSuggestions.map((friend) =>(
                        // eslint-disable-next-line react/jsx-key
                        <FriendSuggestion
                        friend={friend}
                        />
                    ))
                )}
            </div>
        </main>
      
    </div>
  )
}

export default page
