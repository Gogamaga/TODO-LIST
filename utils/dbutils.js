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
    this.findAll = (callback) => {
        connectDB((err, db) => {
            db.collection(collectionName).find().toArray((err, result) => {
                callback(err, result);
            })
        })
    };
    this.save = function (obj, callback){
        connectDB((err, db) => {
            db.collection(collectionName).insert(obj, (err, result) => {
                callback(err, result)
            })
        })
    };
    this.findById = (id, callback) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).findOne({ _id : ObjectId(id)}, (err, result) => {
                    callback(err, result);
                })
            }
        })
    };
    this.findOne = (userLogin, callback) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).findOne({ login : userLogin}, (err, result) => {
                    callback(err, result);
                })
            }
        })
    };
    this.findOne1 = (obj, callback) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).findOne(
                    obj , (err, result) => {
                        callback(err, result);
                    }
                )
            }
        })
    }
    this.delete = (id) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).remove({ _id : ObjectId(id)});
            }
        })
    }
    this.logInUser = (id, val) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).update({ _id : ObjectId(id)}, {$push : {cookies : {cookiesVal : val, exsDate : new Date().getTime() + (1000 * 180)}}});
            }
        })
    };
    this.logout = (em, cook) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).update( { email : em}, 
                    { $pull : { cookies : { cookiesVal : cook}}})
            }
        })
    };
    this.verificationUser = (cook, callback) => {
        connectDB((err, db) => {
            if(err)console.log(err);
            else{
                db.collection(collectionName).findOne({ cookies : {$elemMatch: {cookiesVal: cook}}}, (err, res) => 
            callback(err, res)
            )}
        })
    }
}