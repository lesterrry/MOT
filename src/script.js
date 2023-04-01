/*************************
Handcrafted by Aydar N.
2023

me@aydar.media
*************************/

import './style.css'
import GSAP from 'gsap'
import TYPED from 'typed.js'
import * as LOTTIE from 'lottie-web'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as TONE from 'tone'

import PNG_P1 from '../static/img/exhibits/p1.png'
import PNG_P2 from '../static/img/exhibits/p2.png'
import PNG_P3 from '../static/img/exhibits/p3.png'
import PNG_P4 from '../static/img/exhibits/p4.png'
import PNG_P5 from '../static/img/exhibits/p5.png'
import MP3_1 from '../static/audio/startup.mp3'

//
// Classes
//
class Exhibit {
	constructor(isArtifact, index, title, description, image, model, pois, camera) {
		this.isArtifact = isArtifact
		this.index = index
		this.title = title
		this.description = description
		this.image = image
		this.model = model
		this.pois = pois
		this.camera = camera
	}
}
class Poi {
	constructor(title, description, x, y) {
		this.title = title
		this.description = description
		this.x = x
		this.y = y
	}
}
class Camera {
	constructor(zPosition, xMultiplier, xAppender, yMultiplier, yAppender, anchor, shadowsEnabled, lightIntensity, lightHeight) {
		this.zPosition = zPosition
		this.xMultiplier = xMultiplier
		this.xAppender = xAppender
		this.yMultiplier = yMultiplier
		this.yAppender = yAppender
		this.anchor = anchor
		this.shadowsEnabled = shadowsEnabled
		this.lightIntensity = lightIntensity
		this.lightHeight = lightHeight
	}
}

