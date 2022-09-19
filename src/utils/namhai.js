window.N = {}

let N = {};
N.Ease = {
  linear: t => t,
  i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
  o1: t => Math.sin(t * (.5 * Math.PI)),
  io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
  i2: t => t * t,
  o2: t => t * (2 - t),
  io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
  i3: t => t * t * t,
  o3: t => --t * t * t + 1,
  io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  i4: t => t * t * t * t,
  o4: t => 1 - --t * t * t * t,
  io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  i5: t => t * t * t * t * t,
  o5: t => 1 + --t * t * t * t * t,
  io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
  o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
  io6: t => 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t)),
}
N.complexEase = {
  ExpoIn: function (t) {
    return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
  },
  ExpoOut: function (t) {
    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
  },
  ExpoInOut: function (t) {
    return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
  },
  CircIn: function (t) {
    return -(Math.sqrt(1 - t * t) - 1)
  },
  CircOut: function (t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2))
  },
  CircInOut: function (t) {
    return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
  },
  BackIn: function (t) {
    return t * t * ((o.s + 1) * t - o.s)
  },
  BackOut: function (t) {
    return (t -= 1) * t * ((o.s + 1) * t + o.s) + 1
  },
  BackInOut: function (t) {
    return (t /= .5) < 1 ? t * t * ((1 + (o.s *= o.r)) * t - o.s) * .5 : .5 * ((t -= 2) * t * ((1 + (o.s *= o.r)) * t + o.s) + 2)
  },
  Elastic: function (t) {
    return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1
  },
  SwingFromTo: function (t) {
    return (t /= .5) < 1 ? t * t * ((1 + (o.s *= o.r)) * t - o.s) * .5 : .5 * ((t -= 2) * t * ((1 + (o.s *= o.r)) * t + o.s) + 2)
  },
  SwingFrom: function (t) {
    return t * t * ((o.s + 1) * t - o.s)
  },
  SwingTo: function (t) {
    return (t -= 1) * t * ((o.s + 1) * t + o.s) + 1
  },
  Bounce: function (t) {
    return t < 1 / o.x ? o.v * t * t : t < 2 / o.x ? o.v * (t -= 1.5 / o.x) * t + o.z : t < 2.5 / o.x ? o.v * (t -= o.q / o.x) * t + o.w : o.v * (t -= o.y / o.x) * t + o.u
  },
  BouncePast: function (t) {
    return t < 1 / o.x ? o.v * t * t : t < 2 / o.x ? 2 - (o.v * (t -= 1.5 / o.x) * t + o.z) : t < 2.5 / o.x ? 2 - (o.v * (t -= o.q / o.x) * t + o.w) : 2 - (o.v * (t -= o.y / o.x) * t + o.u)
  }
}

N.Lerp = function (xi, xf, t) {
  return (1 - t) * xi + t * xf
};

N.iLerp = function (x, xi, xf) {
  return (x - xi) / (xf - xi)
}

N.Clamp = function (x, min, max) {
  return Math.max(Math.min(x, max), min)
}

N.map = function (x, start1, end1, start2, end2) {
  return N.Lerp(start2, end2, N.iLerp(x, start1, end1))
}

N.get = (t, c) => {
  const e = c || document;
  return e["querySelector"](t)
}
N.getAll = function (tag, context) {
  const e = context || document;
  return e["querySelectorAll"](tag)
}
N.Select = (t) => {
  let el = []
  return N.Is.str(t) ? el = N.getAll(t) : (t instanceof window.NodeList || Array.isArray(t)) ? el = t : el = [t]
}
N.tag = {
  tag: t => '#' === t.charAt(0) ? 'id' : 'class',
  name: t => t.substring(1)
}


N.Cr = t => document.createElement(t);


/** Return l'index de l'element */
N.index = function (el, list) {
  const n = list.length;
  for (let i = 0; i < n; i++)
    if (list[i] === el) return i
  return -1
}

N.Index = {
  /** L'indice de l'element par rapport a son parent */
  list: (el) => N.index(el, el.parentNode.childer),

  /** L'indice de l'element par rapport au element de la meme classe, relatif au contexte */
  class: (el, tag, context) => N.index(el, N.get(context, tag))
}

