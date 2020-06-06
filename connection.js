const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connection_string = "mongodb://localhost:27017";

MongoClient.connect(
  connection_string,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) throw error;
    console.log("connection to mongo db");
    var db = client.db("blog");
    db.collection("posts")
      .find({})
      .toArray((err, result) => {
        if (err) throw error;
        console.log(result);
        client.close();
      });
  }
);