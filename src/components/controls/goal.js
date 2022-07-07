import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GOALS_LIST } from "../../config";
import { getGoalDataHelper } from "../../features/chart/chartSlice";

import { useAtom } from 'jotai'
import { goalAtom } from "../../services/atoms";

export default function Goal() {
  const {year} = useSelector(state => state.chart);
  const dispatch = useDispatch();

  const [ goalParam, setGoalParam] = useAtom(goalAtom);

  return (
    <div className="goal">
      <select onChange={(e) => {
          dispatch(getGoalDataHelper({goal: e.target.value, year: year}));
          setGoalParam(e.target.value);
        }}>
        <option>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option key={goal}>{goal}</option>
        ))}
      </select>
    </div>
  );
}