/** Arrondie à la decimal pres, au centieme de base */
N.Round = (x, decimal) => {
  decimal = N.Is.und(decimal) ? 100 : 10 ** decimal;
  return Math.round(x * decimal) / decimal
}

N.Rand = {
  range: (min, max, step = 1) => N.Round(Math.random() * (max - min) + min, step),

  uniq: n => {
    const s = [];
    for (let t = 0; t < n; t++) s[t] = t;
    let t = n;
    for (var e, i; t--;) e = ~~(Math.random() * (t + 1)), i = s[t], s[t] = s[e], s[e] = i;
    return s
  }
}

N.Has = (el, p) => el.hasOwnProperty(p)

N.Is = {
  str: t => 'string' == typeof t,
  obj: t => t === Object(t),
  arr: t => t.constructor === Array,
  def: t => void 0 !== t,
  und: t => void 0 === t
}


N.O = (el, valeur) => {
  el.style.opacity = valeur
}
N.pe = (t, r) => {
  t.style.pointerEvents = r
};
N.PE = {
  all: t => {
    N.pe(t, "all")
  },
  none: t => {
    N.pe(t, "none")
  }
};
N.TopReload = () => {
  "scrollRestoration" in history ? history.scrollRestoration = "manual" : window.onbeforeunload = () => {

  }
};
// event manager, clic, wheel, ou ce que l'on veut
N.L = (t, r, event, cb) => {
  var i = document;
  const a = N.Select(t);
  var n = a.length;
  let o = event;
  var t = "wheel",
    h = "mouse";
  const l = [h + "Wheel", h + "move", "touchmove", "touchstart"];
  var d = -1 !== l.indexOf(event) && {
    passive: !1
  },
    v = (event === l[0] ? o = "on" + t in i ? t : N.Is.def(i.onmousewheel) ? h + t : "DOMMouseScroll" : "focusOut" === event && (o = N.Snif.isFirefox ? "blur" : "focusout"), "a" === r ? "add" : "remove");
  for (let t = 0; t < n; t++) a[t][v + "EventListener"](o, cb, d)
};

N.T = (el, x, y, unite) => {
  unite = N.Is.und(unite) ? "%" : unite;
  el.style.transform = "translate3d(" + x + unite + "," + y + unite + ",0)"
};

/** BindManager */
N.BM = (context, methodArray) => {
  const n = methodArray.length;
  for (let i = 0; i < n; i++) context[methodArray[i]] = context[methodArray[i]].bind(context)
  // for (const method of methodArray) method = method.bind(context)
};

// Singleton
// recupere et passe a RafR, le delta T entre fermeture et ouverture de la fenetre/tab ...
const Tab = class {
  constructor() {
    this.arr = []
    this.pause = 0
    N.BM(this, ["v"])
    N.L(document, "a", "visibilitychange", this.v)
  }
  add(t) {
    this.arr.push(t)
  }

  // calcule le temps entre le moment ou pas visible a visible, puis accionne, tOff() ou tOn(r)
  v() {
    var t = performance.now();
    let dT, s;
    // s = document.hidden ? (this.pause = t, "stop") : (r = t - this.pause, "start");

    if (document.hidden) {
      this.pause = t
      s = 'stop'
    } else {
      dT = t - this.pause
      s = 'start'
    }
    for (let t = this.lenght(); 0 <= t; t--) this.arr[t][s](dT)
  }
  lenght() {
    return this.arr.length - 1
  }
}
N.Tab = new Tab


N.Timer = class {
  constructor(t) {
    this.timer = new N.Delay(t.cb, t.delay)
  }
  run() {
    this.timer.stop()
    this.timer.run()
  }
}

