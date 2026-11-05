/**
 * iso-art.mjs — generates the technical line-art for the Mid-State mockup.
 *
 * Everything is drawn on a true 30° isometric grid so edges meet exactly.
 * Output: standalone <svg> strings, styled entirely via CSS classes so the
 * artwork recolors itself in Blueprint Mode.
 *
 * Projection:  X = (x - y) * C30 * S      C30 = cos(30°)
 *              Y = (x + y) * S30 * S - z * S
 */

const C30 = Math.cos(Math.PI / 6);
const S30 = Math.sin(Math.PI / 6);
const S = 11; // px per grid unit

const r2 = (n) => Math.round(n * 100) / 100;

class Sheet {
  constructor() {
    this.els = [];
    this.minX = Infinity; this.minY = Infinity;
    this.maxX = -Infinity; this.maxY = -Infinity;
  }
  pt(x, y, z = 0) {
    const X = (x - y) * C30 * S;
    const Y = (x + y) * S30 * S - z * S;
    return [r2(X), r2(Y)];
  }
  track(X, Y) {
    if (X < this.minX) this.minX = X;
    if (X > this.maxX) this.maxX = X;
    if (Y < this.minY) this.minY = Y;
    if (Y > this.maxY) this.maxY = Y;
  }
  poly(pts3, cls, { close = true, order = 0 } = {}) {
    const pts = pts3.map(([x, y, z]) => this.pt(x, y, z));
    pts.forEach(([X, Y]) => this.track(X, Y));
    const d = pts.map(([X, Y], i) => `${i ? 'L' : 'M'}${X} ${Y}`).join('') + (close ? 'Z' : '');
    this.els.push({ tag: 'path', attrs: { d, class: cls, 'data-o': order } });
  }
  seg(a, b, cls, order = 0) {
    this.poly([a, b], cls, { close: false, order });
  }
  // screen-space path (already projected coords)
  raw(d, cls, order = 0, extra = {}) {
    // track coords found in the path string
    const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
    for (let i = 0; i < nums.length - 1; i += 2) this.track(nums[i], nums[i + 1]);
    this.els.push({ tag: 'path', attrs: { d, class: cls, 'data-o': order, ...extra } });
  }
  text(X, Y, str, cls, extra = {}) {
    this.track(X - 4, Y - 10); this.track(X + str.length * 6, Y + 4);
    this.els.push({ tag: 'text', attrs: { x: r2(X), y: r2(Y), class: cls, ...extra }, content: str });
  }

  /* ---- compound forms ------------------------------------------------ */

