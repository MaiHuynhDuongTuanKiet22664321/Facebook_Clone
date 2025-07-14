import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

const ShowStoryPreview = ({
  file,
  fileType,
  onClose,
  onPost,
  isNewStory,
  username,
  avatar,
  isLoading,
}) => {
  const userPlaceholder = username
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md h-[70vh] flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        
        {/* Close button */}
        <Button
          className="absolute top-4 right-4 z-10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Avatar + Username */}
        <div className="absolute top-4 left-4 z-10 flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            {avatar ? (
              <AvatarImage src={avatar} alt={username} />
            ) : (
              <AvatarFallback>{userPlaceholder}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-700 dark:text-gray-200 font-semibold truncate max-w-[120px]">
            {username || "Người dùng"}
          </span>
        </div>

        {/* Nội dung story */}
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          {fileType === "image" ? (
            <img
              src={file}
              alt="story_preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={file}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Nút Share nếu là tin mới */}
        {isNewStory && (
          <div className="absolute bottom-4 right-4">
            <Button
              onClick={onPost}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? "Đang lưu..." : "Chia sẻ"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowStoryPreview;
