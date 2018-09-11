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
        let baseTemperature = dataset.baseTemperature;
        console.log(baseTemperature);

        svg.selectAll("rect")
           .data(dataset.monthlyVariance)
           .enter()
           .append("rect")
           .attr("x", (d) => xScale(d.year))
           .attr("y", (d) => yScale(d.month))
           .attr("height", 50 + "px")
           .attr("width", 5 + "px")
           .attr("fill", "blue")
           .attr("class", "cell")
           .attr("data-month", (d) => (d.month))
           .attr("data-year", (d) => (d.year))
           .attr("data-temp", (d) => Math.round((d.variance + baseTemperature) * 10)/10);
        
        /* LEGEND - colors from http://www.december.com/html/spec/colorcodes.html */
        /* background bar */
        svg.append("rect")
           .attr("x", 40)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 440 + "px")
           .attr("fill", "green")
           .attr("id", "description");

        /* 0 - 2.8 blue bar */
        svg.append("rect")
           .attr("x", 40)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#003F87") // sign blue color
           .attr("class", "border");
        
        /* 2.8 - 3.9 blue bar */
        svg.append("rect")
           .attr("x", 80)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#4372AA") // denim color
           .attr("class", "border");    

        /* 3.9 - 5.0 blue bar */
        svg.append("rect")
           .attr("x", 120)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#5D92B1") // blue sponge color
           .attr("class", "border");  

        /* 5.0 - 6.1 blue bar */
        svg.append("rect")
           .attr("x", 160)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#ADD8E6") // lightblue (SVG) color
           .attr("class", "border");

        /* 6.1 - 7.2 blue bar */
        svg.append("rect")
           .attr("x", 200)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#E0FFFF") // lightcyan (SVG) color
           .attr("class", "border");

        /* 7.2 - 8.3 yellow bar */
        svg.append("rect")
           .attr("x", 240)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#FFFFAA") // popcorn yellow color
           .attr("class", "border"); 

        /* 8.3 - 9.5 yellow bar */
        svg.append("rect")
           .attr("x", 280)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#EEDD82") // light goldenrod color
           .attr("class", "border"); 

        /* 9.5 - 10.6 orange bar */
        svg.append("rect")
           .attr("x", 320)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#FBA16C") // apricot1 color
           .attr("class", "border");

        /* 10.6 - 11.7 light red bar */
        svg.append("rect")
           .attr("x", 360)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#FF7256") // coral1 color
           .attr("class", "border");

        /* 11.7 - 12.8 red bar */
        svg.append("rect")
           .attr("x", 400)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#CC1100") // bloodorange (Hex3) color
           .attr("class", "border");

        /* 12.8 dark red bar */
        svg.append("rect")
           .attr("x", 440)
           .attr("y", 600)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", "#9D1309") // red delicious apple color
           .attr("class", "border"); 


    });
}