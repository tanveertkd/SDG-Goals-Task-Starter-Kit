import React, { useState } from "react";
import { YEARS } from "../../config";

export default function Year() {
  const [year, setYear] = useState('');
  console.log(year)
  return (
    <div className="goal">
      <select onChange={(e) => setYear(e.target.value)}>
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
