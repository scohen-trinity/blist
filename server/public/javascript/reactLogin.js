console.log("Running React Login Page")

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
        return ce('div', null, 
            ce('h2', null, 'Login:'),
            ce('br'),
            'Username ',
            ce('input', {type: "text", id: "loginName", class: "form-control", value: this.state.loginName, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            'Password: ',
            ce('input', {type: "password", id: "loginPass", value: this.state.loginPass, onChange: e => this.onChangeHandler(e)}),
            ce('br'),
            ce('button', {onClick: e=> this.login(e)}, 'Login'),
            ce('span', {id: "login-message"}, this.state.loginMessage),
        )
    }
}

ReactDOM.render(
    ce('div', null,
        ce(MainLoginComponent, null, null)
    ),
    document.getElementById('login_page')
);