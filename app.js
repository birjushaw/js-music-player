const music = document.querySelector("#music");
const play = document.getElementById("play");
const img = document.querySelector("img");
const artist = document.querySelector("#artist");
const title = document.querySelector("#title");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const times = document.getElementById("times");
// progress
const progress = document.querySelector("#progress");
let durationTime = document.querySelector("#duration");
let current_time = document.querySelector("#current_time");
const progress_div = document.getElementById("progress_div")

const songs = [
  {
    name: "music-1",
    // imgs : "img 1",
    title: "Ganga Dharaye shiv",
    artist: "Depak Chamoli",
  },
  {
    name: "music-2",
    // imgs : "img 2",
    title: "Ram siya ram",
    artist: "Sachet Tandon ",
  },
  {
    name: "music-3",
    // imgs : "img 3",
    title: "Hanuman Astak",
    artist: "Gulsan Kumar ",
  },
  {
    name: "music-4",
    // imgs : "img 3",
    title: "Sukh Karta Dukh Harta",
    artist: "Ravi Singha ",
  },
  {
    name: "music-5",
    // imgs : "img 3",
    title: "Yashomati Maiya se",
    artist: "Shivam Sundaram",
  },
];

let isPlaiying = false;
const playMusic = () => {
  isPlaiying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};
const pauseMusic = () => {
  isPlaiying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaiying ? pauseMusic() : playMusic();
});

// changing the music data

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "Media/" + songs.name + ".mp4";
  img.src = "images/" + songs.name + ".jpg";
};

let songIndex = 0;
// loadSong(songs[0])
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// progress
music.addEventListener("timeupdate", (event) => {
  // console.log(event);
  const { currentTime, duration } = event.srcElement;

  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // time update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  let total_duration = `${min_duration} : ${sec_duration}`;
  //    nan promlem
  if (duration) {
    durationTime.textContent = total_duration;
  }

  // currentTime update

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  //    nan promlem

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let total_currentTime = `${min_currentTime} : ${sec_currentTime}`;
  current_time.textContent = `${total_currentTime}`;
});

// progress onclick functionality 
progress_div.addEventListener("click",(event)=>{
    const {  duration } = music;
    let mover_progress = (event.offsetX / event.srcElement.clientWidth) * duration
    console.log(duration);
    console.log(mover_progress);

    music.currentTime = mover_progress;

})

// next song play with progress ended 
music.addEventListener("ended" , nextSong)

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
