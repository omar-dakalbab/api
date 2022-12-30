import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "caravinn"
})

db.connect(function (err) {
    if (err) {
        console.log('Error occured in Database: ' + err);
    } else {
        console.log("Connected to Database");
    }
});
