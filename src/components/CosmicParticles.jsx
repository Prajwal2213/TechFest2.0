import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * CosmicParticles: The 3D Engine Component
 * Handles the particle system and the morphing logic.
 */
const CosmicParticles = ({ scrollPercent }) => {
  const canvasRef = useRef(null);
  const mountRef = useRef(true);
  const scrollRef = useRef(0);

  // Sync scroll percentage to a ref to avoid re-initializing the Three.js scene
  useEffect(() => {
    scrollRef.current = scrollPercent;
  }, [scrollPercent]);

  useEffect(() => {
    mountRef.current = true;
    let scene, camera, renderer, points;
    let bgLayer1, bgLayer2, bgLayer3;
    let particlesGeometry;
    const particleCount = 12000;

    let smoothedScroll = 0;

    const shapes = {
      globe: new Float32Array(particleCount * 3),
      galaxy: new Float32Array(particleCount * 3),
      rocket: new Float32Array(particleCount * 3),
      robot: new Float32Array(particleCount * 3),
      circuit: new Float32Array(particleCount * 3),
      atom: new Float32Array(particleCount * 3),
      dna: new Float32Array(particleCount * 3),
      saturn: new Float32Array(particleCount * 3),
      infinity: new Float32Array(particleCount * 3),
      diamond: new Float32Array(particleCount * 3),
      brain: new Float32Array(particleCount * 3),
      lotus: new Float32Array(particleCount * 3),
      cube: new Float32Array(particleCount * 3),
      vortex: new Float32Array(particleCount * 3)
    };

    const scatterOffsets = new Float32Array(particleCount * 3);
    let colors = new Float32Array(particleCount * 3);
    let currentPositions = new Float32Array(particleCount * 3);
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isMouseDown = false;

    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    }

    const starTexture = createCircleTexture();

    function generateShapes() {
      const mapCanvas = document.createElement('canvas');
      const mapCtx = mapCanvas.getContext('2d');
      mapCanvas.width = 1000;
      mapCanvas.height = 500;
      mapCtx.fillStyle = 'white';

      function drawPath(coords) {
        mapCtx.beginPath();
        mapCtx.moveTo(coords[0][0], coords[0][1]);
        for (let i = 1; i < coords.length; i++) mapCtx.lineTo(coords[i][0], coords[i][1]);
        mapCtx.closePath();
        mapCtx.fill();
      }

      drawPath([[100, 100], [250, 80], [350, 150], [300, 250], [200, 300], [150, 250], [100, 200]]);
      drawPath([[280, 280], [350, 280], [320, 450], [280, 450], [250, 350]]);
      drawPath([[450, 180], [580, 180], [620, 250], [580, 420], [500, 420], [420, 280]]);
      drawPath([[420, 170], [550, 50], [850, 50], [900, 150], [800, 280], [650, 250], [600, 150]]);
      drawPath([[750, 330], [880, 330], [850, 420], [780, 420]]);
      drawPath([[100, 480], [900, 480], [850, 495], [150, 495]]);

      const imgData = mapCtx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;
      const landPoints = [];
      for (let y = 0; y < mapCanvas.height; y += 2) {
        for (let x = 0; x < mapCanvas.width; x += 2) {
          if (imgData[(y * mapCanvas.width + x) * 4] > 0) {
            landPoints.push({ x: x / mapCanvas.width, y: y / mapCanvas.height });
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        scatterOffsets[i3] = (Math.random() - 0.5) * 6;
        scatterOffsets[i3 + 1] = (Math.random() - 0.5) * 6;
        scatterOffsets[i3 + 2] = (Math.random() - 0.5) * 6;

        // 1. GLOBE
        let lat, lon;
        if (i < particleCount * 0.98 && landPoints.length > 0) {
          const p = landPoints[Math.floor(Math.random() * landPoints.length)];
          lon = p.x * Math.PI * 2 - Math.PI;
          lat = -(p.y * Math.PI - Math.PI / 2);
        } else {
          lon = Math.random() * Math.PI * 2 - Math.PI;
          lat = Math.random() * Math.PI - Math.PI / 2;
        }
        const rGlobe = 7.0;
        shapes.globe[i3] = rGlobe * Math.cos(lat) * Math.cos(lon);
        shapes.globe[i3 + 1] = rGlobe * Math.sin(lat);
        shapes.globe[i3 + 2] = rGlobe * Math.cos(lat) * Math.sin(lon);

        // 2. GALAXY
        if (i < particleCount * 0.2) {
          const r = Math.pow(Math.random(), 2) * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          shapes.galaxy[i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes.galaxy[i3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.4;
          shapes.galaxy[i3 + 2] = r * Math.cos(phi);
        } else {
          const arm = i % 3;
          const r = 3 + Math.random() * 9;
          const angle = r * 1.8 + (arm * Math.PI * 2 / 3);
          shapes.galaxy[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.8;
          shapes.galaxy[i3 + 1] = (Math.random() - 0.5) * (1.2 / r);
          shapes.galaxy[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.8;
        }

        // 3. ROCKET
        const rI = i / particleCount;
        if (rI < 0.2) {
          const h = 4 + Math.random() * 2;
          const rad = (6.5 - h) * 0.8;
          const ang = Math.random() * Math.PI * 2;
          shapes.rocket[i3] = Math.cos(ang) * rad;
          shapes.rocket[i3 + 1] = h;
          shapes.rocket[i3 + 2] = Math.sin(ang) * rad;
        } else if (rI < 0.8) {
          const h = -4 + Math.random() * 8.5;
          const rad = 1.4;
          const ang = Math.random() * Math.PI * 2;
          shapes.rocket[i3] = Math.cos(ang) * rad;
          shapes.rocket[i3 + 1] = h;
          shapes.rocket[i3 + 2] = Math.sin(ang) * rad;
        } else {
          const h = -5.5 + Math.random() * 2;
          const ang = (Math.floor(i % 4) * Math.PI * 2) / 4;
          const rad = 1.4 + (Math.abs(h + 4) * 2.2);
          shapes.rocket[i3] = Math.cos(ang) * rad;
          shapes.rocket[i3 + 1] = h;
          shapes.rocket[i3 + 2] = Math.sin(ang) * rad;
        }

        // 4. ROBOT
        const robI = i / particleCount;
        if (robI < 0.1) {
          const r = 1.0;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          shapes.robot[i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes.robot[i3 + 1] = 5 + r * Math.sin(phi) * Math.sin(theta);
          shapes.robot[i3 + 2] = r * Math.cos(phi);
        } else if (robI < 0.5) {
          shapes.robot[i3] = (Math.random() - 0.5) * 3.2;
          shapes.robot[i3 + 1] = 0.5 + (Math.random() * 4.2);
          shapes.robot[i3 + 2] = (Math.random() - 0.5) * 1.8;
        } else {
          const side = i % 2 === 0 ? -1.1 : 1.1;
          shapes.robot[i3] = side + (Math.random() - 0.5) * 0.8;
          shapes.robot[i3 + 1] = -5.5 + (Math.random() * 6.5);
          shapes.robot[i3 + 2] = (Math.random() - 0.5) * 0.9;
        }

        // 5. CIRCUIT
        if (i < particleCount * 0.4) {
          shapes.circuit[i3] = (Math.round((Math.random() - 0.5) * 10)) * 1.2;
          shapes.circuit[i3 + 1] = (Math.round((Math.random() - 0.5) * 10)) * 1.2;
          shapes.circuit[i3 + 2] = 0;
        } else {
          const axis = i % 2;
          const dir = i % 4 < 2 ? 1 : -1;
          const length = 4 + Math.random() * 9;
          shapes.circuit[i3] = axis === 0 ? dir * length : (Math.round((Math.random() - 0.5) * 10)) * 1.2;
          shapes.circuit[i3 + 1] = axis === 1 ? dir * length : (Math.round((Math.random() - 0.5) * 10)) * 1.2;
          shapes.circuit[i3 + 2] = 0;
        }

        // 6. ATOM
        if (i < particleCount * 0.15) {
          const r = Math.random() * 1.8;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          shapes.atom[i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes.atom[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          shapes.atom[i3 + 2] = r * Math.cos(phi);
        } else {
          const ring = i % 3;
          const r = 6.5 + (ring * 2.0);
          const ang = Math.random() * Math.PI * 2;
          const tilt = (ring * Math.PI) / 3;
          shapes.atom[i3] = Math.cos(ang) * r;
          shapes.atom[i3 + 1] = (Math.sin(ang) * r) * Math.cos(tilt);
          shapes.atom[i3 + 2] = (Math.sin(ang) * r) * Math.sin(tilt);
        }

        // 7. DNA
        const dnaIdx = i / particleCount;
        const dnaY = (dnaIdx - 0.5) * 18;
        const dnaAngle = dnaY * 1.8;
        const dnaStrand = i % 2 === 0 ? 0 : Math.PI;
        if (i % 12 < 10) {
          shapes.dna[i3] = Math.cos(dnaAngle + dnaStrand) * 2.8;
          shapes.dna[i3 + 1] = dnaY;
          shapes.dna[i3 + 2] = Math.sin(dnaAngle + dnaStrand) * 2.8;
        } else {
          const lVal = Math.random();
          shapes.dna[i3] = Math.cos(dnaAngle) * 2.8 * (lVal * 2 - 1);
          shapes.dna[i3 + 1] = dnaY;
          shapes.dna[i3 + 2] = Math.sin(dnaAngle) * 2.8 * (lVal * 2 - 1);
        }

        // 8. SATURN
        if (i < particleCount * 0.45) {
          const r = 4.2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          shapes.saturn[i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes.saturn[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          shapes.saturn[i3 + 2] = r * Math.cos(phi);
        } else {
          const r = 6.5 + Math.random() * 4.5;
          const theta = Math.random() * Math.PI * 2;
          const tilt = Math.PI / 5.5;
          shapes.saturn[i3] = Math.cos(theta) * r;
          shapes.saturn[i3 + 1] = Math.sin(theta) * r * Math.sin(tilt);
          shapes.saturn[i3 + 2] = Math.sin(theta) * r * Math.cos(tilt);
        }

        // 9. INFINITY
        const infT = (i / particleCount) * Math.PI * 2;
        const infScale = 14 / (3 - Math.cos(2 * infT));
        shapes.infinity[i3] = infScale * Math.cos(infT);
        shapes.infinity[i3 + 1] = infScale * Math.sin(2 * infT) / 2;
        shapes.infinity[i3 + 2] = (Math.random() - 0.5) * 1.2;

        // 10. DIAMOND
        const dSeg = i % 8;
        const dRadius = 8;
        const dVertices = [[0, dRadius, 0], [0, -dRadius, 0], [dRadius, 0, 0], [-dRadius, 0, 0], [0, 0, dRadius], [0, 0, -dRadius], [dRadius / 1.4, dRadius / 1.4, 0], [-dRadius / 1.4, -dRadius / 1.4, 0]];
        const dv1 = dVertices[dSeg];
        const dv2 = dVertices[(dSeg + 1) % 8];
        const dL = Math.random();
        shapes.diamond[i3] = dv1[0] + (dv2[0] - dv1[0]) * dL + (Math.random() - 0.5) * 0.2;
        shapes.diamond[i3 + 1] = dv1[1] + (dv2[1] - dv1[1]) * dL + (Math.random() - 0.5) * 0.2;
        shapes.diamond[i3 + 2] = dv1[2] + (dv2[2] - dv1[2]) * dL + (Math.random() - 0.5) * 0.2;

        // 11. BRAIN
        const nodeX = (Math.random() - 0.5) * 10;
        const nodeY = (Math.random() - 0.5) * 10;
        const nodeZ = (Math.random() - 0.5) * 10;
        shapes.brain[i3] = nodeX + (Math.random() - 0.5) * 2;
        shapes.brain[i3 + 1] = nodeY + (Math.random() - 0.5) * 2;
        shapes.brain[i3 + 2] = nodeZ + (Math.random() - 0.5) * 2;

        // 12. LOTUS FLOWER
        const petal = i % 8;
        const pR = 2 + Math.random() * 7;
        const pTheta = (petal * Math.PI * 2) / 8 + (Math.sin(pR * 0.5) * 0.5);
        shapes.lotus[i3] = Math.cos(pTheta) * pR;
        shapes.lotus[i3 + 1] = Math.sin(pR * 0.8) * 3;
        shapes.lotus[i3 + 2] = Math.sin(pTheta) * pR;

        // 13. CUBE
        const side = i % 6;
        const cSize = 6;
        const cVal1 = (Math.random() - 0.5) * cSize * 2;
        const cVal2 = (Math.random() - 0.5) * cSize * 2;
        if (side === 0) { shapes.cube[i3] = cSize; shapes.cube[i3 + 1] = cVal1; shapes.cube[i3 + 2] = cVal2; }
        else if (side === 1) { shapes.cube[i3] = -cSize; shapes.cube[i3 + 1] = cVal1; shapes.cube[i3 + 2] = cVal2; }
        else if (side === 2) { shapes.cube[i3] = cVal1; shapes.cube[i3 + 1] = cSize; shapes.cube[i3 + 2] = cVal2; }
        else if (side === 3) { shapes.cube[i3] = cVal1; shapes.cube[i3 + 1] = -cSize; shapes.cube[i3 + 2] = cVal2; }
        else if (side === 4) { shapes.cube[i3] = cVal1; shapes.cube[i3 + 1] = cVal2; shapes.cube[i3 + 2] = cSize; }
        else { shapes.cube[i3] = cVal1; shapes.cube[i3 + 1] = cVal2; shapes.cube[i3 + 2] = -cSize; }

        // 14. VORTEX
        const vAngle = (i / particleCount) * Math.PI * 40;
        const vRadius = (i / particleCount) * 8;
        const vHeight = (i / particleCount) * 20 - 10;
        shapes.vortex[i3] = Math.cos(vAngle) * vRadius;
        shapes.vortex[i3 + 1] = vHeight;
        shapes.vortex[i3 + 2] = Math.sin(vAngle) * vRadius;

        const c = new THREE.Color();
        const h = 0.55 + Math.random() * 0.1;
        const s = 0.8 + Math.random() * 0.2;
        const l = 0.45 + Math.random() * 0.3;
        c.setHSL(h, s, l);
        colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
      }
    }

    const LOOP_RANGE = 800;

    function createStarfield(count, radiusRange, size, opacity) {
      const pos = new Float32Array(count * 3);
      const starColors = new Float32Array(count * 3);
      const white = new THREE.Color(0xffffff);
      const blue = new THREE.Color(0xade8ff);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = Math.random() * LOOP_RANGE - (LOOP_RANGE / 2);
        pos[i3 + 2] = r * Math.cos(phi);
        const color = Math.random() > 0.4 ? white : blue;
        starColors[i3] = color.r; starColors[i3 + 1] = color.g; starColors[i3 + 2] = color.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      const mat = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        map: starTexture,
        depthWrite: false
      });
      return new THREE.Points(geo, mat);
    }

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1500);
      camera.position.z = 13;

      const canvas = canvasRef.current;
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      generateShapes();

      bgLayer1 = createStarfield(40000, [80, 300], 0.15, 0.45);
      scene.add(bgLayer1);
      bgLayer2 = createStarfield(20000, [40, 150], 0.25, 0.55);
      scene.add(bgLayer2);
      bgLayer3 = createStarfield(18000, [20, 100], 0.4, 0.7);
      scene.add(bgLayer3);

      currentPositions.set(shapes.globe);
      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        map: starTexture,
        depthWrite: false
      });

      points = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(points);

      const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const handleMouseMove = (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleMouseDown = () => isMouseDown = true;
      const handleMouseUp = () => isMouseDown = false;

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      animate();

      return () => {
  mountRef.current = false;

  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);

  if (points) {
    points.geometry.dispose();
    points.material.dispose();
    scene.remove(points);
  }

  [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
    if (layer) {
      layer.geometry.dispose();
      layer.material.dispose();
      scene.remove(layer);
    }
  });

  starTexture.dispose();

  renderer.dispose();
  renderer.forceContextLoss();
};
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function animate() {
      if (!mountRef.current) return;
      requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      smoothedScroll += (scrollRef.current - smoothedScroll) * 0.05;

      const time = Date.now() * 0.001;
      const positions = particlesGeometry.attributes.position.array;

      const stages = [
        shapes.globe, shapes.galaxy, shapes.rocket, shapes.robot,
        shapes.circuit, shapes.atom, shapes.dna, shapes.saturn,
        shapes.infinity, shapes.diamond, shapes.brain, shapes.lotus,
        shapes.cube, shapes.vortex
      ];

      const stageCount = stages.length - 1;
      const progress = smoothedScroll * stageCount;
      const index = Math.min(Math.floor(progress), stageCount - 1);
      const localT = progress - index;

      const source = stages[index];
      const target = stages[index + 1];

      const scatterFactor = Math.sin(localT * Math.PI) * 0.35;

      const mouse3D = new THREE.Vector3(mouse.x * 12, mouse.y * 7, 0);
      const repelRadius = isMouseDown ? 7.0 : 3.5;
      const repelStrength = isMouseDown ? 1.2 : 0.45;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const tx = lerp(source[i3], target[i3], localT);
        const ty = lerp(source[i3 + 1], target[i3 + 1], localT);
        const tz = lerp(source[i3 + 2], target[i3 + 2], localT);

        const finalTargetX = tx + (scatterOffsets[i3] * scatterFactor);
        const finalTargetY = ty + (scatterOffsets[i3 + 1] * scatterFactor);
        const finalTargetZ = tz + (scatterOffsets[i3 + 2] * scatterFactor);

        const dx = positions[i3] - mouse3D.x;
        const dy = positions[i3 + 1] - mouse3D.y;
        const dz = positions[i3 + 2] - mouse3D.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        let repelX = 0, repelY = 0, repelZ = 0;

        if (distSq < repelRadius * repelRadius) {
          const dist = Math.sqrt(distSq);
          const force = (repelRadius - dist) / repelRadius;
          repelX = (dx / dist) * force * repelStrength;
          repelY = (dy / dist) * force * repelStrength;
          repelZ = (dz / dist) * force * repelStrength;
        }

        positions[i3] += (finalTargetX - positions[i3]) * 0.08 + repelX;
        positions[i3 + 1] += (finalTargetY - positions[i3 + 1]) * 0.08 + repelY;
        positions[i3 + 2] += (finalTargetZ - positions[i3 + 2]) * 0.08 + repelZ;
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      const baseFallSpeed = time * 4.5;
      const halfRange = LOOP_RANGE / 2;
      const wrap = (val) => {
        const m = (val + halfRange) % LOOP_RANGE;
        return m < 0 ? m + LOOP_RANGE - halfRange : m - halfRange;
      };

      bgLayer1.position.y = wrap(-baseFallSpeed * 0.5);
      bgLayer2.position.y = wrap(-baseFallSpeed * 1.2);
      bgLayer3.position.y = wrap(-baseFallSpeed * 2.5);
      bgLayer3.material.opacity = 0.6 + Math.abs(Math.sin(time * 0.8)) * 0.35;

      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      points.rotation.y += 0.0015;
      renderer.render(scene, camera);
    }

    init();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

/**
 * Main App Component
 * Only keeps the background and the scroll-morphing logic.
 */
export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const percent = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black selection:bg-blue-500/30">
      <CosmicParticles scrollPercent={scrollPercent} />

      
      <div className="relative  w-full pointer-events-none" />
    </div>
  );
}