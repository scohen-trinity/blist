package models

import collection.mutable
import scala.concurrent.Future
import scala.concurrent.ExecutionContext

class MemoryModelFit(implicit ec: ExecutionContext) extends ModelTrait {
    private var userPass = mutable.Map[String, String]("samc" -> "drowssap", "setho" -> "password", "oliviab" -> "123", "samuelp"-> " ") 
    private val goals = Seq[String] ("Gain Muscle", "Lose Weight", "Stay Healthy")
    private var userInfo = mutable.Map[String, Tuple4[Int, Int, String, Int]]("samc" -> Tuple4(180, 72, goals(0), 4))
    private var exercises = mutable.Map[String, Tuple3[Seq[String], String, String]](
        "Squat" -> Tuple3(Seq("Quads", "Glutes", "Hamstring"), "https://www.youtube.com/watch?v=nFAscG0XUNY", "Squat down like you are sitting in a chair with a barbell on your shoulders."), 
        "Deadlift" -> Tuple3(Seq("Hamstring", "Back"), "https://www.youtube.com/watch?v=7Q_GnXm7LbI", "Pick up a weighted barbell off the ground. Keep back straight."),
        "Leg Extension" -> Tuple3(Seq("Quads"), "https://www.youtube.com/watch?v=YyvSfVjQeL0", "Use the machine. Bring your legs up."))
    private var workouts = mutable.Map[Int, Seq[String]](1 -> Seq("Squat", "Deadlift", "Leg Extension"))
    private var assignments = mutable.Map[Tuple3[String, Int, String], Tuple4[String, Int, Int, Int]](Tuple3("samc", 1, "11-14-23") -> Tuple4("", 8, 3, 60))

    def validateUser(username: String, password: String): Future[Boolean] = {
        if(userPass.contains(username)){
            if(userPass(username) == password) Future.successful(true)
            else Future.successful(false)
        }
        else Future.successful(false)
    }

    def createUser(username: String, password: String, confirm: String): Future[Boolean] = {
        if (userPass.contains(username)) Future.successful(false) 
        else{
            if(password != confirm) Future.successful(false) 
            else {
                userPass(username) = password
                Future.successful(true)
            }
        }
    }

    def initializeSettings(username: String, weight: Int, height: Int, goalIndex: Int, days: Int): Future[Boolean] = {
        if (userInfo.contains(username)) Future.successful(false) 
        else{
            userInfo(username) = (weight, height, goals(goalIndex), days)
            Future.successful(true)
        }
    }

    def updatePassword(username: String, oldPass: String, newPass: String): Future[Boolean] = {
        validateUser(username, oldPass).map(result => {
            if (result == true) {
                userPass(username) = newPass 
                Future.successful(true)
            }
            else Future.successful(false)
        })
    }

    def updateWeight(username: String, newWeight: Int): Future[Boolean] = {
        userInfo(username) = (newWeight, userInfo(username)._2, userInfo(username)._3, userInfo(username)._4)
        Future.successful(true)
    }

    def updateHeight(username: String, newHeight: Int): Future[Boolean] = {
        userInfo(username) = (userInfo(username)._1, newHeight, userInfo(username)._3, userInfo(username)._4)
        Future.successful(true)
    }

    def updateGoal(username: String, newGoalIndex: Int): Future[Boolean] = {
        userInfo(username) = (userInfo(username)._1, userInfo(username)._2, goals(newGoalIndex), userInfo(username)._4)
        Future.successful(true)
    }

    def updateDays(username: String, newDays: Int): Future[Boolean] = {
        userInfo(username) = (userInfo(username)._1, userInfo(username)._2, userInfo(username)._3, newDays)
        Future.successful(true)
    }
}