

/** 默认绘制国旗，供非法输入回退共用。 */ const DEFAULT_FLAG = "🇨🇳";
/** 已有专门手写模板的国旗 emoji，避免绘制分支散落字面量。 */ const TEMPLATE_FLAGS = {
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
    tw: "",
    tz: "🇹🇿",
    ua: "🇺🇦",
    ug: "🇺🇬",
    um: "🇺🇲",
    un: "🇺🇳",
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
/** Unicode 区域指示符起始码点，两个区域指示符组成国旗 emoji。 */ const REGION_INDICATOR_MIN_CODE_POINT = 0x1f1e6;
/** Unicode 区域指示符结束码点，用于限制国旗 emoji 的合法范围。 */ const REGION_INDICATOR_MAX_CODE_POINT = 0x1f1ff;
/** 离屏 emoji 栅格化时使用的像素倍率，保证高分屏采样足够细。 */ const DEVICE_PIXEL_RATIO = typeof globalThis !== "undefined" && "devicePixelRatio" in globalThis && typeof globalThis.devicePixelRatio === "number" ? globalThis.devicePixelRatio : 1;
/** 浅色 / 深色色板，与 index.html CSS 变量保持一致。 */ const PALETTES = {
    light: {
        paper: "#fbfdfa",
        frame: "#d9e3db",
        shadow: "rgba(36, 49, 44, 0.08)"
    },
    dark: {
        paper: "#1a221e",
        frame: "#2d3a34",
        shadow: "rgba(0, 0, 0, 0.28)"
    }
};
/** 默认浅色色板，兼容直接引用 PALETTE 的调用方。 */ const PALETTE = PALETTES.light;
let activeDrawTheme = "light";
/** 返回当前绘制主题下的色板。 */ function getPalette() {
    return PALETTES[activeDrawTheme];
}
/** 切换绘制主题，切换后需对已有 canvas 重新调用 draw。 */ function setDrawTheme(theme) {
    activeDrawTheme = theme;
}
/** 读取当前绘制主题。 */ function getDrawTheme() {
    return activeDrawTheme;
}

function rough_esm_t(t,e,s){if(t&&t.length){const[n,o]=e,a=Math.PI/180*s,h=Math.cos(a),r=Math.sin(a);for(const e of t){const[t,s]=e;e[0]=(t-n)*h-(s-o)*r+n,e[1]=(t-n)*r+(s-o)*h+o}}}function rough_esm_e(t,e){return t[0]===e[0]&&t[1]===e[1]}function rough_esm_s(s,n,o,a=1){const h=o,r=Math.max(n,.1),i=s[0]&&s[0][0]&&"number"==typeof s[0][0]?[s]:s,c=[0,0];if(h)for(const e of i)rough_esm_t(e,c,h);const l=function(t,s,n){const o=[];for(const s of t){const t=[...s];rough_esm_e(t[0],t[t.length-1])||t.push([t[0][0],t[0][1]]),t.length>2&&o.push(t)}const a=[];s=Math.max(s,.1);const h=[];for(const t of o)for(let e=0;e<t.length-1;e++){const s=t[e],n=t[e+1];if(s[1]!==n[1]){const t=Math.min(s[1],n[1]);h.push({ymin:t,ymax:Math.max(s[1],n[1]),x:t===s[1]?s[0]:n[0],islope:(n[0]-s[0])/(n[1]-s[1])})}}if(h.sort(((t,e)=>t.ymin<e.ymin?-1:t.ymin>e.ymin?1:t.x<e.x?-1:t.x>e.x?1:t.ymax===e.ymax?0:(t.ymax-e.ymax)/Math.abs(t.ymax-e.ymax))),!h.length)return a;let r=[],i=h[0].ymin,c=0;for(;r.length||h.length;){if(h.length){let t=-1;for(let e=0;e<h.length&&!(h[e].ymin>i);e++)t=e;h.splice(0,t+1).forEach((t=>{r.push({s:i,edge:t})}))}if(r=r.filter((t=>!(t.edge.ymax<=i))),r.sort(((t,e)=>t.edge.x===e.edge.x?0:(t.edge.x-e.edge.x)/Math.abs(t.edge.x-e.edge.x))),(1!==n||c%s==0)&&r.length>1)for(let t=0;t<r.length;t+=2){const e=t+1;if(e>=r.length)break;const s=r[t].edge,n=r[e].edge;a.push([[Math.round(s.x),i],[Math.round(n.x),i]])}i+=n,r.forEach((t=>{t.edge.x=t.edge.x+n*t.edge.islope})),c++}return a}(i,r,a);if(h){for(const e of i)rough_esm_t(e,c,-h);!function(e,s,n){const o=[];e.forEach((t=>o.push(...t))),rough_esm_t(o,s,n)}(l,c,-h)}return l}function rough_esm_n(t,e){var n;const o=e.hachureAngle+90;let a=e.hachureGap;a<0&&(a=4*e.strokeWidth),a=Math.round(Math.max(a,.1));let h=1;return e.roughness>=1&&((null===(n=e.randomizer)||void 0===n?void 0:n.next())||Math.random())>.7&&(h=a),rough_esm_s(t,a,o,h||1)}class rough_esm_o{constructor(t){this.helper=t}fillPolygons(t,e){return this._fillPolygons(t,e)}_fillPolygons(t,e){const s=rough_esm_n(t,e);return{type:"fillSketch",ops:this.renderLines(s,e)}}renderLines(t,e){const s=[];for(const n of t)s.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e));return s}}function rough_esm_a(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}class rough_esm_h extends rough_esm_o{fillPolygons(t,e){let s=e.hachureGap;s<0&&(s=4*e.strokeWidth),s=Math.max(s,.1);const o=rough_esm_n(t,Object.assign({},e,{hachureGap:s})),h=Math.PI/180*e.hachureAngle,r=[],i=.5*s*Math.cos(h),c=.5*s*Math.sin(h);for(const[t,e]of o)rough_esm_a([t,e])&&r.push([[t[0]-i,t[1]+c],[...e]],[[t[0]+i,t[1]-c],[...e]]);return{type:"fillSketch",ops:this.renderLines(r,e)}}}class rough_esm_r extends rough_esm_o{fillPolygons(t,e){const s=this._fillPolygons(t,e),n=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),o=this._fillPolygons(t,n);return s.ops=s.ops.concat(o.ops),s}}class rough_esm_i{constructor(t){this.helper=t}fillPolygons(t,e){const s=rough_esm_n(t,e=Object.assign({},e,{hachureAngle:0}));return this.dotsOnLines(s,e)}dotsOnLines(t,e){const s=[];let n=e.hachureGap;n<0&&(n=4*e.strokeWidth),n=Math.max(n,.1);let o=e.fillWeight;o<0&&(o=e.strokeWidth/2);const h=n/4;for(const r of t){const t=rough_esm_a(r),i=t/n,c=Math.ceil(i)-1,l=t-c*n,u=(r[0][0]+r[1][0])/2-n/4,p=Math.min(r[0][1],r[1][1]);for(let t=0;t<c;t++){const a=p+l+t*n,r=u-h+2*Math.random()*h,i=a-h+2*Math.random()*h,c=this.helper.ellipse(r,i,o,o,e);s.push(...c.ops)}}return{type:"fillSketch",ops:s}}}class rough_esm_c{constructor(t){this.helper=t}fillPolygons(t,e){const s=rough_esm_n(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}dashedLine(t,e){const s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,n=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap,o=[];return t.forEach((t=>{const h=rough_esm_a(t),r=Math.floor(h/(s+n)),i=(h+n-r*(s+n))/2;let c=t[0],l=t[1];c[0]>l[0]&&(c=t[1],l=t[0]);const u=Math.atan((l[1]-c[1])/(l[0]-c[0]));for(let t=0;t<r;t++){const a=t*(s+n),h=a+s,r=[c[0]+a*Math.cos(u)+i*Math.cos(u),c[1]+a*Math.sin(u)+i*Math.sin(u)],l=[c[0]+h*Math.cos(u)+i*Math.cos(u),c[1]+h*Math.sin(u)+i*Math.sin(u)];o.push(...this.helper.doubleLineOps(r[0],r[1],l[0],l[1],e))}})),o}}class rough_esm_l{constructor(t){this.helper=t}fillPolygons(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,o=e.zigzagOffset<0?s:e.zigzagOffset,a=rough_esm_n(t,e=Object.assign({},e,{hachureGap:s+o}));return{type:"fillSketch",ops:this.zigzagLines(a,o,e)}}zigzagLines(t,e,s){const n=[];return t.forEach((t=>{const o=rough_esm_a(t),h=Math.round(o/(2*e));let r=t[0],i=t[1];r[0]>i[0]&&(r=t[1],i=t[0]);const c=Math.atan((i[1]-r[1])/(i[0]-r[0]));for(let t=0;t<h;t++){const o=2*t*e,a=2*(t+1)*e,h=Math.sqrt(2*Math.pow(e,2)),i=[r[0]+o*Math.cos(c),r[1]+o*Math.sin(c)],l=[r[0]+a*Math.cos(c),r[1]+a*Math.sin(c)],u=[i[0]+h*Math.cos(c+Math.PI/4),i[1]+h*Math.sin(c+Math.PI/4)];n.push(...this.helper.doubleLineOps(i[0],i[1],u[0],u[1],s),...this.helper.doubleLineOps(u[0],u[1],l[0],l[1],s))}})),n}}const rough_esm_u={};class rough_esm_p{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}const rough_esm_f=0,rough_esm_d=1,rough_esm_g=2,rough_esm_M={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0};function rough_esm_k(t,e){return t.type===e}function rough_esm_b(t){const e=[],s=function(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:rough_esm_f,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return[];e[e.length]={type:rough_esm_d,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:rough_esm_g,text:""},e}(t);let n="BOD",o=0,a=s[o];for(;!rough_esm_k(a,rough_esm_g);){let h=0;const r=[];if("BOD"===n){if("M"!==a.text&&"m"!==a.text)return rough_esm_b("M0,0"+t);o++,h=rough_esm_M[a.text],n=a.text}else rough_esm_k(a,rough_esm_d)?h=rough_esm_M[n]:(o++,h=rough_esm_M[a.text],n=a.text);if(!(o+h<s.length))throw new Error("Path data ended short");for(let t=o;t<o+h;t++){const e=s[t];if(!rough_esm_k(e,rough_esm_d))throw new Error("Param not a number: "+n+","+e.text);r[r.length]=+e.text}if("number"!=typeof rough_esm_M[n])throw new Error("Bad segment: "+n);{const t={key:n,data:r};e.push(t),o+=h,a=s[o],"M"===n&&(n="L"),"m"===n&&(n="l")}}return e}function rough_esm_y(t){let e=0,s=0,n=0,o=0;const a=[];for(const{key:h,data:r}of t)switch(h){case"M":a.push({key:"M",data:[...r]}),[e,s]=r,[n,o]=r;break;case"m":e+=r[0],s+=r[1],a.push({key:"M",data:[e,s]}),n=e,o=s;break;case"L":a.push({key:"L",data:[...r]}),[e,s]=r;break;case"l":e+=r[0],s+=r[1],a.push({key:"L",data:[e,s]});break;case"C":a.push({key:"C",data:[...r]}),e=r[4],s=r[5];break;case"c":{const t=r.map(((t,n)=>n%2?t+s:t+e));a.push({key:"C",data:t}),e=t[4],s=t[5];break}case"Q":a.push({key:"Q",data:[...r]}),e=r[2],s=r[3];break;case"q":{const t=r.map(((t,n)=>n%2?t+s:t+e));a.push({key:"Q",data:t}),e=t[2],s=t[3];break}case"A":a.push({key:"A",data:[...r]}),e=r[5],s=r[6];break;case"a":e+=r[5],s+=r[6],a.push({key:"A",data:[r[0],r[1],r[2],r[3],r[4],e,s]});break;case"H":a.push({key:"H",data:[...r]}),e=r[0];break;case"h":e+=r[0],a.push({key:"H",data:[e]});break;case"V":a.push({key:"V",data:[...r]}),s=r[0];break;case"v":s+=r[0],a.push({key:"V",data:[s]});break;case"S":a.push({key:"S",data:[...r]}),e=r[2],s=r[3];break;case"s":{const t=r.map(((t,n)=>n%2?t+s:t+e));a.push({key:"S",data:t}),e=t[2],s=t[3];break}case"T":a.push({key:"T",data:[...r]}),e=r[0],s=r[1];break;case"t":e+=r[0],s+=r[1],a.push({key:"T",data:[e,s]});break;case"Z":case"z":a.push({key:"Z",data:[]}),e=n,s=o}return a}function rough_esm_m(t){const e=[];let s="",n=0,o=0,a=0,h=0,r=0,i=0;for(const{key:c,data:l}of t){switch(c){case"M":e.push({key:"M",data:[...l]}),[n,o]=l,[a,h]=l;break;case"C":e.push({key:"C",data:[...l]}),n=l[4],o=l[5],r=l[2],i=l[3];break;case"L":e.push({key:"L",data:[...l]}),[n,o]=l;break;case"H":n=l[0],e.push({key:"L",data:[n,o]});break;case"V":o=l[0],e.push({key:"L",data:[n,o]});break;case"S":{let t=0,a=0;"C"===s||"S"===s?(t=n+(n-r),a=o+(o-i)):(t=n,a=o),e.push({key:"C",data:[t,a,...l]}),r=l[0],i=l[1],n=l[2],o=l[3];break}case"T":{const[t,a]=l;let h=0,c=0;"Q"===s||"T"===s?(h=n+(n-r),c=o+(o-i)):(h=n,c=o);const u=n+2*(h-n)/3,p=o+2*(c-o)/3,f=t+2*(h-t)/3,d=a+2*(c-a)/3;e.push({key:"C",data:[u,p,f,d,t,a]}),r=h,i=c,n=t,o=a;break}case"Q":{const[t,s,a,h]=l,c=n+2*(t-n)/3,u=o+2*(s-o)/3,p=a+2*(t-a)/3,f=h+2*(s-h)/3;e.push({key:"C",data:[c,u,p,f,a,h]}),r=t,i=s,n=a,o=h;break}case"A":{const t=Math.abs(l[0]),s=Math.abs(l[1]),a=l[2],h=l[3],r=l[4],i=l[5],c=l[6];if(0===t||0===s)e.push({key:"C",data:[n,o,i,c,i,c]}),n=i,o=c;else if(n!==i||o!==c){rough_esm_x(n,o,i,c,t,s,a,h,r).forEach((function(t){e.push({key:"C",data:t})})),n=i,o=c}break}case"Z":e.push({key:"Z",data:[]}),n=a,o=h}s=c}return e}function w(t,e,s){return[t*Math.cos(s)-e*Math.sin(s),t*Math.sin(s)+e*Math.cos(s)]}function rough_esm_x(t,e,s,n,o,a,h,r,i,c){const l=(u=h,Math.PI*u/180);var u;let p=[],f=0,d=0,g=0,M=0;if(c)[f,d,g,M]=c;else{[t,e]=w(t,e,-l),[s,n]=w(s,n,-l);const h=(t-s)/2,c=(e-n)/2;let u=h*h/(o*o)+c*c/(a*a);u>1&&(u=Math.sqrt(u),o*=u,a*=u);const p=o*o,k=a*a,b=p*k-p*c*c-k*h*h,y=p*c*c+k*h*h,m=(r===i?-1:1)*Math.sqrt(Math.abs(b/y));g=m*o*c/a+(t+s)/2,M=m*-a*h/o+(e+n)/2,f=Math.asin(parseFloat(((e-M)/a).toFixed(9))),d=Math.asin(parseFloat(((n-M)/a).toFixed(9))),t<g&&(f=Math.PI-f),s<g&&(d=Math.PI-d),f<0&&(f=2*Math.PI+f),d<0&&(d=2*Math.PI+d),i&&f>d&&(f-=2*Math.PI),!i&&d>f&&(d-=2*Math.PI)}let k=d-f;if(Math.abs(k)>120*Math.PI/180){const t=d,e=s,r=n;d=i&&d>f?f+120*Math.PI/180*1:f+120*Math.PI/180*-1,p=rough_esm_x(s=g+o*Math.cos(d),n=M+a*Math.sin(d),e,r,o,a,h,0,i,[d,t,g,M])}k=d-f;const b=Math.cos(f),y=Math.sin(f),m=Math.cos(d),P=Math.sin(d),v=Math.tan(k/4),S=4/3*o*v,O=4/3*a*v,L=[t,e],T=[t+S*y,e-O*b],D=[s+S*P,n-O*m],A=[s,n];if(T[0]=2*L[0]-T[0],T[1]=2*L[1]-T[1],c)return[T,D,A].concat(p);{p=[T,D,A].concat(p);const t=[];for(let e=0;e<p.length;e+=3){const s=w(p[e][0],p[e][1],l),n=w(p[e+1][0],p[e+1][1],l),o=w(p[e+2][0],p[e+2][1],l);t.push([s[0],s[1],n[0],n[1],o[0],o[1]])}return t}}const rough_esm_P={randOffset:function(t,e){return G(t,e)},randOffsetWithRange:function(t,e,s){return E(t,e,s)},ellipse:function(t,e,s,n,o){const a=rough_esm_T(s,n,o);return rough_esm_D(t,e,o,a).opset},doubleLineOps:function(t,e,s,n,o){return $(t,e,s,n,o,!0)}};function rough_esm_v(t,e,s,n,o){return{type:"path",ops:$(t,e,s,n,o)}}function rough_esm_S(t,e,s){const n=(t||[]).length;if(n>2){const o=[];for(let e=0;e<n-1;e++)o.push(...$(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&o.push(...$(t[n-1][0],t[n-1][1],t[0][0],t[0][1],s)),{type:"path",ops:o}}return 2===n?rough_esm_v(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function rough_esm_O(t,e,s,n,o){return function(t,e){return rough_esm_S(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function rough_esm_L(t,e){if(t.length){const s="number"==typeof t[0][0]?[t]:t,n=j(s[0],1*(1+.2*e.roughness),e),o=e.disableMultiStroke?[]:j(s[0],1.5*(1+.22*e.roughness),z(e));for(let t=1;t<s.length;t++){const a=s[t];if(a.length){const t=j(a,1*(1+.2*e.roughness),e),s=e.disableMultiStroke?[]:j(a,1.5*(1+.22*e.roughness),z(e));for(const e of t)"move"!==e.op&&n.push(e);for(const t of s)"move"!==t.op&&o.push(t)}}return{type:"path",ops:n.concat(o)}}return{type:"path",ops:[]}}function rough_esm_T(t,e,s){const n=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),o=Math.ceil(Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*n)),a=2*Math.PI/o;let h=Math.abs(t/2),r=Math.abs(e/2);const i=1-s.curveFitting;return h+=G(h*i,s),r+=G(r*i,s),{increment:a,rx:h,ry:r}}function rough_esm_D(t,e,s,n){const[o,a]=F(n.increment,t,e,n.rx,n.ry,1,n.increment*E(.1,E(.4,1,s),s),s);let h=q(o,null,s);if(!s.disableMultiStroke&&0!==s.roughness){const[o]=F(n.increment,t,e,n.rx,n.ry,1.5,0,s),a=q(o,null,s);h=h.concat(a)}return{estimatedPoints:a,opset:{type:"path",ops:h}}}function rough_esm_A(t,e,s,n,o,a,h,r,i){const c=t,l=e;let u=Math.abs(s/2),p=Math.abs(n/2);u+=G(.01*u,i),p+=G(.01*p,i);let f=o,d=a;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/i.curveStepCount,M=Math.min(g/2,(d-f)/2),k=V(M,c,l,u,p,f,d,1,i);if(!i.disableMultiStroke){const t=V(M,c,l,u,p,f,d,1.5,i);k.push(...t)}return h&&(r?k.push(...$(c,l,c+u*Math.cos(f),l+p*Math.sin(f),i),...$(c,l,c+u*Math.cos(d),l+p*Math.sin(d),i)):k.push({op:"lineTo",data:[c,l]},{op:"lineTo",data:[c+u*Math.cos(f),l+p*Math.sin(f)]})),{type:"path",ops:k}}function _(t,e){const s=rough_esm_m(rough_esm_y(rough_esm_b(t))),n=[];let o=[0,0],a=[0,0];for(const{key:t,data:h}of s)switch(t){case"M":a=[h[0],h[1]],o=[h[0],h[1]];break;case"L":n.push(...$(a[0],a[1],h[0],h[1],e)),a=[h[0],h[1]];break;case"C":{const[t,s,o,r,i,c]=h;n.push(...Z(t,s,o,r,i,c,a,e)),a=[i,c];break}case"Z":n.push(...$(a[0],a[1],o[0],o[1],e)),a=[o[0],o[1]]}return{type:"path",ops:n}}function I(t,e){const s=[];for(const n of t)if(n.length){const t=e.maxRandomnessOffset||0,o=n.length;if(o>2){s.push({op:"move",data:[n[0][0]+G(t,e),n[0][1]+G(t,e)]});for(let a=1;a<o;a++)s.push({op:"lineTo",data:[n[a][0]+G(t,e),n[a][1]+G(t,e)]})}}return{type:"fillPath",ops:s}}function C(t,e){return function(t,e){let s=t.fillStyle||"hachure";if(!rough_esm_u[s])switch(s){case"zigzag":rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_h(e));break;case"cross-hatch":rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_r(e));break;case"dots":rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_i(e));break;case"dashed":rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_c(e));break;case"zigzag-line":rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_l(e));break;default:s="hachure",rough_esm_u[s]||(rough_esm_u[s]=new rough_esm_o(e))}return rough_esm_u[s]}(e,rough_esm_P).fillPolygons(t,e)}function z(t){const e=Object.assign({},t);return e.randomizer=void 0,t.seed&&(e.seed=t.seed+1),e}function W(t){return t.randomizer||(t.randomizer=new rough_esm_p(t.seed||0)),t.randomizer.next()}function E(t,e,s,n=1){return s.roughness*n*(W(s)*(e-t)+t)}function G(t,e,s=1){return E(-t,t,e,s)}function $(t,e,s,n,o,a=!1){const h=a?o.disableMultiStrokeFill:o.disableMultiStroke,r=R(t,e,s,n,o,!0,!1);if(h)return r;const i=R(t,e,s,n,o,!0,!0);return r.concat(i)}function R(t,e,s,n,o,a,h){const r=Math.pow(t-s,2)+Math.pow(e-n,2),i=Math.sqrt(r);let c=1;c=i<200?1:i>500?.4:-.0016668*i+1.233334;let l=o.maxRandomnessOffset||0;l*l*100>r&&(l=i/10);const u=l/2,p=.2+.2*W(o);let f=o.bowing*o.maxRandomnessOffset*(n-e)/200,d=o.bowing*o.maxRandomnessOffset*(t-s)/200;f=G(f,o,c),d=G(d,o,c);const g=[],M=()=>G(u,o,c),k=()=>G(l,o,c),b=o.preserveVertices;return a&&(h?g.push({op:"move",data:[t+(b?0:M()),e+(b?0:M())]}):g.push({op:"move",data:[t+(b?0:G(l,o,c)),e+(b?0:G(l,o,c))]})),h?g.push({op:"bcurveTo",data:[f+t+(s-t)*p+M(),d+e+(n-e)*p+M(),f+t+2*(s-t)*p+M(),d+e+2*(n-e)*p+M(),s+(b?0:M()),n+(b?0:M())]}):g.push({op:"bcurveTo",data:[f+t+(s-t)*p+k(),d+e+(n-e)*p+k(),f+t+2*(s-t)*p+k(),d+e+2*(n-e)*p+k(),s+(b?0:k()),n+(b?0:k())]}),g}function j(t,e,s){if(!t.length)return[];const n=[];n.push([t[0][0]+G(e,s),t[0][1]+G(e,s)]),n.push([t[0][0]+G(e,s),t[0][1]+G(e,s)]);for(let o=1;o<t.length;o++)n.push([t[o][0]+G(e,s),t[o][1]+G(e,s)]),o===t.length-1&&n.push([t[o][0]+G(e,s),t[o][1]+G(e,s)]);return q(n,null,s)}function q(t,e,s){const n=t.length,o=[];if(n>3){const a=[],h=1-s.curveTightness;o.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<n;e++){const s=t[e];a[0]=[s[0],s[1]],a[1]=[s[0]+(h*t[e+1][0]-h*t[e-1][0])/6,s[1]+(h*t[e+1][1]-h*t[e-1][1])/6],a[2]=[t[e+1][0]+(h*t[e][0]-h*t[e+2][0])/6,t[e+1][1]+(h*t[e][1]-h*t[e+2][1])/6],a[3]=[t[e+1][0],t[e+1][1]],o.push({op:"bcurveTo",data:[a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;o.push({op:"lineTo",data:[e[0]+G(t,s),e[1]+G(t,s)]})}}else 3===n?(o.push({op:"move",data:[t[1][0],t[1][1]]}),o.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===n&&o.push(...R(t[0][0],t[0][1],t[1][0],t[1][1],s,!0,!0));return o}function F(t,e,s,n,o,a,h,r){const i=[],c=[];if(0===r.roughness){t/=4,c.push([e+n*Math.cos(-t),s+o*Math.sin(-t)]);for(let a=0;a<=2*Math.PI;a+=t){const t=[e+n*Math.cos(a),s+o*Math.sin(a)];i.push(t),c.push(t)}c.push([e+n*Math.cos(0),s+o*Math.sin(0)]),c.push([e+n*Math.cos(t),s+o*Math.sin(t)])}else{const l=G(.5,r)-Math.PI/2;c.push([G(a,r)+e+.9*n*Math.cos(l-t),G(a,r)+s+.9*o*Math.sin(l-t)]);const u=2*Math.PI+l-.01;for(let h=l;h<u;h+=t){const t=[G(a,r)+e+n*Math.cos(h),G(a,r)+s+o*Math.sin(h)];i.push(t),c.push(t)}c.push([G(a,r)+e+n*Math.cos(l+2*Math.PI+.5*h),G(a,r)+s+o*Math.sin(l+2*Math.PI+.5*h)]),c.push([G(a,r)+e+.98*n*Math.cos(l+h),G(a,r)+s+.98*o*Math.sin(l+h)]),c.push([G(a,r)+e+.9*n*Math.cos(l+.5*h),G(a,r)+s+.9*o*Math.sin(l+.5*h)])}return[c,i]}function V(t,e,s,n,o,a,h,r,i){const c=a+G(.1,i),l=[];l.push([G(r,i)+e+.9*n*Math.cos(c-t),G(r,i)+s+.9*o*Math.sin(c-t)]);for(let a=c;a<=h;a+=t)l.push([G(r,i)+e+n*Math.cos(a),G(r,i)+s+o*Math.sin(a)]);return l.push([e+n*Math.cos(h),s+o*Math.sin(h)]),l.push([e+n*Math.cos(h),s+o*Math.sin(h)]),q(l,null,i)}function Z(t,e,s,n,o,a,h,r){const i=[],c=[r.maxRandomnessOffset||1,(r.maxRandomnessOffset||1)+.3];let l=[0,0];const u=r.disableMultiStroke?1:2,p=r.preserveVertices;for(let f=0;f<u;f++)0===f?i.push({op:"move",data:[h[0],h[1]]}):i.push({op:"move",data:[h[0]+(p?0:G(c[0],r)),h[1]+(p?0:G(c[0],r))]}),l=p?[o,a]:[o+G(c[f],r),a+G(c[f],r)],i.push({op:"bcurveTo",data:[t+G(c[f],r),e+G(c[f],r),s+G(c[f],r),n+G(c[f],r),l[0],l[1]]});return i}function Q(t){return[...t]}function H(t,e=0){const s=t.length;if(s<3)throw new Error("A curve must have at least three points.");const n=[];if(3===s)n.push(Q(t[0]),Q(t[1]),Q(t[2]),Q(t[2]));else{const s=[];s.push(t[0],t[0]);for(let e=1;e<t.length;e++)s.push(t[e]),e===t.length-1&&s.push(t[e]);const o=[],a=1-e;n.push(Q(s[0]));for(let t=1;t+2<s.length;t++){const e=s[t];o[0]=[e[0],e[1]],o[1]=[e[0]+(a*s[t+1][0]-a*s[t-1][0])/6,e[1]+(a*s[t+1][1]-a*s[t-1][1])/6],o[2]=[s[t+1][0]+(a*s[t][0]-a*s[t+2][0])/6,s[t+1][1]+(a*s[t][1]-a*s[t+2][1])/6],o[3]=[s[t+1][0],s[t+1][1]],n.push(o[1],o[2],o[3])}}return n}function N(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)}function B(t,e,s){const n=N(e,s);if(0===n)return N(t,e);let o=((t[0]-e[0])*(s[0]-e[0])+(t[1]-e[1])*(s[1]-e[1]))/n;return o=Math.max(0,Math.min(1,o)),N(t,J(e,s,o))}function J(t,e,s){return[t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s]}function K(t,e,s,n){const o=n||[];if(function(t,e){const s=t[e+0],n=t[e+1],o=t[e+2],a=t[e+3];let h=3*n[0]-2*s[0]-a[0];h*=h;let r=3*n[1]-2*s[1]-a[1];r*=r;let i=3*o[0]-2*a[0]-s[0];i*=i;let c=3*o[1]-2*a[1]-s[1];return c*=c,h<i&&(h=i),r<c&&(r=c),h+r}(t,e)<s){const s=t[e+0];if(o.length){(a=o[o.length-1],h=s,Math.sqrt(N(a,h)))>1&&o.push(s)}else o.push(s);o.push(t[e+3])}else{const n=.5,a=t[e+0],h=t[e+1],r=t[e+2],i=t[e+3],c=J(a,h,n),l=J(h,r,n),u=J(r,i,n),p=J(c,l,n),f=J(l,u,n),d=J(p,f,n);K([a,c,p,d],0,s,o),K([d,f,u,i],0,s,o)}var a,h;return o}function U(t,e){return X(t,0,t.length,e)}function X(t,e,s,n,o){const a=o||[],h=t[e],r=t[s-1];let i=0,c=1;for(let n=e+1;n<s-1;++n){const e=B(t[n],h,r);e>i&&(i=e,c=n)}return Math.sqrt(i)>n?(X(t,e,c+1,n,a),X(t,c,s,n,a)):(a.length||a.push(h),a.push(r)),a}function Y(t,e=.15,s){const n=[],o=(t.length-1)/3;for(let s=0;s<o;s++){K(t,3*s,e,n)}return s&&s>0?X(n,0,n.length,s):n}const tt="none";class et{constructor(t){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,disableMultiStroke:!1,disableMultiStrokeFill:!1,preserveVertices:!1,fillShapeRoughnessGain:.8},this.config=t||{},this.config.options&&(this.defaultOptions=this._o(this.config.options))}static newSeed(){return Math.floor(Math.random()*2**31)}_o(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_d(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}line(t,e,s,n,o){const a=this._o(o);return this._d("line",[rough_esm_v(t,e,s,n,a)],a)}rectangle(t,e,s,n,o){const a=this._o(o),h=[],r=rough_esm_O(t,e,s,n,a);if(a.fill){const o=[[t,e],[t+s,e],[t+s,e+n],[t,e+n]];"solid"===a.fillStyle?h.push(I([o],a)):h.push(C([o],a))}return a.stroke!==tt&&h.push(r),this._d("rectangle",h,a)}ellipse(t,e,s,n,o){const a=this._o(o),h=[],r=rough_esm_T(s,n,a),i=rough_esm_D(t,e,a,r);if(a.fill)if("solid"===a.fillStyle){const s=rough_esm_D(t,e,a,r).opset;s.type="fillPath",h.push(s)}else h.push(C([i.estimatedPoints],a));return a.stroke!==tt&&h.push(i.opset),this._d("ellipse",h,a)}circle(t,e,s,n){const o=this.ellipse(t,e,s,s,n);return o.shape="circle",o}linearPath(t,e){const s=this._o(e);return this._d("linearPath",[rough_esm_S(t,!1,s)],s)}arc(t,e,s,n,o,a,h=!1,r){const i=this._o(r),c=[],l=rough_esm_A(t,e,s,n,o,a,h,!0,i);if(h&&i.fill)if("solid"===i.fillStyle){const h=Object.assign({},i);h.disableMultiStroke=!0;const r=rough_esm_A(t,e,s,n,o,a,!0,!1,h);r.type="fillPath",c.push(r)}else c.push(function(t,e,s,n,o,a,h){const r=t,i=e;let c=Math.abs(s/2),l=Math.abs(n/2);c+=G(.01*c,h),l+=G(.01*l,h);let u=o,p=a;for(;u<0;)u+=2*Math.PI,p+=2*Math.PI;p-u>2*Math.PI&&(u=0,p=2*Math.PI);const f=(p-u)/h.curveStepCount,d=[];for(let t=u;t<=p;t+=f)d.push([r+c*Math.cos(t),i+l*Math.sin(t)]);return d.push([r+c*Math.cos(p),i+l*Math.sin(p)]),d.push([r,i]),C([d],h)}(t,e,s,n,o,a,i));return i.stroke!==tt&&c.push(l),this._d("arc",c,i)}curve(t,e){const s=this._o(e),n=[],o=rough_esm_L(t,s);if(s.fill&&s.fill!==tt)if("solid"===s.fillStyle){const e=rough_esm_L(t,Object.assign(Object.assign({},s),{disableMultiStroke:!0,roughness:s.roughness?s.roughness+s.fillShapeRoughnessGain:0}));n.push({type:"fillPath",ops:this._mergedShape(e.ops)})}else{const e=[],o=t;if(o.length){const t="number"==typeof o[0][0]?[o]:o;for(const n of t)n.length<3?e.push(...n):3===n.length?e.push(...Y(H([n[0],n[0],n[1],n[2]]),10,(1+s.roughness)/2)):e.push(...Y(H(n),10,(1+s.roughness)/2))}e.length&&n.push(C([e],s))}return s.stroke!==tt&&n.push(o),this._d("curve",n,s)}polygon(t,e){const s=this._o(e),n=[],o=rough_esm_S(t,!0,s);return s.fill&&("solid"===s.fillStyle?n.push(I([t],s)):n.push(C([t],s))),s.stroke!==tt&&n.push(o),this._d("polygon",n,s)}path(t,e){const s=this._o(e),n=[];if(!t)return this._d("path",n,s);t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");const o=s.fill&&"transparent"!==s.fill&&s.fill!==tt,a=s.stroke!==tt,h=!!(s.simplification&&s.simplification<1),r=function(t,e,s){const n=rough_esm_m(rough_esm_y(rough_esm_b(t))),o=[];let a=[],h=[0,0],r=[];const i=()=>{r.length>=4&&a.push(...Y(r,e)),r=[]},c=()=>{i(),a.length&&(o.push(a),a=[])};for(const{key:t,data:e}of n)switch(t){case"M":c(),h=[e[0],e[1]],a.push(h);break;case"L":i(),a.push([e[0],e[1]]);break;case"C":if(!r.length){const t=a.length?a[a.length-1]:h;r.push([t[0],t[1]])}r.push([e[0],e[1]]),r.push([e[2],e[3]]),r.push([e[4],e[5]]);break;case"Z":i(),a.push([h[0],h[1]])}if(c(),!s)return o;const l=[];for(const t of o){const e=U(t,s);e.length&&l.push(e)}return l}(t,1,h?4-4*(s.simplification||1):(1+s.roughness)/2),i=_(t,s);if(o)if("solid"===s.fillStyle)if(1===r.length){const e=_(t,Object.assign(Object.assign({},s),{disableMultiStroke:!0,roughness:s.roughness?s.roughness+s.fillShapeRoughnessGain:0}));n.push({type:"fillPath",ops:this._mergedShape(e.ops)})}else n.push(I(r,s));else n.push(C(r,s));return a&&(h?r.forEach((t=>{n.push(rough_esm_S(t,!1,s))})):n.push(i)),this._d("path",n,s)}opsToPath(t,e){let s="";for(const n of t.ops){const t="number"==typeof e&&e>=0?n.data.map((t=>+t.toFixed(e))):n.data;switch(n.op){case"move":s+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":s+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"lineTo":s+=`L${t[0]} ${t[1]} `}}return s.trim()}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,n=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:tt};break;case"fillPath":e={d:this.opsToPath(t),stroke:tt,strokeWidth:0,fill:s.fill||tt};break;case"fillSketch":e=this.fillSketch(t,s)}e&&n.push(e)}return n}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||tt,strokeWidth:s,fill:tt}}_mergedShape(t){return t.filter(((t,e)=>0===e||"move"!==t.op))}}class st{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.gen=new et(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.ctx,o=t.options.fixedDecimalPlaceDigits;for(const a of e)switch(a.type){case"path":n.save(),n.strokeStyle="none"===s.stroke?"transparent":s.stroke,n.lineWidth=s.strokeWidth,s.strokeLineDash&&n.setLineDash(s.strokeLineDash),s.strokeLineDashOffset&&(n.lineDashOffset=s.strokeLineDashOffset),this._drawToContext(n,a,o),n.restore();break;case"fillPath":{n.save(),n.fillStyle=s.fill||"";const e="curve"===t.shape||"polygon"===t.shape||"path"===t.shape?"evenodd":"nonzero";this._drawToContext(n,a,o,e),n.restore();break}case"fillSketch":this.fillSketch(n,a,s)}}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2),t.save(),s.fillLineDash&&t.setLineDash(s.fillLineDash),s.fillLineDashOffset&&(t.lineDashOffset=s.fillLineDashOffset),t.strokeStyle=s.fill||"",t.lineWidth=n,this._drawToContext(t,e,s.fixedDecimalPlaceDigits),t.restore()}_drawToContext(t,e,s,n="nonzero"){t.beginPath();for(const n of e.ops){const e="number"==typeof s&&s>=0?n.data.map((t=>+t.toFixed(s))):n.data;switch(n.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill(n):t.stroke()}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,n,o){const a=this.gen.line(t,e,s,n,o);return this.draw(a),a}rectangle(t,e,s,n,o){const a=this.gen.rectangle(t,e,s,n,o);return this.draw(a),a}ellipse(t,e,s,n,o){const a=this.gen.ellipse(t,e,s,n,o);return this.draw(a),a}circle(t,e,s,n){const o=this.gen.circle(t,e,s,n);return this.draw(o),o}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,n,o,a,h=!1,r){const i=this.gen.arc(t,e,s,n,o,a,h,r);return this.draw(i),i}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const nt="http://www.w3.org/2000/svg";class ot{constructor(t,e){this.svg=t,this.gen=new et(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.svg.ownerDocument||window.document,o=n.createElementNS(nt,"g"),a=t.options.fixedDecimalPlaceDigits;for(const h of e){let e=null;switch(h.type){case"path":e=n.createElementNS(nt,"path"),e.setAttribute("d",this.opsToPath(h,a)),e.setAttribute("stroke",s.stroke),e.setAttribute("stroke-width",s.strokeWidth+""),e.setAttribute("fill","none"),s.strokeLineDash&&e.setAttribute("stroke-dasharray",s.strokeLineDash.join(" ").trim()),s.strokeLineDashOffset&&e.setAttribute("stroke-dashoffset",`${s.strokeLineDashOffset}`);break;case"fillPath":e=n.createElementNS(nt,"path"),e.setAttribute("d",this.opsToPath(h,a)),e.setAttribute("stroke","none"),e.setAttribute("stroke-width","0"),e.setAttribute("fill",s.fill||""),"curve"!==t.shape&&"polygon"!==t.shape||e.setAttribute("fill-rule","evenodd");break;case"fillSketch":e=this.fillSketch(n,h,s)}e&&o.appendChild(e)}return o}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2);const o=t.createElementNS(nt,"path");return o.setAttribute("d",this.opsToPath(e,s.fixedDecimalPlaceDigits)),o.setAttribute("stroke",s.fill||""),o.setAttribute("stroke-width",n+""),o.setAttribute("fill","none"),s.fillLineDash&&o.setAttribute("stroke-dasharray",s.fillLineDash.join(" ").trim()),s.fillLineDashOffset&&o.setAttribute("stroke-dashoffset",`${s.fillLineDashOffset}`),o}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t,e){return this.gen.opsToPath(t,e)}line(t,e,s,n,o){const a=this.gen.line(t,e,s,n,o);return this.draw(a)}rectangle(t,e,s,n,o){const a=this.gen.rectangle(t,e,s,n,o);return this.draw(a)}ellipse(t,e,s,n,o){const a=this.gen.ellipse(t,e,s,n,o);return this.draw(a)}circle(t,e,s,n){const o=this.gen.circle(t,e,s,n);return this.draw(o)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,n,o,a,h=!1,r){const i=this.gen.arc(t,e,s,n,o,a,h,r);return this.draw(i)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}var at={canvas:(t,e)=>new st(t,e),svg:(t,e)=>new ot(t,e),generator:t=>new et(t),newSeed:()=>et.newSeed()};


