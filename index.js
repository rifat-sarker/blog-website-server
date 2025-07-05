const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

// Middleware
app.use(
  cors({
    origin: [
      "https://blog-platform-seven-zeta.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l80xyen.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Collections
let pollCollection;

async function run() {
  try {
    const blogCollection = client.db("blogDB").collection("blog");
    const wishlistCollection = client.db("blogDB").collection("wishlist");
    pollCollection = client.db("blogDB").collection("polls");

    // Seed initial poll data if not exists
    const existingPolls = await pollCollection.countDocuments();
    if (existingPolls === 0) {
      const pollsData = [
        {
          question: "What type of content do you prefer reading on our blog?",
          options: [
            "Technical tutorials",
            "How-to guides",
            "Industry news and updates",
            "Opinion pieces and editorials",
          ],
          votes: [0, 0, 0, 0],
        },
        {
          question: "How often do you visit our blog?",
          options: ["Daily", "Weekly", "Monthly", "Rarely or never"],
          votes: [0, 0, 0, 0],
        },
        {
          question:
            "Which social media platform do you use the most for discovering blog content?",
          options: ["Facebook", "Twitter", "LinkedIn", "Instagram"],
          votes: [0, 0, 0, 0],
        },
        {
          question: "What motivates you to engage with a blog post?",
          options: [
            "Interesting topic",
            "Engaging writing style",
            "Useful information",
            "Visual content (e.g., images, videos)",
          ],
          votes: [0, 0, 0, 0],
        },
      ];

      await pollCollection.insertMany(pollsData);
      console.log("Initial poll data seeded");
    }

    // Blog APIs
    app.get("/blog", async (req, res) => {
      const blogs = await blogCollection.find().toArray();
      res.send(blogs);
    });

    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const blog = await blogCollection.findOne({ _id: new ObjectId(id) });
      res.send(blog);
    });

    app.post("/blog", async (req, res) => {
      const newBlog = req.body;
      const result = await blogCollection.insertOne(newBlog);
      res.send(result);
    });

    // Wishlist APIs
    app.post("/wishlist", async (req, res) => {
      const wishlistItem = req.body;
      const result = await wishlistCollection.insertOne(wishlistItem);
      res.send(result);
    });

    app.get("/wishlist", async (req, res) => {
      const query = req.query.email ? { email: req.query.email } : {};
      const wishlistItems = await wishlistCollection.find(query).toArray();
      res.send(wishlistItems);
    });

    app.get("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const item = await wishlistCollection.findOne({ _id: new ObjectId(id) });
      res.send(item);
    });

    app.delete("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const result = await wishlistCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Poll APIs
    app.get("/api/poll", async (req, res) => {
      try {
        const polls = await pollCollection.find().toArray();
        res.json(polls);
      } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.post("/api/vote", async (req, res) => {
      try {
        const { questionId, optionIndex } = req.body;

        const poll = await pollCollection.findOne({
          _id: new ObjectId(questionId),
        });
        if (!poll) {
          return res.status(404).json({ error: "Poll not found" });
        }

        if (optionIndex < 0 || optionIndex >= poll.options.length) {
          return res.status(400).json({ error: "Invalid option index" });
        }

        await pollCollection.updateOne(
          { _id: new ObjectId(questionId) },
          { $inc: { [`votes.${optionIndex}`]: 1 } }
        );

        res.sendStatus(200);
      } catch (error) {
        console.error("Error voting:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
   
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Blog website server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
