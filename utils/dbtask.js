var dataBase = require('mongodb').MongoClient;
var dbConfig = require('../config/dbconfig');
var ObjectId = require('mongodb').ObjectID;
module.exports = function DATABASE(collectionName){
    var collectionName = collectionName;
    function connectDB (callback) {
        dataBase.connect(dbConfig.dbUrl, (err, db) => {
            callback(err, db);
        })
    };
    this.saveTask = (id, newTask) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).update({ _id : ObjectId(id)}, {$push : {task : newTask}}, (err, result) => {
                    console.log(err)
                })
            }
        })
    };
    this.getAllTask = (id, callback) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).findOne({ _id : ObjectId(id)}, { task : true, _id : false}, (err, res) => {
                    callback(err, res)
                })
            }
        })
    }
}