  /** Rectangular mass. Visible faces: top, right (x = x+w), left (y = y+d). */
  box(x, y, z, w, d, h, { order = 0, hidden = false } = {}) {
    const t = z + h;
    // fills first (drawn under lines)
    this.poly([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]], 'f f-top', { order });
    this.poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]], 'f f-rt', { order });
    this.poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]], 'f f-lt', { order });
    // outline
    this.poly([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]], 'ln', { order });
    this.seg([x + w, y, z], [x + w, y, t], 'ln', order);
    this.seg([x + w, y + d, z], [x + w, y + d, t], 'ln', order);
    this.seg([x, y + d, z], [x, y + d, t], 'ln', order);
    this.seg([x + w, y, z], [x + w, y + d, z], 'ln', order);
    this.seg([x + w, y + d, z], [x, y + d, z], 'ln', order);
    if (hidden) { // dashed back edges — drafting convention
      this.seg([x, y, z], [x, y, t], 'ln-hid', order);
      this.seg([x, y, z], [x + w, y, z], 'ln-hid', order);
      this.seg([x, y, z], [x, y + d, z], 'ln-hid', order);
    }
  }

  /** Window strips on the right face (x = fx), distributed along y. */
  winRight(fx, y0, y1, z, rows, cols, wh = 1.5, { order = 1 } = {}) {
    const span = (y1 - y0) / cols;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const yA = y0 + span * c + span * 0.22;
        const yB = y0 + span * (c + 1) - span * 0.22;
        const zA = z + r * 2.6 + 0.9;
        this.poly([[fx, yA, zA], [fx, yB, zA], [fx, yB, zA + wh], [fx, yA, zA + wh]], 'ln-lt glz', { order });
      }
    }
  }
  /** Window strips on the left face (y = fy), distributed along x. */
  winLeft(fy, x0, x1, z, rows, cols, wh = 1.5, { order = 1 } = {}) {
    const span = (x1 - x0) / cols;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xA = x0 + span * c + span * 0.22;
        const xB = x0 + span * (c + 1) - span * 0.22;
        const zA = z + r * 2.6 + 0.9;
        this.poly([[xA, fy, zA], [xB, fy, zA], [xB, fy, zA + wh], [xA, fy, zA + wh]], 'ln-lt glz', { order });
      }
    }
  }

  /** Ground hatch: parallel ticks along iso-x inside rect (x,y,w,d). */
  hatch(x, y, w, d, step = 1.4, order = 0) {
    for (let yy = y + step; yy < y + d; yy += step) {
      this.seg([x + 0.3, yy, 0], [x + w - 0.3, yy, 0], 'ln-hatch', order);
    }
  }

  /** Tower crane in accent color. Base at (x,y), mast height h, jib len j. */
  crane(x, y, h, j, { order = 5 } = {}) {
    const m = 1.1; // mast half-width
    // mast verticals
    this.seg([x - m, y - m, 0], [x - m, y - m, h], 'acc', order);
    this.seg([x + m, y + m, 0], [x + m, y + m, h], 'acc', order);
    this.seg([x + m, y - m, 0], [x + m, y - m, h], 'acc', order);
    // cross bracing on the visible plane
    for (let z = 0; z < h - 2; z += 2.4) {
      this.seg([x + m, y - m, z], [x + m, y + m, z + 2.4], 'acc-lt', order);
      this.seg([x + m, y + m, z], [x + m, y - m, z + 2.4], 'acc-lt', order);
    }
    // operator cab
    this.box(x - 1.2, y - 1.2, h, 2.4, 2.4, 1.6, { order });
    // jib (toward +x) and counter-jib
    const jz = h + 1.6;
    this.seg([x, y, jz], [x + j, y, jz], 'acc', order);
    this.seg([x, y, jz], [x - j * 0.38, y, jz], 'acc', order);
    // apex tie lines
    this.seg([x, y, jz + 2.6], [x + j, y, jz], 'acc-lt', order);
    this.seg([x, y, jz + 2.6], [x - j * 0.38, y, jz], 'acc-lt', order);
    this.seg([x, y, jz], [x, y, jz + 2.6], 'acc', order);
    // counterweight
    this.box(x - j * 0.38 - 1, y - 0.9, jz - 1.8, 1.8, 1.8, 1.5, { order });
    // hook + hanging panel
    const hx = x + j * 0.74;
    this.seg([hx, y, jz], [hx, y, jz - 6.5], 'acc-lt', order);
    this.poly([[hx - 1.6, y, jz - 6.5], [hx + 1.6, y, jz - 6.5], [hx + 1.6, y, jz - 9], [hx - 1.6, y, jz - 9]], 'ln glz', { order });
  }

  /** Horizontal dimension line in screen space, with arrowheads + label. */
  dim(p1, p2, label, { off = 26, order = 9 } = {}) {
    const [x1, y1] = this.pt(...p1);
    const [x2, y2] = this.pt(...p2);
    const Y = Math.max(y1, y2) + off;
    // extension lines
    this.raw(`M${x1} ${y1 + 6}L${x1} ${Y + 4}`, 'ln-dim', order);
    this.raw(`M${x2} ${y2 + 6}L${x2} ${Y + 4}`, 'ln-dim', order);
    // dimension line
    this.raw(`M${x1} ${Y}L${x2} ${Y}`, 'ln-dim', order);
    // architectural tick marks (45°)
    this.raw(`M${x1 - 3.5} ${Y + 3.5}L${x1 + 3.5} ${Y - 3.5}`, 'ln-dim-t', order);
    this.raw(`M${x2 - 3.5} ${Y + 3.5}L${x2 + 3.5} ${Y - 3.5}`, 'ln-dim-t', order);
    this.text((x1 + x2) / 2, Y - 6, label, 'tx-dim', { 'text-anchor': 'middle' });
  }

  /** North arrow — top-right drafting mark. */
  north(X, Y, order = 9) {
    this.raw(`M${X} ${Y} m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0`, 'ln-lt', order);
    this.raw(`M${X} ${Y + 6}L${X} ${Y - 7}`, 'ln-lt', order);
    this.raw(`M${X - 4} ${Y - 1}L${X} ${Y - 7}L${X + 4} ${Y - 1}`, 'acc', order);
    this.text(X + 13, Y + 4, 'N', 'tx-dim');
  }

  svg({ pad = 18, cls = '' } = {}) {
    const w = r2(this.maxX - this.minX + pad * 2);
    const h = r2(this.maxY - this.minY + pad * 2);
    const tx = r2(pad - this.minX);
    const ty = r2(pad - this.minY);
    const inner = this.els.map((e) => {
      const a = Object.entries(e.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
      return e.content != null ? `<${e.tag} ${a}>${e.content}</${e.tag}>` : `<${e.tag} ${a}/>`;
    }).join('\n    ');
    return `<svg class="iso ${cls}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g transform="translate(${tx} ${ty})">
    ${inner}
  </g>
</svg>`;
  }
}

