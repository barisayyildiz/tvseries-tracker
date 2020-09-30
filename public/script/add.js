
document.getElementById('seriesname').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

    	search();

    }
});


document.getElementById("btn").onclick = () => {

	search();

}

const search = () => {

	let input = document.getElementById("seriesname");
	let text = input.value;

	let temp = text.split(" ");

	let name = "";
	temp.forEach(item => {

		name += item + "+";

	})

	fetch("/save", {

		method: "POST",
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
		body: JSON.stringify({name : name})

	})
	.then(response => response.json())
	.then(data => {

		let node = document.querySelector(".responses ul");
		let child = document.createElement("li");
		child.innerText = data.name;
		node.appendChild(child);

	})
}
