import React, { useRef, useState, useEffect, useCallback } from "react";

const HorizontalCarousel = ({
  items = [],
  renderItem,
  itemClassName = "",
  eyebrow = "",
  title = "",
  subtitle = "",
  badgeText = ""
}) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const isDragMoving = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate which card is closest to view center
    const children = Array.from(el.children);
    if (children.length > 0) {
      const scrollCenter = scrollLeft + clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const diff = Math.abs(scrollCenter - childCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length, updateScrollState]);

  const scrollByDirection = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };

  const scrollToIndex = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (children[idx]) {
      children[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  };

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    // Prevent drag trigger if clicked interactive element
    if (e.target.closest("a, button, input, textarea, select")) return;
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    isDragMoving.current = false;
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.3;
    if (Math.abs(walk) > 5) {
      isDragMoving.current = true;
    }
    el.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const hasMultiple = items.length > 1;

  return (
    <div className="horizontal-scroll-container">
      {/* Header with Title and Modern Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end gap-3 mb-4">
        <div>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && <h2 className="section-heading mb-1">{title}</h2>}
          {subtitle && (
            <p className="section-desc mb-0 text-start" style={{ maxWidth: "600px", margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>

        {hasMultiple && (
          <div className="d-flex align-items-center gap-2 flex-shrink-0 align-self-end align-self-md-auto pt-2 pt-md-0">
            {badgeText && (
              <span
                className="badge rounded-pill me-1"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#d4d4d8",
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  fontWeight: "500"
                }}
              >
                {badgeText}
              </span>
            )}
            <button
              type="button"
              className="carousel-nav-btn"
              onClick={() => scrollByDirection("prev")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              title="Previous item"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              type="button"
              className="carousel-nav-btn"
              onClick={() => scrollByDirection("next")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              title="Next item"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className={`horizontal-scroll-track ${isDragging ? "is-dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {items.map((item, idx) => (
          <div key={item.id || idx} className={itemClassName}>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>

      {/* Pagination Dot Indicators */}
      {hasMultiple && items.length <= 10 && (
        <div className="carousel-dots-wrapper">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${activeIndex === idx ? "active" : ""}`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Jump to item ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalCarousel;
