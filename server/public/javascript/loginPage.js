"use strict"

console.log("Running react successfully")

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

// Hamburger Component
class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
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

    goToLogin(e) {
        e.preventDefault();
        this.closeMenu();
        console.log("Go to log in page");
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
            ce('div', burgerProps(3))  // Third line of hamburger
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
        }, "Login")
        ) : null
    );
    
    }

}

class MainLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    render() {
        if(this.state.loggedIn) {
            window.location.href = landingRoute;
            return null;
        } else {
            return ce('div', null, 
                ce(NavBarComponent, null, null),
                ce(BasicLoginComponent, {doLogin: () => this.setState({ loggedIn: true })})
            );
        }
    }
}


class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
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
        console.log("Go to log in page")
        window.location.href = loginRoute;
    }

    goToLanding(e) {
        console.log("Go to landing page")
        window.location.href = landingRoute;
    }
}

class BasicLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: "",
            loginPass: "",
            loginMessage: "",
        };
    }

    render() {
        return ce('div', {className: "form-container"}, 
            ce('h2', {className: "login-header"}, 'Login'),
            ce('h4', { className: 'basic-font'}, 'Username '),
            ce('input', {type: "text", id: "loginName", className: "form-control", value: this.state.loginName, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('h4', { className: 'basic-font'}, 'Password '),
            ce('input', {type: "password", id: "loginPass", value: this.state.loginPass, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('br'),
            ce('button', {className: "submission-button", onClick: e=> this.login(e)}, 'Login'),
            ce('br'),
            ce('br'),
            ce('span', {className: 'basic-font', id: "login-message"}, this.state.loginMessage),
        )
    }

    onChangeHandler(e) {
        this.setState({ [e.target['id']]: e.target.value })
    }

    login(e) {
        const username = this.state.loginName;
        const password = this.state.loginPass;

        fetch(validateRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify({ username, password })
        }).then(res => res.json()).then(data => {
            if(data) {
                this.setState({ loginName: "", loginPass: ""});
                this.props.doLogin();
            } else {
                this.setState({ loginMessage: "Login Failed." });
                this.setState({ loginName: "", loginPass: ""});
            }
        })
    }
}

ReactDOM.render(
    ce(MainLoginComponent, null, null),
    document.getElementById('login_page')
);