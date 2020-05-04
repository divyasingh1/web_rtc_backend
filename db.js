var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/some_project', { useNewUrlParser: true });
mongoose.connection.on('connected', ()=>{
    console.log('connected to db');
});

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error in connection to db,',err)
    }
})