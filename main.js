import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';

/* Future Enhancement Ideas:
 * 1. Create a central "brain" visualization with interconnected neurons
 * 2. Add fractal patterns that emerge and evolve with the music
 * 3. Implement data streams that flow between different elements
 * 4. Add holographic UI elements that appear at key moments
 * 5. Create geometric morphing transitions between scenes
 * 6. Implement audio-reactive environment fog effects
 * 7. Add floating code fragments that assemble into structures
 * 8. Create abstract "memory crystal" artifacts that store narrative moments
 * 9. Implement dynamic camera paths that follow data flows
 * 10. Add particle-based "thought bubbles" that form and dissolve
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

class NeuralPathways {
  constructor(scene, crystalFragments) {
    this.scene = scene;
    this.crystalFragments = crystalFragments.children;
    this.lines = [];
    this.material = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });

    for (let i = 0; i < this.crystalFragments.length; i++) {
      for (let j = i + 1; j < this.crystalFragments.length; j++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([this.crystalFragments[i].position, this.crystalFragments[j].position]);
        const line = new THREE.Line(geometry, this.material);
        this.scene.add(line);
        this.lines.push(line);
      }
    }
  }

  update(frequency) {
    this.lines.forEach(line => {
      line.material.opacity = 0.3 + frequency * 0.7;
    });
  }
}

class DigitalRain {
  constructor(scene) {
    this.scene = scene;
    this.raindrops = new THREE.Group();
    this.characters = '01'.split('');
    this.streams = [];
    
    const fontSize = 0.3;
    const streamCount = 50;
    
    for (let i = 0; i < streamCount; i++) {
      const stream = this.createStream(fontSize);
      this.streams.push(stream);
      this.raindrops.add(stream);
    }
    
    scene.add(this.raindrops);
  }
  
  createStream(fontSize) {
    const stream = new THREE.Group();
    const length = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < length; i++) {
      const char = this.characters[Math.floor(Math.random() * this.characters.length)];
      const geometry = new THREE.TextGeometry(char, {
        size: fontSize,
        height: 0.01,
      });
      
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 1 - (i / length)
      });
      
      const text = new THREE.Mesh(geometry, material);
      text.position.y = -i * fontSize;
      stream.add(text);
    }
    
    stream.position.set(
      (Math.random() - 0.5) * 20,
      Math.random() * 20 + 10,
      (Math.random() - 0.5) * 20
    );
    
    return stream;
  }
  
  update(frequency) {
    this.streams.forEach(stream => {
      stream.position.y -= 0.1 * (1 + frequency);
      if (stream.position.y < -15) {
        stream.position.y = 15;
      }
    });
  }
}

class VolumetricLight {
  constructor(scene) {
    this.scene = scene;
    this.rays = new THREE.Group();
    
    const rayCount = 8;
    const rayGeometry = new THREE.CylinderGeometry(0.1, 0.1, 20, 32);
    const rayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        intensity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        varying vec2 vUv;
        void main() {
          float alpha = smoothstep(0.0, 0.2, 1.0 - length(vUv - vec2(0.5)));
          vec3 color = vec3(0.0, 1.0, 0.5) * intensity;
          gl_FragColor = vec4(color, alpha * 0.3);
        }
      `
    });
    
    for (let i = 0; i < rayCount; i++) {
      const ray = new THREE.Mesh(rayGeometry, rayMaterial.clone());
      const angle = (i / rayCount) * Math.PI * 2;
      ray.position.set(Math.cos(angle) * 5, 0, Math.sin(angle) * 5);
      ray.rotation.z = Math.random() * Math.PI;
      this.rays.add(ray);
    }
    
    scene.add(this.rays);
  }
  
  update(time, frequency) {
    this.rays.children.forEach((ray, i) => {
      ray.material.uniforms.time.value = time;
      ray.material.uniforms.intensity.value = 0.5 + frequency * 0.5;
      ray.rotation.z += 0.01 * (1 + frequency);
    });
  }
}

class ColorPalette {
  constructor() {
    this.colors = [
      new THREE.Color(0x00ff88),
      new THREE.Color(0x00ffff),
      new THREE.Color(0xff00ff),
      new THREE.Color(0xffff00)
    ];
    this.currentIndex = 0;
    this.targetColor = this.colors[0];
    this.currentColor = this.colors[0].clone();
  }
  
  update(time, frequency) {
    if (frequency > 0.8 && Math.random() > 0.9) {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      this.targetColor = this.colors[this.currentIndex];
    }
    
    this.currentColor.lerp(this.targetColor, 0.05);
    return this.currentColor;
  }
}

class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.basePosition = camera.position.clone();
    this.targetPosition = this.basePosition.clone();
  }
  
  update(frequency) {
    // Add subtle camera movement based on audio
    const movement = frequency * 0.5;
    this.targetPosition.x = this.basePosition.x + Math.sin(Date.now() * 0.001) * movement;
    this.targetPosition.y = this.basePosition.y + Math.cos(Date.now() * 0.0015) * movement;
    
    this.camera.position.lerp(this.targetPosition, 0.05);
    this.camera.lookAt(0, 0, 0);
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
    
    // Add neural pathways
    this.neuralPathways = new NeuralPathways(this.scene, this.crystalFragments);
    
    this.digitalRain = new DigitalRain(this.scene);
    this.volumetricLight = new VolumetricLight(this.scene);
    this.colorPalette = new ColorPalette();
    this.cameraController = new CameraController(this.camera);
    
    // Add chromatic aberration effect
    const chromaticAberrationPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        distortion: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float distortion;
        varying vec2 vUv;
        void main() {
          vec2 offset = distortion * (vUv - 0.5);
          vec4 cr = texture2D(tDiffuse, vUv + offset);
          vec4 cg = texture2D(tDiffuse, vUv);
          vec4 cb = texture2D(tDiffuse, vUv - offset);
          gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);
        }
      `
    });
    this.composer.addPass(chromaticAberrationPass);
    this.chromaticAberrationPass = chromaticAberrationPass;
    
    // Add interaction listener
    this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
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
      
      // Update all the new systems
      this.digitalRain.update(frequency);
      this.volumetricLight.update(elapsedTime, frequency);
      this.cameraController.update(frequency);
      
      // Update color palette
      const currentColor = this.colorPalette.update(elapsedTime, frequency);
      this.crystal.material.color.copy(currentColor);
      
      // Update chromatic aberration
      this.chromaticAberrationPass.uniforms.distortion.value = frequency * 0.02;
      
      // Scale point light intensity with audio
      this.scene.children.forEach(child => {
        if (child.isPointLight) {
          child.intensity = 1 + frequency * 2;
        }
      });
      
      // Update particle system
      this.particleSystem.update(frequency);
      
      // Scale crystal fragments with audio
      this.crystalFragments.children.forEach(fragment => {
        const scale = 1 + frequency * 0.5;
        fragment.scale.set(scale, scale, scale);
      });
      
      this.dnaHelix.update(elapsedTime, frequency);
      this.digitalSymbols.update(elapsedTime, frequency);
      
      // Update neural pathways
      this.neuralPathways.update(frequency);
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

  onMouseClick(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObject(this.crystal);

    if (intersects.length > 0) {
      // Change crystal color on click
      this.crystal.material.color.setHex(Math.random() * 0xffffff);

      // Trigger a small burst of particles
      const burstCount = 10;
      const burstGeometry = new THREE.BufferGeometry();
      const burstPositions = new Float32Array(burstCount * 3);
      const burstVelocities = new Float32Array(burstCount * 3);

      for (let i = 0; i < burstCount; i++) {
        const i3 = i * 3;
        burstPositions[i3] = intersects[0].point.x;
        burstPositions[i3 + 1] = intersects[0].point.y;
        burstPositions[i3 + 2] = intersects[0].point.z;

        burstVelocities[i3] = (Math.random() - 0.5) * 0.5;
        burstVelocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
        burstVelocities[i3 + 2] = (Math.random() - 0.5) * 0.5;
      }

      burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
      burstGeometry.setAttribute('velocity', new THREE.BufferAttribute(burstVelocities, 3));

      const burstMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: this.crystal.material.color,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1
      });

      const particleBurst = new THREE.Points(burstGeometry, burstMaterial);
      this.scene.add(particleBurst);

      // Animate the burst
      const startTime = this.clock.getElapsedTime();
      const animateBurst = () => {
        const time = this.clock.getElapsedTime() - startTime;
        const positions = particleBurst.geometry.attributes.position.array;
        const velocities = particleBurst.geometry.attributes.velocity.array;
        const decayFactor = 0.98;

        for (let i = 0; i < burstCount * 3; i += 3) {
          positions[i] += velocities[i] * 0.1;
          positions[i + 1] += velocities[i + 1] * 0.1;
          positions[i + 2] += velocities[i + 2] * 0.1;
          velocities[i] *= decayFactor;
          velocities[i + 1] *= decayFactor;
          velocities[i + 2] *= decayFactor;
        }

        particleBurst.geometry.attributes.position.needsUpdate = true;
        particleBurst.material.opacity -= 0.02;

        if (particleBurst.material.opacity > 0) {
          requestAnimationFrame(animateBurst);
        } else {
          this.scene.remove(particleBurst);
          particleBurst.geometry.dispose();
          particleBurst.material.dispose();
        }
      };

      animateBurst();
    }
  }
}

const experience = new Experience();