require("dotenv").config();
const express = require("express");

const cors = require("cors");

const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("services")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("project").collection("users").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("services")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/memberships/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("services")
      .deleteOne({ _id: ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users/:order", async (req, res) => {
  try {
    const order = req.params.order;
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "services",
            localField: "service_id",
            foreignField: "_id",
            as: "plans",
          },
        },
        { $sort: { name: order === "asc" ? 1 : -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  const { service_id } = req.body;
  console.log(`Received service_id:`, service_id);
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("users")
      .insertOne({ ...req.body, service_id: ObjectId(service_id) });
    await con.close();
    res.send(data);
  } catch (error) {
    console.error(`Error inserting user:`, error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`works on this ${port} port`);
});
