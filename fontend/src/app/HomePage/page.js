"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'
import StorySection from '@/app/story/StorySection'
import NewPostForm from '../post/NewPostForm'
import PostCard from '../post/PostCard'

const HomePage = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false)

  const posts = [
    {
      id:1,
      content: "Facebook Clone",
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      user: {
        username: "Mai Huynh Duong Tuan Kiet",
        avatarUrl: "...",
      },
      comments: [
        {
          user: {
            username: "Mai Huynh Duong Tuan Kiet",
            avatarUrl: "...",
          },
          text: "Hello",
          createdAt: "1h ago",
        },
        {
          user: {
            username: "Mai Tuan Kiet",
            avatarUrl: "...",
          },
          text: "Good morning",
          createdAt: "4h ago",
        },
      ],
    },
    {
      id:2,
      content: "Nui ",
      mediaUrl: "https://images.unsplash.com/photo-1751420860835-68256ba0f82a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      user: {
        username: "Duong Tuan Kiet",
        avatarUrl: "...",
      },
      comments: [
        {
          user: {
            username: "Mai Huynh Duong Tuan Kiet",
            avatarUrl: "...",
          },
          text: "Here we go",
          createdAt: "3 day ago",
        },
        {
          user: {
            username: "Tuan Kiet",
            avatarUrl: "...",
          },
          text: "Good morning",
          createdAt: "4h ago",
        },
      ],   
    }
  ]

  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground'>
      <main className='flex flex-1 pt-16'>
        <LeftSideBar />

        <div className='flex-1 px-4 py-6 mx-auto w-full max-w-3xl'>
          <StorySection />
          <NewPostForm
            isPostFormOpen={isPostFormOpen}
            setIsPostFormOpen={setIsPostFormOpen}
          />
          <div className='mt-6 space-y-6'>
            {posts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
              />
            ))}
          </div>
        </div>

        <div className='hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4 bg-background'>
          <RightSideBar />
        </div>
      </main>
    </div>
  )
}

export default HomePage