/* ======================= THE DRAWINGS ================================== */

/** G-000 — hero: L-shaped mid-rise + tower crane + site work */
export function heroBuilding() {
  const s = new Sheet();
  // ground plot
  s.poly([[-2, -2, 0], [30, -2, 0], [30, 24, 0], [-2, 24, 0]], 'ln-lt');
  s.hatch(2, 18.5, 24, 4.5, 1.5); // front drive
  // main tower — 6 floors
  s.box(4, 2, 0, 11, 9, 15.6, { hidden: true });
  s.winRight(15, 2.6, 10.4, 0, 6, 4);
  s.winLeft(11, 4.6, 14.4, 0, 6, 4);
  // low wing — 3 floors
  s.box(15, 6, 0, 9, 11, 7.8);
  s.winRight(24, 6.6, 16.4, 0, 3, 4);
  s.winLeft(17, 15.5, 23.5, 0, 3, 3);
  // entry canopy on wing front
  s.box(18.5, 17, 3.2, 4.4, 2.6, 0.5);
  s.seg([19.2, 19.6, 0], [19.2, 19.6, 3.2], 'ln');
  s.seg([22.2, 19.6, 0], [22.2, 19.6, 3.2], 'ln');
  // entry door — accent
  s.poly([[19.9, 17.02, 0], [21.5, 17.02, 0], [21.5, 17.02, 2.6], [19.9, 17.02, 2.6]], 'acc glz', { order: 2 });
  // rooftop units
  s.box(6, 4, 15.6, 2.6, 2.2, 1.3);
  s.box(10.5, 5.5, 15.6, 2, 2, 1);
  s.box(17.5, 8, 7.8, 2.2, 2, 1.1);
  // parapet reveal lines
  s.seg([4, 11, 15.1], [15, 11, 15.1], 'ln-lt');
  s.seg([15, 2, 15.1], [15, 11, 15.1], 'ln-lt');
  // crane behind-left
  s.crane(1.5, 16, 21, 13);
  // dimensions
  s.dim([4, 11, 0], [24, 17, 0], "210'-0\"", { off: 40 });
  s.north(170, -150);
  return s.svg({ cls: 'iso-hero' });
}

/** A-201 — healthcare: low 2-story MOB, ribbon glazing, canopy */
export function bHealthcare() {
  const s = new Sheet();
  s.poly([[-1.5, -1.5, 0], [24, -1.5, 0], [24, 17, 0], [-1.5, 17, 0]], 'ln-lt');
  s.box(2, 2, 0, 16, 11, 6.4, { hidden: true });
  // ribbon windows — long horizontal bands
  for (const zb of [1.2, 4.2]) {
    s.poly([[18, 3, zb], [18, 12.2, zb], [18, 12.2, zb + 1.7], [18, 3, zb + 1.7]], 'ln-lt glz', { order: 1 });
    s.poly([[3, 13, zb], [17, 13, zb], [17, 13, zb + 1.7], [3, 13, zb + 1.7]], 'ln-lt glz', { order: 1 });
    // mullion ticks
    for (let yy = 4.5; yy < 12; yy += 1.6) s.seg([18, yy, zb], [18, yy, zb + 1.7], 'ln-lt', 1);
    for (let xx = 4.5; xx < 17; xx += 1.8) s.seg([xx, 13, zb], [xx, 13, zb + 1.7], 'ln-lt', 1);
  }
  // entry canopy on columns
  s.box(8, 13.2, 2.9, 5, 3.4, 0.45);
  s.seg([8.8, 16.2, 0], [8.8, 16.2, 2.9], 'ln');
  s.seg([12.2, 16.2, 0], [12.2, 16.2, 2.9], 'ln');
  s.poly([[9.6, 13.06, 0], [11.4, 13.06, 0], [11.4, 13.06, 2.4], [9.6, 13.06, 2.4]], 'acc glz', { order: 2 });
  // rooftop AHU + screen
  s.box(5, 4, 6.4, 3.4, 2.6, 1.5);
  s.box(12, 6, 6.4, 2.4, 2.2, 1.1);
  s.hatch(2.5, 14.2, 4.5, 2.4, 1.3);
  s.dim([2, 13, 0], [18, 13, 0], "184'-0\"", { off: 34 });
  s.north(135, -95);
  return s.svg();
}

