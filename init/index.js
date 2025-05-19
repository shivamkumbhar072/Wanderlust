const mongoose = require('mongoose');
const Data = require('./data.js');
const Listing = require('../models/listing.js');

main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/wanderlust');
}

async function seedDB() {
  await Listing.deleteMany({});
  Data.data = Data.data.map((obj)=>({...obj,owner:'68204d9249e38e43f236bbce'}));
  await Listing.insertMany(Data.data);
  console.log("Database seeded successfully!");
}

seedDB().then(() => {
  mongoose.connection.close();
}).catch(err => console.log(err));  