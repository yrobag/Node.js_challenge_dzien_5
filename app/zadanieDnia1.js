const express = require('express');
const fs = require('fs');
const app = express();
const POSSIBLE_ANSWERS = ['yes', 'no', 'idk'];
const FILE_PATH = './votes.json';

app.use(express.static('./public/zadanieDnia/'));


app.get('/votes/check', (req, res) => {
    fs.exists(FILE_PATH, exist => {
        if (!exist) {
            res.send('There is no votes yet');
            return;
        }
        fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
            if (err !== null) {
                console.log(err);
            }
            data = JSON.parse(data);
            let result = '';
            POSSIBLE_ANSWERS.forEach(answer => {
                if(data[answer]) {
                    result += `${answer}:${data[answer]}<br>`;
                }
            });
            res.send(result)
        });
    });
});


app.get('/vote/:vote', (req, res) => {
   let vote = req.params.vote;
   if(POSSIBLE_ANSWERS.includes(vote.toLowerCase())){
       saveVote(vote);
       res.send('Thank You for your vote! :)');
   }else{
       res.send('This answer is not valid');
   }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});

let saveVote = vote => {
    fs.exists(FILE_PATH, exist => {
        if(!exist){
            let data = {};
            data[vote] = 1;
            fs.writeFile(FILE_PATH, JSON.stringify(data), err => {
                if (err !== null) {
                    console.log(err);
                }
            })

        } else {
            fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
                if (err !== null) {
                    console.log(err);
                }
                data = JSON.parse(data);
                if(!data[vote]){
                    data[vote] = 0;
                }
                data[vote] += 1;
                fs.writeFile(FILE_PATH, JSON.stringify(data), err => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        }
    })
};