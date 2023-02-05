import './style.css'
import gsap from 'gsap'
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
	}
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

//
// Events
//
window.addEventListener('resize', () =>
{
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('mousemove', (event) =>
{
	cursor.x.corner = event.clientX - 11
	cursor.y.corner = event.clientY - 11
	cursor.x.center = event.clientX / sizes.width - 0.5
	cursor.y.center = - (event.clientY / sizes.height - 0.5)
	if (cursor.x.cornerCurrent == 0) {
		cursor.x.cornerCurrent = event.clientX
		cursor.y.cornerCurrent = event.clientY
	}
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
});

logoAnimation.addEventListener('DOMLoaded', function() {
	logoAnimation.goToAndStop(0, true)
	logoAnimation.playSegments([0, 9], true)
})
//
// Three
//
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1.2, 1.2)
scene.add(camera)

scene.background = new THREE.Color( 0xdbd7d2 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add(hemiLight);

const spotLight = new THREE.SpotLight( 0xffffff, 0.4 );
spotLight.angle = Math.PI / 5;
spotLight.penumbra = 0.8;
spotLight.position.set( 0, 5, 5 );
spotLight.castShadow = false;
spotLight.shadow.camera.near = 3;
spotLight.shadow.camera.far = 36;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight)

const loader = new FBXLoader();
loader.load('/3d/Thinker_v9.fbx', function (object) {
	object.rotation.y = 1
	object.traverse( function ( child ) {
		if ( child.isMesh ) {
			child.castShadow = true
		}
	} );
	scene.add(object);
});

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
// Main flow
//
const clock = new THREE.Clock()
let TPF = 0
let last = 0
let logoHover = false

const tick = () =>
{
	const elapsedTime = clock.getElapsedTime()
	TPF = Math.round((elapsedTime - last) * 100) / 100
	last = elapsedTime

	camera.position.x = cursor.x.center * 0.8
	camera.position.y = cursor.y.center + 1.5
	camera.lookAt(new THREE.Vector3(0, 2.4, 0))

	renderer.render(scene, camera)

	cursor.x.cornerCurrent += (cursor.x.corner - cursor.x.cornerCurrent) * (TPF * 10);
	cursor.y.cornerCurrent += (cursor.y.corner - cursor.y.cornerCurrent) * (TPF * 10);
	const t = `translate3d(${cursor.x.cornerCurrent}px,${cursor.y.cornerCurrent}px,0px)`;
	let s = cursorSub.style;

	s['transform'] = t;
	s['webkitTransform'] = t;
	s['mozTransform'] = t;
	s['msTransform'] = t;

	if (logo.matches(":hover") != logoHover) {
		if (logoHover) {
			// logoAnimation.setDirection(-1)
			logoAnimation.playSegments([21, 9], true)
		} else {
			// logoAnimation.setDirection(1)
			logoAnimation.playSegments([9, 21], true)
		}
		logoHover = !logoHover
	}
	window.requestAnimationFrame(tick)
}
tick()

gsap.to(footer, {height: 60, duration: 1, delay: 2})
gsap.to(menu, {bottom: 22, duration: 0.5, delay: 3})