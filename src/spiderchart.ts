import * as d3 from "d3";

const  spiderChart = (data, features) => {
  // create 600x600 chart
  let width = 600;
  let height = 600;
  let svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

  let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
  let ticks = [2, 4, 6, 8, 10];

  const labelColor = "#ccc";
  let chartColors = ["darkorange", "gray", "navy"];

  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);
  // create concentric circles
  svg
    .selectAll("circle")
    .data(ticks)
    .join((enter) =>
      enter
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", labelColor)
        .attr("r", (d) => radialScale(d))
    );

  svg
    .selectAll(".ticklabel")
    .data(ticks)
    .join((enter) =>
      enter
        .append("text")
        .attr("fill", labelColor)
        .attr("class", "ticklabel")
        .attr("x", width / 2 + 5)
        .attr("y", (d) => height / 2 - radialScale(d))
        .text((d) => d.toString())
    );

  function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { x: width / 2 + x, y: height / 2 - y };
  }

  let featureData = features.map((f, i) => {
    let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
    return {
      name: f,
      angle: angle,
      line_coord: angleToCoordinate(angle, 10),
      label_coord: angleToCoordinate(angle, 10.5),
    };
  });

  // draw axis line
  svg
    .selectAll("line")
    .data(featureData)
    .join((enter) =>
      enter
        .append("line")
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("x2", (d) => d.line_coord.x)
        .attr("y2", (d) => d.line_coord.y)
        .attr("stroke", labelColor)
    );

  // draw axis label
  svg
    .selectAll(".axislabel")
    .data(featureData)
    .join((enter) =>
      enter
        .append("text")
        .attr("x", (d) => d.label_coord.x)
        .attr("y", (d) => d.label_coord.y)
        .text((d) => d.name)
        .attr("fill", labelColor)
    );

  function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  }

  svg
    .selectAll("path")
    .data(data)
    .join((enter) =>
      enter
        .append("path")
        .datum((d) => getPathCoordinates(d))
        .attr("d", line)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0)
        .attr("stroke", (_, i) => chartColors[i])
        .attr("fill", (_, i) => chartColors[i])
        .attr("opacity", 0.5)
    );
};

export { spiderChart };