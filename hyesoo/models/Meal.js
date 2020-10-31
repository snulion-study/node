const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({ name: String });

const brandSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    //Meal의 리스트를 brand의 products로 가진다
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}]
});

const imageSchema = new mongoose.Schema({
    type: String,
    data: Buffer
})

const mealSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Brand'
    },
    description: {
        type: String,
    },
    //tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
   //image: imageSchema
})

const Brand = mongoose.model('Brand',brandSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Meal = mongoose.model('Meal', mealSchema);
module.exports = {Brand, Tag, Meal};