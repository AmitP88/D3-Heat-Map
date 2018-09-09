const getData = () => {
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", (error, dataset) => {
        if (error) console.log(error);
        console.log(dataset);

        const w = 1000;
        const h = 500;

        /* Padding between SVG canvas boundary and the plotted data */
        const padding = 40;

        /* Scale for x-axis */
        let x_min = d3.min(dataset.monthlyVariance, (d) => d.year);
        let x_max = d3.max(dataset.monthlyVariance, (d) => d.year);
        const xScale = d3.scaleTime()
                         .domain([x_min, x_max])
                         .range([padding, w - padding]);

        /* Scale for y-axis */
        let y_min = d3.min(dataset.monthlyVariance, (d) => d.month);
        let y_max = d3.max(dataset.monthlyVariance, (d) => d.month);
        const yScale = d3.scaleTime()
                         .domain([y_max, y_min])
                         .range([h - padding, padding]);

        /* Add an SVG Canvas */
        const svg = d3.select(".container")
                      .append("svg")
                      .attr("class", "canvas");

        /* Add data points to SVG Canvas as bars */
        svg.selectAll("rect")
           .data(dataset.monthlyVariance)
           .enter()
           .append("rect")
           .attr("x", (d) => xScale(d.year))
           .attr("y", (d) => yScale(d.month))
           .attr("height", 50 + "px")
           .attr("width", 5 + "px")
           .attr("fill", "blue")
           .attr("data-month", (d) => (d.month))
           .attr("data-year", (d) => (d.year));
        



    });
}