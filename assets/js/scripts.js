//set moment to a variable
var now = moment();

var containerEl = $(".container").addClass("py-5");

// gets data for the header date
function getHeaderDate() {
  //create a variable for the current date
  var currentDate = now.format("dddd, MMMM Do");
  // Set date to Current day ID
  $("#currentDay").text(currentDate);
}
getHeaderDate();

$(document).ready(function () {
  // Loop to display tasks from local storage
  hourArr = $(".hour").toArray();
  for (i = 0; i < hourArr.length; i++) {
    $(hourArr[i])
      .siblings("textarea")
      .text(localStorage.getItem($(hourArr[i]).attr("data-time")));
  }
});

for (i = 0; i < 9; i++) {
  // variable rowContainer defined with time-block and row class
  var rowContainer = $("<div>").addClass("row time-block");
  // variable timeblock defined with hour and col-md-2 class
  var timeBlock = $("<div>")
    .addClass("col-md-2 hour")
    .text(moment("9:00 AM", "hh:mm A").add(i, "hours").format("LT"));
  timeBlock.attr(
    "data-time",
    moment("9:00 AM", "hh:mm A").add(i, "hours").format("hA")
  );
  //   variable taskArea defined with col-md-9 class
  var taskArea = $("<textarea>").addClass("col-md-9");
  //   variable saveButton defined with col-md-1 and saveBtn class
  var saveButton = $("<button>")
    .addClass("col-md-1 saveBtn")
    .html('<i class="fas fa-save"></i>');

  // append rowContainer in containerEl
  containerEl.append(rowContainer);
  //   append timeBlock in rowContainer
  $(rowContainer).append(timeBlock);
  //   insert taskArea after timeBlock is displayed
  $(timeBlock).after(taskArea);
  //   insert saveButton after taskArea is displayed
  $(taskArea).after(saveButton);

  //   Condition to determine the time is past, present or future
  if (now.isSame(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")) {
    $(taskArea).addClass("present");
  } else if (
    now.isBefore(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")
  ) {
    $(taskArea).addClass("future");
  } else if (
    now.isAfter(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")
  ) {
    $(taskArea).addClass("past");
  }
}

// click event on saveBtn to store the data-time attribute and textarea value to localstorage
$(".saveBtn").on("click", function () {
  localStorage.setItem(
    $(this).siblings("div.hour").attr("data-time"),
    $(this).siblings("textarea").val()
  );
});