/** A-202 — education: classroom bar + gym mass + flagpole */
export function bEducation() {
  const s = new Sheet();
  s.poly([[-1.5, -1.5, 0], [27, -1.5, 0], [27, 16, 0], [-1.5, 16, 0]], 'ln-lt');
  // classroom bar — 2 stories, rhythmic windows
  s.box(2, 5, 0, 17, 8, 6.2, { hidden: true });
  s.winLeft(13, 2.8, 18.4, 0, 2, 7, 1.6);
  s.winRight(19, 5.6, 12.4, 0, 2, 3, 1.6);
  // gym — tall solid mass with clerestory ticks
  s.box(19, 3, 0, 7, 9, 9);
  for (let yy = 3.8; yy < 11.6; yy += 1.5) s.seg([26, yy, 7.4], [26, yy, 8.3], 'ln-lt', 1);
  // entry vestibule
  s.box(8, 13, 0, 3.6, 1.6, 3.4);
  s.poly([[9, 14.62, 0], [10.6, 14.62, 0], [10.6, 14.62, 2.6], [9, 14.62, 2.6]], 'acc glz', { order: 2 });
  // flagpole with accent flag
  s.seg([4.5, 14.5, 0], [4.5, 14.5, 9.5], 'ln');
  s.poly([[4.5, 14.5, 9.5], [6.3, 14.5, 8.9], [4.5, 14.5, 8.3]], 'acc glz', { order: 2 });
  s.hatch(20, 13.5, 6, 2, 1.3);
  s.dim([2, 13, 0], [26, 12, 0], "228'-0\"", { off: 34 });
  s.north(150, -110);
  return s.svg();
}

/** A-203 — civic: symmetric hall, pilasters, stepped entry, cupola */
export function bCivic() {
  const s = new Sheet();
  s.poly([[-1.5, -1.5, 0], [25, -1.5, 0], [25, 16, 0], [-1.5, 16, 0]]   , 'ln-lt');
  // wings
  s.box(2, 4, 0, 6.5, 9, 5.2, { hidden: true });
  s.box(14.5, 4, 0, 6.5, 9, 5.2);
  // center block
  s.box(8.5, 3, 0, 6, 10.5, 7.6);
  // pilaster rhythm on center front (y = 13.5)
  for (let xx = 9.3; xx < 14.4; xx += 1.15) s.seg([xx, 13.5, 0.6], [xx, 13.5, 6.4], 'ln-lt', 1);
  // architrave band
  s.seg([8.5, 13.5, 6.4], [14.5, 13.5, 6.4], 'ln', 1);
  // wing windows
  s.winLeft(13, 2.6, 8.2, 0, 2, 3, 1.5);
  s.winLeft(13, 15, 20.6, 0, 2, 3, 1.5);
  s.winRight(21, 4.6, 12.6, 0, 2, 3, 1.5);
  // stepped entry — three nested slabs
  s.box(9.5, 13.5, 0, 4, 1.0, 0.5);
  s.box(9.9, 14.5, 0, 3.2, 0.9, 0.34);
  s.box(10.3, 15.4, 0, 2.4, 0.8, 0.18);
  // door
  s.poly([[10.9, 13.52, 0.5], [12.1, 13.52, 0.5], [12.1, 13.52, 2.6], [10.9, 13.52, 2.6]], 'acc glz', { order: 2 });
  // cupola
  s.box(10.6, 7.2, 7.6, 1.8, 1.8, 1.5);
  s.seg([11.5, 8.1, 9.1], [11.5, 8.1, 10.6], 'acc', 2);
  s.dim([2, 13, 0], [21, 13, 0], "196'-0\"", { off: 36 });
  s.north(140, -110);
  return s.svg();
}

