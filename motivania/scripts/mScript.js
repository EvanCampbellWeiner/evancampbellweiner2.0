//File Name: mScript.js
//Programmer Name: Evan Campbell-Weiner
//Date Last-Updated: 7/22/19
//Outside API: boredapi.com
//Description:
//This is the jQuery script used in conjunction with motivania.html and mStyle.css
//to make the three specification buttons (single, free, relaxed) work with
//the two buttons that separately add and remove items from a literal bucket list.

//Declare variables to be used in the script
let array = new Array();
let relaxed = false;
let free = false;
let single = false;
//Function to add an item to the bucket
function addToList(data) {
  array.push(data.activity);
  if (array.length < 16) {
    $("ol").append('<li id = "content">' + data.activity + "</li>");
  }
}

//Click event handler for the 1 person button
//it basically adds to itself the class "triggered", and untriggers the other buttons
$("button#single").click(function() {
  single = true;
  free = false;
  relaxed = false;
  $("button#single").addClass("triggered");
  $("button#free").removeClass("triggered");
  $("button#relaxed").removeClass("triggered");
  $("button#none").removeClass("triggered");
});

//Click event handler for the free activity button
//it basically adds to itself the class "triggered", and untriggers the other buttons
$("button#free").click(function() {
  single = false;
  free = true;
  relaxed = false;
  $("button#single").removeClass("triggered");
  $("button#free").addClass("triggered");
  $("button#relaxed").removeClass("triggered");
  $("button#none").removeClass("triggered");
});

//Click event handler for the relaxed activity button
//it basically adds to itself the class "triggered", and untriggers the other buttons
$("button#relaxed").click(function() {
  single = false;
  free = false;
  relaxed = true;
  $("button#single").removeClass("triggered");
  $("button#free").removeClass("triggered");
  $("button#relaxed").addClass("triggered");
  $("button#none").removeClass("triggered");
});

//Click event handler for no specifications button
//it basically adds to itself the class "triggered", and untriggers the other buttons
$("button#none").click(function() {
  single = false;
  free = false;
  relaxed = false;
  $("button#single").removeClass("triggered");
  $("button#free").removeClass("triggered");
  $("button#relaxed").removeClass("triggered");
  $("button#none").addClass("triggered");
});

//button to "fill" the bucket
$("#fill").click(function() {
  //Choose the boredApi link based off of specification, then call addTolist
  if (free == true) {
    $.getJSON("https://www.boredapi.com/api/activity?price=0", {
      format: "json"
    }).done(function(data) {
      addToList(data);
    });
  } else if (relaxed == true) {
    $.getJSON("https://www.boredapi.com/api/activity?type=relaxation", {
      format: "json"
    }).done(function(data) {
      addToList(data);
    });
  } else if (single == true) {
    $.getJSON("https://www.boredapi.com/api/activity?participants=1", {
      format: "json"
    }).done(function(data) {
      addToList(data);
    });
  } else {
    $.getJSON("https://www.boredapi.com/api/activity/", {
      format: "json"
    }).done(function(data) {
      addToList(data);
    });
  }
});

//Click event for when they want to "drink" because they finished a task
//on their bucket list.
$("#drink").click(function() {
  $("ol>li").last().remove();
  array.pop();
});
