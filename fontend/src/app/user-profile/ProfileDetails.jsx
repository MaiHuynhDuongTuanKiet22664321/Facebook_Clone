"use client"
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import PostsContent from './profileContent/PostsContent' // sửa đúng tên file
import { Briefcase, Cake, GraduationCap, Heart, Heater, Home, Mail, MapPin, Phone, Rss } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import MutualFriends from './profileContent/MutualFriends'
import EditBio from './profileContent/EditBio'

const ProfileDetails = ({ activeTab }) => {
    const [isEditBioModel, setIsEditBioModel] = useState(false);
   const userPosts = [
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
  const tabContent = {
    posts: (
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[70%] space-y-6'>
          {userPosts?.map((post) => (
            <PostsContent
              key={post?.id} 
              post={post}
            />
          ))}
        </div>
        <div className='w-full lg:w-[30%]'>
          <Card>
            <CardContent className='p-6'>
                <h2 className='text-xl font-semibold mb-4 dark:text-gray-300'>Intro</h2>
                <div className='space-y-4 dark:text-gray-300'>
                    <div className='flex items-center'>
                        <Home className='w-5 h-5 mr-2'/>
                        <span>Live in Viet Nam</span>
                    </div>

                    <div className='flex items-center'>
                        <Heart className='w-5 h-5 mr-2'/>
                        <span>Single</span>
                    </div>

                    <div className='flex items-center'>
                        <MapPin className='w-5 h-5 mr-2'/>
                        <span>From Up Tay Ninh</span>
                    </div>

                    <div className='flex items-center'>
                        <Briefcase className='w-5 h-5 mr-2'/>
                        <span>Work at Viet Nam</span>
                    </div>

                    <div className='flex items-center'>
                        <GraduationCap className='w-5 h-5 mr-2'/>
                        <span>Studied at IUH</span>
                    </div>
                </div>
                <div className='flex items-center mb-4'>
                    <Rss className='w-5 h-5 mr-2'/>
                    <span>Followed by 10 people</span>
                </div>
                <Button className='w-full' onClick={() => setIsEditBioModel(true)}>
                    Edit Bio
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
    about:(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='mb-4'
        >
            <Card>
            <CardContent className='p-6'>
                <h2 className='text-xl font-semibold mb-4 dark:text-gray-300'>About {" "} Mai Huynh Duong Tuan Kiet</h2>
                <p className='text-gray-600 dark:text-gray-400 mb-4'>This is Kiet student IT</p>
                <div className='space-y-4 dark:text-gray-300'>
                    <div className='flex items-center'>
                        <Briefcase className='w-5 h-5 mr-2'/>
                        <span>Work at Viet Nam</span>
                    </div>

                    <div className='flex items-center'>
                        <GraduationCap className='w-5 h-5 mr-2'/>
                        <span>Studied at IUH</span>
                    </div>

                    <div className='flex items-center'>
                        <Home className='w-5 h-5 mr-2'/>
                        <span>Live in Viet Nam</span>
                    </div>

                    <div className='flex items-center'>
                        <Heart className='w-5 h-5 mr-2'/>
                        <span>Single</span>
                    </div>

                    <div className='flex items-center'>
                        <MapPin className='w-5 h-5 mr-2'/>
                        <span>From Up Tay Ninh</span>
                    </div>

                    <div className='flex items-center'>
                        <Briefcase className='w-5 h-5 mr-2'/>
                        <span>Work at Viet Nam</span>
                    </div>

                    <div className='flex items-center'>
                        <Phone className='w-5 h-5 mr-2'/>
                        <span>0846778870</span>
                    </div>

                    <div className='flex items-center mb-4'>
                        <Mail className='w-5 h-5 mr-2'/>
                        <span>maihuynhduongkietgmail.com</span>
                    </div>

                    <div className='flex items-center mb-4'>
                        <Cake className='w-5 h-5 mr-2'/>
                        <span>Birthday: 07/09/2004</span>
                    </div>
                </div>
                <Button className='w-full' onClick={() => setIsEditBioModel(true)}>
                    Edit Bio
                </Button>
            </CardContent>
          </Card>

        </motion.div>
    ),
    friends:(
        <MutualFriends/>
    ),
    photos:(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='mb-4'
        >
            <Card>
                <CardContent className='p-6'>
                    <h2 className='text-xl font-semibold mb-4 dark:text-gray-300'>Photos</h2>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {userPosts?.filter((post)=> post?.mediaType === 'image' && post?.mediaUrl).map((post) =>(
                            <img
                            key={post?.id}
                            src={post?.mediaUrl}
                            alt='user_all_photos'
                            className='w-full h-auto rounded-lg'
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

        </motion.div>
    ),
  }

  return (
  <>
    {tabContent[activeTab] || null}
    <EditBio
    isOpen={isEditBioModel}
    onClose={() => setIsEditBioModel(false)}
    />
  </>
  )
}

export default ProfileDetails
