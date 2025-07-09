"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        {/* Tab content */}
        <TabsContent value="posts">
          <ProfileDetails activeTab={activeTab} />
        </TabsContent>
        <TabsContent value="about">
          <ProfileDetails activeTab={activeTab} />
        </TabsContent>
        <TabsContent value="friends">
          <ProfileDetails activeTab={activeTab} />
        </TabsContent>
        <TabsContent value="photos">
          <ProfileDetails activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTab;
