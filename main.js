function registerListItem(id, content) {
	var listItem = new ListItem(id, content);
	data.push(listItem);
}

function ListItem (id, content) {
	this.id = id;
	this.completed = false;
	this.content = content;
}

function addListItem(id, content) {
	var newTodo = document.createElement("li");
	newTodo.classList.add("to-do");
	newTodo.id= "todo" + (idCounter);
	// Create three elements to be inserted into the new todo
	var textSpan = document.createElement("span");
	var itemDeleteButton = document.createElement("button");
	var itemCompleteButton = document.createElement("input");
	itemCompleteButton.setAttribute("type","checkbox");

	// insert the text input into the span
	textSpan.textContent = content;

	// add classes to the buttons to control them
	itemCompleteButton.classList.add("complete-button");
	itemDeleteButton.classList.add("delete-button");
	itemDeleteButton.textContent = "X";


	// append the items to the newly created li
	newTodo.appendChild(itemCompleteButton);
	newTodo.appendChild(textSpan);
	newTodo.appendChild(itemDeleteButton);

	// put the new list in the array of objects and append the item to the ul
	list.appendChild(newTodo);
}

function refreshDisplay (mode) {
	// This garbage function is going to have to run a stupid motherfucking loop every time you need 
	// to refresh what's in the list items
	for (var i = list.children.length - 1; i >= 0; i-- ) {
		var removingChild = list.children[i];
		list.removeChild(removingChild);
	}

	if (mode === 0) {
		for (var i = 0 ; i < data.length ; i++) {
			console.log(data[i].content);
			addListItem(data[i].id, data[i].content);
		}


		displaying = 0;
	}


	if (mode === 1) {
		// filter


		for (var i = 0 ; i < data.length ; i++) {
			console.log("Yo");
		}

		displaying = 1;
	}


	if (mode === 2) {
		// filter

		for (var i = 0 ; i < data.length ; i++) {
			console.log("Yo");
		}

		displaying = 2;
	}

}

// empty array to fill with todo objects
var data = [];

var list = document.querySelector("#list-items");
var input = document.querySelector("input");
var showCompleteButton = document.querySelector("#complete-button");
var showActiveButton = document.querySelector("#active-button");
var showAllButton = document.querySelector("#show-all-button");
var idCounter = 1;


var displaying = 0; // 0 - All
					// 1 - Active
					// 2 - Completed



// main event listener for adding todos
input.addEventListener("keydown", function(e) {
	if (e.keyCode === 13 && input.value != "") {

		// add a new object to the list array and create a new li to be inserted, both with id references
		// equal to idCounter
		registerListItem(idCounter, input.value);
		addListItem(idCounter, input.value);
		idCounter++;
		// reset text input to ""
		input.value = "";
	}
});


// Event listener to handle deletions
list.addEventListener("click", function(e) {
	if (e.target.matches(".delete-button")) {
		// grab and remove deleted todo from DOM
		var id = e.target.parentElement.id; 
		var axedItem = document.querySelector("#" + id);
		axedItem.parentElement.removeChild(axedItem);
		

		id = Number(id.slice(4));
		var index = data.findIndex((value) => (value.id === id));


		data.splice(index, 1);
	} 
});

// Event listener to handle completions
list.addEventListener("click", function(e) {
	if (e.target.matches(".complete-button")) {
		var id = e.target.parentElement.id;

		id = Number(id.slice(4));
		var index = data.findIndex((value) => (value.id === id));



		data[index].completed = data[index].completed ? false : true;
	} 
});

// Event listener to handle all filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#show-all-button") && !(displaying === 0)) {
		refreshDisplay(0);
	}
});

// Event listener to handle active filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#active-button") && !(displaying === 0)) {
		refreshDisplay(1);
	}
});

// Event listener to handle completed filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#completed-button") && !(displaying === 2)) {
		refreshDisplay(2);
	}
});