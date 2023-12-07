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

class ExerciseSection extends React.Component {
    render() {
        return ce('div', {className: 'exercise name'},
            ce('br'),
            ce('br'),
            ce('br'),
            ce('h2', {className: 'text-center'}, 'Exercise: '),
            ce('br'),
            ce('h4', {className: 'text-center'}, 'Description: '),
            ce('h4', {className: 'text-center'}, 'Muscle Group: '),
            ce('h4', {className: 'text-center'}, 'Link to video: ')
        );
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
                console.log('Received data:', data);
        
                // Assuming data is an array or tuple with at least 5 elements
                const [, secondValue] = data;
        
                if (secondValue !== undefined) {
                    // Update the state with the 2nd value
                    //this.setState({ exercises: [secondValue] });
                    this.setState({
                        exercises: this.state.exercises.concat(secondValue)
                      })
                } else {
                    console.error("Invalid data format:", data);
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
    

    triceps(e){
        //do something similar to get all except check for those that work triceps
    }

    componentDidMount() {
        this.getAll();
    }

    render() {
        if (this.state.selectedExercise == null){
        return ce('div', {className: 'All-exercises'},
            ce('br'),
            ce('br'),
            ce('br'),
            ce('h2', {className: 'text-center'}, 'Exercise List'),
            ce('br'),
            'I want to workout out my:',
            ce('br'),
            ce('button', {onClick: e => this.triceps(e)}, 'Triceps'),
            ce('button', {onClick: e => this.Quads(e)}, 'Quads'),
            ce('button', {onClick: e => this.Hamstring(e)}, 'Hamstring'),
            ce('button', {onClick: e => this.Calf(e)}, 'Calf'),
            ce('button', {onClick: e => this.Glutes(e)}, 'Glutes'),
            ce('button', {onClick: e => this.Biceps(e)}, 'Biceps'),
            //etc
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
            ce('h4', { className: 'text-center' }, `Link to video: ${this.state.selectedExercise[2]}`),
            ce('h4', { className: 'text-center' }, `Description: ${this.state.selectedExercise[3]}`),
            ce('h4', { className: 'text-center' }, `Muscle Group(s): ${this.state.selectedExercise[4]}`)

        )
    }
}



class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listIt: true,
            selectedExercise: null,
        };
    }

    render() {
        return ce('div', null,
            ce(NavBarComponent, null, null),
            ce('div', { className: 'container' },
                ce('div', { className: 'row justify-content-center' },
                    ce('div', { className: 'col-md-12' },
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
