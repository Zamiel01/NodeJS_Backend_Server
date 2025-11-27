import  mongoose, {Schema} from 'mongoose';
const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    }
}, 
    {
        timestamps: true //this will automatically add createdAt and updatedAt fields to the schema
    }
);

export const Post = mongoose.model('Post', postSchema); //Post is the name of the collection in the database so mongoose will create a collection named 'posts' in the database 