/** A-204 — retail: wide shell, storefront mullions, pylon sign */
export function bRetail() {
  const s = new Sheet();
  s.poly([[-1.5, -1.5, 0], [28, -1.5, 0], [28, 17, 0], [-1.5, 17, 0]], 'ln-lt');
  s.box(2, 4, 0, 21, 9, 5.6, { hidden: true });
  // parapet sign band
  s.seg([2, 13, 4.6], [23, 13, 4.6], 'ln', 1);
  s.seg([23, 4, 4.6], [23, 13, 4.6], 'ln', 1);
  // storefront mullion grid along front (y=13)
  s.poly([[3, 13.02, 0], [22, 13.02, 0], [22, 13.02, 3.4], [3, 13.02, 3.4]], 'ln-lt glz', { order: 1 });
  for (let xx = 4.6; xx < 22; xx += 1.6) s.seg([xx, 13.02, 0], [xx, 13.02, 3.4], 'ln-lt', 1);
  s.seg([3, 13.02, 3.4], [22, 13.02, 3.4], 'ln-lt', 1);
  // entry — accent double door
  s.poly([[11.6, 13.04, 0], [13.4, 13.04, 0], [13.4, 13.04, 3.0], [11.6, 13.04, 3.0]], 'acc glz', { order: 2 });
  // rooftop units
  s.box(6, 6, 5.6, 2.6, 2.2, 1.2);
  s.box(13, 7, 5.6, 2.6, 2.2, 1.2);
  s.box(18.5, 5.5, 5.6, 2.2, 2, 1);
  // pylon sign
  s.box(25.5, 12.5, 0, 1.2, 1.2, 7.5);
  s.poly([[26.7, 12.55, 5.4], [26.7, 13.65, 5.4], [26.7, 13.65, 7.1], [26.7, 12.55, 7.1]], 'acc glz', { order: 2 });
  // parking hatch
  s.hatch(3, 14.2, 22, 2.4, 1.5);
  s.dim([2, 13, 0], [23, 13, 0], "260'-0\"", { off: 34 });
  s.north(160, -90);
  return s.svg();
}

