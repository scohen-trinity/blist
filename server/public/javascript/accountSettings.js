"use strict";

const ce = React.createElement;

// The code below is required for nav bar and hamburger menu

const csrfToken = document.getElementById("csrfToken").value;
const loginRoute = document.getElementById("loginRoute").value;
const landingRoute = document.getElementById("landingRoute").value;
const validateRoute = document.getElementById("validateRoute").value;
const getUserInfo = document.getElementById("getUserInfoRoute").value;
const retrieveSettingsRoute = document.getElementById("retrieveSettingsRoute").value;
const setAllSettingsRoute = document.getElementById("setAllSettingsRoute").value;
const changePasswordRoute = document.getElementById("changePasswordRoute").value;
const changeWeightRoute = document.getElementById("changeWeightRoute").value;
const changeHeightRoute = document.getElementById("changeHeightRoute").value;
const changeGoalRoute = document.getElementById("changeGoalRoute").value;
const changeDaysRoute = document.getElementById("changeDaysRoute").value;
const getUserInfoRoute = document.getElementById("getUserInfoRoute").value;
const logoutRoute = document.getElementById("logoutRoute").value;
const workoutSearchRoute = document.getElementById("workoutSearchRoute").value;
const searchExerciseRoute = document.getElementById("searchExerciseRoute").value;

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

  goToWorkouts(e){
    e.preventDefault();
    this.closeMenu();
    console.log("Go to profile page");
    window.location.href = workoutSearchRoute;
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
      className: "hamburger-navbar",
      onClick: this.toggleMenu
    };

    const hamburgerProps = {
      className: `hamburger ${this.state.isOpen ? "open" : ""}`
    };

    const burgerProps = index => ({
      key: index,
      className: `burger burger${index} ${this.state.isOpen ? "open" : ""}`
    });

    return ce(
      "div",
      navbarProps,
      ce(
        "div",
        hamburgerProps,
        ce("div", burgerProps(1)), // First line of hamburger
        ce("div", burgerProps(2)), // Second line of hamburger
        ce("div", burgerProps(3)) // Third line of hamburger
      ),
      this.state.isOpen
        ? ce(
            "div",
            { className: "menu" },
            ce(
              "a",
              {
                onClick: e => this.goToLanding(e),
                style: { cursor: "pointer" },
                tabIndex: 0
              },
              "Home"
            ),
            ce(
              "a",
              {
                onClick: e => this.goToWorkouts(e),
                style: { cursor: "pointer" },
                tabIndex: 0
              },
              "Search Workouts"
            ),
            ce(
              "a",
              {
                onClick: e => this.goToSearch(e),
                style: { cursor: "pointer" },
                tabIndex: 0
              },
              "Search Exercises"
            ),
            ce(
              "a",
              {
                onClick: e => this.logOut(e),
                style: { cursor: "pointer" },
                tabIndex: 0
              },
              "Log Out"
            )
          )
        : null
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
    return ce(
      "div",
      { className: "navbar" },
      ce(Hamburger, { className: "hamburger-navbar" }, null),
      ce(
        "h1",
        { className: "navbar-header", onClick: e => this.goToLanding(e) },
        "TIGER FIT"
      ),
      ce(
        "div",
        { className: "navbar-login-div", onClick: e => this.goToLogin(e) },
        ce("h2", { className: "navbar-header" }, "LOGIN"),
        ce(
          "img",
          {
            src:
              "https://cdn4.iconfinder.com/data/icons/man-user-human-person-business-profile-avatar/100/20-1User_13-512.png",
            className: "login-navbar"
          },
          null
        )
      )
    );
  }

  goToLogin(e) {
    console.log("Go to log in page");
    window.location.href = loginRoute;
  }

  goToLanding(e) {
    console.log("Go to landing page");
    window.location.href = landingRoute;
  }
}
// The code above is required for the NavBar and Hamburger menu

class personalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      newPassword: '',
      oldPassword: '',
    };
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleNewPasswordChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  handleOldPasswordChange(event) {
    this.setState({ oldPassword: event.target.value });
  }

  changePassword() {
    const postData = {
      username: this.state.username, 
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };
    console.log(postData);

    fetch(changePasswordRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Csrf-Token": csrfToken
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(result => {
      if (result) {
        console.log("Password changed successfully");
      } else {
        console.error("Failed to change password");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  render() {
    return ce(
      "div",
      { className: "personal-form-container" }, // Use this class to style the form container
      ce("h2", { className: "personal-form" }, "Change Password"), // Use the class for styling header
      ce("div",
        { className: "input-container" }, // Wrap the input in a div with a class for styling
        ce("input", {
          className: "login-form", // Use this class to style the input
          type: "password",
          value: this.state.oldPassword,
          onChange: this.handleOldPasswordChange,
          placeholder: "Old Password"
        })
      ),
      ce("div",
        { className: "input-container" }, // Wrap the input in a div with a class for styling
        ce("input", {
          className: "login-form", // Use this class to style the input
          type: "password",
          value: this.state.newPassword,
          onChange: this.handleNewPasswordChange,
          placeholder: "New Password"
        })
      ),
      ce("button", { className: "submission-button", onClick: this.changePassword }, "Submit") // Button styling
    );
  }
}



class workoutDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      fitnessGoal: props.fitnessGoal,
      height: props.height !== -2 && props.height !== undefined ? props.height.toString() : "",
      weight: props.weight !== -2 && props.weight !== undefined ? props.weight.toString() : "",
      days: props.days !== -2 && props.days !== undefined ? props.days.toString() : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.updateGoal = this.updateGoal.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username ||
        this.props.fitnessGoal !== prevProps.fitnessGoal ||
        this.props.height !== prevProps.height ||
        this.props.weight !== prevProps.weight ||
        this.props.days !== prevProps.days) {
      this.setState({
        username: this.props.username,
        fitnessGoal: this.props.fitnessGoal,
        height: this.props.height !== -2 && this.props.height !== undefined
                ? this.props.height.toString() : "",
        weight: this.props.weight !== -2 && this.props.weight !== undefined
                ? this.props.weight.toString() : "",
        days: this.props.days !== -2 && this.props.days !== undefined
              ? this.props.days.toString() : ""
      });
    }
  }

  getGoalName(goalValue) {
    const fitnessGoalMapping = {
      "1": "Gain Muscle",
      "2": "Lose Weight",
      "3": "Stay Healthy"
    };
    return fitnessGoalMapping[goalValue] || "";
  }

  updateWeight() {
    const postData = {
      username: this.state.username,
      newSetting: parseInt(this.state.weight, 10)
    };
    this.makeUpdateRequest(changeWeightRoute, postData);
  }

  updateHeight() {
    const postData = {
      username: this.state.username,
      newSetting: parseInt(this.state.height, 10)
    };
    this.makeUpdateRequest(changeHeightRoute, postData);
  }

  updateGoal() {
    console.log("Updating goal to:", this.state.fitnessGoal);
    const postData = {
      username: this.state.username,
      newSetting: this.state.fitnessGoal
    };
    this.makeUpdateRequest(changeGoalRoute, postData);
  }

  updateDays() {
    const postData = {
      username: this.state.username,
      newSetting: parseInt(this.state.days, 10)
    };
    this.makeUpdateRequest(changeDaysRoute, postData);
  }

  makeUpdateRequest(url, data) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Csrf-Token": csrfToken
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result) {
        console.log("Setting updated successfully");
      } else {
        console.error("Failed to update setting");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value }, () => {
      this.updateWeight();
    });
  }

  handleChange(event) {
    const goalStringToInt = {
      "Gain Muscle": 1,
      "Lose Weight": 2,
      "Stay Healthy": 3
    };
    const goalValue = goalStringToInt[event.target.value];
    this.setState({ fitnessGoal: goalValue }, () => {
      this.updateGoal();
    });
  }

  handleHeightChange(event) {
    this.setState({ height: event.target.value }, () => {
      this.updateHeight();
    });
  }

  handleDaysChange(event) {
    this.setState({ days: event.target.value }, () => {
      this.updateDays();
    });
  }

  render() {
    const heightOptions = [ce("option", { value: "" }, "Not Selected")];
    for (let i = 48; i <= 84; i++) {
      heightOptions.push(ce("option", { value: `${i}` }, `${i} inches`));
    }

    const weightOptions = [ce("option", { value: "" }, "Not Selected")];
    for (let i = 80; i <= 300; i += 5) {
      weightOptions.push(ce("option", { value: `${i}` }, `${i} lbs`));
    }

    const dayOptions = [ce("option", { value: "" }, "Not Selected")];
    for (let i = 1; i <= 5; i++) {
      dayOptions.push(ce("option", { value: `${i}` }, `${i} days`));
    }

    const fitnessGoalOptions = [
      ce("option", { value: "Gain Muscle" }, "Gain Muscle"),
      ce("option", { value: "Lose Weight" }, "Lose Weight"),
      ce("option", { value: "Stay Healthy" }, "Stay Healthy")
    ];

    return ce(
      "div",
      null,
      ce("h2", { className: "dropdown-title" }, "Workout Goals"),
      ce(
        "div",
        { className: "dropdown-container" },
        ce("label", { htmlFor: "fitness-goal-select" }, "Fitness Goal"),
        ce(
          "select",
          {
            id: "fitness-goal-select",
            value: this.getGoalName(this.state.fitnessGoal),
            onChange: this.handleChange
          },
          ...fitnessGoalOptions
        ),
      ),
      ce(
        "div",
        { className: "dropdown-container" },
        ce("label", { htmlFor: "height-select" }, "Height"),
        ce(
          "select",
          {
            id: "height-select",
            value: this.state.height,
            onChange: this.handleHeightChange
          },
          ...heightOptions
        )
      ),
      ce(
        "div",
        { className: "dropdown-container" },
        ce("label", { htmlFor: "weight-select" }, "Weight"),
        ce(
          "select",
          {
            id: "weight-select",
            value: this.state.weight,
            onChange: this.handleWeightChange
          },
          ...weightOptions
        )
      ),
      ce(
        "div",
        { className: "dropdown-container" },
        ce("label", { htmlFor: "days-select" }, "Workout Days per Week"),
        ce(
          "select",
          {
            id: "days-select",
            value: this.state.days,
            onChange: this.handleDaysChange
          },
          ...dayOptions
        )
      )
    );
  }
}

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "Workout" };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    let contentComponent;

    if (this.state.selectedOption === "Workout") {
      contentComponent = ce(workoutDropdown, {
        username: this.props.username,
        weight: this.props.weight,
        height: this.props.height,
        fitnessGoal: this.props.fitnessGoal,
        days: this.props.days,
        retrieveSettings: this.retrieveSettings
      });
    } else {
      contentComponent = ce(
        personalForm,
        {
          username: this.props.username,
        }
      );
    }

    return ce(
      "div",
      null,
      ce(
        "div",
        { className: "toggle-switch" },
        ce(
          "div",
          {
            className: `option ${this.state.selectedOption === "Personal"
              ? "selected"
              : ""}`,
            onClick: () => this.handleOptionChange("Personal")
          },
          "Personal"
        ),
        ce(
          "div",
          {
            className: `option ${this.state.selectedOption === "Workout"
              ? "selected"
              : ""}`,
            onClick: () => this.handleOptionChange("Workout")
          },
          "Workout"
        )
      ),
      contentComponent
    );
  }
}

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: "",
      password: "",
      fitnessGoal: -2,
      height: -2,
      weight: -2,
      days: -2
    };
    this.retrieveSettings = this.retrieveSettings.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    if (!this.state.loggedIn) {
      return ce(
        "div",
        null,
        ce(NavBarComponent, null, null),
        ce("h1", { className: "account-settings" }, "Account Settings"),
        ce(ToggleSwitch, {
          username: this.state.username,
          fitnessGoal: this.state.fitnessGoal,
          height: this.state.height,
          weight: this.state.weight,
          days: this.state.days,
          retrieveSettings: this.retrieveSettings
        })
        // You may want to display username and workouts here or pass them to child components
      );
    } else {
      window.location.href = loginRoute;
      return null;
    }
  }

  getInfo() {
    fetch(getUserInfo)
      .then(response => response.json())
      .then(userData => {
        this.setState({ username: userData });
        this.retrieveSettings();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  retrieveSettings() {
    fetch(retrieveSettingsRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Csrf-Token": csrfToken
      },
      body: JSON.stringify(this.state.username)
    })
      .then(response => response.json())
      .then(settingsData => {
        console.log(settingsData);
        this.setState({
          weight: settingsData[0],
          height: settingsData[1],
          fitnessGoal: settingsData[2],
          days: settingsData[3]
        });
      })
      .catch(error => {
        console.error("Error retrieving settings:", error);
      });
  }
}

ReactDOM.render(
  ce(MainContainer, null, null),
  document.getElementById("profile")
);

ReactDOM.render(
  ce(MainContainer, null, null),
  document.getElementById("profile")
);
