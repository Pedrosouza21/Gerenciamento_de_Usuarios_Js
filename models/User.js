// É possivel colocar propriedades privadas, que só podem ser acessadas por meio de metodos


class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get _register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value) {
        this._photo = value;
    }

    loadFromJSON(json){
        for (let name in json){

            switch(name){
                case '_register':
                this[name ]= new Date(json[name]);
                break;

            }
            this[name] = json[name];
        }
    }

    static getUsersStorage(){

        let users = [];

        if(localStorage.getItem("users")){
            users = JSON.parse(sessionStorage.getItem("users"));
        }

        return users;

    }


    getNewID(){
        if (!window.id) window.id = 0;

        id++;

        return this.id;

    }

    save(){

        let users = User.getUsersStorage();

        if(this.id >0){

            users.map(u=> {

                if(u._id == this.id){

                    u = this;
                }

                return u;
            });


        }else{

            this._id = this.getNewID();

            users.push(this);
    
        }
      
        localStorage.setItem("users",JSON.stringify(users));


    
    }

}