//
// Globals
//
const IMAGEMAP = {
	'p1': PNG_P1,
	'p2': PNG_P2,
	'p3': PNG_P3,
	'p4': PNG_P4,
	'p5': PNG_P5,
}
const EXHIBITS = [
	new Exhibit (
		false,
		'2803', 
		'Первый прорыв', 
		'Эти древние цифровые часы с радио — объект многолетних лабораторных тестов. Именно на них впервые получилось удачно провести эксперимент по изменению течения времени.', 
		'p5',
		'/3d/Clock_v0.fbx', 
		[
			new Poi (
				'Аналоговые кнопки', 
				'Для того, чтобы пользоваться этим предметом, людям приходилось физически вдавливать выступающие части корпуса — кнопки — внутрь устройства. в 2133 году представить такое трудно.',
				0.074,
				-0.008,
			),
			new Poi (
				'Погасший дисплей', 
				'Когда-то здесь отображались шесть цифр — они представляли текущее время в часах, минутах и секундах. Когда был проведен первый успешный опыт, время в тестовой камере удалось замедлить, и секунды стали идти медленнее.',
				0.057,
				-0.194,
			),
			new Poi (
				'Радиопередатчик', 
				'Для того, чтобы коммуницировать с устройством из центра управления, ученые приделали к нему радиопередатчик, с помощью которого с точностью до миллисекунды синхронизировалось время.',
				-0.302,
				-0.220,
			),
		],
		new Camera (
			10,
			4,
			0,
			4,
			5,
			[0, 3, 0],
			false,
			0.4,
			10
		)
	),
	new Exhibit (
		true,
		'null', 
		'Прототип A/3841-M', 
		'Этот занимающий два этажа прибор — первое, что сумело подчинить течение времени. В тестовой камере с часами-радио устройство, получающее питание от собственного ядерного реактора, смогло замедлить время ровно в полтора раза.', 
		null,
		'/3d/Reactor_v0.fbx', 
		[],
		new Camera (
			20,
			30,
			0,
			18,
			10,
			[0, 10, 0],
			true,
			0.4,
			30
		)
	),
	new Exhibit (
		false,
		'8541', 
		'Ожидатель', 
		'“Ожидатель” представляет собой репродукцию знаменитой скульптуры родена “мыслитель”, созданную около ста лет назад. это образ человека, утомленного ожиданием — типичное зрелище для XXI века.', 
		'p1',
		'/3d/Thinker_v9.fbx', 
		[
			new Poi (
				'Наручные часы Brietling', 
				'В XXI веке часы часто являлись предметами роскоши: для того, чтобы следить за временем, состоятельные люди были готовы платить большие деньги',
				0.069,
				-0.116,
			),
			new Poi (
				'Утомленный взгляд',
				'Глаза человека, проведшего в ожидании не один час. нашим современникам трудно представить это чувство, но летописи описывают его не иначе как невыносимое',
				0.026,
				0.209
			),
			new Poi (
				'Неудобная поза',
				'Сидеть длительное время на лавке или твердом стуле — настоящая пытка. За время ожидания человек перепробовал десятки разных поз, и в каждой ему было неудобно',
				0.013,
				0.063
			)
		],
		new Camera (
			1.2,
			0.8,
			0,
			1,
			1.5,
			[0, 2.4, 0],
			false,
			0.4,
			10
		)
	),
	new Exhibit (
		true,
		null, 
		'Skip Model H3000', 
		'Model H3000 — первое устройство компании, которое начали массово выпускать. Массивная установка, потребляющая огромное количество энергии, стоила как 5 самолетов Boeing 737-800. Именно в аэропортах впервые и появились эти машины, сделав ожидание людей в залах более приятным.', 
		null,
		'/3d/Charger_v1.fbx', 
		[],
		new Camera (
			3,
			12,
			0,
			5,
			3,
			[0, 2, 0],
			true,
			0.4,
			10
		)
	),
	new Exhibit (
		false,
		'1210', 
		'Автокатастрофа', 
		'Этот экспонат — один из новых. Он показывает столкновение двух автомобилей — "Аварию". До открытия ускорения времени люди постоянно торопились и нередко погибали в спешке.', 
		'p3',
		'/3d/Crash_v1.fbx', 
		[
			new Poi (
				'Смерть водителя', 
				'Ни одна технология безопасности не спасла: водитель скончался на месте. Приехавшим врачам осталось только констатировать этот факт.',
				0.158,
				-0.065,
			),
			new Poi (
				'Серьезные повреждения',
				'Обе машины отправятся на свалку: после таких повреждений они — лишь металлолом.',
				-0.156,
				-0.221
			),
			new Poi (
				'Высокая скорость',
				'Задние колеса универсала поднялись в воздух: водитель спешил и превышал. Цена этого решения оказалась для него слишком высокой.',
				0.633,
				-0.212
			)
		],
		new Camera (
			5,
			2.2,
			1,
			3,
			2.5,
			[0, 2, -2],
			true,
			0.4,
			10
		)
	),
	new Exhibit (
		true,
		null, 
		'Skip Model C200', 
		'Первая модель, которая поступила в розничную продажу и стала доступна людям — Model C200. Несмотря на стоимость, сравнимую с двумя Bentley Continental GT, спрос на прибор зашкаливал, ведь он предоставлял каждому уникальную возможность исказить время. По текущим стандартам С200 был примитивным, позволяя только замедлять время и работая от автомобильного двигателя. Прорывным же была функция автоматического замедления, помогающая водителям избегать аварий.', 
		null,
		'/3d/CarRadio_v1.fbx', 
		[],
		new Camera (
			8,
			12,
			0,
			6,
			2,
			[0, 2, 3],
			true,
			0.4,
			10
		)
	),
	new Exhibit (
		false,
		'0686', 
		'Эконом-класс', 
		'Перед нами ценнейшая древность — кресла самолета эконом-класса. В прошлом люди проводили мучительно долгие часы, сидя в неудобных, жестких сидениях с крошечным пространством для ног. К счастью, эти муки потеряли актуальность много десятилетий назад, и теперь даже трансатлантический перелет занимает не более пяти минут.', 
		'p2',
		'/3d/Seats_v1.fbx', 
		[
			new Poi (
				'Неудобный подголовник', 
				'Крепко уснуть на таком невозможно. Все, что остается — проваливаться в тревожный, минутный сон, не приносящий никакого отдыха.',
				-0.259,
				0.124,
			),
			new Poi (
				'Нет места для ног',
				'Храни вас бог, если ваш рост больше 180 сантиметров. Единственный вариант в такой ситуации — размещать ноги в проходе, но в таком случае обязательно следите, чтобы их вам не оторвало тележкой с едой.',
				0.073,
				-0.245
			),
			new Poi (
				'Крохотный столик',
				'Ни полноценно поесть, ни разместить ноутбук на таком не выйдет, так что придется импровизировать.',
				-0.410,
				-0.069
			)
		],
		new Camera (
			5,
			6,
			-2,
			5,
			2.5,
			[0, 2, 2],
			true,
			0.4,
			10
		)
	),
	new Exhibit (
		true,
		null, 
		'Skip Model M', 
		'M means Mobile — слоган рекламной кампании из 2028. Лучше и не скажешь: инженерам удалось значительно уменьшить энергопотребление временных контуров, сделав возможным работу устройства от аккумулятора. Именно это устройство наконец позволило людям взять изменение времени с собой, и несмотря на огромные размеры и низкую автономность (Model M мог запускать процесс изменения времени не более 7 раз от одного заряда), оно стало настоящим публичным хитом.', 
		null,
		'/3d/Phone_v1.fbx', 
		[],
		new Camera (
			10,
			20,
			4,
			12,
			5,
			[0, 6, 0],
			true,
			0.6,
			20
		)
	),
	new Exhibit (
		false,
		'9801', 
		'Журавлик оригами', 
		'Еще одна реликвия, датированная 2023 годом: напоминание о том, к каким занятиям прибегали люди из прошлого, стараясь развлечь себя в ежедневных ожиданиях. Кроме оригами к таковым можно отнести вязание, сканворды и судоку. Это все, конечно, если под рукой не окажется телефона.', 
		'p4',
		'/3d/Crane_v3.fbx', 
		[
			new Poi (
				'Почтовое извещение', 
				'Скучая, кто-то обнаружил у себя под рукой типовое почтовое извещение — бумажный документ, сообщающий, что адресата в отделении ожидает посылка.',
				0.214,
				0.164,
			),
			new Poi (
				'Телефонный номер',
				'На извещении синей ручкой написан номер телефона — вероятно, получатель написал его, чтобы не забыть. Может быть, складывая журавлика, он ожидал назначенного звонка?',
				0.005,
				0.129
			),
			new Poi (
				'Впечатляющая техника',
				'Эта поделка явно заняла некоторое время: только посмотрите, как мастерски она выполнена.',
				0.197,
				0.321
			)
		],
		new Camera (
			2,
			12,
			0,
			0.5,
			0,
			[0, 0, 0],
			true,
			0.3,
			10
		)
	),
	new Exhibit (
		true,
		null, 
		'Skip Model A', 
		'Венец творения — Model A помещается в карман, позволяя где угодно и сколько угодно манипулировать временем. В массовую продажу Model A поступил в 2115 году, и за несколько лет полностью изменил мир.', 
		null,
		'/3d/Hand_v1.fbx', 
		[],
		new Camera (
			14,
			26,
			-6,
			12,
			10,
			[0, 12, 0],
			false,
			0.6,
			20
		)
	)
]
const SIZES = {
	width: window.innerWidth,
	height: window.innerHeight
}
let cursor = {
	x: {
		center: 0,
		corner: 0,
		cornerCurrent: 0,
		balanced: 0
	},
	y: {
		center: 0,
		corner: 0,
		cornerCurrent: 0
	},
	focus: false
}
const CLIENT = window.navigator.userAgent
const CLUE_HUNT_OFFSET = 0.04
const CLOCK = new THREE.Clock()
const YEAR = (new Date()).toLocaleDateString('en-US', { year: '2-digit' })
let currentExhibitIndex = 0
let currentExhibit = EXHIBITS[currentExhibitIndex]
let distract = true
let currentOverlayFocus = 0
let currentProgress = [false, false, false]
let progressToBeSet = false
let started = false
let finished = false
let ended = false
let TPF = 0
let last = 0
let LOGOHover = false
let LOGOAnimationNormalized = false
let threeLoaded = false
let buttons = []
let attacking = true
let mobile = false

