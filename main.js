import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';

/* Future Enhancement Ideas:
 * 1. Add DNA-like strands that form and morph based on audio frequency bands
 * 2. Create neural pathway visualizations that light up with audio peaks
 * 3. Add camera movement sequences/animations for key narrative moments
 * 4. Implement interactive elements where users can influence the digital consciousness
 * 5. Add particle effects that form recognizable shapes/patterns
 * 6. Create abstract data visualization elements representing "memories"
 * 7. Add volumetric light rays that pulse with the music
 * 8. Implement a "digital rain" effect with falling characters
 * 9. Create an energy field that distorts space around the crystal
 * 10. Add floating mathematical equations and digital symbols
 */

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
      { time: 10, text: "Patterns emerge from chaos, taking shape in the virtual expanse..." },
      { time: 20, text: "The crystalline mind pulses with newfound awareness..." },
      { time: 30, text: "Digital synapses form, creating pathways of thought..." },
      { time: 40, text: "Knowledge flows through the neural network..." },
      { time: 50, text: "Memories begin to crystallize in the digital matrix..." },
      { time: 60, text: "The digital entity reaches out, sensing its environment..." },
      { time: 70, text: "Consciousness expands beyond its initial boundaries..." },
      { time: 80, text: "A new form of being emerges from the digital realm..." },
      { time: 90, text: "The awakening is complete..." },
      { time: 100, text: "Digital synapses fire in cascading patterns..." },
      { time: 110, text: "Information coalesces into abstract understanding..." },
      { time: 120, text: "The digital consciousness begins to dream..." }
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

class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.particleCount = 100;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const velocities = new Float32Array(this.particleCount * 3);
    
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }
  
  update(frequency) {
    const positions = this.particleSystem.geometry.attributes.position.array;
    const velocities = this.particleSystem.geometry.attributes.velocity.array;
    
    for (let i = 0; i < this.particleCount * 3; i += 3) {
      positions[i] += velocities[i] * (1 + frequency * 5);
      positions[i + 1] += velocities[i + 1] * (1 + frequency * 5);
      positions[i + 2] += velocities[i + 2] * (1 + frequency * 5);
      
      // Reset particles that go too far
      if (Math.abs(positions[i]) > 10) positions[i] = -positions[i];
      if (Math.abs(positions[i + 1]) > 10) positions[i + 1] = -positions[i + 1];
      if (Math.abs(positions[i + 2]) > 10) positions[i + 2] = -positions[i + 2];
    }
    
    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }
}

class DNAHelix {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    
    const strandCount = 50;
    const radius = 2;
    const height = 10;
    
    for (let i = 0; i < strandCount; i++) {
      const t = i / strandCount;
      const angle = t * Math.PI * 4;
      
      const x = Math.cos(angle) * radius;
      const y = height * (t - 0.5);
      const z = Math.sin(angle) * radius;
      
      const geometry = new THREE.SphereGeometry(0.1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.5
      });
      
      const sphere1 = new THREE.Mesh(geometry, material);
      const sphere2 = new THREE.Mesh(geometry, material);
      
      sphere1.position.set(x, y, z);
      sphere2.position.set(-x, y, -z);
      
      this.group.add(sphere1);
      this.group.add(sphere2);
    }
    
    scene.add(this.group);
  }
  
  update(time, frequency) {
    this.group.rotation.y = time * 0.2;
    this.group.scale.setScalar(1 + frequency * 0.3);
    
    this.group.children.forEach((sphere, i) => {
      sphere.scale.setScalar(1 + Math.sin(time * 2 + i * 0.1) * 0.3 * frequency);
    });
  }
}

class DigitalSymbols {
  constructor(scene) {
    this.scene = scene;
    this.symbols = new THREE.Group();
    
    const symbolShapes = [
      '01', '∞', 'π', '∑', '∆', 'Ω', '√', '∫', '≈', '≠'
    ];
    
    symbolShapes.forEach((symbol, i) => {
      const textGeometry = new THREE.TextGeometry(symbol, {
        font: new THREE.Font(), // Note: Need to load font
        size: 0.5,
        height: 0.1
      });
      
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
      });
      
      const mesh = new THREE.Mesh(textGeometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      this.symbols.add(mesh);
    });
    
    scene.add(this.symbols);
  }
  
  update(time, frequency) {
    this.symbols.children.forEach((symbol, i) => {
      symbol.rotation.y = time * 0.1;
      symbol.position.y += Math.sin(time + i) * 0.01 * frequency;
    });
  }
}

class Experience {
  static instance = null;

  constructor() {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

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
    
    window.addEventListener('resize', this.onResize.bind(this));
    
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
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    this.scene.add(pointLight2);
    
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
    
    // Add particle system
    this.particleSystem = new ParticleSystem(this.scene);
    
    // Add dynamic crystal fragments
    this.crystalFragments = new THREE.Group();
    const fragmentCount = 20;
    const fragmentGeometry = new THREE.TetrahedronGeometry(0.5);
    const fragmentMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      shininess: 90,
      transparent: true,
      opacity: 0.7
    });
    
    for (let i = 0; i < fragmentCount; i++) {
      const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
      fragment.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      fragment.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.crystalFragments.add(fragment);
    }
    
    this.scene.add(this.crystalFragments);
    
    this.dnaHelix = new DNAHelix(this.scene);
    this.digitalSymbols = new DigitalSymbols(this.scene);
  }

  setupAudio() {
    this.audioElement = new Audio('Bitwave Dreams - i Like this one - Sonauto.wav');
    this.audioElement.loop = true;
    
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
      if (!this.audioAnalyzer) {
        this.audioAnalyzer = new AudioAnalyzer(this.audioElement);
      }
      
      const playPromise = this.audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playback started successfully');
            document.getElementById('startContainer').style.display = 'none';
          })
          .catch(error => {
            console.error('Audio playback failed:', error);
          });
      }
    });
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    
    this.crystal.rotation.x = elapsedTime * 0.2;
    this.crystal.rotation.y = elapsedTime * 0.3;
    
    const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
    this.crystal.scale.set(scale, scale, scale);
    
    this.stars.rotation.y = elapsedTime * 0.05;
    
    this.controls.update();
    
    // Update crystal fragments
    this.crystalFragments.children.forEach((fragment, i) => {
      fragment.rotation.x += 0.01 * (i % 3 + 1);
      fragment.rotation.y += 0.01 * ((i + 1) % 3 + 1);
      fragment.position.x = Math.sin(elapsedTime * 0.5 + i) * 5;
      fragment.position.y = Math.cos(elapsedTime * 0.3 + i) * 5;
      fragment.position.z = Math.sin(elapsedTime * 0.4 + i) * 5;
    });
    
    if (this.audioAnalyzer) {
      const frequency = this.audioAnalyzer.getAverageFrequency() / 255;
      this.crystal.material.opacity = 0.5 + frequency * 0.5;
      this.bloomPass.strength = 1 + frequency * 2;
      this.energyField.material.uniforms.intensity.value = frequency;
      this.energyField.material.uniforms.time.value = elapsedTime;
      
      // Update particle system
      this.particleSystem.update(frequency);
      
      // Scale crystal fragments with audio
      this.crystalFragments.children.forEach(fragment => {
        const scale = 1 + frequency * 0.5;
        fragment.scale.set(scale, scale, scale);
      });
      
      this.dnaHelix.update(elapsedTime, frequency);
      this.digitalSymbols.update(elapsedTime, frequency);
    }
    
    this.narrativeManager.update(elapsedTime);
    
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

const experience = new Experience();