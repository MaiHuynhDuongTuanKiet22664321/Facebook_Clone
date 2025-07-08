import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostComments = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments
    ? post?.comments
    : post?.comments.slice(0, 2);
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="max-h-60 overflow-y-auto pr-2">
        {visibleComments?.map((comment, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <Avatar className="w-8 h-8 rounded mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-400">A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p className="font-semibold text-sm">
                  {comment?.user?.username}
                </p>
                <p className="text-sm">{comment?.text}</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-400">
                <Button variant="ghost" size="sm">
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
                <span>{comment?.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
        {post?.comment?.length > 2 && (
          <p className="w-40 mt-2 text-blue-500 dark:text-gray-300"
          onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <>Show less <ChevronUp className="w-4 h-4 ml-2"/></>
            ):(
              <>Show All Comments <ChevronDown className="w-4 h-4 ml-2"/></>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComments;
