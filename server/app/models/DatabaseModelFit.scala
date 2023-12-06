package models

import slick._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import models.Tables._


class DatabaseModelFit(db: Database)(implicit ec: ExecutionContext) {
    def validateUser(username: String, password: String): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).map(users => {
            if(users.length > 0){
                if(users.head.password == password) true
                else false
            }
            else false
        })
    }

    def createUser(username: String, password: String, confirm: String): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length == 0){
                db.run(Users += UsersRow(username, password)).map {res =>
                    if(res > 0) true
                    else false
                }
            }
            else Future.successful(false)
        })
    }

    def initializeSettings(username: String, weight: Int, height: Int, goalIndex: Int, days: Int): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                db.run(Users.filter(res => res.username === username).map(user => (user.weight, user.heightInches, user.fitnessGoal, user.days)).update((Some(weight), Some(height), Some(goalIndex), Some(days)))).map(res => {
                    if(res > 0) true
                    else false
                })
            }
            else Future.successful(false)
        })
    }

    def updatePassword(username: String, oldPass: String, newPass: String): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                if(users.head.password == oldPass){
                    db.run(Users.filter(res => res.username === username).map(user => (user.password)).update(newPass)).map(res => {
                        if(res > 0) true
                        else false
                    })
                }
                else Future.successful(false)
            }
            else Future.successful(false)
        })
    }
    
    def updateWeight(username: String, newWeight: Int): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                db.run(Users.filter(res => res.username === username).map(user => (user.weight)).update(Some(newWeight))).map(res => {
                    if(res > 0) true
                    else false
                })
            }
            else Future.successful(false)
        })
    }

    def updateHeight(username: String, newHeight: Int): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                db.run(Users.filter(res => res.username === username).map(user => (user.heightInches)).update(Some(newHeight))).map(res => {
                    if(res > 0) true
                    else false
                })
            }
            else Future.successful(false)
        })
    }

    def updateGoal(username: String, newGoalIndex: Int): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                db.run(Users.filter(res => res.username === username).map(user => (user.fitnessGoal)).update(Some(newGoalIndex))).map(res => {
                    if(res > 0) true
                    else false
                })
            }
            else Future.successful(false)
        })
    }

    def updateDays(username: String, newDays: Int): Future[Boolean] = {
        db.run(Users.filter(res => res.username === username).result).flatMap(users => {
            if(users.length > 0){
                db.run(Users.filter(res => res.username === username).map(user => (user.days)).update(Some(newDays))).map(res => {
                    if(res > 0) true
                    else false
                })
            }
            else Future.successful(false)
        })
    }
    
    def retrieveUserSettings(username: String): Future[Tuple5[Option[String], Option[Int], Option[Int], Option[Int], Option[Int]]] = {
        db.run(Users.filter(res => res.username === username).result).map(user => {
            if(user.length > 0) (Some(user.head.username), user.head.weight, user.head.heightInches, user.head.fitnessGoal, user.head.days)
            else (None, None, None, None, None)
        })
    }
}