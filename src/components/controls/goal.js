import React from "react";
import { GOALS_LIST } from "../../config";

export default function Goal() {
  return (
    <div className="goal">
      <select>
        <option>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
