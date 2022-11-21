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
    const Commets = client.db(process.env.DB_NAME).collection("Comments");
    const Users = client.db(process.env.DB_NAME).collection("Users");
    const Todos = client.db(process.env.DB_NAME).collection("Todos");
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
      res.status(200).send({ blog: "added" });
    });
    app.get("/my-blogs", async (req, res) => {
      const email = req.query.email;
      console.log("email", email);
      const query = { userEmail: email };
      const result = await Blog.find(query).toArray();
      res.send(result);
    });

    app.get("/users-blog/:id", async (req, res) => {
      id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Blog.findOne(query);
      res.send(result);
    });
    app.post("/users-comments", async (req, res) => {
      const comment = req.body;
      const result = await UsersCommets.insertOne(Userst);
      console.log(comment);
      res.send(result);
    });
    app.get("/users-comments", async (req, res) => {
      const id = req.query.id;
      console.log("id", id);
      const query = { postId: id };
      const result = await Commets.find(query).toArray();
      res.send(result);
    });
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await Users.insertOne(user);
      res.send(result);
      console.log(user);
    });
    app.get("/user", async (req, res) => {
      const query = {};
      const result = await Users.find(query).toArray();
      res.send(result);
    });

    app.get("/todos", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await Todos.find(query).toArray();
      res.send(result);
    });
    app.post("/todos", async (req, res) => {
      const todo = req.body;
      console.log(todo);
      const result = await Todos.insertOne(todo);
      res.send("result");
    });
    app.patch("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const doc = req.body;
      const query = { _id: ObjectId(id) };
      const option = {};
      const updatedDoc = {
        $set: doc,
      };
      const result = await Todos.updateOne(query, updatedDoc, option);
    });

    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Todos.deleteOne(query);
      res.send(result);
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
