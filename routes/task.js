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
    };
    this.getAllTask = (req, res) => {
        users.verificationUser(req.cookies.token, (err, result) => {
            task.getAllTask(result._id, (err, allTask) => {
                res.send(allTask);
            })
        })
    };
}