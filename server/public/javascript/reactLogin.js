console.log("Running react successfully")

const ce = React.createElement

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
           'this is the navbar' 
        )
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
            ce('h2', {className: "login-header"}, 'Login:'),
            ce('br'),
            'Username ',
            ce('input', {type: "text", id: "loginName", className: "form-control", value: this.state.loginName, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('br'),
            'Password: ',
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