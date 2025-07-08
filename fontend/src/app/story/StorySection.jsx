"use client";

import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARD_WIDTH = 140; // width of each story card
const GAP = 12; // Tailwind gap-3 ~ 0.75rem = 12px

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
      user: { username: "Mai Huynh Duong Tuan Kiet" },
    },
    {
      _id: 2,
      mediaUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      mediaType: "image",
      user: { username: "Nguyen Van A" },
    },
    {
      _id: 3,
      mediaUrl: "https://www.w3schools.com/html/movie.mp4",
      mediaType: "video",
      user: { username: "Tran Thi B" },
    },
    {
      _id: 4,
      mediaUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
      mediaType: "image",
      user: { username: "Le Hoang C" },
    },
    {
      _id: 5,
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      user: { username: "Pham Van D" },
    },
  ], []);

  const updateScrollInfo = () => {
    const container = containerRef.current;
    if (container) {
      setContainerWidth(container.offsetWidth);
      setScrollPosition(container.scrollLeft);
      setMaxScroll(container.scrollWidth - container.offsetWidth);
    }
  };

  useEffect(() => {
    updateScrollInfo();
    window.addEventListener("resize", updateScrollInfo);
    return () => window.removeEventListener("resize", updateScrollInfo);
  }, [storyPosts]);

  const handleScroll = () => updateScrollInfo();

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Tính khoảng kéo giới hạn trái
  const totalCards = storyPosts.length + 1; // +1 for AddStory
  const totalContentWidth = totalCards * CARD_WIDTH + (totalCards - 1) * GAP;
  const dragLimitLeft = Math.min(0, containerWidth - totalContentWidth);

  return (
    <div className="relative pb-2">
      {/* Scrollable container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide py-4 px-2"
      >
        <motion.div
          className="flex gap-3"
          drag="x"
          dragConstraints={{ right: 0, left: dragLimitLeft }}
        >
          <StoryCard isAddStory={true} />
          {storyPosts.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </motion.div>
      </div>

      {/* Left Scroll Button */}
      {scrollPosition > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right Scroll Button */}
      {scrollPosition < maxScroll - 10 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StorySection;
