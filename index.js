const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.pwgovse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
const dbRun = async () => {
  try {
    const Home = client.db(process.env.DB_NAME).collection("Home");
    const Blog = client.db(process.env.DB_NAME).collection("Blog");
    app.get("/homedata", async (req, res) => {
      const query = {};
      const result = await Home.find(query).limit(5).toArray();
      res.send(result);
    });
    app.get("/hombeblog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Home.findOne(query);
      res.send(result);
      console.log(id);
      console.log("object");
    });

    app.get("/allblogs", async (req, res) => {
      const query = {};
      const result = await Home.find(query).toArray();
      res.send(result);
    });
    app.post("/users-bolg", async (req, res) => {
      const blog = req.body;
      const blogs = await Blog.insertOne(blog);
      console.log(blog);
      res.send(blogs);
    });
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 5000;
app.get("/", async (req, res) => {
  res.send("server is running");
});

dbRun().catch((err) => console.log(err));
app.listen(port, () => {
  console.log("running server on port");
});
//end
