// Conceito MVC
// Model é onde guardamos as informações(dados)
// view é a interface que o usuário utiliza
// controller liga o model e view


class UserController {

    constructor(formIdCreate, formIdUpdate, tableId) {

        this.formEl = document.getElementById(formIdCreate);
        this.formIdUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.oneEdit();
        this.selectAll();
    }

    oneEdit() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=> {
            this.showPanelCreate();

        });

        this.formIdUpdateEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formIdUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);



            this.getPhoto(this.formIdUpdateEl).then(
                (content) => {

                    if (!values.photo) {
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;
                    }

                    tr.dataset.user = JSON.stringify(values);

                    tr.innerHTML = ` 
        
                    <td><img src="${values.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${result._name}</td>
                    <td>${result._email}</td>
                    <td>${(result._admin) ? 'Sim' : 'Não'}</td>
                    <td>${result.dateFormat(result._register)}</td>
                     <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                     </td>
            
                ` ;

                    this.addEventsTr(tr);

                    this.updateCount();

                    this.formIdUpdateEl.reset();

                    btn.disabled = false;

                    this.showPanelCreate();
                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }


    //  arrow functions é uma forma mais simplificada para trabalhar com função =>

    //Utilizando eventos
    onSubmit(){

        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if (!values) return false;

            this.getPhoto(this.formEl).then(
                (content) => {

                    values.photo = content;

                    this.insert(dataUser);

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;
                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }

    // callback função de retorno
    // trabalhando com arquivos


    getPhoto(formEl) {

        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => {

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

             // processamento independente(promisse), por isso são assincronos
            fileReader.onload = () => {

             resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {
                reject(e);
            };


            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }

        });



    };


    // essa função só pode ser executada aqui let user={};
    // spreending operador = ...

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;

            }

            // == é comparação, === compara valor e tipo de dado
            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }


            } else if (field.name == "admin") {

                user[field.name] = field.checked;

            } else {
                user[field.name] = field.value;
            }

        });

        if (!isValid) {
            return false;
        }

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

    getUsersStorage(){

        let users = [];

        if(localStorage.getItem("users")){
            users = JSON.parse(sessionStorage.getItem("users"));
        }

        return users;

    }


    selectAll(){
        let users = this.getUsersStorage();

        users.forEach(dataUser=>{

            let user= new User();

            user.loadFromJSON(dataUser);


            this.addLine(user);

        });
       

    }

    // Utilizando metodo sessionStorage
    insert(data){
        let users = this.getUsersStorage();

        users.push(data);

        // sessionStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("users",JSON.stringify(users));

    }

    // appendChild permite adcionar código html como elemento filho do elemento atual
    // Html e Jascript trabalhando junto com o formulario
    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = ` 
        
            <td><img src="${dataUser.photo}dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        
        ` ;

        this.addEventsTr(tr);

        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    addEventsTr(tr) {

        // replace procura o primeiro elemento e substitui 

        tr.querySelector("btn-delete").addEventListener("click", e => {
            if(comfirm("Deseja realmente excluir?")){

                tr.remove();

                this.updateCount();
            }

        });


        tr.querySelector("btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);


            this.formIdUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {

                let field = this.formIdUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            let field = this.formIdUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];

                    }


                }
            }

            this.formIdUpdateEl.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();


        });
    }

    showPanelCreate() {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        console.log(numberUsers);

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }


}
