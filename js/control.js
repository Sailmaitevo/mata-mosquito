const dificulties = {
	'cn': 120,
	'd' : 90,
	'n' : 60,
	'f' : 30
}
const dificulty = location.search.split('=')[1]
let timeToFinish = Number(dificulties[dificulty ?? 'n'])
let finishCountdownTimeout

let lifes = 3
const lifesHTML = document.getElementById('lifes')
const secondsToRecycle = 2
let recycleCountdownTimeout

const randomX = () => Math.floor(
	Math.random() * innerWidth * .9
)
const randomY = () => Math.floor(
	Math.random() * innerHeight * .8
)

const mosquito = document.createElement('img')

mosquito.src = '../img/mosquito.png'
mosquito.id  = 'mosquito'
mosquito.alt = 'MOSQUITO'

document.body.prepend(mosquito)

function finishCountdown (){
	console.log('finish: ' + timeToFinish)

	if(timeToFinish <= 0){
		clearTimeout(finishCountdownTimeout)
		location.replace(`../vitoria`)
	}

	timeToFinish--
	document.getElementById('tempo-restante').innerText = 
		timeToFinish <= 0 ?
			'0' :
			String(timeToFinish)

	finishCountdownTimeout = setTimeout(
		finishCountdown,
		1000
	)
}

function setMosquitoPosition(){
	mosquito.style.left = randomX() + 'px'
	mosquito.style.top  = randomY() + 'px'
}
function recycle(){
	clearTimeout(recycleCountdownTimeout)

	setMosquitoPosition()
	console.log(lifes)

	recycleCountdownTimeout = setTimeout(
		() => {
			const setFullHeartToEmptyHeart = life => {
				life.src = '../img/coracao_vazio.png'
				life.alt = 'VIDA VAZIA'
			}

			lifes--

			recycle()

			if(lifes === 2){
				let heart = lifesHTML.querySelector('#life-3')
				setFullHeartToEmptyHeart(heart)
			} else if (lifes === 1){
				let heart = lifesHTML.querySelector('#life-2')
				setFullHeartToEmptyHeart(heart)
			} else if (lifes === 0){
				location.replace(`../game-over`)
			}
		},
		secondsToRecycle * 1000
	)
}
recycle()
finishCountdown()

mosquito.addEventListener('click', recycle)