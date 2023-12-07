package controllers

import models._
import javax.inject._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import java.lang.ProcessBuilder.Redirect
import scala.concurrent.Future

@Singleton
class UserController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    implicit val ec: scala.concurrent.ExecutionContext = scala.concurrent.ExecutionContext.global

    val memInstance = new models.MemoryModelFit()

    implicit val userDataReads = Json.reads[UserData]
    implicit val userDataWrites = Json.writes[UserData]
    
    def validate = Action.async { implicit request =>
        request.body.asJson.map { ud =>
            Json.fromJson[UserData](ud) match {
                case JsSuccess(ld, path) => {
                    memInstance.validateUser(ld.username, ld.password).flatMap{status => 
                        if(status) {
                            val session = request.session + ("username" -> ld.username)
                            Future.successful(Ok(Json.toJson(true)).withSession(session))
                        } else {
                            Future.successful(Ok(Json.toJson(false)))
                        }
                    }
                }
                case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
            }
        }.getOrElse {
            Future.successful(Ok(Json.toJson(false)))
        }    
    }

    def create = Action.async { implicit request =>
        request.body.asJson.map{ ud => 
            Json.fromJson[CreationData](ud) match {
                case JsSuccess(cd, path) => {
                    memInstance.createUser(cd.username, cd.password, cd.confirmPass).flatMap{status =>
                        if(status) Future.successful(Ok(Json.toJson(true)))
                        else Future.successful(Ok(Json.toJson(false)))
                    }
                }
                case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
            }
        }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    }

    def getUserInfo = Action.async { implicit request =>
        request.session.get("username") match {
            case Some(username) =>
                Future.successful(Ok(Json.toJson(username)))
            case None =>
                Future.successful(Ok(Json.toJson(false)))
        }   
    }
}