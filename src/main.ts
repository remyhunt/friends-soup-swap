import { spiderChart } from "./spiderchart.ts";

let data = [];
let features = ["A", "B", "C", "D", "E", "F"];

//generate random data
for (var i = 0; i < 3; i++) {
  var point = {} as any;
  //each feature will be a random number from 1-9
  features.forEach((f) => (point[f] = 1 + Math.random() * 8));
  data.push(point);
}

spiderChart(data, features);
