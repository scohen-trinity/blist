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
import play.filters.csrf.CSRF


@Singleton
class HobbyButtonController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
    private val blistInstance = new models.BlistModel(db)

    def getRandomHobby = Action.async { implicit request => 
      blistInstance.getRandomHobby().flatMap { res => 
        Future.successful(Ok(Json.toJson(res)))  
      }
    }

    // def obtainExercise = Action.async { implicit request =>
    //     request.body.asJson.map {ed =>
    //         Json.fromJson[Int](ed) match {
    //             case JsSuccess(id, path) => {
    //                 memInstance.retrieveExerciseById(id).flatMap { res =>
    //                     Future.successful(Ok(Json.toJson(res)))
    //                 }
    //             }
    //             case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
    //         }
    //     }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    // }

    // def searchExercises = Action.async { implicit request =>
    //     request.body.asJson.map {el => 
    //         Json.fromJson[String](el) match {
    //             case JsSuccess(label, path) => {
    //                 memInstance.searchByLabel(label).flatMap{ res =>
    //                     Future.successful(Ok(Json.toJson(res)))
    //                 }
    //             }
    //             case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
    //         }
    //     }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    // }

    // def obtainAllExercises = Action.async { implicit request =>
    //     memInstance.obtainAllExercises.map { res =>
    //         Ok(Json.toJson(res))
    //     }
    // }

}