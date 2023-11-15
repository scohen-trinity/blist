package models

import scala.concurrent.Future
import scala.concurrent.ExecutionContext

trait ModelTrait {
    def validateUser(username: String, password: String): Future[Boolean]
    def createUser(username: String, password: String, confirm: String): Future[Boolean]
    def initializeSettings(username: String, weight: Int, height: Int, goalIndex: Int, days: Int): Future[Boolean]
    def updatePassword(username: String, oldPass: String, newPass: String): Future[Boolean]
    def updateWeight(username: String, newWeight: Int): Future[Boolean] 
    def updateHeight(username: String, newHeight: Int): Future[Boolean]
    def updateGoal(username: String, newGoalIndex: Int): Future[Boolean] 
    def updateDays(username: String, newDays: Int): Future[Boolean]
}
