var DbUtils = require('../utils/dbutils');
var timeStamp = require('time-stamp');
var TaskDB = require('../utils/dbtask');
var shortId = require('shortid');

module.exports = function TaskRoutes(){
    var task = new TaskDB('users');
    var users = new DbUtils('users');
    // SAVE TASK
    this.saveTask = (req, res) => {
        var newTask = req.body;
        newTask.dateCreate = timeStamp('YYYY/MM/DD/HH:mm:ss');
        newTask.id = shortId.generate();
        newTask.completed = false;
        users.verificationUser(req.cookies.token, (err, result) => {
            task.saveTask(result._id, newTask)
        })
        res.end();
    };
    this.getAllTask = (req, res) => {
        users.verificationUser(req.cookies.token, (err, result) => {
            task.getAllTask(result._id, (err, allTask) => {
                res.send(allTask);
            })
        })
    };
    this.deleteTask = (req, res) => {
        users.verificationUser(req.cookies.token, (err, result) => {
            task.deleteTask(result._id, req.body.taskId, (err, result) => {
                if(err)console.log(err);
                else{
                    res.send(result)
                }
            })
        })
    };
    this.editTask = (req, res) => {
        console.log(req.body)
        users.verificationUser(req.cookies.token, (err, result) => {
            task.editTask(result._id, req.body.taskId, req.body.completed)
        })
        res.end();
    }
}