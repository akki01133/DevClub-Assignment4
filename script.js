console.log("Loaded script.js");

let req = new XMLHttpRequest();
req.open("GET","https://api.covid19api.com/summary",false)
req.send();

let data = JSON.parse(req.response)
let Global = data.Global
let India = data.Countries[77]

document.querySelector("#tgc").textContent = Global.TotalConfirmed
document.querySelector("#ngc").innerText = `+${Global.NewConfirmed}`
document.querySelector("#ngd").textContent = `+${Global.NewDeaths}`
document.querySelector("#tgd").textContent = Global.TotalDeaths

document.querySelector("#tic").textContent = India.TotalConfirmed
document.querySelector("#nic").textContent = `+${India.NewConfirmed}`
document.querySelector("#tid").textContent = India.TotalDeaths
document.querySelector("#nid").textContent = `+${India.NewDeaths}`


let tDate = new Date();
let lDate = new Date();
lDate.setMonth(lDate.getMonth()-1);

tDate = tDate.toLocaleDateString().split('/');
lDate = lDate.toLocaleDateString().split('/');

tDay = Number(tDate[1])-1

req.open("GET",`https://api.covid19api.com/country/India/status/confirmed?from=${lDate[2]}-${lDate[0]}-${lDate[1]}T00:00:00Z&to=${tDate[2]}-${tDate[0]}-${tDay}T00:00:00Z`,false)
req.send();

let confirmedCases=[]
let confirmDates=[]

data = JSON.parse(req.response)

for (let i=0; i<data.length-1; i++){
    confirmDates.push(data[i+1].Date.slice(0,-10))
    confirmedCases.push(data[i+1].Cases-data[i].Cases)
}
let myChart = document.getElementById('covid-linechart').getContext('2d')

let lineChart = new Chart(myChart,{
	type:'line',
	data:{
		labels: confirmDates,
		datasets :[{
			label:'confirmed cases in India',
			data: confirmedCases,
			backgroundColor: 'rgb(0, 99, 132)',
      		borderColor: 'rgb(0, 99, 132)',
		}]
	},
	options:{}
});