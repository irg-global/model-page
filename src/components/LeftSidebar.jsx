import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Card from "./Card";

const LeftSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
  const sidebarRef = useRef(null); // Sidebar reference
  const cardContainerRef = useRef(null); // Card container reference

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // Sidebar closing: Animate items out and shrink the sidebar
      gsap.to(cardContainerRef.current.children, {
        x: -400,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(sidebarRef.current, {
            height: "64px", // Shrink sidebar to header height
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => setIsSidebarOpen(false),
          });
        },
      });
    } else {
    
      // Sidebar opening: Expand sidebar and animate items in
      gsap.to(sidebarRef.current, {
        height: "90vh", // Expand to maximum height
        duration: 0.5,
        ease: "power3.out",
        onStart: () => setIsSidebarOpen(true),
      });

      gsap.fromTo(
        cardContainerRef.current.children,
        { x: -400, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  };
  
  // Ensure the scroll behavior only activates when items are loaded
  useEffect(() => {
    if (cardContainerRef.current) {
      cardContainerRef.current.style.overflowY = "auto"; // Enable scroll within card section
    }
  }, [isSidebarOpen]); 

  return (
    <div
      ref={sidebarRef}
      className="absolute top-28 left-3 bg-gray-300 shadow-lg z-50 w-64"
      style={{
        maxHeight: isSidebarOpen ? "90vh" : "64px", // Restrict height when open
        overflow: "hidden", // Hide overflow when closed
        transition: "max-height 0.5s ease-in-out",
      }}
    >
      {/* Sidebar Header */}
      <div
        className="p-4 bg-gradient-to-r from-[#004d2b] to-[#6cc49f] text-white text-center text-lg font-semibold shadow-md hover:shadow-green-500/80 transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={toggleSidebar} // Click to toggle sidebar
      >
        Models Library
      </div>

      {/* Cards Section */}
      {isSidebarOpen && (
        <div
          ref={cardContainerRef}
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 160px)" }} // Sidebar content height
        >
          <Card />
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
