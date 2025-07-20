"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

import useSidebarStore from "@/store/sidebarStore";
import userStore from "@/store/userStore";
import { getAllUsers } from "@/service/user.service";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Loader from "@/lib/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const searchRef = useRef(null);

  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();
  const { user, clearUser } = userStore();
  const router = useRouter();

  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  // 👉 Fetch tất cả user 1 lần khi mở app
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetchingUsers(true);
        const result = await getAllUsers();
        setUserList(result);
      } catch (error) {
        console.log(error);
        toast.error("Không thể tải danh sách người dùng");
      } finally {
        setFetchingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // 👉 Lọc user theo query, dùng debounce
  useEffect(() => {
    const debounceSearch = debounce(() => {
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const result = userList.filter((user) =>
          user.username.toLowerCase().includes(q)
        );
        setFilterUsers(result);
        setIsSearchOpen(true);
      } else {
        setFilterUsers([]);
        setIsSearchOpen(false);
      }
    }, 300);

    debounceSearch();
    return () => debounceSearch.cancel();
  }, [searchQuery, userList]);

  // 👉 Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleUserClick = async (userId) => {
    try {
      setNavigating(true);
      setIsSearchOpen(false);
      setSearchQuery("");
      await router.push(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setNavigating(false);
    }
  };

  const handleLogout = async () => {
    try {
      router.push("/user-login");
      clearUser();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất thất bại");
    }
  };

  const handleNavigation = (path) => router.push(path);

  if (fetchingUsers || navigating) return <Loader />;

  return (
    <header className="bg-white dark:bg-[rgb(36,37,38)] text-foreground shadow-md h-16 fixed top-0 left-0 right-0 z-50 p-2">
      <div className="mx-auto flex justify-between items-center p-2">
        {/* Logo & Search */}
        <div className="flex items-center gap-2 md:gap-4">
          <Image
            src="/images/logoFB.png"
            width={50}
            height={50}
            alt="facebook_logo"
            onClick={() => handleNavigation("/")}
            className="cursor-pointer"
          />
          <div className="relative" ref={searchRef}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-8 w-40 md:w-64 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full"
                  placeholder="Search Facebook..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
              </div>

              {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg mt-1 z-50">
                  <div className="p-2 max-h-64 overflow-auto">
                    {filterUsers.length > 0 ? (
                      filterUsers.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                          onClick={() => handleUserClick(user._id)}
                        >
                          <Avatar className="h-8 w-8 mr-2">
                            {user.profilePicture ? (
                              <AvatarImage
                                src={user.profilePicture}
                                alt={user.username}
                              />
                            ) : (
                              <AvatarFallback>
                                {user.username[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span>{user.username}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">Not found any user</div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Middle Navigation */}
        <nav className="hidden md:flex justify-around w-[40%] max-w-md">
          {[
            { icon: Home, path: "/" },
            { icon: Video, path: "/video-feed" },
            { icon: User, path: "/friends-list" },
          ].map(({ icon: Icon, path }) => (
            <Button
              key={path}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-blue-600"
              onClick={() => handleNavigation(path)}
            >
              <Icon />
            </Button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex space-x-2 md:space-x-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-500 dark:text-gray-100"
            onClick={toggleSidebar}
          >
            <Menu />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:block"
          onClick={() => {MessageCircle, toast.error("Coming soon...")}}
          >
            <Bell />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:block"
          onClick={() => {MessageCircle, toast.error("Coming soon...")}}
          >
            <MessageCircle />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
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
            <DropdownMenuContent className="w-64 z-50" align="end">
              <DropdownMenuLabel className="font-normal">
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
                  <div>
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleNavigation(`/user-profile/${user?._id}`)}
              >
                <Users className="mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                // onClick={() => handleNavigation("/messages")}
                onClick={() => {
                  MessageCircle, toast.error("Coming soon...");
                }}
              >
                <MessageCircle className="mr-2" /> Messager
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="mr-2" /> Mode dark
                  </>
                ) : (
                  <>
                    <Sun className="mr-2" /> Mode light
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon className="mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
