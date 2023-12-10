    "use strict"

    const ce = React.createElement;

    // The code below is required for nav bar and hamburger menu

    const csrfToken = document.getElementById("csrfToken").value;
    const loginRoute = document.getElementById("loginRoute").value;
    const landingRoute = document.getElementById("landingRoute").value;

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
            console.log("Go to log in page")
            window.location.href = loginRoute;
        }

        goToLanding(e) {
            console.log("Go to landing page")
            window.location.href = landingRoute;
        }
    }
    // The code above is required for the NavBar and Hamburger menu

    class personalForm extends React.Component {
        render() {
            return ce("h2", {className: "personal-form"}, "Personal",
            ce('div', {className: "form-container"}, 
            ce('h4', { className: 'basic-font'}, 'Password '),
            ce('input', {type: "text", id: ""}),
            ce('br'),
            ce('h4', { className: 'basic-font'}, 'Confirm New Password'),
            ce('input', {text: "confirm password", id: "changePass"}),
            ce('br')
            )
            )
        }
    }

    class workoutDropdown extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                fitnessGoal: 'Not Selected',
                height: '4ft',
                weight: '80',
                days: '1'
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleHeightChange = this.handleHeightChange.bind(this);
            this.handleWeightChange = this.handleWeightChange.bind(this);
            this.handleDaysChange = this.handleDaysChange.bind(this);
        }
    
        handleChange(event) {
            this.setState({ fitnessGoal: event.target.value });
        }
    
        handleHeightChange(event) {
            this.setState({ height: event.target.value });
        }
    
        handleWeightChange(event) {
            this.setState({ weight: event.target.value });
        }
    
        handleDaysChange(event) {
            this.setState({ days: event.target.value });
        }
    
        render() {
            const heightOptions = [];
            for (let i = 48; i <= 84; i++) {
                const feet = Math.floor(i / 12);
                const inches = i % 12;
                heightOptions.push(ce('option', { value: `${feet}ft ${inches}in` }, `${feet}ft ${inches}in`));
            }
    
            const weightOptions = [];
            for (let i = 80; i <= 300; i += 5) {
                weightOptions.push(ce('option', { value: `${i}` }, `${i} lbs`));
            }
    
            const dayOptions = [];
            for (let i = 1; i <= 5; i++) {
                dayOptions.push(ce('option', { value: `${i}` }, `${i} days`));
            }
    
            return ce("div", null,
                ce("h2", {className: "dropdown-title"}, "Workout Goals"),
                ce("div", {className: "dropdown-container"},
                    ce('label', { htmlFor: 'fitness-goal-select' }, 'Fitness Goal'),
                    ce('select', {
                        id: 'fitness-goal-select',
                        value: this.state.fitnessGoal,
                        onChange: this.handleChange,
                    },
                    ce('option', { value: 'Not Selected' }, 'Not Selected'),
                    ce('option', { value: 'Gain Muscle' }, 'Gain Muscle'),
                    ce('option', { value: 'Lose Weight' }, 'Lose Weight'),
                    ce('option', { value: 'Stay Healthy' }, 'Stay Healthy')
                    )
                ),
                ce("div", {className: "dropdown-container"},
                    ce('label', { htmlFor: 'height-select' }, 'Height'),
                    ce('select', {
                        id: 'height-select',
                        value: this.state.height,
                        onChange: this.handleHeightChange,
                    }, ...heightOptions)
                ),
                ce("div", {className: "dropdown-container"},
                    ce('label', { htmlFor: 'weight-select' }, 'Weight'),
                    ce('select', {
                        id: 'weight-select',
                        value: this.state.weight,
                        onChange: this.handleWeightChange,
                    }, ...weightOptions)
                ),
                ce("div", {className: "dropdown-container"},
                    ce('label', { htmlFor: 'days-select' }, 'Workout Days per Week'),
                    ce('select', {
                        id: 'days-select',
                        value: this.state.days,
                        onChange: this.handleDaysChange,
                    }, ...dayOptions)
                )
            );
        }
    }
    



    class ToggleSwitch extends React.Component {
        constructor(props) {
            super(props);
            this.state = { selectedOption: 'Workout' };
            this.handleOptionChange = this.handleOptionChange.bind(this);
        }

        handleOptionChange(selectedOption) {
            this.setState({ selectedOption });
        }

        render() {
            let contentComponent = this.state.selectedOption === 'Workout' ? ce(workoutDropdown) : ce(personalForm);
            return ce('div', null ,
            ce("div", { className: 'toggle-switch' },
                ce('div', {className: `option ${this.state.selectedOption == 'Personal' ? 'selected' : ''}`,
                    onClick: () => this.handleOptionChange('Personal')}, 'Personal'),
                ce('div', {className: `option ${this.state.selectedOption == 'Workout' ? 'selected' : ''}`,
                    onClick: () => this.handleOptionChange('Workout')}, 'Workout')
            ), contentComponent)
        }
    }


    class MainContainer extends React.Component {
        render() {
            return ce('div', null, ce(NavBarComponent, null, null), 
            ce('h1', {className: "account-settings"}, "Account Settings"), 
            ce(ToggleSwitch, null, null))
        }
        
    }



    ReactDOM.render(
        ce(MainContainer, null, null),
        document.getElementById('profile')
    );
