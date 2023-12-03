"use strict"

const ce = React.createElement;

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
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
                ce('a', { href: '#home' }, 'Home'),
                ce('a', { href: '#about' }, 'About'),
                ce('a', { href: '#services' }, 'Services'),
                ce('a', { href: '#contact' }, 'Contact')
            ) : null
        );
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

class Version4MainComponent extends React.Component {
    render() {
        return ce(MainContainer, null, null);
    }
}

ReactDOM.render(
    ce(Version4MainComponent, null, null),
    document.getElementById('react-root')
);
