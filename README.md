# Module 14 Challenge
## Belly Button Diversity Dashboard

### Objective
This projects creates an interactive dashboard that explores the [Belly Button Diversity dataset](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json) by analyzing the microbes that colonize the human navel.  

This dataset provided subject metadata and microbial species data.  Microbial species were categorized by OTUs (operational taxonomic units).  OTU's are a system that groups microbes based on genetic sequence similarity.

The javascript code, [app.js](statis/js/app.js), is provided in this repository's static folder.  The html code is provided as [index.html](index.html), in this repository's main folder.  
The dashboard is inititally populated with the first SubjectID of the dataset, then updated upon selection of SubjectID from drop-down menu.

The javascript code produces the following components:
1. Dropdown menu of SubjectID
2. Demographics of SubjectID
3. Bar Chart of top 10 OTU counts by SubjectID
4. Bubble Chart of all OTUs by SubjectID
5. Gauge Chart representing frequency of belly button scrubbing

