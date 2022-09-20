// Quando  tem um () então é um Metodo (ação)
// var = variavel


// serve para colocar no consoler do developer tools
// console.log(nome);
//forEach é um laço que percorre Array para cada item , execute uma função


// function = um trecho de codigo que executa alguma coisa e que retorna algo, para cada campo de um formulário, ele irá executa mais de uma vez 
//function  anonima = função sem nome

// add Eventlist executa uma função, um evento
// document.querySelectorAll("button").forEach(function () {

//     this.addEventListener("click", function () {
//         console.log("clicou!");
//     });
// });


//Usando eventos
var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};


// Html e Jascript trabalhando junto com o formulario
function addLine(dataUser){

    var tr = document.createElement("tr");
  

    tr.innerHTML = ` 
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>

            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr> 
    ` ;

    document.getElementById("table-users").appendChild(tr);
}



document.getElementById("form-user-create").addEventListener("submit", function (event) {

    event.preventDefault();

    fields.forEach(function (field, index) {

        // == é comparação, === compara valor e tipo de dado
        if (field.name == "gender") {
            if (field.checked) {
                user[field.name] = field.value;
            }


        } else {
            user[field.name] = field.value
        }

    });

    addLine(user);

});














