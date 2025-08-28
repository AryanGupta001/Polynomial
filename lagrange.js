const fs = require("fs");


const rawData = fs.readFileSync("points.json");
const data = JSON.parse(rawData);

function convertValue(value, base) {
    return parseInt(value, base);
}


let points = [];
for (let key in data) {
    if (key !== "keys") {
        let x = parseInt(key);
        let base = parseInt(data[key].base);
        let value = data[key].value;
        let y = convertValue(value, base);
        points.push({ x, y });
    }
}


function LIF(points, xValue) {
    let result = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (xValue - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }

    return result;
}


let C = LIF(points, 0);

console.log("C = ", Math.round(C));
