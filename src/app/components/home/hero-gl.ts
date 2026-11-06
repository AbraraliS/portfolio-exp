/*
 * The hero's living layer, in plain WebGL2.
 *  - Dots: a grid pushed aside by the pointer, with ripples when a stage completes.
 *  - Pulses: comets of light running along each route. Route geometry is baked
 *    into a texture, so positions are computed on the GPU and each frame costs
 *    almost no JavaScript.
 * Loaded after the page is ready, and purely decorative. If WebGL2 is missing
 * or the device can't keep up, it removes itself and the static design remains.
 */

const SAMPLES = 256;
const COMETS_PER_ROUTE = 3;
const TRAIL = 16;
const DOT_GAP = 26;

const DOT_VS = `#version 300 es
layout(location=0) in vec2 a_pos;
uniform vec2 u_res, u_pointer, u_ring;
uniform float u_power, u_dpr, u_time, u_ringAge;
out float v_alpha;
void main() {
  vec2 d = a_pos - u_pointer;
  float r = length(d) + 0.001;
  float near = smoothstep(190.0 * u_dpr, 0.0, r) * u_power;
  float rd = length(a_pos - u_ring);
  float front = u_ringAge * 620.0 * u_dpr;
  float band = 90.0 * u_dpr;
  float ring = smoothstep(band, 0.0, abs(rd - front)) * max(0.0, 1.0 - u_ringAge * 0.85);
  vec2 away = (a_pos - u_ring) / (rd + 0.001);
  vec2 p = a_pos + d / r * near * 16.0 * u_dpr + away * ring * 9.0 * u_dpr;
  vec2 clip = p / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float shimmer = 0.5 + 0.5 * sin(u_time * 0.5 + a_pos.x * 0.006 + a_pos.y * 0.009);
  v_alpha = 0.06 + shimmer * 0.05 + near * 0.55 + ring * 0.6;
  gl_PointSize = (1.7 + near * 1.8 + ring * 1.6) * u_dpr;
}`;

const COMET_VS = `#version 300 es
layout(location=0) in vec3 a_data; // route, phase, trail position (0 = head)
uniform sampler2D u_paths;
uniform vec2 u_res, u_origin;
uniform float u_scale, u_time, u_dpr;
uniform int u_active;
uniform vec3 u_colors[4];
out vec4 v_color;
void main() {
  int route = int(a_data.x);
  float speed = 0.042 + fract(a_data.y * 7.3) * 0.02;
  float s = fract(u_time * speed + a_data.y) - a_data.z * 0.075;
  float f = clamp(s, 0.0, 1.0) * ${(SAMPLES - 1).toFixed(1)};
  int i = int(floor(f));
  int j = min(i + 1, ${SAMPLES - 1});
  vec2 p = mix(
    texelFetch(u_paths, ivec2(i, route), 0).xy,
    texelFetch(u_paths, ivec2(j, route), 0).xy,
    fract(f)
  );
  vec2 clip = (u_origin + p * u_scale) / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float fade = pow(1.0 - a_data.z, 1.7) * step(0.0, s);
  float focus = route == u_active ? 1.0 : 0.5;
  v_color = vec4(u_colors[route], fade * focus);
  gl_PointSize = mix(3.0, 15.0, fade) * u_dpr * clamp(u_scale * 1.6 / u_dpr, 0.65, 1.15);
}`;

const FS = `#version 300 es
precision mediump float;
in float v_alpha;
out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.15, d) * v_alpha;
  o = vec4(vec3(0.82, 0.97, 0.93) * a, a);
}`;

const GLOW_FS = `#version 300 es
precision mediump float;
in vec4 v_color;
out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.2) * v_color.a;
  float core = smoothstep(0.35, 0.0, d) * v_color.a;
  o = vec4((v_color.rgb + core * 0.75) * a, a);
}`;

const program = (gl: WebGL2RenderingContext, vs: string, fs: string) => {
  const p = gl.createProgram()!;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(p, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) ?? "Shader link failed");
  }
  return p;
};

/** Turns an M/H/V/L path into evenly spaced points, by distance along it. */
const samplePath = (d: string) => {
  const points: [number, number][] = [];
  let x = 0;
  let y = 0;
  for (const [, cmd, args] of d.matchAll(/([MHVL])([^MHVL]*)/g)) {
    const n = args
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (cmd === "H") x = n[0];
    else if (cmd === "V") y = n[0];
    else [x, y] = n;
    points.push([x, y]);
  }
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    lengths.push(
      lengths[i - 1] +
        Math.hypot(
          points[i][0] - points[i - 1][0],
          points[i][1] - points[i - 1][1],
        ),
    );
  }
  const total = lengths[lengths.length - 1];
  const out: number[] = [];
  let seg = 1;
  for (let k = 0; k < SAMPLES; k++) {
    const at = (k / (SAMPLES - 1)) * total;
    while (seg < lengths.length - 1 && lengths[seg] < at) seg++;
    const t = (at - lengths[seg - 1]) / (lengths[seg] - lengths[seg - 1] || 1);
    out.push(
      points[seg - 1][0] + (points[seg][0] - points[seg - 1][0]) * t,
      points[seg - 1][1] + (points[seg][1] - points[seg - 1][1]) * t,
    );
  }
  return out;
};

