import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { YEARS } from "../../config";
import { getGoalDataHelper } from "../../features/chart/chartSlice";

import { useAtom } from 'jotai'
import { yearAtom } from "../../services/atoms";

export default function Year() {
  const {goal} = useSelector(state => state.chart);
  const dispatch = useDispatch();

  const [ yearParam, setYearParam] = useAtom(yearAtom);
  
  return (
    <div className="goal">
      <select onChange={(e) => {
          dispatch(getGoalDataHelper({goal: goal, year: e.target.value}));
          setYearParam(e.target.value);
        }}>
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option key={goal}>{goal}</option>
        ))}
      </select>
    </div>
  );
}
