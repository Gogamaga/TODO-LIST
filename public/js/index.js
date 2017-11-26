(function(){
    var verificationUser = new AJAX('http://localhost:4500', '/verification');
    verificationUser.verificationUser(function(result){
        document.querySelector('nav>ul>li:last-child').innerHTML = result;
        if(document.querySelector('.infoUser .logout')){
            document.querySelector('.infoUser .logout').addEventListener('click', function(e){
                e.preventDefault();
                var logout = new AJAX('http://localhost:4500', '/logout');
                var userEmail =  this.previousElementSibling.previousElementSibling.dataset.email;
                logout.logout(userEmail, function(res){
                    window.location = res;
                });
            });
        }
    })

    //MENU
    document.querySelector('aside').addEventListener('click', function(e){
        var icon = this.children;
        if(e.target.closest('.setting')){
            Array.prototype.forEach.call(icon, elem => {
                elem.classList.toggle('active')
            })
        }
    });
    //CREATE TASK
    var tasks = new AJAX('http://localhost:4500', '/task');
    //GET ALL TASK
    var view = new VIEW();
    
    document.querySelector('aside').addEventListener('click', function(e){
        if(e.target.closest('.add-file')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '';
            view.renderFormCreateTask(wrap, task => {
                tasks.post(task, res => {
                    console.log(res)
                })
            }); 
        }else if(e.target.closest('.all-file')){
            var wrap = document.querySelector('.wrap');
            wrap.innerHTML = '<img src="/images/procces.gif" alt="" class="iconProccees">'
            tasks.verificationUser((res) => {
                var tasks = JSON.parse(res)
                view.renderList(tasks.task, wrap);
                var masonry = new Masonry(document.querySelector('.grid'), {
                itemSelector : '.grid-item',
                horizontalOrder: true,
                gutter: 25
                });
            })
        }
    })
})();
