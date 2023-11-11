package controllers

import models.memoryModelFit
import javax.inject._
import play.api.mvc._
import play.api.i18n._
import java.lang.ProcessBuilder.Redirect

@Singleton
class userController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    // def testMethods = Action {

    // }


}

class tests {
    println(memoryModelFit.updatePassword("samc", "drowssap", "test"))
}