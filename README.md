# jsonb-db
In-Memory-db for json data in nodejs (javascript or typescript ) application

# installation
install [jsonb-cli](https://github.com/barakaally/jsonb-cli) then type
``jsonb install``
or
``npm install jsonb-db ``

# usage
import json-db module in a project and instatiate JsonbDb class with db name as parameter

```
  const {JsonbDb} = require("jsonb-db");

  const db=new JsonbDb({db:"databaseName"}) ;
  ```

Get list of avalable collections in Db
 
 - ```db.collections()``` 

Create empty collection

 - ```db.createCollection("collectionName")``` 

 create collection with data

- ```db.createCollection("collectionName",data)``` 

rename collection

- ```db.updateCollection("oldcollectionName","oldcollectionName")```

delete collection

- ```db.dropCollection("collectionName")``` 

fetch data from selected collection based on search criteria **NOTE** leave criteria                                                        empty if you want to search all data

- ```db.collection("collectionName").find(criteria)``` 

 skip numbers of rows while retrieving data

- ```db.collection("collectionName").find(criteria).skip(rowcount)```

limit number of output  rows

- ```db.collection("collectionName").find(criteria).take(rowcount)``` 

```db.collection("collectionName").find(criteria).query``` fetch data in readable json format

fetch data and output in  nice look json format 

- ```db.collection("collectionName").find(criteria).pretty()``` 

fetch total number of output can be retrieved for provided criteria

- ```db.collection("collectionName").find(criteria).count()``` 

fetch data and output in  tabular form 

- ```db.collection("collectionName").find(criteria).table()``` 

Convert response to object 

- ```db.collection("collectionName").find(criteria).toObject``` 

insert object into a collection, new collection will be created if not exist

- ```db.collection("collectionName").insert(value)``` 

insert many object into a collection, new collection will be created if not existed

- ```db.collection("collectionName").insertMany(values)``` 

delete items inside a collection based on search criteria

- ```db.collection("collectionName").remove(criteria)``` 

update items in a collection based on search criteria

- ```db.collection("collectionName").update(criteria,value)``` 