//  si t == this.delay ou > alors callback()
N.Delay = class {
  constructor(callback, delay) {
    this.cb = callback
    this.delay = delay
    N.BM(this, ["loop"])
    this.raf = new N.RafR(this.loop)
  }
  run() {
    // if no delay, trigger cb, else this.raf.run (start this.loop)
    0 === this.delay ? this.cb() : this.raf.run()
  }
  stop() {
    this.raf.stop()
  }
  loop(t) {
    t = N.Clamp(t, 0, this.delay);
    // when t >= this.delay => this.stop (this.raf.stop()), this.cb
    1 === N.Clamp(t / this.delay, 0, 1) && (this.stop(), this.cb())
  }
}
// requestAnimationFrame, pour assuerer les 60 frames par seconde et le derouler de TL et Delay
// Singleton
N.Raf = class {
  constructor() {
    this.arr = []
    this.on = !0
    N.BM(this, ["loop", "tOff", "tOn"])
    N.Tab.add({ stop: this.tOff, start: this.tOn })
    this.raf()
  }
  tOff() {
    this.on = !1
  }
  tOn(r) {
    for (let t = this.l(); 0 <= t; t--) this.arr[t].sT += r;
    this.on = !0
  }
  add(t) {
    // t = {id, cb}
    this.arr.push(t)
  }
  remove(r) {
    for (let t = this.l(); 0 <= t; t--)
      if (this.arr[t].id === r) return void this.arr.splice(t, 1)
  }

  // t, le return de raf
  loop(r) {
    let s;
    if (this.on)
      //
      for (let t = this.l(); 0 <= t; t--) {
        const e = this.arr[t];
        // s = dT
        // sT =? StartTime
        N.Is.def(e) && (e.sT || (e.sT = r), s = r - e.sT, e.cb(s))
      }
    this.raf()
  }

  //chque frame call loop()
  raf() {
    requestAnimationFrame(this.loop)
  }
  l() {
    return this.arr.length - 1
  }
}
const Raf = new N.Raf;

let RafId = 0;
// creeateur de Raf, leur donne les id
// RequestAnimationFrameReferenced ?
N.RafR = class {
  constructor(callback) {
    this.cb = callback
    this.on = false
    this.id = RafId
    RafId++
  }
  run() {
    // si this.on == fasle alors exectute le code puis this.on = true, donc on entre plus dans le ||
    // this.on || (Raf.add({
    //     id: this.id,
    //     cb: this.cb
    // }), this.on = !0)
    if (this.on) return
    Raf.add({ id: this.id, cb: this.cb })
    this.on = true
  }
  stop() {
    // this.on && (Raf.remove(this.id), this.on = !1)
    if (!this.on) return
    Raf.remove(this.id)
    this.on = false
  }
}




// Manager principal d'object ?
// t.el
// t.e optionel? la curve : "linear", "i1", "io1" ...
// t.d optionel? direction ou duration, surrement duraction car il y a un curr, ?= currentTime
// t.delay
// t.cb callback
// t.r
// t.p ??
// t.svg ??
// t.line ??


