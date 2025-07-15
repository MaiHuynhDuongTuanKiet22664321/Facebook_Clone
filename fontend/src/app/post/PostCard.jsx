"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import PostComments from "./PostComments";
import { formateDate } from "@/lib/utils";

const PostCard = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef(null);

  const handleCommentClick = () => {
    setShowComments(!showComments);
    setTimeout(() => {
      commentInputRef?.current?.focus();
    }, 0);
  };
  const userPostPlaceholder = post?.user?.username
    ? post.user.username
        .split(" ")
        .map((name) => name[0])
        .join("")
    : "U"; // fallback khi không có username

  const generateSharedLink = () => {
    return `http://localhost:3000/${post?._id}`;
  };

  const handleShare = (platform) => {
    const url = generateSharedLink();
    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
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
    <>
      <motion.div
        key={post?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="dark:text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar className="w-10 h-10">
                  {post?.user?.profilePicture ? (
                    <AvatarImage
                      src={post?.user?.profilePicture}
                      alt={post?.user?.username}
                    />
                  ) : (
                    <AvatarFallback className="dark:bg-gray-400">
                      {userPostPlaceholder}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold dark:text-white">
                    {post?.user?.username}
                  </p>
                  <p className="font-sm text-gray-500">
                    {formateDate(post?.createdAt)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" className="dark:hover:bg-gray-400">
                <MoreHorizontal className="dark:text-white w-4 h-4" />
              </Button>
            </div>
            {post?.mediaUrl && post?.mediaType === "image" && (
              <img
                src={post?.mediaUrl}
                alt="media"
                className="w-full max-w-xl max-h-[500px] object-contain rounded-lg mb-4 mx-auto"
              />
            )}

            {post?.mediaUrl && post?.mediaType === "video" && (
              <video
                controls
                muted={false}
                className="w-full max-w-xl max-h-[500px] object-contain rounded-lg mb-4 mx-auto"
              >
                <source src={post?.mediaUrl} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            )}

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer">
                {post?.likeCount} likes
              </span>
              <div className="flex gap-3">
                <span
                  className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer"
                  onClick={() => setShowComments(!showComments)}
                >
                  {post?.commentCount} comments
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer">
                  {post?.shareCount} share
                </span>
              </div>
            </div>
            <Separator className="mb-2 dark:bg-gray-400" />
            <div className="flex justify-between mb-2">
              <Button
                variant="ghost"
                className={`flex-1 dark:hover:bg-gray-600 ${isLiked ? "text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
                onClick={onLike}
              >
                <ThumbsUp className={`mr-2 w-4 h-4 ${isLiked ? "text-blue-500" : "text-gray-500 dark:text-gray-400"}`} /> Like
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 dark:hover:bg-gray-400`}
                onClick={handleCommentClick}
              >
                <MessageCircle className="mr-2 w-4 h-4" /> Comment
              </Button>
              <Dialog
                open={isShareDialogOpen}
                onOpenChange={setIsShareDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex-1 dark:hover:bg-gray-400"
                    onClick={onShare}
                  >
                    <Share2 className="mr-2 w-4 h-4" />
                    share
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
                    <Button onClick={() => handleShare("copy")}>
                      Copy link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Separator className="mb-2 dark:bg-gray-400" />
            <AnimatePresence mode="wait">
              {showComments && (
                <motion.div
                  key="comments"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostComments
                    post={post}
                    onComment={onComment}
                    commentInputRef={commentInputRef}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default PostCard;
