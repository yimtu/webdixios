import * as THREE from 'three';

type Quality = 'high' | 'medium' | 'low';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.querySelector<HTMLCanvasElement>('#hero-webgl');

if (canvas) {
  try {
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false
    });

    if (!gl) throw new Error('WebGL2 unavailable');

    const isMobile = matchMedia('(max-width: 760px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    let quality: Quality = isMobile || cores <= 4 || memory <= 4 ? 'low' : cores <= 8 ? 'medium' : 'high';

    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true, antialias: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 }
    };

    const vertexShader = /* glsl */`
      varying vec2 vUv;
      void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }
    `;

    const fragmentShader = /* glsl */`
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform float uScroll;

      float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
      float line(float d,float w){ return 1.0-smoothstep(w,w+0.0025,abs(d)); }
      mat2 rot(float a){ float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }

      void main(){
        vec2 uv=vUv;
        vec2 p=uv-.5;
        p.x*=uResolution.x/max(uResolution.y,1.0);
        vec2 mp=uPointer-.5;
        mp.x*=uResolution.x/max(uResolution.y,1.0);
        float t=uTime*.14;

        vec3 night=vec3(0.0,.025,.13);
        vec3 blue=vec3(0.0,.247,.56);
        vec3 electric=vec3(.055,.294,.631);
        vec3 cyan=vec3(.043,.706,.843);
        vec3 magenta=vec3(.776,.337,.667);
        vec3 coral=vec3(.882,.306,.22);
        vec3 color=mix(night,blue*.72,smoothstep(.95,-.2,length(p)));

        vec2 q=p;
        q+=.035*vec2(sin(q.y*8.0+t*3.0),cos(q.x*7.0-t*2.0));
        q+=(mp-p)*.032/(.25+dot(mp-p,mp-p));

        vec2 guv=q*7.0;
        vec2 grid=abs(fract(guv-.5)-.5)/fwidth(guv);
        float gridLine=1.0-min(min(grid.x,grid.y),1.0);
        color+=electric*gridLine*.075;

        vec2 center=vec2(.28,.02);
        float r=length(q-center);
        float rings=line(fract(r*4.8-t*.45)-.5,.035)*smoothstep(1.0,.05,r);
        color+=cyan*rings*.20;

        vec2 rp=(q-center)*rot(-.12-uScroll*.28);
        float beamA=line(rp.y-sin(rp.x*2.7+t)*.05,.008);
        float beamB=line(rp.y+.25-cos(rp.x*3.1-t*.8)*.04,.004);
        color+=cyan*beamA*.33+magenta*beamB*.20;

        vec2 cells=floor((q+vec2(1.4,.95))*20.0);
        vec2 local=fract((q+vec2(1.4,.95))*20.0)-.5;
        float rnd=hash21(cells);
        float dotShape=1.0-smoothstep(.08,.15,length(local));
        float active=step(.82,rnd)*dotShape;
        color+=mix(cyan,magenta,step(.93,rnd))*active*.46*smoothstep(1.1,.15,length(q));

        vec2 anomaly=q-vec2(.56,-.22);
        float crossA=line(anomaly.x,.006)*smoothstep(.095,.07,abs(anomaly.y));
        float crossB=line(anomaly.y,.006)*smoothstep(.095,.07,abs(anomaly.x));
        color+=coral*(crossA+crossB)*(.72+.28*sin(uTime*1.4));

        float glow=exp(-5.5*length(q-center));
        color+=cyan*glow*.17;
        float scan=exp(-80.0*abs(uv.y-fract(t*.07+uScroll*.28)));
        color+=vec3(.18,.48,.72)*scan*.065;
        float vignette=smoothstep(.95,.28,length(p*vec2(.78,1.0)));
        color*=.72+vignette*.36;
        color+=(hash21(gl_FragCoord.xy+floor(uTime*24.0))-.5)*.025;
        gl_FragColor=vec4(color,1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthWrite: false, depthTest: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let raf = 0;
    let running = false;
    let last = performance.now();
    let frames = 0;
    let sampleStart = last;
    const targetPointer = new THREE.Vector2(.5,.5);
    const qualityScale = () => quality === 'high' ? 1 : quality === 'medium' ? .82 : .62;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const maxPixels = isMobile ? 900_000 : quality === 'high' ? 2_200_000 : 1_500_000;
      const nativeDpr = Math.min(devicePixelRatio || 1, quality === 'high' ? 1.6 : 1.25);
      const desired = rect.width * rect.height * nativeDpr * nativeDpr;
      const scale = desired > maxPixels ? Math.sqrt(maxPixels / desired) : 1;
      const dpr = Math.max(.65, nativeDpr * scale * qualityScale());
      renderer.setPixelRatio(dpr);
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width*dpr, rect.height*dpr);
    };

    const render = (now:number) => {
      if(!running) return;
      const dt=Math.min(32,now-last); last=now;
      if(!reduceMotion) uniforms.uTime.value+=dt*.001;
      uniforms.uPointer.value.lerp(targetPointer,reduceMotion?1:.055);
      renderer.render(scene,camera);
      frames++;
      if(!reduceMotion && now-sampleStart>2600){
        const fps=frames*1000/(now-sampleStart);
        if(fps<43 && quality!=='low'){ quality=quality==='high'?'medium':'low'; resize(); }
        frames=0; sampleStart=now;
      }
      if(!reduceMotion) raf=requestAnimationFrame(render);
    };

    const start = () => {
      if(running) return;
      running=true; last=performance.now();
      if(reduceMotion){ renderer.render(scene,camera); return; }
      raf=requestAnimationFrame(render);
    };
    const stop = () => { running=false; cancelAnimationFrame(raf); raf=0; };

    resize();
    start();
    document.documentElement.classList.add('has-webgl');

    canvas.addEventListener('pointermove',event=>{
      const rect=canvas.getBoundingClientRect();
      targetPointer.set(
        THREE.MathUtils.clamp((event.clientX-rect.left)/rect.width,0,1),
        THREE.MathUtils.clamp(1-(event.clientY-rect.top)/rect.height,0,1)
      );
    },{passive:true});
    canvas.addEventListener('pointerleave',()=>targetPointer.set(.5,.5),{passive:true});
    addEventListener('resize',resize,{passive:true});

    const io=new IntersectionObserver(([entry])=>entry.isIntersecting?start():stop(),{threshold:.01});
    io.observe(canvas);
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
    window.addEventListener('dixios:hero-scroll',((event:CustomEvent<number>)=>{ uniforms.uScroll.value=event.detail; }) as EventListener);
    window.addEventListener('pagehide',()=>{ stop(); io.disconnect(); material.dispose(); mesh.geometry.dispose(); renderer.dispose(); },{once:true});
  } catch (error) {
    console.info('[Dixios] WebGL enhancement unavailable; using CSS/SVG fallback.', error);
    document.documentElement.classList.add('no-webgl');
    canvas.hidden = true;
  }
}
