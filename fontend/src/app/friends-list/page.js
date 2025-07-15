"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequest from "./FriendRequest";
import FriendsSuggestion from "./FriendSuggestion";
import { userFriendStore } from "@/store/userFriendStore";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [search, setSearch] = useState("");
  const {
    followUser,
    loading,
    UnfollowUser,
    fetchFriendRequest,
    fetchFriendSuggestion,
    deleteUserFromRequest,
    fetchMutualFriends,
    friendRequest,
    friendSuggestion,
    mutualFriends,
  } = userFriendStore();

  useEffect(() => {
    fetchFriendRequest();
    fetchFriendSuggestion();
  }, []);

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
      toast.success("Friend added successfully");
      await followUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    } else if (action === "delete") {
      await UnfollowUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)] flex">
      {/* Sidebar */}
      <LeftSideBar />

      {/* Main content */}
      <main className="flex-1 mt-16 px-4 md:px-6 pb-10 ml-0 md:ml-64">
        {/* Friend Requests */}
        <section className="mb-10">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Friend Requests</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              <FriendCardSkeleton />
            ) : friendRequest.length === 0 ? (
              <NoFriendsMessage
                text="No Friend Requests"
                description="Looks like you are all caught up! Why not explore and connect with new people?"
              />
            ) : (
              friendRequest.map((friend) => (
                <FriendRequest
                  key={friend._id}
                  friend={friend}
                  loading={loading}
                  onAction={handleAction}
                />
              ))
            )}
          </div>
        </section>

        {/* Suggestions + Search */}
        <section>
          <h1 className="text-xl md:text-2xl font-bold mb-4">People You May Know</h1>

          <div className="w-full max-w-md mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm bạn bè..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 py-2 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {(() => {
              const filteredSuggestions = friendSuggestion.filter((friend) =>
                friend.username.toLowerCase().includes(search.toLowerCase())
              );

              if (loading) return <FriendCardSkeleton />;

              if (filteredSuggestions.length === 0)
                return (
                  <NoFriendsMessage
                    text="No Friend Suggestions"
                    description="Looks like you are all caught up! Why not explore and connect with new people?"
                  />
                );

              return filteredSuggestions.map((friend) => (
                <FriendsSuggestion
                  key={friend._id}
                  friend={friend}
                  loading={loading}
                  onAction={handleAction}
                />
              ));
            })()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
