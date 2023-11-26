const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connect to Databse'))
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
const userModel = mongoose.model('user', userSchema);

//api
app.get('/', (req, res) => {
  res.send('Server is running');
});

//sign up
app.post('/signup', async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: 'Email is already register', alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: 'Successfully sign up', alert: true });
    }
  });
});

//api login
app.post('/login', (req, res) => {
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
        message: 'Login successfully',
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: 'Email is not available, please sign up',
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
    ref: 'writer',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'publisher',
  },
});

//product Model
const productModel = mongoose.model('product', schemaProduct);

// Writer Schema
const schemaWriter = mongoose.Schema({
  name: { type: String, unique: true },
});
// Writer Model
const writerModel = mongoose.model('writer', schemaWriter);

//save product in data
app.post('/uploadProduct', async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const book = await data.save();
  res.send({ book, message: 'Upload successfully' });
});

// Get All Products
app.get('/product', async (req, res) => {
  const data = await productModel
    .find({})
    .populate('writer')
    .populate('category')
    .populate('publisher');
  res.send(JSON.stringify(data));
});

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
  const book = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
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
app.post('/writer', async (req, res) => {
  // console.log(req.body)
  const data = await writerModel(req.body);
  const datasave = await data.save();
  res.send({ message: 'Writer successfully created' });
});

// Get All Writers
app.get('/writer', async (req, res) => {
  const data = await writerModel.find({});
  res.send(JSON.stringify(data));
});

// Get Author by Id
app.get('/writer/:id', async (req, res) => {
  const writer = await writerModel.findById(req.params.id);
  if (!writer) {
    return res.status(404).json({ message: 'Author not found' });
  }
  res.send(writer);
});

// Update Writer
app.put('/writer/:id', async (req, res) => {
  const writer = await writerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!writer) {
    return res.status(404).json({ message: 'Author not found' });
  }
  res.json({ writer, message: 'Author updated successfully' });
});

// Delete Writer
app.delete('/writer/:id', async (req, res) => {
  await writerModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Author deleted successfully' });
});

// Category Schema
const schemaCategory = mongoose.Schema({
  name: { type: String, unique: true },
});

// Category Model
const categoryModel = mongoose.model('category', schemaCategory);

// Create Category
app.post('/category', async (req, res) => {
  // console.log(req.body)
  const data = await categoryModel(req.body);
  const datasave = await data.save();
  res.send({ message: 'Category successfully created' });
});

// Get All category
app.get('/category', async (req, res) => {
  const data = await categoryModel.find({});
  res.send(JSON.stringify(data));
});

// Get Category by Id
app.get('/category/:id', async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.send(category);
});

// Update category
app.put('/category/:id', async (req, res) => {
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json({ category, message: 'Category updated successfully' });
});

// Delete Book
app.delete('/category/:id', async (req, res) => {
  await categoryModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted successfully' });
});

// Cities Schema
const schemaCity = mongoose.Schema({
  name: { type: String, unique: true },
});

// Cities Model
const cityModel = mongoose.model('city', schemaCity);

// Create Cities
app.post('/city', async (req, res) => {
  // console.log(req.body)
  const data = await cityModel(req.body);
  const datasave = await data.save();
  res.send({ message: 'City successfully created' });
});

// Get All city
app.get('/city', async (req, res) => {
  const data = await cityModel.find({});
  res.send(JSON.stringify(data));
});

// Get Cities by Id
app.get('/city/:id', async (req, res) => {
  const city = await cityModel.findById(req.params.id);
  if (!city) {
    return res.status(404).json({ message: 'City not found' });
  }
  res.send(city);
});

// Update city
app.put('/city/:id', async (req, res) => {
  const city = await cityModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!city) {
    return res.status(404).json({ message: 'City not found' });
  }
  res.json({ city, message: 'City updated successfully' });
});

// Delete City
app.delete('/city/:id', async (req, res) => {
  await cityModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'City deleted successfully' });
});

// Cities Schema
const publisherCity = mongoose.Schema({
  name: { type: String, unique: true },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city',
  },
});

// Publisher Model
const publisherModel = mongoose.model('publisher', publisherCity);

// Create Publisher
app.post('/publisher', async (req, res) => {
  // console.log(req.body)
  const data = await publisherModel(req.body);
  const publisher = await data.save();
  res.send({ publisher, message: 'Publisher successfully created' });
});

// Get All Publishers
app.get('/publisher', async (req, res) => {
  const data = await publisherModel.find({}).populate('city');
  res.send(JSON.stringify(data));
});

// Get Publisher by Id
app.get('/publisher/:id', async (req, res) => {
  const publisher = await publisherModel.findById(req.params.id);
  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' });
  }
  res.send(publisher);
});

// Update publisher
app.put('/publisher/:id', async (req, res) => {
  const publisher = await publisherModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' });
  }
  res.json({ publisher, message: 'Publisher updated successfully' });
});

// Delete Publisher
app.delete('/publisher/:id', async (req, res) => {
  await publisherModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Publisher deleted successfully' });
});

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
app.listen(PORT, () => console.log('server is running at port : ' + PORT));
