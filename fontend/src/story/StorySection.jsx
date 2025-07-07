"use client";

import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const storyPosts = React.useMemo(() => [
    {
      _id: 1,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      user: {
        username: "Mai Huynh Duong Tuan Kiet",
      },
    },
    {
      _id: 2,
      mediaUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      mediaType: "image",
      user: {
        username: "Nguyen Van A",
      },
    },
    {
      _id: 3,
      mediaUrl: "https://www.w3schools.com/html/movie.mp4",
      mediaType: "video",
      user: {
        username: "Tran Thi B",
      },
    },
    {
      _id: 4,
      mediaUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      mediaType: "image",
      user: {
        username: "Le Hoang C",
      },
    },
    {
      _id: 5,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      user: {
        username: "Pham Van D",
      },
    },
  ], []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const updateDimensions = () => {
        setContainerWidth(container.offsetWidth);
        setMaxScroll(container.scrollWidth - container.offsetWidth);
        setScrollPosition(container.scrollLeft);
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [storyPosts]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex space-x-2 overflow-x-auto scrollbar-hide py-4 px-2"
      >
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -((storyPosts.length + 1) * 160 - containerWidth),
          }}
        >
          {/* Thẻ Tạo tin */}
          <StoryCard isAddStory={true} />

          {/* Các story có thật */}
          {storyPosts?.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}
        </motion.div>
      </div>

      {/* Nút cuộn trái */}
      {scrollPosition > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Nút cuộn phải */}
      {scrollPosition < maxScroll && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StorySection;
