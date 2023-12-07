package models
import play.api.libs.json._

case class PasswordChange(username: String, oldPassword: String, newPassword: String)

object PasswordChange {
    implicit val passwordReads: Reads[PasswordChange] = Json.reads[PasswordChange]
    implicit val passwordWrites: Writes[PasswordChange] = Json.writes[PasswordChange]
}