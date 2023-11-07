$(document).ready(function () {
  var focusMinutes = 25;
  var shortBreakMinutes = 5;
  var longBreakMinutes = 15;
  var minutes = focusMinutes;
  var seconds = 0;
  var running = false;
  var timerInterval;
  var focusMode = true;
  var counter = 0;

  function updateTimer() {
    $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
    $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      if (minutes == 0 && seconds === 0) {
        // Timer is finished
        clearInterval(timerInterval);

        if (focusMode) {
          breakTime();
        } else {
          focusTime();
        }
        seconds = 0;
        updateTimer();
      } else if (seconds == 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateTimer();
    }, 1000);
    $("#play").html("<i class='fa-solid fa-pause fa-xl'></i>");
    $("#time h2").css("font-weight", "bold");
  }

  $(".change").change(function () {
    const type = $(this).data("type");
    const newValue = parseInt($(this).val());

    if (type === "focus") {
      focusMinutes = newValue;
      if (focusMode) {
        focusTime();
      }
    } else if (type === "short") {
      shortBreakMinutes = newValue;
    } else if (type === "long") {
      longBreakMinutes = newValue;
    }

    updateTimer();
  });

  $("#play").click(function () {
    if (running) {
      clearInterval(timerInterval);
      $(this).html("<i class='fa-solid fa-play fa-lg'>");
      $("#time h2").css("font-weight", "");
    } else {
      startTimer();
    }
    running = !running;
  });

  // Skip the timer
  $("#forward").click(function () {
    clearInterval(timerInterval);
    running = false;
    if (counter == 4) {
      longBreakTime();
    } else {
      if (focusMode) breakTime();
      else focusTime();
    }

    seconds = 0;
    updateTimer();
  });

  function breakTime() {
    $("#label").html('<i class="fa-solid fa-mug-hot"></i> Short Break');
    breakColor();
    $("#play").html("<i class='fa-solid fa-play fa-lg'>");
    $("#time h2").css("font-weight", "");
    minutes = shortBreakMinutes;
    focusMode = false;
    counter++;
    if (counter == 4) longBreakTime();
  }

  function focusTime() {
    $("#label").html('<i class="fa-solid fa-brain fa-lg"></i> Focus');
    focusColor();
    $("#play").html("<i class='fa-solid fa-play fa-lg'>");
    $("#time h2").css("font-weight", "");

    minutes = focusMinutes;
    focusMode = true;
  }

  function longBreakTime() {
    $("#label").html('<i class="fa-solid fa-mug-hot"></i> Long Break');
    longBreakColor();
    $("#play").html("<i class='fa-solid fa-play fa-lg'>");
    $("#time h2").css("font-weight", "");
    minutes = longBreakMinutes;
    focusMode = false;
    counter = 0;
  }

  function breakColor() {
    $("#timer").css({ "background-color": whiteGreen, color: darkGreen });
    $("#label").css("background-color", labelGreen);
    $("#play").css("background-color", controlGreen);
    $(".control").css("background-color", lightGreen);
    $("#popup").css("background-color", whiteGreen);
  }

  function focusColor() {
    $("#timer").css({ "background-color": whiteRed, color: darkRed });
    $("#label").css("background-color", labelRed);
    $("#play").css("background-color", controlRed);
    $(".control").css("background-color", lightRed);
    $("#popup").css("background-color", whiteRed);
  }

  function longBreakColor() {
    $("#timer").css({ "background-color": whiteBlue, color: darkBlue });
    $("#label").css("background-color", labelBlue);
    $("#play").css("background-color", controlBlue);
    $(".control").css("background-color", lightBlue);
    $("#popup").css("background-color", whiteBlue);
  }

  // Initialize timer
  updateTimer();

  // Hide menu
  $("#popup").toggle();

  function toggleMenu() {
    $("#popup").toggle();
    $("#container").toggle();
  }

  $("#settings").click(function () {
    toggleMenu();
  });

  $(".fa-xmark").click(function () {
    toggleMenu();
  });

  $("#toggle-dark").click(function () {
    if ($(this).prop("checked")) {
      darkRed = whiteRed;
      whiteRed = blackRed;
      darkGreen = whiteGreen;
      whiteGreen = blackGreen;
      darkBlue = whiteBlue;
      whiteBlue = blackBlue;
      $(".change").css("border-color", "#ffffff55");
      $("#popup").css("box-shadow", "0px 0px 10px #ffffff80");
      $("body").css('background-color', "#3b444b");

      if (focusMode) {
        focusColor();
      } else if (counter == 0) {
        longBreakColor();
      } else breakColor();
    } else {
      darkRed = "#471515";
      whiteRed = "#fff5f5";
      darkGreen = "#14401d";
      whiteGreen = "#f2fff5";
      darkBlue = "#153047";
      whiteBlue = "#f2f9ff";
      $(".change").css("border-color", "");
      $("#popup").css("box-shadow", "");
      $("body").css('background-color', "");

      if (focusMode) {
        focusColor();
      } else if (counter == 0) {
        longBreakColor();
      } else breakColor();
    }
  });
});
var darkRed = "#471515";
var labelRed = "#ff4a4a33";
var controlRed = "#ff4c4cbb";
var whiteRed = "#fff5f5";
var lightRed = "#ff4a4a23";
var blackRed = "#0d0404";
var darkGreen = "#14401d";
var labelGreen = "#4dda6e33";
var controlGreen = "#4dda6ebb";
var whiteGreen = "#f2fff5";
var lightGreen = "#4dda6e23";
var blackGreen = "#040d06";
var darkBlue = "#153047";
var labelBlue = "#4cacff33";
var controlBlue = "#4cacffbb";
var whiteBlue = "#f2f9ff";
var lightBlue = "#4cacff23";
var blackBlue = "#04090d";
