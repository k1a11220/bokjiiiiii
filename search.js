const API_KEY =
  "qt%2BHSez0GjoTYvzN9D49cDlbHcVmSSxlKAUmIrLEqtHhnJBf6URyeHVJYuTIP13Hm148dCo3U7qu0QeSF%2FXoZw%3D%3D";

const LIFE = document.querySelector("#js-life");
const CHAR = document.querySelector("#js-char");
const INDVD = document.querySelector("#js-indvd");
const DESIRE = document.querySelector("#js-desire");

let LIFE_ARRAY = LIFE.value;
let CHAR_ARRAY = CHAR.value;
let INDVD_ARRAY = INDVD.value;
let DESIRE_ARRAY = DESIRE.value;

function onChange() {
  LIFE_ARRAY = LIFE.value;
  CHAR_ARRAY = CHAR.value;
  INDVD_ARRAY = INDVD.value;
  DESIRE_ARRAY = DESIRE.value;
  console.log(LIFE_ARRAY, CHAR_ARRAY, INDVD_ARRAY, DESIRE_ARRAY);
}

function getData() {
  fetch(
    `https://www.bokjiro.go.kr/openapi/rest/gvmtWelSvc?crtiKey=${API_KEY}&callTp=L&pageNum=1&numOfRows=100&lifeArray=${LIFE_ARRAY}&charTrgterArray=${CHAR_ARRAY}&trgterIndvdlArray=${INDVD_ARRAY}&desireArray=${DESIRE_ARRAY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
    });
}

// function init()

// //  "0YkoGDtPqG%2FxNAZCeFtcfiOAkqQTu31i6eD5VF2JGaDx3oqn9Fu0DWOM7ZgNjysnSQwtuxzBY2W3QpglFBIYpQ%3D%3D"
