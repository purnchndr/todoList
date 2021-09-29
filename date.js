module.exports.longDate = longDate;
module.exports.day = day;

function day() {
  var options = {
    weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
  };
  var today = new Date();
  //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
  var day = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
  //today.toLocaleDateString("hi-IN", options); // शनिवार, 17 सितंबर 2016
  return day;
}

function longDate() {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date();
  //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
  var day = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
  //today.toLocaleDateString("hi-IN", options); // शनिवार, 17 सितंबर 2016
  return day;
}
