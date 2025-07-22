import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateInDDMMYYY } from "@/lib/utils";
import { useRouter } from "next/navigation";

const NotificationHeaderCard = ({ user, content, createdAt }) => {
    const router = useRouter();
  return (
    <div 
    className="flex items-center w-full gap-2 p-2 mb-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-400 rounded-md cursor-pointer"
    onClick={() => router.push(`/user-profile/${user?._id}`)}
    >
      <Avatar className="h-12 w-12 rounded-full">
        {user?.profilePicture ? (
          <AvatarImage src={user?.profilePicture} alt={user?.username} />
        ) : (
          <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <span className="text-gray-800 dark:text-white font-semibold text-sm">{user?.username}</span>
        <span className="text-xs text-gray-600 dark:text-gray-200">{content}</span>
        <span className="text-[10px] text-gray-400">{formatDateInDDMMYYY(createdAt)}</span>
      </div>
    </div>
  )
}

export default NotificationHeaderCard
