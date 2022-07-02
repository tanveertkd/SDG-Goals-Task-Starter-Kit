import React, { useState } from "react";
import { GOALS_LIST } from "../../config";

export default function Goal() {
  const [goal, setGoal] = useState('');
  console.log(goal);
  return (
    <div className="goal">
      <select onChange={(e) => setGoal(e.target.value)}>
        <option>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
