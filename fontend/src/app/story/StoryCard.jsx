import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const StoryCard = ({ isAddStory, story }) => {
    const handleStoryClick = () => {}

    return (
        <Card
            className=" p-0 w-[140px] h-[220px] shadow-sm relative overflow-hidden group cursor-pointer rounded-2xl bg-[#1b1b22] border-none"
            onClick={isAddStory ? undefined : handleStoryClick}
        >
            <CardContent className="p-0 h-full flex flex-col">
                {isAddStory ? (
                    <>
                        {/* Avatar - chiếm 3/4 */}
                        <div className="h-3/4 w-full flex items-center justify-center relative">
                            <Avatar className="w-16 h-16 bg-neutral-700">
                                <AvatarImage />
                                <AvatarFallback className="text-gray dark:text-white text-3xl">A</AvatarFallback>
                            </Avatar>

                            {/* Nút + nằm chồng lề giữa */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="p-0 h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
                                >
                                    <Plus className="h-5 w-5 text-white" />
                                </Button>
                            </div>
                        </div>

                        {/* Phần dưới 1/4 màu nền xám */}
                        <div className="h-1/4 w-full bg-gray-800 flex flex-col items-center justify-end pb-2">
                            <p className="text-white text-xs font-semibold">Tạo tin</p>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Trường hợp hiện story */}
                        {story?.mediaType === 'image' ? (
                            <img
                                src={story?.mediaUrl}
                                alt={story.user.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <video
                                src={story?.mediaUrl}
                                alt={story.user.username}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute top-2 left-2 ring-2 ring-blue-500 rounded-full">
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-sm font-semibold truncate" alt={story?.user?.username || 'Người dùng'}>
                                {story?.user?.username || 'Người dùng'}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default StoryCard
