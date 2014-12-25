/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
if (typeof YUI != "undefined") {
  YUI._YUI = YUI;
}
var YUI = function() {
  var c = 0,
    f = this,
    b = arguments,
    a = b.length,
    e = function(h, g) {
      return (h && h.hasOwnProperty && (h instanceof g));
    },
    d = (typeof YUI_config !== "undefined") && YUI_config;
  if (!(e(f, YUI))) {
    f = new YUI();
  } else {
    f._init();
    if (YUI.GlobalConfig) {
      f.applyConfig(YUI.GlobalConfig);
    }
    if (d) {
      f.applyConfig(d);
    }
    if (!a) {
      f._setup();
    }
  }
  if (a) {
    for (; c < a; c++) {
      f.applyConfig(b[c]);
    }
    f._setup();
  }
  f.instanceOf = e;
  return f;
};
(function() {
  var p, b, q = "3.4.1",
    h = ".",
    n = "http://yui.yahooapis.com/",
    t = "yui3-js-enabled",
    l = function() {},
    g = Array.prototype.slice,
    r = {
      "io.xdrReady": 1,
      "io.xdrResponse": 1,
      "SWF.eventHandler": 1
    },
    f = (typeof window != "undefined"),
    e = (f) ? window : null,
    v = (f) ? e.document : null,
    d = v && v.documentElement,
    a = d && d.className,
    c = {},
    i = new Date().getTime(),
    m = function(z, y, x, w) {
      if (z && z.addEventListener) {
        z.addEventListener(y, x, w);
      } else {
        if (z && z.attachEvent) {
          z.attachEvent("on" + y, x);
        }
      }
    },
    u = function(A, z, y, w) {
      if (A && A.removeEventListener) {
        try {
          A.removeEventListener(z, y, w);
        } catch (x) {}
      } else {
        if (A && A.detachEvent) {
          A.detachEvent("on" + z, y);
        }
      }
    },
    s = function() {
      YUI.Env.windowLoaded = true;
      YUI.Env.DOMReady = true;
      if (f) {
        u(window, "load", s);
      }
    },
    j = function(y, x) {
      var w = y.Env._loader;
      if (w) {
        w.ignoreRegistered = false;
        w.onEnd = null;
        w.data = null;
        w.required = [];
        w.loadType = null;
      } else {
        w = new y.Loader(y.config);
        y.Env._loader = w;
      }
      YUI.Env.core = y.Array.dedupe([].concat(YUI.Env.core, ["loader-base", "loader-rollup", "loader-yui3"]));
      return w;
    },
    o = function(y, x) {
      for (var w in x) {
        if (x.hasOwnProperty(w)) {
          y[w] = x[w];
        }
      }
    },
    k = {
      success: true
    };
  if (d && a.indexOf(t) == -1) {
    if (a) {
      a += " ";
    }
    a += t;
    d.className = a;
  }
  if (q.indexOf("@") > -1) {
    q = "3.3.0";
  }
  p = {
    applyConfig: function(D) {
      D = D || l;
      var y, A, z = this.config,
        B = z.modules,
        x = z.groups,
        C = z.rls,
        w = this.Env._loader;
      for (A in D) {
        if (D.hasOwnProperty(A)) {
          y = D[A];
          if (B && A == "modules") {
            o(B, y);
          } else {
            if (x && A == "groups") {
              o(x, y);
            } else {
              if (C && A == "rls") {
                o(C, y);
              } else {
                if (A == "win") {
                  z[A] = y.contentWindow || y;
                  z.doc = z[A].document;
                } else {
                  if (A == "_yuid") {} else {
                    z[A] = y;
                  }
                }
              }
            }
          }
        }
      }
      if (w) {
        w._config(D);
      }
    },
    _config: function(w) {
      this.applyConfig(w);
    },
    _init: function() {
      var y, z = this,
        w = YUI.Env,
        x = z.Env,
        A;
      z.version = q;
      if (!x) {
        z.Env = {
          core: ["get", "features", "intl-base", "yui-log", "yui-later"],
          mods: {},
          versions: {},
          base: n,
          cdn: n + q + "/build/",
          _idx: 0,
          _used: {},
          _attached: {},
          _missed: [],
          _yidx: 0,
          _uidx: 0,
          _guidp: "y",
          _loaded: {},
          _BASE_RE: /(?:\?(?:[^&]*&)*([^&]*))?\b(simpleyui|yui(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,
          parseBasePath: function(F, D) {
            var B = F.match(D),
              E, C;
            if (B) {
              E = RegExp.leftContext || F.slice(0, F.indexOf(B[0]));
              C = B[3];
              if (B[1]) {
                E += "?" + B[1];
              }
              E = {
                filter: C,
                path: E
              };
            }
            return E;
          },
          getBase: w && w.getBase || function(F) {
            var D = (v && v.getElementsByTagName("script")) || [],
              G = x.cdn,
              C, E, B, H;
            for (E = 0, B = D.length; E < B; ++E) {
              H = D[E].src;
              if (H) {
                C = z.Env.parseBasePath(H, F);
                if (C) {
                  y = C.filter;
                  G = C.path;
                  break;
                }
              }
            }
            return G;
          }
        };
        x = z.Env;
        x._loaded[q] = {};
        if (w && z !== YUI) {
          x._yidx = ++w._yidx;
          x._guidp = ("yui_" + q + "_" + x._yidx + "_" + i).replace(/\./g, "_");
        } else {
          if (YUI._YUI) {
            w = YUI._YUI.Env;
            x._yidx += w._yidx;
            x._uidx += w._uidx;
            for (A in w) {
              if (!(A in x)) {
                x[A] = w[A];
              }
            }
            delete YUI._YUI;
          }
        }
        z.id = z.stamp(z);
        c[z.id] = z;
      }
      z.constructor = YUI;
      z.config = z.config || {
        win: e,
        doc: v,
        debug: true,
        useBrowserConsole: true,
        throwFail: true,
        bootstrap: true,
        cacheUse: true,
        fetchCSS: true,
        use_rls: false,
        rls_timeout: 2000
      };
      if (YUI.Env.rls_disabled) {
        z.config.use_rls = false;
      }
      z.config.lang = z.config.lang || "en-US";
      z.config.base = YUI.config.base || z.Env.getBase(z.Env._BASE_RE);
      if (!y || (!("mindebug").indexOf(y))) {
        y = "min";
      }
      y = (y) ? "-" + y : y;
      z.config.loaderPath = YUI.config.loaderPath || "loader/loader" + y + ".js";
    },
    _setup: function(B) {
      var x, A = this,
        w = [],
        z = YUI.Env.mods,
        y = A.config.core || [].concat(YUI.Env.core);
      for (x = 0; x < y.length; x++) {
        if (z[y[x]]) {
          w.push(y[x]);
        }
      }
      A._attach(["yui-base"]);
      A._attach(w);
      if (A.Loader) {
        j(A);
      }
    },
    applyTo: function(C, B, y) {
      if (!(B in r)) {
        this.log(B + ": applyTo not allowed", "warn", "yui");
        return null;
      }
      var x = c[C],
        A, w, z;
      if (x) {
        A = B.split(".");
        w = x;
        for (z = 0; z < A.length; z = z + 1) {
          w = w[A[z]];
          if (!w) {
            this.log("applyTo not found: " + B, "warn", "yui");
          }
        }
        return w.apply(x, y);
      }
      return null;
    },
    add: function(x, C, B, w) {
      w = w || {};
      var A = YUI.Env,
        D = {
          name: x,
          fn: C,
          version: B,
          details: w
        },
        E, z, y = A.versions;
      A.mods[x] = D;
      y[B] = y[B] || {};
      y[B][x] = D;
      for (z in c) {
        if (c.hasOwnProperty(z)) {
          E = c[z].Env._loader;
          if (E) {
            if (!E.moduleInfo[x]) {
              E.addModule(w, x);
            }
          }
        }
      }
      return this;
    },
    _attach: function(B, M) {
      var F, N, L, I, w, D, y, z = YUI.Env.mods,
        G = YUI.Env.aliases,
        x = this,
        E, A = x.Env._loader,
        C = x.Env._attached,
        H = B.length,
        A, K = [];
      for (F = 0; F < H; F++) {
        N = B[F];
        L = z[N];
        K.push(N);
        if (A && A.conditions[N]) {
          x.Object.each(A.conditions[N], function(P) {
            var O = P && ((P.ua && x.UA[P.ua]) || (P.test && P.test(x)));
            if (O) {
              K.push(P.name);
            }
          });
        }
      }
      B = K;
      H = B.length;
      for (F = 0; F < H; F++) {
        if (!C[B[F]]) {
          N = B[F];
          L = z[N];
          if (G && G[N]) {
            x._attach(G[N]);
            continue;
          }
          if (!L) {
            if (A && A.moduleInfo[N]) {
              L = A.moduleInfo[N];
              M = true;
            }
            if (!M) {
              if ((N.indexOf("skin-") === -1) && (N.indexOf("css") === -1)) {
                x.Env._missed.push(N);
                x.Env._missed = x.Array.dedupe(x.Env._missed);
                x.message("NOT loaded: " + N, "warn", "yui");
              }
            }
          } else {
            C[N] = true;
            for (E = 0; E < x.Env._missed.length; E++) {
              if (x.Env._missed[E] === N) {
                x.message("Found: " + N + " (was reported as missing earlier)", "warn", "yui");
                x.Env._missed.splice(E, 1);
              }
            }
            I = L.details;
            w = I.requires;
            D = I.use;
            y = I.after;
            if (w) {
              for (E = 0; E < w.length; E++) {
                if (!C[w[E]]) {
                  if (!x._attach(w)) {
                    return false;
                  }
                  break;
                }
              }
            }
            if (y) {
              for (E = 0; E < y.length; E++) {
                if (!C[y[E]]) {
                  if (!x._attach(y, true)) {
                    return false;
                  }
                  break;
                }
              }
            }
            if (L.fn) {
              try {
                L.fn(x, N);
              } catch (J) {
                x.error("Attach error: " + N, J, N);
                return false;
              }
            }
            if (D) {
              for (E = 0; E < D.length; E++) {
                if (!C[D[E]]) {
                  if (!x._attach(D)) {
                    return false;
                  }
                  break;
                }
              }
            }
          }
        }
      }
      return true;
    },
    use: function() {
      var y = g.call(arguments, 0),
        C = y[y.length - 1],
        B = this,
        A = 0,
        x, w = B.Env,
        z = true;
      if (B.Lang.isFunction(C)) {
        y.pop();
      } else {
        C = null;
      }
      if (B.Lang.isArray(y[0])) {
        y = y[0];
      }
      if (B.config.cacheUse) {
        while ((x = y[A++])) {
          if (!w._attached[x]) {
            z = false;
            break;
          }
        }
        if (z) {
          if (y.length) {}
          B._notify(C, k, y);
          return B;
        }
      }
      if (B._loading) {
        B._useQueue = B._useQueue || new B.Queue();
        B._useQueue.add([y, C]);
      } else {
        B._use(y, function(E, D) {
          E._notify(C, D, y);
        });
      }
      return B;
    },
    _notify: function(z, w, x) {
      if (!w.success && this.config.loadErrorFn) {
        this.config.loadErrorFn.call(this, this, z, w, x);
      } else {
        if (z) {
          try {
            z(this, w);
          } catch (y) {
            this.error("use callback error", y, x);
          }
        }
      }
    },
    _use: function(y, A) {
      if (!this.Array) {
        this._attach(["yui-base"]);
      }
      var M, F, N, K, x = this,
        O = YUI.Env,
        z = O.mods,
        w = x.Env,
        C = w._used,
        J = O._loaderQueue,
        R = y[0],
        E = x.Array,
        P = x.config,
        D = P.bootstrap,
        L = [],
        H = [],
        Q = true,
        B = P.fetchCSS,
        I = function(T, S) {
          if (!T.length) {
            return;
          }
          E.each(T, function(W) {
            if (!S) {
              H.push(W);
            }
            if (C[W]) {
              return;
            }
            var U = z[W],
              X, V;
            if (U) {
              C[W] = true;
              X = U.details.requires;
              V = U.details.use;
            } else {
              if (!O._loaded[q][W]) {
                L.push(W);
              } else {
                C[W] = true;
              }
            }
            if (X && X.length) {
              I(X);
            }
            if (V && V.length) {
              I(V, 1);
            }
          });
        },
        G = function(W) {
          var U = W || {
              success: true,
              msg: "not dynamic"
            },
            T, S, V = true,
            X = U.data;
          x._loading = false;
          if (X) {
            S = L;
            L = [];
            H = [];
            I(X);
            T = L.length;
            if (T) {
              if (L.sort().join() == S.sort().join()) {
                T = false;
              }
            }
          }
          if (T && X) {
            x._loading = false;
            x._use(y, function() {
              if (x._attach(X)) {
                x._notify(A, U, X);
              }
            });
          } else {
            if (X) {
              V = x._attach(X);
            }
            if (V) {
              x._notify(A, U, y);
            }
          }
          if (x._useQueue && x._useQueue.size() && !x._loading) {
            x._use.apply(x, x._useQueue.next());
          }
        };
      if (R === "*") {
        Q = x._attach(x.Object.keys(z));
        if (Q) {
          G();
        }
        return x;
      }
      if (D && x.Loader && y.length) {
        F = j(x);
        F.require(y);
        F.ignoreRegistered = true;
        F.calculate(null, (B) ? null : "js");
        y = F.sorted;
      }
      I(y);
      M = L.length;
      if (M) {
        L = x.Object.keys(E.hash(L));
        M = L.length;
      }
      if (D && M && x.Loader) {
        x._loading = true;
        F = j(x);
        F.onEnd = G;
        F.context = x;
        F.data = y;
        F.ignoreRegistered = false;
        F.require(y);
        F.insert(null, (B) ? null : "js");
      } else {
        if (M && x.config.use_rls && !YUI.Env.rls_enabled) {
          O._rls_queue = O._rls_queue || new x.Queue();
          K = function(S, U) {
            var T = function(W) {
                G(W);
                S.rls_advance();
              },
              V = S._rls(U);
            if (V) {
              S.rls_oncomplete(function(W) {
                T(W);
              });
              S.Get.script(V, {
                data: U,
                timeout: S.config.rls_timeout,
                onFailure: S.rls_handleFailure,
                onTimeout: S.rls_handleTimeout
              });
            } else {
              T({
                success: true,
                data: U
              });
            }
          };
          O._rls_queue.add(function() {
            O._rls_in_progress = true;
            x.rls_callback = A;
            x.rls_locals(x, y, K);
          });
          if (!O._rls_in_progress && O._rls_queue.size()) {
            O._rls_queue.next()();
          }
        } else {
          if (D && M && x.Get && !w.bootstrapped) {
            x._loading = true;
            N = function() {
              x._loading = false;
              J.running = false;
              w.bootstrapped = true;
              O._bootstrapping = false;
              if (x._attach(["loader"])) {
                x._use(y, A);
              }
            };
            if (O._bootstrapping) {
              J.add(N);
            } else {
              O._bootstrapping = true;
              x.Get.script(P.base + P.loaderPath, {
                onEnd: N
              });
            }
          } else {
            Q = x._attach(y);
            if (Q) {
              G();
            }
          }
        }
      }
      return x;
    },
    namespace: function() {
      var x = arguments,
        B = this,
        z = 0,
        y, A, w;
      for (; z < x.length; z++) {
        w = x[z];
        if (w.indexOf(h)) {
          A = w.split(h);
          for (y = (A[0] == "YAHOO") ? 1 : 0; y < A.length; y++) {
            B[A[y]] = B[A[y]] || {};
            B = B[A[y]];
          }
        } else {
          B[w] = B[w] || {};
        }
      }
      return B;
    },
    log: l,
    message: l,
    dump: function(w) {
      return "" + w;
    },
    error: function(A, y, x) {
      var z = this,
        w;
      if (z.config.errorFn) {
        w = z.config.errorFn.apply(z, arguments);
      }
      if (z.config.throwFail && !w) {
        throw (y || new Error(A));
      } else {
        z.message(A, "error");
      }
      return z;
    },
    guid: function(w) {
      var x = this.Env._guidp + "_" + (++this.Env._uidx);
      return (w) ? (w + x) : x;
    },
    stamp: function(y, z) {
      var w;
      if (!y) {
        return y;
      }
      if (y.uniqueID && y.nodeType && y.nodeType !== 9) {
        w = y.uniqueID;
      } else {
        w = (typeof y === "string") ? y : y._yuid;
      }
      if (!w) {
        w = this.guid();
        if (!z) {
          try {
            y._yuid = w;
          } catch (x) {
            w = null;
          }
        }
      }
      return w;
    },
    destroy: function() {
      var w = this;
      if (w.Event) {
        w.Event._unload();
      }
      delete c[w.id];
      delete w.Env;
      delete w.config;
    }
  };
  YUI.prototype = p;
  for (b in p) {
    if (p.hasOwnProperty(b)) {
      YUI[b] = p[b];
    }
  }
  YUI._init();
  if (f) {
    m(window, "load", s);
  } else {
    s();
  }
  YUI.Env.add = m;
  YUI.Env.remove = u;
  if (typeof exports == "object") {
    exports.YUI = YUI;
  }
}());
YUI.add("yui-base", function(b) {
  var i = b.Lang || (b.Lang = {}),
    n = String.prototype,
    k = Object.prototype.toString,
    a = {
      "undefined": "undefined",
      "number": "number",
      "boolean": "boolean",
      "string": "string",
      "[object Function]": "function",
      "[object RegExp]": "regexp",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object Error]": "error"
    },
    c = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,
    s = /^\s+|\s+$/g,
    e = b.config.win,
    o = e && !!(e.MooTools || e.Prototype);
  i.isArray = (!o && Array.isArray) || function(w) {
    return i.type(w) === "array";
  };
  i.isBoolean = function(w) {
    return typeof w === "boolean";
  };
  i.isFunction = function(w) {
    return i.type(w) === "function";
  };
  i.isDate = function(w) {
    return i.type(w) === "date" && w.toString() !== "Invalid Date" && !isNaN(w);
  };
  i.isNull = function(w) {
    return w === null;
  };
  i.isNumber = function(w) {
    return typeof w === "number" && isFinite(w);
  };
  i.isObject = function(y, x) {
    var w = typeof y;
    return (y && (w === "object" || (!x && (w === "function" || i.isFunction(y))))) || false;
  };
  i.isString = function(w) {
    return typeof w === "string";
  };
  i.isUndefined = function(w) {
    return typeof w === "undefined";
  };
  i.trim = n.trim ? function(w) {
    return w && w.trim ? w.trim() : w;
  } : function(w) {
    try {
      return w.replace(s, "");
    } catch (x) {
      return w;
    }
  };
  i.trimLeft = n.trimLeft ? function(w) {
    return w.trimLeft();
  } : function(w) {
    return w.replace(/^\s+/, "");
  };
  i.trimRight = n.trimRight ? function(w) {
    return w.trimRight();
  } : function(w) {
    return w.replace(/\s+$/, "");
  };
  i.isValue = function(x) {
    var w = i.type(x);
    switch (w) {
      case "number":
        return isFinite(x);
      case "null":
      case "undefined":
        return false;
      default:
        return !!w;
    }
  };
  i.type = function(w) {
    return a[typeof w] || a[k.call(w)] || (w ? "object" : "null");
  };
  i.sub = function(w, x) {
    return w.replace ? w.replace(c, function(y, z) {
      return i.isUndefined(x[z]) ? y : x[z];
    }) : w;
  };
  i.now = Date.now || function() {
    return new Date().getTime();
  };
  var f = b.Lang,
    r = Array.prototype,
    p = Object.prototype.hasOwnProperty;

  function j(y, B, A) {
    var x, w;
    B || (B = 0);
    if (A || j.test(y)) {
      try {
        return r.slice.call(y, B);
      } catch (z) {
        w = [];
        for (x = y.length; B < x; ++B) {
          w.push(y[B]);
        }
        return w;
      }
    }
    return [y];
  }
  b.Array = j;
  j.dedupe = function(B) {
    var A = {},
      y = [],
      x, z, w;
    for (x = 0, w = B.length; x < w; ++x) {
      z = B[x];
      if (!p.call(A, z)) {
        A[z] = 1;
        y.push(z);
      }
    }
    return y;
  };
  j.each = j.forEach = r.forEach ? function(y, w, x) {
    r.forEach.call(y || [], w, x || b);
    return b;
  } : function(A, y, z) {
    for (var x = 0, w = (A && A.length) || 0; x < w; ++x) {
      if (x in A) {
        y.call(z || b, A[x], x, A);
      }
    }
    return b;
  };
  j.hash = function(z, x) {
    var A = {},
      B = (x && x.length) || 0,
      y, w;
    for (y = 0, w = z.length; y < w; ++y) {
      if (y in z) {
        A[z[y]] = B > y && y in x ? x[y] : true;
      }
    }
    return A;
  };
  j.indexOf = r.indexOf ? function(x, w) {
    return r.indexOf.call(x, w);
  } : function(z, y) {
    for (var x = 0, w = z.length; x < w; ++x) {
      if (x in z && z[x] === y) {
        return x;
      }
    }
    return -1;
  };
  j.numericSort = function(x, w) {
    return x - w;
  };
  j.some = r.some ? function(y, w, x) {
    return r.some.call(y, w, x);
  } : function(A, y, z) {
    for (var x = 0, w = A.length; x < w; ++x) {
      if (x in A && y.call(z, A[x], x, A)) {
        return true;
      }
    }
    return false;
  };
  j.test = function(y) {
    var w = 0;
    if (f.isArray(y)) {
      w = 1;
    } else {
      if (f.isObject(y)) {
        try {
          if ("length" in y && !y.tagName && !y.alert && !y.apply) {
            w = 2;
          }
        } catch (x) {}
      }
    }
    return w;
  };

  function u() {
    this._init();
    this.add.apply(this, arguments);
  }
  u.prototype = {
    _init: function() {
      this._q = [];
    },
    next: function() {
      return this._q.shift();
    },
    last: function() {
      return this._q.pop();
    },
    add: function() {
      this._q.push.apply(this._q, arguments);
      return this;
    },
    size: function() {
      return this._q.length;
    }
  };
  b.Queue = u;
  YUI.Env._loaderQueue = YUI.Env._loaderQueue || new u();
  var m = "__",
    p = Object.prototype.hasOwnProperty,
    l = b.Lang.isObject;
  b.cached = function(y, w, x) {
    w || (w = {});
    return function(z) {
      var A = arguments.length > 1 ? Array.prototype.join.call(arguments, m) : String(z);
      if (!(A in w) || (x && w[A] == x)) {
        w[A] = y.apply(y, arguments);
      }
      return w[A];
    };
  };
  b.merge = function() {
    var y = arguments,
      z = 0,
      x = y.length,
      w = {};
    for (; z < x; ++z) {
      b.mix(w, y[z], true);
    }
    return w;
  };
  b.mix = function(w, x, D, y, A, E) {
    var B, H, G, z, I, C, F;
    if (!w || !x) {
      return w || b;
    }
    if (A) {
      if (A === 2) {
        b.mix(w.prototype, x.prototype, D, y, 0, E);
      }
      G = A === 1 || A === 3 ? x.prototype : x;
      F = A === 1 || A === 4 ? w.prototype : w;
      if (!G || !F) {
        return w;
      }
    } else {
      G = x;
      F = w;
    }
    B = D && !E;
    if (y) {
      for (z = 0, C = y.length; z < C; ++z) {
        I = y[z];
        if (!p.call(G, I)) {
          continue;
        }
        H = B ? false : I in F;
        if (E && H && l(F[I], true) && l(G[I], true)) {
          b.mix(F[I], G[I], D, null, 0, E);
        } else {
          if (D || !H) {
            F[I] = G[I];
          }
        }
      }
    } else {
      for (I in G) {
        if (!p.call(G, I)) {
          continue;
        }
        H = B ? false : I in F;
        if (E && H && l(F[I], true) && l(G[I], true)) {
          b.mix(F[I], G[I], D, null, 0, E);
        } else {
          if (D || !H) {
            F[I] = G[I];
          }
        }
      }
      if (b.Object._hasEnumBug) {
        b.mix(F, G, D, b.Object._forceEnum, A, E);
      }
    }
    return w;
  };
  var p = Object.prototype.hasOwnProperty,
    e = b.config.win,
    o = e && !!(e.MooTools || e.Prototype),
    v, g = b.Object = (!o && Object.create) ? function(w) {
      return Object.create(w);
    } : (function() {
      function w() {}
      return function(x) {
        w.prototype = x;
        return new w();
      };
    }()),
    d = g._forceEnum = ["hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toString", "toLocaleString", "valueOf"],
    t = g._hasEnumBug = !{
      valueOf: 0
    }.propertyIsEnumerable("valueOf"),
    q = g._hasProtoEnumBug = (function() {}).propertyIsEnumerable("prototype"),
    h = g.owns = function(x, w) {
      return !!x && p.call(x, w);
    };
  g.hasKey = h;
  g.keys = (!o && Object.keys) || function(A) {
    if (!b.Lang.isObject(A)) {
      throw new TypeError("Object.keys called on a non-object");
    }
    var z = [],
      y, x, w;
    if (q && typeof A === "function") {
      for (x in A) {
        if (h(A, x) && x !== "prototype") {
          z.push(x);
        }
      }
    } else {
      for (x in A) {
        if (h(A, x)) {
          z.push(x);
        }
      }
    }
    if (t) {
      for (y = 0, w = d.length; y < w; ++y) {
        x = d[y];
        if (h(A, x)) {
          z.push(x);
        }
      }
    }
    return z;
  };
  g.values = function(A) {
    var z = g.keys(A),
      y = 0,
      w = z.length,
      x = [];
    for (; y < w; ++y) {
      x.push(A[z[y]]);
    }
    return x;
  };
  g.size = function(x) {
    try {
      return g.keys(x).length;
    } catch (w) {
      return 0;
    }
  };
  g.hasValue = function(x, w) {
    return b.Array.indexOf(g.values(x), w) > -1;
  };
  g.each = function(z, x, A, y) {
    var w;
    for (w in z) {
      if (y || h(z, w)) {
        x.call(A || b, z[w], w, z);
      }
    }
    return b;
  };
  g.some = function(z, x, A, y) {
    var w;
    for (w in z) {
      if (y || h(z, w)) {
        if (x.call(A || b, z[w], w, z)) {
          return true;
        }
      }
    }
    return false;
  };
  g.getValue = function(A, z) {
    if (!b.Lang.isObject(A)) {
      return v;
    }
    var x, y = b.Array(z),
      w = y.length;
    for (x = 0; A !== v && x < w; x++) {
      A = A[y[x]];
    }
    return A;
  };
  g.setValue = function(C, A, B) {
    var w, z = b.Array(A),
      y = z.length - 1,
      x = C;
    if (y >= 0) {
      for (w = 0; x !== v && w < y; w++) {
        x = x[z[w]];
      }
      if (x !== v) {
        x[z[w]] = B;
      } else {
        return v;
      }
    }
    return C;
  };
  g.isEmpty = function(w) {
    return !g.keys(w).length;
  };
  YUI.Env.parseUA = function(C) {
    var B = function(F) {
        var G = 0;
        return parseFloat(F.replace(/\./g, function() {
          return (G++ == 1) ? "" : ".";
        }));
      },
      E = b.config.win,
      w = E && E.navigator,
      z = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        safari: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: w && w.cajaVersion,
        secure: false,
        os: null
      },
      x = C || w && w.userAgent,
      D = E && E.location,
      y = D && D.href,
      A;
    z.userAgent = x;
    z.secure = y && (y.toLowerCase().indexOf("https") === 0);
    if (x) {
      if ((/windows|win32/i).test(x)) {
        z.os = "windows";
      } else {
        if ((/macintosh/i).test(x)) {
          z.os = "macintosh";
        } else {
          if ((/rhino/i).test(x)) {
            z.os = "rhino";
          }
        }
      }
      if ((/KHTML/).test(x)) {
        z.webkit = 1;
      }
      A = x.match(/AppleWebKit\/([^\s]*)/);
      if (A && A[1]) {
        z.webkit = B(A[1]);
        z.safari = z.webkit;
        if (/ Mobile\//.test(x)) {
          z.mobile = "Apple";
          A = x.match(/OS ([^\s]*)/);
          if (A && A[1]) {
            A = B(A[1].replace("_", "."));
          }
          z.ios = A;
          z.ipad = z.ipod = z.iphone = 0;
          A = x.match(/iPad|iPod|iPhone/);
          if (A && A[0]) {
            z[A[0].toLowerCase()] = z.ios;
          }
        } else {
          A = x.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
          if (A) {
            z.mobile = A[0];
          }
          if (/webOS/.test(x)) {
            z.mobile = "WebOS";
            A = x.match(/webOS\/([^\s]*);/);
            if (A && A[1]) {
              z.webos = B(A[1]);
            }
          }
          if (/ Android/.test(x)) {
            if (/Mobile/.test(x)) {
              z.mobile = "Android";
            }
            A = x.match(/Android ([^\s]*);/);
            if (A && A[1]) {
              z.android = B(A[1]);
            }
          }
        }
        A = x.match(/Chrome\/([^\s]*)/);
        if (A && A[1]) {
          z.chrome = B(A[1]);
          z.safari = 0;
        } else {
          A = x.match(/AdobeAIR\/([^\s]*)/);
          if (A) {
            z.air = A[0];
          }
        }
      }
      if (!z.webkit) {
        A = x.match(/Opera[\s\/]([^\s]*)/);
        if (A && A[1]) {
          z.opera = B(A[1]);
          A = x.match(/Version\/([^\s]*)/);
          if (A && A[1]) {
            z.opera = B(A[1]);
          }
          A = x.match(/Opera Mini[^;]*/);
          if (A) {
            z.mobile = A[0];
          }
        } else {
          A = x.match(/MSIE\s([^;]*)/);
          if (A && A[1]) {
            z.ie = B(A[1]);
          } else {
            A = x.match(/Gecko\/([^\s]*)/);
            if (A) {
              z.gecko = 1;
              A = x.match(/rv:([^\s\)]*)/);
              if (A && A[1]) {
                z.gecko = B(A[1]);
              }
            }
          }
        }
      }
    }
    if (!C) {
      YUI.Env.UA = z;
    }
    return z;
  };
  b.UA = YUI.Env.UA || YUI.Env.parseUA();
  YUI.Env.aliases = {
    "anim": ["anim-base", "anim-color", "anim-curve", "anim-easing", "anim-node-plugin", "anim-scroll", "anim-xy"],
    "app": ["controller", "model", "model-list", "view"],
    "attribute": ["attribute-base", "attribute-complex"],
    "autocomplete": ["autocomplete-base", "autocomplete-sources", "autocomplete-list", "autocomplete-plugin"],
    "base": ["base-base", "base-pluginhost", "base-build"],
    "cache": ["cache-base", "cache-offline", "cache-plugin"],
    "collection": ["array-extras", "arraylist", "arraylist-add", "arraylist-filter", "array-invoke"],
    "dataschema": ["dataschema-base", "dataschema-json", "dataschema-xml", "dataschema-array", "dataschema-text"],
    "datasource": ["datasource-local", "datasource-io", "datasource-get", "datasource-function", "datasource-cache", "datasource-jsonschema", "datasource-xmlschema", "datasource-arrayschema", "datasource-textschema", "datasource-polling"],
    "datatable": ["datatable-base", "datatable-datasource", "datatable-sort", "datatable-scroll"],
    "datatype": ["datatype-number", "datatype-date", "datatype-xml"],
    "datatype-date": ["datatype-date-parse", "datatype-date-format"],
    "datatype-number": ["datatype-number-parse", "datatype-number-format"],
    "datatype-xml": ["datatype-xml-parse", "datatype-xml-format"],
    "dd": ["dd-ddm-base", "dd-ddm", "dd-ddm-drop", "dd-drag", "dd-proxy", "dd-constrain", "dd-drop", "dd-scroll", "dd-delegate"],
    "dom": ["dom-base", "dom-screen", "dom-style", "selector-native", "selector"],
    "editor": ["frame", "selection", "exec-command", "editor-base", "editor-para", "editor-br", "editor-bidi", "editor-tab", "createlink-base"],
    "event": ["event-base", "event-delegate", "event-synthetic", "event-mousewheel", "event-mouseenter", "event-key", "event-focus", "event-resize", "event-hover", "event-outside"],
    "event-custom": ["event-custom-base", "event-custom-complex"],
    "event-gestures": ["event-flick", "event-move"],
    "highlight": ["highlight-base", "highlight-accentfold"],
    "history": ["history-base", "history-hash", "history-hash-ie", "history-html5"],
    "io": ["io-base", "io-xdr", "io-form", "io-upload-iframe", "io-queue"],
    "json": ["json-parse", "json-stringify"],
    "loader": ["loader-base", "loader-rollup", "loader-yui3"],
    "node": ["node-base", "node-event-delegate", "node-pluginhost", "node-screen", "node-style"],
    "pluginhost": ["pluginhost-base", "pluginhost-config"],
    "querystring": ["querystring-parse", "querystring-stringify"],
    "recordset": ["recordset-base", "recordset-sort", "recordset-filter", "recordset-indexer"],
    "resize": ["resize-base", "resize-proxy", "resize-constrain"],
    "slider": ["slider-base", "slider-value-range", "clickable-rail", "range-slider"],
    "text": ["text-accentfold", "text-wordbreak"],
    "widget": ["widget-base", "widget-htmlparser", "widget-uievents", "widget-skin"]
  };
}, "3.4.1");
YUI.add("get", function(e) {
  var B = e.UA,
    p = e.Lang,
    b = "text/javascript",
    v = "text/css",
    I = "stylesheet",
    s = "script",
    q = "autopurge",
    A = "utf-8",
    w = "link",
    C = "async",
    h = true,
    l = {
      script: h,
      css: !(B.webkit || B.gecko)
    },
    z = {},
    r = 0,
    g, u = function(J) {
      var K = J.timer;
      if (K) {
        clearTimeout(K);
        J.timer = null;
      }
    },
    m = function(M, J, P, N) {
      var K = N || e.config.win,
        O = K.document,
        Q = O.createElement(M),
        L;
      if (P) {
        e.mix(J, P);
      }
      for (L in J) {
        if (J[L] && J.hasOwnProperty(L)) {
          Q.setAttribute(L, J[L]);
        }
      }
      return Q;
    },
    k = function(K, L, J) {
      return m(w, {
        id: e.guid(),
        type: v,
        rel: I,
        href: K
      }, J, L);
    },
    E = function(K, L, J) {
      return m(s, {
        id: e.guid(),
        type: b,
        src: K
      }, J, L);
    },
    a = function(K, L, J) {
      return {
        tId: K.tId,
        win: K.win,
        data: K.data,
        nodes: K.nodes,
        msg: L,
        statusText: J,
        purge: function() {
          d(this.tId);
        }
      };
    },
    o = function(N, M, J) {
      var L = z[N],
        K = L && L.onEnd;
      L.finished = true;
      if (K) {
        K.call(L.context, a(L, M, J));
      }
    },
    F = function(M, L) {
      var K = z[M],
        J = K.onFailure;
      u(K);
      if (J) {
        J.call(K.context, a(K, L));
      }
      o(M, L, "failure");
    },
    y = function(J) {
      F(J, "transaction " + J + " was aborted");
    },
    x = function(L) {
      var J = z[L],
        K = J.onSuccess;
      u(J);
      if (J.aborted) {
        y(L);
      } else {
        if (K) {
          K.call(J.context, a(J));
        }
        o(L, undefined, "OK");
      }
    },
    H = function(J, M) {
      var K = z[M],
        L = (p.isString(J)) ? K.win.document.getElementById(J) : J;
      if (!L) {
        F(M, "target node not found: " + J);
      }
      return L;
    },
    d = function(O) {
      var K, R, S, T, L, Q, P, N, M, J = z[O];
      if (J) {
        K = J.nodes;
        M = K.length;
        for (N = 0; N < M; N++) {
          L = K[N];
          S = L.parentNode;
          if (L.clearAttributes) {
            L.clearAttributes();
          } else {
            for (Q in L) {
              if (L.hasOwnProperty(Q)) {
                delete L[Q];
              }
            }
          }
          S.removeChild(L);
        }
      }
      J.nodes = [];
    },
    t = function(N, J) {
      var K = z[N],
        L = K.onProgress,
        M;
      if (L) {
        M = a(K);
        M.url = J;
        L.call(K.context, M);
      }
    },
    D = function(L) {
      var J = z[L],
        K = J.onTimeout;
      if (K) {
        K.call(J.context, a(J));
      }
      o(L, "timeout", "timeout");
    },
    f = function(M, J) {
      var L = z[M],
        K = (L && !L.async);
      if (!L) {
        return;
      }
      if (K) {
        u(L);
      }
      t(M, J);
      if (!L.finished) {
        if (L.aborted) {
          y(M);
        } else {
          if ((--L.remaining) === 0) {
            x(M);
          } else {
            if (K) {
              i(M);
            }
          }
        }
      }
    },
    c = function(K, M, L, J) {
      if (B.ie) {
        M.onreadystatechange = function() {
          var N = this.readyState;
          if ("loaded" === N || "complete" === N) {
            M.onreadystatechange = null;
            f(L, J);
          }
        };
      } else {
        if (B.webkit) {
          if (K === s) {
            M.addEventListener("load", function() {
              f(L, J);
            }, false);
          }
        } else {
          M.onload = function() {
            f(L, J);
          };
          M.onerror = function(N) {
            F(L, N + ": " + J);
          };
        }
      }
    },
    G = function(L, P, O) {
      var M = z[P],
        N = O.document,
        J = M.insertBefore || N.getElementsByTagName("base")[0],
        K;
      if (J) {
        K = H(J, P);
        if (K) {
          K.parentNode.insertBefore(L, K);
        }
      } else {
        N.getElementsByTagName("head")[0].appendChild(L);
      }
    },
    i = function(Q) {
      var O = z[Q],
        L = O.type,
        K = O.attributes,
        P = O.win,
        N = O.timeout,
        M, J;
      if (O.url.length > 0) {
        J = O.url.shift();
        if (N && !O.timer) {
          O.timer = setTimeout(function() {
            D(Q);
          }, N);
        }
        if (L === s) {
          M = E(J, P, K);
        } else {
          M = k(J, P, K);
        }
        O.nodes.push(M);
        c(L, M, Q, J);
        G(M, Q, P);
        if (!l[L]) {
          f(Q, J);
        }
        if (O.async) {
          i(Q);
        }
      }
    },
    n = function() {
      if (g) {
        return;
      }
      g = true;
      var J, K;
      for (J in z) {
        if (z.hasOwnProperty(J)) {
          K = z[J];
          if (K.autopurge && K.finished) {
            d(K.tId);
            delete z[J];
          }
        }
      }
      g = false;
    },
    j = function(K, J, L) {
      L = L || {};
      var O = "q" + (r++),
        N = L.purgethreshold || e.Get.PURGE_THRESH,
        M;
      if (r % N === 0) {
        n();
      }
      M = z[O] = e.merge(L);
      M.tId = O;
      M.type = K;
      M.url = J;
      M.finished = false;
      M.nodes = [];
      M.win = M.win || e.config.win;
      M.context = M.context || M;
      M.autopurge = (q in M) ? M.autopurge : (K === s) ? true : false;
      M.attributes = M.attributes || {};
      M.attributes.charset = L.charset || M.attributes.charset || A;
      if (C in M && K === s) {
        M.attributes.async = M.async;
      }
      M.url = (p.isString(M.url)) ? [M.url] : M.url;
      if (!M.url[0]) {
        M.url.shift();
      }
      M.remaining = M.url.length;
      i(O);
      return {
        tId: O
      };
    };
  e.Get = {
    PURGE_THRESH: 20,
    abort: function(K) {
      var L = (p.isString(K)) ? K : K.tId,
        J = z[L];
      if (J) {
        J.aborted = true;
      }
    },
    script: function(J, K) {
      return j(s, J, K);
    },
    css: function(J, K) {
      return j("css", J, K);
    }
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
YUI.add("features", function(b) {
  var c = {};
  b.mix(b.namespace("Features"), {
    tests: c,
    add: function(d, e, f) {
      c[d] = c[d] || {};
      c[d][e] = f;
    },
    all: function(e, f) {
      var g = c[e],
        d = [];
      if (g) {
        b.Object.each(g, function(i, h) {
          d.push(h + ":" + (b.Features.test(e, h, f) ? 1 : 0));
        });
      }
      return (d.length) ? d.join(";") : "";
    },
    test: function(e, g, f) {
      f = f || [];
      var d, i, k, j = c[e],
        h = j && j[g];
      if (!h) {} else {
        d = h.result;
        if (b.Lang.isUndefined(d)) {
          i = h.ua;
          if (i) {
            d = (b.UA[i]);
          }
          k = h.test;
          if (k && ((!i) || d)) {
            d = k.apply(b, f);
          }
          h.result = d;
        }
      }
      return d;
    }
  });
  var a = b.Features.add;
  a("load", "0", {
    "name": "graphics-canvas-default",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (d && d.getContext && d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "1", {
    "name": "autocomplete-list-keys",
    "test": function(d) {
      return !(d.UA.ios || d.UA.android);
    },
    "trigger": "autocomplete-list"
  });
  a("load", "2", {
    "name": "graphics-svg",
    "test": function(e) {
      var d = e.config.doc;
      return (d && d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    "trigger": "graphics"
  });
  a("load", "3", {
    "name": "history-hash-ie",
    "test": function(e) {
      var d = e.config.doc && e.config.doc.documentMode;
      return e.UA.ie && (!("onhashchange" in e.config.win) || !d || d < 8);
    },
    "trigger": "history-hash"
  });
  a("load", "4", {
    "name": "graphics-vml-default",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!d || !d.getContext || !d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "5", {
    "name": "graphics-svg-default",
    "test": function(e) {
      var d = e.config.doc;
      return (d && d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    "trigger": "graphics"
  });
  a("load", "6", {
    "name": "widget-base-ie",
    "trigger": "widget-base",
    "ua": "ie"
  });
  a("load", "7", {
    "name": "transition-timer",
    "test": function(g) {
      var f = g.config.doc,
        e = (f) ? f.documentElement : null,
        d = true;
      if (e && e.style) {
        d = !("MozTransition" in e.style || "WebkitTransition" in e.style);
      }
      return d;
    },
    "trigger": "transition"
  });
  a("load", "8", {
    "name": "dom-style-ie",
    "test": function(j) {
      var h = j.Features.test,
        i = j.Features.add,
        f = j.config.win,
        g = j.config.doc,
        d = "documentElement",
        e = false;
      i("style", "computedStyle", {
        test: function() {
          return f && "getComputedStyle" in f;
        }
      });
      i("style", "opacity", {
        test: function() {
          return g && "opacity" in g[d].style;
        }
      });
      e = (!h("style", "opacity") && !h("style", "computedStyle"));
      return e;
    },
    "trigger": "dom-style"
  });
  a("load", "9", {
    "name": "selector-css2",
    "test": function(f) {
      var e = f.config.doc,
        d = e && !("querySelectorAll" in e);
      return d;
    },
    "trigger": "selector"
  });
  a("load", "10", {
    "name": "event-base-ie",
    "test": function(e) {
      var d = e.config.doc && e.config.doc.implementation;
      return (d && (!d.hasFeature("Events", "2.0")));
    },
    "trigger": "node-base"
  });
  a("load", "11", {
    "name": "dd-gestures",
    "test": function(d) {
      return (d.config.win && ("ontouchstart" in d.config.win && !d.UA.chrome));
    },
    "trigger": "dd-drag"
  });
  a("load", "12", {
    "name": "scrollview-base-ie",
    "trigger": "scrollview-base",
    "ua": "ie"
  });
  a("load", "13", {
    "name": "graphics-canvas",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (d && d.getContext && d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "14", {
    "name": "graphics-vml",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!d || !d.getContext || !d.getContext("2d")));
    },
    "trigger": "graphics"
  });
}, "3.4.1", {
  requires: ["yui-base"]
});
YUI.add("intl-base", function(b) {
  var a = /[, ]/;
  b.mix(b.namespace("Intl"), {
    lookupBestLang: function(g, h) {
      var f, j, c, e;

      function d(l) {
        var k;
        for (k = 0; k < h.length; k += 1) {
          if (l.toLowerCase() === h[k].toLowerCase()) {
            return h[k];
          }
        }
      }
      if (b.Lang.isString(g)) {
        g = g.split(a);
      }
      for (f = 0; f < g.length; f += 1) {
        j = g[f];
        if (!j || j === "*") {
          continue;
        }
        while (j.length > 0) {
          c = d(j);
          if (c) {
            return c;
          } else {
            e = j.lastIndexOf("-");
            if (e >= 0) {
              j = j.substring(0, e);
              if (e >= 2 && j.charAt(e - 2) === "-") {
                j = j.substring(0, e - 2);
              }
            } else {
              break;
            }
          }
        }
      }
      return "";
    }
  });
}, "3.4.1", {
  requires: ["yui-base"]
});
YUI.add("yui-log", function(d) {
  var c = d,
    e = "yui:log",
    a = "undefined",
    b = {
      debug: 1,
      info: 1,
      warn: 1,
      error: 1
    };
  c.log = function(j, s, g, q) {
    var l, p, n, k, o, i = c,
      r = i.config,
      h = (i.fire) ? i : YUI.Env.globalEvents;
    if (r.debug) {
      if (g) {
        p = r.logExclude;
        n = r.logInclude;
        if (n && !(g in n)) {
          l = 1;
        } else {
          if (n && (g in n)) {
            l = !n[g];
          } else {
            if (p && (g in p)) {
              l = p[g];
            }
          }
        }
      }
      if (!l) {
        if (r.useBrowserConsole) {
          k = (g) ? g + ": " + j : j;
          if (i.Lang.isFunction(r.logFn)) {
            r.logFn.call(i, j, s, g);
          } else {
            if (typeof console != a && console.log) {
              o = (s && console[s] && (s in b)) ? s : "log";
              console[o](k);
            } else {
              if (typeof opera != a) {
                opera.postError(k);
              }
            }
          }
        }
        if (h && !q) {
          if (h == i && (!h.getEvent(e))) {
            h.publish(e, {
              broadcast: 2
            });
          }
          h.fire(e, {
            msg: j,
            cat: s,
            src: g
          });
        }
      }
    }
    return i;
  };
  c.message = function() {
    return c.log.apply(c, arguments);
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
YUI.add("yui-later", function(b) {
  var a = [];
  b.later = function(j, f, k, g, h) {
    j = j || 0;
    g = (!b.Lang.isUndefined(g)) ? b.Array(g) : a;
    f = f || b.config.win || b;
    var i = false,
      c = (f && b.Lang.isString(k)) ? f[k] : k,
      d = function() {
        if (!i) {
          if (!c.apply) {
            c(g[0], g[1], g[2], g[3]);
          } else {
            c.apply(f, g || a);
          }
        }
      },
      e = (h) ? setInterval(d, j) : setTimeout(d, j);
    return {
      id: e,
      interval: h,
      cancel: function() {
        i = true;
        if (this.interval) {
          clearInterval(e);
        } else {
          clearTimeout(e);
        }
      }
    };
  };
  b.Lang.later = b.later;
}, "3.4.1", {
  requires: ["yui-base"]
});
YUI.add("yui", function(a) {}, "3.4.1", {
  use: ["yui-base", "get", "features", "intl-base", "yui-log", "yui-later"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("oop", function(h) {
  var d = h.Lang,
    c = h.Array,
    b = Object.prototype,
    a = "_~yuim~_",
    e = b.hasOwnProperty,
    g = b.toString;

  function f(l, k, m, i, j) {
    if (l && l[j] && l !== h) {
      return l[j].call(l, k, m);
    } else {
      switch (c.test(l)) {
        case 1:
          return c[j](l, k, m);
        case 2:
          return c[j](h.Array(l, 0, true), k, m);
        default:
          return h.Object[j](l, k, m, i);
      }
    }
  }
  h.augment = function(i, k, r, o, s) {
    var n = i.prototype,
      m = n && k,
      q = k.prototype,
      v = n || i,
      j, u, p, l, t;
    s = s ? h.Array(s) : [];
    if (m) {
      u = {};
      p = {};
      l = {};
      j = function(x, w) {
        if (r || !(w in n)) {
          if (g.call(x) === "[object Function]") {
            l[w] = x;
            u[w] = p[w] = function() {
              return t(this, x, arguments);
            };
          } else {
            u[w] = x;
          }
        }
      };
      t = function(w, y, z) {
        for (var x in l) {
          if (e.call(l, x) && w[x] === p[x]) {
            w[x] = l[x];
          }
        }
        k.apply(w, s);
        return y.apply(w, z);
      };
      if (o) {
        h.Array.each(o, function(w) {
          if (w in q) {
            j(q[w], w);
          }
        });
      } else {
        h.Object.each(q, j, null, true);
      }
    }
    h.mix(v, u || q, r, o);
    if (!m) {
      k.apply(v, s);
    }
    return i;
  };
  h.aggregate = function(k, j, i, l) {
    return h.mix(k, j, i, l, 0, true);
  };
  h.extend = function(l, k, i, n) {
    if (!k || !l) {
      h.error("extend failed, verify dependencies");
    }
    var m = k.prototype,
      j = h.Object(m);
    l.prototype = j;
    j.constructor = l;
    l.superclass = m;
    if (k != Object && m.constructor == b.constructor) {
      m.constructor = k;
    }
    if (i) {
      h.mix(j, i, true);
    }
    if (n) {
      h.mix(l, n, true);
    }
    return l;
  };
  h.each = function(k, j, l, i) {
    return f(k, j, l, i, "each");
  };
  h.some = function(k, j, l, i) {
    return f(k, j, l, i, "some");
  };
  h.clone = function(l, m, r, s, k, q) {
    if (!d.isObject(l)) {
      return l;
    }
    if (h.instanceOf(l, YUI)) {
      return l;
    }
    var n, j = q || {},
      i, p = h.each;
    switch (d.type(l)) {
      case "date":
        return new Date(l);
      case "regexp":
        return l;
      case "function":
        return l;
      case "array":
        n = [];
        break;
      default:
        if (l[a]) {
          return j[l[a]];
        }
        i = h.guid();
        n = (m) ? {} : h.Object(l);
        l[a] = i;
        j[i] = l;
    }
    if (!l.addEventListener && !l.attachEvent) {
      p(l, function(t, o) {
        if ((o || o === 0) && (!r || (r.call(s || this, t, o, this, l) !== false))) {
          if (o !== a) {
            if (o == "prototype") {} else {
              this[o] = h.clone(t, m, r, s, k || l, j);
            }
          }
        }
      }, n);
    }
    if (!q) {
      h.Object.each(j, function(t, o) {
        if (t[a]) {
          try {
            delete t[a];
          } catch (u) {
            t[a] = null;
          }
        }
      }, this);
      j = null;
    }
    return n;
  };
  h.bind = function(i, k) {
    var j = arguments.length > 2 ? h.Array(arguments, 2, true) : null;
    return function() {
      var m = d.isString(i) ? k[i] : i,
        l = (j) ? j.concat(h.Array(arguments, 0, true)) : arguments;
      return m.apply(k || m, l);
    };
  };
  h.rbind = function(i, k) {
    var j = arguments.length > 2 ? h.Array(arguments, 2, true) : null;
    return function() {
      var m = d.isString(i) ? k[i] : i,
        l = (j) ? h.Array(arguments, 0, true).concat(j) : arguments;
      return m.apply(k || m, l);
    };
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("features", function(b) {
  var c = {};
  b.mix(b.namespace("Features"), {
    tests: c,
    add: function(d, e, f) {
      c[d] = c[d] || {};
      c[d][e] = f;
    },
    all: function(e, f) {
      var g = c[e],
        d = [];
      if (g) {
        b.Object.each(g, function(i, h) {
          d.push(h + ":" + (b.Features.test(e, h, f) ? 1 : 0));
        });
      }
      return (d.length) ? d.join(";") : "";
    },
    test: function(e, g, f) {
      f = f || [];
      var d, i, k, j = c[e],
        h = j && j[g];
      if (!h) {} else {
        d = h.result;
        if (b.Lang.isUndefined(d)) {
          i = h.ua;
          if (i) {
            d = (b.UA[i]);
          }
          k = h.test;
          if (k && ((!i) || d)) {
            d = k.apply(b, f);
          }
          h.result = d;
        }
      }
      return d;
    }
  });
  var a = b.Features.add;
  a("load", "0", {
    "name": "graphics-canvas-default",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (d && d.getContext && d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "1", {
    "name": "autocomplete-list-keys",
    "test": function(d) {
      return !(d.UA.ios || d.UA.android);
    },
    "trigger": "autocomplete-list"
  });
  a("load", "2", {
    "name": "graphics-svg",
    "test": function(e) {
      var d = e.config.doc;
      return (d && d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    "trigger": "graphics"
  });
  a("load", "3", {
    "name": "history-hash-ie",
    "test": function(e) {
      var d = e.config.doc && e.config.doc.documentMode;
      return e.UA.ie && (!("onhashchange" in e.config.win) || !d || d < 8);
    },
    "trigger": "history-hash"
  });
  a("load", "4", {
    "name": "graphics-vml-default",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!d || !d.getContext || !d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "5", {
    "name": "graphics-svg-default",
    "test": function(e) {
      var d = e.config.doc;
      return (d && d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    "trigger": "graphics"
  });
  a("load", "6", {
    "name": "widget-base-ie",
    "trigger": "widget-base",
    "ua": "ie"
  });
  a("load", "7", {
    "name": "transition-timer",
    "test": function(g) {
      var f = g.config.doc,
        e = (f) ? f.documentElement : null,
        d = true;
      if (e && e.style) {
        d = !("MozTransition" in e.style || "WebkitTransition" in e.style);
      }
      return d;
    },
    "trigger": "transition"
  });
  a("load", "8", {
    "name": "dom-style-ie",
    "test": function(j) {
      var h = j.Features.test,
        i = j.Features.add,
        f = j.config.win,
        g = j.config.doc,
        d = "documentElement",
        e = false;
      i("style", "computedStyle", {
        test: function() {
          return f && "getComputedStyle" in f;
        }
      });
      i("style", "opacity", {
        test: function() {
          return g && "opacity" in g[d].style;
        }
      });
      e = (!h("style", "opacity") && !h("style", "computedStyle"));
      return e;
    },
    "trigger": "dom-style"
  });
  a("load", "9", {
    "name": "selector-css2",
    "test": function(f) {
      var e = f.config.doc,
        d = e && !("querySelectorAll" in e);
      return d;
    },
    "trigger": "selector"
  });
  a("load", "10", {
    "name": "event-base-ie",
    "test": function(e) {
      var d = e.config.doc && e.config.doc.implementation;
      return (d && (!d.hasFeature("Events", "2.0")));
    },
    "trigger": "node-base"
  });
  a("load", "11", {
    "name": "dd-gestures",
    "test": function(d) {
      return (d.config.win && ("ontouchstart" in d.config.win && !d.UA.chrome));
    },
    "trigger": "dd-drag"
  });
  a("load", "12", {
    "name": "scrollview-base-ie",
    "trigger": "scrollview-base",
    "ua": "ie"
  });
  a("load", "13", {
    "name": "graphics-canvas",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (d && d.getContext && d.getContext("2d")));
    },
    "trigger": "graphics"
  });
  a("load", "14", {
    "name": "graphics-vml",
    "test": function(f) {
      var e = f.config.doc,
        d = e && e.createElement("canvas");
      return (e && !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!d || !d.getContext || !d.getContext("2d")));
    },
    "trigger": "graphics"
  });
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-core", function(e) {
  var n = "nodeType",
    c = "ownerDocument",
    b = "documentElement",
    a = "defaultView",
    g = "parentWindow",
    j = "tagName",
    k = "parentNode",
    i = "previousSibling",
    l = "nextSibling",
    h = "contains",
    d = "compareDocumentPosition",
    m = [],
    f = {
      byId: function(p, o) {
        return f.allById(p, o)[0] || null;
      },
      ancestor: function(p, q, s, r) {
        var o = null;
        if (s) {
          o = (!q || q(p)) ? p : null;
        }
        return o || f.elementByAxis(p, k, q, null, r);
      },
      ancestors: function(q, r, t, s) {
        var p = q,
          o = [];
        while ((p = f.ancestor(p, r, t, s))) {
          t = false;
          if (p) {
            o.unshift(p);
            if (s && s(p)) {
              return o;
            }
          }
        }
        return o;
      },
      elementByAxis: function(p, s, r, q, o) {
        while (p && (p = p[s])) {
          if ((q || p[j]) && (!r || r(p))) {
            return p;
          }
          if (o && o(p)) {
            return null;
          }
        }
        return null;
      },
      contains: function(p, q) {
        var o = false;
        if (!q || !p || !q[n] || !p[n]) {
          o = false;
        } else {
          if (p[h]) {
            if (e.UA.opera || q[n] === 1) {
              o = p[h](q);
            } else {
              o = f._bruteContains(p, q);
            }
          } else {
            if (p[d]) {
              if (p === q || !!(p[d](q) & 16)) {
                o = true;
              }
            }
          }
        }
        return o;
      },
      inDoc: function(q, r) {
        var p = false,
          o;
        if (q && q.nodeType) {
          (r) || (r = q[c]);
          o = r[b];
          if (o && o.contains && q.tagName) {
            p = o.contains(q);
          } else {
            p = f.contains(o, q);
          }
        }
        return p;
      },
      allById: function(t, o) {
        o = o || e.config.doc;
        var p = [],
          q = [],
          r, s;
        if (o.querySelectorAll) {
          q = o.querySelectorAll('[id="' + t + '"]');
        } else {
          if (o.all) {
            p = o.all(t);
            if (p) {
              if (p.nodeName) {
                if (p.id === t) {
                  q.push(p);
                  p = m;
                } else {
                  p = [p];
                }
              }
              if (p.length) {
                for (r = 0; s = p[r++];) {
                  if (s.id === t || (s.attributes && s.attributes.id && s.attributes.id.value === t)) {
                    q.push(s);
                  }
                }
              }
            }
          } else {
            q = [f._getDoc(o).getElementById(t)];
          }
        }
        return q;
      },
      isWindow: function(o) {
        return !!(o && o.alert && o.document);
      },
      _removeChildNodes: function(o) {
        while (o.firstChild) {
          o.removeChild(o.firstChild);
        }
      },
      siblings: function(r, q) {
        var o = [],
          p = r;
        while ((p = p[i])) {
          if (p[j] && (!q || q(p))) {
            o.unshift(p);
          }
        }
        p = r;
        while ((p = p[l])) {
          if (p[j] && (!q || q(p))) {
            o.push(p);
          }
        }
        return o;
      },
      _bruteContains: function(o, p) {
        while (p) {
          if (o === p) {
            return true;
          }
          p = p.parentNode;
        }
        return false;
      },
      _getRegExp: function(p, o) {
        o = o || "";
        f._regexCache = f._regexCache || {};
        if (!f._regexCache[p + o]) {
          f._regexCache[p + o] = new RegExp(p, o);
        }
        return f._regexCache[p + o];
      },
      _getDoc: function(o) {
        var p = e.config.doc;
        if (o) {
          p = (o[n] === 9) ? o : o[c] || o.document || e.config.doc;
        }
        return p;
      },
      _getWin: function(o) {
        var p = f._getDoc(o);
        return p[a] || p[g] || e.config.win;
      },
      _batch: function(o, w, u, t, s, q) {
        w = (typeof w === "string") ? f[w] : w;
        var x, r = 0,
          p, v;
        if (w && o) {
          while ((p = o[r++])) {
            x = x = w.call(f, p, u, t, s, q);
            if (typeof x !== "undefined") {
              (v) || (v = []);
              v.push(x);
            }
          }
        }
        return (typeof v !== "undefined") ? v : o;
      },
      wrap: function(r, p) {
        var q = e.DOM.create(p),
          o = q.getElementsByTagName("*");
        if (o.length) {
          q = o[o.length - 1];
        }
        if (r.parentNode) {
          r.parentNode.replaceChild(q, r);
        }
        q.appendChild(r);
      },
      unwrap: function(r) {
        var p = r.parentNode,
          q = p.lastChild,
          o = r,
          s;
        if (p) {
          s = p.parentNode;
          if (s) {
            r = p.firstChild;
            while (r !== q) {
              o = r.nextSibling;
              s.insertBefore(r, p);
              r = o;
            }
            s.replaceChild(q, p);
          } else {
            p.removeChild(r);
          }
        }
      },
      generateID: function(o) {
        var p = o.id;
        if (!p) {
          p = e.stamp(o);
          o.id = p;
        }
        return p;
      }
    };
  e.DOM = f;
}, "3.4.1", {
  requires: ["oop", "features"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-base", function(b) {
  var o = b.config.doc.documentElement,
    g = b.DOM,
    m = "tagName",
    a = "ownerDocument",
    c = "",
    n = b.Features.add,
    k = b.Features.test;
  b.mix(g, {
    getText: (o.textContent !== undefined) ? function(s) {
      var r = "";
      if (s) {
        r = s.textContent;
      }
      return r || "";
    } : function(s) {
      var r = "";
      if (s) {
        r = s.innerText || s.nodeValue;
      }
      return r || "";
    },
    setText: (o.textContent !== undefined) ? function(r, s) {
      if (r) {
        r.textContent = s;
      }
    } : function(r, s) {
      if ("innerText" in r) {
        r.innerText = s;
      } else {
        if ("nodeValue" in r) {
          r.nodeValue = s;
        }
      }
    },
    CUSTOM_ATTRIBUTES: (!o.hasAttribute) ? {
      "for": "htmlFor",
      "class": "className"
    } : {
      "htmlFor": "for",
      "className": "class"
    },
    setAttribute: function(t, r, u, s) {
      if (t && r && t.setAttribute) {
        r = g.CUSTOM_ATTRIBUTES[r] || r;
        t.setAttribute(r, u, s);
      }
    },
    getAttribute: function(u, r, t) {
      t = (t !== undefined) ? t : 2;
      var s = "";
      if (u && r && u.getAttribute) {
        r = g.CUSTOM_ATTRIBUTES[r] || r;
        s = u.getAttribute(r, t);
        if (s === null) {
          s = "";
        }
      }
      return s;
    },
    VALUE_SETTERS: {},
    VALUE_GETTERS: {},
    getValue: function(t) {
      var s = "",
        r;
      if (t && t[m]) {
        r = g.VALUE_GETTERS[t[m].toLowerCase()];
        if (r) {
          s = r(t);
        } else {
          s = t.value;
        }
      }
      if (s === c) {
        s = c;
      }
      return (typeof s === "string") ? s : "";
    },
    setValue: function(r, s) {
      var t;
      if (r && r[m]) {
        t = g.VALUE_SETTERS[r[m].toLowerCase()];
        if (t) {
          t(r, s);
        } else {
          r.value = s;
        }
      }
    },
    creators: {}
  });
  n("value-set", "select", {
    test: function() {
      var r = b.config.doc.createElement("select");
      r.innerHTML = "<option>1</option><option>2</option>";
      r.value = "2";
      return (r.value && r.value === "2");
    }
  });
  if (!k("value-set", "select")) {
    g.VALUE_SETTERS.select = function(u, v) {
      for (var s = 0, r = u.getElementsByTagName("option"), t; t = r[s++];) {
        if (g.getValue(t) === v) {
          t.selected = true;
          break;
        }
      }
    };
  }
  b.mix(g.VALUE_GETTERS, {
    button: function(r) {
      return (r.attributes && r.attributes.value) ? r.attributes.value.value : "";
    }
  });
  b.mix(g.VALUE_SETTERS, {
    button: function(s, t) {
      var r = s.attributes.value;
      if (!r) {
        r = s[a].createAttribute("value");
        s.setAttributeNode(r);
      }
      r.value = t;
    }
  });
  b.mix(g.VALUE_GETTERS, {
    option: function(s) {
      var r = s.attributes;
      return (r.value && r.value.specified) ? s.value : s.text;
    },
    select: function(s) {
      var t = s.value,
        r = s.options;
      if (r && r.length) {
        if (s.multiple) {} else {
          t = g.getValue(r[s.selectedIndex]);
        }
      }
      return t;
    }
  });
  var h, f, q;
  b.mix(b.DOM, {
    hasClass: function(t, s) {
      var r = b.DOM._getRegExp("(?:^|\\s+)" + s + "(?:\\s+|$)");
      return r.test(t.className);
    },
    addClass: function(s, r) {
      if (!b.DOM.hasClass(s, r)) {
        s.className = b.Lang.trim([s.className, r].join(" "));
      }
    },
    removeClass: function(s, r) {
      if (r && f(s, r)) {
        s.className = b.Lang.trim(s.className.replace(b.DOM._getRegExp("(?:^|\\s+)" + r + "(?:\\s+|$)"), " "));
        if (f(s, r)) {
          q(s, r);
        }
      }
    },
    replaceClass: function(s, r, t) {
      q(s, r);
      h(s, t);
    },
    toggleClass: function(s, r, t) {
      var u = (t !== undefined) ? t : !(f(s, r));
      if (u) {
        h(s, r);
      } else {
        q(s, r);
      }
    }
  });
  f = b.DOM.hasClass;
  q = b.DOM.removeClass;
  h = b.DOM.addClass;
  var e = /<([a-z]+)/i,
    g = b.DOM,
    n = b.Features.add,
    k = b.Features.test,
    j = {},
    i = function(t, r) {
      var u = b.config.doc.createElement("div"),
        s = true;
      u.innerHTML = t;
      if (!u.firstChild || u.firstChild.tagName !== r.toUpperCase()) {
        s = false;
      }
      return s;
    },
    p = /(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,
    d = "<table>",
    l = "</table>";
  b.mix(b.DOM, {
    _fragClones: {},
    _create: function(s, t, r) {
      r = r || "div";
      var u = g._fragClones[r];
      if (u) {
        u = u.cloneNode(false);
      } else {
        u = g._fragClones[r] = t.createElement(r);
      }
      u.innerHTML = s;
      return u;
    },
    create: function(v, y) {
      if (typeof v === "string") {
        v = b.Lang.trim(v);
      }
      y = y || b.config.doc;
      var u = e.exec(v),
        w = g._create,
        s = j,
        x = null,
        t, z, r;
      if (v != undefined) {
        if (u && u[1]) {
          t = s[u[1].toLowerCase()];
          if (typeof t === "function") {
            w = t;
          } else {
            z = t;
          }
        }
        r = w(v, y, z).childNodes;
        if (r.length === 1) {
          x = r[0].parentNode.removeChild(r[0]);
        } else {
          if (r[0] && r[0].className === "yui3-big-dummy") {
            if (r.length === 2) {
              x = r[0].nextSibling;
            } else {
              r[0].parentNode.removeChild(r[0]);
              x = g._nl2frag(r, y);
            }
          } else {
            x = g._nl2frag(r, y);
          }
        }
      }
      return x;
    },
    _nl2frag: function(s, v) {
      var t = null,
        u, r;
      if (s && (s.push || s.item) && s[0]) {
        v = v || s[0].ownerDocument;
        t = v.createDocumentFragment();
        if (s.item) {
          s = b.Array(s, 0, true);
        }
        for (u = 0, r = s.length; u < r; u++) {
          t.appendChild(s[u]);
        }
      }
      return t;
    },
    addHTML: function(y, x, t) {
      var r = y.parentNode,
        v = 0,
        w, s = x,
        u;
      if (x != undefined) {
        if (x.nodeType) {
          u = x;
        } else {
          if (typeof x == "string" || typeof x == "number") {
            s = u = g.create(x);
          } else {
            if (x[0] && x[0].nodeType) {
              u = b.config.doc.createDocumentFragment();
              while ((w = x[v++])) {
                u.appendChild(w);
              }
            }
          }
        }
      }
      if (t) {
        if (u && t.parentNode) {
          t.parentNode.insertBefore(u, t);
        } else {
          switch (t) {
            case "replace":
              while (y.firstChild) {
                y.removeChild(y.firstChild);
              }
              if (u) {
                y.appendChild(u);
              }
              break;
            case "before":
              if (u) {
                r.insertBefore(u, y);
              }
              break;
            case "after":
              if (u) {
                if (y.nextSibling) {
                  r.insertBefore(u, y.nextSibling);
                } else {
                  r.appendChild(u);
                }
              }
              break;
            default:
              if (u) {
                y.appendChild(u);
              }
          }
        }
      } else {
        if (u) {
          y.appendChild(u);
        }
      }
      return s;
    }
  });
  n("innerhtml", "table", {
    test: function() {
      var r = b.config.doc.createElement("table");
      try {
        r.innerHTML = "<tbody></tbody>";
      } catch (s) {
        return false;
      }
      return (r.firstChild && r.firstChild.nodeName === "TBODY");
    }
  });
  n("innerhtml-div", "tr", {
    test: function() {
      return i("<tr></tr>", "tr");
    }
  });
  n("innerhtml-div", "script", {
    test: function() {
      return i("<script><\/script>", "script");
    }
  });
  if (!k("innerhtml", "table")) {
    j.tbody = function(s, t) {
      var u = g.create(d + s + l, t),
        r = u.children.tags("tbody")[0];
      if (u.children.length > 1 && r && !p.test(s)) {
        r.parentNode.removeChild(r);
      }
      return u;
    };
  }
  if (!k("innerhtml-div", "script")) {
    j.script = function(r, s) {
      var t = s.createElement("div");
      t.innerHTML = "-" + r;
      t.removeChild(t.firstChild);
      return t;
    };
    j.link = j.style = j.script;
  }
  if (!k("innerhtml-div", "tr")) {
    b.mix(j, {
      option: function(r, s) {
        return g.create('<select><option class="yui3-big-dummy" selected></option>' + r + "</select>", s);
      },
      tr: function(r, s) {
        return g.create("<tbody>" + r + "</tbody>", s);
      },
      td: function(r, s) {
        return g.create("<tr>" + r + "</tr>", s);
      },
      col: function(r, s) {
        return g.create("<colgroup>" + r + "</colgroup>", s);
      },
      tbody: "table"
    });
    b.mix(j, {
      legend: "fieldset",
      th: j.td,
      thead: j.tbody,
      tfoot: j.tbody,
      caption: j.tbody,
      colgroup: j.tbody,
      optgroup: j.option
    });
  }
  g.creators = j;
  b.mix(b.DOM, {
    setWidth: function(s, r) {
      b.DOM._setSize(s, "width", r);
    },
    setHeight: function(s, r) {
      b.DOM._setSize(s, "height", r);
    },
    _setSize: function(s, u, t) {
      t = (t > 0) ? t : 0;
      var r = 0;
      s.style[u] = t + "px";
      r = (u === "height") ? s.offsetHeight : s.offsetWidth;
      if (r > t) {
        t = t - (r - t);
        if (t < 0) {
          t = 0;
        }
        s.style[u] = t + "px";
      }
    }
  });
}, "3.4.1", {
  requires: ["dom-core"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-style", function(a) {
  (function(e) {
    var p = "documentElement",
      b = "defaultView",
      n = "ownerDocument",
      h = "style",
      i = "float",
      r = "cssFloat",
      s = "styleFloat",
      k = "transparent",
      d = "getComputedStyle",
      c = "getBoundingClientRect",
      o = e.config.win,
      g = e.config.doc,
      t = undefined,
      q = e.DOM,
      f = "transform",
      l = ["WebkitTransform", "MozTransform", "OTransform"],
      m = /color$/i,
      j = /width|height|top|left|right|bottom|margin|padding/i;
    e.Array.each(l, function(u) {
      if (u in g[p].style) {
        f = u;
      }
    });
    e.mix(q, {
      DEFAULT_UNIT: "px",
      CUSTOM_STYLES: {},
      setStyle: function(x, u, y, w) {
        w = w || x.style;
        var v = q.CUSTOM_STYLES;
        if (w) {
          if (y === null || y === "") {
            y = "";
          } else {
            if (!isNaN(new Number(y)) && j.test(u)) {
              y += q.DEFAULT_UNIT;
            }
          }
          if (u in v) {
            if (v[u].set) {
              v[u].set(x, y, w);
              return;
            } else {
              if (typeof v[u] === "string") {
                u = v[u];
              }
            }
          } else {
            if (u === "") {
              u = "cssText";
              y = "";
            }
          }
          w[u] = y;
        }
      },
      getStyle: function(x, u, w) {
        w = w || x.style;
        var v = q.CUSTOM_STYLES,
          y = "";
        if (w) {
          if (u in v) {
            if (v[u].get) {
              return v[u].get(x, u, w);
            } else {
              if (typeof v[u] === "string") {
                u = v[u];
              }
            }
          }
          y = w[u];
          if (y === "") {
            y = q[d](x, u);
          }
        }
        return y;
      },
      setStyles: function(v, w) {
        var u = v.style;
        e.each(w, function(x, y) {
          q.setStyle(v, y, x, u);
        }, q);
      },
      getComputedStyle: function(w, u) {
        var y = "",
          x = w[n],
          v;
        if (w[h] && x[b] && x[b][d]) {
          v = x[b][d](w, null);
          if (v) {
            y = v[u];
          }
        }
        return y;
      }
    });
    if (g[p][h][r] !== t) {
      q.CUSTOM_STYLES[i] = r;
    } else {
      if (g[p][h][s] !== t) {
        q.CUSTOM_STYLES[i] = s;
      }
    }
    if (e.UA.opera) {
      q[d] = function(w, v) {
        var u = w[n][b],
          x = u[d](w, "")[v];
        if (m.test(v)) {
          x = e.Color.toRGB(x);
        }
        return x;
      };
    }
    if (e.UA.webkit) {
      q[d] = function(w, v) {
        var u = w[n][b],
          x = u[d](w, "")[v];
        if (x === "rgba(0, 0, 0, 0)") {
          x = k;
        }
        return x;
      };
    }
    e.DOM._getAttrOffset = function(y, v) {
      var A = e.DOM[d](y, v),
        x = y.offsetParent,
        u, w, z;
      if (A === "auto") {
        u = e.DOM.getStyle(y, "position");
        if (u === "static" || u === "relative") {
          A = 0;
        } else {
          if (x && x[c]) {
            w = x[c]()[v];
            z = y[c]()[v];
            if (v === "left" || v === "top") {
              A = z - w;
            } else {
              A = w - y[c]()[v];
            }
          }
        }
      }
      return A;
    };
    e.DOM._getOffset = function(u) {
      var w, v = null;
      if (u) {
        w = q.getStyle(u, "position");
        v = [parseInt(q[d](u, "left"), 10), parseInt(q[d](u, "top"), 10)];
        if (isNaN(v[0])) {
          v[0] = parseInt(q.getStyle(u, "left"), 10);
          if (isNaN(v[0])) {
            v[0] = (w === "relative") ? 0 : u.offsetLeft || 0;
          }
        }
        if (isNaN(v[1])) {
          v[1] = parseInt(q.getStyle(u, "top"), 10);
          if (isNaN(v[1])) {
            v[1] = (w === "relative") ? 0 : u.offsetTop || 0;
          }
        }
      }
      return v;
    };
    q.CUSTOM_STYLES.transform = {
      set: function(v, w, u) {
        u[f] = w;
      },
      get: function(v, u) {
        return q[d](v, f);
      }
    };
  })(a);
  (function(d) {
    var b = parseInt,
      c = RegExp;
    d.Color = {
      KEYWORDS: {
        black: "000",
        silver: "c0c0c0",
        gray: "808080",
        white: "fff",
        maroon: "800000",
        red: "f00",
        purple: "800080",
        fuchsia: "f0f",
        green: "008000",
        lime: "0f0",
        olive: "808000",
        yellow: "ff0",
        navy: "000080",
        blue: "00f",
        teal: "008080",
        aqua: "0ff"
      },
      re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
      re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
      re_hex3: /([0-9A-F])/gi,
      toRGB: function(e) {
        if (!d.Color.re_RGB.test(e)) {
          e = d.Color.toHex(e);
        }
        if (d.Color.re_hex.exec(e)) {
          e = "rgb(" + [b(c.$1, 16), b(c.$2, 16), b(c.$3, 16)].join(", ") + ")";
        }
        return e;
      },
      toHex: function(f) {
        f = d.Color.KEYWORDS[f] || f;
        if (d.Color.re_RGB.exec(f)) {
          f = [Number(c.$1).toString(16), Number(c.$2).toString(16), Number(c.$3).toString(16)];
          for (var e = 0; e < f.length; e++) {
            if (f[e].length < 2) {
              f[e] = "0" + f[e];
            }
          }
          f = f.join("");
        }
        if (f.length < 6) {
          f = f.replace(d.Color.re_hex3, "$1$1");
        }
        if (f !== "transparent" && f.indexOf("#") < 0) {
          f = "#" + f;
        }
        return f.toUpperCase();
      }
    };
  })(a);
}, "3.4.1", {
  requires: ["dom-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-custom-base", function(b) {
  b.Env.evt = {
    handles: {},
    plugins: {}
  };
  var g = 0,
    i = 1,
    p = {
      objs: {},
      before: function(s, u, v, w) {
        var t = s,
          r;
        if (w) {
          r = [s, w].concat(b.Array(arguments, 4, true));
          t = b.rbind.apply(b, r);
        }
        return this._inject(g, t, u, v);
      },
      after: function(s, u, v, w) {
        var t = s,
          r;
        if (w) {
          r = [s, w].concat(b.Array(arguments, 4, true));
          t = b.rbind.apply(b, r);
        }
        return this._inject(i, t, u, v);
      },
      _inject: function(r, t, u, w) {
        var x = b.stamp(u),
          v, s;
        if (!this.objs[x]) {
          this.objs[x] = {};
        }
        v = this.objs[x];
        if (!v[w]) {
          v[w] = new b.Do.Method(u, w);
          u[w] = function() {
            return v[w].exec.apply(v[w], arguments);
          };
        }
        s = x + b.stamp(t) + w;
        v[w].register(s, t, r);
        return new b.EventHandle(v[w], s);
      },
      detach: function(r) {
        if (r.detach) {
          r.detach();
        }
      },
      _unload: function(s, r) {}
    };
  b.Do = p;
  p.Method = function(r, s) {
    this.obj = r;
    this.methodName = s;
    this.method = r[s];
    this.before = {};
    this.after = {};
  };
  p.Method.prototype.register = function(s, t, r) {
    if (r) {
      this.after[s] = t;
    } else {
      this.before[s] = t;
    }
  };
  p.Method.prototype._delete = function(r) {
    delete this.before[r];
    delete this.after[r];
  };
  p.Method.prototype.exec = function() {
    var t = b.Array(arguments, 0, true),
      u, s, x, v = this.before,
      r = this.after,
      w = false;
    for (u in v) {
      if (v.hasOwnProperty(u)) {
        s = v[u].apply(this.obj, t);
        if (s) {
          switch (s.constructor) {
            case p.Halt:
              return s.retVal;
            case p.AlterArgs:
              t = s.newArgs;
              break;
            case p.Prevent:
              w = true;
              break;
            default:
          }
        }
      }
    }
    if (!w) {
      s = this.method.apply(this.obj, t);
    }
    p.originalRetVal = s;
    p.currentRetVal = s;
    for (u in r) {
      if (r.hasOwnProperty(u)) {
        x = r[u].apply(this.obj, t);
        if (x && x.constructor == p.Halt) {
          return x.retVal;
        } else {
          if (x && x.constructor == p.AlterReturn) {
            s = x.newRetVal;
            p.currentRetVal = s;
          }
        }
      }
    }
    return s;
  };
  p.AlterArgs = function(s, r) {
    this.msg = s;
    this.newArgs = r;
  };
  p.AlterReturn = function(s, r) {
    this.msg = s;
    this.newRetVal = r;
  };
  p.Halt = function(s, r) {
    this.msg = s;
    this.retVal = r;
  };
  p.Prevent = function(r) {
    this.msg = r;
  };
  p.Error = p.Halt;
  var m = "after",
    q = ["broadcast", "monitored", "bubbles", "context", "contextFn", "currentTarget", "defaultFn", "defaultTargetOnly", "details", "emitFacade", "fireOnce", "async", "host", "preventable", "preventedFn", "queuable", "silent", "stoppedFn", "target", "type"],
    n = 9,
    a = "yui:log";
  b.CustomEvent = function(r, s) {
    s = s || {};
    this.id = b.stamp(this);
    this.type = r;
    this.context = b;
    this.logSystem = (r == a);
    this.silent = this.logSystem;
    this.subscribers = {};
    this.afters = {};
    this.preventable = true;
    this.bubbles = true;
    this.signature = n;
    this.subCount = 0;
    this.afterCount = 0;
    this.applyConfig(s, true);
  };
  b.CustomEvent.prototype = {
    constructor: b.CustomEvent,
    hasSubs: function(r) {
      var v = this.subCount,
        t = this.afterCount,
        u = this.sibling;
      if (u) {
        v += u.subCount;
        t += u.afterCount;
      }
      if (r) {
        return (r == "after") ? t : v;
      }
      return (v + t);
    },
    monitor: function(t) {
      this.monitored = true;
      var s = this.id + "|" + this.type + "_" + t,
        r = b.Array(arguments, 0, true);
      r[0] = s;
      return this.host.on.apply(this.host, r);
    },
    getSubs: function() {
      var u = b.merge(this.subscribers),
        r = b.merge(this.afters),
        t = this.sibling;
      if (t) {
        b.mix(u, t.subscribers);
        b.mix(r, t.afters);
      }
      return [u, r];
    },
    applyConfig: function(s, r) {
      if (s) {
        b.mix(this, s, r, q);
      }
    },
    _on: function(w, u, t, r) {
      if (!w) {
        this.log("Invalid callback for CE: " + this.type);
      }
      var v = new b.Subscriber(w, u, t, r);
      if (this.fireOnce && this.fired) {
        if (this.async) {
          setTimeout(b.bind(this._notify, this, v, this.firedWith), 0);
        } else {
          this._notify(v, this.firedWith);
        }
      }
      if (r == m) {
        this.afters[v.id] = v;
        this.afterCount++;
      } else {
        this.subscribers[v.id] = v;
        this.subCount++;
      }
      return new b.EventHandle(this, v);
    },
    subscribe: function(t, s) {
      var r = (arguments.length > 2) ? b.Array(arguments, 2, true) : null;
      return this._on(t, s, r, true);
    },
    on: function(t, s) {
      var r = (arguments.length > 2) ? b.Array(arguments, 2, true) : null;
      if (this.host) {
        this.host._monitor("attach", this.type, {
          args: arguments
        });
      }
      return this._on(t, s, r, true);
    },
    after: function(t, s) {
      var r = (arguments.length > 2) ? b.Array(arguments, 2, true) : null;
      return this._on(t, s, r, m);
    },
    detach: function(w, u) {
      if (w && w.detach) {
        return w.detach();
      }
      var t, v, x = 0,
        r = b.merge(this.subscribers, this.afters);
      for (t in r) {
        if (r.hasOwnProperty(t)) {
          v = r[t];
          if (v && (!w || w === v.fn)) {
            this._delete(v);
            x++;
          }
        }
      }
      return x;
    },
    unsubscribe: function() {
      return this.detach.apply(this, arguments);
    },
    _notify: function(v, u, r) {
      this.log(this.type + "->" + "sub: " + v.id);
      var t;
      t = v.notify(u, this);
      if (false === t || this.stopped > 1) {
        this.log(this.type + " cancelled by subscriber");
        return false;
      }
      return true;
    },
    log: function(s, r) {
      if (!this.silent) {}
    },
    fire: function() {
      if (this.fireOnce && this.fired) {
        this.log("fireOnce event: " + this.type + " already fired");
        return true;
      } else {
        var r = b.Array(arguments, 0, true);
        this.fired = true;
        this.firedWith = r;
        if (this.emitFacade) {
          return this.fireComplex(r);
        } else {
          return this.fireSimple(r);
        }
      }
    },
    fireSimple: function(r) {
      this.stopped = 0;
      this.prevented = 0;
      if (this.hasSubs()) {
        var s = this.getSubs();
        this._procSubs(s[0], r);
        this._procSubs(s[1], r);
      }
      this._broadcast(r);
      return this.stopped ? false : true;
    },
    fireComplex: function(r) {
      r[0] = r[0] || {};
      return this.fireSimple(r);
    },
    _procSubs: function(v, t, r) {
      var w, u;
      for (u in v) {
        if (v.hasOwnProperty(u)) {
          w = v[u];
          if (w && w.fn) {
            if (false === this._notify(w, t, r)) {
              this.stopped = 2;
            }
            if (this.stopped == 2) {
              return false;
            }
          }
        }
      }
      return true;
    },
    _broadcast: function(s) {
      if (!this.stopped && this.broadcast) {
        var r = b.Array(s);
        r.unshift(this.type);
        if (this.host !== b) {
          b.fire.apply(b, r);
        }
        if (this.broadcast == 2) {
          b.Global.fire.apply(b.Global, r);
        }
      }
    },
    unsubscribeAll: function() {
      return this.detachAll.apply(this, arguments);
    },
    detachAll: function() {
      return this.detach();
    },
    _delete: function(r) {
      if (r) {
        if (this.subscribers[r.id]) {
          delete this.subscribers[r.id];
          this.subCount--;
        }
        if (this.afters[r.id]) {
          delete this.afters[r.id];
          this.afterCount--;
        }
      }
      if (this.host) {
        this.host._monitor("detach", this.type, {
          ce: this,
          sub: r
        });
      }
      if (r) {
        r.deleted = true;
      }
    }
  };
  b.Subscriber = function(t, s, r) {
    this.fn = t;
    this.context = s;
    this.id = b.stamp(this);
    this.args = r;
  };
  b.Subscriber.prototype = {
    constructor: b.Subscriber,
    _notify: function(v, t, u) {
      if (this.deleted && !this.postponed) {
        if (this.postponed) {
          delete this.fn;
          delete this.context;
        } else {
          delete this.postponed;
          return null;
        }
      }
      var r = this.args,
        s;
      switch (u.signature) {
        case 0:
          s = this.fn.call(v, u.type, t, v);
          break;
        case 1:
          s = this.fn.call(v, t[0] || null, v);
          break;
        default:
          if (r || t) {
            t = t || [];
            r = (r) ? t.concat(r) : t;
            s = this.fn.apply(v, r);
          } else {
            s = this.fn.call(v);
          }
      }
      if (this.once) {
        u._delete(this);
      }
      return s;
    },
    notify: function(s, u) {
      var v = this.context,
        r = true;
      if (!v) {
        v = (u.contextFn) ? u.contextFn() : u.context;
      }
      if (b.config.throwFail) {
        r = this._notify(v, s, u);
      } else {
        try {
          r = this._notify(v, s, u);
        } catch (t) {
          b.error(this + " failed: " + t.message, t);
        }
      }
      return r;
    },
    contains: function(s, r) {
      if (r) {
        return ((this.fn == s) && this.context == r);
      } else {
        return (this.fn == s);
      }
    }
  };
  b.EventHandle = function(r, s) {
    this.evt = r;
    this.sub = s;
  };
  b.EventHandle.prototype = {
    batch: function(r, s) {
      r.call(s || this, this);
      if (b.Lang.isArray(this.evt)) {
        b.Array.each(this.evt, function(t) {
          t.batch.call(s || t, r);
        });
      }
    },
    detach: function() {
      var r = this.evt,
        t = 0,
        s;
      if (r) {
        if (b.Lang.isArray(r)) {
          for (s = 0; s < r.length; s++) {
            t += r[s].detach();
          }
        } else {
          r._delete(this.sub);
          t = 1;
        }
      }
      return t;
    },
    monitor: function(r) {
      return this.evt.monitor.apply(this.evt, arguments);
    }
  };
  var j = b.Lang,
    h = ":",
    e = "|",
    l = "~AFTER~",
    k = b.Array,
    c = b.cached(function(r) {
      return r.replace(/(.*)(:)(.*)/, "*$2$3");
    }),
    o = b.cached(function(r, s) {
      if (!s || !j.isString(r) || r.indexOf(h) > -1) {
        return r;
      }
      return s + h + r;
    }),
    f = b.cached(function(u, w) {
      var s = u,
        v, x, r;
      if (!j.isString(s)) {
        return s;
      }
      r = s.indexOf(l);
      if (r > -1) {
        x = true;
        s = s.substr(l.length);
      }
      r = s.indexOf(e);
      if (r > -1) {
        v = s.substr(0, (r));
        s = s.substr(r + 1);
        if (s == "*") {
          s = null;
        }
      }
      return [v, (w) ? o(s, w) : s, x, s];
    }),
    d = function(r) {
      var s = (j.isObject(r)) ? r : {};
      this._yuievt = this._yuievt || {
        id: b.guid(),
        events: {},
        targets: {},
        config: s,
        chain: ("chain" in s) ? s.chain : b.config.chain,
        bubbling: false,
        defaults: {
          context: s.context || this,
          host: this,
          emitFacade: s.emitFacade,
          fireOnce: s.fireOnce,
          queuable: s.queuable,
          monitored: s.monitored,
          broadcast: s.broadcast,
          defaultTargetOnly: s.defaultTargetOnly,
          bubbles: ("bubbles" in s) ? s.bubbles : true
        }
      };
    };
  d.prototype = {
    constructor: d,
    once: function() {
      var r = this.on.apply(this, arguments);
      r.batch(function(s) {
        if (s.sub) {
          s.sub.once = true;
        }
      });
      return r;
    },
    onceAfter: function() {
      var r = this.after.apply(this, arguments);
      r.batch(function(s) {
        if (s.sub) {
          s.sub.once = true;
        }
      });
      return r;
    },
    parseType: function(r, s) {
      return f(r, s || this._yuievt.config.prefix);
    },
    on: function(v, A, t) {
      var D = f(v, this._yuievt.config.prefix),
        F, G, s, J, C, B, H, x = b.Env.evt.handles,
        u, r, y, I = b.Node,
        E, z, w;
      this._monitor("attach", D[1], {
        args: arguments,
        category: D[0],
        after: D[2]
      });
      if (j.isObject(v)) {
        if (j.isFunction(v)) {
          return b.Do.before.apply(b.Do, arguments);
        }
        F = A;
        G = t;
        s = k(arguments, 0, true);
        J = [];
        if (j.isArray(v)) {
          w = true;
        }
        u = v._after;
        delete v._after;
        b.each(v, function(M, L) {
          if (j.isObject(M)) {
            F = M.fn || ((j.isFunction(M)) ? M : F);
            G = M.context || G;
          }
          var K = (u) ? l : "";
          s[0] = K + ((w) ? M : L);
          s[1] = F;
          s[2] = G;
          J.push(this.on.apply(this, s));
        }, this);
        return (this._yuievt.chain) ? this : new b.EventHandle(J);
      }
      B = D[0];
      u = D[2];
      y = D[3];
      if (I && b.instanceOf(this, I) && (y in I.DOM_EVENTS)) {
        s = k(arguments, 0, true);
        s.splice(2, 0, I.getDOMNode(this));
        return b.on.apply(b, s);
      }
      v = D[1];
      if (b.instanceOf(this, YUI)) {
        r = b.Env.evt.plugins[v];
        s = k(arguments, 0, true);
        s[0] = y;
        if (I) {
          E = s[2];
          if (b.instanceOf(E, b.NodeList)) {
            E = b.NodeList.getDOMNodes(E);
          } else {
            if (b.instanceOf(E, I)) {
              E = I.getDOMNode(E);
            }
          }
          z = (y in I.DOM_EVENTS);
          if (z) {
            s[2] = E;
          }
        }
        if (r) {
          H = r.on.apply(b, s);
        } else {
          if ((!v) || z) {
            H = b.Event._attach(s);
          }
        }
      }
      if (!H) {
        C = this._yuievt.events[v] || this.publish(v);
        H = C._on(A, t, (arguments.length > 3) ? k(arguments, 3, true) : null, (u) ? "after" : true);
      }
      if (B) {
        x[B] = x[B] || {};
        x[B][v] = x[B][v] || [];
        x[B][v].push(H);
      }
      return (this._yuievt.chain) ? this : H;
    },
    subscribe: function() {
      return this.on.apply(this, arguments);
    },
    detach: function(A, C, r) {
      var G = this._yuievt.events,
        v, x = b.Node,
        E = x && (b.instanceOf(this, x));
      if (!A && (this !== b)) {
        for (v in G) {
          if (G.hasOwnProperty(v)) {
            G[v].detach(C, r);
          }
        }
        if (E) {
          b.Event.purgeElement(x.getDOMNode(this));
        }
        return this;
      }
      var u = f(A, this._yuievt.config.prefix),
        z = j.isArray(u) ? u[0] : null,
        H = (u) ? u[3] : null,
        w, D = b.Env.evt.handles,
        F, B, y, t, s = function(M, K, L) {
          var J = M[K],
            N, I;
          if (J) {
            for (I = J.length - 1; I >= 0; --I) {
              N = J[I].evt;
              if (N.host === L || N.el === L) {
                J[I].detach();
              }
            }
          }
        };
      if (z) {
        B = D[z];
        A = u[1];
        F = (E) ? b.Node.getDOMNode(this) : this;
        if (B) {
          if (A) {
            s(B, A, F);
          } else {
            for (v in B) {
              if (B.hasOwnProperty(v)) {
                s(B, v, F);
              }
            }
          }
          return this;
        }
      } else {
        if (j.isObject(A) && A.detach) {
          A.detach();
          return this;
        } else {
          if (E && ((!H) || (H in x.DOM_EVENTS))) {
            y = k(arguments, 0, true);
            y[2] = x.getDOMNode(this);
            b.detach.apply(b, y);
            return this;
          }
        }
      }
      w = b.Env.evt.plugins[H];
      if (b.instanceOf(this, YUI)) {
        y = k(arguments, 0, true);
        if (w && w.detach) {
          w.detach.apply(b, y);
          return this;
        } else {
          if (!A || (!w && x && (A in x.DOM_EVENTS))) {
            y[0] = A;
            b.Event.detach.apply(b.Event, y);
            return this;
          }
        }
      }
      t = G[u[1]];
      if (t) {
        t.detach(C, r);
      }
      return this;
    },
    unsubscribe: function() {
      return this.detach.apply(this, arguments);
    },
    detachAll: function(r) {
      return this.detach(r);
    },
    unsubscribeAll: function() {
      return this.detachAll.apply(this, arguments);
    },
    publish: function(t, u) {
      var s, y, r, x, w = this._yuievt,
        v = w.config.prefix;
      t = (v) ? o(t, v) : t;
      this._monitor("publish", t, {
        args: arguments
      });
      if (j.isObject(t)) {
        r = {};
        b.each(t, function(A, z) {
          r[z] = this.publish(z, A || u);
        }, this);
        return r;
      }
      s = w.events;
      y = s[t];
      if (y) {
        if (u) {
          y.applyConfig(u, true);
        }
      } else {
        x = w.defaults;
        y = new b.CustomEvent(t, (u) ? b.merge(x, u) : x);
        s[t] = y;
      }
      return s[t];
    },
    _monitor: function(u, r, v) {
      var s, t = this.getEvent(r);
      if ((this._yuievt.config.monitored && (!t || t.monitored)) || (t && t.monitored)) {
        s = r + "_" + u;
        v.monitored = u;
        this.fire.call(this, s, v);
      }
    },
    fire: function(v) {
      var z = j.isString(v),
        u = (z) ? v : (v && v.type),
        y, s, x = this._yuievt.config.prefix,
        w, r = (z) ? k(arguments, 1, true) : arguments;
      u = (x) ? o(u, x) : u;
      this._monitor("fire", u, {
        args: r
      });
      y = this.getEvent(u, true);
      w = this.getSibling(u, y);
      if (w && !y) {
        y = this.publish(u);
      }
      if (!y) {
        if (this._yuievt.hasTargets) {
          return this.bubble({
            type: u
          }, r, this);
        }
        s = true;
      } else {
        y.sibling = w;
        s = y.fire.apply(y, r);
      }
      return (this._yuievt.chain) ? this : s;
    },
    getSibling: function(r, t) {
      var s;
      if (r.indexOf(h) > -1) {
        r = c(r);
        s = this.getEvent(r, true);
        if (s) {
          s.applyConfig(t);
          s.bubbles = false;
          s.broadcast = 0;
        }
      }
      return s;
    },
    getEvent: function(s, r) {
      var u, t;
      if (!r) {
        u = this._yuievt.config.prefix;
        s = (u) ? o(s, u) : s;
      }
      t = this._yuievt.events;
      return t[s] || null;
    },
    after: function(t, s) {
      var r = k(arguments, 0, true);
      switch (j.type(t)) {
        case "function":
          return b.Do.after.apply(b.Do, arguments);
        case "array":
        case "object":
          r[0]._after = true;
          break;
        default:
          r[0] = l + t;
      }
      return this.on.apply(this, r);
    },
    before: function() {
      return this.on.apply(this, arguments);
    }
  };
  b.EventTarget = d;
  b.mix(b, d.prototype);
  d.call(b, {
    bubbles: false
  });
  YUI.Env.globalEvents = YUI.Env.globalEvents || new d();
  b.Global = YUI.Env.globalEvents;
}, "3.4.1", {
  requires: ["oop"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("selector-native", function(a) {
  (function(e) {
    e.namespace("Selector");
    var c = "compareDocumentPosition",
      d = "ownerDocument";
    var b = {
      _foundCache: [],
      useNative: true,
      _compare: ("sourceIndex" in e.config.doc.documentElement) ? function(i, h) {
        var g = i.sourceIndex,
          f = h.sourceIndex;
        if (g === f) {
          return 0;
        } else {
          if (g > f) {
            return 1;
          }
        }
        return -1;
      } : (e.config.doc.documentElement[c] ? function(g, f) {
        if (g[c](f) & 4) {
          return -1;
        } else {
          return 1;
        }
      } : function(j, i) {
        var h, f, g;
        if (j && i) {
          h = j[d].createRange();
          h.setStart(j, 0);
          f = i[d].createRange();
          f.setStart(i, 0);
          g = h.compareBoundaryPoints(1, f);
        }
        return g;
      }),
      _sort: function(f) {
        if (f) {
          f = e.Array(f, 0, true);
          if (f.sort) {
            f.sort(b._compare);
          }
        }
        return f;
      },
      _deDupe: function(f) {
        var g = [],
          h, j;
        for (h = 0;
          (j = f[h++]);) {
          if (!j._found) {
            g[g.length] = j;
            j._found = true;
          }
        }
        for (h = 0;
          (j = g[h++]);) {
          j._found = null;
          j.removeAttribute("_found");
        }
        return g;
      },
      query: function(g, o, p, f) {
        o = o || e.config.doc;
        var l = [],
          h = (e.Selector.useNative && e.config.doc.querySelector && !f),
          k = [
            [g, o]
          ],
          m, q, j, n = (h) ? e.Selector._nativeQuery : e.Selector._bruteQuery;
        if (g && n) {
          if (!f && (!h || o.tagName)) {
            k = b._splitQueries(g, o);
          }
          for (j = 0;
            (m = k[j++]);) {
            q = n(m[0], m[1], p);
            if (!p) {
              q = e.Array(q, 0, true);
            }
            if (q) {
              l = l.concat(q);
            }
          }
          if (k.length > 1) {
            l = b._sort(b._deDupe(l));
          }
        }
        return (p) ? (l[0] || null) : l;
      },
      _splitQueries: function(h, l) {
        var g = h.split(","),
          j = [],
          m = "",
          k, f;
        if (l) {
          if (l.tagName) {
            l.id = l.id || e.guid();
            m = '[id="' + l.id + '"] ';
          }
          for (k = 0, f = g.length; k < f; ++k) {
            h = m + g[k];
            j.push([h, l]);
          }
        }
        return j;
      },
      _nativeQuery: function(f, g, h) {
        if (e.UA.webkit && f.indexOf(":checked") > -1 && (e.Selector.pseudos && e.Selector.pseudos.checked)) {
          return e.Selector.query(f, g, h, true);
        }
        try {
          return g["querySelector" + (h ? "" : "All")](f);
        } catch (i) {
          return e.Selector.query(f, g, h, true);
        }
      },
      filter: function(g, f) {
        var h = [],
          j, k;
        if (g && f) {
          for (j = 0;
            (k = g[j++]);) {
            if (e.Selector.test(k, f)) {
              h[h.length] = k;
            }
          }
        } else {}
        return h;
      },
      test: function(h, k, p) {
        var n = false,
          f = false,
          g, q, t, o, s, m, l, r;
        if (h && h.tagName) {
          if (typeof k == "function") {
            n = k.call(h, h);
          } else {
            g = k.split(",");
            if (!p && !e.DOM.inDoc(h)) {
              q = h.parentNode;
              if (q) {
                p = q;
              } else {
                s = h[d].createDocumentFragment();
                s.appendChild(h);
                p = s;
                f = true;
              }
            }
            p = p || h[d];
            if (!h.id) {
              h.id = e.guid();
            }
            for (m = 0;
              (r = g[m++]);) {
              r += '[id="' + h.id + '"]';
              o = e.Selector.query(r, p);
              for (l = 0; t = o[l++];) {
                if (t === h) {
                  n = true;
                  break;
                }
              }
              if (n) {
                break;
              }
            }
            if (f) {
              s.removeChild(h);
            }
          }
        }
        return n;
      },
      ancestor: function(g, f, h) {
        return e.DOM.ancestor(g, function(i) {
          return e.Selector.test(i, f);
        }, h);
      }
    };
    e.mix(e.Selector, b, true);
  })(a);
}, "3.4.1", {
  requires: ["dom-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("selector", function(a) {}, "3.4.1", {
  requires: ["selector-native"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-core", function(c) {
  var j = ".",
    e = "nodeName",
    n = "nodeType",
    b = "ownerDocument",
    m = "tagName",
    d = "_yuid",
    i = {},
    p = Array.prototype.slice,
    f = c.DOM,
    k = function(r) {
      if (!this.getDOMNode) {
        return new k(r);
      }
      if (typeof r == "string") {
        r = k._fromString(r);
        if (!r) {
          return null;
        }
      }
      var q = (r.nodeType !== 9) ? r.uniqueID : r[d];
      if (q && k._instances[q] && k._instances[q]._node !== r) {
        r[d] = null;
      }
      q = q || c.stamp(r);
      if (!q) {
        q = c.guid();
      }
      this[d] = q;
      this._node = r;
      this._stateProxy = r;
      if (this._initPlugins) {
        this._initPlugins();
      }
    },
    o = function(r) {
      var q = null;
      if (r) {
        q = (typeof r == "string") ? function(s) {
          return c.Selector.test(s, r);
        } : function(s) {
          return r(c.one(s));
        };
      }
      return q;
    };
  k.ATTRS = {};
  k.DOM_EVENTS = {};
  k._fromString = function(q) {
    if (q) {
      if (q.indexOf("doc") === 0) {
        q = c.config.doc;
      } else {
        if (q.indexOf("win") === 0) {
          q = c.config.win;
        } else {
          q = c.Selector.query(q, null, true);
        }
      }
    }
    return q || null;
  };
  k.NAME = "node";
  k.re_aria = /^(?:role$|aria-)/;
  k.SHOW_TRANSITION = "fadeIn";
  k.HIDE_TRANSITION = "fadeOut";
  k._instances = {};
  k.getDOMNode = function(q) {
    if (q) {
      return (q.nodeType) ? q : q._node || null;
    }
    return null;
  };
  k.scrubVal = function(r, q) {
    if (r) {
      if (typeof r == "object" || typeof r == "function") {
        if (n in r || f.isWindow(r)) {
          r = c.one(r);
        } else {
          if ((r.item && !r._nodes) || (r[0] && r[0][n])) {
            r = c.all(r);
          }
        }
      }
    } else {
      if (typeof r === "undefined") {
        r = q;
      } else {
        if (r === null) {
          r = null;
        }
      }
    }
    return r;
  };
  k.addMethod = function(q, s, r) {
    if (q && s && typeof s == "function") {
      k.prototype[q] = function() {
        var u = p.call(arguments),
          v = this,
          t;
        if (u[0] && c.instanceOf(u[0], k)) {
          u[0] = u[0]._node;
        }
        if (u[1] && c.instanceOf(u[1], k)) {
          u[1] = u[1]._node;
        }
        u.unshift(v._node);
        t = s.apply(v, u);
        if (t) {
          t = k.scrubVal(t, v);
        }(typeof t != "undefined") || (t = v);
        return t;
      };
    } else {}
  };
  k.importMethod = function(s, q, r) {
    if (typeof q == "string") {
      r = r || q;
      k.addMethod(r, s[q], s);
    } else {
      c.Array.each(q, function(t) {
        k.importMethod(s, t);
      });
    }
  };
  k.one = function(t) {
    var q = null,
      s, r;
    if (t) {
      if (typeof t == "string") {
        t = k._fromString(t);
        if (!t) {
          return null;
        }
      } else {
        if (t.getDOMNode) {
          return t;
        }
      }
      if (t.nodeType || c.DOM.isWindow(t)) {
        r = (t.uniqueID && t.nodeType !== 9) ? t.uniqueID : t._yuid;
        q = k._instances[r];
        s = q ? q._node : null;
        if (!q || (s && t !== s)) {
          q = new k(t);
          if (t.nodeType != 11) {
            k._instances[q[d]] = q;
          }
        }
      }
    }
    return q;
  };
  k.DEFAULT_SETTER = function(q, s) {
    var r = this._stateProxy,
      t;
    if (q.indexOf(j) > -1) {
      t = q;
      q = q.split(j);
      c.Object.setValue(r, q, s);
    } else {
      if (typeof r[q] != "undefined") {
        r[q] = s;
      }
    }
    return s;
  };
  k.DEFAULT_GETTER = function(q) {
    var r = this._stateProxy,
      s;
    if (q.indexOf && q.indexOf(j) > -1) {
      s = c.Object.getValue(r, q.split(j));
    } else {
      if (typeof r[q] != "undefined") {
        s = r[q];
      }
    }
    return s;
  };
  c.mix(k.prototype, {
    toString: function() {
      var t = this[d] + ": not bound to a node",
        s = this._node,
        q, u, r;
      if (s) {
        q = s.attributes;
        u = (q && q.id) ? s.getAttribute("id") : null;
        r = (q && q.className) ? s.getAttribute("className") : null;
        t = s[e];
        if (u) {
          t += "#" + u;
        }
        if (r) {
          t += "." + r.replace(" ", ".");
        }
        t += " " + this[d];
      }
      return t;
    },
    get: function(q) {
      var r;
      if (this._getAttr) {
        r = this._getAttr(q);
      } else {
        r = this._get(q);
      }
      if (r) {
        r = k.scrubVal(r, this);
      } else {
        if (r === null) {
          r = null;
        }
      }
      return r;
    },
    _get: function(q) {
      var r = k.ATTRS[q],
        s;
      if (r && r.getter) {
        s = r.getter.call(this);
      } else {
        if (k.re_aria.test(q)) {
          s = this._node.getAttribute(q, 2);
        } else {
          s = k.DEFAULT_GETTER.apply(this, arguments);
        }
      }
      return s;
    },
    set: function(q, s) {
      var r = k.ATTRS[q];
      if (this._setAttr) {
        this._setAttr.apply(this, arguments);
      } else {
        if (r && r.setter) {
          r.setter.call(this, s, q);
        } else {
          if (k.re_aria.test(q)) {
            this._node.setAttribute(q, s);
          } else {
            k.DEFAULT_SETTER.apply(this, arguments);
          }
        }
      }
      return this;
    },
    setAttrs: function(q) {
      if (this._setAttrs) {
        this._setAttrs(q);
      } else {
        c.Object.each(q, function(r, s) {
          this.set(s, r);
        }, this);
      }
      return this;
    },
    getAttrs: function(r) {
      var q = {};
      if (this._getAttrs) {
        this._getAttrs(r);
      } else {
        c.Array.each(r, function(s, t) {
          q[s] = this.get(s);
        }, this);
      }
      return q;
    },
    compareTo: function(q) {
      var r = this._node;
      if (c.instanceOf(q, k)) {
        q = q._node;
      }
      return r === q;
    },
    inDoc: function(r) {
      var q = this._node;
      r = (r) ? r._node || r : q[b];
      if (r.documentElement) {
        return f.contains(r.documentElement, q);
      }
    },
    getById: function(s) {
      var r = this._node,
        q = f.byId(s, r[b]);
      if (q && f.contains(r, q)) {
        q = c.one(q);
      } else {
        q = null;
      }
      return q;
    },
    ancestor: function(q, s, r) {
      if (arguments.length === 2 && (typeof s == "string" || typeof s == "function")) {
        r = s;
      }
      return c.one(f.ancestor(this._node, o(q), s, o(r)));
    },
    ancestors: function(q, s, r) {
      if (arguments.length === 2 && (typeof s == "string" || typeof s == "function")) {
        r = s;
      }
      return c.all(f.ancestors(this._node, o(q), s, o(r)));
    },
    previous: function(r, q) {
      return c.one(f.elementByAxis(this._node, "previousSibling", o(r), q));
    },
    next: function(r, q) {
      return c.one(f.elementByAxis(this._node, "nextSibling", o(r), q));
    },
    siblings: function(q) {
      return c.all(f.siblings(this._node, o(q)));
    },
    one: function(q) {
      return c.one(c.Selector.query(q, this._node, true));
    },
    all: function(q) {
      var r = c.all(c.Selector.query(q, this._node));
      r._query = q;
      r._queryRoot = this._node;
      return r;
    },
    test: function(q) {
      return c.Selector.test(this._node, q);
    },
    remove: function(q) {
      var r = this._node;
      if (r && r.parentNode) {
        r.parentNode.removeChild(r);
      }
      if (q) {
        this.destroy();
      }
      return this;
    },
    replace: function(q) {
      var r = this._node;
      if (typeof q == "string") {
        q = k.create(q);
      }
      r.parentNode.replaceChild(k.getDOMNode(q), r);
      return this;
    },
    replaceChild: function(r, q) {
      if (typeof r == "string") {
        r = f.create(r);
      }
      return c.one(this._node.replaceChild(k.getDOMNode(r), k.getDOMNode(q)));
    },
    destroy: function(s) {
      var r = c.config.doc.uniqueID ? "uniqueID" : "_yuid",
        q;
      this.purge();
      if (this.unplug) {
        this.unplug();
      }
      this.clearData();
      if (s) {
        c.NodeList.each(this.all("*"), function(t) {
          q = k._instances[t[r]];
          if (q) {
            q.destroy();
          }
        });
      }
      this._node = null;
      this._stateProxy = null;
      delete k._instances[this._yuid];
    },
    invoke: function(x, r, q, w, v, u) {
      var t = this._node,
        s;
      if (r && c.instanceOf(r, k)) {
        r = r._node;
      }
      if (q && c.instanceOf(q, k)) {
        q = q._node;
      }
      s = t[x](r, q, w, v, u);
      return k.scrubVal(s, this);
    },
    swap: c.config.doc.documentElement.swapNode ? function(q) {
      this._node.swapNode(k.getDOMNode(q));
    } : function(q) {
      q = k.getDOMNode(q);
      var s = this._node,
        r = q.parentNode,
        t = q.nextSibling;
      if (t === s) {
        r.insertBefore(s, q);
      } else {
        if (q === s.nextSibling) {
          r.insertBefore(q, s);
        } else {
          s.parentNode.replaceChild(q, s);
          f.addHTML(r, s, t);
        }
      }
      return this;
    },
    getData: function(r) {
      var q;
      this._data = this._data || {};
      if (arguments.length) {
        q = this._data[r];
      } else {
        q = this._data;
      }
      return q;
    },
    setData: function(q, r) {
      this._data = this._data || {};
      if (arguments.length > 1) {
        this._data[q] = r;
      } else {
        this._data = q;
      }
      return this;
    },
    clearData: function(q) {
      if ("_data" in this) {
        if (q) {
          delete this._data[q];
        } else {
          delete this._data;
        }
      }
      return this;
    },
    hasMethod: function(r) {
      var q = this._node;
      return !!(q && r in q && typeof q[r] != "unknown" && (typeof q[r] == "function" || String(q[r]).indexOf("function") === 1));
    },
    isFragment: function() {
      return (this.get("nodeType") === 11);
    },
    empty: function() {
      this.get("childNodes").remove().destroy(true);
      return this;
    },
    getDOMNode: function() {
      return this._node;
    }
  }, true);
  c.Node = k;
  c.one = k.one;
  var a = function(q) {
    var r = [];
    if (q) {
      if (typeof q === "string") {
        this._query = q;
        q = c.Selector.query(q);
      } else {
        if (q.nodeType || f.isWindow(q)) {
          q = [q];
        } else {
          if (q._node) {
            q = [q._node];
          } else {
            if (q[0] && q[0]._node) {
              c.Array.each(q, function(s) {
                if (s._node) {
                  r.push(s._node);
                }
              });
              q = r;
            } else {
              q = c.Array(q, 0, true);
            }
          }
        }
      }
    }
    this._nodes = q || [];
  };
  a.NAME = "NodeList";
  a.getDOMNodes = function(q) {
    return (q && q._nodes) ? q._nodes : q;
  };
  a.each = function(q, t, s) {
    var r = q._nodes;
    if (r && r.length) {
      c.Array.each(r, t, s || q);
    } else {}
  };
  a.addMethod = function(q, s, r) {
    if (q && s) {
      a.prototype[q] = function() {
        var u = [],
          t = arguments;
        c.Array.each(this._nodes, function(z) {
          var y = (z.uniqueID && z.nodeType !== 9) ? "uniqueID" : "_yuid",
            w = c.Node._instances[z[y]],
            x, v;
          if (!w) {
            w = a._getTempNode(z);
          }
          x = r || w;
          v = s.apply(x, t);
          if (v !== undefined && v !== w) {
            u[u.length] = v;
          }
        });
        return u.length ? u : this;
      };
    } else {}
  };
  a.importMethod = function(s, q, r) {
    if (typeof q === "string") {
      r = r || q;
      a.addMethod(q, s[q]);
    } else {
      c.Array.each(q, function(t) {
        a.importMethod(s, t);
      });
    }
  };
  a._getTempNode = function(r) {
    var q = a._tempNode;
    if (!q) {
      q = c.Node.create("<div></div>");
      a._tempNode = q;
    }
    q._node = r;
    q._stateProxy = r;
    return q;
  };
  c.mix(a.prototype, {
    item: function(q) {
      return c.one((this._nodes || [])[q]);
    },
    each: function(s, r) {
      var q = this;
      c.Array.each(this._nodes, function(u, t) {
        u = c.one(u);
        return s.call(r || u, u, t, q);
      });
      return q;
    },
    batch: function(r, q) {
      var s = this;
      c.Array.each(this._nodes, function(v, u) {
        var t = c.Node._instances[v[d]];
        if (!t) {
          t = a._getTempNode(v);
        }
        return r.call(q || t, t, u, s);
      });
      return s;
    },
    some: function(s, r) {
      var q = this;
      return c.Array.some(this._nodes, function(u, t) {
        u = c.one(u);
        r = r || u;
        return s.call(r, u, t, q);
      });
    },
    toFrag: function() {
      return c.one(c.DOM._nl2frag(this._nodes));
    },
    indexOf: function(q) {
      return c.Array.indexOf(this._nodes, c.Node.getDOMNode(q));
    },
    filter: function(q) {
      return c.all(c.Selector.filter(this._nodes, q));
    },
    modulus: function(t, s) {
      s = s || 0;
      var q = [];
      a.each(this, function(u, r) {
        if (r % t === s) {
          q.push(u);
        }
      });
      return c.all(q);
    },
    odd: function() {
      return this.modulus(2, 1);
    },
    even: function() {
      return this.modulus(2);
    },
    destructor: function() {},
    refresh: function() {
      var t, r = this._nodes,
        s = this._query,
        q = this._queryRoot;
      if (s) {
        if (!q) {
          if (r && r[0] && r[0].ownerDocument) {
            q = r[0].ownerDocument;
          }
        }
        this._nodes = c.Selector.query(s, q);
      }
      return this;
    },
    _prepEvtArgs: function(t, s, r) {
      var q = c.Array(arguments, 0, true);
      if (q.length < 2) {
        q[2] = this._nodes;
      } else {
        q.splice(2, 0, this._nodes);
      }
      q[3] = r || this;
      return q;
    },
    on: function(s, r, q) {
      return c.on.apply(c, this._prepEvtArgs.apply(this, arguments));
    },
    once: function(s, r, q) {
      return c.once.apply(c, this._prepEvtArgs.apply(this, arguments));
    },
    after: function(s, r, q) {
      return c.after.apply(c, this._prepEvtArgs.apply(this, arguments));
    },
    size: function() {
      return this._nodes.length;
    },
    isEmpty: function() {
      return this._nodes.length < 1;
    },
    toString: function() {
      var t = "",
        s = this[d] + ": not bound to any nodes",
        q = this._nodes,
        r;
      if (q && q[0]) {
        r = q[0];
        t += r[e];
        if (r.id) {
          t += "#" + r.id;
        }
        if (r.className) {
          t += "." + r.className.replace(" ", ".");
        }
        if (q.length > 1) {
          t += "...[" + q.length + " items]";
        }
      }
      return t || s;
    },
    getDOMNodes: function() {
      return this._nodes;
    }
  }, true);
  a.importMethod(c.Node.prototype, ["destroy", "empty", "remove", "set"]);
  a.prototype.get = function(r) {
    var u = [],
      t = this._nodes,
      s = false,
      v = a._getTempNode,
      q, w;
    if (t[0]) {
      q = c.Node._instances[t[0]._yuid] || v(t[0]);
      w = q._get(r);
      if (w && w.nodeType) {
        s = true;
      }
    }
    c.Array.each(t, function(x) {
      q = c.Node._instances[x._yuid];
      if (!q) {
        q = v(x);
      }
      w = q._get(r);
      if (!s) {
        w = c.Node.scrubVal(w, q);
      }
      u.push(w);
    });
    return (s) ? c.all(u) : u;
  };
  c.NodeList = a;
  c.all = function(q) {
    return new a(q);
  };
  c.Node.all = c.all;
  var l = c.NodeList,
    h = Array.prototype,
    g = {
      "concat": 1,
      "pop": 0,
      "push": 0,
      "shift": 0,
      "slice": 1,
      "splice": 1,
      "unshift": 0
    };
  c.Object.each(g, function(r, q) {
    l.prototype[q] = function() {
      var u = [],
        v = 0,
        s, t;
      while (typeof(s = arguments[v++]) != "undefined") {
        u.push(s._node || s._nodes || s);
      }
      t = h[q].apply(this._nodes, u);
      if (r) {
        t = c.all(t);
      } else {
        t = c.Node.scrubVal(t);
      }
      return t;
    };
  });
  c.Array.each(["removeChild", "hasChildNodes", "cloneNode", "hasAttribute", "scrollIntoView", "getElementsByTagName", "focus", "blur", "submit", "reset", "select", "createCaption"], function(q) {
    c.Node.prototype[q] = function(u, s, r) {
      var t = this.invoke(q, u, s, r);
      return t;
    };
  });
  c.Node.prototype.removeAttribute = function(q) {
    var r = this._node;
    if (r) {
      r.removeAttribute(q);
    }
    return this;
  };
  c.Node.importMethod(c.DOM, ["contains", "setAttribute", "getAttribute", "wrap", "unwrap", "generateID"]);
  c.NodeList.importMethod(c.Node.prototype, ["getAttribute", "setAttribute", "removeAttribute", "unwrap", "wrap", "generateID"]);
}, "3.4.1", {
  requires: ["dom-core", "selector"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-base", function(e) {
  var d = ["hasClass", "addClass", "removeClass", "replaceClass", "toggleClass"];
  e.Node.importMethod(e.DOM, d);
  e.NodeList.importMethod(e.Node.prototype, d);
  var c = e.Node,
    b = e.DOM;
  c.create = function(f, g) {
    if (g && g._node) {
      g = g._node;
    }
    return e.one(b.create(f, g));
  };
  e.mix(c.prototype, {
    create: c.create,
    insert: function(g, f) {
      this._insert(g, f);
      return this;
    },
    _insert: function(i, g) {
      var h = this._node,
        f = null;
      if (typeof g == "number") {
        g = this._node.childNodes[g];
      } else {
        if (g && g._node) {
          g = g._node;
        }
      }
      if (i && typeof i != "string") {
        i = i._node || i._nodes || i;
      }
      f = b.addHTML(h, i, g);
      return f;
    },
    prepend: function(f) {
      return this.insert(f, 0);
    },
    append: function(f) {
      return this.insert(f, null);
    },
    appendChild: function(f) {
      return c.scrubVal(this._insert(f));
    },
    insertBefore: function(g, f) {
      return e.Node.scrubVal(this._insert(g, f));
    },
    appendTo: function(f) {
      e.one(f).append(this);
      return this;
    },
    setContent: function(f) {
      this._insert(f, "replace");
      return this;
    },
    getContent: function(f) {
      return this.get("innerHTML");
    }
  });
  e.NodeList.importMethod(e.Node.prototype, ["append", "insert", "appendChild", "insertBefore", "prepend", "setContent", "getContent"]);
  var c = e.Node,
    b = e.DOM;
  c.ATTRS = {
    text: {
      getter: function() {
        return b.getText(this._node);
      },
      setter: function(f) {
        b.setText(this._node, f);
        return f;
      }
    },
    "for": {
      getter: function() {
        return b.getAttribute(this._node, "for");
      },
      setter: function(f) {
        b.setAttribute(this._node, "for", f);
        return f;
      }
    },
    "options": {
      getter: function() {
        return this._node.getElementsByTagName("option");
      }
    },
    "children": {
      getter: function() {
        var j = this._node,
          h = j.children,
          k, g, f;
        if (!h) {
          k = j.childNodes;
          h = [];
          for (g = 0, f = k.length; g < f; ++g) {
            if (k[g][TAG_NAME]) {
              h[h.length] = k[g];
            }
          }
        }
        return e.all(h);
      }
    },
    value: {
      getter: function() {
        return b.getValue(this._node);
      },
      setter: function(f) {
        b.setValue(this._node, f);
        return f;
      }
    }
  };
  e.Node.importMethod(e.DOM, ["setAttribute", "getAttribute"]);
  var c = e.Node;
  var a = e.NodeList;
  c.DOM_EVENTS = {
    abort: 1,
    beforeunload: 1,
    blur: 1,
    change: 1,
    click: 1,
    close: 1,
    command: 1,
    contextmenu: 1,
    dblclick: 1,
    DOMMouseScroll: 1,
    drag: 1,
    dragstart: 1,
    dragenter: 1,
    dragover: 1,
    dragleave: 1,
    dragend: 1,
    drop: 1,
    error: 1,
    focus: 1,
    key: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    load: 1,
    message: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mousemultiwheel: 1,
    mouseout: 1,
    mouseover: 1,
    mouseup: 1,
    mousewheel: 1,
    orientationchange: 1,
    reset: 1,
    resize: 1,
    select: 1,
    selectstart: 1,
    submit: 1,
    scroll: 1,
    textInput: 1,
    unload: 1
  };
  e.mix(c.DOM_EVENTS, e.Env.evt.plugins);
  e.augment(c, e.EventTarget);
  e.mix(c.prototype, {
    purge: function(g, f) {
      e.Event.purgeElement(this._node, g, f);
      return this;
    }
  });
  e.mix(e.NodeList.prototype, {
    _prepEvtArgs: function(i, h, g) {
      var f = e.Array(arguments, 0, true);
      if (f.length < 2) {
        f[2] = this._nodes;
      } else {
        f.splice(2, 0, this._nodes);
      }
      f[3] = g || this;
      return f;
    },
    on: function(h, g, f) {
      return e.on.apply(e, this._prepEvtArgs.apply(this, arguments));
    },
    once: function(h, g, f) {
      return e.once.apply(e, this._prepEvtArgs.apply(this, arguments));
    },
    after: function(h, g, f) {
      return e.after.apply(e, this._prepEvtArgs.apply(this, arguments));
    },
    onceAfter: function(h, g, f) {
      return e.onceAfter.apply(e, this._prepEvtArgs.apply(this, arguments));
    }
  });
  a.importMethod(e.Node.prototype, ["detach", "detachAll"]);
  e.mix(e.Node.ATTRS, {
    offsetHeight: {
      setter: function(f) {
        e.DOM.setHeight(this._node, f);
        return f;
      },
      getter: function() {
        return this._node.offsetHeight;
      }
    },
    offsetWidth: {
      setter: function(f) {
        e.DOM.setWidth(this._node, f);
        return f;
      },
      getter: function() {
        return this._node.offsetWidth;
      }
    }
  });
  e.mix(e.Node.prototype, {
    sizeTo: function(f, g) {
      var i;
      if (arguments.length < 2) {
        i = e.one(f);
        f = i.get("offsetWidth");
        g = i.get("offsetHeight");
      }
      this.setAttrs({
        offsetWidth: f,
        offsetHeight: g
      });
    }
  });
  var c = e.Node;
  e.mix(c.prototype, {
    show: function(f) {
      f = arguments[arguments.length - 1];
      this.toggleView(true, f);
      return this;
    },
    _show: function() {
      this.setStyle("display", "");
    },
    _isHidden: function() {
      return e.DOM.getStyle(this._node, "display") === "none";
    },
    toggleView: function(f, g) {
      this._toggleView.apply(this, arguments);
    },
    _toggleView: function(f, g) {
      g = arguments[arguments.length - 1];
      if (typeof f != "boolean") {
        f = (this._isHidden()) ? 1 : 0;
      }
      if (f) {
        this._show();
      } else {
        this._hide();
      }
      if (typeof g == "function") {
        g.call(this);
      }
      return this;
    },
    hide: function(f) {
      f = arguments[arguments.length - 1];
      this.toggleView(false, f);
      return this;
    },
    _hide: function() {
      this.setStyle("display", "none");
    }
  });
  e.NodeList.importMethod(e.Node.prototype, ["show", "hide", "toggleView"]);
  if (!e.config.doc.documentElement.hasAttribute) {
    e.Node.prototype.hasAttribute = function(f) {
      if (f === "value") {
        if (this.get("value") !== "") {
          return true;
        }
      }
      return !!(this._node.attributes[f] && this._node.attributes[f].specified);
    };
  }
  e.Node.prototype.focus = function() {
    try {
      this._node.focus();
    } catch (f) {}
    return this;
  };
  e.Node.ATTRS.type = {
    setter: function(g) {
      if (g === "hidden") {
        try {
          this._node.type = "hidden";
        } catch (f) {
          this.setStyle("display", "none");
          this._inputType = "hidden";
        }
      } else {
        try {
          this._node.type = g;
        } catch (f) {}
      }
      return g;
    },
    getter: function() {
      return this._inputType || this._node.type;
    },
    _bypassProxy: true
  };
  if (e.config.doc.createElement("form").elements.nodeType) {
    e.Node.ATTRS.elements = {
      getter: function() {
        return this.all("input, textarea, button, select");
      }
    };
  }
}, "3.4.1", {
  requires: ["dom-base", "node-core", "event-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
(function() {
  var a = YUI.Env;
  if (!a._ready) {
    a._ready = function() {
      a.DOMReady = true;
      a.remove(YUI.config.doc, "DOMContentLoaded", a._ready);
    };
    a.add(YUI.config.doc, "DOMContentLoaded", a._ready);
  }
})();
YUI.add("event-base", function(e) {
  e.publish("domready", {
    fireOnce: true,
    async: true
  });
  if (YUI.Env.DOMReady) {
    e.fire("domready");
  } else {
    e.Do.before(function() {
      e.fire("domready");
    }, YUI.Env, "_ready");
  }
  var b = e.UA,
    d = {},
    a = {
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63276: 33,
      63277: 34,
      25: 9,
      63272: 46,
      63273: 36,
      63275: 35
    },
    c = function(h) {
      if (!h) {
        return h;
      }
      try {
        if (h && 3 == h.nodeType) {
          h = h.parentNode;
        }
      } catch (g) {
        return null;
      }
      return e.one(h);
    },
    f = function(g, h, i) {
      this._event = g;
      this._currentTarget = h;
      this._wrapper = i || d;
      this.init();
    };
  e.extend(f, Object, {
    init: function() {
      var i = this._event,
        j = this._wrapper.overrides,
        g = i.pageX,
        l = i.pageY,
        k, h = this._currentTarget;
      this.altKey = i.altKey;
      this.ctrlKey = i.ctrlKey;
      this.metaKey = i.metaKey;
      this.shiftKey = i.shiftKey;
      this.type = (j && j.type) || i.type;
      this.clientX = i.clientX;
      this.clientY = i.clientY;
      this.pageX = g;
      this.pageY = l;
      k = i.keyCode || i.charCode;
      if (b.webkit && (k in a)) {
        k = a[k];
      }
      this.keyCode = k;
      this.charCode = k;
      this.which = i.which || i.charCode || k;
      this.button = this.which;
      this.target = c(i.target);
      this.currentTarget = c(h);
      this.relatedTarget = c(i.relatedTarget);
      if (i.type == "mousewheel" || i.type == "DOMMouseScroll") {
        this.wheelDelta = (i.detail) ? (i.detail * -1) : Math.round(i.wheelDelta / 80) || ((i.wheelDelta < 0) ? -1 : 1);
      }
      if (this._touch) {
        this._touch(i, h, this._wrapper);
      }
    },
    stopPropagation: function() {
      this._event.stopPropagation();
      this._wrapper.stopped = 1;
      this.stopped = 1;
    },
    stopImmediatePropagation: function() {
      var g = this._event;
      if (g.stopImmediatePropagation) {
        g.stopImmediatePropagation();
      } else {
        this.stopPropagation();
      }
      this._wrapper.stopped = 2;
      this.stopped = 2;
    },
    preventDefault: function(g) {
      var h = this._event;
      h.preventDefault();
      h.returnValue = g || false;
      this._wrapper.prevented = 1;
      this.prevented = 1;
    },
    halt: function(g) {
      if (g) {
        this.stopImmediatePropagation();
      } else {
        this.stopPropagation();
      }
      this.preventDefault();
    }
  });
  f.resolve = c;
  e.DOM2EventFacade = f;
  e.DOMEventFacade = f;
  (function() {
    e.Env.evt.dom_wrappers = {};
    e.Env.evt.dom_map = {};
    var q = e.Env.evt,
      i = e.config,
      n = i.win,
      s = YUI.Env.add,
      l = YUI.Env.remove,
      p = function() {
        YUI.Env.windowLoaded = true;
        e.Event._load();
        l(n, "load", p);
      },
      g = function() {
        e.Event._unload();
      },
      j = "domready",
      m = "~yui|2|compat~",
      o = function(u) {
        try {
          return (u && typeof u !== "string" && e.Lang.isNumber(u.length) && !u.tagName && !u.alert);
        } catch (t) {
          return false;
        }
      },
      h = e.CustomEvent.prototype._delete,
      k = function(u) {
        var t = h.apply(this, arguments);
        if (!this.subCount && !this.afterCount) {
          e.Event._clean(this);
        }
        return t;
      },
      r = function() {
        var v = false,
          w = 0,
          u = [],
          x = q.dom_wrappers,
          t = null,
          y = q.dom_map;
        return {
          POLL_RETRYS: 1000,
          POLL_INTERVAL: 40,
          lastError: null,
          _interval: null,
          _dri: null,
          DOMReady: false,
          startInterval: function() {
            if (!r._interval) {
              r._interval = setInterval(r._poll, r.POLL_INTERVAL);
            }
          },
          onAvailable: function(z, D, H, A, E, G) {
            var F = e.Array(z),
              B, C;
            for (B = 0; B < F.length; B = B + 1) {
              u.push({
                id: F[B],
                fn: D,
                obj: H,
                override: A,
                checkReady: E,
                compat: G
              });
            }
            w = this.POLL_RETRYS;
            setTimeout(r._poll, 0);
            C = new e.EventHandle({
              _delete: function() {
                if (C.handle) {
                  C.handle.detach();
                  return;
                }
                var J, I;
                for (J = 0; J < F.length; J++) {
                  for (I = 0; I < u.length; I++) {
                    if (F[J] === u[I].id) {
                      u.splice(I, 1);
                    }
                  }
                }
              }
            });
            return C;
          },
          onContentReady: function(D, B, C, A, z) {
            return r.onAvailable(D, B, C, A, true, z);
          },
          attach: function(C, B, A, z) {
            return r._attach(e.Array(arguments, 0, true));
          },
          _createWrapper: function(F, E, z, A, D) {
            var C, G = e.stamp(F),
              B = "event:" + G + E;
            if (false === D) {
              B += "native";
            }
            if (z) {
              B += "capture";
            }
            C = x[B];
            if (!C) {
              C = e.publish(B, {
                silent: true,
                bubbles: false,
                contextFn: function() {
                  if (A) {
                    return C.el;
                  } else {
                    C.nodeRef = C.nodeRef || e.one(C.el);
                    return C.nodeRef;
                  }
                }
              });
              C.overrides = {};
              C.el = F;
              C.key = B;
              C.domkey = G;
              C.type = E;
              C.fn = function(H) {
                C.fire(r.getEvent(H, F, (A || (false === D))));
              };
              C.capture = z;
              if (F == n && E == "load") {
                C.fireOnce = true;
                t = B;
              }
              C._delete = k;
              x[B] = C;
              y[G] = y[G] || {};
              y[G][B] = C;
              s(F, E, C.fn, z);
            }
            return C;
          },
          _attach: function(F, E) {
            var K, M, C, J, z, B = false,
              D, G = F[0],
              H = F[1],
              A = F[2] || n,
              N = E && E.facade,
              L = E && E.capture,
              I = E && E.overrides;
            if (F[F.length - 1] === m) {
              K = true;
            }
            if (!H || !H.call) {
              return false;
            }
            if (o(A)) {
              M = [];
              e.each(A, function(P, O) {
                F[2] = P;
                M.push(r._attach(F.slice(), E));
              });
              return new e.EventHandle(M);
            } else {
              if (e.Lang.isString(A)) {
                if (K) {
                  C = e.DOM.byId(A);
                } else {
                  C = e.Selector.query(A);
                  switch (C.length) {
                    case 0:
                      C = null;
                      break;
                    case 1:
                      C = C[0];
                      break;
                    default:
                      F[2] = C;
                      return r._attach(F, E);
                  }
                }
                if (C) {
                  A = C;
                } else {
                  D = r.onAvailable(A, function() {
                    D.handle = r._attach(F, E);
                  }, r, true, false, K);
                  return D;
                }
              }
            }
            if (!A) {
              return false;
            }
            if (e.Node && e.instanceOf(A, e.Node)) {
              A = e.Node.getDOMNode(A);
            }
            J = r._createWrapper(A, G, L, K, N);
            if (I) {
              e.mix(J.overrides, I);
            }
            if (A == n && G == "load") {
              if (YUI.Env.windowLoaded) {
                B = true;
              }
            }
            if (K) {
              F.pop();
            }
            z = F[3];
            D = J._on(H, z, (F.length > 4) ? F.slice(4) : null);
            if (B) {
              J.fire();
            }
            return D;
          },
          detach: function(G, H, B, E) {
            var F = e.Array(arguments, 0, true),
              J, C, I, D, z, A;
            if (F[F.length - 1] === m) {
              J = true;
            }
            if (G && G.detach) {
              return G.detach();
            }
            if (typeof B == "string") {
              if (J) {
                B = e.DOM.byId(B);
              } else {
                B = e.Selector.query(B);
                C = B.length;
                if (C < 1) {
                  B = null;
                } else {
                  if (C == 1) {
                    B = B[0];
                  }
                }
              }
            }
            if (!B) {
              return false;
            }
            if (B.detach) {
              F.splice(2, 1);
              return B.detach.apply(B, F);
            } else {
              if (o(B)) {
                I = true;
                for (D = 0, C = B.length; D < C; ++D) {
                  F[2] = B[D];
                  I = (e.Event.detach.apply(e.Event, F) && I);
                }
                return I;
              }
            }
            if (!G || !H || !H.call) {
              return r.purgeElement(B, false, G);
            }
            z = "event:" + e.stamp(B) + G;
            A = x[z];
            if (A) {
              return A.detach(H);
            } else {
              return false;
            }
          },
          getEvent: function(C, A, z) {
            var B = C || n.event;
            return (z) ? B : new e.DOMEventFacade(B, A, x["event:" + e.stamp(A) + C.type]);
          },
          generateId: function(z) {
            return e.DOM.generateID(z);
          },
          _isValidCollection: o,
          _load: function(z) {
            if (!v) {
              v = true;
              if (e.fire) {
                e.fire(j);
              }
              r._poll();
            }
          },
          _poll: function() {
            if (r.locked) {
              return;
            }
            if (e.UA.ie && !YUI.Env.DOMReady) {
              r.startInterval();
              return;
            }
            r.locked = true;
            var A, z, E, B, D, F, C = !v;
            if (!C) {
              C = (w > 0);
            }
            D = [];
            F = function(I, J) {
              var H, G = J.override;
              if (J.compat) {
                if (J.override) {
                  if (G === true) {
                    H = J.obj;
                  } else {
                    H = G;
                  }
                } else {
                  H = I;
                }
                J.fn.call(H, J.obj);
              } else {
                H = J.obj || e.one(I);
                J.fn.apply(H, (e.Lang.isArray(G)) ? G : []);
              }
            };
            for (A = 0, z = u.length; A < z; ++A) {
              E = u[A];
              if (E && !E.checkReady) {
                B = (E.compat) ? e.DOM.byId(E.id) : e.Selector.query(E.id, null, true);
                if (B) {
                  F(B, E);
                  u[A] = null;
                } else {
                  D.push(E);
                }
              }
            }
            for (A = 0, z = u.length; A < z; ++A) {
              E = u[A];
              if (E && E.checkReady) {
                B = (E.compat) ? e.DOM.byId(E.id) : e.Selector.query(E.id, null, true);
                if (B) {
                  if (v || (B.get && B.get("nextSibling")) || B.nextSibling) {
                    F(B, E);
                    u[A] = null;
                  }
                } else {
                  D.push(E);
                }
              }
            }
            w = (D.length === 0) ? 0 : w - 1;
            if (C) {
              r.startInterval();
            } else {
              clearInterval(r._interval);
              r._interval = null;
            }
            r.locked = false;
            return;
          },
          purgeElement: function(B, z, G) {
            var E = (e.Lang.isString(B)) ? e.Selector.query(B, null, true) : B,
              H = r.getListeners(E, G),
              D, F, C, A;
            if (z && E) {
              H = H || [];
              C = e.Selector.query("*", E);
              D = 0;
              F = C.length;
              for (; D < F; ++D) {
                A = r.getListeners(C[D], G);
                if (A) {
                  H = H.concat(A);
                }
              }
            }
            if (H) {
              for (D = 0, F = H.length; D < F; ++D) {
                H[D].detachAll();
              }
            }
          },
          _clean: function(B) {
            var A = B.key,
              z = B.domkey;
            l(B.el, B.type, B.fn, B.capture);
            delete x[A];
            delete e._yuievt.events[A];
            if (y[z]) {
              delete y[z][A];
              if (!e.Object.size(y[z])) {
                delete y[z];
              }
            }
          },
          getListeners: function(D, C) {
            var E = e.stamp(D, true),
              z = y[E],
              B = [],
              A = (C) ? "event:" + E + C : null,
              F = q.plugins;
            if (!z) {
              return null;
            }
            if (A) {
              if (F[C] && F[C].eventDef) {
                A += "_synth";
              }
              if (z[A]) {
                B.push(z[A]);
              }
              A += "native";
              if (z[A]) {
                B.push(z[A]);
              }
            } else {
              e.each(z, function(H, G) {
                B.push(H);
              });
            }
            return (B.length) ? B : null;
          },
          _unload: function(z) {
            e.each(x, function(B, A) {
              if (B.type == "unload") {
                B.fire(z);
              }
              B.detachAll();
            });
            l(n, "unload", g);
          },
          nativeAdd: s,
          nativeRemove: l
        };
      }();
    e.Event = r;
    if (i.injected || YUI.Env.windowLoaded) {
      p();
    } else {
      s(n, "load", p);
    }
    if (e.UA.ie) {
      e.on(j, r._poll);
    }
    s(n, "unload", g);
    r.Custom = e.CustomEvent;
    r.Subscriber = e.Subscriber;
    r.Target = e.EventTarget;
    r.Handle = e.EventHandle;
    r.Facade = e.EventFacade;
    r._poll();
  })();
  e.Env.evt.plugins.available = {
    on: function(i, h, k, j) {
      var g = arguments.length > 4 ? e.Array(arguments, 4, true) : null;
      return e.Event.onAvailable.call(e.Event, k, h, j, g);
    }
  };
  e.Env.evt.plugins.contentready = {
    on: function(i, h, k, j) {
      var g = arguments.length > 4 ? e.Array(arguments, 4, true) : null;
      return e.Event.onContentReady.call(e.Event, k, h, j, g);
    }
  };
}, "3.4.1", {
  requires: ["event-custom-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-style", function(a) {
  (function(c) {
    var b = ["getStyle", "getComputedStyle", "setStyle", "setStyles"];
    c.Node.importMethod(c.DOM, b);
    c.NodeList.importMethod(c.Node.prototype, b);
  })(a);
}, "3.4.1", {
  requires: ["dom-style", "node-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("transition", function(b) {
  var i = "",
    h = "",
    f = b.config.doc,
    r = "documentElement",
    s = "transition",
    k = "Transition",
    m, j, p, a, n, c, l, t, q = {},
    g = ["Webkit", "Moz"],
    e = {
      Webkit: "webkitTransitionEnd"
    },
    d = function() {
      this.init.apply(this, arguments);
    };
  d._toCamel = function(u) {
    u = u.replace(/-([a-z])/gi, function(w, v) {
      return v.toUpperCase();
    });
    return u;
  };
  d._toHyphen = function(u) {
    u = u.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(y, x, w, v) {
      var z = ((x) ? "-" + x.toLowerCase() : "") + w;
      if (v) {
        z += "-" + v.toLowerCase();
      }
      return z;
    });
    return u;
  };
  d.SHOW_TRANSITION = "fadeIn";
  d.HIDE_TRANSITION = "fadeOut";
  d.useNative = false;
  b.Array.each(g, function(v) {
    var u = v + k;
    if (u in f[r].style) {
      i = v;
      h = d._toHyphen(v) + "-";
      d.useNative = true;
      d.supported = true;
      d._VENDOR_PREFIX = v;
    }
  });
  k = i + k;
  m = i + "TransitionProperty";
  j = h + "transition-property";
  p = h + "transition-duration";
  a = h + "transition-timing-function";
  n = h + "transition-delay";
  c = "transitionend";
  l = "on" + i.toLowerCase() + "transitionend";
  c = e[i] || c;
  t = i + "Transform";
  d.fx = {};
  d.toggles = {};
  d._hasEnd = {};
  d._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;
  b.Node.DOM_EVENTS[c] = 1;
  d.NAME = "transition";
  d.DEFAULT_EASING = "ease";
  d.DEFAULT_DURATION = 0.5;
  d.DEFAULT_DELAY = 0;
  d._nodeAttrs = {};
  d.prototype = {
    constructor: d,
    init: function(v, u) {
      var w = this;
      w._node = v;
      if (!w._running && u) {
        w._config = u;
        v._transition = w;
        w._duration = ("duration" in u) ? u.duration : w.constructor.DEFAULT_DURATION;
        w._delay = ("delay" in u) ? u.delay : w.constructor.DEFAULT_DELAY;
        w._easing = u.easing || w.constructor.DEFAULT_EASING;
        w._count = 0;
        w._running = false;
      }
      return w;
    },
    addProperty: function(v, x) {
      var A = this,
        y = this._node,
        C = b.stamp(y),
        B = b.one(y),
        F = d._nodeAttrs[C],
        z, E, u, D, w;
      if (!F) {
        F = d._nodeAttrs[C] = {};
      }
      D = F[v];
      if (x && x.value !== undefined) {
        w = x.value;
      } else {
        if (x !== undefined) {
          w = x;
          x = q;
        }
      }
      if (typeof w === "function") {
        w = w.call(B, B);
      }
      if (D && D.transition) {
        if (D.transition !== A) {
          D.transition._count--;
        }
      }
      A._count++;
      u = ((typeof x.duration != "undefined") ? x.duration : A._duration) || 0.0001;
      F[v] = {
        value: w,
        duration: u,
        delay: (typeof x.delay != "undefined") ? x.delay : A._delay,
        easing: x.easing || A._easing,
        transition: A
      };
      z = b.DOM.getComputedStyle(y, v);
      E = (typeof w === "string") ? z : parseFloat(z);
      if (d.useNative && E === w) {
        setTimeout(function() {
          A._onNativeEnd.call(y, {
            propertyName: v,
            elapsedTime: u
          });
        }, u * 1000);
      }
    },
    removeProperty: function(w) {
      var v = this,
        u = d._nodeAttrs[b.stamp(v._node)];
      if (u && u[w]) {
        delete u[w];
        v._count--;
      }
    },
    initAttrs: function(v) {
      var u, w = this._node;
      if (v.transform && !v[t]) {
        v[t] = v.transform;
        delete v.transform;
      }
      for (u in v) {
        if (v.hasOwnProperty(u) && !d._reKeywords.test(u)) {
          this.addProperty(u, v[u]);
          if (w.style[u] === "") {
            b.DOM.setStyle(w, u, b.DOM.getComputedStyle(w, u));
          }
        }
      }
    },
    run: function(y) {
      var x = this,
        v = x._node,
        u = x._config,
        w = {
          type: "transition:start",
          config: u
        };
      if (!x._running) {
        x._running = true;
        if (u.on && u.on.start) {
          u.on.start.call(b.one(v), w);
        }
        x.initAttrs(x._config);
        x._callback = y;
        x._start();
      }
      return x;
    },
    _start: function() {
      this._runNative();
    },
    _prepDur: function(u) {
      u = parseFloat(u);
      return u + "s";
    },
    _runNative: function(w) {
      var C = this,
        x = C._node,
        E = b.stamp(x),
        v = x.style,
        A = getComputedStyle(x),
        I = d._nodeAttrs[E],
        y = "",
        J = A[d._toCamel(j)],
        H = j + ": ",
        B = p + ": ",
        G = a + ": ",
        D = n + ": ",
        z, F, u;
      if (J !== "all") {
        H += J + ",";
        B += A[d._toCamel(p)] + ",";
        G += A[d._toCamel(a)] + ",";
        D += A[d._toCamel(n)] + ",";
      }
      for (u in I) {
        z = d._toHyphen(u);
        F = I[u];
        if ((F = I[u]) && F.transition === C) {
          if (u in x.style) {
            B += C._prepDur(F.duration) + ",";
            D += C._prepDur(F.delay) + ",";
            G += (F.easing) + ",";
            H += z + ",";
            y += z + ": " + F.value + "; ";
          } else {
            this.removeProperty(u);
          }
        }
      }
      H = H.replace(/,$/, ";");
      B = B.replace(/,$/, ";");
      G = G.replace(/,$/, ";");
      D = D.replace(/,$/, ";");
      if (!d._hasEnd[E]) {
        x.addEventListener(c, C._onNativeEnd, "");
        d._hasEnd[E] = true;
      }
      v.cssText += H + B + G + D + y;
    },
    _end: function(u) {
      var y = this,
        w = y._node,
        A = y._callback,
        v = y._config,
        x = {
          type: "transition:end",
          config: v,
          elapsedTime: u
        },
        z = b.one(w);
      y._running = false;
      y._callback = null;
      if (w) {
        if (v.on && v.on.end) {
          setTimeout(function() {
            v.on.end.call(z, x);
            if (A) {
              A.call(z, x);
            }
          }, 1);
        } else {
          if (A) {
            setTimeout(function() {
              A.call(z, x);
            }, 1);
          }
        }
      }
    },
    _endNative: function(u) {
      var v = this._node,
        w = v.ownerDocument.defaultView.getComputedStyle(v, "")[d._toCamel(j)];
      if (typeof w === "string") {
        w = w.replace(new RegExp("(?:^|,\\s)" + u + ",?"), ",");
        w = w.replace(/^,|,$/, "");
        v.style[k] = w;
      }
    },
    _onNativeEnd: function(B) {
      var x = this,
        A = b.stamp(x),
        u = B,
        v = d._toCamel(u.propertyName),
        E = u.elapsedTime,
        D = d._nodeAttrs[A],
        C = D[v],
        y = (C) ? C.transition : null,
        z, w;
      if (y) {
        y.removeProperty(v);
        y._endNative(v);
        w = y._config[v];
        z = {
          type: "propertyEnd",
          propertyName: v,
          elapsedTime: E,
          config: w
        };
        if (w && w.on && w.on.end) {
          w.on.end.call(b.one(x), z);
        }
        if (y._count <= 0) {
          y._end(E);
        }
      }
    },
    destroy: function() {
      var v = this,
        u = v._node;
      if (u) {
        u.removeEventListener(c, v._onNativeEnd, false);
        v._node = null;
      }
    }
  };
  b.Transition = d;
  b.TransitionNative = d;
  b.Node.prototype.transition = function(w, v, A) {
    var u = d._nodeAttrs[b.stamp(this._node)],
      y = (u) ? u.transition || null : null,
      x, z;
    if (typeof w === "string") {
      if (typeof v === "function") {
        A = v;
        v = null;
      }
      x = d.fx[w];
      if (v && typeof v !== "boolean") {
        v = b.clone(v);
        for (z in x) {
          if (x.hasOwnProperty(z)) {
            if (!(z in v)) {
              v[z] = x[z];
            }
          }
        }
      } else {
        v = x;
      }
    } else {
      A = v;
      v = w;
    }
    if (y && !y._running) {
      y.init(this, v);
    } else {
      y = new d(this._node, v);
    }
    y.run(A);
    return this;
  };
  b.Node.prototype.show = function(v, u, w) {
    this._show();
    if (v && b.Transition) {
      if (typeof v !== "string" && !v.push) {
        if (typeof u === "function") {
          w = u;
          u = v;
        }
        v = d.SHOW_TRANSITION;
      }
      this.transition(v, u, w);
    }
    return this;
  };
  var o = function(v, u, w) {
    return function() {
      if (u) {
        u.call(v);
      }
      if (w) {
        w.apply(v._node, arguments);
      }
    };
  };
  b.Node.prototype.hide = function(v, u, w) {
    if (v && b.Transition) {
      if (typeof u === "function") {
        w = u;
        u = null;
      }
      w = o(this, this._hide, w);
      if (typeof v !== "string" && !v.push) {
        if (typeof u === "function") {
          w = u;
          u = v;
        }
        v = d.HIDE_TRANSITION;
      }
      this.transition(v, u, w);
    } else {
      this._hide();
    }
    return this;
  };
  b.NodeList.prototype.transition = function(v, y) {
    var u = this._nodes,
      w = 0,
      x;
    while ((x = u[w++])) {
      b.one(x).transition(v, y);
    }
    return this;
  };
  b.Node.prototype.toggleView = function(v, u, w) {
    this._toggles = this._toggles || [];
    w = arguments[arguments.length - 1];
    if (typeof v == "boolean") {
      u = v;
      v = null;
    }
    v = v || b.Transition.DEFAULT_TOGGLE;
    if (typeof u == "undefined" && v in this._toggles) {
      u = !this._toggles[v];
    }
    u = (u) ? 1 : 0;
    if (u) {
      this._show();
    } else {
      w = o(this, this._hide, w);
    }
    this._toggles[v] = u;
    this.transition(b.Transition.toggles[v][u], w);
    return this;
  };
  b.NodeList.prototype.toggleView = function(w, u, z) {
    var v = this._nodes,
      x = 0,
      y;
    while ((y = v[x++])) {
      b.one(y).toggleView(w, u, z);
    }
    return this;
  };
  b.mix(d.fx, {
    fadeOut: {
      opacity: 0,
      duration: 0.5,
      easing: "ease-out"
    },
    fadeIn: {
      opacity: 1,
      duration: 0.5,
      easing: "ease-in"
    },
    sizeOut: {
      height: 0,
      width: 0,
      duration: 0.75,
      easing: "ease-out"
    },
    sizeIn: {
      height: function(u) {
        return u.get("scrollHeight") + "px";
      },
      width: function(u) {
        return u.get("scrollWidth") + "px";
      },
      duration: 0.5,
      easing: "ease-in",
      on: {
        start: function() {
          var u = this.getStyle("overflow");
          if (u !== "hidden") {
            this.setStyle("overflow", "hidden");
            this._transitionOverflow = u;
          }
        },
        end: function() {
          if (this._transitionOverflow) {
            this.setStyle("overflow", this._transitionOverflow);
            delete this._transitionOverflow;
          }
        }
      }
    }
  });
  b.mix(d.toggles, {
    size: ["sizeOut", "sizeIn"],
    fade: ["fadeOut", "fadeIn"]
  });
  d.DEFAULT_TOGGLE = "fade";
}, "3.4.1", {
  requires: ["node-style"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("array-extras", function(d) {
  var b = d.Lang,
    c = Array.prototype,
    a = d.Array;
  a.lastIndexOf = c.lastIndexOf ? function(e, g, f) {
    return f || f === 0 ? e.lastIndexOf(g, f) : e.lastIndexOf(g);
  } : function(f, j, h) {
    var e = f.length,
      g = e - 1;
    if (h || h === 0) {
      g = Math.min(h < 0 ? e + h : h, e);
    }
    if (g > -1 && e > 0) {
      for (; g > -1; --g) {
        if (g in f && f[g] === j) {
          return g;
        }
      }
    }
    return -1;
  };
  a.unique = function(f, l) {
    var k = 0,
      e = f.length,
      h = [],
      m, g;
    for (; k < e; ++k) {
      m = f[k];
      for (g = h.length; g > -1; --g) {
        if (m === h[g]) {
          break;
        }
      }
      if (g === -1) {
        h.push(m);
      }
    }
    if (l) {
      if (b.isNumber(h[0])) {
        h.sort(a.numericSort);
      } else {
        h.sort();
      }
    }
    return h;
  };
  a.filter = c.filter ? function(e, g, h) {
    return e.filter(g, h);
  } : function(g, l, m) {
    var j = 0,
      e = g.length,
      h = [],
      k;
    for (; j < e; ++j) {
      if (j in g) {
        k = g[j];
        if (l.call(m, k, j, g)) {
          h.push(k);
        }
      }
    }
    return h;
  };
  a.reject = function(e, g, h) {
    return a.filter(e, function(k, j, f) {
      return !g.call(h, k, j, f);
    });
  };
  a.every = c.every ? function(e, g, h) {
    return e.every(g, h);
  } : function(g, j, k) {
    for (var h = 0, e = g.length; h < e; ++h) {
      if (h in g && !j.call(k, g[h], h, g)) {
        return false;
      }
    }
    return true;
  };
  a.map = c.map ? function(e, g, h) {
    return e.map(g, h);
  } : function(g, k, l) {
    var j = 0,
      e = g.length,
      h = g.concat();
    for (; j < e; ++j) {
      if (j in g) {
        h[j] = k.call(l, g[j], j, g);
      }
    }
    return h;
  };
  a.reduce = c.reduce ? function(e, i, g, h) {
    return e.reduce(function(l, k, j, f) {
      return g.call(h, l, k, j, f);
    }, i);
  } : function(h, m, k, l) {
    var j = 0,
      g = h.length,
      e = m;
    for (; j < g; ++j) {
      if (j in h) {
        e = k.call(l, e, h[j], j, h);
      }
    }
    return e;
  };
  a.find = function(g, j, k) {
    for (var h = 0, e = g.length; h < e; h++) {
      if (h in g && j.call(k, g[h], h, g)) {
        return g[h];
      }
    }
    return null;
  };
  a.grep = function(e, f) {
    return a.filter(e, function(h, g) {
      return f.test(h);
    });
  };
  a.partition = function(e, h, i) {
    var g = {
      matches: [],
      rejects: []
    };
    a.each(e, function(j, f) {
      var k = h.call(i, j, f, e) ? g.matches : g.rejects;
      k.push(j);
    });
    return g;
  };
  a.zip = function(f, e) {
    var g = [];
    a.each(f, function(i, h) {
      g.push([i, e[h]]);
    });
    return g;
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-custom-complex", function(f) {
  var b, e, d = {},
    a = f.CustomEvent.prototype,
    c = f.EventTarget.prototype;
  f.EventFacade = function(h, g) {
    h = h || d;
    this._event = h;
    this.details = h.details;
    this.type = h.type;
    this._type = h.type;
    this.target = h.target;
    this.currentTarget = g;
    this.relatedTarget = h.relatedTarget;
  };
  f.extend(f.EventFacade, Object, {
    stopPropagation: function() {
      this._event.stopPropagation();
      this.stopped = 1;
    },
    stopImmediatePropagation: function() {
      this._event.stopImmediatePropagation();
      this.stopped = 2;
    },
    preventDefault: function() {
      this._event.preventDefault();
      this.prevented = 1;
    },
    halt: function(g) {
      this._event.halt(g);
      this.prevented = 1;
      this.stopped = (g) ? 2 : 1;
    }
  });
  a.fireComplex = function(p) {
    var r, l, g, n, i, o, u, j, h, t = this,
      s = t.host || t,
      m, k;
    if (t.stack) {
      if (t.queuable && t.type != t.stack.next.type) {
        t.log("queue " + t.type);
        t.stack.queue.push([t, p]);
        return true;
      }
    }
    r = t.stack || {
      id: t.id,
      next: t,
      silent: t.silent,
      stopped: 0,
      prevented: 0,
      bubbling: null,
      type: t.type,
      afterQueue: new f.Queue(),
      defaultTargetOnly: t.defaultTargetOnly,
      queue: []
    };
    j = t.getSubs();
    t.stopped = (t.type !== r.type) ? 0 : r.stopped;
    t.prevented = (t.type !== r.type) ? 0 : r.prevented;
    t.target = t.target || s;
    u = new f.EventTarget({
      fireOnce: true,
      context: s
    });
    t.events = u;
    if (t.stoppedFn) {
      u.on("stopped", t.stoppedFn);
    }
    t.currentTarget = s;
    t.details = p.slice();
    t.log("Firing " + t.type);
    t._facade = null;
    l = t._getFacade(p);
    if (f.Lang.isObject(p[0])) {
      p[0] = l;
    } else {
      p.unshift(l);
    }
    if (j[0]) {
      t._procSubs(j[0], p, l);
    }
    if (t.bubbles && s.bubble && !t.stopped) {
      k = r.bubbling;
      r.bubbling = t.type;
      if (r.type != t.type) {
        r.stopped = 0;
        r.prevented = 0;
      }
      o = s.bubble(t, p, null, r);
      t.stopped = Math.max(t.stopped, r.stopped);
      t.prevented = Math.max(t.prevented, r.prevented);
      r.bubbling = k;
    }
    if (t.prevented) {
      if (t.preventedFn) {
        t.preventedFn.apply(s, p);
      }
    } else {
      if (t.defaultFn && ((!t.defaultTargetOnly && !r.defaultTargetOnly) || s === l.target)) {
        t.defaultFn.apply(s, p);
      }
    }
    t._broadcast(p);
    if (j[1] && !t.prevented && t.stopped < 2) {
      if (r.id === t.id || t.type != s._yuievt.bubbling) {
        t._procSubs(j[1], p, l);
        while ((m = r.afterQueue.last())) {
          m();
        }
      } else {
        h = j[1];
        if (r.execDefaultCnt) {
          h = f.merge(h);
          f.each(h, function(q) {
            q.postponed = true;
          });
        }
        r.afterQueue.add(function() {
          t._procSubs(h, p, l);
        });
      }
    }
    t.target = null;
    if (r.id === t.id) {
      n = r.queue;
      while (n.length) {
        g = n.pop();
        i = g[0];
        r.next = i;
        i.fire.apply(i, g[1]);
      }
      t.stack = null;
    }
    o = !(t.stopped);
    if (t.type != s._yuievt.bubbling) {
      r.stopped = 0;
      r.prevented = 0;
      t.stopped = 0;
      t.prevented = 0;
    }
    return o;
  };
  a._getFacade = function() {
    var g = this._facade,
      j, i, h = this.details;
    if (!g) {
      g = new f.EventFacade(this, this.currentTarget);
    }
    j = h && h[0];
    if (f.Lang.isObject(j, true)) {
      i = {};
      f.mix(i, g, true, e);
      f.mix(g, j, true);
      f.mix(g, i, true, e);
      g.type = j.type || g.type;
    }
    g.details = this.details;
    g.target = this.originalTarget || this.target;
    g.currentTarget = this.currentTarget;
    g.stopped = 0;
    g.prevented = 0;
    this._facade = g;
    return this._facade;
  };
  a.stopPropagation = function() {
    this.stopped = 1;
    if (this.stack) {
      this.stack.stopped = 1;
    }
    this.events.fire("stopped", this);
  };
  a.stopImmediatePropagation = function() {
    this.stopped = 2;
    if (this.stack) {
      this.stack.stopped = 2;
    }
    this.events.fire("stopped", this);
  };
  a.preventDefault = function() {
    if (this.preventable) {
      this.prevented = 1;
      if (this.stack) {
        this.stack.prevented = 1;
      }
    }
  };
  a.halt = function(g) {
    if (g) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  };
  c.addTarget = function(g) {
    this._yuievt.targets[f.stamp(g)] = g;
    this._yuievt.hasTargets = true;
  };
  c.getTargets = function() {
    return f.Object.values(this._yuievt.targets);
  };
  c.removeTarget = function(g) {
    delete this._yuievt.targets[f.stamp(g)];
  };
  c.bubble = function(u, q, o, s) {
    var m = this._yuievt.targets,
      p = true,
      v, r = u && u.type,
      h, l, n, j, g = o || (u && u.target) || this,
      k;
    if (!u || ((!u.stopped) && m)) {
      for (l in m) {
        if (m.hasOwnProperty(l)) {
          v = m[l];
          h = v.getEvent(r, true);
          j = v.getSibling(r, h);
          if (j && !h) {
            h = v.publish(r);
          }
          k = v._yuievt.bubbling;
          v._yuievt.bubbling = r;
          if (!h) {
            if (v._yuievt.hasTargets) {
              v.bubble(u, q, g, s);
            }
          } else {
            h.sibling = j;
            h.target = g;
            h.originalTarget = g;
            h.currentTarget = v;
            n = h.broadcast;
            h.broadcast = false;
            h.emitFacade = true;
            h.stack = s;
            p = p && h.fire.apply(h, q || u.details || []);
            h.broadcast = n;
            h.originalTarget = null;
            if (h.stopped) {
              break;
            }
          }
          v._yuievt.bubbling = k;
        }
      }
    }
    return p;
  };
  b = new f.EventFacade();
  e = f.Object.keys(b);
}, "3.4.1", {
  requires: ["event-custom-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("async-queue", function(g) {
  g.AsyncQueue = function() {
    this._init();
    this.add.apply(this, arguments);
  };
  var e = g.AsyncQueue,
    c = "execute",
    b = "shift",
    d = "promote",
    h = "remove",
    a = g.Lang.isObject,
    f = g.Lang.isFunction;
  e.defaults = g.mix({
    autoContinue: true,
    iterations: 1,
    timeout: 10,
    until: function() {
      this.iterations |= 0;
      return this.iterations <= 0;
    }
  }, g.config.queueDefaults || {});
  g.extend(e, g.EventTarget, {
    _running: false,
    _init: function() {
      g.EventTarget.call(this, {
        prefix: "queue",
        emitFacade: true
      });
      this._q = [];
      this.defaults = {};
      this._initEvents();
    },
    _initEvents: function() {
      this.publish({
        "execute": {
          defaultFn: this._defExecFn,
          emitFacade: true
        },
        "shift": {
          defaultFn: this._defShiftFn,
          emitFacade: true
        },
        "add": {
          defaultFn: this._defAddFn,
          emitFacade: true
        },
        "promote": {
          defaultFn: this._defPromoteFn,
          emitFacade: true
        },
        "remove": {
          defaultFn: this._defRemoveFn,
          emitFacade: true
        }
      });
    },
    next: function() {
      var i;
      while (this._q.length) {
        i = this._q[0] = this._prepare(this._q[0]);
        if (i && i.until()) {
          this.fire(b, {
            callback: i
          });
          i = null;
        } else {
          break;
        }
      }
      return i || null;
    },
    _defShiftFn: function(i) {
      if (this.indexOf(i.callback) === 0) {
        this._q.shift();
      }
    },
    _prepare: function(k) {
      if (f(k) && k._prepared) {
        return k;
      }
      var i = g.merge(e.defaults, {
          context: this,
          args: [],
          _prepared: true
        }, this.defaults, (f(k) ? {
          fn: k
        } : k)),
        j = g.bind(function() {
          if (!j._running) {
            j.iterations--;
          }
          if (f(j.fn)) {
            j.fn.apply(j.context || g, g.Array(j.args));
          }
        }, this);
      return g.mix(j, i);
    },
    run: function() {
      var j, i = true;
      for (j = this.next(); i && j && !this.isRunning(); j = this.next()) {
        i = (j.timeout < 0) ? this._execute(j) : this._schedule(j);
      }
      if (!j) {
        this.fire("complete");
      }
      return this;
    },
    _execute: function(j) {
      this._running = j._running = true;
      j.iterations--;
      this.fire(c, {
        callback: j
      });
      var i = this._running && j.autoContinue;
      this._running = j._running = false;
      return i;
    },
    _schedule: function(i) {
      this._running = g.later(i.timeout, this, function() {
        if (this._execute(i)) {
          this.run();
        }
      });
      return false;
    },
    isRunning: function() {
      return !!this._running;
    },
    _defExecFn: function(i) {
      i.callback();
    },
    add: function() {
      this.fire("add", {
        callbacks: g.Array(arguments, 0, true)
      });
      return this;
    },
    _defAddFn: function(j) {
      var k = this._q,
        i = [];
      g.Array.each(j.callbacks, function(l) {
        if (a(l)) {
          k.push(l);
          i.push(l);
        }
      });
      j.added = i;
    },
    pause: function() {
      if (a(this._running)) {
        this._running.cancel();
      }
      this._running = false;
      return this;
    },
    stop: function() {
      this._q = [];
      return this.pause();
    },
    indexOf: function(m) {
      var k = 0,
        j = this._q.length,
        l;
      for (; k < j; ++k) {
        l = this._q[k];
        if (l === m || l.id === m) {
          return k;
        }
      }
      return -1;
    },
    getCallback: function(k) {
      var j = this.indexOf(k);
      return (j > -1) ? this._q[j] : null;
    },
    promote: function(k) {
      var j = {
          callback: k
        },
        i;
      if (this.isRunning()) {
        i = this.after(b, function() {
          this.fire(d, j);
          i.detach();
        }, this);
      } else {
        this.fire(d, j);
      }
      return this;
    },
    _defPromoteFn: function(l) {
      var j = this.indexOf(l.callback),
        k = (j > -1) ? this._q.splice(j, 1)[0] : null;
      l.promoted = k;
      if (k) {
        this._q.unshift(k);
      }
    },
    remove: function(k) {
      var j = {
          callback: k
        },
        i;
      if (this.isRunning()) {
        i = this.after(b, function() {
          this.fire(h, j);
          i.detach();
        }, this);
      } else {
        this.fire(h, j);
      }
      return this;
    },
    _defRemoveFn: function(k) {
      var j = this.indexOf(k.callback);
      k.removed = (j > -1) ? this._q.splice(j, 1)[0] : null;
    },
    size: function() {
      if (!this.isRunning()) {
        this.next();
      }
      return this._q.length;
    }
  });
}, "3.4.1", {
  requires: ["event-custom"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("cookie", function(c) {
  var k = c.Lang,
    i = c.Object,
    g = null,
    d = k.isString,
    n = k.isObject,
    f = k.isUndefined,
    e = k.isFunction,
    h = encodeURIComponent,
    b = decodeURIComponent,
    m = c.config.doc;

  function j(o) {
    throw new TypeError(o);
  }

  function l(o) {
    if (!d(o) || o === "") {
      j("Cookie name must be a non-empty string.");
    }
  }

  function a(o) {
    if (!d(o) || o === "") {
      j("Subcookie name must be a non-empty string.");
    }
  }
  c.Cookie = {
    _createCookieString: function(q, t, r, p) {
      p = p || {};
      var v = h(q) + "=" + (r ? h(t) : t),
        o = p.expires,
        u = p.path,
        s = p.domain;
      if (n(p)) {
        if (o instanceof Date) {
          v += "; expires=" + o.toUTCString();
        }
        if (d(u) && u !== "") {
          v += "; path=" + u;
        }
        if (d(s) && s !== "") {
          v += "; domain=" + s;
        }
        if (p.secure === true) {
          v += "; secure";
        }
      }
      return v;
    },
    _createCookieHashString: function(o) {
      if (!n(o)) {
        j("Cookie._createCookieHashString(): Argument must be an object.");
      }
      var p = [];
      i.each(o, function(r, q) {
        if (!e(r) && !f(r)) {
          p.push(h(q) + "=" + h(String(r)));
        }
      });
      return p.join("&");
    },
    _parseCookieHash: function(s) {
      var r = s.split("&"),
        t = g,
        q = {};
      if (s.length) {
        for (var p = 0, o = r.length; p < o; p++) {
          t = r[p].split("=");
          q[b(t[0])] = b(t[1]);
        }
      }
      return q;
    },
    _parseCookieString: function(w, y) {
      var x = {};
      if (d(w) && w.length > 0) {
        var o = (y === false ? function(z) {
            return z;
          } : b),
          u = w.split(/;\s/g),
          v = g,
          p = g,
          r = g;
        for (var q = 0, s = u.length; q < s; q++) {
          r = u[q].match(/([^=]+)=/i);
          if (r instanceof Array) {
            try {
              v = b(r[1]);
              p = o(u[q].substring(r[1].length + 1));
            } catch (t) {}
          } else {
            v = b(u[q]);
            p = "";
          }
          x[v] = p;
        }
      }
      return x;
    },
    _setDoc: function(o) {
      m = o;
    },
    exists: function(o) {
      l(o);
      var p = this._parseCookieString(m.cookie, true);
      return p.hasOwnProperty(o);
    },
    get: function(p, o) {
      l(p);
      var s, q, r;
      if (e(o)) {
        r = o;
        o = {};
      } else {
        if (n(o)) {
          r = o.converter;
        } else {
          o = {};
        }
      }
      s = this._parseCookieString(m.cookie, !o.raw);
      q = s[p];
      if (f(q)) {
        return g;
      }
      if (!e(r)) {
        return q;
      } else {
        return r(q);
      }
    },
    getSub: function(o, q, p) {
      var r = this.getSubs(o);
      if (r !== g) {
        a(q);
        if (f(r[q])) {
          return g;
        }
        if (!e(p)) {
          return r[q];
        } else {
          return p(r[q]);
        }
      } else {
        return g;
      }
    },
    getSubs: function(o) {
      l(o);
      var p = this._parseCookieString(m.cookie, false);
      if (d(p[o])) {
        return this._parseCookieHash(p[o]);
      }
      return g;
    },
    remove: function(p, o) {
      l(p);
      o = c.merge(o || {}, {
        expires: new Date(0)
      });
      return this.set(p, "", o);
    },
    removeSub: function(p, s, o) {
      l(p);
      a(s);
      o = o || {};
      var r = this.getSubs(p);
      if (n(r) && r.hasOwnProperty(s)) {
        delete r[s];
        if (!o.removeIfEmpty) {
          return this.setSubs(p, r, o);
        } else {
          for (var q in r) {
            if (r.hasOwnProperty(q) && !e(r[q]) && !f(r[q])) {
              return this.setSubs(p, r, o);
            }
          }
          return this.remove(p, o);
        }
      } else {
        return "";
      }
    },
    set: function(p, q, o) {
      l(p);
      if (f(q)) {
        j("Cookie.set(): Value cannot be undefined.");
      }
      o = o || {};
      var r = this._createCookieString(p, q, !o.raw, o);
      m.cookie = r;
      return r;
    },
    setSub: function(p, r, q, o) {
      l(p);
      a(r);
      if (f(q)) {
        j("Cookie.setSub(): Subcookie value cannot be undefined.");
      }
      var s = this.getSubs(p);
      if (!n(s)) {
        s = {};
      }
      s[r] = q;
      return this.setSubs(p, s, o);
    },
    setSubs: function(p, q, o) {
      l(p);
      if (!n(q)) {
        j("Cookie.setSubs(): Cookie value must be an object.");
      }
      var r = this._createCookieString(p, this._createCookieHashString(q), false, o);
      m.cookie = r;
      return r;
    }
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("pluginhost-base", function(c) {
  var a = c.Lang;

  function b() {
    this._plugins = {};
  }
  b.prototype = {
    plug: function(g, d) {
      var e, h, f;
      if (a.isArray(g)) {
        for (e = 0, h = g.length; e < h; e++) {
          this.plug(g[e]);
        }
      } else {
        if (g && !a.isFunction(g)) {
          d = g.cfg;
          g = g.fn;
        }
        if (g && g.NS) {
          f = g.NS;
          d = d || {};
          d.host = this;
          if (this.hasPlugin(f)) {
            this[f].setAttrs(d);
          } else {
            this[f] = new g(d);
            this._plugins[f] = g;
          }
        }
      }
      return this;
    },
    unplug: function(f) {
      var e = f,
        d = this._plugins;
      if (f) {
        if (a.isFunction(f)) {
          e = f.NS;
          if (e && (!d[e] || d[e] !== f)) {
            e = null;
          }
        }
        if (e) {
          if (this[e]) {
            this[e].destroy();
            delete this[e];
          }
          if (d[e]) {
            delete d[e];
          }
        }
      } else {
        for (e in this._plugins) {
          if (this._plugins.hasOwnProperty(e)) {
            this.unplug(e);
          }
        }
      }
      return this;
    },
    hasPlugin: function(d) {
      return (this._plugins[d] && this[d]);
    },
    _initPlugins: function(d) {
      this._plugins = this._plugins || {};
      if (this._initConfigPlugins) {
        this._initConfigPlugins(d);
      }
    },
    _destroyPlugins: function() {
      this.unplug();
    }
  };
  c.namespace("Plugin").Host = b;
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("pluginhost-config", function(c) {
  var b = c.Plugin.Host,
    a = c.Lang;
  b.prototype._initConfigPlugins = function(e) {
    var g = (this._getClasses) ? this._getClasses() : [this.constructor],
      d = [],
      h = {},
      f, j, l, m, k;
    for (j = g.length - 1; j >= 0; j--) {
      f = g[j];
      m = f._UNPLUG;
      if (m) {
        c.mix(h, m, true);
      }
      l = f._PLUG;
      if (l) {
        c.mix(d, l, true);
      }
    }
    for (k in d) {
      if (d.hasOwnProperty(k)) {
        if (!h[k]) {
          this.plug(d[k]);
        }
      }
    }
    if (e && e.plugins) {
      this.plug(e.plugins);
    }
  };
  b.plug = function(e, j, g) {
    var k, h, d, f;
    if (e !== c.Base) {
      e._PLUG = e._PLUG || {};
      if (!a.isArray(j)) {
        if (g) {
          j = {
            fn: j,
            cfg: g
          };
        }
        j = [j];
      }
      for (h = 0, d = j.length; h < d; h++) {
        k = j[h];
        f = k.NAME || k.fn.NAME;
        e._PLUG[f] = k;
      }
    }
  };
  b.unplug = function(e, h) {
    var j, g, d, f;
    if (e !== c.Base) {
      e._UNPLUG = e._UNPLUG || {};
      if (!a.isArray(h)) {
        h = [h];
      }
      for (g = 0, d = h.length; g < d; g++) {
        j = h[g];
        f = j.NAME;
        if (!e._PLUG[f]) {
          e._UNPLUG[f] = j;
        } else {
          delete e._PLUG[f];
        }
      }
    }
  };
}, "3.4.1", {
  requires: ["pluginhost-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-delegate", function(a) {
  var c = a.Array,
    h = a.Lang,
    b = h.isString,
    i = h.isObject,
    e = h.isArray,
    g = a.Selector.test,
    d = a.Env.evt.handles;

  function f(u, w, l, k) {
    var s = c(arguments, 0, true),
      t = b(l) ? l : null,
      r, o, j, n, v, m, q, x, p;
    if (i(u)) {
      x = [];
      if (e(u)) {
        for (m = 0, q = u.length; m < q; ++m) {
          s[0] = u[m];
          x.push(a.delegate.apply(a, s));
        }
      } else {
        s.unshift(null);
        for (m in u) {
          if (u.hasOwnProperty(m)) {
            s[0] = m;
            s[1] = u[m];
            x.push(a.delegate.apply(a, s));
          }
        }
      }
      return new a.EventHandle(x);
    }
    r = u.split(/\|/);
    if (r.length > 1) {
      v = r.shift();
      s[0] = u = r.shift();
    }
    o = a.Node.DOM_EVENTS[u];
    if (i(o) && o.delegate) {
      p = o.delegate.apply(o, arguments);
    }
    if (!p) {
      if (!u || !w || !l || !k) {
        return;
      }
      j = (t) ? a.Selector.query(t, null, true) : l;
      if (!j && b(l)) {
        p = a.on("available", function() {
          a.mix(p, a.delegate.apply(a, s), true);
        }, l);
      }
      if (!p && j) {
        s.splice(2, 2, j);
        p = a.Event._attach(s, {
          facade: false
        });
        p.sub.filter = k;
        p.sub._notify = f.notifySub;
      }
    }
    if (p && v) {
      n = d[v] || (d[v] = {});
      n = n[u] || (n[u] = []);
      n.push(p);
    }
    return p;
  }
  f.notifySub = function(q, l, p) {
    l = l.slice();
    if (this.args) {
      l.push.apply(l, this.args);
    }
    var o = f._applyFilter(this.filter, l, p),
      n, m, j, k;
    if (o) {
      o = c(o);
      n = l[0] = new a.DOMEventFacade(l[0], p.el, p);
      n.container = a.one(p.el);
      for (m = 0, j = o.length; m < j && !n.stopped; ++m) {
        n.currentTarget = a.one(o[m]);
        k = this.fn.apply(this.context || n.currentTarget, l);
        if (k === false) {
          break;
        }
      }
      return k;
    }
  };
  f.compileFilter = a.cached(function(j) {
    return function(l, k) {
      return g(l._node, j, k.currentTarget._node);
    };
  });
  f._applyFilter = function(n, l, q) {
    var p = l[0],
      j = q.el,
      o = p.target || p.srcElement,
      k = [],
      m = false;
    if (o.nodeType === 3) {
      o = o.parentNode;
    }
    l.unshift(o);
    if (b(n)) {
      while (o) {
        m = (o === j);
        if (g(o, n, (m ? null : j))) {
          k.push(o);
        }
        if (m) {
          break;
        }
        o = o.parentNode;
      }
    } else {
      l[0] = a.one(o);
      l[1] = new a.DOMEventFacade(p, j, q);
      while (o) {
        if (n.apply(l[0], l)) {
          k.push(o);
        }
        if (o === j) {
          break;
        }
        o = o.parentNode;
        l[0] = a.one(o);
      }
      l[1] = p;
    }
    if (k.length <= 1) {
      k = k[0];
    }
    l.shift();
    return k;
  };
  a.delegate = a.Event.delegate = f;
}, "3.4.1", {
  requires: ["node-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-event-delegate", function(a) {
  a.Node.prototype.delegate = function(d) {
    var c = a.Array(arguments, 0, true),
      b = (a.Lang.isObject(d) && !a.Lang.isArray(d)) ? 1 : 2;
    c.splice(b, 0, this._node);
    return a.delegate.apply(a, c);
  };
}, "3.4.1", {
  requires: ["node-base", "event-delegate"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-pluginhost", function(a) {
  a.Node.plug = function() {
    var b = a.Array(arguments);
    b.unshift(a.Node);
    a.Plugin.Host.plug.apply(a.Base, b);
    return a.Node;
  };
  a.Node.unplug = function() {
    var b = a.Array(arguments);
    b.unshift(a.Node);
    a.Plugin.Host.unplug.apply(a.Base, b);
    return a.Node;
  };
  a.mix(a.Node, a.Plugin.Host, false, null, 1);
  a.NodeList.prototype.plug = function() {
    var b = arguments;
    a.NodeList.each(this, function(c) {
      a.Node.prototype.plug.apply(a.one(c), b);
    });
  };
  a.NodeList.prototype.unplug = function() {
    var b = arguments;
    a.NodeList.each(this, function(c) {
      a.Node.prototype.unplug.apply(a.one(c), b);
    });
  };
}, "3.4.1", {
  requires: ["node-base", "pluginhost"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-screen", function(a) {
  (function(f) {
    var d = "documentElement",
      q = "compatMode",
      o = "position",
      c = "fixed",
      m = "relative",
      g = "left",
      h = "top",
      i = "BackCompat",
      p = "medium",
      e = "borderLeftWidth",
      b = "borderTopWidth",
      r = "getBoundingClientRect",
      k = "getComputedStyle",
      l = f.DOM,
      n = /^t(?:able|d|h)$/i,
      j;
    if (f.UA.ie) {
      if (f.config.doc[q] !== "BackCompat") {
        j = d;
      } else {
        j = "body";
      }
    }
    f.mix(l, {
      winHeight: function(t) {
        var s = l._getWinSize(t).height;
        return s;
      },
      winWidth: function(t) {
        var s = l._getWinSize(t).width;
        return s;
      },
      docHeight: function(t) {
        var s = l._getDocSize(t).height;
        return Math.max(s, l._getWinSize(t).height);
      },
      docWidth: function(t) {
        var s = l._getDocSize(t).width;
        return Math.max(s, l._getWinSize(t).width);
      },
      docScrollX: function(u, v) {
        v = v || (u) ? l._getDoc(u) : f.config.doc;
        var t = v.defaultView,
          s = (t) ? t.pageXOffset : 0;
        return Math.max(v[d].scrollLeft, v.body.scrollLeft, s);
      },
      docScrollY: function(u, v) {
        v = v || (u) ? l._getDoc(u) : f.config.doc;
        var t = v.defaultView,
          s = (t) ? t.pageYOffset : 0;
        return Math.max(v[d].scrollTop, v.body.scrollTop, s);
      },
      getXY: function() {
        if (f.config.doc[d][r]) {
          return function(x) {
            var E = null,
              y, u, z, C, B, t, w, A, D, s, v;
            if (x && x.tagName) {
              D = x.ownerDocument;
              v = D[d];
              if (v.contains) {
                s = v.contains(x);
              } else {
                s = f.DOM.contains(v, x);
              }
              if (s) {
                y = (j) ? D[j].scrollLeft : l.docScrollX(x, D);
                u = (j) ? D[j].scrollTop : l.docScrollY(x, D);
                z = x[r]();
                E = [z.left, z.top];
                if (f.UA.ie) {
                  C = 2;
                  B = 2;
                  A = D[q];
                  t = l[k](D[d], e);
                  w = l[k](D[d], b);
                  if (f.UA.ie === 6) {
                    if (A !== i) {
                      C = 0;
                      B = 0;
                    }
                  }
                  if ((A == i)) {
                    if (t !== p) {
                      C = parseInt(t, 10);
                    }
                    if (w !== p) {
                      B = parseInt(w, 10);
                    }
                  }
                  E[0] -= C;
                  E[1] -= B;
                }
                if ((u || y)) {
                  if (!f.UA.ios || (f.UA.ios >= 4.2)) {
                    E[0] += y;
                    E[1] += u;
                  }
                }
              } else {
                E = l._getOffset(x);
              }
            }
            return E;
          };
        } else {
          return function(t) {
            var w = null,
              v, s, y, u, x;
            if (t) {
              if (l.inDoc(t)) {
                w = [t.offsetLeft, t.offsetTop];
                v = t.ownerDocument;
                s = t;
                y = ((f.UA.gecko || f.UA.webkit > 519) ? true : false);
                while ((s = s.offsetParent)) {
                  w[0] += s.offsetLeft;
                  w[1] += s.offsetTop;
                  if (y) {
                    w = l._calcBorders(s, w);
                  }
                }
                if (l.getStyle(t, o) != c) {
                  s = t;
                  while ((s = s.parentNode)) {
                    u = s.scrollTop;
                    x = s.scrollLeft;
                    if (f.UA.gecko && (l.getStyle(s, "overflow") !== "visible")) {
                      w = l._calcBorders(s, w);
                    }
                    if (u || x) {
                      w[0] -= x;
                      w[1] -= u;
                    }
                  }
                  w[0] += l.docScrollX(t, v);
                  w[1] += l.docScrollY(t, v);
                } else {
                  w[0] += l.docScrollX(t, v);
                  w[1] += l.docScrollY(t, v);
                }
              } else {
                w = l._getOffset(t);
              }
            }
            return w;
          };
        }
      }(),
      getX: function(s) {
        return l.getXY(s)[0];
      },
      getY: function(s) {
        return l.getXY(s)[1];
      },
      setXY: function(t, w, z) {
        var u = l.setStyle,
          y, x, s, v;
        if (t && w) {
          y = l.getStyle(t, o);
          x = l._getOffset(t);
          if (y == "static") {
            y = m;
            u(t, o, y);
          }
          v = l.getXY(t);
          if (w[0] !== null) {
            u(t, g, w[0] - v[0] + x[0] + "px");
          }
          if (w[1] !== null) {
            u(t, h, w[1] - v[1] + x[1] + "px");
          }
          if (!z) {
            s = l.getXY(t);
            if (s[0] !== w[0] || s[1] !== w[1]) {
              l.setXY(t, w, true);
            }
          }
        } else {}
      },
      setX: function(t, s) {
        return l.setXY(t, [s, null]);
      },
      setY: function(s, t) {
        return l.setXY(s, [null, t]);
      },
      swapXY: function(t, s) {
        var u = l.getXY(t);
        l.setXY(t, l.getXY(s));
        l.setXY(s, u);
      },
      _calcBorders: function(v, w) {
        var u = parseInt(l[k](v, b), 10) || 0,
          s = parseInt(l[k](v, e), 10) || 0;
        if (f.UA.gecko) {
          if (n.test(v.tagName)) {
            u = 0;
            s = 0;
          }
        }
        w[0] += s;
        w[1] += u;
        return w;
      },
      _getWinSize: function(v, y) {
        y = y || (v) ? l._getDoc(v) : f.config.doc;
        var x = y.defaultView || y.parentWindow,
          z = y[q],
          u = x.innerHeight,
          t = x.innerWidth,
          s = y[d];
        if (z && !f.UA.opera) {
          if (z != "CSS1Compat") {
            s = y.body;
          }
          u = s.clientHeight;
          t = s.clientWidth;
        }
        return {
          height: u,
          width: t
        };
      },
      _getDocSize: function(t) {
        var u = (t) ? l._getDoc(t) : f.config.doc,
          s = u[d];
        if (u[q] != "CSS1Compat") {
          s = u.body;
        }
        return {
          height: s.scrollHeight,
          width: s.scrollWidth
        };
      }
    });
  })(a);
  (function(g) {
    var d = "top",
      c = "right",
      h = "bottom",
      b = "left",
      f = function(m, k) {
        var o = Math.max(m[d], k[d]),
          p = Math.min(m[c], k[c]),
          i = Math.min(m[h], k[h]),
          j = Math.max(m[b], k[b]),
          n = {};
        n[d] = o;
        n[c] = p;
        n[h] = i;
        n[b] = j;
        return n;
      },
      e = g.DOM;
    g.mix(e, {
      region: function(j) {
        var k = e.getXY(j),
          i = false;
        if (j && k) {
          i = e._getRegion(k[1], k[0] + j.offsetWidth, k[1] + j.offsetHeight, k[0]);
        }
        return i;
      },
      intersect: function(k, i, m) {
        var j = m || e.region(k),
          l = {},
          p = i,
          o;
        if (p.tagName) {
          l = e.region(p);
        } else {
          if (g.Lang.isObject(i)) {
            l = i;
          } else {
            return false;
          }
        }
        o = f(l, j);
        return {
          top: o[d],
          right: o[c],
          bottom: o[h],
          left: o[b],
          area: ((o[h] - o[d]) * (o[c] - o[b])),
          yoff: ((o[h] - o[d])),
          xoff: (o[c] - o[b]),
          inRegion: e.inRegion(k, i, false, m)
        };
      },
      inRegion: function(l, i, j, o) {
        var m = {},
          k = o || e.region(l),
          q = i,
          p;
        if (q.tagName) {
          m = e.region(q);
        } else {
          if (g.Lang.isObject(i)) {
            m = i;
          } else {
            return false;
          }
        }
        if (j) {
          return (k[b] >= m[b] && k[c] <= m[c] && k[d] >= m[d] && k[h] <= m[h]);
        } else {
          p = f(m, k);
          if (p[h] >= p[d] && p[c] >= p[b]) {
            return true;
          } else {
            return false;
          }
        }
      },
      inViewportRegion: function(j, i, k) {
        return e.inRegion(j, e.viewportRegion(j), i, k);
      },
      _getRegion: function(k, m, i, j) {
        var n = {};
        n[d] = n[1] = k;
        n[b] = n[0] = j;
        n[h] = i;
        n[c] = m;
        n.width = n[c] - n[b];
        n.height = n[h] - n[d];
        return n;
      },
      viewportRegion: function(j) {
        j = j || g.config.doc.documentElement;
        var i = false,
          l, k;
        if (j) {
          l = e.docScrollX(j);
          k = e.docScrollY(j);
          i = e._getRegion(k, e.winWidth(j) + l, k + e.winHeight(j), l);
        }
        return i;
      }
    });
  })(a);
}, "3.4.1", {
  requires: ["dom-base", "dom-style"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-screen", function(a) {
  a.each(["winWidth", "winHeight", "docWidth", "docHeight", "docScrollX", "docScrollY"], function(b) {
    a.Node.ATTRS[b] = {
      getter: function() {
        var c = Array.prototype.slice.call(arguments);
        c.unshift(a.Node.getDOMNode(this));
        return a.DOM[b].apply(this, c);
      }
    };
  });
  a.Node.ATTRS.scrollLeft = {
    getter: function() {
      var b = a.Node.getDOMNode(this);
      return ("scrollLeft" in b) ? b.scrollLeft : a.DOM.docScrollX(b);
    },
    setter: function(c) {
      var b = a.Node.getDOMNode(this);
      if (b) {
        if ("scrollLeft" in b) {
          b.scrollLeft = c;
        } else {
          if (b.document || b.nodeType === 9) {
            a.DOM._getWin(b).scrollTo(c, a.DOM.docScrollY(b));
          }
        }
      } else {}
    }
  };
  a.Node.ATTRS.scrollTop = {
    getter: function() {
      var b = a.Node.getDOMNode(this);
      return ("scrollTop" in b) ? b.scrollTop : a.DOM.docScrollY(b);
    },
    setter: function(c) {
      var b = a.Node.getDOMNode(this);
      if (b) {
        if ("scrollTop" in b) {
          b.scrollTop = c;
        } else {
          if (b.document || b.nodeType === 9) {
            a.DOM._getWin(b).scrollTo(a.DOM.docScrollX(b), c);
          }
        }
      } else {}
    }
  };
  a.Node.importMethod(a.DOM, ["getXY", "setXY", "getX", "setX", "getY", "setY", "swapXY"]);
  a.Node.ATTRS.region = {
    getter: function() {
      var b = this.getDOMNode(),
        c;
      if (b && !b.tagName) {
        if (b.nodeType === 9) {
          b = b.documentElement;
        }
      }
      if (a.DOM.isWindow(b)) {
        c = a.DOM.viewportRegion(b);
      } else {
        c = a.DOM.region(b);
      }
      return c;
    }
  };
  a.Node.ATTRS.viewportRegion = {
    getter: function() {
      return a.DOM.viewportRegion(a.Node.getDOMNode(this));
    }
  };
  a.Node.importMethod(a.DOM, "inViewportRegion");
  a.Node.prototype.intersect = function(b, d) {
    var c = a.Node.getDOMNode(this);
    if (a.instanceOf(b, a.Node)) {
      b = a.Node.getDOMNode(b);
    }
    return a.DOM.intersect(c, b, d);
  };
  a.Node.prototype.inRegion = function(b, d, e) {
    var c = a.Node.getDOMNode(this);
    if (a.instanceOf(b, a.Node)) {
      b = a.Node.getDOMNode(b);
    }
    return a.DOM.inRegion(c, b, d, e);
  };
}, "3.4.1", {
  requires: ["node-base", "dom-screen"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("attribute-base", function(c) {
  c.State = function() {
    this.data = {};
  };
  c.State.prototype = {
    add: function(B, C, E) {
      var D = this.data;
      D[C] = D[C] || {};
      D[C][B] = E;
    },
    addAll: function(B, D) {
      var C;
      for (C in D) {
        if (D.hasOwnProperty(C)) {
          this.add(B, C, D[C]);
        }
      }
    },
    remove: function(B, C) {
      var D = this.data;
      if (D[C] && (B in D[C])) {
        delete D[C][B];
      }
    },
    removeAll: function(B, D) {
      var C = this.data;
      c.each(D || C, function(F, E) {
        if (c.Lang.isString(E)) {
          this.remove(B, E);
        } else {
          this.remove(B, F);
        }
      }, this);
    },
    get: function(B, C) {
      var D = this.data;
      return (D[C] && B in D[C]) ? D[C][B] : undefined;
    },
    getAll: function(B) {
      var D = this.data,
        C;
      c.each(D, function(F, E) {
        if (B in D[E]) {
          C = C || {};
          C[E] = F[B];
        }
      }, this);
      return C;
    }
  };
  var k = c.Object,
    f = c.Lang,
    l = c.EventTarget,
    w = ".",
    t = "Change",
    n = "getter",
    m = "setter",
    o = "readOnly",
    x = "writeOnce",
    u = "initOnly",
    A = "validator",
    h = "value",
    p = "valueFn",
    e = "broadcast",
    r = "lazyAdd",
    j = "_bypassProxy",
    z = "added",
    b = "initializing",
    i = "initValue",
    v = "published",
    s = "defaultValue",
    a = "lazy",
    q = "isLazyAdd",
    g, y = {};
  y[o] = 1;
  y[x] = 1;
  y[n] = 1;
  y[e] = 1;

  function d(C, B, D) {
    var E = this;
    E._ATTR_E_FACADE = {};
    l.call(E, {
      emitFacade: true
    });
    E._conf = E._state = new c.State();
    E._stateProxy = E._stateProxy || null;
    E._requireAddAttr = E._requireAddAttr || false;
    this._initAttrs(C, B, D);
  }
  d.INVALID_VALUE = {};
  g = d.INVALID_VALUE;
  d._ATTR_CFG = [m, n, A, h, p, x, o, r, e, j];
  d.prototype = {
    addAttr: function(C, B, E) {
      var F = this,
        H = F._state,
        G, D;
      E = (r in B) ? B[r] : E;
      if (E && !F.attrAdded(C)) {
        H.add(C, a, B || {});
        H.add(C, z, true);
      } else {
        if (!F.attrAdded(C) || H.get(C, q)) {
          B = B || {};
          D = (h in B);
          if (D) {
            G = B.value;
            delete B.value;
          }
          B.added = true;
          B.initializing = true;
          H.addAll(C, B);
          if (D) {
            F.set(C, G);
          }
          H.remove(C, b);
        }
      }
      return F;
    },
    attrAdded: function(B) {
      return !!this._state.get(B, z);
    },
    modifyAttr: function(C, B) {
      var D = this,
        F, E;
      if (D.attrAdded(C)) {
        if (D._isLazyAttr(C)) {
          D._addLazyAttr(C);
        }
        E = D._state;
        for (F in B) {
          if (y[F] && B.hasOwnProperty(F)) {
            E.add(C, F, B[F]);
            if (F === e) {
              E.remove(C, v);
            }
          }
        }
      }
    },
    removeAttr: function(B) {
      this._state.removeAll(B);
    },
    get: function(B) {
      return this._getAttr(B);
    },
    _isLazyAttr: function(B) {
      return this._state.get(B, a);
    },
    _addLazyAttr: function(C) {
      var D = this._state,
        B = D.get(C, a);
      D.add(C, q, true);
      D.remove(C, a);
      this.addAttr(C, B);
    },
    set: function(B, D, C) {
      return this._setAttr(B, D, C);
    },
    reset: function(B) {
      var D = this,
        C;
      if (B) {
        if (D._isLazyAttr(B)) {
          D._addLazyAttr(B);
        }
        D.set(B, D._state.get(B, i));
      } else {
        C = D._state.data.added;
        c.each(C, function(E, F) {
          D.reset(F);
        }, D);
      }
      return D;
    },
    _set: function(B, D, C) {
      return this._setAttr(B, D, C, true);
    },
    _getAttr: function(D) {
      var E = this,
        I = D,
        F = E._state,
        G, B, H, C;
      if (D.indexOf(w) !== -1) {
        G = D.split(w);
        D = G.shift();
      }
      if (E._tCfgs && E._tCfgs[D]) {
        C = {};
        C[D] = E._tCfgs[D];
        delete E._tCfgs[D];
        E._addAttrs(C, E._tVals);
      }
      if (E._isLazyAttr(D)) {
        E._addLazyAttr(D);
      }
      H = E._getStateVal(D);
      B = F.get(D, n);
      if (B && !B.call) {
        B = this[B];
      }
      H = (B) ? B.call(E, H, I) : H;
      H = (G) ? k.getValue(H, G) : H;
      return H;
    },
    _setAttr: function(D, G, B, E) {
      var K = true,
        C = this._state,
        H = this._stateProxy,
        M = C.data,
        J, N, O, F, I, L;
      if (D.indexOf(w) !== -1) {
        N = D;
        O = D.split(w);
        D = O.shift();
      }
      if (this._isLazyAttr(D)) {
        this._addLazyAttr(D);
      }
      J = (!M.value || !(D in M.value));
      if (H && D in H && !this._state.get(D, j)) {
        J = false;
      }
      if (this._requireAddAttr && !this.attrAdded(D)) {} else {
        I = C.get(D, x);
        L = C.get(D, b);
        if (!J && !E) {
          if (I) {
            K = false;
          }
          if (C.get(D, o)) {
            K = false;
          }
        }
        if (!L && !E && I === u) {
          K = false;
        }
        if (K) {
          if (!J) {
            F = this.get(D);
          }
          if (O) {
            G = k.setValue(c.clone(F), O, G);
            if (G === undefined) {
              K = false;
            }
          }
          if (K) {
            if (L) {
              this._setAttrVal(D, N, F, G);
            } else {
              this._fireAttrChange(D, N, F, G, B);
            }
          }
        }
      }
      return this;
    },
    _fireAttrChange: function(H, G, E, D, B) {
      var J = this,
        F = H + t,
        C = J._state,
        I;
      if (!C.get(H, v)) {
        J.publish(F, {
          queuable: false,
          defaultTargetOnly: true,
          defaultFn: J._defAttrChangeFn,
          silent: true,
          broadcast: C.get(H, e)
        });
        C.add(H, v, true);
      }
      I = (B) ? c.merge(B) : J._ATTR_E_FACADE;
      I.attrName = H;
      I.subAttrName = G;
      I.prevVal = E;
      I.newVal = D;
      J.fire(F, I);
    },
    _defAttrChangeFn: function(B) {
      if (!this._setAttrVal(B.attrName, B.subAttrName, B.prevVal, B.newVal)) {
        B.stopImmediatePropagation();
      } else {
        B.newVal = this.get(B.attrName);
      }
    },
    _getStateVal: function(B) {
      var C = this._stateProxy;
      return C && (B in C) && !this._state.get(B, j) ? C[B] : this._state.get(B, h);
    },
    _setStateVal: function(B, D) {
      var C = this._stateProxy;
      if (C && (B in C) && !this._state.get(B, j)) {
        C[B] = D;
      } else {
        this._state.add(B, h, D);
      }
    },
    _setAttrVal: function(M, L, I, G) {
      var O = this,
        J = true,
        D = O._state,
        E = D.get(M, A),
        H = D.get(M, m),
        K = D.get(M, b),
        N = this._getStateVal(M),
        C = L || M,
        F, B;
      if (E) {
        if (!E.call) {
          E = this[E];
        }
        if (E) {
          B = E.call(O, G, C);
          if (!B && K) {
            G = D.get(M, s);
            B = true;
          }
        }
      }
      if (!E || B) {
        if (H) {
          if (!H.call) {
            H = this[H];
          }
          if (H) {
            F = H.call(O, G, C);
            if (F === g) {
              J = false;
            } else {
              if (F !== undefined) {
                G = F;
              }
            }
          }
        }
        if (J) {
          if (!L && (G === N) && !f.isObject(G)) {
            J = false;
          } else {
            if (D.get(M, i) === undefined) {
              D.add(M, i, G);
            }
            O._setStateVal(M, G);
          }
        }
      } else {
        J = false;
      }
      return J;
    },
    setAttrs: function(B, C) {
      return this._setAttrs(B, C);
    },
    _setAttrs: function(C, D) {
      for (var B in C) {
        if (C.hasOwnProperty(B)) {
          this.set(B, C[B]);
        }
      }
      return this;
    },
    getAttrs: function(B) {
      return this._getAttrs(B);
    },
    _getAttrs: function(E) {
      var G = this,
        I = {},
        F, C, B, H, D = (E === true);
      E = (E && !D) ? E : k.keys(G._state.data.added);
      for (F = 0, C = E.length; F < C; F++) {
        B = E[F];
        H = G.get(B);
        if (!D || G._getStateVal(B) != G._state.get(B, i)) {
          I[B] = G.get(B);
        }
      }
      return I;
    },
    addAttrs: function(B, C, D) {
      var E = this;
      if (B) {
        E._tCfgs = B;
        E._tVals = E._normAttrVals(C);
        E._addAttrs(B, E._tVals, D);
        E._tCfgs = E._tVals = null;
      }
      return E;
    },
    _addAttrs: function(C, D, E) {
      var G = this,
        B, F, H;
      for (B in C) {
        if (C.hasOwnProperty(B)) {
          F = C[B];
          F.defaultValue = F.value;
          H = G._getAttrInitVal(B, F, G._tVals);
          if (H !== undefined) {
            F.value = H;
          }
          if (G._tCfgs[B]) {
            delete G._tCfgs[B];
          }
          G.addAttr(B, F, E);
        }
      }
    },
    _protectAttrs: function(C) {
      if (C) {
        C = c.merge(C);
        for (var B in C) {
          if (C.hasOwnProperty(B)) {
            C[B] = c.merge(C[B]);
          }
        }
      }
      return C;
    },
    _normAttrVals: function(B) {
      return (B) ? c.merge(B) : null;
    },
    _getAttrInitVal: function(B, C, E) {
      var F, D;
      if (!C[o] && E && E.hasOwnProperty(B)) {
        F = E[B];
      } else {
        F = C[h];
        D = C[p];
        if (D) {
          if (!D.call) {
            D = this[D];
          }
          if (D) {
            F = D.call(this);
          }
        }
      }
      return F;
    },
    _getAttrCfg: function(B) {
      var D, C = this._state.data;
      if (C) {
        D = {};
        c.each(C, function(E, F) {
          if (B) {
            if (B in E) {
              D[F] = E[B];
            }
          } else {
            c.each(E, function(H, G) {
              D[G] = D[G] || {};
              D[G][F] = H;
            });
          }
        });
      }
      return D;
    },
    _initAttrs: function(C, B, E) {
      C = C || this.constructor.ATTRS;
      var D = c.Base;
      if (C && !(D && c.instanceOf(this, D))) {
        this.addAttrs(this._protectAttrs(C), B, E);
      }
    }
  };
  c.mix(d, l, false, null, 1);
  c.Attribute = d;
}, "3.4.1", {
  requires: ["event-custom"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("attribute-complex", function(b) {
  var a = b.Object,
    c = ".";
  b.Attribute.Complex = function() {};
  b.Attribute.Complex.prototype = {
    _normAttrVals: function(g) {
      var i = {},
        h = {},
        j, d, f, e;
      if (g) {
        for (e in g) {
          if (g.hasOwnProperty(e)) {
            if (e.indexOf(c) !== -1) {
              j = e.split(c);
              d = j.shift();
              f = h[d] = h[d] || [];
              f[f.length] = {
                path: j,
                value: g[e]
              };
            } else {
              i[e] = g[e];
            }
          }
        }
        return {
          simple: i,
          complex: h
        };
      } else {
        return null;
      }
    },
    _getAttrInitVal: function(m, j, p) {
      var e = j.value,
        o = j.valueFn,
        d, f, h, g, q, n, k;
      if (o) {
        if (!o.call) {
          o = this[o];
        }
        if (o) {
          e = o.call(this);
        }
      }
      if (!j.readOnly && p) {
        d = p.simple;
        if (d && d.hasOwnProperty(m)) {
          e = d[m];
        }
        f = p.complex;
        if (f && f.hasOwnProperty(m)) {
          k = f[m];
          for (h = 0, g = k.length; h < g; ++h) {
            q = k[h].path;
            n = k[h].value;
            a.setValue(e, q, n);
          }
        }
      }
      return e;
    }
  };
  b.mix(b.Attribute, b.Attribute.Complex, true, null, 1);
}, "3.4.1", {
  requires: ["attribute-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-base", function(d) {
  var g = d.Object,
    h = d.Lang,
    o = ".",
    q = "destroy",
    b = "init",
    r = "initialized",
    m = "destroyed",
    n = "initializer",
    j = "bubbleTargets",
    e = "_bubbleTargets",
    a = Object.prototype.constructor,
    c = "deep",
    p = "shallow",
    k = "destructor",
    f = d.Attribute,
    l = function(v, u, t) {
      var w;
      for (w in u) {
        if (t[w]) {
          v[w] = u[w];
        }
      }
      return v;
    };

  function i() {
    d.stamp(this);
    f.call(this);
    var s = d.Plugin && d.Plugin.Host;
    if (this._initPlugins && s) {
      s.call(this);
    }
    if (this._lazyAddAttrs !== false) {
      this._lazyAddAttrs = true;
    }
    this.name = this.constructor.NAME;
    this._eventPrefix = this.constructor.EVENT_PREFIX || this.constructor.NAME;
    this.init.apply(this, arguments);
  }
  i._ATTR_CFG = f._ATTR_CFG.concat("cloneDefaultValue");
  i._ATTR_CFG_HASH = d.Array.hash(i._ATTR_CFG);
  i.NAME = "base";
  i.ATTRS = {
    initialized: {
      readOnly: true,
      value: false
    },
    destroyed: {
      readOnly: true,
      value: false
    }
  };
  i.prototype = {
    init: function(s) {
      this._yuievt.config.prefix = this._eventPrefix;
      this.publish(b, {
        queuable: false,
        fireOnce: true,
        defaultTargetOnly: true,
        defaultFn: this._defInitFn
      });
      this._preInitEventCfg(s);
      this.fire(b, {
        cfg: s
      });
      return this;
    },
    _preInitEventCfg: function(t) {
      if (t) {
        if (t.on) {
          this.on(t.on);
        }
        if (t.after) {
          this.after(t.after);
        }
      }
      var u, s, w, v = (t && j in t);
      if (v || e in this) {
        w = v ? (t && t.bubbleTargets) : this._bubbleTargets;
        if (h.isArray(w)) {
          for (u = 0, s = w.length; u < s; u++) {
            this.addTarget(w[u]);
          }
        } else {
          if (w) {
            this.addTarget(w);
          }
        }
      }
    },
    destroy: function() {
      this.publish(q, {
        queuable: false,
        fireOnce: true,
        defaultTargetOnly: true,
        defaultFn: this._defDestroyFn
      });
      this.fire(q);
      this.detachAll();
      return this;
    },
    _defInitFn: function(s) {
      this._initHierarchy(s.cfg);
      if (this._initPlugins) {
        this._initPlugins(s.cfg);
      }
      this._set(r, true);
    },
    _defDestroyFn: function(s) {
      if (this._destroyPlugins) {
        this._destroyPlugins();
      }
      this._destroyHierarchy();
      this._set(m, true);
    },
    _getClasses: function() {
      if (!this._classes) {
        this._initHierarchyData();
      }
      return this._classes;
    },
    _getAttrCfgs: function() {
      if (!this._attrs) {
        this._initHierarchyData();
      }
      return this._attrs;
    },
    _filterAttrCfgs: function(w, t) {
      var u = null,
        s, v = w.ATTRS;
      if (v) {
        for (s in v) {
          if (t[s]) {
            u = u || {};
            u[s] = t[s];
            t[s] = null;
          }
        }
      }
      return u;
    },
    _initHierarchyData: function() {
      var u = this.constructor,
        t = [],
        s = [];
      while (u) {
        t[t.length] = u;
        if (u.ATTRS) {
          s[s.length] = u.ATTRS;
        }
        u = u.superclass ? u.superclass.constructor : null;
      }
      this._classes = t;
      this._attrs = this._aggregateAttrs(s);
    },
    _aggregateAttrs: function(z) {
      var v, A, u, s, B, t, y, x = i._ATTR_CFG_HASH,
        w = {};
      if (z) {
        for (t = z.length - 1; t >= 0; --t) {
          A = z[t];
          for (v in A) {
            if (A.hasOwnProperty(v)) {
              u = l({}, A[v], x);
              s = u.value;
              y = u.cloneDefaultValue;
              if (s) {
                if ((y === undefined && (a === s.constructor || h.isArray(s))) || y === c || y === true) {
                  u.value = d.clone(s);
                } else {
                  if (y === p) {
                    u.value = d.merge(s);
                  }
                }
              }
              B = null;
              if (v.indexOf(o) !== -1) {
                B = v.split(o);
                v = B.shift();
              }
              if (B && w[v] && w[v].value) {
                g.setValue(w[v].value, B, s);
              } else {
                if (!B) {
                  if (!w[v]) {
                    w[v] = u;
                  } else {
                    l(w[v], u, x);
                  }
                }
              }
            }
          }
        }
      }
      return w;
    },
    _initHierarchy: function(y) {
      var u = this._lazyAddAttrs,
        z, A, C, w, t, B, x, v = this._getClasses(),
        s = this._getAttrCfgs();
      for (C = v.length - 1; C >= 0; C--) {
        z = v[C];
        A = z.prototype;
        x = z._yuibuild && z._yuibuild.exts;
        if (x) {
          for (w = 0, t = x.length; w < t; w++) {
            x[w].apply(this, arguments);
          }
        }
        this.addAttrs(this._filterAttrCfgs(z, s), y, u);
        if (A.hasOwnProperty(n)) {
          A.initializer.apply(this, arguments);
        }
        if (x) {
          for (w = 0; w < t; w++) {
            B = x[w].prototype;
            if (B.hasOwnProperty(n)) {
              B.initializer.apply(this, arguments);
            }
          }
        }
      }
    },
    _destroyHierarchy: function() {
      var w, x, A, y, u, s, v, z, t = this._getClasses();
      for (A = 0, y = t.length; A < y; A++) {
        w = t[A];
        x = w.prototype;
        v = w._yuibuild && w._yuibuild.exts;
        if (v) {
          for (u = 0, s = v.length; u < s; u++) {
            z = v[u].prototype;
            if (z.hasOwnProperty(k)) {
              z.destructor.apply(this, arguments);
            }
          }
        }
        if (x.hasOwnProperty(k)) {
          x.destructor.apply(this, arguments);
        }
      }
    },
    toString: function() {
      return this.name + "[" + d.stamp(this, true) + "]";
    }
  };
  d.mix(i, f, false, null, 1);
  i.prototype.constructor = i;
  d.Base = i;
}, "3.4.1", {
  requires: ["attribute-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-pluginhost", function(c) {
  var a = c.Base,
    b = c.Plugin.Host;
  c.mix(a, b, false, null, 1);
  a.plug = b.plug;
  a.unplug = b.unplug;
}, "3.4.1", {
  requires: ["base-base", "pluginhost"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-build", function(f) {
  var c = f.Base,
    a = f.Lang,
    b = "initializer",
    d = "destructor",
    e;
  c._build = function(B, p, z, s, t, o) {
    var u = c._build,
      x = u._ctor(p, o),
      q = u._cfg(p, o),
      h = u._mixCust,
      m = q.aggregates,
      g = q.custom,
      k = x._yuibuild.dynamic,
      w, v, A, j, n, y, r;
    if (k && m) {
      for (w = 0, v = m.length; w < v; ++w) {
        A = m[w];
        if (p.hasOwnProperty(A)) {
          x[A] = a.isArray(p[A]) ? [] : {};
        }
      }
    }
    for (w = 0, v = z.length; w < v; w++) {
      j = z[w];
      n = j.prototype;
      y = n[b];
      r = n[d];
      delete n[b];
      delete n[d];
      f.mix(x, j, true, null, 1);
      h(x, j, m, g);
      if (y) {
        n[b] = y;
      }
      if (r) {
        n[d] = r;
      }
      x._yuibuild.exts.push(j);
    }
    if (s) {
      f.mix(x.prototype, s, true);
    }
    if (t) {
      f.mix(x, u._clean(t, m, g), true);
      h(x, t, m, g);
    }
    x.prototype.hasImpl = u._impl;
    if (k) {
      x.NAME = B;
      x.prototype.constructor = x;
    }
    return x;
  };
  e = c._build;
  f.mix(e, {
    _mixCust: function(i, h, l, k) {
      if (l) {
        f.aggregate(i, h, true, l);
      }
      if (k) {
        for (var g in k) {
          if (k.hasOwnProperty(g)) {
            k[g](g, i, h);
          }
        }
      }
    },
    _tmpl: function(g) {
      function h() {
        h.superclass.constructor.apply(this, arguments);
      }
      f.extend(h, g);
      return h;
    },
    _impl: function(m) {
      var p = this._getClasses(),
        o, h, g, n, q, k;
      for (o = 0, h = p.length; o < h; o++) {
        g = p[o];
        if (g._yuibuild) {
          n = g._yuibuild.exts;
          q = n.length;
          for (k = 0; k < q; k++) {
            if (n[k] === m) {
              return true;
            }
          }
        }
      }
      return false;
    },
    _ctor: function(g, h) {
      var j = (h && false === h.dynamic) ? false : true,
        k = (j) ? e._tmpl(g) : g,
        i = k._yuibuild;
      if (!i) {
        i = k._yuibuild = {};
      }
      i.id = i.id || null;
      i.exts = i.exts || [];
      i.dynamic = j;
      return k;
    },
    _cfg: function(g, h) {
      var i = [],
        l = {},
        k, j = (h && h.aggregates),
        n = (h && h.custom),
        m = g;
      while (m && m.prototype) {
        k = m._buildCfg;
        if (k) {
          if (k.aggregates) {
            i = i.concat(k.aggregates);
          }
          if (k.custom) {
            f.mix(l, k.custom, true);
          }
        }
        m = m.superclass ? m.superclass.constructor : null;
      }
      if (j) {
        i = i.concat(j);
      }
      if (n) {
        f.mix(l, h.cfgBuild, true);
      }
      return {
        aggregates: i,
        custom: l
      };
    },
    _clean: function(o, n, j) {
      var m, h, g, k = f.merge(o);
      for (m in j) {
        if (k.hasOwnProperty(m)) {
          delete k[m];
        }
      }
      for (h = 0, g = n.length; h < g; h++) {
        m = n[h];
        if (k.hasOwnProperty(m)) {
          delete k[m];
        }
      }
      return k;
    }
  });
  c.build = function(i, g, j, h) {
    return e(i, g, j, null, null, h);
  };
  c.create = function(g, j, i, h, k) {
    return e(g, j, i, h, k);
  };
  c.mix = function(g, h) {
    return e(null, g, h, null, null, {
      dynamic: false
    });
  };
  c._buildCfg = {
    custom: {
      ATTRS: function(l, j, h) {
        j.ATTRS = j.ATTRS || {};
        if (h.ATTRS) {
          var i = h.ATTRS,
            k = j.ATTRS,
            g;
          for (g in i) {
            if (i.hasOwnProperty(g)) {
              k[g] = k[g] || {};
              f.mix(k[g], i[g], true);
            }
          }
        }
      }
    },
    aggregates: ["_PLUG", "_UNPLUG"]
  };
}, "3.4.1", {
  requires: ["base-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("yui-throttle", function(a) {
  /*! Based on work by Simon Willison: http://gist.github.com/292562 */
  a.throttle = function(c, b) {
    b = (b) ? b : (a.config.throttleTime || 150);
    if (b === -1) {
      return (function() {
        c.apply(null, arguments);
      });
    }
    var d = a.Lang.now();
    return (function() {
      var e = a.Lang.now();
      if (e - d > b) {
        d = e;
        c.apply(null, arguments);
      }
    });
  };
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("classnamemanager", function(c) {
  var b = "classNamePrefix",
    d = "classNameDelimiter",
    a = c.config;
  a[b] = a[b] || "yui3";
  a[d] = a[d] || "-";
  c.ClassNameManager = function() {
    var e = a[b],
      f = a[d];
    return {
      getClassName: c.cached(function() {
        var g = c.Array(arguments);
        if (g[g.length - 1] !== true) {
          g.unshift(e);
        } else {
          g.pop();
        }
        return g.join(f);
      })
    };
  }();
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-ddm-base", function(b) {
  var a = function() {
    a.superclass.constructor.apply(this, arguments);
  };
  a.NAME = "ddm";
  a.ATTRS = {
    dragCursor: {
      value: "move"
    },
    clickPixelThresh: {
      value: 3
    },
    clickTimeThresh: {
      value: 1000
    },
    throttleTime: {
      value: -1
    },
    dragMode: {
      value: "point",
      setter: function(c) {
        this._setDragMode(c);
        return c;
      }
    }
  };
  b.extend(a, b.Base, {
    _createPG: function() {},
    _active: null,
    _setDragMode: function(c) {
      if (c === null) {
        c = b.DD.DDM.get("dragMode");
      }
      switch (c) {
        case 1:
        case "intersect":
          return 1;
        case 2:
        case "strict":
          return 2;
        case 0:
        case "point":
          return 0;
      }
      return 0;
    },
    CSS_PREFIX: b.ClassNameManager.getClassName("dd"),
    _activateTargets: function() {},
    _drags: [],
    activeDrag: false,
    _regDrag: function(c) {
      if (this.getDrag(c.get("node"))) {
        return false;
      }
      if (!this._active) {
        this._setupListeners();
      }
      this._drags.push(c);
      return true;
    },
    _unregDrag: function(e) {
      var c = [];
      b.each(this._drags, function(f, d) {
        if (f !== e) {
          c[c.length] = f;
        }
      });
      this._drags = c;
    },
    _setupListeners: function() {
      this._createPG();
      this._active = true;
      var c = b.one(b.config.doc);
      c.on("mousemove", b.throttle(b.bind(this._move, this), this.get("throttleTime")));
      c.on("mouseup", b.bind(this._end, this));
    },
    _start: function() {
      this.fire("ddm:start");
      this._startDrag();
    },
    _startDrag: function() {},
    _endDrag: function() {},
    _dropMove: function() {},
    _end: function() {
      if (this.activeDrag) {
        this._endDrag();
        this.fire("ddm:end");
        this.activeDrag.end.call(this.activeDrag);
        this.activeDrag = null;
      }
    },
    stopDrag: function() {
      if (this.activeDrag) {
        this._end();
      }
      return this;
    },
    _move: function(c) {
      if (this.activeDrag) {
        this.activeDrag._move.call(this.activeDrag, c);
        this._dropMove();
      }
    },
    cssSizestoObject: function(d) {
      var c = d.split(" ");
      switch (c.length) {
        case 1:
          c[1] = c[2] = c[3] = c[0];
          break;
        case 2:
          c[2] = c[0];
          c[3] = c[1];
          break;
        case 3:
          c[3] = c[1];
          break;
      }
      return {
        top: parseInt(c[0], 10),
        right: parseInt(c[1], 10),
        bottom: parseInt(c[2], 10),
        left: parseInt(c[3], 10)
      };
    },
    getDrag: function(d) {
      var c = false,
        e = b.one(d);
      if (e instanceof b.Node) {
        b.each(this._drags, function(g, f) {
          if (e.compareTo(g.get("node"))) {
            c = g;
          }
        });
      }
      return c;
    },
    swapPosition: function(d, c) {
      d = b.DD.DDM.getNode(d);
      c = b.DD.DDM.getNode(c);
      var f = d.getXY(),
        e = c.getXY();
      d.setXY(e);
      c.setXY(f);
      return d;
    },
    getNode: function(c) {
      if (c && c.get) {
        if (b.Widget && (c instanceof b.Widget)) {
          c = c.get("boundingBox");
        } else {
          c = c.get("node");
        }
      } else {
        c = b.one(c);
      }
      return c;
    },
    swapNode: function(e, c) {
      e = b.DD.DDM.getNode(e);
      c = b.DD.DDM.getNode(c);
      var f = c.get("parentNode"),
        d = c.get("nextSibling");
      if (d == e) {
        f.insertBefore(e, c);
      } else {
        if (c == e.get("nextSibling")) {
          f.insertBefore(c, e);
        } else {
          e.get("parentNode").replaceChild(c, e);
          f.insertBefore(e, d);
        }
      }
      return e;
    }
  });
  b.namespace("DD");
  b.DD.DDM = new a();
}, "3.4.1", {
  skinnable: false,
  requires: ["node", "base", "yui-throttle", "classnamemanager"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-drag", function(d) {
  var e = d.DD.DDM,
    r = "node",
    g = "dragging",
    m = "dragNode",
    c = "offsetHeight",
    k = "offsetWidth",
    h = "drag:mouseDown",
    b = "drag:afterMouseDown",
    f = "drag:removeHandle",
    l = "drag:addHandle",
    p = "drag:removeInvalid",
    q = "drag:addInvalid",
    j = "drag:start",
    i = "drag:end",
    n = "drag:drag",
    o = "drag:align",
    a = function(t) {
      this._lazyAddAttrs = false;
      a.superclass.constructor.apply(this, arguments);
      var s = e._regDrag(this);
      if (!s) {
        d.error("Failed to register node, already in use: " + t.node);
      }
    };
  a.NAME = "drag";
  a.START_EVENT = "mousedown";
  a.ATTRS = {
    node: {
      setter: function(s) {
        if (this._canDrag(s)) {
          return s;
        }
        var t = d.one(s);
        if (!t) {
          d.error("DD.Drag: Invalid Node Given: " + s);
        }
        return t;
      }
    },
    dragNode: {
      setter: function(s) {
        if (this._canDrag(s)) {
          return s;
        }
        var t = d.one(s);
        if (!t) {
          d.error("DD.Drag: Invalid dragNode Given: " + s);
        }
        return t;
      }
    },
    offsetNode: {
      value: true
    },
    startCentered: {
      value: false
    },
    clickPixelThresh: {
      value: e.get("clickPixelThresh")
    },
    clickTimeThresh: {
      value: e.get("clickTimeThresh")
    },
    lock: {
      value: false,
      setter: function(s) {
        if (s) {
          this.get(r).addClass(e.CSS_PREFIX + "-locked");
        } else {
          this.get(r).removeClass(e.CSS_PREFIX + "-locked");
        }
        return s;
      }
    },
    data: {
      value: false
    },
    move: {
      value: true
    },
    useShim: {
      value: true
    },
    activeHandle: {
      value: false
    },
    primaryButtonOnly: {
      value: true
    },
    dragging: {
      value: false
    },
    parent: {
      value: false
    },
    target: {
      value: false,
      setter: function(s) {
        this._handleTarget(s);
        return s;
      }
    },
    dragMode: {
      value: null,
      setter: function(s) {
        return e._setDragMode(s);
      }
    },
    groups: {
      value: ["default"],
      getter: function() {
        if (!this._groups) {
          this._groups = {};
        }
        var s = [];
        d.each(this._groups, function(u, t) {
          s[s.length] = t;
        });
        return s;
      },
      setter: function(s) {
        this._groups = {};
        d.each(s, function(u, t) {
          this._groups[u] = true;
        }, this);
        return s;
      }
    },
    handles: {
      value: null,
      setter: function(s) {
        if (s) {
          this._handles = {};
          d.each(s, function(u, t) {
            var w = u;
            if (u instanceof d.Node || u instanceof d.NodeList) {
              w = u._yuid;
            }
            this._handles[w] = u;
          }, this);
        } else {
          this._handles = null;
        }
        return s;
      }
    },
    bubbles: {
      setter: function(s) {
        this.addTarget(s);
        return s;
      }
    },
    haltDown: {
      value: true
    }
  };
  d.extend(a, d.Base, {
    _canDrag: function(s) {
      if (s && s.setXY && s.getXY && s.test && s.contains) {
        return true;
      }
      return false;
    },
    _bubbleTargets: d.DD.DDM,
    addToGroup: function(s) {
      this._groups[s] = true;
      e._activateTargets();
      return this;
    },
    removeFromGroup: function(s) {
      delete this._groups[s];
      e._activateTargets();
      return this;
    },
    target: null,
    _handleTarget: function(s) {
      if (d.DD.Drop) {
        if (s === false) {
          if (this.target) {
            e._unregTarget(this.target);
            this.target = null;
          }
          return false;
        } else {
          if (!d.Lang.isObject(s)) {
            s = {};
          }
          s.bubbleTargets = ("bubbleTargets" in s) ? s.bubbleTargets : d.Object.values(this._yuievt.targets);
          s.node = this.get(r);
          s.groups = s.groups || this.get("groups");
          this.target = new d.DD.Drop(s);
        }
      } else {
        return false;
      }
    },
    _groups: null,
    _createEvents: function() {
      this.publish(h, {
        defaultFn: this._defMouseDownFn,
        queuable: false,
        emitFacade: true,
        bubbles: true,
        prefix: "drag"
      });
      this.publish(o, {
        defaultFn: this._defAlignFn,
        queuable: false,
        emitFacade: true,
        bubbles: true,
        prefix: "drag"
      });
      this.publish(n, {
        defaultFn: this._defDragFn,
        queuable: false,
        emitFacade: true,
        bubbles: true,
        prefix: "drag"
      });
      this.publish(i, {
        defaultFn: this._defEndFn,
        preventedFn: this._prevEndFn,
        queuable: false,
        emitFacade: true,
        bubbles: true,
        prefix: "drag"
      });
      var s = [b, f, l, p, q, j, "drag:drophit", "drag:dropmiss", "drag:over", "drag:enter", "drag:exit"];
      d.each(s, function(u, t) {
        this.publish(u, {
          type: u,
          emitFacade: true,
          bubbles: true,
          preventable: false,
          queuable: false,
          prefix: "drag"
        });
      }, this);
    },
    _ev_md: null,
    _startTime: null,
    _endTime: null,
    _handles: null,
    _invalids: null,
    _invalidsDefault: {
      "textarea": true,
      "input": true,
      "a": true,
      "button": true,
      "select": true
    },
    _dragThreshMet: null,
    _fromTimeout: null,
    _clickTimeout: null,
    deltaXY: null,
    startXY: null,
    nodeXY: null,
    lastXY: null,
    actXY: null,
    realXY: null,
    mouseXY: null,
    region: null,
    _handleMouseUp: function(s) {
      this.fire("drag:mouseup");
      this._fixIEMouseUp();
      if (e.activeDrag) {
        e._end();
      }
    },
    _fixDragStart: function(s) {
      s.preventDefault();
    },
    _ieSelectFix: function() {
      return false;
    },
    _ieSelectBack: null,
    _fixIEMouseDown: function(s) {
      if (d.UA.ie) {
        this._ieSelectBack = d.config.doc.body.onselectstart;
        d.config.doc.body.onselectstart = this._ieSelectFix;
      }
    },
    _fixIEMouseUp: function() {
      if (d.UA.ie) {
        d.config.doc.body.onselectstart = this._ieSelectBack;
      }
    },
    _handleMouseDownEvent: function(s) {
      this.fire(h, {
        ev: s
      });
    },
    _defMouseDownFn: function(t) {
      var s = t.ev;
      this._dragThreshMet = false;
      this._ev_md = s;
      if (this.get("primaryButtonOnly") && s.button > 1) {
        return false;
      }
      if (this.validClick(s)) {
        this._fixIEMouseDown(s);
        if (this.get("haltDown")) {
          s.halt();
        } else {
          s.preventDefault();
        }
        this._setStartPosition([s.pageX, s.pageY]);
        e.activeDrag = this;
        this._clickTimeout = d.later(this.get("clickTimeThresh"), this, this._timeoutCheck);
      }
      this.fire(b, {
        ev: s
      });
    },
    validClick: function(w) {
      var v = false,
        z = false,
        s = w.target,
        u = null,
        t = null,
        x = null,
        y = false;
      if (this._handles) {
        d.each(this._handles, function(A, B) {
          if (A instanceof d.Node || A instanceof d.NodeList) {
            if (!v) {
              x = A;
              if (x instanceof d.Node) {
                x = new d.NodeList(A._node);
              }
              x.each(function(C) {
                if (C.contains(s)) {
                  v = true;
                }
              });
            }
          } else {
            if (d.Lang.isString(B)) {
              if (s.test(B + ", " + B + " *") && !u) {
                u = B;
                v = true;
              }
            }
          }
        });
      } else {
        z = this.get(r);
        if (z.contains(s) || z.compareTo(s)) {
          v = true;
        }
      }
      if (v) {
        if (this._invalids) {
          d.each(this._invalids, function(A, B) {
            if (d.Lang.isString(B)) {
              if (s.test(B + ", " + B + " *")) {
                v = false;
              }
            }
          });
        }
      }
      if (v) {
        if (u) {
          t = w.currentTarget.all(u);
          y = false;
          t.each(function(B, A) {
            if ((B.contains(s) || B.compareTo(s)) && !y) {
              y = true;
              this.set("activeHandle", B);
            }
          }, this);
        } else {
          this.set("activeHandle", this.get(r));
        }
      }
      return v;
    },
    _setStartPosition: function(s) {
      this.startXY = s;
      this.nodeXY = this.lastXY = this.realXY = this.get(r).getXY();
      if (this.get("offsetNode")) {
        this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
      } else {
        this.deltaXY = [0, 0];
      }
    },
    _timeoutCheck: function() {
      if (!this.get("lock") && !this._dragThreshMet && this._ev_md) {
        this._fromTimeout = this._dragThreshMet = true;
        this.start();
        this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);
      }
    },
    removeHandle: function(t) {
      var s = t;
      if (t instanceof d.Node || t instanceof d.NodeList) {
        s = t._yuid;
      }
      if (this._handles[s]) {
        delete this._handles[s];
        this.fire(f, {
          handle: t
        });
      }
      return this;
    },
    addHandle: function(t) {
      if (!this._handles) {
        this._handles = {};
      }
      var s = t;
      if (t instanceof d.Node || t instanceof d.NodeList) {
        s = t._yuid;
      }
      this._handles[s] = t;
      this.fire(l, {
        handle: t
      });
      return this;
    },
    removeInvalid: function(s) {
      if (this._invalids[s]) {
        this._invalids[s] = null;
        delete this._invalids[s];
        this.fire(p, {
          handle: s
        });
      }
      return this;
    },
    addInvalid: function(s) {
      if (d.Lang.isString(s)) {
        this._invalids[s] = true;
        this.fire(q, {
          handle: s
        });
      }
      return this;
    },
    initializer: function(s) {
      this.get(r).dd = this;
      if (!this.get(r).get("id")) {
        var t = d.stamp(this.get(r));
        this.get(r).set("id", t);
      }
      this.actXY = [];
      this._invalids = d.clone(this._invalidsDefault, true);
      this._createEvents();
      if (!this.get(m)) {
        this.set(m, this.get(r));
      }
      this.on("initializedChange", d.bind(this._prep, this));
      this.set("groups", this.get("groups"));
    },
    _prep: function() {
      this._dragThreshMet = false;
      var s = this.get(r);
      s.addClass(e.CSS_PREFIX + "-draggable");
      s.on(a.START_EVENT, d.bind(this._handleMouseDownEvent, this));
      s.on("mouseup", d.bind(this._handleMouseUp, this));
      s.on("dragstart", d.bind(this._fixDragStart, this));
    },
    _unprep: function() {
      var s = this.get(r);
      s.removeClass(e.CSS_PREFIX + "-draggable");
      s.detachAll();
    },
    start: function() {
      if (!this.get("lock") && !this.get(g)) {
        var t = this.get(r),
          s, u, v;
        this._startTime = (new Date()).getTime();
        e._start();
        t.addClass(e.CSS_PREFIX + "-dragging");
        this.fire(j, {
          pageX: this.nodeXY[0],
          pageY: this.nodeXY[1],
          startTime: this._startTime
        });
        t = this.get(m);
        v = this.nodeXY;
        s = t.get(k);
        u = t.get(c);
        if (this.get("startCentered")) {
          this._setStartPosition([v[0] + (s / 2), v[1] + (u / 2)]);
        }
        this.region = {
          "0": v[0],
          "1": v[1],
          area: 0,
          top: v[1],
          right: v[0] + s,
          bottom: v[1] + u,
          left: v[0]
        };
        this.set(g, true);
      }
      return this;
    },
    end: function() {
      this._endTime = (new Date()).getTime();
      if (this._clickTimeout) {
        this._clickTimeout.cancel();
      }
      this._dragThreshMet = this._fromTimeout = false;
      if (!this.get("lock") && this.get(g)) {
        this.fire(i, {
          pageX: this.lastXY[0],
          pageY: this.lastXY[1],
          startTime: this._startTime,
          endTime: this._endTime
        });
      }
      this.get(r).removeClass(e.CSS_PREFIX + "-dragging");
      this.set(g, false);
      this.deltaXY = [0, 0];
      return this;
    },
    _defEndFn: function(s) {
      this._fixIEMouseUp();
      this._ev_md = null;
    },
    _prevEndFn: function(s) {
      this._fixIEMouseUp();
      this.get(m).setXY(this.nodeXY);
      this._ev_md = null;
      this.region = null;
    },
    _align: function(s) {
      this.fire(o, {
        pageX: s[0],
        pageY: s[1]
      });
    },
    _defAlignFn: function(s) {
      this.actXY = [s.pageX - this.deltaXY[0], s.pageY - this.deltaXY[1]];
    },
    _alignNode: function(s) {
      this._align(s);
      this._moveNode();
    },
    _moveNode: function(s) {
      var t = [],
        u = [],
        w = this.nodeXY,
        v = this.actXY;
      t[0] = (v[0] - this.lastXY[0]);
      t[1] = (v[1] - this.lastXY[1]);
      u[0] = (v[0] - this.nodeXY[0]);
      u[1] = (v[1] - this.nodeXY[1]);
      this.region = {
        "0": v[0],
        "1": v[1],
        area: 0,
        top: v[1],
        right: v[0] + this.get(m).get(k),
        bottom: v[1] + this.get(m).get(c),
        left: v[0]
      };
      this.fire(n, {
        pageX: v[0],
        pageY: v[1],
        scroll: s,
        info: {
          start: w,
          xy: v,
          delta: t,
          offset: u
        }
      });
      this.lastXY = v;
    },
    _defDragFn: function(s) {
      if (this.get("move")) {
        if (s.scroll) {
          s.scroll.node.set("scrollTop", s.scroll.top);
          s.scroll.node.set("scrollLeft", s.scroll.left);
        }
        this.get(m).setXY([s.pageX, s.pageY]);
        this.realXY = [s.pageX, s.pageY];
      }
    },
    _move: function(u) {
      if (this.get("lock")) {
        return false;
      } else {
        this.mouseXY = [u.pageX, u.pageY];
        if (!this._dragThreshMet) {
          var t = Math.abs(this.startXY[0] - u.pageX),
            s = Math.abs(this.startXY[1] - u.pageY);
          if (t > this.get("clickPixelThresh") || s > this.get("clickPixelThresh")) {
            this._dragThreshMet = true;
            this.start();
            this._alignNode([u.pageX, u.pageY]);
          }
        } else {
          if (this._clickTimeout) {
            this._clickTimeout.cancel();
          }
          this._alignNode([u.pageX, u.pageY]);
        }
      }
    },
    stopDrag: function() {
      if (this.get(g)) {
        e._end();
      }
      return this;
    },
    destructor: function() {
      this._unprep();
      this.detachAll();
      if (this.target) {
        this.target.destroy();
      }
      e._unregDrag(this);
    }
  });
  d.namespace("DD");
  d.DD.Drag = a;
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-ddm-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-constrain", function(b) {
  var l = "dragNode",
    n = "offsetHeight",
    e = "offsetWidth",
    q = "host",
    f = "tickXArray",
    o = "tickYArray",
    p = b.DD.DDM,
    d = "top",
    j = "right",
    m = "bottom",
    c = "left",
    k = "view",
    h = null,
    i = "drag:tickAlignX",
    g = "drag:tickAlignY",
    a = function(r) {
      this._lazyAddAttrs = false;
      a.superclass.constructor.apply(this, arguments);
    };
  a.NAME = "ddConstrained";
  a.NS = "con";
  a.ATTRS = {
    host: {},
    stickX: {
      value: false
    },
    stickY: {
      value: false
    },
    tickX: {
      value: false
    },
    tickY: {
      value: false
    },
    tickXArray: {
      value: false
    },
    tickYArray: {
      value: false
    },
    gutter: {
      value: "0",
      setter: function(r) {
        return b.DD.DDM.cssSizestoObject(r);
      }
    },
    constrain: {
      value: k,
      setter: function(r) {
        var s = b.one(r);
        if (s) {
          r = s;
        }
        return r;
      }
    },
    constrain2region: {
      setter: function(s) {
        return this.set("constrain", s);
      }
    },
    constrain2node: {
      setter: function(r) {
        return this.set("constrain", b.one(r));
      }
    },
    constrain2view: {
      setter: function(r) {
        return this.set("constrain", k);
      }
    },
    cacheRegion: {
      value: true
    }
  };
  h = {
    _lastTickXFired: null,
    _lastTickYFired: null,
    initializer: function() {
      this._createEvents();
      this.get(q).on("drag:end", b.bind(this._handleEnd, this));
      this.get(q).on("drag:start", b.bind(this._handleStart, this));
      this.get(q).after("drag:align", b.bind(this.align, this));
      this.get(q).after("drag:drag", b.bind(this.drag, this));
    },
    _createEvents: function() {
      var r = this;
      var s = [i, g];
      b.each(s, function(u, t) {
        this.publish(u, {
          type: u,
          emitFacade: true,
          bubbles: true,
          queuable: false,
          prefix: "drag"
        });
      }, this);
    },
    _handleEnd: function() {
      this._lastTickYFired = null;
      this._lastTickXFired = null;
    },
    _handleStart: function() {
      this.resetCache();
    },
    _regionCache: null,
    _cacheRegion: function() {
      this._regionCache = this.get("constrain").get("region");
    },
    resetCache: function() {
      this._regionCache = null;
    },
    _getConstraint: function() {
      var r = this.get("constrain"),
        s = this.get("gutter"),
        t;
      if (r) {
        if (r instanceof b.Node) {
          if (!this._regionCache) {
            b.on("resize", b.bind(this._cacheRegion, this), b.config.win);
            this._cacheRegion();
          }
          t = b.clone(this._regionCache);
          if (!this.get("cacheRegion")) {
            this.resetCache();
          }
        } else {
          if (b.Lang.isObject(r)) {
            t = b.clone(r);
          }
        }
      }
      if (!r || !t) {
        r = k;
      }
      if (r === k) {
        t = this.get(q).get(l).get("viewportRegion");
      }
      b.each(s, function(u, v) {
        if ((v == j) || (v == m)) {
          t[v] -= u;
        } else {
          t[v] += u;
        }
      });
      return t;
    },
    getRegion: function(w) {
      var u = {},
        v = null,
        s = null,
        t = this.get(q);
      u = this._getConstraint();
      if (w) {
        v = t.get(l).get(n);
        s = t.get(l).get(e);
        u[j] = u[j] - s;
        u[m] = u[m] - v;
      }
      return u;
    },
    _checkRegion: function(s) {
      var u = s,
        w = this.getRegion(),
        v = this.get(q),
        x = v.get(l).get(n),
        t = v.get(l).get(e);
      if (u[1] > (w[m] - x)) {
        s[1] = (w[m] - x);
      }
      if (w[d] > u[1]) {
        s[1] = w[d];
      }
      if (u[0] > (w[j] - t)) {
        s[0] = (w[j] - t);
      }
      if (w[c] > u[0]) {
        s[0] = w[c];
      }
      return s;
    },
    inRegion: function(t) {
      t = t || this.get(q).get(l).getXY();
      var s = this._checkRegion([t[0], t[1]]),
        r = false;
      if ((t[0] === s[0]) && (t[1] === s[1])) {
        r = true;
      }
      return r;
    },
    align: function() {
      var u = this.get(q),
        s = [u.actXY[0], u.actXY[1]],
        t = this.getRegion(true);
      if (this.get("stickX")) {
        s[1] = (u.startXY[1] - u.deltaXY[1]);
      }
      if (this.get("stickY")) {
        s[0] = (u.startXY[0] - u.deltaXY[0]);
      }
      if (t) {
        s = this._checkRegion(s);
      }
      s = this._checkTicks(s, t);
      u.actXY = s;
    },
    drag: function(v) {
      var u = this.get(q),
        s = this.get("tickX"),
        t = this.get("tickY"),
        r = [u.actXY[0], u.actXY[1]];
      if ((b.Lang.isNumber(s) || this.get(f)) && (this._lastTickXFired !== r[0])) {
        this._tickAlignX();
        this._lastTickXFired = r[0];
      }
      if ((b.Lang.isNumber(t) || this.get(o)) && (this._lastTickYFired !== r[1])) {
        this._tickAlignY();
        this._lastTickYFired = r[1];
      }
    },
    _checkTicks: function(y, w) {
      var v = this.get(q),
        x = (v.startXY[0] - v.deltaXY[0]),
        u = (v.startXY[1] - v.deltaXY[1]),
        s = this.get("tickX"),
        t = this.get("tickY");
      if (s && !this.get(f)) {
        y[0] = p._calcTicks(y[0], x, s, w[c], w[j]);
      }
      if (t && !this.get(o)) {
        y[1] = p._calcTicks(y[1], u, t, w[d], w[m]);
      }
      if (this.get(f)) {
        y[0] = p._calcTickArray(y[0], this.get(f), w[c], w[j]);
      }
      if (this.get(o)) {
        y[1] = p._calcTickArray(y[1], this.get(o), w[d], w[m]);
      }
      return y;
    },
    _tickAlignX: function() {
      this.fire(i);
    },
    _tickAlignY: function() {
      this.fire(g);
    }
  };
  b.namespace("Plugin");
  b.extend(a, b.Base, h);
  b.Plugin.DDConstrained = a;
  b.mix(p, {
    _calcTicks: function(y, x, u, w, v) {
      var s = ((y - x) / u),
        t = Math.floor(s),
        r = Math.ceil(s);
      if ((t !== 0) || (r !== 0)) {
        if ((s >= t) && (s <= r)) {
          y = (x + (u * t));
          if (w && v) {
            if (y < w) {
              y = (x + (u * (t + 1)));
            }
            if (y > v) {
              y = (x + (u * (t - 1)));
            }
          }
        }
      }
      return y;
    },
    _calcTickArray: function(z, A, y, v) {
      var s = 0,
        w = A.length,
        u = 0,
        t, r, x;
      if (!A || (A.length === 0)) {
        return z;
      } else {
        if (A[0] >= z) {
          return A[0];
        } else {
          for (s = 0; s < w; s++) {
            u = (s + 1);
            if (A[u] && A[u] >= z) {
              t = z - A[s];
              r = A[u] - z;
              x = (r > t) ? A[s] : A[u];
              if (y && v) {
                if (x > v) {
                  if (A[s]) {
                    x = A[s];
                  } else {
                    x = A[w - 1];
                  }
                }
              }
              return x;
            }
          }
          return A[A.length - 1];
        }
      }
    }
  });
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-drag"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-scroll", function(b) {
  var h = function() {
      h.superclass.constructor.apply(this, arguments);
    },
    c, d, l = "host",
    a = "buffer",
    j = "parentScroll",
    g = "windowScroll",
    i = "scrollTop",
    f = "scrollLeft",
    e = "offsetWidth",
    k = "offsetHeight";
  h.ATTRS = {
    parentScroll: {
      value: false,
      setter: function(m) {
        if (m) {
          return m;
        }
        return false;
      }
    },
    buffer: {
      value: 30,
      validator: b.Lang.isNumber
    },
    scrollDelay: {
      value: 235,
      validator: b.Lang.isNumber
    },
    host: {
      value: null
    },
    windowScroll: {
      value: false,
      validator: b.Lang.isBoolean
    },
    vertical: {
      value: true,
      validator: b.Lang.isBoolean
    },
    horizontal: {
      value: true,
      validator: b.Lang.isBoolean
    }
  };
  b.extend(h, b.Base, {
    _scrolling: null,
    _vpRegionCache: null,
    _dimCache: null,
    _scrollTimer: null,
    _getVPRegion: function() {
      var m = {},
        o = this.get(j),
        u = this.get(a),
        s = this.get(g),
        y = ((s) ? [] : o.getXY()),
        v = ((s) ? "winWidth" : e),
        q = ((s) ? "winHeight" : k),
        x = ((s) ? o.get(i) : y[1]),
        p = ((s) ? o.get(f) : y[0]);
      m = {
        top: x + u,
        right: (o.get(v) + p) - u,
        bottom: (o.get(q) + x) - u,
        left: p + u
      };
      this._vpRegionCache = m;
      return m;
    },
    initializer: function() {
      var m = this.get(l);
      m.after("drag:start", b.bind(this.start, this));
      m.after("drag:end", b.bind(this.end, this));
      m.on("drag:align", b.bind(this.align, this));
      b.one("win").on("scroll", b.bind(function() {
        this._vpRegionCache = null;
      }, this));
    },
    _checkWinScroll: function(A) {
      var z = this._getVPRegion(),
        m = this.get(l),
        o = this.get(g),
        t = m.lastXY,
        n = false,
        F = this.get(a),
        s = this.get(j),
        H = s.get(i),
        v = s.get(f),
        x = this._dimCache.w,
        C = this._dimCache.h,
        u = t[1] + C,
        y = t[1],
        E = t[0] + x,
        q = t[0],
        G = y,
        p = q,
        B = H,
        D = v;
      if (this.get("horizontal")) {
        if (q <= z.left) {
          n = true;
          p = t[0] - ((o) ? F : 0);
          D = v - F;
        }
        if (E >= z.right) {
          n = true;
          p = t[0] + ((o) ? F : 0);
          D = v + F;
        }
      }
      if (this.get("vertical")) {
        if (u >= z.bottom) {
          n = true;
          G = t[1] + ((o) ? F : 0);
          B = H + F;
        }
        if (y <= z.top) {
          n = true;
          G = t[1] - ((o) ? F : 0);
          B = H - F;
        }
      }
      if (B < 0) {
        B = 0;
        G = t[1];
      }
      if (D < 0) {
        D = 0;
        p = t[0];
      }
      if (G < 0) {
        G = t[1];
      }
      if (p < 0) {
        p = t[0];
      }
      if (A) {
        m.actXY = [p, G];
        m._moveNode({
          node: s,
          top: B,
          left: D
        });
        if (!B && !D) {
          this._cancelScroll();
        }
      } else {
        if (n) {
          this._initScroll();
        } else {
          this._cancelScroll();
        }
      }
    },
    _initScroll: function() {
      this._cancelScroll();
      this._scrollTimer = b.Lang.later(this.get("scrollDelay"), this, this._checkWinScroll, [true], true);
    },
    _cancelScroll: function() {
      this._scrolling = false;
      if (this._scrollTimer) {
        this._scrollTimer.cancel();
        delete this._scrollTimer;
      }
    },
    align: function(m) {
      if (this._scrolling) {
        this._cancelScroll();
        m.preventDefault();
      }
      if (!this._scrolling) {
        this._checkWinScroll();
      }
    },
    _setDimCache: function() {
      var m = this.get(l).get("dragNode");
      this._dimCache = {
        h: m.get(k),
        w: m.get(e)
      };
    },
    start: function() {
      this._setDimCache();
    },
    end: function(m) {
      this._dimCache = null;
      this._cancelScroll();
    },
    toString: function() {
      return h.NAME + " #" + this.get("node").get("id");
    }
  });
  b.namespace("Plugin");
  c = function() {
    c.superclass.constructor.apply(this, arguments);
  };
  c.ATTRS = b.merge(h.ATTRS, {
    windowScroll: {
      value: true,
      setter: function(m) {
        if (m) {
          this.set(j, b.one("win"));
        }
        return m;
      }
    }
  });
  b.extend(c, h, {
    initializer: function() {
      this.set("windowScroll", this.get("windowScroll"));
    }
  });
  c.NAME = c.NS = "winscroll";
  b.Plugin.DDWinScroll = c;
  d = function() {
    d.superclass.constructor.apply(this, arguments);
  };
  d.ATTRS = b.merge(h.ATTRS, {
    node: {
      value: false,
      setter: function(m) {
        var o = b.one(m);
        if (!o) {
          if (m !== false) {
            b.error("DDNodeScroll: Invalid Node Given: " + m);
          }
        } else {
          this.set(j, o);
        }
        return o;
      }
    }
  });
  b.extend(d, h, {
    initializer: function() {
      this.set("node", this.get("node"));
    }
  });
  d.NAME = d.NS = "nodescroll";
  b.Plugin.DDNodeScroll = d;
  b.DD.Scroll = h;
}, "3.4.1", {
  optional: ["dd-proxy"],
  requires: ["dd-drag"],
  skinnable: false
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-plugin", function(c) {
  var a = function(e) {
      if (c.Widget && e.host instanceof c.Widget) {
        e.node = e.host.get("boundingBox");
        e.widget = e.host;
      } else {
        e.node = e.host;
        e.widget = false;
      }
      a.superclass.constructor.call(this, e);
    },
    b = "drag:drag",
    d = "drag:end";
  a.NAME = "dd-plugin";
  a.NS = "dd";
  c.extend(a, c.DD.Drag, {
    _widget: undefined,
    _stoppedPosition: undefined,
    _usesWidgetPosition: function(f) {
      var e = false;
      if (f) {
        e = (f.hasImpl && f.hasImpl(c.WidgetPosition)) ? true : false;
      }
      return e;
    },
    initializer: function(e) {
      this._widget = e.widget;
      if (this._usesWidgetPosition(this._widget)) {
        this.on(b, this._setWidgetCoords);
        this.on(d, this._updateStopPosition);
      }
    },
    _setWidgetCoords: function(i) {
      var h = this._stoppedPosition || i.target.nodeXY,
        f = i.target.realXY,
        g = [f[0] - h[0], f[1] - h[0]];
      if (g[0] !== 0 && g[1] !== 0) {
        this._widget.set("xy", f);
      } else {
        if (g[0] === 0) {
          this._widget.set("y", f[1]);
        } else {
          if (g[1] === 0) {
            this._widget.set("x", f[0]);
          }
        }
      }
    },
    updateStopPosition: function(f) {
      this._stoppedPosition = f.target.realXY;
    }
  });
  c.namespace("Plugin");
  c.Plugin.Drag = a;
}, "3.4.1", {
  optional: ["dd-constrain", "dd-proxy"],
  requires: ["dd-drag"],
  skinnable: false
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-synthetic", function(b) {
  var j = b.Env.evt.dom_map,
    d = b.Array,
    i = b.Lang,
    l = i.isObject,
    c = i.isString,
    e = i.isArray,
    g = b.Selector.query,
    k = function() {};

  function h(n, m) {
    this.handle = n;
    this.emitFacade = m;
  }
  h.prototype.fire = function(s) {
    var t = d(arguments, 0, true),
      q = this.handle,
      o = q.evt,
      m = q.sub,
      p = m.context,
      u = m.filter,
      n = s || {},
      r;
    if (this.emitFacade) {
      if (!s || !s.preventDefault) {
        n = o._getFacade();
        if (l(s) && !s.preventDefault) {
          b.mix(n, s, true);
          t[0] = n;
        } else {
          t.unshift(n);
        }
      }
      n.type = o.type;
      n.details = t.slice();
      if (u) {
        n.container = o.host;
      }
    } else {
      if (u && l(s) && s.currentTarget) {
        t.shift();
      }
    }
    m.context = p || n.currentTarget || o.host;
    r = o.fire.apply(o, t);
    m.context = p;
    return r;
  };

  function f(o, n, m) {
    this.handles = [];
    this.el = o;
    this.key = m;
    this.domkey = n;
  }
  f.prototype = {
    constructor: f,
    type: "_synth",
    fn: k,
    capture: false,
    register: function(m) {
      m.evt.registry = this;
      this.handles.push(m);
    },
    unregister: function(p) {
      var o = this.handles,
        n = j[this.domkey],
        m;
      for (m = o.length - 1; m >= 0; --m) {
        if (o[m].sub === p) {
          o.splice(m, 1);
          break;
        }
      }
      if (!o.length) {
        delete n[this.key];
        if (!b.Object.size(n)) {
          delete j[this.domkey];
        }
      }
    },
    detachAll: function() {
      var n = this.handles,
        m = n.length;
      while (--m >= 0) {
        n[m].detach();
      }
    }
  };

  function a() {
    this._init.apply(this, arguments);
  }
  b.mix(a, {
    Notifier: h,
    SynthRegistry: f,
    getRegistry: function(s, r, p) {
      var q = s._node,
        o = b.stamp(q),
        n = "event:" + o + r + "_synth",
        m = j[o];
      if (p) {
        if (!m) {
          m = j[o] = {};
        }
        if (!m[n]) {
          m[n] = new f(q, o, n);
        }
      }
      return (m && m[n]) || null;
    },
    _deleteSub: function(n) {
      if (n && n.fn) {
        var m = this.eventDef,
          o = (n.filter) ? "detachDelegate" : "detach";
        this.subscribers = {};
        this.subCount = 0;
        m[o](n.node, n, this.notifier, n.filter);
        this.registry.unregister(n);
        delete n.fn;
        delete n.node;
        delete n.context;
      }
    },
    prototype: {
      constructor: a,
      _init: function() {
        var m = this.publishConfig || (this.publishConfig = {});
        this.emitFacade = ("emitFacade" in m) ? m.emitFacade : true;
        m.emitFacade = false;
      },
      processArgs: k,
      on: k,
      detach: k,
      delegate: k,
      detachDelegate: k,
      _on: function(s, t) {
        var u = [],
          o = s.slice(),
          p = this.processArgs(s, t),
          q = s[2],
          m = t ? "delegate" : "on",
          n, r;
        n = (c(q)) ? g(q) : d(q || b.one(b.config.win));
        if (!n.length && c(q)) {
          r = b.on("available", function() {
            b.mix(r, b[m].apply(b, o), true);
          }, q);
          return r;
        }
        b.Array.each(n, function(w) {
          var x = s.slice(),
            v;
          w = b.one(w);
          if (w) {
            if (t) {
              v = x.splice(3, 1)[0];
            }
            x.splice(0, 4, x[1], x[3]);
            if (!this.preventDups || !this.getSubs(w, s, null, true)) {
              u.push(this._subscribe(w, m, x, p, v));
            }
          }
        }, this);
        return (u.length === 1) ? u[0] : new b.EventHandle(u);
      },
      _subscribe: function(q, o, t, r, p) {
        var v = new b.CustomEvent(this.type, this.publishConfig),
          s = v.on.apply(v, t),
          u = new h(s, this.emitFacade),
          n = a.getRegistry(q, this.type, true),
          m = s.sub;
        m.node = q;
        m.filter = p;
        if (r) {
          this.applyArgExtras(r, m);
        }
        b.mix(v, {
          eventDef: this,
          notifier: u,
          host: q,
          currentTarget: q,
          target: q,
          el: q._node,
          _delete: a._deleteSub
        }, true);
        s.notifier = u;
        n.register(s);
        this[o](q, m, u, p);
        return s;
      },
      applyArgExtras: function(m, n) {
        n._extra = m;
      },
      _detach: function(o) {
        var t = o[2],
          r = (c(t)) ? g(t) : d(t),
          s, q, m, p, n;
        o.splice(2, 1);
        for (q = 0, m = r.length; q < m; ++q) {
          s = b.one(r[q]);
          if (s) {
            p = this.getSubs(s, o);
            if (p) {
              for (n = p.length - 1; n >= 0; --n) {
                p[n].detach();
              }
            }
          }
        }
      },
      getSubs: function(o, u, n, q) {
        var m = a.getRegistry(o, this.type),
          v = [],
          t, p, s, r;
        if (m) {
          t = m.handles;
          if (!n) {
            n = this.subMatch;
          }
          for (p = 0, s = t.length; p < s; ++p) {
            r = t[p];
            if (n.call(this, r.sub, u)) {
              if (q) {
                return r;
              } else {
                v.push(t[p]);
              }
            }
          }
        }
        return v.length && v;
      },
      subMatch: function(n, m) {
        return !m[1] || n.fn === m[1];
      }
    }
  }, true);
  b.SyntheticEvent = a;
  b.Event.define = function(o, n, q) {
    var p, r, m;
    if (o && o.type) {
      p = o;
      q = n;
    } else {
      if (n) {
        p = b.merge({
          type: o
        }, n);
      }
    }
    if (p) {
      if (q || !b.Node.DOM_EVENTS[p.type]) {
        r = function() {
          a.apply(this, arguments);
        };
        b.extend(r, a, p);
        m = new r();
        o = m.type;
        b.Node.DOM_EVENTS[o] = b.Env.evt.plugins[o] = {
          eventDef: m,
          on: function() {
            return m._on(d(arguments));
          },
          delegate: function() {
            return m._on(d(arguments), true);
          },
          detach: function() {
            return m._detach(d(arguments));
          }
        };
      }
    } else {
      if (c(o) || e(o)) {
        b.Array.each(d(o), function(s) {
          b.Node.DOM_EVENTS[s] = 1;
        });
      }
    }
    return m;
  };
}, "3.4.1", {
  requires: ["node-base", "event-custom-complex"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-focus", function(e) {
  var d = e.Event,
    c = e.Lang,
    a = c.isString,
    b = c.isFunction(e.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);

  function f(h, g, j) {
    var i = "_" + h + "Notifiers";
    e.Event.define(h, {
      _attach: function(l, m, k) {
        if (e.DOM.isWindow(l)) {
          return d._attach([h, function(n) {
            m.fire(n);
          }, l]);
        } else {
          return d._attach([g, this._proxy, l, this, m, k], {
            capture: true
          });
        }
      },
      _proxy: function(o, s, p) {
        var m = o.target,
          q = m.getData(i),
          t = e.stamp(o.currentTarget._node),
          k = (b || o.target !== o.currentTarget),
          l = s.handle.sub,
          r = [m, o].concat(l.args || []),
          n;
        s.currentTarget = (p) ? m : o.currentTarget;
        s.container = (p) ? o.currentTarget : null;
        if (!l.filter || l.filter.apply(m, r)) {
          if (!q) {
            q = {};
            m.setData(i, q);
            if (k) {
              n = d._attach([j, this._notify, m._node]).sub;
              n.once = true;
            }
          }
          if (!q[t]) {
            q[t] = [];
          }
          q[t].push(s);
          if (!k) {
            this._notify(o);
          }
        }
      },
      _notify: function(p, l) {
        var m = p.currentTarget,
          r = m.getData(i),
          s = m.get("ownerDocument") || m,
          q = m,
          k = [],
          t, n, o;
        if (r) {
          while (q && q !== s) {
            k.push.apply(k, r[e.stamp(q)] || []);
            q = q.get("parentNode");
          }
          k.push.apply(k, r[e.stamp(s)] || []);
          for (n = 0, o = k.length; n < o; ++n) {
            t = k[n];
            p.currentTarget = k[n].currentTarget;
            if (t.container) {
              p.container = t.container;
            }
            t.fire(p);
          }
          m.clearData(i);
        }
      },
      on: function(m, k, l) {
        k.onHandle = this._attach(m._node, l);
      },
      detach: function(l, k) {
        k.onHandle.detach();
      },
      delegate: function(n, l, m, k) {
        if (a(k)) {
          l.filter = e.delegate.compileFilter(k);
        }
        l.delegateHandle = this._attach(n._node, m, true);
      },
      detachDelegate: function(l, k) {
        k.delegateHandle.detach();
      }
    }, true);
  }
  if (b) {
    f("focus", "beforeactivate", "focusin");
    f("blur", "beforedeactivate", "focusout");
  } else {
    f("focus", "focus", "focus");
    f("blur", "blur", "blur");
  }
}, "3.4.1", {
  requires: ["event-synthetic"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-base", function(b) {
  var g = b.Lang,
    r = b.Node,
    e = b.ClassNameManager,
    w = e.getClassName,
    M, s = b.cached(function(L) {
      return L.substring(0, 1).toUpperCase() + L.substring(1);
    }),
    F = "content",
    P = "visible",
    K = "hidden",
    y = "disabled",
    B = "focused",
    d = "width",
    A = "height",
    N = "boundingBox",
    v = "contentBox",
    k = "parentNode",
    m = "ownerDocument",
    x = "auto",
    j = "srcNode",
    I = "body",
    H = "tabIndex",
    q = "id",
    i = "render",
    J = "rendered",
    n = "destroyed",
    a = "strings",
    o = "<div></div>",
    z = "Change",
    p = "loading",
    E = "_uiSet",
    D = "",
    G = function() {},
    u = true,
    O = false,
    t, l = {},
    f = [P, y, A, d, B],
    C = b.UA.webkit,
    h = {};

  function c(Q) {
    var T = this,
      L, S, R = T.constructor;
    T._strs = {};
    T._cssPrefix = R.CSS_PREFIX || w(R.NAME.toLowerCase());
    c.superclass.constructor.apply(T, arguments);
    S = T.get(i);
    if (S) {
      if (S !== u) {
        L = S;
      }
      T.render(L);
    }
  }
  c.NAME = "widget";
  t = c.UI_SRC = "ui";
  c.ATTRS = l;
  l[q] = {
    valueFn: "_guid",
    writeOnce: u
  };
  l[J] = {
    value: O,
    readOnly: u
  };
  l[N] = {
    value: null,
    setter: "_setBB",
    writeOnce: u
  };
  l[v] = {
    valueFn: "_defaultCB",
    setter: "_setCB",
    writeOnce: u
  };
  l[H] = {
    value: null,
    validator: "_validTabIndex"
  };
  l[B] = {
    value: O,
    readOnly: u
  };
  l[y] = {
    value: O
  };
  l[P] = {
    value: u
  };
  l[A] = {
    value: D
  };
  l[d] = {
    value: D
  };
  l[a] = {
    value: {},
    setter: "_strSetter",
    getter: "_strGetter"
  };
  l[i] = {
    value: O,
    writeOnce: u
  };
  c.CSS_PREFIX = w(c.NAME.toLowerCase());
  c.getClassName = function() {
    return w.apply(e, [c.CSS_PREFIX].concat(b.Array(arguments), true));
  };
  M = c.getClassName;
  c.getByNode = function(L) {
    var R, Q = M();
    L = r.one(L);
    if (L) {
      L = L.ancestor("." + Q, true);
      if (L) {
        R = h[b.stamp(L, u)];
      }
    }
    return R || null;
  };
  b.extend(c, b.Base, {
    getClassName: function() {
      return w.apply(e, [this._cssPrefix].concat(b.Array(arguments), true));
    },
    initializer: function(L) {
      h[b.stamp(this.get(N))] = this;
      if (this._applyParser) {
        this._applyParser(L);
      }
    },
    destructor: function() {
      var L = this.get(N),
        Q = b.stamp(L, u);
      if (Q in h) {
        delete h[Q];
      }
      this._destroyBox();
    },
    destroy: function(L) {
      this._destroyAllNodes = L;
      return c.superclass.destroy.apply(this);
    },
    _destroyBox: function() {
      var R = this.get(N),
        Q = this.get(v),
        L = this._destroyAllNodes,
        S = R && R.compareTo(Q);
      if (this.UI_EVENTS) {
        this._destroyUIEvents();
      }
      this._unbindUI(R);
      if (L) {
        R.empty();
        R.remove(u);
      } else {
        if (Q) {
          Q.remove(u);
        }
        if (!S) {
          R.remove(u);
        }
      }
    },
    render: function(L) {
      if (!this.get(n) && !this.get(J)) {
        this.publish(i, {
          queuable: O,
          fireOnce: u,
          defaultTargetOnly: u,
          defaultFn: this._defRenderFn
        });
        this.fire(i, {
          parentNode: (L) ? r.one(L) : null
        });
      }
      return this;
    },
    _defRenderFn: function(L) {
      this._parentNode = L.parentNode;
      this.renderer();
      this._set(J, u);
      this._removeLoadingClassNames();
    },
    renderer: function() {
      var L = this;
      L._renderUI();
      L.renderUI();
      L._bindUI();
      L.bindUI();
      L._syncUI();
      L.syncUI();
    },
    bindUI: G,
    renderUI: G,
    syncUI: G,
    hide: function() {
      return this.set(P, O);
    },
    show: function() {
      return this.set(P, u);
    },
    focus: function() {
      return this._set(B, u);
    },
    blur: function() {
      return this._set(B, O);
    },
    enable: function() {
      return this.set(y, O);
    },
    disable: function() {
      return this.set(y, u);
    },
    _uiSizeCB: function(L) {
      this.get(v).toggleClass(M(F, "expanded"), L);
    },
    _renderBox: function(L) {
      var T = this,
        Q = T.get(v),
        R = T.get(N),
        V = T.get(j),
        S = T.DEF_PARENT_NODE,
        U = (V && V.get(m)) || R.get(m) || Q.get(m);
      if (V && !V.compareTo(Q) && !Q.inDoc(U)) {
        V.replace(Q);
      }
      if (!R.compareTo(Q.get(k)) && !R.compareTo(Q)) {
        if (Q.inDoc(U)) {
          Q.replace(R);
        }
        R.appendChild(Q);
      }
      L = L || (S && r.one(S));
      if (L) {
        L.appendChild(R);
      } else {
        if (!R.inDoc(U)) {
          r.one(I).insert(R, 0);
        }
      }
    },
    _setBB: function(L) {
      return this._setBox(this.get(q), L, this.BOUNDING_TEMPLATE);
    },
    _setCB: function(L) {
      return (this.CONTENT_TEMPLATE === null) ? this.get(N) : this._setBox(null, L, this.CONTENT_TEMPLATE);
    },
    _defaultCB: function(L) {
      return this.get(j) || null;
    },
    _setBox: function(R, Q, L) {
      Q = r.one(Q) || r.create(L);
      if (!Q.get(q)) {
        Q.set(q, R || b.guid());
      }
      return Q;
    },
    _renderUI: function() {
      this._renderBoxClassNames();
      this._renderBox(this._parentNode);
    },
    _renderBoxClassNames: function() {
      var S = this._getClasses(),
        L, Q = this.get(N),
        R;
      Q.addClass(M());
      for (R = S.length - 3; R >= 0; R--) {
        L = S[R];
        Q.addClass(L.CSS_PREFIX || w(L.NAME.toLowerCase()));
      }
      this.get(v).addClass(this.getClassName(F));
    },
    _removeLoadingClassNames: function() {
      var R = this.get(N),
        L = this.get(v),
        Q = this.getClassName(p),
        S = M(p);
      R.removeClass(S).removeClass(Q);
      L.removeClass(S).removeClass(Q);
    },
    _bindUI: function() {
      this._bindAttrUI(this._UI_ATTRS.BIND);
      this._bindDOM();
    },
    _unbindUI: function(L) {
      this._unbindDOM(L);
    },
    _bindDOM: function() {
      var L = this.get(N).get(m);
      this._hDocFocus = L.on("focus", this._onDocFocus, this);
      if (C) {
        this._hDocMouseDown = L.on("mousedown", this._onDocMouseDown, this);
      }
    },
    _unbindDOM: function(L) {
      if (this._hDocFocus) {
        this._hDocFocus.detach();
      }
      if (C && this._hDocMouseDown) {
        this._hDocMouseDown.detach();
      }
    },
    _syncUI: function() {
      this._syncAttrUI(this._UI_ATTRS.SYNC);
    },
    _uiSetHeight: function(L) {
      this._uiSetDim(A, L);
      this._uiSizeCB((L !== D && L !== x));
    },
    _uiSetWidth: function(L) {
      this._uiSetDim(d, L);
    },
    _uiSetDim: function(L, Q) {
      this.get(N).setStyle(L, g.isNumber(Q) ? Q + this.DEF_UNIT : Q);
    },
    _uiSetVisible: function(L) {
      this.get(N).toggleClass(this.getClassName(K), !L);
    },
    _uiSetDisabled: function(L) {
      this.get(N).toggleClass(this.getClassName(y), L);
    },
    _uiSetFocused: function(R, Q) {
      var L = this.get(N);
      L.toggleClass(this.getClassName(B), R);
      if (Q !== t) {
        if (R) {
          L.focus();
        } else {
          L.blur();
        }
      }
    },
    _uiSetTabIndex: function(Q) {
      var L = this.get(N);
      if (g.isNumber(Q)) {
        L.set(H, Q);
      } else {
        L.removeAttribute(H);
      }
    },
    _onDocMouseDown: function(L) {
      if (this._domFocus) {
        this._onDocFocus(L);
      }
    },
    _onDocFocus: function(L) {
      this._domFocus = this.get(N).contains(L.target);
      this._set(B, this._domFocus, {
        src: t
      });
    },
    toString: function() {
      return this.name + "[" + this.get(q) + "]";
    },
    DEF_UNIT: "px",
    DEF_PARENT_NODE: null,
    CONTENT_TEMPLATE: o,
    BOUNDING_TEMPLATE: o,
    _guid: function() {
      return b.guid();
    },
    _validTabIndex: function(L) {
      return (g.isNumber(L) || g.isNull(L));
    },
    _bindAttrUI: function(Q) {
      var R, L = Q.length;
      for (R = 0; R < L; R++) {
        this.after(Q[R] + z, this._setAttrUI);
      }
    },
    _syncAttrUI: function(R) {
      var S, Q = R.length,
        L;
      for (S = 0; S < Q; S++) {
        L = R[S];
        this[E + s(L)](this.get(L));
      }
    },
    _setAttrUI: function(L) {
      this[E + s(L.attrName)](L.newVal, L.src);
    },
    _strSetter: function(L) {
      return b.merge(this.get(a), L);
    },
    getString: function(L) {
      return this.get(a)[L];
    },
    getStrings: function() {
      return this.get(a);
    },
    _UI_ATTRS: {
      BIND: f,
      SYNC: f.concat(H)
    }
  });
  b.Widget = c;
}, "3.4.1", {
  requires: ["attribute", "event-focus", "base-base", "base-pluginhost", "node-base", "node-style", "classnamemanager"],
  skinnable: true
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-htmlparser", function(f) {
  var e = f.Widget,
    c = f.Node,
    d = f.Lang,
    a = "srcNode",
    b = "contentBox";
  e.HTML_PARSER = {};
  e._buildCfg = {
    aggregates: ["HTML_PARSER"]
  };
  e.ATTRS[a] = {
    value: null,
    setter: c.one,
    getter: "_getSrcNode",
    writeOnce: true
  };
  f.mix(e.prototype, {
    _getSrcNode: function(g) {
      return g || this.get(b);
    },
    _applyParsedConfig: function(i, g, h) {
      return (h) ? f.mix(g, h, false) : g;
    },
    _applyParser: function(g) {
      var i = this,
        j = i.get(a),
        h = i._getHtmlParser(),
        l, k;
      if (h && j) {
        f.Object.each(h, function(n, m, p) {
          k = null;
          if (d.isFunction(n)) {
            k = n.call(i, j);
          } else {
            if (d.isArray(n)) {
              k = j.all(n[0]);
              if (k.isEmpty()) {
                k = null;
              }
            } else {
              k = j.one(n);
            }
          }
          if (k !== null && k !== undefined) {
            l = l || {};
            l[m] = k;
          }
        });
      }
      g = i._applyParsedConfig(j, g, l);
    },
    _getHtmlParser: function() {
      var h = this._getClasses(),
        k = {},
        g, j;
      for (g = h.length - 1; g >= 0; g--) {
        j = h[g].HTML_PARSER;
        if (j) {
          f.mix(k, j, true);
        }
      }
      return k;
    }
  });
}, "3.4.1", {
  requires: ["widget-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-uievents", function(g) {
  var f = "boundingBox",
    e = g.Widget,
    d = "render",
    a = g.Lang,
    c = ":",
    b = g.Widget._uievts = g.Widget._uievts || {};
  g.mix(e.prototype, {
    _destroyUIEvents: function() {
      var h = g.stamp(this, true);
      g.each(b, function(j, i) {
        if (j.instances[h]) {
          delete j.instances[h];
          if (g.Object.isEmpty(j.instances)) {
            j.handle.detach();
            if (b[i]) {
              delete b[i];
            }
          }
        }
      });
    },
    UI_EVENTS: g.Node.DOM_EVENTS,
    _getUIEventNode: function() {
      return this.get(f);
    },
    _createUIEvent: function(i) {
      var l = this._getUIEventNode(),
        h = (g.stamp(l) + i),
        k = b[h],
        j;
      if (!k) {
        j = l.delegate(i, function(m) {
          var n = e.getByNode(this);
          if (n) {
            if (n._filterUIEvent(m)) {
              n.fire(m.type, {
                domEvent: m
              });
            }
          }
        }, "." + g.Widget.getClassName());
        b[h] = k = {
          instances: {},
          handle: j
        };
      }
      k.instances[g.stamp(this)] = 1;
    },
    _filterUIEvent: function(h) {
      return (h.currentTarget.compareTo(h.container) || h.container.compareTo(this._getUIEventNode()));
    },
    _getUIEvent: function(j) {
      if (a.isString(j)) {
        var k = this.parseType(j)[1],
          h, i;
        if (k) {
          h = k.indexOf(c);
          if (h > -1) {
            k = k.substring(h + c.length);
          }
          if (this.UI_EVENTS[k]) {
            i = k;
          }
        }
        return i;
      }
    },
    _initUIEvent: function(i) {
      var j = this._getUIEvent(i),
        h = this._uiEvtsInitQueue || {};
      if (j && !h[j]) {
        this._uiEvtsInitQueue = h[j] = 1;
        this.after(d, function() {
          this._createUIEvent(j);
          delete this._uiEvtsInitQueue[j];
        });
      }
    },
    on: function(h) {
      this._initUIEvent(h);
      return e.superclass.on.apply(this, arguments);
    },
    publish: function(i, h) {
      var j = this._getUIEvent(i);
      if (j && h && h.defaultFn) {
        this._initUIEvent(j);
      }
      return e.superclass.publish.apply(this, arguments);
    }
  }, true);
}, "3.4.1", {
  requires: ["widget-base", "node-event-delegate"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-skin", function(e) {
  var d = "boundingBox",
    b = "contentBox",
    a = "skin",
    c = e.ClassNameManager.getClassName;
  e.Widget.prototype.getSkinName = function() {
    var f = this.get(b) || this.get(d),
      h = new RegExp("\\b" + c(a) + "-(\\S+)"),
      g;
    if (f) {
      f.ancestor(function(i) {
        g = i.get("className").match(h);
        return g;
      });
    }
    return (g) ? g[1] : null;
  };
}, "3.4.1", {
  requires: ["widget-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("tabview-base", function(b) {
  var c = b.ClassNameManager.getClassName,
    f = "tabview",
    k = "tab",
    l = "content",
    j = "panel",
    g = "selected",
    h = {},
    i = ".",
    d = {
      tabview: c(f),
      tabviewPanel: c(f, j),
      tabviewList: c(f, "list"),
      tab: c(k),
      tabLabel: c(k, "label"),
      tabPanel: c(k, j),
      selectedTab: c(k, g),
      selectedPanel: c(k, j, g)
    },
    e = {
      tabview: i + d.tabview,
      tabviewList: "> ul",
      tab: "> ul > li",
      tabLabel: "> ul > li > a ",
      tabviewPanel: "> div",
      tabPanel: "> div > div",
      selectedTab: "> ul > " + i + d.selectedTab,
      selectedPanel: "> div " + i + d.selectedPanel
    },
    a = function(m) {
      this.init.apply(this, arguments);
    };
  a.NAME = "tabviewBase";
  a._queries = e;
  a._classNames = d;
  b.mix(a.prototype, {
    init: function(m) {
      m = m || h;
      this._node = m.host || b.one(m.node);
      this.refresh();
    },
    initClassNames: function(m) {
      b.Object.each(e, function(p, o) {
        if (d[o]) {
          var n = this.all(p);
          if (m !== undefined) {
            n = n.item(m);
          }
          if (n) {
            n.addClass(d[o]);
          }
        }
      }, this._node);
      this._node.addClass(d.tabview);
    },
    _select: function(n) {
      var q = this._node,
        r = q.one(e.selectedTab),
        p = q.one(e.selectedPanel),
        o = q.all(e.tab).item(n),
        m = q.all(e.tabPanel).item(n);
      if (r) {
        r.removeClass(d.selectedTab);
      }
      if (p) {
        p.removeClass(d.selectedPanel);
      }
      if (o) {
        o.addClass(d.selectedTab);
      }
      if (m) {
        m.addClass(d.selectedPanel);
      }
    },
    initState: function() {
      var n = this._node,
        o = n.one(e.selectedTab),
        m = o ? n.all(e.tab).indexOf(o) : 0;
      this._select(m);
    },
    _scrubTextNodes: function() {
      this._node.one(e.tabviewList).get("childNodes").each(function(m) {
        if (m.get("nodeType") === 3) {
          m.remove();
        }
      });
    },
    refresh: function() {
      this._scrubTextNodes();
      this.initClassNames();
      this.initState();
      this.initEvents();
    },
    tabEventName: "click",
    initEvents: function() {
      this._node.delegate(this.tabEventName, this.onTabEvent, e.tab, this);
    },
    onTabEvent: function(m) {
      m.preventDefault();
      this._select(this._node.all(e.tab).indexOf(m.currentTarget));
    },
    destroy: function() {
      this._node.detach(this.tabEventName);
    }
  });
  b.TabviewBase = a;
}, "3.4.1", {
  requires: ["node-event-delegate", "classnamemanager", "skin-sam-tabview"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("plugin", function(b) {
  function a(c) {
    if (!(this.hasImpl && this.hasImpl(b.Plugin.Base))) {
      a.superclass.constructor.apply(this, arguments);
    } else {
      a.prototype.initializer.apply(this, arguments);
    }
  }
  a.ATTRS = {
    host: {
      writeOnce: true
    }
  };
  a.NAME = "plugin";
  a.NS = "plugin";
  b.extend(a, b.Base, {
    _handles: null,
    initializer: function(c) {
      this._handles = [];
    },
    destructor: function() {
      if (this._handles) {
        for (var d = 0, c = this._handles.length; d < c; d++) {
          this._handles[d].detach();
        }
      }
    },
    doBefore: function(g, d, c) {
      var e = this.get("host"),
        f;
      if (g in e) {
        f = this.beforeHostMethod(g, d, c);
      } else {
        if (e.on) {
          f = this.onHostEvent(g, d, c);
        }
      }
      return f;
    },
    doAfter: function(g, d, c) {
      var e = this.get("host"),
        f;
      if (g in e) {
        f = this.afterHostMethod(g, d, c);
      } else {
        if (e.after) {
          f = this.afterHostEvent(g, d, c);
        }
      }
      return f;
    },
    onHostEvent: function(e, d, c) {
      var f = this.get("host").on(e, d, c || this);
      this._handles.push(f);
      return f;
    },
    afterHostEvent: function(e, d, c) {
      var f = this.get("host").after(e, d, c || this);
      this._handles.push(f);
      return f;
    },
    beforeHostMethod: function(f, d, c) {
      var e = b.Do.before(d, this.get("host"), f, c || this);
      this._handles.push(e);
      return e;
    },
    afterHostMethod: function(f, d, c) {
      var e = b.Do.after(d, this.get("host"), f, c || this);
      this._handles.push(e);
      return e;
    },
    toString: function() {
      return this.constructor.NAME + "[" + this.constructor.NS + "]";
    }
  });
  b.namespace("Plugin").Base = a;
}, "3.4.1", {
  requires: ["base-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-simulate", function(a) {
  (function() {
    var k = a.Lang,
      j = a.Array,
      f = k.isFunction,
      d = k.isString,
      g = k.isBoolean,
      o = k.isObject,
      n = k.isNumber,
      m = a.config.doc,
      p = {
        click: 1,
        dblclick: 1,
        mouseover: 1,
        mouseout: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1
      },
      l = {
        keydown: 1,
        keyup: 1,
        keypress: 1
      },
      c = {
        blur: 1,
        change: 1,
        focus: 1,
        resize: 1,
        scroll: 1,
        select: 1
      },
      e = {
        scroll: 1,
        resize: 1,
        reset: 1,
        submit: 1,
        change: 1,
        select: 1,
        error: 1,
        abort: 1
      };
    a.mix(e, p);
    a.mix(e, l);

    function i(v, z, u, s, B, r, q, A, x, D, C) {
      if (!v) {
        a.error("simulateKeyEvent(): Invalid target.");
      }
      if (d(z)) {
        z = z.toLowerCase();
        switch (z) {
          case "textevent":
            z = "keypress";
            break;
          case "keyup":
          case "keydown":
          case "keypress":
            break;
          default:
            a.error("simulateKeyEvent(): Event type '" + z + "' not supported.");
        }
      } else {
        a.error("simulateKeyEvent(): Event type must be a string.");
      }
      if (!g(u)) {
        u = true;
      }
      if (!g(s)) {
        s = true;
      }
      if (!o(B)) {
        B = window;
      }
      if (!g(r)) {
        r = false;
      }
      if (!g(q)) {
        q = false;
      }
      if (!g(A)) {
        A = false;
      }
      if (!g(x)) {
        x = false;
      }
      if (!n(D)) {
        D = 0;
      }
      if (!n(C)) {
        C = 0;
      }
      var y = null;
      if (f(m.createEvent)) {
        try {
          y = m.createEvent("KeyEvents");
          y.initKeyEvent(z, u, s, B, r, q, A, x, D, C);
        } catch (w) {
          try {
            y = m.createEvent("Events");
          } catch (t) {
            y = m.createEvent("UIEvents");
          } finally {
            y.initEvent(z, u, s);
            y.view = B;
            y.altKey = q;
            y.ctrlKey = r;
            y.shiftKey = A;
            y.metaKey = x;
            y.keyCode = D;
            y.charCode = C;
          }
        }
        v.dispatchEvent(y);
      } else {
        if (o(m.createEventObject)) {
          y = m.createEventObject();
          y.bubbles = u;
          y.cancelable = s;
          y.view = B;
          y.ctrlKey = r;
          y.altKey = q;
          y.shiftKey = A;
          y.metaKey = x;
          y.keyCode = (C > 0) ? C : D;
          v.fireEvent("on" + z, y);
        } else {
          a.error("simulateKeyEvent(): No event simulation framework present.");
        }
      }
    }

    function b(A, F, x, u, G, z, w, v, t, r, s, q, E, C, y, B) {
      if (!A) {
        a.error("simulateMouseEvent(): Invalid target.");
      }
      if (d(F)) {
        F = F.toLowerCase();
        if (!p[F]) {
          a.error("simulateMouseEvent(): Event type '" + F + "' not supported.");
        }
      } else {
        a.error("simulateMouseEvent(): Event type must be a string.");
      }
      if (!g(x)) {
        x = true;
      }
      if (!g(u)) {
        u = (F != "mousemove");
      }
      if (!o(G)) {
        G = window;
      }
      if (!n(z)) {
        z = 1;
      }
      if (!n(w)) {
        w = 0;
      }
      if (!n(v)) {
        v = 0;
      }
      if (!n(t)) {
        t = 0;
      }
      if (!n(r)) {
        r = 0;
      }
      if (!g(s)) {
        s = false;
      }
      if (!g(q)) {
        q = false;
      }
      if (!g(E)) {
        E = false;
      }
      if (!g(C)) {
        C = false;
      }
      if (!n(y)) {
        y = 0;
      }
      B = B || null;
      var D = null;
      if (f(m.createEvent)) {
        D = m.createEvent("MouseEvents");
        if (D.initMouseEvent) {
          D.initMouseEvent(F, x, u, G, z, w, v, t, r, s, q, E, C, y, B);
        } else {
          D = m.createEvent("UIEvents");
          D.initEvent(F, x, u);
          D.view = G;
          D.detail = z;
          D.screenX = w;
          D.screenY = v;
          D.clientX = t;
          D.clientY = r;
          D.ctrlKey = s;
          D.altKey = q;
          D.metaKey = C;
          D.shiftKey = E;
          D.button = y;
          D.relatedTarget = B;
        }
        if (B && !D.relatedTarget) {
          if (F == "mouseout") {
            D.toElement = B;
          } else {
            if (F == "mouseover") {
              D.fromElement = B;
            }
          }
        }
        A.dispatchEvent(D);
      } else {
        if (o(m.createEventObject)) {
          D = m.createEventObject();
          D.bubbles = x;
          D.cancelable = u;
          D.view = G;
          D.detail = z;
          D.screenX = w;
          D.screenY = v;
          D.clientX = t;
          D.clientY = r;
          D.ctrlKey = s;
          D.altKey = q;
          D.metaKey = C;
          D.shiftKey = E;
          switch (y) {
            case 0:
              D.button = 1;
              break;
            case 1:
              D.button = 4;
              break;
            case 2:
              break;
            default:
              D.button = 0;
          }
          D.relatedTarget = B;
          A.fireEvent("on" + F, D);
        } else {
          a.error("simulateMouseEvent(): No event simulation framework present.");
        }
      }
    }

    function h(w, v, s, r, q, u) {
      if (!w) {
        a.error("simulateUIEvent(): Invalid target.");
      }
      if (d(v)) {
        v = v.toLowerCase();
        if (!c[v]) {
          a.error("simulateUIEvent(): Event type '" + v + "' not supported.");
        }
      } else {
        a.error("simulateUIEvent(): Event type must be a string.");
      }
      var t = null;
      if (!g(s)) {
        s = (v in e);
      }
      if (!g(r)) {
        r = (v == "submit");
      }
      if (!o(q)) {
        q = window;
      }
      if (!n(u)) {
        u = 1;
      }
      if (f(m.createEvent)) {
        t = m.createEvent("UIEvents");
        t.initUIEvent(v, s, r, q, u);
        w.dispatchEvent(t);
      } else {
        if (o(m.createEventObject)) {
          t = m.createEventObject();
          t.bubbles = s;
          t.cancelable = r;
          t.view = q;
          t.detail = u;
          w.fireEvent("on" + v, t);
        } else {
          a.error("simulateUIEvent(): No event simulation framework present.");
        }
      }
    }
    a.Event.simulate = function(s, r, q) {
      q = q || {};
      if (p[r]) {
        b(s, r, q.bubbles, q.cancelable, q.view, q.detail, q.screenX, q.screenY, q.clientX, q.clientY, q.ctrlKey, q.altKey, q.shiftKey, q.metaKey, q.button, q.relatedTarget);
      } else {
        if (l[r]) {
          i(s, r, q.bubbles, q.cancelable, q.view, q.ctrlKey, q.altKey, q.shiftKey, q.metaKey, q.keyCode, q.charCode);
        } else {
          if (c[r]) {
            h(s, r, q.bubbles, q.cancelable, q.view, q.detail);
          } else {
            a.error("simulate(): Event '" + r + "' can't be simulated.");
          }
        }
      }
    };
  })();
}, "3.4.1", {
  requires: ["event-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-event-simulate", function(a) {
  a.Node.prototype.simulate = function(c, b) {
    a.Event.simulate(a.Node.getDOMNode(this), c, b);
  };
}, "3.4.1", {
  requires: ["node-base", "event-simulate"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-key", function(g) {
  var e = "+alt",
    c = "+ctrl",
    d = "+meta",
    b = "+shift",
    a = g.Lang.trim,
    f = {
      KEY_MAP: {
        enter: 13,
        esc: 27,
        backspace: 8,
        tab: 9,
        pageup: 33,
        pagedown: 34
      },
      _typeRE: /^(up|down|press):/,
      _keysRE: /^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,
      processArgs: function(m) {
        var p = m.splice(3, 1)[0],
          o = g.Array.hash(p.match(/\+(?:alt|ctrl|meta|shift)\b/g) || []),
          j = {
            type: this._typeRE.test(p) ? RegExp.$1 : null,
            mods: o,
            keys: null
          },
          n = p.replace(this._keysRE, ""),
          k, q, h, l;
        if (n) {
          n = n.split(",");
          j.keys = {};
          for (l = n.length - 1; l >= 0; --l) {
            k = a(n[l]);
            if (!k) {
              continue;
            }
            if (+k == k) {
              j.keys[k] = o;
            } else {
              h = k.toLowerCase();
              if (this.KEY_MAP[h]) {
                j.keys[this.KEY_MAP[h]] = o;
                if (!j.type) {
                  j.type = "down";
                }
              } else {
                q = k.charAt(0).toUpperCase();
                h = h.charAt(0);
                j.keys[q.charCodeAt(0)] = (h !== q && k === q) ? g.merge(o, {
                  "+shift": true
                }) : o;
              }
            }
          }
        }
        if (!j.type) {
          j.type = "press";
        }
        return j;
      },
      on: function(n, k, m, j) {
        var h = k._extra,
          i = "key" + h.type,
          l = h.keys,
          o = (j) ? "delegate" : "on";
        k._detach = n[o](i, function(q) {
          var p = l ? l[q.keyCode] : h.mods;
          if (p && (!p[e] || (p[e] && q.altKey)) && (!p[c] || (p[c] && q.ctrlKey)) && (!p[d] || (p[d] && q.metaKey)) && (!p[b] || (p[b] && q.shiftKey))) {
            m.fire(q);
          }
        }, j);
      },
      detach: function(j, h, i) {
        h._detach.detach();
      }
    };
  f.delegate = f.on;
  f.detachDelegate = f.detach;
  g.Event.define("key", f, true);
}, "3.4.1", {
  requires: ["event-synthetic"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-focusmanager", function(b) {
  var j = "activeDescendant",
    l = "id",
    i = "disabled",
    n = "tabIndex",
    e = "focused",
    a = "focusClass",
    q = "circular",
    c = "UI",
    f = "key",
    g = j + "Change",
    o = "host",
    p = {
      37: true,
      38: true,
      39: true,
      40: true
    },
    m = {
      "a": true,
      "button": true,
      "input": true,
      "object": true
    },
    h = b.Lang,
    k = b.UA,
    d = function() {
      d.superclass.constructor.apply(this, arguments);
    };
  d.ATTRS = {
    focused: {
      value: false,
      readOnly: true
    },
    descendants: {
      getter: function(r) {
        return this.get(o).all(r);
      }
    },
    activeDescendant: {
      setter: function(v) {
        var t = h.isNumber,
          s = b.Attribute.INVALID_VALUE,
          r = this._descendantsMap,
          y = this._descendants,
          x, u, w;
        if (t(v)) {
          x = v;
          u = x;
        } else {
          if ((v instanceof b.Node) && r) {
            x = r[v.get(l)];
            if (t(x)) {
              u = x;
            } else {
              u = s;
            }
          } else {
            u = s;
          }
        }
        if (y) {
          w = y.item(x);
          if (w && w.get("disabled")) {
            u = s;
          }
        }
        return u;
      }
    },
    keys: {
      value: {
        next: null,
        previous: null
      }
    },
    focusClass: {},
    circular: {
      value: true
    }
  };
  b.extend(d, b.Plugin.Base, {
    _stopped: true,
    _descendants: null,
    _descendantsMap: null,
    _focusedNode: null,
    _lastNodeIndex: 0,
    _eventHandlers: null,
    _initDescendants: function() {
      var y = this.get("descendants"),
        r = {},
        w = -1,
        v, u = this.get(j),
        x, s, t = 0;
      if (h.isUndefined(u)) {
        u = -1;
      }
      if (y) {
        v = y.size();
        for (t = 0; t < v; t++) {
          x = y.item(t);
          if (w === -1 && !x.get(i)) {
            w = t;
          }
          if (u < 0 && parseInt(x.getAttribute(n, 2), 10) === 0) {
            u = t;
          }
          if (x) {
            x.set(n, -1);
          }
          s = x.get(l);
          if (!s) {
            s = b.guid();
            x.set(l, s);
          }
          r[s] = t;
        }
        if (u < 0) {
          u = 0;
        }
        x = y.item(u);
        if (!x || x.get(i)) {
          x = y.item(w);
          u = w;
        }
        this._lastNodeIndex = v - 1;
        this._descendants = y;
        this._descendantsMap = r;
        this.set(j, u);
        if (x) {
          x.set(n, 0);
        }
      }
    },
    _isDescendant: function(r) {
      return (r.get(l) in this._descendantsMap);
    },
    _removeFocusClass: function() {
      var s = this._focusedNode,
        t = this.get(a),
        r;
      if (t) {
        r = h.isString(t) ? t : t.className;
      }
      if (s && r) {
        s.removeClass(r);
      }
    },
    _detachKeyHandler: function() {
      var s = this._prevKeyHandler,
        r = this._nextKeyHandler;
      if (s) {
        s.detach();
      }
      if (r) {
        r.detach();
      }
    },
    _preventScroll: function(r) {
      if (p[r.keyCode] && this._isDescendant(r.target)) {
        r.preventDefault();
      }
    },
    _fireClick: function(s) {
      var r = s.target,
        t = r.get("nodeName").toLowerCase();
      if (s.keyCode === 13 && (!m[t] || (t === "a" && !r.getAttribute("href")))) {
        r.simulate("click");
      }
    },
    _attachKeyHandler: function() {
      this._detachKeyHandler();
      var u = this.get("keys.next"),
        s = this.get("keys.previous"),
        t = this.get(o),
        r = this._eventHandlers;
      if (s) {
        this._prevKeyHandler = b.on(f, b.bind(this._focusPrevious, this), t, s);
      }
      if (u) {
        this._nextKeyHandler = b.on(f, b.bind(this._focusNext, this), t, u);
      }
      if (k.opera) {
        r.push(t.on("keypress", this._preventScroll, this));
      }
      if (!k.opera) {
        r.push(t.on("keypress", this._fireClick, this));
      }
    },
    _detachEventHandlers: function() {
      this._detachKeyHandler();
      var r = this._eventHandlers;
      if (r) {
        b.Array.each(r, function(s) {
          s.detach();
        });
        this._eventHandlers = null;
      }
    },
    _attachEventHandlers: function() {
      var u = this._descendants,
        r, s, t;
      if (u && u.size()) {
        r = this._eventHandlers || [];
        s = this.get(o).get("ownerDocument");
        if (r.length === 0) {
          r.push(s.on("focus", this._onDocFocus, this));
          r.push(s.on("mousedown", this._onDocMouseDown, this));
          r.push(this.after("keysChange", this._attachKeyHandler));
          r.push(this.after("descendantsChange", this._initDescendants));
          r.push(this.after(g, this._afterActiveDescendantChange));
          t = this.after("focusedChange", b.bind(function(v) {
            if (v.newVal) {
              this._attachKeyHandler();
              t.detach();
            }
          }, this));
          r.push(t);
        }
        this._eventHandlers = r;
      }
    },
    _onDocMouseDown: function(u) {
      var w = this.get(o),
        r = u.target,
        v = w.contains(r),
        t, s = function(y) {
          var x = false;
          if (!y.compareTo(w)) {
            x = this._isDescendant(y) ? y : s.call(this, y.get("parentNode"));
          }
          return x;
        };
      if (v) {
        t = s.call(this, r);
        if (t) {
          r = t;
        } else {
          if (!t && this.get(e)) {
            this._set(e, false);
            this._onDocFocus(u);
          }
        }
      }
      if (v && this._isDescendant(r)) {
        this.focus(r);
      } else {
        if (k.webkit && this.get(e) && (!v || (v && !this._isDescendant(r)))) {
          this._set(e, false);
          this._onDocFocus(u);
        }
      }
    },
    _onDocFocus: function(w) {
      var u = this._focusTarget || w.target,
        s = this.get(e),
        v = this.get(a),
        t = this._focusedNode,
        r;
      if (this._focusTarget) {
        this._focusTarget = null;
      }
      if (this.get(o).contains(u)) {
        r = this._isDescendant(u);
        if (!s && r) {
          s = true;
        } else {
          if (s && !r) {
            s = false;
          }
        }
      } else {
        s = false;
      }
      if (v) {
        if (t && (!t.compareTo(u) || !s)) {
          this._removeFocusClass();
        }
        if (r && s) {
          if (v.fn) {
            u = v.fn(u);
            u.addClass(v.className);
          } else {
            u.addClass(v);
          }
          this._focusedNode = u;
        }
      }
      this._set(e, s);
    },
    _focusNext: function(s, t) {
      var r = t || this.get(j),
        u;
      if (this._isDescendant(s.target) && (r <= this._lastNodeIndex)) {
        r = r + 1;
        if (r === (this._lastNodeIndex + 1) && this.get(q)) {
          r = 0;
        }
        u = this._descendants.item(r);
        if (u) {
          if (u.get("disabled")) {
            this._focusNext(s, r);
          } else {
            this.focus(r);
          }
        }
      }
      this._preventScroll(s);
    },
    _focusPrevious: function(s, t) {
      var r = t || this.get(j),
        u;
      if (this._isDescendant(s.target) && r >= 0) {
        r = r - 1;
        if (r === -1 && this.get(q)) {
          r = this._lastNodeIndex;
        }
        u = this._descendants.item(r);
        if (u) {
          if (u.get("disabled")) {
            this._focusPrevious(s, r);
          } else {
            this.focus(r);
          }
        }
      }
      this._preventScroll(s);
    },
    _afterActiveDescendantChange: function(r) {
      var s = this._descendants.item(r.prevVal);
      if (s) {
        s.set(n, -1);
      }
      s = this._descendants.item(r.newVal);
      if (s) {
        s.set(n, 0);
      }
    },
    initializer: function(r) {
      this.start();
    },
    destructor: function() {
      this.stop();
      this.get(o).focusManager = null;
    },
    focus: function(r) {
      if (h.isUndefined(r)) {
        r = this.get(j);
      }
      this.set(j, r, {
        src: c
      });
      var s = this._descendants.item(this.get(j));
      if (s) {
        s.focus();
        if (k.opera && s.get("nodeName").toLowerCase() === "button") {
          this._focusTarget = s;
        }
      }
    },
    blur: function() {
      var r;
      if (this.get(e)) {
        r = this._descendants.item(this.get(j));
        if (r) {
          r.blur();
          this._removeFocusClass();
        }
        this._set(e, false, {
          src: c
        });
      }
    },
    start: function() {
      if (this._stopped) {
        this._initDescendants();
        this._attachEventHandlers();
        this._stopped = false;
      }
    },
    stop: function() {
      if (!this._stopped) {
        this._detachEventHandlers();
        this._descendants = null;
        this._focusedNode = null;
        this._lastNodeIndex = 0;
        this._stopped = true;
      }
    },
    refresh: function() {
      this._initDescendants();
      if (!this._eventHandlers) {
        this._attachEventHandlers();
      }
    }
  });
  d.NAME = "nodeFocusManager";
  d.NS = "focusManager";
  b.namespace("Plugin");
  b.Plugin.NodeFocusManager = d;
}, "3.4.1", {
  requires: ["attribute", "node", "plugin", "node-event-simulate", "event-key", "event-focus"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("arraylist", function(e) {
  var d = e.Array,
    c = d.each,
    a;

  function b(f) {
    if (f !== undefined) {
      this._items = e.Lang.isArray(f) ? f : d(f);
    } else {
      this._items = this._items || [];
    }
  }
  a = {
    item: function(f) {
      return this._items[f];
    },
    each: function(g, f) {
      c(this._items, function(j, h) {
        j = this.item(h);
        g.call(f || j, j, h, this);
      }, this);
      return this;
    },
    some: function(g, f) {
      return d.some(this._items, function(j, h) {
        j = this.item(h);
        return g.call(f || j, j, h, this);
      }, this);
    },
    indexOf: function(f) {
      return d.indexOf(this._items, f);
    },
    size: function() {
      return this._items.length;
    },
    isEmpty: function() {
      return !this.size();
    },
    toJSON: function() {
      return this._items;
    }
  };
  a._item = a.item;
  b.prototype = a;
  e.mix(b, {
    addMethod: function(f, g) {
      g = d(g);
      c(g, function(h) {
        f[h] = function() {
          var j = d(arguments, 0, true),
            i = [];
          c(this._items, function(m, l) {
            m = this._item(l);
            var k = m[h].apply(m, j);
            if (k !== undefined && k !== m) {
              i[l] = k;
            }
          }, this);
          return i.length ? i : this;
        };
      });
    }
  });
  e.ArrayList = b;
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-parent", function(e) {
  var c = e.Lang,
    d = "rendered",
    b = "boundingBox";

  function a(f) {
    this.publish("addChild", {
      defaultTargetOnly: true,
      defaultFn: this._defAddChildFn
    });
    this.publish("removeChild", {
      defaultTargetOnly: true,
      defaultFn: this._defRemoveChildFn
    });
    this._items = [];
    var g, h;
    if (f && f.children) {
      g = f.children;
      h = this.after("initializedChange", function(i) {
        this._add(g);
        h.detach();
      });
    }
    e.after(this._renderChildren, this, "renderUI");
    e.after(this._bindUIParent, this, "bindUI");
    this.after("selectionChange", this._afterSelectionChange);
    this.after("selectedChange", this._afterParentSelectedChange);
    this.after("activeDescendantChange", this._afterActiveDescendantChange);
    this._hDestroyChild = this.after("*:destroy", this._afterDestroyChild);
    this.after("*:focusedChange", this._updateActiveDescendant);
  }
  a.ATTRS = {
    defaultChildType: {
      setter: function(h) {
        var f = e.Attribute.INVALID_VALUE,
          g = c.isString(h) ? e[h] : h;
        if (c.isFunction(g)) {
          f = g;
        }
        return f;
      }
    },
    activeDescendant: {
      readOnly: true
    },
    multiple: {
      value: false,
      validator: c.isBoolean,
      writeOnce: true,
      getter: function(g) {
        var f = this.get("root");
        return (f && f != this) ? f.get("multiple") : g;
      }
    },
    selection: {
      readOnly: true,
      setter: "_setSelection",
      getter: function(g) {
        var f = c.isArray(g) ? (new e.ArrayList(g)) : g;
        return f;
      }
    },
    selected: {
      setter: function(g) {
        var f = g;
        if (g === 1 && !this.get("multiple")) {
          f = e.Attribute.INVALID_VALUE;
        }
        return f;
      }
    }
  };
  a.prototype = {
    destructor: function() {
      this._destroyChildren();
    },
    _afterDestroyChild: function(f) {
      var g = f.target;
      if (g.get("parent") == this) {
        g.remove();
      }
    },
    _afterSelectionChange: function(h) {
      if (h.target == this && h.src != this) {
        var f = h.newVal,
          g = 0;
        if (f) {
          g = 2;
          if (e.instanceOf(f, e.ArrayList) && (f.size() === this.size())) {
            g = 1;
          }
        }
        this.set("selected", g, {
          src: this
        });
      }
    },
    _afterActiveDescendantChange: function(g) {
      var f = this.get("parent");
      if (f) {
        f._set("activeDescendant", g.newVal);
      }
    },
    _afterParentSelectedChange: function(f) {
      var g = f.newVal;
      if (this == f.target && f.src != this && (g === 0 || g === 1)) {
        this.each(function(h) {
          h.set("selected", g, {
            src: this
          });
        }, this);
      }
    },
    _setSelection: function(h) {
      var g = null,
        f;
      if (this.get("multiple") && !this.isEmpty()) {
        f = [];
        this.each(function(i) {
          if (i.get("selected") > 0) {
            f.push(i);
          }
        });
        if (f.length > 0) {
          g = f;
        }
      } else {
        if (h.get("selected") > 0) {
          g = h;
        }
      }
      return g;
    },
    _updateSelection: function(g) {
      var h = g.target,
        f;
      if (h.get("parent") == this) {
        if (g.src != "_updateSelection") {
          f = this.get("selection");
          if (!this.get("multiple") && f && g.newVal > 0) {
            f.set("selected", 0, {
              src: "_updateSelection"
            });
          }
          this._set("selection", h);
        }
        if (g.src == this) {
          this._set("selection", h, {
            src: this
          });
        }
      }
    },
    _updateActiveDescendant: function(f) {
      var g = (f.newVal === true) ? f.target : null;
      this._set("activeDescendant", g);
    },
    _createChild: function(f) {
      var k = this.get("defaultChildType"),
        h = f.childType || f.type,
        j, g, i;
      if (h) {
        g = c.isString(h) ? e[h] : h;
      }
      if (c.isFunction(g)) {
        i = g;
      } else {
        if (k) {
          i = k;
        }
      }
      if (i) {
        j = new i(f);
      } else {
        e.error("Could not create a child instance because its constructor is either undefined or invalid.");
      }
      return j;
    },
    _defAddChildFn: function(h) {
      var i = h.child,
        f = h.index,
        g = this._items;
      if (i.get("parent")) {
        i.remove();
      }
      if (c.isNumber(f)) {
        g.splice(f, 0, i);
      } else {
        g.push(i);
      }
      i._set("parent", this);
      i.addTarget(this);
      h.index = i.get("index");
      i.after("selectedChange", e.bind(this._updateSelection, this));
    },
    _defRemoveChildFn: function(h) {
      var i = h.child,
        f = h.index,
        g = this._items;
      if (i.get("focused")) {
        i.set("focused", false);
      }
      if (i.get("selected")) {
        i.set("selected", 0);
      }
      g.splice(f, 1);
      i.removeTarget(this);
      i._oldParent = i.get("parent");
      i._set("parent", null);
    },
    _add: function(j, f) {
      var g, i, h;
      if (c.isArray(j)) {
        g = [];
        e.each(j, function(m, l) {
          i = this._add(m, (f + l));
          if (i) {
            g.push(i);
          }
        }, this);
        if (g.length > 0) {
          h = g;
        }
      } else {
        if (e.instanceOf(j, e.Widget)) {
          i = j;
        } else {
          i = this._createChild(j);
        }
        if (i && this.fire("addChild", {
            child: i,
            index: f
          })) {
          h = i;
        }
      }
      return h;
    },
    add: function() {
      var g = this._add.apply(this, arguments),
        f = g ? (c.isArray(g) ? g : [g]) : [];
      return (new e.ArrayList(f));
    },
    remove: function(f) {
      var h = this._items[f],
        g;
      if (h && this.fire("removeChild", {
          child: h,
          index: f
        })) {
        g = h;
      }
      return g;
    },
    removeAll: function() {
      var f = [],
        g;
      e.each(this._items.concat(), function() {
        g = this.remove(0);
        if (g) {
          f.push(g);
        }
      }, this);
      return (new e.ArrayList(f));
    },
    selectChild: function(f) {
      this.item(f).set("selected", 1);
    },
    selectAll: function() {
      this.set("selected", 1);
    },
    deselectAll: function() {
      this.set("selected", 0);
    },
    _uiAddChild: function(k, f) {
      k.render(f);
      var i = k.get("boundingBox"),
        h, j = k.next(false),
        g;
      if (j && j.get(d)) {
        h = j.get(b);
        h.insert(i, "before");
      } else {
        g = k.previous(false);
        if (g && g.get(d)) {
          h = g.get(b);
          h.insert(i, "after");
        } else {
          if (!f.contains(i)) {
            f.appendChild(i);
          }
        }
      }
    },
    _uiRemoveChild: function(f) {
      f.get("boundingBox").remove();
    },
    _afterAddChild: function(f) {
      var g = f.child;
      if (g.get("parent") == this) {
        this._uiAddChild(g, this._childrenContainer);
      }
    },
    _afterRemoveChild: function(f) {
      var g = f.child;
      if (g._oldParent == this) {
        this._uiRemoveChild(g);
      }
    },
    _bindUIParent: function() {
      this.after("addChild", this._afterAddChild);
      this.after("removeChild", this._afterRemoveChild);
    },
    _renderChildren: function() {
      var f = this._childrenContainer || this.get("contentBox");
      this._childrenContainer = f;
      this.each(function(g) {
        g.render(f);
      });
    },
    _destroyChildren: function() {
      this._hDestroyChild.detach();
      this.each(function(f) {
        f.destroy();
      });
    }
  };
  e.augment(a, e.ArrayList);
  e.WidgetParent = a;
}, "3.4.1", {
  requires: ["base-build", "arraylist", "widget"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-child", function(c) {
  var b = c.Lang;

  function a() {
    c.after(this._syncUIChild, this, "syncUI");
    c.after(this._bindUIChild, this, "bindUI");
  }
  a.ATTRS = {
    selected: {
      value: 0,
      validator: b.isNumber
    },
    index: {
      readOnly: true,
      getter: function() {
        var e = this.get("parent"),
          d = -1;
        if (e) {
          d = e.indexOf(this);
        }
        return d;
      }
    },
    parent: {
      readOnly: true
    },
    depth: {
      readOnly: true,
      getter: function() {
        var e = this.get("parent"),
          d = this.get("root"),
          f = -1;
        while (e) {
          f = (f + 1);
          if (e == d) {
            break;
          }
          e = e.get("parent");
        }
        return f;
      }
    },
    root: {
      readOnly: true,
      getter: function() {
        var d = function(h) {
          var e = h.get("parent"),
            f = h.ROOT_TYPE,
            g = e;
          if (f) {
            g = (e && c.instanceOf(e, f));
          }
          return (g ? d(e) : h);
        };
        return d(this);
      }
    }
  };
  a.prototype = {
    ROOT_TYPE: null,
    _getUIEventNode: function() {
      var d = this.get("root"),
        e;
      if (d) {
        e = d.get("boundingBox");
      }
      return e;
    },
    next: function(f) {
      var e = this.get("parent"),
        d;
      if (e) {
        d = e.item((this.get("index") + 1));
      }
      if (!d && f) {
        d = e.item(0);
      }
      return d;
    },
    previous: function(g) {
      var f = this.get("parent"),
        d = this.get("index"),
        e;
      if (f && d > 0) {
        e = f.item([(d - 1)]);
      }
      if (!e && g) {
        e = f.item((f.size() - 1));
      }
      return e;
    },
    remove: function(d) {
      var e, f;
      if (b.isNumber(d)) {
        f = c.WidgetParent.prototype.remove.apply(this, arguments);
      } else {
        e = this.get("parent");
        if (e) {
          f = e.remove(this.get("index"));
        }
      }
      return f;
    },
    isRoot: function() {
      return (this == this.get("root"));
    },
    ancestor: function(f) {
      var d = this.get("root"),
        e;
      if (this.get("depth") > f) {
        e = this.get("parent");
        while (e != d && e.get("depth") > f) {
          e = e.get("parent");
        }
      }
      return e;
    },
    _uiSetChildSelected: function(e) {
      var f = this.get("boundingBox"),
        d = this.getClassName("selected");
      if (e === 0) {
        f.removeClass(d);
      } else {
        f.addClass(d);
      }
    },
    _afterChildSelectedChange: function(d) {
      this._uiSetChildSelected(d.newVal);
    },
    _syncUIChild: function() {
      this._uiSetChildSelected(this.get("selected"));
    },
    _bindUIChild: function() {
      this.after("selectedChange", this._afterChildSelectedChange);
    }
  };
  c.WidgetChild = a;
}, "3.4.1", {
  requires: ["base-build", "widget"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("tabview", function(f) {
  var a = f.TabviewBase._queries,
    e = f.TabviewBase._classNames,
    g = ".",
    b = f.ClassNameManager.getClassName,
    c = f.Base.create("tabView", f.Widget, [f.WidgetParent], {
      _afterChildAdded: function(h) {
        this.get("contentBox").focusManager.refresh();
      },
      _defListNodeValueFn: function() {
        return f.Node.create(c.LIST_TEMPLATE);
      },
      _defPanelNodeValueFn: function() {
        return f.Node.create(c.PANEL_TEMPLATE);
      },
      _afterChildRemoved: function(k) {
        var h = k.index,
          j = this.get("selection");
        if (!j) {
          j = this.item(h - 1) || this.item(0);
          if (j) {
            j.set("selected", 1);
          }
        }
        this.get("contentBox").focusManager.refresh();
      },
      _initAria: function() {
        var h = this.get("contentBox"),
          i = h.one(a.tabviewList);
        if (i) {
          i.setAttrs({
            role: "tablist"
          });
        }
      },
      bindUI: function() {
        this.get("contentBox").plug(f.Plugin.NodeFocusManager, {
          descendants: g + e.tabLabel,
          keys: {
            next: "down:39",
            previous: "down:37"
          },
          circular: true
        });
        this.after("render", this._setDefSelection);
        this.after("addChild", this._afterChildAdded);
        this.after("removeChild", this._afterChildRemoved);
      },
      renderUI: function() {
        var h = this.get("contentBox");
        this._renderListBox(h);
        this._renderPanelBox(h);
        this._childrenContainer = this.get("listNode");
        this._renderTabs(h);
      },
      _setDefSelection: function(h) {
        var i = this.get("selection") || this.item(0);
        this.some(function(j) {
          if (j.get("selected")) {
            i = j;
            return true;
          }
        });
        if (i) {
          this.set("selection", i);
          i.set("selected", 1);
        }
      },
      _renderListBox: function(h) {
        var i = this.get("listNode");
        if (!i.inDoc()) {
          h.append(i);
        }
      },
      _renderPanelBox: function(h) {
        var i = this.get("panelNode");
        if (!i.inDoc()) {
          h.append(i);
        }
      },
      _renderTabs: function(h) {
        var k = h.all(a.tab),
          i = this.get("panelNode"),
          j = (i) ? this.get("panelNode").get("children") : null,
          l = this;
        if (k) {
          k.addClass(e.tab);
          h.all(a.tabLabel).addClass(e.tabLabel);
          h.all(a.tabPanel).addClass(e.tabPanel);
          k.each(function(o, n) {
            var m = (j) ? j.item(n) : null;
            l.add({
              boundingBox: o,
              contentBox: o.one(g + e.tabLabel),
              label: o.one(g + e.tabLabel).get("text"),
              panelNode: m
            });
          });
        }
      }
    }, {
      LIST_TEMPLATE: '<ul class="' + e.tabviewList + '"></ul>',
      PANEL_TEMPLATE: '<div class="' + e.tabviewPanel + '"></div>',
      ATTRS: {
        defaultChildType: {
          value: "Tab"
        },
        listNode: {
          setter: function(h) {
            h = f.one(h);
            if (h) {
              h.addClass(e.tabviewList);
            }
            return h;
          },
          valueFn: "_defListNodeValueFn"
        },
        panelNode: {
          setter: function(h) {
            h = f.one(h);
            if (h) {
              h.addClass(e.tabviewPanel);
            }
            return h;
          },
          valueFn: "_defPanelNodeValueFn"
        },
        tabIndex: {
          value: null
        }
      },
      HTML_PARSER: {
        listNode: a.tabviewList,
        panelNode: a.tabviewPanel
      }
    });
  f.TabView = c;
  var d = f.Lang,
    a = f.TabviewBase._queries,
    e = f.TabviewBase._classNames,
    b = f.ClassNameManager.getClassName;
  f.Tab = f.Base.create("tab", f.Widget, [f.WidgetChild], {
    BOUNDING_TEMPLATE: '<li class="' + e.tab + '"></li>',
    CONTENT_TEMPLATE: '<a class="' + e.tabLabel + '"></a>',
    PANEL_TEMPLATE: '<div class="' + e.tabPanel + '"></div>',
    _uiSetSelectedPanel: function(h) {
      this.get("panelNode").toggleClass(e.selectedPanel, h);
    },
    _afterTabSelectedChange: function(h) {
      this._uiSetSelectedPanel(h.newVal);
    },
    _afterParentChange: function(h) {
      if (!h.newVal) {
        this._remove();
      } else {
        this._add();
      }
    },
    _initAria: function() {
      var i = this.get("contentBox"),
        j = i.get("id"),
        h = this.get("panelNode");
      if (!j) {
        j = f.guid();
        i.set("id", j);
      }
      i.set("role", "tab");
      i.get("parentNode").set("role", "presentation");
      h.setAttrs({
        role: "tabpanel",
        "aria-labelledby": j
      });
    },
    syncUI: function() {
      this.set("label", this.get("label"));
      this.set("content", this.get("content"));
      this._uiSetSelectedPanel(this.get("selected"));
    },
    bindUI: function() {
      this.after("selectedChange", this._afterTabSelectedChange);
      this.after("parentChange", this._afterParentChange);
    },
    renderUI: function() {
      this._renderPanel();
      this._initAria();
    },
    _renderPanel: function() {
      this.get("parent").get("panelNode").appendChild(this.get("panelNode"));
    },
    _add: function() {
      var i = this.get("parent").get("contentBox"),
        j = i.get("listNode"),
        h = i.get("panelNode");
      if (j) {
        j.appendChild(this.get("boundingBox"));
      }
      if (h) {
        h.appendChild(this.get("panelNode"));
      }
    },
    _remove: function() {
      this.get("boundingBox").remove();
      this.get("panelNode").remove();
    },
    _onActivate: function(h) {
      if (h.target === this) {
        h.domEvent.preventDefault();
        h.target.set("selected", 1);
      }
    },
    initializer: function() {
      this.publish(this.get("triggerEvent"), {
        defaultFn: this._onActivate
      });
    },
    _defLabelSetter: function(h) {
      this.get("contentBox").setContent(h);
      return h;
    },
    _defContentSetter: function(h) {
      this.get("panelNode").setContent(h);
      return h;
    },
    _defContentGetter: function(h) {
      return this.get("panelNode").getContent();
    },
    _defPanelNodeValueFn: function() {
      var i = this.get("contentBox").get("href") || "",
        k = this.get("parent"),
        j = i.indexOf("#"),
        h;
      i = i.substr(j);
      if (i.charAt(0) === "#") {
        h = f.one(i);
        if (h) {
          h.addClass(e.tabPanel);
        }
      }
      if (!h && k) {
        h = k.get("panelNode").get("children").item(this.get("index"));
      }
      if (!h) {
        h = f.Node.create(this.PANEL_TEMPLATE);
      }
      return h;
    }
  }, {
    ATTRS: {
      triggerEvent: {
        value: "click"
      },
      label: {
        setter: "_defLabelSetter",
        validator: d.isString
      },
      content: {
        setter: "_defContentSetter",
        getter: "_defContentGetter"
      },
      panelNode: {
        setter: function(h) {
          h = f.one(h);
          if (h) {
            h.addClass(e.tabPanel);
          }
          return h;
        },
        valueFn: "_defPanelNodeValueFn"
      },
      tabIndex: {
        value: null,
        validator: "_validTabIndex"
      }
    },
    HTML_PARSER: {
      selected: function(h) {
        var i = (this.get("boundingBox").hasClass(e.selectedTab)) ? 1 : 0;
        return i;
      }
    }
  });
}, "3.4.1", {
  requires: ["node-pluginhost", "node-focusmanager", "tabview-base", "widget", "widget-parent", "widget-child"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-base", function(b) {
  var c = "running",
    n = "startTime",
    l = "elapsedTime",
    j = "start",
    i = "tween",
    m = "end",
    d = "node",
    k = "paused",
    o = "reverse",
    h = "iterationCount",
    a = Number;
  var f = {},
    e;
  b.Anim = function() {
    b.Anim.superclass.constructor.apply(this, arguments);
    b.Anim._instances[b.stamp(this)] = this;
  };
  b.Anim.NAME = "anim";
  b.Anim._instances = {};
  b.Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;
  b.Anim.DEFAULT_UNIT = "px";
  b.Anim.DEFAULT_EASING = function(q, p, s, r) {
    return s * q / r + p;
  };
  b.Anim._intervalTime = 20;
  b.Anim.behaviors = {
    left: {
      get: function(q, p) {
        return q._getOffset(p);
      }
    }
  };
  b.Anim.behaviors.top = b.Anim.behaviors.left;
  b.Anim.DEFAULT_SETTER = function(s, t, v, w, y, r, u, x) {
    var q = s._node,
      p = u(y, a(v), a(w) - a(v), r);
    if (t in q._node.style || t in b.DOM.CUSTOM_STYLES) {
      x = x || "";
      q.setStyle(t, p + x);
    } else {
      if (q._node.attributes[t]) {
        q.setAttribute(t, p);
      } else {
        q.set(t, p);
      }
    }
  };
  b.Anim.DEFAULT_GETTER = function(r, p) {
    var q = r._node,
      s = "";
    if (p in q._node.style || p in b.DOM.CUSTOM_STYLES) {
      s = q.getComputedStyle(p);
    } else {
      if (q._node.attributes[p]) {
        s = q.getAttribute(p);
      } else {
        s = q.get(p);
      }
    }
    return s;
  };
  b.Anim.ATTRS = {
    node: {
      setter: function(p) {
        if (p) {
          if (typeof p == "string" || p.nodeType) {
            p = b.one(p);
          }
        }
        this._node = p;
        if (!p) {}
        return p;
      }
    },
    duration: {
      value: 1
    },
    easing: {
      value: b.Anim.DEFAULT_EASING,
      setter: function(p) {
        if (typeof p === "string" && b.Easing) {
          return b.Easing[p];
        }
      }
    },
    from: {},
    to: {},
    startTime: {
      value: 0,
      readOnly: true
    },
    elapsedTime: {
      value: 0,
      readOnly: true
    },
    running: {
      getter: function() {
        return !!f[b.stamp(this)];
      },
      value: false,
      readOnly: true
    },
    iterations: {
      value: 1
    },
    iterationCount: {
      value: 0,
      readOnly: true
    },
    direction: {
      value: "normal"
    },
    paused: {
      readOnly: true,
      value: false
    },
    reverse: {
      value: false
    }
  };
  b.Anim.run = function() {
    var q = b.Anim._instances;
    for (var p in q) {
      if (q[p].run) {
        q[p].run();
      }
    }
  };
  b.Anim.pause = function() {
    for (var p in f) {
      if (f[p].pause) {
        f[p].pause();
      }
    }
    b.Anim._stopTimer();
  };
  b.Anim.stop = function() {
    for (var p in f) {
      if (f[p].stop) {
        f[p].stop();
      }
    }
    b.Anim._stopTimer();
  };
  b.Anim._startTimer = function() {
    if (!e) {
      e = setInterval(b.Anim._runFrame, b.Anim._intervalTime);
    }
  };
  b.Anim._stopTimer = function() {
    clearInterval(e);
    e = 0;
  };
  b.Anim._runFrame = function() {
    var p = true;
    for (var q in f) {
      if (f[q]._runFrame) {
        p = false;
        f[q]._runFrame();
      }
    }
    if (p) {
      b.Anim._stopTimer();
    }
  };
  b.Anim.RE_UNITS = /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;
  var g = {
    run: function() {
      if (this.get(k)) {
        this._resume();
      } else {
        if (!this.get(c)) {
          this._start();
        }
      }
      return this;
    },
    pause: function() {
      if (this.get(c)) {
        this._pause();
      }
      return this;
    },
    stop: function(p) {
      if (this.get(c) || this.get(k)) {
        this._end(p);
      }
      return this;
    },
    _added: false,
    _start: function() {
      this._set(n, new Date() - this.get(l));
      this._actualFrames = 0;
      if (!this.get(k)) {
        this._initAnimAttr();
      }
      f[b.stamp(this)] = this;
      b.Anim._startTimer();
      this.fire(j);
    },
    _pause: function() {
      this._set(n, null);
      this._set(k, true);
      delete f[b.stamp(this)];
      this.fire("pause");
    },
    _resume: function() {
      this._set(k, false);
      f[b.stamp(this)] = this;
      this._set(n, new Date() - this.get(l));
      b.Anim._startTimer();
      this.fire("resume");
    },
    _end: function(p) {
      var q = this.get("duration") * 1000;
      if (p) {
        this._runAttrs(q, q, this.get(o));
      }
      this._set(n, null);
      this._set(l, 0);
      this._set(k, false);
      delete f[b.stamp(this)];
      this.fire(m, {
        elapsed: this.get(l)
      });
    },
    _runFrame: function() {
      var u = this._runtimeAttr.duration,
        r = new Date() - this.get(n),
        q = this.get(o),
        p = (r >= u),
        s, v;
      this._runAttrs(r, u, q);
      this._actualFrames += 1;
      this._set(l, r);
      this.fire(i);
      if (p) {
        this._lastFrame();
      }
    },
    _runAttrs: function(A, z, w) {
      var x = this._runtimeAttr,
        r = b.Anim.behaviors,
        y = x.easing,
        p = z,
        u = false,
        q, s, v;
      if (A >= z) {
        u = true;
      }
      if (w) {
        A = z - A;
        p = 0;
      }
      for (v in x) {
        if (x[v].to) {
          q = x[v];
          s = (v in r && "set" in r[v]) ? r[v].set : b.Anim.DEFAULT_SETTER;
          if (!u) {
            s(this, v, q.from, q.to, A, z, y, q.unit);
          } else {
            s(this, v, q.from, q.to, p, z, y, q.unit);
          }
        }
      }
    },
    _lastFrame: function() {
      var p = this.get("iterations"),
        q = this.get(h);
      q += 1;
      if (p === "infinite" || q < p) {
        if (this.get("direction") === "alternate") {
          this.set(o, !this.get(o));
        }
        this.fire("iteration");
      } else {
        q = 0;
        this._end();
      }
      this._set(n, new Date());
      this._set(h, q);
    },
    _initAnimAttr: function() {
      var w = this.get("from") || {},
        v = this.get("to") || {},
        p = {
          duration: this.get("duration") * 1000,
          easing: this.get("easing")
        },
        r = b.Anim.behaviors,
        u = this.get(d),
        t, s, q;
      b.each(v, function(A, y) {
        if (typeof A === "function") {
          A = A.call(this, u);
        }
        s = w[y];
        if (s === undefined) {
          s = (y in r && "get" in r[y]) ? r[y].get(this, y) : b.Anim.DEFAULT_GETTER(this, y);
        } else {
          if (typeof s === "function") {
            s = s.call(this, u);
          }
        }
        var x = b.Anim.RE_UNITS.exec(s);
        var z = b.Anim.RE_UNITS.exec(A);
        s = x ? x[1] : s;
        q = z ? z[1] : A;
        t = z ? z[2] : x ? x[2] : "";
        if (!t && b.Anim.RE_DEFAULT_UNIT.test(y)) {
          t = b.Anim.DEFAULT_UNIT;
        }
        if (!s || !q) {
          b.error('invalid "from" or "to" for "' + y + '"', "Anim");
          return;
        }
        p[y] = {
          from: s,
          to: q,
          unit: t
        };
      }, this);
      this._runtimeAttr = p;
    },
    _getOffset: function(q) {
      var s = this._node,
        t = s.getComputedStyle(q),
        r = (q === "left") ? "getX" : "getY",
        u = (q === "left") ? "setX" : "setY";
      if (t === "auto") {
        var p = s.getStyle("position");
        if (p === "absolute" || p === "fixed") {
          t = s[r]();
          s[u](t);
        } else {
          t = 0;
        }
      }
      return t;
    },
    destructor: function() {
      delete b.Anim._instances[b.stamp(this)];
    }
  };
  b.extend(b.Anim, b.Base, g);
}, "3.4.1", {
  requires: ["base-base", "node-style"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-color", function(b) {
  var a = Number;
  b.Anim.behaviors.color = {
    set: function(f, d, i, h, c, g, e) {
      i = b.Color.re_RGB.exec(b.Color.toRGB(i));
      h = b.Color.re_RGB.exec(b.Color.toRGB(h));
      if (!i || i.length < 3 || !h || h.length < 3) {
        b.error("invalid from or to passed to color behavior");
      }
      f._node.setStyle(d, "rgb(" + [Math.floor(e(c, a(i[1]), a(h[1]) - a(i[1]), g)), Math.floor(e(c, a(i[2]), a(h[2]) - a(i[2]), g)), Math.floor(e(c, a(i[3]), a(h[3]) - a(i[3]), g))].join(", ") + ")");
    },
    get: function(d, c) {
      var e = d._node.getComputedStyle(c);
      e = (e === "transparent") ? "rgb(255, 255, 255)" : e;
      return e;
    }
  };
  b.each(["backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"], function(c, d) {
    b.Anim.behaviors[c] = b.Anim.behaviors.color;
  });
}, "3.4.1", {
  requires: ["anim-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-xy", function(b) {
  var a = Number;
  b.Anim.behaviors.xy = {
    set: function(f, d, i, h, c, g, e) {
      f._node.setXY([e(c, a(i[0]), a(h[0]) - a(i[0]), g), e(c, a(i[1]), a(h[1]) - a(i[1]), g)]);
    },
    get: function(c) {
      return c._node.getXY();
    }
  };
}, "3.4.1", {
  requires: ["anim-base", "node-screen"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-curve", function(a) {
  a.Anim.behaviors.curve = {
    set: function(f, c, i, h, b, g, e) {
      i = i.slice.call(i);
      h = h.slice.call(h);
      var d = e(b, 0, 100, g) / 100;
      h.unshift(i);
      f._node.setXY(a.Anim.getBezier(h, d));
    },
    get: function(c, b) {
      return c._node.getXY();
    }
  };
  a.Anim.getBezier = function(f, e) {
    var g = f.length;
    var d = [];
    for (var c = 0; c < g; ++c) {
      d[c] = [f[c][0], f[c][1]];
    }
    for (var b = 1; b < g; ++b) {
      for (c = 0; c < g - b; ++c) {
        d[c][0] = (1 - e) * d[c][0] + e * d[parseInt(c + 1, 10)][0];
        d[c][1] = (1 - e) * d[c][1] + e * d[parseInt(c + 1, 10)][1];
      }
    }
    return [d[0][0], d[0][1]];
  };
}, "3.4.1", {
  requires: ["anim-xy"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-easing", function(b) {
  var a = {
    easeNone: function(f, e, h, g) {
      return h * f / g + e;
    },
    easeIn: function(f, e, h, g) {
      return h * (f /= g) * f + e;
    },
    easeOut: function(f, e, h, g) {
      return -h * (f /= g) * (f - 2) + e;
    },
    easeBoth: function(f, e, h, g) {
      if ((f /= g / 2) < 1) {
        return h / 2 * f * f + e;
      }
      return -h / 2 * ((--f) * (f - 2) - 1) + e;
    },
    easeInStrong: function(f, e, h, g) {
      return h * (f /= g) * f * f * f + e;
    },
    easeOutStrong: function(f, e, h, g) {
      return -h * ((f = f / g - 1) * f * f * f - 1) + e;
    },
    easeBothStrong: function(f, e, h, g) {
      if ((f /= g / 2) < 1) {
        return h / 2 * f * f * f * f + e;
      }
      return -h / 2 * ((f -= 2) * f * f * f - 2) + e;
    },
    elasticIn: function(g, e, k, j, f, i) {
      var h;
      if (g === 0) {
        return e;
      }
      if ((g /= j) === 1) {
        return e + k;
      }
      if (!i) {
        i = j * 0.3;
      }
      if (!f || f < Math.abs(k)) {
        f = k;
        h = i / 4;
      } else {
        h = i / (2 * Math.PI) * Math.asin(k / f);
      }
      return -(f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e;
    },
    elasticOut: function(g, e, k, j, f, i) {
      var h;
      if (g === 0) {
        return e;
      }
      if ((g /= j) === 1) {
        return e + k;
      }
      if (!i) {
        i = j * 0.3;
      }
      if (!f || f < Math.abs(k)) {
        f = k;
        h = i / 4;
      } else {
        h = i / (2 * Math.PI) * Math.asin(k / f);
      }
      return f * Math.pow(2, -10 * g) * Math.sin((g * j - h) * (2 * Math.PI) / i) + k + e;
    },
    elasticBoth: function(g, e, k, j, f, i) {
      var h;
      if (g === 0) {
        return e;
      }
      if ((g /= j / 2) === 2) {
        return e + k;
      }
      if (!i) {
        i = j * (0.3 * 1.5);
      }
      if (!f || f < Math.abs(k)) {
        f = k;
        h = i / 4;
      } else {
        h = i / (2 * Math.PI) * Math.asin(k / f);
      }
      if (g < 1) {
        return -0.5 * (f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e;
      }
      return f * Math.pow(2, -10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i) * 0.5 + k + e;
    },
    backIn: function(f, e, i, h, g) {
      if (g === undefined) {
        g = 1.70158;
      }
      if (f === h) {
        f -= 0.001;
      }
      return i * (f /= h) * f * ((g + 1) * f - g) + e;
    },
    backOut: function(f, e, i, h, g) {
      if (typeof g === "undefined") {
        g = 1.70158;
      }
      return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + e;
    },
    backBoth: function(f, e, i, h, g) {
      if (typeof g === "undefined") {
        g = 1.70158;
      }
      if ((f /= h / 2) < 1) {
        return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + e;
      }
      return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + e;
    },
    bounceIn: function(f, e, h, g) {
      return h - b.Easing.bounceOut(g - f, 0, h, g) + e;
    },
    bounceOut: function(f, e, h, g) {
      if ((f /= g) < (1 / 2.75)) {
        return h * (7.5625 * f * f) + e;
      } else {
        if (f < (2 / 2.75)) {
          return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + e;
        } else {
          if (f < (2.5 / 2.75)) {
            return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + e;
          }
        }
      }
      return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + e;
    },
    bounceBoth: function(f, e, h, g) {
      if (f < g / 2) {
        return b.Easing.bounceIn(f * 2, 0, h, g) * 0.5 + e;
      }
      return b.Easing.bounceOut(f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + e;
    }
  };
  b.Easing = a;
}, "3.4.1", {
  requires: ["anim-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-node-plugin", function(b) {
  var a = function(c) {
    c = (c) ? b.merge(c) : {};
    c.node = c.host;
    a.superclass.constructor.apply(this, arguments);
  };
  a.NAME = "nodefx";
  a.NS = "fx";
  b.extend(a, b.Anim);
  b.namespace("Plugin");
  b.Plugin.NodeFX = a;
}, "3.4.1", {
  requires: ["node-pluginhost", "anim-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("anim-scroll", function(b) {
  var a = Number;
  b.Anim.behaviors.scroll = {
    set: function(f, g, i, j, k, e, h) {
      var d = f._node,
        c = ([h(k, a(i[0]), a(j[0]) - a(i[0]), e), h(k, a(i[1]), a(j[1]) - a(i[1]), e)]);
      if (c[0]) {
        d.set("scrollLeft", c[0]);
      }
      if (c[1]) {
        d.set("scrollTop", c[1]);
      }
    },
    get: function(d) {
      var c = d._node;
      return [c.get("scrollLeft"), c.get("scrollTop")];
    }
  };
}, "3.4.1", {
  requires: ["anim-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("intl-base", function(b) {
  var a = /[, ]/;
  b.mix(b.namespace("Intl"), {
    lookupBestLang: function(g, h) {
      var f, j, c, e;

      function d(l) {
        var k;
        for (k = 0; k < h.length; k += 1) {
          if (l.toLowerCase() === h[k].toLowerCase()) {
            return h[k];
          }
        }
      }
      if (b.Lang.isString(g)) {
        g = g.split(a);
      }
      for (f = 0; f < g.length; f += 1) {
        j = g[f];
        if (!j || j === "*") {
          continue;
        }
        while (j.length > 0) {
          c = d(j);
          if (c) {
            return c;
          } else {
            e = j.lastIndexOf("-");
            if (e >= 0) {
              j = j.substring(0, e);
              if (e >= 2 && j.charAt(e - 2) === "-") {
                j = j.substring(0, e - 2);
              }
            } else {
              break;
            }
          }
        }
      }
      return "";
    }
  });
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("intl", function(d) {
  var b = {},
    a = "yuiRootLang",
    e = "yuiActiveLang",
    c = [];
  d.mix(d.namespace("Intl"), {
    _mod: function(f) {
      if (!b[f]) {
        b[f] = {};
      }
      return b[f];
    },
    setLang: function(g, j) {
      var i = this._mod(g),
        f = i[e],
        h = !!i[j];
      if (h && j !== f) {
        i[e] = j;
        this.fire("intl:langChange", {
          module: g,
          prevVal: f,
          newVal: (j === a) ? "" : j
        });
      }
      return h;
    },
    getLang: function(f) {
      var g = this._mod(f)[e];
      return (g === a) ? "" : g;
    },
    add: function(g, h, f) {
      h = h || a;
      this._mod(g)[h] = f;
      this.setLang(g, h);
    },
    get: function(h, g, j) {
      var f = this._mod(h),
        i;
      j = j || f[e];
      i = f[j] || {};
      return (g) ? i[g] : d.merge(i);
    },
    getAvailableLangs: function(h) {
      var f = d.Env._loader,
        g = f && f.moduleInfo[h],
        i = g && g.lang;
      return (i) ? i.concat() : c;
    }
  });
  d.augment(d.Intl, d.EventTarget);
  d.Intl.publish("intl:langChange", {
    emitFacade: true
  });
}, "3.4.1", {
  requires: ["event-custom", "intl-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("json-parse", function(b) {
  function k(e) {
    return (b.config.win || this || {})[e];
  }
  var j = k("JSON"),
    l = (Object.prototype.toString.call(j) === "[object JSON]" && j),
    f = !!l,
    o = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    m = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    d = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    g = /(?:^|:|,)(?:\s*\[)+/g,
    p = /[^\],:{}\s]/,
    n = function(e) {
      return "\\u" + ("0000" + (+(e.charCodeAt(0))).toString(16)).slice(-4);
    },
    c = function(r, e) {
      var q = function(x, u) {
        var t, s, w = x[u];
        if (w && typeof w === "object") {
          for (t in w) {
            if (w.hasOwnProperty(t)) {
              s = q(w, t);
              if (s === undefined) {
                delete w[t];
              } else {
                w[t] = s;
              }
            }
          }
        }
        return e.call(x, u, w);
      };
      return typeof e === "function" ? q({
        "": r
      }, "") : r;
    },
    h = function(q, e) {
      q = q.replace(o, n);
      if (!p.test(q.replace(m, "@").replace(d, "]").replace(g, ""))) {
        return c(eval("(" + q + ")"), e);
      }
      throw new SyntaxError("JSON.parse");
    };
  b.namespace("JSON").parse = function(q, e) {
    if (typeof q !== "string") {
      q += "";
    }
    return l && b.JSON.useNativeParse ? l.parse(q, e) : h(q, e);
  };

  function a(q, e) {
    return q === "ok" ? true : e;
  }
  if (l) {
    try {
      f = (l.parse('{"ok":false}', a)).ok;
    } catch (i) {
      f = false;
    }
  }
  b.JSON.useNativeParse = f;
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("json-stringify", function(b) {
  var j = (b.config.win || {}).JSON,
    N = b.Lang,
    p = N.isFunction,
    I = N.isObject,
    v = N.isArray,
    k = Object.prototype.toString,
    C = (k.call(j) === "[object JSON]" && j),
    F = !!C,
    D = "undefined",
    r = "object",
    A = "null",
    L = "string",
    B = "number",
    x = "boolean",
    l = "date",
    E = {
      "undefined": D,
      "string": L,
      "[object String]": L,
      "number": B,
      "[object Number]": B,
      "boolean": x,
      "[object Boolean]": x,
      "[object Date]": l,
      "[object RegExp]": r
    },
    g = "",
    q = "{",
    a = "}",
    y = "[",
    i = "]",
    s = ",",
    c = ",\n",
    m = "\n",
    G = ":",
    h = ": ",
    u = '"',
    d = /[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    n = [
      [/\\/g, "\\\\"],
      [/\"/g, '\\"'],
      [/\x08/g, "\\b"],
      [/\x09/g, "\\t"],
      [/\x0a/g, "\\n"],
      [/\x0c/g, "\\f"],
      [/\x0d/g, "\\r"]
    ],
    t = n.length,
    f = {},
    o, H;

  function O(P) {
    var e = typeof P;
    return E[e] || E[k.call(P)] || (e === r ? (P ? r : A) : D);
  }

  function K(e) {
    if (!f[e]) {
      f[e] = "\\u" + ("0000" + (+(e.charCodeAt(0))).toString(16)).slice(-4);
      o[e] = 0;
    }
    if (++o[e] === H) {
      n.push([new RegExp(e, "g"), f[e]]);
      t = n.length;
    }
    return f[e];
  }

  function w(Q) {
    var e, P;
    for (e = 0; e < t; e++) {
      P = n[e];
      Q = Q.replace(P[0], P[1]);
    }
    return u + Q.replace(d, K) + u;
  }

  function z(e, P) {
    return e.replace(/^/gm, P);
  }

  function J(P, X, e) {
    if (P === undefined) {
      return undefined;
    }
    var R = p(X) ? X : null,
      W = k.call(e).match(/String|Number/) || [],
      Y = b.JSON.dateToString,
      V = [],
      T, S, U;
    o = {};
    H = b.JSON.charCacheThreshold;
    if (R || !v(X)) {
      X = undefined;
    }
    if (X) {
      T = {};
      for (S = 0, U = X.length; S < U; ++S) {
        T[X[S]] = true;
      }
      X = T;
    }
    e = W[0] === "Number" ? new Array(Math.min(Math.max(0, e), 10) + 1).join(" ") : (e || g).slice(0, 10);

    function Q(ab, ah) {
      var af = ab[ah],
        aj = O(af),
        ae = [],
        ad = e ? h : G,
        ac, aa, ai, Z, ag;
      if (I(af) && p(af.toJSON)) {
        af = af.toJSON(ah);
      } else {
        if (aj === l) {
          af = Y(af);
        }
      }
      if (p(R)) {
        af = R.call(ab, ah, af);
      }
      if (af !== ab[ah]) {
        aj = O(af);
      }
      switch (aj) {
        case l:
        case r:
          break;
        case L:
          return w(af);
        case B:
          return isFinite(af) ? af + g : A;
        case x:
          return af + g;
        case A:
          return A;
        default:
          return undefined;
      }
      for (aa = V.length - 1; aa >= 0; --aa) {
        if (V[aa] === af) {
          throw new Error("JSON.stringify. Cyclical reference");
        }
      }
      ac = v(af);
      V.push(af);
      if (ac) {
        for (aa = af.length - 1; aa >= 0; --aa) {
          ae[aa] = Q(af, aa) || A;
        }
      } else {
        ai = X || af;
        aa = 0;
        for (Z in ai) {
          if (ai.hasOwnProperty(Z)) {
            ag = Q(af, Z);
            if (ag) {
              ae[aa++] = w(Z) + ad + ag;
            }
          }
        }
      }
      V.pop();
      if (e && ae.length) {
        return ac ? y + m + z(ae.join(c), e) + m + i : q + m + z(ae.join(c), e) + m + a;
      } else {
        return ac ? y + ae.join(s) + i : q + ae.join(s) + a;
      }
    }
    return Q({
      "": P
    }, "");
  }
  if (C) {
    try {
      F = ("0" === C.stringify(0));
    } catch (M) {
      F = false;
    }
  }
  b.mix(b.namespace("JSON"), {
    useNativeStringify: F,
    dateToString: function(P) {
      function e(Q) {
        return Q < 10 ? "0" + Q : Q;
      }
      return P.getUTCFullYear() + "-" + e(P.getUTCMonth() + 1) + "-" + e(P.getUTCDate()) + "T" + e(P.getUTCHours()) + G + e(P.getUTCMinutes()) + G + e(P.getUTCSeconds()) + "Z";
    },
    stringify: function(Q, e, P) {
      return C && b.JSON.useNativeStringify ? C.stringify(Q, e, P) : J(Q, e, P);
    },
    charCacheThreshold: 100
  });
}, "3.4.1", {
  requires: ["yui-base"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-resize", function(e) {
  var b = e.Env.evt.dom_wrappers,
    d = e.config.win,
    c = "event:" + e.stamp(d) + "resizenative",
    a;
  e.Event.define("windowresize", {
    on: (e.UA.gecko && e.UA.gecko < 1.91) ? function(h, f, g) {
      f._handle = e.Event._attach(["resize", function(i) {
        g.fire(new e.DOMEventFacade(i, d, b[c]));
      }], {
        facade: false
      });
    } : function(i, g, h) {
      var f = e.config.windowResizeDelay || 100;
      g._handle = e.Event._attach(["resize", function(j) {
        if (g._timer) {
          g._timer.cancel();
        }
        g._timer = e.later(f, e, function() {
          h.fire(new e.DOMEventFacade(j, d, b[c]));
        });
      }], {
        facade: false
      });
    },
    detach: function(g, f) {
      if (f._timer) {
        f._timer.cancel();
      }
      f._handle.detach();
    }
  });
}, "3.4.1", {
  requires: ["event-synthetic"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-ddm", function(a) {
  a.mix(a.DD.DDM, {
    _pg: null,
    _debugShim: false,
    _activateTargets: function() {},
    _deactivateTargets: function() {},
    _startDrag: function() {
      if (this.activeDrag && this.activeDrag.get("useShim")) {
        this._pg_activate();
        this._activateTargets();
      }
    },
    _endDrag: function() {
      this._pg_deactivate();
      this._deactivateTargets();
    },
    _pg_deactivate: function() {
      this._pg.setStyle("display", "none");
    },
    _pg_activate: function() {
      var b = this.activeDrag.get("activeHandle"),
        c = "auto";
      if (b) {
        c = b.getStyle("cursor");
      }
      if (c == "auto") {
        c = this.get("dragCursor");
      }
      this._pg_size();
      this._pg.setStyles({
        top: 0,
        left: 0,
        display: "block",
        opacity: ((this._debugShim) ? ".5" : "0"),
        cursor: c
      });
    },
    _pg_size: function() {
      if (this.activeDrag) {
        var c = a.one("body"),
          e = c.get("docHeight"),
          d = c.get("docWidth");
        this._pg.setStyles({
          height: e + "px",
          width: d + "px"
        });
      }
    },
    _createPG: function() {
      var d = a.Node.create("<div></div>"),
        b = a.one("body"),
        c;
      d.setStyles({
        top: "0",
        left: "0",
        position: "absolute",
        zIndex: "9999",
        overflow: "hidden",
        backgroundColor: "red",
        display: "none",
        height: "5px",
        width: "5px"
      });
      d.set("id", a.stamp(d));
      d.addClass(a.DD.DDM.CSS_PREFIX + "-shim");
      b.prepend(d);
      this._pg = d;
      this._pg.on("mousemove", a.throttle(a.bind(this._move, this), this.get("throttleTime")));
      this._pg.on("mouseup", a.bind(this._end, this));
      c = a.one("win");
      a.on("window:resize", a.bind(this._pg_size, this));
      c.on("scroll", a.bind(this._pg_size, this));
    }
  }, true);
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-ddm-base", "event-resize"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-ddm-drop", function(a) {
  a.mix(a.DD.DDM, {
    _noShim: false,
    _activeShims: [],
    _hasActiveShim: function() {
      if (this._noShim) {
        return true;
      }
      return this._activeShims.length;
    },
    _addActiveShim: function(b) {
      this._activeShims[this._activeShims.length] = b;
    },
    _removeActiveShim: function(c) {
      var b = [];
      a.each(this._activeShims, function(e, d) {
        if (e._yuid !== c._yuid) {
          b[b.length] = e;
        }
      });
      this._activeShims = b;
    },
    syncActiveShims: function(b) {
      a.later(0, this, function(c) {
        var d = ((c) ? this.targets : this._lookup());
        a.each(d, function(f, e) {
          f.sizeShim.call(f);
        }, this);
      }, b);
    },
    mode: 0,
    POINT: 0,
    INTERSECT: 1,
    STRICT: 2,
    useHash: true,
    activeDrop: null,
    validDrops: [],
    otherDrops: {},
    targets: [],
    _addValid: function(b) {
      this.validDrops[this.validDrops.length] = b;
      return this;
    },
    _removeValid: function(b) {
      var c = [];
      a.each(this.validDrops, function(e, d) {
        if (e !== b) {
          c[c.length] = e;
        }
      });
      this.validDrops = c;
      return this;
    },
    isOverTarget: function(c) {
      if (this.activeDrag && c) {
        var g = this.activeDrag.mouseXY,
          f, b = this.activeDrag.get("dragMode"),
          e, d = c.shim;
        if (g && this.activeDrag) {
          e = this.activeDrag.region;
          if (b == this.STRICT) {
            return this.activeDrag.get("dragNode").inRegion(c.region, true, e);
          } else {
            if (c && c.shim) {
              if ((b == this.INTERSECT) && this._noShim) {
                f = ((e) ? e : this.activeDrag.get("node"));
                return c.get("node").intersect(f, c.region).inRegion;
              } else {
                if (this._noShim) {
                  d = c.get("node");
                }
                return d.intersect({
                  top: g[1],
                  bottom: g[1],
                  left: g[0],
                  right: g[0]
                }, c.region).inRegion;
              }
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    clearCache: function() {
      this.validDrops = [];
      this.otherDrops = {};
      this._activeShims = [];
    },
    _activateTargets: function() {
      this._noShim = true;
      this.clearCache();
      a.each(this.targets, function(c, b) {
        c._activateShim([]);
        if (c.get("noShim") == true) {
          this._noShim = false;
        }
      }, this);
      this._handleTargetOver();
    },
    getBestMatch: function(f, d) {
      var c = null,
        e = 0,
        b;
      a.each(f, function(i, h) {
        var g = this.activeDrag.get("dragNode").intersect(i.get("node"));
        i.region.area = g.area;
        if (g.inRegion) {
          if (g.area > e) {
            e = g.area;
            c = i;
          }
        }
      }, this);
      if (d) {
        b = [];
        a.each(f, function(h, g) {
          if (h !== c) {
            b[b.length] = h;
          }
        }, this);
        return [c, b];
      } else {
        return c;
      }
    },
    _deactivateTargets: function() {
      var b = [],
        c, e = this.activeDrag,
        d = this.activeDrop;
      if (e && d && this.otherDrops[d]) {
        if (!e.get("dragMode")) {
          b = this.otherDrops;
          delete b[d];
        } else {
          c = this.getBestMatch(this.otherDrops, true);
          d = c[0];
          b = c[1];
        }
        e.get("node").removeClass(this.CSS_PREFIX + "-drag-over");
        if (d) {
          d.fire("drop:hit", {
            drag: e,
            drop: d,
            others: b
          });
          e.fire("drag:drophit", {
            drag: e,
            drop: d,
            others: b
          });
        }
      } else {
        if (e && e.get("dragging")) {
          e.get("node").removeClass(this.CSS_PREFIX + "-drag-over");
          e.fire("drag:dropmiss", {
            pageX: e.lastXY[0],
            pageY: e.lastXY[1]
          });
        } else {}
      }
      this.activeDrop = null;
      a.each(this.targets, function(g, f) {
        g._deactivateShim([]);
      }, this);
    },
    _dropMove: function() {
      if (this._hasActiveShim()) {
        this._handleTargetOver();
      } else {
        a.each(this.otherDrops, function(c, b) {
          c._handleOut.apply(c, []);
        });
      }
    },
    _lookup: function() {
      if (!this.useHash || this._noShim) {
        return this.validDrops;
      }
      var b = [];
      a.each(this.validDrops, function(d, c) {
        if (d.shim && d.shim.inViewportRegion(false, d.region)) {
          b[b.length] = d;
        }
      });
      return b;
    },
    _handleTargetOver: function() {
      var b = this._lookup();
      a.each(b, function(d, c) {
        d._handleTargetOver.call(d);
      }, this);
    },
    _regTarget: function(b) {
      this.targets[this.targets.length] = b;
    },
    _unregTarget: function(c) {
      var b = [],
        d;
      a.each(this.targets, function(f, e) {
        if (f != c) {
          b[b.length] = f;
        }
      }, this);
      this.targets = b;
      d = [];
      a.each(this.validDrops, function(f, e) {
        if (f !== c) {
          d[d.length] = f;
        }
      });
      this.validDrops = d;
    },
    getDrop: function(c) {
      var b = false,
        d = a.one(c);
      if (d instanceof a.Node) {
        a.each(this.targets, function(f, e) {
          if (d.compareTo(f.get("node"))) {
            b = f;
          }
        });
      }
      return b;
    }
  }, true);
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-ddm"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-proxy", function(h) {
  var f = h.DD.DDM,
    b = "node",
    c = "dragNode",
    a = "host",
    d = true,
    e, g = function(i) {
      g.superclass.constructor.apply(this, arguments);
    };
  g.NAME = "DDProxy";
  g.NS = "proxy";
  g.ATTRS = {
    host: {},
    moveOnEnd: {
      value: d
    },
    hideOnEnd: {
      value: d
    },
    resizeFrame: {
      value: d
    },
    positionProxy: {
      value: d
    },
    borderStyle: {
      value: "1px solid #808080"
    },
    cloneNode: {
      value: false
    }
  };
  e = {
    _hands: null,
    _init: function() {
      if (!f._proxy) {
        f._createFrame();
        h.on("domready", h.bind(this._init, this));
        return;
      }
      if (!this._hands) {
        this._hands = [];
      }
      var k, j, l = this.get(a),
        i = l.get(c);
      if (i.compareTo(l.get(b))) {
        if (f._proxy) {
          l.set(c, f._proxy);
        }
      }
      h.each(this._hands, function(m) {
        m.detach();
      });
      k = f.on("ddm:start", h.bind(function() {
        if (f.activeDrag === l) {
          f._setFrame(l);
        }
      }, this));
      j = f.on("ddm:end", h.bind(function() {
        if (l.get("dragging")) {
          if (this.get("moveOnEnd")) {
            l.get(b).setXY(l.lastXY);
          }
          if (this.get("hideOnEnd")) {
            l.get(c).setStyle("display", "none");
          }
          if (this.get("cloneNode")) {
            l.get(c).remove();
            l.set(c, f._proxy);
          }
        }
      }, this));
      this._hands = [k, j];
    },
    initializer: function() {
      this._init();
    },
    destructor: function() {
      var i = this.get(a);
      h.each(this._hands, function(j) {
        j.detach();
      });
      i.set(c, i.get(b));
    },
    clone: function() {
      var i = this.get(a),
        k = i.get(b),
        j = k.cloneNode(true);
      delete j._yuid;
      j.setAttribute("id", h.guid());
      j.setStyle("position", "absolute");
      k.get("parentNode").appendChild(j);
      i.set(c, j);
      return j;
    }
  };
  h.namespace("Plugin");
  h.extend(g, h.Base, e);
  h.Plugin.DDProxy = g;
  h.mix(f, {
    _createFrame: function() {
      if (!f._proxy) {
        f._proxy = d;
        var j = h.Node.create("<div></div>"),
          i = h.one("body");
        j.setStyles({
          position: "absolute",
          display: "none",
          zIndex: "999",
          top: "-999px",
          left: "-999px"
        });
        i.prepend(j);
        j.set("id", h.guid());
        j.addClass(f.CSS_PREFIX + "-proxy");
        f._proxy = j;
      }
    },
    _setFrame: function(j) {
      var m = j.get(b),
        l = j.get(c),
        i, k = "auto";
      i = f.activeDrag.get("activeHandle");
      if (i) {
        k = i.getStyle("cursor");
      }
      if (k == "auto") {
        k = f.get("dragCursor");
      }
      l.setStyles({
        visibility: "hidden",
        display: "block",
        cursor: k,
        border: j.proxy.get("borderStyle")
      });
      if (j.proxy.get("cloneNode")) {
        l = j.proxy.clone();
      }
      if (j.proxy.get("resizeFrame")) {
        l.setStyles({
          height: m.get("offsetHeight") + "px",
          width: m.get("offsetWidth") + "px"
        });
      }
      if (j.proxy.get("positionProxy")) {
        l.setXY(j.nodeXY);
      }
      l.setStyle("visibility", "visible");
    }
  });
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-drag"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-drop", function(a) {
  var b = "node",
    g = a.DD.DDM,
    f = "offsetHeight",
    c = "offsetWidth",
    i = "drop:over",
    h = "drop:enter",
    d = "drop:exit",
    e = function() {
      this._lazyAddAttrs = false;
      e.superclass.constructor.apply(this, arguments);
      a.on("domready", a.bind(function() {
        a.later(100, this, this._createShim);
      }, this));
      g._regTarget(this);
    };
  e.NAME = "drop";
  e.ATTRS = {
    node: {
      setter: function(j) {
        var k = a.one(j);
        if (!k) {
          a.error("DD.Drop: Invalid Node Given: " + j);
        }
        return k;
      }
    },
    groups: {
      value: ["default"],
      setter: function(j) {
        this._groups = {};
        a.each(j, function(m, l) {
          this._groups[m] = true;
        }, this);
        return j;
      }
    },
    padding: {
      value: "0",
      setter: function(j) {
        return g.cssSizestoObject(j);
      }
    },
    lock: {
      value: false,
      setter: function(j) {
        if (j) {
          this.get(b).addClass(g.CSS_PREFIX + "-drop-locked");
        } else {
          this.get(b).removeClass(g.CSS_PREFIX + "-drop-locked");
        }
        return j;
      }
    },
    bubbles: {
      setter: function(j) {
        this.addTarget(j);
        return j;
      }
    },
    useShim: {
      value: true,
      setter: function(j) {
        a.DD.DDM._noShim = !j;
        return j;
      }
    }
  };
  a.extend(e, a.Base, {
    _bubbleTargets: a.DD.DDM,
    addToGroup: function(j) {
      this._groups[j] = true;
      return this;
    },
    removeFromGroup: function(j) {
      delete this._groups[j];
      return this;
    },
    _createEvents: function() {
      var j = [i, h, d, "drop:hit"];
      a.each(j, function(m, l) {
        this.publish(m, {
          type: m,
          emitFacade: true,
          preventable: false,
          bubbles: true,
          queuable: false,
          prefix: "drop"
        });
      }, this);
    },
    _valid: null,
    _groups: null,
    shim: null,
    region: null,
    overTarget: null,
    inGroup: function(j) {
      this._valid = false;
      var k = false;
      a.each(j, function(m, l) {
        if (this._groups[m]) {
          k = true;
          this._valid = true;
        }
      }, this);
      return k;
    },
    initializer: function(j) {
      a.later(100, this, this._createEvents);
      var k = this.get(b),
        l;
      if (!k.get("id")) {
        l = a.stamp(k);
        k.set("id", l);
      }
      k.addClass(g.CSS_PREFIX + "-drop");
      this.set("groups", this.get("groups"));
    },
    destructor: function() {
      g._unregTarget(this);
      if (this.shim && (this.shim !== this.get(b))) {
        this.shim.detachAll();
        this.shim.remove();
        this.shim = null;
      }
      this.get(b).removeClass(g.CSS_PREFIX + "-drop");
      this.detachAll();
    },
    _deactivateShim: function() {
      if (!this.shim) {
        return false;
      }
      this.get(b).removeClass(g.CSS_PREFIX + "-drop-active-valid");
      this.get(b).removeClass(g.CSS_PREFIX + "-drop-active-invalid");
      this.get(b).removeClass(g.CSS_PREFIX + "-drop-over");
      if (this.get("useShim")) {
        this.shim.setStyles({
          top: "-999px",
          left: "-999px",
          zIndex: "1"
        });
      }
      this.overTarget = false;
    },
    _activateShim: function() {
      if (!g.activeDrag) {
        return false;
      }
      if (this.get(b) === g.activeDrag.get(b)) {
        return false;
      }
      if (this.get("lock")) {
        return false;
      }
      var j = this.get(b);
      if (this.inGroup(g.activeDrag.get("groups"))) {
        j.removeClass(g.CSS_PREFIX + "-drop-active-invalid");
        j.addClass(g.CSS_PREFIX + "-drop-active-valid");
        g._addValid(this);
        this.overTarget = false;
        if (!this.get("useShim")) {
          this.shim = this.get(b);
        }
        this.sizeShim();
      } else {
        g._removeValid(this);
        j.removeClass(g.CSS_PREFIX + "-drop-active-valid");
        j.addClass(g.CSS_PREFIX + "-drop-active-invalid");
      }
    },
    sizeShim: function() {
      if (!g.activeDrag) {
        return false;
      }
      if (this.get(b) === g.activeDrag.get(b)) {
        return false;
      }
      if (this.get("lock")) {
        return false;
      }
      if (!this.shim) {
        a.later(100, this, this.sizeShim);
        return false;
      }
      var o = this.get(b),
        m = o.get(f),
        k = o.get(c),
        r = o.getXY(),
        q = this.get("padding"),
        j, n, l;
      k = k + q.left + q.right;
      m = m + q.top + q.bottom;
      r[0] = r[0] - q.left;
      r[1] = r[1] - q.top;
      if (g.activeDrag.get("dragMode") === g.INTERSECT) {
        j = g.activeDrag;
        n = j.get(b).get(f);
        l = j.get(b).get(c);
        m = (m + n);
        k = (k + l);
        r[0] = r[0] - (l - j.deltaXY[0]);
        r[1] = r[1] - (n - j.deltaXY[1]);
      }
      if (this.get("useShim")) {
        this.shim.setStyles({
          height: m + "px",
          width: k + "px",
          top: r[1] + "px",
          left: r[0] + "px"
        });
      }
      this.region = {
        "0": r[0],
        "1": r[1],
        area: 0,
        top: r[1],
        right: r[0] + k,
        bottom: r[1] + m,
        left: r[0]
      };
    },
    _createShim: function() {
      if (!g._pg) {
        a.later(10, this, this._createShim);
        return;
      }
      if (this.shim) {
        return;
      }
      var j = this.get("node");
      if (this.get("useShim")) {
        j = a.Node.create('<div id="' + this.get(b).get("id") + '_shim"></div>');
        j.setStyles({
          height: this.get(b).get(f) + "px",
          width: this.get(b).get(c) + "px",
          backgroundColor: "yellow",
          opacity: ".5",
          zIndex: "1",
          overflow: "hidden",
          top: "-900px",
          left: "-900px",
          position: "absolute"
        });
        g._pg.appendChild(j);
        j.on("mouseover", a.bind(this._handleOverEvent, this));
        j.on("mouseout", a.bind(this._handleOutEvent, this));
      }
      this.shim = j;
    },
    _handleTargetOver: function() {
      if (g.isOverTarget(this)) {
        this.get(b).addClass(g.CSS_PREFIX + "-drop-over");
        g.activeDrop = this;
        g.otherDrops[this] = this;
        if (this.overTarget) {
          g.activeDrag.fire("drag:over", {
            drop: this,
            drag: g.activeDrag
          });
          this.fire(i, {
            drop: this,
            drag: g.activeDrag
          });
        } else {
          if (g.activeDrag.get("dragging")) {
            this.overTarget = true;
            this.fire(h, {
              drop: this,
              drag: g.activeDrag
            });
            g.activeDrag.fire("drag:enter", {
              drop: this,
              drag: g.activeDrag
            });
            g.activeDrag.get(b).addClass(g.CSS_PREFIX + "-drag-over");
          }
        }
      } else {
        this._handleOut();
      }
    },
    _handleOverEvent: function() {
      this.shim.setStyle("zIndex", "999");
      g._addActiveShim(this);
    },
    _handleOutEvent: function() {
      this.shim.setStyle("zIndex", "1");
      g._removeActiveShim(this);
    },
    _handleOut: function(j) {
      if (!g.isOverTarget(this) || j) {
        if (this.overTarget) {
          this.overTarget = false;
          if (!j) {
            g._removeActiveShim(this);
          }
          if (g.activeDrag) {
            this.get(b).removeClass(g.CSS_PREFIX + "-drop-over");
            g.activeDrag.get(b).removeClass(g.CSS_PREFIX + "-drag-over");
            this.fire(d);
            g.activeDrag.fire("drag:exit", {
              drop: this
            });
            delete g.otherDrops[this];
          }
        }
      }
    }
  });
  a.DD.Drop = e;
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-ddm-drop", "dd-drag"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-mouseenter", function(f) {
  var b = f.Env.evt.dom_wrappers,
    d = f.DOM.contains,
    c = f.Array,
    e = function() {},
    a = {
      proxyType: "mouseover",
      relProperty: "fromElement",
      _notify: function(k, i, h) {
        var g = this._node,
          j = k.relatedTarget || k[i];
        if (g !== j && !d(g, j)) {
          h.fire(new f.DOMEventFacade(k, g, b["event:" + f.stamp(g) + k.type]));
        }
      },
      on: function(k, i, j) {
        var h = f.Node.getDOMNode(k),
          g = [this.proxyType, this._notify, h, null, this.relProperty, j];
        i.handle = f.Event._attach(g, {
          facade: false
        });
      },
      detach: function(h, g) {
        g.handle.detach();
      },
      delegate: function(l, j, k, i) {
        var h = f.Node.getDOMNode(l),
          g = [this.proxyType, e, h, null, k];
        j.handle = f.Event._attach(g, {
          facade: false
        });
        j.handle.sub.filter = i;
        j.handle.sub.relProperty = this.relProperty;
        j.handle.sub._notify = this._filterNotify;
      },
      _filterNotify: function(j, p, g) {
        p = p.slice();
        if (this.args) {
          p.push.apply(p, this.args);
        }
        var h = f.delegate._applyFilter(this.filter, p, g),
          q = p[0].relatedTarget || p[0][this.relProperty],
          o, k, m, n, l;
        if (h) {
          h = c(h);
          for (k = 0, m = h.length && (!o || !o.stopped); k < m; ++k) {
            l = h[0];
            if (!d(l, q)) {
              if (!o) {
                o = new f.DOMEventFacade(p[0], l, g);
                o.container = f.one(g.el);
              }
              o.currentTarget = f.one(l);
              n = p[1].fire(o);
              if (n === false) {
                break;
              }
            }
          }
        }
        return n;
      },
      detachDelegate: function(h, g) {
        g.handle.detach();
      }
    };
  f.Event.define("mouseenter", a, true);
  f.Event.define("mouseleave", f.merge(a, {
    proxyType: "mouseout",
    relProperty: "toElement"
  }), true);
}, "3.4.1", {
  requires: ["event-synthetic"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-drop-plugin", function(a) {
  var b = function(c) {
    c.node = c.host;
    b.superclass.constructor.apply(this, arguments);
  };
  b.NAME = "dd-drop-plugin";
  b.NS = "drop";
  a.extend(b, a.DD.Drop);
  a.namespace("Plugin");
  a.Plugin.Drop = b;
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-drop"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dd-delegate", function(e) {
  var d = function(f) {
      d.superclass.constructor.apply(this, arguments);
    },
    c = "container",
    b = "nodes",
    a = e.Node.create("<div>Temp Node</div>");
  e.extend(d, e.Base, {
    _bubbleTargets: e.DD.DDM,
    dd: null,
    _shimState: null,
    _handles: null,
    _onNodeChange: function(f) {
      this.set("dragNode", f.newVal);
    },
    _afterDragEnd: function(f) {
      e.DD.DDM._noShim = this._shimState;
      this.set("lastNode", this.dd.get("node"));
      this.get("lastNode").removeClass(e.DD.DDM.CSS_PREFIX + "-dragging");
      this.dd._unprep();
      this.dd.set("node", a);
    },
    _delMouseDown: function(h) {
      var g = h.currentTarget,
        f = this.dd;
      if (g.test(this.get(b)) && !g.test(this.get("invalid"))) {
        this._shimState = e.DD.DDM._noShim;
        e.DD.DDM._noShim = true;
        this.set("currentNode", g);
        f.set("node", g);
        if (f.proxy) {
          f.set("dragNode", e.DD.DDM._proxy);
        } else {
          f.set("dragNode", g);
        }
        f._prep();
        f.fire("drag:mouseDown", {
          ev: h
        });
      }
    },
    _onMouseEnter: function(f) {
      this._shimState = e.DD.DDM._noShim;
      e.DD.DDM._noShim = true;
    },
    _onMouseLeave: function(f) {
      e.DD.DDM._noShim = this._shimState;
    },
    initializer: function(g) {
      this._handles = [];
      var h = this.get("dragConfig") || {},
        f = this.get(c);
      h.node = a.cloneNode(true);
      h.bubbleTargets = this;
      if (this.get("handles")) {
        h.handles = this.get("handles");
      }
      this.dd = new e.DD.Drag(h);
      this.dd.after("drag:end", e.bind(this._afterDragEnd, this));
      this.dd.on("dragNodeChange", e.bind(this._onNodeChange, this));
      this.dd.after("drag:mouseup", function() {
        this._unprep();
      });
      this._handles.push(e.delegate(e.DD.Drag.START_EVENT, e.bind(this._delMouseDown, this), f, this.get(b)));
      this._handles.push(e.on("mouseenter", e.bind(this._onMouseEnter, this), f));
      this._handles.push(e.on("mouseleave", e.bind(this._onMouseLeave, this), f));
      e.later(50, this, this.syncTargets);
      e.DD.DDM.regDelegate(this);
    },
    syncTargets: function() {
      if (!e.Plugin.Drop || this.get("destroyed")) {
        return;
      }
      var g, f, h;
      if (this.get("target")) {
        g = e.one(this.get(c)).all(this.get(b));
        f = this.dd.get("groups");
        h = this.get("dragConfig");
        if (h && "groups" in h) {
          f = h.groups;
        }
        g.each(function(j) {
          this.createDrop(j, f);
        }, this);
      }
      return this;
    },
    createDrop: function(h, f) {
      var g = {
        useShim: false,
        bubbleTargets: this
      };
      if (!h.drop) {
        h.plug(e.Plugin.Drop, g);
      }
      h.drop.set("groups", f);
      return h;
    },
    destructor: function() {
      if (this.dd) {
        this.dd.destroy();
      }
      if (e.Plugin.Drop) {
        var f = e.one(this.get(c)).all(this.get(b));
        f.unplug(e.Plugin.Drop);
      }
      e.each(this._handles, function(g) {
        g.detach();
      });
    }
  }, {
    NAME: "delegate",
    ATTRS: {
      container: {
        value: "body"
      },
      nodes: {
        value: ".dd-draggable"
      },
      invalid: {
        value: "input, select, button, a, textarea"
      },
      lastNode: {
        value: a
      },
      currentNode: {
        value: a
      },
      dragNode: {
        value: a
      },
      over: {
        value: false
      },
      target: {
        value: false
      },
      dragConfig: {
        value: null
      },
      handles: {
        value: null
      }
    }
  });
  e.mix(e.DD.DDM, {
    _delegates: [],
    regDelegate: function(f) {
      this._delegates.push(f);
    },
    getDelegate: function(g) {
      var f = null;
      g = e.one(g);
      e.each(this._delegates, function(h) {
        if (g.test(h.get(c))) {
          f = h;
        }
      }, this);
      return f;
    }
  });
  e.namespace("DD");
  e.DD.Delegate = d;
}, "3.4.1", {
  skinnable: false,
  requires: ["dd-drag", "event-mouseenter", "dd-drop-plugin"]
});
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-touch", function(d) {
  var c = "scale",
    a = "rotation",
    b = "identifier";
  d.DOMEventFacade.prototype._touch = function(n, m, o) {
    var g, f, h, k, j;
    if (n.touches) {
      this.touches = [];
      j = {};
      for (g = 0, f = n.touches.length; g < f; ++g) {
        k = n.touches[g];
        j[d.stamp(k)] = this.touches[g] = new d.DOMEventFacade(k, m, o);
      }
    }
    if (n.targetTouches) {
      this.targetTouches = [];
      for (g = 0, f = n.targetTouches.length; g < f; ++g) {
        k = n.targetTouches[g];
        h = j && j[d.stamp(k, true)];
        this.targetTouches[g] = h || new d.DOMEventFacade(k, m, o);
      }
    }
    if (n.changedTouches) {
      this.changedTouches = [];
      for (g = 0, f = n.changedTouches.length; g < f; ++g) {
        k = n.changedTouches[g];
        h = j && j[d.stamp(k, true)];
        this.changedTouches[g] = h || new d.DOMEventFacade(k, m, o);
      }
    }
    if (c in n) {
      this[c] = n[c];
    }
    if (a in n) {
      this[a] = n[a];
    }
    if (b in n) {
      this[b] = n[b];
    }
  };
  if (d.Node.DOM_EVENTS) {
    d.mix(d.Node.DOM_EVENTS, {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,
      touchcancel: 1,
      gesturestart: 1,
      gesturechange: 1,
      gestureend: 1
    });
  }
}, "3.4.1", {
  requires: ["node-base"]
});
YUI.add("breakout", function(c) {
  function b(f, e, d) {
    return Math.max(Math.min(f, d), e)
  }

  function a(d) {
    var f = d.rows,
      e = d.columns;
    this._host = d.host;
    this._container = c.Node.create("<div style='position: absolute'>");
    this._nodes = [];
    if (!(f || e)) {
      f = 8
    }
    this._rows = f;
    this._columns = e;
    a.superclass.constructor.apply(this, arguments)
  }
  a.NS = "breakout";
  a.Name = "Breakout";
  c.extend(a, c.Plugin.Base, {
    _splitNode: function() {
      var d, i, k, j, g = Math.round(this._blockWidth),
        m = Math.round(this._blockHeight),
        q = this._rows,
        h = this._columns,
        l = this._host.getXY(),
        n, f = this._container,
        e = this._nodes = [],
        p, o = c.Node.create('<div style="width: ' + g + "px; height: " + m + 'px; position: absolute; overflow: hidden">');
      f.setXY(l);
      for (d = 0; d < q; d++) {
        e[d] = p = [];
        j = d * m;
        for (i = 0; i < h; i++) {
          k = i * g;
          n = this._host.cloneNode(true);
          p[i] = o.cloneNode().setXY([k, j]).append(n.setXY([-k, -j]));
          f.append(p[i])
        }
      }
      this._swapIn()
    },
    _swapIn: function() {
      this._host.get("parentNode").append(this._container);
      this._host.setStyle("visibility", "hidden")
    },
    _setup: function() {
      if (this._nodes.length) {
        return
      }
      var g = this._host,
        f = parseFloat(g.getComputedStyle("width")),
        d = parseFloat(g.getComputedStyle("height")),
        i, j, h = this._rows,
        e = this._columns;
      if (h) {
        j = d / h
      }
      if (e) {
        i = f / e
      }
      if (!h) {
        j = i;
        h = d / j
      }
      if (!e) {
        i = j;
        e = f / i
      }
      this._container.setStyles({
        width: f,
        height: d
      });
      this._width = f;
      this._height = d;
      this._blockWidth = i;
      this._blockHeight = j;
      this._rows = h;
      this._columns = e;
      this._splitNode()
    },
    _forEach: function(o, p) {
      this._setup();
      this._swapIn();
      var d, l, n = this._rows,
        g = this._columns,
        p = p || {},
        f = Math.abs(p.random || 0),
        j = 0,
        h, m, i, e = this._container,
        k = this;
      p.crop && e.setStyle("overflow", "hidden");
      for (d = 0; d < n; d++) {
        for (l = 0; l < g; l++) {
          j++;
          m = this._nodes[d][l];
          h = o.call(this, m, d, l, n, g);
          i = d + l;
          if (p.reverse) {
            i = n + g - i
          }
          h.animation.on("end", function() {
            j--;
            if (!j) {
              k._container.remove();
              p.unhide && k._host.setStyle("visibility", "visible");
              p.crop && e.setStyle("overflow", "visible");
              k.fire("end")
            }
          });
          (function(q) {
            var s = 1 - (Math.random() * f),
              r;
            if (p.fade) {
              r = p.unhide ? 0 : 1;
              c.mix(q.animation.get("from"), {
                opacity: r
              });
              c.mix(q.animation.get("to"), {
                opacity: 1 - r
              })
            } else {
              m.setStyle("opacity", 1)
            }
            setTimeout(function() {
              q.animation.run()
            }, q.interval * i * s)
          })(h)
        }
      }
    },
    explode: function(d) {
      d = d || {};
      if (!("fade" in d)) {
        d.fade = true
      }
      var e = Math.abs(d.random || 0);
      this._forEach(function(i, p, j, q, k) {
        var g = (d.distance || 1.5) * 2,
          l = d.duration || 1000,
          m = d.easing || c.Easing.easeOutStrong,
          h = 1 - (Math.random() * e),
          f = {
            x: (k - 1) / 2,
            y: (q - 1) / 2
          },
          o = {
            x: j - f.x,
            y: p - f.y
          },
          n;
        g *= h;
        n = {
          left: (o.x * g + f.x) * this._blockWidth,
          top: (o.y * g + f.y) * this._blockHeight
        };
        if (d.unhide) {
          i.setStyles(n);
          n = {
            left: j * this._blockWidth,
            top: p * this._blockHeight
          }
        }
        anim = new c.Anim({
          node: i,
          easing: m,
          to: n,
          duration: l / 1000
        });
        return {
          animation: anim,
          interval: 0
        }
      }, d)
    },
    sheer: function(e) {
      e = e || {};
      var h = e.distance || 1,
        f = e.duration || 1000,
        d = e.interval || 0,
        g = e.easing || c.Easing.easeIn;
      this._forEach(function(j, r, k, s, l) {
        var p = !(k % 2),
          m = !(r % 2),
          i = this._width,
          q = this._height,
          o = {
            left: k * this._blockWidth,
            top: r * this._blockHeight
          },
          n = {};
        if (l === 1) {
          p = m
        }
        if (s === 1) {
          m = !p
        }
        if (p) {
          if (m) {
            n.left = o.left - h * i
          } else {
            n.top = o.top + h * q
          }
        } else {
          if (m) {
            n.top = o.top - h * q
          } else {
            n.left = o.left + h * i
          }
        }
        if (e.unhide) {
          n = o
        }
        anim = new c.Anim({
          node: j,
          easing: g,
          to: n,
          duration: f / 1000
        });
        return {
          animation: anim,
          interval: d
        }
      }, e)
    },
    pinwheel: function(d) {
      d = d || {};
      var g = d.distance || 1,
        e = d.duration || 1000,
        f = d.easing || c.Easing.easeOut;
      this._forEach(function(j, r, k, s, l) {
        var p = !(k % 2),
          m = !(r % 2),
          i = 0,
          h = this._blockWidth,
          q = this._blockHeight,
          o = {
            left: k * h,
            top: r * q,
            width: h,
            height: q
          },
          n = {};
        if (p) {
          if (m) {
            n.top = o.top + g * q
          } else {
            n.left = o.left + g * h
          }
        }
        if (p === m) {
          n.height = q * (1 - g)
        } else {
          n.width = h * (1 - g)
        }
        if (d.unhide) {
          n = o
        }
        anim = new c.Anim({
          node: j,
          easing: f,
          to: n,
          duration: e / 1000
        });
        return {
          animation: anim,
          interval: i
        }
      }, d)
    },
    disintegrate: function(d) {
      d = d || {};
      d.reverse = true;
      this._forEach(function(g, n, h, o, i) {
        var e = (d.distance || 1.5) * this._height,
          k = d.duration || 1000,
          l = d.easing || c.Easing.easeBoth,
          f = k / (o + i) * 2,
          m = n * this._blockHeight,
          j;
        if (e < 0) {
          n = o - n - 1
        }
        if (d.unhide) {
          g.setStyle("top", m - e)
        } else {
          m += e
        }
        j = new c.Anim({
          node: g,
          easing: l,
          to: {
            top: m
          },
          duration: k / 1000
        });
        return {
          animation: j,
          interval: f
        }
      }, d)
    },
    fadeOut: function(d) {
      d = d || {};
      d.fade = true;
      this._forEach(function(f, l, g, m, h) {
        var j = d.duration || 700,
          n = d.unhide ? 0 : 1,
          k = d.easing,
          e, i;
        if (!k) {
          k = d.unhide ? c.Easing.easeOut : c.Easing.easeInStrong
        }
        e = j / (m + h) * 2;
        i = new c.Anim({
          node: f,
          easing: k,
          from: {},
          to: {},
          duration: j / 1000
        });
        return {
          animation: i,
          interval: e
        }
      }, d)
    },
    _inverse: function(e, d) {
      d = d || {};
      d.unhide = true;
      e.call(this, d)
    },
    unsheer: function(d) {
      this._inverse(this.sheer, d)
    },
    unpinwheel: function(d) {
      this._inverse(this.pinwheel, d)
    },
    converge: function(d) {
      this._inverse(this.explode, d)
    },
    fadeIn: function(d) {
      this._inverse(this.fadeOut, d)
    },
    build: function(d) {
      this._inverse(this.disintegrate, d)
    }
  });
  c.Breakout = a
}, "1.0", {
  requires: ["plugin", "anim"]
});
YUI.add("save-manager", function(b) {
  var a = b.Solitaire;
  SaveManager = b.namespace("Solitaire.SaveManager");
  b.mix(SaveManager, {
    nameKey: "current-game",
    serializedKey: "saved-game",
    save: function(c, e, d) {
      e = e || "";
      c = c || "";
      localStorage[this.nameKey] = c;
      localStorage[d || this.serializedKey] = e
    },
    clear: function(c) {
      localStorage[this.serializedKey || c] = ""
    },
    getSavedGame: function(e) {
      var c = localStorage[this.nameKey],
        f = localStorage[e || this.serializedKey],
        d = false;
      if (!c) {
        c = b.Cookie.get("options");
        d = true
      }
      if (!f) {
        f = b.Cookie.get("saved-game") || b.Cookie.get("initial-game");
        d = true
      }
      if (d) {
        this.save(c, f);
        this.removeCookies()
      }
      return {
        name: c || "",
        serialized: f || ""
      }
    },
    removeCookies: function() {
      b.Cookie.remove("options");
      b.Cookie.remove("saved-game");
      b.Cookie.remove("initial-game")
    }
  })
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("analytics", function(f) {
  var c = f.Solitaire,
    b = f.namespace("Solitaire.Analytics"),
    a = 5,
    d = 0,
    e, g = 0;
  f.on("beforeSetup", function() {
    var h = g;
    g = new Date().getTime();
    if (h) {
      b.track("Games", "Played", e, g - h)
    }
    d = 0;
    e = c.game.name()
  });
  f.on("win", function() {
    var h = new Date().getTime();
    b.track("Games", "Won", c.game.name(), h - g, true);
    b.track("Games", "Played", c.game.name(), h - g, true);
    g = 0
  });
  f.on("endTurn", function() {
    d++;
    if (d === a) {
      b.track("Games", "New", c.game.name())
    }
  });
  f.on("popup", function(h) {
    b.track("Menus", "Show", h)
  });
  f.mix(b, {
    track: function(j, i, h, l, k) {
      if (typeof _gaq === "undefined") {
        return
      }
      _gaq.push(["_trackEvent", j, i, h, l, k])
    }
  })
}, "1.0.0", {
  requires: ["solitaire"]
});
YUI.add("ads", function(Y) {
  function writer(adContainer) {
    var buffer = "",
      container = document.createElement("div");
    return function(str) {
      var last, element, content;
      buffer += str;
      last = str[str.length - 1];
      if (last !== "\n" && last !== ">") {
        return
      }
      container.innerHTML = buffer;
      element = container.childNodes[0];
      if (!element) {
        return
      }
      if (element.nodeName === "SCRIPT") {
        if (element.src !== "") {
          loadScript(element.src, adContainer)
        } else {
          content = element.childNodes[0].nodeValue;
          content = content.match(/[^<!\-\/]+/)[0];
          eval(content)
        }
      } else {
        adContainer.appendChild(element)
      }
      buffer = ""
    }
  }

  function loadScript(url, container, callback) {
    var script = document.createElement("script");
    script.onload = function() {
      if (typeof callback === "function") {
        callback()
      }
    };
    script.src = url;
    container.appendChild(script)
  }

  function loadAd(container, callback) {
    var url = "http://ads.adbrite.com/mb/text_group.php?sid=2093964&zs=3136305f363030&ifr=" + AdBrite_Iframe + "&ref=" + AdBrite_Referrer;
    loadScript(url, container, callback)
  }

  function configLeftSkyscraper() {
    AdBrite_Title_Color = "0000FF";
    AdBrite_Text_Color = "000000";
    AdBrite_Background_Color = "FFFFFF";
    AdBrite_Border_Color = "CCCCCC";
    AdBrite_URL_Color = "008000";
    try {
      AdBrite_Iframe = window.top != window.self ? 2 : 1;
      AdBrite_Referrer = document.referrer == "" ? document.location : document.referrer;
      AdBrite_Referrer = encodeURIComponent(AdBrite_Referrer)
    } catch (e) {
      AdBrite_Iframe = "";
      AdBrite_Referrer = ""
    }
  }

  function loadLeft() {
    var left = document.getElementById("adleft");
    if (!left) {
      return
    }
    left.innerHTML = "";
    configLeftSkyscraper();
    loadAd(left);
    document.write = document.writeln = writer(left)
  }

  function loadLigit() {
    var url = "liji.html";
    document.getElementById("adleftbody").src = url
  }
  Y.on("newGame", loadLigit);
  Y.on("loadGame", loadLigit)
}, "1.0.0", {
  requires: ["solitaire"]
});
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(b) {
    var a = this.length >>> 0;
    var c = Number(arguments[1]) || 0;
    c = (c < 0) ? Math.ceil(c) : Math.floor(c);
    if (c < 0) {
      c += a
    }
    for (; c < a; c++) {
      if (c in this && this[c] === b) {
        return c
      }
    }
    return -1
  }
}
Array.prototype.flatten = function() {
  var b = [],
    c, a, e, d = Array.prototype;
  for (c = 0, a = this.length; c < a; c++) {
    e = this[c];
    if (Object.prototype.toString.call(e) === "[object Array]") {
      d.push.apply(b, d.flatten.call(e))
    } else {
      b.push(e)
    }
  }
  return b
};

function argsArray(a) {
  return Array.prototype.slice.call(a)
}
Array.prototype.last = function() {
  return this[this.length - 1]
};
Array.prototype.deleteItem = function(b) {
  var a = this.indexOf(b);
  a !== -1 && this.splice(a, 1)
};
Array.prototype.shuffle = function() {
  var b = this.length,
    d, c, a;
  while (--b) {
    d = ~~(Math.random() * b);
    c = this[b];
    a = this[d];
    this[d] = c;
    this[b] = a
  }
};
Function.prototype.bind = function(b) {
  var a = this;
  return function() {
    var c = argsArray(arguments);
    return a.apply(b, c)
  }
};
Function.prototype.partial = function() {
  var b = this,
    a = argsArray(arguments);
  return function() {
    var e, c, d = [].concat(a);
    for (e = 0, c = arguments.length; e < c; e++) {
      d.push(arguments[e])
    }
    return b.apply(this, d)
  }
};

function instance(c, b) {
  var a = new Function(),
    e, d;
  a.prototype = c;
  e = new a;
  if (typeof b === "object") {
    for (d in b) {
      if (b.hasOwnProperty(d)) {
        e[d] = b[d]
      }
    }
  }
  return e
}

function normalize(a) {
  var b = typeof a === "function" ? a() : a;
  return isNaN(b) ? undefined : b
}
Object.prototype.mapToFloat = function() {
  var a;
  for (a in this) {
    if (this.hasOwnProperty(a)) {
      this[a] = parseFloat(this[a])
    }
  }
  return this
};
Object.prototype.mapAppend = function(b) {
  var a;
  for (a in this) {
    if (this.hasOwnProperty(a)) {
      this[a] += b
    }
  }
  return this
};
var Game;
YUI.add("solitaire", function(d) {
  var b = d.namespace("Solitaire");

  function a(e) {
    a.superclass.constructor.call(this, e)
  }
  d.extend(a, d.DD.Delegate, {
    getCard: function() {
      return this.get("currentNode").getData("target")
    }
  });
  d.mix(b, {
    activeCard: null,
    moves: null,
    selector: "body",
    offset: {
      left: 50,
      top: 70
    },
    padding: {
      x: 50,
      y: 50
    },
    widthScale: 0,
    noop: function() {},
    name: function() {
      var e;
      for (e in b) {
        if (b.hasOwnProperty(e) && b[e] === Game) {
          return e
        }
      }
    },
    container: function() {
      return d.one(b.selector)
    },
    width: function() {
      return this.Card.base.width * this.widthScale
    },
    height: function() {
      return this.Card.base.height * 4.2
    },
    maxStackHeight: function() {
      return b.Application.windowHeight - normalize(this.Tableau.stackConfig.layout.top) - normalize(Game.offset.top)
    },
    undo: function() {
      d.fire("undo")
    },
    pushUndoStack: function() {
      b.moves.length && c.push(b.moves);
      b.moves = []
    },
    pushMove: function(f) {
      var e = b.moves;
      e && e.push(f)
    },
    serialize: function() {
      var j = [],
        k = [],
        h, g, f, e;
      d.Array.each(this.fields, function(i) {
        g = this[i.toLowerCase()].stacks;
        for (f = 0, e = g.length; f < e; f++) {
          h = g[f].serialize();
          j.push(h);
          k.push(String.fromCharCode(h.length))
        }
      }, this);
      return [String.fromCharCode(j.length)].concat(k, j).join("")
    },
    stationary: function(f) {
      var e = Game.Card.updatePosition;
      Game.Card.updatePosition = b.noop;
      f.call(this);
      Game.Card.updatePosition = e
    },
    unanimated: function(g) {
      var f = d.Solitaire.Animation,
        e = f.animate;
      f.animate = false;
      g.call(this);
      f.animate = e
    },
    withoutFlip: function(i) {
      var g = b.Animation,
        f = b.Card,
        h = g.flip,
        e = f.setImageSrc;
      if (!g.animate) {
        i.call(this);
        return
      }
      g.flip = f.setImageSrc = b.noop;
      i.call(this);
      g.flip = h;
      f.setImageSrc = e
    },
    unserialize: function(e) {
      this.unanimated(function() {
        var f = e.charCodeAt(0),
          j = e.substr(1, f),
          k = f + 1,
          m, n = this.fields,
          q = -1,
          h = [],
          p, o, l, g;
        for (l = 0, p = 0; l < f; l++, p++, k += g) {
          g = j.charCodeAt(l);
          m = e.substr(k, g);
          if (p === h.length) {
            q++;
            h = this[n[q].toLowerCase()].stacks;
            p = 0
          }
          o = h[p];
          o.unserialize(m);
          o.updateCardsPosition()
        }
      })
    },
    save: function(e) {
      var f;
      if (e) {
        f = "initial-game"
      }
      d.Solitaire.SaveManager.save(this.name(), this.serialize(), f)
    },
    loadGame: function(e) {
      this.unanimated(function() {
        this.setup(function() {
          this.unserialize(e)
        })
      });
      d.fire("loadGame");
      this.save()
    },
    newGame: function() {
      d.Solitaire.SaveManager.clear();
      this.withoutFlip(function() {
        this.setup(this.deal)
      });
      d.fire("newGame");
      this.save(true)
    },
    cleanup: function() {
      d.Event.purgeElement(this.container());
      d.detach("solitaire|*");
      this.eachStack(function(e) {
        e.cleanup()
      })
    },
    setup: function(e) {
      Game = b.game = this;
      d.fire("beforeSetup");
      b.moves = null;
      c.clear();
      this.stationary(function() {
        this.init();
        d.Solitaire.Animation.initQueue();
        this.createStacks();
        this.createEvents();
        this.createDraggables();
        e.call(this)
      });
      b.moves = [];
      d.fire("afterSetup");
      d.Solitaire.Animation.dealing = true;
      Game.eachStack(function(f) {
        f.updateCardsStyle();
        f.updateCardsPosition()
      });
      d.Solitaire.Animation.dealing = false
    },
    createEvents: function() {
      var e = d.one(b.selector);
      e.delegate("dblclick", Game.autoPlay, ".card");
      e.delegate("contextmenu", Game.autoPlay, ".card");
      e.delegate("click", Game.Events.click, ".card");
      e.delegate("touchend", Game.Events.click, ".card");
      d.after("solitaire|endTurn", Game.Events.endTurn);
      d.on("solitaire|undo", Game.Events.undo)
    },
    createDraggables: function() {
      var e = new a({
        dragConfig: {
          dragMode: "intersect",
          groups: ["open"],
          clickPixelThresh: 0
        },
        container: b.selector,
        nodes: ".card"
      });
      e.dd.plug(d.Plugin.DDProxy, {
        borderStyle: "none",
        moveOnEnd: false
      });
      e.on("drag:drag", Game.Events.drag);
      e.on("drag:mouseDown", Game.Events.dragCheck);
      e.on("drag:start", Game.Events.dragStart);
      e.on("drag:dropmiss", Game.Events.dragMiss);
      e.on("drag:drophit", Game.Events.drop);
      e.on("drag:end", Game.Events.dragEnd)
    },
    createField: function(l) {
      if (!l) {
        return
      }
      var k = instance(l),
        m, g, j, h, e;
      if (l.stackConfig) {
        m = l.stackConfig.layout;
        j = new Array(l.stackConfig.total);
        l.Stack.field = l.field;
        for (h = 0, e = j.length; h < e; h++) {
          g = instance(l.Stack);
          g.configLayout = m;
          g.layout(d.merge(m, {
            hoffset: h * m.hspacing || 0,
            voffset: h * m.vspacing || 0
          }), h);
          j[h] = g
        }
      }
      k.stacks = j;
      typeof k.init === "function" && k.init();
      return k
    },
    createStacks: function() {
      this.eachStack(function(e) {
        e.cards = [];
        e.createNode()
      })
    },
    eachStack: function(f, e) {
      Game && d.Array.each(Game.fields, function(h) {
        var g = h.toLowerCase(),
          i = Game[g],
          j = e || g;
        j === g && i.stacks && d.Array.each(i.stacks, f)
      })
    },
    resize: function(g, f, e) {
      this.scale(g);
      this.unanimated(function() {
        this.eachStack(function(h, j) {
          var l = h.cards,
            k = h.configLayout;
          h.adjustRankHeight();
          h.cards = [];
          h.layout(d.merge(k, {
            hoffset: j * k.hspacing || 0,
            voffset: j * k.vspacing || 0
          }), j);
          h.setImageSrc();
          h.updateStyle();
          h.setCards(l.length, function(n) {
            var m = l[n];
            if (m) {
              m.setImageSrc();
              m.updateStyle()
            }
            return m
          });
          h.update()
        })
      })
    },
    scale: function(g) {
      var e = d.Solitaire.Card,
        f = e.base,
        h;
      e.scale = g;
      for (h in f) {
        if (f.hasOwnProperty(h)) {
          e[h] = f[h] * g
        }
      }
    },
    init: function() {
      var g = b.preventDefault,
        f, h, e;
      d.on("selectstart", g, document);
      d.on("contextmenu", function(j) {
        var i = j.target;
        if (i.hasClass("stack") || i.hasClass("card")) {
          j.preventDefault()
        }
      }, document);
      this.scale(1);
      e = d.Array.map(Game.fields, function(i) {
        return Game[i.toLowerCase()] = Game.createField(Game[i])
      });
      if (Game.fields.indexOf("Deck" === -1)) {
        Game.deck = Game.createField(Game.Deck)
      }
      f = Math.min.apply(Math, d.Array.map(e, function(i) {
        return d.Array.map(i.stacks, function(j) {
          return j.left
        })
      }).flatten());
      h = Math.max.apply(Math, d.Array.map(e, function(i) {
        return d.Array.map(i.stacks, function(j) {
          return j.left
        })
      }).flatten()) + this.Card.width;
      this.widthScale = (h - f) / this.Card.base.width
    },
    preventDefault: function(f) {
      f.preventDefault()
    },
    autoPlay: function() {
      var e = typeof this.getCard === "function" ? this.getCard() : this.getData("target");
      e.autoPlay()
    },
    isWon: function() {
      var k = this.foundation.stacks,
        f = this.deck,
        h, j = 0,
        g, e;
      h = f.suits.length * 13 * f.count;
      for (g = 0, e = k.length; g < e; g++) {
        j += k[g].cards.length
      }
      return j === h
    },
    win: function() {
      d.fire("win");
      d.Solitaire.SaveManager.save(this.name())
    },
    endTurn: function() {
      d.fire("endTurn")
    }
  });
  d.Solitaire.Events = {
    click: function(g) {
      var f = g.target.getData("target");
      if (f.dragging) {
        return
      }
      f.dragging = false;
      f.turnOver(g);
      b.moves.reverse();
      Game.endTurn();
      g.preventDefault()
    },
    clickEmptyDeck: function() {
      Game.redeal();
      b.moves.reverse();
      Game.endTurn()
    },
    drag: function() {
      this.getCard().dragging = true
    },
    dragCheck: function() {
      var f = this.getCard(),
        e = f.createProxyStack();
      if (!e) {
        return
      }
      b.activeCard = f;
      Game.eachStack(function(g) {
        g.updateDragGroups()
      })
    },
    dragStart: function() {
      var e = this.getCard(),
        g = this.get("dragNode"),
        f = e.createProxyNode();
      if (f) {
        g.setContent(f);
        !e.proxyStack && d.one(".yui3-dd-shim").setStyle("cursor", "not-allowed")
      }
    },
    dragMiss: function() {
      var e = this.getCard();
      Game.unanimated(function() {
        e.updatePosition()
      })
    },
    dragEnd: function() {
      var j = this.getCard(),
        m = b.container(),
        k = new d.Node(document.createDocumentFragment()),
        g, h, i = this.dd.realXY,
        n = m.getXY(),
        e, l, f = j.proxyStack;
      j.dragging = false;
      g = this.get("dragNode");
      h = g.get("firstChild");
      h && h.remove();
      if (!f) {
        return
      }
      e = f.cards;
      l = j.stack;
      f.left = i[0] - n[0];
      f.top = i[1] - n[1];
      Game.unanimated(function() {
        f.updateCardsPosition()
      });
      d.Array.each(e, function(o) {
        if (!o) {
          return
        }
        o.proxyStack = null;
        k.append(o.node)
      });
      m.append(k);
      l.updateCardsPosition()
    },
    drop: function(h) {
      if (!b.activeCard) {
        return
      }
      var f = b.activeCard.proxyStack,
        g, i;
      if (f) {
        i = f.first();
        g = h.drop.get("node").getData("target");
        g = g.stack || g;
        if ((f.cards.length === 1 && i.validTarget(g)) || f.validTarget(g)) {
          g.pushStack(f)
        }
      }
      Game.endTurn()
    },
    endTurn: function() {
      b.pushUndoStack();
      b.activeCard = null;
      Game.eachStack(function(e) {
        e.updateCardsStyle()
      });
      if (Game.isWon()) {
        Game.win()
      } else {
        Game.save()
      }
    },
    undo: function() {
      var e = argsArray(arguments);
      e.unshift("endTurn");
      c.undo();
      d.fire.apply(d, e)
    }
  };
  d.Solitaire.Deck = {
    count: 1,
    suits: ["c", "d", "h", "s"],
    init: function(f) {
      var g = this.suits,
        j, h, k, i, e = Game.Card;
      this.cards = [];
      for (i = 0; i < this.count; i++) {
        for (k = 1; k <= 13; k++) {
          for (h = 0; j = g[h]; h++) {
            this.cards.push(e.create(k, j).faceDown())
          }
        }
      }
      if (f === undefined) {
        this.cards.shuffle()
      } else {
        this.msSeededShuffle(f)
      }
    },
    msSeededShuffle: function(e) {
      var k = this.cards,
        g = Math.pow(2, 31),
        j, f, h;
      for (h = k.length; h > 1; h--) {
        e = ((214013 * e) % g + 2531011) % g;
        j = (e >> 16) & 32767;
        item = k[h - 1];
        f = k[j % h];
        k[h - 1] = f;
        k[j % h] = item
      }
    },
    createStack: function() {
      var e;
      for (e = this.cards.length - 1; e >= 0; e--) {
        this.stacks[0].push(this.cards[e])
      }
    },
    last: function() {
      return this.cards.last()
    },
    pop: function() {
      return this.cards.pop()
    }
  };
  d.Solitaire.Card = {
    zIndex: 1,
    index: -1,
    width: null,
    height: null,
    rankHeight: null,
    hiddenRankHeight: null,
    isFaceDown: false,
    positioned: false,
    scale: 1,
    stack: null,
    proxyStack: null,
    ghost: true,
    dragging: false,
    node: null,
    callback: null,
    left: 0,
    top: 0,
    base: {},
    origin: {
      left: function() {
        var e = b.container().getX();
        return -e - d.Solitaire.Card.width
      },
      top: function() {
        var e = b.container().getY();
        return -e - d.Solitaire.Card.height
      }
    },
    animSpeeds: {
      slow: 0.5,
      mid: 0.2,
      fast: 0.1
    },
    create: function(g, f) {
      var e = {
        c: 0,
        s: 0,
        h: 1,
        d: 1
      };
      return instance(this, {
        rank: g,
        suit: f,
        color: e[f]
      })
    },
    truncatePosition: function() {
      this.left = Math.floor(this.left);
      this.top = Math.floor(this.top)
    },
    faceDown: function(e) {
      this.isFaceDown = true;
      this.setRankHeight();
      b.Animation.flip(this);
      e || b.pushMove({
        card: this,
        faceDown: true
      });
      return this
    },
    faceUp: function(e) {
      this.isFaceDown = false;
      this.setRankHeight();
      b.Animation.flip(this);
      e || b.pushMove({
        card: this,
        faceDown: false
      });
      return this
    },
    setRankHeight: function() {
      var e = this.stack,
        f, g;
      if (e && e.rankHeight) {
        f = e.rankHeight;
        g = e.hiddenRankHeight
      } else {
        f = b.Card.rankHeight;
        g = b.Card.hiddenRankHeight
      }
      this.rankHeight = this.isFaceDown ? g : f
    },
    imageSrc: function() {
      var e = this.base.theme + "/";
      e += this.isFaceDown ? "facedown" : this.suit + this.rank;
      e += ".png";
      return e
    },
    setImageSrc: function() {
      var e = this.node;
      e && e.setAttribute("src", this.imageSrc())
    },
    wrapperStyle: function() {
      return {
        left: this.left,
        top: this.top,
        width: Math.floor(this.width),
        height: Math.floor(this.height)
      }
    },
    updateStyle: function() {
      var e = this.node;
      e && e.setStyles(this.wrapperStyle());
      this.setRankHeight()
    },
    turnOver: function(g) {
      if (!this.isFaceDown) {
        return
      }
      var f = this.stack;
      if (f.field === "deck") {
        Game.turnOver()
      } else {
        if (this.isFree()) {
          this.faceUp()
        }
      }
      g.stopPropagation()
    },
    autoPlay: function(h) {
      var f = this.stack,
        l = f.last(),
        k, g, j, e;
      if (this.isFaceDown || f.field === "foundation") {
        return
      }
      k = Game.foundation.stacks;
      for (j = 0, e = k.length; j < e; j++) {
        g = k[j];
        if (this.isFree() && this.validTarget(g)) {
          if (!h) {
            this.moveTo(g);
            f.updateCardsPosition();
            f.update();
            Game.endTurn()
          }
          return true
        }
      }
      return false
    },
    ensureDOM: function() {
      !this.node && this.createNode()
    },
    isFree: function() {
      return this === this.stack.last()
    },
    playable: function() {
      return this.stack.field === "deck" || (this.isFree() && (this.stack.field !== "foundation"))
    },
    createNode: function() {
      var e;
      e = this.node = d.Node.create("<img class='card'>").setData("target", this).setAttribute("src", this.imageSrc()).plug(d.Plugin.Drop);
      e.setStyles({
        left: -this.width,
        top: -this.height
      });
      this.setRankHeight();
      b.container().append(e)
    },
    destroyNode: function() {
      var e = this.node;
      e && e.clearData().destroy(true)
    },
    createProxyStack: function() {
      if (this.isFaceDown || this.stack.field === "foundation") {
        this.proxyStack = null;
        return null
      }
      var f = instance(this.stack, {
          proxy: true,
          stack: this.stack
        }),
        j = f.cards,
        g, h, e;
      f.cards = [];
      f.push(this, true);
      for (h = j.indexOf(this) + 1, e = j.length; h < e; h++) {
        g = j[h];
        if (f.validProxy(g)) {
          f.push(g, true)
        } else {
          break
        }
      }
      this.proxyStack = h === e ? f : null;
      return this.proxyStack
    },
    proxyCards: function() {
      return this.proxyStack.cards
    },
    createProxyNode: function() {
      var f = d.Node.create("<div>"),
        e = this.proxyStack;
      if (!e) {
        if (!this.ghost) {
          return null
        }
        f.setStyles({
          opacity: 0.6,
          top: -this.top,
          left: -this.left
        }).append(this.node.cloneNode(true))
      } else {
        f.setStyles({
          opacity: 1,
          top: -this.top,
          left: -this.left
        });
        d.Array.each(this.proxyCards(), function(g) {
          g.proxyStack = e;
          f.append(g.node)
        })
      }
      return f
    },
    updatePosition: function(e) {
      if (!this.node) {
        return
      }
      var g = {
          left: Math.floor(this.left) + "px",
          top: Math.floor(this.top) + "px",
          zIndex: this.zIndex
        },
        f = this.origin;
      if (!this.positioned) {
        this.node.setStyles({
          left: normalize(f.left),
          top: normalize(f.top)
        })
      }
      d.Solitaire.Animation.init(this, g, e)
    },
    pushPosition: function() {
      var e = this.index >= 0 ? this.index : this.stack.cards.indexOf(this);
      b.pushMove({
        card: this,
        index: e,
        from: this.stack
      })
    },
    moveTo: function(e) {
      var f = this.stack;
      this.pushPosition();
      f.deleteItem(this);
      e.push(this);
      d.fire(f.field + ":afterPop", f);
      return this
    },
    flipPostMove: function(e) {
      var f = b.Animation;
      if (e === undefined) {
        e = f.interval * 20
      }
      this.after(function() {
        f.flip(this, e)
      })
    },
    after: function(e) {
      this.callback = e
    },
    runCallback: function() {
      if (this.callback) {
        this.callback.call(this);
        this.callback = null
      }
    }
  };
  d.Solitaire.Stack = {
    cards: null,
    node: null,
    images: {
      tableau: "freeslot.png",
      deck: "freeslot.png",
      reserve: "freeslot.png",
      foundation: "freeslot.png"
    },
    serialize: function() {
      var h, e, k = this.cards,
        g, f = Game.deck.suits,
        l, j = [];
      for (h = 0, e = k.length; h < e; h++) {
        g = k[h];
        if (g) {
          l = f.indexOf(g.suit) | g.rank << 2 | g.isFaceDown << 6
        } else {
          l = 128
        }
        j.push(String.fromCharCode(l))
      }
      return j.join("")
    },
    eachCard: function(h) {
      var f, e, g = this.cards;
      for (f = 0, e = g.length; f < e; f++) {
        if (g[f]) {
          if (h.call(this, g[f], f) === false) {
            return false
          }
        }
      }
      return true
    },
    setCards: function(j, f) {
      var h, e, g, l, k = instance(Game.Card, {
        updatePosition: b.noop,
        ensureDOM: b.noop
      });
      l = this.cards = [];
      for (h = 0; h < j; h++) {
        g = f.call(this, h) || k;
        this.push(g)
      }
      for (h = 0; h < j; h++) {
        if (l[h] === k) {
          l[h] = null
        }
      }
    },
    updateCardsPosition: function() {
      var e = this.cards;
      Game.stationary(function() {
        this.proxy || this.adjustRankHeight();
        this.setCards(e.length, function(g) {
          var f = e[g];
          if (f) {
            f.stack = this;
            f.setRankHeight()
          }
          return f
        })
      }.bind(this));
      this.eachCard(function(f) {
        f.updatePosition()
      })
    },
    updateCardsStyle: function() {
      var e = this.field;
      e === "foundation" || this.eachCard(function(f) {
        if (f.playable()) {
          f.node.addClass("playable")
        } else {
          f.node.removeClass("playable")
        }
      })
    },
    unserialize: function(g) {
      var f = Game.deck,
        e = Game.Card;
      this.setCards(g.length, function(j) {
        var k, h;
        k = g.charCodeAt(j);
        if (k === 128) {
          h = null
        } else {
          h = e.create((k >> 2) & 15, f.suits[k & 3]);
          k & 64 ? h.faceDown(true) : h.faceUp(true)
        }
        return h
      });
      this.update()
    },
    imageSrc: function() {
      var e = this.images[this.field];
      return e ? b.Card.base.theme + "/" + e : "trans.gif"
    },
    layout: function(i) {
      var h = i.hoffset * d.Solitaire.Card.width,
        f = i.voffset * d.Solitaire.Card.height,
        g = Game.offset,
        e = this;
      d.Array.each(["top", "left"], function(j) {
        e[j] = normalize(i[j])
      });
      this.left += h + normalize(g.left);
      this.top += f + normalize(g.top)
    },
    deleteItem: function(e) {
      this.cards.deleteItem(e)
    },
    push: function(f, e) {
      var g = this.last(),
        i = this.field,
        h = f.stack ? f.stack.field : "deck";
      if (g) {
        f.zIndex = g.zIndex + 1
      } else {
        if (i === "deck" || i === "foundation") {
          f.zIndex = 200
        } else {
          if (h === "deck") {
            f.zIndex = Game.Card.zIndex
          }
        }
      }
      if (!e) {
        f.stack = this;
        this.setCardPosition(f);
        f.truncatePosition();
        f.ensureDOM()
      }
      this.cards.push(f);
      e || f.updatePosition({
        from: h,
        to: i
      })
    },
    pushStack: function(g) {
      var f = b.activeCard.stack,
        e = this;
      f.eachCard(function(h, j) {
        h.index = j
      });
      Game.stationary(function() {
        g.eachCard(function(h) {
          h.moveTo(e);
          h.index = -1
        });
        f.eachCard(function(h) {
          h.index = -1
        })
      });
      f.updateCardsPosition();
      f.update();
      d.fire(e.field + ":afterPush", e)
    },
    adjustRankHeight: function() {
      var f = this.cards,
        j, s = this.last(),
        r = Game.maxStackHeight(),
        q = 0,
        h = 0,
        k, t = 0,
        p = b.Card,
        e = 0,
        g = 0,
        o, m, l, n;
      if (f.length <= 1) {
        return
      }
      for (l = 0, n = f.length - 1; l < n; l++) {
        if (!f[l]) {
          return
        }
        if (f[l].isFaceDown) {
          q += p.hiddenRankHeight;
          e++;
          t += p.hiddenRankHeight
        } else {
          h += p.rankHeight;
          g++;
          t += p.rankHeight
        }
      }
      if (s) {
        t += s.height;
        k = r - s.height
      }
      if (t <= r) {
        this.rankHeight = 0;
        this.hiddenRankHeight = 0;
        return
      }
      o = k * (q / (q + h)) / e;
      m = k * (h / (q + h)) / g;
      this.hiddenRankHeight = Math.floor(o);
      this.rankHeight = Math.floor(m)
    },
    first: function() {
      return this.cards[0]
    },
    last: function() {
      return this.cards.last()
    },
    length: function() {
      return this.cards.length
    },
    index: function() {
      return Game[this.field].stacks.indexOf(this)
    },
    next: function() {
      return Game[this.field].stacks[this.index() + 1]
    },
    setCardPosition: function(e) {
      e.top = this.top;
      e.left = isNaN(this.left) ? null : this.left
    },
    wrapperStyle: function() {
      return {
        left: Math.floor(this.left),
        top: Math.floor(this.top),
        width: Math.floor(d.Solitaire.Card.width),
        height: Math.floor(d.Solitaire.Card.height)
      }
    },
    updateStyle: function() {
      var e = this.node;
      e && e.setStyles(this.wrapperStyle())
    },
    setImageSrc: function() {
      if (this.node) {
        this.node.setAttribute("src", this.imageSrc())
      }
    },
    createNode: function() {
      var e = this.node;
      e = this.node = d.Node.create("<img class='stack'>").set("draggable", false).setData("target", this).plug(d.Plugin.Drop);
      this.setImageSrc();
      this.updateStyle();
      b.container().append(e)
    },
    cleanup: function() {
      var e = this.node;
      e && e.clearData().destroy(true);
      this.eachCard(function(f) {
        f.destroyNode()
      })
    },
    updateDragGroups: function() {
      var j = b.activeCard,
        h = this.cards,
        g = this.last(),
        e, f = h.length - 1;
      this.eachCard(function(i) {
        i.node.drop.removeFromGroup("open")
      });
      if (j.validTarget(this)) {
        if (g) {
          g.node.drop.addToGroup("open")
        }
        this.node.drop.addToGroup("open")
      } else {
        this.node.drop.removeFromGroup("open")
      }
    },
    validCard: function() {
      return true
    },
    validProxy: function(e) {
      return e && e.validTarget(this) && this.validCard(e)
    },
    update: function() {}
  };
  d.Solitaire.Animation = {
    animate: true,
    dealing: false,
    duration: 0.5,
    flipDuration: 0.1,
    interval: 20,
    queue: new d.AsyncQueue(),
    initQueue: function() {
      var e = this.queue;
      e.defaults.timeout = this.interval
    },
    init: function(g, m, j) {
      if (!this.animate) {
        g.node.setStyles(m);
        g.positioned = true;
        setTimeout(function() {
          g.runCallback()
        }, 0);
        return
      }
      var f = g.node,
        e = this.queue,
        i = g.animSpeeds,
        n = {
          top: f.getStyle("top"),
          left: f.getStyle("left")
        }.mapToFloat().mapAppend("px"),
        l = m.zIndex,
        h, k = this;
      if (n.top === m.top && n.left === m.left) {
        return
      }
      if (this.dealing) {
        h = i.slow
      } else {
        if (!j || j.from === j.to || j.to === "waste" || j.to === "foundation") {
          h = i.fast
        } else {
          if (j.from === "deck") {
            h = i.slow
          } else {
            h = i.mid
          }
        }
      }
      f.setStyle("zIndex", 500 + l);
      delete m.zIndex;
      e.add(this.animFunction.bind(this).partial({
        left: m.left,
        top: m.top,
        easing: "ease-out",
        duration: h,
      }, g, function() {
        g.positioned = true;
        f.setStyle("zIndex", g.zIndex)
      }));
      e.run()
    },
    animFunction: function() {},
    doTransition: function(f, e, i) {
      var g = e.node,
        h = this;
      g.transition(f, function() {
        i();
        h.clearTransition(g);
        e.runCallback()
      })
    },
    doAnim: function(f, e, l) {
      var g = e.node,
        j = f.duration,
        i = {
          linear: "linear",
          "ease-out": "easeOut",
          "ease-in": "easeIn"
        },
        k = d.Easing[i[f.easing]],
        h;
      delete f.duration;
      delete f.easing;
      h = new d.Anim({
        node: g,
        to: f,
        duration: j,
        easing: k
      });
      h.on("end", function() {
        l();
        e.runCallback()
      });
      h.run()
    },
    flip: function(f, e) {
      if (!(this.animate && f.node)) {
        f.setImageSrc();
        return
      }
      var g = this;
      setTimeout(function() {
        var i = f.node,
          k = g.flipDuration,
          l = "linear",
          j = Math.floor(f.left),
          h = Math.floor(f.width);
        g.animFunction({
          left: Math.floor(j + h / 2) + "px",
          width: 0,
          easing: l,
          duration: k
        }, f, function() {
          f.setImageSrc();
          g.animFunction({
            left: j + "px",
            width: h + "px",
            easing: l,
            duration: k
          }, f, function() {
            f.updateStyle()
          })
        })
      }, e || 0)
    },
    clearTransition: function(f) {
      var e = f._node.style;
      d.Array.each(["Webkit", "Moz", "O", "MS"], function(h) {
        var g = h + "Transition";
        if (g in e) {
          e[g] = null
        }
      })
    }
  };
  b.Animation.animFunction = b.Animation.doAnim;
  var c = {
    stack: null,
    clear: function() {
      this.stack = []
    },
    push: function(e) {
      this.stack.push(e)
    },
    pop: function() {
      return this.stack.pop() || []
    },
    undo: function() {
      var e;
      e = d.Array.unique(d.Array.map(this.pop(), this.act).flatten());
      d.Array.each(e, function(f) {
        if (f) {
          f.updateCardsPosition();
          f.update(true)
        }
      })
    },
    act: function(e) {
      if (typeof e === "function") {
        e();
        return []
      }
      var i = e.from,
        f = e.card,
        h = f.stack,
        g = h.cards;
      if (i) {
        if (i === f.stack) {
          g[g.indexOf(f)] = null
        } else {
          g.deleteItem(f)
        }
        i.cards[e.index] = f;
        f.stack = i;
        b.container().append(f.node)
      }
      if ("faceDown" in e) {
        e.faceDown ? f.faceUp(true) : f.faceDown(true)
      }
      return [h, i]
    }
  }
}, "0.0.1", {
  requires: ["save-manager", "dd", "dd-plugin", "dd-delegate", "anim", "transition", "async-queue", "cookie", "array-extras"]
});
YUI.add("analytics", function(f) {
  var c = f.Solitaire,
    b = f.namespace("Solitaire.Analytics"),
    a = 5,
    d = 0,
    e, g = 0;
  f.on("beforeSetup", function() {
    var h = g;
    g = new Date().getTime();
    if (h) {
      b.track("Games", "Played", e, g - h)
    }
    d = 0;
    e = c.game.name()
  });
  f.on("win", function() {
    var h = new Date().getTime();
    b.track("Games", "Won", c.game.name(), h - g, true);
    b.track("Games", "Played", c.game.name(), h - g, true);
    g = 0
  });
  f.on("endTurn", function() {
    d++;
    if (d === a) {
      b.track("Games", "New", c.game.name())
    }
  });
  f.on("popup", function(h) {
    b.track("Menus", "Show", h)
  });
  f.mix(b, {
    track: function(j, i, h, l, k) {
      if (typeof _gaq === "undefined") {
        return
      }
      _gaq.push(["_trackEvent", j, i, h, l, k])
    }
  })
}, "1.0.0", {
  requires: ["solitaire"]
});
YUI.add("util", function(b) {
  var a = b.Solitaire;
  Util = b.namespace("Solitaire.Util");
  b.mix(Util, {
    flipStacks: function(f, e, d) {
      var c = a.game;
      if (e === undefined) {
        e = 200
      }
      if (d === undefined) {
        d = 150
      }
      f.after(function() {
        c.eachStack(function(g) {
          setTimeout(function() {
            g.eachCard(function(h) {
              if (!h.isFaceDown) {
                a.Animation.flip(h)
              }
            })
          }, e);
          e += d
        }, "tableau")
      })
    },
    moveWasteToDeck: function() {
      var c = this.deck.stacks[0],
        d = this.waste.stacks[0];
      while (d.cards.length) {
        d.last().faceDown().moveTo(c)
      }
    },
    hasFreeTableaus: function() {
      return b.Array.some(a.game.tableau.stacks, function(c) {
        return !c.cards.length
      })
    },
    freeTableaus: function() {
      return b.Array.filter(a.game.tableau.stacks, function(c) {
        return c.cards.length === 0
      })
    },
    seedRank: function() {
      var c = Game.foundation.stacks[0].first();
      return c ? c.rank : 0
    },
    cacheNode: function(c) {
      var d;
      return function() {
        if (!d) {
          d = b.one(c)
        }
        return d
      }
    },
    mapRank: function(e) {
      var d = {
          1: "Ace",
          11: "Jack",
          12: "Queen",
          13: "King"
        },
        c = d[e];
      return c ? c : e
    }
  })
}, "0.0.1", {
  requires: ["solitaire", "array-extras"]
});
YUI.add("win-display", function(c) {
  var s, h, k = true,
    n = c.Solitaire,
    e = n.Statistics,
    j = c.namespace("Solitaire.WinDisplay"),
    l, v = false,
    q = n.Util.cacheNode,
    p = [],
    b = q("body"),
    i = q("#win-display"),
    o = q("#win-display-game"),
    a = q("#win-display-streak"),
    m = q("#win-display-wins"),
    r = q("#win-display-loses");
  c.on("newGame", function() {
    h = false
  });
  c.on("loadGame", function() {
    h = false
  });
  c.on("win", function() {
    if (h || !k) {
      return
    }
    h = true;
    p[~~(Math.random() * p.length)]()
  });
  c.on("beforeSetup", function() {
    j.cancel();
    j.enable();
    f.clear()
  });
  c.on("fieldResize", function() {
    f.resize()
  });
  var g = (function() {
    var w = 16;
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(x) {
      setTimeout(x, w)
    }
  })();
  var f = {
    width: 0,
    height: 0,
    angle: 2 * Math.PI,
    velocity: 1000,
    minYVelocity: 200,
    gravity: 15,
    dampening: 0.5,
    canvas: null,
    context: null,
    actors: [],
    bounce: function(D, B, I) {
      var C = D.node,
        J = C.getXY(),
        z = {},
        E, G, A, F, w, H, y = new Date().getTime(),
        x;
      G = this.angle * (1 - B);
      A = this.angle - G;
      E = Math.random() * A + G;
      w = this.velocity * (1 - I);
      H = this.velocity - w;
      F = Math.random() * H + w;
      z.x = Math.cos(E) * F;
      z.y = Math.sin(E) * F;
      C.remove();
      x = this.actors.length === 0;
      if (J) {
        this.actors.push({
          node: C._node,
          velocity: z,
          boundingbox: {
            x: J[0],
            y: J[1],
            width: ~~D.width,
            height: ~~D.height
          },
          lastUpdate: y,
          lastSmear: y
        })
      }
      if (x) {
        this.bounceCallback(y)
      }
    },
    bounceCallback: function(B) {
      var w = new Date().getTime(),
        A, z = this.actors,
        y, x;
      A = w - B;
      x = 0;
      while (y = z[x]) {
        if (this.bounceStep(y.node, y.velocity, y.boundingbox, A)) {
          z.splice(x, 1)
        } else {
          x++
        }
      }
      if (z.length > 0) {
        g(function() {
          this.bounceCallback(w)
        }.bind(this))
      }
    },
    bounceStep: function(z, x, y, w) {
      w /= 1000;
      y.x += x.x * w;
      y.y += x.y * w;
      x.y += this.gravity;
      if (y.x > this.width || y.x + y.width < 0 || y.y + y.height < 0) {
        return true
      }
      if (y.y + y.height >= this.height) {
        y.y -= x.y * w;
        x.y *= -this.dampening;
        x.y = Math.min(x.y, -this.minYVelocity)
      }
      this.context.drawImage(z, ~~y.x, ~~y.y, y.width, y.height)
    },
    createSmearNode: function() {
      var w;
      if (!this.canvas) {
        var w = document.createElement("canvas");
        w.style.zIndex = -1;
        w.style.position = "absolute";
        w.style.top = "0px";
        w.style.left = "0px";
        w.width = this.width;
        w.height = this.height;
        this.canvas = w;
        this.context = w.getContext("2d");
        b().appendChild(this.canvas)
      }
      this.canvas.className = ""
    },
    resize: function() {
      this.width = b().get("winWidth");
      this.height = b().get("winHeight");
      if (this.canvas) {
        this.canvas.width = this.width;
        this.canvas.height = this.height
      }
    },
    init: function() {
      this.resize();
      this.createSmearNode()
    },
    clear: function() {
      if (!this.context) {
        return
      }
      this.context.clearRect(0, 0, this.width, this.height);
      this.canvas.className = "hidden";
      this.actors = []
    }
  };

  function u() {
    if (v) {
      return
    }
    var x = n.Application,
      w = n.game.name();
    c.on("click", function() {
      j.cancel();
      setTimeout(function() {
        x.newGame()
      }, 0)
    }, c.one("#win-display .new_deal"));
    c.on("click", function() {
      x.GameChooser.show(true)
    }, c.one("#win-display .choose_game"));
    v = true
  }

  function t() {
    var x = 300,
      y = 1000,
      w = 1000;
    f.init();
    Game.eachStack(function(z) {
      var A = z.length();
      z.eachCard(function(C, B) {
        C.node.setStyle("zIndex", B - A);
        setTimeout(function() {
          f.bounce(C, 0.8, 0.2)
        }, ~~(w * (z.cards.length - 1 - B) + Math.random() * w + x))
      })
    }, "foundation");
    j.winDisplay(y)
  }

  function d() {
    var x = 500,
      y = 900,
      w = 900;
    Game.eachStack(function(z) {
      z.eachCard(function(A) {
        if (!A) {
          return
        }
        var B = A.node;
        if (A !== z.last()) {
          setTimeout(function(C) {
            C.addClass("hidden")
          }.partial(B), x);
          return
        }
        B.plug(c.Breakout, {
          columns: 5
        });
        (function(C) {
          setTimeout(function() {
            C.breakout.explode({
              random: 0.65,
              duration: y
            })
          }, x)
        })(B);
        x += w
      })
    }, "foundation");
    j.winDisplay(x + 200)
  }
  c.mix(j, {
    winDisplay: function(w) {
      l = setTimeout(function() {
        var y = n.game.name(),
          x = e.getRecord(y);
        u();
        o().set("text", n.Application.nameMap[y]);
        a().set("text", x.streaks().last().length);
        m().set("text", x.wins().length);
        r().set("text", x.loses().length);
        i().removeClass("hidden")
      }, w)
    },
    cancel: function() {
      i().addClass("hidden");
      clearTimeout(l)
    },
    enable: function() {
      k = true
    },
    disable: function() {
      k = false
    }
  });
  p.push(d);
  if (window.HTMLCanvasElement) {
    p.push(t)
  }
}, "0.0.1", {
  requires: ["solitaire", "statistics", "util", "array-extras", "breakout"]
});
YUI.add("solitaire-ios", function(e) {
  return;
  if (!e.UA.ios) {
    return
  }
  var o = e.Solitaire,
    q = o.scale,
    r = 0,
    h = 1,
    t = {
      hspacing: 0,
      vspacing: 0,
      left: 0,
      top: 0,
    },
    c = {
      scale: 1,
      offset: 60,
      maxStackHeight: 155
    },
    u = {
      Agnes: {
        offset: [null, 5],
        maxStackHeight: 260
      },
      FlowerGarden: {
        offset: [-60, 5],
        maxStackHeight: 235
      },
      Freecell: {
        scale: [1, 0.93],
        offset: [35, 5]
      },
      Golf: {
        scale: [1.1, 1],
        offset: [45, 8]
      },
      GClock: {
        scale: 0.93,
        offset: 5,
        maxStackHeight: 130
      },
      Klondike: {
        offset: [null, 5],
        maxStackHeight: [null, 340]
      },
      MonteCarlo: {
        scale: [0.88, 1],
        offset: [80, 15]
      },
      Pyramid: {
        offset: 20
      },
      Scorpion: {
        offset: 5,
        maxStackHeight: [235, 380]
      },
      Spider: {
        scale: [1.13, 0.79],
        offset: [5, 2],
        maxStackHeight: [160, 340]
      },
      TriTowers: {
        scale: 0.9,
        offset: 10
      },
      Yukon: {
        scale: [0.95, 1],
        offset: [50, 5],
        maxStackHeight: [235, 390]
      }
    },
    k = {
      Agnes: function() {
        var y = {
          hspacing: 1.13
        };
        l(this, "Reserve", e.merge(y, {
          top: 60
        }));
        l(this, "Tableau", e.merge(y, {
          top: 145
        }));
        l(this, "Foundation", e.merge(y, {
          left: 135
        }))
      },
      FlowerGarden: [function() {
        this.Card.rankHeight = 15;
        l(this, "Reserve", {
          top: 0,
          left: 70
        });
        l(this, "Foundation", {
          top: 0,
          left: 470,
          hspacing: 0,
          vspacing: 1.1
        });
        l(this, "Tableau", {
          top: 0,
          left: 140
        });
        e.mix(this.Reserve.Stack, {
          setCardPosition: function(y) {
            var z = this.cards.last(),
              B = z ? z.top + 11 : this.top,
              A = this.left;
            y.left = A;
            y.top = B
          },
          update: o.noop
        }, true)
      }, function() {
        var y = o.FlowerGarden.Reserve.Stack.setCardPosition;
        return function() {
          l(this, "Tableau", {
            left: 10,
            top: 120
          });
          l(this, "Reserve", {
            left: 17,
            top: 60
          });
          l(this, "Foundation", {
            left: 55,
            top: 0,
            hspacing: 1.5,
            vspacing: 0
          });
          e.mix(this.Reserve.Stack, {
            setCardPosition: y,
            update: o.noop
          }, true)
        }
      }()],
      Freecell: [w("Freecell", ["Foundation", "Reserve", "Tableau"]), function() {
        var y = {
          hspacing: 1.05
        };
        l(this, "Tableau", y);
        l(this, "Reserve", y);
        l(this, "Foundation", e.merge(y, {
          left: 157
        }))
      }],
      Golf: [w("Golf", ["Tableau", "Foundation"]), function() {
        l(this, "Tableau", {
          hspacing: 1.1
        });
        l(this, "Foundation", {
          left: 132
        })
      }],
      GClock: function() {
        l(this, "Foundation", {
          left: 143,
        });
        l(this, "Tableau", {
          left: 0,
          top: 250,
          hspacing: 1.05
        })
      },
      Klondike: [function() {
        w("Klondike", "Foundation").call(this);
        w("Klondike", "Tableau").call(this)
      }, function() {
        e.mix(this.Foundation.stackConfig.layout, {
          left: 135,
          hspacing: 1.13
        }, true);
        e.mix(this.Tableau.stackConfig.layout, {
          hspacing: 1.13
        }, true)
      }],
      MonteCarlo: function() {
        l(this, "Tableau", {
          cardGap: 1.1,
          vspacing: 1.05
        })
      },
      Pyramid: [function() {
        var y = w("Pyramid", "Deck");
        var z = w("Pyramid", "Waste");
        return function() {
          y.call(this);
          z.call(this);
          e.mix(this.Tableau.stackConfig.layout, {
            left: 190,
            cardGap: 1.1,
            hspacing: -0.55
          }, true)
        }
      }(), function() {
        e.mix(this.Deck.stackConfig.layout, {
          left: -10,
          top: 300,
        }, true);
        e.mix(this.Waste.stackConfig.layout, {
          top: 300,
        }, true);
        e.mix(this.Tableau.stackConfig.layout, {
          left: 120,
          cardGap: 1.1,
          hspacing: -0.55
        }, true)
      }],
      Scorpion: [function() {
        l(this, "Deck", {
          top: 0,
          left: 0
        });
        l(this, "Foundation", {
          top: 0,
          left: 420,
          hspacing: 0,
          vspacing: 1.1
        });
        l(this, "Tableau", {
          left: 60,
          top: 0,
          hspacing: 1.13
        })
      }, function() {
        l(this, "Deck", {
          left: 10,
          top: 0
        });
        l(this, "Foundation", {
          left: 75,
          top: 0,
          hspacing: 1.5,
          vspacing: 0
        });
        l(this, "Tableau", {
          left: 0,
          top: 60,
          hspacing: 1.13
        })
      }],
      Spider: [function() {
        l(this, "Foundation", {
          left: 94,
          hspacing: 1.05
        });
        l(this, "Tableau", {
          top: 65,
          hspacing: 1.05
        })
      }, function() {
        l(this, "Foundation", {
          left: 62,
          hspacing: 1
        });
        l(this, "Tableau", {
          hspacing: 1
        })
      }],
      TriTowers: function() {
        e.mix(this.Tableau.stackConfig.layout, {
          hspacing: -0.5,
          rowGaps: [3, 2, 1, 0],
          cardGap: 1
        }, true)
      },
      RussianSolitaire: [w("RussianSolitaire", ["Tableau", "Foundation"]), function() {
        l(this, "Tableau", {
          top: 55,
          hspacing: 1.13
        });
        l(this, "Foundation", {
          left: 46,
          top: 0,
          hspacing: 1.5,
          vspacing: 0
        })
      }],
      Yukon: [w("Yukon", ["Tableau", "Foundation"]), function() {
        l(this, "Tableau", {
          top: 55,
          hspacing: 1.13
        });
        l(this, "Foundation", {
          left: 46,
          top: 0,
          hspacing: 1.5,
          vspacing: 0
        })
      }]
    };
  u.FortyThieves = u.Spider1S = u.Spider2S = u.Spider;
  k.FortyThieves = k.Spider1S = k.Spider2S = k.Spider;
  u.WillOTheWisp = u.Spiderette = u.Klondike1T = u.Klondike;
  k.WillOTheWisp = k.Spiderette = k.Klondike1T = k.Klondike;
  u.RussianSolitaire = u.Yukon;
  e.mix(e.DD.DDM, {
    useHash: false,
    _pg_activate: o.noop,
    _pg_size: function() {}
  }, true);
  e.DD.DDM.set("throttleTime", 40);
  e.mix(e.DD.Drop.prototype, {
    _activateShim: function() {
      var y = e.DD.DDM;
      if (!y.activeDrag) {
        return false
      }
      if (this.get("node") === y.activeDrag.get("node")) {
        return false
      }
      if (this.get("lock")) {
        return false
      }
      if (this.inGroup(y.activeDrag.get("groups"))) {
        y._addValid(this);
        this.overTarget = false;
        if (!this.get("useShim")) {
          this.shim = this.get("node")
        }
        this.sizeShim()
      } else {
        y._removeValid(this)
      }
    },
    _deactivateShim: function() {
      this.overTarget = false
    }
  }, true);
  o.Statistics.winDisplay = function() {
    alert("You win!")
  };
  o.scale = o.noop;
  o.Card.ghost = false;
  o.Animation.animate = false;

  function l(y, A, z) {
    e.mix(y[A].stackConfig.layout, z, true)
  }

  function w(z, y) {
    var A, B = function(C) {
      return [C, e.merge(t, o[z][C].stackConfig.layout)]
    };
    A = e.Array.map(e.Array(y), B);
    return function() {
      var C = this;
      e.each(A, function(D) {
        e.mix(C[D[0]].stackConfig.layout, D[1], true)
      })
    }
  }

  function b() {
    var y = o.name(),
      z;
    if (k.hasOwnProperty(y)) {
      z = n(k[y]);
      z.call(o.game)
    }
  }

  function n(z) {
    var y = window.innerWidth === 480 ? r : h,
      A;
    if (!z.length) {
      return z
    }
    A = z[y];
    return A ? A : z[r]
  }

  function m(A) {
    var y = o.name(),
      z = u[y],
      C = c[A],
      B = z ? z[A] : C;
    return n(B ? B : C) || C
  }

  function x() {
    q.call(o.game, m("scale"))
  }

  function i() {
    return m("offset")
  }

  function g() {
    return m("maxStackHeight")
  }

  function a(z) {
    var y = z.target;
    if (y.hasClass("stack") || y.hasClass("card")) {
      return
    }
    z.preventDefault()
  }

  function j() {
    function y(z) {
      return {
        deleteSelector: function(B) {
          var C = document.styleSheets[z],
            D, A;
          if (!C) {
            return
          }
          D = Array.prototype.splice.call(C.rules, 0);
          A = D.indexOf(D.filter(function(E) {
            return E.selectorText === B
          })[0]);
          if (A !== -1) {
            C.deleteRule(A)
          }
        }
      }
    }
    y(0).deleteSelector("#menu li:hover")
  }

  function f(y) {
    if (y.target.test("#descriptions *")) {
      return
    }
    y.preventDefault()
  }

  function s() {
    var A, D, B, F, z, E, C, y = function() {
      F.removeClass("show")
    };
    j();
    F = e.one("#menu");
    z = e.one("body");
    A = e.one("#undo");
    C = e.one("#social");
    E = e.Node.create("<nav id=navbar>");
    B = e.Node.create("<a id=show_menu class='button'>New Game</a>");
    D = e.Node.create("<li class=cancel><a id='cancel'>Cancel</a></li>");
    A.get("parentNode").remove();
    B.on("click", function() {
      F.addClass("show")
    });
    F.append(D);
    E.append(B);
    if (C) {
      navigator.onLine ? E.append(C) : C.remove()
    }
    E.append(A.addClass("button"));
    z.append(E);
    e.on("click", y, ["#cancel", "#new_deal", "#restart"]);
    o.Application.GameChooser.draggable = false;
    e.one("#game-chooser .titlebar").append(document.createTextNode("Games"));
    e.one("#game-chooser .close").append(document.createTextNode("Back"));
    e.delegate("touchstart", function(G) {
      G.target.ancestor("li", true).addClass("hover")
    }, "#descriptions", "li");
    e.delegate("touchend", function(G) {
      G.target.ancestor("li", true).removeClass("hover")
    }, "#descriptions", "li");
    e.on("gamechooser:select", function(G) {
      G.choose();
      y()
    });
    e.on("gamechooser:hide", function() {
      v()
    });
    if (navigator.standalone) {
      z.addClass("fullscreen")
    }
    o.Application.resizeEvent = "orientationchange"
  }

  function d(z) {
    var y = e.one("body"),
      B, A;
    if (z) {
      B = "portrait";
      A = "landscape"
    } else {
      B = "landscape";
      A = "portrait"
    }
    y.removeClass(B).addClass(A)
  }

  function p() {
    var y = o.name(),
      A = window.innerWidth === 480,
      z = g();
    d(A);
    b();
    o.offset = {
      left: i(),
      top: 10
    };
    o.maxStackHeight = function() {
      return z
    };
    x()
  }

  function v() {
    setTimeout(function() {
      scrollTo(0, 0)
    }, 10)
  }
  e.on("beforeSetup", p);
  e.on("beforeResize", p);
  e.on("afterResize", v);
  e.on("load", v);
  e.on("touchstart", function(y) {
    if (y.target._node === document.body) {
      y.preventDefault()
    }
  }, document);
  e.on("touchmove", f, document);
  e.on("domready", s);
  o.padding = {
    x: 5,
    y: 5
  };
  o.offset = {
    left: 5,
    top: 5
  }
}, "0.0.1", {
  requires: ["solitaire", "statistics"]
});
YUI.add("auto-stack-clear", function(b) {
  var a = b.Solitaire;
  b.namespace("Solitaire.AutoStackClear");
  a.AutoStackClear.register = function() {
    b.on("solitaire|tableau:afterPush", function(e) {
      d(e, c)
    })
  };

  function d(e, m) {
    var k = e.cards,
      l, j, g, f, h;
    if (!k.length) {
      return false
    }
    for (h = k.length - 1, l = 1, j = k[h].suit; h >= 0 && l < 14; h--, l++) {
      g = k[h];
      if (g.isFaceDown || g.rank !== l || g.suit !== j) {
        return false
      }
    }
    f = l === 14;
    f && typeof m === "function" && m(e, h + 1);
    return f
  }

  function c(e, i) {
    var f, h = e.cards,
      g = h.length - i;
    a.pushUndoStack();
    f = b.Array.find(a.game.foundation.stacks, function(j) {
      return !j.cards.length
    });
    a.stationary(function() {
      while (g) {
        h.last().moveTo(f);
        g--
      }
    });
    e.updateCardsPosition()
  }
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("auto-turnover", function(c) {
  c.namespace("Solitaire.AutoTurnover");
  var b = c.Solitaire.AutoTurnover,
    a = true;
  c.on("tableau:afterPop", function(d) {
    if (!a) {
      return
    }
    c.Array.each(d.cards, function(e) {
      if (e && e.isFaceDown && e.isFree()) {
        e.faceUp()
      }
    })
  });
  c.mix(b, {
    enable: function() {
      a = true
    },
    disable: function() {
      a = false
    },
    isEnabled: function() {
      return a
    }
  })
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("solitaire-autoplay", function(h) {
  h.namespace("Solitaire.Autoplay");
  var d = h.Solitaire,
    f = d.Autoplay,
    g = true,
    b = null,
    a = ["Klondike", "Klondike1T", "FortyThieves", "GClock", "Freecell", "FlowerGarden", "Yukon", "BakersGame", "BakersDozen", "Eightoff", "LaBelleLucie", "TheFan", "Alternations", "DoubleKlondike", "KingAlbert"];
  h.on("endTurn", function() {
    if (!g || a.indexOf(d.game.name()) === -1) {
      return
    }
    if (b === null && e()) {
      h.fire("autoPlay")
    }
  });
  h.on("win", function() {
    clearInterval(b);
    b = null
  });
  h.on("autoPlay", function() {
    b = setInterval(c, 130)
  });

  function c() {
    var i = false;
    d.game.eachStack(function(j) {
      var k = j.field;
      if (i || k === "foundation" || k === "deck") {
        return
      }
      i = !j.eachCard(function(l) {
        return !l.autoPlay()
      })
    })
  }

  function e() {
    var i = false;
    d.game.eachStack(function(j) {
      var l = j.field,
        k = 14,
        m;
      if (i || l !== "tableau" && l !== "waste") {
        return
      }
      m = j.eachCard(function(n) {
        if (n.rank > k || n.isFaceDown) {
          i = true;
          return false
        } else {
          k = n.rank
        }
      })
    });
    return !i
  }
  h.mix(f, {
    enable: function() {
      g = true
    },
    disable: function() {
      g = false
    },
    isEnabled: function() {
      return g
    }
  })
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("solitaire-background-fix", function(d) {
  var c;
  d.on("load", b);
  d.on("resize", b);

  function b() {
    var g = a().get("winWidth"),
      e = a().get("winHeight"),
      f = document.body.style;
    if (!d.UA.mobile) {
      a().setStyles({
        width: g,
        height: e
      })
    }
    if (f.backgroundSize === undefined && f.MozBackgroundSize === undefined) {
      a().setStyles({
        backgroundImage: "url(greentiled.jpg)",
        backgroundRepeat: "repeat"
      })
    }
  }

  function a() {
    if (!c) {
      c = new d.Node(document.body)
    }
    return c
  }
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("statistics", function(d) {
  var v, l, n = true,
    y = window.localStorage,
    o = d.Solitaire,
    g = d.namespace("Solitaire.Statistics"),
    B = false,
    r = o.Util.cacheNode,
    c, t = (function() {
      var C = false;
      return function() {
        if (C) {
          i().addClass("hidden");
          return
        }
        var F = [],
          H = o.Application.nameMap,
          E = new d.Node(document.createDocumentFragment()),
          G, D;
        for (G in H) {
          if (!H.hasOwnProperty(G)) {
            continue
          }
          F.push([G, H[G]])
        }
        F.sort(function(J, I) {
          return J[1].localeCompare(I[1])
        });
        d.Array.each(F, function(I) {
          var J = d.Node.create("<li class=stats-gameli>" + I[1] + "</li>");
          J.setData("game", I[0]);
          E.appendChild(J)
        });
        i().appendChild(E);
        C = true
      }
    })(),
    q = r("#stats-popup"),
    f = r(".stats-title"),
    z = r("#stats-game"),
    i = r("#stats-popup .popup-title-content"),
    s = r("#stats-winpercentage"),
    u = r("#stats-wins"),
    A = r("#stats-loses"),
    k = r("#stats-currentstreak"),
    x = r("#stats-beststreak"),
    a = r("#stats-gamesplayed");
  if (!y) {
    return
  }
  d.on("newGame", function() {
    if (v) {
      m(v)
    }
    l = false;
    v = null
  });
  d.on("loadGame", function() {
    v = o.game.name();
    l = false
  });
  d.on("endTurn", function() {
    if (!v) {
      v = o.game.name()
    }
  });
  d.on("win", function() {
    if (l || !n) {
      return
    }
    j(v);
    v = null;
    l = true
  });

  function w() {
    if (B) {
      return
    }
    var C = o.Application;
    d.on("click", function() {
      i().toggleClass("hidden")
    }, f());
    d.on("click", function() {
      if (!c) {
        c = o.game.name()
      }
      C.Confirmation.show("Are you sure you want to reset all " + o.Application.nameMap[c] + " stats?", function() {
        p(c);
        g.statsDisplay(c)
      })
    }, d.one("#stats-reset"));
    d.delegate("click", function(D) {
      c = D.target.getData("game");
      g.statsDisplay(c)
    }, i(), ".stats-gameli");
    B = true
  }

  function e(F, D) {
    var E, C;
    D = D || o.game.name();
    E = h(D);
    C = y[E] || "";
    C += new Date().getTime() + "_" + F + "|";
    y[E] = C
  }

  function m(C) {
    e(0, C)
  }

  function j(C) {
    e(1, C)
  }

  function p(C) {
    y[h(C)] = ""
  }

  function h(C) {
    return C + "record"
  }

  function b(D) {
    var E = y[h(D)];

    function G() {
      if (!E || E === "") {
        return []
      }
      var H = E.split("|");
      H.splice(H.length - 1);
      return d.Array.map(H, function(I) {
        I = I.split("_");
        return {
          date: new Date(I[0]),
          won: !!parseInt(I[1], 10)
        }
      })
    }

    function F(H) {
      return H.won
    }
    var C = G();
    return {
      streaks: function() {
        var I = [],
          H = null;
        d.Array.each(C, function(J) {
          if (!J.won) {
            H && I.push(H);
            H = null
          } else {
            if (!H) {
              H = []
            }
            H.push(J)
          }
        });
        H && I.push(H);
        return I
      },
      wins: function() {
        return d.Array.filter(C, F)
      },
      loses: function() {
        return d.Array.reject(C, F)
      },
      all: function() {
        return C
      }
    }
  }
  d.mix(g, {
    statsDisplay: function(C) {
      var F = typeof C === "string" ? C : o.game.name(),
        H = b(F),
        K = H.streaks(),
        L = H.all(),
        I = H.wins(),
        E = L.length ? I.length / L.length * 100 : 0,
        D, J = 0,
        G = 0;
      if (!K.length) {
        G = J = 0
      } else {
        D = H.all().last();
        if (D && D.won) {
          J = K.last().length
        }
        G = K.sort(function(N, M) {
          return N.length - M.length
        }).last().length
      }
      w();
      a().set("text", L.length);
      z().set("text", o.Application.nameMap[F]);
      s().set("text", Math.floor(E) + "%");
      u().set("text", I.length);
      A().set("text", H.loses().length);
      k().set("text", J);
      x().set("text", G);
      t();
      d.fire("popup", "Stats")
    },
    getRecord: function(C) {
      return b(C)
    },
    enable: function() {
      n = true
    },
    disable: function() {
      n = false
    }
  })
}, "0.0.1", {
  requires: ["solitaire", "util", "array-extras", "breakout"]
});
YUI.add("display-seed-value", function(e) {
  var c = e.Solitaire,
    d = c.Util,
    a = ["Agnes", "Canfield"],
    b = d.cacheNode("#seed-value-bar"),
    f = d.cacheNode("#seed-value");
  e.namespace("Solitaire.DisplaySeedValue");
  e.on("afterSetup", function() {
    if (Game && a.indexOf(Game.name()) !== -1) {
      f().setContent(d.mapRank(d.seedRank()));
      b().removeClass("hidden")
    } else {
      b().addClass("hidden")
    }
  });
  e.on("fieldResize", function(i, h, g) {
    if (h <= 1185) {
      b().addClass("bottom")
    } else {
      b().removeClass("bottom")
    }
  })
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("solver-freecell", function(a) {
  a.namespace("Solitaire.Solver.Freecell");
  a.mix(a.Solitaire.Solver.Freecell, {
    enable: a.Solitaire.noop,
    disable: a.Solitaire.noop,
    isEnabled: function() {
      return false
    }
  });
  if (!(window.Worker && window.ArrayBuffer && window.Uint8Array)) {
    return
  }
  var d = a.Solitaire,
    k = d.Solver.Freecell,
    b = {
      s: 0,
      h: 1,
      c: 2,
      d: 3
    },
    l = true;

  function h(p) {
    return p ? p.rank << 2 | b[p.suit] : 0
  }

  function n(p) {
    return p >> 2
  }

  function e(p) {
    return ["s", "h", "c", "d"][p & 3]
  }

  function o(q, p) {
    return p[0] - q[0]
  }

  function f(p) {
    return a.Array.map(p.stacks, function(q) {
      return q
    }).sort(function(s, q) {
      var t = s.first(),
        r = q.first();
      return h(t) - h(r)
    })
  }

  function g(q) {
    var p, r, s;
    s = a.Array.map(f(q.tableau), function(u) {
      var t = [];
      u.eachCard(function(w, v) {
        t[v] = h(w)
      });
      return [t, u.cards.length]
    });
    p = [];
    a.Array.forEach(f(q.reserve), function(u, t) {
      p[t] = h(u.last())
    });
    r = [];
    a.Array.forEach(f(q.foundation), function(u, t) {
      r[t] = h(u.last())
    });
    return {
      reserve: p,
      foundation: r,
      tableau: s
    }
  }

  function c(q, p) {
    var u = p.source,
      s = p.dest,
      t, r = {};
    t = u[1];
    q.eachStack(function(v) {
      if (r.card) {
        return
      }
      var w = v.last();
      if (!w) {
        return
      }
      if (w.rank === n(t) && w.suit === e(t)) {
        r.card = w
      }
    }, u[0]);
    t = s[1];
    q.eachStack(function(v) {
      if (r.stack) {
        return
      }
      var w = v.last();
      if (!(w || t)) {
        r.stack = v
      }
      if (w && (w.rank === n(t) && w.suit === e(t))) {
        r.stack = v
      }
    }, s[0]);
    return r
  }

  function j(p, r) {
    var q = a.one(p);
    if (q) {
      r(q)
    }
  }
  var i = {
    interval: 500,
    timer: null,
    remainingMoves: null,
    init: function(p) {
      var q = p;
      while (q) {
        if (q.next) {
          q.next.prev = q
        }
        q = q.next
      }
      this.remainingMoves = p
    },
    pause: function() {
      d.Autoplay.enable();
      window.clearTimeout(this.timer);
      this.timer = null;
      j("#solver-bar .pause", function(p) {
        p.removeClass("pause");
        p.addClass("play")
      })
    },
    playCurrent: function(r) {
      var p, s, q;
      if (!this.remainingMoves) {
        return
      }
      p = c(r, this.remainingMoves);
      s = p.card;
      if (!s) {
        return
      }
      q = s.stack;
      s.after(function() {
        q.updateCardsPosition();
        p.stack.updateCardsPosition()
      });
      s.moveTo(p.stack)
    },
    prev: function(p) {
      var q = this.remainingMoves.prev;
      if (q) {
        a.fire("undo", true);
        this.remainingMoves = q
      }
    },
    next: function(p) {
      var r = this.remainingMoves,
        q = this.remainingMoves.next;
      d.Statistics.disable();
      d.WinDisplay.disable();
      this.playCurrent(p);
      if (q) {
        this.remainingMoves = q
      }
      a.fire("endTurn", true)
    },
    play: function(r) {
      var p, s, q;
      if (!this.remainingMoves) {
        return
      }
      d.Autoplay.disable();
      j("#solver-bar .play", function(t) {
        t.removeClass("play");
        t.addClass("pause")
      });
      this.next(r);
      this.timer = window.setTimeout(function() {
        this.play(r)
      }.bind(this), this.interval)
    }
  };
  var m = {
    bar: null,
    indicator: null,
    indicatorTimer: null,
    indicatorInterval: 750,
    delay: 400,
    updateIndicator: function(r) {
      var p = this.indicator,
        q, s;
      if (!p) {
        return
      }
      r = ((r || 0) % 4);
      s = "Solving";
      for (q = 0; q < r; q++) {
        s += "."
      }
      p.set("text", s);
      this.indicatorTimer = window.setTimeout(this.updateIndicator.partial(r + 1).bind(this), this.indicatorInterval)
    },
    stopIndicator: function(q) {
      var p = this.indicator;
      window.clearTimeout(this.indicatorTimer);
      if (!p) {
        return
      }
      if (q) {
        p.set("text", "Solution found");
        j("#solver-bar .controls", function(r) {
          r.removeClass("hidden")
        })
      } else {
        p.set("text", "Unable to find solution")
      }
      this.indicatorTimer = null
    },
    show: function() {
      if (a.one("#solver-bar")) {
        return
      }
      var u = a.Node.create("<div id=solver-bar></div>"),
        p = a.Node.create("<span class=indicator>"),
        s = a.Node.create("<div class=fastforward>"),
        t = a.Node.create("<div class=rewind>"),
        v = a.Node.create("<div class=play>"),
        q = a.Node.create("<div class='controls hidden'>"),
        r;
      s.on("click", function() {
        i.next(Game)
      });
      t.on("click", function() {
        i.prev(Game)
      });
      v.on("click", function() {
        if (this.hasClass("play")) {
          i.play(Game)
        } else {
          if (this.hasClass("pause")) {
            i.pause()
          }
        }
      });
      q.append(t);
      q.append(v);
      q.append(s);
      u.append(p);
      u.append(q);
      a.one("body").append(u);
      this.indicator = p;
      this.bar = u
    },
    hide: function() {
      if (this.bar) {
        this.bar.remove()
      }
    }
  };
  a.mix(k, {
    currentSolution: null,
    worker: null,
    attached: false,
    supportedGames: ["Freecell"],
    isSupported: function() {
      return Game && this.supportedGames.indexOf(Game.name()) !== -1
    },
    enable: function() {
      l = true;
      this.resume()
    },
    disable: function() {
      l = false;
      this.suspend()
    },
    resume: function(p) {
      if (!(l && this.isSupported())) {
        return
      }
      this.createUI();
      this.attachEvents();
      if (!p) {
        this.solve()
      }
    },
    suspend: function() {
      if (this.worker) {
        this.worker.terminate()
      }
      m.hide()
    },
    isEnabled: function() {
      return l
    },
    attachEvents: function() {
      if (this.attached) {
        return
      }
      var p = i.pause.bind(i);
      a.on("afterSetup", function() {
        if (this.isSupported()) {
          this.solve()
        } else {
          this.suspend()
        }
      }.bind(this));
      a.on("endTurn", function(q) {
        if (q || !this.isSupported()) {
          return
        }
        this.solve()
      }.bind(this));
      a.on("autoPlay", function() {
        k.suspend()
      });
      a.on("win", function() {
        k.suspend()
      });
      document.documentElement.addEventListener("mousedown", function(q) {
        if (q.target.className.match(/\bpause\b/)) {
          return
        }
        p()
      }, true);
      this.attached = true
    },
    createUI: function() {
      m.show()
    },
    stop: function() {
      if (this.worker) {
        this.worker.terminate()
      }
    },
    solve: function() {
      if (!l) {
        return
      }
      this.stop();
      j("#solver-bar .controls", function(p) {
        p.addClass("hidden")
      });
      this.currentSolution = null;
      this.worker = new Worker("js/solver-freecell-worker.js");
      this.worker.onmessage = function(q) {
        var p = this.currentSolution = q.data.solution;
        i.init(p);
        if (p) {
          m.stopIndicator(true)
        } else {
          m.stopIndicator(false)
        }
      }.bind(this);
      this.worker.postMessage({
        action: "solve",
        param: g(Game)
      });
      window.clearTimeout(m.indicatorTimer);
      m.indicatorTimer = window.setTimeout(m.updateIndicator.bind(m), m.delay)
    }
  }, true);
  a.on("beforeSetup", function() {
    k.resume(true)
  })
}, "0.0.1", {
  requires: ["solitaire", "statistics", "win-display"]
});
YUI.add("agnes", function(f) {
  function e(h, g) {
    return (h + 1) % 13 === g % 13
  }
  var d = f.Solitaire,
    b = d.Klondike,
    a = d.Util.seedRank,
    c = d.Agnes = instance(b, {
      fields: ["Foundation", "Deck", "Waste", "Tableau", "Reserve"],
      height: function() {
        return this.Card.base.height * 5.6
      },
      maxStackHeight: function() {
        return this.Card.height * 2.75
      },
      deal: function() {
        var g = this.deck.stacks[0],
          i = this.foundation.stacks[0],
          h;
        b.deal.call(this);
        h = g.last();
        h.moveTo(i);
        h.faceUp();
        h.flipPostMove();
        this.turnOver()
      },
      redeal: d.noop,
      turnOver: function() {
        var g = this.deck.stacks[0],
          n = this.reserve.stacks,
          l = this.waste.stacks,
          m, o, h, k = [],
          j;
        if (g.cards.length < 7) {
          m = 2;
          o = l
        } else {
          m = 7;
          o = n
        }
        this.withoutFlip(function() {
          for (j = 0; j < m; j++) {
            h = g.last();
            h.moveTo(o[j]);
            h.faceUp();
            k.push(h);
            if (j === m - 1) {
              h.after(function() {
                f.Array.forEach(k, function(i) {
                  d.Animation.flip(i)
                })
              })
            }
          }
        })
      },
      Waste: instance(b.Waste, {
        stackConfig: {
          total: 2,
          layout: {
            hspacing: 1.5,
            top: 0,
            left: 0
          }
        },
        Stack: instance(d.Stack, {
          setCardPosition: function(g) {
            var h = this.last(),
              j = this.top,
              i = h ? h.left + d.Card.width * 1.5 : this.left;
            g.top = j;
            g.left = i
          }
        })
      }),
      Reserve: {
        field: "reserve",
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            left: 0,
            top: function() {
              return d.Card.height * 4.4
            }
          }
        },
        Stack: instance(b.Stack, {
          images: {},
          setCardPosition: function(g) {
            var h = this.last(),
              j = h ? h.top + h.rankHeight : this.top,
              i = this.left;
            g.top = j;
            g.left = i
          }
        })
      },
      Card: instance(b.Card, {
        playable: function() {
          if (this.stack.field === "reserve") {
            return this.isFree()
          } else {
            return b.Card.playable.call(this)
          }
        },
        validTarget: function(g) {
          var h = g.last();
          switch (g.field) {
            case "tableau":
              if (!h) {
                return this.validFreeTableauTarget()
              } else {
                return !h.isFaceDown && h.color !== this.color && e(this.rank, h.rank)
              }
            case "foundation":
              return this.validFoundationTarget(h);
            default:
              return false
          }
        },
        validFreeTableauTarget: function() {
          return e(this.rank, a())
        },
        validFoundationTarget: function(g) {
          if (!g) {
            return this.rank === a()
          } else {
            return this.suit === g.suit && this.rank % 13 === (g.rank + 1) % 13
          }
        }
      })
    })
}, "0.0.1", {
  requires: ["klondike", "util"]
});
YUI.add("golf", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.Golf = instance(b, {
      fields: ["Deck", "Foundation", "Tableau"],
      deal: function() {
        var g, d, h = this.tableau.stacks,
          e = this.deck,
          f = this.foundation.stacks[0],
          i;
        for (i = 0; i < 5; i++) {
          for (d = 0; d < 7; d++) {
            g = e.pop();
            h[d].push(g);
            g.faceUp().flipPostMove(b.Animation.interval * 40)
          }
        }
        g = e.pop();
        f.push(g);
        g.faceUp().flipPostMove(b.Animation.interval * 100);
        e.createStack()
      },
      turnOver: function() {
        var d = this.deck.stacks[0],
          e = this.foundation.stacks[0],
          f = d.last();
        if (f) {
          this.withoutFlip(function() {
            f.faceUp().moveTo(e);
            f.after(function() {
              b.Animation.flip(f)
            })
          })
        }
      },
      isWon: function() {
        var d = true;
        this.eachStack(function(e) {
          e.eachCard(function(f) {
            if (f) {
              d = false
            }
            return d
          })
        }, "tableau");
        return d
      },
      height: function() {
        return this.Card.base.height * 4
      },
      Deck: instance(b.Deck, {
        field: "deck",
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: function() {
              return b.Card.height * 3
            },
            left: 0
          }
        },
        createStack: function() {
          var e, d;
          for (e = 0, d = this.cards.length; e < d; e++) {
            this.stacks[0].push(this.cards[e])
          }
        }
      }),
      Tableau: {
        field: "tableau",
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        }
      },
      Foundation: {
        field: "foundation",
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: function() {
              return b.Card.height * 3
            },
            left: function() {
              return b.Card.width * 3.75
            }
          }
        }
      },
      Events: instance(b.Events, {
        dragCheck: function(d) {
          this.getCard().autoPlay();
          this._afterDragEnd();
          d.halt()
        }
      }),
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "tableau":
              return this.autoPlay(true);
            case "deck":
              return this === this.stack.last();
            case "foundation":
              return false
          }
        },
        validTarget: function(d) {
          if (d.field !== "foundation") {
            return false
          }
          var f = d.last(),
            e = Math.abs(this.rank - f.rank);
          return e === 1
        },
        isFree: function() {
          return !this.isFaceDown && this === this.stack.last()
        },
      }),
      Stack: instance(b.Stack, {
        images: {}
      })
    }, true);
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  });
  c.mix(a.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true);
  c.mix(a.Deck.Stack, {
    setCardPosition: function(d) {
      var e = this.last(),
        g, f, h;
      g = this.top;
      if (e) {
        f = e.left + d.width * 0.1;
        h = e.zIndex + 1
      } else {
        f = this.left;
        h = 0
      }
      d.top = g;
      d.left = f;
      d.zIndex = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("klondike", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.Klondike = instance(b, {
      fields: ["Foundation", "Deck", "Waste", "Tableau"],
      cardsPerTurnOver: 3,
      deal: function() {
        var g, e = 0,
          f = this.deck,
          h = this.tableau.stacks,
          d = h.length - 1,
          i = b.Animation;
        while (d >= 0) {
          g = f.pop();
          g.flipPostMove();
          h[(h.length - 1) - d].push(g);
          g.faceUp();
          for (e = h.length - d; e < h.length; e++) {
            g = f.pop();
            h[e].push(g)
          }
          d--
        }
        f.createStack()
      },
      turnOver: function() {
        var e = this.deck.stacks[0],
          k = this.waste.stacks[0],
          l = a.Card.updatePosition,
          d = b.game.Card,
          f, j = [],
          h, g;
        d.updatePosition = b.noop;
        this.withoutFlip(function() {
          for (h = e.cards.length, g = h - this.cardsPerTurnOver; h > g && h; h--) {
            f = e.last();
            j.push(f);
            f.faceUp();
            if (h === g + 1 || h === 1) {
              f.after(function() {
                c.Array.forEach(j, function(i) {
                  b.Animation.flip(i)
                })
              })
            }
            f.moveTo(k)
          }
        });
        d.updatePosition = l;
        k.eachCard(function(i) {
          i.updatePosition()
        })
      },
      redeal: b.Util.moveWasteToDeck,
      Stack: instance(b.Stack),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 3.75
            }
          }
        },
        field: "foundation",
      },
      Deck: instance(b.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck"
      }),
      Waste: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: function() {
              return b.Card.width * 1.5
            }
          }
        },
        field: "waste",
      },
      Tableau: {
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "tableau",
      },
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "tableau":
              return !this.isFaceDown;
            case "foundation":
              return false;
            case "waste":
              return this.isFree();
            case "deck":
              return true
          }
        },
        validFoundationTarget: function(d) {
          if (!d) {
            return this.rank === 1
          } else {
            return d.suit === this.suit && d.rank === this.rank - 1
          }
        },
        validTarget: function(e) {
          var f, d;
          if (e.field) {
            f = e.last();
            d = e
          } else {
            f = e;
            d = e.stack
          }
          switch (d.field) {
            case "tableau":
              if (!f) {
                return this.rank === 13
              } else {
                return !f.isFaceDown && f.color !== this.color && f.rank === this.rank + 1
              }
            case "foundation":
              return this.validFoundationTarget(f);
            default:
              return false
          }
        }
      })
    });
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  });
  c.mix(a.Stack, {
    validTarget: function(d) {
      return d.field === "tableau" && this.first().validTarget(d)
    }
  }, true);
  c.mix(a.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true);
  c.mix(a.Waste.Stack, {
    setCardPosition: function(e) {
      var g = this.cards,
        f = g.last(),
        d = this;
      c.Array.each(g.slice(-2), function(h, j) {
        h.left = d.left;
        h.top = d.top
      });
      if (!g.length) {
        e.left = d.left
      }
      if (g.length === 1) {
        e.left = d.left + 0.2 * e.width
      } else {
        if (g.length > 1) {
          f.left = d.left + 0.2 * e.width;
          f.top = d.top;
          e.left = d.left + 0.4 * e.width
        }
      }
      e.top = d.top
    }
  }, true);
  c.mix(a.Deck.Stack, {
    createNode: function() {
      b.Stack.createNode.call(this);
      this.node.on("click", b.Events.clickEmptyDeck);
      this.node.addClass("playable")
    }
  }, true)
}, "0.0.1", {
  requires: ["util"]
});
YUI.add("klondike1t", function(d) {
  var c = d.Solitaire,
    b = c.Klondike,
    a = c.Klondike1T = instance(b, {
      cardsPerTurnOver: 1,
      redeal: c.noop,
      Waste: instance(b.Waste, {
        Stack: instance(c.Stack)
      }),
      Deck: instance(b.Deck, {
        Stack: instance(b.Deck.Stack, {
          createNode: function() {
            b.Deck.Stack.createNode.call(this);
            this.node.removeClass("playable")
          }
        })
      })
    })
}, "0.0.1", {
  requires: ["klondike"]
});
YUI.add("flower-garden", function(d) {
  var a = 0,
    b = d.Solitaire,
    c = b.Util,
    e = d.Solitaire.FlowerGarden = instance(b, {
      offset: {
        left: function() {
          return b.Card.base.width * 1.5
        },
        top: 70
      },
      fields: ["Foundation", "Reserve", "Tableau"],
      deal: function() {
        var j, h = this.deck,
          g = this.reserve.stacks[0],
          f = 0,
          k, l = this.tableau.stacks;
        for (k = 0; k < 36; k++) {
          j = h.pop();
          j.origin = {
            left: j.width * 1.25 * (k % 6),
            top: -j.height
          };
          l[f].push(j);
          j.faceUp();
          j.flipPostMove(0);
          f++;
          if (f === 6) {
            f = 0
          }
        }
        j.after(function() {
          b.Animation.flip(this);
          setTimeout(function() {
            g.eachCard(function(i) {
              b.Animation.flip(i)
            })
          }, b.Animation.interval * 20)
        });
        while (j = h.pop()) {
          g.push(j);
          j.faceUp()
        }
      },
      height: function() {
        return this.Card.base.height * 5.5
      },
      maxStackHeight: function() {
        return this.Card.height * 3.1
      },
      Stack: instance(b.Stack),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 1.25
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Reserve: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 4.5
            },
            left: function() {
              return b.Card.width * 0.2
            }
          }
        },
        field: "reserve",
        draggable: true
      },
      Tableau: {
        stackConfig: {
          total: 6,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.25
            },
            left: 0
          }
        },
        field: "tableau",
        draggable: true
      },
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "foundation":
              return false;
            case "tableau":
              return this.createProxyStack();
            case "reserve":
              return true
          }
        },
        createProxyStack: function() {
          var f;
          switch (this.stack.field) {
            case "foundation":
              this.proxyStack = null;
              break;
            case "tableau":
              a = c.freeTableaus().length;
              return b.Card.createProxyStack.call(this);
            case "reserve":
              f = instance(this.stack);
              f.cards = [this];
              this.proxyStack = f;
              break
          }
          return this.proxyStack
        },
        moveTo: function(g) {
          var k = this.stack.cards,
            h = k.indexOf(this),
            j, f;
          b.Card.moveTo.call(this, g);
          k.splice(h, 0, null);
          for (j = h + 1, f = k.length; j < f; j++) {
            k[j].pushPosition()
          }
          k.splice(h, 1)
        },
        validTarget: function(f) {
          var g = f.last();
          switch (f.field) {
            case "tableau":
              if (!g) {
                return a > 0
              } else {
                return g.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!g) {
                return this.rank === 1
              } else {
                return g.suit === this.suit && g.rank === this.rank - 1
              }
              break;
            default:
              return false;
              break
          }
        },
        isFree: function() {
          if (this.stack.field === "reserve") {
            return true
          } else {
            return b.Card.isFree.call(this)
          }
        }
      })
    }, true);
  d.Array.each(e.fields, function(f) {
    e[f].Stack = instance(e.Stack)
  }, true);
  d.mix(e.Stack, {
    images: {
      foundation: "freeslot.png",
      tableau: "freeslot.png"
    },
    validTarget: function(f) {
      return f.field === "tableau" && this.first().validTarget(f)
    },
    validCard: function() {
      return a-- > 0
    }
  }, true);
  d.mix(e.Tableau.Stack, {
    setCardPosition: function(f) {
      var g = this.cards.last(),
        i = g ? g.top + f.rankHeight : this.top,
        h = this.left;
      f.left = h;
      f.top = i
    }
  }, true);
  d.mix(e.Reserve.Stack, {
    setCardPosition: function(f) {
      var g = this.cards.last(),
        i = g ? g.left + f.width * 0.4 : this.left,
        h = this.top;
      f.left = i;
      f.top = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("forty-thieves", function(c) {
  var a = c.Solitaire,
    b = c.Solitaire.FortyThieves = instance(a, {
      fields: ["Foundation", "Deck", "Waste", "Tableau"],
      deal: function() {
        var f, d, h, e = this.deck,
          g = this.tableau.stacks;
        for (h = 0; h < 4; h++) {
          for (d = 0; d < 10; d++) {
            f = e.pop();
            g[d].push(f);
            f.faceUp()
          }
        }
        a.Util.flipStacks(f);
        e.createStack()
      },
      redeal: a.noop,
      turnOver: function() {
        var d = this.deck.stacks[0],
          f = this.waste.stacks[0],
          e;
        e = d.last();
        if (e) {
          this.withoutFlip(function() {
            e.moveTo(f);
            e.faceUp();
            e.after(function() {
              a.Animation.flip(e)
            })
          })
        }
      },
      Stack: instance(a.Stack),
      Foundation: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return a.Card.width * 2.5
            }
          }
        },
        field: "foundation"
      },
      Deck: instance(a.Deck, {
        count: 2,
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck"
      }),
      Waste: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: function() {
              return a.Card.width * 1.25
            }
          }
        },
        field: "waste"
      },
      Tableau: {
        stackConfig: {
          total: 10,
          layout: {
            hspacing: 1.25,
            top: function() {
              return a.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "tableau"
      },
      Card: instance(a.Card, {
        origin: {
          left: function() {
            return a.game.deck.stacks[0].left
          },
          top: function() {
            return a.game.deck.stacks[0].top
          }
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return true
              } else {
                return !e.isFaceDown && e.suit === this.suit && e.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return e.suit === this.suit && e.rank === this.rank - 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  c.Array.each(b.fields, function(d) {
    b[d].Stack = instance(b.Stack)
  });
  c.mix(b.Stack, {
    validTarget: function(d) {
      return d.field === "tableau" && this.first().validTarget(d)
    },
    validCard: function() {
      return false
    }
  }, true);
  c.mix(b.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true);
  c.mix(b.Deck.Stack, {
    images: {
      deck: null
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("freecell", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.Freecell = instance(b, {
      fields: ["Foundation", "Reserve", "Tableau"],
      deal: function() {
        var f, d = 0,
          g = this.tableau.stacks,
          e = b.Animation.interval * 50;
        while (f = this.deck.pop()) {
          g[d].push(f);
          f.faceUp();
          f.flipPostMove(e);
          d++;
          if (d === g.length) {
            d = 0
          }
        }
      },
      openSlots: function(g) {
        var j = 1,
          e = 0,
          h, d, k = this.reserve.stacks,
          f = this.tableau.stacks;
        for (h = 0; h < k.length; h++) {
          d = k[h];
          !d.last() && j++
        }
        for (h = 0; h < f.length; h++) {
          d = f[h];
          g !== d && !f[h].last() && e++
        }
        j *= Math.pow(2, e);
        return j
      },
      Stack: instance(b.Stack),
      height: function() {
        return this.Card.base.height * 5
      },
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 6
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Reserve: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        },
        field: "reserve",
        draggable: true
      },
      Tableau: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "tableau",
        draggable: true
      },
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "reserve":
              return true;
            case "tableau":
              return this.createProxyStack();
            case "foundation":
              return false
          }
        },
        createProxyStack: function() {
          var d = b.Card.createProxyStack.call(this);
          this.proxyStack = d && d.cards.length <= b.game.openSlots(d) ? d : null;
          return this.proxyStack
        },
        validTableauTarget: function(d) {
          return d.color !== this.color && d.rank === this.rank + 1
        },
        validTarget: function(e) {
          var d, f;
          if (e.field) {
            d = e;
            f = d.last()
          } else {
            f = e;
            d = f.stack
          }
          switch (d.field) {
            case "tableau":
              if (!f) {
                return true
              } else {
                return this.validTableauTarget(f)
              }
              break;
            case "foundation":
              if (!f) {
                return this.rank === 1
              } else {
                return f.suit === this.suit && f.rank === this.rank - 1
              }
              break;
            case "reserve":
              return !f;
              break
          }
        }
      })
    });
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  }, true);
  c.mix(a.Stack, {
    validTarget: function(d) {
      if (d.field !== "tableau" || !this.first().validTarget(d)) {
        return false
      }
      return this.cards.length <= b.game.openSlots(d, this.last())
    }
  }, true);
  c.mix(a.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("grandfathers-clock", function(e) {
  function b(h, g) {
    var f = h.length;
    g %= f;
    if (g < 0) {
      g += f
    }
    return h[g]
  }

  function d(f, h, g) {
    if (f <= h) {
      return f <= g && g <= h
    } else {
      return f <= g || g <= h
    }
  }
  e.namespace("Solitaire.GClock");
  var c = e.Solitaire,
    a = e.Solitaire.GClock = instance(c, {
      fields: ["Foundation", "Tableau"],
      deal: function() {
        var k, o = this.deck,
          g = o.cards,
          j = [],
          q = ["d", "c", "h", "s"],
          r, n = 0,
          m = 51,
          l, f = this.foundation.stacks,
          h = this.tableau.stacks,
          p;
        while (m >= 0) {
          k = g[m];
          r = false;
          for (l = 2; l <= 13; l++) {
            if (k.rank === l && k.suit === b(q, l)) {
              r = true;
              g.splice(m, 1);
              j[l - 2] = k;
              break
            }
          }
          if (!r) {
            h[n].push(k);
            n = (n + 1) % 8;
            k.faceUp();
            p = k
          }
          m--
        }
        for (m = 0; m < 12; m++) {
          f[(m + 2) % 12].push(j[m]);
          j[m].faceUp();
          j[m].flipPostMove(c.Animation.interval)
        }
        c.Util.flipStacks(p)
      },
      height: function() {
        return this.Card.base.height * 5.75
      },
      maxStackHeight: function() {
        return this.Card.height * 3
      },
      Stack: instance(c.Stack),
      Foundation: {
        stackConfig: {
          total: 12,
          layout: {
            hspacing: 1.25,
            top: function() {
              return c.Card.height * 3
            },
            left: function() {
              return c.Card.width * 3.25
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Tableau: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return c.Card.width * 7.25
            }
          }
        },
        field: "tableau",
        draggable: true
      },
      Card: instance(c.Card, {
        origin: {
          left: function() {
            return c.game.foundation.stacks[9].left
          },
          top: function() {
            return c.game.foundation.stacks[0].top
          }
        },
        createProxyStack: function() {
          var f;
          switch (this.stack.field) {
            case "foundation":
              this.proxyStack = null;
              break;
            case "tableau":
              return c.Card.createProxyStack.call(this)
          }
          return this.proxyStack
        },
        validTarget: function(f) {
          var h = f.last(),
            i, g;
          switch (f.field) {
            case "tableau":
              if (!h) {
                return true
              } else {
                return h.rank === this.rank + 1
              }
              break;
            case "foundation":
              g = (f.index() + 3) % 12;
              i = h.rank;
              return h.suit === this.suit && (h.rank + 1) % 13 === this.rank % 13 && d(f.first().rank, g, this.rank);
              break;
            default:
              return false;
              break
          }
        }
      })
    });
  e.Array.each(a.fields, function(f) {
    a[f].Stack = instance(a.Stack)
  }, true);
  e.mix(a.Stack, {
    validTarget: function(f) {
      return f.field === "tableau" && this.first().validTarget(f)
    },
    validCard: function() {
      return false
    }
  }, true);
  e.mix(a.Tableau.Stack, {
    setCardPosition: function(f) {
      var g = this.cards.last(),
        i = g ? g.top + g.rankHeight : this.top,
        h = this.left;
      f.left = h;
      f.top = i
    },
    layout: function(g, f) {
      c.Stack.layout.call(this, g, f);
      if (f > 3) {
        this.top = normalize(g.top) + c.Card.height * 3.75;
        this.left -= c.Card.width * 5
      }
    }
  }, true);
  e.mix(a.Foundation.Stack, {
    index: function() {
      return a.foundation.stacks.indexOf(this)
    },
    layout: function(g, f) {
      var j = Math.sin(Math.PI * f / 6) * c.Card.height * 2.25,
        h = Math.cos(Math.PI * f / 6) * c.Card.width * 3;
      this.top = j + normalize(g.top);
      this.left = h + normalize(g.left)
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("monte-carlo", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.MonteCarlo = instance(b, {
      fields: ["Foundation", "Deck", "Tableau"],
      createEvents: function() {
        b.createEvents.call(this);
        c.delegate("click", b.Events.clickEmptyDeck, b.selector, ".stack");
        c.on("solitaire|endTurn", this.deckPlayable);
        c.on("solitaire|afterSetup", this.deckPlayable)
      },
      deckPlayable: function() {
        var e = false,
          d = Game.deck.stacks[0].node;
        Game.eachStack(function(f) {
          if (!e && c.Array.indexOf(f.cards, null) !== -1) {
            e = true
          }
        }, "tableau");
        if (e) {
          d.addClass("playable")
        } else {
          d.removeClass("playable")
        }
      },
      deal: function() {
        var f, d, g, e = this.deck,
          h = this.tableau.stacks;
        for (d = 0; d < 5; d++) {
          for (g = 0; g < 5; g++) {
            f = e.pop();
            h[d].push(f);
            f.faceUp()
          }
        }
        f.after(function() {
          var r = 2,
            q = 2,
            t = 1,
            n = 0,
            s = 1,
            p = -1,
            m = -1,
            o = 1,
            k = 0,
            l = 50,
            i = 70,
            j;
          for (g = 0; g < 25; g++) {
            if (g === (m + 1) * o) {
              m++;
              o++
            }
            j = h[q].cards[r];
            setTimeout(function(u) {
              b.Animation.flip(u)
            }.partial(j), l);
            l += i;
            r += t;
            q += n;
            if (k++ === m) {
              k = 0;
              if (t === 1) {
                s = -1
              } else {
                if (t === -1) {
                  s = 1
                }
              }
              if (n === 1) {
                p = -1
              } else {
                if (n === -1) {
                  p = 1
                }
              }
              t += s;
              n += p
            }
          }
        });
        e.createStack()
      },
      redeal: function() {
        var j = this.tableau.stacks,
          e = this.deck.stacks[0],
          k = c.Array.reduce(j, [], function(l, i) {
            return l.concat(i.compact())
          }),
          d = k.length,
          f, h, g;
        c.Array.each(j, function(i) {
          i.node.remove();
          i.cards = [];
          i.createNode()
        });
        for (g = h = 0; g < d; g++) {
          if (g && !(g % 5)) {
            h++
          }
          j[h].push(k[g])
        }
        this.withoutFlip(function() {
          while (g < 25 && e.cards.length) {
            if (!(g % 5)) {
              h++
            }
            f = e.last();
            f.moveTo(j[h]);
            f.faceUp();
            f.node.setStyle("zIndex", 100 - g);
            g++;
            f.flipPostMove(b.Animation.interval * 5)
          }
        })
      },
      height: function() {
        return this.Card.base.height * 6
      },
      Stack: instance(b.Stack, {
        images: {
          deck: "freeslot.png"
        },
        updateDragGroups: function() {
          var d = b.activeCard;
          c.Array.each(this.cards, function(e) {
            if (!e) {
              return
            }
            if (d.validTarget(e)) {
              e.node.drop.addToGroup("open")
            } else {
              e.node.drop.removeFromGroup("open")
            }
          })
        },
        index: function() {
          return 0
        }
      }),
      Events: instance(b.Events, {
        drop: function(h) {
          var g = b.activeCard,
            d = b.game.foundation.stacks[0],
            f = h.drop.get("node").getData("target");
          if (!g) {
            return
          }
          b.stationary(function() {
            f.moveTo(d);
            g.moveTo(d)
          });
          b.endTurn()
        }
      }),
      Foundation: {
        stackConfig: {
          total: 1,
          layout: {
            spacing: 0,
            top: 0,
            left: function() {
              return b.Card.width * 10.5
            }
          }
        },
        field: "foundation"
      },
      Deck: instance(b.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            spacing: 0,
            top: 0,
            left: function() {
              return b.Card.width * 2
            }
          }
        },
        field: "deck",
        createStack: function() {
          var e, d;
          for (e = 0, d = this.cards.length; e < d; e++) {
            this.stacks[0].push(this.cards[e])
          }
        }
      }),
      Tableau: {
        stackConfig: {
          total: 5,
          layout: {
            cardGap: 1.25,
            vspacing: 1.25,
            hspacing: 0,
            top: 0,
            left: function() {
              return b.Card.width * 3.5
            }
          }
        },
        field: "tableau"
      },
      Card: instance(b.Card, {
        row: function() {
          return this.stack.index()
        },
        column: function() {
          return this.stack.cards.indexOf(this)
        },
        validTarget: function(d) {
          if (this === d || !(this.rank === d.rank && d.isFree())) {
            return false
          }
          return Math.abs(d.row() - this.row()) <= 1 && Math.abs(d.column() - this.column()) <= 1
        },
        createProxyStack: function() {
          var d = null;
          if (this.isFree()) {
            d = instance(this.stack);
            d.cards = this.proxyCards()
          }
          this.proxyStack = d;
          return this.proxyStack
        },
        proxyCards: function() {
          return [this]
        },
        isFree: function() {
          return this.stack.field === "tableau"
        },
        turnOver: function() {
          this.stack.field === "deck" && b.game.redeal()
        }
      })
    });
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  });
  c.mix(a.Tableau.Stack, {
    deleteItem: function(d) {
      var f = this.cards,
        e = f.indexOf(d);
      if (e !== -1) {
        f[e] = null
      }
    },
    setCardPosition: function(d) {
      var f = this.cards.last(),
        e = a.Tableau.stackConfig.layout,
        h = this.top,
        g = f ? f.left + d.width * e.cardGap : this.left;
      d.left = g;
      d.top = h
    },
    compact: function() {
      var h = this.cards,
        e, g = [],
        f, d;
      for (f = 0, d = h.length; f < d; f++) {
        e = h[f];
        if (e) {
          g.push(e);
          e.pushPosition()
        }
      }
      return g
    },
    index: function() {
      return b.game.tableau.stacks.indexOf(this)
    }
  }, true);
  c.mix(a.Deck.Stack, {
    updateDragGroups: function() {
      var e = b.activeCard,
        d = this.last();
      if (!d) {
        return
      }
      if (e.validTarget(d)) {
        d.node.drop.addToGroup("open")
      } else {
        d.node.drop.removeFromGroup("open")
      }
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "array-extras"]
});
YUI.add("pyramid", function(c) {
  var a = c.Solitaire,
    b = c.Solitaire.Pyramid = instance(a, {
      fields: ["Foundation", "Deck", "Waste", "Tableau"],
      width: function() {
        return a.Card.base.width * 10
      },
      deal: function() {
        var f, d, g, e = this.deck,
          h = this.tableau.stacks;
        for (d = 0; d < 7; d++) {
          for (g = 0; g <= d; g++) {
            f = e.pop();
            h[d].push(f);
            f.faceUp()
          }
        }
        f.after(function() {
          var j = Math.floor(h.length / 2),
            m = h.length,
            n, q, r, k, o = 0,
            p = 0,
            l = 200;
          n = q = j;
          while (n >= 0) {
            r = m - 1;
            k = [];
            do {
              k = c.Array.unique(k.concat(h[r].cards[n], h[r].cards[q]));
              r--;
              q--
            } while (q >= n);
            c.Array.each(k, function(i) {
              setTimeout(function() {
                a.Animation.flip(i)
              }, p)
            });
            o++;
            n = j - o;
            q = j + o;
            p += l
          }
          setTimeout(function() {
            a.Animation.flip(e.last())
          }, p)
        });
        e.createStack();
        f = e.last();
        f.faceUp()
      },
      turnOver: function() {
        var d = this.deck.stacks[0],
          e = this.waste.stacks[0];
        if (d.cards.length === 1) {
          return
        }
        d.last().moveTo(e)
      },
      height: function() {
        return this.Card.base.height * 4.85
      },
      Stack: instance(a.Stack, {
        images: {},
        updateDragGroups: function() {
          var d = a.activeCard;
          c.Array.each(this.cards, function(e) {
            if (!e) {
              return
            }
            if (d.validTarget(e)) {
              e.node.drop.addToGroup("open")
            } else {
              e.node.drop.removeFromGroup("open")
            }
          })
        }
      }),
      Events: instance(a.Events, {
        dragCheck: function(d) {
          if (!a.game.autoPlay.call(this)) {
            a.Events.dragCheck.call(this)
          }
        },
        drop: function(h) {
          var g = a.activeCard,
            d = a.game.foundation.stacks[0],
            f = h.drop.get("node").getData("target");
          if (!g) {
            return
          }
          a.stationary(function() {
            f.moveTo(d);
            g.moveTo(d)
          });
          a.endTurn()
        }
      }),
      Foundation: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: function() {
              return a.Card.width * 8
            }
          }
        },
        field: "foundation"
      },
      Deck: instance(a.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck",
        createStack: function() {
          var e, d;
          for (e = 0, d = this.cards.length; e < d; e++) {
            this.stacks[0].push(this.cards[e])
          }
        }
      }),
      Waste: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: function() {
              return a.Card.width * 1.5
            }
          }
        },
        field: "waste"
      },
      Tableau: {
        stackConfig: {
          total: 7,
          layout: {
            vspacing: 0.6,
            hspacing: -0.625,
            cardGap: 1.25,
            top: 0,
            left: function() {
              return a.Card.width * 5
            }
          }
        },
        field: "tableau"
      },
      Card: instance(a.Card, {
        validTarget: function(d) {
          if (d.field === "foundation") {
            return this.isFree() && this.rank === 13
          }
          if (d.isFree()) {
            return this.rank + d.rank === 13
          }
          return false
        },
        createProxyNode: function() {
          return this.rank === 13 ? "" : a.Card.createProxyNode.call(this)
        },
        createProxyStack: function() {
          var d = null;
          if (this.isFree()) {
            d = instance(this.stack);
            d.cards = this.proxyCards()
          }
          this.proxyStack = d;
          return this.proxyStack
        },
        proxyCards: function() {
          return [this]
        },
        isFree: function() {
          var d = this.stack,
            h = d.index(),
            f = d.cards.indexOf(this),
            e = a.game,
            g = d.next();
          if (d.field === "deck" || d.field === "waste") {
            return !this.isFaceDown && this === this.stack.last()
          } else {
            return !(this.stack.field === "foundation" || g && (g.cards[f] || g.cards[f + 1]))
          }
        },
        turnOver: function() {
          this.stack.field === "deck" && !this.isFaceDown && a.game.turnOver()
        }
      })
    });
  c.Array.each(b.fields, function(d) {
    b[d].Stack = instance(b.Stack)
  });
  c.mix(b.Tableau.Stack, {
    deleteItem: function(d) {
      var f = this.cards,
        e = f.indexOf(d);
      if (e !== -1) {
        f[e] = null
      }
    },
    setCardPosition: function(d) {
      var f = b.Tableau.stackConfig.layout,
        e = this.cards.last(),
        h = this.top,
        g = e ? e.left + d.width * f.cardGap : this.left;
      d.left = g;
      d.top = h;
      d.zIndex = this.index() * 10
    }
  }, true);
  c.mix(b.Deck.Stack, {
    deleteItem: function(d) {
      b.Stack.deleteItem.call(this, d);
      this.update()
    },
    update: function(d) {
      var e = this.last();
      e && e.faceUp(d)
    },
    updateDragGroups: function() {
      var e = a.activeCard,
        d = this.last();
      if (!d) {
        return
      }
      if (e.validTarget(d)) {
        d.node.drop.addToGroup("open")
      } else {
        d.node.drop.removeFromGroup("open")
      }
    }
  }, true);
  b.Waste.Stack.updateDragGroups = b.Deck.Stack.updateDragGroups
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("russian-solitaire", function(d) {
  var b = d.Solitaire,
    c = b.Yukon,
    a = b.RussianSolitaire = instance(c, {
      Card: instance(c.Card)
    });
  a.Card.validTarget = function(e) {
    var f = e.last();
    switch (e.field) {
      case "tableau":
        if (!f) {
          return this.rank === 13
        } else {
          return !f.isFaceDown && f.suit === this.suit && f.rank === this.rank + 1
        }
      case "foundation":
        if (!f) {
          return this.rank === 1
        } else {
          return f.suit === this.suit && f.rank === this.rank - 1
        }
      default:
        return false
    }
  }
}, "0.0.1", {
  requires: ["yukon"]
});
YUI.add("scorpion", function(c) {
  var b = c.Solitaire,
    a = b.Scorpion = instance(b, {
      fields: ["Foundation", "Deck", "Tableau"],
      createEvents: function() {
        b.AutoStackClear.register();
        b.createEvents.call(this)
      },
      deal: function() {
        var f, d, h, e = this.deck,
          g = this.tableau.stacks;
        for (h = 0; h < 7; h++) {
          for (d = 0; d < 7; d++) {
            f = e.pop();
            g[d].push(f);
            if (!(h < 3 && d < 4)) {
              f.faceUp()
            }
          }
        }
        b.Util.flipStacks(f);
        e.createStack()
      },
      turnOver: function() {
        var e = this.deck.stacks[0],
          h = this.tableau.stacks,
          f, g, d;
        this.withoutFlip(function() {
          for (g = 0; g < 3; g++) {
            f = e.last().faceUp();
            f.flipPostMove(0);
            f.moveTo(h[g])
          }
        });
        setTimeout(function() {
          Game.eachStack(function(i) {
            c.fire("tableau:afterPush", i);
            Game.endTurn()
          }, "tableau")
        }, 0)
      },
      height: function() {
        return this.Card.base.height * 5.6
      },
      Stack: instance(b.Stack),
      Deck: instance(b.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            top: 0,
            left: function() {
              return b.Card.width * 9
            }
          },
        },
        field: "deck",
        createStack: function() {
          var e, d;
          for (e = this.cards.length - 1; e >= 0; e--) {
            this.stacks[0].push(this.cards[e])
          }
        },
      }),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            top: function() {
              return b.Card.height * 1.1
            },
            left: function() {
              return b.Card.width * 9
            },
            vspacing: 1.1,
          }
        },
        field: "foundation"
      },
      Tableau: {
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        },
        field: "tableau"
      },
      Card: instance(b.Card, {
        playable: function() {
          var d = this.stack.field;
          return d === "deck" || d === "tableau" && !this.isFaceDown
        },
        validTarget: function(d) {
          var e = d.last();
          if (d.field !== "tableau") {
            return false
          }
          if (!e) {
            return this.rank === 13
          } else {
            return !e.isFaceDown && e.suit === this.suit && e.rank === this.rank + 1
          }
        }
      })
    });
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  });
  c.mix(a.Stack, {
    validTarget: function(d) {
      return d.field === "tableau" && this.first().validTarget(d)
    },
    validProxy: function(d) {
      return true
    },
    validTarget: function(d) {
      var g, f = this.cards,
        e;
      switch (d.field) {
        case "tableau":
          return this.first().validTarget(d);
          break;
        case "foundation":
          g = this.last.rank;
          if (f.length !== 13) {
            return false
          }
          for (e = 0; e < 13; e++) {
            if (f[e].rank !== g) {
              return false
            }
          }
          return true;
          break
      }
    }
  }, true);
  c.mix(a.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true)
}, "0.0.1", {
  requires: ["auto-stack-clear", "util"]
});
YUI.add("spider", function(e) {
  var a = 0,
    b = e.Solitaire,
    d = b.Util,
    c = b.Spider = instance(b, {
      fields: ["Foundation", "Deck", "Tableau"],
      createEvents: function() {
        b.AutoStackClear.register();
        b.createEvents.call(this)
      },
      deal: function() {
        var f = 0,
          g = this.deck,
          j = this.tableau.stacks,
          i, l, k = b.Animation,
          h = k.interval * j.length * 4;
        for (l = 0; l < 5; l++) {
          for (f = 0; f < 10; f++) {
            if (f < 4 || l < 4) {
              j[f].push(g.pop())
            }
          }
        }
        for (f = 0; f < 10; f++) {
          i = g.pop();
          i.flipPostMove(h);
          j[f].push(i);
          i.faceUp()
        }
        g.createStack()
      },
      redeal: b.noop,
      turnOver: function() {
        var g = this.deck.stacks[0],
          j = b.Animation,
          h, f;
        if (d.hasFreeTableaus()) {
          return
        }
        this.withoutFlip(function() {
          this.eachStack(function(i) {
            var k = g.last();
            if (k) {
              k.faceUp().moveTo(i).after(function() {
                this.stack.updateCardsPosition();
                j.flip(this)
              })
            }
          }, "tableau")
        });
        setTimeout(function() {
          Game.eachStack(function(i) {
            e.fire("tableau:afterPush", i);
            Game.endTurn()
          }, "tableau")
        }, 0)
      },
      Stack: instance(b.Stack),
      Foundation: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 2.5
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Deck: instance(b.Deck, {
        count: 2,
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck"
      }),
      Tableau: {
        stackConfig: {
          total: 10,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "tableau",
      },
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "tableau":
              return this.createProxyStack();
            case "deck":
              return !d.hasFreeTableaus();
            case "foundation":
              return false
          }
        },
        createProxyStack: function() {
          a = d.freeTableaus().length;
          return b.Card.createProxyStack.call(this)
        },
        validTarget: function(f) {
          if (f.field !== "tableau") {
            return false
          }
          var g = f.last();
          return !g ? a > 0 : !g.isFaceDown && g.rank === this.rank + 1
        }
      })
    });
  e.Array.each(c.fields, function(f) {
    c[f].Stack = instance(c.Stack)
  });
  e.mix(c.Stack, {
    validCard: function(f) {
      if (f.suit === this.cards.last().suit) {
        return true
      } else {
        return a-- > 0
      }
    },
    validTarget: function(f) {
      switch (f.field) {
        case "tableau":
          return this.first().validTarget(f);
          break;
        case "foundation":
          return this.cards.length === 13;
          break
      }
    }
  }, true);
  e.mix(c.Deck.Stack, {
    setCardPosition: function(f) {
      var h = this.cards.length,
        g = b.game.tableau.stacks.length;
      f.top = this.top;
      f.left = this.left + Math.floor(h / g) * f.width * 0.2
    }
  }, true);
  e.mix(c.Tableau.Stack, {
    setCardPosition: function(f) {
      var g = this.cards.last(),
        i = g ? g.top + g.rankHeight : this.top,
        h = this.left;
      f.left = h;
      f.top = i
    }
  }, true)
}, "0.0.1", {
  requires: ["auto-stack-clear", "util"]
});
YUI.add("spider1s", function(b) {
  var a = b.Solitaire.Spider1S = instance(b.Solitaire.Spider);
  a.Deck = instance(b.Solitaire.Spider.Deck, {
    suits: ["s"],
    count: 8
  })
}, "0.0.1", {
  requires: ["spider"]
});
YUI.add("spider2s", function(b) {
  var a = b.Solitaire.Spider2S = instance(b.Solitaire.Spider);
  a.Deck = instance(b.Solitaire.Spider.Deck, {
    suits: ["s", "h"],
    count: 4
  })
}, "0.0.1", {
  requires: ["spider"]
});
YUI.add("spiderette", function(e) {
  var b = e.Solitaire,
    a = b.Klondike,
    d = b.Spider,
    c = e.Solitaire.Spiderette = instance(d, {
      height: a.height,
      deal: a.deal,
      Tableau: instance(d.Tableau, {
        stackConfig: a.Tableau.stackConfig
      }),
      Foundation: instance(d.Foundation, {
        stackConfig: a.Foundation.stackConfig
      }),
      Deck: instance(d.Deck, {
        count: 1
      })
    })
}, "0.0.1", {
  requires: ["klondike", "spider"]
});
YUI.add("tri-towers", function(b) {
  var a = b.Solitaire,
    c = b.Solitaire.TriTowers = instance(a, {
      fields: ["Deck", "Foundation", "Tableau"],
      width: function() {
        return this.Card.base.width * 15
      },
      height: function() {
        return this.Card.base.height * 5
      },
      createEvents: function() {
        b.on("solitaire|endTurn", function() {
          var d = a.game.tableau.stacks,
            e;
          for (e = 0; e < 3; e++) {
            b.fire("tableau:afterPop", d[e])
          }
        });
        a.createEvents.call(this)
      },
      deal: function() {
        var g, d, j = this.tableau.stacks,
          e = this.deck,
          f = this.foundation.stacks[0],
          h, k;
        for (d = 0; d < 4; d++) {
          k = (d + 1) * 3;
          for (h = 0; h < k; h++) {
            g = e.pop();
            j[d].push(g);
            if (d === 3) {
              g.faceUp()
            }
          }
        }
        g.after(function() {
          a.Animation.flip(f.last());
          j[3].eachCard(function(i) {
            a.Animation.flip(i)
          })
        });
        g = e.pop();
        f.push(g);
        g.faceUp();
        e.createStack()
      },
      turnOver: function() {
        var d = this.deck.stacks[0],
          e = this.foundation.stacks[0],
          f = d.last();
        f && f.faceUp().moveTo(e)
      },
      isWon: function() {
        var d = true;
        this.eachStack(function(e) {
          e.eachCard(function(f) {
            if (f) {
              d = false
            }
            return d
          })
        }, "tableau");
        return d
      },
      Deck: instance(a.Deck, {
        field: "deck",
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: function() {
              return a.Card.height * 4
            },
            left: 0
          }
        },
        createStack: function() {
          var e, d;
          for (e = 0, d = this.cards.length; e < d; e++) {
            this.stacks[0].push(this.cards[e])
          }
        }
      }),
      Tableau: {
        field: "tableau",
        stackConfig: {
          total: 4,
          layout: {
            rowGaps: [3.75, 2.5, 1.25, 0],
            cardGap: 1.25,
            vspacing: 0.6,
            hspacing: -0.625,
            top: 0,
            left: function() {
              return a.Card.width * 1.875
            }
          }
        }
      },
      Foundation: {
        field: "foundation",
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: function() {
              return a.Card.height * 4
            },
            left: function() {
              return a.Card.width * 4
            }
          }
        }
      },
      Events: instance(a.Events, {
        dragCheck: function(d) {
          this.getCard().autoPlay();
          this._afterDragEnd();
          d.halt()
        }
      }),
      Card: instance(a.Card, {
        validTarget: function(d) {
          if (d.field !== "foundation") {
            return false
          }
          var e = d.last(),
            f = Math.abs(this.rank - e.rank);
          return f === 1 || f === 12
        },
        playable: function() {
          var d = this.stack;
          switch (d.field) {
            case "deck":
              return this === d.last();
            case "tableau":
              return this.autoPlay(true);
            default:
              return false
          }
        },
        isFree: function() {
          var d = this.stack,
            g = d.next(),
            h = this.tower(),
            e = d.cards.indexOf(this),
            f;
          if (d.field !== "tableau") {
            return false
          }
          if (!g) {
            return true
          }
          for (f = 0; f < 2; f++) {
            if (g.cards[e + h + f]) {
              return false
            }
          }
          return true
        },
        tower: function() {
          var d = this.stack,
            e = d.cards.indexOf(this),
            f = d.index() + 1;
          return Math.floor(e / f)
        }
      }),
      Stack: instance(a.Stack, {
        images: {}
      })
    }, true);
  b.Array.each(c.fields, function(d) {
    c[d].Stack = instance(c.Stack)
  });
  b.mix(c.Tableau.Stack, {
    deleteItem: function(d) {
      var f = this.cards,
        e = f.indexOf(d);
      if (e !== -1) {
        f[e] = null
      }
    },
    setCardPosition: function(f) {
      var l = this.last(),
        j = this.top,
        e, i, k, h = c.Tableau.stackConfig.layout,
        d = h.rowGaps,
        g = h.cardGap;
      if (l) {
        e = l.left + f.width * g;
        i = this.cards.length;
        k = this.index() + 1;
        if (!(i % k)) {
          e += d[k - 1] * f.width
        }
      } else {
        e = this.left
      }
      f.top = j;
      f.left = e;
      f.zIndex = this.index() * 10
    }
  }, true);
  b.mix(c.Deck.Stack, {
    setCardPosition: function(d) {
      var e = this.last(),
        g, f, h;
      g = this.top;
      if (e) {
        f = e.left + d.width * 0.1;
        h = e.zIndex + 1
      } else {
        f = this.left;
        h = 0
      }
      d.top = g;
      d.left = f;
      d.zIndex = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("will-o-the-wisp", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.WillOTheWisp = instance(b.Spiderette, {
      deal: function() {
        var d = this.deck,
          e;
        for (e = 0; e < 3; e++) {
          this.eachStack(function(f) {
            var g = d.pop();
            f.push(g);
            if (e === 2) {
              g.faceUp();
              g.flipPostMove()
            }
          }, "tableau")
        }
        d.createStack()
      }
    })
}, "0.0.1", {
  requires: ["spiderette"]
});
YUI.add("yukon", function(c) {
  var a = c.Solitaire,
    b = a.Yukon = instance(a, {
      fields: ["Foundation", "Tableau"],
      deal: function() {
        var h, e = 6,
          d = 0,
          f = this.deck,
          i = this.tableau.stacks,
          g = a.Animation.interval * 50;
        while (e >= 0) {
          h = f.pop();
          i[6 - e].push(h);
          h.faceUp();
          h.flipPostMove(g);
          for (d = 7 - e; d < 7; d++) {
            h = f.pop();
            i[d].push(h)
          }
          e--
        }
        d = 1;
        while (f.cards.length) {
          h = f.pop();
          i[d].push(h);
          h.faceUp();
          h.flipPostMove(g);
          d = (d % 6) + 1
        }
      },
      height: function() {
        return this.Card.base.height * 4.8
      },
      Stack: instance(a.Stack),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            vspacing: 1.25,
            top: 0,
            left: function() {
              return a.Card.width * 9
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Tableau: {
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        },
        field: "tableau",
        draggable: true
      },
      Card: instance(a.Card, {
        playable: function() {
          return this.stack.field === "tableau" && !this.isFaceDown
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return this.rank === 13
              } else {
                return !e.isFaceDown && e.color !== this.color && e.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return e.suit === this.suit && e.rank === this.rank - 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  c.Array.each(b.fields, function(d) {
    b[d].Stack = instance(b.Stack)
  });
  c.mix(b.Stack, {
    validTarget: function(d) {
      return d.field === "tableau" && this.first().validTarget(d)
    },
    validProxy: function(d) {
      return true
    }
  }, true);
  c.mix(b.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("simple-simon", function(c) {
  var b = c.Solitaire,
    a = b.SimpleSimon = instance(b.Spider, {
      fields: ["Foundation", "Tableau"],
      deal: function() {
        var f, d = 0,
          g = this.tableau.stacks,
          h = g.length,
          e = b.Animation.interval * 10;
        while (f = this.deck.pop()) {
          g[d].push(f);
          f.faceUp();
          f.flipPostMove(e);
          d++;
          if (d === h) {
            d = 0;
            h--
          }
        }
      },
      turnOver: b.noop,
      Deck: instance(b.Deck),
      Foundation: instance(b.Spider.Foundation),
      Card: instance(b.Spider.Card, {
        origin: {
          left: function() {
            return b.Card.width * 6
          },
          top: function() {
            return b.container().get("winHeight") - b.Card.height * 1.25
          }
        }
      })
    });
  a.Foundation.stackConfig = {
    total: 4,
    layout: {
      hspacing: 1.25,
      top: 0,
      left: function() {
        return b.Card.width * 3.75
      }
    }
  }
}, "0.0.1", {
  requires: ["spider"]
});
YUI.add("bakersdozen", function(c) {
  var a = c.Solitaire,
    b = c.Solitaire.BakersDozen = instance(a, {
      fields: ["Foundation", "Tableau"],
      deal: function() {
        var g, l, d, k = 0,
          e = this.tableau.stacks,
          j = 200,
          f = 150,
          m = this,
          h;
        for (k = 0; k < 13; k++) {
          for (h = 0; h < 4; h++) {
            g = this.deck.pop();
            e[k].push(g);
            g.faceUp()
          }
          d = e[k].cards;
          for (h = 1; h < 4; h++) {
            if (d[h].rank === 13) {
              g = d.splice(h, 1)[0];
              d.unshift(g)
            }
          }
        }
        l = e[e.length - 1].last();
        a.Util.flipStacks(l)
      },
      height: function() {
        return this.Card.base.height * 5
      },
      maxStackHeight: function() {
        return a.Card.height * 2.5
      },
      Stack: instance(a.Stack),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            vspacing: 1.25,
            top: 0,
            left: function() {
              return a.Card.width * 10.5
            }
          }
        },
        field: "foundation",
      },
      Tableau: {
        stackConfig: {
          total: 13,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        },
        field: "tableau",
      },
      Card: instance(a.Card, {
        playable: function() {
          return this.stack.field === "tableau" && this === this.stack.last()
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return false
              } else {
                return e.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return e.suit === this.suit && e.rank === this.rank - 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  c.Array.each(b.fields, function(d) {
    b[d].Stack = instance(b.Stack)
  });
  c.mix(b.Stack, {
    validTarget: function(d) {
      return d.field === "tableau" && this.first().validTarget(d)
    },
    validCard: function() {
      return false
    }
  }, true);
  c.mix(b.Tableau.Stack, {
    images: {},
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    },
    layout: function(e, d) {
      a.Stack.layout.call(this, e, d);
      if (d > 6) {
        this.top += a.Card.height * 2.75;
        this.left -= a.Card.width * 8.1
      }
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("eightoff", function(c) {
  var b = c.Solitaire,
    a = c.Solitaire.Eightoff = instance(b, {
      fields: ["Foundation", "Reserve", "Tableau"],
      deal: function() {
        var f, d, h = this.tableau.stacks,
          e = this.reserve.stacks,
          g;
        for (g = 0, d = 0; g < 48; g++) {
          f = this.deck.pop();
          h[d].push(f);
          f.faceUp();
          f.flipPostMove(0);
          d++;
          if (d === 8) {
            d = 0
          }
        }
        for (g = 0, d = 0; g < 4; g++) {
          f = this.deck.pop();
          e[d].push(f);
          f.faceUp();
          f.flipPostMove(0);
          d++
        }
      },
      openSlots: function(d) {
        var f = 1,
          e, g = this.reserve.stacks;
        for (e = 0; e < g.length; e++) {
          if (!g[e].last()) {
            f++
          }
        }
        return f
      },
      Stack: instance(b.Stack),
      height: function() {
        return this.Card.base.height * 5
      },
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            vspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 10.5
            }
          }
        },
        field: "foundation",
        draggable: false
      },
      Reserve: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: 0
          }
        },
        field: "reserve",
        draggable: true
      },
      Tableau: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.25
            },
            left: 0
          }
        },
        field: "tableau",
        draggable: true
      },
      Card: instance(b.Card, {
        origin: {
          left: function() {
            return b.Card.width * 5
          },
          top: function() {
            return b.container().get("winHeight") - b.Card.height * 1.2
          }
        },
        playable: function() {
          switch (this.stack.field) {
            case "reserve":
              return true;
            case "tableau":
              return this.createProxyStack();
            case "foundation":
              return false
          }
        },
        createProxyStack: function() {
          var d = b.Card.createProxyStack.call(this);
          this.proxyStack = d && d.cards.length <= a.openSlots(d) ? d : null;
          return this.proxyStack
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return this.rank === 13
              } else {
                return e.suit === this.suit && e.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return e.suit === this.suit && e.rank === this.rank - 1
              }
              break;
            case "reserve":
              return !e;
              break
          }
        }
      })
    });
  c.Array.each(a.fields, function(d) {
    a[d].Stack = instance(a.Stack)
  }, true);
  c.mix(a.Stack, {
    validTarget: function(d) {
      if (d.field !== "tableau" || !this.first().validTarget(d)) {
        return false
      }
      return this.cards.length <= a.openSlots(d, this.last())
    }
  }, true);
  c.mix(a.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("acesup", function(c) {
  var b = c.Solitaire,
    d = c.Solitaire.AcesUp = instance(b, {
      fields: ["Foundation", "Deck", "Tableau"],
      deal: function() {
        var g, e, f = this.deck,
          i = this.tableau.stacks,
          h = [];
        for (e = 0; e < i.length; e++) {
          g = f.pop();
          h.push(g);
          if (e === i.length - 1) {
            g.after(function() {
              c.Array.forEach(h, function(j) {
                b.Animation.flip(j)
              })
            })
          }
          i[e].push(g);
          g.faceUp()
        }
        f.createStack()
      },
      turnOver: function() {
        var e, i = this.tableau.stacks,
          f = this.deck.stacks[0],
          g, h = [];
        this.withoutFlip(function() {
          for (e = 0; e < i.length; e++) {
            if (!f.last()) {
              break
            }
            g = f.last();
            g.moveTo(i[e]);
            g.faceUp();
            h.push(g)
          }
        });
        g.after(function() {
          c.Array.forEach(h, function(j) {
            b.Animation.flip(j)
          })
        })
      },
      isWon: function() {
        return this.foundation.stacks[0].cards.length === 48
      },
      height: function() {
        return this.Card.base.height * 3
      },
      Stack: instance(b.Stack),
      Foundation: {
        stackConfig: {
          total: 1,
          layout: {
            spacing: 0,
            top: 0,
            left: function() {
              return b.Card.width * 7
            }
          }
        },
        field: "foundation"
      },
      Deck: instance(b.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            spacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck"
      }),
      Tableau: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 1.6
            }
          }
        },
        field: "tableau"
      },
      Events: instance(b.Events, {
        dragCheck: function(f) {
          if (!b.game.autoPlay.call(this)) {
            b.Events.dragCheck.call(this)
          }
        },
      }),
      Card: instance(b.Card, {
        validTarget: function(e) {
          if (e.field === "tableau") {
            return !e.last()
          }
          if (e.field !== "foundation" || this.rank === 1) {
            return false
          }
          var f = false;
          Game.eachStack(function(g) {
            if (f) {
              return
            }
            var h = g.last();
            if (h && h.suit === this.suit && (h.rank > this.rank || h.rank === 1)) {
              f = true
            }
          }.bind(this), "tableau");
          return f
        },
        playable: function() {
          return this.stack.field === "deck" || (this.isFree() && (this.validTarget(Game.foundation.stacks[0]) || a()))
        }
      })
    });

  function a() {
    return c.Array.some(Game.tableau.stacks, function(e) {
      return !e.cards.length
    })
  }
  c.Array.each(d.fields, function(e) {
    d[e].Stack = instance(d.Stack)
  });
  c.mix(d.Deck.Stack, {
    images: {}
  }, true);
  c.mix(d.Tableau.Stack, {
    setCardPosition: function(e) {
      var f = this.cards.last(),
        h = f ? f.top + f.rankHeight : this.top,
        g = this.left,
        i = f ? f.zIndex + 1 : 1;
      e.zIndex = i;
      e.left = g;
      e.top = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "array-extras"]
});
YUI.add("alternations", function(c) {
  var a = c.Solitaire,
    b = a.Alternations = instance(a, {
      fields: ["Deck", "Foundation", "Tableau", "Waste"],
      deal: function() {
        var e = this.deck,
          h = this.tableau.stacks,
          d = 0,
          j = 0,
          f, g;
        for (g = 0; g < h.length * 7; g++) {
          f = e.pop();
          h[d++].push(f);
          if (!(j % 2)) {
            f.faceUp()
          }
          if (!((g + 1) % 7)) {
            d = 0;
            j++
          }
        }
        f.after(function() {
          var r = 7,
            m = h.length,
            o = m + Math.floor(r / 2),
            p = 0,
            q, l, i, n = 0,
            k = 200;
          for (p = 0; p < o; p++) {
            i = [];
            l = p;
            q = 0;
            while (q < r && l >= 0) {
              d = h[l];
              if (d && d.cards[q]) {
                i.push(d.cards[q])
              }
              q += 2;
              l--
            }
            c.Array.each(i, function(s) {
              setTimeout(function() {
                a.Animation.flip(s)
              }, n)
            });
            n += k
          }
        });
        e.createStack()
      },
      turnOver: function() {
        var d = this.deck.stacks[0],
          f = this.waste.stacks[0],
          e;
        this.withoutFlip(function() {
          e = d.last();
          if (e) {
            e.flipPostMove(0);
            e.faceUp().moveTo(f)
          }
        })
      },
      Deck: instance(a.Deck, {
        count: 2,
        stackConfig: {
          total: 1,
          layout: {
            top: function() {
              return c.Solitaire.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "deck"
      }),
      Waste: {
        stackConfig: {
          total: 1,
          layout: {
            top: function() {
              return c.Solitaire.Card.height * 2.75
            },
            left: 0
          }
        },
        field: "waste"
      },
      Tableau: {
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 1.25,
            top: function() {
              return c.Solitaire.Card.height * 1.5
            },
            left: function() {
              return c.Solitaire.Card.width * 2.3
            }
          }
        },
        field: "tableau"
      },
      Foundation: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.4,
            top: 0,
            left: 0
          }
        },
        field: "foundation"
      },
      Card: instance(a.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "deck":
            case "waste":
              return true;
            case "tableau":
              return this.createProxyStack();
            case "foundation":
              return false
          }
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return true
              } else {
                return !e.isFaceDown && e.rank === this.rank + 1
              }
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return this.suit === e.suit && this.rank === e.rank + 1
              }
            default:
              return false
          }
        }
      }),
      Stack: instance(a.Stack, {
        images: {
          foundation: "freeslot.png",
          tableau: "freeslot.png"
        },
        validTarget: function(d) {
          return d.field === "tableau" && this.first().validTarget(d)
        }
      })
    });
  c.Array.each(b.fields, function(d) {
    b[d].Stack = instance(b.Stack)
  });
  c.mix(b.Tableau.Stack, {
    setCardPosition: function(e) {
      var d, f = this.cards.last(),
        h, g = this.left;
      if (f) {
        d = f.isFaceDown ? f.rankHeight * 2 : f.rankHeight;
        h = f.top + d
      } else {
        h = this.top
      }
      e.left = g;
      e.top = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("bakersgame", function(b) {
  var a = b.Solitaire.BakersGame = instance(b.Solitaire.Freecell, {
    Card: instance(b.Solitaire.Freecell.Card, {
      validTableauTarget: function(c) {
        return c.suit === this.suit && c.rank === this.rank + 1
      }
    })
  })
}, "1.0.0", {
  requires: ["freecell"]
});
YUI.add("baroness", function(c) {
  var a = c.Solitaire,
    d = a.AcesUp,
    b = a.Baroness = instance(d, {
      createEvents: function() {
        a.createEvents.call(this);
        c.on("solitaire|endTurn", this.fillTableau.bind(this))
      },
      turnOver: function() {
        if (c.Array.every(this.tableau.stacks, function(e) {
            return e.last()
          })) {
          d.turnOver.call(this)
        }
      },
      fillTableau: function() {
        var h = this.tableau.stacks,
          e = this.deck.stacks[0],
          j, g, i = [],
          f = c.Array.reduce(h, 0, function(l, k) {
            return l + k.cards.length
          });
        if (f >= h.length) {
          return
        }
        j = 5 - f;
        this.withoutFlip(function() {
          this.eachStack(function(k) {
            if (!(j && e.cards.length)) {
              return
            }
            if (!k.last()) {
              g = e.last();
              g.moveTo(k);
              g.faceUp();
              j--;
              i.push(g)
            }
          }, "tableau")
        });
        if (g) {
          g.after(function() {
            c.Array.each(i, function(k) {
              a.Animation.flip(k)
            })
          })
        }
      },
      isWon: a.isWon,
      Events: instance(a.Pyramid.Events, {
        drop: function(i) {
          var h = a.activeCard,
            f = a.game.foundation.stacks[0],
            g = i.drop.get("node").getData("target");
          if (!h) {
            return
          }
          if (g.field) {
            if (!g.last()) {
              h.moveTo(g)
            } else {
              a.stationary(function() {
                g.last().moveTo(f);
                h.moveTo(f)
              })
            }
          } else {
            a.stationary(function() {
              g.moveTo(f);
              h.moveTo(f)
            })
          }
          c.fire("endTurn")
        }
      }),
      Tableau: instance(d.Tableau, {
        stackConfig: instance(d.Tableau.stackConfig, {
          total: 5
        })
      }),
      Stack: instance(d.Stack, {
        updateDragGroups: c.Solitaire.Pyramid.Stack.updateDragGroups
      }),
      Foundation: instance(d.Foundation, {
        stackConfig: {
          total: 1,
          layout: {
            spacing: 0,
            top: 0,
            left: function() {
              return c.Solitaire.Card.width * 8.5
            }
          }
        },
      }),
      Card: instance(d.Card, {
        playable: function() {
          return this.isFree()
        },
        validTarget: function(f) {
          var e = f.last();
          if (f.field === "foundation") {
            return this.isFree() && this.rank === 13
          }
          if (!e) {
            return true
          }
          return !e.isFaceDown && (this.rank + e.rank === 13)
        }
      })
    })
}, "1.0.0", {
  requires: ["acesup", "pyramid"]
});
YUI.add("canfield", function(e) {
  var d = e.Solitaire,
    b = d.Agnes,
    a = d.Klondike,
    c = d.Canfield = instance(b, {
      height: d.height,
      maxStackHeight: d.maxStackHeight,
      createEvents: function() {
        d.createEvents.call(this);
        e.on("solitaire|endTurn", this.fillTableau.bind(this))
      },
      fillTableau: function() {
        var f = this.reserve.stacks[0],
          g = f.last(),
          h;
        if (!g) {
          return
        }
        h = e.Array.find(this.tableau.stacks, function(i) {
          return !i.last()
        });
        if (h) {
          g.moveTo(h)
        }
        g = f.last();
        if (g && g.isFaceDown) {
          g.faceUp()
        }
      },
      redeal: a.redeal,
      turnOver: a.turnOver,
      deal: function() {
        var h, g = this.deck,
          l = this.tableau.stacks,
          f = this.reserve.stacks[0],
          k = 13,
          j;
        for (j = 0; j < l.length; j++) {
          h = g.pop();
          l[j].push(h);
          h.faceUp();
          h.flipPostMove(d.Animation.interval * 5)
        }
        for (j = 0; j < k; j++) {
          h = g.pop();
          f.push(h);
          if (j === k - 1) {
            h.faceUp();
            h.flipPostMove(0)
          }
        }
        h = g.pop();
        this.foundation.stacks[0].push(h);
        h.faceUp();
        h.flipPostMove(0);
        g.createStack()
      },
      Tableau: instance(b.Tableau, {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: function() {
              return d.Card.height * 1.5
            },
            left: function() {
              return d.Card.width * 3.75
            }
          }
        },
      }),
      Reserve: instance(b.Reserve, {
        stackConfig: {
          total: 1,
          layout: {
            left: function() {
              return d.Card.width * 1.5
            },
            top: function() {
              return d.Card.height * 1.5
            }
          }
        },
      }),
      Waste: a.Waste,
      Card: instance(b.Card, {
        validFreeTableauTarget: function() {
          return true
        }
      })
    })
}, "1.0.0", {
  requires: ["agnes"]
});
YUI.add("doubleklondike", function(d) {
  var c = d.Solitaire,
    b = c.Klondike,
    a = d.Solitaire.DoubleKlondike = instance(b, {
      Foundation: instance(b.Foundation, {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return c.Card.width * 3.25
            }
          }
        },
        field: "foundation",
      }),
      Tableau: instance(b.Tableau, {
        stackConfig: {
          total: 9,
          layout: {
            hspacing: 1.25,
            top: function() {
              return c.Card.height * 1.5
            },
            left: function() {
              return c.Card.width * 2
            }
          }
        }
      }),
      Deck: instance(b.Deck, {
        count: 2
      })
    })
}, "1.0.0", {
  requires: ["freecell"]
});
YUI.add("thefan", function(b) {
  var c = b.Solitaire.LaBelleLucie,
    a = b.Solitaire.TheFan = instance(c, {
      initRedeals: b.Solitaire.noop,
      Tableau: instance(c.Tableau, {
        Stack: instance(c.Tableau.Stack, {
          images: {
            tableau: "freeslot.png"
          }
        })
      }),
      Deck: instance(c.Deck, {
        Stack: instance(c.Deck.Stack, {
          images: {}
        })
      }),
      Card: instance(c.Card, {
        validTableauTarget: function(d) {
          if (!d) {
            return this.rank === 13
          }
          return d.suit === this.suit && d.rank === this.rank + 1
        }
      })
    })
}, "1.0.0", {
  requires: ["labellelucie"]
});
YUI.add("labellelucie", function(b) {
  var a = b.Solitaire,
    c = b.Solitaire.LaBelleLucie = instance(a, {
      redeals: 0,
      redealSeed: 0,
      fields: ["Foundation", "Tableau", "Deck"],
      initRedeals: function() {
        this.redeals = 2;
        this.redealSeed = Math.random() * 2147483647 >>> 0;
        this.deck.stacks[0].node.addClass("playable")
      },
      createEvents: function() {
        a.createEvents.call(this);
        b.delegate("click", a.Events.clickEmptyDeck, a.selector, ".stack");
        b.on("solitaire|newGame", this.initRedeals.bind(this));
        b.on("solitaire|afterSetup", function() {
          if (Game.redeals) {
            Game.deck.stacks[0].node.addClass("playable")
          }
        })
      },
      serialize: function() {
        var d = this.redealSeed,
          e = String.fromCharCode(d >> 24) + String.fromCharCode((d >> 16) & 255) + String.fromCharCode((d >> 8) & 255) + String.fromCharCode(d & 255);
        return String.fromCharCode(this.redeals) + e + a.serialize.call(this)
      },
      unserialize: function(d) {
        this.redeals = d.charCodeAt(0);
        this.redealSeed = d.charCodeAt(1) << 24 + d.charCodeAt(2) << 16 + d.charCodeAt(3) << 8 + d.charCodeAt(4);
        return a.unserialize.call(this, d.substr(5))
      },
      redeal: function() {
        if (!this.redeals) {
          return
        }
        var d = this.deck;
        d.cards = [];
        Game.eachStack(function(e) {
          e.eachCard(function(g) {
            g.pushPosition()
          });
          var f = e.cards;
          e.cards = [];
          d.cards = d.cards.concat(f)
        }, "tableau");
        Game.pushMove(function() {
          Game.redeals++
        });
        d.msSeededShuffle(this.redealSeed);
        this.deal(true);
        this.redeals--;
        if (!this.redeals) {
          this.deck.stacks[0].node.removeClass("playable")
        }
      },
      deal: function(j) {
        var f, e = this.deck,
          d, h = Game.tableau.stacks,
          g;
        for (d = 0; d < 18; d++) {
          for (g = 0; g < 3; g++) {
            f = e.pop();
            if (!f) {
              break
            }
            h[d].push(f);
            if (!j) {
              f.faceUp()
            }
          }
        }
        if (!j) {
          a.Util.flipStacks(h[h.length - 1].last());
          e.createStack()
        }
      },
      width: function() {
        return this.Card.base.width * 12.5
      },
      height: function() {
        return this.Card.base.height * 7
      },
      maxStackHeight: function() {
        return a.Card.height * 2.5
      },
      Stack: instance(a.Stack, {
        images: {
          deck: "freeslot.png",
          foundation: "freeslot.png",
          tableau: null
        },
        validTarget: function(d) {
          return d.field === "tableau" && this.first().validTarget(d)
        },
        validCard: function() {
          return false
        }
      }),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.5,
            top: 0,
            left: function() {
              return a.Card.width * 3.5
            }
          }
        },
        field: "foundation",
      },
      Tableau: {
        stackConfig: {
          total: 18,
          layout: {
            hspacing: 2.5,
            top: function() {
              return a.Card.width * 2
            },
            left: 0
          }
        },
        field: "tableau",
      },
      Deck: instance(a.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            top: 0,
            left: 0
          }
        },
        field: "deck",
      }),
      Card: instance(a.Card, {
        playable: function() {
          return this.stack.field === "tableau" && this === this.stack.last()
        },
        validTableauTarget: function(d) {
          if (!d) {
            return false
          } else {
            return d.suit === this.suit && d.rank === this.rank + 1
          }
        },
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              return this.validTableauTarget(e);
            case "foundation":
              if (!e) {
                return this.rank === 1
              } else {
                return e.suit === this.suit && e.rank === this.rank - 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  b.Array.each(c.fields, function(d) {
    c[d].Stack = instance(c.Stack)
  });
  b.mix(c.Tableau.Stack, {
    setCardPosition: function(e) {
      var d = e.width / 4,
        f = this.cards.last(),
        h = this.top,
        g = f ? f.left + d : this.left,
        i = f ? f.zIndex + 1 : 1;
      e.zIndex = i;
      e.left = g;
      e.top = h
    },
    layout: function(e, d) {
      var f = Math.floor(d / 5);
      a.Stack.layout.call(this, e, d);
      this.top += a.Card.height * 1.5 * f;
      this.left -= a.Card.width * 12.5 * f
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("calculation", function(e) {
  function b(h, g) {
    var f = h.length;
    g %= f;
    if (g < 0) {
      g += f
    }
    return h[g]
  }

  function d(f, h, g) {
    if (f <= h) {
      return f <= g && g <= h
    } else {
      return f <= g || g <= h
    }
  }
  var c = e.Solitaire,
    a = e.Solitaire.Calculation = instance(c, {
      fields: ["Foundation", "Tableau", "Deck", "Waste"],
      deal: function() {
        var h, g = this.deck.cards,
          n = [],
          f = ["s", "h", "c", "d"],
          m, k, j = 51,
          l = this.foundation.stacks;
        while (j >= 0) {
          h = g[j];
          k = false;
          for (m = 1; m <= 4; m++) {
            if (h.rank === m && h.suit === f[m - 1]) {
              k = true;
              g.splice(j, 1);
              n.push(h);
              break
            }
          }
          j--
        }
        n.sort(function(o, i) {
          return o.rank - i.rank
        });
        for (j = 0; j < 4; j++) {
          h = n[j];
          l[j].push(h);
          h.faceUp()
        }
        h.after(function() {
          e.Array.each(n, function(i) {
            c.Animation.flip(i)
          })
        });
        this.deck.createStack()
      },
      turnOver: function() {
        var g = this.deck.stacks[0].last(),
          f = this.waste.stacks[0];
        if (g && !f.last()) {
          this.withoutFlip(function() {
            g.moveTo(f);
            g.faceUp();
            g.flipPostMove(0)
          })
        }
      },
      redeal: c.noop,
      height: function() {
        return this.Card.base.height * 3
      },
      Stack: instance(c.Stack, {
        images: {
          deck: null,
          waste: null,
          tableau: "freeslot.png",
          foundation: "freeslot.png"
        }
      }),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return c.Card.width * 3.75
            }
          }
        },
        field: "foundation"
      },
      Tableau: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: function() {
              return c.Card.height * 1.25
            },
            left: function() {
              return c.Card.width * 3.75
            }
          }
        },
        field: "tableau"
      },
      Deck: instance(c.Deck, {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: 0
          }
        },
        field: "deck"
      }),
      Waste: {
        stackConfig: {
          total: 1,
          layout: {
            hspacing: 0,
            top: 0,
            left: function() {
              return c.Card.width * 1.25
            }
          }
        },
        field: "waste",
      },
      Card: instance(c.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "waste":
              return this.isFree();
            case "tableau":
              return this.isFree() && this.autoPlay(true);
            case "foundation":
              return false;
            case "deck":
              return !c.game.waste.stacks[0].last()
          }
        },
        validTarget: function(f) {
          var h = f.last(),
            g;
          switch (f.field) {
            case "tableau":
              if (this.stack.field === "tableau") {
                return false
              }
              return true;
            case "foundation":
              g = f.index() + 1;
              return h.rank !== 13 && ((this.rank % 13) === (h.rank + g) % 13);
            default:
              return false
          }
        }
      })
    });
  e.Array.each(a.fields, function(f) {
    a[f].Stack = instance(a.Stack)
  }, true);
  e.mix(a.Tableau.Stack, {
    setCardPosition: function(f) {
      var g = this.cards.last(),
        i = g ? g.top + g.rankHeight : this.top,
        h = this.left;
      f.left = h;
      f.top = i
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire"]
});
YUI.add("bisley", function(b) {
  var a = b.Solitaire,
    c = b.Solitaire.Bisley = instance(a, {
      fields: ["Foundation", "Tableau"],
      deal: function() {
        var g, d, e = this.deck,
          l = e.cards,
          k = this.tableau.stacks,
          f = this.foundation.stacks,
          j = [],
          h = 0;
        while (j.length < 4) {
          g = l[h];
          if (g.rank === 1) {
            l.splice(h, 1);
            j.push(g)
          } else {
            h++
          }
        }
        for (h = 0; h < 4; h++) {
          g = j[h];
          g.faceUp();
          f[h].push(g);
          f[h + 4].suit = g.suit
        }
        d = 4;
        while (g = e.pop()) {
          k[d].push(g);
          g.faceUp();
          g.flipPostMove(0);
          if (++d >= k.length) {
            d = 0
          }
        }
        e.createStack()
      },
      Stack: instance(a.Stack),
      Foundation: {
        stackConfig: {
          total: 8,
          layout: {
            hspacing: 1.25,
            top: function() {
              return a.Card.height * 1.25
            },
            left: function() {
              return a.Card.width * 5.75
            }
          }
        },
        field: "foundation"
      },
      Tableau: {
        stackConfig: {
          total: 13,
          layout: {
            hspacing: 1.25,
            top: function() {
              return a.Card.height * 2.75
            },
            left: 0
          }
        },
        field: "tableau"
      },
      Card: instance(a.Card, {
        validTarget: function(d) {
          var e = d.last();
          switch (d.field) {
            case "tableau":
              if (!e) {
                return false
              } else {
                return e.suit === this.suit && Math.abs(e.rank - this.rank) === 1
              }
              break;
            case "foundation":
              if (!e) {
                return this.rank === 13 && this.suit === d.suit
              } else {
                return e.suit === this.suit && Math.abs(e.rank - this.rank) === 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  b.Array.each(c.fields, function(d) {
    c[d].Stack = instance(c.Stack)
  });
  b.mix(c.Stack, {
    images: {
      foundation: "freeslot.png"
    },
    validCard: function() {
      return false
    }
  }, true);
  b.mix(c.Foundation.Stack, {
    suit: null,
    layout: function(e, d) {
      a.Stack.layout.call(this, e, d);
      if (d >= 4) {
        this.left -= a.Card.width * 5;
        this.top -= a.Card.height * 1.25
      }
    }
  }, true);
  b.mix(c.Tableau.Stack, {
    setCardPosition: function(d) {
      var e = this.cards.last(),
        g = e ? e.top + e.rankHeight : this.top,
        f = this.left;
      d.left = f;
      d.top = g
    },
    layout: function(e, d) {
      a.Stack.layout.call(this, e, d);
      if (d < 4) {
        this.top += a.Card.rankHeight
      }
    }
  }, true);
  b.mix(c.Deck.Stack, {
    images: {
      deck: null
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
YUI.add("king-albert", function(d) {
  var b = d.Solitaire,
    c = b.Util,
    a = d.Solitaire.KingAlbert = instance(b, {
      fields: ["Foundation", "Tableau", "Reserve"],
      height: function() {
        return this.Card.base.height * 5.3
      },
      maxStackHeight: function() {
        return this.Card.height * 2.75
      },
      deal: function() {
        var h, e, k, g = this.deck,
          j = g.cards,
          i = this.tableau.stacks,
          f = this.reserve.stacks;
        for (k = 0; k < 9; k++) {
          for (e = k; e < 9; e++) {
            h = g.pop();
            i[e].push(h);
            h.faceUp()
          }
        }
        c.flipStacks(h);
        for (e = 0; e < 7; e++) {
          h = g.pop();
          f[e].push(h);
          h.faceUp();
          h.flipPostMove(2000)
        }
      },
      Stack: instance(b.Stack),
      Foundation: {
        stackConfig: {
          total: 4,
          layout: {
            hspacing: 1.25,
            top: 0,
            left: function() {
              return b.Card.width * 6.25
            }
          }
        },
        field: "foundation"
      },
      Tableau: {
        stackConfig: {
          total: 9,
          layout: {
            hspacing: 1.25,
            top: function() {
              return b.Card.height * 1.5
            },
            left: 0
          }
        },
        field: "tableau"
      },
      Reserve: {
        stackConfig: {
          total: 7,
          layout: {
            hspacing: 0.4,
            top: function() {
              return b.Card.height * 4.4
            },
            left: function() {
              return b.Card.width * 1.25
            }
          }
        },
        field: "reserve"
      },
      Card: instance(b.Card, {
        playable: function() {
          switch (this.stack.field) {
            case "tableau":
              return this.createProxyStack();
            case "reserve":
              return true;
            default:
              return false
          }
        },
        createProxyStack: function() {
          return b.Card.createProxyStack.call(this)
        },
        validTarget: function(e) {
          var f = e.last();
          switch (e.field) {
            case "tableau":
              if (!f) {
                return true
              } else {
                return f.color !== this.color && f.rank === this.rank + 1
              }
              break;
            case "foundation":
              if (!f) {
                return this.rank === 1
              } else {
                return f.suit === this.suit && f.rank === this.rank - 1
              }
              break;
            default:
              return false
          }
        }
      })
    });
  d.Array.each(a.fields, function(e) {
    a[e].Stack = instance(a.Stack)
  });
  d.mix(a.Stack, {
    images: {
      foundation: "freeslot.png",
      tableau: "freeslot.png"
    },
    validCard: function(e) {
      return this.cards.length < Math.pow(2, c.freeTableaus().length)
    },
    validTarget: function(e) {
      if (e.field != "tableau") {
        return false
      }
      var f = c.freeTableaus().length;
      if (!e.first()) {
        f--
      }
      return this.cards.length <= Math.pow(2, f)
    }
  }, true);
  d.mix(a.Reserve.Stack, {
    setCardPosition: function(e) {
      b.Stack.setCardPosition.call(this, e);
      e.zIndex = this.index()
    }
  }, true);
  d.mix(a.Tableau.Stack, {
    setCardPosition: function(e) {
      var f = this.cards.last(),
        h = f ? f.top + f.rankHeight : this.top,
        g = this.left;
      e.left = g;
      e.top = h
    }
  }, true)
}, "0.0.1", {
  requires: ["solitaire", "util"]
});
(function() {
  function r(M) {
    var N;
    return function() {
      if (!N) {
        N = c.one(M)
      }
      return N
    }
  }
  var E = {
      name: "Klondike",
      game: null
    },
    z = YUI({
      fetchCSS: false,
      bootstrap: false
    }),
    c, q = r("body"),
    D = {
      accordion: "Accordion",
      acesup: "AcesUp",
      agnes: "Agnes",
      alternations: "Alternations",
      bakersdozen: "BakersDozen",
      bakersgame: "BakersGame",
      baroness: "Baroness",
      bisley: "Bisley",
      doubleklondike: "DoubleKlondike",
      calculation: "Calculation",
      canfield: "Canfield",
      eightoff: "Eightoff",
      "king-albert": "KingAlbert",
      klondike: "Klondike",
      klondike1t: "Klondike1T",
      thefan: "TheFan",
      "flower-garden": "FlowerGarden",
      "forty-thieves": "FortyThieves",
      freecell: "Freecell",
      golf: "Golf",
      "grandfathers-clock": "GClock",
      labellelucie: "LaBelleLucie",
      "monte-carlo": "MonteCarlo",
      pyramid: "Pyramid",
      "russian-solitaire": "RussianSolitaire",
      "simple-simon": "SimpleSimon",
      scorpion: "Scorpion",
      spider: "Spider",
      spider1s: "Spider1S",
      spider2s: "Spider2S",
      spiderette: "Spiderette",
      "tri-towers": "TriTowers",
      "will-o-the-wisp": "WillOTheWisp",
      yukon: "Yukon"
    },
    F = ["json", "tabview", "util", "auto-turnover", "statistics", "win-display", "solver-freecell", "solitaire-autoplay", "solitaire-ios", "display-seed-value", "save-manager", "analytics"],
    j = {
      Accordion: "Accordion",
      AcesUp: "Aces Up",
      Agnes: "Agnes",
      Alternations: "Alternations",
      BakersDozen: "Baker's Dozen",
      BakersGame: "Baker's Game",
      Baroness: "Baroness",
      Bisley: "Bisley",
      Calculation: "Calculation",
      Canfield: "Canfield",
      DoubleKlondike: "Double Klondike",
      Eightoff: "Eight Off",
      Klondike: "Klondike",
      Klondike1T: "Klondike (Vegas style)",
      TheFan: "The Fan",
      FlowerGarden: "Flower Garden",
      FortyThieves: "Forty Thieves",
      Freecell: "Freecell",
      Golf: "Golf",
      GClock: "Grandfather's Clock",
      LaBelleLucie: "La Belle Lucie",
      KingAlbert: "King Albert",
      MonteCarlo: "Monte Carlo",
      Pyramid: "Pyramid",
      RussianSolitaire: "Russian Solitaire",
      Scorpion: "Scorpion",
      SimpleSimon: "Simple Simon",
      Spider: "Spider",
      Spider1S: "Spider (1 Suit)",
      Spider2S: "Spider (2 Suit)",
      Spiderette: "Spiderette",
      WillOTheWisp: "Will O' The Wisp",
      TriTowers: "Tri Towers",
      Yukon: "Yukon"
    },
    B = (function() {
      var O = null,
        N = {
          position: "absolute",
          display: "none",
          backgroundColor: "#000",
          opacity: 0.7,
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          zIndex: 1000,
        },
        M = function() {
          if (O === null) {
            O = c.Node.create("<div>");
            O.setStyles(N);
            q().append(O)
          }
          return O
        };
      return {
        show: function() {
          var P = M();
          N.display = "block";
          N.width = P.get("winWidth");
          N.height = P.get("winHeight");
          P.setStyles(N)
        },
        hide: function() {
          N.display = "none";
          M().setStyles(N)
        },
        resize: function() {
          if (N.display === "block") {
            this.show()
          }
        }
      }
    }()),
    I = (function() {
      var Q = r("#rules-popup"),
        O, M, P = false;

      function N() {
        return c.one("#" + E.name)
      }
      return {
        show: function() {
          O = N().one(".description");
          Q().one("button").insert(O, "before");
          Q().removeClass("hidden");
          B.show();
          P = true
        },
        hide: function() {
          if (!(P && O)) {
            return
          }
          N().appendChild(O);
          Q().addClass("hidden");
          B.hide();
          P = false
        }
      }
    })(),
    b = {
      selected: null,
      fade: false,
      init: function() {
        this.refit()
      },
      node: r("#game-chooser"),
      refit: function() {
        var N = c.one("#game-chooser"),
          M = N.get("winHeight");
        N.setStyle("min-height", M)
      },
      show: function(M) {
        if (!this.selected) {
          this.select(E.name)
        }
        if (M) {
          B.show();
          this.fade = true
        }
        this.node().addClass("show").append(v.node());
        q().addClass("scrollable")
      },
      hide: function() {
        if (this.fade) {
          B.hide()
        }
        this.node().removeClass("show");
        c.fire("gamechooser:hide", this);
        q().removeClass("scrollable").append(v.node())
      },
      choose: function() {
        if (!this.selected) {
          return
        }
        this.hide();
        k(this.selected)
      },
      select: function(M) {
        var O = c.one("#" + M + "> div"),
          N = this.selected;
        if (N !== M) {
          this.unSelect()
        }
        if (O) {
          this.selected = M;
          new c.Node(document.getElementById(M)).addClass("selected")
        }
        if (N && N !== M) {
          c.fire("gamechooser:select", this)
        }
      },
      unSelect: function() {
        if (!this.selected) {
          return
        }
        new c.Node(document.getElementById(this.selected)).removeClass("selected");
        this.selected = null
      }
    },
    K = {
      selector: "#options-chooser",
      initInputs: function() {
        var N, M = o.properties,
          O;
        for (N in M) {
          if (!M.hasOwnProperty(N)) {
            continue
          }
          O = M[N].get();
          if (typeof O === "boolean") {
            document.getElementById(N + "-toggle").checked = O
          }
        }
      },
      attachEvents: function() {
        c.delegate("change", function(O) {
          var M = this.get("id").replace("-toggle", ""),
            N = o.properties[M];
          if (N) {
            N.set(this.get("checked"));
            o.save()
          }
        }, this.selector, "input[type=checkbox]");
        c.delegate("click", function() {
          v.load(this.getData("item"));
          o.save()
        }, "#background-options .backgrounds", ".background");
        c.delegate("click", function(M) {
          u.load(this.getData("item"));
          y.preload(false);
          y.loaded(n);
          o.save()
        }, "#graphics-options .cards", ".card-preview")
      },
      element: (function() {
        var M;

        function N(U, O, V) {
          var R, P = U.all,
            T = U.current,
            S = c.one(O),
            Q;
          for (R in P) {
            if (!P.hasOwnProperty(R)) {
              continue
            }
            U.current = R;
            Q = V(U).setData("item", R);
            if (R === T) {
              Q.addClass("selected")
            }
            S.append(Q)
          }
          U.current = T
        }
        return function() {
          var O;
          if (!M) {
            M = c.one(K.selector);
            O = new c.TabView({
              srcNode: M.one(".tabview")
            });
            O.render();
            K.initInputs();
            K.attachEvents();
            N(u, "#graphics-options .cards", function(P) {
              return c.Node.create(c.Lang.sub("<li class=card-preview><img src={base}/facedown.png><img src={base}/h12.png></li>", {
                base: P.basePath(90)
              }))
            });
            N(v, "#background-options .backgrounds", function(P) {
              return c.Node.create("<li class=background></li>").setStyle("backgroundImage", "url(" + P.all[P.current].image + ")")
            })
          }
          return M
        }
      }()),
      show: function() {
        B.show();
        this.element().removeClass("hidden")
      },
      hide: function() {
        B.hide();
        this.element().addClass("hidden")
      }
    },
    o = {
      properties: {
        cardTheme: {
          set: function(M) {
            u.load(M)
          },
          get: function() {
            return u.current || u.defaultTheme
          }
        },
        autoplay: {
          set: function(N) {
            var M = c.Solitaire.Autoplay;
            N ? M.enable() : M.disable()
          },
          get: function() {
            return c.Solitaire.Autoplay.isEnabled()
          }
        },
        animateCards: {
          set: function(M) {
            c.Solitaire.Animation.animate = M
          },
          get: function() {
            return c.Solitaire.Animation.animate
          }
        },
        autoFlip: {
          set: function(N) {
            var M = c.Solitaire.AutoTurnover;
            N ? M.enable() : M.disable()
          },
          get: function() {
            return c.Solitaire.AutoTurnover.isEnabled()
          }
        },
        enableSolver: {
          set: function(M) {
            var N = c.Solitaire.Solver.Freecell;
            M ? N.enable() : N.disable()
          },
          get: function() {
            return c.Solitaire.Solver.Freecell.isEnabled()
          }
        },
        background: {
          set: function(M) {
            v.load(M)
          },
          get: function() {
            return v.current || v.defaultBackground
          }
        }
      },
      load: function() {
        var M;
        M = localStorage.options;
        if (!M) {
          M = c.Cookie.get("full-options");
          c.Cookie.remove("full-options")
        }
        try {
          c.JSON.parse(M, this.set.bind(this))
        } catch (N) {}
        if (!u.current) {
          u.load()
        }
        if (!v.current) {
          v.load()
        }
      },
      save: function() {
        localStorage.options = c.JSON.stringify(t(this.properties, function(M, N) {
          return N.get()
        }))
      },
      set: function(M, N) {
        var O = this.properties[M];
        if (O) {
          O.set(N)
        }
      },
    },
    u = {
      all: {
        air: {
          sizes: [141],
          141: {
            hiddenRankHeight: 17,
            rankHeight: 55,
            dimensions: [141, 199]
          }
        },
        ancient_egyptians: {
          sizes: [148],
          148: {
            hiddenRankHeight: 17,
            rankHeight: 50,
            dimensions: [148, 200]
          }
        },
        dondorf: {
          sizes: [61, 79, 95, 122],
          61: {
            hiddenRankHeight: 7,
            rankHeight: 25,
            dimensions: [61, 95]
          },
          79: {
            hiddenRankHeight: 10,
            rankHeight: 32,
            dimensions: [79, 123]
          },
          95: {
            hiddenRankHeight: 12,
            rankHeight: 38,
            dimensions: [95, 148]
          },
          122: {
            hiddenRankHeight: 15,
            rankHeight: 48,
            dimensions: [122, 190]
          }
        },
        "jolly-royal": {
          sizes: [144],
          144: {
            hiddenRankHeight: 20,
            rankHeight: 52,
            dimensions: [144, 200]
          }
        },
        paris: {
          sizes: [131],
          131: {
            hiddenRankHeight: 18,
            rankHeight: 48,
            dimensions: [131, 204]
          }
        }
      },
      current: null,
      defaultTheme: "jolly-royal",
      snapToSize: function(M) {
        var O = this.all[this.current],
          N = O.sizes;
        M = l(M || 0, N[0], N[N.length - 1]) >>> 0;
        while (c.Array.indexOf(N, M) === -1) {
          M++
        }
        return M
      },
      basePath: function(M) {
        return this.current + "/" + this.snapToSize(M)
      },
      load: function(M) {
        var O = c.Solitaire,
          P = O.Card.base,
          N;
        if (!(M in this.all)) {
          M = this.defaultTheme
        }
        this.current = M;
        N = this.all[M].sizes;
        this.set(N[N.length - 1])
      },
      set: function(M) {
        var N = this.all[this.current][M];
        c.mix(c.Solitaire.Card.base, {
          theme: this.basePath(M),
          hiddenRankHeight: N.hiddenRankHeight,
          rankHeight: N.rankHeight,
          width: N.dimensions[0],
          height: N.dimensions[1]
        }, true)
      }
    },
    v = {
      all: {
        green: {
          image: "green.jpg",
          size: "100%"
        },
        vintage: {
          image: "backgrounds/grungy-vintage.jpg",
          repeat: true,
        },
        circles: {
          image: "backgrounds/retro-circles-army-green.jpg",
          repeat: true,
        },
        watercolor: {
          image: "backgrounds/watercolor-grunge-ripe-apricot.jpg",
          size: "cover",
        },
        heart: {
          image: "backgrounds/grunge-hearts-maroon-copper.jpg",
          size: "cover"
        }
      },
      current: null,
      defaultBackground: "green",
      stylesheet: null,
      load: function(M) {
        if (!(M in this.all)) {
          M = this.defaultBackground
        }
        this.current = M;
        this.set()
      },
      set: function() {
        var M = this.all[this.current],
          N;
        N = this.node();
        if (M.repeat) {
          this.imageNode().hide();
          this.node().setStyle("backgroundImage", "url(" + M.image + ")")
        } else {
          this.node().setStyle("backgroundImage", "none");
          this.imageNode().set("src", M.image).show()
        }
      },
      resize: function() {
        var P = this.all[this.current],
          Q = this.imageNode(),
          M = Q.get("width"),
          U = Q.get("height"),
          N = Q.get("winWidth"),
          O = Q.get("winHeight"),
          T, S, R;
        if (P.repeat) {
          return
        }
        if (P.size === "cover") {
          T = M / N;
          S = U / O;
          R = T < S ? T : S;
          Q.setAttrs({
            width: Math.ceil(M / R),
            height: Math.ceil(U / R)
          })
        } else {
          if (P.size === "100%") {
            Q.setAttrs({
              width: N,
              height: O
            })
          }
        }
        Q.show()
      },
      imageNode: r("#background-image"),
      node: function() {
        var M = c.one("#background"),
          N;
        if (!M) {
          M = c.Node.create("<div id=background>").appendTo(q());
          N = c.Node.create("<img id=background-image>");
          N.set("draggable", false);
          N.on("load", this.resize.bind(this));
          M.append(N)
        }
        return M
      }
    };

  function l(O, M, N) {
    return Math.max(Math.min(O, N), M)
  }

  function t(O, P) {
    var M = {},
      N;
    for (N in O) {
      if (!O.hasOwnProperty(N)) {
        continue
      }
      M[N] = P.call(O, N, O[N])
    }
    return M
  }

  function s() {
    var N = F.slice(),
      M;
    for (M in D) {
      if (D.hasOwnProperty(M)) {
        N.unshift(M)
      }
    }
    return N
  }

  function e(M) {
    c = M;
    a();
    c.on("domready", A)
  }

  function p() {
    b.select(this._node.id);
    b.choose()
  }
  var d = r("#about-popup"),
    G = r("#stats-popup"),
    x = r("#win-display");

  function i(M) {
    c.fire("popup", M)
  }
  var g = {
    promptNode: r("#confirmation-prompt"),
    node: r("#confirmation"),
    affirmButton: r("#confirmation-affirm"),
    denyButton: r("#confirmation-deny"),
    active: false,
    attachEvents: function(M) {
      this.affirmButton().once("click", function() {
        M();
        this.hide()
      }.bind(this));
      this.denyButton().once("click", function() {
        this.hide()
      }.bind(this))
    },
    resize: function() {
      if (!this.active) {
        return
      }
      this.node().setStyles({
        width: this.node().get("winWidth") + "px",
        height: this.node().get("winHeight") + "px"
      })
    },
    hide: function() {
      this.active = false;
      this.node().addClass("hidden")
    },
    show: function(M, N) {
      this.active = true;
      this.attachEvents(N);
      this.promptNode().set("text", M);
      this.node().removeClass("hidden");
      this.resize()
    }
  };

  function m() {
    var M = function() {
      b.hide();
      K.hide();
      I.hide();
      G().addClass("hidden");
      d().addClass("hidden");
      B.hide()
    };
    c.on("click", H, c.one("#restart"));
    c.on("click", i.partial("GameChooser"), c.one("#choose-game"));
    c.on("click", i.partial("OptionsChooser"), c.one("#choose-options"));
    c.on("click", i.partial("Rules"), c.one("#rules"));
    c.on("click", i.partial("About"), c.one("#about"));
    c.on("click", function() {
      E.game.undo()
    }, c.one("#undo"));
    c.on("click", f, c.one("#new-deal"));
    c.on("click", c.Solitaire.Statistics.statsDisplay, c.one("#stats"));
    c.on("submit", function() {
      c.Solitaire.Analytics.track("Donations", "Click", "Paypal button")
    }, c.one("#donate"));
    c.on("click", L, c.one(".chromestore"));
    c.delegate("click", p, "#descriptions", "li");
    c.on("click", M, ".close-chooser");
    c.one("document").on("keydown", function(N) {
      if (N.keyCode === 27) {
        M()
      }
    });
    c.on("afterSetup", function() {
      E.game.stationary(function() {
        n()
      })
    });
    c.on("Application|popup", function(N) {
      x().addClass("hidden");
      switch (N) {
        case "GameChooser":
          b.show(false);
          break;
        case "OptionsChooser":
          K.show();
          break;
        case "About":
          d().removeClass("hidden");
          B.show();
          break;
        case "Rules":
          I.show();
          break;
        case "Stats":
          G().removeClass("hidden");
          B.show();
          break
      }
    });
    c.on("fieldResize", function(P, N, O) {
      E.game.resize(P)
    });
    h()
  }

  function h() {
    var O, M = 250,
      N;
    if (window.addEventListener) {
      N = "addEventListener"
    } else {
      if (window.attachEvent) {
        N = "attachEvent"
      }
    }
    window[N](c.Solitaire.Application.resizeEvent, function() {
      clearTimeout(O);
      O = setTimeout(n, M)
    }, false)
  }

  function n() {
    var N = E.game,
      Q = N.container(),
      R = N.padding,
      S = N.offset,
      P = Q.get("winWidth") - R.x,
      M = Q.get("winHeight") - R.y,
      O = 1;
    c.Solitaire.Application.windowHeight = M;
    O = Math.min((P - normalize(S.left)) / N.width(), (M - normalize(S.top)) / N.height());
    c.fire("fieldResize", O, P, M);
    b.refit();
    B.resize();
    v.resize();
    g.resize()
  }

  function k(M) {
    E.name = M;
    E.game = w(M);
    f()
  }

  function w(M) {
    return c.Solitaire[D[M]] || c.Solitaire[M]
  }

  function A() {
    var M = c.Solitaire.SaveManager.getSavedGame();
    if (M.name !== "") {
      E.name = M.name
    }
    m();
    o.load();
    y.preload();
    y.loaded(function() {
      C();
      if (M.serialized !== "") {
        J();
        E.game = w(E.name);
        try {
          E.game.cleanup();
          E.game.loadGame(M.serialized)
        } catch (N) {
          k(E.name)
        }
      } else {
        k(E.name)
      }
    });
    b.init()
  }

  function J() {
    c.all(".stack, .card").remove()
  }

  function H() {
    var N = c.Solitaire.SaveManager.getSavedGame("initial-game"),
      M = E.game;
    J();
    M.cleanup();
    if (N.serialized !== "") {
      M.loadGame(N.serialized)
    } else {
      M.newGame()
    }
  }

  function f() {
    var M = E.game;
    J();
    M.cleanup();
    M.newGame()
  }

  function a() {
    c.Solitaire.Application = {
      windowHeight: 0,
      resizeEvent: "resize",
      GameChooser: b,
      Confirmation: g,
      newGame: f,
      nameMap: j,
      currentTheme: function() {
        return u.current
      }
    }
  }

  function L() {
    c.one(".chromestore").addClass("hidden");
    localStorage["disable-chromestore-link"] = "true"
  }

  function C() {
    var M = "disable-chromestore-link";
    if (c.UA.chrome && (localStorage[M] !== "true" || !c.Cookie.get(M, Boolean))) {
      c.one(".chromestore").removeClass("hidden")
    }
  }
  var y = {
    loadingCount: 0,
    showFade: true,
    loaded: function(M) {
      if (this.loadingCount) {
        setTimeout(function() {
          this.loaded(M)
        }.bind(this), 100)
      } else {
        c.one(".loading").addClass("hidden");
        M();
        if (this.showFade) {
          B.hide()
        }
      }
    },
    load: function(N) {
      var M = new Image;
      M.onload = function() {
        --this.loadingCount
      }.bind(this);
      M.onerror = function() {
        --this.loadingCount
      }.bind(this);
      M.src = N;
      this.loadingCount++
    },
    preload: function(O) {
      var N, M = ["agnes", "flower-garden", "forty-thieves", "freecell", "gclock", "golf", "klondike1t", "klondike", "montecarlo", "pyramid", "scorpion", "spider1s", "spider2s", "spiderette", "spider", "tritowers", "will-o-the-wisp", "yukon"];
      c.Array.each(["s", "h", "c", "d"], function(P) {
        for (N = 1; N <= 13; N++) {
          this.load(c.Solitaire.Card.base.theme + "/" + P + N + ".png")
        }
      }, this);
      this.load(c.Solitaire.Card.base.theme + "/facedown.png");
      this.load(c.Solitaire.Card.base.theme + "/freeslot.png");
      c.Array.each(M, function(P) {
        this.load("layouts/mini/" + P + ".png")
      }, this);
      this.showFade = O !== false;
      if (this.showFade) {
        B.show()
      }
      c.one(".loading").removeClass("hidden")
    }
  };
  z.use.apply(z, s().concat(e))
}());