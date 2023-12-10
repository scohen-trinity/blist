package models

import slick._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.util.matching.Regex
import java.text.SimpleDateFormat


class DatabaseModelFit(db: Database)(implicit ec: ExecutionContext) {

    //User related methods

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

    //Exercise related methods

    def retrieveExerciseById(id: Int): Future[Tuple5[Int, String, String, String, Seq[String]]] = {
        db.run(Exercises.filter(res => res.exerciseId === id).result).map(exercises => {
            if(exercises.length > 0){
                var muscleGroups: Seq[String] = Seq()

                muscleGroups = exercises.head.exerciseMuscleGroup1 +: muscleGroups

                exercises.head.exerciseMuscleGroup2 match {
                    case Some(e) => muscleGroups = e +: muscleGroups
                    case None => {}
                }

                exercises.head.exerciseMuscleGroup3 match {
                    case Some(e) => muscleGroups = e +: muscleGroups
                    case None => {}
                }

                (exercises.head.exerciseId, exercises.head.exerciseName, exercises.head.exerciseDescription, exercises.head.exerciseLink, muscleGroups)
            } 
            else (-1, "", "", "", Seq())
        })
    }

    def searchByLabel(label: String): Future[Seq[Tuple5[Int, String, String, String, Seq[String]]]] = {
        db.run(Exercises.filter(res => (res.exerciseMuscleGroup1 === label || res.exerciseMuscleGroup2 === label || res.exerciseMuscleGroup3 === label)).result).map(exercises => {
            if(exercises.length > 0){
                var compiledExercises: Seq[Tuple5[Int, String, String, String, Seq[String]]] = Seq()
                var muscleGroups: Seq[String] = Seq()

                for(e <- exercises) {
                    muscleGroups = Seq()
                    muscleGroups = e.exerciseMuscleGroup1 +: muscleGroups

                    e.exerciseMuscleGroup2 match {
                        case Some(muscle) => muscleGroups = muscle +: muscleGroups
                        case None => {}
                    }

                    e.exerciseMuscleGroup3 match {
                        case Some(muscle) => muscleGroups = muscle +: muscleGroups
                        case None => {}
                    }

                    compiledExercises = ((e.exerciseId, e.exerciseName, e.exerciseDescription, e.exerciseLink, muscleGroups)) +: compiledExercises 
                }
                compiledExercises
            }
            else Seq()
        })
    }

    // Workout related methods

    def retrieveWorkoutsByUsername(username: String): Future[Seq[(Int, String)]] = {
        db.run(Assignments.filter(res => res.username === username).result).map(workouts => {
            if(workouts.length > 0) {
                var workout_list: Seq[(Int, String)] = Seq()
                for(workout <- workouts) {
                    val date_format = new SimpleDateFormat("MM-dd-yyyy")
                    var date_assigned = date_format.format(workout.dateAssigned)
                    workout_list = (workout.workoutId, date_assigned) +: workout_list
                }

                workout_list
            } else {
                Seq()
            }
        })
    }

    // adding a workout algorithm

    def createAssignment(username: String): Future[Int] = {
        db.run(
            (for {
                user <- Users if user.username === username
            } yield {
                println(user.fitnessGoal)
                user.fitnessGoal
            }).result
        )
        val time = java.sql.Date.valueOf(java.time.LocalDate.now)
        println(time)
        
        println(AssignmentsRow(username, -1, time, null, 1, 1, 1))
        db.run(Assignments += AssignmentsRow(username, -1, time, null, 1, 1, 1))
        
    }
}