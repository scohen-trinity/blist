const retrieveExerciseRoute = document.getElementById("retrieveExerciseRoute").value;
const searchExercisesRoute = document.getElementById("searchExercisesRoute").value;
const csrfToken = document.getElementById("csrfToken").value;

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
            //className: `hamburger-navbar ${this.props.className || ''}`,
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

class ExerciseListSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            exercises: [],
            //selectExercise: null, 
          
        }; 
    }

    getAll() {
        this.state.exercises = []
        for (var i=1; i < 29; i++) {
            this.state.id = i
            fetch(retrieveExerciseRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
                body: JSON.stringify( this.state.id )  // Send an empty object as the request body
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                //console.log('Received data:', data);
        
                if (this.state.chosenMuscle == null){
                    console.log("chosen muscle is " + this.state.chosenMuscle + " should be null")
                    const [, secondValue, , , fourthValue] = data;
                    if (secondValue !== undefined) {
                        this.setState({
                            exercises: this.state.exercises.concat(secondValue)
                        })
                    } else {
                        console.error("Invalid data format:", data);
                    }
                }
                else {
                     //if the data works the chosen muscle, add to exercises
                     console.log("chosen muscle " + this.state.chosenMuscle + " should NOT be null")
                     const [, secondValue, , , fourthValue] = data;
                     if (fourthValue.includes(this.state.chosenMuscle)) {
                        this.setState({
                            exercises: this.state.exercises.concat(secondValue),
                        });
                        console.log("yes")
                    }
                    console.log(this.state.exercises)
                }
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
                console.error('Error details:', error.response ? error.response.data : 'No response data');
            });
       }
    }
    
    handleGoToExercise(index) {
        this.props.noList();
        console.log(index + 1);
        fetch(retrieveExerciseRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(index + 1)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('Received data:', data);
            if (data) {
                this.setState({ selectedExercise: data });  
                //console.log("hey" + this.state.selectedExercise)              
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
        this.getAll();
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if chosenMuscle has changed
        if (this.state.chosenMuscle !== prevState.chosenMuscle) {
            // If it has changed, call getAll to fetch new exercises
            this.getAll();
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
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Triceps'})}, 'Triceps'),
            console.log(this.state.chosenMuscle),
            console.log(this.state.exercises),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Quads'})}, 'Quads'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Hamstring'})}, 'Hamstring'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Calf'})}, 'Calf'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Glutes'})}, 'Glutes'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Bicep'})}, 'Bicep'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Back'})}, 'Back'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Chest'})}, 'Chest'),
            ce('button', {onClick: e => this.setState({chosenMuscle: 'Abs'})}, 'Abs'),
            ce('button', {onClick: e => this.setState({chosenMuscle: null})}, 'See all exercises'),

        
            ce('br'),
            ce('br'),
            ce('ul', null,
                this.state.exercises.map((exercise, index) => 
                    ce('li', {key: index, onClick: e => this.handleGoToExercise(index)}, exercise))
            ),   

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
            ce('button', {onClick: e => this.back(e)}, '<-- Back to List')
            

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
                        console.log(this.state.selectedExercise)
                        
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
