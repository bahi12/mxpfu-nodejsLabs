const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Dave",
    lastName: "smith",
    email: "davesmith@gamil.com",
    DOB: "23-05-1956",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({users}, null,2));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});

// GET by specific lastName request: Retrieve users with last name
router.get("/lastName/:lastName", (req, res) => {
  const lastName = req.params.lastName;
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  res.send(filtered_lastname);
});

// GET by specific DOB request: Retrieve users with date of birth
router.get("/DOB/:DOB", (req, res) => {
  const DOB = req.params.DOB;
  let filtered_DOB = users.filter((user) => user.DOB === DOB);
  res.send(filtered_DOB);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  users.push({
    "firstName": req.query.firstNAme,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  res.send("The user" + " " + req.query.firstName + " Has been added!");
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let DOB = req.query.DOB;
    firstName = req.query.firstName;
    lastName = req.query.lastName;
    //if the DOB has changed
    if(DOB){
      filtered_user.DOB = DOB;
    }
    //if the firstName changed
    if(firstName){
      filtered_user.firstName = firstName;
    }
    //if the lastName changed
    if(lastName){
      filtered_user.lastName = lastName;
    }
    users = users.filter((user) => user.email !=email);
    users.push(filtered_user);
    res.send('User with the email ${email} updated.')
  }
  
  else {
    res.send("Unable to find user!")
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`);
});

module.exports = router;
