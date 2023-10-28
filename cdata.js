const sD = 98766578844887;
document.addEventListener("DOMContentLoaded", function () {
    const t = 1e3, e = new class {
            constructor(t) {
                this.sD = t
            }

            rD() {
                return this.sD ^= this.sD << 13, this.sD ^= this.sD >> 17, this.sD ^= this.sD << 5, (this.sD < 0 ? 1 + ~this.sD : this.sD) % 1e3 / 1e3
            }

            rB(t, e) {
                return t + (e - t) * this.rD()
            }

            rI(t, e) {
                return Math.floor(this.rB(t, e + 1))
            }

            rC(t) {
                return t[Math.floor(this.rB(0, .99 * t.length))]
            }
        }(sD), r = "http://www.w3.org/2000/svg", l = e.rC([-2, -1, 0, 1, 2]), n = parseFloat,
        o = n(0 === l ? e.rC([-2, -1, 1, 2]) : e.rC([-2, -1, 0, 1, 2])), s = e.rB(.1, .5),
        c = Math.atan2(o, l) * (180 / Math.PI), i = 50 + 50 * Math.cos(c * Math.PI / 180),
        h = 50 + 50 * Math.sin(c * Math.PI / 180), u = (t, e, r) => t.setAttribute(e, r),
        d = (t, e) => t.getAttribute(e), a = document.getElementById("bgg");
    u(a, "x1", "50%"), u(a, "y1", "50%"), u(a, "x2", i + "%"), u(a, "y2", h + "%");
    const B = e.rB(8, 16), p = e.rB(4, 8), m = e.rB(2, 4), f = e.rB(2, 4), y = e.rB(4, 8), g = e.rC([15, 30, 60, 90]);
    let E = e.rB(1, 360), b = (E + 180) % 360;
    document.querySelector("#bgg stop:first-child").setAttribute("stop-color", `hsl(${b}, 50%, 10%)`);
    const x = (l, n, o, s, c, i) => {
        const h = document.createElementNS(r, "circle");
        u(h, "cx", e.rB(1, t)), u(h, "cy", e.rB(1, t)), u(h, "r", e.rB(...n));
        const d = e.rB(0, 1) * (E + g - (b - g)) + (b - g);
        u(h, "fill", `hsl(${d},${e.rB(...o)}%,${e.rB(...s)}%)`), u(h, "fill-opacity", e.rB(...c)), h.setAttributeNS(null, "clip-path", "url(#clip)"), i.appendChild(h), l.push(h)
    }, D = (t, e, r = 10) => {
        const [l, o, s, c] = ["x", "y", "width", "height"].map(e => n(t.getAttribute(e))), [i, h, u, d] = ["x", "y", "width", "height"].map(t => n(e.getAttribute(t))), [a, B, p, m] = [l + s, o + c, i + u, h + d];
        return l < p + r && a + r > i && o < m + r && B + r > h
    }, w = (l, n, o, s, c) => {
        let i, h = 10, d = !1;
        do {
            i = document.createElementNS(r, "rect"), ["x", "y", "width", "height"].forEach((r, l) => u(i, r, e.rB(1, t / (l < 2 ? 1 : n))));
            const a = e.rB(0, 1) * (b + g - (b - g)) + (b - g);
            u(i, "fill", `hsl(${a},${e.rB(...o)}%,${e.rB(...s)}%)`), u(i, "fill-opacity", e.rB(...c)), i.setAttributeNS(null, "clip-path", "url(#clip)"), d = l.some(t => D(t, i)), h--
        } while (d && h > 0);
        d || (document.getElementById("OrBTs").appendChild(i), l.push(i))
    }, C = (t, e, r) => {
        const [l, o, s, c] = ["x", "y", "x", "y"].map((r, l) => n(l < 2 ? t.getAttribute(r) : e.getAttribute(r)));
        return Math.sqrt(Math.pow(s - l, 2) + Math.pow(c - o, 2)) < r
    }, I = (t, l, n, o, s, c) => {
        let i = 10;
        for (; i > 0;) {
            const h = document.createElementNS(r, "use"), [d, a, B] = [e.rB(...n), e.rB(-500, 500), e.rB(-500, 500)];
            ["href", "x", "y"].forEach((t, e) => u(h, t, 0 === e ? "#btc-symbol" : 500 + (1 === e ? a : B)));
            const p = e.rB(0, 1) * (E + g - (E - g)) + (E - g);
            u(h, "fill", `hsl(${p},${e.rB(...o)}%,${e.rB(...s)}%)`), u(h, "fill-opacity", e.rB(...c)), u(h, "transform", `scale(${d})`);
            let m = !1;
            const f = 50;
            for (let t = 0; t < l.length; t++) if (C(h, l[t], f)) {
                m = !0;
                break
            }
            if (!m) {
                t.appendChild(h), l.push(h);
                break
            }
            i--
        }
    }, M = document.getElementById("starGroup");
    let $ = [];
    for (let t = 0; t < 11; t++) x($, [2, f], [40, 40], [30, 40], [.75, .8], M);
    const A = document.getElementById("starGroup2");
    let S = [];
    for (let t = 0; t < 10; t++) x(S, [2, y], [50, 50], [40, 50], [.8, .85], A);
    const N = (t => {
        const l = document.createElementNS(r, "use");
        u(l, "href", "#moon-symbol"), u(l, "fill", t);
        const n = e.rB(500, 1e3), o = n / 2;
        return u(l, "x", 500 - o), u(l, "y", 500 - o), u(l, "width", n), document.getElementById("moonGroup").appendChild(l), l
    })(`hsl(${E}, 100%, 50%)`);
    let O = [];
    for (let t = 0; t < 7; t++) w(O, B, [50, 50], [30, 40], [.8, .85]);
    let v = [];
    for (let t = 0; t < 7; t++) w(v, p, [60, 60], [40, 50], [.85, .9]);
    let T = [];
    for (let t = 0; t < 7; t++) w(T, m, [70, 70], [50, 60], [.9, .95]);
    let q = [];
    const G = document.createElementNS(r, "g");
    u(G, "clip-path", "url(#clip)"), document.getElementById("OrBTs").appendChild(G);
    for (let t = 0; t < 7; t++) I(G, q, [1, 1.1], [60, 60], [50, 60], [.8, .85]);
    let P = [];
    const k = document.createElementNS(r, "g");
    u(k, "clip-path", "url(#clip)"), document.getElementById("OrBTs").appendChild(k);
    for (let t = 0; t < 7; t++) I(k, P, [1.2, 1.3], [70, 70], [60, 70], [.9, .95]);
    let F = [];
    const L = document.createElementNS(r, "g");
    u(L, "clip-path", "url(#clip)"), document.getElementById("OrBTs").appendChild(L);
    for (let t = 0; t < 7; t++) I(L, F, [1.4, 1.5], [80, 80], [70, 80], [.9, .95]);

    function j(r, l, o, s, c) {
        for (let i = 0; i < r.length; i++) {
            let h = r[i], a = n(d(h, "x")), B = n(d(h, "y"));
            a += e.rB(l[0], l[1]) * o * c, B += e.rB(l[0], l[1]) * s * c, a = H(a, 0, t), B = H(B, 0, t), u(h, "x", a), u(h, "y", B)
        }
    }

    function z(r, c) {
        for (let i = 0; i < r.length; i++) {
            let h = r[i], a = n(d(h, "x")), B = n(d(h, "y")), p = n(d(h, "width")), m = n(d(h, "height"));
            a += e.rB(...c) * l * s, B += e.rB(...c) * o * s, a = H(a, -p, t), B = H(B, -m, t), u(h, "x", a), u(h, "y", B)
        }
    }

    function H(t, e, r, l = 75) {
        return t < e - l ? r + l : t > r + l ? e - l : t
    }

    !function r() {
        !function (r, c) {
            for (let i = 0; i < r.length; i++) {
                let h = r[i], a = n(d(h, "cx")), B = n(d(h, "cy")), p = n(d(h, "r"));
                a += e.rB(...c) * l * s, B += e.rB(...c) * o * s, a = H(a, -p, t), B = H(B, -p, t), u(h, "cx", a), u(h, "cy", B)
            }
        }(S, [.1, .25]), function (t, r) {
            let c = n(d(t, "x")), i = n(d(t, "y")), h = n(d(t, "width")) / 2 * 2,
                a = (c -= e.rB(r[0], r[1]) * l * s) < -h || c > 1e3 + h,
                B = (i -= e.rB(r[0], r[1]) * o * s) < -h || i > 1e3 + h;
            if (a || B) {
                let t = e.rB(1, 100), r = t >= 1 && t <= 10 ? "visible" : "hidden";
                document.getElementById("O").style.visibility = r, a && (c = c < -h ? 1e3 + h : -h), B && (i = i < -h ? 1e3 + h : -h)
            }
            u(t, "x", c), u(t, "y", i)
        }(N, [.25, .5]), z(O, [1, 1.5]), z(v, [1.5, 2]), z(T, [2, 2.5]), j(q, [2.5, 3], l, o, s), j(P, [3.25, 3.75], l, o, s), j(F, [4, 4.5], l, o, s), requestAnimationFrame(r)
    }()
});