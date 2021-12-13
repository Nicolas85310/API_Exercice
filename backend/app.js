const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://panzer:mpe3zQ2UWrGfRZD@nicoserver.10il5.mongodb.net/NicoServer?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
//règles de sécurité
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use(express.json());


app.use(bodyParser.json());
 
  app.post('/api/products', (req, res, next) =>{
    delete req.body.__v;
    const product = new Product({
 
        name: 'Truc et Machin',
        description: 'poissons voraces',
        price: '12',
        inStock: 'true'
 
    });
    product.save()
    .then(product => res.status(201).json({ product}))
    .catch(error => res.status(400).json({ error }));
    
  });
 
  app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, {
    name: 'Mon deuxieme produit',
    description: 'produit petit',
    price: '10',
    inStock: 'True', _id: req.params.id })
  .then(()=> res.status(200).json({ message: 'Objet modified !'}))
  .catch(error => res.status(404).json({ error }));
  
  });
 
  app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Deleted !'}))
  .catch(error => res.status(404).json({ error }));
  
  });
  
  app.get('/api/products/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(404).json({ error }));
    
  });
 
  app.get('/api/products', (req, res, next) =>{
    
    Product.find()
    .then(products => res.status(200).json( { products } ))
    .catch(error => res.status(400).json({ error }));
    
  });
 
 
module.exports = app;


