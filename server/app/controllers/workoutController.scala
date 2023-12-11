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
class WorkoutController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
    private val memInstance = new models.DatabaseModelFit(db)

    def getWorkouts = Action.async { implicit request =>
        val requestBody = request.body
        // println(s"Request body: $requestBody")
        request.body.asJson.map {ed =>
            Json.fromJson[String](ed) match {
                case JsSuccess(username, path) => {
                    memInstance.retrieveWorkoutsByUsername(username).flatMap { res =>
                        Future.successful(Ok(Json.toJson(res)))
                    }
                }
                case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
            }
        }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    }

    def searchExercises = Action.async { implicit request =>
        request.body.asJson.map {el => 
            Json.fromJson[String](el) match {
                case JsSuccess(label, path) => {
                    memInstance.searchByLabel(label).flatMap{ res =>
                        Future.successful(Ok(Json.toJson(res)))
                    }
                }
                case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
            }
        }.getOrElse(Future.successful(Ok(Json.toJson(false))))
    }

def workoutExercises = Action.async { implicit request =>
    request.body.asJson.map { jsonBody =>
        Json.fromJson[Int](jsonBody) match {
            case JsSuccess(workoutId, path) =>
                memInstance.pullWorkoutExercises(workoutId).flatMap { exerciseIds =>
                    val jsonExercises = Json.obj(
                        "exerciseIds" -> exerciseIds
                    )
                    Future.successful(Ok(jsonExercises))
                }
            case e @ JsError(_) => Future.successful(Ok(Json.toJson(false)))
        }
    }.getOrElse(Future.successful(Ok(Json.toJson(false))))
}




    
}