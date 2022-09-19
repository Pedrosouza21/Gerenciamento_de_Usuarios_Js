// Quando  tem um () então é um Metodo (ação)
// var = variavel

var nome = document.querySelector("#exampleInputName");
var gender = document.querySelectorAll("#form-use-create[name=gender]:checked");
var birth = document.querySelector("exampleInputBirth");
var country = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var password = document.querySelector("#exampleInputPassword");
var photo = document.querySelector("#exampleInputFile");
var admin = document.querySelector("exampleInputAdmin");

// serve para colocar no consoler do developer tools
// console.log(nome);
//forEach é um laço que percorre Array para cada item , execute uma função


// function = um trecho de codigo que executa alguma coisa e que retorna algo, para cada campo de um formulário, ele irá executa mais de uma vez 
//function  anonima = função sem nome

var fields = document.querySelectorAll("#form-user-create [name]");

fields.forEach(function(field, index){
    console.log(field.id, field.name, field.value, field.checked,index);


});







