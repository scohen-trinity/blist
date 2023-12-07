package models

//FILL IN DB PATH WITH CREDENTIALS AND PATH TO PROJECT BELOW
object CodeGen extends App {
    slick.codegen.SourceCodeGenerator.run(
        "slick.jdbc.PostgresProfile",
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost/tigerfit?user=sbpappas&password=password",
        "/Users/Samuel/Desktop/Fall 2023/Web Apps/TigerFit/server/app/",
        "models", None, None, true, false
    )
}