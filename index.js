let express = require('express')


const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

// here is middlewares


// id :     mahedinir34678

// password : zCEzEsmi8ifrx4Vh
app.use(cors());

app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mahedinir34678:mahedi@cluster0.iqgllty.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        // const database = client.db("userDB");

        // const userCollection = database.collection("users");

        const Usercollection = client.db("userDB").collection("user")

        app.get('/users', async (req, res) => {

            const coursor = Usercollection.find()

            const result = await coursor.toArray()

            res.send(result)
        })



        app.post('/users', async (req, res) => {
            const user = (req.body);
            console.log("new user", user);
            // const result = await userCollection.insertOne(user);
            // res.send(result)

            const result = await Usercollection.insertOne(user)

            res.send(result)


        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send("server is  running yap ")
})


app.listen(port, () => {
    console.log(`server is running port on,${port}`);
})