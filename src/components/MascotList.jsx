import React from "react";
import MascotItem from "./MascotItem";

export default function MascotList({ mascots, lastItemRef }) {
  return (
    <ul className="mascot-list">
      {mascots.map((mascot, index) => {
        // Apply ref to last element for intersection observer
        const isLastElement = index === mascots.length - 1;
        return (
          <MascotItem
            key={mascot.id}
            mascot={mascot}
            itemRef={isLastElement ? lastItemRef : null}
          />
        );
      })}
    </ul>
  );
}