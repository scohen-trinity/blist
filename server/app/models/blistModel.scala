package models

import slick._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.util.matching.Regex
import java.text.SimpleDateFormat
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.Random
import scala.collection.mutable.ListBuffer

// Model for the Blist backend system
class BlistModel(db: Database)(implicit ec: ExecutionContext) {

    // Function to retrieve a random hobby from the database
    def getRandomHobby(): Future[(String, String)] = {
        val database_length: Future[Int] = db.run(Hobbies.length.result)

        val randomHobbyFuture: Future[HobbiesRow] = database_length.flatMap { databaseLength => 
            val random_index = Random.nextInt(databaseLength) + 1
            val random_hobby_query = Hobbies.filter(_.hobbyId === random_index).result.head
            db.run(random_hobby_query)    
        }

        randomHobbyFuture.map { hobby =>
            (hobby.hobbyName, hobby.hobbyDescription)    
        }
    }

    //User related methods

    // def validateUser(username: String, password: String): Future[Boolean] = {
    //     db.run(Users.filter(res => res.username === username).result).map(users => {
    //         if(users.length > 0){
    //             if(users.head.password == password) true
    //             else false
    //         }
    //         else false
    //     })
    // }

//     def createUser(username: String, password: String, confirm: String): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length == 0){
//                 db.run(Users += UsersRow(username, password)).map {res =>
//                     if(res > 0) true
//                     else false
//                 }
//             }
//             else Future.successful(false)
//         })
//     }

//     def initializeSettings(username: String, weight: Int, height: Int, goalIndex: Int, days: Int): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 db.run(Users.filter(res => res.username === username).map(user => (user.weight, user.heightInches, user.fitnessGoal, user.days)).update((Some(weight), Some(height), Some(goalIndex), Some(days)))).map(res => {
//                     if(res > 0) true
//                     else false
//                 })
//             }
//             else Future.successful(false)
//         })
//     }

//     def updatePassword(username: String, oldPass: String, newPass: String): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 if(users.head.password == oldPass){
//                     db.run(Users.filter(res => res.username === username).map(user => (user.password)).update(newPass)).map(res => {
//                         if(res > 0) true
//                         else false
//                     })
//                 }
//                 else Future.successful(false)
//             }
//             else Future.successful(false)
//         })
//     }
    
//     def updateWeight(username: String, newWeight: Int): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 db.run(Users.filter(res => res.username === username).map(user => (user.weight)).update(Some(newWeight))).map(res => {
//                     if(res > 0) true
//                     else false
//                 })
//             }
//             else Future.successful(false)
//         })
//     }

//     def updateHeight(username: String, newHeight: Int): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 db.run(Users.filter(res => res.username === username).map(user => (user.heightInches)).update(Some(newHeight))).map(res => {
//                     if(res > 0) true
//                     else false
//                 })
//             }
//             else Future.successful(false)
//         })
//     }

//     def updateGoal(username: String, newGoalIndex: Int): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 db.run(Users.filter(res => res.username === username).map(user => (user.fitnessGoal)).update(Some(newGoalIndex))).map(res => {
//                     if(res > 0) true
//                     else false
//                 })
//             }
//             else Future.successful(false)
//         })
//     }

//     def updateDays(username: String, newDays: Int): Future[Boolean] = {
//         db.run(Users.filter(res => res.username === username).result).flatMap(users => {
//             if(users.length > 0){
//                 db.run(Users.filter(res => res.username === username).map(user => (user.days)).update(Some(newDays))).map(res => {
//                     if(res > 0) true
//                     else false
//                 })
//             }
//             else Future.successful(false)
//         })
//     }
    
//     def retrieveUserSettings(username: String): Future[Tuple5[Option[String], Option[Int], Option[Int], Option[Int], Option[Int]]] = {
//         db.run(Users.filter(res => res.username === username).result).map(user => {
//             if(user.length > 0) (Some(user.head.username), user.head.weight, user.head.heightInches, user.head.fitnessGoal, user.head.days)
//             else (None, None, None, None, None)
//         })
//     }

//     //Exercise related methods

//     def retrieveExerciseById(id: Int): Future[Tuple5[Int, String, String, String, Seq[String]]] = {
//         db.run(Exercises.filter(res => res.exerciseId === id).result).map(exercises => {
//             if(exercises.length > 0){
//                 var muscleGroups: Seq[String] = Seq()

//                 muscleGroups = exercises.head.exerciseMuscleGroup1 +: muscleGroups

//                 exercises.head.exerciseMuscleGroup2 match {
//                     case Some(e) => muscleGroups = e +: muscleGroups
//                     case None => {}
//                 }

//                 exercises.head.exerciseMuscleGroup3 match {
//                     case Some(e) => muscleGroups = e +: muscleGroups
//                     case None => {}
//                 }

//                 (exercises.head.exerciseId, exercises.head.exerciseName, exercises.head.exerciseDescription, exercises.head.exerciseLink, muscleGroups)
//             } 
//             else (-1, "", "", "", Seq())
//         })
//     }

//     def searchByLabel(label: String): Future[Seq[Tuple5[Int, String, String, String, Seq[String]]]] = {
//         db.run(Exercises.filter(res => (res.exerciseMuscleGroup1 === label || res.exerciseMuscleGroup2 === label || res.exerciseMuscleGroup3 === label)).result).map(exercises => {
//             if(exercises.length > 0){
//                 var compiledExercises: Seq[Tuple5[Int, String, String, String, Seq[String]]] = Seq()
//                 var muscleGroups: Seq[String] = Seq()

//                 for(e <- exercises) {
//                     muscleGroups = Seq()
//                     muscleGroups = e.exerciseMuscleGroup1 +: muscleGroups

//                     e.exerciseMuscleGroup2 match {
//                         case Some(muscle) => muscleGroups = muscle +: muscleGroups
//                         case None => {}
//                     }

//                     e.exerciseMuscleGroup3 match {
//                         case Some(muscle) => muscleGroups = muscle +: muscleGroups
//                         case None => {}
//                     }

//                     compiledExercises = ((e.exerciseId, e.exerciseName, e.exerciseDescription, e.exerciseLink, muscleGroups)) +: compiledExercises 
//                 }
//                 compiledExercises
//             }
//             else Seq()
//         })
//     }

//     // Workout related methods

//     def retrieveWorkoutsByUsername(username: String): Future[Seq[(Int, String, String)]] = {
//         db.run(Assignments.filter(res => res.username === username).result).map(workouts => {
//             if(workouts.length > 0) {
//                 var workout_list: Seq[(Int, String, String)] = Seq()
//                 for(workout <- workouts) {
//                     val date_format = new SimpleDateFormat("MM-dd-yyyy")
//                     var date_assigned = date_format.format(workout.dateAssigned)
//                     var completed = workout.dateCompleted
//                     var date_completed = ""
//                     completed match {
//                         case Some(date) =>
//                             date_completed = date_format.format(date)
//                         case None =>
//                             date_completed = "null"
//                     }
                    
//                     println(date_completed)
//                     workout_list = (workout.workoutId, date_assigned, date_completed) +: workout_list
//                 }

//                 workout_list
//             } else {
//                 Seq()
//             }
//         })
//     }

//     //make a new method that get everything from the db
//     def obtainAllExercises(): Future[Seq[Tuple5[Int, String, String, String, Seq[String]]]] = {
//         db.run(Exercises.result).map(exercises => {
//             exercises.map { exercise =>
//             var muscleGroups: Seq[String] = Seq()

//             muscleGroups = exercise.exerciseMuscleGroup1 +: muscleGroups

//             exercise.exerciseMuscleGroup2 match {
//                 case Some(e) => muscleGroups = e +: muscleGroups
//                 case None    => {}
//             }

//             exercise.exerciseMuscleGroup3 match {
//                 case Some(e) => muscleGroups = e +: muscleGroups
//                 case None    => {}
//             }

//             (exercise.exerciseId, exercise.exerciseName, exercise.exerciseDescription, exercise.exerciseLink, muscleGroups)
//             }
//         })
//     }

//     // adding a workout algorithm

//     def createAssignment(username: String): Future[Boolean] = {
//         val random = new Random()
//         val dayOfWeek = java.time.LocalDate.now().getDayOfWeek.getDisplayName(java.time.format.TextStyle.FULL, java.util.Locale.ENGLISH)
//         println(dayOfWeek)

//         val daysFuture = db.run(
//             (for {
//                 user <- Users if user.username === username
//             } yield {
//                 user.days
//             }).result.headOption
//         )

//         daysFuture.flatMap { maybeDays =>
//             maybeDays match {
//                 case Some(Some(days)) =>
//                     if(days == 1 && dayOfWeek == "Monday") {
//                         println("We do workout today")
//                         makeAssignment(username)
//                         Future.successful(true)
//                     } else if(days == 2 && (dayOfWeek == "Tuesday" || dayOfWeek == "Thursday")) {
//                         println("We do workout today")
//                         makeAssignment(username)
//                         Future.successful(true)
//                     } else if(days == 3 && (dayOfWeek == "Monday" || dayOfWeek == "Wednesday" || dayOfWeek == "Friday")) {
//                         println("We do workout today")
//                         makeAssignment(username)
//                         Future.successful(true)
//                     } else if(days == 4 && (dayOfWeek == "Monday" || dayOfWeek == "Tuesday" || dayOfWeek == "Wednesday" || dayOfWeek == "Friday")) {
//                         println("We do workout today")
//                         makeAssignment(username)
//                         Future.successful(true)
//                     } else if(days == 5 && (dayOfWeek == "Monday" || dayOfWeek == "Tuesday" || dayOfWeek == "Wednesday" || dayOfWeek == "Thursday" || dayOfWeek == "Friday")) {
//                         println("We do workout today")
//                         makeAssignment(username)
//                         Future.successful(true)
//                     } else {
//                         println("No workout for you today")
//                         Future.successful(false)
//                     }
//                 case None =>
//                     println("ruh roh")
//                     Future.successful(false)
//             }    
//         }
//     }

//     def makeAssignment(username: String): Future[Int] = {
//         val random = new Random()
//         val fitnessGoalFuture = db.run(
//             (for {
//                 user <- Users if user.username === username
//             } yield {
//                 user.fitnessGoal
//             }).result.headOption
//         )

//         fitnessGoalFuture.flatMap { maybeFitnessGoal =>
//             maybeFitnessGoal match {
//                 case Some(Some(fitnessGoal)) => 
//                     println(fitnessGoal)
//                     val rand_workout = random.nextInt(8) + 1
//                     val time = java.sql.Date.valueOf(java.time.LocalDate.now)
//                     if(fitnessGoal == 1) {
//                         val newRow = AssignmentsRow(username, rand_workout, time, null, 10, 4, 1)
//                         println(newRow)
//                         val result = Await.result(db.run(Assignments += newRow), 5.seconds)
//                         Future.successful(result)
//                     } else if(fitnessGoal == 2) {
//                         val newRow = AssignmentsRow(username, rand_workout, time, null, 5, 5, 1)
//                         println(newRow)
//                         val result = Await.result(db.run(Assignments += newRow), 5.seconds)
//                         Future.successful(result)
//                     } else {
//                         val newRow = AssignmentsRow(username, rand_workout, time, null, 1, 1, 1)
//                         println(newRow)
//                         val result = Await.result(db.run(Assignments += newRow), 5.seconds)
//                         Future.successful(result)
//                     }
//                 case None =>
//                     Future.failed(new Exception("User not found"))
//             }    
//         } 
//     }

//  def pullWorkoutExercises(workoutID: Int): Future[Seq[Int]] = {
//      db.run(
//             Workouts.filter(_.workoutId === workoutID).result
//         ).map { workoutExercises =>
//         workoutExercises.map(_.exerciseId)
//      }
//  }

}