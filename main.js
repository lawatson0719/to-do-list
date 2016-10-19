function registerListItem(id) {
	var listItem = new ListItem(id);
	listItems.push(listItem);
}

function ListItem (id) {
	this.id = id;
	this.completed = false;
}

function addListItem(id) {
	var newTodo = document.createElement("li");
	newTodo.id= "todo" + (idCounter);
	// Create three elements to be inserted into the new todo
	var textSpan = document.createElement("span");
	var itemDeleteButton = document.createElement("button");
	var itemCompleteButton = document.createElement("button");

	// insert the text input into the span
	textSpan.textContent = input.value;

	// add classes to the buttons to control them
	itemCompleteButton.classList.add("complete-button");
	itemDeleteButton.classList.add("delete-button");


	// append the items to the newly created li
	newTodo.appendChild(itemCompleteButton);
	newTodo.appendChild(textSpan);
	newTodo.appendChild(itemDeleteButton);

	// put the new list in the array of objects and append the item to the ul
	list.appendChild(newTodo);
}


// empty array to fill with todo objects
var listItems = [];


var list = document.querySelector("#list-items");
var input = document.querySelector("input");
var showCompleteButton = document.querySelector("#complete-button");
var showIncompleteButton = document.querySelector("#incomplete-button");
var showAllButton = document.querySelector("#show-all-button");
var idCounter = 1;




// main event listener for adding todos
input.addEventListener("keydown", function(e) {
	if (e.keyCode === 13 ) {

		// add a new object to the list array and create a new li to be inserted, both with id references
		// equal to idCounter
		registerListItem(idCounter);
		addListItem(idCounter);
		idCounter++;
		// reset text input to ""
		input.value = "";
	}
})


// Event listener to handle deletions
list.addEventListener("click", function(e) {
	if (e.target.matches(".delete-button")) {
		// grab and remove deleted todo from DOM
		var id = e.target.parentElement.id; 
		var axedItem = document.querySelector("#" + id);
		axedItem.parentElement.removeChild(axedItem);
		

		id = Number(id.slice(4));
		var index = listItems.findIndex((value) => (value.id === id));


		listItems.splice(index, 1);
	} 
})

// Event listener to handle completions
list.addEventListener("click", function(e) {
	if (e.target.matches(".complete-button")) {
		var id = e.target.parentElement.id;
		console.log("You clicked a complete button");

		id = Number(id.slice(4));
		var index = listItems.findIndex((value) => (value.id === id));



		listItems[index].completed = listItems[index].completed ? false : true;
	} 
})


