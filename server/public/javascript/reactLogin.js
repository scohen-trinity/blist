console.log("Running react successfully")

const ce = React.createElement

const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;

class MainLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerClicked: false,
        }
    }

    render() {
        if(this.state.hamburgerClicked) {
            return ce('h2', null, "Not clicked")
        } else {
            return ce(BasicLoginComponent, null)
        }
    }
}

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
    }

    render() {
        return ce('div', {className: "navbar"},
           ce('button', {className: "hamburger-navbar"}, null),
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
            ce('span', {id: "login-message"}, this.state.loginMessage),
        )
    }
}

ReactDOM.render(
    ce('div', null,
        ce(NavBarComponent, null, null),
        ce(MainLoginComponent, null, null)
    ),
    document.getElementById('login_page')
);