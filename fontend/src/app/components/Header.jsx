"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useSidebarStore from "@/store/sidebarStore";
import userStore from "@/store/userStore";
import {
  Search,
  Home,
  Video,
  User,
  Menu,
  Bell,
  MessageCircle,
  Users,
  LogOutIcon,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { logout } from "@/service/auth.sevice";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme(false);
  const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const { user, clearUser } = userStore();

  const userPlaceholder = user?.username
    ?.split("")
    .map((name) => name[0])
    .join("");

  const handleNavigation = (path, item) => {
    router.push(path);
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
    <header className="bg-white dark:bg-[rgb(36,37,38)] text-foreground shadow-md h-16 fixed top-0 left-0 right-0 z-50 p-2">
      <div className="mx-auto flex justify-between items-center p-2">
        <div className="flex items-center gap-2 md:gap-4">
          <Image
            src="/images/logoFB.png"
            width={50}
            height={50}
            alt="facebook_logo"
            onClick={() => handleNavigation("/")}
            className="cursor-pointer"
          />
          <div className="relative">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-8 w-40 md:w-64 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full"
                  placeholder="Search facebook..."
                />
              </div>
              {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg mt-1 z-50">
                  <div className="p-2">
                    <div className="flex items-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      <Search className="absolute text-sm text-gray-400 " />
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          {user?.profilePicture ? (
                            <AvatarImage
                              src={user?.profilePicture}
                              alt={user?.username}
                            />
                          ) : (
                            <AvatarFallback>{userPlaceholder}</AvatarFallback>
                          )}
                        </Avatar>
                        <span
                          className="font-semibold truncate max-w-[200px] block"
                          title={user?.username}
                        >
                          {user?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <nav className="hidden md:flex justify-around w-[40%] max-w-md">
          {[
            { icon: Home, path: "/", name: "home" },
            { icon: Video, path: "/video-feed", name: "video" },
            { icon: User, path: "/friends-list", name: "friends" },
          ].map(({ icon: Icon, path, name }) => (
            <Button
              key={name}
              variant="ghost"
              size="icon"
              className={`relative text-gray-400 hover:text-blue-600 hover:bg-transparent`}
              onClick={() => handleNavigation(path)}
            >
              <Icon />
            </Button>
          ))}
        </nav>
        {/* user profile name  */}
        <div className="flex space-x-2 md:space-x-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-500 dark:text-gray-100 cursor-pointer"
            onClick={() => toggleSidebar()}
          >
            <Menu />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 cursor-pointer pl-1"
          >
            <Bell />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 cursor-pointer"
          >
            <MessageCircle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profilePicture}
                    alt={user?.username}
                  />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-400">
                    {userPlaceholder}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 z-50" aglin="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {user?.profilePicture ? (
                        <AvatarImage
                          src={user?.profilePicture}
                          alt={user?.username}
                        />
                      ) : (
                        <AvatarFallback className="dark:bg-gray-400">
                          {userPlaceholder}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="">
                      <p className="text-sm font-medium leading-none">
                        {user?.username}
                      </p>
                      <p className="text-xs mt-2 text-gray-600 leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleNavigation(`/user-profile/${user?._id}`)}
              >
                <Users /> <span className="ml-2">Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleNavigation("/messages")}
              >
                <MessageCircle /> <span className="ml-2">Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="cursor-pointer"
              >
                {theme === "light" ? (
                  <>
                    <Moon />
                    <span className="ml-2">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun />
                    <span className="ml-2">Light Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOutIcon /> <span className="ml-2">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
