import React from "react";
import { YEARS } from "../../config";

export default function Year() {
  return (
    <div className="goal">
      <select>
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
