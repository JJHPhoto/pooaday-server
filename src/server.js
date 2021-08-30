import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

app.use(bodyParser.json());

//Testing BM info similar to "upvotes" in course I took.
app.get("/api/bm/:name", async (req, res) => {
  try {
    const bmName = req.params.name;

    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    const db = client.db("pooaday");

    const bmInfo = await db.collection("bm").findOne({ name: bmName });

    res.status(200).json(bmInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.post("/api/bm/:name/comfort", (req, res) => {
  const bmName = req.params.name;

  bmInfo[bmName].comfort += 1;
  res.status(200).send(`${bmName} comfort level is ${bmInfo}`);
});

//Initial server test
// app.get("/hello", (req, res) => res.send("Hello!"));

app.listen(8000, () => console.log("Listening on port 8000"));
