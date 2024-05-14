"use strict"

const ce = React.createElement;

// The code below is required for nav bar and hamburger menu
const csrfToken = document.getElementById("csrfToken").value;

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

    goToCreation(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to creation page");
        window.location.href = creationPageRoute;
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
        }, "Login")

        ) : null
    );
    
    }

}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.goToLogin = this.goToLogin.bind(this);
        this.goToLanding = this.goToLanding.bind(this);
    }

    render() {
        return ce('div', {className: "navbar"},
           ce(Hamburger, {className: "hamburger-navbar"}, null),
           ce('h1', {className: "navbar-header", onClick: e => this.goToLanding(e)}, 'BULLETIN'),
           ce('div', {className: "navbar-login-div"}, 
            ce('h2', {className: "navbar-header"}),
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
    goToProfile(e) {
        window.location.href = profileRoute;
    }
    goToSearch(e) {
        window.location.href = searchExerciseRoute;
    }
    goToCreation(e) {
        window.location.href = creationPageRoute;
    }
}

class BucketList extends React.Component {
    render() {
        return ce('div', { className: 'bucket-list' }, 
            ce('h5', null, 'Your Bucket List'),
            ce('ul', null, null),
        )
    }
}

class MainContainer extends React.Component {
    render() {
        return ce('div', { className: 'main-container' }, 
            ce(NavBar, null, null),
            ce(BucketList, null, null)
        )
    }
}

ReactDOM.render(
    ce(MainContainer, null, null),
    document.getElementById('home-page')
);