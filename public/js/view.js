function VIEW(){
    var backgroundTask = ['cyan', 'bisque', 'gold', 'lime', 'CornflowerBlue'];
    function task(task){
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.background = task.background;
        var h3 = document.createElement('h3');
        h3.textContent = task.subject;
        var p = document.createElement('p');
        p.textContent = task.text;
        var span = document.createElement('span');
        span.textContent = task.dateCreate;
        gridItem.dataset.id = task.id;
        gridItem.appendChild(h3)
        gridItem.appendChild(p)
        gridItem.appendChild(span);
        return gridItem;
    };
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
    this.renderList = function(obj, parentElem){
        parentElem.innerHTML = '';
        var grid = document.createElement('div');
        grid.className = 'grid';
        obj.forEach(element => {
            grid.appendChild(task(element));
        });
        parentElem.appendChild(grid);
    };
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
               var task = {};
                task.subject = this.querySelector('input').value;
                task.text = this.querySelector('textarea').value;
                Array.prototype.forEach.call(this.querySelectorAll('li'), li => {
                    if(JSON.parse(li.dataset.choice)){
                        task.background = li.dataset.background;
                    }
                })
                callback(task)
            }
       }) 
    }
}