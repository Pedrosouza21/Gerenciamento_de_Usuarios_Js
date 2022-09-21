// Conceito MVC
// Model é onde guardamos as informações(dados)
// view é a interface que o usuário utiliza
// controller liga o model e view


class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }


    //  arrow functions é uma forma mais simplificada para trabalhar com função =>
    //Usando eventos

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]"); 

            btn.disabled = true;

            let values = this.getValues();

            this.getPhoto().then(
                (content) => {

                values.photo = "content";

                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;
            },
                (e) => {
                    console.error(e);


                });

        });
    }

    // callback função de retorno
    // trabalhando com arquivos


    getPhoto() {

        return !Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                // processamento independente(promisse), por isso são assincronos
                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {
                reject(e);
            }


            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve();
            }

        });



    };


    // essa função só pode ser executada aqui let user={};
    // spreending operador = ...

    getValues() {

        let user = {};

        [...this.formEl.elements].forEach(function (field, index) {

            // == é comparação, === compara valor e tipo de dado
            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }


            } else if (field.name == "admin") {

                user[field.name] = field.checked;

            } else {
                user[field.name] = field.value
            }

        });


        // Utilizando POO
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );


    }

    // Html e Jascript trabalhando junto com o formulario
    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.innerHTML = ` 
        
            <td><img src="${dataUser.photo}dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.register}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        
        ` ;

        // appendChild permite adcionar código html como elemento filho do elemento atual
        this.tableEl.appendChild(tr);


    }


}
