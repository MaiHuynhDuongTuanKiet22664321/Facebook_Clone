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
      content: "Hello world",
      mediaUrl: "http://localhost",
      mediaType: "video"
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
