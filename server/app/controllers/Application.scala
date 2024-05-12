package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._

@Singleton
class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def landing = Action { implicit request =>
    Ok(views.html.landing())
  }

  def login = Action { implicit request =>
    Ok(views.html.login())
  }

  def accountCreation = Action { implicit request =>
    Ok(views.html.accountCreation())
  }

  def home = Action { implicit request =>
    request.session.get("username") match {
      case Some(username) => 
        Ok(views.html.home())
      case None =>
        Redirect(routes.Application.login)
    }
  }

  def accountSettings = Action { implicit request =>
    Ok(views.html.accountSettings())
  }

  def exercise = Action { implicit request =>
        Ok(views.html.exercise())
  }
  
  // def workoutPage = Action { implicit request => 
  //   val workoutIdOption = request.getQueryString("id")
  //   workoutIdOption match {
  //     case Some(workoutId) =>
  //       Ok(views.html.workoutPage(workoutId.toInt()))
  //     case None =>
  //       BadRequest("No workout id womp womp")
  //   }
  // }
}
