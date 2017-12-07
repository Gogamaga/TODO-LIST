function RequestTask(host, rout){
    var host = host;
    var rout = rout;
    
    this.deleteTaskRequest = function(taskId, callback){
        var data = JSON.stringify({taskId : taskId});
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                callback(this.responseText);
            }
        });         
        xhr.open("DELETE", host + rout);
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json");
          
        xhr.send(data);
    };
    this.editTaskRequest = function(taskId, completed, callback){
        var data = JSON.stringify({taskId : taskId, completed : completed});
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                callback(this.responseText);
            }
        });         
        xhr.open("PUT", host + rout);
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json");
          
        xhr.send(data);
    }
}