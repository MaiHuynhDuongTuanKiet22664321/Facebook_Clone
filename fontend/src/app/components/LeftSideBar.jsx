"use client";
import {Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Home, MessageCircle, User, User2, User2Icon, Video } from "lucide-react";
import React from 'react'

const LeftSideBar = () => {
return (
    <aside className="fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0">
        <div className="flex flex-col h-full overflow-y-auto">
            {/* navigation menu  */}
            <nav className="space-y-6 flex-grow">
                <div className="flex items-center space-x-3 mb-6 cursor-pointer">
                    <Avatar className="h-10 w-10">
                        <AvatarImage />
                        <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">Mai Huynh Duong Tuan Kiet</span>
                </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <Home className="mr-4" />
                        Home
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <User2Icon className="mr-4" />
                        Friends
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <Video className="mr-4" />
                        Video
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <User className="mr-4" />
                        Profile
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <MessageCircle className="mr-4" />
                        Message
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start py-3 px-2"
                    >
                        <Bell className="mr-4" />
                        Notification
                    </Button>
            </nav>

            {/* footer section */}
            <div className="mb-16">
                <Separator className='my-4'/>
                <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                     <Avatar className="h-10 w-10">
                        <AvatarImage />
                        <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">Mai Huynh Duong Tuan Kiet</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                    <p>Privacy · Terms · Advertising ·</p>
                    <p>· Meta © 2024</p>
                </div>
            </div>

        </div>
    </aside>
)
}

export default LeftSideBar