/** 当前正在绘制的 2D 上下文，由 withCanvas 在每次绘制前切换。 */ let ctx;
/** 当前正在绘制的 Rough.js 上下文，与 ctx 生命周期保持一致。 */ let render_context_roughCanvas;
/** 当前画布尺寸，绘制函数都按正方形画布坐标系工作。 */ let size = 0;
/** 临时切换全局绘制上下文，让同一套绘制函数可以服务单页画布和 QA 多画布。 */ function withCanvas(canvasElement, callback) {
    const previous = {
        ctx: ctx,
        roughCanvas: render_context_roughCanvas,
        size: size
    };
    const nextContext = canvasElement.getContext("2d", {
        willReadFrequently: true
    });
    if (!nextContext) {
        throw new Error("Canvas 2D context is not available.");
    }
    ctx = nextContext;
    render_context_roughCanvas = at.canvas(canvasElement);
    size = canvasElement.width;
    try {
        callback();
    } finally{
        ctx = previous.ctx;
        render_context_roughCanvas = previous.roughCanvas;
        size = previous.size;
    }
}



/** 中国国旗模板：红色旗面、布纹、五颗手绘五角星和最终边框。 */ function drawChinaFlag() {
    const flag = makeSketchRect(118, 174, 486, 342);
    render_context_roughCanvas.polygon(flag, {
        stroke: "#8c1f23",
        strokeWidth: 3.2,
        fill: "#de2f36",
        fillStyle: "solid",
        roughness: 2.4,
        bowing: 1.4
    });
    render_context_roughCanvas.polygon(flag, {
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
    render_context_roughCanvas.polygon(makeSketchRect(118, 174, 486, 342), {
        stroke: "#28332e",
        strokeWidth: 2.1,
        fill: "transparent",
        roughness: 2.8,
        bowing: 1.6
    });
}
/** 日本国旗模板：浅色旗面加中心红日，并叠加纸纹和边框。 */ function drawJapanFlag() {
    const flag = makeSketchRect(128, 172, 464, 344);
    const fieldWhite = "#fbfdfa";
    render_context_roughCanvas.polygon(flag, {
        stroke: "#d6ded7",
        strokeWidth: 2.4,
        fill: fieldWhite,
        fillStyle: "solid",
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon(flag, {
        stroke: "#d6ded7",
        strokeWidth: 2.4,
        fill: fieldWhite,
        fillStyle: "hachure",
        hachureAngle: -10,
        hachureGap: 17,
        fillWeight: 0.45,
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(360, 344, 166, {
        stroke: "#9f2936",
        strokeWidth: 2.4,
        fill: "#cf3346",
        fillStyle: "solid",
        roughness: 2.4,
        bowing: 1.3
    });
    render_context_roughCanvas.circle(360, 344, 155, {
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
    render_context_roughCanvas.polygon(flag, {
        stroke: "#28332e",
        strokeWidth: 1.6,
        fill: "transparent",
        roughness: 2.5,
        bowing: 1.5
    });
}
/** 美国国旗模板：按标准格子画 13 道条纹、蓝色 canton 和 50 颗星。 */ function drawUnitedStatesFlag() {
    const flagBox = {
        x: 118,
        y: 174,
        width: 486,
        height: 342
    };
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    render_context_roughCanvas.polygon(offsetPoints(flag, 8, 10), {
        stroke: "transparent",
        fill: getPalette().shadow,
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon(flag, {
        stroke: "#b9c4c0",
        strokeWidth: 2.4,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.4,
        bowing: 1.4
    });
    for(let row = 0; row < 13; row += 1){
        if (row % 2 !== 0) {
            continue;
        }
        drawFlagBand(flagBox, 0, row / 13, 1, (row + 1) / 13, "#c83c4a", "#8f2633");
    }
    drawFlagBand(flagBox, 0, 0, 0.43, 7 / 13, "#314d7c", "#20375e");
    drawUSStars(flagBox);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8d2d37");
    render_context_roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
        stroke: "#28332e",
        strokeWidth: 2,
        fill: "transparent",
        roughness: 2.8,
        bowing: 1.6
    });
}
/** 澳大利亚国旗模板：蓝底、左上联合旗和南十字星区域。 */ function drawAustraliaFlag() {
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
/** 泰国国旗模板：用归一化纵向比例绘制红白蓝白红五条横带。 */ function drawThailandFlag() {
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
/** 法国国旗模板：用三等分竖带绘制蓝白红三色旗。 */ function drawFranceFlag() {
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
/** 意大利国旗模板：用三等分竖带绘制绿白红三色旗。 */ function drawItalyFlag() {
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
/** 西班牙国旗模板：红黄红横带，并在左侧绘制简化徽章。 */ function drawSpainFlag() {
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
/** 梵蒂冈国旗模板：黄白双竖带，并绘制简化钥匙与冠饰。 */ function drawVaticanFlag() {
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
/** AD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAdFlag() {
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
/** AE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAeFlag() {
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
/** AF 国旗专门模板：黑红绿竖带，中部用简化徽章表达国徽。 */ function drawAfFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#262d2b", "#111615");
    drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(cx, cy, 68, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "rgba(251, 253, 250, 0.86)",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.7,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.rectangle(cx - 22 + jitter(1), cy - 16 + jitter(1), 44, 38, {
        stroke: "#6f5c38",
        strokeWidth: 1,
        fill: "transparent",
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx - 28, cy + 30, cx + 28, cy + 30 + jitter(2), {
        stroke: "#6f5c38",
        strokeWidth: 1.2,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b3538");
    drawFlagBorder(flagBox);
}
/** AG 国旗专门模板：红底、黑蓝白 V 形和中心旭日。 */ function drawAgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const topLeft = [
        mapFlagX(0, 0, flagBox),
        mapFlagY(0, 0, flagBox)
    ];
    const topRight = [
        mapFlagX(1, 0, flagBox),
        mapFlagY(1, 0, flagBox)
    ];
    const bottomCenter = [
        mapFlagX(0.5, 1, flagBox),
        mapFlagY(0.5, 1, flagBox)
    ];
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
        topLeft,
        topRight,
        bottomCenter
    ], {
        stroke: "#111615",
        strokeWidth: 1.2,
        fill: "#262d2b",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFlagBand(flagBox, 0.28, 0.48, 0.72, 0.64, "#2f5fa0", "#203a74");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0.28, 0.64, flagBox),
            mapFlagY(0.28, 0.64, flagBox)
        ],
        [
            mapFlagX(0.72, 0.64, flagBox),
            mapFlagY(0.72, 0.64, flagBox)
        ],
        bottomCenter
    ], {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.5, 0.36, flagBox), mapFlagY(0.5, 0.36, flagBox), 36, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** AI 国旗专门模板：蓝船旗、左上联合旗和右侧简化盾徽。 */ function drawAiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const badgeX = mapFlagX(0.74, 0.54, flagBox);
    const badgeY = mapFlagY(0.54, 0.54, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#243f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 1, "#243f78", "#1b2c56");
    drawUnionJackCanton(flagBox);
    drawShieldBadge(flagBox, 0.74, 0.54, "#fbfdfa", "#2f6fa4");
    render_context_roughCanvas.line(badgeX - 22, badgeY + 4, badgeX + 24, badgeY + 4 + jitter(2), {
        stroke: "#2f6fa4",
        strokeWidth: 2,
        roughness: 2.2,
        bowing: 1.5
    });
    drawSketchStarWithColors(badgeX, badgeY - 20, 9, -18, {
        stroke: "#b68b12",
        fill: "#ffd84c",
        hatch: "#ffec62"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** AL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAlFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** AM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAmFlag() {
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
/** AO 国旗专门模板：红黑横带，中心用星、弧线和短线简化齿轮与砍刀。 */ function drawAoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.52, 0.5, flagBox);
    const cy = mapFlagY(0.52, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#262d2b", "#111615");
    render_context_roughCanvas.circle(cx, cy + 4, 92, {
        stroke: "#d7a51d",
        strokeWidth: 6,
        fill: "transparent",
        roughness: 2.4,
        bowing: 1.4
    });
    render_context_roughCanvas.line(cx - 58, cy + 36, cx + 70, cy - 38, {
        stroke: "#d7a51d",
        strokeWidth: 7,
        roughness: 2.5,
        bowing: 1.6
    });
    drawSketchStar(cx - 20, cy - 24, 22, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** AQ 国旗专门模板：浅蓝旗面和简化南极洲轮廓。 */ function drawAqFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#75a9d8", "#477aa5");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0.28, 0.58, flagBox),
            mapFlagY(0.28, 0.58, flagBox)
        ],
        [
            mapFlagX(0.38, 0.42, flagBox),
            mapFlagY(0.38, 0.42, flagBox)
        ],
        [
            mapFlagX(0.53, 0.36, flagBox),
            mapFlagY(0.53, 0.36, flagBox)
        ],
        [
            mapFlagX(0.67, 0.46, flagBox),
            mapFlagY(0.67, 0.46, flagBox)
        ],
        [
            mapFlagX(0.75, 0.6, flagBox),
            mapFlagY(0.75, 0.6, flagBox)
        ],
        [
            mapFlagX(0.58, 0.7, flagBox),
            mapFlagY(0.58, 0.7, flagBox)
        ],
        [
            mapFlagX(0.45, 0.66, flagBox),
            mapFlagY(0.45, 0.66, flagBox)
        ],
        [
            mapFlagX(0.36, 0.72, flagBox),
            mapFlagY(0.36, 0.72, flagBox)
        ]
    ], {
        stroke: "#c7d1cc",
        strokeWidth: 1.4,
        fill: "#fbfdfa",
        fillStyle: "hachure",
        hachureGap: 10,
        fillWeight: 0.58,
        roughness: 2.3,
        bowing: 1.3
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
    drawFlagBorder(flagBox);
}
/** AR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawArFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#75a9d8", "#477aa5");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#75a9d8", "#477aa5");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 43, {
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
/** AS 国旗专门模板：蓝底、红白三角形和飞侧简化鹰徽。 */ function drawAsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const fly = [
        mapFlagX(1, 0.5, flagBox),
        mapFlagY(1, 0.5, flagBox)
    ];
    const badgeX = mapFlagX(0.72, 0.5, flagBox);
    const badgeY = mapFlagY(0.72, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#243f78", "#1b2c56");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        fly,
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ]
    ], {
        stroke: "#8f2633",
        strokeWidth: 9,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(badgeX - 30, badgeY, badgeX + 36, badgeY - 18 + jitter(3), {
        stroke: "#8b6418",
        strokeWidth: 4,
        roughness: 2.4,
        bowing: 1.6
    });
    drawSketchStarWithColors(badgeX - 8, badgeY - 20, 14, -18, {
        stroke: "#8b6418",
        fill: "#f4d24a",
        hatch: "#ffec62"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** AT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAtFlag() {
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
/** AW 国旗专门模板：蓝底、两道黄线和左上红白描边星。 */ function drawAwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#3d9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0.62, 1, 0.68, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.72, 1, 0.78, "#f0c83a", "#a98218");
    drawSketchStarWithColors(mapFlagX(0.2, 0.24, flagBox), mapFlagY(0.2, 0.24, flagBox), 29, -18, {
        stroke: "#fbfdfa",
        fill: "#c83c4a",
        hatch: "rgba(251, 253, 250, 0.52)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** AX 国旗专门模板：蓝底上绘制黄边红色北欧十字。 */ function drawAxFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0.27, 0, 0.45, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.38, 1, 0.62, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.32, 0, 0.4, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.44, 1, 0.56, "#c83c4a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** AZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawAzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#3d9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.24, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), flagBox.height * 0.2, {
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
/** BA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    render_context_roughCanvas.polygon([
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
    for(let i = 0; i < 8; i += 1){
        drawSketchStarWithColors(mapFlagX(0.36 + i * 0.055, 0.08 + i * 0.115, flagBox), mapFlagY(0.36 + i * 0.055, 0.08 + i * 0.115, flagBox), 10, -18 + i * 4, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** BB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBbFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#253f78", "#1b2c56");
    render_context_roughCanvas.line(cx, cy - 48, cx, cy + 54, {
        stroke: "#262d2b",
        strokeWidth: 4,
        roughness: 2.2,
        bowing: 1.4
    });
    render_context_roughCanvas.line(cx, cy - 10, cx - 24, cy - 42, {
        stroke: "#262d2b",
        strokeWidth: 3,
        roughness: 2.2,
        bowing: 1.4
    });
    render_context_roughCanvas.line(cx, cy - 10, cx + 24, cy - 42, {
        stroke: "#262d2b",
        strokeWidth: 3,
        roughness: 2.2,
        bowing: 1.4
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
    drawFlagBorder(flagBox);
}
/** BD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBdFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    render_context_roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), flagBox.height * 0.42, {
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
/** BE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBeFlag() {
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
/** BF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBfFlag() {
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
/** BG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBgFlag() {
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
/** BH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBhFlag() {
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
    render_context_roughCanvas.polygon([
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
/** BI 国旗专门模板：红绿四角、白色斜十字和中心三颗红星。 */ function drawBiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const centerX = mapFlagX(0.5, 0.5, flagBox);
    const centerY = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
        ],
        [
            centerX,
            centerY
        ]
    ], {
        stroke: "#8f2633",
        strokeWidth: 1,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ],
        [
            mapFlagX(1, 1, flagBox),
            mapFlagY(1, 1, flagBox)
        ],
        [
            centerX,
            centerY
        ]
    ], {
        stroke: "#8f2633",
        strokeWidth: 1,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawCantonLine(flagBox, 0, 0, 1, 1, "#fbfdfa", 30);
    drawCantonLine(flagBox, 1, 0, 0, 1, "#fbfdfa", 30);
    render_context_roughCanvas.circle(centerX, centerY, 98, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    [
        [
            0.5,
            0.43
        ],
        [
            0.45,
            0.56
        ],
        [
            0.55,
            0.56
        ]
    ].forEach(([u, v], index)=>drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 13, -18 + index * 8, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "rgba(200, 60, 74, 0.5)"
        }));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d5a48");
    drawFlagBorder(flagBox);
}
/** BJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBjFlag() {
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
/** BL 国旗专门模板：地区 emoji 常见渲染沿用法国三色旗。 */ function drawBlFlag() {
    drawFranceFlag();
}
/** BM 国旗专门模板：红船旗、左上联合旗和右侧简化盾徽。 */ function drawBmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawUnionJackCanton(flagBox);
    drawShieldBadge(flagBox, 0.74, 0.54, "#fbfdfa", "#249064");
    render_context_roughCanvas.circle(mapFlagX(0.74, 0.5, flagBox), mapFlagY(0.74, 0.5, flagBox), 24, {
        stroke: "#8f2633",
        strokeWidth: 1,
        fill: "#c83c4a",
        fillStyle: "hachure",
        hachureGap: 5,
        fillWeight: 0.75,
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** BN 国旗专门模板：黄底、黑白斜带和中心简化徽章。 */ function drawBnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawCantonLine(flagBox, 0, 0.72, 1, 0.18, "#fbfdfa", 54);
    drawCantonLine(flagBox, 0, 0.72, 1, 0.18, "#262d2b", 28);
    render_context_roughCanvas.rectangle(cx - 24 + jitter(1), cy - 18 + jitter(1), 48, 34, {
        stroke: "#8f2633",
        strokeWidth: 1.2,
        fill: "#c83c4a",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.7,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx - 42, cy + 24, cx + 42, cy + 24 + jitter(2), {
        stroke: "#262d2b",
        strokeWidth: 2.2,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** BO 国旗专门模板：红黄绿三横带，中间绘制简化盾徽。 */ function drawBoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#8f2633");
    drawSketchStar(mapFlagX(0.5, 0.47, flagBox), mapFlagY(0.5, 0.47, flagBox), 9, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** BQ 国旗专门模板：加勒比荷兰 emoji 沿用荷兰三色旗。 */ function drawBqFlag() {
    drawNlFlag();
}
/** BR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.38, {
        stroke: "#203a74",
        strokeWidth: 1.2,
        fill: "#2f4f9d",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    drawFlagBand({
        x: flagBox.x + flagBox.width * 0.35,
        y: flagBox.y + flagBox.height * 0.47,
        width: flagBox.width * 0.3,
        height: flagBox.height * 0.08
    }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
    drawFlagBorder(flagBox);
}
/** BS 国旗专门模板：蓝黄蓝横带和左侧黑色三角。 */ function drawBsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#3d9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#3d9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#3d9fd3", "#2c6f9b");
    render_context_roughCanvas.polygon([
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
        stroke: "#111615",
        strokeWidth: 1.2,
        fill: "#262d2b",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#416a88");
    drawFlagBorder(flagBox);
}
/** BT 国旗专门模板：黄橙对角双色，并用白色曲线简化雷龙。 */ function drawBtFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#ee8b2c", "#a9601d");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
        ],
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ]
    ], {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.38, 0.66, flagBox), mapFlagY(0.38, 0.66, flagBox), mapFlagX(0.7, 0.34, flagBox), mapFlagY(0.7, 0.34, flagBox), {
        stroke: "#fbfdfa",
        strokeWidth: 8,
        roughness: 2.6,
        bowing: 2
    });
    drawSketchStarWithColors(mapFlagX(0.56, 0.5, flagBox), mapFlagY(0.56, 0.5, flagBox), 16, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.6)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#9c5524");
    drawFlagBorder(flagBox);
}
/** BV 国旗专门模板：布韦岛 emoji 沿用挪威北欧十字旗。 */ function drawBvFlag() {
    drawNoFlag();
}
/** BW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBwFlag() {
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
/** BY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawByFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0, 0.18, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.18, 0, 1, 0.68, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.18, 0.68, 1, 1, "#249064", "#176847");
    for(let i = 0; i < 6; i += 1){
        render_context_roughCanvas.line(mapFlagX(0.035, i / 6, flagBox), mapFlagY(0.035, i / 6, flagBox), mapFlagX(0.145, (i + 0.5) / 6, flagBox), mapFlagY(0.145, (i + 0.5) / 6, flagBox), {
            stroke: "#c83c4a",
            strokeWidth: 2.4,
            roughness: 2.2,
            bowing: 1.5
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** BZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawBzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 0.12, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.88, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.42, {
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
/** CA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.75, 0, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** CC 国旗专门模板：绿底、左侧月牙和飞侧南十字星。 */ function drawCcFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    render_context_roughCanvas.circle(mapFlagX(0.22, 0.34, flagBox), mapFlagY(0.22, 0.34, flagBox), 70, {
        stroke: "#b68b12",
        strokeWidth: 1.2,
        fill: "#ffd84c",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.26, 0.34, flagBox), mapFlagY(0.26, 0.34, flagBox), 62, {
        stroke: "#0f4f37",
        strokeWidth: 1,
        fill: "#176847",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    [
        [
            0.64,
            0.3,
            12
        ],
        [
            0.75,
            0.44,
            11
        ],
        [
            0.62,
            0.58,
            12
        ],
        [
            0.8,
            0.68,
            8
        ]
    ].forEach(([u, v, radius], index)=>drawSketchStar(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, -18 + index * 5));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** CD 国旗专门模板：蓝底、黄边红色斜带和左上黄星。 */ function drawCdFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#3d9fd3", "#2c6f9b");
    drawCantonLine(flagBox, 0.1, 1, 1, 0.1, "#f0c83a", 42);
    drawCantonLine(flagBox, 0.1, 1, 1, 0.1, "#c83c4a", 24);
    drawSketchStar(mapFlagX(0.22, 0.22, flagBox), mapFlagY(0.22, 0.22, flagBox), 31, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** CF 国旗专门模板：四横带、中心红竖带和左上黄星。 */ function drawCfFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#2f5fa0", "#203a74");
    drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.44, 0, 0.56, 1, "#c83c4a", "#8f2633");
    drawSketchStar(mapFlagX(0.2, 0.13, flagBox), mapFlagY(0.2, 0.13, flagBox), 22, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** CG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon(makeFlagCellOutline(0, 0, 1, 1, flagBox), {
        stroke: "#176847",
        strokeWidth: 1.2,
        fill: "#249064",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.polygon([
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
/** CH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawChFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.41, 0.23, 0.59, 0.77, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.25, 0.41, 0.75, 0.59, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** CI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCiFlag() {
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
/** CK 国旗专门模板：蓝船旗、左上联合旗和右侧星环。 */ function drawCkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.72, 0.5, flagBox);
    const cy = mapFlagY(0.72, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#243f78", "#1b2c56");
    drawUnionJackCanton(flagBox);
    for(let i = 0; i < 15; i += 1){
        const angle = Math.PI * 2 * i / 15;
        drawSketchStarWithColors(cx + Math.cos(angle) * 54, cy + Math.sin(angle) * 54, 7, -18 + i, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.6)"
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** CL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawClFlag() {
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
/** CM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCmFlag() {
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
/** CO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCoFlag() {
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
/** CR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 6, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 1 / 6, 1, 2 / 6, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 6, 1, 4 / 6, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 4 / 6, 1, 5 / 6, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 5 / 6, 1, 1, "#253f78", "#1b2c56");
    render_context_roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), 36, {
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
/** CU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCuFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 0; row < 5; row += 1){
        drawFlagBand(flagBox, 0, row / 5, 1, (row + 1) / 5, row % 2 === 0 ? "#2f4f9d" : "#fbfdfa", row % 2 === 0 ? "#203a74" : "#c7d1cc");
    }
    render_context_roughCanvas.polygon([
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
/** CV 国旗专门模板：蓝底、低位白红白横带和星环。 */ function drawCvFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.34, 0.6, flagBox);
    const cy = mapFlagY(0.34, 0.6, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.52, 1, 0.58, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.6, 1, 0.68, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.7, 1, 0.76, "#fbfdfa", "#c7d1cc");
    for(let i = 0; i < 10; i += 1){
        const angle = Math.PI * 2 * i / 10;
        drawSketchStar(cx + Math.cos(angle) * 42, cy + Math.sin(angle) * 42, 7, -18 + i * 4);
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** CW 国旗专门模板：蓝底、底部黄带和左上双星。 */ function drawCwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.68, 1, 0.78, "#f0c83a", "#a98218");
    drawSketchStarWithColors(mapFlagX(0.24, 0.28, flagBox), mapFlagY(0.24, 0.28, flagBox), 18, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawSketchStarWithColors(mapFlagX(0.34, 0.38, flagBox), mapFlagY(0.34, 0.38, flagBox), 11, -10, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** CX 国旗专门模板：蓝绿双色、左上联合旗、南十字和金色圆徽。 */ function drawCxFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#243f78", "#1b2c56");
    drawFlagBand(flagBox, 0.5, 0, 1, 1, "#176847", "#0f4f37");
    drawUnionJackCanton(flagBox);
    render_context_roughCanvas.circle(mapFlagX(0.72, 0.5, flagBox), mapFlagY(0.72, 0.5, flagBox), 70, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStarWithColors(mapFlagX(0.3, 0.75, flagBox), mapFlagY(0.3, 0.75, flagBox), 16, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.6)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** CY 国旗专门模板：白底、铜色岛形和下方橄榄枝线条。 */ function drawCyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0.36, 0.43, flagBox),
            mapFlagY(0.36, 0.43, flagBox)
        ],
        [
            mapFlagX(0.48, 0.36, flagBox),
            mapFlagY(0.48, 0.36, flagBox)
        ],
        [
            mapFlagX(0.66, 0.42, flagBox),
            mapFlagY(0.66, 0.42, flagBox)
        ],
        [
            mapFlagX(0.58, 0.54, flagBox),
            mapFlagY(0.58, 0.54, flagBox)
        ],
        [
            mapFlagX(0.42, 0.54, flagBox),
            mapFlagY(0.42, 0.54, flagBox)
        ]
    ], {
        stroke: "#a9601d",
        strokeWidth: 1.2,
        fill: "#ee8b2c",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.7,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.38, 0.64, flagBox), mapFlagY(0.38, 0.64, flagBox), mapFlagX(0.5, 0.58, flagBox), mapFlagY(0.5, 0.58, flagBox), {
        stroke: "#249064",
        strokeWidth: 2,
        roughness: 2.2,
        bowing: 1.5
    });
    render_context_roughCanvas.line(mapFlagX(0.62, 0.64, flagBox), mapFlagY(0.62, 0.64, flagBox), mapFlagX(0.5, 0.58, flagBox), mapFlagY(0.5, 0.58, flagBox), {
        stroke: "#249064",
        strokeWidth: 2,
        roughness: 2.2,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
    drawFlagBorder(flagBox);
}
/** CZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawCzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** DE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawDeFlag() {
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
/** DJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawDjFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#4f9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
/** DK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawDkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.29, 0, 0.41, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** DM 国旗专门模板：绿底三色十字和中心红圆鹦鹉标记。 */ function drawDmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0.43, 0, 0.57, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.47, 0, 0.53, 1, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0.46, 1, 0.54, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0.5, 0, 0.54, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 0.56, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 76, {
        stroke: "#8f2633",
        strokeWidth: 1.2,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 18, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** DO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawDoFlag() {
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
/** DZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawDzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 0.5, 1, "#249064", "#176847");
    drawFlagBand(flagBox, 0.5, 0, 1, 1, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), flagBox.height * 0.32, {
        stroke: "#8f2633",
        strokeWidth: 1.2,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.57, 0.5, flagBox), mapFlagY(0.57, 0.5, flagBox), flagBox.height * 0.27, {
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
/** EC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawEcFlag() {
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
/** EE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawEeFlag() {
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
/** EG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawEgFlag() {
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
/** EH 国旗专门模板：西撒哈拉黑白绿横带、红三角和星月。 */ function drawEhFlag() {
    drawPsLikeFlag("#262d2b", "#fbfdfa", "#249064", true);
}
/** ER 国旗专门模板：红色大三角分割蓝绿底，并加金色枝叶标记。 */ function drawErFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
        ],
        [
            mapFlagX(0, 0.5, flagBox),
            mapFlagY(0, 0.5, flagBox)
        ]
    ], {
        stroke: "#176847",
        strokeWidth: 1,
        fill: "#249064",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(1, 0.5, flagBox),
            mapFlagY(1, 0.5, flagBox)
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
    render_context_roughCanvas.line(mapFlagX(0.2, 0.38, flagBox), mapFlagY(0.2, 0.38, flagBox), mapFlagX(0.2, 0.64, flagBox), mapFlagY(0.2, 0.64, flagBox), {
        stroke: "#f0c83a",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.6
    });
    drawSketchStar(mapFlagX(0.2, 0.34, flagBox), mapFlagY(0.2, 0.34, flagBox), 13, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** ET 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawEtFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.34, {
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
/** FI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawFiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#2f4f9d", "#203a74");
    drawFlagBand(flagBox, 0, 0.38, 1, 0.56, "#2f4f9d", "#203a74");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
    drawFlagBorder(flagBox);
}
/** FJ 国旗专门模板：浅蓝船旗、左上联合旗和盾徽。 */ function drawFjFlag() {
    drawBritishBlueEnsign("#75a9d8", "#477aa5", "#fbfdfa", "#8f2633");
}
/** FK 国旗专门模板：蓝船旗、左上联合旗和飞侧徽章。 */ function drawFkFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#2f6fa4");
}
/** FM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawFmFlag() {
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
        drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 20, -18 + index * 5, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** FO 国旗专门模板：白底蓝边红色北欧十字。 */ function drawFoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.28, 0, 0.44, 1, "#2f4f9d", "#203a74");
    drawFlagBand(flagBox, 0, 0.38, 1, 0.58, "#2f4f9d", "#203a74");
    drawFlagBand(flagBox, 0.32, 0, 0.4, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.43, 1, 0.53, "#c83c4a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
    drawFlagBorder(flagBox);
}
/** GA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGaFlag() {
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
/** GB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGbFlag() {
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
/** GD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGdFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.1, 0.16, 0.9, 0.84, "#f0c83a", "#a98218");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.polygon([
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
/** GE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGeFlag() {
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
/** GF 国旗专门模板：法属圭亚那按地区 emoji 常见回退绘制法国三色旗。 */ function drawGfFlag() {
    drawFranceFlag();
}
/** GG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGgFlag() {
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
/** GH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGhFlag() {
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
/** GI 国旗专门模板：白底红底边，中间绘制简化城堡钥匙徽章。 */ function drawGiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.48, flagBox);
    const cy = mapFlagY(0.5, 0.48, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.68, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.rectangle(cx - 48, cy - 38, 96, 54, {
        stroke: "#8f2633",
        strokeWidth: 1.4,
        fill: "#c83c4a",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.75,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx, cy + 18, cx, cy + 86, {
        stroke: "#f0c83a",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    render_context_roughCanvas.circle(cx, cy + 92, 18, {
        stroke: "#a98218",
        strokeWidth: 1,
        fill: "#f0c83a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** GL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGlFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), flagBox.height * 0.42, {
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
        width: flagBox.width * 0.42,
        height: flagBox.height * 0.22
    }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** GM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGmFlag() {
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
/** GN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGnFlag() {
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
/** GP 国旗专门模板：瓜德罗普按地区 emoji 常见回退绘制法国三色旗。 */ function drawGpFlag() {
    drawFranceFlag();
}
/** GQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGqFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** GR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGrFlag() {
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
/** GS 国旗专门模板：蓝船旗、左上联合旗和南乔治亚徽章简化标记。 */ function drawGsFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#249064");
}
/** GT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGtFlag() {
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
/** GU 国旗专门模板：蓝底红边和中心椭圆徽章。 */ function drawGuFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 0.08, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.92, 1, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 0.06, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.94, 0, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 84, {
        stroke: "#8f2633",
        strokeWidth: 1.2,
        fill: "#75a9d8",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.44, 0.54, flagBox), mapFlagY(0.44, 0.54, flagBox), mapFlagX(0.56, 0.54, flagBox), mapFlagY(0.56, 0.54, flagBox), {
        stroke: "#249064",
        strokeWidth: 3,
        roughness: 2.2,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** GW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGwFlag() {
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
/** GY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawGyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.polygon([
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
/** HK 区旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawHkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    for(let i = 0; i < 5; i += 1){
        const angle = -Math.PI / 2 + Math.PI * 2 * i / 5;
        const petalX = cx + Math.cos(angle) * 42;
        const petalY = cy + Math.sin(angle) * 42;
        render_context_roughCanvas.circle(petalX, petalY, 42, {
            stroke: "#c7d1cc",
            strokeWidth: 1,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.2
        });
    }
    render_context_roughCanvas.circle(cx, cy, 22, {
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
/** HM 国旗专门模板：赫德岛和麦克唐纳群岛沿用澳大利亚旗。 */ function drawHmFlag() {
    drawAustraliaFlag();
}
/** HN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawHnFlag() {
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
        drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 9, -18 + index * 4, {
            stroke: "#2c6f9b",
            fill: "#4f9fd3",
            hatch: "#75b6de"
        });
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** HR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawHrFlag() {
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
/** HT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawHtFlag() {
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
/** HU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawHuFlag() {
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
/** ID 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIdFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** IE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIeFlag() {
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
/** IL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIlFlag() {
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
/** IM 国旗专门模板：红底三腿图案用三条旋转折线概括。 */ function drawImFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    for(let i = 0; i < 3; i += 1){
        const angle = -Math.PI / 2 + Math.PI * 2 * i / 3;
        const kneeX = cx + Math.cos(angle) * 42;
        const kneeY = cy + Math.sin(angle) * 42;
        const footX = cx + Math.cos(angle + 0.55) * 78;
        const footY = cy + Math.sin(angle + 0.55) * 78;
        render_context_roughCanvas.line(cx, cy, kneeX, kneeY, {
            stroke: "#f0c83a",
            strokeWidth: 7,
            roughness: 2.4,
            bowing: 1.6
        });
        render_context_roughCanvas.line(kneeX, kneeY, footX, footY, {
            stroke: "#f0c83a",
            strokeWidth: 6,
            roughness: 2.4,
            bowing: 1.6
        });
    }
    render_context_roughCanvas.circle(cx, cy, 24, {
        stroke: "#a98218",
        strokeWidth: 1,
        fill: "#f0c83a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** IN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawInFlag() {
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
    render_context_roughCanvas.circle(cx, cy, wheelRadius * 2, {
        stroke: "#203a74",
        strokeWidth: 1.4,
        fill: "transparent",
        roughness: 2.1,
        bowing: 1.1
    });
    for(let i = 0; i < 12; i += 1){
        const angle = Math.PI * 2 * i / 12;
        render_context_roughCanvas.line(cx, cy, cx + Math.cos(angle) * wheelRadius, cy + Math.sin(angle) * wheelRadius, {
            stroke: "#203a74",
            strokeWidth: 0.65,
            roughness: 2,
            bowing: 1.3
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
    drawFlagBorder(flagBox);
}
/** IO 国旗专门模板：英属印度洋领地用蓝白波纹、联合旗和棕榈徽章表示。 */ function drawIoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 0; row < 8; row += 1){
        drawFlagBand(flagBox, 0, row / 8, 1, (row + 0.5) / 8, "#2f5fa0", "#203a74");
    }
    drawUnionJackCanton(flagBox);
    render_context_roughCanvas.line(mapFlagX(0.72, 0.42, flagBox), mapFlagY(0.72, 0.42, flagBox), mapFlagX(0.72, 0.7, flagBox), mapFlagY(0.72, 0.7, flagBox), {
        stroke: "#6f4f28",
        strokeWidth: 5,
        roughness: 2.4,
        bowing: 1.7
    });
    drawSketchStar(mapFlagX(0.72, 0.34, flagBox), mapFlagY(0.72, 0.34, flagBox), 22, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
    drawFlagBorder(flagBox);
}
/** IQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIqFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
    render_context_roughCanvas.line(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), mapFlagX(0.62, 0.5, flagBox), mapFlagY(0.62, 0.5, flagBox), {
        stroke: "#249064",
        strokeWidth: 5,
        roughness: 2.2,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** IR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIrFlag() {
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
/** IS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawIsFlag() {
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
/** JE 国旗专门模板：白底红斜十字和顶部金色徽章。 */ function drawJeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawCantonLine(flagBox, 0, 0, 1, 1, "#c83c4a", 13);
    drawCantonLine(flagBox, 1, 0, 0, 1, "#c83c4a", 13);
    drawShieldBadge(flagBox, 0.5, 0.27, "#f0c83a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
    drawFlagBorder(flagBox);
}
/** JM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawJmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.polygon([
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
/** JO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawJoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
/** KE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.3, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0.34, 1, 0.66, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 76, {
        stroke: "#111615",
        strokeWidth: 1.3,
        fill: "#b64f36",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.55,
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.42, 0.25, flagBox), mapFlagY(0.42, 0.25, flagBox), mapFlagX(0.58, 0.75, flagBox), mapFlagY(0.58, 0.75, flagBox), {
        stroke: "#fbfdfa",
        strokeWidth: 3,
        roughness: 2.2,
        bowing: 1.5
    });
    render_context_roughCanvas.line(mapFlagX(0.58, 0.25, flagBox), mapFlagY(0.58, 0.25, flagBox), mapFlagX(0.42, 0.75, flagBox), mapFlagY(0.42, 0.75, flagBox), {
        stroke: "#fbfdfa",
        strokeWidth: 3,
        roughness: 2.2,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** KG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(cx, cy, 90, {
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
        const angle = Math.PI * 2 * i / 8;
        render_context_roughCanvas.line(cx, cy, cx + Math.cos(angle) * 68, cy + Math.sin(angle) * 68, {
            stroke: "#c83c4a",
            strokeWidth: 1,
            roughness: 2,
            bowing: 1.3
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** KH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKhFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0.38, 0.48, 0.62, 0.66, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.polygon([
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
/** KI 国旗专门模板：红色上半、海浪条纹、太阳和飞鸟。 */ function drawKiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#253f78", "#1b2c56");
    for(let row = 0; row < 3; row += 1){
        drawCantonLine({
            x: flagBox.x,
            y: flagBox.y + flagBox.height * (0.58 + row * 0.11),
            width: flagBox.width,
            height: flagBox.height * 0.05
        }, 0, 0, 1, 0, "#fbfdfa", 5);
    }
    drawSketchStar(mapFlagX(0.5, 0.34, flagBox), mapFlagY(0.5, 0.34, flagBox), 38, -18);
    render_context_roughCanvas.line(mapFlagX(0.42, 0.24, flagBox), mapFlagY(0.42, 0.24, flagBox), mapFlagX(0.58, 0.24, flagBox), mapFlagY(0.58, 0.24, flagBox), {
        stroke: "#f0c83a",
        strokeWidth: 5,
        roughness: 2.4,
        bowing: 2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** KM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 54, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.2, 0.5, flagBox), mapFlagY(0.2, 0.5, flagBox), 48, {
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
/** KN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
/** KP 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKpFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 0.18, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.18, 1, 0.24, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.76, 1, 0.82, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.82, 1, 1, "#253f78", "#1b2c56");
    render_context_roughCanvas.circle(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), 82, {
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
/** KR 国旗专门模板：白底、太极双色圆和四组手绘卦线。 */ function drawKrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    const radius = flagBox.height * 0.18;
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-34 * Math.PI / 180);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#c83c4a";
    ctx.fillRect(-radius, -radius, radius * 2, radius);
    ctx.fillStyle = "#253f78";
    ctx.fillRect(-radius, 0, radius * 2, radius);
    ctx.beginPath();
    ctx.arc(-radius / 2, 0, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#253f78";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#c83c4a";
    ctx.fill();
    ctx.restore();
    render_context_roughCanvas.circle(cx, cy, radius * 2, {
        stroke: "#28332e",
        strokeWidth: 1.1,
        fill: "transparent",
        roughness: 2.1,
        bowing: 1.1
    });
    drawKoreanTrigram(flagBox, 0.28, 0.27, -34, [
        true,
        true,
        true
    ]);
    drawKoreanTrigram(flagBox, 0.72, 0.27, 34, [
        false,
        true,
        false
    ]);
    drawKoreanTrigram(flagBox, 0.28, 0.73, 34, [
        true,
        false,
        true
    ]);
    drawKoreanTrigram(flagBox, 0.72, 0.73, -34, [
        false,
        false,
        false
    ]);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
    drawFlagBorder(flagBox);
}
/** KW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** KY 国旗专门模板：蓝船旗、联合旗和开曼群岛盾徽简化。 */ function drawKyFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#2f6fa4");
}
/** KZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawKzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0.08, 0.08, 0.12, 0.92, "#f0c83a", "#a98218");
    render_context_roughCanvas.circle(mapFlagX(0.55, 0.42, flagBox), mapFlagY(0.55, 0.42, flagBox), 76, {
        stroke: "#b68b12",
        strokeWidth: 1,
        fill: "#ffd84c",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.42, 0.62, flagBox), mapFlagY(0.42, 0.62, flagBox), mapFlagX(0.68, 0.62, flagBox), mapFlagY(0.68, 0.62, flagBox), {
        stroke: "#a98218",
        strokeWidth: 5,
        roughness: 2.2,
        bowing: 1.6
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** LA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#273f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#273f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.34, {
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
/** LB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLbFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
/** LC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLcFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.polygon([
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
/** LI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.18, 0.24, flagBox), mapFlagY(0.18, 0.24, flagBox), 34, {
        stroke: "#b68b12",
        strokeWidth: 1,
        fill: "#ffd84c",
        fillStyle: "hachure",
        hachureGap: 6,
        fillWeight: 0.8,
        roughness: 2.2,
        bowing: 1.2
    });
    drawFlagBand(flagBox, 0.13, 0.29, 0.23, 0.34, "#ffd84c", "#b68b12");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** LK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.08, 0.1, 0.22, 0.9, "#249064", "#176847");
    drawFlagBand(flagBox, 0.22, 0.1, 0.36, 0.9, "#ee8b2c", "#a9601d");
    drawFlagBand(flagBox, 0.4, 0.1, 0.92, 0.9, "#7b314b", "#572439");
    drawSketchStarWithColors(mapFlagX(0.66, 0.5, flagBox), mapFlagY(0.66, 0.5, flagBox), 42, -18, {
        stroke: "#b68b12",
        fill: "#ffd84c",
        hatch: "#ffec62"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
    drawFlagBorder(flagBox);
}
/** LR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 0; row < 11; row += 1){
        if (row % 2 === 0) {
            drawFlagBand(flagBox, 0, row / 11, 1, (row + 1) / 11, "#c83c4a", "#8f2633");
        }
    }
    drawFlagBand(flagBox, 0, 0, 0.36, 5 / 11, "#253f78", "#1b2c56");
    drawSketchStarWithColors(mapFlagX(0.18, 0.23, flagBox), mapFlagY(0.18, 0.23, flagBox), 18, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** LS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.3, 1, 0.7, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.line(mapFlagX(0.38, 0.63, flagBox), mapFlagY(0.38, 0.63, flagBox), mapFlagX(0.62, 0.63, flagBox), mapFlagY(0.62, 0.63, flagBox), {
        stroke: "#262d2b",
        strokeWidth: 4,
        roughness: 2.2,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
    drawFlagBorder(flagBox);
}
/** LT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLtFlag() {
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
/** LU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLuFlag() {
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
/** LV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLvFlag() {
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
/** LY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawLyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.25, {
        stroke: "#c7d1cc",
        strokeWidth: 1.1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.22, {
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
/** MA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMaFlag() {
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
/** MC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMcFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** MD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMdFlag() {
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
/** ME 国旗专门模板：红底金边和中央双头鹰式徽章概括。 */ function drawMeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 0.06, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.94, 1, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 0.05, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.95, 0, 1, 1, "#f0c83a", "#a98218");
    drawSketchStar(cx - 28, cy - 16, 24, -18);
    drawSketchStar(cx + 28, cy - 16, 24, 12);
    drawShieldBadge(flagBox, 0.5, 0.56, "#f0c83a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** MF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMfFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2d4e8c", "#1e3768");
    drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#cf3d45", "#912936");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6d7082");
    drawFlagBorder(flagBox);
}
/** MG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMgFlag() {
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
/** MH 国旗专门模板：蓝底、橙白斜带和左上星。 */ function drawMhFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawCantonLine(flagBox, 0, 0.94, 1, 0.4, "#fbfdfa", 34);
    drawCantonLine(flagBox, 0, 0.98, 1, 0.52, "#ee8b2c", 24);
    drawSketchStarWithColors(mapFlagX(0.2, 0.24, flagBox), mapFlagY(0.2, 0.24, flagBox), 34, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** MK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    for(let i = 0; i < 8; i += 1){
        const angle = Math.PI * 2 * i / 8;
        render_context_roughCanvas.line(cx, cy, cx + Math.cos(angle) * flagBox.width * 0.55, cy + Math.sin(angle) * flagBox.height * 0.55, {
            stroke: "#f0c83a",
            strokeWidth: 13,
            roughness: 2.3,
            bowing: 1.5
        });
    }
    render_context_roughCanvas.circle(cx, cy, 76, {
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
/** ML 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMlFlag() {
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
/** MM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMmFlag() {
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
/** MN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.12, 0.22, 0.2, 0.78, "#ffd84c", "#b68b12");
    render_context_roughCanvas.circle(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 38, {
        stroke: "#b68b12",
        strokeWidth: 1,
        fill: "transparent",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** MO 区旗专门模板：绿底、莲花和五星。 */ function drawMoFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.52, flagBox);
    const cy = mapFlagY(0.5, 0.52, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    for(let i = 0; i < 5; i += 1){
        render_context_roughCanvas.circle(cx + (i - 2) * 22, cy, 34, {
            stroke: "#c7d1cc",
            strokeWidth: 0.9,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    }
    [
        [
            0.5,
            0.22,
            14
        ],
        [
            0.43,
            0.32,
            9
        ],
        [
            0.57,
            0.32,
            9
        ],
        [
            0.38,
            0.43,
            8
        ],
        [
            0.62,
            0.43,
            8
        ]
    ].forEach(([u, v, radius], index)=>drawSketchStar(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, -18 + index * 4));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** MP 国旗专门模板：蓝底、中心白星和花环式徽记。 */ function drawMpFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.52, flagBox), mapFlagY(0.5, 0.52, flagBox), 86, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "rgba(251, 253, 250, 0.14)",
        fillStyle: "hachure",
        hachureGap: 10,
        fillWeight: 0.5,
        roughness: 2.3,
        bowing: 1.2
    });
    drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 32, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** MQ 国旗专门模板：马提尼克按地区 emoji 常见回退绘制法国三色旗。 */ function drawMqFlag() {
    drawFranceFlag();
}
/** MR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0, 0, 1, 0.18, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.82, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.47, flagBox), mapFlagY(0.5, 0.47, flagBox), flagBox.height * 0.32, {
        stroke: "#b68b12",
        strokeWidth: 1.2,
        fill: "transparent",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.41, flagBox), mapFlagY(0.5, 0.41, flagBox), flagBox.height * 0.3, {
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
/** MS 国旗专门模板：蓝船旗、联合旗和蒙特塞拉特徽章简化。 */ function drawMsFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#249064");
}
/** MT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMtFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 0.5, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.5, 0, 1, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.11, 0.16, 0.17, 0.31, "#c7d1cc", "#8f9b96");
    drawFlagBand(flagBox, 0.07, 0.2, 0.21, 0.27, "#c7d1cc", "#8f9b96");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** MU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMuFlag() {
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
/** MV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMvFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.18, 0.22, 0.82, 0.78, "#176847", "#0f4f37");
    render_context_roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.27, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), flagBox.height * 0.24, {
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
/** MW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.19, flagBox), mapFlagY(0.5, 0.19, flagBox), 56, {
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
/** MX 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMxFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 58, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.45,
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** MY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 0; row < 14; row += 1){
        if (row % 2 === 0) {
            drawFlagBand(flagBox, 0, row / 14, 1, (row + 1) / 14, "#c83c4a", "#8f2633");
        }
    }
    drawFlagBand(flagBox, 0, 0, 0.48, 0.55, "#253f78", "#1b2c56");
    render_context_roughCanvas.circle(mapFlagX(0.22, 0.28, flagBox), mapFlagY(0.22, 0.28, flagBox), 54, {
        stroke: "#b68b12",
        strokeWidth: 1,
        fill: "#ffd84c",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.26, 0.28, flagBox), mapFlagY(0.26, 0.28, flagBox), 48, {
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
/** MZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawMzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.3, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0.35, 1, 0.65, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0.7, 1, 1, "#f0c83a", "#a98218");
    render_context_roughCanvas.polygon([
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
/** NA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawNaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.circle(mapFlagX(0.2, 0.22, flagBox), mapFlagY(0.2, 0.22, flagBox), 48, {
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
/** NC 国旗专门模板：蓝红绿三横带和左侧黄圆图腾。 */ function drawNcFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.24, 0.5, flagBox);
    const cy = mapFlagY(0.24, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(cx, cy, 86, {
        stroke: "#111615",
        strokeWidth: 2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.6,
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx, cy - 34, cx, cy + 36, {
        stroke: "#111615",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.6
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b3538");
    drawFlagBorder(flagBox);
}
/** NE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawNeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#ee8b2c", "#a9601d");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 42, {
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
/** NF 国旗专门模板：绿白绿竖带和中心松树。 */ function drawNfFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.5, flagBox);
    const cy = mapFlagY(0.5, 0.5, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#176847", "#0f4f37");
    [
        0,
        1,
        2
    ].forEach((index)=>{
        render_context_roughCanvas.polygon([
            [
                cx,
                cy - 76 + index * 34
            ],
            [
                cx - 48 + index * 8,
                cy - 26 + index * 28
            ],
            [
                cx + 48 - index * 8,
                cy - 26 + index * 28
            ]
        ], {
            stroke: "#0f4f37",
            strokeWidth: 1,
            fill: "#176847",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    });
    render_context_roughCanvas.line(cx, cy - 24, cx, cy + 78, {
        stroke: "#6f4f28",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.6
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
    drawFlagBorder(flagBox);
}
/** NG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawNgFlag() {
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
/** NI 国旗专门模板：蓝白蓝横带和中心徽章。 */ function drawNiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#2f78bd", "#20588e");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#2f78bd", "#20588e");
    drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#2f78bd");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
    drawFlagBorder(flagBox);
}
/** NL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawNlFlag() {
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
/** NO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawNoFlag() {
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
/** NP 国旗专门模板：双三角尼泊尔旗，保留月日符号。 */ function drawNpFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0.26, 0.08, flagBox),
            mapFlagY(0.26, 0.08, flagBox)
        ],
        [
            mapFlagX(0.72, 0.38, flagBox),
            mapFlagY(0.72, 0.38, flagBox)
        ],
        [
            mapFlagX(0.38, 0.42, flagBox),
            mapFlagY(0.38, 0.42, flagBox)
        ],
        [
            mapFlagX(0.74, 0.86, flagBox),
            mapFlagY(0.74, 0.86, flagBox)
        ],
        [
            mapFlagX(0.26, 0.86, flagBox),
            mapFlagY(0.26, 0.86, flagBox)
        ]
    ], {
        stroke: "#203a74",
        strokeWidth: 10,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.4,
        bowing: 1.4
    });
    drawSketchStarWithColors(mapFlagX(0.42, 0.32, flagBox), mapFlagY(0.42, 0.32, flagBox), 20, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    render_context_roughCanvas.circle(mapFlagX(0.44, 0.68, flagBox), mapFlagY(0.44, 0.68, flagBox), 36, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
}
/** NR 国旗专门模板：蓝底、黄色赤道线和左下白星。 */ function drawNrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.52, 1, 0.58, "#f0c83a", "#a98218");
    drawSketchStarWithColors(mapFlagX(0.28, 0.72, flagBox), mapFlagY(0.28, 0.72, flagBox), 24, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** NU 国旗专门模板：黄底、联合旗 canton 和蓝色星点。 */ function drawNuFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawUnionJackCanton(flagBox);
    [
        [
            0.72,
            0.3
        ],
        [
            0.84,
            0.46
        ],
        [
            0.68,
            0.62
        ],
        [
            0.82,
            0.75
        ]
    ].forEach(([u, v], index)=>drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), index === 0 ? 16 : 10, -18 + index * 5, {
            stroke: "#203a74",
            fill: "#253f78",
            hatch: "rgba(37, 63, 120, 0.6)"
        }));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** NZ 国旗专门模板：蓝船旗、联合旗和红白南十字星。 */ function drawNzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#243f78", "#1b2c56");
    drawUnionJackCanton(flagBox);
    [
        [
            0.72,
            0.28,
            14
        ],
        [
            0.84,
            0.44,
            12
        ],
        [
            0.68,
            0.58,
            14
        ],
        [
            0.8,
            0.72,
            9
        ]
    ].forEach(([u, v, radius], index)=>drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, -18 + index * 5, {
            stroke: "#fbfdfa",
            fill: "#c83c4a",
            hatch: "rgba(251, 253, 250, 0.5)"
        }));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** OM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawOmFlag() {
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
/** PA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPaFlag() {
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
/** PE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPeFlag() {
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
/** PF 国旗专门模板：法属波利尼西亚红白红横带和中心太阳船徽。 */ function drawPfFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 92, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.5,
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.42, 0.54, flagBox), mapFlagY(0.42, 0.54, flagBox), mapFlagX(0.58, 0.54, flagBox), mapFlagY(0.58, 0.54, flagBox), {
        stroke: "#c83c4a",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** PG 国旗专门模板：黑红对角双色，白星与金色天堂鸟简化。 */ function drawPgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#262d2b", "#111615");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
        ],
        [
            mapFlagX(1, 1, flagBox),
            mapFlagY(1, 1, flagBox)
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
    drawSketchStar(mapFlagX(0.28, 0.3, flagBox), mapFlagY(0.28, 0.3, flagBox), 14, -18);
    drawSketchStar(mapFlagX(0.4, 0.45, flagBox), mapFlagY(0.4, 0.45, flagBox), 10, -12);
    render_context_roughCanvas.line(mapFlagX(0.62, 0.3, flagBox), mapFlagY(0.62, 0.3, flagBox), mapFlagX(0.82, 0.42, flagBox), mapFlagY(0.82, 0.42, flagBox), {
        stroke: "#f0c83a",
        strokeWidth: 5,
        roughness: 2.4,
        bowing: 1.8
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** PH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPhFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
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
    render_context_roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 34, {
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
/** PK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0, 0, 0.25, 1, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.circle(mapFlagX(0.58, 0.47, flagBox), mapFlagY(0.58, 0.47, flagBox), flagBox.height * 0.35, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.64, 0.45, flagBox), mapFlagY(0.64, 0.45, flagBox), flagBox.height * 0.31, {
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
/** PL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPlFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** PM 国旗专门模板：圣皮埃尔和密克隆按地区 emoji 常见回退绘制法国三色旗。 */ function drawPmFlag() {
    drawFranceFlag();
}
/** PN 国旗专门模板：蓝船旗、联合旗和皮特凯恩盾徽简化。 */ function drawPnFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#249064");
}
/** PR 国旗专门模板：红白横纹、蓝三角和白星。 */ function drawPrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 0; row < 5; row += 1){
        if (row % 2 === 0) {
            drawFlagBand(flagBox, 0, row / 5, 1, (row + 1) / 5, "#c83c4a", "#8f2633");
        }
    }
    render_context_roughCanvas.polygon([
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
        stroke: "#203a74",
        strokeWidth: 1.2,
        fill: "#253f78",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 20, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** PS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawPsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
/** PT 国旗专门模板：葡萄牙绿红双竖带和交界徽章。 */ function drawPtFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 0.4, 1, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0.4, 0, 1, 1, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.4, 0.5, flagBox), mapFlagY(0.4, 0.5, flagBox), 72, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.5,
        roughness: 2.2,
        bowing: 1.2
    });
    drawShieldBadge(flagBox, 0.4, 0.5, "#fbfdfa", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** PW 国旗专门模板：浅蓝底和偏左金色圆月。 */ function drawPwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
    render_context_roughCanvas.circle(mapFlagX(0.43, 0.5, flagBox), mapFlagY(0.43, 0.5, flagBox), 118, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 9,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
    drawFlagBorder(flagBox);
}
/** PY 国旗专门模板：红白蓝横带和中心徽章。 */ function drawPyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#253f78", "#1b2c56");
    drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** QA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawQaFlag() {
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
    render_context_roughCanvas.polygon([
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
/** RE 国旗专门模板：留尼汪按地区 emoji 常见回退绘制法国三色旗。 */ function drawReFlag() {
    drawFranceFlag();
}
/** RO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawRoFlag() {
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
/** RS 国旗专门模板：红蓝白横带和靠旗杆简化徽章。 */ function drawRsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#fbfdfa", "#c7d1cc");
    drawShieldBadge(flagBox, 0.32, 0.5, "#fbfdfa", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** RU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawRuFlag() {
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
/** RW 国旗专门模板：蓝黄绿横带和右上太阳。 */ function drawRwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#4f9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
    drawSketchStar(mapFlagX(0.82, 0.24, flagBox), mapFlagY(0.82, 0.24, flagBox), 28, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
    drawFlagBorder(flagBox);
}
/** SA 国旗专门模板：绿底、白色铭文线和弯刀。 */ function drawSaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    render_context_roughCanvas.line(mapFlagX(0.28, 0.42, flagBox), mapFlagY(0.28, 0.42, flagBox), mapFlagX(0.72, 0.42, flagBox), mapFlagY(0.72, 0.42, flagBox), {
        stroke: "#fbfdfa",
        strokeWidth: 5,
        roughness: 2.4,
        bowing: 1.6
    });
    render_context_roughCanvas.line(mapFlagX(0.34, 0.6, flagBox), mapFlagY(0.34, 0.6, flagBox), mapFlagX(0.68, 0.56, flagBox), mapFlagY(0.68, 0.56, flagBox), {
        stroke: "#fbfdfa",
        strokeWidth: 4,
        roughness: 2.4,
        bowing: 1.8
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** SB 国旗专门模板：蓝绿对角双色、黄色斜带和左上五星。 */ function drawSbFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#2f78bd", "#20588e");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ],
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
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
    drawCantonLine(flagBox, 0, 1, 1, 0, "#f0c83a", 32);
    [
        [
            0.18,
            0.18
        ],
        [
            0.28,
            0.18
        ],
        [
            0.23,
            0.28
        ],
        [
            0.15,
            0.34
        ],
        [
            0.31,
            0.34
        ]
    ].forEach(([u, v], index)=>drawSketchStar(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 8, -18 + index));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
    drawFlagBorder(flagBox);
}
/** SC 国旗专门模板：从旗杆底部发散的五色扇形。 */ function drawScFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const origin = [
        mapFlagX(0, 1, flagBox),
        mapFlagY(0, 1, flagBox)
    ];
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    [
        [
            "#253f78",
            0,
            0.18,
            "#1b2c56"
        ],
        [
            "#f0c83a",
            0.18,
            0.38,
            "#a98218"
        ],
        [
            "#c83c4a",
            0.38,
            0.58,
            "#8f2633"
        ],
        [
            "#fbfdfa",
            0.58,
            0.78,
            "#c7d1cc"
        ],
        [
            "#249064",
            0.78,
            1,
            "#176847"
        ]
    ].forEach(([fill, start, end, stroke])=>{
        render_context_roughCanvas.polygon([
            origin,
            [
                mapFlagX(start, 0, flagBox),
                mapFlagY(start, 0, flagBox)
            ],
            [
                mapFlagX(end, 0, flagBox),
                mapFlagY(end, 0, flagBox)
            ]
        ], {
            stroke: stroke,
            strokeWidth: 1,
            fill: fill,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** SD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSdFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
    render_context_roughCanvas.polygon([
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
/** SE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#2f78bd", "#20588e");
    drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.4, 1, 0.56, "#f0c83a", "#a98218");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
    drawFlagBorder(flagBox);
}
/** SG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.circle(mapFlagX(0.22, 0.25, flagBox), mapFlagY(0.22, 0.25, flagBox), flagBox.height * 0.24, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.26, 0.25, flagBox), mapFlagY(0.26, 0.25, flagBox), flagBox.height * 0.2, {
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
        drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 8, -18 + index * 5, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251, 253, 250, 0.7)"
        });
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** SH 国旗专门模板：蓝船旗、联合旗和圣赫勒拿徽章简化。 */ function drawShFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#f0c83a");
}
/** SI 国旗专门模板：白蓝红横带和靠旗杆盾徽。 */ function drawSiFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    drawShieldBadge(flagBox, 0.28, 0.38, "#fbfdfa", "#253f78");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** SJ 国旗专门模板：斯瓦尔巴和扬马延沿用挪威旗。 */ function drawSjFlag() {
    drawNoFlag();
}
/** SK 国旗专门模板：白蓝红横带和靠旗杆盾徽。 */ function drawSkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    drawShieldBadge(flagBox, 0.28, 0.5, "#fbfdfa", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** SL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSlFlag() {
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
/** SM 国旗专门模板：白蓝双横带和中心徽章。 */ function drawSmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#75a9d8", "#477aa5");
    drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
    drawFlagBorder(flagBox);
}
/** SN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSnFlag() {
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
/** SO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSoFlag() {
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
/** SR 国旗专门模板：绿白红白绿横带和中心黄星。 */ function drawSrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0, 1, 0.2, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0.2, 1, 0.3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.3, 1, 0.7, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.7, 1, 0.8, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.8, 1, 1, "#249064", "#176847");
    drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 34, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** SS 国旗专门模板：黑红绿横带、蓝三角和黄星。 */ function drawSsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.3, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0, 0.36, 1, 0.64, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
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
        stroke: "#203a74",
        strokeWidth: 1.2,
        fill: "#253f78",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 22, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** ST 国旗专门模板：绿黄绿横带、红三角和双黑星。 */ function drawStFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1, 0.25, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(0.34, 0.5, flagBox),
            mapFlagY(0.34, 0.5, flagBox)
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
    drawSketchStarWithColors(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), 18, -18, {
        stroke: "#111615",
        fill: "#262d2b",
        hatch: "rgba(38, 45, 43, 0.7)"
    });
    drawSketchStarWithColors(mapFlagX(0.64, 0.5, flagBox), mapFlagY(0.64, 0.5, flagBox), 18, -18, {
        stroke: "#111615",
        fill: "#262d2b",
        hatch: "rgba(38, 45, 43, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** SV 国旗专门模板：蓝白蓝横带和中心徽章。 */ function drawSvFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#253f78", "#1b2c56");
    drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
    drawFlagBorder(flagBox);
}
/** SX 国旗专门模板：红蓝横底、白三角和徽章。 */ function drawSxFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#253f78", "#1b2c56");
    render_context_roughCanvas.polygon([
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
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawShieldBadge(flagBox, 0.16, 0.5, "#f0c83a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** SY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawSyFlag() {
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
/** SZ 国旗专门模板：蓝黄红横带和中心盾牌。 */ function drawSzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 1, 0.18, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 0.18, 1, 0.26, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.74, 1, 0.82, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0.82, 1, 1, "#253f78", "#1b2c56");
    drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#262d2b");
    render_context_roughCanvas.line(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), mapFlagX(0.68, 0.5, flagBox), mapFlagY(0.68, 0.5, flagBox), {
        stroke: "#6f4f28",
        strokeWidth: 3,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** TC 国旗专门模板：蓝船旗、联合旗和特克斯凯科斯徽章简化。 */ function drawTcFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#f0c83a", "#249064");
}
/** TD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawTdFlag() {
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
/** TF 国旗专门模板：法属南部领地按地区 emoji 常见回退绘制法国三色旗。 */ function drawTfFlag() {
    drawFranceFlag();
}
/** TG 国旗专门模板：绿黄横条、红 canton 和白星。 */ function drawTgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    for(let row = 0; row < 5; row += 1){
        drawFlagBand(flagBox, 0, row / 5, 1, (row + 1) / 5, row % 2 === 0 ? "#249064" : "#f0c83a", row % 2 === 0 ? "#176847" : "#a98218");
    }
    drawFlagBand(flagBox, 0, 0, 0.38, 0.6, "#c83c4a", "#8f2633");
    drawSketchStarWithColors(mapFlagX(0.19, 0.3, flagBox), mapFlagY(0.19, 0.3, flagBox), 20, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** TJ 国旗专门模板：红白绿横带和中心金冠星。 */ function drawTjFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.28, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.28, 1, 0.72, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.72, 1, 1, "#249064", "#176847");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 42, {
        stroke: "#a98218",
        strokeWidth: 1,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.5, 0.42, flagBox), mapFlagY(0.5, 0.42, flagBox), 12, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** TK 国旗专门模板：蓝底、左侧黄月和南十字星。 */ function drawTkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    render_context_roughCanvas.circle(mapFlagX(0.24, 0.34, flagBox), mapFlagY(0.24, 0.34, flagBox), 64, {
        stroke: "#a98218",
        strokeWidth: 1,
        fill: "#f0c83a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.28, 0.34, flagBox), mapFlagY(0.28, 0.34, flagBox), 58, {
        stroke: "#1b2c56",
        strokeWidth: 1,
        fill: "#253f78",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    [
        [
            0.68,
            0.34
        ],
        [
            0.82,
            0.48
        ],
        [
            0.66,
            0.64
        ],
        [
            0.78,
            0.76
        ]
    ].forEach(([u, v], index)=>drawSketchStar(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), index === 0 ? 12 : 9, -18 + index));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** TL 国旗专门模板：红底、黄黑双三角和白星。 */ function drawTlFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0, flagBox),
            mapFlagY(0, 0, flagBox)
        ],
        [
            mapFlagX(0.62, 0.5, flagBox),
            mapFlagY(0.62, 0.5, flagBox)
        ],
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ]
    ], {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon([
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
        stroke: "#111615",
        strokeWidth: 1.2,
        fill: "#262d2b",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 18, -18, {
        stroke: "#c7d1cc",
        fill: "#fbfdfa",
        hatch: "rgba(251, 253, 250, 0.7)"
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** TM 国旗专门模板：绿底、左侧地毯纹和白色星月。 */ function drawTmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0.12, 0.08, 0.22, 0.92, "#8b2934", "#63202a");
    for(let i = 0; i < 5; i += 1){
        render_context_roughCanvas.line(mapFlagX(0.13, 0.14 + i * 0.15, flagBox), mapFlagY(0.13, 0.14 + i * 0.15, flagBox), mapFlagX(0.21, 0.18 + i * 0.15, flagBox), mapFlagY(0.21, 0.18 + i * 0.15, flagBox), {
            stroke: "#f0c83a",
            strokeWidth: 1.4,
            roughness: 2.1,
            bowing: 1.4
        });
    }
    render_context_roughCanvas.circle(mapFlagX(0.42, 0.36, flagBox), mapFlagY(0.42, 0.36, flagBox), 54, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.46, 0.36, flagBox), mapFlagY(0.46, 0.36, flagBox), 48, {
        stroke: "#0f4f37",
        strokeWidth: 1,
        fill: "#176847",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.58, 0.34, flagBox), mapFlagY(0.58, 0.34, flagBox), 11, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** TN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawTnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.44, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.25, {
        stroke: "#8f2633",
        strokeWidth: 1.2,
        fill: "#c83c4a",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.21, {
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
/** TO 国旗专门模板：红底、白 canton 和红十字。 */ function drawToFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 0.42, 0.46, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0.16, 0.08, 0.26, 0.38, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.08, 0.18, 0.34, 0.28, "#c83c4a", "#8f2633");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** TR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawTrFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox), flagBox.height * 0.36, {
        stroke: "#c7d1cc",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), flagBox.height * 0.29, {
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
/** TT 国旗专门模板：红底白边黑色斜带。 */ function drawTtFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawCantonLine(flagBox, 0, 0, 1, 1, "#fbfdfa", 48);
    drawCantonLine(flagBox, 0, 0, 1, 1, "#262d2b", 28);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** TV 国旗专门模板：浅蓝船旗、联合旗和右侧黄星。 */ function drawTvFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#75a9d8", "#477aa5");
    drawUnionJackCanton(flagBox);
    [
        [
            0.7,
            0.28
        ],
        [
            0.84,
            0.42
        ],
        [
            0.74,
            0.58
        ],
        [
            0.88,
            0.7
        ],
        [
            0.62,
            0.74
        ]
    ].forEach(([u, v], index)=>drawSketchStar(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 9, -18 + index));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
    drawFlagBorder(flagBox);
}
/** TZ 国旗专门模板：绿蓝对角双色和黄边黑色斜带。 */ function drawTzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#249064", "#176847");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(1, 0, flagBox),
            mapFlagY(1, 0, flagBox)
        ],
        [
            mapFlagX(1, 1, flagBox),
            mapFlagY(1, 1, flagBox)
        ],
        [
            mapFlagX(0, 1, flagBox),
            mapFlagY(0, 1, flagBox)
        ]
    ], {
        stroke: "#2c6f9b",
        strokeWidth: 1,
        fill: "#4f9fd3",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawCantonLine(flagBox, 0, 1, 1, 0, "#f0c83a", 46);
    drawCantonLine(flagBox, 0, 1, 1, 0, "#262d2b", 28);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
    drawFlagBorder(flagBox);
}
/** UA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawUaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1, 0.5, "#3d78bd", "#284f84");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#f0c83a", "#a98218");
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d7653");
    drawFlagBorder(flagBox);
}
/** UG 国旗专门模板：黑黄红六横带和中心白圆鸟徽。 */ function drawUgFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#262d2b", "#111615");
    [
        "#262d2b",
        "#f0c83a",
        "#c83c4a",
        "#262d2b",
        "#f0c83a",
        "#c83c4a"
    ].forEach((fill, row)=>{
        drawFlagBand(flagBox, 0, row / 6, 1, (row + 1) / 6, fill, fill === "#262d2b" ? "#111615" : fill === "#f0c83a" ? "#a98218" : "#8f2633");
    });
    render_context_roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 76, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(mapFlagX(0.48, 0.42, flagBox), mapFlagY(0.48, 0.42, flagBox), mapFlagX(0.56, 0.58, flagBox), mapFlagY(0.56, 0.58, flagBox), {
        stroke: "#262d2b",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
    drawFlagBorder(flagBox);
}
/** UN 国旗专门模板：联合国蓝底与简化白色地球、橄榄枝徽记。 */ function drawUnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#5b9bd5", "#3a76a8");
    drawUnEmblem(flagBox);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d7aad");
    drawFlagBorder(flagBox);
}
/** UM 国旗专门模板：美国本土外小岛屿沿用美国国旗。 */ function drawUmFlag() {
    drawUnitedStatesFlag();
}
/** UY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawUyFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    for(let row = 1; row < 9; row += 2){
        drawFlagBand(flagBox, 0, row / 9, 1, (row + 1) / 9, "#2f78bd", "#20588e");
    }
    drawFlagBand(flagBox, 0, 0, 0.34, 5 / 9, "#fbfdfa", "#c7d1cc");
    render_context_roughCanvas.circle(mapFlagX(0.17, 0.27, flagBox), mapFlagY(0.17, 0.27, flagBox), 40, {
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
/** UZ 国旗专门模板：蓝白绿横带、红分隔线和星月。 */ function drawUzFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 0.32, "#4f9fd3", "#2c6f9b");
    drawFlagBand(flagBox, 0, 0.35, 1, 0.65, "#fbfdfa", "#c7d1cc");
    drawFlagBand(flagBox, 0, 0.68, 1, 1, "#249064", "#176847");
    drawFlagBand(flagBox, 0, 0.32, 1, 0.35, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.65, 1, 0.68, "#c83c4a", "#8f2633");
    render_context_roughCanvas.circle(mapFlagX(0.22, 0.16, flagBox), mapFlagY(0.22, 0.16, flagBox), 36, {
        stroke: "#c7d1cc",
        strokeWidth: 1,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(mapFlagX(0.25, 0.16, flagBox), mapFlagY(0.25, 0.16, flagBox), 32, {
        stroke: "#2c6f9b",
        strokeWidth: 1,
        fill: "#4f9fd3",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(mapFlagX(0.36, 0.14, flagBox), mapFlagY(0.36, 0.14, flagBox), 8, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
    drawFlagBorder(flagBox);
}
/** VC 国旗专门模板：蓝黄绿竖带和三颗绿钻。 */ function drawVcFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 0.25, 1, "#2f78bd", "#20588e");
    drawFlagBand(flagBox, 0.25, 0, 0.75, 1, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0.75, 0, 1, 1, "#249064", "#176847");
    [
        [
            0.45,
            0.48
        ],
        [
            0.55,
            0.48
        ],
        [
            0.5,
            0.6
        ]
    ].forEach(([u, v])=>{
        render_context_roughCanvas.polygon([
            [
                mapFlagX(u, v - 0.06, flagBox),
                mapFlagY(u, v - 0.06, flagBox)
            ],
            [
                mapFlagX(u + 0.04, v, flagBox),
                mapFlagY(u + 0.04, v, flagBox)
            ],
            [
                mapFlagX(u, v + 0.06, flagBox),
                mapFlagY(u, v + 0.06, flagBox)
            ],
            [
                mapFlagX(u - 0.04, v, flagBox),
                mapFlagY(u - 0.04, v, flagBox)
            ]
        ], {
            stroke: "#176847",
            strokeWidth: 1,
            fill: "#249064",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** VE 国旗专门模板：黄蓝红横带和蓝带星弧。 */ function drawVeFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#f0c83a", "#a98218");
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#253f78", "#1b2c56");
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
    for(let i = 0; i < 8; i += 1){
        const angle = Math.PI * (0.95 + i * 0.1);
        drawSketchStarWithColors(mapFlagX(0.5 + Math.cos(angle) * 0.22, 0.5, flagBox), mapFlagY(0.5 + Math.cos(angle) * 0.22, 0.5 + Math.sin(angle) * 0.18, flagBox), 8, -18 + i, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251,253,250,0.7)"
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
    drawFlagBorder(flagBox);
}
/** VG 国旗专门模板：蓝船旗、联合旗和维尔京群岛徽章简化。 */ function drawVgFlag() {
    drawBritishBlueEnsign("#243f78", "#1b2c56", "#fbfdfa", "#249064");
}
/** VI 国旗专门模板：白底、金色鹰形和字母感短线。 */ function drawViFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const cx = mapFlagX(0.5, 0.48, flagBox);
    const cy = mapFlagY(0.5, 0.48, flagBox);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
    drawSketchStar(cx, cy - 20, 26, -18);
    render_context_roughCanvas.line(cx - 70, cy + 50, cx - 32, cy + 10, {
        stroke: "#2f4f9d",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    render_context_roughCanvas.line(cx + 70, cy + 50, cx + 32, cy + 10, {
        stroke: "#249064",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    render_context_roughCanvas.line(cx - 28, cy + 28, cx + 28, cy + 28, {
        stroke: "#f0c83a",
        strokeWidth: 5,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
    drawFlagBorder(flagBox);
}
/** VN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawVnFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 54, -18);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** VU 国旗专门模板：红绿横底、黑黄 Y 形和左侧徽记。 */ function drawVuFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
    drawCantonLine(flagBox, 0, 0.5, 1, 0.5, "#f0c83a", 34);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.18, "#f0c83a", 28);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.82, "#f0c83a", 28);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.5, "#262d2b", 18);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.18, "#262d2b", 14);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.82, "#262d2b", 14);
    render_context_roughCanvas.circle(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 46, {
        stroke: "#f0c83a",
        strokeWidth: 2,
        fill: "transparent",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** WF 国旗专门模板：瓦利斯和富图纳按地区 emoji 常见回退绘制法国三色旗。 */ function drawWfFlag() {
    drawFranceFlag();
}
/** WS 国旗专门模板：红底、蓝 canton 和南十字星。 */ function drawWsFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0, 0.48, 0.55, "#253f78", "#1b2c56");
    [
        [
            0.2,
            0.18,
            11
        ],
        [
            0.34,
            0.27,
            9
        ],
        [
            0.24,
            0.39,
            11
        ],
        [
            0.38,
            0.44,
            8
        ]
    ].forEach(([u, v, radius], index)=>drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, -18 + index, {
            stroke: "#c7d1cc",
            fill: "#fbfdfa",
            hatch: "rgba(251,253,250,0.7)"
        }));
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
    drawFlagBorder(flagBox);
}
/** XK 国旗专门模板：蓝底、金色地图块和上方六星。 */ function drawXkFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#253f78", "#1b2c56");
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0.42, 0.48, flagBox),
            mapFlagY(0.42, 0.48, flagBox)
        ],
        [
            mapFlagX(0.58, 0.42, flagBox),
            mapFlagY(0.58, 0.42, flagBox)
        ],
        [
            mapFlagX(0.66, 0.62, flagBox),
            mapFlagY(0.66, 0.62, flagBox)
        ],
        [
            mapFlagX(0.48, 0.72, flagBox),
            mapFlagY(0.48, 0.72, flagBox)
        ]
    ], {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#f0c83a",
        fillStyle: "hachure",
        hachureGap: 8,
        fillWeight: 0.6,
        roughness: 2.2,
        bowing: 1.2
    });
    for(let i = 0; i < 6; i += 1){
        drawSketchStar(mapFlagX(0.34 + i * 0.065, 0.3, flagBox), mapFlagY(0.34 + i * 0.065, 0.3, flagBox), 8, -18 + i);
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
    drawFlagBorder(flagBox);
}
/** YE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */ function drawYeFlag() {
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
/** YT 国旗专门模板：马约特按地区 emoji 常见回退绘制法国三色旗。 */ function drawYtFlag() {
    drawFranceFlag();
}
/** ZA 国旗专门模板：南非 Y 形多色旗。 */ function drawZaFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0, 0.5, 1, 1, "#253f78", "#1b2c56");
    drawCantonLine(flagBox, 0, 0.5, 1, 0.5, "#fbfdfa", 58);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.22, "#fbfdfa", 48);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.78, "#fbfdfa", 48);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.5, "#f0c83a", 40);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.22, "#249064", 30);
    drawCantonLine(flagBox, 0, 0.5, 1, 0.78, "#249064", 30);
    render_context_roughCanvas.polygon([
        [
            mapFlagX(0, 0.1, flagBox),
            mapFlagY(0, 0.1, flagBox)
        ],
        [
            mapFlagX(0.32, 0.5, flagBox),
            mapFlagY(0.32, 0.5, flagBox)
        ],
        [
            mapFlagX(0, 0.9, flagBox),
            mapFlagY(0, 0.9, flagBox)
        ]
    ], {
        stroke: "#111615",
        strokeWidth: 1.2,
        fill: "#262d2b",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
    drawFlagBorder(flagBox);
}
/** ZM 国旗专门模板：绿底、右下三色竖带和飞鹰。 */ function drawZmFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#176847", "#0f4f37");
    drawFlagBand(flagBox, 0.72, 0.55, 0.8, 1, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, 0.8, 0.55, 0.88, 1, "#262d2b", "#111615");
    drawFlagBand(flagBox, 0.88, 0.55, 0.96, 1, "#ee8b2c", "#a9601d");
    render_context_roughCanvas.line(mapFlagX(0.76, 0.32, flagBox), mapFlagY(0.76, 0.32, flagBox), mapFlagX(0.92, 0.28, flagBox), mapFlagY(0.92, 0.28, flagBox), {
        stroke: "#ee8b2c",
        strokeWidth: 5,
        roughness: 2.4,
        bowing: 1.8
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
    drawFlagBorder(flagBox);
}
/** ZW 国旗专门模板：七横带、白三角和红星金鸟。 */ function drawZwFlag() {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const colors = [
        "#249064",
        "#f0c83a",
        "#c83c4a",
        "#262d2b",
        "#c83c4a",
        "#f0c83a",
        "#249064"
    ];
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#262d2b", "#111615");
    colors.forEach((fill, row)=>drawFlagBand(flagBox, 0, row / 7, 1, (row + 1) / 7, fill, fill === "#262d2b" ? "#111615" : softenColor(fill, 0.75)));
    render_context_roughCanvas.polygon([
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
        stroke: "#111615",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 28, -18, {
        stroke: "#8f2633",
        fill: "#c83c4a",
        hatch: "#d8585f"
    });
    render_context_roughCanvas.line(mapFlagX(0.16, 0.47, flagBox), mapFlagY(0.16, 0.47, flagBox), mapFlagX(0.26, 0.53, flagBox), mapFlagY(0.26, 0.53, flagBox), {
        stroke: "#f0c83a",
        strokeWidth: 4,
        roughness: 2.3,
        bowing: 1.5
    });
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
    drawFlagBorder(flagBox);
}
/** 返回大多数旗帜共用的画布内旗面矩形，后续归一化坐标都会映射到该区域。 */ function makeStandardFlagBox() {
    return {
        x: 118,
        y: 174,
        width: 486,
        height: 342
    };
}
/** 根据旗面轮廓偏移一层半透明多边形，形成手绘纸面上的轻微投影。 */ function drawFlagShadow(flag) {
    render_context_roughCanvas.polygon(offsetPoints(flag, 8, 10), {
        stroke: "transparent",
        fill: getPalette().shadow,
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
}
/** 绘制一个纯色粗糙旗面，作为具体图案、条带和徽章的底层。 */ function drawBlankFlag(flag, fill, stroke) {
    render_context_roughCanvas.polygon(flag, {
        stroke,
        strokeWidth: 2.4,
        fill,
        fillStyle: "solid",
        roughness: 2.4,
        bowing: 1.4
    });
}
/** 用重新抖动的矩形轮廓描边，让旗帜外框保持自然不完全重合。 */ function drawFlagBorder(flagBox) {
    render_context_roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
        stroke: "#28332e",
        strokeWidth: 2,
        fill: "transparent",
        roughness: 2.8,
        bowing: 1.6
    });
}
/** 绘制英式蓝船旗类地区旗：左上联合旗，右侧用简化盾徽表达属地徽章。 */ function drawBritishBlueEnsign(fill, stroke, badgeFill, badgeAccent) {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, fill, stroke);
    drawFlagBand(flagBox, 0, 0, 1, 1, fill, stroke);
    drawUnionJackCanton(flagBox);
    drawShieldBadge(flagBox, 0.74, 0.54, badgeFill, badgeAccent);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, stroke);
    drawFlagBorder(flagBox);
}
/** 绘制巴勒斯坦/西撒哈拉类横带红三角旗，可选星月。 */ function drawPsLikeFlag(topFill, middleFill, bottomFill, hasCrescentStar) {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    drawFlagShadow(flag);
    drawBlankFlag(flag, middleFill, "#c7d1cc");
    drawFlagBand(flagBox, 0, 0, 1, 1 / 3, topFill, topFill === "#262d2b" ? "#111615" : softenColor(topFill, 0.75));
    drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, middleFill, middleFill === "#fbfdfa" ? "#c7d1cc" : softenColor(middleFill, 0.75));
    drawFlagBand(flagBox, 0, 2 / 3, 1, 1, bottomFill, softenColor(bottomFill, 0.75));
    render_context_roughCanvas.polygon([
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
    if (hasCrescentStar) {
        render_context_roughCanvas.circle(mapFlagX(0.57, 0.5, flagBox), mapFlagY(0.57, 0.5, flagBox), 44, {
            stroke: "#8f2633",
            strokeWidth: 1,
            fill: "transparent",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStarWithColors(mapFlagX(0.64, 0.5, flagBox), mapFlagY(0.64, 0.5, flagBox), 13, -18, {
            stroke: "#8f2633",
            fill: "#c83c4a",
            hatch: "#d8585f"
        });
    }
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
    drawFlagBorder(flagBox);
}
/** 在给定旗面左上区域绘制简化联合旗，供澳大利亚等旗帜复用。 */ function drawUnionJackCanton(flagBox) {
    const canton = {
        x: flagBox.x,
        y: flagBox.y,
        width: flagBox.width * 0.5,
        height: flagBox.height * 0.5
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
/** 用归一化坐标在 canton 内画对角线，负责联合旗的斜十字部分。 */ function drawCantonLine(flagBox, u0, v0, u1, v1, stroke, strokeWidth) {
    render_context_roughCanvas.line(mapFlagX(u0, v0, flagBox), mapFlagY(u0, v0, flagBox), mapFlagX(u1, v1, flagBox), mapFlagY(u1, v1, flagBox), {
        stroke,
        strokeWidth,
        roughness: 2.4,
        bowing: 1.6
    });
}
/** 绘制联合国旗简化徽记：白色地球经纬线与两侧橄榄枝弧线。 */ function drawUnEmblem(flagBox) {
    const cx = mapFlagX(0.5, 0.52, flagBox);
    const cy = mapFlagY(0.52, 0.52, flagBox);
    const globeDiameter = flagBox.width * 0.22;
    const globeRadius = globeDiameter / 2;
    const emblemStroke = "#fbfdfa";
    const meridianStroke = "#e3eff8";
    const lineStyle = {
        stroke: meridianStroke,
        strokeWidth: 1,
        roughness: 2.1,
        bowing: 1.3
    };
    render_context_roughCanvas.circle(cx, cy, globeDiameter, {
        stroke: emblemStroke,
        strokeWidth: 1.2,
        fill: emblemStroke,
        fillStyle: "solid",
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx, cy - globeRadius, cx, cy + globeRadius, lineStyle);
    render_context_roughCanvas.line(cx - globeRadius, cy, cx + globeRadius, cy, lineStyle);
    render_context_roughCanvas.line(cx - globeRadius * 0.72, cy - globeRadius * 0.38, cx + globeRadius * 0.72, cy + globeRadius * 0.38, lineStyle);
    render_context_roughCanvas.line(cx - globeRadius * 0.72, cy + globeRadius * 0.38, cx + globeRadius * 0.72, cy - globeRadius * 0.38, lineStyle);
    const wreathRadius = globeRadius * 1.48;
    const wreathYOffset = globeRadius * 0.1;
    drawUnWreathArc(cx, cy + wreathYOffset, wreathRadius, Math.PI * 5 / 6, Math.PI / 2, emblemStroke);
    drawUnWreathArc(cx, cy + wreathYOffset, wreathRadius, Math.PI / 6, Math.PI / 2, emblemStroke);
}
/** 用折线近似橄榄枝半弧，供联合国旗徽记两侧复用。 */ function drawUnWreathArc(cx, cy, radius, startRad, endRad, stroke) {
    const steps = 11;
    let previousX = cx + Math.cos(startRad) * radius;
    let previousY = cy + Math.sin(startRad) * radius;
    for(let step = 1; step <= steps; step += 1){
        const angle = startRad + (endRad - startRad) * step / steps;
        const nextX = cx + Math.cos(angle) * radius + jitter(0.8);
        const nextY = cy + Math.sin(angle) * radius + jitter(0.8);
        render_context_roughCanvas.line(previousX, previousY, nextX, nextY, {
            stroke,
            strokeWidth: 2.1,
            roughness: 2.4,
            bowing: 1.6
        });
        previousX = nextX;
        previousY = nextY;
    }
}
/** 绘制西班牙旗左侧简化徽章：盾形、冠饰和少量手绘线条。 */ function drawSpainEmblem(flagBox) {
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
            cx + shieldWidth * 0.42 + jitter(1.4),
            cy + shieldHeight * 0.22 + jitter(1.4)
        ],
        [
            cx + jitter(1.2),
            cy + shieldHeight / 2 + jitter(1.4)
        ],
        [
            cx - shieldWidth * 0.42 + jitter(1.4),
            cy + shieldHeight * 0.22 + jitter(1.4)
        ]
    ];
    render_context_roughCanvas.polygon(shield, {
        stroke: "#6f2a2b",
        strokeWidth: 1.25,
        fill: "#d8483f",
        fillStyle: "solid",
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.rectangle(cx - 14 + jitter(1), cy - 18 + jitter(1), 28, 25, {
        stroke: "#a77613",
        strokeWidth: 0.9,
        fill: "#f4d24a",
        fillStyle: "hachure",
        hachureGap: 6,
        fillWeight: 0.75,
        roughness: 1.9,
        bowing: 1.1
    });
    render_context_roughCanvas.circle(cx, cy - 42, 19, {
        stroke: "#8b6418",
        strokeWidth: 1,
        fill: "#f4d24a",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    drawSketchStar(cx, cy - 44, 7, 0);
    render_context_roughCanvas.line(cx - 24, cy - 33, cx + 24, cy - 33 + jitter(2), {
        stroke: "#8b6418",
        strokeWidth: 1.05,
        roughness: 2.3,
        bowing: 1.6
    });
}
/** 绘制梵蒂冈旗简化徽章：交叉钥匙、圆形装饰和红色横线。 */ function drawVaticanEmblem(flagBox) {
    const cx = mapFlagX(0.74, 0.53, flagBox);
    const cy = mapFlagY(0.53, 0.53, flagBox);
    render_context_roughCanvas.line(cx - 44, cy + 42, cx + 36, cy - 46, {
        stroke: "#b78716",
        strokeWidth: 4.2,
        roughness: 2.5,
        bowing: 1.8
    });
    render_context_roughCanvas.line(cx + 44, cy + 42, cx - 36, cy - 46, {
        stroke: "#a7adb1",
        strokeWidth: 4.2,
        roughness: 2.5,
        bowing: 1.8
    });
    render_context_roughCanvas.circle(cx - 36, cy - 42, 27, {
        stroke: "#8b6418",
        strokeWidth: 1.5,
        fill: "#f4d24a",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.85,
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(cx + 36, cy - 42, 27, {
        stroke: "#7d858a",
        strokeWidth: 1.5,
        fill: "#dce2e0",
        fillStyle: "hachure",
        hachureGap: 7,
        fillWeight: 0.85,
        roughness: 2.1,
        bowing: 1.2
    });
    render_context_roughCanvas.circle(cx, cy - 58, 34, {
        stroke: "#a98218",
        strokeWidth: 1.5,
        fill: "#f7e1a0",
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.3
    });
    render_context_roughCanvas.rectangle(cx - 24 + jitter(1), cy - 72 + jitter(1), 48, 24, {
        stroke: "#a98218",
        strokeWidth: 1.2,
        fill: "#fbfdfa",
        fillStyle: "hachure",
        hachureGap: 6,
        fillWeight: 0.7,
        roughness: 2,
        bowing: 1.2
    });
    render_context_roughCanvas.line(cx - 34, cy - 19, cx + 34, cy - 19 + jitter(2), {
        stroke: "#c23d45",
        strokeWidth: 3.2,
        roughness: 2.4,
        bowing: 1.5
    });
}
/** 把归一化矩形区域转换为旗面多边形，先铺纯色再叠加 hachure 纹理。 */ function drawFlagBand(flagBox, u0, v0, u1, v1, fill, stroke) {
    render_context_roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
        stroke,
        strokeWidth: 1.2,
        fill,
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
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
/** 在美国国旗 canton 的归一化范围内按 6/5 交错排列绘制星星。 */ function drawUSStars(flagBox) {
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
            drawSketchStar(x, y, 6.4, -18 + row * 2);
        }
    }
}
/** 绘制简化盾徽，供少数中心徽章旗帜在独立函数内组合使用。 */ function drawShieldBadge(flagBox, u, v, fill, accent) {
    const cx = mapFlagX(u, v, flagBox);
    const cy = mapFlagY(u, v, flagBox);
    const width = flagBox.width * 0.13;
    const height = flagBox.height * 0.22;
    render_context_roughCanvas.polygon([
        [
            cx - width / 2,
            cy - height / 2
        ],
        [
            cx + width / 2,
            cy - height / 2
        ],
        [
            cx + width * 0.42,
            cy + height * 0.16
        ],
        [
            cx,
            cy + height / 2
        ],
        [
            cx - width * 0.42,
            cy + height * 0.16
        ]
    ], {
        stroke: softenColor(accent, 0.75),
        strokeWidth: 1.2,
        fill,
        fillStyle: "solid",
        roughness: 2.2,
        bowing: 1.15
    });
    render_context_roughCanvas.line(cx - width * 0.32, cy, cx + width * 0.32, cy, {
        stroke: accent,
        strokeWidth: 1,
        roughness: 2.1,
        bowing: 1.4
    });
    render_context_roughCanvas.line(cx, cy - height * 0.36, cx, cy + height * 0.28, {
        stroke: accent,
        strokeWidth: 1,
        roughness: 2.1,
        bowing: 1.4
    });
}
/** 用旋转局部坐标绘制韩国国旗四卦，true 为整线，false 为断线。 */ function drawKoreanTrigram(flagBox, u, v, rotationDegrees, rows) {
    const cx = mapFlagX(u, v, flagBox);
    const cy = mapFlagY(u, v, flagBox);
    const rotation = rotationDegrees * Math.PI / 180;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const lineLength = flagBox.width * 0.17;
    const rowGap = flagBox.height * 0.044;
    const breakGap = flagBox.width * 0.032;
    const toCanvasPoint = (localX, localY)=>[
            cx + localX * cos - localY * sin,
            cy + localX * sin + localY * cos
        ];
    rows.forEach((isSolid, index)=>{
        const y = (index - 1) * rowGap;
        if (isSolid) {
            const [x1, y1] = toCanvasPoint(-lineLength / 2, y);
            const [x2, y2] = toCanvasPoint(lineLength / 2, y);
            render_context_roughCanvas.line(x1, y1, x2, y2, {
                stroke: "#262d2b",
                strokeWidth: 5.2,
                roughness: 2.1,
                bowing: 1.45
            });
            return;
        }
        [
            [
                -lineLength / 2,
                -breakGap
            ],
            [
                breakGap,
                lineLength / 2
            ]
        ].forEach(([startX, endX])=>{
            const [x1, y1] = toCanvasPoint(startX, y);
            const [x2, y2] = toCanvasPoint(endX, y);
            render_context_roughCanvas.line(x1, y1, x2, y2, {
                stroke: "#262d2b",
                strokeWidth: 5.2,
                roughness: 2.1,
                bowing: 1.45
            });
        });
    });
}
/** 专门模板使用低密度结构采样，避免新增旗帜呈现为像素 fallback。 */ function drawSampledFlagTemplate(flagEmoji) {
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
/** 未覆盖输入的兜底绘制流程，保留较克制的细节数量以控制性能。 */ function drawGenericFlag(flagEmoji) {
    drawSampledFlag(flagEmoji, {
        detailLimit: 180,
        hachureGap: 18,
        textureWeight: 0.38
    });
}
/** 给结构化模板铺一层类似已有手写旗面的主色 hachure 底纹。 */ function drawTemplateBaseWash(flag, dominant) {
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
/** 用大色块绘制新增模板，弱化像素采样感，贴近原有旗帜的粗糙布面。 */ function drawTemplateFlagSegments(segments) {
    segments.filter((segment)=>segment.area > 420).forEach((segment, index)=>{
        roughCanvas.polygon(segment.outline, {
            stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.12)" : softenColor(segment.color, 0.4),
            strokeWidth: segment.isLightNeutral ? 0.55 : 1.05,
            fill: segment.color,
            fillStyle: "solid",
            roughness: 2.35,
            bowing: 1.32
        });
        if (!segment.isLightNeutral && (segment.area > 2600 || index % 3 === 0)) {
            roughCanvas.polygon(segment.outline, {
                stroke: "rgba(38, 49, 45, 0.09)",
                strokeWidth: 0.45,
                fill: segment.color,
                fillStyle: "hachure",
                hachureAngle: -12,
                hachureGap: 15,
                fillWeight: 0.42,
                roughness: 1.95
            });
        }
    });
}
/** 为复杂徽章、星月和小 canton 留少量手绘标记，但避免密集像素点。 */ function drawTemplateDetailMarks(source, flagBox, dominant) {
    const { data, bounds } = source;
    const pixels = data.data;
    const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
    const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
    const step = Math.max(14, Math.floor(data.width / 30));
    let detailCount = 0;
    for(let y = bounds.minY + step; y < bounds.maxY - step; y += step){
        for(let x = bounds.minX + step; x < bounds.maxX - step; x += step){
            const index = (y * data.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 64 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) {
                continue;
            }
            const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
            const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
            if (isLightNeutral && detailCount % 4 !== 0) {
                continue;
            }
            const u = (x - bounds.minX) / contentWidth;
            const v = (y - bounds.minY) / contentHeight;
            const px = mapFlagX(u, v, flagBox) + jitter(1.5);
            const py = mapFlagY(u, v, flagBox) + jitter(1.5);
            const color = "rgba(" + metrics.red + ", " + metrics.green + ", " + metrics.blue + ", " + (isLightNeutral ? 0.42 : 0.76) + ")";
            if (!isLightNeutral && metrics.brightness > 150 && metrics.saturation > 42 && detailCount % 5 === 0) {
                drawSketchStarWithColors(px, py, randomBetween(6, 9), -18 + detailCount * 3, {
                    stroke: softenColor(color, 0.45),
                    fill: color,
                    hatch: softenColor(color, 0.24)
                });
            } else {
                roughCanvas.circle(px, py, randomBetween(5.2, 9.4), {
                    stroke: isLightNeutral ? "rgba(38, 49, 45, 0.2)" : softenColor(color, 0.46),
                    strokeWidth: isLightNeutral ? 0.55 : 0.9,
                    fill: color,
                    fillStyle: "solid",
                    roughness: 2.2,
                    bowing: 1.15
                });
            }
            if (!isLightNeutral && detailCount % 6 === 0) {
                roughCanvas.line(px + jitter(5), py + jitter(4), px + jitter(16), py + jitter(10), {
                    stroke: "rgba(38, 49, 45, 0.2)",
                    strokeWidth: randomBetween(0.45, 0.75),
                    roughness: 2.4,
                    bowing: 1.7
                });
            }
            detailCount += 1;
            if (detailCount > 38) {
                return;
            }
        }
    }
    if (detailCount < 4) {
        roughCanvas.line(flagBox.x + flagBox.width * 0.18, flagBox.y + flagBox.height * 0.5 + jitter(7), flagBox.x + flagBox.width * 0.82, flagBox.y + flagBox.height * 0.5 + jitter(7), {
            stroke: softenColor(dominant, 0.2),
            strokeWidth: 0.65,
            roughness: 2.4,
            bowing: 1.8
        });
    }
}
/**
 * 采样式国旗绘制 primitive：
 * 1. 先把 emoji 画到离屏 canvas 取得像素；
 * 2. 把有效像素按网格采样并合并成颜色段；
 * 3. 将颜色段映射回旗面坐标，叠加轮廓、细节点、布纹和边框。
 */ function drawSampledFlag(flagEmoji, options) {
    const flagBox = makeStandardFlagBox();
    const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
    const source = rasterizeFlagEmoji(flagEmoji, 560);
    const segments = collectFlagSegments(source, flagBox);
    const dominant = getDominantFlagColor(segments) || "#d94444";
    drawFlagShadow(flag);
    drawBlankFlag(flag, "#fbfdfa", "#b9c4c0");
    render_context_roughCanvas.polygon(flag, {
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
        render_context_roughCanvas.polygon(segment.outline, {
            stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.08)" : softenColor(segment.color, 0.42),
            strokeWidth: segment.isLightNeutral ? 0.35 : 0.75,
            fill: segment.color,
            fillStyle: "solid",
            roughness: 2.25,
            bowing: 1.35
        });
        if (!segment.isLightNeutral && segment.shouldTexture) {
            render_context_roughCanvas.polygon(segment.outline, {
                stroke: "rgba(38, 49, 45, 0.08)",
                strokeWidth: 0.35,
                fill: segment.color,
                fillStyle: "hachure",
                hachureAngle: -12,
                hachureGap: 20,
                fillWeight: 0.3,
                roughness: 1.8
            });
        }
    });
    drawFlagImageDetails(source, flagBox, options.detailLimit);
    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
    drawFlagBorder(flagBox);
}
/**
 * 从栅格图里寻找边缘/高对比细节，把它们转成旗面上的小圆点和短线。
 * 这些细节弥补颜色段过于块状的问题，尤其适合徽章、十字和星月等小图案。
 */ function drawFlagImageDetails(source, flagBox, maxDetails = 180) {
    const { data, bounds } = source;
    const pixels = data.data;
    const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
    const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
    const step = Math.max(5, Math.floor(data.width / 88));
    let detailCount = 0;
    let candidateCount = 0;
    for(let y = bounds.minY + step; y < bounds.maxY - step; y += step){
        for(let x = bounds.minX + step; x < bounds.maxX - step; x += step){
            const index = (y * data.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 48 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) {
                continue;
            }
            const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
            const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
            candidateCount += 1;
            if (isLightNeutral && candidateCount % 3 !== 0) {
                continue;
            }
            const u = (x - bounds.minX) / contentWidth;
            const v = (y - bounds.minY) / contentHeight;
            const px = mapFlagX(u, v, flagBox) + jitter(1.4);
            const py = mapFlagY(u, v, flagBox) + jitter(1.4);
            const color = `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.48 : 0.82})`;
            render_context_roughCanvas.circle(px, py, randomBetween(3.4, 6.8), {
                stroke: isLightNeutral ? "rgba(38, 49, 45, 0.18)" : softenColor(color, 0.5),
                strokeWidth: isLightNeutral ? 0.5 : 0.8,
                fill: color,
                fillStyle: "solid",
                roughness: 2.1,
                bowing: 1.1
            });
            if (!isLightNeutral && detailCount % 4 === 0) {
                render_context_roughCanvas.line(px + jitter(5), py + jitter(5), px + jitter(14), py + jitter(12), {
                    stroke: "rgba(38, 49, 45, 0.24)",
                    strokeWidth: randomBetween(0.45, 0.8),
                    roughness: 2.4,
                    bowing: 1.6
                });
            }
            detailCount += 1;
            if (detailCount > maxDetails) {
                return;
            }
        }
    }
}
/** 比较中心像素与周围像素的 alpha/颜色差，判断该点是否处在图案边缘或细节处。 */ function isFlagDetailPixel(pixels, width, height, x, y, distance) {
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
        if (Math.abs(centerAlpha - alpha) > 90 || alpha < 32) {
            return true;
        }
        const diff = Math.abs(pixels[index] - pixels[nextIndex]) + Math.abs(pixels[index + 1] - pixels[nextIndex + 1]) + Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);
        return diff > 118;
    });
}
/** 把标准矩形拆成多段边线并加入随机扰动，生成 Rough.js 可用的手绘轮廓点。 */ function makeSketchRect(x, y, width, height) {
    const steps = 6;
    const edgeJitter = 5.2;
    const alongJitter = 2.2;
    const points = [];
    for(let i = 0; i <= steps; i += 1){
        points.push([
            x + width * i / steps + jitter(alongJitter),
            y + jitter(edgeJitter)
        ]);
    }
    for(let i = 0; i <= steps; i += 1){
        points.push([
            x + width + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
    }
    for(let i = steps; i >= 0; i -= 1){
        points.push([
            x + width * i / steps + jitter(alongJitter),
            y + height + jitter(edgeJitter)
        ]);
    }
    for(let i = steps; i >= 0; i -= 1){
        points.push([
            x + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
    }
    return points;
}
/** 在旗面内部绘制纵横短线，模拟布料折痕和手绘笔触。 */ function drawFabricStrokes(x, y, width, height, color) {
    for(let i = 0; i < 5; i += 1){
        const px = x + width * (i + 0.6) / 7 + jitter(10);
        render_context_roughCanvas.line(px, y + jitter(14), px + jitter(18), y + height + jitter(14), {
            stroke: color,
            strokeWidth: randomBetween(0.55, 1.05),
            roughness: 2.2,
            bowing: 2.4
        });
    }
    for(let i = 0; i < 3; i += 1){
        const py = y + height * (i + 0.8) / 5 + jitter(8);
        render_context_roughCanvas.line(x + jitter(10), py, x + width + jitter(10), py + jitter(18), {
            stroke: color,
            strokeWidth: randomBetween(0.45, 0.85),
            roughness: 2.4,
            bowing: 1.9
        });
    }
}
/** 使用默认黄色配色绘制手绘五角星。 */ function drawSketchStar(cx, cy, radius, rotationDegrees) {
    drawSketchStarWithColors(cx, cy, radius, rotationDegrees, {
        stroke: "#b68b12",
        fill: "#ffd84c",
        hatch: "#ffec62"
    });
}
/** 计算五角星外/内顶点，再用纯色和 hachure 两层多边形形成粗糙质感。 */ function drawSketchStarWithColors(cx, cy, radius, rotationDegrees, colors) {
    const points = [];
    const rotation = rotationDegrees * Math.PI / 180 - Math.PI / 2;
    for(let i = 0; i < 10; i += 1){
        const angle = rotation + i * Math.PI / 5;
        const pointRadius = i % 2 === 0 ? radius : radius * 0.42;
        points.push([
            cx + Math.cos(angle) * pointRadius + jitter(radius * 0.05),
            cy + Math.sin(angle) * pointRadius + jitter(radius * 0.05)
        ]);
    }
    render_context_roughCanvas.polygon(points, {
        stroke: colors.stroke,
        strokeWidth: Math.max(1.2, radius * 0.08),
        fill: colors.fill,
        fillStyle: "solid",
        roughness: 2.3,
        bowing: 1.2
    });
    render_context_roughCanvas.polygon(points, {
        stroke: colors.hatch,
        strokeWidth: Math.max(0.8, radius * 0.04),
        fill: colors.fill,
        fillStyle: "hachure",
        hachureAngle: -22,
        hachureGap: Math.max(6, radius * 0.22),
        fillWeight: 1,
        roughness: 2.2
    });
}
/**
 * 将浏览器原生 emoji 字体渲染到离屏 canvas。
 * 输出 ImageData 和非透明像素边界，供后续网格采样只关注旗帜内容区域。
 */ function rasterizeFlagEmoji(flagEmoji, offscreenSize) {
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
    offscreenCtx.font = `${Math.round(offscreenSize * 0.68)}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
    offscreenCtx.fillText(flagEmoji, offscreenSize / 2, offscreenSize / 2 + offscreenSize * 0.02);
    const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    return {
        data: imageData,
        bounds: findPixelBounds(imageData)
    };
}
/**
 * 把栅格化后的旗帜切成 64x40 网格并按行扫描。
 * 相邻且颜色 bucket 相同的格子会合并成一个 segment，后续直接绘制为粗糙多边形。
 */ function collectFlagSegments(source, flagBox, columns = 64, rows = 40) {
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
            if (!run || run.bucket !== bucket) {
                if (run) {
                    segments.push(createFlagSegment(run, row, columns, rows, flagBox));
                }
                run = {
                    bucket,
                    startColumn: column,
                    endColumn: column,
                    cells: [
                        cell
                    ]
                };
            } else {
                run.endColumn = column;
                run.cells.push(cell);
            }
        }
        if (run) {
            segments.push(createFlagSegment(run, row, columns, rows, flagBox));
        }
    }
    return segments;
}
/**
 * 对一个归一化网格单元取 5 个采样点，平均 RGB/alpha 得到该单元的代表色。
 * 返回 null 表示该格子基本透明，不参与旗面分段。
 */ function sampleFlagCell(pixels, width, bounds, contentWidth, contentHeight, u0, v0, u1, v1) {
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
        if (alpha < 30) {
            return acc;
        }
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
    if (!totals.count) {
        return null;
    }
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
/** 将系统 emoji 渲染时常见的高亮灰白色归一成纸白，减少无意义灰块。 */ function normalizeFlagMetrics(metrics) {
    const isSystemHighlight = metrics.saturation < 28 && metrics.brightness > 110;
    if (isSystemHighlight) {
        return {
            red: 250,
            green: 252,
            blue: 249,
            brightness: 250.3,
            saturation: 3
        };
    }
    return metrics;
}
/** 将颜色量化到较粗的 bucket，让相近颜色能在同一行内合并为连续色段。 */ function getFlagSegmentBucket(metrics, isLightNeutral) {
    if (isLightNeutral) {
        return "light";
    }
    return `${Math.round(metrics.red / 34) * 34}-${Math.round(metrics.green / 34) * 34}-${Math.round(metrics.blue / 34) * 34}`;
}
/** 将扫描行中的连续 run 转成可绘制 segment：颜色、面积、纹理标记和旗面轮廓。 */ function createFlagSegment(run, row, columns, rows, flagBox) {
    const metrics = averageMetrics(run.cells);
    const isLightNeutral = run.cells.filter((cell)=>cell.isLightNeutral).length > run.cells.length * 0.58;
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
/** 对一组网格单元求平均颜色指标，用作合并后 segment 的最终颜色。 */ function averageMetrics(cells) {
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
/** 统计非浅色 segment 的主色，用于通用旗面的底纹和布纹颜色。 */ function getDominantFlagColor(cells) {
    const groups = new Map();
    cells.forEach((cell)=>{
        if (cell.isLightNeutral) {
            return;
        }
        const key = `${Math.round(cell.metrics.red / 36) * 36}-${Math.round(cell.metrics.green / 36) * 36}-${Math.round(cell.metrics.blue / 36) * 36}`;
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
    if (!dominant) {
        return null;
    }
    return `rgb(${Math.round(dominant.red / dominant.count)}, ${Math.round(dominant.green / dominant.count)}, ${Math.round(dominant.blue / dominant.count)})`;
}
/** 将归一化网格边界映射到画布旗面区域，并加轻微重叠/抖动避免缝隙。 */ function makeFlagCellOutline(u0, v0, u1, v1, flagBox) {
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
/** 将旗面归一化横坐标 u 映射到画布 x 坐标。 */ function mapFlagX(u, v, flagBox) {
    return flagBox.x + flagBox.width * u;
}
/** 将旗面归一化纵坐标 v 映射到画布 y 坐标。 */ function mapFlagY(u, v, flagBox) {
    return flagBox.y + flagBox.height * v;
}
/** 扫描 ImageData，找出 alpha 足够高的最小包围盒，去掉 emoji 周围透明留白。 */ function findPixelBounds(imageData) {
    const { data, width, height } = imageData;
    const bounds = {
        minX: width,
        minY: height,
        maxX: 0,
        maxY: 0
    };
    for(let y = 0; y < height; y += 1){
        for(let x = 0; x < width; x += 1){
            if (data[(y * width + x) * 4 + 3] < 24) {
                continue;
            }
            bounds.minX = Math.min(bounds.minX, x);
            bounds.minY = Math.min(bounds.minY, y);
            bounds.maxX = Math.max(bounds.maxX, x);
            bounds.maxY = Math.max(bounds.maxY, y);
        }
    }
    if (bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) {
        return {
            minX: 0,
            minY: 0,
            maxX: width,
            maxY: height
        };
    }
    return bounds;
}
/** 从 ImageData 像素数组读取 RGB，并派生亮度与饱和度差值。 */ function getColorMetrics(pixels, index) {
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
/** 平移一组点位，常用于从旗面轮廓生成投影轮廓。 */ function offsetPoints(points, x, y) {
    return points.map((point)=>[
            point[0] + x,
            point[1] + y
        ]);
}
/** 将 rgb/rgba 字符串替换成指定透明度，便于复用同一颜色的弱描边版本。 */ function softenColor(color, alpha) {
    const channels = color.match(/rgba?\(([^)]+)\)/);
    if (!channels) {
        return color;
    }
    return `rgba(${channels[1].split(",").slice(0, 3).join(",")}, ${alpha})`;
}
/** 在区间内生成随机数，是所有手绘扰动的基础。 */ function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}
/** 生成正负范围内的随机偏移，让边缘、点位和线条产生手绘不稳定感。 */ function jitter(amount) {
    return randomBetween(-amount, amount);
}
/** 专门模板分发表：每个标准国旗都有独立绘制入口，避免大量 if 分支。 */ const templateDrawers = {
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
    [TEMPLATE_FLAGS.tw]: drawChinaFlag,
    [TEMPLATE_FLAGS.tz]: drawTzFlag,
    [TEMPLATE_FLAGS.ua]: drawUaFlag,
    [TEMPLATE_FLAGS.ug]: drawUgFlag,
    [TEMPLATE_FLAGS.um]: drawUmFlag,
    [TEMPLATE_FLAGS.un]: drawUnFlag,
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


/** 把任意输入规范化为可绘制的国旗 emoji；非法输入回退到中国国旗。 */ function resolveFlag(value) {
    const input = String(value || "").trim();
    return isFlagEmoji(input) ? input : DEFAULT_FLAG;
}
/** 判断字符串是否由两个区域指示符组成，这是 Unicode 国旗 emoji 的编码形式。 */ function isFlagEmoji(value) {
    const codePoints = [
        ...value
    ].map((char)=>char.codePointAt(0));
    return codePoints.length === 2 && codePoints.every((codePoint)=>codePoint !== undefined && codePoint >= (/* inlined export .REGION_INDICATOR_MIN_CODE_POINT */127462) && codePoint <= (/* inlined export .REGION_INDICATOR_MAX_CODE_POINT */127487));
}





/** 绘制流程封装实例，外部入口只需要把已解析的国旗交给它。 */ let renderer;
/** 页面和 QA 工具共享的绘制门面：输入 emoji，输出到指定 canvas。 */ const RoughEmoji = {
    draw (canvasElement, value) {
        withCanvas(canvasElement, ()=>renderer.draw(resolveFlag(value)));
    },
    isFlagEmoji: isFlagEmoji,
    resolveFlag: resolveFlag,
    setTheme: setDrawTheme,
    getTheme: getDrawTheme
};
/** 国旗绘制器：负责清理画布、绘制纸张背景、模板分发和 fallback。 */ class RoughEmojiRenderer {
    /** 绘制总入口：先铺纸张背景，再按已知旗帜走专门模板，未知旗帜走像素采样流程。 */ draw(flag) {
        this.clearCanvas();
        this.drawPaper();
        const templateDrawer = templateDrawers[flag];
        if (templateDrawer) {
            templateDrawer();
            return;
        }
        drawGenericFlag(flag);
    }
    /** 清空当前画布，为下一次完整重绘做准备。 */ clearCanvas() {
        ctx.clearRect(0, 0, size, size);
    }
    /** 绘制统一纸张底色和粗糙边框，给所有旗帜提供一致的手写载体。 */ drawPaper() {
        const palette = getPalette();
        ctx.fillStyle = palette.paper;
        ctx.fillRect(0, 0, size, size);
        render_context_roughCanvas.rectangle(46, 46, size - 92, size - 92, {
            roughness: 1.4,
            bowing: 0.8,
            stroke: palette.frame,
            strokeWidth: 1.2,
            fill: palette.paper,
            fillStyle: "hachure",
            hachureGap: 24,
            fillWeight: 0.28
        });
    }
}
renderer = new RoughEmojiRenderer();




export { RoughEmoji, isFlagEmoji, resolveFlag };
