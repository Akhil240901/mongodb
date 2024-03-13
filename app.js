const mongoose=require('mongoose');
const validator=require('validator');
//connection creation and creating new database
mongoose.connect("mongodb://localhost:27017/akhil_store")
.then(()=>console.log("connection is successsful...")
).catch((err)=>console.log(err));


//schema
//mongoose schema define the structure of documentt,
//default value,validation,etc...
const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        minlength:2,
        maxlength:30,
    },
    ctype:String,
    videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Enter valid number count of videos");
            }
        }
    },
    author:String,
    active:Boolean,
    gmail:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Type proper structure of gmail")
            }
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})


// Amongoos model is a wrapper on the mongoose Schema
//mongoose model provides an interface to the database for creating,querying ,updating,deleting records,etc.

//collection creation(class based ,first capital letter)
const Playlist=new mongoose.model("Playlist",playlistSchema);

//create document or insert
const firstDocument= async()=>{
    try{
        
        const javaPlaylist=new Playlist({
            name:"sql",
            ctype:"database",
            videos:4,
            author:"Akhil Bisen",
            gmail:"akhilbi@123.com",
            active:true
        })

        const result=await Playlist.insertMany([javaPlaylist]);
        console.log(result);
    }catch(err){
       console.log(err);
    }
}

firstDocument();

const getDocument=async ()=>{
    try{
    const result=await Playlist.find().limit().select({name:1}).sort({name:1});
    console.log(result);
    }catch(err){
        console.log(err);
    }
}
//getDocument();


//update the document
const updateDocument=async (_id)=>{
    try{
        const result=await Playlist.findByIdAndUpdate({_id},{
            $set:{
                name:"REACT"
            }
        })

        console.log(result)
    }catch(err){
        console.log(err);
    }
}
//updateDocument("65e9b377804952c92603ece4");

//delete thedocument

const deleteDocument=async (_id)=>{
    try{
        const result=await Playlist.findByIdAndDelete({_id});

        console.log(result);
    }catch(err){
        console.log(err)
    }
}
//deleteDocument("65e9b377804952c92603ece4");