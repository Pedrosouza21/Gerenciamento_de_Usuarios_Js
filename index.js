// Quando  tem um () então é um Metodo (ação)
// var = variavel


// serve para colocar no consoler do developer tools
// console.log(nome);
//forEach é um laço que percorre Array para cada item , execute uma função


// function = um trecho de codigo que executa alguma coisa e que retorna algo, para cada campo de um formulário, ele irá executa mais de uma vez 
//function  anonima = função sem nome

var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

fields.forEach(function (field, index) {
    console.log(field.id, field.name, field.value, field.checked, index);

    // == é comparação, === compara valor e tipo de dado
    if (field.name == "gender") {
        if (field.checked) {
            user[field.name] = field.value;
        }


    } else {
        user[field.name] = field.value
    }

});
console.log(user);









