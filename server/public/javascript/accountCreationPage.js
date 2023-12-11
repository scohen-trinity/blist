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
            window.location.href = loginRoute;
            return null;
        }
        else return ce('div', null, 
            ce(NavBarComponent, null, null), 
            ce(AccountComponent, {successfulCreation: () => this.setState({loggedIn: true})}));
    }
}


class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goToLanding = this.goToLanding.bind(this);
    }

    closeMenu() {
        this.setState({ isOpen: false });
    }

    // Call this method after navigation actions
    goToLanding(e) {
        e.preventDefault();
        this.closeMenu();
        console.log("Go to landing page");
        window.location.href = landingRoute;
    }

    goToLogin(e){
        e.preventDefault();
        this.closeMenu();
        window.location.href = loginRoute;
    }

    toggleMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        const navbarProps = {
            className: 'hamburger-navbar',
            onClick: this.toggleMenu 
        };

        const hamburgerProps = {
            className: `hamburger ${this.state.isOpen ? 'open' : ''}`
        };

        const burgerProps = index => ({
            key: index,
            className: `burger burger${index} ${this.state.isOpen ? 'open' : ''}`
        });

        return ce('div', navbarProps,
        ce('div', hamburgerProps,
            ce('div', burgerProps(1)), // First line of hamburger
            ce('div', burgerProps(2)), // Second line of hamburger
            ce('div', burgerProps(3)) // Third line of hamburger
        ),
        this.state.isOpen ? ce('div', { className: 'menu' },
        ce('a', { 
            onClick: e => this.goToLanding(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Home"),
        ce('a', { 
            onClick: e => this.goToLogin(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Login"),
        ) : null
    );
    
    }

}


class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.goToLogin = this.goToLogin.bind(this);
        this.goToLanding = this.goToLanding.bind(this);
    }

    render() {
        return ce('div', {className: "navbar"},
           ce(Hamburger, {className: "hamburger-navbar"}, null),
           ce('h1', {className: "navbar-header", onClick: e => this.goToLanding(e)}, 'TIGER FIT'),
           ce('div', {className: "navbar-login-div", onClick: e => this.goToLogin(e)}, 
            ce('h2', {className: "navbar-header"}, 'LOGIN'),
            ce('img', { src: "https://cdn4.iconfinder.com/data/icons/man-user-human-person-business-profile-avatar/100/20-1User_13-512.png", className: "login-navbar"}, null) 
           ),
        )
    }

    goToLogin(e) {
        window.location.href = loginRoute;
    }

    goToLanding(e) {
        window.location.href = landingRoute;
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
            ce('br'),
            ce('h4', {className: 'basic-font'}, 'Confirm Password'),
            ce('input', {type: "password", id: "newConfirmPass", value: this.state.newConfirmPass, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('br'),
            ce('button', {className: "submission-button", onClick: e => this.createAccount(e)}, 'Create'),
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
