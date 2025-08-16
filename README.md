# Race Designer  

**My first data journalism app (2013).**  
Race Designer is an interactive tool for planning and visualizing your race strategy.  

## Features  
- 📏 **Per-kilometer breakdown** – shows elapsed time for every kilometer so you can monitor progress throughout the race.  
- ⏱ **Split pacing mode** – lets you experiment with different pacing strategies to optimize performance.  

## Technical Notes  
While many JavaScript chart libraries exist, I couldn’t find one that allowed **resizing a chart’s bars** out of the box.  
To solve this, I used a JavaScript UI library ([jQuery UI](http://jqueryui.com/)) and CSS3.  
This approach isn’t perfect—you need to build the chart manually—but it provides the flexibility to implement interactive resizing.  
