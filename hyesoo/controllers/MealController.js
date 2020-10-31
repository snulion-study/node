const mongoose = require('mongoose');
var meal = require("../models/Meal");
var Meal = meal.Meal;
var Brand = meal.Brand;
var Tag = meal.Tag;

var mealController = {};

mealController.list = function(req,res) {
    Meal.find({}).populate('brand').exec(function(err,meals){
        if(err){
            console.log(`Error: ${err}`)
        } else {
            Brand.find({}).exec(function(err,brands){
                if(err){
                    console.log(err);
                } else{
                    res.render("../views/meal/index", {meals: meals, brands:brands});
                }
            })
        }
    });
};

mealController.show = function(req,res) {
    Meal.findOne({_id: req.params.id}).populate('brand').exec(function(err,meal){
        if(err){
            console.log(`Error: ${err}`);
        } else {
            res.render("../views/meal/show", {meal: meal});
            console.log('The brand of this meal is %s', meal.brand.name);
        }
    })
}

mealController.brand = function(req,res) {
    Meal.find({brand: req.params.id}).populate('brand').exec(function(err,meals){
        if(err){
            console.log(`Error: ${err}`);
        } else {
            res.render("../views/meal/brand", {meals: meals});
        }
    })
}

mealController.new = function(req,res) {
    Brand.find({}).exec(function(err,brands){
        if(err){
            console.log(err);
        } else{
            res.render("../views/meal/new", {brands:brands});
        }
    })
}

mealController.save = function(req,res) {
    Brand.findOne({name: req.body.brand}).exec(function(err,brand){
        if(err){
            console.log(`Brand findOne error`);
            return;
        } else{
            //새로운 브랜드의 경우
            if(brand == null){
                Brand.create({
                    _id: new mongoose.Types.ObjectId(), 
                    name: req.body.brand
                }).then(newbrand => {
                    console.log("created new brand");
                    Meal.create({
                        title: req.body.title,
                        brand: newbrand._id,
                        description: req.body.description
                    }).then(newmeal => {
                        console.log("created new meal");
                        res.redirect(`/meal/show/${newmeal._id}`);
                        return Brand.findByIdAndUpdate(
                            newbrand._id,
                            {$push: {products: newmeal._id}},
                            { new: true, useFindAndModify: false}
                        )
                    })
                })
            } else{
                Meal.create({
                    title: req.body.title,
                    brand: brand._id,
                    description: req.body.description
                }).then(newmeal => {
                    console.log("created new meal");
                    res.redirect(`/meal/show/${newmeal._id}`);
                    return Brand.findByIdAndUpdate(
                        brand._id,
                        {$push: {products: newmeal._id}},
                        { new: true, useFindAndModify: false}
                    )
                })
            }
        }
    })
}

mealController.edit = function(req, res) {
    Meal.findOne({_id: req.params.id}).exec(function(err, meal){
        if(err) {
            console.log(`Error: ${err}`);
        } else {
            res.render("../views/meal/edit",{meal: meal});
        }
    })
}

mealController.update = function(req,res) {
    Meal.findByIdAndUpdate(
        req.params.id, { $set:
            {
                title: req.body.title,
                description: req.body.description
            }
        },
        {new: true}, 
        function(err, meal){
            if(err) {
                console.log(err);
                res.render("../views/meal/edit", {meal: req.body});
            } else {
                res.redirect(`/meal/show/${meal._id}`);
            }
        }
    );
}

mealController.delete = function(req, res) {
    Meal.findOne(
        {_id:req.params.id}, 
        function(err, meal) {
            Brand.findOneAndUpdate(
                { _id: meal.brand },
                { $pullAll: { products: [meal._id]}},
                { new: true},
                function(err, data) {}
            )
    }).then((value)=>{
        Meal.deleteOne(value, function(err) {
            if(err){
                console.log(err);
            } else {
                console.log("Meal deleted!!");
                res.redirect("/meal");
            }
        })
    })
}

module.exports = mealController;