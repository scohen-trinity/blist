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

  def searchWorkout = Action { implicit request =>
    request.session.get("username") match {
      case Some(username) => 
        // println(username)
        Ok(views.html.searchWorkout())
      case None =>
        Redirect(routes.Application.login)
    }
  }

  def accountSettings = Action { implicit request =>
    Ok(views.html.accountSettings())
  }
}