// 
// Cookie handling
//
let cookies = {
	_progress: 0,
	_sessionID: String(Math.round(Math.random() * 10000)),
	_mute: false,
	get progress() { return this._progress },
	set progress(value) { this._progress = value; serializeCookies() },
	get sessionID() { return this._sessionID },
	set sessionID(value) { this._sessionID = value; serializeCookies() },
	get mute() { return this._mute },
	set mute(value) { this._mute = value; serializeCookies() },
}
const createCookie = (name, value) => {
	document.cookie = name + '=' + value + '; expires=;' + ' path=/';
}
const deleteCookie = (name) => {
	document.cookie = name + '=;' + '; expires=;' + ' path=/';
}
const getCookie = (c_name) => {
	if (document.cookie.length > 0) {
		let c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			let c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}
const deserializeCookies = () => {
	let c = getCookie('session')
	if (!c) return false
	Object.assign(cookies, JSON.parse(c))
	return true
}
const serializeCookies = () => {
	// Uncomment to disable cookies
	// return
	let replacer = (key, value) => {
		if (key[0] == '_' || typeof value === 'object') return value;
		else return undefined;
	}
	let s = JSON.stringify(cookies, replacer)
	createCookie('session', s)
}

//
// Selectors
//
const CANVAS = document.querySelector('canvas.webgl')
const CURSORSUB = document.querySelector('div.cursor-sub')
const FOOTER = document.querySelector('.frame-part#d')
const MENU = document.querySelector('div.menu')
const LOGO = document.querySelector('div.logo')
const INITIAL_SPINNER = document.querySelector('.spinner#initial')
const TERM_TEXT = document.querySelector('p.term')
const LOGO_LINK = document.querySelector('a.logo-link')
const OVERLAY_TITLE = document.querySelector('.overlay.partial h1')
const OVERLAY_DESCRIPTION = document.querySelector('.overlay.partial p')
const overlay = document.querySelector('.overlay.partial')
const overlayWindow = document.querySelector('.overlay.partial .window')
const allExhibitsOverlay = document.querySelector('.overlay.all-exhibits')
const fullOverlay = document.querySelector('.overlay.full')
const fullOverlayTitle = document.querySelector('.overlay.full p')
const cornerTextLU = document.querySelector('.content h3#lu')
const cornerTextRU = document.querySelector('.content h3#ru')
const cornerTextLD = document.querySelector('.content h3#ld')
const cornerTextRD = document.querySelector('.content h3#rd')
const cornerTextMap = [
	cornerTextLU,
	cornerTextRU,
	cornerTextLD,
	cornerTextRD
]
const exhibitTitle = document.querySelector('.content h1')
const exhibitDescriptionText = document.querySelector('.description p')
const exhibitProgress = document.querySelector('.content .quest-progress')
const exhibitProgressTitle = document.querySelector('.content .quest-progress h2')
const exhibitProgressSubtitleA = document.querySelector('.content .quest-progress h3#a')
const exhibitProgressSubtitleB = document.querySelector('.content .quest-progress h3#b')
const exhibitProgressSubtitleC = document.querySelector('.content .quest-progress h3#c')
const exhibitProgressSubtitleMap = [
	exhibitProgressSubtitleA,
	exhibitProgressSubtitleB,
	exhibitProgressSubtitleC
]
const exhibitProgressSubtitleTickA = document.querySelector('.content .quest-progress .tick#a')
const exhibitProgressSubtitleTickB = document.querySelector('.content .quest-progress .tick#b')
const exhibitProgressSubtitleTickC = document.querySelector('.content .quest-progress .tick#c')
const exhibitProgressSubtitleTickMap = [
	exhibitProgressSubtitleTickA,
	exhibitProgressSubtitleTickB,
	exhibitProgressSubtitleTickC
]
const exhibitProgressSubtitleTickH = document.querySelector('.content .quest-progress .tick#h')
const exhibitProgressSubtitleSpinner = document.querySelector('.content .quest-progress .spinner')

//
// Events
//
window.addEventListener('resize', () => {
	SIZES.width = window.innerWidth
	SIZES.height = window.innerHeight
	camera.aspect = SIZES.width / SIZES.height
	camera.updateProjectionMatrix()
	renderer.setSize(SIZES.width, SIZES.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('mousemove', (event) => {
	if (!attacking) {
		osc.start()
		attacking = true
	}
	cursor.x.corner = event.clientX - 11
	cursor.y.corner = event.clientY - 11
	cursor.x.center = event.clientX / SIZES.width - 0.5
	cursor.y.center = - (event.clientY / SIZES.height - 0.5)
	cursor.x.balanced = cursor.x.center * (SIZES.width / SIZES.height)
	if (cursor.x.cornerCurrent == 0) {
		cursor.x.cornerCurrent = event.clientX
		cursor.y.cornerCurrent = event.clientY
	}
	if (distract) return
	let any = false
	for (var i = 0; i < currentExhibit.pois.length; i++) {
		if (
			(cursor.x.balanced >= currentExhibit.pois[i].x - CLUE_HUNT_OFFSET) && (cursor.x.balanced <= currentExhibit.pois[i].x + CLUE_HUNT_OFFSET) &&
			(cursor.y.center >= currentExhibit.pois[i].y - CLUE_HUNT_OFFSET) && (cursor.y.center <= currentExhibit.pois[i].y + CLUE_HUNT_OFFSET)
		) {
			if (cursor.focus === false) {
				setCursor(true)
				cursor.focus = i
			}
			any = true
			break
		}
	}
	if (!any && cursor.focus !== false) {
		setCursor(false)
		cursor.focus = false
	}
	// console.log(cursor.x.balanced, cursor.y.center)
})
document.addEventListener('click', async () => {
	if (!started) {
		await TONE.start()
		threeTick()
		INITIAL_SPINNER.style['top'] = '80px'
		flow(cookies.progress != 0)
		hideFullOverlay(mobile)
		started = true
		return
	}
	if (cursor.focus !== false && !distract && !mobile) {
		if (!cookies.mute) {
			synth.triggerAttackRelease('A3', '8n')
			synth.triggerAttackRelease('A2', '8n', '+0.2')
			synth.triggerAttackRelease('A4', '8n', '+0.4')
		}
		progressToBeSet = true
		currentOverlayFocus = cursor.focus
		showOverlay(currentExhibit.pois[cursor.focus])
		cursor.focus = false
		setCursor(false)
	} else {
		if (!cookies.mute) {
			synth.triggerAttackRelease('A2', '8n')
		}
	}
})

window.addEventListener('load', () => {
	if (!deserializeCookies()) {
		serializeCookies()
	}
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		console.log('Detected mobile screen')
		mobile = true
		MENU.style['display'] = 'none'
		exhibitTitle.style['top'] = '38px'
		exhibitTitle.style['font-size'] = '54px'
		exhibitTitle.style['line-height'] = '1'
		cornerTextLU.style['top'] = '20px'
		overlayWindow.style['width'] = '100%'
		document.querySelector('.description').style['display'] = 'none'
		document.querySelector('.frame').style['display'] = 'zoom: 0.2'
		document.querySelector('.FOOTER-button-container').style['display'] = 'initial'
		document.querySelector('body').style['-webkit-user-select'] = 'none'
		exhibitProgress.style['display'] = 'none'
		if (cookies.progress == 0) { cookies.progress = 1 }
	}
	populateAllExhibitsOverlay()
	setExhibit(cookies.progress == 0 ? 0 : cookies.progress - 1, true)
	buttons = document.querySelectorAll('.clickable')
	for (let i = buttons.length - 1; i >= 0; i--) {
		buttons[i].addEventListener('click', () => {
			handleButtonClick(i)
		})
	}
	conformMuteButton()
	setSpinner(false)
	showFullOverlay('Нажмите на экран, чтобы начать')
})

const handleButtonClick = (id) => {
	if (!cookies.mute) {
		synth.triggerAttackRelease('A3', '8n', '+0.2')
	}
	let substract = 8
	switch (id) {
	case 0:  // relaunch
		cookies.progress = 0
		window.location.reload()
		break
	case 1:  // all exhibits
		destroyScene(false, true)
		showAllExhibitsOverlay()
		break
	case 2:  // mute
		cookies.mute = !cookies.mute
		if (cookies.mute) {
			osc.stop()
			noise.stop()
		} else {
			noise.start()
			osc.start()
		}
		conformMuteButton()
		break
	case 3:  // help
		showOverlay(['Что делать', 'МУВР — музей времени. Здесь представлены экспонаты, олицетворяющее ту или иную трудность, с которой сталкивались люди до изобретения технологии изменения времени. За каждым экспонатом стоит свой артефакт — прибор «скип». Чтобы его разблокировать, изучайте экспонат курсором, пока он не изменит свое состояние, после чего нажмите на обнаруженную деталь.'])
		break
	case 4:  // next exhibit
	case 5:
		if (finished || mobile) destroyScene(true)
		break
	case 6:  // partial overlay close
		if (ended) {
			hideOverlay(true)
			prepareScene()
			ended = false
			break
		}
		hideOverlay(currentProgress[currentOverlayFocus] || !progressToBeSet)
		if (!progressToBeSet) return
		currentProgress[currentOverlayFocus] = true
		currentOverlayFocus = 0
		if (array_true(currentProgress) && !finished) {
			finished = true
			exhibitProgressSubtitleSpinner.style['display'] = 'none'
			exhibitProgressTitle.innerText = 'Все детали найдены'
			setExhibitProgressButton(true, false, true)
			loadTick(exhibitProgressSubtitleTickH)
		}
		progressToBeSet = false
		break
	case 7:  // all exhibits overlay close
		hideAllExhibitsOverlay()
		prepareScene()
		break
	default:  // all exhibits buttons
		id -= substract
		setExhibit(id * 2)
		hideAllExhibitsOverlay()
		prepareScene()
	}
}

//
// Sound
//
const osc = new TONE.FatOscillator({
	type: "sine2",
	frequency: 100,
	volume: -22
}).toDestination()
const volume = new TONE.Signal(120);
volume.connect(osc.frequency)
const synth = new TONE.PolySynth(TONE.Synth, {
	oscillator: {
		partials: [0, 2, 3, 4],
	}
}).toDestination()
const startupPlayer = new TONE.Player({
	url: MP3_1,
	volume: -2
}).toDestination()
const noise = new TONE.Noise({
	type: 'brown',
	volume: -36
}).toDestination()

//
// Lotties
//
const LOGOAnimation = LOTTIE.loadAnimation({
	container: LOGO,
	renderer: 'svg',
	loop: false,
	autoplay: false,
	path: '/lottie/LOGO.json'
})
const loadTick = (into) => {
LOTTIE.loadAnimation({
		container: into,
		renderer: 'svg',
		loop: false,
		autoplay: true,
		path: '/lottie/tick.json'
	})
}

//
// Cursor
//
const setCursor = (focused) => {
	if (focused) {
		GSAP.to(CURSORSUB, { borderWidth: 2, backgroundColor: "rgba(0,0,0,0)", duration: 0.25 })
	} else {
		GSAP.to(CURSORSUB, { borderWidth: 10, backgroundColor: "black", duration: 0.25 })
	}
}

//
// Overlay
//
const showOverlay = (data) => {
	if (!Array.isArray(data)) {
		OVERLAY_TITLE.innerText = data.title
		OVERLAY_DESCRIPTION.innerText = data.description
	} else {
		OVERLAY_TITLE.innerText = data[0]
		OVERLAY_DESCRIPTION.innerText = data[1]
	}
	overlay.style['display'] = 'initial'
	GSAP.from(overlayWindow, { height: 0, duration: 0.5, clearProps: mobile ? false : 'all' })
	distract = true
}
const hideOverlay = (quiet) => {
	overlay.style['display'] = 'none'
	distract = false
	if (!quiet) {
		exhibitProgressSubtitleMap[currentOverlayFocus].innerText = currentExhibit.pois[currentOverlayFocus].title
		loadTick(exhibitProgressSubtitleTickMap[currentOverlayFocus])
	}
}
const showAllExhibitsOverlay = () => {
	allExhibitsOverlay.style['display'] = 'flex'
	GSAP.to(allExhibitsOverlay, { opacity: '100%', duration: 0.5, delay: 1 })
}
const hideAllExhibitsOverlay = () => {
	GSAP.to(allExhibitsOverlay, { opacity: '0', duration: 0.5, delay: 0, clearProps: 'all', onComplete: () => {
		allExhibitsOverlay.style['display'] = 'none'
	} })
}
const populateAllExhibitsOverlay = () => {
	const template = '<div class="stuff"><div class="data"><img src="%IMG%"><div><h3>MOT — EXHIBIT #%INDEX%</h3><h1>%TITLE%</h1></div></div><div id="%BTN_INDEX%" class="button fixed clickable"><h4>Перейти</h4></div></div>'
	let data = ['<div class="close"><h1>Все экспонаты</h1><div class="clickable"><h2 сlass="text-button">X</h2></div></div>']
	for (let i = 0; i < EXHIBITS.length - 1; i++) {
		if (EXHIBITS[i].isArtifact) continue
		let s = template.replace('%IMG%', IMAGEMAP[EXHIBITS[i].image])
		s = s.replace('%INDEX%', EXHIBITS[i].index)
		s = s.replace('%TITLE%', EXHIBITS[i].title)
		s = s.replace('%BTN_INDEX%', i)
		data.push(s)
	}
	allExhibitsOverlay.innerHTML = data.join('\n')
}
const showFullOverlay = (withText) => {
	fullOverlayTitle.innerText = withText
	fullOverlay.style['display'] = 'initial'
}
const hideFullOverlay = (force=false) => {
	fullOverlayTitle.innerText = 'Увеличьте окно'
	fullOverlay.style['display'] = force ? 'none' : ''
}

//
// Initial spinner
//
const setSpinner = (visible) => {
	if (visible) {
		INITIAL_SPINNER.style['opacity'] = '0'
		INITIAL_SPINNER.style['display'] = 'initial'
		GSAP.to(INITIAL_SPINNER, { opacity: 1, duration: 0.25, immediateRender: false })
	} else {
		INITIAL_SPINNER.style['opacity'] = '1'
		GSAP.to(INITIAL_SPINNER, { opacity: 0, duration: 0.25, immediateRender: false, onComplete: () => {
			INITIAL_SPINNER.style['display'] = 'none'
		} })
	}
}

//
// Exhibit progress
//
const setExhibitProgressButton = (visible, compact, animate) => {
	exhibitProgress.style['height'] = ''
	if (visible) {
		if (compact) {
			exhibitProgress.style['height'] = 'initial'
		} else {
			if (animate) {
				GSAP.to(exhibitProgress, { height: 245, duration: 0.5 })
			} else {
				exhibitProgress.style['height'] = '245'
			}
		}
	} else {
		if (animate) {
			GSAP.to(exhibitProgress, { height: 188, duration: 0.5 })
		} else {
			exhibitProgress.style['height'] = '188'
		}
	}
}

//
// Three & Scenes
//
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
	CANVAS: CANVAS,
	antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(SIZES.width, SIZES.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
let controls

const prepareScene = (exhibit=currentExhibit) => {
	setSpinner(true)
	setTimeout(() => {
		loadScene(exhibit)
	}, 500)
}
const destroyScene = (advance, hideLogo=false) => {
	distract = true
	LOGO_LINK.style['pointer-events'] = 'none'
	GSAP.to(FOOTER, { height: '100%', duration: 1 })
	if (hideLogo) GSAP.to(LOGO, { opacity: '0', duration: 0.5 })
	GSAP.to(MENU, { bottom: -20, duration: 0.5 })
	setTimeout(() => {
		deloadScene()
		currentOverlayFocus = 0
		currentProgress = [false, false, false]
		if (advance) {
			if (forwardExhibit()) prepareScene()
			else step4()
		}
	}, 1100)
}
const finalizeScene = () => {
	LOGO_LINK.style['pointer-events'] = 'initial'
	// TODO:
	// Wait for cursor movement to suppress initial model jump
	GSAP.to(FOOTER, { height: 60, duration: 1, delay: 0.25 })
	GSAP.to(MENU, { bottom: 22, duration: 0.5, delay: 0 })
	if (LOGO.style['opacity'] == '0') { GSAP.to(LOGO, { opacity: '100%', duration: 1, clearProps: 'all' }) }
	setSpinner(false)
	distract = false
}
const loadScene = (exhibit) => {
	if (!cookies.mute) {
		osc.start()
		noise.start()
	}
	finished = exhibit.isArtifact ? true : false
	CURSORSUB.style['background-color'] = exhibit.isArtifact ? 'white' : 'black'
	CURSORSUB.style['border-color'] = exhibit.isArtifact ? 'white' : 'black'
	cornerTextMap.map((item) => {
		item.style['display'] = exhibit.isArtifact ? 'none' : ''
	})
	cornerTextLU.innerText = `MOT — EXHIBIT #${exhibit.index}`
	cornerTextLD.innerText = mobile ? '' : `SESSION #${cookies.sessionID}\n192.168.31.232`
	cornerTextRU.innerText = mobile ? '' : 'MUSEUM OF TIME\nVIRTUAL TOUR' 
	cornerTextRD.innerText = mobile ? '' : `${(new Date()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}\n Year 21${YEAR}`
	exhibitTitle.innerText = exhibit.title
	exhibitTitle.style['color'] = exhibit.isArtifact ? 'white' : 'black'
	exhibitDescriptionText.innerText = exhibit.description
	exhibitProgressTitle.innerText = exhibit.isArtifact ? 'Разблокирован артефакт' : 'Осмотрите экспонат'
	exhibitProgressSubtitleMap.map((item) => {
		item.innerText = exhibit.isArtifact ? '' : '???'
	})
	exhibitProgressSubtitleTickMap.map((item) => {
		item.innerHTML = ''
		item.style['height'] = exhibit.isArtifact ? 'initial' : ''
	})
	exhibitProgressSubtitleTickH.innerHTML = ''
	setExhibitProgressButton(exhibit.isArtifact, exhibit.isArtifact, false)
	exhibitProgressSubtitleSpinner.style['display'] = exhibit.isArtifact ? 'none' : ''

	if (mobile) {
		controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.enableZoom = false
		controls.autoRotate = true
		controls.dampingFactor = 0.05
		controls.panSpeed = 0.05
		controls.screenSpacePanning = false
		controls.minDistance = exhibit.camera.zPosition * 1.8
		controls.maxDistance = exhibit.camera.zPosition * 1.8
		controls.maxPolarAngle = Math.PI / 2;
	}

	camera.position.set(0, 0, exhibit.camera.zPosition)
	scene.add(camera)

	scene.background = new THREE.Color(exhibit.isArtifact ? 0x171717 : 0xdbd7d2)

	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, exhibit.camera.lightIntensity + 0.6)
	hemiLight.position.set(0, 200, 0)
	scene.add(hemiLight)

	const spotLight = new THREE.SpotLight(0xffffff, exhibit.camera.lightIntensity)
	spotLight.angle = Math.PI / 5
	spotLight.penumbra = 0.8
	spotLight.position.set(0, exhibit.camera.lightHeight, 5)
	spotLight.castShadow = exhibit.camera.shadowsEnabled
	spotLight.shadow.camera.near = 3
	spotLight.shadow.camera.far = 36
	spotLight.shadow.mapSize.width = 2048
	spotLight.shadow.mapSize.height = 2048
	scene.add(spotLight)

	const loader = new FBXLoader()
	loader.load(exhibit.model, (object) => {
		object.rotation.y = 1
		object.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = exhibit.camera.shadowsEnabled
				child.receiveShadow = exhibit.camera.shadowsEnabled
			}
		})
		scene.add(object)
		finalizeScene()
		threeLoaded = true
	})
}
const deloadScene = () => {
	threeLoaded = false
	while (scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
}

//
// Service functions
//
const array_true = arr => arr.every(Boolean);
const forwardExhibit = () => {
	if (currentExhibitIndex >= EXHIBITS.length - 1) {
		currentExhibitIndex = 0
		cookies.progress = 1
		currentExhibit = EXHIBITS[currentExhibitIndex]
		return false
	}
	currentExhibitIndex++
	currentExhibit = EXHIBITS[currentExhibitIndex]
	cookies.progress = currentExhibitIndex + 1
	return true
}
const setExhibit = (to, skipCookies=false) => {
	currentExhibitIndex = to
	currentExhibit = EXHIBITS[currentExhibitIndex]
	if (!skipCookies) cookies.progress = to + 1
}
const conformMuteButton = () => {
	buttons[2].innerText = cookies.mute ? 'Вкл. звук' : 'Выкл. звук'
}
const playRandomSequence = (times, offsetIncrement=0.1) => {
	const generateNote = () => {
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
		const nums = ['2', '3']
		const letter = letters[Math.floor(Math.random() * letters.length)]
		const num = nums[Math.floor(Math.random() * nums.length)]
		return `${letter}${num}`
	}
	let offset = 0.0
	for (var i = 0; i < times; i++) {
		synth.triggerAttackRelease(generateNote(), '8n', `+${offset}`)
		offset += offsetIncrement
	}
}
const playSequence = (note, times, offsetIncrement=0.1) => {
	let offset = 0.0
	for (var i = 0; i < times; i++) {
		synth.triggerAttackRelease(note, '8n', `+${offset}`)
		offset += offsetIncrement
	}
}
const playLogoSequence = (reverse=false) => {
	const notes = ['C4', 'E4', 'G4', 'B4']
	if (reverse) notes.reverse()
	synth.triggerAttackRelease(notes[0], '8n')
	synth.triggerAttackRelease(notes[1], '8n', '+0.1')
	synth.triggerAttackRelease(notes[2], '8n', '+0.2')
	synth.triggerAttackRelease(notes[3], '8n', '+0.3')
}

//
// Main loop
//
const threeTick = () => {
	if (threeLoaded) {
		const elapsedTime = CLOCK.getElapsedTime()
		TPF = Math.round((elapsedTime - last) * 100) / 100
		last = elapsedTime

		if (!mobile) {
			camera.position.x = (cursor.x.center * currentExhibit.camera.xMultiplier) + currentExhibit.camera.xAppender
			camera.position.y = (cursor.y.center * currentExhibit.camera.yMultiplier) + currentExhibit.camera.yAppender
			cursor.x.cornerCurrent += (cursor.x.corner - cursor.x.cornerCurrent) * (TPF * 10)
			cursor.y.cornerCurrent += (cursor.y.corner - cursor.y.cornerCurrent) * (TPF * 10)
			const t = `translate3d(${cursor.x.cornerCurrent}px,${cursor.y.cornerCurrent}px,0px)`
			let s = CURSORSUB.style
			s['transform'] = t
			s['webkitTransform'] = t
			s['mozTransform'] = t
			s['msTransform'] = t
			let x = 100 + (0.75 * (Math.abs(Math.round(cursor.x.corner - cursor.x.cornerCurrent))))
			if (x > 200) x = 200
			volume.rampTo(x, 0.1)
		} else {
			controls.update()
		}
		camera.lookAt(new THREE.Vector3(...currentExhibit.camera.anchor))

		renderer.render(scene, camera)

		if (LOGO.matches(":hover") != LOGOHover) {
			if (LOGOHover) {
				if (!cookies.mute) {
					playLogoSequence(true)
				}
				LOGOAnimation.setDirection(-1)
				LOGOAnimation.play()
			} else {
				if (!cookies.mute) {
					playLogoSequence(false)
				}
				if (LOGOAnimationNormalized) {
					LOGOAnimation.setDirection(1)
					LOGOAnimation.play()
				} else {
					LOGOAnimation.playSegments([9, 21], true)
					LOGOAnimationNormalized = true
				}
			}
			LOGOHover = !LOGOHover
		}
	}
	window.requestAnimationFrame(threeTick)
}

//
// Main flow
//
const flow = (rewind=false) => {
	// return
	if (rewind) {
		step3()
	} else {
		step1()
	}
}
const step1 = () => {
	startupPlayer.start()
	let strings = [
		'[ ~ ] initializing...^1000\n`[ * ] success`^500\n[ ~ ] configuring CLIENT...^1000\n`[ ! ] error >>>`\n`    ]> hardware too old`\n`    ]> will use bridge`\n`    ]> `^800',
		'',
		'[ ~ ] preparing bridge...^1000\n`[ * ] success {{{`\n`    ]{ protocol: ( XXI century internet <=> uninet© )`\n`    ]{ CLIENT: ( ' + CLIENT + ' )`\n`    ]{ session: ( ' + cookies.sessionID + '` )\n[\n[\n[\n[\n[ ~ ] launching...^1000\n`[ * ] success`'
	]
	let typed = new TYPED(TERM_TEXT, {
		strings,
		typeSpeed: 10,
		startDelay: 1000,
		onComplete: () => { playSequence('A4', 2); setTimeout(step2, 1000) }
	});
}
const step2 = () => {
	TERM_TEXT.innerHTML = ''
	TERM_TEXT.style['top'] = '50%'
	TERM_TEXT.style['text-align'] = 'center'
	let strings = [
		`21${YEAR} год.^2000`,
		'Человечество давно научилось управлять временем.^2000',
		'Скука, нетерпение, очереди и пробки, ностальгия и тоска\nостались в прошлом.^2000',
		'Музей времени — последнее напоминание о том, какой мучительной\nбыла жизнь до изобретения этой технологии.^2000',
		'Музей времени.^1000\nСокращенно — МУВР.^1000\nДобро пожаловать.^2000',
		''
	]
	let typed = new TYPED(TERM_TEXT, {
		strings,
		typeSpeed: 20,
		startDelay: 1000,
		backSpeed: 2,
		onComplete: () => { setTimeout(step3, 1000) },
		preStringTyped: (array) => {
			if (cookies.mute) return
			switch (array) {
			case 0:
				startupPlayer.stop().dispose()
				playRandomSequence(6) 
				break
			case 1:
				playRandomSequence(14)
				break
			case 2:
				playRandomSequence(22)
				break
			case 3:
				playRandomSequence(30)
				break
			}
		},
		onStringTyped: (array) => { 
			if (cookies.mute) return
			if (array == 3) {
				setTimeout(() => playRandomSequence(8), 2000)
				setTimeout(() => playRandomSequence(8), 4000)
			}
		}
	});
	cookies.progress = 1
}
const step3 = () => {
	ended = false
	TERM_TEXT.innerHTML = ''
	LOGOAnimation.playSegments([0, 9], true)
	// TODO:
	// ext func
	if (!cookies.mute) {
		playLogoSequence(false)
	}
	setTimeout(() => {
		prepareScene()
	}, 500)
}
const step4 = () => {
	ended = true
	showOverlay(['Вот и все', `Ваше путешествие подошло к концу. Полагаю, оно показало вам, каким ужасным была жизнь людей, вынужденных постоянно чего-то ожидать. Но если этот опыт был для вас недостаточно отвратителен, можете повторить экскурсию, перезагрузив страницу или нажав на кнопку.`])
}
