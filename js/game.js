const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let hitAttempt = 0;
let missAttempt = 0;

function missTry () {
  let block = `<div class="block_miss"></div>`;
  let newBlock = $('.blocks');

  missAttempt++;

  newBlock.append(block);
}

function hitTry () {
  let block = `<div class="block_hit"></div>`;
  let newBlock = $('.blocks');

  hitAttempt++;

  newBlock.append(block);
}

function totalScore () {
  let totalMessage = $('#win-message');
  let totalHits = hitAttempt - missAttempt;

  totalMessage.append(`<p>Ваш счет: ${totalHits}point.</p>`);

  hitAttempt = 0;
  missAttempt = 0;
}

function round() {
  $("div.game-field").removeClass('target');
  $("div.game-field").removeClass('miss');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if(hits === 1) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("none");
  $("#button-start").addClass('none');

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");

  totalScore();
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $("div.target").text("");

    hitTry();

    round();
  }
  else {
    $(event.target).addClass('miss');

    missTry();
  }
}

function init() {
  $("#button-start").click(round);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
