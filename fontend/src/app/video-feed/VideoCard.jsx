"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { Clock, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  MoreHorizontal,
  Share,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoComments from "./VideoComments";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const VideoCard = ({ post }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const genergateShareLink = () => {
    return `https://localhost:3000/${post?.id}`;
  };
  const handleShare = (platform) => {
    const url = genergateShareLink();
    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setIsShareDialogOpen(false);
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
    setIsShareDialogOpen(false);
  };
  return (
    <motion.div
      key={post?.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[rgb(36,37,38)] rounded-lg shadow-lg overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-4 px-4 mt-2">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 rounded mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold dark:text-white">
                Mai Huynh Duong Tuan Kiet
              </p>
            </div>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm ">08-07-2025</span>
          </div>
        </div>
        <div className="relative aspect-video bg-black mb-4 ">
          {post?.mediaUrl && post?.mediaType === "video" && (
            <video controls className="w-full h-auto rounded-lg mb-4">
              <source src={post?.mediaUrl} type="video/mp4" />
              Trang web không hỗ trợ video
            </video>
          )}
        </div>

        <div className="md:flex justify-between px-2 mb-2 items-center">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              className={`flex dark:hover:bg-gray-400 items-center`}
            >
              <ThumbsUp className="mr-2 w-4 h-4" />
              <span>Like</span>
            </Button>
            <Button variant="ghost" className={`flex dark:hover:bg-gray-400`}>
              <MessageCircle className="mr-2 w-4 h-4" />
              <span>Comment</span>
            </Button>
            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center dark:hover:bg-gray-400"
                >
                  <Share2 className="mr-2 w-4 h-4" />
                  <span>Share</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Copy link to share</DialogTitle>
                  <DialogDescription>
                    Choose how you want to share
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  <Button onClick={() => handleShare("facebook")}>
                    Share on Facebook
                  </Button>
                  <Button onClick={() => handleShare("twitter")}>
                    Share on Twitter
                  </Button>
                  <Button onClick={() => handleShare("linkedin")}>
                    Share on Linkedin
                  </Button>
                  <Button onClick={() => handleShare("copy")}>Copy link</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <Button variant="ghost" size="sm">
              3 like
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
            >
              3 comment
            </Button>

            <Button variant="ghost" size="sm">
              3 share
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <VideoComments key={post?.id} comments={post?.comments} />
              </ScrollArea>
              <div className="flex items-center m-2">
                <Avatar className="w-10 h-10 rounded mr-3">
                  <AvatarImage />
                  <AvatarFallback className="dark:bg-gray-400">
                    A
                  </AvatarFallback>
                </Avatar>
                <Input className="flex-1 mr-2 bg-gray-100 dark:bg-gray-600" />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoCard;
