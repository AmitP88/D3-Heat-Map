const getData = () => {
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", (error, dataset) => {
        if (error) console.log(error);
        const w = 2000;
        const h = 480; // 12 months * 40 (height of each bar)

        /* Padding between SVG canvas boundary and the plotted data */
        const padding = 75;

        /* format Year for year data */
        const formatYear = d3.timeFormat("%Y");
        const formatMonth = d3.timeFormat("%B");

        /* Scale for x-axis */
        let x_min = d3.min(dataset.monthlyVariance, (d) => Date.parse(d.year));
        let x_max = d3.max(dataset.monthlyVariance, (d) => Date.parse(d.year));

        const xScale = d3.scaleTime()
                         .domain([x_min, x_max])
                         .range([padding, w - padding]);

        /* Scale for y-axis */
        let y_min = d3.min(dataset.monthlyVariance, (d) => Date.parse(d.month));
        let y_max = d3.max(dataset.monthlyVariance, (d) => Date.parse(d.month));
        const yScale = d3.scaleTime()
                         .domain([y_min, y_max])
                         .range([h - padding, padding]);

        /* Add an SVG Canvas */
        const svg = d3.select(".container")
                      .append("svg")
                      .attr("class", "canvas");

        // Define the div for the tooltip
        var div = d3.select(".container")
                    .append("div")	
                    .attr("class", "tooltip")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

        /* Color codes for different temperatures - colors from http://www.december.com/html/spec/colorcodes.html */
        const sign_blue = "#003F87";
        const denim = "#4372AA";
        const blue_sponge = "#5D92B1";
        const light_blue = "#ADD8E6";
        const lightcyan = "#E0FFFF";
        const popcorn_yellow = "#FFFFAA";
        const light_goldenrod = "#EEDD82";
        const apricot1 = "#FBA16C";
        const coral1 = "#FF7256";
        const bloodorange = "#CC1100";
        const red_delicious_apple = "#9D1309";

        /* Add data points to SVG Canvas as bars */
        let baseTemperature = dataset.baseTemperature;

        svg.selectAll("rect")
           .data(dataset.monthlyVariance)
           .enter()
           .append("rect")
           .attr("x", (d) => xScale(Date.parse(d.year)))
           .attr("y", (d) => yScale(Date.parse(d.month)) - 15)
           .attr("height", 30)
           .attr("width", 7)
           .attr("fill", (d) => {
               let temp = Math.round((d.variance + baseTemperature) * 10)/10;
               switch(true) {
                case (temp <= 2.8):
                    return sign_blue;
                    break;
                case (temp > 2.8 && temp <= 3.9):
                    return denim;
                    break;
                case (temp > 3.9 && temp <= 5.0):
                    return blue_sponge;
                    break;
                case (temp > 5.0 && temp <= 6.1):
                    return light_blue;
                    break;
                case (temp > 6.1 && temp <= 7.2):
                    return lightcyan;
                    break;
                case (temp > 7.2 && temp <= 8.3):
                    return popcorn_yellow;
                    break;
                case (temp > 8.3 && temp <= 9.5):
                    return light_goldenrod;
                    break;
                case (temp > 9.5 && temp <= 10.6):
                    return apricot1;
                    break;
                case (temp > 10.6 && temp <= 11.7):
                    return coral1;
                    break;
                case (temp > 11.7 && temp <= 12.8):
                    return bloodorange;
                    break;
                case (temp > 12.8):
                    return red_delicious_apple;
                    break;
                default:
                    return "white";
               }
           })
           .attr("class", "cell")
           .attr("data-month", (d) => (d.month) - 1)
           .attr("data-year", (d) => (d.year))
           .attr("data-temp", (d) => Math.round((d.variance + baseTemperature) * 10)/10)
           .on("mouseover", (d) => {		
            div.transition()		
               .duration(200)		
               .style("opacity", .9);
            
            div.html(formatMonth(Date.parse(d.month)) + "<span> </span>" + (d.year) + "</br>" + (Math.round((d.variance + baseTemperature) * 10)/10) + "<span>&#8451;</span>" + "</br>" + (d.variance) + "<span>&#8451;</span>")	
               .style("left", (d3.event.pageX) + 10 + "px")		
               .style("top", (d3.event.pageY - 28) + "px")
               .attr("data-year", d.year);
            })					
            .on("mouseout", function(d) {		
                div.transition()		
                .duration(500)		
                .style("opacity", 0);
            });

        /* Added x and y axes to the left and bottom of the svg canvas */
        let number_of_years = Math.floor((dataset.monthlyVariance.length)/(12 * 10)); // # of total data points divided by 10 years worth of months (12 months in a year times 10 years = 120 months in 10 years). One tick is for every 10 years.
        const xAxis = d3.axisBottom(xScale).tickFormat(formatYear).ticks(number_of_years);
        const yAxis = d3.axisLeft(yScale).tickFormat(formatMonth);
        svg.append("g")
           .attr("id", "x-axis")
           .attr("transform", "translate(0, 420)")
           .call(xAxis);

           svg.append("g")
           .attr("id", "y-axis")
           .attr("transform", "translate(75, 0)")
           .call(yAxis);

             // text label for the x axis
            svg.append("text")             
            .attr("transform", "translate(1000, 500)")
            .style("text-anchor", "middle")
            .text("Years");

             // text label for the y axis
            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", -250)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Months");

        /* =============== LEGEND =============== */
        
        /* background bar */
        const legend = svg.append("g")
           .attr("x", 100)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 440 + "px")
           .attr("fill", "green")
           .attr("id", "legend");

        /* 0 - 2.8 blue bar */
        legend.append("rect")
           .attr("x", 100)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", sign_blue)
           .attr("class", "border");
        
        /* 2.8 - 3.9 blue bar */
        legend.append("rect")
           .attr("x", 140)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", denim)
           .attr("class", "border");    

        /* 3.9 - 5.0 blue bar */
        legend.append("rect")
           .attr("x", 180)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", blue_sponge)
           .attr("class", "border");  

        /* 5.0 - 6.1 blue bar */
        legend.append("rect")
           .attr("x", 220)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", light_blue)
           .attr("class", "border");

        /* 6.1 - 7.2 blue bar */
        legend.append("rect")
           .attr("x", 260)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", lightcyan)
           .attr("class", "border");

        /* 7.2 - 8.3 yellow bar */
        legend.append("rect")
           .attr("x", 300)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", popcorn_yellow)
           .attr("class", "border"); 

        /* 8.3 - 9.5 yellow bar */
        legend.append("rect")
           .attr("x", 340)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", light_goldenrod)
           .attr("class", "border"); 

        /* 9.5 - 10.6 orange bar */
        legend.append("rect")
           .attr("x", 380)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", apricot1)
           .attr("class", "border");

        /* 10.6 - 11.7 light red bar */
        legend.append("rect")
           .attr("x", 420)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", coral1)
           .attr("class", "border");

        /* 11.7 - 12.8 red bar */
        legend.append("rect")
           .attr("x", 460)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", bloodorange)
           .attr("class", "border");

        /* 12.8 dark red bar */
        legend.append("rect")
           .attr("x", 500)
           .attr("y", 500)
           .attr("height", 30 + "px")
           .attr("width", 40 + "px")
           .attr("fill", red_delicious_apple)
           .attr("class", "border");

        const legend_points = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];

        /* Scale for legend */
        let legend_min = d3.min(legend_points, (p) => p);
        let legend_max = d3.max(legend_points, (p) => p);
        console.log(legend_min, legend_max);
        const legendScale = d3.scaleLinear()
                            .domain([legend_min, legend_max])
                            .range([31.5, 431.5]);

        /* Axis for legend */
        const legendAxis = d3.axisBottom(legendScale).tickSizeOuter([0]);
        legend.append("g")
           .attr("transform", "translate(100, 529.5)")
           .call(legendAxis);













    });
}