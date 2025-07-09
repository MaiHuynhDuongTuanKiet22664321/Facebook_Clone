import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserX } from "lucide-react";

const MutualFriends = ({ userPosts }) => {
  // Tạm thời hardcode danh sách bạn chung
  const mutualFriends = [
    {
      id: 1,
      username: "Mai Huynh Duong Tuan Kiet",
      followers: 40,
      avatarUrl: "",
    },
    {
      id: 2,
      username: "Nguyen Van A",
      followers: 18,
      avatarUrl: "",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
            Mutual Friends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mutualFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={friend.avatarUrl} alt={friend.username} />
                    <AvatarFallback className="dark:bg-gray-400">
                      {friend.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-gray-100">
                      {friend.username}
                    </p>
                    <p className="text-sm text-gray-400">
                      {friend.followers} followers
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <UserX className="h-4 w-4 mr-2" />
                      Unfollow
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MutualFriends;
