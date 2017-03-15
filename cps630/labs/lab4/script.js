var todo_url = 'todo.json'

function requestTodo()
{
	var request = new XMLHttpRequest();
	request.open('GET', todo_url, true);
	request.onload = function ()
	{
		if (request.status >= 200 && request.status < 400)
		{
			log('requestTodo', request.responseText);
			renderHTML(JSON.parse(request.responseText));

		}
	}
	request.onerror = function () 
	{ 
		var error='Request dropped? error'; 
		alert(error); 
		log('requestTodo', error);
	};
	request.send();
}

function renderTodo(object)
{
	var object_html = '<div class="col-12"><h2>'+object.title+'</h2></div>'
	+'<div class="col-12"><p>'+object.complete+'</p></div>'
	+'<div class="col-12"><p>'+object.description+'</p></div>';

	return object_html;
}

function renderHTML(list)
{
	var list_html = '';
	var list_container = document.getElementById('list_container');

	for (var i = 0; i < list.length; i++)
	{
		log('renderHTML', i+" : "+renderTodo(list[i]));
		list_html = list_html + renderTodo(list[i]);
	}

	list_container.innerHTML = list_html;
}

function log(tag, message)
{
	console.log("["+tag+"]"+" : "+ message);
}