/* Tharsis visual ensemble. PixiJS 0.5.1 plugin + LiaScript narrator avatar. */
(() => {
  'use strict';
  const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const names = { okoye: 'Kommandantin Amara Okoye', berg: 'Techniker Jonas Berg', schildi: 'Schildi · Borddisplay' };
  let atlasURL = '';
  const atlas = new Image();
  const portraits = { okoye: new Image(), berg: new Image() };
  const portraitRegions = {
    okoye: { mouth: [0.40, 0.50, 0.20, 0.115], eyes: [0.35, 0.35, 0.30, 0.13] },
    berg: { mouth: [0.39, 0.475, 0.23, 0.11], eyes: [0.33, 0.31, 0.34, 0.15] }
  };
  const frames = {
    okoye: [0, 0, 480, 1024],
    berg: [480, 0, 400, 1024],
    schildi: [880, 320, 656, 680]
  };

  // Shared pixel alphabet: the narrator and rover use the same face.
  function pixels(draw, expression, speaking, time = 0, eyes = null) {
    const color = ['scared', 'sad'].includes(expression) ? '#FF8D87' : '#67DCEC';
    const sleepy = expression === 'sleepy';
    const blink = !calm() && (eyes === 'blink' || time % 4800 > 4590);
    const wink = !calm() && eyes === 'wink';
    draw(5, blink || wink || sleepy ? 6 : 4, 3, blink || wink || sleepy ? 1 : 4, color);
    draw(14, blink || sleepy ? 6 : 4, 3, blink || sleepy ? 1 : 4, color);
    if (speaking) {
      const bars = calm() ? [2, 3, 4, 3, 2] : [1, 2, 3, 2, 1].map((n, i) => 1 + (Math.floor(time / 100) + i * n) % 4);
      bars.forEach((h, i) => draw(7 + i * 2, 13 - h, 1, h, color));
    } else if (expression === 'surprised' || expression === 'scared') {
      draw(10, 10, 3, 3, color);
    } else {
      draw(9, 11, 1, 1, color); draw(10, 12, 3, 1, color); draw(13, 11, 1, 1, color);
    }
  }

  class TharsisSpeaker extends HTMLElement {
    static get observedAttributes() { return ['data-speaker']; }
    connectedCallback() {
      this.innerHTML = '<div class="tharsis-radio"><span class="tharsis-channel">THARSIS / FUNKKANAL</span><canvas width="480" height="480" role="img"></canvas><span class="tharsis-name"></span><span class="tharsis-signal" aria-hidden="true">▂ ▄ ▆ ▄ ▂</span></div>';
      this.canvas = this.querySelector('canvas');
      this.context = this.canvas.getContext('2d');
      this.speechStarted = performance.now();
      this.nextBlink = this.speechStarted + 3500 + Math.random() * 2500;
      this.blinkUntil = 0;
      this.winkUntil = 0;
      this.lastWink = -Infinity;
      this.listen = event => {
        const now = performance.now();
        const state = event.detail;
        const wasSpeaking = this.speaking;
        this.speaking = state.status === 'speaking' && !['pause', 'stop', 'error'].includes(state.type);
        if (this.speaking && (!wasSpeaking || state.type === 'boundary')) this.speechStarted = now;
        if (this.speaking) this.winkUntil = 0;
        if (wasSpeaking && state.type === 'stop' && !calm() && now - this.lastWink > 15000) {
          this.winkUntil = now + 240;
          this.lastWink = now;
        }
        this.classList.toggle('speaking', this.speaking);
        this.draw(now);
      };
      window.addEventListener('lia-narrator', this.listen);
      this.redraw = () => this.draw(performance.now());
      atlas.addEventListener('load', this.redraw);
      Object.values(portraits).forEach(image => image.addEventListener('load', this.redraw));
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motionQuery.addEventListener('change', this.redraw);
      this.speaking = window.LIA?.narrator?.state?.status === 'speaking';
      this.classList.toggle('speaking', this.speaking);
      this.sync();
      // Idle blinking needs a clock too; redraw only visible avatars, at 25 fps.
      const tick = now => {
        if (!this.isConnected) return;
        if (!calm() && !document.hidden && this.getClientRects().length && now - (this.lastDraw || 0) >= 40) {
          this.draw(now);
          this.lastDraw = now;
        }
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    }
    disconnectedCallback() {
      window.removeEventListener('lia-narrator', this.listen);
      atlas.removeEventListener('load', this.redraw);
      Object.values(portraits).forEach(image => image.removeEventListener('load', this.redraw));
      this.motionQuery.removeEventListener('change', this.redraw);
      cancelAnimationFrame(this.raf);
    }
    attributeChangedCallback() { if (this.canvas) this.sync(); }
    sync() {
      const id = this.getAttribute('data-speaker');
      this.speaker = names[id] ? id : 'okoye';
      this.blinkUntil = 0;
      this.winkUntil = 0;
      this.nextBlink = performance.now() + 3500 + Math.random() * 2500;
      this.querySelector('.tharsis-name').textContent = names[this.speaker];
      this.canvas.setAttribute('aria-label', names[this.speaker]);
      this.draw(performance.now());
    }
    draw(time) {
      const c = this.context;
      const reduced = calm();
      if (!reduced && time >= this.nextBlink) {
        this.blinkUntil = time + 140;
        this.nextBlink = time + 3500 + Math.random() * 3000;
      }
      const blink = !reduced && time < this.blinkUntil;
      const wink = !reduced && time < this.winkUntil;
      const phase = (time - this.speechStarted) % 280;
      const mouth = this.speaking && !reduced && phase < 170;
      const frame = blink ? 2 : wink ? 3 : mouth ? 1 : 0;
      this.dataset.face = ['neutral', 'talk', 'blink', 'wink'][frame];
      this.dataset.mouth = mouth ? 'open' : 'closed';
      this.dataset.eyes = blink ? 'blink' : wink ? 'wink' : 'open';
      c.clearRect(0, 0, 480, 480);
      c.fillStyle = '#122438'; c.fillRect(0, 0, 480, 480);
      if (this.speaker === 'schildi') {
        c.fillStyle = '#FBF7F2'; c.beginPath(); c.roundRect(35, 75, 410, 295, 40); c.fill();
        c.fillStyle = '#091321'; c.beginPath(); c.roundRect(55, 95, 370, 250, 25); c.fill();
        pixels((x, y, w, h, color) => { c.fillStyle = color; c.fillRect(74 + x * 15, 100 + y * 15, w * 15, h * 15); }, 'happy', this.speaking, time, blink ? 'blink' : wink ? 'wink' : null);
        c.fillStyle = '#FFB36B'; c.fillRect(210, 390, 60, 10);
      } else {
        const portrait = portraits[this.speaker];
        if (portrait?.complete && portrait.naturalWidth) {
          const w = portrait.naturalWidth / 2;
          const h = portrait.naturalHeight / 2;
          // Keep head, hair and shoulders still: animate only mouth and eyelids.
          c.drawImage(portrait, 0, 0, w, h, 0, 0, 480, 480);
          const patch = (index, region) => {
            const [x, y, rw, rh] = region;
            c.drawImage(portrait, (index % 2 + x) * w, (Math.floor(index / 2) + y) * h, rw * w, rh * h, x * 480, y * 480, rw * 480, rh * 480);
          };
          if (mouth) patch(1, portraitRegions[this.speaker].mouth);
          if (blink || wink) patch(blink ? 2 : 3, portraitRegions[this.speaker].eyes);
        }
      }
    }
  }
  if (!customElements.get('tharsis-speaker')) customElements.define('tharsis-speaker', TharsisSpeaker);

  window.TharsisVisuals = {
    configure(url) {
      atlasURL = url;
      if (atlas.src !== url) atlas.src = url;
      for (const [id, file] of [['okoye', 'amara-speaker.webp'], ['berg', 'jonas-speaker.webp']]) {
        const src = new URL(file, url).href;
        if (portraits[id].src !== src) portraits[id].src = src;
      }
      if (window.LIA?.narrator) window.LIA.narrator.registerAvatar('tharsis-speaker');
    },
    frames,
    pixels
  };

  function plugin(LiaPixi) {
    LiaPixi.defineActor('tharsis', async ({ PIXI }, def) => {
      const id = def.kv.person || def.id;
      const source = await PIXI.Assets.load(atlasURL);
      const frame = frames[id];
      if (!frame) throw new Error('Unbekannte Tharsis-Figur: ' + id);
      const radio = id !== 'schildi' && def.kv.mode !== 'room';
      const crop = radio ? [frame[0], 0, frame[2], 640] : frame;
      const texture = new PIXI.Texture({ source: source.source, frame: new PIXI.Rectangle(...crop) });
      const view = new PIXI.Container();
      const body = new PIXI.Container();
      view.addChild(body);
      const sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0.5, 1);
      if (radio) {
        const station = await PIXI.Assets.load(new URL('station-tharsis.webp', atlasURL).href);
        const panel = new PIXI.Container();
        const background = new PIXI.Sprite(station);
        background.anchor.set(0.5, 1);
        background.width = 1100; background.height = 620;
        const mask = new PIXI.Graphics().roundRect(-210, -620, 420, 620, 22).fill('#FFFFFF');
        panel.addChild(background, mask); panel.mask = mask;
        body.addChild(panel);
        const border = new PIXI.Graphics().roundRect(-210, -620, 420, 620, 22).fill({color:'#091321',alpha:0.16}).stroke({color:'#67DCEC',width:5});
        body.addChild(border);
        sprite.scale.set(0.75); sprite.y = -32;
      }
      body.addChild(sprite);
      if (radio) {
        const bars = new PIXI.Graphics().roundRect(-210, -620, 420, 58, 18).fill('#091321').rect(-210, -38, 420, 38).fill('#091321');
        const title = new PIXI.Text({text:'STATION THARSIS',style:{fontFamily:'sans-serif',fontSize:25,fontWeight:'bold',fill:'#67DCEC'}});
        title.anchor.set(0.5); title.position.set(0,-590);
        const subtitle = new PIXI.Text({text:'FUNK · INNENANSICHT',style:{fontFamily:'sans-serif',fontSize:19,fill:'#E6F1FA'}});
        subtitle.anchor.set(0.5); subtitle.position.set(0,-19);
        body.addChild(bars,title,subtitle);
      }
      const screen = new PIXI.Graphics();
      if (id === 'schildi') body.addChild(screen);
      let expression = 'happy', speaking = false, elapsed = 0;
      function draw() {
        if (id !== 'schildi') return;
        screen.clear().roundRect(-228, -366, 150, 89, 12).fill('#091321');
        pixels((x, y, w, h, color) => screen.rect(-223 + x * 6, -361 + y * 6, w * 6, h * 6).fill(color), expression, speaking, elapsed);
      }
      draw();
      return {
        view, body, height: radio ? 620 : frame[3],
        setExpression(value) { expression = value; draw(); },
        talk(open) { speaking = open; draw(); },
        update(ms) {
          elapsed += ms;
          body.y = calm() ? 0 : Math.sin(elapsed / (id === 'schildi' ? 650 : 1100)) * (speaking ? 3 : 1.2);
          if (id === 'schildi') draw();
        },
        destroy() { view.destroy({ children: true }); texture.destroy(false); }
      };
    });

    LiaPixi.defineActor('glimmis', ({ PIXI }) => {
      const view = new PIXI.Container();
      const lights = [];
      for (let i = 0; i < 32; i++) {
        const g = new PIXI.Graphics();
        const x = Math.sin(i * 2.4) * (65 + (i % 5) * 18);
        const y = -95 - (i % 8) * 20;
        view.addChild(g); lights.push({ g, x, y });
      }
      let elapsed = 0, color = '#67DCEC';
      function draw() {
        lights.forEach(({ g, x, y }, i) => {
          const wave = calm() ? 0.7 : 0.65 + Math.sin(elapsed / 700 + i) * 0.22;
          g.clear().circle(0, 0, 15).fill({ color, alpha: 0.06 }).circle(0, 0, 8).fill({ color, alpha: 0.17 }).circle(0, 0, 3.5).fill({ color, alpha: wave });
          g.position.set(x, y + (calm() ? 0 : Math.sin(elapsed / 1200 + i) * 5));
        });
      }
      draw();
      return { view, height: 280,
        setExpression(expr) { color = expr === 'happy' ? '#9DE6B1' : expr === 'scared' ? '#FFB36B' : '#67DCEC'; draw(); },
        talk() {}, update(ms) { elapsed += ms; draw(); }, destroy() { view.destroy({ children: true }); }
      };
    });

    // One weather layer per stage; the ticker is owned and disposed by that stage.
    LiaPixi.defineCommand('atmosphere', {
      parse: rest => ({ mode: rest.trim() }),
      run(ctx, { mode }) {
        if (ctx.app.__tharsisWeather) ctx.app.__tharsisWeather();
        if (mode === 'clear') return;
        const layer = new ctx.PIXI.Container();
        const storm = mode === 'storm';
        // Weather belongs to the exterior camera, behind the radio windows.
        ctx.layers.bg.addChild(layer);
        if (storm) layer.addChild(new ctx.PIXI.Graphics().rect(0, 0, ctx.W, ctx.H).fill({color:'#A38269',alpha:0.42}));
        const dust = Array.from({ length: storm ? 52 : 18 }, (_, i) => {
          const g = new ctx.PIXI.Graphics().ellipse(0, 0, storm ? 12 : 3, storm ? 1 : 0.8).fill({ color: storm ? '#E1B085' : '#FBF7F2', alpha: storm ? 0.2 : 0.16 });
          g.position.set((i * 137.3) % ctx.W, (i * 71.7) % (ctx.H * 0.8));
          layer.addChild(g); return g;
        });
        const tick = ticker => {
          if (calm()) return;
          dust.forEach((g, i) => {
            g.x += ticker.deltaMS * (storm ? 0.2 : 0.012) * (1 + (i % 3) / 3);
            if (g.x > ctx.W + 20) g.x = -20;
          });
        };
        ctx.app.ticker.add(tick);
        ctx.app.__tharsisWeather = () => {
          ctx.app.ticker.remove(tick);
          if (!layer.destroyed) layer.destroy({ children: true });
          delete ctx.app.__tharsisWeather;
        };
      }
    });
    LiaPixi.defineCommand('signal', {
      parse: rest => ({ color: rest.trim() || '#67DCEC' }),
      async run({ PIXI, layers, W, H, tween }, { color }) {
        if (calm()) return;
        const ring = new PIXI.Graphics().circle(0, 0, 30).stroke({ color, width: 2, alpha: 0.65 });
        ring.position.set(W * 0.5, H * 0.32);
        layers.fx.addChild(ring);
        try { await Promise.all([tween(ring.scale, { x: 6, y: 6 }, 1, 'out'), tween(ring, { alpha: 0 }, 1, 'out')]); }
        finally { if (!ring.destroyed) ring.destroy(); }
      }
    });
  }
  if (window.LiaPixi) plugin(window.LiaPixi);
  else window.LiaPixiPlugins = (window.LiaPixiPlugins || []).concat(plugin);
})();
