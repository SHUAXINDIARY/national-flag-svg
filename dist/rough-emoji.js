(()=>{
    function rough_esm_t(t, e, s) {
        if (t && t.length) {
            const [n, o] = e, a = Math.PI / 180 * s, h = Math.cos(a), r = Math.sin(a);
            for (const e of t){
                const [t, s] = e;
                e[0] = (t - n) * h - (s - o) * r + n, e[1] = (t - n) * r + (s - o) * h + o;
            }
        }
    }
    function rough_esm_e(t, e) {
        return t[0] === e[0] && t[1] === e[1];
    }
    function rough_esm_s(s, n, o, a = 1) {
        const h = o, r = Math.max(n, .1), i = s[0] && s[0][0] && "number" == typeof s[0][0] ? [
            s
        ] : s, c = [
            0,
            0
        ];
        if (h) for (const e of i)rough_esm_t(e, c, h);
        const l = function(t, s, n) {
            const o = [];
            for (const s of t){
                const t = [
                    ...s
                ];
                rough_esm_e(t[0], t[t.length - 1]) || t.push([
                    t[0][0],
                    t[0][1]
                ]), t.length > 2 && o.push(t);
            }
            const a = [];
            s = Math.max(s, .1);
            const h = [];
            for (const t of o)for(let e = 0; e < t.length - 1; e++){
                const s = t[e], n = t[e + 1];
                if (s[1] !== n[1]) {
                    const t = Math.min(s[1], n[1]);
                    h.push({
                        ymin: t,
                        ymax: Math.max(s[1], n[1]),
                        x: t === s[1] ? s[0] : n[0],
                        islope: (n[0] - s[0]) / (n[1] - s[1])
                    });
                }
            }
            if (h.sort((t, e)=>t.ymin < e.ymin ? -1 : t.ymin > e.ymin ? 1 : t.x < e.x ? -1 : t.x > e.x ? 1 : t.ymax === e.ymax ? 0 : (t.ymax - e.ymax) / Math.abs(t.ymax - e.ymax)), !h.length) return a;
            let r = [], i = h[0].ymin, c = 0;
            for(; r.length || h.length;){
                if (h.length) {
                    let t = -1;
                    for(let e = 0; e < h.length && !(h[e].ymin > i); e++)t = e;
                    h.splice(0, t + 1).forEach((t)=>{
                        r.push({
                            s: i,
                            edge: t
                        });
                    });
                }
                if (r = r.filter((t)=>!(t.edge.ymax <= i)), r.sort((t, e)=>t.edge.x === e.edge.x ? 0 : (t.edge.x - e.edge.x) / Math.abs(t.edge.x - e.edge.x)), (1 !== n || c % s == 0) && r.length > 1) for(let t = 0; t < r.length; t += 2){
                    const e = t + 1;
                    if (e >= r.length) break;
                    const s = r[t].edge, n = r[e].edge;
                    a.push([
                        [
                            Math.round(s.x),
                            i
                        ],
                        [
                            Math.round(n.x),
                            i
                        ]
                    ]);
                }
                i += n, r.forEach((t)=>{
                    t.edge.x = t.edge.x + n * t.edge.islope;
                }), c++;
            }
            return a;
        }(i, r, a);
        if (h) {
            for (const e of i)rough_esm_t(e, c, -h);
            !function(e, s, n) {
                const o = [];
                e.forEach((t)=>o.push(...t)), rough_esm_t(o, s, n);
            }(l, c, -h);
        }
        return l;
    }
    function rough_esm_n(t, e) {
        var n;
        const o = e.hachureAngle + 90;
        let a = e.hachureGap;
        a < 0 && (a = 4 * e.strokeWidth), a = Math.round(Math.max(a, .1));
        let h = 1;
        return e.roughness >= 1 && ((null == (n = e.randomizer) ? void 0 : n.next()) || Math.random()) > .7 && (h = a), rough_esm_s(t, a, o, h || 1);
    }
    class rough_esm_o {
        constructor(t){
            this.helper = t;
        }
        fillPolygons(t, e) {
            return this._fillPolygons(t, e);
        }
        _fillPolygons(t, e) {
            const s = rough_esm_n(t, e);
            return {
                type: "fillSketch",
                ops: this.renderLines(s, e)
            };
        }
        renderLines(t, e) {
            const s = [];
            for (const n of t)s.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], e));
            return s;
        }
    }
    function rough_esm_a(t) {
        const e = t[0], s = t[1];
        return Math.sqrt(Math.pow(e[0] - s[0], 2) + Math.pow(e[1] - s[1], 2));
    }
    class rough_esm_h extends rough_esm_o {
        fillPolygons(t, e) {
            let s = e.hachureGap;
            s < 0 && (s = 4 * e.strokeWidth), s = Math.max(s, .1);
            const o = rough_esm_n(t, Object.assign({}, e, {
                hachureGap: s
            })), h = Math.PI / 180 * e.hachureAngle, r = [], i = .5 * s * Math.cos(h), c = .5 * s * Math.sin(h);
            for (const [t, e] of o)rough_esm_a([
                t,
                e
            ]) && r.push([
                [
                    t[0] - i,
                    t[1] + c
                ],
                [
                    ...e
                ]
            ], [
                [
                    t[0] + i,
                    t[1] - c
                ],
                [
                    ...e
                ]
            ]);
            return {
                type: "fillSketch",
                ops: this.renderLines(r, e)
            };
        }
    }
    class rough_esm_r extends rough_esm_o {
        fillPolygons(t, e) {
            const s = this._fillPolygons(t, e), n = Object.assign({}, e, {
                hachureAngle: e.hachureAngle + 90
            }), o = this._fillPolygons(t, n);
            return s.ops = s.ops.concat(o.ops), s;
        }
    }
    class rough_esm_i {
        constructor(t){
            this.helper = t;
        }
        fillPolygons(t, e) {
            const s = rough_esm_n(t, e = Object.assign({}, e, {
                hachureAngle: 0
            }));
            return this.dotsOnLines(s, e);
        }
        dotsOnLines(t, e) {
            const s = [];
            let n = e.hachureGap;
            n < 0 && (n = 4 * e.strokeWidth), n = Math.max(n, .1);
            let o = e.fillWeight;
            o < 0 && (o = e.strokeWidth / 2);
            const h = n / 4;
            for (const r of t){
                const t = rough_esm_a(r), i = t / n, c = Math.ceil(i) - 1, l = t - c * n, u = (r[0][0] + r[1][0]) / 2 - n / 4, p = Math.min(r[0][1], r[1][1]);
                for(let t = 0; t < c; t++){
                    const a = p + l + t * n, r = u - h + 2 * Math.random() * h, i = a - h + 2 * Math.random() * h, c = this.helper.ellipse(r, i, o, o, e);
                    s.push(...c.ops);
                }
            }
            return {
                type: "fillSketch",
                ops: s
            };
        }
    }
    class rough_esm_c {
        constructor(t){
            this.helper = t;
        }
        fillPolygons(t, e) {
            const s = rough_esm_n(t, e);
            return {
                type: "fillSketch",
                ops: this.dashedLine(s, e)
            };
        }
        dashedLine(t, e) {
            const s = e.dashOffset < 0 ? e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap : e.dashOffset, n = e.dashGap < 0 ? e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap : e.dashGap, o = [];
            return t.forEach((t)=>{
                const h = rough_esm_a(t), r = Math.floor(h / (s + n)), i = (h + n - r * (s + n)) / 2;
                let c = t[0], l = t[1];
                c[0] > l[0] && (c = t[1], l = t[0]);
                const u = Math.atan((l[1] - c[1]) / (l[0] - c[0]));
                for(let t = 0; t < r; t++){
                    const a = t * (s + n), h = a + s, r = [
                        c[0] + a * Math.cos(u) + i * Math.cos(u),
                        c[1] + a * Math.sin(u) + i * Math.sin(u)
                    ], l = [
                        c[0] + h * Math.cos(u) + i * Math.cos(u),
                        c[1] + h * Math.sin(u) + i * Math.sin(u)
                    ];
                    o.push(...this.helper.doubleLineOps(r[0], r[1], l[0], l[1], e));
                }
            }), o;
        }
    }
    class rough_esm_l {
        constructor(t){
            this.helper = t;
        }
        fillPolygons(t, e) {
            const s = e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap, o = e.zigzagOffset < 0 ? s : e.zigzagOffset, a = rough_esm_n(t, e = Object.assign({}, e, {
                hachureGap: s + o
            }));
            return {
                type: "fillSketch",
                ops: this.zigzagLines(a, o, e)
            };
        }
        zigzagLines(t, e, s) {
            const n = [];
            return t.forEach((t)=>{
                const o = rough_esm_a(t), h = Math.round(o / (2 * e));
                let r = t[0], i = t[1];
                r[0] > i[0] && (r = t[1], i = t[0]);
                const c = Math.atan((i[1] - r[1]) / (i[0] - r[0]));
                for(let t = 0; t < h; t++){
                    const o = 2 * t * e, a = 2 * (t + 1) * e, h = Math.sqrt(2 * Math.pow(e, 2)), i = [
                        r[0] + o * Math.cos(c),
                        r[1] + o * Math.sin(c)
                    ], l = [
                        r[0] + a * Math.cos(c),
                        r[1] + a * Math.sin(c)
                    ], u = [
                        i[0] + h * Math.cos(c + Math.PI / 4),
                        i[1] + h * Math.sin(c + Math.PI / 4)
                    ];
                    n.push(...this.helper.doubleLineOps(i[0], i[1], u[0], u[1], s), ...this.helper.doubleLineOps(u[0], u[1], l[0], l[1], s));
                }
            }), n;
        }
    }
    const rough_esm_u = {};
    class rough_esm_p {
        constructor(t){
            this.seed = t;
        }
        next() {
            return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
        }
    }
    const rough_esm_f = 0, rough_esm_d = 1, rough_esm_g = 2, rough_esm_M = {
        A: 7,
        a: 7,
        C: 6,
        c: 6,
        H: 1,
        h: 1,
        L: 2,
        l: 2,
        M: 2,
        m: 2,
        Q: 4,
        q: 4,
        S: 4,
        s: 4,
        T: 2,
        t: 2,
        V: 1,
        v: 1,
        Z: 0,
        z: 0
    };
    function rough_esm_k(t, e) {
        return t.type === e;
    }
    function rough_esm_b(t) {
        const e = [], s = function(t) {
            const e = new Array;
            for(; "" !== t;)if (t.match(/^([ \t\r\n,]+)/)) t = t.substr(RegExp.$1.length);
            else if (t.match(/^([aAcChHlLmMqQsStTvVzZ])/)) e[e.length] = {
                type: rough_esm_f,
                text: RegExp.$1
            }, t = t.substr(RegExp.$1.length);
            else {
                if (!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
                e[e.length] = {
                    type: rough_esm_d,
                    text: `${parseFloat(RegExp.$1)}`
                }, t = t.substr(RegExp.$1.length);
            }
            return e[e.length] = {
                type: rough_esm_g,
                text: ""
            }, e;
        }(t);
        let n = "BOD", o = 0, a = s[o];
        for(; !rough_esm_k(a, rough_esm_g);){
            let h = 0;
            const r = [];
            if ("BOD" === n) {
                if ("M" !== a.text && "m" !== a.text) return rough_esm_b("M0,0" + t);
                o++, h = rough_esm_M[a.text], n = a.text;
            } else rough_esm_k(a, rough_esm_d) ? h = rough_esm_M[n] : (o++, h = rough_esm_M[a.text], n = a.text);
            if (!(o + h < s.length)) throw new Error("Path data ended short");
            for(let t = o; t < o + h; t++){
                const e = s[t];
                if (!rough_esm_k(e, rough_esm_d)) throw new Error("Param not a number: " + n + "," + e.text);
                r[r.length] = +e.text;
            }
            if ("number" != typeof rough_esm_M[n]) throw new Error("Bad segment: " + n);
            {
                const t = {
                    key: n,
                    data: r
                };
                e.push(t), o += h, a = s[o], "M" === n && (n = "L"), "m" === n && (n = "l");
            }
        }
        return e;
    }
    function rough_esm_y(t) {
        let e = 0, s = 0, n = 0, o = 0;
        const a = [];
        for (const { key: h, data: r } of t)switch(h){
            case "M":
                a.push({
                    key: "M",
                    data: [
                        ...r
                    ]
                }), [e, s] = r, [n, o] = r;
                break;
            case "m":
                e += r[0], s += r[1], a.push({
                    key: "M",
                    data: [
                        e,
                        s
                    ]
                }), n = e, o = s;
                break;
            case "L":
                a.push({
                    key: "L",
                    data: [
                        ...r
                    ]
                }), [e, s] = r;
                break;
            case "l":
                e += r[0], s += r[1], a.push({
                    key: "L",
                    data: [
                        e,
                        s
                    ]
                });
                break;
            case "C":
                a.push({
                    key: "C",
                    data: [
                        ...r
                    ]
                }), e = r[4], s = r[5];
                break;
            case "c":
                {
                    const t = r.map((t, n)=>n % 2 ? t + s : t + e);
                    a.push({
                        key: "C",
                        data: t
                    }), e = t[4], s = t[5];
                    break;
                }
            case "Q":
                a.push({
                    key: "Q",
                    data: [
                        ...r
                    ]
                }), e = r[2], s = r[3];
                break;
            case "q":
                {
                    const t = r.map((t, n)=>n % 2 ? t + s : t + e);
                    a.push({
                        key: "Q",
                        data: t
                    }), e = t[2], s = t[3];
                    break;
                }
            case "A":
                a.push({
                    key: "A",
                    data: [
                        ...r
                    ]
                }), e = r[5], s = r[6];
                break;
            case "a":
                e += r[5], s += r[6], a.push({
                    key: "A",
                    data: [
                        r[0],
                        r[1],
                        r[2],
                        r[3],
                        r[4],
                        e,
                        s
                    ]
                });
                break;
            case "H":
                a.push({
                    key: "H",
                    data: [
                        ...r
                    ]
                }), e = r[0];
                break;
            case "h":
                e += r[0], a.push({
                    key: "H",
                    data: [
                        e
                    ]
                });
                break;
            case "V":
                a.push({
                    key: "V",
                    data: [
                        ...r
                    ]
                }), s = r[0];
                break;
            case "v":
                s += r[0], a.push({
                    key: "V",
                    data: [
                        s
                    ]
                });
                break;
            case "S":
                a.push({
                    key: "S",
                    data: [
                        ...r
                    ]
                }), e = r[2], s = r[3];
                break;
            case "s":
                {
                    const t = r.map((t, n)=>n % 2 ? t + s : t + e);
                    a.push({
                        key: "S",
                        data: t
                    }), e = t[2], s = t[3];
                    break;
                }
            case "T":
                a.push({
                    key: "T",
                    data: [
                        ...r
                    ]
                }), e = r[0], s = r[1];
                break;
            case "t":
                e += r[0], s += r[1], a.push({
                    key: "T",
                    data: [
                        e,
                        s
                    ]
                });
                break;
            case "Z":
            case "z":
                a.push({
                    key: "Z",
                    data: []
                }), e = n, s = o;
        }
        return a;
    }
    function rough_esm_m(t) {
        const e = [];
        let s = "", n = 0, o = 0, a = 0, h = 0, r = 0, i = 0;
        for (const { key: c, data: l } of t){
            switch(c){
                case "M":
                    e.push({
                        key: "M",
                        data: [
                            ...l
                        ]
                    }), [n, o] = l, [a, h] = l;
                    break;
                case "C":
                    e.push({
                        key: "C",
                        data: [
                            ...l
                        ]
                    }), n = l[4], o = l[5], r = l[2], i = l[3];
                    break;
                case "L":
                    e.push({
                        key: "L",
                        data: [
                            ...l
                        ]
                    }), [n, o] = l;
                    break;
                case "H":
                    n = l[0], e.push({
                        key: "L",
                        data: [
                            n,
                            o
                        ]
                    });
                    break;
                case "V":
                    o = l[0], e.push({
                        key: "L",
                        data: [
                            n,
                            o
                        ]
                    });
                    break;
                case "S":
                    {
                        let t = 0, a = 0;
                        "C" === s || "S" === s ? (t = n + (n - r), a = o + (o - i)) : (t = n, a = o), e.push({
                            key: "C",
                            data: [
                                t,
                                a,
                                ...l
                            ]
                        }), r = l[0], i = l[1], n = l[2], o = l[3];
                        break;
                    }
                case "T":
                    {
                        const [t, a] = l;
                        let h = 0, c = 0;
                        "Q" === s || "T" === s ? (h = n + (n - r), c = o + (o - i)) : (h = n, c = o);
                        const u = n + 2 * (h - n) / 3, p = o + 2 * (c - o) / 3, f = t + 2 * (h - t) / 3, d = a + 2 * (c - a) / 3;
                        e.push({
                            key: "C",
                            data: [
                                u,
                                p,
                                f,
                                d,
                                t,
                                a
                            ]
                        }), r = h, i = c, n = t, o = a;
                        break;
                    }
                case "Q":
                    {
                        const [t, s, a, h] = l, c = n + 2 * (t - n) / 3, u = o + 2 * (s - o) / 3, p = a + 2 * (t - a) / 3, f = h + 2 * (s - h) / 3;
                        e.push({
                            key: "C",
                            data: [
                                c,
                                u,
                                p,
                                f,
                                a,
                                h
                            ]
                        }), r = t, i = s, n = a, o = h;
                        break;
                    }
                case "A":
                    {
                        const t = Math.abs(l[0]), s = Math.abs(l[1]), a = l[2], h = l[3], r = l[4], i = l[5], c = l[6];
                        if (0 === t || 0 === s) e.push({
                            key: "C",
                            data: [
                                n,
                                o,
                                i,
                                c,
                                i,
                                c
                            ]
                        }), n = i, o = c;
                        else if (n !== i || o !== c) rough_esm_x(n, o, i, c, t, s, a, h, r).forEach(function(t) {
                            e.push({
                                key: "C",
                                data: t
                            });
                        }), n = i, o = c;
                        break;
                    }
                case "Z":
                    e.push({
                        key: "Z",
                        data: []
                    }), n = a, o = h;
            }
            s = c;
        }
        return e;
    }
    function w(t, e, s) {
        return [
            t * Math.cos(s) - e * Math.sin(s),
            t * Math.sin(s) + e * Math.cos(s)
        ];
    }
    function rough_esm_x(t, e, s, n, o, a, h, r, i, c) {
        const l = (u = h, Math.PI * u / 180);
        var u;
        let p = [], f = 0, d = 0, g = 0, M = 0;
        if (c) [f, d, g, M] = c;
        else {
            [t, e] = w(t, e, -l), [s, n] = w(s, n, -l);
            const h = (t - s) / 2, c = (e - n) / 2;
            let u = h * h / (o * o) + c * c / (a * a);
            u > 1 && (u = Math.sqrt(u), o *= u, a *= u);
            const p = o * o, k = a * a, b = p * k - p * c * c - k * h * h, y = p * c * c + k * h * h, m = (r === i ? -1 : 1) * Math.sqrt(Math.abs(b / y));
            g = m * o * c / a + (t + s) / 2, M = m * -a * h / o + (e + n) / 2, f = Math.asin(parseFloat(((e - M) / a).toFixed(9))), d = Math.asin(parseFloat(((n - M) / a).toFixed(9))), t < g && (f = Math.PI - f), s < g && (d = Math.PI - d), f < 0 && (f = 2 * Math.PI + f), d < 0 && (d = 2 * Math.PI + d), i && f > d && (f -= 2 * Math.PI), !i && d > f && (d -= 2 * Math.PI);
        }
        let k = d - f;
        if (Math.abs(k) > 120 * Math.PI / 180) {
            const t = d, e = s, r = n;
            d = i && d > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, p = rough_esm_x(s = g + o * Math.cos(d), n = M + a * Math.sin(d), e, r, o, a, h, 0, i, [
                d,
                t,
                g,
                M
            ]);
        }
        k = d - f;
        const b = Math.cos(f), y = Math.sin(f), m = Math.cos(d), P = Math.sin(d), v = Math.tan(k / 4), S = 4 / 3 * o * v, O = 4 / 3 * a * v, L = [
            t,
            e
        ], T = [
            t + S * y,
            e - O * b
        ], D = [
            s + S * P,
            n - O * m
        ], A = [
            s,
            n
        ];
        if (T[0] = 2 * L[0] - T[0], T[1] = 2 * L[1] - T[1], c) return [
            T,
            D,
            A
        ].concat(p);
        {
            p = [
                T,
                D,
                A
            ].concat(p);
            const t = [];
            for(let e = 0; e < p.length; e += 3){
                const s = w(p[e][0], p[e][1], l), n = w(p[e + 1][0], p[e + 1][1], l), o = w(p[e + 2][0], p[e + 2][1], l);
                t.push([
                    s[0],
                    s[1],
                    n[0],
                    n[1],
                    o[0],
                    o[1]
                ]);
            }
            return t;
        }
    }
    const rough_esm_P = {
        randOffset: function(t, e) {
            return G(t, e);
        },
        randOffsetWithRange: function(t, e, s) {
            return E(t, e, s);
        },
        ellipse: function(t, e, s, n, o) {
            const a = rough_esm_T(s, n, o);
            return rough_esm_D(t, e, o, a).opset;
        },
        doubleLineOps: function(t, e, s, n, o) {
            return $(t, e, s, n, o, !0);
        }
    };
    function rough_esm_v(t, e, s, n, o) {
        return {
            type: "path",
            ops: $(t, e, s, n, o)
        };
    }
    function rough_esm_S(t, e, s) {
        const n = (t || []).length;
        if (n > 2) {
            const o = [];
            for(let e = 0; e < n - 1; e++)o.push(...$(t[e][0], t[e][1], t[e + 1][0], t[e + 1][1], s));
            return e && o.push(...$(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], s)), {
                type: "path",
                ops: o
            };
        }
        return 2 === n ? rough_esm_v(t[0][0], t[0][1], t[1][0], t[1][1], s) : {
            type: "path",
            ops: []
        };
    }
    function rough_esm_O(t, e, s, n, o) {
        return function(t, e) {
            return rough_esm_S(t, !0, e);
        }([
            [
                t,
                e
            ],
            [
                t + s,
                e
            ],
            [
                t + s,
                e + n
            ],
            [
                t,
                e + n
            ]
        ], o);
    }
    function rough_esm_L(t, e) {
        if (t.length) {
            const s = "number" == typeof t[0][0] ? [
                t
            ] : t, n = j(s[0], +(1 + .2 * e.roughness), e), o = e.disableMultiStroke ? [] : j(s[0], 1.5 * (1 + .22 * e.roughness), z(e));
            for(let t = 1; t < s.length; t++){
                const a = s[t];
                if (a.length) {
                    const t = j(a, +(1 + .2 * e.roughness), e), s = e.disableMultiStroke ? [] : j(a, 1.5 * (1 + .22 * e.roughness), z(e));
                    for (const e of t)"move" !== e.op && n.push(e);
                    for (const t of s)"move" !== t.op && o.push(t);
                }
            }
            return {
                type: "path",
                ops: n.concat(o)
            };
        }
        return {
            type: "path",
            ops: []
        };
    }
    function rough_esm_T(t, e, s) {
        const n = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), o = Math.ceil(Math.max(s.curveStepCount, s.curveStepCount / Math.sqrt(200) * n)), a = 2 * Math.PI / o;
        let h = Math.abs(t / 2), r = Math.abs(e / 2);
        const i = 1 - s.curveFitting;
        return h += G(h * i, s), r += G(r * i, s), {
            increment: a,
            rx: h,
            ry: r
        };
    }
    function rough_esm_D(t, e, s, n) {
        const [o, a] = F(n.increment, t, e, n.rx, n.ry, 1, n.increment * E(.1, E(.4, 1, s), s), s);
        let h = q(o, null, s);
        if (!s.disableMultiStroke && 0 !== s.roughness) {
            const [o] = F(n.increment, t, e, n.rx, n.ry, 1.5, 0, s), a = q(o, null, s);
            h = h.concat(a);
        }
        return {
            estimatedPoints: a,
            opset: {
                type: "path",
                ops: h
            }
        };
    }
    function rough_esm_A(t, e, s, n, o, a, h, r, i) {
        const c = t, l = e;
        let u = Math.abs(s / 2), p = Math.abs(n / 2);
        u += G(.01 * u, i), p += G(.01 * p, i);
        let f = o, d = a;
        for(; f < 0;)f += 2 * Math.PI, d += 2 * Math.PI;
        d - f > 2 * Math.PI && (f = 0, d = 2 * Math.PI);
        const g = 2 * Math.PI / i.curveStepCount, M = Math.min(g / 2, (d - f) / 2), k = V(M, c, l, u, p, f, d, 1, i);
        if (!i.disableMultiStroke) {
            const t = V(M, c, l, u, p, f, d, 1.5, i);
            k.push(...t);
        }
        return h && (r ? k.push(...$(c, l, c + u * Math.cos(f), l + p * Math.sin(f), i), ...$(c, l, c + u * Math.cos(d), l + p * Math.sin(d), i)) : k.push({
            op: "lineTo",
            data: [
                c,
                l
            ]
        }, {
            op: "lineTo",
            data: [
                c + u * Math.cos(f),
                l + p * Math.sin(f)
            ]
        })), {
            type: "path",
            ops: k
        };
    }
    function _(t, e) {
        const s = rough_esm_m(rough_esm_y(rough_esm_b(t))), n = [];
        let o = [
            0,
            0
        ], a = [
            0,
            0
        ];
        for (const { key: t, data: h } of s)switch(t){
            case "M":
                a = [
                    h[0],
                    h[1]
                ], o = [
                    h[0],
                    h[1]
                ];
                break;
            case "L":
                n.push(...$(a[0], a[1], h[0], h[1], e)), a = [
                    h[0],
                    h[1]
                ];
                break;
            case "C":
                {
                    const [t, s, o, r, i, c] = h;
                    n.push(...Z(t, s, o, r, i, c, a, e)), a = [
                        i,
                        c
                    ];
                    break;
                }
            case "Z":
                n.push(...$(a[0], a[1], o[0], o[1], e)), a = [
                    o[0],
                    o[1]
                ];
        }
        return {
            type: "path",
            ops: n
        };
    }
    function I(t, e) {
        const s = [];
        for (const n of t)if (n.length) {
            const t = e.maxRandomnessOffset || 0, o = n.length;
            if (o > 2) {
                s.push({
                    op: "move",
                    data: [
                        n[0][0] + G(t, e),
                        n[0][1] + G(t, e)
                    ]
                });
                for(let a = 1; a < o; a++)s.push({
                    op: "lineTo",
                    data: [
                        n[a][0] + G(t, e),
                        n[a][1] + G(t, e)
                    ]
                });
            }
        }
        return {
            type: "fillPath",
            ops: s
        };
    }
    function C(t, e) {
        return (function(t, e) {
            let s = t.fillStyle || "hachure";
            if (!rough_esm_u[s]) switch(s){
                case "zigzag":
                    rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_h(e));
                    break;
                case "cross-hatch":
                    rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_r(e));
                    break;
                case "dots":
                    rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_i(e));
                    break;
                case "dashed":
                    rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_c(e));
                    break;
                case "zigzag-line":
                    rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_l(e));
                    break;
                default:
                    s = "hachure", rough_esm_u[s] || (rough_esm_u[s] = new rough_esm_o(e));
            }
            return rough_esm_u[s];
        })(e, rough_esm_P).fillPolygons(t, e);
    }
    function z(t) {
        const e = Object.assign({}, t);
        return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
    }
    function W(t) {
        return t.randomizer || (t.randomizer = new rough_esm_p(t.seed || 0)), t.randomizer.next();
    }
    function E(t, e, s, n = 1) {
        return s.roughness * n * (W(s) * (e - t) + t);
    }
    function G(t, e, s = 1) {
        return E(-t, t, e, s);
    }
    function $(t, e, s, n, o, a = !1) {
        const h = a ? o.disableMultiStrokeFill : o.disableMultiStroke, r = R(t, e, s, n, o, !0, !1);
        if (h) return r;
        const i = R(t, e, s, n, o, !0, !0);
        return r.concat(i);
    }
    function R(t, e, s, n, o, a, h) {
        const r = Math.pow(t - s, 2) + Math.pow(e - n, 2), i = Math.sqrt(r);
        let c = 1;
        c = i < 200 ? 1 : i > 500 ? .4 : -0.0016668 * i + 1.233334;
        let l = o.maxRandomnessOffset || 0;
        l * l * 100 > r && (l = i / 10);
        const u = l / 2, p = .2 + .2 * W(o);
        let f = o.bowing * o.maxRandomnessOffset * (n - e) / 200, d = o.bowing * o.maxRandomnessOffset * (t - s) / 200;
        f = G(f, o, c), d = G(d, o, c);
        const g = [], M = ()=>G(u, o, c), k = ()=>G(l, o, c), b = o.preserveVertices;
        return a && (h ? g.push({
            op: "move",
            data: [
                t + (b ? 0 : M()),
                e + (b ? 0 : M())
            ]
        }) : g.push({
            op: "move",
            data: [
                t + (b ? 0 : G(l, o, c)),
                e + (b ? 0 : G(l, o, c))
            ]
        })), h ? g.push({
            op: "bcurveTo",
            data: [
                f + t + (s - t) * p + M(),
                d + e + (n - e) * p + M(),
                f + t + 2 * (s - t) * p + M(),
                d + e + 2 * (n - e) * p + M(),
                s + (b ? 0 : M()),
                n + (b ? 0 : M())
            ]
        }) : g.push({
            op: "bcurveTo",
            data: [
                f + t + (s - t) * p + k(),
                d + e + (n - e) * p + k(),
                f + t + 2 * (s - t) * p + k(),
                d + e + 2 * (n - e) * p + k(),
                s + (b ? 0 : k()),
                n + (b ? 0 : k())
            ]
        }), g;
    }
    function j(t, e, s) {
        if (!t.length) return [];
        const n = [];
        n.push([
            t[0][0] + G(e, s),
            t[0][1] + G(e, s)
        ]), n.push([
            t[0][0] + G(e, s),
            t[0][1] + G(e, s)
        ]);
        for(let o = 1; o < t.length; o++)n.push([
            t[o][0] + G(e, s),
            t[o][1] + G(e, s)
        ]), o === t.length - 1 && n.push([
            t[o][0] + G(e, s),
            t[o][1] + G(e, s)
        ]);
        return q(n, null, s);
    }
    function q(t, e, s) {
        const n = t.length, o = [];
        if (n > 3) {
            const a = [], h = 1 - s.curveTightness;
            o.push({
                op: "move",
                data: [
                    t[1][0],
                    t[1][1]
                ]
            });
            for(let e = 1; e + 2 < n; e++){
                const s = t[e];
                a[0] = [
                    s[0],
                    s[1]
                ], a[1] = [
                    s[0] + (h * t[e + 1][0] - h * t[e - 1][0]) / 6,
                    s[1] + (h * t[e + 1][1] - h * t[e - 1][1]) / 6
                ], a[2] = [
                    t[e + 1][0] + (h * t[e][0] - h * t[e + 2][0]) / 6,
                    t[e + 1][1] + (h * t[e][1] - h * t[e + 2][1]) / 6
                ], a[3] = [
                    t[e + 1][0],
                    t[e + 1][1]
                ], o.push({
                    op: "bcurveTo",
                    data: [
                        a[1][0],
                        a[1][1],
                        a[2][0],
                        a[2][1],
                        a[3][0],
                        a[3][1]
                    ]
                });
            }
            if (e && 2 === e.length) {
                const t = s.maxRandomnessOffset;
                o.push({
                    op: "lineTo",
                    data: [
                        e[0] + G(t, s),
                        e[1] + G(t, s)
                    ]
                });
            }
        } else 3 === n ? (o.push({
            op: "move",
            data: [
                t[1][0],
                t[1][1]
            ]
        }), o.push({
            op: "bcurveTo",
            data: [
                t[1][0],
                t[1][1],
                t[2][0],
                t[2][1],
                t[2][0],
                t[2][1]
            ]
        })) : 2 === n && o.push(...R(t[0][0], t[0][1], t[1][0], t[1][1], s, !0, !0));
        return o;
    }
    function F(t, e, s, n, o, a, h, r) {
        const i = [], c = [];
        if (0 === r.roughness) {
            t /= 4, c.push([
                e + n * Math.cos(-t),
                s + o * Math.sin(-t)
            ]);
            for(let a = 0; a <= 2 * Math.PI; a += t){
                const t = [
                    e + n * Math.cos(a),
                    s + o * Math.sin(a)
                ];
                i.push(t), c.push(t);
            }
            c.push([
                e + n * Math.cos(0),
                s + o * Math.sin(0)
            ]), c.push([
                e + n * Math.cos(t),
                s + o * Math.sin(t)
            ]);
        } else {
            const l = G(.5, r) - Math.PI / 2;
            c.push([
                G(a, r) + e + .9 * n * Math.cos(l - t),
                G(a, r) + s + .9 * o * Math.sin(l - t)
            ]);
            const u = 2 * Math.PI + l - .01;
            for(let h = l; h < u; h += t){
                const t = [
                    G(a, r) + e + n * Math.cos(h),
                    G(a, r) + s + o * Math.sin(h)
                ];
                i.push(t), c.push(t);
            }
            c.push([
                G(a, r) + e + n * Math.cos(l + 2 * Math.PI + .5 * h),
                G(a, r) + s + o * Math.sin(l + 2 * Math.PI + .5 * h)
            ]), c.push([
                G(a, r) + e + .98 * n * Math.cos(l + h),
                G(a, r) + s + .98 * o * Math.sin(l + h)
            ]), c.push([
                G(a, r) + e + .9 * n * Math.cos(l + .5 * h),
                G(a, r) + s + .9 * o * Math.sin(l + .5 * h)
            ]);
        }
        return [
            c,
            i
        ];
    }
    function V(t, e, s, n, o, a, h, r, i) {
        const c = a + G(.1, i), l = [];
        l.push([
            G(r, i) + e + .9 * n * Math.cos(c - t),
            G(r, i) + s + .9 * o * Math.sin(c - t)
        ]);
        for(let a = c; a <= h; a += t)l.push([
            G(r, i) + e + n * Math.cos(a),
            G(r, i) + s + o * Math.sin(a)
        ]);
        return l.push([
            e + n * Math.cos(h),
            s + o * Math.sin(h)
        ]), l.push([
            e + n * Math.cos(h),
            s + o * Math.sin(h)
        ]), q(l, null, i);
    }
    function Z(t, e, s, n, o, a, h, r) {
        const i = [], c = [
            r.maxRandomnessOffset || 1,
            (r.maxRandomnessOffset || 1) + .3
        ];
        let l = [
            0,
            0
        ];
        const u = r.disableMultiStroke ? 1 : 2, p = r.preserveVertices;
        for(let f = 0; f < u; f++)0 === f ? i.push({
            op: "move",
            data: [
                h[0],
                h[1]
            ]
        }) : i.push({
            op: "move",
            data: [
                h[0] + (p ? 0 : G(c[0], r)),
                h[1] + (p ? 0 : G(c[0], r))
            ]
        }), l = p ? [
            o,
            a
        ] : [
            o + G(c[f], r),
            a + G(c[f], r)
        ], i.push({
            op: "bcurveTo",
            data: [
                t + G(c[f], r),
                e + G(c[f], r),
                s + G(c[f], r),
                n + G(c[f], r),
                l[0],
                l[1]
            ]
        });
        return i;
    }
    function Q(t) {
        return [
            ...t
        ];
    }
    function H(t, e = 0) {
        const s = t.length;
        if (s < 3) throw new Error("A curve must have at least three points.");
        const n = [];
        if (3 === s) n.push(Q(t[0]), Q(t[1]), Q(t[2]), Q(t[2]));
        else {
            const s = [];
            s.push(t[0], t[0]);
            for(let e = 1; e < t.length; e++)s.push(t[e]), e === t.length - 1 && s.push(t[e]);
            const o = [], a = 1 - e;
            n.push(Q(s[0]));
            for(let t = 1; t + 2 < s.length; t++){
                const e = s[t];
                o[0] = [
                    e[0],
                    e[1]
                ], o[1] = [
                    e[0] + (a * s[t + 1][0] - a * s[t - 1][0]) / 6,
                    e[1] + (a * s[t + 1][1] - a * s[t - 1][1]) / 6
                ], o[2] = [
                    s[t + 1][0] + (a * s[t][0] - a * s[t + 2][0]) / 6,
                    s[t + 1][1] + (a * s[t][1] - a * s[t + 2][1]) / 6
                ], o[3] = [
                    s[t + 1][0],
                    s[t + 1][1]
                ], n.push(o[1], o[2], o[3]);
            }
        }
        return n;
    }
    function N(t, e) {
        return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
    }
    function B(t, e, s) {
        const n = N(e, s);
        if (0 === n) return N(t, e);
        let o = ((t[0] - e[0]) * (s[0] - e[0]) + (t[1] - e[1]) * (s[1] - e[1])) / n;
        return o = Math.max(0, Math.min(1, o)), N(t, J(e, s, o));
    }
    function J(t, e, s) {
        return [
            t[0] + (e[0] - t[0]) * s,
            t[1] + (e[1] - t[1]) * s
        ];
    }
    function K(t, e, s, n) {
        const o = n || [];
        if (function(t, e) {
            const s = t[e + 0], n = t[e + 1], o = t[e + 2], a = t[e + 3];
            let h = 3 * n[0] - 2 * s[0] - a[0];
            h *= h;
            let r = 3 * n[1] - 2 * s[1] - a[1];
            r *= r;
            let i = 3 * o[0] - 2 * a[0] - s[0];
            i *= i;
            let c = 3 * o[1] - 2 * a[1] - s[1];
            return c *= c, h < i && (h = i), r < c && (r = c), h + r;
        }(t, e) < s) {
            const s = t[e + 0];
            if (o.length) a = o[o.length - 1], h = s, Math.sqrt(N(a, h)) > 1 && o.push(s);
            else o.push(s);
            o.push(t[e + 3]);
        } else {
            const n = .5, a = t[e + 0], h = t[e + 1], r = t[e + 2], i = t[e + 3], c = J(a, h, n), l = J(h, r, n), u = J(r, i, n), p = J(c, l, n), f = J(l, u, n), d = J(p, f, n);
            K([
                a,
                c,
                p,
                d
            ], 0, s, o), K([
                d,
                f,
                u,
                i
            ], 0, s, o);
        }
        var a, h;
        return o;
    }
    function U(t, e) {
        return X(t, 0, t.length, e);
    }
    function X(t, e, s, n, o) {
        const a = o || [], h = t[e], r = t[s - 1];
        let i = 0, c = 1;
        for(let n = e + 1; n < s - 1; ++n){
            const e = B(t[n], h, r);
            e > i && (i = e, c = n);
        }
        return Math.sqrt(i) > n ? (X(t, e, c + 1, n, a), X(t, c, s, n, a)) : (a.length || a.push(h), a.push(r)), a;
    }
    function Y(t, e = .15, s) {
        const n = [], o = (t.length - 1) / 3;
        for(let s = 0; s < o; s++)K(t, 3 * s, e, n);
        return s && s > 0 ? X(n, 0, n.length, s) : n;
    }
    const tt = "none";
    class et {
        constructor(t){
            this.defaultOptions = {
                maxRandomnessOffset: 2,
                roughness: 1,
                bowing: 1,
                stroke: "#000",
                strokeWidth: 1,
                curveTightness: 0,
                curveFitting: .95,
                curveStepCount: 9,
                fillStyle: "hachure",
                fillWeight: -1,
                hachureAngle: -41,
                hachureGap: -1,
                dashOffset: -1,
                dashGap: -1,
                zigzagOffset: -1,
                seed: 0,
                disableMultiStroke: !1,
                disableMultiStrokeFill: !1,
                preserveVertices: !1,
                fillShapeRoughnessGain: .8
            }, this.config = t || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
        }
        static newSeed() {
            return Math.floor(Math.random() * 2 ** 31);
        }
        _o(t) {
            return t ? Object.assign({}, this.defaultOptions, t) : this.defaultOptions;
        }
        _d(t, e, s) {
            return {
                shape: t,
                sets: e || [],
                options: s || this.defaultOptions
            };
        }
        line(t, e, s, n, o) {
            const a = this._o(o);
            return this._d("line", [
                rough_esm_v(t, e, s, n, a)
            ], a);
        }
        rectangle(t, e, s, n, o) {
            const a = this._o(o), h = [], r = rough_esm_O(t, e, s, n, a);
            if (a.fill) {
                const o = [
                    [
                        t,
                        e
                    ],
                    [
                        t + s,
                        e
                    ],
                    [
                        t + s,
                        e + n
                    ],
                    [
                        t,
                        e + n
                    ]
                ];
                "solid" === a.fillStyle ? h.push(I([
                    o
                ], a)) : h.push(C([
                    o
                ], a));
            }
            return a.stroke !== tt && h.push(r), this._d("rectangle", h, a);
        }
        ellipse(t, e, s, n, o) {
            const a = this._o(o), h = [], r = rough_esm_T(s, n, a), i = rough_esm_D(t, e, a, r);
            if (a.fill) if ("solid" === a.fillStyle) {
                const s = rough_esm_D(t, e, a, r).opset;
                s.type = "fillPath", h.push(s);
            } else h.push(C([
                i.estimatedPoints
            ], a));
            return a.stroke !== tt && h.push(i.opset), this._d("ellipse", h, a);
        }
        circle(t, e, s, n) {
            const o = this.ellipse(t, e, s, s, n);
            return o.shape = "circle", o;
        }
        linearPath(t, e) {
            const s = this._o(e);
            return this._d("linearPath", [
                rough_esm_S(t, !1, s)
            ], s);
        }
        arc(t, e, s, n, o, a, h = !1, r) {
            const i = this._o(r), c = [], l = rough_esm_A(t, e, s, n, o, a, h, !0, i);
            if (h && i.fill) if ("solid" === i.fillStyle) {
                const h = Object.assign({}, i);
                h.disableMultiStroke = !0;
                const r = rough_esm_A(t, e, s, n, o, a, !0, !1, h);
                r.type = "fillPath", c.push(r);
            } else c.push(function(t, e, s, n, o, a, h) {
                const r = t, i = e;
                let c = Math.abs(s / 2), l = Math.abs(n / 2);
                c += G(.01 * c, h), l += G(.01 * l, h);
                let u = o, p = a;
                for(; u < 0;)u += 2 * Math.PI, p += 2 * Math.PI;
                p - u > 2 * Math.PI && (u = 0, p = 2 * Math.PI);
                const f = (p - u) / h.curveStepCount, d = [];
                for(let t = u; t <= p; t += f)d.push([
                    r + c * Math.cos(t),
                    i + l * Math.sin(t)
                ]);
                return d.push([
                    r + c * Math.cos(p),
                    i + l * Math.sin(p)
                ]), d.push([
                    r,
                    i
                ]), C([
                    d
                ], h);
            }(t, e, s, n, o, a, i));
            return i.stroke !== tt && c.push(l), this._d("arc", c, i);
        }
        curve(t, e) {
            const s = this._o(e), n = [], o = rough_esm_L(t, s);
            if (s.fill && s.fill !== tt) if ("solid" === s.fillStyle) {
                const e = rough_esm_L(t, Object.assign(Object.assign({}, s), {
                    disableMultiStroke: !0,
                    roughness: s.roughness ? s.roughness + s.fillShapeRoughnessGain : 0
                }));
                n.push({
                    type: "fillPath",
                    ops: this._mergedShape(e.ops)
                });
            } else {
                const e = [], o = t;
                if (o.length) {
                    const t = "number" == typeof o[0][0] ? [
                        o
                    ] : o;
                    for (const n of t)n.length < 3 ? e.push(...n) : 3 === n.length ? e.push(...Y(H([
                        n[0],
                        n[0],
                        n[1],
                        n[2]
                    ]), 10, (1 + s.roughness) / 2)) : e.push(...Y(H(n), 10, (1 + s.roughness) / 2));
                }
                e.length && n.push(C([
                    e
                ], s));
            }
            return s.stroke !== tt && n.push(o), this._d("curve", n, s);
        }
        polygon(t, e) {
            const s = this._o(e), n = [], o = rough_esm_S(t, !0, s);
            return s.fill && ("solid" === s.fillStyle ? n.push(I([
                t
            ], s)) : n.push(C([
                t
            ], s))), s.stroke !== tt && n.push(o), this._d("polygon", n, s);
        }
        path(t, e) {
            const s = this._o(e), n = [];
            if (!t) return this._d("path", n, s);
            t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
            const o = s.fill && "transparent" !== s.fill && s.fill !== tt, a = s.stroke !== tt, h = !!(s.simplification && s.simplification < 1), r = function(t, e, s) {
                const n = rough_esm_m(rough_esm_y(rough_esm_b(t))), o = [];
                let a = [], h = [
                    0,
                    0
                ], r = [];
                const i = ()=>{
                    r.length >= 4 && a.push(...Y(r, e)), r = [];
                }, c = ()=>{
                    i(), a.length && (o.push(a), a = []);
                };
                for (const { key: t, data: e } of n)switch(t){
                    case "M":
                        c(), h = [
                            e[0],
                            e[1]
                        ], a.push(h);
                        break;
                    case "L":
                        i(), a.push([
                            e[0],
                            e[1]
                        ]);
                        break;
                    case "C":
                        if (!r.length) {
                            const t = a.length ? a[a.length - 1] : h;
                            r.push([
                                t[0],
                                t[1]
                            ]);
                        }
                        r.push([
                            e[0],
                            e[1]
                        ]), r.push([
                            e[2],
                            e[3]
                        ]), r.push([
                            e[4],
                            e[5]
                        ]);
                        break;
                    case "Z":
                        i(), a.push([
                            h[0],
                            h[1]
                        ]);
                }
                if (c(), !s) return o;
                const l = [];
                for (const t of o){
                    const e = U(t, s);
                    e.length && l.push(e);
                }
                return l;
            }(t, 1, h ? 4 - 4 * (s.simplification || 1) : (1 + s.roughness) / 2), i = _(t, s);
            if (o) if ("solid" === s.fillStyle) if (1 === r.length) {
                const e = _(t, Object.assign(Object.assign({}, s), {
                    disableMultiStroke: !0,
                    roughness: s.roughness ? s.roughness + s.fillShapeRoughnessGain : 0
                }));
                n.push({
                    type: "fillPath",
                    ops: this._mergedShape(e.ops)
                });
            } else n.push(I(r, s));
            else n.push(C(r, s));
            return a && (h ? r.forEach((t)=>{
                n.push(rough_esm_S(t, !1, s));
            }) : n.push(i)), this._d("path", n, s);
        }
        opsToPath(t, e) {
            let s = "";
            for (const n of t.ops){
                const t = "number" == typeof e && e >= 0 ? n.data.map((t)=>+t.toFixed(e)) : n.data;
                switch(n.op){
                    case "move":
                        s += `M${t[0]} ${t[1]} `;
                        break;
                    case "bcurveTo":
                        s += `C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;
                        break;
                    case "lineTo":
                        s += `L${t[0]} ${t[1]} `;
                }
            }
            return s.trim();
        }
        toPaths(t) {
            const e = t.sets || [], s = t.options || this.defaultOptions, n = [];
            for (const t of e){
                let e = null;
                switch(t.type){
                    case "path":
                        e = {
                            d: this.opsToPath(t),
                            stroke: s.stroke,
                            strokeWidth: s.strokeWidth,
                            fill: tt
                        };
                        break;
                    case "fillPath":
                        e = {
                            d: this.opsToPath(t),
                            stroke: tt,
                            strokeWidth: 0,
                            fill: s.fill || tt
                        };
                        break;
                    case "fillSketch":
                        e = this.fillSketch(t, s);
                }
                e && n.push(e);
            }
            return n;
        }
        fillSketch(t, e) {
            let s = e.fillWeight;
            return s < 0 && (s = e.strokeWidth / 2), {
                d: this.opsToPath(t),
                stroke: e.fill || tt,
                strokeWidth: s,
                fill: tt
            };
        }
        _mergedShape(t) {
            return t.filter((t, e)=>0 === e || "move" !== t.op);
        }
    }
    class st {
        constructor(t, e){
            this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.gen = new et(e);
        }
        draw(t) {
            const e = t.sets || [], s = t.options || this.getDefaultOptions(), n = this.ctx, o = t.options.fixedDecimalPlaceDigits;
            for (const a of e)switch(a.type){
                case "path":
                    n.save(), n.strokeStyle = "none" === s.stroke ? "transparent" : s.stroke, n.lineWidth = s.strokeWidth, s.strokeLineDash && n.setLineDash(s.strokeLineDash), s.strokeLineDashOffset && (n.lineDashOffset = s.strokeLineDashOffset), this._drawToContext(n, a, o), n.restore();
                    break;
                case "fillPath":
                    {
                        n.save(), n.fillStyle = s.fill || "";
                        const e = "curve" === t.shape || "polygon" === t.shape || "path" === t.shape ? "evenodd" : "nonzero";
                        this._drawToContext(n, a, o, e), n.restore();
                        break;
                    }
                case "fillSketch":
                    this.fillSketch(n, a, s);
            }
        }
        fillSketch(t, e, s) {
            let n = s.fillWeight;
            n < 0 && (n = s.strokeWidth / 2), t.save(), s.fillLineDash && t.setLineDash(s.fillLineDash), s.fillLineDashOffset && (t.lineDashOffset = s.fillLineDashOffset), t.strokeStyle = s.fill || "", t.lineWidth = n, this._drawToContext(t, e, s.fixedDecimalPlaceDigits), t.restore();
        }
        _drawToContext(t, e, s, n = "nonzero") {
            t.beginPath();
            for (const n of e.ops){
                const e = "number" == typeof s && s >= 0 ? n.data.map((t)=>+t.toFixed(s)) : n.data;
                switch(n.op){
                    case "move":
                        t.moveTo(e[0], e[1]);
                        break;
                    case "bcurveTo":
                        t.bezierCurveTo(e[0], e[1], e[2], e[3], e[4], e[5]);
                        break;
                    case "lineTo":
                        t.lineTo(e[0], e[1]);
                }
            }
            "fillPath" === e.type ? t.fill(n) : t.stroke();
        }
        get generator() {
            return this.gen;
        }
        getDefaultOptions() {
            return this.gen.defaultOptions;
        }
        line(t, e, s, n, o) {
            const a = this.gen.line(t, e, s, n, o);
            return this.draw(a), a;
        }
        rectangle(t, e, s, n, o) {
            const a = this.gen.rectangle(t, e, s, n, o);
            return this.draw(a), a;
        }
        ellipse(t, e, s, n, o) {
            const a = this.gen.ellipse(t, e, s, n, o);
            return this.draw(a), a;
        }
        circle(t, e, s, n) {
            const o = this.gen.circle(t, e, s, n);
            return this.draw(o), o;
        }
        linearPath(t, e) {
            const s = this.gen.linearPath(t, e);
            return this.draw(s), s;
        }
        polygon(t, e) {
            const s = this.gen.polygon(t, e);
            return this.draw(s), s;
        }
        arc(t, e, s, n, o, a, h = !1, r) {
            const i = this.gen.arc(t, e, s, n, o, a, h, r);
            return this.draw(i), i;
        }
        curve(t, e) {
            const s = this.gen.curve(t, e);
            return this.draw(s), s;
        }
        path(t, e) {
            const s = this.gen.path(t, e);
            return this.draw(s), s;
        }
    }
    const nt = "http://www.w3.org/2000/svg";
    class ot {
        constructor(t, e){
            this.svg = t, this.gen = new et(e);
        }
        draw(t) {
            const e = t.sets || [], s = t.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, o = n.createElementNS(nt, "g"), a = t.options.fixedDecimalPlaceDigits;
            for (const h of e){
                let e = null;
                switch(h.type){
                    case "path":
                        e = n.createElementNS(nt, "path"), e.setAttribute("d", this.opsToPath(h, a)), e.setAttribute("stroke", s.stroke), e.setAttribute("stroke-width", s.strokeWidth + ""), e.setAttribute("fill", "none"), s.strokeLineDash && e.setAttribute("stroke-dasharray", s.strokeLineDash.join(" ").trim()), s.strokeLineDashOffset && e.setAttribute("stroke-dashoffset", `${s.strokeLineDashOffset}`);
                        break;
                    case "fillPath":
                        e = n.createElementNS(nt, "path"), e.setAttribute("d", this.opsToPath(h, a)), e.setAttribute("stroke", "none"), e.setAttribute("stroke-width", "0"), e.setAttribute("fill", s.fill || ""), "curve" !== t.shape && "polygon" !== t.shape || e.setAttribute("fill-rule", "evenodd");
                        break;
                    case "fillSketch":
                        e = this.fillSketch(n, h, s);
                }
                e && o.appendChild(e);
            }
            return o;
        }
        fillSketch(t, e, s) {
            let n = s.fillWeight;
            n < 0 && (n = s.strokeWidth / 2);
            const o = t.createElementNS(nt, "path");
            return o.setAttribute("d", this.opsToPath(e, s.fixedDecimalPlaceDigits)), o.setAttribute("stroke", s.fill || ""), o.setAttribute("stroke-width", n + ""), o.setAttribute("fill", "none"), s.fillLineDash && o.setAttribute("stroke-dasharray", s.fillLineDash.join(" ").trim()), s.fillLineDashOffset && o.setAttribute("stroke-dashoffset", `${s.fillLineDashOffset}`), o;
        }
        get generator() {
            return this.gen;
        }
        getDefaultOptions() {
            return this.gen.defaultOptions;
        }
        opsToPath(t, e) {
            return this.gen.opsToPath(t, e);
        }
        line(t, e, s, n, o) {
            const a = this.gen.line(t, e, s, n, o);
            return this.draw(a);
        }
        rectangle(t, e, s, n, o) {
            const a = this.gen.rectangle(t, e, s, n, o);
            return this.draw(a);
        }
        ellipse(t, e, s, n, o) {
            const a = this.gen.ellipse(t, e, s, n, o);
            return this.draw(a);
        }
        circle(t, e, s, n) {
            const o = this.gen.circle(t, e, s, n);
            return this.draw(o);
        }
        linearPath(t, e) {
            const s = this.gen.linearPath(t, e);
            return this.draw(s);
        }
        polygon(t, e) {
            const s = this.gen.polygon(t, e);
            return this.draw(s);
        }
        arc(t, e, s, n, o, a, h = !1, r) {
            const i = this.gen.arc(t, e, s, n, o, a, h, r);
            return this.draw(i);
        }
        curve(t, e) {
            const s = this.gen.curve(t, e);
            return this.draw(s);
        }
        path(t, e) {
            const s = this.gen.path(t, e);
            return this.draw(s);
        }
    }
    var at = {
        canvas: (t, e)=>new st(t, e),
        svg: (t, e)=>new ot(t, e),
        generator: (t)=>new et(t),
        newSeed: ()=>et.newSeed()
    };
    const ELEMENT_SELECTORS = {
        canvas: "#rough-canvas",
        form: "#emoji-form",
        input: "#emoji-input",
        downloadButton: "#download-button"
    };
    const DEFAULT_FLAG = "🇨🇳";
    const DOWNLOAD_FILE_PREFIX = "rough-flag";
    const FLAG_PROMPT_MESSAGE = "请输入要绘制的国旗";
    const TEMPLATE_FLAGS = {
        ad: "🇦🇩",
        ae: "🇦🇪",
        af: "🇦🇫",
        ag: "🇦🇬",
        ai: "🇦🇮",
        al: "🇦🇱",
        am: "🇦🇲",
        ao: "🇦🇴",
        aq: "🇦🇶",
        ar: "🇦🇷",
        as: "🇦🇸",
        at: "🇦🇹",
        australia: "🇦🇺",
        aw: "🇦🇼",
        ax: "🇦🇽",
        az: "🇦🇿",
        ba: "🇧🇦",
        bb: "🇧🇧",
        bd: "🇧🇩",
        be: "🇧🇪",
        bf: "🇧🇫",
        bg: "🇧🇬",
        bh: "🇧🇭",
        bi: "🇧🇮",
        bj: "🇧🇯",
        bl: "🇧🇱",
        bm: "🇧🇲",
        bn: "🇧🇳",
        bo: "🇧🇴",
        bq: "🇧🇶",
        br: "🇧🇷",
        bs: "🇧🇸",
        bt: "🇧🇹",
        bv: "🇧🇻",
        bw: "🇧🇼",
        by: "🇧🇾",
        bz: "🇧🇿",
        ca: "🇨🇦",
        cc: "🇨🇨",
        cd: "🇨🇩",
        cf: "🇨🇫",
        cg: "🇨🇬",
        ch: "🇨🇭",
        ci: "🇨🇮",
        ck: "🇨🇰",
        cl: "🇨🇱",
        cm: "🇨🇲",
        china: "🇨🇳",
        co: "🇨🇴",
        cr: "🇨🇷",
        cu: "🇨🇺",
        cv: "🇨🇻",
        cw: "🇨🇼",
        cx: "🇨🇽",
        cy: "🇨🇾",
        cz: "🇨🇿",
        de: "🇩🇪",
        dj: "🇩🇯",
        dk: "🇩🇰",
        dm: "🇩🇲",
        do: "🇩🇴",
        dz: "🇩🇿",
        ec: "🇪🇨",
        ee: "🇪🇪",
        eg: "🇪🇬",
        eh: "🇪🇭",
        er: "🇪🇷",
        spain: "🇪🇸",
        et: "🇪🇹",
        fi: "🇫🇮",
        fj: "🇫🇯",
        fk: "🇫🇰",
        fm: "🇫🇲",
        fo: "🇫🇴",
        france: "🇫🇷",
        ga: "🇬🇦",
        gb: "🇬🇧",
        gd: "🇬🇩",
        ge: "🇬🇪",
        gf: "🇬🇫",
        gg: "🇬🇬",
        gh: "🇬🇭",
        gi: "🇬🇮",
        gl: "🇬🇱",
        gm: "🇬🇲",
        gn: "🇬🇳",
        gp: "🇬🇵",
        gq: "🇬🇶",
        gr: "🇬🇷",
        gs: "🇬🇸",
        gt: "🇬🇹",
        gu: "🇬🇺",
        gw: "🇬🇼",
        gy: "🇬🇾",
        hk: "🇭🇰",
        hm: "🇭🇲",
        hn: "🇭🇳",
        hr: "🇭🇷",
        ht: "🇭🇹",
        hu: "🇭🇺",
        id: "🇮🇩",
        ie: "🇮🇪",
        il: "🇮🇱",
        im: "🇮🇲",
        in: "🇮🇳",
        io: "🇮🇴",
        iq: "🇮🇶",
        ir: "🇮🇷",
        is: "🇮🇸",
        italy: "🇮🇹",
        je: "🇯🇪",
        jm: "🇯🇲",
        jo: "🇯🇴",
        japan: "🇯🇵",
        ke: "🇰🇪",
        kg: "🇰🇬",
        kh: "🇰🇭",
        ki: "🇰🇮",
        km: "🇰🇲",
        kn: "🇰🇳",
        kp: "🇰🇵",
        kr: "🇰🇷",
        kw: "🇰🇼",
        ky: "🇰🇾",
        kz: "🇰🇿",
        la: "🇱🇦",
        lb: "🇱🇧",
        lc: "🇱🇨",
        li: "🇱🇮",
        lk: "🇱🇰",
        lr: "🇱🇷",
        ls: "🇱🇸",
        lt: "🇱🇹",
        lu: "🇱🇺",
        lv: "🇱🇻",
        ly: "🇱🇾",
        ma: "🇲🇦",
        mc: "🇲🇨",
        md: "🇲🇩",
        me: "🇲🇪",
        mf: "🇲🇫",
        mg: "🇲🇬",
        mh: "🇲🇭",
        mk: "🇲🇰",
        ml: "🇲🇱",
        mm: "🇲🇲",
        mn: "🇲🇳",
        mo: "🇲🇴",
        mp: "🇲🇵",
        mq: "🇲🇶",
        mr: "🇲🇷",
        ms: "🇲🇸",
        mt: "🇲🇹",
        mu: "🇲🇺",
        mv: "🇲🇻",
        mw: "🇲🇼",
        mx: "🇲🇽",
        my: "🇲🇾",
        mz: "🇲🇿",
        na: "🇳🇦",
        nc: "🇳🇨",
        ne: "🇳🇪",
        nf: "🇳🇫",
        ng: "🇳🇬",
        ni: "🇳🇮",
        nl: "🇳🇱",
        no: "🇳🇴",
        np: "🇳🇵",
        nr: "🇳🇷",
        nu: "🇳🇺",
        nz: "🇳🇿",
        om: "🇴🇲",
        pa: "🇵🇦",
        pe: "🇵🇪",
        pf: "🇵🇫",
        pg: "🇵🇬",
        ph: "🇵🇭",
        pk: "🇵🇰",
        pl: "🇵🇱",
        pm: "🇵🇲",
        pn: "🇵🇳",
        pr: "🇵🇷",
        ps: "🇵🇸",
        pt: "🇵🇹",
        pw: "🇵🇼",
        py: "🇵🇾",
        qa: "🇶🇦",
        re: "🇷🇪",
        ro: "🇷🇴",
        rs: "🇷🇸",
        ru: "🇷🇺",
        rw: "🇷🇼",
        sa: "🇸🇦",
        sb: "🇸🇧",
        sc: "🇸🇨",
        sd: "🇸🇩",
        se: "🇸🇪",
        sg: "🇸🇬",
        sh: "🇸🇭",
        si: "🇸🇮",
        sj: "🇸🇯",
        sk: "🇸🇰",
        sl: "🇸🇱",
        sm: "🇸🇲",
        sn: "🇸🇳",
        so: "🇸🇴",
        sr: "🇸🇷",
        ss: "🇸🇸",
        st: "🇸🇹",
        sv: "🇸🇻",
        sx: "🇸🇽",
        sy: "🇸🇾",
        sz: "🇸🇿",
        tc: "🇹🇨",
        td: "🇹🇩",
        tf: "🇹🇫",
        tg: "🇹🇬",
        thailand: "🇹🇭",
        tj: "🇹🇯",
        tk: "🇹🇰",
        tl: "🇹🇱",
        tm: "🇹🇲",
        tn: "🇹🇳",
        to: "🇹🇴",
        tr: "🇹🇷",
        tt: "🇹🇹",
        tv: "🇹🇻",
        tw: "🇹🇼",
        tz: "🇹🇿",
        ua: "🇺🇦",
        ug: "🇺🇬",
        um: "🇺🇲",
        unitedStates: "🇺🇸",
        uy: "🇺🇾",
        uz: "🇺🇿",
        vatican: "🇻🇦",
        vc: "🇻🇨",
        ve: "🇻🇪",
        vg: "🇻🇬",
        vi: "🇻🇮",
        vn: "🇻🇳",
        vu: "🇻🇺",
        wf: "🇼🇫",
        ws: "🇼🇸",
        xk: "🇽🇰",
        ye: "🇾🇪",
        yt: "🇾🇹",
        za: "🇿🇦",
        zm: "🇿🇲",
        zw: "🇿🇼"
    };
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
    const PALETTE = {
        paper: "#fbfdfa",
        frame: "#d9e3db",
        shadow: "rgba(36, 49, 44, 0.08)"
    };
    const canvas = document.querySelector(ELEMENT_SELECTORS.canvas);
    const rough_emoji_form = document.querySelector(ELEMENT_SELECTORS.form);
    const rough_emoji_input = document.querySelector(ELEMENT_SELECTORS.input);
    const downloadButton = document.querySelector(ELEMENT_SELECTORS.downloadButton);
    let ctx;
    let roughCanvas;
    let size = 0;
    const RoughEmoji = {
        draw (canvasElement, value) {
            withCanvas(canvasElement, ()=>drawFlag(resolveFlag(value)));
        },
        isFlagEmoji,
        resolveFlag
    };
    const TEMPLATE_FLAG_DRAWERS = {
        [TEMPLATE_FLAGS.australia]: drawAustraliaFlag,
        [TEMPLATE_FLAGS.china]: drawChinaFlag,
        [TEMPLATE_FLAGS.spain]: drawSpainFlag,
        [TEMPLATE_FLAGS.france]: drawFranceFlag,
        [TEMPLATE_FLAGS.italy]: drawItalyFlag,
        [TEMPLATE_FLAGS.japan]: drawJapanFlag,
        [TEMPLATE_FLAGS.thailand]: drawThailandFlag,
        [TEMPLATE_FLAGS.unitedStates]: drawUnitedStatesFlag,
        [TEMPLATE_FLAGS.vatican]: drawVaticanFlag,
        [TEMPLATE_FLAGS.ad]: drawAdFlag,
        [TEMPLATE_FLAGS.ae]: drawAeFlag,
        [TEMPLATE_FLAGS.af]: drawAfFlag,
        [TEMPLATE_FLAGS.ag]: drawAgFlag,
        [TEMPLATE_FLAGS.ai]: drawAiFlag,
        [TEMPLATE_FLAGS.al]: drawAlFlag,
        [TEMPLATE_FLAGS.am]: drawAmFlag,
        [TEMPLATE_FLAGS.ao]: drawAoFlag,
        [TEMPLATE_FLAGS.aq]: drawAqFlag,
        [TEMPLATE_FLAGS.ar]: drawArFlag,
        [TEMPLATE_FLAGS.as]: drawAsFlag,
        [TEMPLATE_FLAGS.at]: drawAtFlag,
        [TEMPLATE_FLAGS.aw]: drawAwFlag,
        [TEMPLATE_FLAGS.ax]: drawAxFlag,
        [TEMPLATE_FLAGS.az]: drawAzFlag,
        [TEMPLATE_FLAGS.ba]: drawBaFlag,
        [TEMPLATE_FLAGS.bb]: drawBbFlag,
        [TEMPLATE_FLAGS.bd]: drawBdFlag,
        [TEMPLATE_FLAGS.be]: drawBeFlag,
        [TEMPLATE_FLAGS.bf]: drawBfFlag,
        [TEMPLATE_FLAGS.bg]: drawBgFlag,
        [TEMPLATE_FLAGS.bh]: drawBhFlag,
        [TEMPLATE_FLAGS.bi]: drawBiFlag,
        [TEMPLATE_FLAGS.bj]: drawBjFlag,
        [TEMPLATE_FLAGS.bl]: drawBlFlag,
        [TEMPLATE_FLAGS.bm]: drawBmFlag,
        [TEMPLATE_FLAGS.bn]: drawBnFlag,
        [TEMPLATE_FLAGS.bo]: drawBoFlag,
        [TEMPLATE_FLAGS.bq]: drawBqFlag,
        [TEMPLATE_FLAGS.br]: drawBrFlag,
        [TEMPLATE_FLAGS.bs]: drawBsFlag,
        [TEMPLATE_FLAGS.bt]: drawBtFlag,
        [TEMPLATE_FLAGS.bv]: drawBvFlag,
        [TEMPLATE_FLAGS.bw]: drawBwFlag,
        [TEMPLATE_FLAGS.by]: drawByFlag,
        [TEMPLATE_FLAGS.bz]: drawBzFlag,
        [TEMPLATE_FLAGS.ca]: drawCaFlag,
        [TEMPLATE_FLAGS.cc]: drawCcFlag,
        [TEMPLATE_FLAGS.cd]: drawCdFlag,
        [TEMPLATE_FLAGS.cf]: drawCfFlag,
        [TEMPLATE_FLAGS.cg]: drawCgFlag,
        [TEMPLATE_FLAGS.ch]: drawChFlag,
        [TEMPLATE_FLAGS.ci]: drawCiFlag,
        [TEMPLATE_FLAGS.ck]: drawCkFlag,
        [TEMPLATE_FLAGS.cl]: drawClFlag,
        [TEMPLATE_FLAGS.cm]: drawCmFlag,
        [TEMPLATE_FLAGS.co]: drawCoFlag,
        [TEMPLATE_FLAGS.cr]: drawCrFlag,
        [TEMPLATE_FLAGS.cu]: drawCuFlag,
        [TEMPLATE_FLAGS.cv]: drawCvFlag,
        [TEMPLATE_FLAGS.cw]: drawCwFlag,
        [TEMPLATE_FLAGS.cx]: drawCxFlag,
        [TEMPLATE_FLAGS.cy]: drawCyFlag,
        [TEMPLATE_FLAGS.cz]: drawCzFlag,
        [TEMPLATE_FLAGS.de]: drawDeFlag,
        [TEMPLATE_FLAGS.dj]: drawDjFlag,
        [TEMPLATE_FLAGS.dk]: drawDkFlag,
        [TEMPLATE_FLAGS.dm]: drawDmFlag,
        [TEMPLATE_FLAGS["do"]]: drawDoFlag,
        [TEMPLATE_FLAGS.dz]: drawDzFlag,
        [TEMPLATE_FLAGS.ec]: drawEcFlag,
        [TEMPLATE_FLAGS.ee]: drawEeFlag,
        [TEMPLATE_FLAGS.eg]: drawEgFlag,
        [TEMPLATE_FLAGS.eh]: drawEhFlag,
        [TEMPLATE_FLAGS.er]: drawErFlag,
        [TEMPLATE_FLAGS.et]: drawEtFlag,
        [TEMPLATE_FLAGS.fi]: drawFiFlag,
        [TEMPLATE_FLAGS.fj]: drawFjFlag,
        [TEMPLATE_FLAGS.fk]: drawFkFlag,
        [TEMPLATE_FLAGS.fm]: drawFmFlag,
        [TEMPLATE_FLAGS.fo]: drawFoFlag,
        [TEMPLATE_FLAGS.ga]: drawGaFlag,
        [TEMPLATE_FLAGS.gb]: drawGbFlag,
        [TEMPLATE_FLAGS.gd]: drawGdFlag,
        [TEMPLATE_FLAGS.ge]: drawGeFlag,
        [TEMPLATE_FLAGS.gf]: drawGfFlag,
        [TEMPLATE_FLAGS.gg]: drawGgFlag,
        [TEMPLATE_FLAGS.gh]: drawGhFlag,
        [TEMPLATE_FLAGS.gi]: drawGiFlag,
        [TEMPLATE_FLAGS.gl]: drawGlFlag,
        [TEMPLATE_FLAGS.gm]: drawGmFlag,
        [TEMPLATE_FLAGS.gn]: drawGnFlag,
        [TEMPLATE_FLAGS.gp]: drawGpFlag,
        [TEMPLATE_FLAGS.gq]: drawGqFlag,
        [TEMPLATE_FLAGS.gr]: drawGrFlag,
        [TEMPLATE_FLAGS.gs]: drawGsFlag,
        [TEMPLATE_FLAGS.gt]: drawGtFlag,
        [TEMPLATE_FLAGS.gu]: drawGuFlag,
        [TEMPLATE_FLAGS.gw]: drawGwFlag,
        [TEMPLATE_FLAGS.gy]: drawGyFlag,
        [TEMPLATE_FLAGS.hk]: drawHkFlag,
        [TEMPLATE_FLAGS.hm]: drawHmFlag,
        [TEMPLATE_FLAGS.hn]: drawHnFlag,
        [TEMPLATE_FLAGS.hr]: drawHrFlag,
        [TEMPLATE_FLAGS.ht]: drawHtFlag,
        [TEMPLATE_FLAGS.hu]: drawHuFlag,
        [TEMPLATE_FLAGS.id]: drawIdFlag,
        [TEMPLATE_FLAGS.ie]: drawIeFlag,
        [TEMPLATE_FLAGS.il]: drawIlFlag,
        [TEMPLATE_FLAGS.im]: drawImFlag,
        [TEMPLATE_FLAGS["in"]]: drawInFlag,
        [TEMPLATE_FLAGS.io]: drawIoFlag,
        [TEMPLATE_FLAGS.iq]: drawIqFlag,
        [TEMPLATE_FLAGS.ir]: drawIrFlag,
        [TEMPLATE_FLAGS.is]: drawIsFlag,
        [TEMPLATE_FLAGS.je]: drawJeFlag,
        [TEMPLATE_FLAGS.jm]: drawJmFlag,
        [TEMPLATE_FLAGS.jo]: drawJoFlag,
        [TEMPLATE_FLAGS.ke]: drawKeFlag,
        [TEMPLATE_FLAGS.kg]: drawKgFlag,
        [TEMPLATE_FLAGS.kh]: drawKhFlag,
        [TEMPLATE_FLAGS.ki]: drawKiFlag,
        [TEMPLATE_FLAGS.km]: drawKmFlag,
        [TEMPLATE_FLAGS.kn]: drawKnFlag,
        [TEMPLATE_FLAGS.kp]: drawKpFlag,
        [TEMPLATE_FLAGS.kr]: drawKrFlag,
        [TEMPLATE_FLAGS.kw]: drawKwFlag,
        [TEMPLATE_FLAGS.ky]: drawKyFlag,
        [TEMPLATE_FLAGS.kz]: drawKzFlag,
        [TEMPLATE_FLAGS.la]: drawLaFlag,
        [TEMPLATE_FLAGS.lb]: drawLbFlag,
        [TEMPLATE_FLAGS.lc]: drawLcFlag,
        [TEMPLATE_FLAGS.li]: drawLiFlag,
        [TEMPLATE_FLAGS.lk]: drawLkFlag,
        [TEMPLATE_FLAGS.lr]: drawLrFlag,
        [TEMPLATE_FLAGS.ls]: drawLsFlag,
        [TEMPLATE_FLAGS.lt]: drawLtFlag,
        [TEMPLATE_FLAGS.lu]: drawLuFlag,
        [TEMPLATE_FLAGS.lv]: drawLvFlag,
        [TEMPLATE_FLAGS.ly]: drawLyFlag,
        [TEMPLATE_FLAGS.ma]: drawMaFlag,
        [TEMPLATE_FLAGS.mc]: drawMcFlag,
        [TEMPLATE_FLAGS.md]: drawMdFlag,
        [TEMPLATE_FLAGS.me]: drawMeFlag,
        [TEMPLATE_FLAGS.mf]: drawMfFlag,
        [TEMPLATE_FLAGS.mg]: drawMgFlag,
        [TEMPLATE_FLAGS.mh]: drawMhFlag,
        [TEMPLATE_FLAGS.mk]: drawMkFlag,
        [TEMPLATE_FLAGS.ml]: drawMlFlag,
        [TEMPLATE_FLAGS.mm]: drawMmFlag,
        [TEMPLATE_FLAGS.mn]: drawMnFlag,
        [TEMPLATE_FLAGS.mo]: drawMoFlag,
        [TEMPLATE_FLAGS.mp]: drawMpFlag,
        [TEMPLATE_FLAGS.mq]: drawMqFlag,
        [TEMPLATE_FLAGS.mr]: drawMrFlag,
        [TEMPLATE_FLAGS.ms]: drawMsFlag,
        [TEMPLATE_FLAGS.mt]: drawMtFlag,
        [TEMPLATE_FLAGS.mu]: drawMuFlag,
        [TEMPLATE_FLAGS.mv]: drawMvFlag,
        [TEMPLATE_FLAGS.mw]: drawMwFlag,
        [TEMPLATE_FLAGS.mx]: drawMxFlag,
        [TEMPLATE_FLAGS.my]: drawMyFlag,
        [TEMPLATE_FLAGS.mz]: drawMzFlag,
        [TEMPLATE_FLAGS.na]: drawNaFlag,
        [TEMPLATE_FLAGS.nc]: drawNcFlag,
        [TEMPLATE_FLAGS.ne]: drawNeFlag,
        [TEMPLATE_FLAGS.nf]: drawNfFlag,
        [TEMPLATE_FLAGS.ng]: drawNgFlag,
        [TEMPLATE_FLAGS.ni]: drawNiFlag,
        [TEMPLATE_FLAGS.nl]: drawNlFlag,
        [TEMPLATE_FLAGS.no]: drawNoFlag,
        [TEMPLATE_FLAGS.np]: drawNpFlag,
        [TEMPLATE_FLAGS.nr]: drawNrFlag,
        [TEMPLATE_FLAGS.nu]: drawNuFlag,
        [TEMPLATE_FLAGS.nz]: drawNzFlag,
        [TEMPLATE_FLAGS.om]: drawOmFlag,
        [TEMPLATE_FLAGS.pa]: drawPaFlag,
        [TEMPLATE_FLAGS.pe]: drawPeFlag,
        [TEMPLATE_FLAGS.pf]: drawPfFlag,
        [TEMPLATE_FLAGS.pg]: drawPgFlag,
        [TEMPLATE_FLAGS.ph]: drawPhFlag,
        [TEMPLATE_FLAGS.pk]: drawPkFlag,
        [TEMPLATE_FLAGS.pl]: drawPlFlag,
        [TEMPLATE_FLAGS.pm]: drawPmFlag,
        [TEMPLATE_FLAGS.pn]: drawPnFlag,
        [TEMPLATE_FLAGS.pr]: drawPrFlag,
        [TEMPLATE_FLAGS.ps]: drawPsFlag,
        [TEMPLATE_FLAGS.pt]: drawPtFlag,
        [TEMPLATE_FLAGS.pw]: drawPwFlag,
        [TEMPLATE_FLAGS.py]: drawPyFlag,
        [TEMPLATE_FLAGS.qa]: drawQaFlag,
        [TEMPLATE_FLAGS.re]: drawReFlag,
        [TEMPLATE_FLAGS.ro]: drawRoFlag,
        [TEMPLATE_FLAGS.rs]: drawRsFlag,
        [TEMPLATE_FLAGS.ru]: drawRuFlag,
        [TEMPLATE_FLAGS.rw]: drawRwFlag,
        [TEMPLATE_FLAGS.sa]: drawSaFlag,
        [TEMPLATE_FLAGS.sb]: drawSbFlag,
        [TEMPLATE_FLAGS.sc]: drawScFlag,
        [TEMPLATE_FLAGS.sd]: drawSdFlag,
        [TEMPLATE_FLAGS.se]: drawSeFlag,
        [TEMPLATE_FLAGS.sg]: drawSgFlag,
        [TEMPLATE_FLAGS.sh]: drawShFlag,
        [TEMPLATE_FLAGS.si]: drawSiFlag,
        [TEMPLATE_FLAGS.sj]: drawSjFlag,
        [TEMPLATE_FLAGS.sk]: drawSkFlag,
        [TEMPLATE_FLAGS.sl]: drawSlFlag,
        [TEMPLATE_FLAGS.sm]: drawSmFlag,
        [TEMPLATE_FLAGS.sn]: drawSnFlag,
        [TEMPLATE_FLAGS.so]: drawSoFlag,
        [TEMPLATE_FLAGS.sr]: drawSrFlag,
        [TEMPLATE_FLAGS.ss]: drawSsFlag,
        [TEMPLATE_FLAGS.st]: drawStFlag,
        [TEMPLATE_FLAGS.sv]: drawSvFlag,
        [TEMPLATE_FLAGS.sx]: drawSxFlag,
        [TEMPLATE_FLAGS.sy]: drawSyFlag,
        [TEMPLATE_FLAGS.sz]: drawSzFlag,
        [TEMPLATE_FLAGS.tc]: drawTcFlag,
        [TEMPLATE_FLAGS.td]: drawTdFlag,
        [TEMPLATE_FLAGS.tf]: drawTfFlag,
        [TEMPLATE_FLAGS.tg]: drawTgFlag,
        [TEMPLATE_FLAGS.tj]: drawTjFlag,
        [TEMPLATE_FLAGS.tk]: drawTkFlag,
        [TEMPLATE_FLAGS.tl]: drawTlFlag,
        [TEMPLATE_FLAGS.tm]: drawTmFlag,
        [TEMPLATE_FLAGS.tn]: drawTnFlag,
        [TEMPLATE_FLAGS.to]: drawToFlag,
        [TEMPLATE_FLAGS.tr]: drawTrFlag,
        [TEMPLATE_FLAGS.tt]: drawTtFlag,
        [TEMPLATE_FLAGS.tv]: drawTvFlag,
        [TEMPLATE_FLAGS.tw]: drawTwFlag,
        [TEMPLATE_FLAGS.tz]: drawTzFlag,
        [TEMPLATE_FLAGS.ua]: drawUaFlag,
        [TEMPLATE_FLAGS.ug]: drawUgFlag,
        [TEMPLATE_FLAGS.um]: drawUmFlag,
        [TEMPLATE_FLAGS.uy]: drawUyFlag,
        [TEMPLATE_FLAGS.uz]: drawUzFlag,
        [TEMPLATE_FLAGS.vc]: drawVcFlag,
        [TEMPLATE_FLAGS.ve]: drawVeFlag,
        [TEMPLATE_FLAGS.vg]: drawVgFlag,
        [TEMPLATE_FLAGS.vi]: drawViFlag,
        [TEMPLATE_FLAGS.vn]: drawVnFlag,
        [TEMPLATE_FLAGS.vu]: drawVuFlag,
        [TEMPLATE_FLAGS.wf]: drawWfFlag,
        [TEMPLATE_FLAGS.ws]: drawWsFlag,
        [TEMPLATE_FLAGS.xk]: drawXkFlag,
        [TEMPLATE_FLAGS.ye]: drawYeFlag,
        [TEMPLATE_FLAGS.yt]: drawYtFlag,
        [TEMPLATE_FLAGS.za]: drawZaFlag,
        [TEMPLATE_FLAGS.zm]: drawZmFlag,
        [TEMPLATE_FLAGS.zw]: drawZwFlag
    };
    const browserWindow = window;
    browserWindow.RoughEmoji = RoughEmoji;
    if (canvas && rough_emoji_form && rough_emoji_input && downloadButton) withCanvas(canvas, ()=>{
        const params = new URLSearchParams(window.location.search);
        const initialFlag = params.get("flag") || window.prompt(FLAG_PROMPT_MESSAGE, DEFAULT_FLAG) || DEFAULT_FLAG;
        rough_emoji_input.value = initialFlag;
        drawFlag(resolveFlag(initialFlag));
        rough_emoji_form.addEventListener("submit", (event)=>{
            event.preventDefault();
            drawFlag(resolveFlag(rough_emoji_input.value));
        });
        downloadButton.addEventListener("click", ()=>{
            const link = document.createElement("a");
            link.download = `${DOWNLOAD_FILE_PREFIX}-${resolveFlag(rough_emoji_input.value)}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });
    function withCanvas(canvasElement, callback) {
        const previous = {
            ctx,
            roughCanvas,
            size
        };
        ctx = canvasElement.getContext("2d", {
            willReadFrequently: true
        });
        roughCanvas = at.canvas(canvasElement);
        size = canvasElement.width;
        callback();
        ctx = previous.ctx;
        roughCanvas = previous.roughCanvas;
        size = previous.size;
    }
    function drawFlag(flag) {
        clearCanvas();
        drawPaper();
        const templateDrawer = TEMPLATE_FLAG_DRAWERS[flag];
        if (templateDrawer) return void templateDrawer();
        drawGenericFlag(flag);
    }
    function resolveFlag(value) {
        const input = String(value || "").trim();
        return isFlagEmoji(input) ? input : DEFAULT_FLAG;
    }
    function isFlagEmoji(value) {
        const codePoints = [
            ...value
        ].map((char)=>char.codePointAt(0));
        return 2 === codePoints.length && codePoints.every((codePoint)=>codePoint >= 127462 && codePoint <= 127487);
    }
    function clearCanvas() {
        ctx.clearRect(0, 0, size, size);
    }
    function drawPaper() {
        ctx.fillStyle = PALETTE.paper;
        ctx.fillRect(0, 0, size, size);
        roughCanvas.rectangle(46, 46, size - 92, size - 92, {
            roughness: 1.4,
            bowing: 0.8,
            stroke: PALETTE.frame,
            strokeWidth: 1.2,
            fill: PALETTE.paper,
            fillStyle: "hachure",
            hachureGap: 24,
            fillWeight: 0.28
        });
    }
    function drawChinaFlag() {
        const flag = makeSketchRect(118, 174, 486, 342);
        roughCanvas.polygon(flag, {
            stroke: "#8c1f23",
            strokeWidth: 3.2,
            fill: "#de2f36",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
        });
        roughCanvas.polygon(flag, {
            stroke: "#b7252c",
            strokeWidth: 1.2,
            fill: "#d92831",
            fillStyle: "hachure",
            hachureAngle: -8,
            hachureGap: 14,
            fillWeight: 1.1,
            roughness: 2.1,
            bowing: 1.1
        });
        drawFabricStrokes(132, 196, 458, 292, "#981d25");
        drawSketchStar(210, 262, 54, -18);
        drawSketchStar(294, 214, 20, 17);
        drawSketchStar(330, 266, 20, 38);
        drawSketchStar(330, 324, 20, 8);
        drawSketchStar(290, 374, 20, 24);
        roughCanvas.polygon(makeSketchRect(118, 174, 486, 342), {
            stroke: "#28332e",
            strokeWidth: 2.1,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
    function drawJapanFlag() {
        const flag = makeSketchRect(128, 172, 464, 344);
        roughCanvas.polygon(flag, {
            stroke: "#d6ded7",
            strokeWidth: 2.4,
            fill: "#fbfdfa",
            fillStyle: "hachure",
            hachureAngle: -10,
            hachureGap: 17,
            fillWeight: 0.45,
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.circle(360, 344, 166, {
            stroke: "#9f2936",
            strokeWidth: 2.4,
            fill: "#cf3346",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.3
        });
        roughCanvas.circle(360, 344, 155, {
            stroke: "rgba(159, 41, 54, 0.48)",
            strokeWidth: 1.1,
            fill: "#cf3346",
            fillStyle: "hachure",
            hachureAngle: -12,
            hachureGap: 13,
            fillWeight: 0.9,
            roughness: 2.1
        });
        drawFabricStrokes(150, 198, 420, 280, "#cbd8ce");
        roughCanvas.polygon(flag, {
            stroke: "#28332e",
            strokeWidth: 1.6,
            fill: "transparent",
            roughness: 2.5,
            bowing: 1.5
        });
    }
    function drawUnitedStatesFlag() {
        const flagBox = {
            x: 118,
            y: 174,
            width: 486,
            height: 342
        };
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        roughCanvas.polygon(offsetPoints(flag, 8, 10), {
            stroke: "transparent",
            fill: PALETTE.shadow,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon(flag, {
            stroke: "#b9c4c0",
            strokeWidth: 2.4,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
        });
        for(let row = 0; row < 13; row += 1)if (row % 2 === 0) drawFlagBand(flagBox, 0, row / 13, 1, (row + 1) / 13, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 0.43, 7 / 13, "#314d7c", "#20375e");
        drawUSStars(flagBox);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8d2d37");
        roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
            stroke: "#28332e",
            strokeWidth: 2,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
    function drawAustraliaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#243f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0, 1, 1, "#243f78", "#1b2c56");
        drawUnionJackCanton(flagBox);
        drawSketchStarWithColors(mapFlagX(0.24, 0.72, flagBox), mapFlagY(0.24, 0.72, flagBox), 24, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.72)"
        });
        [
            [
                0.74,
                0.28,
                13,
                4
            ],
            [
                0.84,
                0.44,
                11,
                -12
            ],
            [
                0.72,
                0.58,
                13,
                10
            ],
            [
                0.62,
                0.45,
                12,
                -8
            ],
            [
                0.78,
                0.72,
                8,
                18
            ]
        ].forEach(([u, v, radius, rotation])=>{
            drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, rotation, {
                stroke: "#c7d1cc",
                fill: "#fbfdfa",
                hatch: "rgba(251, 253, 250, 0.68)"
            });
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1a315e");
        drawFlagBorder(flagBox);
    }
    function drawThailandFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 6, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 6, 1, 2 / 6, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 6, 1, 4 / 6, "#273f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 4 / 6, 1, 5 / 6, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 5 / 6, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#7f2c42");
        drawFlagBorder(flagBox);
    }
    function drawFranceFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2d4e8c", "#1e3768");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#cf3d45", "#912936");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8b334e");
        drawFlagBorder(flagBox);
    }
    function drawItalyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2f8e5c", "#1f6540");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f6848");
        drawFlagBorder(flagBox);
    }
    function drawSpainFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f3c735", "#b78618");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83a3e", "#8f2633");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#f3c735", "#b78618");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83a3e", "#8f2633");
        drawSpainEmblem(flagBox);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#9c5524");
        drawFlagBorder(flagBox);
    }
    function drawVaticanFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.5, 1, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0.5, 0, 1, 1, "#fbfdfa", "#c7d1cc");
        drawVaticanEmblem(flagBox);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#b49835");
        drawFlagBorder(flagBox);
    }
    function drawAdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
        drawFlagBorder(flagBox);
    }
    function drawAeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.25, 0, 1, 1 / 3, "#15945f", "#0f6646");
        drawFlagBand(flagBox, 0.25, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.25, 2 / 3, 1, 1, "#262d2b", "#111615");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b3538");
        drawFlagBorder(flagBox);
    }
    function drawAfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.af);
    }
    function drawAgFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ag);
    }
    function drawAiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ai);
    }
    function drawAlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                cx - 62,
                cy - 42
            ],
            [
                cx - 18,
                cy - 18
            ],
            [
                cx,
                cy - 58
            ],
            [
                cx + 18,
                cy - 18
            ],
            [
                cx + 62,
                cy - 42
            ],
            [
                cx + 28,
                cy + 14
            ],
            [
                cx + 44,
                cy + 64
            ],
            [
                cx,
                cy + 35
            ],
            [
                cx - 44,
                cy + 64
            ],
            [
                cx - 28,
                cy + 14
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 2,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawAmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#d23b43", "#912936");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#f0a330", "#a96f1f");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#734268");
        drawFlagBorder(flagBox);
    }
    function drawAoFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ao);
    }
    function drawAqFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.aq);
    }
    function drawArFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#75a9d8", "#477aa5");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#75a9d8", "#477aa5");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 43, {
            stroke: "#b68b12",
            strokeWidth: 1.2,
            fill: "#ffd84c",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.8,
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
        drawFlagBorder(flagBox);
    }
    function drawAsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.as);
    }
    function drawAtFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawAwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.aw);
    }
    function drawAxFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ax);
    }
    function drawAzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#3d9fd3", "#2c6f9b");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), 0.24 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), 0.2 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.59, 0.5, flagBox), mapFlagY(0.59, 0.5, flagBox), 18, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
        drawFlagBorder(flagBox);
    }
    function drawBaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#253f78", "#1b2c56");
        roughCanvas.polygon([
            [
                mapFlagX(0.34, 0, flagBox),
                mapFlagY(0.34, 0, flagBox)
            ],
            [
                mapFlagX(0.78, 0, flagBox),
                mapFlagY(0.78, 0, flagBox)
            ],
            [
                mapFlagX(0.78, 1, flagBox),
                mapFlagY(0.78, 1, flagBox)
            ]
        ], {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#f0c83a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        for(let i = 0; i < 8; i += 1)drawSketchStarWithColors(mapFlagX(0.36 + 0.055 * i, 0.08 + 0.115 * i, flagBox), mapFlagY(0.36 + 0.055 * i, 0.08 + 0.115 * i, flagBox), 10, -18 + 4 * i, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
        drawFlagBorder(flagBox);
    }
    function drawBbFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#253f78", "#1b2c56");
        roughCanvas.line(cx, cy - 48, cx, cy + 54, {
            stroke: "#262d2b",
            strokeWidth: 4,
            roughness: 2.2,
            bowing: 1.4
        });
        roughCanvas.line(cx, cy - 10, cx - 24, cy - 42, {
            stroke: "#262d2b",
            strokeWidth: 3,
            roughness: 2.2,
            bowing: 1.4
        });
        roughCanvas.line(cx, cy - 10, cx + 24, cy - 42, {
            stroke: "#262d2b",
            strokeWidth: 3,
            roughness: 2.2,
            bowing: 1.4
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
        drawFlagBorder(flagBox);
    }
    function drawBdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#176847", "#0f4f37");
        roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), 0.42 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
        drawFlagBorder(flagBox);
    }
    function drawBeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#262d2b", "#111615");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f4f28");
        drawFlagBorder(flagBox);
    }
    function drawBfFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
        drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawBgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d5a48");
        drawFlagBorder(flagBox);
    }
    function drawBhFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const teeth = 5;
        const zigzag = [
            [
                mapFlagX(0.28, 0, flagBox),
                mapFlagY(0.28, 0, flagBox)
            ]
        ];
        for(let i = 0; i < teeth; i += 1){
            zigzag.push([
                mapFlagX(0.42, (i + 0.5) / teeth, flagBox),
                mapFlagY(0.42, (i + 0.5) / teeth, flagBox)
            ]);
            zigzag.push([
                mapFlagX(0.28, (i + 1) / teeth, flagBox),
                mapFlagY(0.28, (i + 1) / teeth, flagBox)
            ]);
        }
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            ...zigzag,
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawBiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bi);
    }
    function drawBjFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 0.4, 1, "#168453", "#0f5f3d");
        drawFlagBand(flagBox, 0.4, 0, 1, 0.5, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0.4, 0.5, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#76623a");
        drawFlagBorder(flagBox);
    }
    function drawBlFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bl);
    }
    function drawBmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bm);
    }
    function drawBnFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bn);
    }
    function drawBoFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bo);
    }
    function drawBqFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bq);
    }
    function drawBrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0.5, 0.12, flagBox),
                mapFlagY(0.5, 0.12, flagBox)
            ],
            [
                mapFlagX(0.88, 0.5, flagBox),
                mapFlagY(0.88, 0.5, flagBox)
            ],
            [
                mapFlagX(0.5, 0.88, flagBox),
                mapFlagY(0.5, 0.88, flagBox)
            ],
            [
                mapFlagX(0.12, 0.5, flagBox),
                mapFlagY(0.12, 0.5, flagBox)
            ]
        ], {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#f0c83a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 0.38 * flagBox.height, {
            stroke: "#203a74",
            strokeWidth: 1.2,
            fill: "#2f4f9d",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFlagBand({
            x: flagBox.x + 0.35 * flagBox.width,
            y: flagBox.y + 0.47 * flagBox.height,
            width: 0.3 * flagBox.width,
            height: 0.08 * flagBox.height
        }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawBsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bs);
    }
    function drawBtFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bt);
    }
    function drawBvFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.bv);
    }
    function drawBwFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#75a9d8", "#477aa5");
        drawFlagBand(flagBox, 0, 0, 1, 0.36, "#75a9d8", "#477aa5");
        drawFlagBand(flagBox, 0, 0.36, 1, 0.42, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 0.58, 1, 0.64, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.64, 1, 1, "#75a9d8", "#477aa5");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#416a88");
        drawFlagBorder(flagBox);
    }
    function drawByFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 0.18, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.18, 0, 1, 0.68, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.18, 0.68, 1, 1, "#249064", "#176847");
        for(let i = 0; i < 6; i += 1)roughCanvas.line(mapFlagX(0.035, i / 6, flagBox), mapFlagY(0.035, i / 6, flagBox), mapFlagX(0.145, (i + 0.5) / 6, flagBox), mapFlagY(0.145, (i + 0.5) / 6, flagBox), {
            stroke: "#c83c4a",
            strokeWidth: 2.4,
            roughness: 2.2,
            bowing: 1.5
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawBzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0, 1, 0.12, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.88, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 0.42 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "hachure",
            hachureGap: 9,
            fillWeight: 0.45,
            roughness: 2.3,
            bowing: 1.2
        });
        drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
        drawFlagBorder(flagBox);
    }
    function drawCaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.75, 0, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                cx,
                cy - 74
            ],
            [
                cx + 17,
                cy - 28
            ],
            [
                cx + 55,
                cy - 42
            ],
            [
                cx + 34,
                cy - 4
            ],
            [
                cx + 70,
                cy + 8
            ],
            [
                cx + 28,
                cy + 22
            ],
            [
                cx + 36,
                cy + 64
            ],
            [
                cx,
                cy + 36
            ],
            [
                cx - 36,
                cy + 64
            ],
            [
                cx - 28,
                cy + 22
            ],
            [
                cx - 70,
                cy + 8
            ],
            [
                cx - 34,
                cy - 4
            ],
            [
                cx - 55,
                cy - 42
            ],
            [
                cx - 17,
                cy - 28
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.8,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawCcFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cc);
    }
    function drawCdFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cd);
    }
    function drawCfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cf);
    }
    function drawCgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        roughCanvas.polygon(makeFlagCellOutline(0, 0, 1, 1, flagBox), {
            stroke: "#176847",
            strokeWidth: 1.2,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(0.28, 1, flagBox),
                mapFlagY(0.28, 1, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ],
            [
                mapFlagX(0.72, 0, flagBox),
                mapFlagY(0.72, 0, flagBox)
            ],
            [
                mapFlagX(1, 0, flagBox),
                mapFlagY(1, 0, flagBox)
            ]
        ], {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#f0c83a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(0.72, 0, flagBox),
                mapFlagY(0.72, 0, flagBox)
            ],
            [
                mapFlagX(1, 0, flagBox),
                mapFlagY(1, 0, flagBox)
            ],
            [
                mapFlagX(1, 1, flagBox),
                mapFlagY(1, 1, flagBox)
            ],
            [
                mapFlagX(0.28, 1, flagBox),
                mapFlagY(0.28, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawChFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.41, 0.23, 0.59, 0.77, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.25, 0.41, 0.75, 0.59, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawCiFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#ee8b2c", "#a9601d");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#7f7041");
        drawFlagBorder(flagBox);
    }
    function drawCkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ck);
    }
    function drawClFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.33, 0.5, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0.33, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        drawSketchStarWithColors(mapFlagX(0.165, 0.25, flagBox), mapFlagY(0.165, 0.25, flagBox), 18, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawCmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#f0c83a", "#a98218");
        drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 31, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawCoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
        drawFlagBorder(flagBox);
    }
    function drawCrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 6, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 1 / 6, 1, 2 / 6, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 6, 1, 4 / 6, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 4 / 6, 1, 5 / 6, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 5 / 6, 1, 1, "#253f78", "#1b2c56");
        roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), 36, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.45,
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawCuFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        for(let row = 0; row < 5; row += 1)drawFlagBand(flagBox, 0, row / 5, 1, (row + 1) / 5, row % 2 === 0 ? "#2f4f9d" : "#fbfdfa", row % 2 === 0 ? "#203a74" : "#c7d1cc");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 18, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
        drawFlagBorder(flagBox);
    }
    function drawCvFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cv);
    }
    function drawCwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cw);
    }
    function drawCxFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cx);
    }
    function drawCyFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.cy);
    }
    function drawCzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.46, 0.5, flagBox),
                mapFlagY(0.46, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#203a74",
            strokeWidth: 1.2,
            fill: "#2f4f9d",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawDeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#f4cf34", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#745232");
        drawFlagBorder(flagBox);
    }
    function drawDjFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#4f9fd3", "#2c6f9b");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 19, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawDkFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.29, 0, 0.41, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawDmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.dm);
    }
    function drawDoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.44, 0.42, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0.56, 0, 1, 0.42, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.58, 0.44, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.56, 0.58, 1, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0.44, 0, 0.56, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#fbfdfa", "#c7d1cc");
        drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawDzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.5, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 0.5, 0, 1, 1, "#fbfdfa", "#c7d1cc");
        roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), 0.32 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.57, 0.5, flagBox), mapFlagY(0.57, 0.5, flagBox), 0.27 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.62, 0.5, flagBox), mapFlagY(0.62, 0.5, flagBox), 22, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawEcFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
        drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
        drawFlagBorder(flagBox);
    }
    function drawEeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#4f9fd3", "#2c6f9b");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3c5f73");
        drawFlagBorder(flagBox);
    }
    function drawEgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
        drawShieldBadge(flagBox, 0.5, 0.5, "#d7a735", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawEhFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.eh);
    }
    function drawErFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.er);
    }
    function drawEtFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 0.34 * flagBox.height, {
            stroke: "#203a74",
            strokeWidth: 1.2,
            fill: "#2f4f9d",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 28, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawFiFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 0.38, 1, 0.56, "#2f4f9d", "#203a74");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
        drawFlagBorder(flagBox);
    }
    function drawFjFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.fj);
    }
    function drawFkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.fk);
    }
    function drawFmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
        [
            [
                0.5,
                0.28
            ],
            [
                0.68,
                0.5
            ],
            [
                0.5,
                0.72
            ],
            [
                0.32,
                0.5
            ]
        ].forEach(([u, v], index)=>{
            drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 20, -18 + 5 * index, {
                stroke: "#c7d1cc",
                fill: "#fbfdfa",
                hatch: "rgba(251, 253, 250, 0.7)"
            });
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
        drawFlagBorder(flagBox);
    }
    function drawFoFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.fo);
    }
    function drawGaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#3d78bd", "#284f84");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d7653");
        drawFlagBorder(flagBox);
    }
    function drawGbFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#253f78", "#1b2c56");
        drawCantonLine(flagBox, 0, 0, 1, 1, "#fbfdfa", 26);
        drawCantonLine(flagBox, 1, 0, 0, 1, "#fbfdfa", 26);
        drawCantonLine(flagBox, 0, 0, 1, 1, "#c83c4a", 10);
        drawCantonLine(flagBox, 1, 0, 0, 1, "#c83c4a", 10);
        drawFlagBand(flagBox, 0.43, 0, 0.57, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.39, 1, 0.61, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.47, 0, 0.53, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.45, 1, 0.55, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
        drawFlagBorder(flagBox);
    }
    function drawGdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.1, 0.16, 0.9, 0.84, "#f0c83a", "#a98218");
        roughCanvas.polygon([
            [
                mapFlagX(0.1, 0.16, flagBox),
                mapFlagY(0.1, 0.16, flagBox)
            ],
            [
                mapFlagX(0.5, 0.5, flagBox),
                mapFlagY(0.5, 0.5, flagBox)
            ],
            [
                mapFlagX(0.1, 0.84, flagBox),
                mapFlagY(0.1, 0.84, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(0.9, 0.16, flagBox),
                mapFlagY(0.9, 0.16, flagBox)
            ],
            [
                mapFlagX(0.5, 0.5, flagBox),
                mapFlagY(0.5, 0.5, flagBox)
            ],
            [
                mapFlagX(0.9, 0.84, flagBox),
                mapFlagY(0.9, 0.84, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 28, -18, {
            stroke: "#b68b12",
            fill: "#ffd84c",
            hatch: "#ffec62"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawGeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.44, 0, 0.56, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#c83c4a", "#8f2633");
        [
            [
                0.24,
                0.23
            ],
            [
                0.76,
                0.23
            ],
            [
                0.24,
                0.77
            ],
            [
                0.76,
                0.77
            ]
        ].forEach(([u, v])=>{
            drawFlagBand(flagBox, u - 0.035, v - 0.11, u + 0.035, v + 0.11, "#c83c4a", "#8f2633");
            drawFlagBand(flagBox, u - 0.105, v - 0.035, u + 0.105, v + 0.035, "#c83c4a", "#8f2633");
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawGfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.gf);
    }
    function drawGgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.43, 0, 0.57, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.47, 0.18, 0.53, 0.82, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0.24, 0.47, 0.76, 0.53, "#f0c83a", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawGhFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18, {
            stroke: "#111615",
            fill: "#262d2b",
            hatch: "rgba(38, 45, 43, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawGiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.gi);
    }
    function drawGlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), 0.42 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFlagBand({
            x: mapFlagX(0.17, 0.5, flagBox),
            y: mapFlagY(0.5, 0.5, flagBox),
            width: 0.42 * flagBox.width,
            height: 0.22 * flagBox.height
        }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawGmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 1, 0.33, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.33, 1, 0.4, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.6, 1, 0.67, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.67, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawGnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f4cf34", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawGpFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.gp);
    }
    function drawGqFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.32, 0.5, flagBox),
                mapFlagY(0.32, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#2c6f9b",
            strokeWidth: 1.2,
            fill: "#4f9fd3",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawGrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        for(let row = 0; row < 9; row += 1){
            const fill = row % 2 === 0 ? "#2f78bd" : "#fbfdfa";
            const stroke = row % 2 === 0 ? "#20588e" : "#c7d1cc";
            drawFlagBand(flagBox, 0, row / 9, 1, (row + 1) / 9, fill, stroke);
        }
        drawFlagBand(flagBox, 0, 0, 0.38, 5 / 9, "#2f78bd", "#20588e");
        drawFlagBand(flagBox, 0.145, 0, 0.235, 5 / 9, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 9, 0.38, 3 / 9, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
        drawFlagBorder(flagBox);
    }
    function drawGsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.gs);
    }
    function drawGtFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#75a9d8", "#477aa5");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#75a9d8", "#477aa5");
        drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
        drawFlagBorder(flagBox);
    }
    function drawGuFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.gu);
    }
    function drawGwFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 0.33, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.33, 0, 1, 0.5, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0.33, 0.5, 1, 1, "#249064", "#176847");
        drawSketchStarWithColors(mapFlagX(0.165, 0.5, flagBox), mapFlagY(0.165, 0.5, flagBox), 26, -18, {
            stroke: "#111615",
            fill: "#262d2b",
            hatch: "rgba(38, 45, 43, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawGyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.9, 0.5, flagBox),
                mapFlagY(0.9, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 7,
            fill: "#f0c83a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(0, 0.05, flagBox),
                mapFlagY(0, 0.05, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 0.95, flagBox),
                mapFlagY(0, 0.95, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 5,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawHkFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        for(let i = 0; i < 5; i += 1){
            const angle = -Math.PI / 2 + 2 * Math.PI * i / 5;
            const petalX = cx + 42 * Math.cos(angle);
            const petalY = cy + 42 * Math.sin(angle);
            roughCanvas.circle(petalX, petalY, 42, {
                stroke: "#c7d1cc",
                strokeWidth: 1,
                fill: "#fbfdfa",
                fillStyle: "solid",
                roughness: 2.4,
                bowing: 1.2
            });
        }
        roughCanvas.circle(cx, cy, 22, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.1
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawHmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.hm);
    }
    function drawHnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#4f9fd3", "#2c6f9b");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#4f9fd3", "#2c6f9b");
        [
            [
                0.42,
                0.43
            ],
            [
                0.58,
                0.43
            ],
            [
                0.5,
                0.5
            ],
            [
                0.42,
                0.57
            ],
            [
                0.58,
                0.57
            ]
        ].forEach(([u, v], index)=>{
            drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 9, -18 + 4 * index, {
                stroke: "#2c6f9b",
                fill: "#4f9fd3",
                hatch: "#75b6de"
            });
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
        drawFlagBorder(flagBox);
    }
    function drawHrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#253f78", "#1b2c56");
        drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#c83c4a");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawHtFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.38, 0.38, 0.62, 0.62, "#fbfdfa", "#c7d1cc");
        drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawHuFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#71634e");
        drawFlagBorder(flagBox);
    }
    function drawIdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawIeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#ee8b2c", "#a9601d");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#75744a");
        drawFlagBorder(flagBox);
    }
    function drawIlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.16, 1, 0.26, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 0.74, 1, 0.84, "#2f4f9d", "#203a74");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 46, -30, {
            stroke: "#203a74",
            fill: "rgba(47, 79, 157, 0.08)",
            hatch: "#2f4f9d"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
        drawFlagBorder(flagBox);
    }
    function drawImFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.im);
    }
    function drawInFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        const wheelRadius = 34;
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#ee8b2c", "#a9601d");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.circle(cx, cy, 2 * wheelRadius, {
            stroke: "#203a74",
            strokeWidth: 1.4,
            fill: "transparent",
            roughness: 2.1,
            bowing: 1.1
        });
        for(let i = 0; i < 12; i += 1){
            const angle = 2 * Math.PI * i / 12;
            roughCanvas.line(cx, cy, cx + Math.cos(angle) * wheelRadius, cy + Math.sin(angle) * wheelRadius, {
                stroke: "#203a74",
                strokeWidth: 0.65,
                roughness: 2,
                bowing: 1.3
            });
        }
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
        drawFlagBorder(flagBox);
    }
    function drawIoFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.io);
    }
    function drawIqFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
        roughCanvas.line(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), mapFlagX(0.62, 0.5, flagBox), mapFlagY(0.62, 0.5, flagBox), {
            stroke: "#249064",
            strokeWidth: 5,
            roughness: 2.2,
            bowing: 1.5
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawIrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.47, 0.39, 0.53, 0.61, "#c83c4a", "#8f2633");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 20, -18, {
            stroke: "#8f2633",
            fill: "rgba(200, 60, 74, 0.18)",
            hatch: "#c83c4a"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawIsFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0.28, 0, 0.46, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.36, 1, 0.58, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.33, 0, 0.41, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.43, 1, 0.51, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4f4e86");
        drawFlagBorder(flagBox);
    }
    function drawJeFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.je);
    }
    function drawJmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.5, 0.5, flagBox),
                mapFlagY(0.5, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 1,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(1, 0, flagBox),
                mapFlagY(1, 0, flagBox)
            ],
            [
                mapFlagX(0.5, 0.5, flagBox),
                mapFlagY(0.5, 0.5, flagBox)
            ],
            [
                mapFlagX(1, 1, flagBox),
                mapFlagY(1, 1, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 1,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawCantonLine(flagBox, 0, 0, 1, 1, "#f0c83a", 26);
        drawCantonLine(flagBox, 1, 0, 0, 1, "#f0c83a", 26);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawJoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.44, 0.5, flagBox),
                mapFlagY(0.44, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.18, 0.5, flagBox), mapFlagY(0.18, 0.5, flagBox), 16, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawKeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 0.34, 1, 0.66, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 76, {
            stroke: "#111615",
            strokeWidth: 1.3,
            fill: "#b64f36",
            fillStyle: "hachure",
            hachureGap: 8,
            fillWeight: 0.55,
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.line(mapFlagX(0.42, 0.25, flagBox), mapFlagY(0.42, 0.25, flagBox), mapFlagX(0.58, 0.75, flagBox), mapFlagY(0.58, 0.75, flagBox), {
            stroke: "#fbfdfa",
            strokeWidth: 3,
            roughness: 2.2,
            bowing: 1.5
        });
        roughCanvas.line(mapFlagX(0.58, 0.25, flagBox), mapFlagY(0.58, 0.25, flagBox), mapFlagX(0.42, 0.75, flagBox), mapFlagY(0.42, 0.75, flagBox), {
            stroke: "#fbfdfa",
            strokeWidth: 3,
            roughness: 2.2,
            bowing: 1.5
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawKgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        roughCanvas.circle(cx, cy, 90, {
            stroke: "#b68b12",
            strokeWidth: 1.2,
            fill: "#ffd84c",
            fillStyle: "hachure",
            hachureGap: 9,
            fillWeight: 0.7,
            roughness: 2.3,
            bowing: 1.2
        });
        for(let i = 0; i < 8; i += 1){
            const angle = 2 * Math.PI * i / 8;
            roughCanvas.line(cx, cy, cx + 68 * Math.cos(angle), cy + 68 * Math.sin(angle), {
                stroke: "#c83c4a",
                strokeWidth: 1,
                roughness: 2,
                bowing: 1.3
            });
        }
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawKhFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0.38, 0.48, 0.62, 0.66, "#fbfdfa", "#c7d1cc");
        roughCanvas.polygon([
            [
                mapFlagX(0.4, 0.48, flagBox),
                mapFlagY(0.4, 0.48, flagBox)
            ],
            [
                mapFlagX(0.5, 0.34, flagBox),
                mapFlagY(0.5, 0.34, flagBox)
            ],
            [
                mapFlagX(0.6, 0.48, flagBox),
                mapFlagY(0.6, 0.48, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawKiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ki);
    }
    function drawKmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1.2,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 54, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.2, 0.5, flagBox), mapFlagY(0.2, 0.5, flagBox), 48, {
            stroke: "#176847",
            strokeWidth: 1,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawKnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(1, 0, flagBox),
                mapFlagY(1, 0, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ],
            [
                mapFlagX(1, 1, flagBox),
                mapFlagY(1, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawCantonLine(flagBox, 0, 1, 1, 0, "#f0c83a", 46);
        drawCantonLine(flagBox, 0, 1, 1, 0, "#262d2b", 28);
        [
            [
                0.38,
                0.58
            ],
            [
                0.62,
                0.42
            ]
        ].forEach(([u, v])=>drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 18, -18, {
                stroke: "#c7d1cc",
                fill: "#fbfdfa",
                hatch: "rgba(251, 253, 250, 0.7)"
            }));
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawKpFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 1, 0.18, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.18, 1, 0.24, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.76, 1, 0.82, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.82, 1, 1, "#253f78", "#1b2c56");
        roughCanvas.circle(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), 82, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), 30, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawKrFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.kr);
    }
    function drawKwFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.28, 1 / 3, flagBox),
                mapFlagY(0.28, 1 / 3, flagBox)
            ],
            [
                mapFlagX(0.28, 2 / 3, flagBox),
                mapFlagY(0.28, 2 / 3, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 1.2,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawKyFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ky);
    }
    function drawKzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
        drawFlagBand(flagBox, 0.08, 0.08, 0.12, 0.92, "#f0c83a", "#a98218");
        roughCanvas.circle(mapFlagX(0.55, 0.42, flagBox), mapFlagY(0.55, 0.42, flagBox), 76, {
            stroke: "#b68b12",
            strokeWidth: 1,
            fill: "#ffd84c",
            fillStyle: "hachure",
            hachureGap: 8,
            fillWeight: 0.6,
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.line(mapFlagX(0.42, 0.62, flagBox), mapFlagY(0.42, 0.62, flagBox), mapFlagX(0.68, 0.62, flagBox), mapFlagY(0.68, 0.62, flagBox), {
            stroke: "#a98218",
            strokeWidth: 5,
            roughness: 2.2,
            bowing: 1.6
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
        drawFlagBorder(flagBox);
    }
    function drawLaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#273f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#273f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 0.34 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4f4e86");
        drawFlagBorder(flagBox);
    }
    function drawLbFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0.5, 0.34, flagBox),
                mapFlagY(0.5, 0.34, flagBox)
            ],
            [
                mapFlagX(0.6, 0.6, flagBox),
                mapFlagY(0.6, 0.6, flagBox)
            ],
            [
                mapFlagX(0.53, 0.6, flagBox),
                mapFlagY(0.53, 0.6, flagBox)
            ],
            [
                mapFlagX(0.53, 0.68, flagBox),
                mapFlagY(0.53, 0.68, flagBox)
            ],
            [
                mapFlagX(0.47, 0.68, flagBox),
                mapFlagY(0.47, 0.68, flagBox)
            ],
            [
                mapFlagX(0.47, 0.6, flagBox),
                mapFlagY(0.47, 0.6, flagBox)
            ],
            [
                mapFlagX(0.4, 0.6, flagBox),
                mapFlagY(0.4, 0.6, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1.2,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawLcFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
        roughCanvas.polygon([
            [
                mapFlagX(0.5, 0.2, flagBox),
                mapFlagY(0.5, 0.2, flagBox)
            ],
            [
                mapFlagX(0.73, 0.78, flagBox),
                mapFlagY(0.73, 0.78, flagBox)
            ],
            [
                mapFlagX(0.27, 0.78, flagBox),
                mapFlagY(0.27, 0.78, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 1.2,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.polygon([
            [
                mapFlagX(0.5, 0.29, flagBox),
                mapFlagY(0.5, 0.29, flagBox)
            ],
            [
                mapFlagX(0.64, 0.74, flagBox),
                mapFlagY(0.64, 0.74, flagBox)
            ],
            [
                mapFlagX(0.36, 0.74, flagBox),
                mapFlagY(0.36, 0.74, flagBox)
            ]
        ], {
            stroke: "#a98218",
            strokeWidth: 1.1,
            fill: "#f0c83a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
        drawFlagBorder(flagBox);
    }
    function drawLiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.li);
    }
    function drawLkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.lk);
    }
    function drawLrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        for(let row = 0; row < 11; row += 1)if (row % 2 === 0) drawFlagBand(flagBox, 0, row / 11, 1, (row + 1) / 11, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 0.36, 5 / 11, "#253f78", "#1b2c56");
        drawSketchStarWithColors(mapFlagX(0.18, 0.23, flagBox), mapFlagY(0.18, 0.23, flagBox), 18, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawLsFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.3, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.3, 1, 0.7, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0.5, 0.42, flagBox),
                mapFlagY(0.5, 0.42, flagBox)
            ],
            [
                mapFlagX(0.6, 0.62, flagBox),
                mapFlagY(0.6, 0.62, flagBox)
            ],
            [
                mapFlagX(0.4, 0.62, flagBox),
                mapFlagY(0.4, 0.62, flagBox)
            ]
        ], {
            stroke: "#111615",
            strokeWidth: 1.2,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.line(mapFlagX(0.38, 0.63, flagBox), mapFlagY(0.38, 0.63, flagBox), mapFlagX(0.62, 0.63, flagBox), mapFlagY(0.62, 0.63, flagBox), {
            stroke: "#262d2b",
            strokeWidth: 4,
            roughness: 2.2,
            bowing: 1.5
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
        drawFlagBorder(flagBox);
    }
    function drawLtFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawLuFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#56a9d8", "#35789d");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6d7082");
        drawFlagBorder(flagBox);
    }
    function drawLvFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#8b2934", "#63202a");
        drawFlagBand(flagBox, 0, 0, 1, 0.4, "#8b2934", "#63202a");
        drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.6, 1, 1, "#8b2934", "#63202a");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#63202a");
        drawFlagBorder(flagBox);
    }
    function drawLyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
        roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), 0.25 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), 0.22 * flagBox.height, {
            stroke: "#111615",
            strokeWidth: 1,
            fill: "#262d2b",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.6, 0.5, flagBox), mapFlagY(0.6, 0.5, flagBox), 18, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#111615");
        drawFlagBorder(flagBox);
    }
    function drawMaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 54, -18, {
            stroke: "#176847",
            fill: "rgba(36, 144, 100, 0.16)",
            hatch: "#249064"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawMcFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawMdFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.md);
    }
    function drawMeFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.me);
    }
    function drawMfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mf);
    }
    function drawMgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.35, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.35, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.35, 0.5, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#71634e");
        drawFlagBorder(flagBox);
    }
    function drawMhFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mh);
    }
    function drawMkFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const cx = mapFlagX(0.5, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        for(let i = 0; i < 8; i += 1){
            const angle = 2 * Math.PI * i / 8;
            roughCanvas.line(cx, cy, cx + Math.cos(angle) * flagBox.width * 0.55, cy + Math.sin(angle) * flagBox.height * 0.55, {
                stroke: "#f0c83a",
                strokeWidth: 13,
                roughness: 2.3,
                bowing: 1.5
            });
        }
        roughCanvas.circle(cx, cy, 76, {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#ffd84c",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawMlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawMmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 58, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawMnFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mn);
    }
    function drawMoFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mo);
    }
    function drawMpFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mp);
    }
    function drawMqFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mq);
    }
    function drawMrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#176847", "#0f4f37");
        drawFlagBand(flagBox, 0, 0, 1, 0.18, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.82, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.5, 0.47, flagBox), mapFlagY(0.5, 0.47, flagBox), 0.32 * flagBox.height, {
            stroke: "#b68b12",
            strokeWidth: 1.2,
            fill: "transparent",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.5, 0.41, flagBox), mapFlagY(0.5, 0.41, flagBox), 0.3 * flagBox.height, {
            stroke: "#0f4f37",
            strokeWidth: 1,
            fill: "#176847",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStar(mapFlagX(0.5, 0.38, flagBox), mapFlagY(0.5, 0.38, flagBox), 25, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
        drawFlagBorder(flagBox);
    }
    function drawMsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ms);
    }
    function drawMtFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mt);
    }
    function drawMuFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
        drawFlagBorder(flagBox);
    }
    function drawMvFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.18, 0.22, 0.82, 0.78, "#176847", "#0f4f37");
        roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), 0.27 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), 0.24 * flagBox.height, {
            stroke: "#0f4f37",
            strokeWidth: 1,
            fill: "#176847",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawMwFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.circle(mapFlagX(0.5, 0.19, flagBox), mapFlagY(0.5, 0.19, flagBox), 56, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "hachure",
            hachureGap: 8,
            fillWeight: 0.7,
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawMxFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.mx);
    }
    function drawMyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        for(let row = 0; row < 14; row += 1)if (row % 2 === 0) drawFlagBand(flagBox, 0, row / 14, 1, (row + 1) / 14, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 0.48, 0.55, "#253f78", "#1b2c56");
        roughCanvas.circle(mapFlagX(0.22, 0.28, flagBox), mapFlagY(0.22, 0.28, flagBox), 54, {
            stroke: "#b68b12",
            strokeWidth: 1,
            fill: "#ffd84c",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.26, 0.28, flagBox), mapFlagY(0.26, 0.28, flagBox), 48, {
            stroke: "#1b2c56",
            strokeWidth: 1,
            fill: "#253f78",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStar(mapFlagX(0.34, 0.28, flagBox), mapFlagY(0.34, 0.28, flagBox), 20, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawMzFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 0.35, 1, 0.65, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 0.7, 1, 1, "#f0c83a", "#a98218");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStar(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 22, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawNaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#253f78", "#1b2c56");
        roughCanvas.polygon([
            [
                mapFlagX(1, 0, flagBox),
                mapFlagY(1, 0, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ],
            [
                mapFlagX(1, 1, flagBox),
                mapFlagY(1, 1, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawCantonLine(flagBox, 0, 1, 1, 0, "#fbfdfa", 38);
        drawCantonLine(flagBox, 0, 1, 1, 0, "#c83c4a", 22);
        roughCanvas.circle(mapFlagX(0.2, 0.22, flagBox), mapFlagY(0.2, 0.22, flagBox), 48, {
            stroke: "#b68b12",
            strokeWidth: 1,
            fill: "#ffd84c",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.7,
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawNcFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.nc);
    }
    function drawNeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#ee8b2c", "#a9601d");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 42, {
            stroke: "#a9601d",
            strokeWidth: 1,
            fill: "#ee8b2c",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
        drawFlagBorder(flagBox);
    }
    function drawNfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.nf);
    }
    function drawNgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawNiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ni);
    }
    function drawNlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#b63842", "#7d2530");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#2f4f9d", "#203a74");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#634b67");
        drawFlagBorder(flagBox);
    }
    function drawNoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.28, 0, 0.46, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.36, 1, 0.58, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.33, 0, 0.41, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.43, 1, 0.51, "#253f78", "#1b2c56");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawNpFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.np);
    }
    function drawNrFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.nr);
    }
    function drawNuFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.nu);
    }
    function drawNzFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.nz);
    }
    function drawOmFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.25, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.25, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0.25, 2 / 3, 1, 1, "#249064", "#176847");
        drawShieldBadge(flagBox, 0.125, 0.2, "#fbfdfa", "#c7d1cc");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawPaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 0.5, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0.5, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.5, 0.5, 1, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0.5, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
        drawSketchStarWithColors(mapFlagX(0.25, 0.25, flagBox), mapFlagY(0.25, 0.25, flagBox), 22, -18, {
            stroke: "#203a74",
            fill: "#2f4f9d",
            hatch: "#4770bd"
        });
        drawSketchStarWithColors(mapFlagX(0.75, 0.75, flagBox), mapFlagY(0.75, 0.75, flagBox), 22, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawPeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawPfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pf);
    }
    function drawPgFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pg);
    }
    function drawPhFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.42, 0.5, flagBox),
                mapFlagY(0.42, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 34, {
            stroke: "#b68b12",
            strokeWidth: 1,
            fill: "#ffd84c",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawPkFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#176847", "#0f4f37");
        drawFlagBand(flagBox, 0, 0, 0.25, 1, "#fbfdfa", "#c7d1cc");
        roughCanvas.circle(mapFlagX(0.58, 0.47, flagBox), mapFlagY(0.58, 0.47, flagBox), 0.35 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.64, 0.45, flagBox), mapFlagY(0.64, 0.45, flagBox), 0.31 * flagBox.height, {
            stroke: "#0f4f37",
            strokeWidth: 1,
            fill: "#176847",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.68, 0.34, flagBox), mapFlagY(0.68, 0.34, flagBox), 24, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
        drawFlagBorder(flagBox);
    }
    function drawPlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawPmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pm);
    }
    function drawPnFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pn);
    }
    function drawPrFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pr);
    }
    function drawPsFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.38, 0.5, flagBox),
                mapFlagY(0.38, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawPtFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pt);
    }
    function drawPwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.pw);
    }
    function drawPyFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.py);
    }
    function drawQaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const teeth = 9;
        const zigzag = [
            [
                mapFlagX(0.25, 0, flagBox),
                mapFlagY(0.25, 0, flagBox)
            ]
        ];
        for(let i = 0; i < teeth; i += 1){
            zigzag.push([
                mapFlagX(0.36, (i + 0.5) / teeth, flagBox),
                mapFlagY(0.36, (i + 0.5) / teeth, flagBox)
            ]);
            zigzag.push([
                mapFlagX(0.25, (i + 1) / teeth, flagBox),
                mapFlagY(0.25, (i + 1) / teeth, flagBox)
            ]);
        }
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#7b314b", "#572439");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            ...zigzag,
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#572439");
        drawFlagBorder(flagBox);
    }
    function drawReFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.re);
    }
    function drawRoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705c4d");
        drawFlagBorder(flagBox);
    }
    function drawRsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.rs);
    }
    function drawRuFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#2f4f9d", "#203a74");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
        drawFlagBorder(flagBox);
    }
    function drawRwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.rw);
    }
    function drawSaFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sa);
    }
    function drawSbFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sb);
    }
    function drawScFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sc);
    }
    function drawSdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
        roughCanvas.polygon([
            [
                mapFlagX(0, 0, flagBox),
                mapFlagY(0, 0, flagBox)
            ],
            [
                mapFlagX(0.36, 0.5, flagBox),
                mapFlagY(0.36, 0.5, flagBox)
            ],
            [
                mapFlagX(0, 1, flagBox),
                mapFlagY(0, 1, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1.2,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawSeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#2f78bd", "#20588e");
        drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0.4, 1, 0.56, "#f0c83a", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
        drawFlagBorder(flagBox);
    }
    function drawSgFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
        roughCanvas.circle(mapFlagX(0.22, 0.25, flagBox), mapFlagY(0.22, 0.25, flagBox), 0.24 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.26, 0.25, flagBox), mapFlagY(0.26, 0.25, flagBox), 0.2 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        [
            [
                0.34,
                0.15
            ],
            [
                0.39,
                0.21
            ],
            [
                0.38,
                0.31
            ],
            [
                0.3,
                0.35
            ],
            [
                0.28,
                0.23
            ]
        ].forEach(([u, v], index)=>{
            drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 8, -18 + 5 * index, {
                stroke: "#c7d1cc",
                fill: "#fbfdfa",
                hatch: "rgba(251, 253, 250, 0.7)"
            });
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawShFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sh);
    }
    function drawSiFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.si);
    }
    function drawSjFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sj);
    }
    function drawSkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sk);
    }
    function drawSlFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#4f9fd3", "#2c6f9b");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
        drawFlagBorder(flagBox);
    }
    function drawSmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sm);
    }
    function drawSnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18, {
            stroke: "#176847",
            fill: "#249064",
            hatch: "#38a975"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
        drawFlagBorder(flagBox);
    }
    function drawSoFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
        drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 44, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
        drawFlagBorder(flagBox);
    }
    function drawSrFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sr);
    }
    function drawSsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ss);
    }
    function drawStFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.st);
    }
    function drawSvFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sv);
    }
    function drawSxFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sx);
    }
    function drawSyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
        drawSketchStarWithColors(mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox), 20, -18, {
            stroke: "#176847",
            fill: "#249064",
            hatch: "#38a975"
        });
        drawSketchStarWithColors(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), 20, -18, {
            stroke: "#176847",
            fill: "#249064",
            hatch: "#38a975"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawSzFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.sz);
    }
    function drawTcFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tc);
    }
    function drawTdFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
        drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
        drawFlagBorder(flagBox);
    }
    function drawTfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tf);
    }
    function drawTgFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tg);
    }
    function drawTjFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tj);
    }
    function drawTkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tk);
    }
    function drawTlFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tl);
    }
    function drawTmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tm);
    }
    function drawTnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 0.44 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), 0.25 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1.2,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), 0.21 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), 20, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawToFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.to);
    }
    function drawTrFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        roughCanvas.circle(mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox), 0.36 * flagBox.height, {
            stroke: "#c7d1cc",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), 0.29 * flagBox.height, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "#c83c4a",
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.59, 0.5, flagBox), mapFlagY(0.59, 0.5, flagBox), 26, -18, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawTtFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tt);
    }
    function drawTvFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tv);
    }
    function drawTwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tw);
    }
    function drawTzFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.tz);
    }
    function drawUaFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#f0c83a", "#a98218");
        drawFlagBand(flagBox, 0, 0, 1, 0.5, "#3d78bd", "#284f84");
        drawFlagBand(flagBox, 0, 0.5, 1, 1, "#f0c83a", "#a98218");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d7653");
        drawFlagBorder(flagBox);
    }
    function drawUgFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ug);
    }
    function drawUmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.um);
    }
    function drawUyFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        for(let row = 1; row < 9; row += 2)drawFlagBand(flagBox, 0, row / 9, 1, (row + 1) / 9, "#2f78bd", "#20588e");
        drawFlagBand(flagBox, 0, 0, 0.34, 5 / 9, "#fbfdfa", "#c7d1cc");
        roughCanvas.circle(mapFlagX(0.17, 0.27, flagBox), mapFlagY(0.17, 0.27, flagBox), 40, {
            stroke: "#b68b12",
            strokeWidth: 1.2,
            fill: "#ffd84c",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.8,
            roughness: 2.2,
            bowing: 1.2
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
        drawFlagBorder(flagBox);
    }
    function drawUzFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.uz);
    }
    function drawVcFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.vc);
    }
    function drawVeFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ve);
    }
    function drawVgFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.vg);
    }
    function drawViFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.vi);
    }
    function drawVnFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#c83c4a", "#8f2633");
        drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 54, -18);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
        drawFlagBorder(flagBox);
    }
    function drawVuFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.vu);
    }
    function drawWfFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.wf);
    }
    function drawWsFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.ws);
    }
    function drawXkFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.xk);
    }
    function drawYeFlag() {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
        drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
        drawFlagBorder(flagBox);
    }
    function drawYtFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.yt);
    }
    function drawZaFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.za);
    }
    function drawZmFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.zm);
    }
    function drawZwFlag() {
        drawSampledFlagTemplate(TEMPLATE_FLAGS.zw);
    }
    function makeStandardFlagBox() {
        return {
            x: 118,
            y: 174,
            width: 486,
            height: 342
        };
    }
    function drawFlagShadow(flag) {
        roughCanvas.polygon(offsetPoints(flag, 8, 10), {
            stroke: "transparent",
            fill: PALETTE.shadow,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    }
    function drawBlankFlag(flag, fill, stroke) {
        roughCanvas.polygon(flag, {
            stroke,
            strokeWidth: 2.4,
            fill,
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
        });
    }
    function drawFlagBorder(flagBox) {
        roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
            stroke: "#28332e",
            strokeWidth: 2,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
    function drawUnionJackCanton(flagBox) {
        const canton = {
            x: flagBox.x,
            y: flagBox.y,
            width: 0.5 * flagBox.width,
            height: 0.5 * flagBox.height
        };
        drawFlagBand(canton, 0, 0, 1, 1, "#314d7c", "#20375e");
        drawCantonLine(canton, 0, 0, 1, 1, "#fbfdfa", 13);
        drawCantonLine(canton, 1, 0, 0, 1, "#fbfdfa", 13);
        drawCantonLine(canton, 0, 0, 1, 1, "#c83c4a", 5);
        drawCantonLine(canton, 1, 0, 0, 1, "#c83c4a", 5);
        drawFlagBand(canton, 0.42, 0, 0.58, 1, "#fbfdfa", "#c7d1cc");
        drawFlagBand(canton, 0, 0.38, 1, 0.62, "#fbfdfa", "#c7d1cc");
        drawFlagBand(canton, 0.46, 0, 0.54, 1, "#c83c4a", "#8f2633");
        drawFlagBand(canton, 0, 0.44, 1, 0.56, "#c83c4a", "#8f2633");
    }
    function drawCantonLine(flagBox, u0, v0, u1, v1, stroke, strokeWidth) {
        roughCanvas.line(mapFlagX(u0, v0, flagBox), mapFlagY(u0, v0, flagBox), mapFlagX(u1, v1, flagBox), mapFlagY(u1, v1, flagBox), {
            stroke,
            strokeWidth,
            roughness: 2.4,
            bowing: 1.6
        });
    }
    function drawSpainEmblem(flagBox) {
        const cx = mapFlagX(0.31, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        const shieldWidth = 44;
        const shieldHeight = 58;
        const shield = [
            [
                cx - shieldWidth / 2 + jitter(1.4),
                cy - shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx + shieldWidth / 2 + jitter(1.4),
                cy - shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx + 0.42 * shieldWidth + jitter(1.4),
                cy + 0.22 * shieldHeight + jitter(1.4)
            ],
            [
                cx + jitter(1.2),
                cy + shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx - 0.42 * shieldWidth + jitter(1.4),
                cy + 0.22 * shieldHeight + jitter(1.4)
            ]
        ];
        roughCanvas.polygon(shield, {
            stroke: "#6f2a2b",
            strokeWidth: 1.25,
            fill: "#d8483f",
            fillStyle: "solid",
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.rectangle(cx - 14 + jitter(1), cy - 18 + jitter(1), 28, 25, {
            stroke: "#a77613",
            strokeWidth: 0.9,
            fill: "#f4d24a",
            fillStyle: "hachure",
            hachureGap: 6,
            fillWeight: 0.75,
            roughness: 1.9,
            bowing: 1.1
        });
        roughCanvas.circle(cx, cy - 42, 19, {
            stroke: "#8b6418",
            strokeWidth: 1,
            fill: "#f4d24a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStar(cx, cy - 44, 7, 0);
        roughCanvas.line(cx - 24, cy - 33, cx + 24, cy - 33 + jitter(2), {
            stroke: "#8b6418",
            strokeWidth: 1.05,
            roughness: 2.3,
            bowing: 1.6
        });
    }
    function drawVaticanEmblem(flagBox) {
        const cx = mapFlagX(0.74, 0.53, flagBox);
        const cy = mapFlagY(0.53, 0.53, flagBox);
        roughCanvas.line(cx - 44, cy + 42, cx + 36, cy - 46, {
            stroke: "#b78716",
            strokeWidth: 4.2,
            roughness: 2.5,
            bowing: 1.8
        });
        roughCanvas.line(cx + 44, cy + 42, cx - 36, cy - 46, {
            stroke: "#a7adb1",
            strokeWidth: 4.2,
            roughness: 2.5,
            bowing: 1.8
        });
        roughCanvas.circle(cx - 36, cy - 42, 27, {
            stroke: "#8b6418",
            strokeWidth: 1.5,
            fill: "#f4d24a",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.85,
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.circle(cx + 36, cy - 42, 27, {
            stroke: "#7d858a",
            strokeWidth: 1.5,
            fill: "#dce2e0",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.85,
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.circle(cx, cy - 58, 34, {
            stroke: "#a98218",
            strokeWidth: 1.5,
            fill: "#f7e1a0",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.3
        });
        roughCanvas.rectangle(cx - 24 + jitter(1), cy - 72 + jitter(1), 48, 24, {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "hachure",
            hachureGap: 6,
            fillWeight: 0.7,
            roughness: 2,
            bowing: 1.2
        });
        roughCanvas.line(cx - 34, cy - 19, cx + 34, cy - 19 + jitter(2), {
            stroke: "#c23d45",
            strokeWidth: 3.2,
            roughness: 2.4,
            bowing: 1.5
        });
    }
    function drawFlagBand(flagBox, u0, v0, u1, v1, fill, stroke) {
        roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
            stroke,
            strokeWidth: 1.2,
            fill,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
            stroke: softenColor(stroke, 0.28),
            strokeWidth: 0.65,
            fill,
            fillStyle: "hachure",
            hachureAngle: -12,
            hachureGap: 12,
            fillWeight: 0.55,
            roughness: 2
        });
    }
    function drawUSStars(flagBox) {
        const startX = 0.055;
        const endX = 0.395;
        const startY = 0.055;
        const endY = 0.49;
        for(let row = 0; row < 9; row += 1){
            const stars = row % 2 === 0 ? 6 : 5;
            const rowOffset = row % 2 === 0 ? 0 : 0.5;
            for(let column = 0; column < stars; column += 1){
                const u = startX + (column + rowOffset) / 5.5 * (endX - startX);
                const v = startY + row / 8 * (endY - startY);
                const x = mapFlagX(u, v, flagBox);
                const y = mapFlagY(u, v, flagBox);
                drawSketchStar(x, y, 6.4, -18 + 2 * row);
            }
        }
    }
    function drawShieldBadge(flagBox, u, v, fill, accent) {
        const cx = mapFlagX(u, v, flagBox);
        const cy = mapFlagY(u, v, flagBox);
        const width = 0.13 * flagBox.width;
        const height = 0.22 * flagBox.height;
        roughCanvas.polygon([
            [
                cx - width / 2,
                cy - height / 2
            ],
            [
                cx + width / 2,
                cy - height / 2
            ],
            [
                cx + 0.42 * width,
                cy + 0.16 * height
            ],
            [
                cx,
                cy + height / 2
            ],
            [
                cx - 0.42 * width,
                cy + 0.16 * height
            ]
        ], {
            stroke: softenColor(accent, 0.75),
            strokeWidth: 1.2,
            fill,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.15
        });
        roughCanvas.line(cx - 0.32 * width, cy, cx + 0.32 * width, cy, {
            stroke: accent,
            strokeWidth: 1,
            roughness: 2.1,
            bowing: 1.4
        });
        roughCanvas.line(cx, cy - 0.36 * height, cx, cy + 0.28 * height, {
            stroke: accent,
            strokeWidth: 1,
            roughness: 2.1,
            bowing: 1.4
        });
    }
    function drawSampledFlagTemplate(flagEmoji) {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const source = rasterizeFlagEmoji(flagEmoji, 460);
        const segments = collectFlagSegments(source, flagBox, 18, 12);
        const dominant = getDominantFlagColor(segments) || "#d94444";
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#b9c4c0");
        drawTemplateBaseWash(flag, dominant);
        drawTemplateFlagSegments(segments);
        drawTemplateDetailMarks(source, flagBox, dominant);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
        drawFlagBorder(flagBox);
    }
    function drawGenericFlag(flagEmoji) {
        drawSampledFlag(flagEmoji, {
            detailLimit: 180,
            hachureGap: 18,
            textureWeight: 0.38
        });
    }
    function drawTemplateBaseWash(flag, dominant) {
        roughCanvas.polygon(flag, {
            stroke: softenColor(dominant, 0.34),
            strokeWidth: 1.1,
            fill: dominant,
            fillStyle: "hachure",
            hachureAngle: -10,
            hachureGap: 18,
            fillWeight: 0.32,
            roughness: 2.1,
            bowing: 1.15
        });
    }
    function drawTemplateFlagSegments(segments) {
        segments.filter((segment)=>segment.area > 420).forEach((segment, index)=>{
            roughCanvas.polygon(segment.outline, {
                stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.12)" : softenColor(segment.color, 0.4),
                strokeWidth: segment.isLightNeutral ? 0.55 : 1.05,
                fill: segment.color,
                fillStyle: "solid",
                roughness: 2.35,
                bowing: 1.32
            });
            if (!segment.isLightNeutral && (segment.area > 2600 || index % 3 === 0)) roughCanvas.polygon(segment.outline, {
                stroke: "rgba(38, 49, 45, 0.09)",
                strokeWidth: 0.45,
                fill: segment.color,
                fillStyle: "hachure",
                hachureAngle: -12,
                hachureGap: 15,
                fillWeight: 0.42,
                roughness: 1.95
            });
        });
    }
    function drawTemplateDetailMarks(source, flagBox, dominant) {
        const { data, bounds } = source;
        const pixels = data.data;
        const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
        const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
        const step = Math.max(14, Math.floor(data.width / 30));
        let detailCount = 0;
        for(let y = bounds.minY + step; y < bounds.maxY - step; y += step)for(let x = bounds.minX + step; x < bounds.maxX - step; x += step){
            const index = (y * data.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 64 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) continue;
            const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
            const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
            if (isLightNeutral && detailCount % 4 !== 0) continue;
            const u = (x - bounds.minX) / contentWidth;
            const v = (y - bounds.minY) / contentHeight;
            const px = mapFlagX(u, v, flagBox) + jitter(1.5);
            const py = mapFlagY(u, v, flagBox) + jitter(1.5);
            const color = "rgba(" + metrics.red + ", " + metrics.green + ", " + metrics.blue + ", " + (isLightNeutral ? 0.42 : 0.76) + ")";
            if (!isLightNeutral && metrics.brightness > 150 && metrics.saturation > 42 && detailCount % 5 === 0) drawSketchStarWithColors(px, py, randomBetween(6, 9), -18 + 3 * detailCount, {
                stroke: softenColor(color, 0.45),
                fill: color,
                hatch: softenColor(color, 0.24)
            });
            else roughCanvas.circle(px, py, randomBetween(5.2, 9.4), {
                stroke: isLightNeutral ? "rgba(38, 49, 45, 0.2)" : softenColor(color, 0.46),
                strokeWidth: isLightNeutral ? 0.55 : 0.9,
                fill: color,
                fillStyle: "solid",
                roughness: 2.2,
                bowing: 1.15
            });
            if (!isLightNeutral && detailCount % 6 === 0) roughCanvas.line(px + jitter(5), py + jitter(4), px + jitter(16), py + jitter(10), {
                stroke: "rgba(38, 49, 45, 0.2)",
                strokeWidth: randomBetween(0.45, 0.75),
                roughness: 2.4,
                bowing: 1.7
            });
            detailCount += 1;
            if (detailCount > 38) return;
        }
        if (detailCount < 4) roughCanvas.line(flagBox.x + 0.18 * flagBox.width, flagBox.y + 0.5 * flagBox.height + jitter(7), flagBox.x + 0.82 * flagBox.width, flagBox.y + 0.5 * flagBox.height + jitter(7), {
            stroke: softenColor(dominant, 0.2),
            strokeWidth: 0.65,
            roughness: 2.4,
            bowing: 1.8
        });
    }
    function drawSampledFlag(flagEmoji, options) {
        const flagBox = makeStandardFlagBox();
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        const source = rasterizeFlagEmoji(flagEmoji, 560);
        const segments = collectFlagSegments(source, flagBox);
        const dominant = getDominantFlagColor(segments) || "#d94444";
        drawFlagShadow(flag);
        drawBlankFlag(flag, "#fbfdfa", "#b9c4c0");
        roughCanvas.polygon(flag, {
            stroke: softenColor(dominant, 0.34),
            strokeWidth: 1.1,
            fill: dominant,
            fillStyle: "hachure",
            hachureAngle: -10,
            hachureGap: options.hachureGap,
            fillWeight: options.textureWeight,
            roughness: 2.1,
            bowing: 1.15
        });
        segments.forEach((segment)=>{
            roughCanvas.polygon(segment.outline, {
                stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.08)" : softenColor(segment.color, 0.42),
                strokeWidth: segment.isLightNeutral ? 0.35 : 0.75,
                fill: segment.color,
                fillStyle: "solid",
                roughness: 2.25,
                bowing: 1.35
            });
            if (!segment.isLightNeutral && segment.shouldTexture) roughCanvas.polygon(segment.outline, {
                stroke: "rgba(38, 49, 45, 0.08)",
                strokeWidth: 0.35,
                fill: segment.color,
                fillStyle: "hachure",
                hachureAngle: -12,
                hachureGap: 20,
                fillWeight: 0.3,
                roughness: 1.8
            });
        });
        drawFlagImageDetails(source, flagBox, options.detailLimit);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
        drawFlagBorder(flagBox);
    }
    function drawFlagImageDetails(source, flagBox, maxDetails = 180) {
        const { data, bounds } = source;
        const pixels = data.data;
        const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
        const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
        const step = Math.max(5, Math.floor(data.width / 88));
        let detailCount = 0;
        let candidateCount = 0;
        for(let y = bounds.minY + step; y < bounds.maxY - step; y += step)for(let x = bounds.minX + step; x < bounds.maxX - step; x += step){
            const index = (y * data.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 48 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) continue;
            const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
            const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
            candidateCount += 1;
            if (isLightNeutral && candidateCount % 3 !== 0) continue;
            const u = (x - bounds.minX) / contentWidth;
            const v = (y - bounds.minY) / contentHeight;
            const px = mapFlagX(u, v, flagBox) + jitter(1.4);
            const py = mapFlagY(u, v, flagBox) + jitter(1.4);
            const color = `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.48 : 0.82})`;
            roughCanvas.circle(px, py, randomBetween(3.4, 6.8), {
                stroke: isLightNeutral ? "rgba(38, 49, 45, 0.18)" : softenColor(color, 0.5),
                strokeWidth: isLightNeutral ? 0.5 : 0.8,
                fill: color,
                fillStyle: "solid",
                roughness: 2.1,
                bowing: 1.1
            });
            if (!isLightNeutral && detailCount % 4 === 0) roughCanvas.line(px + jitter(5), py + jitter(5), px + jitter(14), py + jitter(12), {
                stroke: "rgba(38, 49, 45, 0.24)",
                strokeWidth: randomBetween(0.45, 0.8),
                roughness: 2.4,
                bowing: 1.6
            });
            detailCount += 1;
            if (detailCount > maxDetails) return;
        }
    }
    function isFlagDetailPixel(pixels, width, height, x, y, distance) {
        const index = (y * width + x) * 4;
        const centerAlpha = pixels[index + 3];
        const offsets = [
            [
                -distance,
                0
            ],
            [
                distance,
                0
            ],
            [
                0,
                -distance
            ],
            [
                0,
                distance
            ],
            [
                -distance,
                -distance
            ],
            [
                distance,
                distance
            ]
        ];
        return offsets.some(([dx, dy])=>{
            const nextX = Math.min(width - 1, Math.max(0, x + dx));
            const nextY = Math.min(height - 1, Math.max(0, y + dy));
            const nextIndex = (nextY * width + nextX) * 4;
            const alpha = pixels[nextIndex + 3];
            if (Math.abs(centerAlpha - alpha) > 90 || alpha < 32) return true;
            const diff = Math.abs(pixels[index] - pixels[nextIndex]) + Math.abs(pixels[index + 1] - pixels[nextIndex + 1]) + Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);
            return diff > 118;
        });
    }
    function makeSketchRect(x, y, width, height) {
        const steps = 6;
        const edgeJitter = 5.2;
        const alongJitter = 2.2;
        const points = [];
        for(let i = 0; i <= steps; i += 1)points.push([
            x + width * i / steps + jitter(alongJitter),
            y + jitter(edgeJitter)
        ]);
        for(let i = 0; i <= steps; i += 1)points.push([
            x + width + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
        for(let i = steps; i >= 0; i -= 1)points.push([
            x + width * i / steps + jitter(alongJitter),
            y + height + jitter(edgeJitter)
        ]);
        for(let i = steps; i >= 0; i -= 1)points.push([
            x + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
        return points;
    }
    function drawFabricStrokes(x, y, width, height, color) {
        for(let i = 0; i < 5; i += 1){
            const px = x + width * (i + 0.6) / 7 + jitter(10);
            roughCanvas.line(px, y + jitter(14), px + jitter(18), y + height + jitter(14), {
                stroke: color,
                strokeWidth: randomBetween(0.55, 1.05),
                roughness: 2.2,
                bowing: 2.4
            });
        }
        for(let i = 0; i < 3; i += 1){
            const py = y + height * (i + 0.8) / 5 + jitter(8);
            roughCanvas.line(x + jitter(10), py, x + width + jitter(10), py + jitter(18), {
                stroke: color,
                strokeWidth: randomBetween(0.45, 0.85),
                roughness: 2.4,
                bowing: 1.9
            });
        }
    }
    function drawSketchStar(cx, cy, radius, rotationDegrees) {
        drawSketchStarWithColors(cx, cy, radius, rotationDegrees, {
            stroke: "#b68b12",
            fill: "#ffd84c",
            hatch: "#ffec62"
        });
    }
    function drawSketchStarWithColors(cx, cy, radius, rotationDegrees, colors) {
        const points = [];
        const rotation = rotationDegrees * Math.PI / 180 - Math.PI / 2;
        for(let i = 0; i < 10; i += 1){
            const angle = rotation + i * Math.PI / 5;
            const pointRadius = i % 2 === 0 ? radius : 0.42 * radius;
            points.push([
                cx + Math.cos(angle) * pointRadius + jitter(0.05 * radius),
                cy + Math.sin(angle) * pointRadius + jitter(0.05 * radius)
            ]);
        }
        roughCanvas.polygon(points, {
            stroke: colors.stroke,
            strokeWidth: Math.max(1.2, 0.08 * radius),
            fill: colors.fill,
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.polygon(points, {
            stroke: colors.hatch,
            strokeWidth: Math.max(0.8, 0.04 * radius),
            fill: colors.fill,
            fillStyle: "hachure",
            hachureAngle: -22,
            hachureGap: Math.max(6, 0.22 * radius),
            fillWeight: 1,
            roughness: 2.2
        });
    }
    function rasterizeFlagEmoji(flagEmoji, offscreenSize) {
        const offscreen = document.createElement("canvas");
        offscreen.width = offscreenSize * DEVICE_PIXEL_RATIO;
        offscreen.height = offscreenSize * DEVICE_PIXEL_RATIO;
        const offscreenCtx = offscreen.getContext("2d", {
            willReadFrequently: true
        });
        offscreenCtx.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
        offscreenCtx.clearRect(0, 0, offscreenSize, offscreenSize);
        offscreenCtx.textAlign = "center";
        offscreenCtx.textBaseline = "middle";
        offscreenCtx.font = `${Math.round(0.68 * offscreenSize)}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
        offscreenCtx.fillText(flagEmoji, offscreenSize / 2, offscreenSize / 2 + 0.02 * offscreenSize);
        const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        return {
            data: imageData,
            bounds: findPixelBounds(imageData)
        };
    }
    function collectFlagSegments(source, flagBox, columns = 64, rows = 40) {
        const { data, bounds } = source;
        const pixels = data.data;
        const segments = [];
        const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
        const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
        for(let row = 0; row < rows; row += 1){
            let run = null;
            for(let column = 0; column < columns; column += 1){
                const u0 = column / columns;
                const v0 = row / rows;
                const u1 = (column + 1) / columns;
                const v1 = (row + 1) / rows;
                const sample = sampleFlagCell(pixels, data.width, bounds, contentWidth, contentHeight, u0, v0, u1, v1);
                if (!sample || sample.alpha < 42) {
                    if (run) {
                        segments.push(createFlagSegment(run, row, columns, rows, flagBox));
                        run = null;
                    }
                    continue;
                }
                const metrics = normalizeFlagMetrics(sample.metrics);
                const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
                const bucket = getFlagSegmentBucket(metrics, isLightNeutral);
                const cell = {
                    column,
                    metrics,
                    isLightNeutral,
                    bucket
                };
                if (run && run.bucket === bucket) {
                    run.endColumn = column;
                    run.cells.push(cell);
                } else {
                    if (run) segments.push(createFlagSegment(run, row, columns, rows, flagBox));
                    run = {
                        bucket,
                        startColumn: column,
                        endColumn: column,
                        cells: [
                            cell
                        ]
                    };
                }
            }
            if (run) segments.push(createFlagSegment(run, row, columns, rows, flagBox));
        }
        return segments;
    }
    function sampleFlagCell(pixels, width, bounds, contentWidth, contentHeight, u0, v0, u1, v1) {
        const points = [
            [
                (u0 + u1) / 2,
                (v0 + v1) / 2
            ],
            [
                u0 + (u1 - u0) * 0.28,
                v0 + (v1 - v0) * 0.35
            ],
            [
                u0 + (u1 - u0) * 0.72,
                v0 + (v1 - v0) * 0.35
            ],
            [
                u0 + (u1 - u0) * 0.28,
                v0 + (v1 - v0) * 0.72
            ],
            [
                u0 + (u1 - u0) * 0.72,
                v0 + (v1 - v0) * 0.72
            ]
        ];
        const totals = points.reduce((acc, [u, v])=>{
            const x = Math.round(bounds.minX + u * contentWidth);
            const y = Math.round(bounds.minY + v * contentHeight);
            const index = (y * width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 30) return acc;
            acc.red += pixels[index];
            acc.green += pixels[index + 1];
            acc.blue += pixels[index + 2];
            acc.alpha += alpha;
            acc.count += 1;
            return acc;
        }, {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
            count: 0
        });
        if (!totals.count) return null;
        const red = Math.round(totals.red / totals.count);
        const green = Math.round(totals.green / totals.count);
        const blue = Math.round(totals.blue / totals.count);
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        return {
            alpha: totals.alpha / totals.count,
            metrics: {
                red,
                green,
                blue,
                brightness: (red + green + blue) / 3,
                saturation: max - min
            }
        };
    }
    function normalizeFlagMetrics(metrics) {
        const isSystemHighlight = metrics.saturation < 28 && metrics.brightness > 110;
        if (isSystemHighlight) return {
            red: 250,
            green: 252,
            blue: 249,
            brightness: 250.3,
            saturation: 3
        };
        return metrics;
    }
    function getFlagSegmentBucket(metrics, isLightNeutral) {
        if (isLightNeutral) return "light";
        return `${34 * Math.round(metrics.red / 34)}-${34 * Math.round(metrics.green / 34)}-${34 * Math.round(metrics.blue / 34)}`;
    }
    function createFlagSegment(run, row, columns, rows, flagBox) {
        const metrics = averageMetrics(run.cells);
        const isLightNeutral = run.cells.filter((cell)=>cell.isLightNeutral).length > 0.58 * run.cells.length;
        const u0 = run.startColumn / columns;
        const u1 = (run.endColumn + 1) / columns;
        const v0 = row / rows;
        const v1 = (row + 1) / rows;
        return {
            color: `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.88 : 0.98})`,
            metrics,
            isLightNeutral,
            area: (run.endColumn - run.startColumn + 1) * flagBox.width * flagBox.height / (columns * rows),
            shouldTexture: row % 4 === 0 && run.endColumn - run.startColumn > 2,
            outline: makeFlagCellOutline(u0, v0, u1, v1, flagBox)
        };
    }
    function averageMetrics(cells) {
        const totals = cells.reduce((acc, cell)=>{
            acc.red += cell.metrics.red;
            acc.green += cell.metrics.green;
            acc.blue += cell.metrics.blue;
            return acc;
        }, {
            red: 0,
            green: 0,
            blue: 0
        });
        const count = cells.length || 1;
        const red = Math.round(totals.red / count);
        const green = Math.round(totals.green / count);
        const blue = Math.round(totals.blue / count);
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        return {
            red,
            green,
            blue,
            brightness: (red + green + blue) / 3,
            saturation: max - min
        };
    }
    function getDominantFlagColor(cells) {
        const groups = new Map();
        cells.forEach((cell)=>{
            if (cell.isLightNeutral) return;
            const key = `${36 * Math.round(cell.metrics.red / 36)}-${36 * Math.round(cell.metrics.green / 36)}-${36 * Math.round(cell.metrics.blue / 36)}`;
            const current = groups.get(key) || {
                count: 0,
                red: 0,
                green: 0,
                blue: 0
            };
            current.count += 1;
            current.red += cell.metrics.red;
            current.green += cell.metrics.green;
            current.blue += cell.metrics.blue;
            groups.set(key, current);
        });
        const dominant = [
            ...groups.values()
        ].sort((a, b)=>b.count - a.count)[0];
        if (!dominant) return null;
        return `rgb(${Math.round(dominant.red / dominant.count)}, ${Math.round(dominant.green / dominant.count)}, ${Math.round(dominant.blue / dominant.count)})`;
    }
    function makeFlagCellOutline(u0, v0, u1, v1, flagBox) {
        const overlapU = 0.003;
        const overlapV = 0.004;
        const points = [
            [
                u0 - overlapU,
                v0 - overlapV
            ],
            [
                (u0 + u1) / 2,
                v0 - overlapV + jitter(0.0006)
            ],
            [
                u1 + overlapU,
                v0 - overlapV
            ],
            [
                u1 + overlapU,
                (v0 + v1) / 2
            ],
            [
                u1 + overlapU,
                v1 + overlapV
            ],
            [
                (u0 + u1) / 2,
                v1 + overlapV + jitter(0.0006)
            ],
            [
                u0 - overlapU,
                v1 + overlapV
            ],
            [
                u0 - overlapU,
                (v0 + v1) / 2
            ]
        ];
        return points.map(([u, v])=>[
                mapFlagX(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45),
                mapFlagY(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45)
            ]);
    }
    function mapFlagX(u, v, flagBox) {
        return flagBox.x + flagBox.width * u;
    }
    function mapFlagY(u, v, flagBox) {
        return flagBox.y + flagBox.height * v;
    }
    function findPixelBounds(imageData) {
        const { data, width, height } = imageData;
        const bounds = {
            minX: width,
            minY: height,
            maxX: 0,
            maxY: 0
        };
        for(let y = 0; y < height; y += 1)for(let x = 0; x < width; x += 1)if (!(data[(y * width + x) * 4 + 3] < 24)) {
            bounds.minX = Math.min(bounds.minX, x);
            bounds.minY = Math.min(bounds.minY, y);
            bounds.maxX = Math.max(bounds.maxX, x);
            bounds.maxY = Math.max(bounds.maxY, y);
        }
        if (bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) return {
            minX: 0,
            minY: 0,
            maxX: width,
            maxY: height
        };
        return bounds;
    }
    function getColorMetrics(pixels, index) {
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        return {
            red,
            green,
            blue,
            brightness: (red + green + blue) / 3,
            saturation: max - min
        };
    }
    function offsetPoints(points, x, y) {
        return points.map((point)=>[
                point[0] + x,
                point[1] + y
            ]);
    }
    function softenColor(color, alpha) {
        const channels = color.match(/rgba?\(([^)]+)\)/);
        if (!channels) return color;
        return `rgba(${channels[1].split(",").slice(0, 3).join(",")}, ${alpha})`;
    }
    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }
    function jitter(amount) {
        return randomBetween(-amount, amount);
    }
})();
