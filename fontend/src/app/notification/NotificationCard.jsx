"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateInDDMMYYY } from "@/lib/utils";
import { useRouter } from "next/navigation";




const NotificationCard = ({ index, user, content, createdAt }) => {
  const router = useRouter();
  return (
    <div
      key={index}
      className="flex items-center gap-2 p-2 mb-4 bg-blue-300 dark:bg-blue-300 hover:bg-blue-500 dark:hover:bg-blue-500 rounded-md cursor-pointer"
      onClick={() => router.push(`/user-profile/${user?._id}`)}
    >
      <Avatar className="h-16 w-16 rounded-full">
        {user?.profilePicture ? (
          <AvatarImage src={user?.profilePicture} alt={user?.username} />
        ) : (
          <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex flex-col gap-1">
        <span className="text-gray-700 font-bold">{user?.username}</span>
        <span>{content}</span>
        <span className="text-xs text-gray-600">{formatDateInDDMMYYY(createdAt)}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