N.M = class {
  constructor(t) {
    N.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"])
    this.v = this.vInit(t)
    this.raf = new N.RafR(this.run)
  }
  vInit(r) {
    const i = {
      el: N.Select(r.el),
      e: {
        curve: r.e || "linear"
        // curve: r.ease || 'linear'
      },
      d: {
        origin: r.d || 0,
        curr: 0
      },
      delay: r.delay || 0,
      cb: r.cb || !1,
      r: r.r || 2,
      prog: 0,
      progE: 0,
      elapsed: 0
    };
    i.elL = i.el.length, N.Has(r, "update") ? i.up = t => {
      r.update(i)
    } : N.Has(r, "svg") ? i.up = this.uSvg : N.Has(r, "line") ? i.up = this.uLine : i.up = this.uProp;
    var s = r.p || !1,
      t = r.svg || !1,
      a = r.line || !1;
    let e = !1;
    if (s) {
      i.prop = {}
      i.propI = [];
      var n = Object.keys(s);
      i.propL = n.length;
      for (let t = 0; t < i.propL; t++) {
        const h = n[t];
        i.prop[t] = {
          name: h,
          origin: {
            start: s[h][0],
            end: s[h][1]
          },
          curr: s[h][0],
          start: s[h][0],
          end: s[h][1],
          unit: s[h][2] || "%"
        };
        var o = h.charAt(0),
          d = "r" === o && e ? "r2" : o;
        e = "r" === o, i.propI[d] = t
      }
    } else if (t) i.svg = {
      type: t.type,
      attr: "polygon" === t.type ? "points" : "d",
      end: t.end,
      originArr: {},
      arr: {},
      val: []
    }, i.svg.start = t.start || i.el[0].getAttribute(i.svg.attr), i.svg.curr = i.svg.start, i.svg.originArr.start = N.Svg.split(i.svg.start), i.svg.originArr.end = N.Svg.split(i.svg.end), i.svg.arr.start = i.svg.originArr.start, i.svg.arr.end = i.svg.originArr.end, i.svg.arrL = i.svg.arr.start.length;
    else if (a) {
      i.line = {
        dashed: a.dashed,
        coeff: {
          start: N.Is.def(a.start) ? (100 - a.start) / 100 : 1,
          end: N.Is.def(a.end) ? (100 - a.end) / 100 : 0
        },
        shapeL: [],
        origin: {
          start: [],
          end: []
        },
        curr: [],
        start: [],
        end: []
      };
      for (let e = 0; e < i.elL; e++) {
        var v = a.elWL || i.el[e];
        i.line.shapeL[e] = N.Svg.shapeL(v);
        let t;
        if (i.line.dashed) {
          const l = i.line.dashed;
          let r = 0;
          var u = l.split(/[\s,]/),
            p = u.length;
          for (let t = 0; t < p; t++) r += parseFloat(u[t]) || 0;
          let s = "";
          var c = Math.ceil(i.line.shapeL[e] / r);
          for (let t = 0; t < c; t++) s += l + " ";
          t = s + "0 " + i.line.shapeL[e]
        } else t = i.line.shapeL[e];
        i.el[e].style.strokeDasharray = t, i.line.origin.start[e] = i.line.coeff.start * i.line.shapeL[e], i.line.origin.end[e] = i.line.coeff.end * i.line.shapeL[e], i.line.curr[e] = i.line.origin.start[e], i.line.start[e] = i.line.origin.start[e], i.line.end[e] = i.line.origin.end[e]
      }
    }
    return i
  }
  play(t) {
    this.pause(), this.vUpd(t), this.delay.run()
  }
  pause() {
    this.raf.stop(), this.delay && this.delay.stop()
  }
  vUpd(t) {

    let r = t || {}
    let s = N.Has(r, 'reverse') ? 'start' : 'end'

    if (N.Has(this.v, "prop")) {
      for (let t = 0; t < this.v.propL; t++) this.v.prop[t].end = this.v.prop[t].origin[s], this.v.prop[t].start = this.v.prop[t].curr, N.Has(r, "p") && N.Has(r.p, this.v.prop[t].name) && (N.Has(r.p[this.v.prop[t].name], "newEnd") && (this.v.prop[t].end = r.p[this.v.prop[t].name].newEnd), N.Has(r.p[this.v.prop[t].name], "newStart") && (this.v.prop[t].start = r.p[this.v.prop[t].name].newStart));
    }
    else if (N.Has(this.v, "svg")) N.Has(r, "svg") && N.Has(r.svg, "start") ? this.v.svg.arr.start = r.svg.start : this.v.svg.arr.start = N.Svg.split(this.v.svg.curr), N.Has(r, "svg") && N.Has(r.svg, "end") ? this.v.svg.arr.end = r.svg.end : this.v.svg.arr.end = this.v.svg.originArr[s];
    else if (N.Has(this.v, "line")) {
      for (let t = 0; t < this.v.elL; t++) this.v.line.start[t] = this.v.line.curr[t];
      if (N.Has(r, "line") && N.Has(r.line, "end")) {
        this.v.line.coeff.end = (100 - r.line.end) / 100;
        for (let t = 0; t < this.v.elL; t++) this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t]
      } else
        for (let t = 0; t < this.v.elL; t++) this.v.line.end[t] = this.v.line.origin[s][t]
    }

    this.v.d.curr = N.Has(r, 'd') ? r.d : N.Round(this.v.d.origin - this.v.d.curr + this.v.elapsed)
    this.v.e.curve = r.e || this.v.e.curve
    this.v.e.calc = N.Is.str(this.v.e.curve) ? N.Ease[this.v.e.curve] : N.Ease4[this.v.e.curve]
    this.v.delay = (N.Has(r, 'delay') ? r : this.v).delay
    this.v.cb = (N.Has(r, "cb") ? r : this.v).cb

    this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0
    this.delay = new N.Delay(this.gRaf, this.v.delay)

  }
  gRaf() {
    this.raf.run()
  }
  run(t) {
    // 1 === this.v.prog ? (this.pause(), this.v.up(), this.v.cb && this.v.cb()) : (this.v.elapsed = N.Clamp(t, 0, this.v.d.curr), this.v.prog = N.Clamp(this.v.elapsed / this.v.d.curr, 0, 1), this.v.progE = this.v.e.calc(this.v.prog), this.v.up())

    if (this.v.prog === 1) {

      this.pause()
      this.v.up()
      if (this.v.cb) this.v.cb()
    } else {
      this.v.elapsed = N.Clamp(t, 0, this.v.d.curr)
      this.v.prog = N.Clamp(this.v.elapsed / this.v.d.curr, 0, 1)
      this.v.progE = this.v.e.calc(this.v.prog)
      this.v.up()
    }
  }
  uProp() {
    const r = this.v.prop;
    var t = this.v.propI;

    for (let t = 0; t < this.v.propL; t++) r[t].curr = this.lerp(r[t].start, r[t].end);
    var s = N.Has(t, "x") ? r[t.x].curr + r[t.x].unit : 0,
      e = N.Has(t, "y") ? r[t.y].curr + r[t.y].unit : 0;
    const i = s + e === 0 ? 0 : "translate3d(" + s + "," + e + ",0)",
      a = N.Has(t, "r") ? r[t.r].name + "(" + r[t.r].curr + "deg)" : 0,
      n = N.Has(t, "r2") ? r[t.r2].name + "(" + r[t.r2].curr + "deg)" : 0,
      o = N.Has(t, "s") ? r[t.s].name + "(" + r[t.s].curr + ")" : 0;
    var h = i + a + n + o === 0 ? 0 : [i, a, n, o].filter(t => 0 !== t).join(" "),
      l = N.Has(t, "o") ? r[t.o].curr : -1,
      d = N.Has(r, "g") ? "grayscale(" + t[r.g].curr + ")" : -1;

    let z = this.v.elL;

    for (; z-- && !N.Is.und(this.v.el[z]);) {
      if (!!h) {
        this.v.el[z].style.transform = h
      }
      if (l >= 0) {
        this.v.el[z].style.opacity = l
      }
      0 !== d && (this.v.el[z].style.filter = d)
    }
  }
  uSvg() {
    const r = this.v.svg;
    r.currTemp = "";
    for (let t = 0; t < r.arrL; t++) r.val[t] = isNaN(r.arr.start[t]) ? r.arr.start[t] : this.lerp(r.arr.start[t], r.arr.end[t]), r.currTemp += r.val[t] + " ", r.curr = r.currTemp.trim();
    for (let t = 0; t < this.v.elL && !N.Is.und(this.v.el[t]); t++) this.v.el[t].setAttribute(r.attr, r.curr)
  }
  uLine() {
    const r = this.v.line;
    for (let t = 0; t < this.v.elL; t++) {
      const s = this.v.el[t].style;
      r.curr[t] = this.lerp(r.start[t], r.end[t]), s.strokeDashoffset = r.curr[t], 0 === this.v.prog && (s.opacity = 1)
    }
  }
  lerp(t, r) {
    return N.Round(N.Lerp(t, r, this.v.progE), this.v.r)
  }
}

