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
class ExerciseController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
    private val memInstance = new models.DatabaseModelFit(db)

    def exercise = Action { implicit request =>
        //val exercise = 
            //Ok(Json.toJson(Exercise)) 
        Ok(views.html.exercise())
    }

    def obtainExercise = Action.async { implicit request =>
        println("in obtain exercise ")
        request.body.asJson.map {ed =>
            println("c")
            Json.fromJson[Int](ed) match {
                case JsSuccess(id, path) => {
                    println(id)
                    memInstance.retrieveExerciseById(id).flatMap { res =>
                        println(res)
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
}