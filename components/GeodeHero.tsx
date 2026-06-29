"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";

export default function GeodeHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let raf = 0;
    let cleanup = () => {};
    let cancelled = false;

    function start() {
      const THREE = (window as unknown as { THREE?: any }).THREE;
      const canvas = ref.current;
      if (!THREE || !canvas) return false;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });

      const size = () => {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight || 1;
        camera.updateProjectionMatrix();
      };

      const group = new THREE.Group();
      scene.add(group);
      const geo = new THREE.IcosahedronGeometry(1.5, 1);
      const solid = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: 0x1f4e79,
          transparent: true,
          opacity: 0.18,
        })
      );
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geo),
        new THREE.LineBasicMaterial({
          color: 0x6fa8dc,
          transparent: true,
          opacity: 0.85,
        })
      );
      const inner = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.85, 0)),
        new THREE.LineBasicMaterial({
          color: 0x9fc7e8,
          transparent: true,
          opacity: 0.5,
        })
      );
      group.add(solid, wire, inner);
      size();
      window.addEventListener("resize", size);

      const loop = (t: number) => {
        const sy = window.scrollY;
        group.rotation.y = t * 0.00018 + sy * 0.0022;
        group.rotation.x = 0.35 + t * 0.00009 + sy * 0.0014;
        inner.rotation.y = -t * 0.0004;
        inner.rotation.z = t * 0.0002;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", size);
        renderer.dispose();
      };
      return true;
    }

    if (!start()) {
      const existing = document.getElementById("three-cdn");
      const onReady = () => {
        if (!cancelled) start();
      };
      if (existing) {
        existing.addEventListener("load", onReady);
      } else {
        const s = document.createElement("script");
        s.id = "three-cdn";
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        s.async = true;
        s.addEventListener("load", onReady);
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <canvas id="geode" ref={ref} aria-hidden="true" />;
}
