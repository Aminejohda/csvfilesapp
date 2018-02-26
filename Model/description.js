const mongoose = require('mongoose');
let DescriptionSchema = mongoose.Schema({
	Description:{
		type:String,
		required: true
	},
	Namefile:{
		type:String,
		required: true
	}
});
const Description = module.exports =  mongoose.model('Description',DescriptionSchema)