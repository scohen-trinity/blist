package models

//FILL IN DB PATH WITH CREDENTIALS AND PATH TO PROJECT BELOW
object CodeGen extends App {
    slick.codegen.SourceCodeGenerator.run(
        "slick.jdbc.PostgresProfile",
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost/tigerfit?user=postgres&password=",
        "C:/Users/Seth Anthony/Documents/WebAppsGroupProj/TigerFit/server/app",
        "models", None, None, true, false
    )
}