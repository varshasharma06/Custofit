// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//firebase admin setup


let serviceAccount = require("./ecommerce-project-2e19d-firebase-adminsdk-6va3i-d7de0a55ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

//aws config

// aws config
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const { red } = require('color-name');

dotenv.config();

// aws parameters
const region = "ap-south-1";
const bucketName = "ecom-webkit";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region, 
    accessKeyId, 
    secretAccessKey
})

// init s3
const s3 = new aws.S3();

// generate image upload link
async function generateUrl(){
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000);

    const imageName = `${id}${date.getTime()}.jpg`;

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, //300 ms
        ContentType: 'image/jpeg'
    })
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}
//declare static path

let staticPath = path.join(__dirname, "");

//initializing express.js

const app = express();


//middleware
app.use(express.static(staticPath));
app.use(express.json());

app.listen(3000, ()=> {
    console.log('listening on port 3000.....');
})

//routes
//home route

app.get("/",(req,res)=> {
    res.sendFile(path.join(staticPath ,'index.html'));
})

//signup route

app.get('/signup',(req, res)=> {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    // form validations
    if(name.length < 3){
        return res.json({'alert': 'name must be 3 letters long'});
    } else if(!email.length){
        return res.json({'alert': 'enter your email'});
    } else if(password.length < 8){
        return res.json({'alert': 'password should be 8 letters long'});
    } else if(!number.length){
        return res.json({'alert': 'enter your phone number'});
    } else if(!Number(number) || number.length < 10){
        return res.json({'alert': 'invalid number, please enter valid one'});
    } else if(!tac){
        return res.json({'alert': 'you must agree to our terms and conditions'});
    } 

    //store user in database
    db.collection('users').doc(email).get()
    .then(user => {
        if (user.exists) {
            return res.json({'alert': 'email already exists'})
        }else{
         //encrypt the password before storing
         bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt , (err,hash)=>{
                req.body.password = hash;
                db.collection('users').doc(email).set(req.body)
                .then(data => {
                    res.json({
                        name: req.body.name,
                        email: req.body.name,
                        seller: req.body.name,
                    })
                })
            })
         })   
        }
    })
})

// login route

app.get('/login', (req,res)=>{
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req,res)=>{
    let {email , password} = req.body;
    if(!email.length || !password.length){
        return res.json({'alert': 'Enter Email or Password'})
    }
    db.collection('users').doc(email).get()
    .then(user => {// email not exists
        if(!user.exists){
            return res.json({'alert': 'logged in email does not exists'})

        }else{
            bcrypt.compare(password, user.data().password,(err, result) =>{
                if (result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller : data.seller
                    })
                }else{
                    return res.json({'alert':'password is incorrect'});
                }
            })
        }
    })
})

//add product

app.get('/add-product',(req , res)=>{
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

app.post('/add-product',(req ,res)=>{
    let {name, shortDes, des, images, sizes, actualPrice, discount, sellPrice,
    stock, tags, tac, email} = req.body;

    // //validation 
    if(!name.length){
        return res.json({'alert':'enter product name'});
    } else if(shortDes.length > 100 || shortDes.length < 10){
        return res.json({'alert':'short description must be between 10 to 100 letters long'});
    } else if(!des.length){
        return res.json({'alert':'enter detail description about the product'});
    } else if(!images.length){ // image link array
        return res.json({'alert':'upload atleast one product image'})
    } else if(!sizes.length){ // size array
        return res.json({'alert':'select at least one size'});
    } else if(!actualPrice.length || !discount.length || !sellPrice.length){
        return res.json({'alert':'you must add pricings'});
    } else if(stock < 20){
        return res.json({'alert':'you should have at least 20 items in stock'});
    } else if(!tags.length){
        return res.json({'alert':'enter few tags to help ranking your product in search'});
    } else if(!tac){
        return res.json({'alert':'you must agree to our terms and conditions'});
    } 

    //add product
    let docName = `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
    db.collection('products').doc(docName).set(req.body)
    .then(data =>{
         res.json({'product': name});
    })
    .catch(err =>{
        return res.json({'alert': 'some error occurred. Try again'});
    })
})

// get the upload link
app.get('/s3url', (req, res) => {
    generateUrl().then(url => res.json(url));
})

//seller route
app.get('/seller',(req,res)=>{
    res.sendFile(path.join(staticPath,"seller.html"));
})

app.post('/seller',(req,res) =>{
    let {name , about , address , number, tac , legit, email } = req.body;
    if(!name.length || !address.length || number.length < 10 || !about.length || !Number(number)){
      return res.json({'alert' : 'some information(s) is/are invalid'})
    }
     else if(!tac || !legit){
      return res.json({'alert': 'you must agree to our terms and conditions'})
    }else{
        //update users seller status here.
        db.collection('seller').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data =>{
                res.json(true);
            })
        })

    }
})

//get products
app.post('/get-products',(req, res)=>{
    let {email} = req.body;
    let docRef = db.collection('products').where('email','==', email);

    docRef.get()
    .then(products =>{
        if (products.empty) {
            return res.json('no-products');
        }
        let productArr = [];
        products.forEach(item => {
            let data = item.data();
            data.id = item.id;
            productArr.push(data);
        })
        res.json(productArr)
    })
})
  


//404 route

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404')
    
    
})






