const formidable = require("formidable");
const _= require("lodash");
const fs = require('fs');
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product)=>{

        if(err || !product){
            return res.status(400).json({
               error: "Product not found"
            });
        }

        req.product = product;
        next();
    });
};

exports.read=(req,res)=> {

    req.product.photo = undefined;
    return res.json(req.product);
};

exports.create = (req , res) => {
    //handling front data and image upload
    let form = new formidable.IncomingForm()
    form.keepExtensions =true

    form.parse(req, (err, fields, files) => {
        if(err) {

            return res.status(400).json({
                error: 'Image is not possible to upload'
            });
        }

        //check for all fields exist
        const{name,description,price,category,quantity,shipping} = fields

        if(!name|| !description || !price || !category || !quantity || !shipping){
          
            return res.status(400).json({
                error: "All fields are require"
            });

        }

        let product = new Product(fields);

        // 1 kb = 1000 and 1 mb= 1000000


        if(files.photo){
            //console.log("FILES PHOTO: ", files.photo);
          if(files.photo.size>1000000){
           
            return res.status(400).json({
                error: "Image should be less than 1MB in size"
            });

          }



            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

      product.save((err, result) => {
          if(err){
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }

          res.json(result);
      });  


    });

};

exports.remove = (req,res) => {
    let product = req.product;
    product.remove((err/*,deletedProduct*/) => {
       
        if(err){

            return res.status(400).json({
             
                error: errorHandler(err)

            });
          
        }   
          
        res.json({
        //deletedProduct, //no need of this coz not need of deleted info
        "message": "Product deleted successfully!"
    });

});

};
//update product
exports.cupdate = (req , res) => {
    //handling front data and image upload
    let form = new formidable.IncomingForm()
    form.keepExtensions =true

    form.parse(req, (err, fields, files) => {
        if(err) {

            return res.status(400).json({
                error: 'Image is not possible to upload'
            });
        }

        //check for all fields exist
        const{name,description,price,category,quantity,shipping} = fields

        if(!name|| !description || !price || !category || !quantity || !shipping){
          
            return res.status(400).json({
                error: "All fields are require"
            });

        }

        let product = req.product;
        product = _.extend(product, fields); //extend method from Lodash for update

        // 1 kb = 1000 and 1 mb= 1000000


        if(files.photo){
            //console.log("FILES PHOTO: ", files.photo);
          if(files.photo.size>1000000){
           
            return res.status(400).json({
                error: "Image should be less than 1MB in size"
            });

          }



            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

      product.save((err, result) => {
          if(err){
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }

          res.json(result);
      });  


    });

};

/**
 * return products to front end users based on 2 matters=> 
 * sell/ arrival
 * In postman,
 * by sell= /products?sortBy=sold&order=desc&limit=5
 * by arrival= /products?sortBy=createdAt&order=desc&limit=5
 * if no params are sent, then all products are returned.
 */

exports.list=(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? req.query.limit : 5
    
    Product.find()
    .select("-photo")
    .populate("category") //category name, created at , updated at will be visible
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Products can not be found"
            });
        }
        res.send(products);
    });


};