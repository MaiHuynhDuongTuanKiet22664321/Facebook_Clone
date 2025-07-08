"use client";
import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Video } from "lucide-react";
import VideoCard from "./VideoCard";
import { create } from "zustand";

const page = () => {
  const videoPosts = [
    {
      mediaUrl: "",
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
  ];

  return (
    <div className="mt-12 min-h-screen">
      <LeftSideBar />
      <main className="ml-0 md:ml-64 p-6">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>
        <div className="max-w-3xl mx-auto">
          {videoPosts.map((post, index) => (
            // eslint-disable-next-line react/jsx-key
            <VideoCard post={post} key={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
