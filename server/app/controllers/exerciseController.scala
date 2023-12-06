package controllers

import models._
import javax.inject._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import java.lang.ProcessBuilder.Redirect
import scala.concurrent.Future

@Singleton
class exerciseController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    implicit val ec: scala.concurrent.ExecutionContext = scala.concurrent.ExecutionContext.global

    val memInstance = new models.MemoryModelFit()

    def exercise = Action { implicit request =>
        Ok(views.html.exercise())
    }
}