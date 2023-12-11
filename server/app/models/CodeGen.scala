package models

//FILL IN DB PATH WITH CREDENTIALS AND PATH TO PROJECT BELOW
object CodeGen extends App {
    slick.codegen.SourceCodeGenerator.run(
        "slick.jdbc.PostgresProfile",
        "org.postgresql.Driver",
        "C:/Users/sammy/Downloads/Web Apps/TigerFit/server/app",
        "jdbc:postgresql://localhost/tigerfit?user=scohen&password=password",
        "models", None, None, true, false
    )
}