import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicParticles = ({ canSignalReady, onReady }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, points;
    let bgLayer1, bgLayer2, bgLayer3;
    let particlesGeometry;
    let animationFrameId;

    const particleCount = 40000;
    const COLOR_BLUE = [0.0, 0.7, 1.0];
    const SIDE_OFFSET = 7.0;
    const EARTH_RADIUS = 8.0;

    const shapeMeta = [
      { name: "The Earth" },
      { name: "The Galaxy" },
      { name: "The Rocket" },
      { name: "The Robo Symbol" },
      { name: "The Infinity" },
      { name: "The Microchip" },
      { name: "The Microprocessor" }
    ];

    const shapes = {};
    shapeMeta.forEach(m => shapes[m.name] = new Float32Array(particleCount * 3));

    const scatterOffsets = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollPercent = 0;
    let targetScrollPercent = 0;

    // --- Helper: Texture Creation ---
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

    // --- Core: Geometry Generation (The original logic) ---
    const generateShapes = () => {
      const mapCanvas = document.createElement('canvas');
      const mapCtx = mapCanvas.getContext('2d');
      mapCanvas.width = 2048;
      mapCanvas.height = 1024;
      mapCtx.fillStyle = 'white';

      const drawPath = (coords) => {
        mapCtx.beginPath();
        mapCtx.moveTo(coords[0][0], coords[0][1]);
        for (let i = 1; i < coords.length; i++) mapCtx.lineTo(coords[i][0], coords[i][1]);
        mapCtx.closePath(); mapCtx.fill();
      };

      // Drawing paths for Earth Map
      drawPath([[300, 200], [450, 100], [600, 80], [750, 120], [820, 250], [800, 450], [700, 530], [600, 560], [530, 550], [420, 520], [300, 450], [240, 350], [260, 250]]);
      drawPath([[820, 50], [920, 70], [890, 170], [800, 150]]);
      drawPath([[600, 630], [750, 630], [840, 750], [820, 920], [730, 1010], [620, 1010], [560, 920], [550, 750]]);
      drawPath([[940, 480], [1100, 430], [1250, 420], [1350, 460], [1400, 550], [1450, 700], [1400, 880], [1320, 960], [1150, 980], [1050, 940], [960, 820], [910, 700], [930, 580]]);
      drawPath([[1000, 420], [1150, 280], [1120, 150], [1250, 120], [1380, 150], [1420, 350], [1350, 420], [1200, 440]]);
      drawPath([[1400, 150], [1600, 100], [1850, 80], [2000, 150], [2040, 300], [1950, 600], [1750, 700], [1450, 650]]);
      drawPath([[920, 240], [980, 240], [960, 300], [910, 300]]);
      drawPath([[1280, 650], [1380, 640], [1440, 750], [1380, 840], [1300, 800]]);
      drawPath([[1500, 670], [1600, 670], [1650, 820], [1530, 840], [1480, 750]]);
      drawPath([[1980, 250], [2050, 350], [2020, 480], [1940, 350]]);
      drawPath([[1740, 780], [1950, 780], [2040, 890], [1980, 1000], [1800, 1010], [1720, 940], [1680, 860]]);
      drawPath([[350, 960], [1750, 960], [1700, 1010], [400, 1010]]);

      let imgData = mapCtx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;
      let earthPool = [];
      for (let y = 0; y < mapCanvas.height; y++) {
        for (let x = 0; x < mapCanvas.width; x++) {
          if (imgData[(y * mapCanvas.width + x) * 4] > 128) {
            earthPool.push({ x: x / mapCanvas.width, y: y / mapCanvas.height });
          }
        }
      }

      const hubsData = [[40.7, -74.0], [51.5, -0.1], [35.6, 139.6], [-33.8, 151.2], [-23.5, -46.6], [19.0, 72.8], [31.2, 121.4], [55.7, 37.6], [-26.2, 28.0], [25.2, 55.2]];
      const hubs = hubsData.map(coords => {
        const lat = coords[0] * Math.PI / 180;
        const lon = coords[1] * Math.PI / 180;
        return new THREE.Vector3(
          EARTH_RADIUS * Math.cos(lat) * Math.cos(lon),
          EARTH_RADIUS * Math.sin(lat),
          EARTH_RADIUS * Math.cos(lat) * Math.sin(lon)
        );
      });

      const connections = [];
      for (let i = 0; i < hubs.length; i++) {
        for (let j = 0; j < 3; j++) {
          const targetIdx = (i + 1 + Math.floor(Math.random() * (hubs.length - 1))) % hubs.length;
          connections.push([hubs[i], hubs[targetIdx]]);
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        scatterOffsets[i3] = (Math.random() - 0.5) * 40;
        scatterOffsets[i3+1] = (Math.random() - 0.5) * 40;
        scatterOffsets[i3+2] = (Math.random() - 0.5) * 40;

        // 1. EARTH logic
        const hubPointCount = Math.floor(particleCount * 0.05);
        const arcPointCount = Math.floor(particleCount * 0.35);
        const landPointCount = Math.floor(particleCount * 0.55);

        if (i < hubPointCount) {
          const hub = hubs[i % hubs.length];
          const offset = new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4);
          shapes["The Earth"][i3] = hub.x + offset.x + SIDE_OFFSET;
          shapes["The Earth"][i3+1] = hub.y + offset.y;
          shapes["The Earth"][i3+2] = hub.z + offset.z;
        } else if (i < hubPointCount + arcPointCount) {
          const conn = connections[i % connections.length];
          const t = Math.random();
          const pos = new THREE.Vector3().lerpVectors(conn[0], conn[1], t).normalize();
          const dist = conn[0].distanceTo(conn[1]);
          const altitude = Math.sin(t * Math.PI) * (dist * 0.25);
          pos.multiplyScalar(EARTH_RADIUS + altitude);
          shapes["The Earth"][i3] = pos.x + SIDE_OFFSET;
          shapes["The Earth"][i3+1] = pos.y;
          shapes["The Earth"][i3+2] = pos.z;
        } else if (i < hubPointCount + arcPointCount + landPointCount && earthPool.length > 0) {
          const p = earthPool[Math.floor(Math.random() * earthPool.length)];
          const lon = p.x * Math.PI * 2 - Math.PI;
          const lat = -(p.y * Math.PI - Math.PI / 2);
          shapes["The Earth"][i3] = (EARTH_RADIUS * Math.cos(lat) * Math.cos(lon)) + SIDE_OFFSET;
          shapes["The Earth"][i3+1] = EARTH_RADIUS * Math.sin(lat);
          shapes["The Earth"][i3+2] = EARTH_RADIUS * Math.cos(lat) * Math.sin(lon);
        } else {
          shapes["The Earth"][i3] = 0; shapes["The Earth"][i3+1] = -15000; shapes["The Earth"][i3+2] = 0;
        }

        // 2. GALAXY logic
        const gRatio = i / particleCount;
        if (gRatio < 0.25) {
          const r = Math.pow(Math.random(), 0.5) * 5.5;
          const phi = Math.acos((Math.random() * 2) - 1);
          const theta = Math.random() * Math.PI * 2;
          shapes["The Galaxy"][i3] = r * Math.sin(phi) * Math.cos(theta);
          shapes["The Galaxy"][i3+1] = r * Math.sin(phi) * Math.sin(theta);
          shapes["The Galaxy"][i3+2] = r * Math.cos(phi) * 0.7;
        } else if (gRatio < 0.90) {
          const numArms = 2;
          const t = (gRatio - 0.25) / 0.65;
          const angle = t * 7.5 + ((i % numArms) * Math.PI);
          const radius = 4.0 + t * 15.0;
          const spread = (1.0 - t * 0.5) * 2.5;
          shapes["The Galaxy"][i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
          shapes["The Galaxy"][i3+1] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;
          shapes["The Galaxy"][i3+2] = (Math.random() - 0.5) * (spread * 0.4);
        } else {
          const r = 5.0 + Math.random() * 18.0;
          const theta = Math.random() * Math.PI * 2;
          shapes["The Galaxy"][i3] = Math.cos(theta) * r + (Math.random() - 0.5) * 3;
          shapes["The Galaxy"][i3+1] = Math.sin(theta) * r + (Math.random() - 0.5) * 3;
          shapes["The Galaxy"][i3+2] = (Math.random() - 0.5) * (6.0);
        }

        // 3. ROCKET logic
        let rkx = 0, rky = 0, rkz = 0;
        const rRatio = i / particleCount;
        if (rRatio < 0.5) {
          const h = (Math.random() - 0.5) * 12; const rMax = 3.8;
          const rad = h > 0 ? rMax * Math.pow(1 - (h / 6), 0.6) : rMax;
          rkx = Math.cos(Math.random() * Math.PI * 2) * rad; rky = h; rkz = Math.sin(Math.random() * Math.PI * 2) * rad;
        } else if (rRatio < 0.75) {
          const sideX = (i % 2 === 0) ? -4.5 : 4.5;
          const h = -4 + (Math.random() * 6);
          rkx = sideX + Math.cos(Math.random() * Math.PI * 2) * 1.4; rky = h - 2; rkz = Math.sin(Math.random() * Math.PI * 2) * 1.4;
        } else if (rRatio < 0.9) {
          const finA = (i % 3) * (Math.PI * 2 / 3);
          const h = -6 + (Math.random() * 4);
          const distO = 3 + (Math.abs(h + 6) * 1.8);
          rkx = Math.cos(finA) * distO; rky = h; rkz = Math.sin(finA) * distO;
        } else {
          const h = -7 - (Math.random() * 6);
          rkx = Math.cos(Math.random() * Math.PI * 2) * 1.6 * (Math.random() * 0.8);
          rky = h; rkz = Math.sin(Math.random() * Math.PI * 2) * 1.6 * (Math.random() * 0.8);
        }
        const tilt = Math.PI / 4;
        shapes["The Rocket"][i3] = rkx * Math.cos(tilt) - rky * Math.sin(tilt);
        shapes["The Rocket"][i3+1] = rkx * Math.sin(tilt) + rky * Math.cos(tilt);
        shapes["The Rocket"][i3+2] = rkz;

        // 4. ROBO logic
        const roboS = i / particleCount;
        if (roboS < 0.4) { shapes["The Robo Symbol"][i3] = (Math.random() - 0.5) * 8; shapes["The Robo Symbol"][i3+1] = (Math.random() - 0.5) * 10; shapes["The Robo Symbol"][i3+2] = (Math.random() - 0.5) * 2; }
        else if (roboS < 0.5) { shapes["The Robo Symbol"][i3] = (i % 2 === 0 ? -2.2 : 2.2) + (Math.random() - 0.5) * 1.5; shapes["The Robo Symbol"][i3+1] = 1.5; shapes["The Robo Symbol"][i3+2] = 1.5; }
        else { shapes["The Robo Symbol"][i3] = (Math.random() - 0.5) * 4; shapes["The Robo Symbol"][i3+1] = -4 + (Math.random() - 0.5) * 2; shapes["The Robo Symbol"][i3+2] = 2; }

        // 5. INFINITY logic
        const infT = (i / particleCount) * Math.PI * 2; const infS = 16;
        const den = 1 + Math.pow(Math.sin(infT), 2);
        shapes["The Infinity"][i3] = (infS * Math.cos(infT)) / den; shapes["The Infinity"][i3+1] = (infS * Math.sin(infT) * Math.cos(infT)) / den; shapes["The Infinity"][i3+2] = (Math.random() - 0.5) * 2;

        // 6. MICROCHIP logic
        const cRatio = i / particleCount;
        if (cRatio < 0.35) { shapes["The Microchip"][i3] = (Math.random() - 0.5) * 6.5; shapes["The Microchip"][i3+1] = (Math.random() - 0.5) * 6.5; shapes["The Microchip"][i3+2] = 1.0; }
        else { shapes["The Microchip"][i3] = (Math.random() - 0.5) * 15; shapes["The Microchip"][i3+1] = (Math.random() - 0.5) * 15; shapes["The Microchip"][i3+2] = 0; }

        // 7. MICROPROCESSOR logic
        const cpuRatio = i / particleCount;
        if (cpuRatio < 0.4) { shapes["The Microprocessor"][i3] = (Math.random() - 0.5) * 18; shapes["The Microprocessor"][i3+1] = (Math.random() - 0.5) * 18; shapes["The Microprocessor"][i3+2] = -0.5; }
        else if (cpuRatio < 0.8) { shapes["The Microprocessor"][i3] = (Math.random() - 0.5) * 12; shapes["The Microprocessor"][i3+1] = (Math.random() - 0.5) * 12; shapes["The Microprocessor"][i3+2] = 1.0; }
        else { const gP = Math.floor(Math.random() * 25); shapes["The Microprocessor"][i3] = (gP % 5 - 2) * 3.5; shapes["The Microprocessor"][i3+1] = (Math.floor(gP / 5) - 2) * 3.5; shapes["The Microprocessor"][i3+2] = -2.0; }

        colors[i3] = COLOR_BLUE[0]; colors[i3+1] = COLOR_BLUE[1]; colors[i3+2] = COLOR_BLUE[2];
      }
    };

    // --- Starfield creation ---
    const createStarfield = (count, minRadius, maxRadius, size, opacity) => {
      const pos = new Float32Array(count * 3);
      const starColors = new Float32Array(count * 3);
      const palette = [[1.0, 0.95, 0.5], [0.1, 0.45, 1.0]];
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = minRadius + Math.random() * (maxRadius - minRadius);
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
      return new THREE.Points(geo, new THREE.PointsMaterial({ size, vertexColors: true, transparent: true, opacity, blending: THREE.AdditiveBlending, sizeAttenuation: true, map: starTexture, depthWrite: false }));
    };

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 8000);
      camera.position.z = 24;

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        canvas: containerRef.current
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      generateShapes();

      bgLayer1 = createStarfield(50000, 20, 1200, 1.1, 0.95); scene.add(bgLayer1);
      bgLayer2 = createStarfield(100000, 1200, 3500, 0.85, 0.8); scene.add(bgLayer2);
      bgLayer3 = createStarfield(150000, 3500, 7000, 0.7, 0.6); scene.add(bgLayer3);

      currentPositions.set(shapes[shapeMeta[0].name]);
      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      points = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ 
        size: 0.28, 
        vertexColors: true, 
        transparent: true, 
        opacity: 0.85, 
        blending: THREE.AdditiveBlending, 
        sizeAttenuation: true, 
        map: starTexture, 
        depthWrite: false 
      }));
      scene.add(points);

      // Trigger the onReady prop once Three.js has initialized
      // (Note: We check canSignalReady inside the loop or here depending on preference)
      if (onReady && !canSignalReady) {
          // You could call onReady here if you want it to trigger immediately after init
          // But based on your App.js logic, we'll check inside the animate loop
      }

      animate();
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      scrollPercent = lerp(scrollPercent, targetScrollPercent, 0.05);
      mouse.x = lerp(mouse.x, mouse.targetX, 0.08);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.08);

      const time = Date.now() * 0.001;
      const cosE = Math.cos(time * 0.25), sinE = Math.sin(time * 0.25);
      const posAttr = particlesGeometry.attributes.position;
      const positions = posAttr.array;
      const stageCount = shapeMeta.length - 1;
      const progress = scrollPercent * stageCount;
      const index = Math.min(Math.floor(progress), stageCount - 1);
      const localT = progress - index;
      const currentMeta = shapeMeta[index], nextMeta = shapeMeta[index + 1] || currentMeta;
      const sourcePos = shapes[currentMeta.name], targetPos = shapes[nextMeta.name];
      const scatter = Math.sin(Math.PI * localT) * 0.5;
      const mouse3D = new THREE.Vector3(mouse.x * 14, mouse.y * 10, 0);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let sx = sourcePos[i3], sy = sourcePos[i3+1], sz = sourcePos[i3+2];
        let tx = targetPos[i3], ty = targetPos[i3+1], tz = targetPos[i3+2];

        if (currentMeta.name === "The Earth") {
          let rx = sx - SIDE_OFFSET; sx = (rx * cosE - sz * sinE) + SIDE_OFFSET; sz = rx * sinE + sz * cosE;
        }
        if (nextMeta.name === "The Earth") {
          let rx = tx - SIDE_OFFSET; tx = (rx * cosE - tz * sinE) + SIDE_OFFSET; tz = rx * sinE + tz * cosE;
        }

        const fx = lerp(sx, tx, localT) + (scatterOffsets[i3] * scatter);
        const fy = lerp(sy, ty, localT) + (scatterOffsets[i3+1] * scatter);
        const fz = lerp(sz, tz, localT) + (scatterOffsets[i3+2] * scatter);

        const dx = positions[i3] - mouse3D.x, dy = positions[i3+1] - mouse3D.y, dz = (positions[i3+2] - mouse3D.z) * 0.45;
        const dSq = dx*dx + dy*dy + dz*dz;
        let rx_m = 0, ry_m = 0, rz_m = 0;
        if (dSq < 42.25) { const dist = Math.sqrt(dSq); const force = (6.5 - dist) / 6.5; const str = force * force * 0.55; rx_m = (dx/dist)*str; ry_m = (dy/dist)*str; rz_m = (dz/dist)*str; }

        positions[i3] = lerp(positions[i3], fx, 0.08) + rx_m;
        positions[i3+1] = lerp(positions[i3+1], fy, 0.08) + ry_m;
        positions[i3+2] = lerp(positions[i3+2], fz, 0.08) + rz_m;
      }

      posAttr.needsUpdate = true;
      points.rotation.x = lerp(points.rotation.x, -mouse.y * 0.1, 0.05);
      points.rotation.y = lerp(points.rotation.y, mouse.x * 0.15, 0.05);
      
      bgLayer1.rotation.y += 0.0003; bgLayer2.rotation.y -= 0.0002; bgLayer3.rotation.y += 0.0001;
      bgLayer1.position.set(Math.sin(time*0.1)*5, Math.cos(time*0.08)*5, 0);
      bgLayer2.position.set(Math.cos(time*0.07)*8, 0, Math.sin(time*0.05)*8);

      camera.position.x = lerp(camera.position.x, mouse.x * 3.5, 0.05);
      camera.position.y = lerp(camera.position.y, mouse.y * 3.5, 0.05);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      // Handle the "Ready" Signal
      if (canSignalReady && onReady) {
          onReady();
      }
    };

    // --- Listeners ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

   const handleScroll = () => {
  const scrollH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (scrollH > 0) {
    targetScrollPercent = window.scrollY / scrollH;
  }
};

// Add this line right after your init() call inside useEffect



    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    init();
    handleScroll(); 
    
    
    scrollPercent = targetScrollPercent;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [canSignalReady, onReady]);

  return (
    <canvas 
      ref={containerRef} 
      className="block w-full h-full outline-none bg-black" 
      id="bg"
    />
  );
};

export default CosmicParticles;