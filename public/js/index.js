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
    // var grid = document.querySelector('.grid');
    // var masonry = new Masonry(grid, {
    //     itemSelector : '.grid-item',
    //     // columnWidth: 200,
    //     horizontalOrder: true,
    //     //fitWidth: true,
    //     gutter: 25
    // });

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
    // document.querySelector('.createTask').addEventListener('click', function(e){
    //     if(e.target.closest('button')){
    //         var task = {};
    //         task.subject = this.querySelector('input').value;
    //         task.text = this.querySelector('textarea').value;
    //         tasks.post(task, function(res){
    //             console.log(res)
    //         })
    //     }
    // });
    //GET ALL TASK
    var view = new VIEW();
    tasks.verificationUser((res) => {
        var tasks = JSON.parse(res)
        view.renderList(tasks.task, document.querySelector('.grid'))
        var grid = document.querySelector('.grid');
    var masonry = new Masonry(grid, {
        itemSelector : '.grid-item',
        // columnWidth: 200,
        horizontalOrder: true,
        //fitWidth: true,
        gutter: 25
    });
    })
})();
