const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://a-10-project:oWQInDQMiOUfPOfv@cluster0.1r2gfjh.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("a-10-project");
    const coursesCollection = db.collection("courses");

    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`Online learning server is running on ${port}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
