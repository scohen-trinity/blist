"use strict"

const ce = React.createElement;
const workoutId = document.getElementById("workoutPage").getAttribute("data-workoutid");
// console.log(workoutId);
// The code below is required for nav bar and hamburger menu

const csrfToken = document.getElementById("csrfToken").value;
const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;
const pullWorkoutExercisesRoute = document.getElementById("pullWorkoutExercisesRoute").value;
const profileRoute = document.getElementById("profileRoute").value;
const retrieveExerciseRoute = document.getElementById("retrieveExerciseRoute").value;

const creationPageRoute = document.getElementById("creationPageRoute").value;
const searchExerciseRoute  = document.getElementById("searchExerciseRoute").value;

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goToLanding = this.goToLanding.bind(this);
        this.goToSearch = this.goToSearch.bind(this);
        this.goToCreation = this.goToCreation.bind(this);

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


    goToProfile(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to profile page");
        window.location.href = profileRoute;
    }

    goToSearch(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to search page");
        window.location.href = searchExerciseRoute;
    }

    goToCreation(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to creation page");
        window.location.href = creationPageRoute;
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
            onClick: e => this.goToProfile(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Profile"),
        ce('a', { 
            onClick: e => this.goToSearch(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Search Workouts"),
        ce('a', { 
            onClick: e => this.goToLanding(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "------"),
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
    goToProfile(e) {
        console.log("Go to profile page")
        window.location.href = profileRoute;
    }
    goToSearch(e) {
        console.log("Go to search page")
        window.location.href = searchExerciseRoute;
    }
    goToCreation(e) {
        console.log("Go to creation page")
        window.location.href = creationPageRoute;
    }
}
// The code above is required for the NavBar and Hamburger menu

class WorkoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            exerciseDetails: [] 
        };
    }

    componentDidMount() {
        let workoutIdInt = +workoutId;
        console.log(typeof workoutIdInt);
        this.workoutExercises(workoutIdInt);
    }

    workoutExercises(id) {
        fetch(pullWorkoutExercisesRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify(id)
        }).then(res => res.json()).then(data => {
            if (data.exerciseIds) {
                console.log("it work")
                this.setState({ exercises: data.exerciseIds }, () => {
                    this.state.exercises.forEach(this.fetchExerciseDetails);
                });
            }
        }).catch(error => {
            console.log("not work")
            console.error('Error:', error);
        });
    }

    fetchExerciseDetails = (exerciseId) => {
        fetch(retrieveExerciseRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(exerciseId) 
        })
        .then(res => res.json())
        .then(data => {            
            if (data) {
                this.setState(prevState => ({
                    exerciseDetails: [...prevState.exerciseDetails, data]
                }));
            } else {
                console.error("Invalid data format:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching exercise details:', error);
        });
    }

    renderExerciseDetails = () => {
        return this.state.exerciseDetails.map((details, index) => {
            return ce('div', { key: index, className: 'exercise-details' },
                ce('br'),
                ce('h2', { className: 'text-center' }, 'Exercise Details'),
                ce('br'),ce('br'),
                ce('h4', { className: 'text-center' }, `Name: ${details[1]}`),
                ce('h4', { className: 'text-center' },
                    ce('a', { href: details[2], target: '_blank' }, 'Link to explanatory video')
                ),
                ce('h4', { className: 'text-center' }, `Description: ${details[3]}`),
                ce('h4', { className: 'text-center' }, `Muscle Group(s): ${details[4].join(', ')}`),
                // Additional elements like button can be added here if needed
            );
        });
    }

    render() {
        return ce('div', null,
            ce(NavBarComponent, null, null), // Render the NavBarComponent at the top of the page
            ce('div', { className: 'workout-page' },
                ce('h1', { className: 'Workout-Title' }, 'Workout Exercises'),
                this.renderExerciseDetails()
            )
        );
    }
}

ReactDOM.render(
    ce(WorkoutPage, null, null),
    document.getElementById('workoutPage')
);



