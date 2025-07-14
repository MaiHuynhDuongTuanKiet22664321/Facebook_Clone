"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ShowStoryPreview from "./StoryPreview";
import { usePostStore } from "@/store/usePostStore";
import userStore from "@/store/userStore";

// Hàm lấy chữ viết tắt từ tên
const getInitials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").toUpperCase();

const StoryCard = ({ isAddStory, story }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);

  const fileInputRef = useRef(null);
  const { handleCreateStory } = usePostStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileType(file.type.startsWith("video") ? "video" : "image");
      setFilePreview(URL.createObjectURL(file));
      setIsNewStory(true);
      setShowPreview(true);
    }
    e.target.value = ""; // reset input để chọn lại file trùng
  };

  const handleCreateStoryPost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile) formData.append("media", selectedFile);
      await handleCreateStory(formData);
      resetStoryState();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePreview = () => resetStoryState();

  const resetStoryState = () => {
    setShowPreview(false);
    setSelectedFile(null);
    setFilePreview(null);
    setFileType(null);
    setIsNewStory(false);
  };

  const handleStoryClick = () => {
    setFilePreview(story?.mediaUrl);
    setFileType(story?.mediaType);
    setIsNewStory(false);
    setShowPreview(true);
  };

  // Lấy người dùng hiển thị
  const displayUser = isNewStory ? user : story?.user;
  const userPlaceholder = getInitials(displayUser?.username || "U");

  return (
    <>
      <Card
        onClick={isAddStory ? undefined : handleStoryClick}
        className="p-0 w-[140px] h-[220px] shadow-sm relative overflow-hidden group cursor-pointer rounded-2xl bg-[#1b1b22] border-none"
      >
        <CardContent className="p-0 h-full flex flex-col">
          {isAddStory ? (
            <>
              {/* Tạo tin mới */}
              <div className="h-3/4 w-full relative border-b">
                <Avatar className="w-full h-full rounded-none">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.username}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-4xl text-white">
                      {getInitials(user?.username)}
                    </div>
                  )}
                </Avatar>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>

              <div className="h-1/4 w-full bg-gray-800 flex items-center justify-center pb-2">
                <p className="text-white text-xs font-semibold">Tạo tin</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : (
            <>
              {/* Tin đã có */}
              {story?.mediaType === "image" ? (
                <img
                  src={story.mediaUrl}
                  alt={story.user?.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={story.mediaUrl}
                  className="w-full h-full object-cover"
                  controls
                  loop
                />
              )}

              {/* Avatar */}
              <div className="absolute top-2 left-2 ring-2 ring-blue-500 rounded-full">
                <Avatar>
                  {displayUser?.profilePicture ? (
                    <AvatarImage
                      src={displayUser?.profilePicture}
                      alt={displayUser?.username}
                    />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* Username */}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-sm font-semibold truncate">
                  {displayUser?.username || "Người dùng"}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Preview modal */}
      {showPreview && (
        <ShowStoryPreview
          file={filePreview}
          fileType={fileType}
          onClose={handleClosePreview}
          onPost={handleCreateStoryPost}
          isNewStory={isNewStory}
          username={displayUser?.username || "Người dùng"}
          avatar={displayUser?.profilePicture || ""}
          isLoading={loading}
        />
      )}
    </>
  );
};

export default StoryCard;