const hexToRgb = (hex: string) => {
  const value = parseInt(hex.trim().slice(1), 16);
  return [(value >> 16) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
};

export interface HeroGL {
  setActive: (routeIndex: number) => void;
  /** Sends a ripple through the dots from a point in map coordinates. */
  pulse: (mapX: number, mapY: number) => void;
  destroy: () => void;
}

export function startHeroGL(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  mapEl: Element,
  paths: string[],
  colors: string[],
): HeroGL | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  let dotProgram: WebGLProgram;
  let cometProgram: WebGLProgram;
  try {
    dotProgram = program(gl, DOT_VS, FS);
    cometProgram = program(gl, COMET_VS, GLOW_FS);
  } catch {
    return null;
  }

  const u = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name);

  // Route geometry as a float texture: one row per route.
  const data = new Float32Array(paths.flatMap(samplePath));
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RG32F,
    SAMPLES,
    paths.length,
    0,
    gl.RG,
    gl.FLOAT,
    data,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const comets: number[] = [];
  paths.forEach((_, route) => {
    for (let c = 0; c < COMETS_PER_ROUTE; c++) {
      const phase = (c + route * 0.37) / COMETS_PER_ROUTE;
      for (let t = 0; t < TRAIL; t++) comets.push(route, phase, t / TRAIL);
    }
  });
  const cometVao = gl.createVertexArray();
  gl.bindVertexArray(cometVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(comets), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  const dotVao = gl.createVertexArray();
  const dotBuffer = gl.createBuffer();
  let dotCount = 0;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  gl.useProgram(cometProgram);
  gl.uniform3fv(
    u(cometProgram, "u_colors"),
    new Float32Array(colors.flatMap(hexToRgb)),
  );

  let active = 0;
  let dpr = 1;
  const origin = [0, 0];
  let scale = 1;

  const measure = () => {
    const rect = host.getBoundingClientRect();
    const map = mapEl.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, rect.width < 800 ? 1.5 : 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    origin[0] = (map.left - rect.left) * dpr;
    origin[1] = (map.top - rect.top) * dpr;
    scale = (map.width / 1000) * dpr;

    const gap = DOT_GAP * dpr;
    const grid: number[] = [];
    for (let y = gap / 2; y < canvas.height; y += gap) {
      for (let x = gap / 2; x < canvas.width; x += gap) grid.push(x, y);
    }
    dotCount = grid.length / 2;
    gl.bindVertexArray(dotVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(grid), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  measure();
  const resizer = new ResizeObserver(measure);
  resizer.observe(host);

  // Pointer, eased so the field follows like something with weight.
  const target = { x: -9999, y: -9999, power: 0 };
  const pointer = { x: -9999, y: -9999, power: 0 };
  const onMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    target.x = (event.clientX - rect.left) * dpr;
    target.y = (event.clientY - rect.top) * dpr;
    target.power = 1;
    if (pointer.x < -9000) {
      pointer.x = target.x;
      pointer.y = target.y;
    }
  };
  const onLeave = () => {
    target.power = 0;
  };
  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerdown", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave, { passive: true });

  const ring = { x: -9999, y: -9999, start: -100 };

  let frame = 0;
  let running = false;
  let last = 0;
  let slowFrames = 0;
  let sampled = 0;
  const started = performance.now();

  const draw = (now: number) => {
    if (!running) return;
    frame = requestAnimationFrame(draw);
    const delta = now - last;
    last = now;

    // If this device can't keep up, the page matters more than the effect.
    if (sampled < 120 && delta < 1000) {
      sampled++;
      if (delta > 42) slowFrames++;
      if (sampled === 120 && slowFrames > 70) {
        destroy();
        return;
      }
    }

    const time = (now - started) / 1000;
    pointer.x += (target.x - pointer.x) * 0.12;
    pointer.y += (target.y - pointer.y) * 0.12;
    pointer.power += (target.power - pointer.power) * 0.08;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(dotProgram);
    gl.bindVertexArray(dotVao);
    gl.uniform2f(u(dotProgram, "u_res"), canvas.width, canvas.height);
    gl.uniform2f(u(dotProgram, "u_pointer"), pointer.x, pointer.y);
    gl.uniform2f(u(dotProgram, "u_ring"), ring.x, ring.y);
    gl.uniform1f(u(dotProgram, "u_ringAge"), time - ring.start);
    gl.uniform1f(u(dotProgram, "u_power"), pointer.power);
    gl.uniform1f(u(dotProgram, "u_dpr"), dpr);
    gl.uniform1f(u(dotProgram, "u_time"), time);
    gl.drawArrays(gl.POINTS, 0, dotCount);

    gl.useProgram(cometProgram);
    gl.bindVertexArray(cometVao);
    gl.uniform2f(u(cometProgram, "u_res"), canvas.width, canvas.height);
    gl.uniform2f(u(cometProgram, "u_origin"), origin[0], origin[1]);
    gl.uniform1f(u(cometProgram, "u_scale"), scale);
    gl.uniform1f(u(cometProgram, "u_time"), time);
    gl.uniform1f(u(cometProgram, "u_dpr"), dpr);
    gl.uniform1i(u(cometProgram, "u_active"), active);
    gl.drawArrays(gl.POINTS, 0, comets.length / 3);
  };

  const start = () => {
    if (running || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(draw);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  // No work at all while the hero is off screen or the tab is hidden.
  let visible = true;
  const watcher = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  watcher.observe(host);
  const onVisibility = () => {
    if (document.hidden) stop();
    else if (visible) start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  host.classList.add("gl-on");
  start();

  function destroy() {
    stop();
    resizer.disconnect();
    watcher.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerdown", onMove);
    host.removeEventListener("pointerleave", onLeave);
    host.classList.remove("gl-on");
  }

  return {
    setActive: (index) => {
      active = index;
    },
    pulse: (mapX, mapY) => {
      ring.x = origin[0] + mapX * scale;
      ring.y = origin[1] + mapY * scale;
      ring.start = (performance.now() - started) / 1000;
    },
    destroy,
  };
}
