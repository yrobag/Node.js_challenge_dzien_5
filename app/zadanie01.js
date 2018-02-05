const express = require('express');
const PORT = 3000;
const app =express();

app.get('/:num1/:num2', (req, res) => {
    let num1 =req.params.num1;
    let num2 =req.params.num2;

   let result = parseInt(num1) + parseInt(num2);
   res.send(`${num1} + ${num2} = ${result}`);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});