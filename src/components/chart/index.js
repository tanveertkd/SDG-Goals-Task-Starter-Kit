import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { useSelector } from "react-redux";
import "./index.css"
import { UT } from "../../config";
export default function Chart() {

  const charSvgRef = useRef();
  
  const {data, goal} = useSelector(state => state.chart);

  const [dataFor, setDataFor] = useState("STATE");
  
  const toggleDataSet = () => {
    setDataFor(() => dataFor==="STATE" ? "UT" : "STATE");
  }
  
  let dataSelected = [];

  const selectedDataSet = () => {
    if(data){
      if(dataFor === "STATE")
        dataSelected = data?.filter(dataType => !UT.includes(dataType.area_name))
      else if(dataFor === "UT")
        dataSelected = data?.filter(dataType => UT.includes(dataType.area_name))
    }
  }
  selectedDataSet()

  useEffect(()=>{
    const width = 500;
    const height = 300;

    const svg = d3.select(charSvgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .style('margin-top', '75px');
    
    const xScale = d3.scaleBand()
      .domain(dataSelected)
      .range([0, width])
      .padding(0.25);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => d.area_name);

    const yScale = d3.scaleLinear()
      .domain([0, height])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yScale)
      .ticks(15);
    
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.75em")
      .attr("transform", "rotate(-65)");

    svg.append('g')
      .call(yAxis);      

    svg.selectAll('.bar')
      .data(dataSelected)
      .enter()
      .append('rect')
        .attr("class", "bar")
        .attr('x', (d, idx) => xScale(d))
        .attr('y', (d, idx) => yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d, idx) => height - yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value))
        .style("fill", "orange")
        .on('mouseenter', function () {
          d3.select(this).attr("opacity", 0.5)
        })
        .on('mouseleave', function () {
            d3.select(this).attr("opacity", 1)
        });
      
      d3.selectAll(".bar")
        .data(dataSelected)
        .transition().duration(1000)
        .attr('x', (d, idx) => xScale(d))
        .attr('y', (d, idx) => yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d, idx) => height - yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value));

      d3.selectAll("g")
        .data(dataSelected)
        .transition().duration(1000)
        .attr('x', (d, idx) => xScale(d))
        .attr('y', (d, idx) => yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d, idx) => height - yScale(d.chartdata.find(stateData => stateData.name === goal?.split(":")[0])?.value));
      d3.selectAll(".bar")
        .exit()
        .remove();
        
    // const country = data[0].area_name;

    svg.append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2))
      .attr('y', -35)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Goal Score');
    
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2)
      .attr('y', height * 1.40)
      .attr('text-anchor', 'middle')
      .text('State');     
  }, [dataSelected, goal]);

  return (
    <div className="chart">
      
      <div className="toggle-container">
        States/UT
        <input type="checkbox" id="switch" onChange={toggleDataSet}/>
        <label htmlFor="switch">Toggle</label>
      </div>

      <svg ref={charSvgRef}></svg>
    </div>
  );
}
