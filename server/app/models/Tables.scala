package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends Tables {
  val profile = slick.jdbc.PostgresProfile
}

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Assignments.schema ++ Exercises.schema ++ Users.schema ++ Workouts.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Assignments
   *  @param username Database column username SqlType(varchar), Length(20,true)
   *  @param workoutId Database column workout_id SqlType(int4)
   *  @param dateAssigned Database column date_assigned SqlType(date)
   *  @param dateCompleted Database column date_completed SqlType(date), Default(None)
   *  @param reps Database column reps SqlType(int4)
   *  @param sets Database column sets SqlType(int4)
   *  @param restPeriods Database column rest_periods SqlType(int4) */
  case class AssignmentsRow(username: String, workoutId: Int, dateAssigned: java.sql.Date, dateCompleted: Option[java.sql.Date] = None, reps: Int, sets: Int, restPeriods: Int)
  /** GetResult implicit for fetching AssignmentsRow objects using plain SQL queries */
  implicit def GetResultAssignmentsRow(implicit e0: GR[String], e1: GR[Int], e2: GR[java.sql.Date], e3: GR[Option[java.sql.Date]]): GR[AssignmentsRow] = GR{
    prs => import prs._
    AssignmentsRow.tupled((<<[String], <<[Int], <<[java.sql.Date], <<?[java.sql.Date], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table assignments. Objects of this class serve as prototypes for rows in queries. */
  class Assignments(_tableTag: Tag) extends profile.api.Table[AssignmentsRow](_tableTag, "assignments") {
    def * = (username, workoutId, dateAssigned, dateCompleted, reps, sets, restPeriods).<>(AssignmentsRow.tupled, AssignmentsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(username), Rep.Some(workoutId), Rep.Some(dateAssigned), dateCompleted, Rep.Some(reps), Rep.Some(sets), Rep.Some(restPeriods))).shaped.<>({r=>import r._; _1.map(_=> AssignmentsRow.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6.get, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column username SqlType(varchar), Length(20,true) */
    val username: Rep[String] = column[String]("username", O.Length(20,varying=true))
    /** Database column workout_id SqlType(int4) */
    val workoutId: Rep[Int] = column[Int]("workout_id")
    /** Database column date_assigned SqlType(date) */
    val dateAssigned: Rep[java.sql.Date] = column[java.sql.Date]("date_assigned")
    /** Database column date_completed SqlType(date), Default(None) */
    val dateCompleted: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("date_completed", O.Default(None))
    /** Database column reps SqlType(int4) */
    val reps: Rep[Int] = column[Int]("reps")
    /** Database column sets SqlType(int4) */
    val sets: Rep[Int] = column[Int]("sets")
    /** Database column rest_periods SqlType(int4) */
    val restPeriods: Rep[Int] = column[Int]("rest_periods")

    /** Primary key of Assignments (database name assignments_pkey) */
    val pk = primaryKey("assignments_pkey", (username, workoutId, dateAssigned))

    /** Foreign key referencing Users (database name assignments_username_fkey) */
    lazy val usersFk = foreignKey("assignments_username_fkey", username, Users)(r => r.username, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Workouts (database name assignments_workout_id_fkey) */
    lazy val workoutsFk = foreignKey("assignments_workout_id_fkey", workoutId, Workouts)(r => r.workoutId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Assignments */
  lazy val Assignments = new TableQuery(tag => new Assignments(tag))

  /** Entity class storing rows of table Exercises
   *  @param exerciseId Database column exercise_id SqlType(int4), PrimaryKey
   *  @param exerciseName Database column exercise_name SqlType(varchar), Length(20,true)
   *  @param exerciseDescription Database column exercise_description SqlType(varchar), Length(100,true)
   *  @param exerciseLink Database column exercise_link SqlType(varchar), Length(100,true)
   *  @param exerciseMuscleGroup Database column exercise_muscle_group SqlType(_varchar), Length(10,false) */
  case class ExercisesRow(exerciseId: Int, exerciseName: String, exerciseDescription: String, exerciseLink: String, exerciseMuscleGroup: String)
  /** GetResult implicit for fetching ExercisesRow objects using plain SQL queries */
  implicit def GetResultExercisesRow(implicit e0: GR[Int], e1: GR[String]): GR[ExercisesRow] = GR{
    prs => import prs._
    ExercisesRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String]))
  }
  /** Table description of table exercises. Objects of this class serve as prototypes for rows in queries. */
  class Exercises(_tableTag: Tag) extends profile.api.Table[ExercisesRow](_tableTag, "exercises") {
    def * = (exerciseId, exerciseName, exerciseDescription, exerciseLink, exerciseMuscleGroup).<>(ExercisesRow.tupled, ExercisesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(exerciseId), Rep.Some(exerciseName), Rep.Some(exerciseDescription), Rep.Some(exerciseLink), Rep.Some(exerciseMuscleGroup))).shaped.<>({r=>import r._; _1.map(_=> ExercisesRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column exercise_id SqlType(int4), PrimaryKey */
    val exerciseId: Rep[Int] = column[Int]("exercise_id", O.PrimaryKey)
    /** Database column exercise_name SqlType(varchar), Length(20,true) */
    val exerciseName: Rep[String] = column[String]("exercise_name", O.Length(20,varying=true))
    /** Database column exercise_description SqlType(varchar), Length(100,true) */
    val exerciseDescription: Rep[String] = column[String]("exercise_description", O.Length(100,varying=true))
    /** Database column exercise_link SqlType(varchar), Length(100,true) */
    val exerciseLink: Rep[String] = column[String]("exercise_link", O.Length(100,varying=true))
    /** Database column exercise_muscle_group SqlType(_varchar), Length(10,false) */
    val exerciseMuscleGroup: Rep[String] = column[String]("exercise_muscle_group", O.Length(10,varying=false))
  }
  /** Collection-like TableQuery object for table Exercises */
  lazy val Exercises = new TableQuery(tag => new Exercises(tag))

  /** Entity class storing rows of table Users
   *  @param username Database column username SqlType(varchar), PrimaryKey, Length(20,true)
   *  @param password Database column password SqlType(varchar), Length(20,true)
   *  @param weight Database column weight SqlType(int4), Default(None)
   *  @param heightInches Database column height_inches SqlType(int4), Default(None)
   *  @param fitnessGoal Database column fitness_goal SqlType(int4), Default(None)
   *  @param days Database column days SqlType(int4), Default(None) */
  case class UsersRow(username: String, password: String, weight: Option[Int] = None, heightInches: Option[Int] = None, fitnessGoal: Option[Int] = None, days: Option[Int] = None)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[String], e1: GR[Option[Int]]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[String], <<[String], <<?[Int], <<?[Int], <<?[Int], <<?[Int]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (username, password, weight, heightInches, fitnessGoal, days).<>(UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(username), Rep.Some(password), weight, heightInches, fitnessGoal, days)).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3, _4, _5, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column username SqlType(varchar), PrimaryKey, Length(20,true) */
    val username: Rep[String] = column[String]("username", O.PrimaryKey, O.Length(20,varying=true))
    /** Database column password SqlType(varchar), Length(20,true) */
    val password: Rep[String] = column[String]("password", O.Length(20,varying=true))
    /** Database column weight SqlType(int4), Default(None) */
    val weight: Rep[Option[Int]] = column[Option[Int]]("weight", O.Default(None))
    /** Database column height_inches SqlType(int4), Default(None) */
    val heightInches: Rep[Option[Int]] = column[Option[Int]]("height_inches", O.Default(None))
    /** Database column fitness_goal SqlType(int4), Default(None) */
    val fitnessGoal: Rep[Option[Int]] = column[Option[Int]]("fitness_goal", O.Default(None))
    /** Database column days SqlType(int4), Default(None) */
    val days: Rep[Option[Int]] = column[Option[Int]]("days", O.Default(None))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))

  /** Entity class storing rows of table Workouts
   *  @param workoutId Database column workout_id SqlType(int4)
   *  @param exerciseId Database column exercise_id SqlType(int4) */
  case class WorkoutsRow(workoutId: Int, exerciseId: Int)
  /** GetResult implicit for fetching WorkoutsRow objects using plain SQL queries */
  implicit def GetResultWorkoutsRow(implicit e0: GR[Int]): GR[WorkoutsRow] = GR{
    prs => import prs._
    WorkoutsRow.tupled((<<[Int], <<[Int]))
  }
  /** Table description of table workouts. Objects of this class serve as prototypes for rows in queries. */
  class Workouts(_tableTag: Tag) extends profile.api.Table[WorkoutsRow](_tableTag, "workouts") {
    def * = (workoutId, exerciseId).<>(WorkoutsRow.tupled, WorkoutsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(workoutId), Rep.Some(exerciseId))).shaped.<>({r=>import r._; _1.map(_=> WorkoutsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column workout_id SqlType(int4) */
    val workoutId: Rep[Int] = column[Int]("workout_id")
    /** Database column exercise_id SqlType(int4) */
    val exerciseId: Rep[Int] = column[Int]("exercise_id")

    /** Primary key of Workouts (database name workouts_pkey) */
    val pk = primaryKey("workouts_pkey", (workoutId, exerciseId))

    /** Foreign key referencing Exercises (database name workouts_exercise_id_fkey) */
    lazy val exercisesFk = foreignKey("workouts_exercise_id_fkey", exerciseId, Exercises)(r => r.exerciseId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (workoutId) (database name workouts_workout_id_key) */
    val index1 = index("workouts_workout_id_key", workoutId, unique=true)
  }
  /** Collection-like TableQuery object for table Workouts */
  lazy val Workouts = new TableQuery(tag => new Workouts(tag))
}
