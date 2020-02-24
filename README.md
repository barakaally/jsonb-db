# jsonb-db
In-Memory-db for json data in nodejs (javascript or typescript ) application

# installation
install [json-cli](https://github.com/barakaally/jsonb-cli) then type
``json install``
or
``npm install jsonb-db ``

# usage
import json-db module in a project

```const db = require("jsonb-db");```

```db.collections()``` get list of avalable collections in Db

```db.createCollection("collectionName")``` create empty collection

```db.createCollection("collectionName",data)``` create collection with data

```db.collection("collectionName")``` select collection to use

```db.collection("collectionName").find(criteria)``` fetch data from selected collection based on search criteria **NOTE** leave criteria                                                        empty if you want to search all data

```db.collection("collectionName").find(criteria).skip(rowcount)``` skip numbers of rows while retriving data

```db.collection("collectionName").find(criteria).take(rowcount)``` limit number of rows

```db.collection("collectionName").find(criteria).query``` fetch data in readable json format

```db.collection("collectionName").find(criteria).pretty()``` fetch data and output in  nice look json format 

```db.collection("collectionName").find(criteria).table()``` fetch data and output in  tabular form 

```db.collection("collectionName").find(criteria).toObject``` Convert response to object 

```db.collection("collectionName").insert(value)``` insert object into a Database, new collection will be created if not exist

```db.collection("collectionName").insertMany(values)``` insert many object into a Database, new collection will be created if not existed

```db.collection("collectionName").update(criteria,value)``` update items in a Database based on search criteria

