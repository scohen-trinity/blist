package models

import collection.mutable

object memoryModelFit{
    private val userPass = mutable.Map[String, String]("samc" -> "drowssap", "setho" -> "password", "oliviab" -> "123", "samuelp"-> " ") 
    private val goals = Seq[String] ("Gain Muscle", "Lose Weight", "Stay Healthy")
    private val userInfo = mutable.Map[String, Tuple]("samc" -> (180, 72, goals[0], 4))

    def validateUser(username: String, password: String): Boolean = {
        userPass.get(username).map(_ == password).getOrElse(false)
    }

    def createUser(username: String, password: String): Boolean = {
        if (users.contains(username)) false else{
            users(username) = password
            true
        }
    }

    def updatePassword(username: String, oldPass: String, newPass: String): Boolean = {
        if (validateUser(username, oldPass) == True) {
            userPass(username) = newPass 
            true
        }
        else false
    }

    def updateWeight(username: String, newWeight: String): Boolean = {
        userInfo(username)._1 = newWeight
        true
    }
    
}