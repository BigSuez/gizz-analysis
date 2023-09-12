const url = 'https://raw.githubusercontent.com/BigSuez/gizz-analysis/main/data_extraction/Outputs/gizz_data.json'
optionChanged(0)



d3.json(url).then(function(data){
    d3.select('select').append('option').text("Summary").property('value', 0);
    //d3.select('select').append('option').text("All Albums").property('value', 1);
    for (i=0; i< data.length; i++){
        d3.select('select').append('option').text(data[i].title).property('value', i+2);
    };
    albums = data;
});


function optionChanged(id){
    if (id == 0){
        getSummary()
    //}else if(id == 1){
    //    document.getElementById('stats').innerHTML = ''
    //    getAlbums()
    }else{
        document.getElementById('stats').innerHTML = ''
        getImage(Number(id)-2);
        getBar(Number(id)-2);
        getStats(Number(id)-2);
    };
};


function getImage(id){
    document.getElementById('album-cover').innerHTML = `<img src=${albums[id].image}>`;
};

function getSummary(){
    document.getElementById('stats').innerHTML = `Welcome! The goal of this page is to allow you to explore the discography of the greatest band, King Gizzard and the Lizard Wizard. </br></br>
                                                Here you'll find stats on each song per album, as well as a comparison between their albums </br></br>
                                                Spotify Feature Descriptions: </br>
                                                <ul>
                                                <li>Valence: Musical Positivity. Higher = Happier Sounding</li>
                                                <li>Energy: Intensity. Higher = Faster, Louder</li>
                                                <li>Danceability: Rhythm Stability. Higher = Stronger Beats</li>
                                                <li>Acousticness: Confidence Measure. Higher = Likely Acoustic</li>
                                                <li>Speechiness: Spoken Word. Higher = More Spoken Words</li>
                                                <li>Instrumentalness: Vocal Presence. Higher = Fewer Vocals</li>
                                                <li>Liveness: Audience Interaction. Higher = More Likely Live</li>
                                                </ul>`;
    document.getElementById('bar').innerHTML = '';
    document.getElementById('album-cover').innerHTML = '';
}

function getStats(id){
    let totalValence = 0, totalDanceability = 0; 
    for (i = 0; i < albums[id].tracks.length; i++){
        track = albums[id].tracks[i].features;
        totalValence += track.valence;
        totalDanceability += track.danceability;
    };
    let avgValence = totalValence / albums[id].tracks.length;
    let avgDanceability = totalDanceability / albums[id].tracks.length; 
};


function getBar(id){
    let tracks = albums[id].tracks;
    let trace1 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.energy),
        type: 'line',
        name: 'Energy'
    };
    let trace2 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.danceability),
        type: 'line',
        name: 'Danceability'
    };
    let trace3 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.valence),
        type: 'line',
        name: 'Valence'
    };
    let trace4 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.acousticness),
        type: 'line',
        name: 'Acousticness',
        visible: 'legendonly'
    };
    let trace5 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.speechiness),
        type: 'line',
        name: 'Speechiness',
        visible: 'legendonly'
    };
    let trace6 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.instrumentalness),
        type: 'line',
        name: 'Instrumentalness',
        visible: 'legendonly'
    };
    let trace7 = {
        x: tracks.map(track => track.title),
        y: tracks.map(track => track.features.liveness),
        type: 'line',
        name: 'Liveness',
        visible: 'legendonly'
    };
    let data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7]
    Plotly.newPlot('bar', data);
}