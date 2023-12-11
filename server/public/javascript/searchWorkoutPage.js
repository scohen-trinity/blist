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
const logoutRoute         = document.getElementById("logoutRoute").value;
const profileRoute        = document.getElementById("profileRoute").value;
const workoutRoute        = document.getElementById("getWorkoutRoute").value;

// Hamburger Component
class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.goToLanding = this.goToLanding.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
        this.goToSearch = this.goToSearch.bind(this);
    }

    closeMenu() {
        this.setState({ isOpen: false });
    }

    // Call this method after navigation actions
    goToLanding(e) {
        e.preventDefault();
        this.closeMenu();
        window.location.href = landingRoute;
    }

    goToLogin(e) {
        e.preventDefault();
        this.closeMenu();
        window.location.href = loginRoute;
    }

    logOut(e){
        e.preventDefault();
        this.closeMenu();
        window.location.href = logoutRoute;
    }

    goToProfile(e){
        e.preventDefault();
        this.closeMenu();
        window.location.href = profileRoute;
    }

    goToSearch(e){
        e.preventDefault();
        this.closeMenu();
        window.location.href = searchExerciseRoute;
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
            onClick: e => this.goToProfile(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Profile"),
        ce('a', { 
            onClick: e => this.goToSearch(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Search Exercises"),
        ce('a', { 
            onClick: e => this.logOut(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Log Out")
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
    }

    render() {
        return ce('div', {className: "form-container d-flex justify-content-center align-items-center"},
            ce('div', {className: "text-center"}, 
                ce('h2', {className: "login-header"}, "Search Past Workouts for  " + this.state.username), 
                ce('div', {className: 'completed-container'}, 
                    ce('input', {type: 'radio', name: 'options', id: 'All-Workouts', onClick: this.allClicked.bind(this)}),
                    ce('label', null, 'All'),
                    ce('input', {type: 'radio', name: 'options', id: 'Completed', onClick: this.completeClicked.bind(this)}),
                    ce('label', null, 'Complete'),
                    ce('input', {type: 'radio', name: 'options', id: 'Incomplete', onClick: this.incompleteClicked.bind(this)}),
                    ce('label', null, 'Incomplete')
                ),
                // ce('select', {id: "date-dropdown", className: "form-select mb-3", onChange: this.dateSelectedContent.bind(this)}, null),
                ce('div', null, 
                    ce('ul', {id: "workout_list"}, null)
                )
            ),
            );
    }

    allClicked() {
        workout_list.innerHTML = ''
        for(const workout of this.state.workouts) {
            var listItem = document.createElement('li');
            var listDiv = document.createElement('div');
            var listSpan = document.createElement('span');
            var listButton = document.createElement('button');
            listButton.textContent = "View";
            listButton.className = "submission-button";
            listButton.id = workout[0];
            listButton.onclick = () => this.goToWorkoutRoute(workout[0]);
            if(Array.isArray(workout)) {
                const workoutText = workout[1];

                listSpan.textContent = workoutText;
            }
            listItem.appendChild(listDiv);
            listDiv.appendChild(listSpan);
            listDiv.appendChild(listButton);
            workout_list.appendChild(listItem);
        }
    }

    completeClicked() {
        workout_list.innerHTML = ''
        for(const workout of this.state.workouts) {
            if(workout[2]!="null") {
                var listItem = document.createElement('li');
                var listDiv = document.createElement('div');
                var listSpan = document.createElement('span');
                var listButton = document.createElement('button');
                listButton.textContent = "View";
                listButton.id = workout[0];
                listButton.className = "submission-button";
                listButton.onclick = () => this.goToWorkoutRoute(workout[0]);
                if(Array.isArray(workout)) {
                    const workoutText = workout[1];

                    listSpan.textContent = workoutText;
                }
                console.log(listButton)
                listItem.appendChild(listDiv);
                listDiv.appendChild(listSpan);
                listDiv.appendChild(listButton);
                workout_list.appendChild(listItem);
            }
        }
    }

    goToWorkoutRoute(id) {
            console.log("Should redirect")
            var urlWithParams = workoutRoute + "?id=" + id;
            window.location.href = urlWithParams;
        
    }
    
    incompleteClicked() {
        workout_list.innerHTML = ''
        for(const workout of this.state.workouts) {
            if(workout[2]=="null") {
                var listItem = document.createElement('li');
                var listDiv = document.createElement('div');
                var listSpan = document.createElement('span');
                var listButton = document.createElement('button');
                listButton.id = workout[0];
                listButton.textContent = "View";
                listButton.className = "submission-button";
                listButton.onclick = () => this.goToWorkoutRoute(workout[0]);
                if(Array.isArray(workout)) {
                    const workoutText = workout[1];

                    listSpan.textContent = workoutText;
                }
                listItem.appendChild(listDiv);
                listDiv.appendChild(listSpan);
                listDiv.appendChild(listButton);
                workout_list.appendChild(listItem);
            }
        }
    }

    getInfo() {
        fetch(getUserInfo)
            .then(response => response.json())
            .then(userData => {
                this.setState({ username: userData });
                
                this.getWorkoutsForPage();
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
            dateOption.id = workout[0];
            dropdown.appendChild(dateOption);
        })
    }

    dateSelectedContent() {
        const workout_list = document.getElementById("workout_list");    
        const selectedDate = document.getElementById("date-dropdown").value;
        console.log(selectedDate)
        const selectedOption = document.querySelector(`#date-dropdown option[value="${selectedDate}"]`);
        console.log(selectedOption);
        if(selectedDate!=="Not Selected") {
            workout_list.innerHTML = '';
            console.log(selectedDate.id);
            var listItem = document.createElement('li');
            var listDiv = document.createElement('div');
            var listSpan = document.createElement('span');
            var listButton = document.createElement('button');
            listButton.textContent = "View";
            listButton.className = "submission-button";
            listButton.id = selectedDate.id;
            listSpan.textContent = selectedDate;
            listButton.onclick = () => this.goToWorkoutRoute(selectedDate.id);
            listItem.appendChild(listDiv);
            listDiv.appendChild(listSpan);
            listDiv.appendChild(listButton);
            workout_list.appendChild(listItem);
        } else {
            workout_list.innerHTML = ''
            for(const workout of this.state.workouts) {
                var listItem = document.createElement('li');
                var listDiv = document.createElement('div');
                var listSpan = document.createElement('span');
                var listButton = document.createElement('button');
                listButton.textContent = "View";
                listButton.className = "submission-button";
                if(Array.isArray(workout)) {
                    const workoutText = workout[1];

                    listSpan.textContent = workoutText;
                }
                listItem.appendChild(listDiv);
                listDiv.appendChild(listSpan);
                listDiv.appendChild(listButton);
                workout_list.appendChild(listItem);
            }
        }
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
            this.setState({ workouts: workouts });

            const workout_list = document.getElementById('workout_list');
            workout_list.innerHTML = '';
            for(const workout of this.state.workouts) {
                var listItem = document.createElement('li');
                var listDiv = document.createElement('div');
                var listSpan = document.createElement('span');
                var listButton = document.createElement('button');
                listButton.textContent = "View";
                listButton.className = "submission-button";
                listButton.id = workout[0];
                listButton.onclick = () => this.goToWorkoutRoute(workout[0]);
                if(Array.isArray(workout)) {
                    const workoutText = workout[1];

                    listSpan.textContent = workoutText;
                }
                listItem.appendChild(listDiv);
                listDiv.appendChild(listSpan);
                listDiv.appendChild(listButton);
                workout_list.appendChild(listItem);
            }
            // this.setDropdown();
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
           ce('div', {className: "navbar-login-div"}, 
            ce('h2', {className: "navbar-header"}),
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