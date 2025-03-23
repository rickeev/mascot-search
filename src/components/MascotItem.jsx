import React from "react";

export default function MascotItem({ mascot, itemRef }) {
  const { id, team, league, mascot: mascotName } = mascot;
  const isMultipleMascots = Array.isArray(mascotName) && mascotName.length > 1;
  const mascotDisplay = Array.isArray(mascotName) && mascotName.length > 0
    ? " " + mascotName.join(", ")
    : " None";
    
  return (
    <li 
      key={id} 
      className="mascot-item"
      ref={itemRef}
    >
      <div className="mascot-content">
        <p>
          <p><span>Team: </span>{team || "No team name"}</p>
          <span>Mascot{isMultipleMascots ? "s" : ""}:</span>
          {mascotDisplay}
        </p>
        <p><span>League: </span>{league || "No league name"}</p>
      </div>
    </li>
  );
}