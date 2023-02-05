import './style.css'
import gsap from 'gsap'
import Typed from 'typed.js'
import * as LOTTIE from 'lottie-web'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

//
// Globals
//
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
const cursor = {
	x: {
		center: 0,
		corner: 0,
		cornerCurrent: 0
	},
	y: {
		center: 0,
		corner: 0,
		cornerCurrent: 0
	}
}
const client = window.navigator.userAgent
const sessionID = Math.random()

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
})
window.addEventListener('load', () => {
	flow()
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
// Three
//
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1.2, 1.2)
scene.add(camera)

scene.background = new THREE.Color(0xdbd7d2)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
hemiLight.position.set(0, 200, 0)
scene.add(hemiLight)

const spotLight = new THREE.SpotLight(0xffffff, 0.4)
spotLight.angle = Math.PI / 5
spotLight.penumbra = 0.8
spotLight.position.set(0, 5, 5)
spotLight.castShadow = false
spotLight.shadow.camera.near = 3
spotLight.shadow.camera.far = 36
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048
scene.add(spotLight)

const loader = new FBXLoader()
loader.load('/3d/Thinker_v9.fbx', (object) => {
	object.rotation.y = 1
	object.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true
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
floor.receiveShadow = true
floor.rotation.x = - (Math.PI * 0.5)
floor.position.y = 0
scene.add(floor)

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.shadowMap.enabled = false
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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

	camera.position.x = cursor.x.center * 0.8
	camera.position.y = cursor.y.center + 1.5
	camera.lookAt(new THREE.Vector3(0, 2.4, 0))

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
const flow = () => {
	initialSpinner.style['display'] = 'none'
	step2()
}
const step1 = () => {
	let strings = [
		'[ ~ ] initializing...^1000\n`[ * ] success`^500\n[ ~ ] configuring client...^1000\n`[ ! ] error >>>`\n`    ]> hardware too old`\n`    ]> will use bridge`^1000 ',
		'[ ~ ] preparing bridge...^1000\n`[ * ] success {{{`\n`    ]{ protocol: ( XXI century internet <=> uninet© )`\n`    ]{ client: ( ' + client + ' )`\n`    ]{ session: ( ' + sessionID + '` )\n[\n[\n[\n[\n[ ~ ] launching...^1000\n`[ * ] success`^250'
	]
	let typed = new Typed(termText, {
		strings,
		typeSpeed: 10,
		startDelay: 1000,
		backSpeed: 0,
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
}
const step3 = () => {
	termText.innerHTML = ''
	threeTick()
	logoAnimation.playSegments([0, 9], true)
	exLink.style['pointer-events'] = 'initial'
	gsap.to(footer, {height: 60, duration: 1, delay: 2})
	gsap.to(menu, {bottom: 22, duration: 0.5, delay: 3})
}
