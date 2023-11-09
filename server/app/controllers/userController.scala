package controllers

import memoryModelFit._

@Singleton
class userController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    def testMethods = Action {

    }


}

class tests {
    println(memoryModelFit.updatePassword("samc", "drowssap", "test"))
}