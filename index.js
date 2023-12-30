const express = require('express');
const app = express();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const port = process.env.PORT || 5000;

//http://localhost:5173
// https://glittery-crepe-98ba25.netlify.app/
//middleware
app.use(cors({
  origin: ['https://glittery-crepe-98ba25.netlify.app'],
  credentials: true
}));
app.use(express.json());
// app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l80xyen.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// my middlware
// const logger = async (req, res, next) => {
//   console.log('called', req.host, req.originalUrl);
//   next();
// }


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const blogCollection = client.db('blogDB').collection('blog')
    const wishlistCollection = client.db('blogDB').collection('wishlist')
    const commentCollection = client.db('blogDB').collection('comment')

    /// verify token
    // const verifyToken = async (req, res, next) => {
    //   const token = req.cookies.token;
    //   if (!token) {
    //     res.status(401).send({
    //       message: 'unauthorized'
    //     })
    //   }
    //   jwt.verify(token, process.env.DB_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //       res.status(401).send({
    //         message: 'notauthorized'
    //       })
    //     }
    //     req.user = decoded;
    //     console.log(decoded);
    //     next();
    //   })
    // }

    // token related apies
    // app.post('/jwt', async (req, res) => {
    //   const user = req.body;
    //   // console.log(user);
    //   const token = jwt.sign(user, process.env.DB_TOKEN_SECRET, {
    //     expiresIn: '1hr'
    //   });
    //   // console.log(token);
    //   res
    //     .cookie('token', token, {
    //       httpOnly: true,
    //       secure: false
    //     })
    //     .send({
    //       sucess: true
    //     })
    // })


    app.get('/blog', async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await blogCollection.findOne(query)
      res.send(result)
    })

    app.post('/blog', async (req, res) => {
      const newBlog = req.body;
      // console.log(newBlog);
      const result = await blogCollection.insertOne(newBlog);
      res.send(result)
    })


    //wishlist
    app.post('/wishlist', async (req, res) => {
      const user = req.body;
      const result = await wishlistCollection.insertOne(user)
      res.send(result)
    })

    app.get('/wishlist', async (req, res) => {
     
      let query = {}
      if(req.query.email){
        query.email = req.query.email;
      }
      // console.log(req.user.email);
      const cursor = wishlistCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })


    app.get('/wishlist/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await wishlistCollection.findOne(query);
      res.send(result)
    })

    

    app.delete('/wishlist/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await wishlistCollection.deleteOne(query)
      res.send(result)
    })





    // user related apies
    // app.get('/user', async(req,res)=>{
    //   const cursor = userCollection.find();
    //   const user = await cursor.toArray();
    //   res.send(user)
    // })

    // app.post('/user', async(req,res)=>{
    //   const user = req.body;
    //   console.log(user);
    //   const result = await userCollection.insertOne(user)
    //   res.send(result)

    // })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({
      ping: 1
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('blog website server running')
})

app.listen(port, () => {
  console.log(`blog website server running  on port ${port}`)
})