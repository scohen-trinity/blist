package models
import play.api.libs.json._

case class CreationData(username: String, password: String, confirmPass: String)

object CreationData {
    implicit val creationDataReads: Reads[CreationData] = Json.reads[CreationData]
    implicit val creationDataWrites: Writes[CreationData] = Json.writes[CreationData]
}

