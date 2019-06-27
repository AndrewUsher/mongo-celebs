# Adding To Database
mongoimport --host localhost:27017 --db birthdays --collection birthdays --file data.json --jsonArray &

# Exporting db
mongoexport --host localhost:27017 --db birthdays --collection birthdays

