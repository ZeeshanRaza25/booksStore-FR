const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  hasDiscount: Boolean,
  discount: String,
  isOld: Boolean,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "writer"
  }
});

//product Model
const productModel = mongoose.model("product", schemaProduct)

const schemaWriter = mongoose.Schema({
  name: String,
});

const writerModel = mongoose.model("writer", schemaWriter)



//save product in data 
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const book = await data.save();
  res.send({ book, message: "Upload successfully" });
})

// Get All Products
app.get("/product", async (req, res) => {
  const data = await productModel.find({}).populate("writer")
  res.send(JSON.stringify(data))
})

// Get Product by Id
app.get('/product/:id', async (req, res) => {
  const book = await productModel.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.send(book);
});

// Update Book
app.put('/product/:id', async (req, res) => {
  const book = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json({ book, message: 'Book updated successfully' });
});

// Delete Book
app.delete('/product/:id', async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted successfully' });
});


// Create Writer
app.post("/writer", async (req, res) => {
  // console.log(req.body)
  const data = await writerModel(req.body)
  const datasave = await data.save()
  res.send({ message: "Writer successfully created" })
})

// Get All Writers
app.get("/writer", async (req, res) => {
  const data = await writerModel.find({})
  res.send(JSON.stringify(data))
})


/*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY)


// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

// app.post("/create-checkout-session",async(req,res)=>{

//      try{
//       const params = {
//           submit_type : 'pay',
//           mode : "payment",
//           payment_method_types : ['card'],
//           billing_address_collection : "auto",
//           shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

//           line_items : req.body.map((item)=>{
//             return{
//               price_data : {
//                 currency : "inr",
//                 product_data : {
//                   name : item.name,
//                   // images : [item.image]
//                 },
//                 unit_amount : item.price * 100,
//               },
//               adjustable_quantity : {
//                 enabled : true,
//                 minimum : 1,
//               },
//               quantity : item.qty
//             }
//           }),

//           success_url : `${process.env.FRONTEND_URL}/success`,
//           cancel_url : `${process.env.FRONTEND_URL}/cancel`,

//       }


//       const session = await stripe.checkout.sessions.create(params)
//       // console.log(session)
//       res.status(200).json(session.id)
//      }
//      catch (err){
//         res.status(err.statusCode || 500).json(err.message)
//      }

// })


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));