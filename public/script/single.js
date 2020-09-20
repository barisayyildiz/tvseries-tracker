let list = document.getElementById("nav-tab").children;

for(let i=0; i<list.length; i++)
{
	//console.log(list[i].innerText);
	list[i].innerText = Number(i+1);

}
