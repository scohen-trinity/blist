"use strict"

const ce = React.createElement;

// The code below is required for nav bar and hamburger menu
const csrfToken = document.getElementById("csrfToken").value;
const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;
const profileRoute = document.getElementById("profileRoute").value;
const creationPageRoute = document.getElementById("creationPageRoute").value;
const searchExerciseRoute  = document.getElementById("searchExerciseRoute").value;

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


class NavBarComponent extends React.Component {
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
// The code above is required for the NavBar and Hamburger menu

class TeamSection extends React.Component {
    render() {
        return ce('div', {className: 'section team'},
            ce('h2', {className: 'text-center'}, 'Our Team'),
            ce('ul', {className: 'team-list'},
                ce('li', null, 'Olivia Bangs'),
                ce('li', null, 'Samuel Cohen'),
                ce('li', null, 'Seth Owirodu'),
                ce('li', null, 'Samuel Pappas')
            )
        );
    }
}

class PurposeSection extends React.Component {
    render() {
        return ce('div', {className: 'section purpose'},
            ce('h2', {className: 'text-center'}, 'Our Purpose'),
            ce('p', {className: 'text-center'}, 'Our application makes visiting a gym and lifting weights significantly less intimidating by assembling a programmatic structure for each workout and having exercise descriptions and links to videos about that exercise attached for easy reference.')
        );
    }
}

class MainContainer extends React.Component {
    render() {
        return ce('div', null, 
        ce(NavBarComponent, null, null), 
        ce('div', {className: 'container'},
            ce('div', {className: 'row equal-height'},
                ce('div', {className: 'col-md-6'},
                    ce(TeamSection, null, null)
                ),

                ce('div', {className: 'col-md-6'},
                    ce(PurposeSection, null, null)
                )
            )
        )
        )
    }
    
}



ReactDOM.render(
    ce(MainContainer, null, null),
    document.getElementById('landing-page')
);
