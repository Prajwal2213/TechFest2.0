import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicParticles = ({ canSignalReady, onReady }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, points;
    let bgLayers = [];
    let particlesGeometry;
    let animationFrameId;

    // --- Layout Cache to Prevent Forced Reflow ---
    let cachedScrollHeight = 0;
    let cachedInnerHeight = 0;
    let cachedWidth = 0;

    // --- Performance Optimization: Throttling & Passive Listeners ---
    let resizeTimeout;
    
    // Initial values batching
    const updateDimensions = () => {
      cachedWidth = window.innerWidth;
      cachedInnerHeight = window.innerHeight;
      cachedScrollHeight = document.documentElement.scrollHeight;
    };

    updateDimensions();

    const isMobile = cachedWidth < 768;
    const aspect = cachedWidth / cachedInnerHeight;

    // Adaptive Configuration
    const particleCount = cachedWidth < 480 ? 12000 : (cachedWidth < 1024 ? 25000 : 40000);
    const pSize = isMobile ? 0.45 : 0.28;
    const cameraZ = aspect < 1 ? 40 : (aspect < 1.5 ? 30 : 24);
    const earthSideOffset = cachedWidth > 1100 ? 7.0 : 0;
    const influenceRadius = isMobile ? 3.0 : 4.0;

    const shapeMeta = [
      { name: "The Earth" }, { name: "The Galaxy" }, 
      { name: "The Rocket" }, { name: "The Infinity" }
    ];

    const shapes = {};
    shapeMeta.forEach(m => shapes[m.name] = new Float32Array(particleCount * 3));

    const scatterOffsets = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollPercent = 0;
    let targetScrollPercent = 0;

    const COLOR_BLUE = [0.0, 0.7, 1.0];

    // ... createCircleTexture logic remains same ...
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128; canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.1, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.25)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createCircleTexture();

    // ... generateShapes logic remains same ...
    const generateShapes = () => {
      const mapCanvas = document.createElement('canvas');
      const mapCtx = mapCanvas.getContext('2d');
      mapCanvas.width = 1024; mapCanvas.height = 512;
      mapCtx.fillStyle = 'white';

      const drawPath = (coords) => {
        mapCtx.beginPath();
        mapCtx.moveTo(coords[0][0] * 0.5, coords[0][1] * 0.5);
        for(let i=1; i<coords.length; i++) mapCtx.lineTo(coords[i][0] * 0.5, coords[i][1] * 0.5);
        mapCtx.closePath(); mapCtx.fill();
      };

      const paths = [
        [[300, 200], [450, 100], [600, 80], [750, 120], [820, 250], [800, 450], [700, 530], [600, 560], [530, 550], [420, 520], [300, 450], [240, 350], [260, 250]],
        [[820, 50], [920, 70], [890, 170], [800, 150]],
        [[600, 630], [750, 630], [840, 750], [820, 920], [730, 1010], [620, 1010], [560, 920], [550, 750]],
        [[940, 480], [1100, 430], [1250, 420], [1350, 460], [1400, 550], [1450, 700], [1400, 880], [1320, 960], [1150, 980], [1050, 940], [960, 820], [910, 700], [930, 580]],
        [[1000, 420], [1150, 280], [1120, 150], [1250, 120], [1380, 150], [1420, 350], [1350, 420], [1200, 440]],
        [[1400, 150], [1600, 100], [1850, 80], [2000, 150], [2040, 300], [1950, 600], [1750, 700], [1450, 650]],
        [[1740, 780], [1950, 780], [2040, 890], [1980, 1000], [1800, 1010], [1720, 940], [1680, 860]]
      ];
      paths.forEach(p => drawPath(p));

      let imgData = mapCtx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;
      let earthPool = [];
      for (let y = 0; y < mapCanvas.height; y += 2) {
        for (let x = 0; x < mapCanvas.width; x += 2) {
          if (imgData[(y * mapCanvas.width + x) * 4] > 128) {
            earthPool.push({ x: x / mapCanvas.width, y: y / mapCanvas.height });
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        scatterOffsets[i3] = (Math.random() - 0.5) * 15;
        scatterOffsets[i3+1] = (Math.random() - 0.5) * 15;
        scatterOffsets[i3+2] = (Math.random() - 0.5) * 15;

        if (earthPool.length > 0) {
          const p = earthPool[Math.floor(Math.random() * earthPool.length)];
          const lon = p.x * Math.PI * 2 - Math.PI;
          const lat = -(p.y * Math.PI - Math.PI / 2);
          shapes["The Earth"][i3] = (8.0 * Math.cos(lat) * Math.cos(lon)) + earthSideOffset;
          shapes["The Earth"][i3+1] = 8.0 * Math.sin(lat);
          shapes["The Earth"][i3+2] = 8.0 * Math.cos(lat) * Math.sin(lon);
        }

        const gRatio = i / particleCount;
        if (gRatio < 0.25) { 
          const r = Math.pow(Math.random(), 0.5) * 3.5;
          const phi = Math.acos((Math.random() * 2) - 1);
          const theta = Math.random() * Math.PI * 2;
          shapes["The Galaxy"][i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes["The Galaxy"][i3+1] = r * Math.sin(phi) * Math.sin(theta);
          shapes["The Galaxy"][i3+2] = r * Math.cos(phi) * 0.7;
        } else if (gRatio < 0.90) {
          const t = (gRatio - 0.25) / 0.65; 
          const angle = t * 7.5 + ((i % 2) * Math.PI); 
          const radius = 2.5 + t * 9.5; 
          const spread = (1.0 - t * 0.5) * 1.5; 
          shapes["The Galaxy"][i3] = Math.cos(angle) * radius + (Math.random()-0.5)*spread;
          shapes["The Galaxy"][i3+1] = Math.sin(angle) * radius + (Math.random()-0.5)*spread;
          shapes["The Galaxy"][i3+2] = (Math.random()-0.5) * 0.4;
        } else {
          const r = 3.0 + Math.random() * 11.0;
          shapes["The Galaxy"][i3] = Math.cos(Math.random()*Math.PI*2) * r;
          shapes["The Galaxy"][i3+1] = Math.sin(Math.random()*Math.PI*2) * r;
          shapes["The Galaxy"][i3+2] = (Math.random()-0.5) * 4.0;
        }

        const rRatio = i / particleCount;
        if (rRatio < 0.5) { 
          const h = (Math.random() - 0.5) * 8; 
          const rMax = 2.5; 
          shapes["The Rocket"][i3] = Math.cos(Math.random()*Math.PI*2) * (h > 0 ? rMax * Math.pow(1 - (h / 4), 0.6) : rMax);
          shapes["The Rocket"][i3+1] = h;
          shapes["The Rocket"][i3+2] = Math.sin(Math.random()*Math.PI*2) * (h > 0 ? rMax * Math.pow(1 - (h / 4), 0.6) : rMax);
        } else if (rRatio < 0.75) { 
          shapes["The Rocket"][i3] = ((i % 2 === 0) ? -3.0 : 3.0) + Math.cos(Math.random()*Math.PI*2) * 0.9;
          shapes["The Rocket"][i3+1] = -2.5 + (Math.random() * 4) - 1.3;
          shapes["The Rocket"][i3+2] = Math.sin(Math.random()*Math.PI*2) * 0.9;
        } else {
          shapes["The Rocket"][i3] = (Math.random()-0.5)*2; shapes["The Rocket"][i3+1] = -5 - Math.random()*5; shapes["The Rocket"][i3+2] = (Math.random()-0.5)*2;
        }

        const infT = (i / particleCount) * Math.PI * 2; 
        const den = 1 + Math.pow(Math.sin(infT), 2);
        shapes["The Infinity"][i3] = (10 * Math.cos(infT)) / den; 
        shapes["The Infinity"][i3+1] = (10 * Math.sin(infT) * Math.cos(infT)) / den; 
        shapes["The Infinity"][i3+2] = (Math.random() - 0.5) * 1.2;

        colors[i3] = COLOR_BLUE[0]; colors[i3+1] = COLOR_BLUE[1]; colors[i3+2] = COLOR_BLUE[2];
      }
    };

    // ... createStarfield logic remains same ...
    const createStarfield = (count, minR, maxR, size, op) => {
      const pos = new Float32Array(count * 3);
      const starColors = new Float32Array(count * 3);
      const palette = [[1.0, 0.95, 0.5], [0.1, 0.45, 1.0]];
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3+1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3+2] = r * Math.cos(phi);
        const isGold = Math.random() > 0.5;
        const bright = (0.8 + Math.random() * 0.4) * (isGold ? 1.4 : 0.9);
        const chosen = palette[isGold ? 0 : 1];
        starColors[i3] = Math.min(1.0, chosen[0] * bright); 
        starColors[i3+1] = Math.min(1.0, chosen[1] * bright); 
        starColors[i3+2] = Math.min(1.0, chosen[2] * bright);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({ size, vertexColors: true, transparent: true, opacity: op, blending: THREE.AdditiveBlending, map: starTexture, depthWrite: false }));
    };

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, cachedWidth / cachedInnerHeight, 0.1, 8000);
      camera.position.z = cameraZ;

      renderer = new THREE.WebGLRenderer({ canvas: containerRef.current, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(cachedWidth, cachedInnerHeight);

      generateShapes();
      
      const layer1 = createStarfield(isMobile ? 15000 : 40000, 20, 1200, 1.1, 0.95);
      const layer2 = createStarfield(isMobile ? 30000 : 80000, 1200, 3500, 0.85, 0.8);
      scene.add(layer1, layer2);
      bgLayers = [layer1, layer2];

      currentPositions.set(shapes["The Earth"]);
      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      points = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ size: pSize, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, map: starTexture, depthWrite: false }));
      scene.add(points);
      
      animate();
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      scrollPercent = THREE.MathUtils.lerp(scrollPercent, targetScrollPercent, 0.05);
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.1);
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.1);

      const time = Date.now() * 0.001;
      const cosE = Math.cos(time * 0.25), sinE = Math.sin(time * 0.25);
      const posAttr = particlesGeometry.attributes.position;
      const positions = posAttr.array;
      
      const stageCount = shapeMeta.length - 1;
      const progress = scrollPercent * stageCount;
      let index = Math.floor(progress);
      if (index >= stageCount) index = stageCount - 1;
      const localT = Math.max(0, Math.min(1, progress - index));
      
      const sourcePos = shapes[shapeMeta[index].name];
      const targetPos = shapes[shapeMeta[index + 1]?.name || shapeMeta[index].name];
      const scatter = Math.sin(Math.PI * localT) * 0.15;
      const mouse3D = new THREE.Vector3(mouse.x * (isMobile ? 15 : 20), mouse.y * (isMobile ? 12 : 16), 0);

      // Loop optimization: Minimize scope lookups inside the hot loop
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let sx = sourcePos[i3], sy = sourcePos[i3+1], sz = sourcePos[i3+2];
        let tx = targetPos[i3], ty = targetPos[i3+1], tz = targetPos[i3+2];

        if (shapeMeta[index].name === "The Earth") {
          let rx = sx - earthSideOffset; sx = (rx * cosE - sz * sinE) + earthSideOffset; sz = rx * sinE + sz * cosE;
        }
        if (shapeMeta[index+1]?.name === "The Earth") {
          let rx = tx - earthSideOffset; tx = (rx * cosE - tz * sinE) + earthSideOffset; tz = rx * sinE + tz * cosE;
        }

        const fx = THREE.MathUtils.lerp(sx, tx, localT) + (scatterOffsets[i3] * scatter);
        const fy = THREE.MathUtils.lerp(sy, ty, localT) + (scatterOffsets[i3+1] * scatter);
        const fz = THREE.MathUtils.lerp(sz, tz, localT) + (scatterOffsets[i3+2] * scatter);

        const dx = positions[i3] - mouse3D.x, dy = positions[i3+1] - mouse3D.y, dz = (positions[i3+2] - mouse3D.z) * 0.5;
        const dSq = dx*dx + dy*dy + dz*dz;
        let rx_m = 0, ry_m = 0, rz_m = 0;

        if (dSq < influenceRadius * influenceRadius) {
          const dist = Math.sqrt(dSq);
          const force = (influenceRadius - dist) / influenceRadius;
          const str = force * force * 0.8; 
          rx_m = (dx/dist)*str; ry_m = (dy/dist)*str; rz_m = (dz/dist)*str;
        }

        positions[i3] = THREE.MathUtils.lerp(positions[i3], fx, 0.08) + rx_m;
        positions[i3+1] = THREE.MathUtils.lerp(positions[i3+1], fy, 0.08) + ry_m;
        positions[i3+2] = THREE.MathUtils.lerp(positions[i3+2], fz, 0.08) + rz_m;
      }

      posAttr.needsUpdate = true;
      points.rotation.y = THREE.MathUtils.lerp(points.rotation.y, mouse.x * 0.1, 0.05);
      bgLayers[0].rotation.y += 0.00015; bgLayers[1].rotation.y -= 0.0001;
      
      renderer.render(scene, camera);
      if (canSignalReady && onReady) onReady();
    };

    // Throttled Resize Handler
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateDimensions();
        camera.aspect = cachedWidth / cachedInnerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(cachedWidth, cachedInnerHeight);
      }, 150);
    };

    const handleInput = (clientX, clientY) => {
      mouse.targetX = (clientX / cachedWidth) * 2 - 1;
      mouse.targetY = -(clientY / cachedInnerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollH = cachedScrollHeight - cachedInnerHeight;
      if (scrollH > 0) targetScrollPercent = window.scrollY / scrollH;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', (e) => handleInput(e.clientX, e.clientY), { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (starTexture) starTexture.dispose();
    };
  }, [canSignalReady, onReady]);

  return (
    <canvas 
      ref={containerRef} 
      className="block w-full h-full outline-none bg-black" 
      style={{ willChange: 'transform' }} // GPU Hint
    />
  );
};

export default CosmicParticles;