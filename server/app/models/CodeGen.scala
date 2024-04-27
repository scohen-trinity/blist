package models

//FILL IN DB PATH WITH CREDENTIALS AND PATH TO PROJECT BELOW
object CodeGen extends App {
    slick.codegen.SourceCodeGenerator.run(
        "slick.jdbc.PostgresProfile",
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost/blist?user=blist&password=password",
        "C:/Users/sammy/Downloads/bulletin/blist/server/app",
        "models", None, None, true, false
    )
}