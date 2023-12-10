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
const getWorkouts         = document.getElementById("getWorkoutsRoute").value;

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
            username: "",
            workouts: []
        }
    }

    componentDidMount() {
        this.getInfo();
        // console.log(this.state.username)
    }

    render() {
        return ce('div', {className: "form-container d-flex justify-content-center align-items-center"},
            ce('div', {className: "text-center"}, 
                ce('h2', {className: "login-header"}, "Search Past Workouts for  " + this.state.username), 
                ce('div', {className: 'completed-container'}, 
                    ce('input', {type: 'radio', name: 'options', id: 'All-Workouts'}),
                    ce('label', null, 'All'),
                    ce('input', {type: 'radio', name: 'options', id: 'Completed'}),
                    ce('label', null, 'Complete'),
                    ce('input', {type: 'radio', name: 'options', id: 'Incomplete'}),
                    ce('label', null, 'Incomplete')
                ),
                ce('select', {id: "date-dropdown", className: "form-select mb-3", onChange: this.dateSelectedContent}, null),
                ce('div', null, 
                    ce('ul', {id: "workout_list"}, null)
                )
            ),
            );
    }

    // createAssignment() {

    // }

    getInfo() {
        fetch(getUserInfo)
            .then(response => response.json())
            .then(userData => {
                this.setState({ username: userData });
                // this.createAssignment();
                this.getWorkoutsForPage();
                // console.log(userData)
            })
            .catch(error => {
                console.error('Error', error);
            })
    }

    setDropdown() {
        const dropdown = document.getElementById("date-dropdown");
        
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Not Selected';
        dropdown.appendChild(defaultOption);

        this.state.workouts.map((workout, index) => {
            const dateOption = document.createElement('option');
            dateOption.textContent = workout[1];
            dropdown.appendChild(dateOption);
        })
    }

    dateSelectedContent() {
        const workout_list = document.getElementById("workout_list");
        const selectedDate = document.getElementById("date-dropdown").value;
        if(selectedDate!=="Not Selected") {
            const dateOption = document.createElement('option');
            dateOption.textContent = selectedDate;
            workout_list.innerHTML = '';
            workout_list.appendChild(dateOption);
        } else {
            this.state.workouts;
        }
        // console.log(selectedDate);
    }

    getWorkoutsForPage() {
        fetch(getWorkouts, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Csrf-Token': csrfToken
            },
            body: JSON.stringify(this.state.username)
        })
        .then(response => response.json())
        .then(workouts => {
            const workout_list = document.getElementById('workout_list');
            workout_list.innerHTML = '';
            workouts.forEach(workout => {
                var listItem = document.createElement('li');
                var listDiv = document.createElement('div');
                var listSpan = document.createElement('span');
                var listButton = document.createElement('button');
                listButton.textContent = "View";
                listButton.className = "submission-button";
                if(Array.isArray(workout)) {
                    const workoutText = workout.join(', ');

                    listSpan.textContent = workoutText;
                }
                listItem.appendChild(listDiv);
                listDiv.appendChild(listSpan);
                listDiv.appendChild(listButton);
                workout_list.appendChild(listItem);
            });

            this.setState({ workouts: workouts });
            this.setDropdown();
            console.log(this.state.workouts);
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
    document.getElementById('search_workout_page')
);