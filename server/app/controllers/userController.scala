package controllers

import models._
import javax.inject._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.json._
import java.lang.ProcessBuilder.Redirect

@Singleton
class userController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    // def testMethods = Action {

    // }

    def validate = Action { implicit request =>
        request.body.asJson.map { ud => 
            ud.as[UserData] match {
                case userData: UserData =>
                    if(memoryModelFit.validateUser(userData.username, userData.password)) {
                        Ok(Json.toJson(true))
                    } else {
                        Ok(Json.toJson(false))
                    }
                case _ => 
                    BadRequest("Invalid JSON format")
            }
        }.getOrElse {
            BadRequest("Expecting JSON data")
        }    
    }


}

class tests {
    println(memoryModelFit.updatePassword("samc", "drowssap", "test"))
}