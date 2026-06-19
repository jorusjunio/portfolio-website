"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroVisual() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.scale.setScalar(0.86);
    scene.add(mainGroup);

    const accent = new THREE.Color("#5fb996");
    const softWhite = new THREE.Color("#ffffff");

    const coreGeometry = new THREE.IcosahedronGeometry(1.35, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(core);

    const shellGeometry = new THREE.TorusKnotGeometry(1.7, 0.015, 180, 12, 2, 3);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: softWhite,
      transparent: true,
      opacity: 0.28,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    mainGroup.add(shell);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.26,
      wireframe: true,
    });

    const rings = [2.25, 2.75, 3.15].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 8, 160),
        ringMaterial.clone(),
      );
      ring.rotation.x = Math.PI / 2.6 + index * 0.22;
      ring.rotation.y = index * 0.65;
      mainGroup.add(ring);
      return ring;
    });

    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: accent,
      size: 0.025,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const startedAt = performance.now();
    let frameId = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      const elapsed = (performance.now() - startedAt) / 1000;

      mouse.lerp(target, 0.045);
      mainGroup.rotation.y = elapsed * 0.16 + mouse.x * 0.18;
      mainGroup.rotation.x = Math.sin(elapsed * 0.38) * 0.12 + mouse.y * 0.14;

      core.rotation.x = elapsed * 0.28;
      core.rotation.y = elapsed * 0.34;
      shell.rotation.x = elapsed * 0.18;
      shell.rotation.z = elapsed * 0.22;
      particles.rotation.y = elapsed * 0.035;

      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.08 + index * 0.03);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);

      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        if (Array.isArray(ring.material)) {
          ring.material.forEach((material) => material.dispose());
        } else {
          ring.material.dispose();
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-10 rounded-full bg-[#5fb996]/12 blur-3xl" />
      <div
        ref={mountRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div className="absolute inset-x-12 bottom-12 h-px bg-gradient-to-r from-transparent via-[#5fb996]/70 to-transparent" />
      <div className="absolute bottom-8 left-1/2 h-14 w-72 -translate-x-1/2 bg-[#5fb996]/12 blur-2xl" />
    </div>
  );
}
