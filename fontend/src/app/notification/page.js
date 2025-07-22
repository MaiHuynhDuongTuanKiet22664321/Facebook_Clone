"use client"; // nếu bạn đang dùng Next.js app router

import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import LeftSideBar from "../components/LeftSideBar";
import { userFriendStore } from "@/store/userFriendStore";
import userStore from "@/store/userStore";
const Page = () => {

  const { fetchInformationPostMutualFriends, informationPostMutualFriends, currentUserId, setCurrentUserId } = userFriendStore();
  const { user } = userStore();

  useEffect(() => {
    if (user?._id) {
      setCurrentUserId(user._id);
    }
  }, [user, setCurrentUserId]);

  useEffect(() => {
    if (currentUserId) {
      fetchInformationPostMutualFriends(currentUserId);
    }
  }, [currentUserId, fetchInformationPostMutualFriends]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)] flex">
      {/* Sidebar */}
      <LeftSideBar />
      <div className="flex-1 mt-16 px-4 md:px-6 pb-10 ml-0 md:ml-64">
        <h1 className="text-xl font-bold mb-4">Thông báo</h1>
        {Array.isArray(informationPostMutualFriends) && informationPostMutualFriends.map((item, index) => (
          <NotificationCard
            key={index}
            index={index}
            user={item.user}
            content={item.content}
            createdAt={item.createdAt}
            // truyền thêm các prop khác nếu cần
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
