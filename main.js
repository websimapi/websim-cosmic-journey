import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

class Experience {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#experience'),
      antialias: true
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    this.camera.position.z = 15;
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    
    this.clock = new THREE.Clock();
    this.init();
    this.setupAudio();
    this.animate();
  }
  
  init() {
    // Create cosmic environment
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);
    
    for(let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 100;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff
    });
    
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
    
    // Create central crystalline structure
    const crystalGeometry = new THREE.IcosahedronGeometry(3, 1);
    const crystalMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      shininess: 90,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });
    
    this.crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    this.scene.add(this.crystal);
    
    // Add ambient and point lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    this.scene.add(pointLight2);
  }
  
  setupAudio() {
    this.audioElement = new Audio('/Bitwave Dreams - i Like this one - Sonauto.wav');
    this.audioElement.loop = true;
    
    document.getElementById('startButton').addEventListener('click', () => {
      this.audioElement.play();
      document.getElementById('startContainer').style.display = 'none';
    });
  }
  
  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    
    // Rotate crystal
    this.crystal.rotation.x = elapsedTime * 0.2;
    this.crystal.rotation.y = elapsedTime * 0.3;
    
    // Pulse crystal scale
    const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
    this.crystal.scale.set(scale, scale, scale);
    
    // Rotate stars slowly
    this.stars.rotation.y = elapsedTime * 0.05;
    
    // Update controls
    this.controls.update();
    
    // Render
    this.renderer.render(this.scene, this.camera);
    
    requestAnimationFrame(this.animate.bind(this));
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Handle resize
window.addEventListener('resize', () => {
  experience.onResize();
});

// Initialize experience
const experience = new Experience();