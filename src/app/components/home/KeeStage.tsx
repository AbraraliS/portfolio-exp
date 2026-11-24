"use client";

/**
 * Kee in 3D: the RobotExpressive model by Tomás Laulhé (CC0 1.0, from the three.js examples),
 * recoloured in the portfolio's mint and red, rendered with three.js (MIT) directly.
 * He waves on arrival, turns toward the pointer, and plays a random emote when tapped.
 * If WebGL is not available, the stage shows a still glow instead of failing.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL = "/models/robot-expressive.glb";
const EMOTES = ["Wave", "Dance", "ThumbsUp", "Jump", "Yes"];
const LINES = [
  "Hi, I'm Kee. AbrarAli builds whole products, end to end.",
  "Crizo for Android files your payments by itself. Free.",
  "CrizaTools: 67 free tools, and none of them upload your files.",
  "CrizaVoise bills a whole shop counter with no internet.",
  "Everything in Live now is real data.",
  "Need something built? Criza Labs is one email away.",
];

export default function KeeStage() {
  const host = useRef<HTMLDivElement>(null);
  const emoteRef = useRef<(name: string) => void>(() => {});
  const [ready, setReady] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const count = useRef(0);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL: the CSS glow stays.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.2, 6.2);
    camera.lookAt(0, -0.25, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(3, 5, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);
    const red = new THREE.PointLight(0xef4444, 14, 8);
    red.position.set(-3, 1, 2);
    scene.add(red);
    const mint = new THREE.PointLight(0x8af2be, 18, 8);
    mint.position.set(3, 0.5, -2);
    scene.add(mint);

    // The stage: a disc, a mint ring and a thin red ring.
    const stage = new THREE.Group();
    stage.position.y = -1.56;
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(1.2, 64),
      new THREE.MeshStandardMaterial({ color: 0x0f1512, roughness: 0.9 }),
    );
    disc.rotation.x = -Math.PI / 2;
    disc.receiveShadow = true;
    const ringA = new THREE.Mesh(
      new THREE.RingGeometry(1.14, 1.2, 96),
      new THREE.MeshBasicMaterial({
        color: 0xa1ffcb,
        transparent: true,
        opacity: 0.85,
      }),
    );
    ringA.rotation.x = -Math.PI / 2;
    ringA.position.y = 0.005;
    const ringB = new THREE.Mesh(
      new THREE.RingGeometry(0.86, 0.875, 96),
      new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.6,
      }),
    );
    ringB.rotation.x = -Math.PI / 2;
    ringB.position.y = 0.006;
    stage.add(disc, ringA, ringB);
    scene.add(stage);

    // Sparkles: soft mint points drifting upward.
    const N = 70;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = Math.random() * 3.5 - 1.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({
        color: 0xa1ffcb,
        size: 0.035,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
    );
    scene.add(sparks);

    // The robot.
    const holder = new THREE.Group();
    holder.position.y = -1.55;
    scene.add(holder);
    let mixer: THREE.AnimationMixer | null = null;
    let head: THREE.Object3D | null = null;
    const actions: Record<string, THREE.AnimationAction> = {};
    let current = "Idle";

    const play = (name: string, once: boolean) => {
      const next = actions[name];
      const prev = actions[current];
      if (!next) return;
      next.reset();
      next.setLoop(
        once ? THREE.LoopOnce : THREE.LoopRepeat,
        once ? 1 : Infinity,
      );
      next.clampWhenFinished = once;
      next.fadeIn(0.3).play();
      if (prev && prev !== next) prev.fadeOut(0.3);
      current = name;
    };
    emoteRef.current = (name) => play(name, true);

    let disposed = false;
    new GLTFLoader().load(MODEL, (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if ((o as THREE.Bone).isBone && o.name === "Head" && !head) head = o;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        mats.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.name === "Main") {
            mat.color = new THREE.Color("#8af2be");
            mat.roughness = 0.35;
            mat.metalness = 0.15;
          } else if (mat.name === "Grey") {
            mat.color = new THREE.Color("#1b2420");
            mat.roughness = 0.5;
          } else if (mat.name === "Black") {
            mat.color = new THREE.Color("#0b0e0d");
            mat.roughness = 0.3;
          }
        });
      });
      // Fit: stand him whole on the stage, about 2.4 units tall, feet on the disc.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const fit = 2.4 / size.y;
      model.scale.setScalar(fit);
      model.position.y = -box.min.y * fit;
      holder.add(model);
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach(
        (clip) => (actions[clip.name] = mixer!.clipAction(clip)),
      );
      actions.Idle?.play();
      mixer.addEventListener("finished", () => play("Idle", false));
      setReady(true);
      if (!still) window.setTimeout(() => play("Wave", true), 500);
      else renderer.render(scene, camera);
    });

    // Pointer: head and body turn toward it.
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (still) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Render only while the stage is on screen.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
    );
    io.observe(el);

    const clock = new THREE.Clock();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      mixer?.update(dt);
      if (head) {
        head.rotation.y = THREE.MathUtils.damp(
          head.rotation.y,
          target.x * 0.6,
          6,
          dt,
        );
        head.rotation.x = THREE.MathUtils.damp(
          head.rotation.x,
          -target.y * 0.3,
          6,
          dt,
        );
      }
      holder.rotation.y = THREE.MathUtils.damp(
        holder.rotation.y,
        target.x * 0.35,
        3,
        dt,
      );
      holder.position.y = -1.55 + Math.sin(t * 1.4) * 0.03;
      const p = sparkGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < N; i++) {
        let y = p.getY(i) + dt * 0.12;
        if (y > 1.9) y = -1.6;
        p.setY(i, y);
      }
      p.needsUpdate = true;
      ringA.rotation.z += dt * 0.15;
      renderer.render(scene, camera);
    };
    if (!still) tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const tap = () => {
    emoteRef.current(EMOTES[count.current % EMOTES.length]);
    setLine(LINES[count.current % LINES.length]);
    count.current += 1;
  };

  return (
    <div ref={host} className={`kee-stage${ready ? " is-ready" : ""}`}>
      <span className="kee-corner kee-tl" aria-hidden="true">
        KEE · 001
      </span>
      <span className="kee-corner kee-tr" aria-hidden="true">
        CC0 · three.js
      </span>
      <span className="kee-corner kee-bl" aria-hidden="true">
        BLR · IN
      </span>
      <button
        type="button"
        className="kee-tap"
        onClick={tap}
        aria-label="Kee, the 3D companion. Tap for a fact about AbrarAli's work"
      >
        <span className="kee-corner kee-br" aria-hidden="true">
          Tap to talk ↗
        </span>
      </button>
      {line && (
        <p className="kee-say" role="status" key={line}>
          {line}
        </p>
      )}
    </div>
  );
}
