"use strict"

const ce = React.createElement

const csrfToken = document.getElementById("csrfToken").value;
const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;
const validateRoute = document.getElementById("validateRoute").value;
const creationPageRoute = document.getElementById("creationPageRoute").value;
const creationActionRoute = document.getElementById("creationActionRoute").value;

class MainAccountCreationComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    render(){
        if(this.state.loggedIn) {
            window.location.href = landingRoute; //THIS SHOULD BECOME THE SETTINGS PAGE ONCE ITS FINISHED
            return null;
        }
        else return ce('div', null, ce(AccountComponent, {successfulCreation: () => this.setState({loggedIn: true})}));
    }
}

class AccountComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newPass: "",
            newConfirmPass: "",
            popupMessage: "",
        };
    }

    render(){
        return ce('div', {className: "form-container"}, 
            ce('h2', {className: "login-header"}, 'Create An Account'),
            ce('h4', {className: 'basic-font'}, 'Username'),
            ce('input', {type: "text", id: "newName", className: "form-control", value: this.state.newName, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('h4', {className: 'basic-font'}, 'Password'),
            ce('input', {type: "password", id: "newPass", value: this.state.newPass, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('h4', {className: 'basic-font'}, 'Confirm Password'),
            ce('input', {type: "password", id: "newConfirmPass", value: this.state.newConfirmPass, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('br'),
            ce('button', {className: "submission-button", onClick: e=> this.createAccount(e)}, 'Create'),
            ce('br'),
            ce('br'),
            ce('span', {className: 'basic-font', id: "popupMessage"}, this.state.popupMessage)
        );
    }

    onChangeHandler(e){
        this.setState({[e.target['id']]: e.target.value});
    }

    createAccount(e){
        const username = this.state.newName;
        const password = this.state.newPass;
        const confirmPass = this.state.newConfirmPass;

        if(password != confirmPass) {
            this.setState({popupMessage: "Passwords Must Match."});
            this.setState({newName: "", newPass: "", newConfirmPass: ""});
        }
        else if((username == "") || (password == "")) {
            this.setState({popupMessage: "Fields Cannot Be Empty."});
            this.setState({newName: "", newPass: "", newConfirmPass: ""});
        }
        else {
            fetch(creationActionRoute, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
                body: JSON.stringify({username, password, confirmPass})
            }).then(res => res.json()).then(data => {
                if(data){
                    this.props.successfulCreation();
                    this.setState({newName: "", newPass: "", newConfirmPass: ""});
                }
                else{
                    this.setState({popupMessage: "Account Creation Failed."});
                    this.setState({newName: "", newPass: "", newConfirmPass: ""});
                }
            })
        }
    }
}

ReactDOM.render(
    ce('div', null, ce(MainAccountCreationComponent, null, null)), document.getElementById('account_creation_page')
);
