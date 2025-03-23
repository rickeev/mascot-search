import React from "react";

export default function LoadingSpinner({ text, isSmall = false }) {
  return (
    <div className={isSmall ? "loading-more-spinner" : "loading-search"}>
      <div className={`loading-spinner${isSmall ? " small" : ""}`}></div>
      <p>{text}</p>
    </div>
  );
}