N.TL = class {
  constructor() {
    this.arr = [], this.del = 0
  }
  from(t) {
    this.del = N.Has(t, "delay") ? t.delay : 0
    // ligne qui sert a priori a rien car dans N.M() t est pris a 0 si undefined
    t.delay = this.del
    let M = new N.M(t)
    this.arr.push(M)
  }
  play(t) {
    this.run("play", t)
  }
  pause() {
    this.run("pause")
  }
  run(r, t) {
    const s = this.arr.length,
      e = t || void 0;
    for (let t = 0; t < s; t++) this.arr[t][r](e)
  }
}



N.r0 = (t, r) => 1 - 3 * r + 3 * t,
  N.r1 = (t, r) => 3 * r - 6 * t, N.r2 = (t, r, s) => ((N.r0(r, s) * t + N.r1(r, s)) * t + 3 * r) * t, N.r3 = (t, r, s) => 3 * N.r0(r, s) * t * t + 2 * N.r1(r, s) * t + 3 * r, N.r4 = (t, r, s, e, i) => {
    let a, n, o = 0;
    for (; n = r + .5 * (s - r), 0 < (a = N.r2(n, e, i) - t) ? s = n : r = n, 1e-7 < Math.abs(a) && ++o < 10;);
    return n
  }, N.r5 = (r, s, e, i) => {
    for (let t = 0; t < 4; ++t) {
      var a = N.r3(s, e, i);
      if (0 === a) return s;
      s -= (N.r2(s, e, i) - r) / a
    }
    return s
  }, N.Ease4 = t => {
    const a = t[0],
      r = t[1],
      n = t[2],
      s = t[3];
    let o = new Float32Array(11);
    if (a !== r || n !== s)
      for (let t = 0; t < 11; ++t) o[t] = N.r2(.1 * t, a, n);
    return t => a === r && n === s ? t : 0 === t ? 0 : 1 === t ? 1 : N.r2(function (t) {
      let r = 0;
      for (var s = 1; 10 !== s && o[s] <= t; ++s) r += .1;
      --s;
      var e = (t - o[s]) / (o[s + 1] - o[s]),
        e = r + .1 * e,
        i = N.r3(e, a, n);
      return .001 <= i ? N.r5(t, e, a, n) : 0 === i ? e : N.r4(t, i, i + .1, a, n)
    }(t), r, s)
  }


