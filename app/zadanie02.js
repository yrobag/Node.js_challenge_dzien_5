const express = require('express');
const PORT = 3000;
const app = express();
const fs = require('fs');
const file = './name.txt';

app.get('/name/set/:name', (req, res) => {
    let name = req.params.name;
    fs.writeFile(file, name, err => {
       if(err !== null){
           console.log(err);
           res.send(`There was an error while saving a file`);
           return false;
       }
       res.send(name);
    });
});



app.get('/name/show', (req, res) => {
    fs.readFile(file, 'utf-8', (err,data) => {
        if(err !== null){
            res.send(`There was an error while reading file ${file}: ${err}`);
            return false;
        }
        res.send(data);
    });
});


app.get('/name/check', (req, res) => {
    fs.exists(file, exist =>{
        if(exist){
            res.send('Name was already saved');
        }else{
            res.send('Name wasn\'t saved yet');
        }

    })
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});