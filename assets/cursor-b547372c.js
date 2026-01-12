const l=document.getElementById("fluid");J();let f={SIM_RESOLUTION:128,DYE_RESOLUTION:1440,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:3.5,VELOCITY_DISSIPATION:2,PRESSURE:.1,PRESSURE_ITERATIONS:20,CURL:10,SPLAT_RADIUS:.5,SPLAT_FORCE:6e3,SHADING:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!0};function Z(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[.3,.18,.08]}let g=[];g.push(new Z);const{gl:t,ext:p}=ee(l);p.supportLinearFiltering||(f.DYE_RESOLUTION=512,f.SHADING=!1);function ee(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",r);const o=!!i;o||(i=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let a,c;o?(i.getExtension("EXT_color_buffer_float"),c=i.getExtension("OES_texture_float_linear")):(a=i.getExtension("OES_texture_half_float"),c=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);const u=o?i.HALF_FLOAT:a.HALF_FLOAT_OES;let s,T,U;return o?(s=_(i,i.RGBA16F,i.RGBA,u),T=_(i,i.RG16F,i.RG,u),U=_(i,i.R16F,i.RED,u)):(s=_(i,i.RGBA,i.RGBA,u),T=_(i,i.RGBA,i.RGBA,u),U=_(i,i.RGBA,i.RGBA,u)),{gl:i,ext:{formatRGBA:s,formatRG:T,formatR:U,halfFloatTexType:u,supportLinearFiltering:c}}}function _(e,r,i,o){if(!te(e,r,i,o))switch(r){case e.R16F:return _(e,e.RG16F,e.RG,o);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:r,format:i}}function te(e,r,i,o){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,i,o,null);let c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}class re{constructor(r,i){this.vertexShader=r,this.fragmentShaderSource=i,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let i=0;for(let a=0;a<r.length;a++)i+=Be(r[a]);let o=this.programs[i];if(o==null){let a=m(t.FRAGMENT_SHADER,this.fragmentShaderSource,r);o=j(this.vertexShader,a),this.programs[i]=o}o!=this.activeProgram&&(this.uniforms=k(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class E{constructor(r,i){this.uniforms={},this.program=j(r,i),this.uniforms=k(this.program)}bind(){t.useProgram(this.program)}}function j(e,r){let i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(i)),i}function k(e){let r=[],i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){let a=t.getActiveUniform(e,o).name;r[a]=t.getUniformLocation(e,a)}return r}function m(e,r,i){r=ie(r,i);const o=t.createShader(e);return t.shaderSource(o,r),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function ie(e,r){if(r==null)return e;let i="";return r.forEach(o=>{i+="#define "+o+`
`}),i+e}const R=m(t.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
    `),oe=m(t.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
    vUv = aPosition * 0.5 + 0.5;
    float offset = 1.33333333;
    vL = vUv - texelSize * offset;
    vR = vUv + texelSize * offset;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
    `),ae=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
    vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
    sum += texture2D(uTexture, vL) * 0.35294117;
    sum += texture2D(uTexture, vR) * 0.35294117;
    gl_FragColor = sum;
}
    `),ne=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
    gl_FragColor = texture2D(uTexture, vUv);
}
    `),ue=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
}
    `),ce=m(t.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
    gl_FragColor = color;
}
    `),le=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
    color = max(color, vec3(0));
    return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
}

    void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
    vec3 lc = texture2D(uTexture, vL).rgb;
    vec3 rc = texture2D(uTexture, vR).rgb;
    vec3 tc = texture2D(uTexture, vT).rgb;
    vec3 bc = texture2D(uTexture, vB).rgb;

    float dx = length(rc) - length(lc);
    float dy = length(tc) - length(bc);

    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
    vec3 l = vec3(0.0, 0.0, 1.0);

    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
    c *= diffuse;
    #endif

    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
}
    `,fe=m(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}
    `),se=m(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;

    vec2 iuv = floor(st);
    vec2 fuv = fract(st);

    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

    void main () {
    #ifdef MANUAL_FILTERING
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = texture2D(uSource, coord);
    #endif
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
}`,p.supportLinearFiltering?null:["MANUAL_FILTERING"]),ve=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
    `),me=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
    `),de=m(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
    `),he=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
    `),Te=m(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
    `),h=(()=>(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),r&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}))();let d,n,C,z,D;Ee("../app/themes/flipp/dist/images/LDR_LLL1_0.png");new E(oe,ae);const V=new E(R,ne),B=new E(R,ue);new E(R,ce);const S=new E(R,fe),x=new E(R,se),X=new E(R,ve),I=new E(R,me),A=new E(R,de),F=new E(R,he),L=new E(R,Te),w=new re(R,le);function q(){let e=K(f.SIM_RESOLUTION),r=K(f.DYE_RESOLUTION);const i=p.halfFloatTexType,o=p.formatRGBA,a=p.formatRG,c=p.formatR,u=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),d==null?d=N(r.width,r.height,o.internalFormat,o.format,i,u):d=H(d,r.width,r.height,o.internalFormat,o.format,i,u),n==null?n=N(e.width,e.height,a.internalFormat,a.format,i,u):n=H(n,e.width,e.height,a.internalFormat,a.format,i,u),C=y(e.width,e.height,c.internalFormat,c.format,i,t.NEAREST),z=y(e.width,e.height,c.internalFormat,c.format,i,t.NEAREST),D=N(e.width,e.height,c.internalFormat,c.format,i,t.NEAREST)}function y(e,r,i,o,a,c){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,r,0,o,a,null);let s=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let T=1/e,U=1/r;return{texture:u,fbo:s,width:e,height:r,texelSizeX:T,texelSizeY:U,attach(M){return t.activeTexture(t.TEXTURE0+M),t.bindTexture(t.TEXTURE_2D,u),M}}}function N(e,r,i,o,a,c){let u=y(e,r,i,o,a,c),s=y(e,r,i,o,a,c);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(T){u=T},get write(){return s},set write(T){s=T},swap(){let T=u;u=s,s=T}}}function xe(e,r,i,o,a,c,u){let s=y(r,i,o,a,c,u);return V.bind(),t.uniform1i(V.uniforms.uTexture,e.attach(0)),h(s),s}function H(e,r,i,o,a,c,u){return e.width==r&&e.height==i||(e.read=xe(e.read,r,i,o,a,c,u),e.write=y(r,i,o,a,c,u),e.width=r,e.height=i,e.texelSizeX=1/r,e.texelSizeY=1/i),e}function Ee(e){let r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let i={texture:r,width:1,height:1,attach(a){return t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,r),a}},o=new Image;return o.onload=()=>{i.width=o.width,i.height=o.height,t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,t.RGB,t.RGB,t.UNSIGNED_BYTE,o)},o.src=e,i}function Re(){let e=[];f.SHADING&&e.push("SHADING"),w.setKeywords(e)}Re();q();let W=Date.now(),P=0;function O(){const e=ge();J()&&q(),pe(e),Se(),De(e),_e(null),requestAnimationFrame(O)}function ge(){let e=Date.now(),r=(e-W)/1e3;return r=Math.min(r,.016666),W=e,r}function J(){let e=v(l.clientWidth),r=v(l.clientHeight);return l.width!=e||l.height!=r?(l.width=e,l.height=r,!0):!1}function pe(e){P+=e*f.COLOR_UPDATE_SPEED,P>=1&&(P=be(P,0,1),g.forEach(r=>{r.color=b()}))}function Se(){g.forEach(e=>{e.moved&&(e.moved=!1,ye(e))})}function De(e){t.disable(t.BLEND),I.bind(),t.uniform2f(I.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(I.uniforms.uVelocity,n.read.attach(0)),h(z),A.bind(),t.uniform2f(A.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(A.uniforms.uVelocity,n.read.attach(0)),t.uniform1i(A.uniforms.uCurl,z.attach(1)),t.uniform1f(A.uniforms.curl,f.CURL),t.uniform1f(A.uniforms.dt,e),h(n.write),n.swap(),X.bind(),t.uniform2f(X.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(X.uniforms.uVelocity,n.read.attach(0)),h(C),B.bind(),t.uniform1i(B.uniforms.uTexture,D.read.attach(0)),t.uniform1f(B.uniforms.value,f.PRESSURE),h(D.write),D.swap(),F.bind(),t.uniform2f(F.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(F.uniforms.uDivergence,C.attach(0));for(let i=0;i<f.PRESSURE_ITERATIONS;i++)t.uniform1i(F.uniforms.uPressure,D.read.attach(1)),h(D.write),D.swap();L.bind(),t.uniform2f(L.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(L.uniforms.uPressure,D.read.attach(0)),t.uniform1i(L.uniforms.uVelocity,n.read.attach(1)),h(n.write),n.swap(),x.bind(),t.uniform2f(x.uniforms.texelSize,n.texelSizeX,n.texelSizeY),p.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,n.texelSizeX,n.texelSizeY);let r=n.read.attach(0);t.uniform1i(x.uniforms.uVelocity,r),t.uniform1i(x.uniforms.uSource,r),t.uniform1f(x.uniforms.dt,e),t.uniform1f(x.uniforms.dissipation,f.VELOCITY_DISSIPATION),h(n.write),n.swap(),p.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(x.uniforms.uVelocity,n.read.attach(0)),t.uniform1i(x.uniforms.uSource,d.read.attach(1)),t.uniform1f(x.uniforms.dissipation,f.DENSITY_DISSIPATION),h(d.write),d.swap()}function _e(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Ae(e)}function Ae(e){let r=e==null?t.drawingBufferWidth:e.width,i=e==null?t.drawingBufferHeight:e.height;w.bind(),f.SHADING&&t.uniform2f(w.uniforms.texelSize,1/r,1/i),t.uniform1i(w.uniforms.uTexture,d.read.attach(0)),h(e)}function ye(e){let r=e.deltaX*f.SPLAT_FORCE,i=e.deltaY*f.SPLAT_FORCE;Q(e.texcoordX,e.texcoordY,r,i,e.color)}function Ue(e){const r=b();r.r*=10,r.g*=10,r.b*=10;let i=10*(Math.random()-.5),o=30*(Math.random()-.5);Q(e.texcoordX,e.texcoordY,i,o,r)}function Q(e,r,i,o,a){S.bind(),t.uniform1i(S.uniforms.uTarget,n.read.attach(0)),t.uniform1f(S.uniforms.aspectRatio,l.width/l.height),t.uniform2f(S.uniforms.point,e,r),t.uniform3f(S.uniforms.color,i,o,0),t.uniform1f(S.uniforms.radius,Fe(f.SPLAT_RADIUS/100)),h(n.write),n.swap(),t.uniform1i(S.uniforms.uTarget,d.read.attach(0)),t.uniform3f(S.uniforms.color,a.r,a.g,a.b),h(d.write),d.swap()}function Fe(e){let r=l.width/l.height;return r>1&&(e*=r),e}window.addEventListener("mousedown",e=>{let r=g[0],i=v(e.clientX),o=v(e.clientY);G(r,-1,i,o),Ue(r)});$("body").one("mousemove",e=>{let r=g[0],i=v(e.clientX),o=v(e.clientY),a=b();O(),Y(r,i,o,a)});window.addEventListener("mousemove",e=>{let r=g[0],i=v(e.clientX),o=v(e.clientY),a=r.color;Y(r,i,o,a)});$("body").one("touchstart",e=>{const r=e.targetTouches;r[0];let i=g[0];for(let o=0;o<r.length;o++){let a=v(r[o].clientX),c=v(r[o].clientY);O(),G(i,r[o].identifier,a,c)}});window.addEventListener("touchstart",e=>{const r=e.targetTouches;let i=g[0];for(let o=0;o<r.length;o++){let a=v(r[o].clientX),c=v(r[o].clientY);G(i,r[o].identifier,a,c)}});window.addEventListener("touchmove",e=>{const r=e.targetTouches;let i=g[0];for(let o=0;o<r.length;o++){let a=v(r[o].clientX),c=v(r[o].clientY);Y(i,a,c,i.color)}},!1);window.addEventListener("touchend",e=>{const r=e.changedTouches;let i=g[0];for(let o=0;o<r.length;o++)Le(i)});function G(e,r,i,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=i/l.width,e.texcoordY=1-o/l.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=b()}function Y(e,r,i,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/l.width,e.texcoordY=1-i/l.height,e.deltaX=Pe(e.texcoordX-e.prevTexcoordX),e.deltaY=we(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function Le(e){e.down=!1}function Pe(e){let r=l.width/l.height;return r<1&&(e*=r),e}function we(e){let r=l.width/l.height;return r>1&&(e/=r),e}function b(){return Math.random()>.5?{r:.1,g:.1,b:.1}:{r:.1,g:.06,b:.02}}function be(e,r,i){let o=i-r;return o==0?r:(e-r)%o+r}function K(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let i=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:i}:{width:i,height:o}}function v(e){let r=window.devicePixelRatio||1;return Math.floor(e*r)}function Be(e){if(e.length==0)return 0;let r=0;for(let i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r|=0;return r}
