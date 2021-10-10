//set moment to a variable
var now = moment();

var containerEl = $(".container").addClass("pt-5");

// gets data for the header date
function getHeaderDate() {
  //create a variable for the current date
  var currentDate = now.format("dddd, MMMM Do");
  // Set date
  $("#currentDay").text(currentDate);
}
getHeaderDate();

$(document).ready(function () {
    hourArr = $(".hour").toArray();
    for (i = 0; i < hourArr.length; i++) {
      $(hourArr[i])
        .siblings("textarea")
        .text(localStorage.getItem($(hourArr[i]).attr("data-time")));
    }
  });

for (i = 0; i < 9; i++) {
  var rowBlock = $("<div>").addClass("row time-block");
  var timeBlock = $("<div>")
    .addClass("col-md-2 hour")
    .text(moment("9:00 AM", "hh:mm A").add(i, "hours").format("hA"));
  timeBlock.attr(
    "data-time",
    moment("9:00 AM", "hh:mm A").add(i, "hours").format("hA")
  );
  var taskBlock = $("<textarea>").addClass("col-md-9");
  var saveButton = $("<button>")
    .addClass("col-md-1 saveBtn")
    .html('<i class="fas fa-save"></i>');

  containerEl.append(rowBlock);
  $(rowBlock).append(timeBlock);
  $(timeBlock).after(taskBlock);
  $(taskBlock).after(saveButton);

  if (now.isSame(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")) {
    $(taskBlock).addClass("present");
  } else if (
    now.isBefore(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")
  ) {
    $(taskBlock).addClass("future");
  } else if (
    now.isAfter(moment("9:00 AM", "hh:mm A").add(i, "hours"), "hour")
  ) {
    $(taskBlock).addClass("past");
  }
}

$(".saveBtn").on("click", function () {
    localStorage.setItem(
      $(this).siblings("div.hour").attr("data-time"),
      $(this).siblings("textarea").val()
    );
  });