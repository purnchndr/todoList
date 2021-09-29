const express = require("express");
const bodyParser = require("body-parser");
//app.use(bodyParser, unencoded({ extended: true }));
const app = express();
const _ = require("lodash");

//require mongoose
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");
app.use(bodyParser.urlencoded({ extended: true }));
//Mongodb code
mongoose.connect("mongodb+srv://admin-purna:mongo1234@cluster0.m3fh8.mongodb.net/todoListDb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});
//Create new mongo schema for main page
const itemSchema = new mongoose.Schema({
  task: String
});

//Create new mongo schema for other pages
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});
//Create model for main page
const Task = mongoose.model("Task", itemSchema);

//Create model for other page
const List = mongoose.model("List", listSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
//let day = date.longDate();


app.get("/", function (req, res){ 
  Task.find({}, function (err, list) {
    // if (list.length == 0) {
    //   Task.insertMany([task1, task2, task3]);
    //   res.redirect("/");
    // }
   /// else {
      res.render("list", { listTitle: "Today", listItem: list });
    //}
  });
});

app.get("/:paramName", function (req, res) {
  const urlName = _.capitalize(req.params.paramName);

  List.findOne({name:urlName}, function (err, result) {
    if (!err) {
      if (!result) {
        console.log("NOT Exists");
        const list = new List({
          name: urlName,
          items: []
        });
        list.save();
        res.redirect("/" + urlName);
      }
      else {
        res.render("list", { listTitle: result.name, listItem: result.items });
      }
    }

  })

})

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const titleName = req.body.submit;
  const task4 = new Task({ task: itemName });
  if (titleName == "Today") {
    task4.save();
    res.redirect("/");
  }
  else {
    List.findOne({ name: titleName }, function (err, result) {
      result.items.push(task4);
      result.save();
      res.redirect("/" + titleName);
    });
  }
});

app.post("/delete", function (req, res) {
  const remove = req.body.checkbox;
  const name = req.body.listTitle;
  console.log(name);
  if (name == "Today") {
    Task.findByIdAndRemove(remove, function (err) {
      if (!err)
        res.redirect("/");
      
    });
  }
  else {
    List.findOneAndUpdate({ name: name },
      { $pull: { items: { _id: remove } }
    }, function (err, result) {
      if(!err)
      res.redirect("/" + name);
    });
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log("app is running on port "+port);

