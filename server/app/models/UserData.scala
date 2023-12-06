package models
import play.api.libs.json._

case class UserData(username: String, password: String)
case class Exercise(exerciseId: String, exerciseName: String, exerciseDescription: String, exerciseLink: String, exerciseMuscleGrou: String)

object UserData {
    implicit val userDataReads: Reads[UserData] = Json.reads[UserData]
}