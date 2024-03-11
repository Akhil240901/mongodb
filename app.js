const mongoose=require('mongoose');

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
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
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
        const reactPlaylist=new Playlist({
            name:"react js",
            ctype:"front End",
            videos:50,
            author:"Akhil Bisen",
            active:true
        })

        const mongoPlaylist=new Playlist({
            name:"mongodb",
            ctype:"database",
            videos:56,
            author:"Akhil Bisen",
            active:true
        })

        const nodePlaylist=new Playlist({
            name:"node js",
            ctype:"back End",
            videos:485,
            author:"Akhil Bisen",
            active:true
        })
        const mongoosePlaylist=new Playlist({
            name:"mongoose",
            ctype:"database",
            videos:50,
            author:"Akhil Bisen",
            active:true
        })
        const expressPlaylist=new Playlist({
            name:"express js",
            ctype:"back end",
            videos:50,
            author:"Akhil Bisen",
            active:true
        })

        const result=await Playlist.insertMany([expressPlaylist,reactPlaylist,mongoosePlaylist,nodePlaylist,mongoPlaylist]);
        console.log(result);
    }catch(err){
       console.log(err);
    }
}

//firstDocument();

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
deleteDocument("65e9b377804952c92603ece4");