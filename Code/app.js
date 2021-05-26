// Chart Population
function plot(id) {
    // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as data
    d3.json("samples.json").then((data) => {
        // console.log(data);

        // filter data by id
        var results = data.samples.filter(sample => sample.id.toString() === id)[0];
       
        // set variables to identify the top 10
        var value = results.sample_values;
        var id = results.otu_ids;
        var label = results.otu_labels;
        var top_values = value.slice(0,10).reverse();
        var top_id = id.slice(0,10).reverse();
        var top_label = label.slice(0,10).reverse();
        var formated_top_id = top_id.map(otuid => `OTU: ${otuid}`);
                    
        // Create Bar Chart
        var trace_barchart = {
            x: top_values,
            y: formated_top_id,
            text: top_label,
            type: "bar",
            orientation: "h",
        };
      
        // Define the plot layout
        var layout_barchart = {
            title: "Top 10 Microbial Species (OTUs)",
            xaxis: {
                title: "Sample Values",
                tickmode: "linear"
            },
            height: 700,
            width: 500,
        };

        // Create the data array for our plot
        var data_barchart = [trace_barchart];
        
        // Plot the chart to "bar"
        Plotly.newPlot("bar", data_barchart, layout_barchart);

        // Create bubble chart
        var trace_bubblechart = {
            x: id,
            y: value,
            text: label,
            mode: "markers",
            marker: {
                color: id,
                size: value
            },

        };

        // Define the plot layout
        var layout_bubblechart = {
            xaxis: { title: "OTU ID"},
            height: 700,
            width: 1000
        };

        // Create the data array for our plot
        var data_bubblechart = [trace_bubblechart];

        Plotly.newPlot("bubble", data_bubblechart, layout_bubblechart);
     
    });
}

// Display the metadata
function metadata(id) {
    // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as data
    d3.json("sample.json").then((data) => {
        
        // filter data by id
        var meta = data.metadata.filter(data => data.id.toString() === id)[0];
        // console.log(meta);

        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");

        Object.entries(meta).forEach((key) => {
            // console.log(key, value);
            sample_metadata.append("h5").text(`${key}: ${value}`);
        });
    });
}

// create change event
function optionChanged(id) {
    plot(id);
    metadata(id);
}

// create initial dataset
function init() {

    // create dropdown
    var dropdown = d3.select("#selDataset");

    // Use d3.json() to fetch data from JSON file
    // Incoming data is internally referred to as data
    d3.json("samples.json").then((data) => {
        
        // variables for dropdown
        var names = data.names;
        names.forEach((name) => {
            dropdown.append("option").text(name).property("value");
        });

        var initialsample = data.names[0];
        plot(initialsample);
        metadata(initialsample);
    });
}

init();