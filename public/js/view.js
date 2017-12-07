var requestTask = new RequestTask('http://localhost:4500', '/task');


function VIEW(){
    var backgroundTask = ['cyan', 'bisque', 'gold', 'lime', 'CornflowerBlue'];
    var imgSettingTask = [{ src : "/images/icons8-cancel-64.png", className : 'deleteTask', tooltip : "Delete Task", eventHandler : deleteTask}, { src : "/images/icons8-check-file-64.png", className : 'checkTask',tooltip : "Check Task", eventHandler : changeStatusCompleted}, {src : "/images/icons8-round-512 (2).png", className : '', tooltip : "", eventHandler : deleteTask}, { src : "/images/icons8-edit-file-64.png", className : 'editTask', tooltip : "Edit Task", eventHandler : deleteTask}];
    
    //DELETE TASK
    function deleteTask(e){
        var masonry = new Masonry(document.querySelector('.grid'), {
            itemSelector : '.grid-item',
            horizontalOrder: true,
            gutter: 25
        });
        var elemTask = e.target.closest('.grid-item');
        var taskId = elemTask.dataset.id;
        requestTask.deleteTaskRequest(taskId, res => {
            var result = JSON.parse(res);
            if(result.ok){
                elemTask.parentNode.removeChild(elemTask);
                masonry.layout()
            }
        })
    }
    //CHANGE STATUS COMPLETED TASK
    function changeStatusCompleted(e){
        var elemTask = e.target.closest('.grid-item');
        var taskId = elemTask.dataset.id;
        var completedTask = JSON.parse(elemTask.dataset.completed);
        requestTask.editTaskRequest(taskId, !completedTask, function(){});
        elemTask.dataset.completed = !completedTask;
        if(JSON.parse(elemTask.dataset.completed)){
            elemTask.style.opacity = 0.4;
        }else{
            elemTask.style.opacity = 1;
        }
    }
    //SETTING TASK
    function settingTask(){
        var divTest = document.createElement('div');
        divTest.className = 'test';
        var divCircle = document.createElement('div');
        divCircle.className = 'circle';
        divTest.appendChild(divCircle);
        imgSettingTask.forEach((elem, index) => {
            var imgSetTask = document.createElement('img');
            imgSetTask.src = elem.src;
            imgSetTask.className = elem.className;
            imgSetTask.dataset.tooltip = elem.tooltip;
            imgSetTask.addEventListener('click', elem.eventHandler)
            divCircle.appendChild(imgSetTask);
        });
        return divTest;
    };
    //TASK
    function task(task){
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.background = task.background;
        gridItem.appendChild(settingTask())
        var imgSettingTask = document.createElement('img');
        imgSettingTask.className = 'imgSettingTask';
        imgSettingTask.src = '/images/icons8-automation-64.png';
        gridItem.appendChild(imgSettingTask);
        var h3 = document.createElement('h3');
        h3.textContent = task.subject;
        var p = document.createElement('p');
        p.textContent = task.text;
        var span = document.createElement('span');
        span.textContent = task.dateCreate;
        gridItem.dataset.id = task.id;
        gridItem.dataset.completed = task.completed;
        if(task.completed)gridItem.style.opacity = 0.4;
        gridItem.appendChild(h3)
        gridItem.appendChild(p)
        gridItem.appendChild(span);
        return gridItem;
    };
    //FORM CREATE TASK
    function formCreateTast(){
        var createTask = document.createElement('div');
        createTask.className = 'createTask';
        var h1 = document.createElement('h1');
        h1.textContent = 'Create Task';
        createTask.appendChild(h1);
        var ul = document.createElement('ul');
        ul.className = 'choiceColorTask';
        backgroundTask.forEach( color => {
            var li = document.createElement('li');
            li.style.background = color;
            li.dataset.background = color;
            li.dataset.choice = false;
            ul.appendChild(li); 
        });
        var liFirstChild = ul.firstElementChild;
        liFirstChild.dataset.choice = true;
        liFirstChild.style.border = '4px solid rgba(253, 254, 254, 0.8)';
        createTask.appendChild(ul);
        var input = document.createElement('input');
        input.type = 'text';
        createTask.appendChild(input);
        var textArea = document.createElement('textarea');
        textArea.cols = '30';
        textArea.rows = '10';
        textArea.name = 'taskText';
        createTask.appendChild(textArea);
        var button = document.createElement('button');
        button.type = 'submit';
        button.name = 'create';
        button.textContent = 'Create';
        createTask.appendChild(button);
        return createTask;
    }
    //RENDER LIST
    this.renderList = function(obj, parentElem, callback){
        parentElem.innerHTML = '';
        var grid = document.createElement('div');
        grid.className = 'grid';
        obj.forEach(element => {
            grid.appendChild(task(element));
        });
        parentElem.appendChild(grid);
        document.querySelector('.grid').addEventListener('click', function(e){
            if(e.target.closest('.imgSettingTask')){
                e.target.parentElement.querySelector('.test').classList.toggle('active');
                e.target.parentElement.querySelector('.test img:nth-child(3)').classList.toggle('active');
            }
        });
        var masonry = new Masonry(document.querySelector('.grid'), {
            itemSelector : '.grid-item',
            horizontalOrder: true,
            gutter: 25
        });
    };
    //RENDER FORM CREATE TASK
    this.renderFormCreateTask = function(parentElem, callback){
        parentElem.appendChild(formCreateTast());
        document.querySelector('.choiceColorTask').addEventListener('click', function(e){
           if(e.target.closest('li')){
            Array.prototype.forEach.call(this.children, li => {
                li.dataset.choice = false;
                li.style.border = '';
           });
                e.target.dataset.choice = true;
                e.target.style.border = '4px solid rgba(253, 254, 254, 0.8)';
            }
       });
       document.querySelector('.createTask').addEventListener('click', function(e){
           if(e.target.closest('button')){
               console.error('task')
               var task = {};
                task.subject = this.querySelector('input').value;
                if(!task.subject){
                    task.subject = 'no subject';
                }
                task.text = this.querySelector('textarea').value;
                Array.prototype.forEach.call(this.querySelectorAll('li'), li => {
                    if(JSON.parse(li.dataset.choice)){
                        task.background = li.dataset.background;
                    }
                })
                callback(task)
            }
       }) 
    };
    this.toggleInfoUser = function(result, callback){
        var user = JSON.parse(result);
        var infoUser = document.querySelector('nav>ul>li:last-child');
        if(!user.success){
            infoUser.innerHTML = '<li><a href="/login">Log In or Registration</a></li>';
        }else{
            infoUser.innerHTML = '<span class="userLogo"><a href="#">' + user.result.login.slice(0,1).toUpperCase() + '</a></span><ul class="infoUser"><li>' + user.result.login + '</li><li  data-email="' + user.result.email + '">' + user.result.email + '</li><li></li><li class="logout"><a href="#">Log Out</a></li></ul>';
            document.querySelector('.userLogo').addEventListener('click', function(e){
                e.preventDefault();
                document.querySelector('.infoUser').classList.toggle('active');
            })
            document.querySelector('.infoUser .logout').addEventListener('click', function(e){
               e.preventDefault();
               var userEmail = this.previousElementSibling.previousElementSibling.dataset.email;
               callback(userEmail); 
            })
        }
    };
    // TOOLTIP
    this.showTooltip = function (e){
        // var span = document.createElement('span');
        // span.className = 'tooltip';
        if(e.target.dataset.tooltip){
            var span = document.querySelector('.tooltip');
            span.innerHTML = e.target.dataset.tooltip;
            span.style.left = (e.pageX + 2) + 'px';
            span.style.top = (e.pageY + 2) + 'px';
            span.style.display = 'block';
            // document.body.appendChild(span);
        } 
    };
    this.hideTooltip = function(e){
        var span = document.querySelector('span.tooltip');
        if(e.target.dataset.tooltip)
        span.style.display = 'none';
        // document.body.removeChild(span)
    }
}