package models
import play.api.libs.json._

case class SingleSettingChange(username: String, newSetting: Int)

object SingleSettingChange {
    implicit val singleSettingReads: Reads[SingleSettingChange] = Json.reads[SingleSettingChange]
    implicit val singleSettingWrites: Writes[SingleSettingChange] = Json.writes[SingleSettingChange]
}