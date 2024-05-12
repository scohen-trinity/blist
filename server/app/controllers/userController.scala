package controllers

import models._
import javax.inject._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import java.lang.ProcessBuilder.Redirect
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._

@Singleton
class UserController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile]{
    private val memInstance = new models.DatabaseModelFit(db)

    implicit val userDataReads = Json.reads[UserData]
    implicit val userDataWrites = Json.writes[UserData]
    implicit val settingsReads = Json.reads[Settings]
    implicit val settingsWrites = Json.writes[Settings]
    implicit val passwordReads: Reads[PasswordChange] = Json.reads[PasswordChange]
    implicit val passwordWrites: Writes[PasswordChange] = Json.writes[PasswordChange]
    implicit val singleSettingReads: Reads[SingleSettingChange] = Json.reads[SingleSettingChange]
    implicit val singleSettingWrites: Writes[SingleSettingChange] = Json.writes[SingleSettingChange]

    def validate = Action.async { implicit request =>
        request.body.asJson.map {ud =>
            Json.fromJson[UserData](ud) match {
                case JsSuccess(ld, path) => {
                    memInstance.validateUser(ld.username, ld.password).flatMap{ status => 
                        status match {
                            case Some(userid) =>
                                Future.successful(Ok(Json.toJson(userid)).withSession("username" -> ld.username, "userid" -> userid.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.get.value))
                            case None =>
                                Future.successful(Ok(Json.toJson(false)))
                        }
                    }
                }
                case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
            }
        }.getOrElse(Future.successful(Ok(Json.toJson(false))))  
    }

    def create = Action.async { implicit request =>
        request.body.asJson.map {ud => 
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
    
    // def getUserInfo = Action.async { implicit request =>
    //     request.session.get("username") match {
    //         case Some(username) =>
    //             memInstance.createAssignment(username)
    //             Future.successful(Ok(Json.toJson(username)))
    //         case None =>
    //             Future.successful(Ok(Json.toJson(false)))
    //     }   
    // }

    // def changePassword = Action.async { implicit request =>
    //     request.body.asJson.map {up =>
    //         Json.fromJson[PasswordChange](up) match {
    //             case JsSuccess(pData, path) => {
    //                 memInstance.updatePassword(pData.username, pData.oldPassword, pData.newPassword).flatMap{res => 
    //                     if(res) Future.successful(Ok(Json.toJson(true)))
    //                     else Future.successful(Ok(Json.toJson(false)))
    //                 }
    //             }
    //             case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
    //         }
    //     }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    // }

    // def obtainSettings = Action.async { implicit request => 
    //     request.body.asJson.map {ud =>
    //         Json.fromJson[String](ud) match {
    //             case JsSuccess(username, path) => {
    //                 memInstance.retrieveUserSettings(username).flatMap { res => 
    //                     //User didn't exist
    //                     if((res._1 == None) && (res._2 == None) && (res._3 == None) && (res._4 == None) && (res._4 == None)){
    //                         Future.successful(Ok(Json.toJson((-1, -1, -1, -1))))
    //                     }
    //                     //User exists
    //                     else {
    //                         var weight = -2;
    //                         var height = -2;
    //                         var goal = -2;
    //                         var days = -2;

    //                         res._2 match {
    //                             case Some(w) => weight = w;
    //                             case None => weight = -2;
    //                         }
    //                         res._3 match {
    //                             case Some(h) => height = h;
    //                             case None => height = -2;
    //                         }
    //                         res._4 match {
    //                             case Some(g) => goal = g;
    //                             case None => goal = -2;
    //                         }
    //                         res._5 match {
    //                             case Some(d) => days = d;
    //                             case None => days = -2;
    //                         }

    //                         Future.successful(Ok(Json.toJson((weight, height, goal, days))))     
    //                     }
    //                 }
    //             }
    //             case e @ JsError(_) => Future.successful(Ok(Json.toJson((-1, -1, -1, -1))))
    //         }
    //     }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    // }

  def logout = Action { implicit request =>
    Redirect(routes.Application.landing).withNewSession
  }

}