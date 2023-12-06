package models

import collection.mutable._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext

class MemoryModelFit(implicit ec: ExecutionContext) extends ModelTrait {
    private val userPass = Map[String, String]("samc" -> "drowssap", "setho" -> "password", "oliviab" -> "123", "samuelp"-> " ") 
    private val goals = Seq[String] ("Gain Muscle", "Lose Weight", "Stay Healthy")
    private val userInfo = Map[String, Tuple4[Int, Int, String, Int]]("samc" -> Tuple4(180, 72, goals(0), 4))
    private val exercises = Map[String, Tuple3[Seq[String], String, String]](
        "Squat" -> Tuple3(Seq("Quads", "Glutes", "Hamstring"), "https://www.youtube.com/watch?v=nFAscG0XUNY", "Squat down like you are sitting in a chair with a barbell on your shoulders."), 
        "Deadlift" -> Tuple3(Seq("Hamstring", "Back"), "https://www.youtube.com/watch?v=7Q_GnXm7LbI", "Pick up a weighted barbell off the ground. Keep back straight."),
        "Leg Extension" -> Tuple3(Seq("Quads"), "https://www.youtube.com/watch?v=YyvSfVjQeL0", "Use the machine. Bring your legs up."))
    private var workouts = Map[Int, Seq[String]](1 -> Seq("Squat", "Deadlift", "Leg Extension"))
    private var assignments = Map[Tuple3[String, Int, String], Tuple4[String, Int, Int, Int]](Tuple3("samc", 1, "11-14-23") -> Tuple4("", 8, 3, 60))

    def validateUser(username: String, password: String): Future[Boolean] = {
        Future.successful {
            if(userPass.contains(username)){
                if(userPass(username) == password) true
                else false
            }
            else false
        }
    }

    def createUser(username: String, password: String, confirm: String): Future[Boolean] = {
        Future.successful {
            if (userPass.contains(username)) false
            else{
                if(password != confirm) false
                else {
                    userPass(username) = password
                    true
                }
            }
        }   
    }

    def initializeSettings(username: String, weight: Int, height: Int, goalIndex: Int, days: Int): Future[Boolean] = {
        Future.successful {
            if(userPass.contains(username)){
                if (userInfo.contains(username)) false
                else{
                    userInfo(username) = (weight, height, goals(goalIndex), days)
                    true
                }
            }
            else false
        }
    }

    def updatePassword(username: String, oldPass: String, newPass: String): Future[Boolean] = {
        validateUser(username, oldPass).flatMap(result => {
            Future.successful {
                if (result == true) {
                    userPass(username) = newPass 
                    true
                }
                else false
            }
        })
    }

    def updateWeight(username: String, newWeight: Int): Future[Boolean] = {
        Future.successful {
            userInfo(username) = (newWeight, userInfo(username)._2, userInfo(username)._3, userInfo(username)._4)
            true
        }
    }

    def updateHeight(username: String, newHeight: Int): Future[Boolean] = {
        Future.successful {
            userInfo(username) = (userInfo(username)._1, newHeight, userInfo(username)._3, userInfo(username)._4)
            true
        }
    }

    def updateGoal(username: String, newGoalIndex: Int): Future[Boolean] = {
        Future.successful {
            userInfo(username) = (userInfo(username)._1, userInfo(username)._2, goals(newGoalIndex), userInfo(username)._4)
            true
        }
    }

    def updateDays(username: String, newDays: Int): Future[Boolean] = {
        Future.successful {
            userInfo(username) = (userInfo(username)._1, userInfo(username)._2, userInfo(username)._3, newDays)
            true
        }
    }

    def retrieveUserSettings(username: String): Future[Tuple4[Int, Int, String, Int]] = {
        Future.successful {
            if (userInfo.contains(username) == false) Tuple4(-1,-1,"", -1)
            else{
                userInfo(username)
            }
        }
    }

    def getExercise(): Future[String] = {
        //I need to get the correct exercise when it is clicked in the workout section... not sure how
        Future.successful("Bicep curl")
    }
}