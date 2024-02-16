// defining the url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



// Fetching JSON data
d3.json(url).then(function(data){
    console.log(data.samples);
    
    // Running function to populate dropdown option with subject IDs
    dropdown(data.samples);

    // Running function to create an initial barchart with data from first subjectID
    init(data.samples);

    // Activating testing function when change in dropdown
    d3.selectAll("#selDataset").on("change", testing);

    function testing(){
        console.log(`testing has been activated`);
        let dropdown = d3.select("#selDataset");
        let subjectquery = dropdown.property("value");
        console.log(subjectquery);
        changeid(data.samples, subjectquery);
    }

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
        hovertemplate: '<b>Number of Sample: %{x}</b>'+'<br>'+'<b>OTU Label:</b>'+'<br>'+'<i>%{text}</i>',
        text: only10label,
        type: "bar",
        name: "",
        orientation: 'h'
    };

    // Creating data array
    let info = [trace1];

    // Plotting in "bar" division
    Plotly.newPlot("bar", info);
};

// Defining a function to graph first individual in dataset
function init(subjects) {
    // Adding barchart
    createbar(subjects[0]);
    createbubble(subjects[0]);
};



// Defining a function to find data corresponding to dropdown id and graph it
function changeid(subjects, subjectquery){
    console.log(`the subjectquery is ${subjectquery}`);
    // loop through individual subject
    for (let subject of subjects){
        if (subject.id == subjectquery){
            createbar(subject);
            createbubble(subject);
        };
    };
};

function createbubble(individual){

        const bubbleotunumber = individual.otu_ids;
        const bubbleotulabel = individual.otu_labels;
        const bubblesval = individual.sample_values;
        
        var trace1 = {
            x: bubbleotunumber,
            y: bubblesval,
            hovertemplate: '<b>%{x}</b>'+'<br>'+'<b>OTU Label:</b>'+'<br>'+'<i>%{text}</i>',
            text: bubbleotulabel,
            mode: 'markers',
            name: "",
            marker: {
                size: bubblesval,
                color: bubbleotunumber,
                }
        };
    
    var info = [trace1];

    Plotly.newPlot('bubble', info);
        

};