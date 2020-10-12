// https://observablehq.com/@d3/box-plot@195
export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], function (md) {
        return (
            md `# Box Plot

A box-and-whisker plot shows summary statistics of a quantitative distribution. Here, close price distribution  (*y*-axis) for the stock of American Academy of Neurology(AAN) in 15 years is plotted from2004 to 2019 (*x*-axis).`
        )
    });
    main.variable(observer("chart")).define("chart", ["d3", "DOM", "width", "height", "bins", "x", "y", "xAxis",
        "yAxis"], function (d3, DOM, width, height, bins, x, y, xAxis, yAxis) {
        const svg = d3.select(DOM.svg(width, height));

        const g = svg.append("g")
            .selectAll("g")
            .data(bins)
            .join("g");

        g.append("path")
            .attr("stroke", "currentColor")
            .attr("d", d =>
                `
        M${x((d.x0 + d.x1) / 2)},${y(d.range[1])}
        V${y(d.range[0])}
      `);

        g.append("path")
            .attr("fill", "#ddd")
            .attr("d", d =>
                `
        M${x(d.x0) + 1},${y(d.quartiles[2])}
        H${x(d.x1)}
        V${y(d.quartiles[0])}
        H${x(d.x0) + 1}
        Z
      `
            );

        g.append("path")
            .attr("stroke", "currentColor")
            .attr("stroke-width", 2)
            .attr("d", d => `
        M${x(d.x0) + 1},${y(d.quartiles[1])}
        H${x(d.x1)}
      `);

        g.append("g")
            .attr("fill", "currentColor")
            .attr("fill-opacity", 0.2)
            .attr("stroke", "none")
            .attr("transform", d => `translate(${x((d.x0 + d.x1) / 2)},0)`)
            .selectAll("circle")
            .data(d => d.outliers)
            .join("circle")
            .attr("r", 2)
            .attr("cx", () => (Math.random() - 0.5) * 4)
            .attr("cy", d => y(d.y));

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        return svg.node();
    });
    main.variable(observer("bins")).define("bins", ["d3", "n", "data"], function (d3, n, data) {
        return (
            d3.histogram()
            .thresholds(n)
            .value(d => d.x)
            (data)
            .map(bin => {
                bin.sort((a, b) => a.y - b.y);
                const values = bin.map(d => d.y);
                const min = values[0];
                const max = values[values.length - 1];
                const q1 = d3.quantile(values, 0.25);
                const q2 = d3.quantile(values, 0.50);
                const q3 = d3.quantile(values, 0.75);
                const iqr = q3 - q1; // interquartile range
                const r0 = Math.max(min, q1 - iqr * 1.5);
                const r1 = Math.min(max, q3 + iqr * 1.5);
                bin.quartiles = [q1, q2, q3];
                bin.range = [r0, r1];
                bin.outliers = bin.filter(v => v.y < r0 || v.y > r1); // TODO
                return bin;
            })
        )
    });
    main.variable(observer("parser")).define("parser", ["d3"], function (d3) {
        return (
            d3.timeParse("%Y-%m-%d")
        )
    });
    
    main.variable(observer("parseTime")).define("parseTime", ["d3"], function (d3) {
        return (
            d3.isoParse
        )
    });
    main.variable(observer("data")).define("data", ["d3", "parser","valueOf", "parseTime"], function (d3, parser, valueOf, parseTime) {
        // d.date = parseDate(d.date);
        return (
            d3.csv(
                "https://api.unibit.ai/api/historicalstockprice/AAN?range=10y&interval=1&datatype=csv&AccessKey=73GHdSi9GXzyCDj4qhkypnBNn6ThFzBk",
                // "historicalprice_AAN_10y_1.csv",
                ({
                   date,
                    close
                }) => ({
                    // x: date,
                    x: parser(date).getFullYear(),
                    y: +close
                }))
        )
    });
    main.variable(observer("x")).define("x", ["d3", "bins", "margin", "width"], function (d3, bins, margin, width) {
        return (
            d3.scaleLinear()
            .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
            .rangeRound([margin.left, width - margin.right])
        )
    });
    main.variable(observer("y")).define("y", ["d3", "bins", "height", "margin"], function (d3, bins, height, margin) {
        return (
            d3.scaleLinear()
            .domain([d3.min(bins, d => d.range[0]), d3.max(bins, d => d.range[1])]).nice()
            .range([height - margin.bottom, margin.top])
        )
    });
    main.variable(observer("xAxis")).define("xAxis", ["height", "margin", "d3", "x", "n"], function (height, margin, d3,
        x, n) {
        return (
            g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(n).tickSizeOuter(0))
        )
    });
    main.variable(observer("yAxis")).define("yAxis", ["margin", "d3", "y"], function (margin, d3, y) {
        return (
            g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.select(".domain").remove())
        )
    });
    main.variable(observer("n")).define("n", ["width"], function (width) {
        return (
            13
        )
    });
    main.variable(observer("height")).define("height", function () {
        return (
            600
        )
    });
    main.variable(observer("margin")).define("margin", function () {
        return ({
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        })
    });
    main.variable(observer("d3")).define("d3", ["require"], function (require) {
        return (
            require("d3@5")
        )
    });
    return main;
}