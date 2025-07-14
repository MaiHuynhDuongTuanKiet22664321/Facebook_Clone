import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { Button } from "@/components/ui/button";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef();
  const { story, fetchStoryPost } = usePostStore();

  useEffect(() => {
    fetchStoryPost();
  }, [fetchStoryPost]);

  useEffect(() => {
    const container = containerRef.current;
    const updateMaxScroll = () => {
      if (container) {
        setMaxScroll(container.scrollWidth - container.offsetWidth);
        setScrollPosition(container.scrollLeft);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [story]);

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
    <div className="relative overflow-x-auto scrollbar-hide pb-2">
      {/* Vùng cuộn chính */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto py-4"
        style={{ maxWidth: "100%" }}
      >
        <div
          className="flex space-x-2 min-w-max"
          style={{
            minWidth: `${(story.length + 1) * 144}px`,
          }}
        >
          <StoryCard isAddStory />
          {story.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}
        </div>
      </div>

      {/* Nút cuộn trái (hiển thị từ sm: trở lên) */}
      {scrollPosition > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Nút cuộn phải (hiển thị từ sm: trở lên) */}
      {scrollPosition < maxScroll && (
        <Button
          variant="outline"
          size="icon"
          className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StorySection;
