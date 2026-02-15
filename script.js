// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const sideNav = document.getElementById('sideNav');
const closeNav = document.getElementById('closeNav');

navToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
});

closeNav.addEventListener('click', () => {
    sideNav.classList.remove('active');
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
        sideNav.classList.remove('active');
    }
});

// Download Resume Function
const downloadResumeBtn = document.getElementById('downloadResume');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'Rishigesha_Resume_.pdf';
        link.download = 'Rishigesha_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Visual feedback
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Downloaded!';
        downloadResumeBtn.style.background = '#00ff00';
        
        setTimeout(() => {
            downloadResumeBtn.innerHTML = originalText;
            downloadResumeBtn.style.background = '';
        }, 2000);
    });
}

// Three.js 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Create particle system
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;
    
    // Cyan and magenta colors
    const color = Math.random() > 0.5 ? 
        new THREE.Color(0x00ffff) : 
        new THREE.Color(0xff00ff);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Create geometric shapes
const geometries = [
    new THREE.TorusGeometry(1, 0.3, 16, 100),
    new THREE.OctahedronGeometry(1),
    new THREE.IcosahedronGeometry(1)
];

const shapes = [];
for (let i = 0; i < 5; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = (Math.random() - 0.5) * 20;
    mesh.position.y = (Math.random() - 0.5) * 20;
    mesh.position.z = (Math.random() - 0.5) * 10;
    
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    
    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        }
    };
    
    scene.add(mesh);
    shapes.push(mesh);
}

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particle system
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;
    
    // Animate shapes
    shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});
