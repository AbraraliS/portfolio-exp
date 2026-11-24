/**
 * The cinema's single 3D stage (three.js, MIT). One WebGL context for the whole story.
 * Kee is the RobotExpressive model by Tomás Laulhé (CC0 1.0). The phone and laptop are built here
 * and show real screens from Crizo and CrizaVoise. Every object is placed from `prog`, the scroll
 * progress of each chapter (0 to 1), which the page fills from GSAP ScrollTrigger.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type Progress = {
  title: number;
  kee: number;
  crizo: number;
  voise: number;
  gallery: number;
  close: number;
};

const damp = THREE.MathUtils.damp;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function createStage(
  canvas: HTMLCanvasElement,
  prog: Progress,
  still: boolean,
  onReady: () => void,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 0.2, 7);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(3, 6, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);
  const red = new THREE.PointLight(0xef4444, 16, 10);
  red.position.set(-3.5, 1, 2.5);
  scene.add(red);
  const mint = new THREE.PointLight(0x8af2be, 22, 10);
  mint.position.set(3.5, 0.5, -1.5);
  scene.add(mint);

  // Drifting dust across the whole story.
  const N = 140;
  const dust = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    dust[i * 3] = (Math.random() - 0.5) * 12;
    dust[i * 3 + 1] = (Math.random() - 0.5) * 7;
    dust[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xa1ffcb,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    }),
  );
  scene.add(dustPts);

  // Floor shadow catcher.
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({ opacity: 0.35 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.6;
  floor.receiveShadow = true;
  scene.add(floor);

  const tex = new THREE.TextureLoader();
  const screen = (url: string) => {
    const t = tex.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };

  // The phone with Crizo's Money tab.
  const phone = new THREE.Group();
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(1.06, 2.2, 0.1, 6, 0.12),
    new THREE.MeshStandardMaterial({
      color: 0x0c100e,
      metalness: 0.6,
      roughness: 0.3,
    }),
  );
  body.castShadow = true;
  const phoneScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 2.12),
    new THREE.MeshBasicMaterial({ map: screen("/cinema/crizo-money.webp") }),
  );
  phoneScreen.position.z = 0.051;
  const rim = new THREE.Mesh(
    new RoundedBoxGeometry(1.1, 2.24, 0.08, 6, 0.13),
    new THREE.MeshStandardMaterial({
      color: 0x8af2be,
      metalness: 0.8,
      roughness: 0.25,
    }),
  );
  rim.position.z = -0.012;
  phone.add(rim, body, phoneScreen);
  phone.visible = false;
  scene.add(phone);

  // The laptop with CrizaVoise's dashboard; the lid opens on its hinge.
  const laptop = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({
    color: 0x1d2522,
    metalness: 0.7,
    roughness: 0.35,
  });
  const base = new THREE.Mesh(
    new RoundedBoxGeometry(2.6, 0.08, 1.7, 4, 0.03),
    metal,
  );
  base.castShadow = true;
  const keys = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 0.95),
    new THREE.MeshStandardMaterial({ color: 0x0b0f0d, roughness: 0.8 }),
  );
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, 0.041, -0.15);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.04, -0.85);
  const lid = new THREE.Mesh(
    new RoundedBoxGeometry(2.6, 1.62, 0.05, 4, 0.03),
    metal,
  );
  lid.position.y = 0.81;
  lid.castShadow = true;
  const lidScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.42, 1.45),
    new THREE.MeshBasicMaterial({
      map: screen("/cinema/crizavoise-dashboard.webp"),
    }),
  );
  lidScreen.position.set(0, 0.81, 0.027);
  hinge.add(lid, lidScreen);
  laptop.add(base, keys, hinge);
  laptop.visible = false;
  scene.add(laptop);

  // Kee.
  const kee = new THREE.Group();
  kee.position.set(-5, -1.6, 0);
  scene.add(kee);
  let mixer: THREE.AnimationMixer | null = null;
  let head: THREE.Object3D | null = null;
  const actions: Record<string, THREE.AnimationAction> = {};
  let current = "";
  const play = (name: string, once = false) => {
    if (current === name || !actions[name]) return;
    const next = actions[name];
    const prev = actions[current];
    next.reset();
    next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.fadeIn(0.35).play();
    if (prev) prev.fadeOut(0.35);
    current = name;
  };

  let disposed = false;
  new GLTFLoader().load("/models/robot-expressive.glb", (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    model.traverse((o) => {
      if ((o as THREE.Bone).isBone && o.name === "Head" && !head) head = o;
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(
        (m) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.name === "Main") {
            mat.color = new THREE.Color("#8af2be");
            mat.roughness = 0.35;
            mat.metalness = 0.15;
          } else if (mat.name === "Grey")
            mat.color = new THREE.Color("#1b2420");
          else if (mat.name === "Black") mat.color = new THREE.Color("#0b0e0d");
        },
      );
    });
    const box = new THREE.Box3().setFromObject(model);
    const fit = 2.3 / box.getSize(new THREE.Vector3()).y;
    model.scale.setScalar(fit);
    model.position.y = -box.min.y * fit;
    kee.add(model);
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach(
      (clip) => (actions[clip.name] = mixer!.clipAction(clip)),
    );
    play("Idle");
    onReady();
  });

  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let narrow = false;
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    narrow = camera.aspect < 0.85;
    camera.fov = narrow ? 44 : 32;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  let waved = false;
  let danced = false;
  const clock = new THREE.Clock();
  let frame = 0;

  const place = (dt: number) => {
    const t = clock.elapsedTime;
    const side = narrow ? 0 : 1; // On phones objects sit centred, lower, under the text.
    const low = narrow ? -0.55 : 0;

    // Kee: walks in during his chapter, steps aside for the products, returns to dance at the close.
    const walk = ease(seg(prog.kee, 0.05, 0.6));
    let kx = -5 + walk * 5;
    let ks = 1;
    const ky = -1.6 + low;
    if (prog.crizo > 0) {
      const aside = ease(seg(prog.crizo, 0, 0.3));
      kx = THREE.MathUtils.lerp(kx, narrow ? -1.1 : -2.7, aside);
      ks = THREE.MathUtils.lerp(1, 0.55, aside);
    }
    if (prog.gallery > 0.05)
      ks = THREE.MathUtils.lerp(ks, 0, ease(seg(prog.gallery, 0.05, 0.25)));
    if (prog.close > 0) {
      const back = ease(seg(prog.close, 0, 0.4));
      kx = THREE.MathUtils.lerp(kx, 0, back);
      ks = THREE.MathUtils.lerp(ks, 1, back);
    }
    kee.position.x = damp(kee.position.x, kx, 6, dt);
    kee.position.y = damp(kee.position.y, ky, 6, dt);
    const s = damp(kee.scale.x, ks, 6, dt);
    kee.scale.setScalar(Math.max(0.0001, s));
    kee.visible = s > 0.02;

    // Animation choice from the story.
    if (prog.close > 0.35) {
      if (!danced) play("Dance");
      danced = true;
    } else {
      danced = false;
      const walking = prog.kee > 0.04 && prog.kee < 0.6 && prog.crizo === 0;
      if (walking) {
        play("Walking");
        waved = false;
        kee.rotation.y = damp(kee.rotation.y, Math.PI / 2, 8, dt);
      } else {
        kee.rotation.y = damp(kee.rotation.y, pointer.x * 0.4, 4, dt);
        if (prog.kee >= 0.6 && !waved && prog.crizo === 0) {
          play("Wave", true);
          waved = true;
          window.setTimeout(
            () => (current === "Wave" ? play("Idle") : null),
            2200,
          );
        } else if (current === "Walking" || current === "Dance") play("Idle");
      }
    }
    if (head && current !== "Walking") {
      head.rotation.y = damp(head.rotation.y, pointer.x * 0.5, 6, dt);
      head.rotation.x = damp(head.rotation.x, -pointer.y * 0.25, 6, dt);
    }

    // Phone: rises and turns during Crizo, leaves as CrizaVoise begins.
    const pin = ease(seg(prog.crizo, 0.05, 0.55));
    const pout = ease(seg(prog.voise, 0, 0.25));
    phone.visible = prog.crizo > 0.02 && pout < 1;
    phone.position.set(
      side * 2.0,
      THREE.MathUtils.lerp(-3.5, 0.15 + low * 1.4, pin) + pout * 4,
      0,
    );
    phone.rotation.set(
      0.08,
      THREE.MathUtils.lerp(-1.6, -0.35, pin) + Math.sin(t * 0.8) * 0.06,
      THREE.MathUtils.lerp(0.4, 0.05, pin),
    );
    phone.scale.setScalar(narrow ? 0.8 : 1);

    // Laptop: slides in closed, then the lid opens with the scroll.
    const lin = ease(seg(prog.voise, 0.1, 0.4));
    const open = ease(seg(prog.voise, 0.35, 0.75));
    const lout = ease(seg(prog.gallery, 0, 0.2));
    laptop.visible = prog.voise > 0.08 && lout < 1;
    laptop.position.set(
      THREE.MathUtils.lerp(side ? -6 : 0, side ? -1.9 : 0, lin),
      -1.0 + low * 1.2 - lout * 4,
      THREE.MathUtils.lerp(narrow ? -3 : 0, 0, lin),
    );
    laptop.rotation.set(
      0.32,
      THREE.MathUtils.lerp(0.9, side ? 0.35 : 0, lin),
      0,
    );
    laptop.scale.setScalar(narrow ? 0.62 : 1);
    hinge.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, -0.28, open);

    // Dust drifts; the whole field slides gently with the story.
    const p = dustGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      let y = p.getY(i) + dt * 0.08;
      if (y > 3.5) y = -3.5;
      p.setY(i, y);
    }
    p.needsUpdate = true;
    dustPts.rotation.y = prog.title * 0.3 + prog.gallery * 0.6;
  };

  const tick = () => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    mixer?.update(dt);
    place(dt);
    renderer.render(scene, camera);
  };
  if (still) {
    // A single calm frame: Kee standing centre.
    kee.position.set(0, -1.6, 0);
    const once = () => {
      mixer?.update(0);
      renderer.render(scene, camera);
    };
    const id = window.setInterval(once, 500);
    window.setTimeout(() => window.clearInterval(id), 4000);
  } else tick();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };
}
