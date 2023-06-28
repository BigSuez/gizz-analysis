const url = 'https://raw.githubusercontent.com/BigSuez/gizz-analysis/main/data_extraction/Outputs/gizz_data.json'
let albums = []
d3.json(url).then(function(data){
    for (i=0; i< data.length; i++){
        d3.select('select').append('option').text(data[i].title).property('value', i);
    };
    albums = data;
})

function optionChanged(id){
    makeBar(id);
}

function makeBar(id){
    let tracks = albums[id].tracks;
    console.log(tracks);
    let data = [{
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.tempo),
        type: 'bar'
    }]
    Plotly.newPlot('bar', data);
}