/*this is so we can store the tasks in the local storage using the JSON 
JSON allwos for formating and storing data*/
window.addEventListener('load', () => {
    /*if there's any to do in our local storage we're gonna get those*/
	 todos= JSON.parse( localStorage.getItem('todos')) || [];
    /*using parse we can create objects from a json string*/
	/*querySelector() returns the first Element within the document that matches the specified selector*/
	const nameInput = document.querySelector('#nameinsert');
	const newTodoForm = document.querySelector('#newtodo');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;
	/*listen to anychange to our name input zone*/
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		/*to prevent the page relaoding when creating the new todo list form*/
		e.preventDefault();
		/*creating a to do item and getting the data of it*/
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
		}
		/*adding our new to do item to our to do list*/

		todos.push(todo);
		/*turning our to do array to a string and saving it into our storage*/

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form after creating a to do
		e.target.reset();

		DisplayTodos();
	})

})

 function DisplayTodos(){
	const todolistdisplay=document.querySelector('#todolistmain');
	todolistdisplay.innerHTML='';
	/*creation of the the whole to do element inculding the labet , the edit + delete button for every element in todos array using foreach*/
	todos.forEach(todo => {
		const todoitem = document.createElement('div');
		todoitem.classList.add('todoitem');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		
		/*creating an instance of input to test on it mainly test if an element done is not*/ 
		input.type='checkbox';
		input.checked=todo.done;
		span.classList.add('bubble');
		/*condition to see where to add the task depending on the class business or personal*/
		if(todo.category == 'personal'){
			span.classList.add('personal');
		}else{
			span.classList.add('business');
		}

		/*after verifying in what class is our task , we add it to our todoitem bubble*/
		/*creating a todo with it's content , action buttons*/
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		/*here we edit the content of todoitem , to the content of the variable we inserted 
		CREATION OF THE NECESSARY CODE SO WE ACTUALLY SEE THE CODE ON THE SCREEN BY CHANGING THE DIV USING INNERHTML*/
		
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoitem.appendChild(label);
		todoitem.appendChild(content);
		todoitem.appendChild(actions);

		todolistdisplay.appendChild(todoitem);

		if (todo.done) {
			todoitem.classList.add('done');
		}


		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todo));

			if (todo.done) {
				todoitem.classList.add('done');
			} else {
				todoitem.classList.remove('done');
			}

			DisplayTodos()

		})
	

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})


		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})






 })
}
