window.addEventListener('load', () => {
	add = JSON.parse(localStorage.getItem('add')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-medicine-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		add.push(todo);

		localStorage.setItem('add', JSON.stringify(add));

		// Reset the form
		e.target.reset();

		Displayadd()
	})

	Displayadd()
})

function Displayadd () {
	const med = document.querySelector('#medicine-list');
	med.innerHTML = "";

	add.forEach(todo => {
		const listItem = document.createElement('div');
		listItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'Night') {
			span.classList.add('Night');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		listItem.appendChild(label);
		listItem.appendChild(content);
		listItem.appendChild(actions);

		med.appendChild(listItem);

		if (todo.done) {
			listItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('add', JSON.stringify(add));

			if (todo.done) {
				listItem.classList.add('done');
			} else {
				listItem.classList.remove('done');
			}

			Displayadd()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('add', JSON.stringify(add));
				Displayadd()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			add = add.filter(t => t != todo);
			localStorage.setItem('add', JSON.stringify(add));
			Displayadd()
		})

	})
}