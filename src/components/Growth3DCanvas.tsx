import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { detectSoftwareWebGL, prefersReducedMotion } from '../utils/webglDetect';

export function Growth3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = prefersReducedMotion();

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 380;

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
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.height = '100%';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(0, 1.4, 7.6);
    camera.lookAt(0, 0.2, 0);

    const keyLight = new THREE.DirectionalLight(0xfff1eb, 2.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const hemi = new THREE.HemisphereLight(0xd4d4d8, 0x1a0404, 0.85);
    scene.add(hemi);

    const crimsonRim = new THREE.DirectionalLight(0xff2525, 2.5);
    crimsonRim.position.set(-5, 2, -4);
    scene.add(crimsonRim);

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    const pillarMat = new THREE.MeshPhysicalMaterial({
      color: 0x16161a,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    });
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xff2525,
      emissive: 0x990000,
      emissiveIntensity: 1.25,
      metalness: 0.5,
      roughness: 0.25,
    });

    // Composite ascending stepped spiral monoliths
    const pillarCount = 7;
    const pillars: THREE.Group[] = [];
    for (let i = 0; i < pillarCount; i++) {
      const t = i / (pillarCount - 1);
      const pillarH = 0.7 + t * 2.45;
      const angle = (i - 3) * 0.42;
      const radius = 1.45 - t * 0.35;

      const unit = new THREE.Group();
      const bodyGeo = new THREE.BoxGeometry(0.46, pillarH, 0.46);
      const body = new THREE.Mesh(bodyGeo, pillarMat);
      body.position.y = pillarH / 2;
      unit.add(body);

      const capGeo = new THREE.BoxGeometry(0.48, 0.08, 0.48);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = pillarH + 0.04;
      unit.add(cap);

      unit.position.set(
        Math.sin(angle) * radius - 0.15 + t * 0.45,
        -1.35,
        Math.cos(angle) * 0.7 - 0.3,
      );
      unit.rotation.y = angle * 0.4;
      sculptureGroup.add(unit);
      pillars.push(unit);
    }

    // Ascending trajectory helix ribbon
    const helixPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = t * Math.PI * 2.1 - 1.1;
      const r = 1.85 - t * 0.95;
      helixPoints.push(new THREE.Vector3(Math.sin(a) * r, -1.2 + t * 3.3, Math.cos(a) * r * 0.65));
    }
    const curve = new THREE.CatmullRomCurve3(helixPoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.032, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, capMat);
    sculptureGroup.add(tubeMesh);

    // Floating apex crystal beacon
    const apexGroup = new THREE.Group();
    apexGroup.position.set(0.25, 2.15, 0.1);
    const apexCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), capMat);
    const apexRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.024, 12, 64),
      new THREE.MeshStandardMaterial({ color: 0x71717a, metalness: 0.9, roughness: 0.2 }),
    );
    apexRing.rotation.x = Math.PI * 0.35;
    apexGroup.add(apexCore, apexRing);
    sculptureGroup.add(apexGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.55;
      targetRotX = -((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    const handlePointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 340;
      height = container.clientHeight || 320;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
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

    const animateScene = (t: number, delta: number) => {
      currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX, 4, delta);
      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 4, delta);
      sculptureGroup.rotation.y = Math.sin(t * 0.35) * 0.28 + currentRotY;
      sculptureGroup.rotation.x = currentRotX;

      apexCore.rotation.y = t * 0.8;
      apexRing.rotation.z = t * 0.55;
      apexGroup.position.y = 2.1 + Math.sin(t * 1.4) * 0.1;

      pillars.forEach((p, idx) => {
        p.position.y = -1.35 + Math.sin(t * 1.1 + idx * 0.5) * 0.05;
      });
    };

    if (reducedMotion) {
      animateScene(0.5, 0.016);
      renderer.render(scene, camera);
    } else {
      const tick = () => {
        if (disposed) return;
        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        elapsed += delta;
        animateScene(elapsed, delta);
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
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative h-[320px] w-full sm:h-[380px]"
      data-testid="growth-3d-canvas"
      aria-label="3D ascending growth visual"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,37,37,0.16)_0%,transparent_70%)]"
      />
      {contextLost ? (
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-[#FF2525]/30 bg-[#121212] p-6 text-center">
          <p className="text-sm text-[#B8B8B8]">Continuous Growth &amp; Learning Trajectory</p>
        </div>
      ) : (
        <div ref={mountRef} className="h-full w-full" />
      )}
    </div>
  );
}
