import './style.css'
import gsap from 'gsap'
import Typed from 'typed.js'
import * as LOTTIE from 'lottie-web'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

//
// Exhibits
//
class Exhibit {
	constructor(is_artifact, index, title, description, model, pois, camera) {
		this.is_artifact = is_artifact
		this.index = index
		this.title = title
		this.description = description
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
const EXHIBITS = [
	new Exhibit (
		false,
		null, 
		'Первый прорыв', 
		'Эти древние цифровые часы с радио — объект многолетних лабораторных тестов. Именно на них впервые получилось удачно провести эксперимент по изменению течения времени.', 
		'/3d/Clock_v0.fbx', 
		[
			new Poi (
				'Аналоговые кнопки', 
				'Для того, чтобы пользоваться этим предметом, людям приходилось физически вдавливать выступающие части корпуса — кнопки — внутрь устройства. в 2133 году представить такое трудно.',
				0.027,
				-0.008,
			),
			new Poi (
				'Погасший дисплей', 
				'Когда-то здесь отображались шесть цифр — они представляли текущее время в часах, минутах и секундах. Когда был проведен первый успешный опыт, время в тестовой камере удалось замедлить, и секунды стали идти медленнее.',
				0.027,
				-0.194,
			),
			new Poi (
				'Радиопередатчик', 
				'Для того, чтобы коммуницировать с устройством из центра управления, ученые приделали к нему радиопередатчик, с помощью которого с точностью до миллисекунды синхронизировалось время.',
				-0.140,
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
		null, 
		'Прототип A/3841-M', 
		'Этот занимающий два этажа прибор — первое, что сумело подчинить течение времени.', 
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
		null, 
		'Ожидатель', 
		'“Ожидатель” представляет собой репродукцию знаменитой скульптуры родена “мыслитель”, созданную около ста лет назад. это образ человека, утомленного ожиданием — типичное зрелище для XXI века.', 
		'/3d/Thinker_v9.fbx', 
		[
			new Poi (
				'Наручные часы Brietling', 
				'В XXI веке часы часто являлись предметами роскоши: для того, чтобы следить за временем, состоятельные люди были готовы платить большие деньги',
				0.026,
				-0.116,
			),
			new Poi (
				'Утомленный взгляд',
				'Глаза человека, проведшего в ожидании не один час. нашим современникам трудно представить это чувство, но летописи описывают его не иначе как невыносимое',
				0.008,
				0.209
			),
			new Poi (
				'Неудобная поза',
				'Сидеть длительное время на лавке или твердом стуле — настоящая пытка. За время ожидания человек перепробовал десятки разных поз, и в каждой ему было неудобно',
				-0.044,
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
		null, 
		'Автокатастрофа', 
		'Этот экспонат — один из новых. Он показывает столкновение двух автомобилей — "Аварию". До открытия ускорения времени люди постоянно торопились и нередко погибали в спешке.', 
		'/3d/Crash_v1.fbx', 
		[
			new Poi (
				'Смерть водителя', 
				'Ни одна технология безопасности не спасла: водитель скончался на месте. Приехавшим врачам осталось только констатировать этот факт.',
				0.067,
				-0.065,
			),
			new Poi (
				'Серьезные повреждения',
				'Обе машины отправятся на свалку: после таких повреждений они — лишь металлолом.',
				-0.072,
				-0.221
			),
			new Poi (
				'Высокая скорость',
				'Задние колеса универсала поднялись в воздух: водитель спешил и превышал. Цена этого решения оказалась для него слишком высокой.',
				0.300,
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
		'Первая модель, которую поступала в розничную продажу и стала доступна людям — Model C200. Несмотря на стоимость, сравнимую с двумя Bentley Continental GT, спрос на прибор зашкаливал, ведь он предоставлял каждому уникальную возможность исказить время. По текущим стандартам С200 был примитивным, позволяя только замедлять время и работая от автомобильного двигателя. Прорывным же была функция автоматического замедления, помогающая водителям избегать аварий.', 
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
	// this.zPosition = zPosition
	// this.xMultiplier = xMultiplier
	// this.xAppender = xAppender
	// this.yMultiplier = yMultiplier
	// this.yAppender = yAppender
	// this.anchor = anchor
	// this.shadowsEnabled = shadowsEnabled
	// this.lightIntensity = lightIntensity
	// this.lightHeight = lightHeight
]
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
let cursor = {
	x: {
		center: 0,
		corner: 0,
		cornerCurrent: 0
	},
	y: {
		center: 0,
		corner: 0,
		cornerCurrent: 0
	},
	focus: false
}
const client = window.navigator.userAgent
const clueHuntOffset = 0.04
let currentExhibitIndex = 5
let currentExhibit = EXHIBITS[currentExhibitIndex]
let distract = true
let currentOverlayFocus = 0
let currentProgress = [false, false, false]
let finished = false

// 
// Cookie handling
//
let cookies = {
	_progress: '0',
	_sessionID: String(Math.random()),
	get progress() { return this._progress },
	set progress(value) { this._progress = value; serializeCookies() },
	get sessionID() { return this._sessionID },
	set sessionID(value) { this._sessionID = value; serializeCookies() },
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
const canvas = document.querySelector('canvas.webgl')
const cursorSub = document.querySelector('div.cursor-sub')
const footer = document.querySelector('.frame-part#d')
const menu = document.querySelector('div.menu')
const logo = document.querySelector('div.logo')
const relaunchButton = document.querySelector('a#relaunch')
const exhibitsButton = document.querySelector('a#to-exhibits')
const helpButton = document.querySelector('a#to-help')
const aboutButton = document.querySelector('a#to-about')
const initialSpinner = document.querySelector('.spinner#initial')
const termText = document.querySelector('p.term')
const exLink = document.querySelector('a.logo-link')
const overlayTitle = document.querySelector('.overlay.partial h1')
const overlayCloseButton = document.querySelector('.overlay.partial .button')
const overlayDescription = document.querySelector('.overlay.partial p')
const overlay = document.querySelector('.overlay.partial')
const overlayWindow = document.querySelector('.overlay.partial .window')
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
const exhibitDescription = document.querySelector('.description p')
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
const exhibitProgressNextButton = document.querySelector('.content .quest-progress .button')

//
// Events
//
window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('mousemove', (event) => {
	cursor.x.corner = event.clientX - 11
	cursor.y.corner = event.clientY - 11
	cursor.x.center = event.clientX / sizes.width - 0.5
	cursor.y.center = - (event.clientY / sizes.height - 0.5)
	if (cursor.x.cornerCurrent == 0) {
		cursor.x.cornerCurrent = event.clientX
		cursor.y.cornerCurrent = event.clientY
	}
	if (distract) return
	let any = false
	for (var i = 0; i < currentExhibit.pois.length; i++) {
		if (
			(cursor.x.center >= currentExhibit.pois[i].x - clueHuntOffset) && (cursor.x.center <= currentExhibit.pois[i].x + clueHuntOffset) &&
			(cursor.y.center >= currentExhibit.pois[i].y - clueHuntOffset) && (cursor.y.center <= currentExhibit.pois[i].y + clueHuntOffset)
		) {
			if (cursor.focus === false) {
				gsap.to(cursorSub, { borderWidth: 2, backgroundColor: "rgba(0,0,0,0)", duration: 0.25 })
				cursor.focus = i
			}
			any = true
			break
		}
	}
	if (!any && cursor.focus !== false) {
		gsap.to(cursorSub, { borderWidth: 10, backgroundColor: "black", duration: 0.25 })
		cursor.focus = false
	}
	// console.log(cursor.x.center, cursor.y.center)
})
window.addEventListener('click', () => {
	if (cursor.focus !== false && !distract) {
		currentOverlayFocus = cursor.focus
		showOverlay(currentExhibit.pois[cursor.focus])
		cursor.focus = false
	}
})
window.addEventListener('load', () => {
	if (!deserializeCookies()) {
		serializeCookies()
	}
	gsap.to(initialSpinner, { opacity: 0, duration: 0.25})
	setTimeout(() => { flow(cookies.progress != '0') }, 1000)  // Delay for load-safety
})
relaunchButton.addEventListener('click', () => {
	cookies.progress = '0'
	window.location.reload();
})
overlayCloseButton.addEventListener('click', () => {
	hideOverlay(currentProgress[currentOverlayFocus])
	currentProgress[currentOverlayFocus] = true
	currentOverlayFocus = 0
	if (array_true(currentProgress) && !finished) {
		finished = true
		exhibitProgressSubtitleSpinner.style['display'] = 'none'
		exhibitProgressTitle.innerText = 'Все детали найдены'
		setExhibitProgressButton(true, false, true)
		loadTick(exhibitProgressSubtitleTickH)
	}
})
exhibitProgressNextButton.addEventListener('click', () => {
	if (finished) destroyScene()
})

//
// Lotties
//
const logoAnimation = LOTTIE.loadAnimation({
	container: logo,
	renderer: 'svg',
	loop: false,
	autoplay: false,
	path: '/lottie/logo.json'
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
// Overlay
//
const showOverlay = (poi) => {
	overlayTitle.innerText = poi.title
	overlayDescription.innerText = poi.description
	overlay.style['display'] = 'initial'
	gsap.from(overlayWindow, { height: 0, duration: 0.5, clearProps: 'all' })
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
				gsap.to(exhibitProgress, { height: 245, duration: 0.5 })
			} else {
				exhibitProgress.style['height'] = '245'
			}
		}
	} else {
		if (animate) {
			gsap.to(exhibitProgress, { height: 188, duration: 0.5 })
		} else {
			exhibitProgress.style['height'] = '	188'
		}
	}
}

//
// Three & Scenes
//
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const prepareScene = (exhibit=currentExhibit) => {
	loadScene(exhibit)
	threeTick()
	exLink.style['pointer-events'] = 'initial'
	// TODO:
	// Wait for cursor movement to suppress initial model jump
	gsap.to(footer, { height: 60, duration: 1, delay: 0.5 })
	gsap.to(menu, { bottom: 22, duration: 0.5, delay: 1.25 })
	distract = false
}
const destroyScene = () => {
	distract = true
	exLink.style['pointer-events'] = 'none'
	gsap.to(footer, { height: '100%', duration: 1 })
	gsap.to(menu, { bottom: -20, duration: 0.5 })
	setTimeout(() => {
		deloadScene()
		forwardExhibit()
		currentOverlayFocus = 0
		currentProgress = [false, false, false]
		prepareScene()
	}, 1100)
}
const loadScene = (exhibit) => {
	finished = exhibit.is_artifact ? true : false
	cursorSub.style['background-color'] = exhibit.is_artifact ? 'white' : 'black'
	cursorSub.style['border-color'] = exhibit.is_artifact ? 'white' : 'black'
	cornerTextMap.map((item) => {
		item.style['display'] = exhibit.is_artifact ? 'none' : ''
	})
	exhibitTitle.innerText = exhibit.title
	exhibitTitle.style['color'] = exhibit.is_artifact ? 'white' : 'black'
	exhibitDescription.innerText = exhibit.description
	exhibitProgressTitle.innerText = exhibit.is_artifact ? 'Разблокирован артефакт' : 'Осмотрите экспонат'
	exhibitProgressSubtitleMap.map((item) => {
		item.innerText = exhibit.is_artifact ? '' : '???'
	})
	exhibitProgressSubtitleTickMap.map((item) => {
		item.innerHTML = ''
		item.style['height'] = exhibit.is_artifact ? 'initial' : ''
	})
	exhibitProgressSubtitleTickH.innerHTML = ''
	setExhibitProgressButton(exhibit.is_artifact, exhibit.is_artifact, false)
	exhibitProgressSubtitleSpinner.style['display'] = exhibit.is_artifact ? 'none' : ''
	camera.position.set(0, 0, exhibit.camera.zPosition)
	scene.add(camera)

	scene.background = new THREE.Color(exhibit.is_artifact ? 0x171717 : 0xdbd7d2)

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
	})

	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(1000, 1000),
		new THREE.MeshPhongMaterial({
			color: exhibit.is_artifact ? 0x171717 : 0xdbd7d2,
			depthWrite: false
		})
	)
	floor.receiveShadow = false
	floor.rotation.x = - (Math.PI * 0.5)
	floor.position.y = 0
	scene.add(floor)
}
const deloadScene = () => {
	while(scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
}

//
// Service functions
//
const array_true = arr => arr.every(Boolean);
const forwardExhibit = () => {
	currentExhibitIndex++
	currentExhibit = EXHIBITS[currentExhibitIndex]
}

//
// Main loop
//
const clock = new THREE.Clock()
let TPF = 0
let last = 0
let logoHover = false
let logoAnimationNormalized = false

const threeTick = () => {
	const elapsedTime = clock.getElapsedTime()
	TPF = Math.round((elapsedTime - last) * 100) / 100
	last = elapsedTime

	camera.position.x = (cursor.x.center * currentExhibit.camera.xMultiplier) + currentExhibit.camera.xAppender
	camera.position.y = (cursor.y.center * currentExhibit.camera.yMultiplier) + currentExhibit.camera.yAppender
	camera.lookAt(new THREE.Vector3(...currentExhibit.camera.anchor))

	renderer.render(scene, camera)

	cursor.x.cornerCurrent += (cursor.x.corner - cursor.x.cornerCurrent) * (TPF * 10)
	cursor.y.cornerCurrent += (cursor.y.corner - cursor.y.cornerCurrent) * (TPF * 10)
	const t = `translate3d(${cursor.x.cornerCurrent}px,${cursor.y.cornerCurrent}px,0px)`
	let s = cursorSub.style

	s['transform'] = t
	s['webkitTransform'] = t
	s['mozTransform'] = t
	s['msTransform'] = t

	if (logo.matches(":hover") != logoHover) {
		if (logoHover) {
			logoAnimation.setDirection(-1)
			logoAnimation.play()
		} else {
			if (logoAnimationNormalized) {
				logoAnimation.setDirection(1)
				logoAnimation.play()
			} else {
				logoAnimation.playSegments([9, 21], true)
				logoAnimationNormalized = true
			}
		}
		logoHover = !logoHover
	}
	window.requestAnimationFrame(threeTick)
}

//
// Main flow
//
const flow = (rewind=false) => {
	if (rewind) {
		step3()
	} else {
		step1()
	}
}
const step1 = () => {
	let strings = [
		'[ ~ ] initializing...^1000\n`[ * ] success`^500\n[ ~ ] configuring client...^1000\n`[ ! ] error >>>`\n`    ]> hardware too old`\n`    ]> will use bridge`\n`    ]> `^800',
		'',
		'[ ~ ] preparing bridge...^1000\n`[ * ] success {{{`\n`    ]{ protocol: ( XXI century internet <=> uninet© )`\n`    ]{ client: ( ' + client + ' )`\n`    ]{ session: ( ' + cookies.sessionID + '` )\n[\n[\n[\n[\n[ ~ ] launching...^1000\n`[ * ] success`^250'
	]
	let typed = new Typed(termText, {
		strings,
		typeSpeed: 10,
		startDelay: 1000,
		onComplete: step2
	});
}
const step2 = () => {
	termText.innerHTML = ''
	termText.style['top'] = '50%'
	termText.style['text-align'] = 'center'
	let strings = [
		'2133 год.^2000',
		'Человечество давно научилось управлять временем.^2000',
		'Скука, нетерпение, очереди и пробки, ностальгия и тоска\nостались в прошлом.^2000',
		'Музей времени — последнее напоминание о том, какой мучительной\nбыла жизнь до изобретения этой технологии.^2000',
		'Музей времени.^1000\nСокращенно — МУВР.^1000\nДобро пожаловать.^2000',
		''
	]
	let typed = new Typed(termText, {
		strings,
		typeSpeed: 20,
		startDelay: 1000,
		backSpeed: 2,
		onComplete: () => { setTimeout(step3, 1000) }
	});
	cookies.progress = '1'
}
const step3 = () => {
	termText.innerHTML = ''
	logoAnimation.playSegments([0, 9], true)
	setTimeout(() => {
		prepareScene()
	}, 500)
}
