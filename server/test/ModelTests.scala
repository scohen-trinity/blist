import models._
import org.scalatest.flatspec.AsyncFlatSpec
import scala.concurrent.Future

class ModelTests extends AsyncFlatSpec {
    "validateUser" should "validate existing user with correct credentials" in {
        MemoryModelFit.validateUser("setho", "password").map{result => assert(result == true)} 
    }
        /*
        "reject existing user with incorrect credentials" in {
            MemoryModelFit.validateUser("samc", "password") mustBe Future.successful(false)
            MemoryModelFit.validateUser("sam", "drowssap") mustBe Future.successful(false)
            MemoryModelFit.validateUser("sam", "password") mustBe Future.successful(false)
        }
        "change existing user's password" in {
            MemoryModelFit.updatePassword("oliviab", "123", "abc123") mustBe Future.successful(true)
        }
        "reject password change with incorrect credentials" in {
            MemoryModelFit.updatePassword("oliviab", "123", "abc123") mustBe Future.successful(false)
        }
        "sign up new user" in {
            MemoryModelFit.createUser("tester", "pass", "pass") mustBe Future.successful(true)
        }
        "reject sign up with mismatched passwords" in {
            MemoryModelFit.createUser("user", "pass", "password") mustBe Future.successful(false)
        }
        "disallow creation of new user with existing username" in {
            MemoryModelFit.createUser("samuelp", "pass", "pass") mustBe Future.successful(true)
        }
        "initialize new user's settings" in {
            MemoryModelFit.initializeSettings("tester", 150, 67, 2, 4) mustBe Future.successful(true)
        }
        "change new user's password" in {
            MemoryModelFit.updatePassword("tester", "pass", "abc123") mustBe Future.successful(true)
        }
        
        "update new user's weight"{

        }
        "update new user's height"{

        }
        "update new user's goal"{

        }
        "update new user's days"{

        }
        "update existing user's weight"{

        }
        "update existing user's height"{

        }
        "update existing user's goal"{

        }
        "update existing user's days"{

        }
        */
}