import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { detectSoftwareWebGL, prefersReducedMotion } from '../utils/webglDetect';

type SymbolType = 'seo' | 'ads' | 'social' | 'content' | 'analytics';

function createWorldGlobeTextures(): {
  map: THREE.CanvasTexture;
  emissiveMap: THREE.CanvasTexture;
} {
  const width = 2048;
  const height = 1024;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');

  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext('2d');

  // Detailed continental & major landmass coordinates [lon, lat]
  const continents: Array<Array<[number, number]>> = [
    // North America
    [
      [-168, 66], [-160, 71], [-140, 70], [-125, 71], [-110, 73], [-95, 72],
      [-82, 68], [-78, 62], [-64, 58], [-55, 51], [-53, 47], [-60, 46],
      [-66, 44], [-71, 41], [-75, 38], [-80, 32], [-81, 25], [-83, 28],
      [-89, 30], [-97, 26], [-96, 19], [-88, 21], [-87, 17], [-83, 14],
      [-83, 10], [-78, 8], [-81, 7], [-85, 10], [-92, 15], [-104, 19],
      [-106, 23], [-112, 28], [-114, 31], [-117, 32], [-121, 35], [-124, 41],
      [-124, 48], [-131, 54], [-139, 59], [-152, 60], [-162, 55], [-166, 61],
    ],
    // Greenland
    [
      [-52, 60], [-43, 60], [-36, 65], [-24, 70], [-18, 77], [-24, 82],
      [-45, 83], [-60, 81], [-68, 76], [-56, 70], [-53, 65],
    ],
    // South America
    [
      [-78, 9], [-72, 12], [-63, 10], [-52, 5], [-49, 0], [-41, -3],
      [-35, -6], [-35, -10], [-39, -15], [-40, -21], [-46, -24], [-49, -29],
      [-53, -34], [-58, -38], [-64, -41], [-67, -46], [-69, -53], [-67, -55],
      [-73, -54], [-75, -47], [-73, -39], [-71, -30], [-70, -20], [-76, -14],
      [-81, -5], [-80, 2],
    ],
    // Europe
    [
      [-9, 37], [-9, 43], [-2, 43], [-4, 48], [1, 51], [6, 53], [8, 57],
      [11, 58], [5, 61], [12, 67], [20, 70], [29, 71], [42, 68], [58, 68],
      [60, 60], [56, 52], [47, 45], [38, 45], [30, 46], [28, 41], [24, 38],
      [21, 37], [18, 40], [15, 38], [12, 42], [9, 44], [4, 43], [-5, 36],
    ],
    // UK & Ireland
    [[-6, 50], [1, 51], [1, 53], [-2, 56], [-5, 58], [-7, 56], [-5, 52]],
    [[-10, 52], [-6, 52], [-6, 55], [-9, 55]],
    // Africa
    [
      [-17, 15], [-16, 21], [-12, 28], [-6, 35], [3, 37], [11, 37], [15, 32],
      [25, 32], [33, 31], [36, 24], [41, 15], [44, 12], [51, 12], [48, 5],
      [42, -2], [40, -11], [35, -20], [33, -26], [28, -33], [20, -35],
      [17, -30], [14, -22], [12, -14], [12, -6], [9, 4], [2, 6], [-8, 5],
      [-14, 9],
    ],
    // Madagascar
    [[44, -25], [47, -25], [50, -15], [48, -12], [44, -18]],
    // Asia + Middle East + India + SE Asia
    [
      [27, 41], [36, 36], [35, 31], [39, 21], [44, 13], [54, 17], [60, 22],
      [56, 26], [62, 25], [68, 24], [72, 20], [76, 10], [78, 8], [80, 13],
      [85, 19], [90, 22], [94, 19], [98, 14], [103, 2], [104, 8], [109, 13],
      [108, 20], [114, 22], [120, 25], [122, 31], [120, 36], [123, 39],
      [127, 35], [129, 39], [134, 44], [141, 51], [142, 57], [154, 60],
      [166, 62], [178, 66], [166, 70], [140, 72], [115, 74], [95, 76],
      [74, 72], [60, 68], [56, 52], [47, 45], [41, 42],
    ],
    // Japan
    [[130, 31], [135, 34], [140, 36], [144, 43], [141, 45], [139, 40], [133, 34]],
    // Indonesia / Philippines accents
    [[96, 5], [104, -1], [106, -6], [99, -2]],
    [[106, -7], [114, -8], [114, -6], [106, -6]],
    [[120, 14], [123, 18], [126, 12], [122, 7]],
    // Australia
    [
      [114, -22], [120, -19], [129, -14], [135, -12], [137, -15], [142, -11],
      [146, -18], [153, -26], [151, -34], [147, -38], [139, -37], [132, -32],
      [123, -34], [115, -34], [113, -27],
    ],
    // New Zealand
    [[167, -46], [173, -41], [178, -37], [174, -35], [170, -42]],
  ];

  const project = (lon: number, lat: number): [number, number] => [
    ((lon + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ];

  if (ctx && eCtx) {
    // Ocean background
    ctx.fillStyle = '#07080D';
    ctx.fillRect(0, 0, width, height);

    eCtx.fillStyle = '#000000';
    eCtx.fillRect(0, 0, width, height);

    // Subtle equirectangular graticule grid
    ctx.strokeStyle = 'rgba(255, 37, 37, 0.14)';
    ctx.lineWidth = 1.5;
    eCtx.strokeStyle = 'rgba(153, 0, 0, 0.22)';
    eCtx.lineWidth = 1.2;

    for (let lon = -180; lon <= 180; lon += 15) {
      const x = ((lon + 180) / 360) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      eCtx.beginPath();
      eCtx.moveTo(x, 0);
      eCtx.lineTo(x, height);
      eCtx.stroke();
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      const y = ((90 - lat) / 180) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      eCtx.beginPath();
      eCtx.moveTo(0, y);
      eCtx.lineTo(width, y);
      eCtx.stroke();
    }

    // Draw raised-contrast continents + glowing crimson coastlines
    for (const poly of continents) {
      ctx.beginPath();
      eCtx.beginPath();
      poly.forEach(([lon, lat], idx) => {
        const [x, y] = project(lon, lat);
        if (idx === 0) {
          ctx.moveTo(x, y);
          eCtx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
          eCtx.lineTo(x, y);
        }
      });
      ctx.closePath();
      eCtx.closePath();

      ctx.fillStyle = '#2A2C38';
      ctx.fill();
      ctx.strokeStyle = '#FF2E2E';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      eCtx.fillStyle = 'rgba(60, 10, 14, 0.45)';
      eCtx.fill();
      eCtx.strokeStyle = '#FF2525';
      eCtx.lineWidth = 3;
      eCtx.stroke();
    }

    // Crisp digital dot-matrix inside continents
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
    eCtx.fillStyle = 'rgba(255, 70, 70, 0.25)';
    for (let y = 24; y < height - 24; y += 14) {
      for (let x = 24; x < width - 24; x += 14) {
        const lon = (x / width) * 360 - 180;
        const lat = 90 - (y / height) * 180;
        for (const poly of continents) {
          let inside = false;
          for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const xi = poly[i][0];
            const yi = poly[i][1];
            const xj = poly[j][0];
            const yj = poly[j][1];
            const intersect =
              yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-9) + xi;
            if (intersect) inside = !inside;
          }
          if (inside) {
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
            eCtx.fillRect(x - 1, y - 1, 2, 2);
            break;
          }
        }
      }
    }

    // Global marketing hubs & subtle connection beacons (Chennai + major hubs)
    const hubs: Array<[number, number]> = [
      [80.27, 13.08], // Chennai
      [-74.0, 40.7],  // New York
      [-0.12, 51.5],  // London
      [55.27, 25.2],  // Dubai
      [103.8, 1.35],  // Singapore
      [139.7, 35.7],  // Tokyo
      [151.2, -33.8], // Sydney
      [-46.6, -23.5], // Sao Paulo
    ];

    for (const [lon, lat] of hubs) {
      const [hx, hy] = project(lon, lat);
      for (const targetCtx of [ctx, eCtx]) {
        const glow = targetCtx.createRadialGradient(hx, hy, 2, hx, hy, 22);
        glow.addColorStop(0, 'rgba(255, 45, 45, 1)');
        glow.addColorStop(0.5, 'rgba(255, 37, 37, 0.45)');
        glow.addColorStop(1, 'rgba(255, 37, 37, 0)');
        targetCtx.fillStyle = glow;
        targetCtx.beginPath();
        targetCtx.arc(hx, hy, 22, 0, Math.PI * 2);
        targetCtx.fill();

        targetCtx.fillStyle = '#FFFFFF';
        targetCtx.beginPath();
        targetCtx.arc(hx, hy, 4, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  emissiveMap.anisotropy = 4;

  return { map, emissiveMap };
}

function createSymbolBadgeTexture(symbol: SymbolType, label: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#101014';
    ctx.fillRect(0, 0, 256, 256);

    const grad = ctx.createRadialGradient(128, 112, 12, 128, 128, 120);
    grad.addColorStop(0, 'rgba(255, 37, 37, 0.24)');
    grad.addColorStop(1, 'rgba(16, 16, 20, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = '#FF2525';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(14, 14, 228, 228, 36);
    ctx.stroke();

    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FF2525';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (symbol === 'seo') {
      ctx.beginPath();
      ctx.arc(114, 102, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#FF2525';
      ctx.beginPath();
      ctx.moveTo(138, 126);
      ctx.lineTo(166, 154);
      ctx.stroke();
    } else if (symbol === 'ads') {
      ctx.beginPath();
      ctx.arc(128, 110, 42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#FF2525';
      ctx.beginPath();
      ctx.arc(128, 110, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(128, 110, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (symbol === 'social') {
      const pts: Array<[number, number]> = [
        [92, 110],
        [156, 78],
        [156, 142],
      ];
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[1][0], pts[1][1]);
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[2][0], pts[2][1]);
      ctx.stroke();
      for (const [x, y] of pts) {
        ctx.fillStyle = '#FF2525';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (symbol === 'content') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeRect(84, 72, 88, 76);
      ctx.strokeStyle = '#FF2525';
      ctx.beginPath();
      ctx.moveTo(100, 96);
      ctx.lineTo(156, 96);
      ctx.moveTo(100, 118);
      ctx.lineTo(140, 118);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#FF2525';
      ctx.beginPath();
      ctx.arc(128, 134, 46, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(128, 134, 28, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.fillStyle = '#FF2525';
      ctx.beginPath();
      ctx.arc(128, 134, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#F4F4F5';
    ctx.font = '700 26px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, 128, 206);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createGlowParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 37, 37, 0.85)');
    grad.addColorStop(1, 'rgba(255, 37, 37, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCircleLoop(radius: number, segments: number, color: number, opacity: number): THREE.LineLoop {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  return new THREE.LineLoop(geo, mat);
}

export function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = prefersReducedMotion();

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 520;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setContextLost(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.height = '100%';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / Math.max(height, 1), 0.1, 100);
    const updateCameraDistance = (w: number, h: number) => {
      const aspect = w / Math.max(h, 1);
      camera.aspect = aspect;
      camera.position.set(0, 0.18, aspect < 1 ? 11.0 : 9.2);
      camera.updateProjectionMatrix();
    };
    updateCameraDistance(width, height);

    const keyLight = new THREE.DirectionalLight(0xd4d4d8, 0.95);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const hemiFill = new THREE.HemisphereLight(0x9ca3af, 0x080808, 0.45);
    scene.add(hemiFill);

    const crimsonRim = new THREE.DirectionalLight(0xff2525, 1.9);
    crimsonRim.position.set(-5, -1.5, -4);
    scene.add(crimsonRim);

    const pointerLight = new THREE.PointLight(0xff2525, 1.8, 15, 2.0);
    pointerLight.position.set(2.2, 1.4, 4.4);
    scene.add(pointerLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. High-Contrast 3D World Globe Assembly
    const globeTiltGroup = new THREE.Group();
    globeTiltGroup.rotation.z = 0.22; // Earth axial tilt
    globeTiltGroup.rotation.x = 0.12;
    rootGroup.add(globeTiltGroup);

    const { map: worldTexture, emissiveMap: worldEmissive } = createWorldGlobeTextures();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    worldTexture.anisotropy = Math.min(8, maxAniso);
    worldEmissive.anisotropy = Math.min(8, maxAniso);

    const globeGeo = new THREE.SphereGeometry(1.82, 56, 42);
    const globeMat = new THREE.MeshStandardMaterial({
      map: worldTexture,
      emissiveMap: worldEmissive,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.85,
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.9,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    // Start oriented toward Europe / Africa / India / Asia
    const baseGlobeYaw = -2.35;
    globeMesh.rotation.y = baseGlobeYaw;
    globeTiltGroup.add(globeMesh);

    // Subtle atmospheric crimson rim shell around globe
    const atmoGeo = new THREE.SphereGeometry(1.91, 48, 36);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0xff2525,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeTiltGroup.add(atmoMesh);

    // Clean orthogonal latitude/longitude arcs (no diagonal triangle wireframe clutter)
    const cageGroup = new THREE.Group();
    const latitudes = [-45, 0, 45];
    for (const lat of latitudes) {
      const rad = (lat * Math.PI) / 180;
      const r = Math.cos(rad) * 1.85;
      const y = Math.sin(rad) * 1.85;
      const loop = createCircleLoop(r, 72, 0xff2525, lat === 0 ? 0.45 : 0.18);
      loop.position.y = y;
      cageGroup.add(loop);
    }
    for (let i = 0; i < 4; i++) {
      const meridian = createCircleLoop(1.85, 72, 0xff2525, 0.16);
      meridian.rotation.z = Math.PI / 2;
      meridian.rotation.y = (i / 4) * Math.PI;
      cageGroup.add(meridian);
    }
    globeTiltGroup.add(cageGroup);

    // 2. Crisp Animated Glowing Red & Brushed Steel Orbital Rings
    const ringMatCrimson = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.85,
      metalness: 0.55,
      roughness: 0.3,
      envMapIntensity: 0.5,
    });
    const ringMatSteel = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      metalness: 0.42,
      roughness: 0.36,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.38, 0.022, 14, 96), ringMatCrimson);
    ring1.rotation.set(Math.PI * 0.42, Math.PI * 0.12, 0);
    rootGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.74, 0.016, 14, 96), ringMatSteel);
    ring2.rotation.set(-Math.PI * 0.34, Math.PI * 0.44, 0.2);
    rootGroup.add(ring2);

    // 3. Abstract Red Geometric Satellites orbiting the globe
    const satelliteGeo = new THREE.OctahedronGeometry(0.14, 0);
    const satelliteDarkGeo = new THREE.TetrahedronGeometry(0.17, 0);
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f26,
      metalness: 0.35,
      roughness: 0.45,
    });
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0xff2525,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.3,
    });

    const satellites: Array<{ mesh: THREE.Mesh; radius: number; speed: number; phase: number; yAmp: number }> = [];
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(
        i % 2 === 0 ? satelliteGeo : satelliteDarkGeo,
        i % 2 === 0 ? satelliteMat : obsidianMat,
      );
      rootGroup.add(mesh);
      satellites.push({
        mesh,
        radius: 2.38 + (i % 3) * 0.38,
        speed: 0.34 + i * 0.06,
        phase: (i / 6) * Math.PI * 2,
        yAmp: 0.52 + (i % 2) * 0.32,
      });
    }

    // 4. Floating 3D Digital Marketing Symbol Nodes orbiting outside the globe
    const symbolSpecs: Array<{ type: SymbolType; label: string; pos: [number, number, number]; phase: number }> = [
      { type: 'seo', label: 'SEO', pos: [-2.45, 1.52, 0.45], phase: 0.2 },
      { type: 'ads', label: 'ADS', pos: [2.48, 1.38, 0.35], phase: 1.4 },
      { type: 'social', label: 'SOCIAL', pos: [2.46, -1.32, 0.48], phase: 2.6 },
      { type: 'content', label: 'CONTENT', pos: [-2.38, -1.42, 0.4], phase: 3.9 },
      { type: 'analytics', label: 'GA4', pos: [0.15, 2.58, -0.2], phase: 5.1 },
    ];

    const badgeFrameGeo = new THREE.BoxGeometry(0.84, 0.84, 0.12);
    const badgeFaceGeo = new THREE.PlaneGeometry(0.72, 0.72);
    const badgeTextures: THREE.CanvasTexture[] = [];
    const symbolNodes: Array<{ group: THREE.Group; basePos: THREE.Vector3; phase: number }> = [];

    for (const spec of symbolSpecs) {
      const nodeGroup = new THREE.Group();
      const frame = new THREE.Mesh(badgeFrameGeo, obsidianMat);
      nodeGroup.add(frame);

      const trimGeo = new THREE.BoxGeometry(0.88, 0.88, 0.045);
      const trim = new THREE.Mesh(trimGeo, ringMatCrimson);
      trim.position.z = -0.02;
      nodeGroup.add(trim);

      const tex = createSymbolBadgeTexture(spec.type, spec.label);
      tex.anisotropy = Math.min(4, maxAniso);
      badgeTextures.push(tex);
      const faceMat = new THREE.MeshBasicMaterial({
        map: tex,
      });

      const frontFace = new THREE.Mesh(badgeFaceGeo, faceMat);
      frontFace.position.z = 0.065;
      nodeGroup.add(frontFace);

      const backFace = new THREE.Mesh(badgeFaceGeo, faceMat);
      backFace.position.z = -0.065;
      backFace.rotation.y = Math.PI;
      nodeGroup.add(backFace);

      const basePos = new THREE.Vector3(...spec.pos);
      nodeGroup.position.copy(basePos);
      rootGroup.add(nodeGroup);
      symbolNodes.push({ group: nodeGroup, basePos, phase: spec.phase });
    }

    // 5. Subtle Particle Field
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.25 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.78;
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleTex = createGlowParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.13,
      map: particleTex,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    // Interactive drag-to-spin state
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragYawOffset = 0;
    let dragPitchOffset = 0;

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      targetPointerY = THREE.MathUtils.clamp(-((event.clientY - rect.top) / rect.height) * 2 + 1, -1, 1);

      if (isDragging) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        dragYawOffset += dx * 0.008;
        dragPitchOffset = THREE.MathUtils.clamp(dragPitchOffset + dy * 0.005, -0.55, 0.55);
        if (reducedMotion) {
          updateScene(0.8, 0.016);
          renderer.render(scene, camera);
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerLeave = () => {
      isDragging = false;
      targetPointerX = 0;
      targetPointerY = 0;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 380;
      updateCameraDistance(width, height);
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      if (reducedMotion) {
        renderer.render(scene, camera);
      }
    };
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    resizeObserver?.observe(container);
    window.addEventListener('resize', handleResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;

    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const updateScene = (t: number, delta: number) => {
      currentPointerX = THREE.MathUtils.damp(currentPointerX, targetPointerX, 4.5, delta);
      currentPointerY = THREE.MathUtils.damp(currentPointerY, targetPointerY, 4.5, delta);

      rootGroup.rotation.y = currentPointerX * 0.25;
      rootGroup.rotation.x = -currentPointerY * 0.16 + dragPitchOffset;

      pointerLight.position.x = currentPointerX * 3.8;
      pointerLight.position.y = currentPointerY * 3.0;

      // Continuous Earth rotation on its tilted axis + interactive drag offset
      const globeSpin = baseGlobeYaw + t * 0.22 + dragYawOffset;
      globeMesh.rotation.y = globeSpin;
      cageGroup.rotation.y = globeSpin;

      ring1.rotation.z = t * 0.24;
      ring2.rotation.z = -t * 0.18;

      for (const sat of satellites) {
        const angle = t * sat.speed + sat.phase;
        sat.mesh.position.set(
          Math.cos(angle) * sat.radius,
          Math.sin(angle * 1.4) * sat.yAmp,
          Math.sin(angle) * sat.radius,
        );
        sat.mesh.rotation.x = t * 0.9;
        sat.mesh.rotation.y = t * 0.7;
      }

      for (const node of symbolNodes) {
        node.group.position.y = node.basePos.y + Math.sin(t * 1.15 + node.phase) * 0.14;
        node.group.rotation.y = Math.sin(t * 0.6 + node.phase) * 0.18 + currentPointerX * 0.16;
        node.group.rotation.x = currentPointerY * 0.1;
      }

      particles.rotation.y = t * 0.04;
    };

    if (reducedMotion) {
      updateScene(0.8, 0.016);
      renderer.render(scene, camera);
    } else {
      const tick = () => {
        if (disposed) return;
        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        elapsed += delta;
        updateScene(elapsed, delta);
        renderer.render(scene, camera);
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      };
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver?.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh || (obj as THREE.Points).isPoints || (obj as THREE.LineLoop).isLineLoop) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      worldTexture.dispose();
      worldEmissive.dispose();
      badgeTextures.forEach((t) => t.dispose());
      particleTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative h-[360px] w-full min-w-0 overflow-hidden sm:h-[460px] lg:h-[540px]"
      data-testid="hero-3d-canvas"
      aria-label="Interactive 3D world globe and digital marketing visual"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,37,37,0.18)_0%,rgba(153,0,0,0.06)_45%,transparent_72%)]"
      />
      {contextLost ? (
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-[#FF2525]/30 bg-[#121212] p-8 text-center">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-32 w-32 text-[#FF2525]" fill="none" aria-hidden="true">
              <circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="2.5" />
              <ellipse cx="60" cy="60" rx="22" ry="46" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.65" />
              <line x1="14" y1="60" x2="106" y2="60" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.65" />
              <line x1="22" y1="38" x2="98" y2="38" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
              <line x1="22" y1="82" x2="98" y2="82" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
            </svg>
            <p className="mt-4 font-display text-lg font-semibold text-white">
              Interactive 3D World Globe
            </p>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              SEO · Paid Ads (Meta Ads &amp; Google Ads) · Social Media · Content Creation · Analytics
            </p>
          </div>
        </div>
      ) : (
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />
      )}
    </div>
  );
}
