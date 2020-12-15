const axios = require("axios");

async function delayCall(call) {
  return new Promise(r => setTimeout(() => r(call()), 300))
}

function request(url) {
  return axios({
    url,
    method: "GET",
  }).catch(e => {
    console.log(`something went wrong ${e}`)
  });
}
const API = {
  bands: "https://api.mocki.io/v1/1767b67d",
  songs: "https://api.mocki.io/v1/1db31e8e"
}

module.exports = () => {
  const div = document.createElement("div");
  const bands = document.createElement("ul");
  const songs = document.createElement("ul");
  div.innerHTML = "Listing bands and songs";

  document.body.appendChild(div);

  request(API.bands).then(
    ({ data = { results: [] } } = {}) => {
      for (const item of data.results) {
        const li = document.createElement("li");
        li.innerHTML = `Band: ${item.band} Genre ${item.genre}`;
        bands.append(li);
      }
      div.append(bands);
    }
  );

  delayCall(() => request(API.songs)).then(
    ({ data = { results: [] } } = {}) => {
      console.log('now I am done and the test is alive?', window.example && window.example.alive)
      if (!(window.example && window.example.alive)) return;
      for (const item of data.results) {
        const li = document.createElement("li");
        li.innerHTML = `Song: ${item.song} Band ${item.band}`;
        songs.append(li);
      }
      div.append(songs);
    }
  );
};