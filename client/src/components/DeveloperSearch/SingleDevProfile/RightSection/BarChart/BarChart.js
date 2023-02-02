import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import "./BarChart.scss";
import { useParams } from "react-router-dom";

function BarChart({ width, height, skills }) {
  const defaultSkills = [
    {
      name: "skill 1",
      value: 6,
    },
    {
      name: "skill 2",
      value: 2,
    },
    {
      name: "skill 3",
      value: 5,
    },
    {
      name: "skill 4",
      value: 3,
    },
    {
      name: "skill 5",
      value: 1,
    },
  ];

  let svgRef = useRef(0);
  // var vy = 0, vy1 = 0, vy2 = 0;
  let barY = [];
  var svg;
  var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 0,
  };

  const draw = () => {
    const data = (skills[0].name !== "" && skills[0].value !== 0 ) ? skills : defaultSkills;
    svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + margin.left + "," + (margin.top + 50) + ")"
      );

    var x = d3.scaleLinear().range([0, width]).domain([0, 15]);

    var y = d3
      .scaleBand()
      .rangeRound([height, 0], 0.1)
      .domain(
        data.map(function (d) {
          return d.name;
        })
      );

    var circleX = d3.scaleLinear().range([0, width]).domain([0, 100]);

    var circleY = d3
      .scaleBand()
      .rangeRound([height, 0], 0.1)
      .domain(
        data.map(function (d) {
          return d.name;
        })
      );

    var yAxis = d3.axisLeft().scale(y).tickSize(0);

    svg
      .append("g")
      .attr("class", "skill-headings")
      .attr("letter-spacing", "0.1")
      // .attr("font-size", "22px")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", function (d, i) {
        return i * 50 - 5 - 35;
      })
      .text((d) => {
        return d.name;
      })

      .attr("text-anchor", "start");
    svg
      .append("g")
      .attr("class", "year-headings")
      .attr("letter-spacing", "0.1")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d) {
        return BrowserText().getWidth(d.name, 14, "Open Sans") + 15;
      })
      .attr("y", function (d, i) {
        return i * 50 - 5 - 35;
      })
      .text((d) => {
        if (d.value < 2) {
          return "Beginner";
        } else if (d.value < 5) {
          return "Intermediate";
        } else if (d.value < 10) {
          return "Expert";
        }
        let t = d.value > 1 ? d.value + " years" : d.value + " year";
        return t;
      })

      .attr("text-anchor", "start");

    var bars = svg.selectAll(".bar").data(data).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("y", function (d, i) {
        barY.push(i * 50 - 30);
        return i * 50 - 30;
      })
      .attr("height", 9)
      .attr("x", 0)
      .attr("width", function (d, i) {
        return x(d.value);
      });

    bars
      .append("line")
      .attr("class", "bar-dot")
      .attr("x1", 0)
      .attr("y1", function (d, i) {
        return i * 50 + 5 - 30;
      })
      .attr("x2", width)
      .attr("y2", function (d, i) {
        return i * 50 + 5 - 30;
      })
      .attr("stroke-dasharray", "2,2")
      .attr("stroke-width", "1px");

    svg
      .selectAll(".tick")
      .append("hr")
      .attr("class", "the-dotted-line")
      .style("opacity", 1);

    height = barY[barY.length - 1] + 50;

    svg = d3.select(svgRef.current).attr("height", height + 30);
  };

  useEffect(() => {
    draw();
  }, [skills]);

  var BrowserText = function () {
    var canvas = document.createElement("canvas"),
      context = canvas.getContext("2d");

    /**
     * Measures the rendered width of arbitrary text given the font size and font face
     * @param {string} text The text to measure
     * @param {number} fontSize The font size in pixels
     * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
     * @returns {number} The width of the text
     **/
    function getWidth(text, fontSize, fontFace) {
      context.font = fontSize + "px " + fontFace;
      return context.measureText(text).width;
    }

    return {
      getWidth: getWidth,
    };
  };

  return (
    <div className="chart">
      <svg ref={svgRef} style={{ border: "unset" }}></svg>
    </div>
  );
}
export default BarChart;
