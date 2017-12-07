(function(){
    var view = new VIEW();
    var verificationUser = new AJAX('http://localhost:4500', '/verification');
    var logout = new AJAX('http://localhost:4500', '/logout');
    var tasks = new AJAX('http://localhost:4500', '/task');
  

    //RENDER USER INFO or REGISTRATION LINK
    verificationUser.verificationUser(function(result){
        view.toggleInfoUser(result, function(userEmail){
            logout.logout(userEmail, res => {
                window.location = res;
            })
        });
    })

    //LEFT MENU
    document.querySelector('aside').addEventListener('click', function(e){
        var icon = this.children;
        if(e.target.closest('.setting')){
            Array.prototype.forEach.call(icon, elem => {
                elem.classList.toggle('active')
            })
        }
    });
 
    document.querySelector('aside').addEventListener('click', function(e){
        // CREATE TASK
        if(e.target.closest('.add-file')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '';
            view.renderFormCreateTask(wrap, task => {
                tasks.post(task, res => {
                    console.log(res)
                })
            }); 
        //GET ALL TASK
        }else if(e.target.closest('.all-file')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '<img src="/images/procces.gif" alt="" class="iconProccees">'
            tasks.verificationUser((res) => {
                var tasks = JSON.parse(res);
                view.renderList(tasks.task, wrap);
            })
        //GET NOT COMPLETED TASK
        }else if(e.target.closest('.not-complete')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '<img src="/images/procces.gif" alt="" class="iconProccees">'
            tasks.verificationUser((res) => {
                var tasks = JSON.parse(res)
                var notComplete = tasks.task.filter(elem => {
                    return !elem.completed;
                });
                view.renderList(notComplete, wrap);
            })
        // GET COMPLETED TASK    
        }else if(e.target.closest('.check-file')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '<img src="/images/procces.gif" alt="" class="iconProccees">'
            tasks.verificationUser((res) => {
                var tasks = JSON.parse(res)
                var complete = tasks.task.filter(elem => {
                    return elem.completed;
                });
                view.renderList(complete, wrap);
            })
        }
    });
    //SHOW TOOLTIP
    document.querySelector('.container').addEventListener('mouseover', function(e){
        if(!e.target.closest('.setting')){
            view.showTooltip(e)
        }   
    });
    //HIDE TOOLTIP
    document.querySelector('.container').addEventListener('mouseout', function(e){
        view.hideTooltip(e)
    });

    
    
})();
