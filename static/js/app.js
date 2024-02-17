// Defining the url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetching JSON data
d3.json(url).then(function(data){
    console.log(data);
    console.log(data.metadata);
    
    // Running function to populate dropdown option with subject IDs
    dropdown(data.samples);

    // Running function to initialize all charts with data from first subjectID
    init(data.samples, data.metadata);

    // Activating newquery function when change in dropdown
    d3.selectAll("#selDataset").on("change", newquery);

    function newquery(){
        console.log(`testing has been activated`);
        let dropdown = d3.select("#selDataset");
        let subjectquery = dropdown.property("value");
        // Activating change id function that refreshed the panel and charts with new data
        changeid(data.samples, subjectquery, data.metadata);
    };
});

// Defining a function to create drop down of IDs
function dropdown(subjects){
    // looping through samples
    for (let subject of subjects){
        // adding drop down menu of test subject id
        let individual = d3.select("#selDataset").append("option");
        individual.text(subject.id);
    };
};

// Defining a function to graph first individual in dataset
function init(subjects, met) {
    demographics(met[0]);
    createbar(subjects[0]);
    createbubble(subjects[0])
    gaugegraph(met[0]);
};

// Defining a function to load the demographics panel
function demographics(individual){
    // Clear the data in the demographics panel
    d3.selectAll(".panel-body>p").remove();

    // Find key value pairs and append it to the panel body
    for (var key in individual) {
        let demobody = d3.select(".panel-body").append("p");
        demobody.text(`${key}: ${individual[key]}`);
    };
};

// Defining a function to find data corresponding to dropdownid then graph and update demographics table
// Requires sampledata, queryid, and meta data
function changeid(subjects, subjectquery, meta){
    // Finding query in sampledata and creating bar and bubble charts
    for (let subject of subjects){
        if (subject.id == subjectquery){
            createbar(subject);
            createbubble(subject);
        };
    };
    // Finding query in metadata and populating demographics table
    for (let met of meta){
        if (met.id == subjectquery){
            demographics(met)
            gaugegraph(met);
        };
    };
};

// Defining a function to take a slice of data
function reduceto10(x){
    return x.slice(0,10);
};

// Defining a function to create a horizontal bar chart with 10 values
function createbar(individual){
    // Defining data for chart
    const only10number = reduceto10(individual.otu_ids.map((x) => "OTU "+x)).reverse();
    const only10label = reduceto10(individual.otu_labels).reverse();
    const only10values = reduceto10(individual.sample_values).reverse();
    // Trace for data with hovertext
    let trace1 = {
        y: only10number,
        x: only10values,
        hovertemplate: '<b>Number of Samples within %{y}:</b> %{x}'+'<br>'+'<b>OTU Organisms:</b>'+'<br>'+'<i>%{text}</i>',
        text: only10label,
        type: "bar",
        name: "",
        orientation: 'h',
    };
    // Defining layout
    let layout = {
        height:450,
        width: 600,
    };
    // Creating data array
    let info = [trace1];
    // Plotting in "bar" division
    Plotly.newPlot("bar", info, layout);
};

// Defining a function to create the bubble graph
function createbubble(individual){
    // Defining data for graph
    const bubbleotunumber = individual.otu_ids;
    const bubbleotulabel = individual.otu_labels;
    const bubblesval = individual.sample_values;
    // Defining Trace with custom hover text and bubble colour
    var trace1 = {
        x: bubbleotunumber,
        y: bubblesval,
        hovertemplate: '<b>Number of Samples within OTU:</b> %{x}'+'<br>'+'<b>OTU Organisms:</b>'+'<br>'+'<i>%{text}</i>',
        text: bubbleotulabel,
        mode: 'markers',
        name: "",
        marker: {
            size: bubblesval,
            color: bubbleotunumber
            }
    };
    // Defining layout of graph
    var layout = {
        height:600,
        width: 1250,
        xaxis: {
            title:{text: "OTU Number"}
        },
        yaxis: {
            title: {text: "Sample Value"}
        }
    };
    // Creating data array
    var info = [trace1];
    // Plotting bubble graph in bubble division
    Plotly.newPlot('bubble', info, layout);
};

// Defining a function to make graph that displays bellybutton wash frequency
function gaugegraph(individual){
    var gaugedata = [
        {
        domain: {x:[0,1],y:[0,1]},
        value: individual.wfreq,
        title: {text:"<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis:{range:[0,9]},
            bar: { color: "black" },
            steps: [
                { range: [0, 1], color: "#fafa6e" },
                { range: [1,2], color: "#bdea75" },
                { range: [2,3], color: "#86d780"},
                { range: [3,4], color: "#54c18a"},
                { range: [4,5], color: "#23aa8f"},
                { range: [5,6], color: "#00918d"},
                { range: [6,7], color: "#007882"},
                { range:[7,8], color: "#1f5f70"},
                {range: [8,9], color: "#2a4858"}
            ]
        }
    }];
    var layout = {
        height:500,
        width: 400
    };
    Plotly.newPlot('gauge', gaugedata, layout);
};