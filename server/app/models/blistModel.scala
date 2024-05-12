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
}