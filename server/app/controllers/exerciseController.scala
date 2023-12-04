package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._
import play.api.mvc.Results._
import play.api.libs.json._

@Singleton
class ExerciseController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def searchExercise = Action { implicit request =>
    val usernameOption = request.session.get("username")
    println(usernameOption)
    usernameOption.map { username =>
        println(username)
        Ok(views.html.exerciseSearch(username)) 
    }.getOrElse {
        println("Could not find username")
        Redirect(routes.Application.login)
    }
  }

}