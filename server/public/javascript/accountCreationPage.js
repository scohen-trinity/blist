"use strict"

const ce = React.createElement

const csrfToken = document.getElementById("csrfToken").value;
const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;
const validateRoute = document.getElementById("validateRoute").value;
const creationPageRoute = document.getElementById("creationPageRoute").value;
const creationActionRoute = document.getElementById("creationActionRoute").value;

const retrieveSettingsRoute = document.getElementById("retrieveSettingsRoute").value;
const initializeSettingsRoute = document.getElementById("initializeSettingsRoute").value;
const updatePasswordRoute = document.getElementById("updatePasswordRoute").value;
const updateWeightRoute = document.getElementById("updateWeightRoute").value;
const updateHeightRoute = document.getElementById("updateHeightRoute").value;
const updateGoalRoute = document.getElementById("updateGoalRoute").value;
const updateDaysRoute = document.getElementById("updateDaysRoute").value;

const retrieveExerciseRoute = document.getElementById("retrieveExerciseRoute").value;
const searchExercisesRoute = document.getElementById("searchExercisesRoute").value;

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
            ce('button', {className: "submission-button", onClick: e => this.createAccount(e)}, 'Create'),
            ce('br'),
            ce('button', {className: "submission-button", onClick: e => this.runTests(e)}, 'Run Tests'),
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
        else if(username.length > 20) {
            this.setState({popupMessage: "Username must not exceed 20 characters."});
            this.setState({newName: "", newPass: "", newConfirmPass: ""});
        }
        else if(password.length > 20) {
            this.setState({popupMessage: "Password must not exceed 20 characters."});
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

    /* USED FOR RUNNING DEV TESTS */
    runTests(e){

    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    searchByLabel(label){
        fetch(searchExercisesRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify(label)
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    retrieveExerciseById(id){
        fetch(retrieveExerciseRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify(id)
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    retrieveUserSettings(username){
        fetch(retrieveSettingsRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify(username)
        }).then(res => res.json()).then(data => {
            console.log(data);
            //USE data[index] to access the weight, height, goal, and days
            //You'll get back all -1s if there is an error or the user does not exist and -2s if the user did not have that particular setting
        })
    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    initializeUserSettings(username, weight, height, goal, days){
        fetch(initializeSettingsRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify({username, weight, height, goal, days})
        }).then(res => res.json()).then(data => {
            console.log(data);
            //data will return a boolean telling you if it succeeded or not
        })
    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    updatePassword(username, oldPassword, newPassword){
        fetch(updatePasswordRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify({username, oldPassword, newPassword})
        }).then(res => res.json()).then(data => {
            console.log(data);
            //data will return a boolean telling you if it succeeded or not
        })
    }

    /* WHOEVER NEEDS THIS FUNCTIONALITY SHOULD TAKE IT*/
    //Works for weight, height, days, and goals 
    updateSetting(username, newSetting, route){
        fetch(route, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify({username, newSetting})
        }).then(res => res.json()).then(data => {
            console.log(data);
            //data will return a boolean telling you if it succeeded or not
        })
    }
}

ReactDOM.render(
    ce('div', null, ce(MainAccountCreationComponent, null, null)), document.getElementById('account_creation_page')
);
