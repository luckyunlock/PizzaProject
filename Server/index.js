var express = require('express');
var util = require('util');
var cors = require('cors');
var app = express();

app.use(cors({origin: '*'}));
app.set('views', './views')
app.set('view engine', 'pug');

var request_list = []

function validate(input){
    var regex = /D.*I.*O.*/g;
    return (input.toUpperCase().match(regex) === null && input !== "invalid");
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/request_list', function (req, res) {
    res.send(request_list);
});

app.get('/request_pizza', function (req, res) {
    let response = {
        accettato: false,
        ricevuta: null,
        prezzo: null,
        suggerimento: "Guarda il nome dei parametri o i valori! :)"
    }
    
    var nome = req.query.nome || "invalid";
    var postazione = req.query.postazione || "invalid";
    var condimento = req.query.condimento || "invalid";

    var isValid = true;
    if(!validate(nome))
        isValid = false
    if(!validate(postazione))
        isValid = false
    if(!validate(condimento))
        isValid = false
    
    if(!isValid){
        res.send(response);
    }else{
        response.accettato= true;
        response.suggerimento = null;
        response.ricevuta = Math.floor((Math.random()*100000))
        response.prezzo = Math.floor(Math.random()*5 + 4)

        let new_pizza = {
            nome:nome,
            condimento:condimento, 
            postazione:postazione,
            ricevuta:response.ricevuta,
            prezzo: response.prezzo,
        }

        request_list.push(new_pizza);
        res.send(response);
    }
});

app.get('/break_pin', function (req, res) {
    var in_pin = req.query.pin || "invalid";
    if(parseInt(in_pin) != 666){
        res.send({accept:"No"});
    }
    res.send({accept:"Yesss"});
});

app.get('/request_pizza_html', function (req, res) {
    
    let response = {
        accettato: false,
        ricevuta: null,
        prezzo: null,
        suggerimento: "Guarda il nome dei parametri o i valori! :)"
    }
    
    var nome = req.query.nome || "invalid";
    var postazione = req.query.postazione || "invalid";
    var condimento = req.query.condimento || "invalid";

    var isValid = true;
    if(!validate(nome))
        isValid = false
    if(!validate(postazione))
        isValid = false
    if(!validate(condimento))
        isValid = false
    
    if(!isValid){
        res.render('failure_page', response);
    }else{
        response.accettato= true;
        response.suggerimento = null;
        response.ricevuta = Math.floor((Math.random()*100000))
        response.prezzo = Math.floor(Math.random()*5 + 4)

        let new_pizza = {
            nome:nome,
            condimento:condimento, 
            postazione:postazione,
            ricevuta:response.ricevuta,
            prezzo: response.prezzo,
        }

        request_list.push(new_pizza);
        res.render('success_page', response);
    }
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});