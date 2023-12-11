const retrieveExerciseRoute = document.getElementById("retrieveExerciseRoute").value;
const searchExercisesRoute = document.getElementById("searchExercisesRoute").value;
const obtainAllExercisesRoute = document.getElementById("obtainAllExercisesRoute").value;
const loginRoute = document.getElementById("loginRoute").value;
const logoutRoute = document.getElementById("logoutRoute").value;
const workoutSearchRoute = document.getElementById("workoutSearchRoute").value;
const profileRoute = document.getElementById("profileRoute").value;
const landingRoute = document.getElementById("landingRoute").value;

const csrfToken = document.getElementById("csrfToken").value;

const ce = React.createElement;

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

    goToProfile(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to profile page");
        window.location.href = profileRoute;
    }

    logOut(e){
        e.preventDefault();
        this.closeMenu();
        window.location.href = logoutRoute;  
    }

    goToWorkouts(e){
        e.preventDefault();
        this.closeMenu();
        console.log("Go to profile page");
        window.location.href = workoutSearchRoute;
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
            onClick: e => this.goToWorkouts(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Search Workouts"),
        ce('a', { 
            onClick: e => this.goToProfile(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Profile"),
        ce('a', { 
            onClick: e => this.logOut(e), 
            style: { cursor: 'pointer' }, 
            tabIndex: 0 
        }, "Log Out")
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
    goToProfile(e) {
        console.log("Go to landing page")
        window.location.href = profileRoute;
    }
}

class ExerciseListSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            exercises: [],
            muscleExercises: [],  
            allExercises: [], 
            tempId: null,
        }; 
    }

    getAllAll(){
        this.setState({allExercises: []})
        fetch(obtainAllExercisesRoute, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            for (var i = 0; i< data.length; i++){
                this.setState({
                    allExercises: this.state.allExercises.concat(data[i]) //dont just add name, add id
                })
            }
        })
    }
    getAllNew(){
        this.setState({exercises: []})
        fetch(obtainAllExercisesRoute, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            for (var i = 0; i< data.length; i++){
                if (this.state.chosenMuscle == null){
                        this.setState({
                        exercises: this.state.exercises.concat(data[i][1]) //dont just add name, add id
                    })
                }
                else{
                    if (data[i][4].includes(this.state.chosenMuscle)) {
                        this.setState({
                            exercises: this.state.exercises.concat(data[i][1]),
                        });
                    }
                }

            }
        })
    }
    
    handleGoToExercise(index) {
        this.props.noList();
        fetch(retrieveExerciseRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(Math.floor((index/5)+1)) 
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {            
            if (data) {
                this.setState({ selectedExercise: data });  
            } else {
                console.error("Invalid data format:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching exercise details:', error);
            console.error('Error details:', error.response ? error.response.data : 'No response data');
        });
    }
    
    back(e){
        this.setState({ selectedExercise: null });  
    }

    componentDidMount() {
        this.getAllNew();
        this.getAllAll()

    }

    componentDidUpdate(prevProps, prevState) {
        // Check if chosenMuscle has changed
        if (this.state.chosenMuscle !== prevState.chosenMuscle) {
            // If it has changed, call getAll to fetch new exercises
            this.getAllNew();
            this.getAllAll()
        }
    }

    render() {
        if (this.state.selectedExercise == null){
            //if chosenMuscle == null:           else: create a new variable for muscle lists, alter that
            return ce('div', {className: 'All-exercises'},
            ce('br'),
            ce('br'),
            ce('br'),
            ce('h2', {className: 'text-center'}, 'Exercise List'),
            ce('br'),
            'I want to workout out my:',
            ce('br'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Triceps'})}, 'Triceps'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Quads'})}, 'Quads'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Hamstring'})}, 'Hamstring'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Calf'})}, 'Calf'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Glutes'})}, 'Glutes'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Bicep'})}, 'Bicep'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Back'})}, 'Back'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Chest'})}, 'Chest'),
            ce('button', {className: 'submission-button', onClick: e => this.setState({chosenMuscle: 'Abs'})}, 'Abs'),
            ce('br'),
            ce('button', {className: 'large-button', onClick: e => this.setState({chosenMuscle: null})}, 'See all exercises'),
            ce('br'),
            ce('br'),
            ce('ul', null,
                this.state.exercises.map((exercise, index) => 
                    ce('li', {
                        key: index,
                        onClick: e => {
                            this.setState({ tempId: this.state.allExercises.indexOf(exercise) }, () => {
                                this.handleGoToExercise(this.state.tempId);
                            });
                        }
                    }, exercise)
                ),
            )



        );} else return ce('div', { className: 'exercise-details' },
            ce('br'),
            ce('h2', { className: 'text-center' }, 'Exercise Details'),
            ce('br'),ce('br'),
            ce('h4', { className: 'text-center' }, `Name: ${this.state.selectedExercise[1]}`),
            ce('h4', { className: 'text-center' },
                ce('a', { href: this.state.selectedExercise[2], target: '_blank' }, 'Link to explanatory video')
            ),
            ce('h4', { className: 'text-center' }, `Description: ${this.state.selectedExercise[3]}`),
            ce('h4', { className: 'text-center' }, `Muscle Group(s): ${this.state.selectedExercise[4]}`),
            ce('button', {className: 'large-button', onClick: e => this.back(e)}, '<-- Back to List')
            

        )
    }
}



class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listIt: true,
            selectedExercise: null,
            chosenMuscle: null,
        };
    }

    render() {
        return ce('div', null,
            ce(NavBarComponent, null, null),
            ce('div', { className: 'container' },
                ce('div', { className: 'row justify-content-center' },
                    ce('div', { className: 'col-md-6' },
                        ce(ExerciseListSection, { noList: () => this.setState({ listIt: false }) }, null),
                        // Render Exercise Details
                    )
                )
            )
        );
    }
}


class Version4MainComponent extends React.Component {
    render() {
        return ce(MainContainer, null, null);
    }
}

ReactDOM.render(
    ce(Version4MainComponent, null, null),
    document.getElementById('exercise')
);
