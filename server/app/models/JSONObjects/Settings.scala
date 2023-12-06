package models
import play.api.libs.json._

case class Settings(username: String, weight: Int, height: Int, goal: Int, days: Int)

object Settings {
    implicit val settingsReads: Reads[Settings] = Json.reads[Settings]
    implicit val settingsWrites: Writes[Settings] = Json.writes[Settings]
}