"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/service/auth.sevice";
import useSidebarStore from "@/store/sidebarStore";
import userStore from "@/store/userStore";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  User,
  User2,
  User2Icon,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const { user, clearUser } = userStore();

  const userPlaceholder = user?.username
    ?.split("")
    .map((name) => name[0])
    .join("");
  const handleNavigation = (path, item) => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status == "success") {
        router.push("/user-login");
        clearUser();
      }
      toast.success("user logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to log out");
    }
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 ${
        isSidebarOpen
          ? "translate-x-0 bg-gray-100 dark:bg-gray-800 shadow-lg"
          : "-translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:bg-transparent md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* navigation menu  */}
        <nav className="space-y-6 flex-grow">
          <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={() => router.push(`/user-profile/${user?._id}`)}>
            <Avatar className="h-8 w-8">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {userPlaceholder}
                </AvatarFallback>
              )}
            </Avatar>
            <span
              className="font-semibold truncate max-w-[200px] block"
              title={user?.username}
            >
              {user?.username}
            </span>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation("/")}
          >
            <Home className="mr-4" />
            Home
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation("/friends-list")}
          >
            <User2Icon className="mr-4" />
            Friends
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation("/video-feed")}
          >
            <Video className="mr-4" />
            Video
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation(`/user-profile/${user?._id}`)}
          >
            <User className="mr-4" />
            Profile
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation("/message")}
          >
            <MessageCircle className="mr-4" />
            Message
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-2 hover:bg-gray-200"
            onClick={() => handleNavigation("/notification")}
          >
            <Bell className="mr-4" />
            Notification
          </Button>
        </nav>

        {/* footer section */}
        <div className="mb-16">
          <Separator className="my-4" />
          <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => router.push(`/user-profile/${user?._id}`)}>
            <Avatar className="h-8 w-8">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {userPlaceholder}
                </AvatarFallback>
              )}
            </Avatar>
            <span
              className="font-semibold truncate max-w-[200px] block"
              title={user?.username}
            >
              {user?.username}
            </span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <Button
              variant="ghost"
              className="cursor-pointer-ml-4 "
              onClick={handleLogout}
            >
              <LogOut /> <span className="ml-2 font-bold text-md">Logout</span>
            </Button>
            <p>Privacy · Terms · Advertising ·</p>
            <p>· Meta © 2024</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
