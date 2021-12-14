const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const mongoose = require('mongoose');

//Connexion à la base de données
mongoose.connect('mongodb+srv://panzer:mpe3zQ2UWrGfRZD@nicoserver.10il5.mongodb.net/NicoServer?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Contrôle d'accès
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use(express.json());


app.use(bodyParser.json());

//Créer un article 
  app.post('/api/products', (req, res, next) =>{
    delete req.body.__v;
    const product = new Product({
    ...req.body
    });
	
    product.save()
    .then(product => res.status(201).json({ product}))
    .catch(error => res.status(400).json({ error }));
    
  });


  //Modifier un article
  app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, {
    ...req.body})
  .then(()=> res.status(200).json({ message: 'Objet modified !'}))
  .catch(error => res.status(404).json({ error }));

  });


  //Supprimmer un article
  app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Deleted !'}))
  .catch(error => res.status(404).json({ error }));

  });
  

  //Consulter un article
  app.get('/api/products/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(404).json({ error }));
    
  });

  //Consulter tous les articles
  app.get('/api/products', (req, res, next) =>{
    
    Product.find()
    .then(products => res.status(200).json( { products } ))
    .catch(error => res.status(400).json({ error }));
    
  });
 
 
module.exports = app;



