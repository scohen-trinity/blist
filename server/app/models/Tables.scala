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
  lazy val schema: profile.SchemaDescription = Hobbies.schema ++ Users.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Hobbies
   *  @param hobbyId Database column hobby_id SqlType(serial), AutoInc, PrimaryKey
   *  @param hobbyName Database column hobby_name SqlType(varchar), Length(100,true)
   *  @param hobbyDescription Database column hobby_description SqlType(varchar), Length(1000,true) */
  case class HobbiesRow(hobbyId: Int, hobbyName: String, hobbyDescription: String)
  /** GetResult implicit for fetching HobbiesRow objects using plain SQL queries */
  implicit def GetResultHobbiesRow(implicit e0: GR[Int], e1: GR[String]): GR[HobbiesRow] = GR{
    prs => import prs._
    HobbiesRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table hobbies. Objects of this class serve as prototypes for rows in queries. */
  class Hobbies(_tableTag: Tag) extends profile.api.Table[HobbiesRow](_tableTag, "hobbies") {
    def * = (hobbyId, hobbyName, hobbyDescription).<>(HobbiesRow.tupled, HobbiesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(hobbyId), Rep.Some(hobbyName), Rep.Some(hobbyDescription))).shaped.<>({r=>import r._; _1.map(_=> HobbiesRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column hobby_id SqlType(serial), AutoInc, PrimaryKey */
    val hobbyId: Rep[Int] = column[Int]("hobby_id", O.AutoInc, O.PrimaryKey)
    /** Database column hobby_name SqlType(varchar), Length(100,true) */
    val hobbyName: Rep[String] = column[String]("hobby_name", O.Length(100,varying=true))
    /** Database column hobby_description SqlType(varchar), Length(1000,true) */
    val hobbyDescription: Rep[String] = column[String]("hobby_description", O.Length(1000,varying=true))

    /** Uniqueness Index over (hobbyName) (database name hobbies_hobby_name_key) */
    val index1 = index("hobbies_hobby_name_key", hobbyName, unique=true)
  }
  /** Collection-like TableQuery object for table Hobbies */
  lazy val Hobbies = new TableQuery(tag => new Hobbies(tag))

  /** Entity class storing rows of table Users
   *  @param userId Database column user_id SqlType(serial), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(varchar), Length(200,true)
   *  @param password Database column password SqlType(varchar), Length(200,true) */
  case class UsersRow(userId: Int, username: String, password: String)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (userId, username, password).<>(UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(userId), Rep.Some(username), Rep.Some(password))).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column user_id SqlType(serial), AutoInc, PrimaryKey */
    val userId: Rep[Int] = column[Int]("user_id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(varchar), Length(200,true) */
    val username: Rep[String] = column[String]("username", O.Length(200,varying=true))
    /** Database column password SqlType(varchar), Length(200,true) */
    val password: Rep[String] = column[String]("password", O.Length(200,varying=true))

    /** Uniqueness Index over (username) (database name users_username_key) */
    val index1 = index("users_username_key", username, unique=true)
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))
}
