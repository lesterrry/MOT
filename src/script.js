import './style.css'
import gsap from 'gsap'
import Typed from 'typed.js'
import * as LOTTIE from 'lottie-web'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import WatchPNG from '../static/img/watch.png'

//
// Exhibits
//
class Exhibit {
	constructor(index, title, description, model, pois, camera) {
		this.index = index
		this.title = title
		this.description = description
		this.model = model
		this.pois = pois
		this.camera = camera
	}
}
class Poi {
	constructor(title, description, image, x, y) {
		this.title = title
		this.description = description
		this.image = image
		this.x = x
		this.y = y
	}
}
class Camera {
	constructor(zPosition, xMultiplier, xAppender, yMultiplier, yAppender, anchor, shadowsEnabled) {
		this.zPosition = zPosition
		this.xMultiplier = xMultiplier
		this.xAppender = xAppender
		this.yMultiplier = yMultiplier
		this.yAppender = yAppender
		this.anchor = anchor
		this.shadowsEnabled = shadowsEnabled
	}
}

//
// Globals
//
const EXHIBITS = [
	new Exhibit (
		'2412', 
		'Автокатастрофа', 
		'Этот экспонат — один из новых. Он показывает столкновение двух автомобилей — "Аварию". До открытия ускорения времени люди постоянно торопились и нередко погибали в спешке.', 
		'/3d/Crash_v1.fbx', 
		[
			
		],
		new Camera (
			5,
			2.2,
			1,
			3,
			2.5,
			[0, 2, -2],
			true
		)
	),
	new Exhibit (
		'2412', 
		'Ожидатель', 
		'“Ожидатель” представляет собой репродукцию знаменитой скульптуры родена “мыслитель”, созданную около ста лет назад. это образ человека, утомленного ожиданием — типичное зрелище для XXI века.', 
		'/3d/Thinker_v9.fbx', 
		[
			new Poi (
				'Наручные часы Brietling', 
				'В XXI веке часы часто являлись предметами роскоши: для того, чтобы следить за временем, состоятельные люди были готовы платить большие деньги',
				'watch',
				0.026,
				-0.116,
			),
			new Poi (
				'Утомленный взгляд',
				'Глаза человека, проведшего в ожидании не один час. нашим современникам трудно представить это чувство, но летописи описывают его не иначе как невыносимое',
				null,
				0.008,
				0.209
			)
		],
		new Camera (
			1.2,
			0.8,
			0,
			1,
			1.5,
			[0, 2.4, 0],
			false
		)
	),
]
const imageMap = {
	'watch': WatchPNG
}
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
const offset = 0.02
let currentExhibit = EXHIBITS[0]
let distract = true

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
const artefactsButton = document.querySelector('a#to-artefacts')
const aboutButton = document.querySelector('a#to-about')
const initialSpinner = document.querySelector('.spinner#initial')
const termText = document.querySelector('p.term')
const exLink = document.querySelector('a.logo-link')
const overlayTitle = document.querySelector('.overlay.partial h1')
const overlayCloseButton = document.querySelector('.overlay.partial h2')
const overlayDescription = document.querySelector('.overlay.partial p')
const overlay = document.querySelector('.overlay.partial')
const overlayImage = document.querySelector('.overlay.partial img')
const cornerTextLU = document.querySelector('.content h3#lu')
const cornerTextRU = document.querySelector('.content h3#ru')
const cornerTextLD = document.querySelector('.content h3#ld')
const cornerTextRD = document.querySelector('.content h3#rd')
const exhibitTitle = document.querySelector('.content h1')
const exhibitDescription = document.querySelector('.description p')
const exhibitProgressTitle = document.querySelector('.content .quest-progress h2')
const exhibitProgressSubtitleA = document.querySelector('.content .quest-progress h3#a')
const exhibitProgressSubtitleB = document.querySelector('.content .quest-progress h3#b')
const exhibitProgressSubtitleC = document.querySelector('.content .quest-progress h3#c')
const exhibitProgressSubtitleMap = [
	exhibitProgressSubtitleA,
	exhibitProgressSubtitleB,
	exhibitProgressSubtitleC
]
const exhibitProgressDescriptionA = document.querySelector('.content .quest-progress p#a')
const exhibitProgressDescriptionB = document.querySelector('.content .quest-progress p#b')
const exhibitProgressDescriptionC = document.querySelector('.content .quest-progress p#c')

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
	let any = false
	for (var i = 0; i < currentExhibit.pois.length; i++) {
		if (
			(cursor.x.center >= currentExhibit.pois[i].x - offset) && (cursor.x.center <= currentExhibit.pois[i].x + offset) &&
			(cursor.y.center >= currentExhibit.pois[i].y - offset) && (cursor.y.center <= currentExhibit.pois[i].y + offset)
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
		showOverlay(currentExhibit.pois[cursor.focus])
		exhibitProgressSubtitleMap[cursor.focus].innerText = currentExhibit.pois[cursor.focus].title
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
	hideOverlay()
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

//
// Service functions
//
const preloadImage = (url, callback) => {
    let img = new Image()
    img.src = url
    img.onload = callback
}

//
// Overlay
//
const showOverlay = (poi) => {
	const fill = () => {
		initialSpinner.style['opacity'] = '0'
		overlayTitle.innerText = poi.title
		overlayDescription.innerText = poi.description
		overlay.style['display'] = 'initial'
	}
	distract = true
	initialSpinner.style['opacity'] = '1'
	if (poi.image) {
		let image = imageMap[poi.image]
		preloadImage(image, () => {
			overlayImage.src = image
			overlayImage.style['display'] = 'block'
			fill()
		})
	} else {
		fill()
	}
}
const hideOverlay = () => {
	overlay.style['display'] = 'none'
	overlayImage.style['display'] = 'none'
	distract = false
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

const loadScene = (exhibit) => {
	exhibitTitle.innerText = exhibit.title
	exhibitDescription.innerText = exhibit.description
	camera.position.set(0, 0, exhibit.camera.zPosition)
	scene.add(camera)

	scene.background = new THREE.Color(0xdbd7d2)

	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
	hemiLight.position.set(0, 200, 0)
	scene.add(hemiLight)

	const spotLight = new THREE.SpotLight(0xffffff, 0.4)
	spotLight.angle = Math.PI / 5
	spotLight.penumbra = 0.8
	spotLight.position.set(0, 5, 5)
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
			color: 0xdbd7d2,
			depthWrite: false
		})
	)
	floor.receiveShadow = false
	floor.rotation.x = - (Math.PI * 0.5)
	floor.position.y = 0
	scene.add(floor)
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
		loadScene(currentExhibit)
		threeTick()
		exLink.style['pointer-events'] = 'initial'
		// TODO:
		// Wait for cursor movement to suppress initial model movement
		gsap.to(footer, { height: 60, duration: 1, delay: 0.5 })
		gsap.to(menu, { bottom: 22, duration: 0.5, delay: 1.25 })
		distract = false
	}, 500)
}
