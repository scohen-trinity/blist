import models._
import org.scalatest.flatspec.AsyncFlatSpec
import scala.concurrent.Future

class ModelTests extends AsyncFlatSpec {
    private val goals = Seq[String] ("Gain Muscle", "Lose Weight", "Stay Healthy")
    val memInstance = new models.MemoryModelFit()

    "validateUser" should "validate existing user with correct credentials" in {
        memInstance.validateUser("setho", "password").flatMap{innerValue => assert(innerValue == true)}
    }
    "validateUser" should "reject existing user with incorrect credentials" in {
        memInstance.validateUser("samc", "password").flatMap{innerValue => assert(innerValue == false)}
        memInstance.validateUser("sam", "drowssap").flatMap{innerValue => assert(innerValue == false)}
        memInstance.validateUser("sam", "password").flatMap{innerValue => assert(innerValue == false)}
    }
    "updatePassword" should "change existing user's password (part one)" in {
        memInstance.updatePassword("oliviab", "123", "abc123").flatMap{innerValue => assert(innerValue == true)}
    }
    "updatePassword" should "change existing user's password (part two)" in {
        memInstance.validateUser("oliviab", "abc123").flatMap{innerValue => assert(innerValue == true)}
    }
    "updatePassword" should "reject password change with incorrect credentials (part one)" in {
        memInstance.updatePassword("oliviab", "123", "abc123").flatMap{innerValue => assert(innerValue == false)}
    }
    "updatePassword" should "reject password change with incorrect credentials (part two)" in {
        memInstance.validateUser("oliviab", "123").flatMap{innerValue => assert(innerValue == false)}
    }
    "createUser" should "sign up new user (part one)" in {
        memInstance.createUser("tester", "pass", "pass").flatMap{innerValue => assert(innerValue == true)}
    }
    "createUser" should "sign up new user (part two)" in {
        memInstance.validateUser("tester", "pass").flatMap{innerValue => assert(innerValue == true)}
    }
    "createUser" should "reject sign up with mismatched passwords (part one)" in {
        memInstance.createUser("user", "pass", "password").flatMap{innerValue => assert(innerValue == false)}            
    }
    "createUser" should "reject sign up with mismatched passwords (part two)" in {
        memInstance.validateUser("user", "pass").flatMap{innerValue => assert(innerValue == false)} 
    }
    "createUser" should "disallow creation of new user with existing username" in {
        memInstance.createUser("samuelp", "pass", "pass").flatMap{innerValue => assert(innerValue == false)} 
    }
    "initializeSettings" should "initialize new user's settings (part one)" in {
        memInstance.initializeSettings("tester", 150, 67, 2, 4).flatMap{innerValue => assert(innerValue == true)}
    }
    "initializeSettings" should "initialize new user's settings (part two)" in {
        memInstance.retrieveUserSettings("tester").flatMap{innerValue => assert(innerValue == (150, 67, goals(2), 4))}
    }
    "initializeSettings" should "not initialize a non-existent user's settings (part one)" in {
        memInstance.initializeSettings("missing", 150, 67, 2, 4).flatMap{innerValue => assert(innerValue == false)} 
    }
    "initializeSettings" should "not initialize a non-existent user's settings (part two)" in {
        memInstance.retrieveUserSettings("missing").flatMap{innerValue => assert(innerValue != (150, 67, goals(2), 4))}
    }
    "updatePassword" should "change new user's password (part one)" in {
        memInstance.updatePassword("tester", "pass", "abc123").flatMap{innerValue => assert(innerValue == true)}
    }
    "updatePassword" should "change new user's password (part two)" in {
        memInstance.validateUser("tester", "abc123").flatMap{innerValue => assert(innerValue == true)}
    }
    "updateWeight" should "update user's weight" in {
        memInstance.updateWeight("tester", 155).flatMap{innerValue => assert(innerValue == true)}
    }
    "updateHeight" should "update user's height" in {
        memInstance.updateHeight("tester", 70).flatMap{innerValue => assert(innerValue == true)}
    }
    "updateGoal" should "update user's goal" in {
        memInstance.updateGoal("tester", 1).flatMap{innerValue => assert(innerValue == true)}
    }
    "updateDays" should "update user's days" in {
        memInstance.updateDays("tester", 5).flatMap{innerValue => assert(innerValue == true)}
    }
    "retrieveUserSettings" should "confirm that all settings changes have occurred" in {
        memInstance.retrieveUserSettings("tester").flatMap{innerValue => assert(innerValue == (155, 70, goals(1), 5))}
    }
}