N.Fetch = r => {
  var t = "json" === r.type;
  const s = t ? "json" : "text",
    e = {
      method: t ? "POST" : "GET",
      headers: new Headers({
        "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
      }),
      mode: "same-origin"
    };
  t && (e.body = r.body), fetch(r.url, e).then(t => {
    if (t.ok) return t[s]();
    r.error && r.error()
  }).then(t => {
    r.success(t)
  })
}


N.Svg = {
  shapeL: e => {
    var t, r, s, i;
    if ("circle" === e.tagName) return 2 * N.Ga(e, "r") * Math.PI;
    if ("line" === e.tagName) return t = N.Ga(e, "x1"), r = N.Ga(e, "x2"), s = N.Ga(e, "y1"), i = N.Ga(e, "y2"), Math.sqrt((r -= t) * r + (i -= s) * i);
    if ("polyline" !== e.tagName) return e.getTotalLength(); {
      let r = 0,
        s;
      var a = e.points.numberOfItems;
      for (let t = 0; t < a; t++) {
        var n = e.points.getItem(t);
        0 < t && (r += Math.sqrt((n.x - s.x) ** 2 + (n.y - s.y) ** 2)), s = n
      }
      return r
    }
  },
  split: t => {
    const s = [],
      r = t.split(" ");
    var e = r.length;
    for (let t = 0; t < e; t++) {
      var i = r[t].split(","),
        a = i.length;
      for (let r = 0; r < a; r++) {
        let t = i[r];
        t = isNaN(t) ? t : +t, s.push(t)
      }
    }
    return s
  }
}

// Reasonable defaults
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function normalizeWheel(event) {
  var sX = 0,
    sY = 0,
    pX = 0,
    pY = 0;

  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  };
}

N.Ga = (c, r) => c.getAttribute(r)
N.PD = t => {
  t.cancelable && t.preventDefault()
}
N.ZL = t => 9 < t ? '' + t : "0" + t

export { normalizeWheel };
export { N, Raf }
