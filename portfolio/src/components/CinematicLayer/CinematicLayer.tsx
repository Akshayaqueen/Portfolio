"use client";

import { useEffect, useRef } from "react";
import type * as THREE_TYPES from "three";
import styles from "./CinematicLayer.module.css";

const PARTICLE_COUNT = 220;

function buildGlowTexture(): HTMLCanvasElement {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(180,210,255,0.85)");
  g.addColorStop(0.4, "rgba(80,140,255,0.35)");
  g.addColorStop(0.7, "rgba(40,80,200,0.1)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export default function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId: number;
    let cancelled = false;

    // palette: [r, g, b] in 0-1 range
    const palette: [number, number, number][] = [
      [0.95, 0.97, 1.0], // near-white
      [0.7, 0.85, 1.0],  // ice blue
      [0.45, 0.7, 1.0],  // bright blue
      [0.55, 0.78, 1.0], // medium blue
      [0.8, 0.9, 1.0],   // soft blue
      [1.0, 1.0, 1.0],   // pure white
    ];

    import("three").then((THREE) => {
      if (cancelled) return;

      const W = container.clientWidth;
      const H = container.clientHeight;

      /* ── Scene ── */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 100);
      camera.position.z = 6;

      /* ── Renderer ── */
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      /* ── Glow texture ── */
      const texCanvas = buildGlowTexture();
      const texture = new THREE.CanvasTexture(texCanvas);

      /* ── Buffers ── */
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const base = new Float32Array(PARTICLE_COUNT * 3);
      const phase = new Float32Array(PARTICLE_COUNT);
      const speed = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 13;
        const z = (Math.random() - 0.5) * 9 - 1;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        base[i * 3] = x;
        base[i * 3 + 1] = y;
        base[i * 3 + 2] = z;

        phase[i] = Math.random() * Math.PI * 2;
        speed[i] = 0.12 + Math.random() * 0.18;

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];

        // Large bokeh or small star
        sizes[i] =
          Math.random() < 0.22
            ? 0.18 + Math.random() * 0.28 // bokeh orbs
            : 0.025 + Math.random() * 0.07; // tiny stars
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.35,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      /* ── Mouse parallax ── */
      let mx = 0,
        my = 0,
        tx = 0,
        ty = 0;
      const onMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

      /* ── Resize ── */
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      /* ── Clock ── */
      const clock = new THREE.Clock();
      const posAttr = geometry.attributes.position as THREE_TYPES.BufferAttribute;

      /* ── Render loop ── */
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Smooth camera parallax
        tx += (mx - tx) * 0.028;
        ty += (my - ty) * 0.028;
        camera.position.x = tx * 0.45;
        camera.position.y = ty * 0.28;
        camera.lookAt(scene.position);

        // Float each particle on its own sine curve
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ph = phase[i];
          const sp = speed[i];
          (posAttr.array as Float32Array)[i * 3] =
            base[i * 3] + Math.cos(t * sp * 0.8 + ph) * 0.22;
          (posAttr.array as Float32Array)[i * 3 + 1] =
            base[i * 3 + 1] + Math.sin(t * sp + ph) * 0.28;
        }
        posAttr.needsUpdate = true;

        // Breathe opacity slowly
        material.opacity = 0.6 + Math.sin(t * 0.35) * 0.15;

        renderer.render(scene, camera);
      };
      animate();

      /* ── Cleanup ── */
      const cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        texture.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };

      // Store cleanup so the outer return can call it
      (container as HTMLDivElement & { __threeCleanup?: () => void }).__threeCleanup = cleanup;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      const cleanup = (container as HTMLDivElement & { __threeCleanup?: () => void }).__threeCleanup;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={styles.root} aria-hidden="true" />;
}
