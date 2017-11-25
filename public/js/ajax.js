function AJAX(host, rout){
    var host = host;
    var rout = rout;
    //Registration User
    this.post = function(obj, callback){
        var data = JSON.stringify(obj);
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              callback(this.responseText, this.getResponseHeader('Location'));
            }
          });         
          xhr.open("POST", host + rout);
          xhr.setRequestHeader("cache-control", "no-cache");
          xhr.setRequestHeader("content-type", "application/json");
          
          xhr.send(data);
    };
    //Logout User
    this.logout = function(email, callback){
      var data = {};
      data.email = email;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          callback(this.responseText)
        }
      });
      
      xhr.open("DELETE", host + rout);
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("content-type", "application/json");
      
      xhr.send(JSON.stringify(data));
    };
    //Verification User in Index PAge
    this.verificationUser = function(callback){
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          callback(this.responseText)
        }
      });
      
      xhr.open("GET", host + rout);
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("content-type", "application/json");
      
      xhr.send();
    }
}