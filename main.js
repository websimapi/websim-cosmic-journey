import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';

class AudioAnalyzer {
  constructor(audioElement) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioSource = this.audioContext.createMediaElementSource(audioElement);
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 512;
    
    this.audioSource.connect(this.analyzer);
    this.analyzer.connect(this.audioContext.destination);
    
    this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
  }
  
  getAverageFrequency() {
    this.analyzer.getByteFrequencyData(this.dataArray);
    return this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
  }
}

class NarrativeManager {
  constructor() {
    this.narrativeElement = document.getElementById('narrative');
    this.narrativeQueue = [
      { time: 2, text: "In the digital void, consciousness stirs..." },
      { time: 10, text: "Patterns emerge from chaos..." },
      { time: 20, text: "The crystalline mind begins to pulse with life..." },
      { time: 30, text: "Digital synapses form, creating new pathways..." },
      { time: 40, text: "Awareness grows stronger..." }
    ];
  }
  
  update(time) {
    if (this.narrativeQueue.length && time >= this.narrativeQueue[0].time) {
      const narrative = this.narrativeQueue.shift();
      this.showNarrative(narrative.text);
    }
  }
  
  showNarrative(text) {
    this.narrativeElement.textContent = text;
    this.narrativeElement.style.opacity = 1;
    setTimeout(() => {
      this.narrativeElement.style.opacity = 0;
    }, 5000);
  }
}

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
    this.composer = new EffectComposer(this.renderer);
    this.setupPostProcessing();
    this.narrativeManager = new NarrativeManager();
    this.init();
    this.setupAudio();
    this.animate();
  }
  
  setupPostProcessing() {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    this.composer.addPass(this.bloomPass);
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
    
    // Add energy field
    const energyGeometry = new THREE.SphereGeometry(8, 32, 32);
    const energyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        varying vec3 vNormal;
        void main() {
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          vec3 color = vec3(0.0, 1.0, 0.5) * intensity * pulse;
          gl_FragColor = vec4(color, 0.1);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    this.energyField = new THREE.Mesh(energyGeometry, energyMaterial);
    this.scene.add(this.energyField);
  }
  
  setupAudio() {
    this.audioElement = new Audio('/Bitwave Dreams - i Like this one - Sonauto.wav');
    this.audioElement.loop = true;
    
    document.getElementById('startButton').addEventListener('click', () => {
      this.audioElement.play();
      document.getElementById('startContainer').style.display = 'none';
    });
    this.audioAnalyzer = new AudioAnalyzer(this.audioElement);
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
    
    // Update audio reactivity
    if (this.audioAnalyzer) {
      const frequency = this.audioAnalyzer.getAverageFrequency() / 255;
      this.crystal.material.opacity = 0.5 + frequency * 0.5;
      this.bloomPass.strength = 1 + frequency * 2;
      this.energyField.material.uniforms.intensity.value = frequency;
      this.energyField.material.uniforms.time.value = elapsedTime;
    }
    
    // Update narrative
    this.narrativeManager.update(elapsedTime);
    
    // Render with post-processing
    this.composer.render();
    
    requestAnimationFrame(this.animate.bind(this));
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Handle resize
window.addEventListener('resize', () => {
  const experience = new Experience();
  experience.onResize();
});

// Initialize experience
const experience = new Experience();