import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { getStateData } from "../../services/chartServices";

export default function Chart() {
  const [data, setData] = useState(
    [{
      "area_name": "Andaman and Nicobar Islands",
      "area_code": "IND035",
      "chartdata": [
        { "value": 57, "name": "Goal 1" },
        { "value": 38, "name": "Goal 2" },
        { "value": 60, "name": "Goal 3" },
        { "value": 69, "name": "Goal 4" },
        { "value": 58, "name": "Goal 5" },
        { "value": 71, "name": "Goal 6" },
        { "value": 56, "name": "Goal 7" },
        { "value": 60, "name": "Goal 8" },
        { "value": 0, "name": "Goal 9" },
        { "value": 69, "name": "Goal 10" },
        { "value": 64, "name": "Goal 11" },
        { "value": null, "name": "Goal 12" },
        { "value": null, "name": "Goal 13" },
        { "value": null, "name": "Goal 14" },
        { "value": 84, "name": "Goal 15" },
        { "value": 72, "name": "Goal 16" },
        { "value": 58, "name": "SDG Index Score" }
      ]
    },]
  );
  const charSvgRef = useRef();
  
  useEffect(()=>{
    (async ()=> {
      const res = await getStateData(2018, 'Andaman and Nicobar Islands')
      console.log('test', res.map(currentData => currentData.chartdata.map(d => d.value)))
    })()
  })

  useEffect(()=>{
    const width = 500;
    const height = 300;
    console.log(data[0].chartdata.map((ele, idx) => ele.name))

    const svg = d3.select(charSvgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .style('margin-top', '75px');

    const yMax = Math.max(...data[0].chartdata.map(d=>d.value))

    const xScale = d3.scaleBand()
      .domain(data[0].chartdata)
      .range([0, width])
      .padding(0.5);
    
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => d.name);
    
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    
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
      .data(data[0].chartdata)
      .join('rect')
        .attr('x', (d) => xScale(d))
        .attr('y', (d) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .style("fill", "orange")
        .on('mouseenter', function () {
          d3.select(this).attr("opacity", 0.5)
        })
        .on('mouseleave', function () {
            d3.select(this).attr("opacity", 1)
        });
    
    const country = data[0].area_name;

    svg.append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2))
      .attr('y', -25)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Goal Score');
    
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2)
      .attr('y', height * 1.25)
      .attr('text-anchor', 'middle')
      .text('Goal')
      .append('text');
    
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(country);      

  }, [data]);

  // useEffect(() => {
  //   const width = 400;
  //   const height = 300;
  //   const svg = d3.create("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", "10")
  //     .attr("text-anchor", "end");

  //   const xScale = d3.scaleBand()
  //     .domain(data?.map((states, idx) => idx))
  //     .range([0, width])
  //     .padding(0.5);
    
  //   const yScale = d3.scaleLinear()
  //     .domain([0, height])
  //     .range([height, 0]);
      
  //   const xAxis = d3.axisBottom(xScale)
  //     .ticks(data?.map(states => states.area_name));
    
  //   const yAxis = d3.axisLeft(yScale)
  //     .ticks(data?.map(currentData => currentData.chartData.map(ele => ele.value)));
    
  //   svg.append('g')
  //     .call(xAxis)
  //     .attr('transform', `translate(0, ${height})`);

  //   svg.append('g')
  //     .call(yAxis);
    
  //   svg.selectAll('.bar')
  //     .data(data)
  //     .join('rect')
  //       .attr('x', (ele, idx) => xScale(idx))
  //       .attr('y', yScale)
  //       .attr('width', xScale.bandwidth())
  //       .attr('height', value => height - yScale(value))
  // })

  return (
    <div className="chart">
      <svg ref={charSvgRef}></svg>
    </div>
  );
}
