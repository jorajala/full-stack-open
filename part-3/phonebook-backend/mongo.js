const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// using a local container so no need for authentication
const url = `mongodb://127.0.0.1:27017/phonebook`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

let args = process.argv;

if (args.length < 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (args.length === 4) {
  let person = new Person({
    name: args[2],
    number: args[3],
  });
  person.save().then(() => {
    console.log("added", person.name, person.number, "to phonebook");
    mongoose.connection.close();
  });
}
