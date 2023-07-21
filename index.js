const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
require("dotenv").config();
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  {
    name: "ASM",
    phone: "1234567890",
  },
  {
    name: "luqman",
    phone: "9857647312",
  },
];

// app.get('/',function(req, res){

//     Contact.find({}, function(err, contacts){
//         if(err){
//             console.log("error in fetching contacts from db");
//             return;
//         }
//         return res.render('home',{
//             title: "Contact List",
//             contact_list: contacts
//         });
//     })
// });

app.get("/", function (req, res) {
  Contact.find({})
    .then((contacts) => {
      return res.render("home", {
        title: "Contact List",
        contact_list: contacts,
      });
    })
    .catch((err) => {
      console.log("error in fetching contacts from db", err);
      return;
    });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //     name:req.body.name,
  //     phone:req.body.phone,
  // })
  // contactList.push(req.body);
  // return res.redirect('/');

  // Contact.create({
  //     name:req.body.name,
  //     phone:req.body.phone
  // },function (err,newContact){
  //     if (err){console.log('Error in Creating New Contact!!')
  //     return;}
  //     console.log("********", newContact);
  //     return res.redirect('back');
  // });
  const newContact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  });
  newContact
    .save()
    .then(() => {
      console.log("Contact added successfully", newContact);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log(`Error in Creating New Contact: ${err}`);
    });
});

app.get("/update-contact/:id", function (req, res) {
  Contact.findById(req.params.id)
    .then((contact) => {
      console.log("contact", contact);
      return res.render("update", {
        title: "Update Contact",
        i: contact,
      });
    })
    .catch((err) => {
      console.log(`Error in fetching contact with id ${req.params.id}: ${err}`);
      return;
    });
});

app.post("/update-contact/:id", function (req, res) {
  Contact.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
  })
    .then(() => {
      console.log("Contact updated successfully");
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(`Error in updating contact: ${err}`);
      return res.redirect("back");
    });
});

app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;
  Contact.findByIdAndDelete(id)
    .then(() => {
      console.log("Contact deleted successfully");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log(`Error in deleting contact: ${err}`);
    });

  // Contact.findByIdAndDelete(id, function(err){
  //     if (err){
  //         console.log("Error in Deleting the File");
  //     }

  // return res.redirect('back');
  // });
  // console.log(req.query);
  // let phone = req.query.phone;

  // let contactindex = contactList.findIndex(contact => contact.phone == phone);

  // if (contactindex != -1){
  //     contactList.splice(contactindex, 1);
  // }

  // return res.redirect('back');
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error Found for the Page", err);
  }
  console.log("It is running Perfectly on Port!!!!", port);
});
