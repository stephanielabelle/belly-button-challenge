// defining the url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



// Fetching JSON data
d3.json(url).then(function(data){
    dropdown(data.samples);
    console.log(data.samples);
    init(data.samples);


// Activating testing function when change in dropdown
d3.selectAll("#selDataset").on("change", testing);

function testing(){
    console.log(`testing has been activated`);
    let dropdown = d3.select("#selDataset");
    let subjectquery = dropdown.property("value")
    console.log(subjectquery)
    bargraph(data.samples, subjectquery)
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

let microid = [];
let microname = [];
let microsv = [];

function reduceto10(x){
    return x.slice(0,10);
}

function init(subjects) {
    const firstx = subjects[0].otu_ids
    const otulabel = reduceto10(firstx.map((x) => "OTU "+x));
    const only10label = reduceto10(subjects[0].otu_labels);
    const only10values = reduceto10(subjects[0].sample_values);
    
    console.log(`at init: micro id ${otulabel}, microname ${only10label}, microsv ${only10values}`)
    let trace1 = {
        x: otulabel,
        y: only10values,
        type: "bar"
    };
    let info = [trace1];
    Plotly.newPlot("bar", info);
};




// Defining a function to take max of 10 entries starting at index 0 of sample values
function bargraph(subjects, subjectquery){
    console.log(`the subjectquery is ${subjectquery}`);
    // loop through individual subject
    for (let subject of subjects){
        
        if (subject.id == subjectquery){
            // pull data and put into variables
            const firstx = subject.otu_ids;
            const otureplace = reduceto10(firstx.map((x) => "OTU "+x));
            const only10bacname = reduceto10(subject.otu_labels);
            const only10values = reduceto10(subject.sample_values);
            console.log(`the length of names is: ${microname.length}`)
            console.log(`micro id ${otureplace}, microname ${only10bacname}, microsv ${only10values}`)
            
            let trace1 = {
                x: otureplace,
                y: only10values,
                type:"bar"
            }
            let info = [trace1];
            // updatePlotly(info)
            // Plotly.newPlot("bar", info); 
            Plotly.restyle("bar", info)   
            
        };
    };
 
};

function updatePlotly(newdata){
    Plotly.restyle("bar", info, [newdata])
}

        