/** A-205 — worship: gabled nave + steeple + porch */
export function bWorship() {
  const s = new Sheet();
  s.poly([[-1.5, -1.5, 0], [23, -1.5, 0], [23, 16, 0], [-1.5, 16, 0]], 'ln-lt');
  const x0 = 3, x1 = 17, y0 = 4, y1 = 12, hw = 4.6, hr = 3.2;
  const ym = (y0 + y1) / 2;
  // nave walls
  s.poly([[x1, y0, 0], [x1, y1, 0], [x1, y1, hw], [x1, y0, hw]], 'f f-rt');
  s.poly([[x0, y1, 0], [x1, y1, 0], [x1, y1, hw], [x0, y1, hw]], 'f f-lt');
  // near roof plane (slopes toward viewer-left)
  s.poly([[x0, ym, hw + hr], [x1, ym, hw + hr], [x1, y1, hw], [x0, y1, hw]], 'f f-top');
  // gable end (x = x1): wall rect + triangle
  s.poly([[x1, y0, 0], [x1, y1, 0], [x1, y1, hw], [x1, ym, hw + hr], [x1, y0, hw]], 'ln');
  // outline edges
  s.seg([x0, ym, hw + hr], [x1, ym, hw + hr], 'ln'); // ridge
  s.seg([x0, y1, 0], [x1, y1, 0], 'ln');
  s.seg([x0, y1, 0], [x0, y1, hw], 'ln');
  s.seg([x1, y1, 0], [x1, y1, hw], 'ln');
  s.seg([x0, y1, hw], [x1, y1, hw], 'ln'); // near eave
  s.seg([x0, y1, hw], [x0, ym, hw + hr], 'ln');
  s.seg([x1, y0, 0], [x1, y0, hw], 'ln');
  s.seg([x1, y0, hw], [x1, ym, hw + hr], 'ln');
  // far eave hidden line
  s.seg([x0, y0, hw], [x1, y0, hw], 'ln-hid');
  // nave windows — tall arched-ish slots on left face
  for (let xx = 5; xx < 16; xx += 2.2) {
    s.poly([[xx, y1 + 0.02, 1.1], [xx + 1, y1 + 0.02, 1.1], [xx + 1, y1 + 0.02, 3.6], [xx, y1 + 0.02, 3.6]], 'ln-lt glz', { order: 1 });
  }
  // steeple: base box + spire
  const sx = 14.4, sy = ym - 1.1;
  s.box(sx, sy, hw + hr - 0.6, 2.2, 2.2, 2.8);
  const apex = [sx + 1.1, sy + 1.1, hw + hr + 6.2];
  s.poly([[sx + 2.2, sy, hw + hr + 2.2], [sx + 2.2, sy + 2.2, hw + hr + 2.2], apex], 'ln');
  s.poly([[sx, sy + 2.2, hw + hr + 2.2], [sx + 2.2, sy + 2.2, hw + hr + 2.2], apex], 'ln');
  // cross — accent
  s.seg([sx + 1.1, sy + 1.1, hw + hr + 6.2], [sx + 1.1, sy + 1.1, hw + hr + 7.6], 'acc', 2);
  s.seg([sx + 0.55, sy + 1.1, hw + hr + 7.05], [sx + 1.65, sy + 1.1, hw + hr + 7.05], 'acc', 2);
  // entry porch — small gable suggested by slab + posts
  s.box(17, ym - 1.8, 2.7, 2.4, 3.6, 0.4);
  s.seg([19.1, ym + 1.5, 0], [19.1, ym + 1.5, 2.7], 'ln');
  s.seg([19.1, ym - 1.5, 0], [19.1, ym - 1.5, 2.7], 'ln');
  s.poly([[17.02, ym - 0.8, 0], [17.02, ym + 0.8, 0], [17.02, ym + 0.8, 2.4], [17.02, ym - 0.8, 2.4]], 'acc glz', { order: 2 });
  s.dim([x0, y1, 0], [19.4, ym + 1.5, 0], "148'-0\"", { off: 34 });
  s.north(130, -120);
  return s.svg();
}

/** A-401 — Mississippi state outline + Jackson crosshair + radius rings */
export function mississippiMap() {
  // hand-traced outline, viewBox 0 0 300 460. Clockwise from the river/TN corner:
  // north border → east (AL) border → gulf coast → Pearl River → 31°N parallel → river meanders.
  const outline = `M137 8 L262 8
 L259 96 L255 200 L258 306 L252 398 L243 434
 Q236 442 228 437 L214 442 Q204 436 196 441 L182 438 L166 446
 Q160 430 154 414 Q160 400 152 390 L150 378
 L46 378
 Q28 360 44 344 Q58 332 48 318 Q30 306 46 292 Q60 282 52 268 Q36 256 50 242
 Q68 232 58 216 Q44 206 60 192 Q74 184 66 168 Q50 156 68 142 Q84 132 76 116
 Q62 104 82 90 Q98 80 92 64 Q80 52 100 40 Q118 28 137 8 Z`;
  // Jackson ≈ lon −90.18, lat 32.30 projected into this box
  const jx = 130, jy = 258;
  return `<svg class="map" viewBox="0 0 300 460" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Mississippi with Jackson marked">
  <path class="map-state" d="${outline}"/>
  <g class="map-rings">
    <circle cx="${jx}" cy="${jy}" r="34"/>
    <circle cx="${jx}" cy="${jy}" r="64"/>
    <circle cx="${jx}" cy="${jy}" r="98"/>
  </g>
  <g class="map-x">
    <line x1="${jx - 14}" y1="${jy}" x2="${jx + 14}" y2="${jy}"/>
    <line x1="${jx}" y1="${jy - 14}" x2="${jx}" y2="${jy + 14}"/>
    <circle cx="${jx}" cy="${jy}" r="4.5"/>
  </g>
  <text class="map-label" x="${jx + 22}" y="${jy - 14}">JACKSON</text>
  <text class="map-sub" x="${jx + 22}" y="${jy + 2}">32.2988°N 90.1848°W</text>
</svg>`;
}

export const projectSheets = [
  { id: 'A-201', fn: bHealthcare },
  { id: 'A-202', fn: bEducation },
  { id: 'A-203', fn: bCivic },
  { id: 'A-204', fn: bRetail },
  { id: 'A-205', fn: bWorship },
];
