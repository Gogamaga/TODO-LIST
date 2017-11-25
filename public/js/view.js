function VIEW(){
    function createTask(task){
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
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
    }
    this.renderList = function(obj, parentElem){
        obj.forEach(element => {
            parentElem.appendChild(createTask(element));
        });
    }
}