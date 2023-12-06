"use strict"

console.log("Running react successfully")

const ce = React.createElement

const csrfToken           = document.getElementById("csrfToken").value;
const loginRoute          = document.getElementById("loginRoute").value;
const landingRoute        = document.getElementById("landingRoute").value;
const validateRoute       = document.getElementById("validateRoute").value;
const creationPageRoute   = document.getElementById("creationPageRoute").value;
const creationActionRoute = document.getElementById("creationActionRoute").value;
const searchExerciseRoute = document.getElementById("searchExerciseRoute").value;
const getUserInfo         = document.getElementById("getUserInfoRoute").value;

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

// Hamburger component above

class MainSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
        }
    }

    render() {
        if(!this.state.loggedIn) {
            window.location.href = loginRoute;
            return null;
        } else {
            return ce('div', null, 
                ce(NavBarComponent, null, null),
                ce(BasicSearchComponent, null, null)
            );
        }
    }
}

class BasicSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        return ce('div', null, this.state.username);
    }

    getInfo() {
        fetch(getUserInfo)
            .then(response => response.json())
            .then(userData => {
                console.log(userData)
                this.setState({ username: userData });
                // document.getElementById('usernameDisplay').innerText = 'Logged in as: ' + userData.username;
            })
            .catch(error => {
                console.error('Error', error);
            })
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

ReactDOM.render(
    ce(MainSearchComponent, null, null),
    document.getElementById('search_exercise_page')
);