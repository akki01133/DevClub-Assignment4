const http = require("http");

let hostname = '127.0.0.1'
let port = 8080

const SLIST = ["CIGAR","CRANE","AJEET","THING","DELHI","CHINA","COVID","MILKY","CLOCK","PHONE"]

//choosing a random word from the list. this word doesn't change until the server restarts!
const SECRET = SLIST[Math.floor((Math.random() * 10))];

function myFunction(req, res) {
	const GUESS = String(req.url.split('q=')[1]).toUpperCase()
	let ans = ""
	if (GUESS != undefined && GUESS.length == 5) {
		for (let i = 0; i < 5; i++) {
			if (GUESS[i] == SECRET[i]) {
				ans += 'g'
			} else if (SECRET.includes(GUESS[i])) {
				ans += 'y'
			}
			else {
				ans += "b"
			}
		}
		res.statusCode = 200

	}
	else {
		ans = "Bad Request"
		res.statusCode = 400
	}

	let feedback = generateHTML(ans)

	res.setHeader('Content-Type', 'text/html')
	res.write(feedback);
	res.end();
}

function callBack() {
	console.log(`sever is running at http://${hostname}:${port}/`)
}

http.createServer(myFunction).listen(port, hostname, callBack);


//just adding an additional feature to show the output in colorfull manner
function generateHTML(ans) {
	function beautify(word) {
		let answer = ""
		if (word == "Bad Request")
			answer = `<h1 style="color: red; ">${word}</h1>`
		else {
			for (let i = 0; i < 5; i++) {
				if (word[i] == 'g') {
					answer += `<span style="color:green;">g</span>`
				}
				else if (word[i] == 'b') {
					answer += `<span style="color:black;">b</span>`
				}
				else if (word[i] == 'y') {
					answer += `<span style="color:#dac047;">y</span>`
				}
			}
		}
		return answer
	}

	let beautifiedAnswer = beautify(ans);
	return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Wordle+</title>
				</head>
				<body style="background:azure; font-family: system-ui ; margin:0; padding:0;">
					<div id="answer" style="height:100vh ; display:flex;justify-content:center;">
						<h1 style="padding-top:5rem">${beautifiedAnswer}</h1>	
					</div>	
				</body>
			</html>`
}
