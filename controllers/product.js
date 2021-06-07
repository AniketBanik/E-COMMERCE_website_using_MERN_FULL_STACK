const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');

const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");



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

        let product = new Product(fields)


        if(files.photo){
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