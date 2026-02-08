import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Loader = () => {
    const mountRef = useRef(null);
    const cursorRef = useRef(null);
    const uiRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("OVERCLOCKING_CORE");
    const [hex, setHex] = useState("0x00000000");
    const [isLoaded, setIsLoaded] = useState(false);
    const [mainLabel, setMainLabel] = useState("DSU TECHFEST 1.0");

    useEffect(() => {
        // --- Three.js Setup ---
        let scene, camera, renderer, particles, lines, core1, core2, stars, light;
        let mouse = new THREE.Vector2(-100, -100);
        let targetMouse = new THREE.Vector2(0, 0);
        let raycaster = new THREE.Raycaster();
        let particleData = [];
        let exitTime = 0;
        let internalLoaded = false;

        const palette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0xff00ff),
            new THREE.Color(0xffd700),
            new THREE.Color(0x0088ff),
            new THREE.Color(0x00ff88)
        ];

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
            camera.position.z = 850;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);

            // Stars
            const starCount = 3000;
            const starGeo = new THREE.BufferGeometry();
            const starPos = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount; i++) {
                starPos[i * 3] = (Math.random() - 0.5) * 6000;
                starPos[i * 3 + 1] = (Math.random() - 0.5) * 6000;
                starPos[i * 3 + 2] = (Math.random() - 0.5) * 6000;
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
            stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x666699, size: 2, transparent: true, opacity: 0.5 }));
            scene.add(stars);

            // Particles
            const pCount = 5000;
            const pPos = new Float32Array(pCount * 3);
            const pCol = new Float32Array(pCount * 3);
            const r = 260;

            for (let i = 0; i < pCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);
                pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

                const color = palette[Math.floor(Math.random() * palette.length)];
                pCol[i * 3] = color.r; pCol[i * 3 + 1] = color.g; pCol[i * 3 + 2] = color.b;

                particleData.push({
                    originalPos: new THREE.Vector3(x, y, z),
                    velocity: new THREE.Vector3(),
                    acceleration: new THREE.Vector3(),
                    orbitAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
                    orbitSpeed: (Math.random() - 0.5) * 0.015
                });
            }

            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
            pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
            particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 2.8, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
            scene.add(particles);

            // Lines
            const lineIndices = [];
            for (let i = 0; i < 800; i++) {
                const i1 = Math.floor(Math.random() * pCount);
                const i2 = Math.floor(Math.random() * pCount);
                if (particleData[i1].originalPos.distanceTo(particleData[i2].originalPos) < 65) lineIndices.push(i1, i2);
            }
            const lGeo = new THREE.BufferGeometry();
            lGeo.setIndex(lineIndices);
            lGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
            lGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
            lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending }));
            scene.add(lines);

            // Core
            core1 = new THREE.Mesh(new THREE.IcosahedronGeometry(110, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 }));
            core2 = new THREE.Mesh(new THREE.OctahedronGeometry(60, 0), new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.2 }));
            scene.add(core1, core2);

            light = new THREE.PointLight(0xffffff, 2.5, 900);
            scene.add(light);
        };

        const animate = () => {
            const frameId = requestAnimationFrame(animate);
            mouse.x += (targetMouse.x - mouse.x) * 0.15;
            mouse.y += (targetMouse.y - mouse.y) * 0.15;

            const posAttr = particles.geometry.attributes.position;
            const time = Date.now() * 0.001;

            if (!internalLoaded) {
                const mousePoint = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
                const actualMousePos = camera.position.clone().add(mousePoint.sub(camera.position).normalize().multiplyScalar(-camera.position.z / mousePoint.z));

                for (let i = 0; i < particleData.length; i++) {
                    const data = particleData[i];
                    const currentPos = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                    data.acceleration.add(data.originalPos.clone().sub(currentPos).multiplyScalar(0.06));
                    currentPos.applyAxisAngle(data.orbitAxis, data.orbitSpeed);

                    const d = currentPos.distanceTo(actualMousePos);
                    if (d < 240) data.acceleration.add(currentPos.clone().sub(actualMousePos).normalize().multiplyScalar((1 - d / 240) * 25));

                    data.velocity.add(data.acceleration).multiplyScalar(0.85);
                    currentPos.add(data.velocity);
                    posAttr.setXYZ(i, currentPos.x, currentPos.y, currentPos.z);
                    data.acceleration.set(0, 0, 0);
                }
                posAttr.needsUpdate = true;
                lines.geometry.attributes.position.needsUpdate = true;
                particles.rotation.y += 0.004;
                lines.rotation.y += 0.004;
                core1.rotation.y += 0.015;
                core2.rotation.x -= 0.025;
                stars.rotation.y += 0.0005;
                light.intensity = 2.0 + Math.sin(time * 5) * 0.8;
            } else {
                exitTime += 0.04;
                const speed = exitTime * 450;
                particles.position.z += speed;
                lines.position.z += speed;
                core1.position.z += speed * 0.95;
                core2.position.z += speed * 0.85;
                stars.position.z += speed * 0.4;
                particles.material.opacity = Math.max(0, 0.8 - exitTime * 1.5);
                lines.material.opacity = Math.max(0, 0.25 - exitTime * 1.5);
            }
            renderer.render(scene, camera);
            return frameId;
        };

        // --- Event Listeners ---
        const handleMouseMove = (e) => {
            targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            if (uiRef.current) {
                uiRef.current.style.transform = `translate(${(e.clientX - window.innerWidth / 2) * 0.03}px, ${(e.clientY - window.innerHeight / 2) * 0.03}px)`;
            }
        };

        const handleMouseDown = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) rotate(135deg) scale(2.5)';
            if (!internalLoaded) particleData.forEach(p => p.velocity.add(p.originalPos.clone().normalize().multiplyScalar(25)));
        };

        const handleMouseUp = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1)';
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        init();
        const frameId = animate();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);

        // --- Loading Simulation ---
        let currentProgress = 0;
        const phases = ["OVERCLOCKING_CORE", "MAPPING_VECTORS", "VERIFYING_AUTH", "MAX_BANDWIDTH"];
        const interval = setInterval(() => {
            currentProgress += Math.random() * 4.5;
            setHex('0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase());
            
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setProgress(100);
                setPhase("SYNC_LOCKED");
                setMainLabel("ACCESS_INSTANTIATED");
                setTimeout(() => {
                    internalLoaded = true;
                    setIsLoaded(true);
                }, 600);
            } else {
                setProgress(Math.floor(currentProgress));
                setPhase(phases[Math.floor((currentProgress / 100) * phases.length)]);
            }
        }, 50);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            clearInterval(interval);
            if (mountRef.current) mountRef.current.innerHTML = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-[#010103] overflow-hidden cursor-none font-sans">
            {/* Custom Cursor */}
            <div 
                ref={cursorRef}
                className="fixed w-6 h-6 border border-white/50 pointer-events-none z-[9999] transition-transform duration-150"
                style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
            />

            {/* Canvas Container */}
            <div ref={mountRef} className="fixed inset-0 z-[1] contrast-[1.15] brightness-[1.2]" />

            {/* Background Grid */}
            <div className="fixed inset-0 z-[2] pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} 
            />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-[3] opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* UI Overlay */}
            {!isLoaded && (
                <div ref={uiRef} className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-all duration-700">
                    <div className="relative w-[560px] p-12 bg-[#040406]/94 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden animate-shimmer"
                         style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
                        
                        {/* Shimmer Border effect */}
                        <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_180deg,transparent,rgba(255,0,255,0.07),rgba(255,215,0,0.12),transparent_40%)] animate-[spin_3s_linear_infinite]" />

                        <div className={`text-white tracking-[1.2em] uppercase text-center mb-12 text-sm font-bold opacity-90 transition-colors ${progress > 99 ? 'text-yellow-400' : 'animate-pulse'}`}>
                            {mainLabel}
                        </div>

                        <div className="w-full h-4 bg-black/90 border border-white/15 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                            <div 
                                className="absolute top-0 left-0 h-full bg-[linear-gradient(90deg,#ff00ff,#ffd700,#00ff88,#0088ff,#ffffff)] bg-[length:400%_100%] animate-[gradientShift_2s_ease-in-out_infinite] shadow-[0_0_35px_rgba(255,255,255,0.6)] transition-all duration-200"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-end mt-6">
                            <div className="flex flex-col gap-1 pb-2">
                                <span className="text-[11px] font-bold tracking-[0.3em]" style={{ color: progress > 99 ? '#00ff88' : '#ffd700' }}>{phase}</span>
                                <span className="text-[9px] opacity-40 font-mono">{hex}</span>
                            </div>
                            <div className="text-6xl font-bold text-white leading-none">
                                {progress}<span className="text-2xl ml-1 opacity-20 font-normal">%</span>
                            </div>
                        </div>

                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}} />
        </div>
    );
};

export default Loader;