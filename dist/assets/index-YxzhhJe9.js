(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ia="162",ti={ROTATE:0,DOLLY:1,PAN:2},ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vc=0,ba=1,yc=2,Sl=1,Sc=2,un=3,Cn=0,Lt=1,Wt=2,bn=0,Ai=1,Ta=2,Aa=3,wa=4,Mc=5,Hn=100,Ec=101,bc=102,Ca=103,Ra=104,Tc=200,Ac=201,wc=202,Cc=203,Hr=204,Vr=205,Rc=206,Pc=207,Lc=208,Ic=209,Dc=210,Nc=211,Uc=212,Fc=213,Oc=214,zc=0,Bc=1,Gc=2,zs=3,kc=4,Hc=5,Vc=6,Wc=7,Ml=0,Xc=1,Yc=2,Tn=0,$c=1,qc=2,jc=3,Kc=4,Zc=5,Jc=6,Qc=7,El=300,Ri=301,Pi=302,Wr=303,Xr=304,Ys=306,Yr=1e3,Xt=1001,$r=1002,_t=1003,Pa=1004,Oi=1005,Pt=1006,er=1007,Xn=1008,An=1009,eu=1010,tu=1011,sa=1012,bl=1013,En=1014,Zt=1015,Zi=1016,Tl=1017,Al=1018,Yn=1020,nu=1021,Yt=1023,iu=1024,su=1025,$n=1026,Li=1027,wl=1028,Cl=1029,ru=1030,Rl=1031,Pl=1033,tr=33776,nr=33777,ir=33778,sr=33779,La=35840,Ia=35841,Da=35842,Na=35843,Ll=36196,Ua=37492,Fa=37496,Oa=37808,za=37809,Ba=37810,Ga=37811,ka=37812,Ha=37813,Va=37814,Wa=37815,Xa=37816,Ya=37817,$a=37818,qa=37819,ja=37820,Ka=37821,rr=36492,Za=36494,Ja=36495,au=36283,Qa=36284,eo=36285,to=36286,ou=3200,lu=3201,Il=0,cu=1,Mn="",jt="srgb",Rn="srgb-linear",ra="display-p3",$s="display-p3-linear",Bs="linear",et="srgb",Gs="rec709",ks="p3",ii=7680,no=519,uu=512,hu=513,du=514,Dl=515,fu=516,pu=517,mu=518,gu=519,qr=35044,_u=35048,io="300 es",jr=1035,hn=2e3,Hs=2001;class Zn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qi=Math.PI/180,Kr=180/Math.PI;function wn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[s&255]+Et[s>>8&255]+Et[s>>16&255]+Et[s>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function xt(s,e,t){return Math.max(e,Math.min(t,s))}function xu(s,e){return(s%e+e)%e}function ar(s,e,t){return(1-t)*s+t*e}function so(s){return(s&s-1)===0&&s!==0}function Zr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Jt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function qe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const vu={DEG2RAD:qi};class ge{constructor(e=0,t=0){ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,i,r,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],p=n[2],m=n[5],g=n[8],y=i[0],f=i[3],d=i[6],E=i[1],x=i[4],w=i[7],L=i[2],C=i[5],T=i[8];return r[0]=o*y+a*E+l*L,r[3]=o*f+a*x+l*C,r[6]=o*d+a*w+l*T,r[1]=c*y+u*E+h*L,r[4]=c*f+u*x+h*C,r[7]=c*d+u*w+h*T,r[2]=p*y+m*E+g*L,r[5]=p*f+m*x+g*C,r[8]=p*d+m*w+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,p=a*l-u*r,m=c*r-o*l,g=t*h+n*p+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=h*y,e[1]=(i*c-u*n)*y,e[2]=(a*n-i*o)*y,e[3]=p*y,e[4]=(u*t-i*l)*y,e[5]=(i*r-a*t)*y,e[6]=m*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(or.makeScale(e,t)),this}rotate(e){return this.premultiply(or.makeRotation(-e)),this}translate(e,t){return this.premultiply(or.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const or=new ze;function Nl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Vs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function yu(){const s=Vs("canvas");return s.style.display="block",s}const ro={};function Ul(s){s in ro||(ro[s]=!0,console.warn(s))}const ao=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),oo=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),is={[Rn]:{transfer:Bs,primaries:Gs,toReference:s=>s,fromReference:s=>s},[jt]:{transfer:et,primaries:Gs,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[$s]:{transfer:Bs,primaries:ks,toReference:s=>s.applyMatrix3(oo),fromReference:s=>s.applyMatrix3(ao)},[ra]:{transfer:et,primaries:ks,toReference:s=>s.convertSRGBToLinear().applyMatrix3(oo),fromReference:s=>s.applyMatrix3(ao).convertLinearToSRGB()}},Su=new Set([Rn,$s]),je={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Su.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=is[e].toReference,i=is[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return is[s].primaries},getTransfer:function(s){return s===Mn?Bs:is[s].transfer}};function wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function lr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let si;class Fl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{si===void 0&&(si=Vs("canvas")),si.width=e.width,si.height=e.height;const n=si.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=si}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=wi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wi(t[n]/255)*255):t[n]=wi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mu=0;class Ol{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(cr(i[o].image)):r.push(cr(i[o]))}else r=cr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function cr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eu=0;class Rt extends Zn{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Xt,i=Xt,r=Pt,o=Xn,a=Yt,l=An,c=Rt.DEFAULT_ANISOTROPY,u=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=wn(),this.name="",this.source=new Ol(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==El)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yr:e.x=e.x-Math.floor(e.x);break;case Xt:e.x=e.x<0?0:1;break;case $r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yr:e.y=e.y-Math.floor(e.y);break;case Xt:e.y=e.y<0?0:1;break;case $r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=El;Rt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,i=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],p=l[1],m=l[5],g=l[9],y=l[2],f=l[6],d=l[10];if(Math.abs(u-p)<.01&&Math.abs(h-y)<.01&&Math.abs(g-f)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+y)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,w=(m+1)/2,L=(d+1)/2,C=(u+p)/4,T=(h+y)/4,U=(g+f)/4;return x>w&&x>L?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=C/n,r=T/n):w>L?w<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(w),n=C/i,r=U/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=T/r,i=U/r),this.set(n,i,r,t),this}let E=Math.sqrt((f-g)*(f-g)+(h-y)*(h-y)+(p-u)*(p-u));return Math.abs(E)<.001&&(E=1),this.x=(f-g)/E,this.y=(h-y)/E,this.z=(p-u)/E,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bu extends Zn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const r=new Rt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ol(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends bu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class zl extends Rt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_t,this.minFilter=_t,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tu extends Rt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_t,this.minFilter=_t,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const p=r[o+0],m=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=m,e[t+2]=g,e[t+3]=y;return}if(h!==y||l!==p||c!==m||u!==g){let f=1-a;const d=l*p+c*m+u*g+h*y,E=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const L=Math.sqrt(x),C=Math.atan2(L,d*E);f=Math.sin(f*C)/L,a=Math.sin(a*C)/L}const w=a*E;if(l=l*f+p*w,c=c*f+m*w,u=u*f+g*w,h=h*f+y*w,f===1-a){const L=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=L,c*=L,u*=L,h*=L}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],p=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*m-c*p,e[t+1]=l*g+u*p+c*h-a*m,e[t+2]=c*g+u*m+a*p-l*h,e[t+3]=u*g-a*h-l*p-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),p=l(n/2),m=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=p*u*h+c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h-p*m*g;break;case"YXZ":this._x=p*u*h+c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h+p*m*g;break;case"ZXY":this._x=p*u*h-c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h-p*m*g;break;case"ZYX":this._x=p*u*h-c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h+p*m*g;break;case"YZX":this._x=p*u*h+c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h-p*m*g;break;case"XZY":this._x=p*u*h-c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],p=n+a+h;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>h){const m=2*Math.sqrt(1+n-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-n-h);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,p=Math.sin(t*u)/c;return this._w=o*h+this._w*p,this._x=n*h+this._x*p,this._y=i*h+this._y*p,this._z=r*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ur.copy(this).projectOnVector(e),this.sub(ur)}reflect(e){return this.sub(ur.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ur=new R,lo=new jn;class Jn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kt):kt.fromBufferAttribute(r,o),kt.applyMatrix4(e.matrixWorld),this.expandByPoint(kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ss.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ss.copy(n.boundingBox)),ss.applyMatrix4(e.matrixWorld),this.union(ss)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,kt),kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),rs.subVectors(this.max,zi),ri.subVectors(e.a,zi),ai.subVectors(e.b,zi),oi.subVectors(e.c,zi),pn.subVectors(ai,ri),mn.subVectors(oi,ai),Nn.subVectors(ri,oi);let t=[0,-pn.z,pn.y,0,-mn.z,mn.y,0,-Nn.z,Nn.y,pn.z,0,-pn.x,mn.z,0,-mn.x,Nn.z,0,-Nn.x,-pn.y,pn.x,0,-mn.y,mn.x,0,-Nn.y,Nn.x,0];return!hr(t,ri,ai,oi,rs)||(t=[1,0,0,0,1,0,0,0,1],!hr(t,ri,ai,oi,rs))?!1:(as.crossVectors(pn,mn),t=[as.x,as.y,as.z],hr(t,ri,ai,oi,rs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const sn=[new R,new R,new R,new R,new R,new R,new R,new R],kt=new R,ss=new Jn,ri=new R,ai=new R,oi=new R,pn=new R,mn=new R,Nn=new R,zi=new R,rs=new R,as=new R,Un=new R;function hr(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Un.fromArray(s,r);const a=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),l=e.dot(Un),c=t.dot(Un),u=n.dot(Un);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Au=new Jn,Bi=new R,dr=new R;class Qn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Au.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Bi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(dr)),this.expandByPoint(Bi.copy(e.center).sub(dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rn=new R,fr=new R,os=new R,gn=new R,pr=new R,ls=new R,mr=new R;class Qi{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rn.copy(this.origin).addScaledVector(this.direction,t),rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fr.copy(e).add(t).multiplyScalar(.5),os.copy(t).sub(e).normalize(),gn.copy(this.origin).sub(fr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(os),a=gn.dot(this.direction),l=-gn.dot(os),c=gn.lengthSq(),u=Math.abs(1-o*o);let h,p,m,g;if(u>0)if(h=o*l-a,p=o*a-l,g=r*u,h>=0)if(p>=-g)if(p<=g){const y=1/u;h*=y,p*=y,m=h*(h+o*p+2*a)+p*(o*h+p+2*l)+c}else p=r,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;else p=-r,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;else p<=-g?(h=Math.max(0,-(-o*r+a)),p=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+p*(p+2*l)+c):p<=g?(h=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(h=Math.max(0,-(o*r+a)),p=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+p*(p+2*l)+c);else p=o>0?-r:r,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(fr).addScaledVector(os,p),m}intersectSphere(e,t){rn.subVectors(e.center,this.origin);const n=rn.dot(this.direction),i=rn.dot(rn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,i=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,i=(e.min.x-p.x)*c),u>=0?(r=(e.min.y-p.y)*u,o=(e.max.y-p.y)*u):(r=(e.max.y-p.y)*u,o=(e.min.y-p.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,rn)!==null}intersectTriangle(e,t,n,i,r){pr.subVectors(t,e),ls.subVectors(n,e),mr.crossVectors(pr,ls);let o=this.direction.dot(mr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gn.subVectors(this.origin,e);const l=a*this.direction.dot(ls.crossVectors(gn,ls));if(l<0)return null;const c=a*this.direction.dot(pr.cross(gn));if(c<0||l+c>o)return null;const u=-a*gn.dot(mr);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ye{constructor(e,t,n,i,r,o,a,l,c,u,h,p,m,g,y,f){Ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,p,m,g,y,f)}set(e,t,n,i,r,o,a,l,c,u,h,p,m,g,y,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=i,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=p,d[3]=m,d[7]=g,d[11]=y,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ye().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/li.setFromMatrixColumn(e,0).length(),r=1/li.setFromMatrixColumn(e,1).length(),o=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const p=o*u,m=o*h,g=a*u,y=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=p-y*c,t[9]=-a*l,t[2]=y-p*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const p=l*u,m=l*h,g=c*u,y=c*h;t[0]=p+y*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=y+p*a,t[10]=o*l}else if(e.order==="ZXY"){const p=l*u,m=l*h,g=c*u,y=c*h;t[0]=p-y*a,t[4]=-o*h,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=y-p*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const p=o*u,m=o*h,g=a*u,y=a*h;t[0]=l*u,t[4]=g*c-m,t[8]=p*c+y,t[1]=l*h,t[5]=y*c+p,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,m=o*c,g=a*l,y=a*c;t[0]=l*u,t[4]=y-p*h,t[8]=g*h+m,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*h+g,t[10]=p-y*h}else if(e.order==="XZY"){const p=o*l,m=o*c,g=a*l,y=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=p*h+y,t[5]=o*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=a*u,t[10]=y*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wu,e,Cu)}lookAt(e,t,n){const i=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),_n.crossVectors(n,Dt),_n.lengthSq()===0&&(Math.abs(n.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),_n.crossVectors(n,Dt)),_n.normalize(),cs.crossVectors(Dt,_n),i[0]=_n.x,i[4]=cs.x,i[8]=Dt.x,i[1]=_n.y,i[5]=cs.y,i[9]=Dt.y,i[2]=_n.z,i[6]=cs.z,i[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],p=n[9],m=n[13],g=n[2],y=n[6],f=n[10],d=n[14],E=n[3],x=n[7],w=n[11],L=n[15],C=i[0],T=i[4],U=i[8],Y=i[12],v=i[1],A=i[5],K=i[9],Z=i[13],I=i[2],V=i[6],G=i[10],q=i[14],W=i[3],X=i[7],ie=i[11],re=i[15];return r[0]=o*C+a*v+l*I+c*W,r[4]=o*T+a*A+l*V+c*X,r[8]=o*U+a*K+l*G+c*ie,r[12]=o*Y+a*Z+l*q+c*re,r[1]=u*C+h*v+p*I+m*W,r[5]=u*T+h*A+p*V+m*X,r[9]=u*U+h*K+p*G+m*ie,r[13]=u*Y+h*Z+p*q+m*re,r[2]=g*C+y*v+f*I+d*W,r[6]=g*T+y*A+f*V+d*X,r[10]=g*U+y*K+f*G+d*ie,r[14]=g*Y+y*Z+f*q+d*re,r[3]=E*C+x*v+w*I+L*W,r[7]=E*T+x*A+w*V+L*X,r[11]=E*U+x*K+w*G+L*ie,r[15]=E*Y+x*Z+w*q+L*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],p=e[10],m=e[14],g=e[3],y=e[7],f=e[11],d=e[15];return g*(+r*l*h-i*c*h-r*a*p+n*c*p+i*a*m-n*l*m)+y*(+t*l*m-t*c*p+r*o*p-i*o*m+i*c*u-r*l*u)+f*(+t*c*h-t*a*m-r*o*h+n*o*m+r*a*u-n*c*u)+d*(-i*a*u-t*l*h+t*a*p+i*o*h-n*o*p+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],p=e[10],m=e[11],g=e[12],y=e[13],f=e[14],d=e[15],E=h*f*c-y*p*c+y*l*m-a*f*m-h*l*d+a*p*d,x=g*p*c-u*f*c-g*l*m+o*f*m+u*l*d-o*p*d,w=u*y*c-g*h*c+g*a*m-o*y*m-u*a*d+o*h*d,L=g*h*l-u*y*l-g*a*p+o*y*p+u*a*f-o*h*f,C=t*E+n*x+i*w+r*L;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/C;return e[0]=E*T,e[1]=(y*p*r-h*f*r-y*i*m+n*f*m+h*i*d-n*p*d)*T,e[2]=(a*f*r-y*l*r+y*i*c-n*f*c-a*i*d+n*l*d)*T,e[3]=(h*l*r-a*p*r-h*i*c+n*p*c+a*i*m-n*l*m)*T,e[4]=x*T,e[5]=(u*f*r-g*p*r+g*i*m-t*f*m-u*i*d+t*p*d)*T,e[6]=(g*l*r-o*f*r-g*i*c+t*f*c+o*i*d-t*l*d)*T,e[7]=(o*p*r-u*l*r+u*i*c-t*p*c-o*i*m+t*l*m)*T,e[8]=w*T,e[9]=(g*h*r-u*y*r-g*n*m+t*y*m+u*n*d-t*h*d)*T,e[10]=(o*y*r-g*a*r+g*n*c-t*y*c-o*n*d+t*a*d)*T,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*m-t*a*m)*T,e[12]=L*T,e[13]=(u*y*i-g*h*i+g*n*p-t*y*p-u*n*f+t*h*f)*T,e[14]=(g*a*i-o*y*i-g*n*l+t*y*l+o*n*f-t*a*f)*T,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*p+t*a*p)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,p=r*c,m=r*u,g=r*h,y=o*u,f=o*h,d=a*h,E=l*c,x=l*u,w=l*h,L=n.x,C=n.y,T=n.z;return i[0]=(1-(y+d))*L,i[1]=(m+w)*L,i[2]=(g-x)*L,i[3]=0,i[4]=(m-w)*C,i[5]=(1-(p+d))*C,i[6]=(f+E)*C,i[7]=0,i[8]=(g+x)*T,i[9]=(f-E)*T,i[10]=(1-(p+y))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=li.set(i[0],i[1],i[2]).length();const o=li.set(i[4],i[5],i[6]).length(),a=li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ht.copy(this);const c=1/r,u=1/o,h=1/a;return Ht.elements[0]*=c,Ht.elements[1]*=c,Ht.elements[2]*=c,Ht.elements[4]*=u,Ht.elements[5]*=u,Ht.elements[6]*=u,Ht.elements[8]*=h,Ht.elements[9]*=h,Ht.elements[10]*=h,t.setFromRotationMatrix(Ht),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=hn){const l=this.elements,c=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),p=(n+i)/(n-i);let m,g;if(a===hn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Hs)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=hn){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-r),p=(t+e)*c,m=(n+i)*u;let g,y;if(a===hn)g=(o+r)*h,y=-2*h;else if(a===Hs)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const li=new R,Ht=new Ye,wu=new R(0,0,0),Cu=new R(1,1,1),_n=new R,cs=new R,Dt=new R,co=new Ye,uo=new jn;class tn{constructor(e=0,t=0,n=0,i=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],p=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(xt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return co.makeRotationFromQuaternion(e),this.setFromRotationMatrix(co,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uo.setFromEuler(this),this.setFromQuaternion(uo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class aa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ru=0;const ho=new R,ci=new jn,an=new Ye,us=new R,Gi=new R,Pu=new R,Lu=new jn,fo=new R(1,0,0),po=new R(0,1,0),mo=new R(0,0,1),Iu={type:"added"},Du={type:"removed"},gr={type:"childadded",child:null},_r={type:"childremoved",child:null};class ot extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ot.DEFAULT_UP.clone();const e=new R,t=new tn,n=new jn,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ye},normalMatrix:{value:new ze}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(fo,e)}rotateY(e){return this.rotateOnAxis(po,e)}rotateZ(e){return this.rotateOnAxis(mo,e)}translateOnAxis(e,t){return ho.copy(e).applyQuaternion(this.quaternion),this.position.add(ho.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fo,e)}translateY(e){return this.translateOnAxis(po,e)}translateZ(e){return this.translateOnAxis(mo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?us.copy(e):us.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Gi,us,this.up):an.lookAt(us,Gi,this.up),this.quaternion.setFromRotationMatrix(an),i&&(an.extractRotation(i.matrixWorld),ci.setFromRotationMatrix(an),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Iu),gr.child=e,this.dispatchEvent(gr),gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Du),_r.child=e,this.dispatchEvent(_r),_r.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,e,Pu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,Lu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),p=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ot.DEFAULT_UP=new R(0,1,0);ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vt=new R,on=new R,xr=new R,ln=new R,ui=new R,hi=new R,go=new R,vr=new R,yr=new R,Sr=new R;class Gt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Vt.subVectors(e,t),i.cross(Vt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Vt.subVectors(i,t),on.subVectors(n,t),xr.subVectors(e,t);const o=Vt.dot(Vt),a=Vt.dot(on),l=Vt.dot(xr),c=on.dot(on),u=on.dot(xr),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const p=1/h,m=(c*l-a*u)*p,g=(o*u-a*l)*p;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ln.x),l.addScaledVector(o,ln.y),l.addScaledVector(a,ln.z),l)}static isFrontFacing(e,t,n,i){return Vt.subVectors(n,t),on.subVectors(e,t),Vt.cross(on).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Vt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Gt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ui.subVectors(i,n),hi.subVectors(r,n),vr.subVectors(e,n);const l=ui.dot(vr),c=hi.dot(vr);if(l<=0&&c<=0)return t.copy(n);yr.subVectors(e,i);const u=ui.dot(yr),h=hi.dot(yr);if(u>=0&&h<=u)return t.copy(i);const p=l*h-u*c;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(ui,o);Sr.subVectors(e,r);const m=ui.dot(Sr),g=hi.dot(Sr);if(g>=0&&m<=g)return t.copy(r);const y=m*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(hi,a);const f=u*g-m*h;if(f<=0&&h-u>=0&&m-g>=0)return go.subVectors(r,i),a=(h-u)/(h-u+(m-g)),t.copy(i).addScaledVector(go,a);const d=1/(f+y+p);return o=y*d,a=p*d,t.copy(n).addScaledVector(ui,o).addScaledVector(hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xn={h:0,s:0,l:0},hs={h:0,s:0,l:0};function Mr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ve{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=je.workingColorSpace){if(e=xu(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Mr(o,r,e+1/3),this.g=Mr(o,r,e),this.b=Mr(o,r,e-1/3)}return je.toWorkingColorSpace(this,i),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=Bl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}copyLinearToSRGB(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return je.fromWorkingColorSpace(bt.copy(this),e),Math.round(xt(bt.r*255,0,255))*65536+Math.round(xt(bt.g*255,0,255))*256+Math.round(xt(bt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(bt.copy(this),t);const n=bt.r,i=bt.g,r=bt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=jt){je.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,i=bt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(xn),this.setHSL(xn.h+e,xn.s+t,xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xn),e.getHSL(hs);const n=ar(xn.h,hs.h,t),i=ar(xn.s,hs.s,t),r=ar(xn.l,hs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Ve;Ve.NAMES=Bl;let Nu=0;class Pn extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=Ai,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Vr,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=no,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ii,this.stencilZFail=ii,this.stencilZPass=ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==Vr&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==no&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qt extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new R,ds=new ge;class Ot{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qr,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Ul("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ds.fromBufferAttribute(this,t),ds.applyMatrix3(e),this.setXY(t,ds.x,ds.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jt(t,this.array)),t}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jt(t,this.array)),t}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jt(t,this.array)),t}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array),r=qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qr&&(e.usage=this.usage),e}}class Gl extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kl extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Uu=0;const Bt=new Ye,Er=new ot,di=new R,Nt=new Jn,ki=new Jn,gt=new R;class yt extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nl(e)?kl:Gl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,n){return Bt.makeTranslation(e,t,n),this.applyMatrix4(Bt),this}scale(e,t,n){return Bt.makeScale(e,t,n),this.applyMatrix4(Bt),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ki.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Nt.min,ki.min),Nt.expandByPoint(gt),gt.addVectors(Nt.max,ki.max),Nt.expandByPoint(gt)):(Nt.expandByPoint(ki.min),Nt.expandByPoint(ki.max))}Nt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)gt.fromBufferAttribute(a,c),l&&(di.fromBufferAttribute(e,c),gt.add(di)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new R,l[U]=new R;const c=new R,u=new R,h=new R,p=new ge,m=new ge,g=new ge,y=new R,f=new R;function d(U,Y,v){c.fromBufferAttribute(n,U),u.fromBufferAttribute(n,Y),h.fromBufferAttribute(n,v),p.fromBufferAttribute(r,U),m.fromBufferAttribute(r,Y),g.fromBufferAttribute(r,v),u.sub(c),h.sub(c),m.sub(p),g.sub(p);const A=1/(m.x*g.y-g.x*m.y);isFinite(A)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(h,-m.y).multiplyScalar(A),f.copy(h).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(A),a[U].add(y),a[Y].add(y),a[v].add(y),l[U].add(f),l[Y].add(f),l[v].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,Y=E.length;U<Y;++U){const v=E[U],A=v.start,K=v.count;for(let Z=A,I=A+K;Z<I;Z+=3)d(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const x=new R,w=new R,L=new R,C=new R;function T(U){L.fromBufferAttribute(i,U),C.copy(L);const Y=a[U];x.copy(Y),x.sub(L.multiplyScalar(L.dot(Y))).normalize(),w.crossVectors(C,Y);const A=w.dot(l[U])<0?-1:1;o.setXYZW(U,x.x,x.y,x.z,A)}for(let U=0,Y=E.length;U<Y;++U){const v=E[U],A=v.start,K=v.count;for(let Z=A,I=A+K;Z<I;Z+=3)T(e.getX(Z+0)),T(e.getX(Z+1)),T(e.getX(Z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const i=new R,r=new R,o=new R,a=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let p=0,m=e.count;p<m;p+=3){const g=e.getX(p+0),y=e.getX(p+1),f=e.getX(p+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,f),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,f),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,m=t.count;p<m;p+=3)i.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,p=new c.constructor(l.length*u);let m=0,g=0;for(let y=0,f=l.length;y<f;y++){a.isInterleavedBufferAttribute?m=l[y]*a.data.stride+a.offset:m=l[y]*u;for(let d=0;d<u;d++)p[g++]=c[m++]}return new Ot(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const p=c[u],m=e(p,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,p=c.length;h<p;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let p=0,m=h.length;p<m;p++)u.push(h[p].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _o=new Ye,Fn=new Qi,fs=new Qn,xo=new R,fi=new R,pi=new R,mi=new R,br=new R,ps=new R,ms=new ge,gs=new ge,_s=new ge,vo=new R,yo=new R,So=new R,xs=new R,vs=new R;class nt extends ot{constructor(e=new yt,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(br.fromBufferAttribute(h,e),o?ps.addScaledVector(br,u):ps.addScaledVector(br.sub(t),u))}t.add(ps)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fs.copy(n.boundingSphere),fs.applyMatrix4(r),Fn.copy(e.ray).recast(e.near),!(fs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(fs,xo)===null||Fn.origin.distanceToSquared(xo)>(e.far-e.near)**2))&&(_o.copy(r).invert(),Fn.copy(e.ray).applyMatrix4(_o),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=p.length;g<y;g++){const f=p[g],d=o[f.materialIndex],E=Math.max(f.start,m.start),x=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let w=E,L=x;w<L;w+=3){const C=a.getX(w),T=a.getX(w+1),U=a.getX(w+2);i=ys(this,d,e,n,c,u,h,C,T,U),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=f.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),y=Math.min(a.count,m.start+m.count);for(let f=g,d=y;f<d;f+=3){const E=a.getX(f),x=a.getX(f+1),w=a.getX(f+2);i=ys(this,o,e,n,c,u,h,E,x,w),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=p.length;g<y;g++){const f=p[g],d=o[f.materialIndex],E=Math.max(f.start,m.start),x=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let w=E,L=x;w<L;w+=3){const C=w,T=w+1,U=w+2;i=ys(this,d,e,n,c,u,h,C,T,U),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=f.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let f=g,d=y;f<d;f+=3){const E=f,x=f+1,w=f+2;i=ys(this,o,e,n,c,u,h,E,x,w),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}}}}function Fu(s,e,t,n,i,r,o,a){let l;if(e.side===Lt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Cn,a),l===null)return null;vs.copy(a),vs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(vs);return c<t.near||c>t.far?null:{distance:c,point:vs.clone(),object:s}}function ys(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,fi),s.getVertexPosition(l,pi),s.getVertexPosition(c,mi);const u=Fu(s,e,t,n,fi,pi,mi,xs);if(u){i&&(ms.fromBufferAttribute(i,a),gs.fromBufferAttribute(i,l),_s.fromBufferAttribute(i,c),u.uv=Gt.getInterpolation(xs,fi,pi,mi,ms,gs,_s,new ge)),r&&(ms.fromBufferAttribute(r,a),gs.fromBufferAttribute(r,l),_s.fromBufferAttribute(r,c),u.uv1=Gt.getInterpolation(xs,fi,pi,mi,ms,gs,_s,new ge)),o&&(vo.fromBufferAttribute(o,a),yo.fromBufferAttribute(o,l),So.fromBufferAttribute(o,c),u.normal=Gt.getInterpolation(xs,fi,pi,mi,vo,yo,So,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new R,materialIndex:0};Gt.getNormal(fi,pi,mi,h.normal),u.face=h}return u}class ei extends yt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let p=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(h,2));function g(y,f,d,E,x,w,L,C,T,U,Y){const v=w/T,A=L/U,K=w/2,Z=L/2,I=C/2,V=T+1,G=U+1;let q=0,W=0;const X=new R;for(let ie=0;ie<G;ie++){const re=ie*A-Z;for(let de=0;de<V;de++){const Ce=de*v-K;X[y]=Ce*E,X[f]=re*x,X[d]=I,c.push(X.x,X.y,X.z),X[y]=0,X[f]=0,X[d]=C>0?1:-1,u.push(X.x,X.y,X.z),h.push(de/T),h.push(1-ie/U),q+=1}}for(let ie=0;ie<U;ie++)for(let re=0;re<T;re++){const de=p+re+V*ie,Ce=p+re+V*(ie+1),k=p+(re+1)+V*(ie+1),ee=p+(re+1)+V*ie;l.push(de,Ce,ee),l.push(Ce,k,ee),W+=6}a.addGroup(m,W,Y),m+=W,p+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ii(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function wt(s){const e={};for(let t=0;t<s.length;t++){const n=Ii(s[t]);for(const i in n)e[i]=n[i]}return e}function Ou(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Hl(s){return s.getRenderTarget()===null?s.outputColorSpace:je.workingColorSpace}const zu={clone:Ii,merge:wt};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fn extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=Gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=Ou(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Vl extends ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new R,Mo=new ge,Eo=new ge;class Ft extends Vl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Kr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kr*2*Math.atan(Math.tan(qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vn.x,vn.y).multiplyScalar(-e/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vn.x,vn.y).multiplyScalar(-e/vn.z)}getViewSize(e,t){return this.getViewBounds(e,Mo,Eo),t.subVectors(Eo,Mo)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gi=-90,_i=1;class ku extends ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ft(gi,_i,e,t);i.layers=this.layers,this.add(i);const r=new Ft(gi,_i,e,t);r.layers=this.layers,this.add(r);const o=new Ft(gi,_i,e,t);o.layers=this.layers,this.add(o);const a=new Ft(gi,_i,e,t);a.layers=this.layers,this.add(a);const l=new Ft(gi,_i,e,t);l.layers=this.layers,this.add(l);const c=new Ft(gi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,p,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Wl extends Rt{constructor(e,t,n,i,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ri,super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hu extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Wl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ei(5,5,5),r=new fn({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:bn});r.uniforms.tEquirect.value=t;const o=new nt(i,r),a=t.minFilter;return t.minFilter===Xn&&(t.minFilter=Pt),new ku(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const Tr=new R,Vu=new R,Wu=new ze;class yn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Tr.subVectors(n,t).cross(Vu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Tr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Wu.getNormalMatrix(e),i=this.coplanarPoint(Tr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new Qn,Ss=new R;class oa{constructor(e=new yn,t=new yn,n=new yn,i=new yn,r=new yn,o=new yn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],p=i[7],m=i[8],g=i[9],y=i[10],f=i[11],d=i[12],E=i[13],x=i[14],w=i[15];if(n[0].setComponents(l-r,p-c,f-m,w-d).normalize(),n[1].setComponents(l+r,p+c,f+m,w+d).normalize(),n[2].setComponents(l+o,p+u,f+g,w+E).normalize(),n[3].setComponents(l-o,p-u,f-g,w-E).normalize(),n[4].setComponents(l-a,p-h,f-y,w-x).normalize(),t===hn)n[5].setComponents(l+a,p+h,f+y,w+x).normalize();else if(t===Hs)n[5].setComponents(a,h,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ss.x=i.normal.x>0?e.max.x:e.min.x,Ss.y=i.normal.y>0?e.max.y:e.min.y,Ss.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xl(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Xu(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,p=c.usage,m=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,p),c.onUploadCallback();let y;if(h instanceof Float32Array)y=s.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)y=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=s.SHORT;else if(h instanceof Uint32Array)y=s.UNSIGNED_INT;else if(h instanceof Int32Array)y=s.INT;else if(h instanceof Int8Array)y=s.BYTE;else if(h instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,u,h){const p=u.array,m=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,c),m.count===-1&&g.length===0&&s.bufferSubData(h,0,p),g.length!==0){for(let y=0,f=g.length;y<f;y++){const d=g[y];t?s.bufferSubData(h,d.start*p.BYTES_PER_ELEMENT,p,d.start,d.count):s.bufferSubData(h,d.start*p.BYTES_PER_ELEMENT,p.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}m.count!==-1&&(t?s.bufferSubData(h,m.offset*p.BYTES_PER_ELEMENT,p,m.offset,m.count):s.bufferSubData(h,m.offset*p.BYTES_PER_ELEMENT,p.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(s.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const p=n.get(c);(!p||p.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,i(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class qs extends yt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,p=t/l,m=[],g=[],y=[],f=[];for(let d=0;d<u;d++){const E=d*p-o;for(let x=0;x<c;x++){const w=x*h-r;g.push(w,-E,0),y.push(0,0,1),f.push(x/a),f.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<a;E++){const x=E+c*d,w=E+c*(d+1),L=E+1+c*(d+1),C=E+1+c*d;m.push(x,w,C),m.push(w,L,C)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.width,e.height,e.widthSegments,e.heightSegments)}}var Yu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$u=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ju=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ku=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ju=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,eh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,th=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,nh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,rh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ah=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,oh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,mh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,gh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_h=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Eh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,bh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Th=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ah=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ch=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ph=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ih=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Uh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Oh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Jh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Qh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,td=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,id=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ad=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ld=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ud=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,md=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Md=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ed=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Td=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ad=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Rd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ld=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Id=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ud=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Od=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$d=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ef=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,af=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,df=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_f=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ef=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Af=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:Yu,alphahash_pars_fragment:$u,alphamap_fragment:qu,alphamap_pars_fragment:ju,alphatest_fragment:Ku,alphatest_pars_fragment:Zu,aomap_fragment:Ju,aomap_pars_fragment:Qu,batching_pars_vertex:eh,batching_vertex:th,begin_vertex:nh,beginnormal_vertex:ih,bsdfs:sh,iridescence_fragment:rh,bumpmap_pars_fragment:ah,clipping_planes_fragment:oh,clipping_planes_pars_fragment:lh,clipping_planes_pars_vertex:ch,clipping_planes_vertex:uh,color_fragment:hh,color_pars_fragment:dh,color_pars_vertex:fh,color_vertex:ph,common:mh,cube_uv_reflection_fragment:gh,defaultnormal_vertex:_h,displacementmap_pars_vertex:xh,displacementmap_vertex:vh,emissivemap_fragment:yh,emissivemap_pars_fragment:Sh,colorspace_fragment:Mh,colorspace_pars_fragment:Eh,envmap_fragment:bh,envmap_common_pars_fragment:Th,envmap_pars_fragment:Ah,envmap_pars_vertex:wh,envmap_physical_pars_fragment:Bh,envmap_vertex:Ch,fog_vertex:Rh,fog_pars_vertex:Ph,fog_fragment:Lh,fog_pars_fragment:Ih,gradientmap_pars_fragment:Dh,lightmap_fragment:Nh,lightmap_pars_fragment:Uh,lights_lambert_fragment:Fh,lights_lambert_pars_fragment:Oh,lights_pars_begin:zh,lights_toon_fragment:Gh,lights_toon_pars_fragment:kh,lights_phong_fragment:Hh,lights_phong_pars_fragment:Vh,lights_physical_fragment:Wh,lights_physical_pars_fragment:Xh,lights_fragment_begin:Yh,lights_fragment_maps:$h,lights_fragment_end:qh,logdepthbuf_fragment:jh,logdepthbuf_pars_fragment:Kh,logdepthbuf_pars_vertex:Zh,logdepthbuf_vertex:Jh,map_fragment:Qh,map_pars_fragment:ed,map_particle_fragment:td,map_particle_pars_fragment:nd,metalnessmap_fragment:id,metalnessmap_pars_fragment:sd,morphinstance_vertex:rd,morphcolor_vertex:ad,morphnormal_vertex:od,morphtarget_pars_vertex:ld,morphtarget_vertex:cd,normal_fragment_begin:ud,normal_fragment_maps:hd,normal_pars_fragment:dd,normal_pars_vertex:fd,normal_vertex:pd,normalmap_pars_fragment:md,clearcoat_normal_fragment_begin:gd,clearcoat_normal_fragment_maps:_d,clearcoat_pars_fragment:xd,iridescence_pars_fragment:vd,opaque_fragment:yd,packing:Sd,premultiplied_alpha_fragment:Md,project_vertex:Ed,dithering_fragment:bd,dithering_pars_fragment:Td,roughnessmap_fragment:Ad,roughnessmap_pars_fragment:wd,shadowmap_pars_fragment:Cd,shadowmap_pars_vertex:Rd,shadowmap_vertex:Pd,shadowmask_pars_fragment:Ld,skinbase_vertex:Id,skinning_pars_vertex:Dd,skinning_vertex:Nd,skinnormal_vertex:Ud,specularmap_fragment:Fd,specularmap_pars_fragment:Od,tonemapping_fragment:zd,tonemapping_pars_fragment:Bd,transmission_fragment:Gd,transmission_pars_fragment:kd,uv_pars_fragment:Hd,uv_pars_vertex:Vd,uv_vertex:Wd,worldpos_vertex:Xd,background_vert:Yd,background_frag:$d,backgroundCube_vert:qd,backgroundCube_frag:jd,cube_vert:Kd,cube_frag:Zd,depth_vert:Jd,depth_frag:Qd,distanceRGBA_vert:ef,distanceRGBA_frag:tf,equirect_vert:nf,equirect_frag:sf,linedashed_vert:rf,linedashed_frag:af,meshbasic_vert:of,meshbasic_frag:lf,meshlambert_vert:cf,meshlambert_frag:uf,meshmatcap_vert:hf,meshmatcap_frag:df,meshnormal_vert:ff,meshnormal_frag:pf,meshphong_vert:mf,meshphong_frag:gf,meshphysical_vert:_f,meshphysical_frag:xf,meshtoon_vert:vf,meshtoon_frag:yf,points_vert:Sf,points_frag:Mf,shadow_vert:Ef,shadow_frag:bf,sprite_vert:Tf,sprite_frag:Af},oe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Kt={basic:{uniforms:wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:wt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:wt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:wt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:wt([oe.points,oe.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:wt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:wt([oe.common,oe.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:wt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:wt([oe.sprite,oe.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:wt([oe.common,oe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:wt([oe.lights,oe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Kt.physical={uniforms:wt([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Ms={r:0,b:0,g:0},zn=new tn,wf=new Ye;function Cf(s,e,t,n,i,r,o){const a=new Ve(0);let l=r===!0?0:1,c,u,h=null,p=0,m=null;function g(f,d){let E=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?t:e).get(x)),x===null?y(a,l):x&&x.isColor&&(y(x,1),E=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||E)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ys)?(u===void 0&&(u=new nt(new ei(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:Ii(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),zn.copy(d.backgroundRotation),zn.x*=-1,zn.y*=-1,zn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(wf.makeRotationFromEuler(zn)),u.material.toneMapped=je.getTransfer(x.colorSpace)!==et,(h!==x||p!==x.version||m!==s.toneMapping)&&(u.material.needsUpdate=!0,h=x,p=x.version,m=s.toneMapping),u.layers.enableAll(),f.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new nt(new qs(2,2),new fn({name:"BackgroundMaterial",uniforms:Ii(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=je.getTransfer(x.colorSpace)!==et,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||p!==x.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,p=x.version,m=s.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function y(f,d){f.getRGB(Ms,Hl(s)),n.buffers.color.setClear(Ms.r,Ms.g,Ms.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(f,d=1){a.set(f),l=d,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,y(a,l)},render:g}}function Rf(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=f(null);let c=l,u=!1;function h(I,V,G,q,W){let X=!1;if(o){const ie=y(q,G,V);c!==ie&&(c=ie,m(c.object)),X=d(I,q,G,W),X&&E(I,q,G,W)}else{const ie=V.wireframe===!0;(c.geometry!==q.id||c.program!==G.id||c.wireframe!==ie)&&(c.geometry=q.id,c.program=G.id,c.wireframe=ie,X=!0)}W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,U(I,V,G,q),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function p(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function m(I){return n.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function y(I,V,G){const q=G.wireframe===!0;let W=a[I.id];W===void 0&&(W={},a[I.id]=W);let X=W[V.id];X===void 0&&(X={},W[V.id]=X);let ie=X[q];return ie===void 0&&(ie=f(p()),X[q]=ie),ie}function f(I){const V=[],G=[],q=[];for(let W=0;W<i;W++)V[W]=0,G[W]=0,q[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:G,attributeDivisors:q,object:I,attributes:{},index:null}}function d(I,V,G,q){const W=c.attributes,X=V.attributes;let ie=0;const re=G.getAttributes();for(const de in re)if(re[de].location>=0){const k=W[de];let ee=X[de];if(ee===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor)),k===void 0||k.attribute!==ee||ee&&k.data!==ee.data)return!0;ie++}return c.attributesNum!==ie||c.index!==q}function E(I,V,G,q){const W={},X=V.attributes;let ie=0;const re=G.getAttributes();for(const de in re)if(re[de].location>=0){let k=X[de];k===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(k=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(k=I.instanceColor));const ee={};ee.attribute=k,k&&k.data&&(ee.data=k.data),W[de]=ee,ie++}c.attributes=W,c.attributesNum=ie,c.index=q}function x(){const I=c.newAttributes;for(let V=0,G=I.length;V<G;V++)I[V]=0}function w(I){L(I,0)}function L(I,V){const G=c.newAttributes,q=c.enabledAttributes,W=c.attributeDivisors;G[I]=1,q[I]===0&&(s.enableVertexAttribArray(I),q[I]=1),W[I]!==V&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,V),W[I]=V)}function C(){const I=c.newAttributes,V=c.enabledAttributes;for(let G=0,q=V.length;G<q;G++)V[G]!==I[G]&&(s.disableVertexAttribArray(G),V[G]=0)}function T(I,V,G,q,W,X,ie){ie===!0?s.vertexAttribIPointer(I,V,G,W,X):s.vertexAttribPointer(I,V,G,q,W,X)}function U(I,V,G,q){if(n.isWebGL2===!1&&(I.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=q.attributes,X=G.getAttributes(),ie=V.defaultAttributeValues;for(const re in X){const de=X[re];if(de.location>=0){let Ce=W[re];if(Ce===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Ce=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Ce=I.instanceColor)),Ce!==void 0){const k=Ce.normalized,ee=Ce.itemSize,he=t.get(Ce);if(he===void 0)continue;const Ae=he.buffer,ve=he.type,fe=he.bytesPerElement,We=n.isWebGL2===!0&&(ve===s.INT||ve===s.UNSIGNED_INT||Ce.gpuType===bl);if(Ce.isInterleavedBufferAttribute){const Te=Ce.data,N=Te.stride,ht=Ce.offset;if(Te.isInstancedInterleavedBuffer){for(let Se=0;Se<de.locationSize;Se++)L(de.location+Se,Te.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let Se=0;Se<de.locationSize;Se++)w(de.location+Se);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let Se=0;Se<de.locationSize;Se++)T(de.location+Se,ee/de.locationSize,ve,k,N*fe,(ht+ee/de.locationSize*Se)*fe,We)}else{if(Ce.isInstancedBufferAttribute){for(let Te=0;Te<de.locationSize;Te++)L(de.location+Te,Ce.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Ce.meshPerAttribute*Ce.count)}else for(let Te=0;Te<de.locationSize;Te++)w(de.location+Te);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let Te=0;Te<de.locationSize;Te++)T(de.location+Te,ee/de.locationSize,ve,k,ee*fe,ee/de.locationSize*Te*fe,We)}}else if(ie!==void 0){const k=ie[re];if(k!==void 0)switch(k.length){case 2:s.vertexAttrib2fv(de.location,k);break;case 3:s.vertexAttrib3fv(de.location,k);break;case 4:s.vertexAttrib4fv(de.location,k);break;default:s.vertexAttrib1fv(de.location,k)}}}}C()}function Y(){K();for(const I in a){const V=a[I];for(const G in V){const q=V[G];for(const W in q)g(q[W].object),delete q[W];delete V[G]}delete a[I]}}function v(I){if(a[I.id]===void 0)return;const V=a[I.id];for(const G in V){const q=V[G];for(const W in q)g(q[W].object),delete q[W];delete V[G]}delete a[I.id]}function A(I){for(const V in a){const G=a[V];if(G[I.id]===void 0)continue;const q=G[I.id];for(const W in q)g(q[W].object),delete q[W];delete G[I.id]}}function K(){Z(),u=!0,c!==l&&(c=l,m(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:K,resetDefaultState:Z,dispose:Y,releaseStatesOfGeometry:v,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:w,disableUnusedAttributes:C}}function Pf(s,e,t,n){const i=n.isWebGL2;let r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function l(u,h,p){if(p===0)return;let m,g;if(i)m=s,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,u,h,p),t.update(h,r,p)}function c(u,h,p){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<p;g++)this.render(u[g],h[g]);else{m.multiDrawArraysWEBGL(r,u,0,h,0,p);let g=0;for(let y=0;y<p;y++)g+=h[y];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Lf(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),f=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),E=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=p>0,w=o||e.has("OES_texture_float"),L=x&&w,C=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:p,maxTextureSize:m,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:f,maxVaryings:d,maxFragmentUniforms:E,vertexTextures:x,floatFragmentTextures:w,floatVertexTextures:L,maxSamples:C}}function If(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new yn,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const m=h.length!==0||p||n!==0||i;return i=p,n=h.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,m){const g=h.clippingPlanes,y=h.clipIntersection,f=h.clipShadows,d=s.get(h);if(!i||g===null||g.length===0||r&&!f)r?u(null):c();else{const E=r?0:n,x=E*4;let w=d.clippingState||null;l.value=w,w=u(g,p,x,m);for(let L=0;L!==x;++L)w[L]=t[L];d.clippingState=w,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,m,g){const y=h!==null?h.length:0;let f=null;if(y!==0){if(f=l.value,g!==!0||f===null){const d=m+y*4,E=p.matrixWorldInverse;a.getNormalMatrix(E),(f===null||f.length<d)&&(f=new Float32Array(d));for(let x=0,w=m;x!==y;++x,w+=4)o.copy(h[x]).applyMatrix4(E,a),o.normal.toArray(f,w),f[w+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,f}}function Df(s){let e=new WeakMap;function t(o,a){return a===Wr?o.mapping=Ri:a===Xr&&(o.mapping=Pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wr||a===Xr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hu(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Yl extends Vl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bi=4,bo=[.125,.215,.35,.446,.526,.582],Vn=20,Ar=new Yl,To=new Ve;let wr=null,Cr=0,Rr=0;const kn=(1+Math.sqrt(5))/2,xi=1/kn,Ao=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,kn,xi),new R(0,kn,-xi),new R(xi,0,kn),new R(-xi,0,kn),new R(kn,xi,0),new R(-kn,xi,0)];class wo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){wr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Po(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ro(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wr,Cr,Rr),e.scissorTest=!1,Es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Zi,format:Yt,colorSpace:Rn,depthBuffer:!1},i=Co(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Co(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nf(r)),this._blurMaterial=Uf(r,e,t)}return i}_compileMaterial(e){const t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,Ar)}_sceneToCubeUV(e,t,n,i){const a=new Ft(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(To),u.toneMapping=Tn,u.autoClear=!1;const m=new Qt({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),g=new nt(new ei,m);let y=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,y=!0):(m.color.copy(To),y=!0);for(let d=0;d<6;d++){const E=d%3;E===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):E===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const x=this._cubeSize;Es(i,E*x,d>2?x:0,x,x),u.setRenderTarget(i),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=h,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ri||e.mapping===Pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Po()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ro());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new nt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Es(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ar)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ao[(i-1)%Ao.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new nt(this._lodPlanes[i],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Vn-1),y=r/g,f=isFinite(r)?1+Math.floor(u*y):Vn;f>Vn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Vn}`);const d=[];let E=0;for(let T=0;T<Vn;++T){const U=T/y,Y=Math.exp(-U*U/2);d.push(Y),T===0?E+=Y:T<f&&(E+=2*Y)}for(let T=0;T<d.length;T++)d[T]=d[T]/E;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:x}=this;p.dTheta.value=g,p.mipInt.value=x-n;const w=this._sizeLods[i],L=3*w*(i>x-bi?i-x+bi:0),C=4*(this._cubeSize-w);Es(t,L,C,3*w,2*w),l.setRenderTarget(t),l.render(h,Ar)}}function Nf(s){const e=[],t=[],n=[];let i=s;const r=s-bi+1+bo.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-bi?l=bo[o-s+bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,p=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,y=3,f=2,d=1,E=new Float32Array(y*g*m),x=new Float32Array(f*g*m),w=new Float32Array(d*g*m);for(let C=0;C<m;C++){const T=C%3*2/3-1,U=C>2?0:-1,Y=[T,U,0,T+2/3,U,0,T+2/3,U+1,0,T,U,0,T+2/3,U+1,0,T,U+1,0];E.set(Y,y*g*C),x.set(p,f*g*C);const v=[C,C,C,C,C,C];w.set(v,d*g*C)}const L=new yt;L.setAttribute("position",new Ot(E,y)),L.setAttribute("uv",new Ot(x,f)),L.setAttribute("faceIndex",new Ot(w,d)),e.push(L),i>bi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Co(s,e,t){const n=new qn(s,e,t);return n.texture.mapping=Ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Es(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Uf(s,e,t){const n=new Float32Array(Vn),i=new R(0,1,0);return new fn({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ro(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Po(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ff(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wr||l===Xr,u=l===Ri||l===Pi;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new wo(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new wo(s));const p=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,p),a.addEventListener("dispose",r),p.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Of(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function zf(s,e,t,n){const i={},r=new WeakMap;function o(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);for(const g in p.morphAttributes){const y=p.morphAttributes[g];for(let f=0,d=y.length;f<d;f++)e.remove(y[f])}p.removeEventListener("dispose",o),delete i[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return i[p.id]===!0||(p.addEventListener("dispose",o),i[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const g in p)e.update(p[g],s.ARRAY_BUFFER);const m=h.morphAttributes;for(const g in m){const y=m[g];for(let f=0,d=y.length;f<d;f++)e.update(y[f],s.ARRAY_BUFFER)}}function c(h){const p=[],m=h.index,g=h.attributes.position;let y=0;if(m!==null){const E=m.array;y=m.version;for(let x=0,w=E.length;x<w;x+=3){const L=E[x+0],C=E[x+1],T=E[x+2];p.push(L,C,C,T,T,L)}}else if(g!==void 0){const E=g.array;y=g.version;for(let x=0,w=E.length/3-1;x<w;x+=3){const L=x+0,C=x+1,T=x+2;p.push(L,C,C,T,T,L)}}else return;const f=new(Nl(p)?kl:Gl)(p,1);f.version=y;const d=r.get(h);d&&e.remove(d),r.set(h,f)}function u(h){const p=r.get(h);if(p){const m=h.index;m!==null&&p.version<m.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Bf(s,e,t,n){const i=n.isWebGL2;let r;function o(m){r=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function u(m,g){s.drawElements(r,g,a,m*l),t.update(g,r,1)}function h(m,g,y){if(y===0)return;let f,d;if(i)f=s,d="drawElementsInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](r,g,a,m*l,y),t.update(g,r,y)}function p(m,g,y){if(y===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<y;d++)this.render(m[d]/l,g[d]);else{f.multiDrawElementsWEBGL(r,g,0,a,m,0,y);let d=0;for(let E=0;E<y;E++)d+=g[E];t.update(d,r,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=p}function Gf(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function kf(s,e){return s[0]-e[0]}function Hf(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Vf(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=m!==void 0?m.length:0;let y=r.get(u);if(y===void 0||y.count!==g){let K=function(){v.dispose(),r.delete(u),u.removeEventListener("dispose",K)};y!==void 0&&y.texture.dispose();const f=u.morphAttributes.position!==void 0,d=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,x=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],L=u.morphAttributes.color||[];let C=0;f===!0&&(C=1),d===!0&&(C=2),E===!0&&(C=3);let T=u.attributes.position.count*C,U=1;T>e.maxTextureSize&&(U=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const Y=new Float32Array(T*U*4*g),v=new zl(Y,T,U,g);v.type=Zt,v.needsUpdate=!0;const A=C*4;for(let Z=0;Z<g;Z++){const I=x[Z],V=w[Z],G=L[Z],q=T*U*4*Z;for(let W=0;W<I.count;W++){const X=W*A;f===!0&&(o.fromBufferAttribute(I,W),Y[q+X+0]=o.x,Y[q+X+1]=o.y,Y[q+X+2]=o.z,Y[q+X+3]=0),d===!0&&(o.fromBufferAttribute(V,W),Y[q+X+4]=o.x,Y[q+X+5]=o.y,Y[q+X+6]=o.z,Y[q+X+7]=0),E===!0&&(o.fromBufferAttribute(G,W),Y[q+X+8]=o.x,Y[q+X+9]=o.y,Y[q+X+10]=o.z,Y[q+X+11]=G.itemSize===4?o.w:1)}}y={count:g,texture:v,size:new ge(T,U)},r.set(u,y),u.addEventListener("dispose",K)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",c.morphTexture,t);else{let f=0;for(let E=0;E<p.length;E++)f+=p[E];const d=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(s,"morphTargetBaseInfluence",d),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",y.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}else{const m=p===void 0?0:p.length;let g=n[u.id];if(g===void 0||g.length!==m){g=[];for(let x=0;x<m;x++)g[x]=[x,0];n[u.id]=g}for(let x=0;x<m;x++){const w=g[x];w[0]=x,w[1]=p[x]}g.sort(Hf);for(let x=0;x<8;x++)x<m&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(kf);const y=u.morphAttributes.position,f=u.morphAttributes.normal;let d=0;for(let x=0;x<8;x++){const w=a[x],L=w[0],C=w[1];L!==Number.MAX_SAFE_INTEGER&&C?(y&&u.getAttribute("morphTarget"+x)!==y[L]&&u.setAttribute("morphTarget"+x,y[L]),f&&u.getAttribute("morphNormal"+x)!==f[L]&&u.setAttribute("morphNormal"+x,f[L]),i[x]=C,d+=C):(y&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),f&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const E=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(s,"morphTargetBaseInfluence",E),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Wf(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;i.get(p)!==c&&(p.update(),i.set(p,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class $l extends Rt{constructor(e,t,n,i,r,o,a,l,c,u){if(u=u!==void 0?u:$n,u!==$n&&u!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===$n&&(n=En),n===void 0&&u===Li&&(n=Yn),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:_t,this.minFilter=l!==void 0?l:_t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ql=new Rt,jl=new $l(1,1);jl.compareFunction=Dl;const Kl=new zl,Zl=new Tu,Jl=new Wl,Lo=[],Io=[],Do=new Float32Array(16),No=new Float32Array(9),Uo=new Float32Array(4);function Ni(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Lo[i];if(r===void 0&&(r=new Float32Array(i),Lo[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function ft(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function pt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function js(s,e){let t=Io[e];t===void 0&&(t=new Int32Array(e),Io[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Xf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Yf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2fv(this.addr,e),pt(t,e)}}function $f(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;s.uniform3fv(this.addr,e),pt(t,e)}}function qf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4fv(this.addr,e),pt(t,e)}}function jf(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Uo.set(n),s.uniformMatrix2fv(this.addr,!1,Uo),pt(t,n)}}function Kf(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;No.set(n),s.uniformMatrix3fv(this.addr,!1,No),pt(t,n)}}function Zf(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Do.set(n),s.uniformMatrix4fv(this.addr,!1,Do),pt(t,n)}}function Jf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Qf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2iv(this.addr,e),pt(t,e)}}function ep(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3iv(this.addr,e),pt(t,e)}}function tp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4iv(this.addr,e),pt(t,e)}}function np(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function ip(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2uiv(this.addr,e),pt(t,e)}}function sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3uiv(this.addr,e),pt(t,e)}}function rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4uiv(this.addr,e),pt(t,e)}}function ap(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?jl:ql;t.setTexture2D(e||r,i)}function op(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zl,i)}function lp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Jl,i)}function cp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kl,i)}function up(s){switch(s){case 5126:return Xf;case 35664:return Yf;case 35665:return $f;case 35666:return qf;case 35674:return jf;case 35675:return Kf;case 35676:return Zf;case 5124:case 35670:return Jf;case 35667:case 35671:return Qf;case 35668:case 35672:return ep;case 35669:case 35673:return tp;case 5125:return np;case 36294:return ip;case 36295:return sp;case 36296:return rp;case 35678:case 36198:case 36298:case 36306:case 35682:return ap;case 35679:case 36299:case 36307:return op;case 35680:case 36300:case 36308:case 36293:return lp;case 36289:case 36303:case 36311:case 36292:return cp}}function hp(s,e){s.uniform1fv(this.addr,e)}function dp(s,e){const t=Ni(e,this.size,2);s.uniform2fv(this.addr,t)}function fp(s,e){const t=Ni(e,this.size,3);s.uniform3fv(this.addr,t)}function pp(s,e){const t=Ni(e,this.size,4);s.uniform4fv(this.addr,t)}function mp(s,e){const t=Ni(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function gp(s,e){const t=Ni(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function _p(s,e){const t=Ni(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function xp(s,e){s.uniform1iv(this.addr,e)}function vp(s,e){s.uniform2iv(this.addr,e)}function yp(s,e){s.uniform3iv(this.addr,e)}function Sp(s,e){s.uniform4iv(this.addr,e)}function Mp(s,e){s.uniform1uiv(this.addr,e)}function Ep(s,e){s.uniform2uiv(this.addr,e)}function bp(s,e){s.uniform3uiv(this.addr,e)}function Tp(s,e){s.uniform4uiv(this.addr,e)}function Ap(s,e,t){const n=this.cache,i=e.length,r=js(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ql,r[o])}function wp(s,e,t){const n=this.cache,i=e.length,r=js(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Zl,r[o])}function Cp(s,e,t){const n=this.cache,i=e.length,r=js(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Jl,r[o])}function Rp(s,e,t){const n=this.cache,i=e.length,r=js(t,i);ft(n,r)||(s.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Kl,r[o])}function Pp(s){switch(s){case 5126:return hp;case 35664:return dp;case 35665:return fp;case 35666:return pp;case 35674:return mp;case 35675:return gp;case 35676:return _p;case 5124:case 35670:return xp;case 35667:case 35671:return vp;case 35668:case 35672:return yp;case 35669:case 35673:return Sp;case 5125:return Mp;case 36294:return Ep;case 36295:return bp;case 36296:return Tp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ap;case 35679:case 36299:case 36307:return wp;case 35680:case 36300:case 36308:case 36293:return Cp;case 36289:case 36303:case 36311:case 36292:return Rp}}class Lp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=up(t.type)}}class Ip{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pp(t.type)}}class Dp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Pr=/(\w+)(\])?(\[|\.)?/g;function Fo(s,e){s.seq.push(e),s.map[e.id]=e}function Np(s,e,t){const n=s.name,i=n.length;for(Pr.lastIndex=0;;){const r=Pr.exec(n),o=Pr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Fo(t,c===void 0?new Lp(a,s,e):new Ip(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new Dp(a),Fo(t,h)),t=h}}}class Fs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Np(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Oo(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Up=37297;let Fp=0;function Op(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function zp(s){const e=je.getPrimaries(je.workingColorSpace),t=je.getPrimaries(s);let n;switch(e===t?n="":e===ks&&t===Gs?n="LinearDisplayP3ToLinearSRGB":e===Gs&&t===ks&&(n="LinearSRGBToLinearDisplayP3"),s){case Rn:case $s:return[n,"LinearTransferOETF"];case jt:case ra:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function zo(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Op(s.getShaderSource(e),o)}else return i}function Bp(s,e){const t=zp(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Gp(s,e){let t;switch(e){case $c:t="Linear";break;case qc:t="Reinhard";break;case jc:t="OptimizedCineon";break;case Kc:t="ACESFilmic";break;case Jc:t="AgX";break;case Qc:t="Neutral";break;case Zc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function kp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.alphaToCoverage||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ti).join(`
`)}function Hp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ti).join(`
`)}function Vp(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wp(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ti(s){return s!==""}function Bo(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Go(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Xp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jr(s){return s.replace(Xp,$p)}const Yp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $p(s,e){let t=Oe[e];if(t===void 0){const n=Yp.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Jr(t)}const qp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ko(s){return s.replace(qp,jp)}function jp(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ho(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	`;return s.isWebGL2&&(e+=`precision ${s.precision} sampler3D;
		precision ${s.precision} sampler2DArray;
		precision ${s.precision} sampler2DShadow;
		precision ${s.precision} samplerCubeShadow;
		precision ${s.precision} sampler2DArrayShadow;
		precision ${s.precision} isampler2D;
		precision ${s.precision} isampler3D;
		precision ${s.precision} isamplerCube;
		precision ${s.precision} isampler2DArray;
		precision ${s.precision} usampler2D;
		precision ${s.precision} usampler3D;
		precision ${s.precision} usamplerCube;
		precision ${s.precision} usampler2DArray;
		`),s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Kp(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Sl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Sc?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===un&&(e="SHADOWMAP_TYPE_VSM"),e}function Zp(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ri:case Pi:e="ENVMAP_TYPE_CUBE";break;case Ys:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Jp(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Pi:e="ENVMAP_MODE_REFRACTION";break}return e}function Qp(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ml:e="ENVMAP_BLENDING_MULTIPLY";break;case Xc:e="ENVMAP_BLENDING_MIX";break;case Yc:e="ENVMAP_BLENDING_ADD";break}return e}function em(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function tm(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Kp(t),c=Zp(t),u=Jp(t),h=Qp(t),p=em(t),m=t.isWebGL2?"":kp(t),g=Hp(t),y=Vp(r),f=i.createProgram();let d,E,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ti).join(`
`),d.length>0&&(d+=`
`),E=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ti).join(`
`),E.length>0&&(E+=`
`)):(d=[Ho(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ti).join(`
`),E=[m,Ho(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Tn?Gp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Bp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ti).join(`
`)),o=Jr(o),o=Bo(o,t),o=Go(o,t),a=Jr(a),a=Bo(a,t),a=Go(a,t),o=ko(o),a=ko(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===io?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===io?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const w=x+d+o,L=x+E+a,C=Oo(i,i.VERTEX_SHADER,w),T=Oo(i,i.FRAGMENT_SHADER,L);i.attachShader(f,C),i.attachShader(f,T),t.index0AttributeName!==void 0?i.bindAttribLocation(f,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(f,0,"position"),i.linkProgram(f);function U(K){if(s.debug.checkShaderErrors){const Z=i.getProgramInfoLog(f).trim(),I=i.getShaderInfoLog(C).trim(),V=i.getShaderInfoLog(T).trim();let G=!0,q=!0;if(i.getProgramParameter(f,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,f,C,T);else{const W=zo(i,C,"vertex"),X=zo(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(f,i.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+Z+`
`+W+`
`+X)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(I===""||V==="")&&(q=!1);q&&(K.diagnostics={runnable:G,programLog:Z,vertexShader:{log:I,prefix:d},fragmentShader:{log:V,prefix:E}})}i.deleteShader(C),i.deleteShader(T),Y=new Fs(i,f),v=Wp(i,f)}let Y;this.getUniforms=function(){return Y===void 0&&U(this),Y};let v;this.getAttributes=function(){return v===void 0&&U(this),v};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(f,Up)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fp++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=C,this.fragmentShader=T,this}let nm=0;class im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sm(e),t.set(e,n)),n}}class sm{constructor(e){this.id=nm++,this.code=e,this.usedTimes=0}}function rm(s,e,t,n,i,r,o){const a=new aa,l=new im,c=new Set,u=[],h=i.isWebGL2,p=i.logarithmicDepthBuffer,m=i.vertexTextures;let g=i.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(v){return c.add(v),v===0?"uv":`uv${v}`}function d(v,A,K,Z,I){const V=Z.fog,G=I.geometry,q=v.isMeshStandardMaterial?Z.environment:null,W=(v.isMeshStandardMaterial?t:e).get(v.envMap||q),X=W&&W.mapping===Ys?W.image.height:null,ie=y[v.type];v.precision!==null&&(g=i.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const re=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,de=re!==void 0?re.length:0;let Ce=0;G.morphAttributes.position!==void 0&&(Ce=1),G.morphAttributes.normal!==void 0&&(Ce=2),G.morphAttributes.color!==void 0&&(Ce=3);let k,ee,he,Ae;if(ie){const $e=Kt[ie];k=$e.vertexShader,ee=$e.fragmentShader}else k=v.vertexShader,ee=v.fragmentShader,l.update(v),he=l.getVertexShaderID(v),Ae=l.getFragmentShaderID(v);const ve=s.getRenderTarget(),fe=I.isInstancedMesh===!0,We=I.isBatchedMesh===!0,Te=!!v.map,N=!!v.matcap,ht=!!W,Se=!!v.aoMap,Ie=!!v.lightMap,Me=!!v.bumpMap,He=!!v.normalMap,De=!!v.displacementMap,Ue=!!v.emissiveMap,Je=!!v.metalnessMap,M=!!v.roughnessMap,_=v.anisotropy>0,H=v.clearcoat>0,$=v.iridescence>0,te=v.sheen>0,J=v.transmission>0,Re=_&&!!v.anisotropyMap,Ee=H&&!!v.clearcoatMap,ae=H&&!!v.clearcoatNormalMap,le=H&&!!v.clearcoatRoughnessMap,Pe=$&&!!v.iridescenceMap,se=$&&!!v.iridescenceThicknessMap,rt=te&&!!v.sheenColorMap,Be=te&&!!v.sheenRoughnessMap,ye=!!v.specularMap,pe=!!v.specularColorMap,_e=!!v.specularIntensityMap,b=J&&!!v.transmissionMap,j=J&&!!v.thicknessMap,me=!!v.gradientMap,P=!!v.alphaMap,ne=v.alphaTest>0,F=!!v.alphaHash,Q=!!v.extensions;let ce=Tn;v.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(ce=s.toneMapping);const ke={isWebGL2:h,shaderID:ie,shaderType:v.type,shaderName:v.name,vertexShader:k,fragmentShader:ee,defines:v.defines,customVertexShaderID:he,customFragmentShaderID:Ae,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:We,instancing:fe,instancingColor:fe&&I.instanceColor!==null,instancingMorph:fe&&I.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:ve===null?s.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Rn,alphaToCoverage:!!v.alphaToCoverage,map:Te,matcap:N,envMap:ht,envMapMode:ht&&W.mapping,envMapCubeUVHeight:X,aoMap:Se,lightMap:Ie,bumpMap:Me,normalMap:He,displacementMap:m&&De,emissiveMap:Ue,normalMapObjectSpace:He&&v.normalMapType===cu,normalMapTangentSpace:He&&v.normalMapType===Il,metalnessMap:Je,roughnessMap:M,anisotropy:_,anisotropyMap:Re,clearcoat:H,clearcoatMap:Ee,clearcoatNormalMap:ae,clearcoatRoughnessMap:le,iridescence:$,iridescenceMap:Pe,iridescenceThicknessMap:se,sheen:te,sheenColorMap:rt,sheenRoughnessMap:Be,specularMap:ye,specularColorMap:pe,specularIntensityMap:_e,transmission:J,transmissionMap:b,thicknessMap:j,gradientMap:me,opaque:v.transparent===!1&&v.blending===Ai&&v.alphaToCoverage===!1,alphaMap:P,alphaTest:ne,alphaHash:F,combine:v.combine,mapUv:Te&&f(v.map.channel),aoMapUv:Se&&f(v.aoMap.channel),lightMapUv:Ie&&f(v.lightMap.channel),bumpMapUv:Me&&f(v.bumpMap.channel),normalMapUv:He&&f(v.normalMap.channel),displacementMapUv:De&&f(v.displacementMap.channel),emissiveMapUv:Ue&&f(v.emissiveMap.channel),metalnessMapUv:Je&&f(v.metalnessMap.channel),roughnessMapUv:M&&f(v.roughnessMap.channel),anisotropyMapUv:Re&&f(v.anisotropyMap.channel),clearcoatMapUv:Ee&&f(v.clearcoatMap.channel),clearcoatNormalMapUv:ae&&f(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&f(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&f(v.iridescenceMap.channel),iridescenceThicknessMapUv:se&&f(v.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&f(v.sheenColorMap.channel),sheenRoughnessMapUv:Be&&f(v.sheenRoughnessMap.channel),specularMapUv:ye&&f(v.specularMap.channel),specularColorMapUv:pe&&f(v.specularColorMap.channel),specularIntensityMapUv:_e&&f(v.specularIntensityMap.channel),transmissionMapUv:b&&f(v.transmissionMap.channel),thicknessMapUv:j&&f(v.thicknessMap.channel),alphaMapUv:P&&f(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(He||_),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!G.attributes.uv&&(Te||P),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:I.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ce,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&K.length>0,shadowMapType:s.shadowMap.type,toneMapping:ce,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Te&&v.map.isVideoTexture===!0&&je.getTransfer(v.map.colorSpace)===et,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Wt,flipSided:v.side===Lt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:Q&&v.extensions.derivatives===!0,extensionFragDepth:Q&&v.extensions.fragDepth===!0,extensionDrawBuffers:Q&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:Q&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Q&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Q&&v.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function E(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const K in v.defines)A.push(K),A.push(v.defines[K]);return v.isRawShaderMaterial===!1&&(x(A,v),w(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function x(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function w(v,A){a.disableAll(),A.isWebGL2&&a.enable(0),A.supportsVertexTextures&&a.enable(1),A.instancing&&a.enable(2),A.instancingColor&&a.enable(3),A.instancingMorph&&a.enable(4),A.matcap&&a.enable(5),A.envMap&&a.enable(6),A.normalMapObjectSpace&&a.enable(7),A.normalMapTangentSpace&&a.enable(8),A.clearcoat&&a.enable(9),A.iridescence&&a.enable(10),A.alphaTest&&a.enable(11),A.vertexColors&&a.enable(12),A.vertexAlphas&&a.enable(13),A.vertexUv1s&&a.enable(14),A.vertexUv2s&&a.enable(15),A.vertexUv3s&&a.enable(16),A.vertexTangents&&a.enable(17),A.anisotropy&&a.enable(18),A.alphaHash&&a.enable(19),A.batching&&a.enable(20),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.skinning&&a.enable(4),A.morphTargets&&a.enable(5),A.morphNormals&&a.enable(6),A.morphColors&&a.enable(7),A.premultipliedAlpha&&a.enable(8),A.shadowMapEnabled&&a.enable(9),A.useLegacyLights&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.alphaToCoverage&&a.enable(20),v.push(a.mask)}function L(v){const A=y[v.type];let K;if(A){const Z=Kt[A];K=zu.clone(Z.uniforms)}else K=v.uniforms;return K}function C(v,A){let K;for(let Z=0,I=u.length;Z<I;Z++){const V=u[Z];if(V.cacheKey===A){K=V,++K.usedTimes;break}}return K===void 0&&(K=new tm(s,A,v,r),u.push(K)),K}function T(v){if(--v.usedTimes===0){const A=u.indexOf(v);u[A]=u[u.length-1],u.pop(),v.destroy()}}function U(v){l.remove(v)}function Y(){l.dispose()}return{getParameters:d,getProgramCacheKey:E,getUniforms:L,acquireProgram:C,releaseProgram:T,releaseShaderCache:U,programs:u,dispose:Y}}function am(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function om(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Vo(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Wo(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,p,m,g,y,f){let d=s[e];return d===void 0?(d={id:h.id,object:h,geometry:p,material:m,groupOrder:g,renderOrder:h.renderOrder,z:y,group:f},s[e]=d):(d.id=h.id,d.object=h,d.geometry=p,d.material=m,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=y,d.group=f),e++,d}function a(h,p,m,g,y,f){const d=o(h,p,m,g,y,f);m.transmission>0?n.push(d):m.transparent===!0?i.push(d):t.push(d)}function l(h,p,m,g,y,f){const d=o(h,p,m,g,y,f);m.transmission>0?n.unshift(d):m.transparent===!0?i.unshift(d):t.unshift(d)}function c(h,p){t.length>1&&t.sort(h||om),n.length>1&&n.sort(p||Vo),i.length>1&&i.sort(p||Vo)}function u(){for(let h=e,p=s.length;h<p;h++){const m=s[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function lm(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Wo,s.set(n,[o])):i>=r.length?(o=new Wo,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function cm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ve};break;case"SpotLight":t={position:new R,direction:new R,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function um(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let hm=0;function dm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function fm(s,e){const t=new cm,n=um(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new R);const r=new R,o=new Ye,a=new Ye;function l(u,h){let p=0,m=0,g=0;for(let K=0;K<9;K++)i.probe[K].set(0,0,0);let y=0,f=0,d=0,E=0,x=0,w=0,L=0,C=0,T=0,U=0,Y=0;u.sort(dm);const v=h===!0?Math.PI:1;for(let K=0,Z=u.length;K<Z;K++){const I=u[K],V=I.color,G=I.intensity,q=I.distance,W=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)p+=V.r*G*v,m+=V.g*G*v,g+=V.b*G*v;else if(I.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(I.sh.coefficients[X],G);Y++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*v),I.castShadow){const ie=I.shadow,re=n.get(I);re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,i.directionalShadow[y]=re,i.directionalShadowMap[y]=W,i.directionalShadowMatrix[y]=I.shadow.matrix,w++}i.directional[y]=X,y++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(V).multiplyScalar(G*v),X.distance=q,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,i.spot[d]=X;const ie=I.shadow;if(I.map&&(i.spotLightMap[T]=I.map,T++,ie.updateMatrices(I),I.castShadow&&U++),i.spotLightMatrix[d]=ie.matrix,I.castShadow){const re=n.get(I);re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,i.spotShadow[d]=re,i.spotShadowMap[d]=W,C++}d++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(V).multiplyScalar(G),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),i.rectArea[E]=X,E++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*v),X.distance=I.distance,X.decay=I.decay,I.castShadow){const ie=I.shadow,re=n.get(I);re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,re.shadowCameraNear=ie.camera.near,re.shadowCameraFar=ie.camera.far,i.pointShadow[f]=re,i.pointShadowMap[f]=W,i.pointShadowMatrix[f]=I.shadow.matrix,L++}i.point[f]=X,f++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(G*v),X.groundColor.copy(I.groundColor).multiplyScalar(G*v),i.hemi[x]=X,x++}}E>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=p,i.ambient[1]=m,i.ambient[2]=g;const A=i.hash;(A.directionalLength!==y||A.pointLength!==f||A.spotLength!==d||A.rectAreaLength!==E||A.hemiLength!==x||A.numDirectionalShadows!==w||A.numPointShadows!==L||A.numSpotShadows!==C||A.numSpotMaps!==T||A.numLightProbes!==Y)&&(i.directional.length=y,i.spot.length=d,i.rectArea.length=E,i.point.length=f,i.hemi.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=L,i.pointShadowMap.length=L,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=L,i.spotLightMatrix.length=C+T-U,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=Y,A.directionalLength=y,A.pointLength=f,A.spotLength=d,A.rectAreaLength=E,A.hemiLength=x,A.numDirectionalShadows=w,A.numPointShadows=L,A.numSpotShadows=C,A.numSpotMaps=T,A.numLightProbes=Y,i.version=hm++)}function c(u,h){let p=0,m=0,g=0,y=0,f=0;const d=h.matrixWorldInverse;for(let E=0,x=u.length;E<x;E++){const w=u[E];if(w.isDirectionalLight){const L=i.directional[p];L.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),p++}else if(w.isSpotLight){const L=i.spot[g];L.position.setFromMatrixPosition(w.matrixWorld),L.position.applyMatrix4(d),L.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),g++}else if(w.isRectAreaLight){const L=i.rectArea[y];L.position.setFromMatrixPosition(w.matrixWorld),L.position.applyMatrix4(d),a.identity(),o.copy(w.matrixWorld),o.premultiply(d),a.extractRotation(o),L.halfWidth.set(w.width*.5,0,0),L.halfHeight.set(0,w.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),y++}else if(w.isPointLight){const L=i.point[m];L.position.setFromMatrixPosition(w.matrixWorld),L.position.applyMatrix4(d),m++}else if(w.isHemisphereLight){const L=i.hemi[f];L.direction.setFromMatrixPosition(w.matrixWorld),L.direction.transformDirection(d),f++}}}return{setup:l,setupView:c,state:i}}function Xo(s,e){const t=new fm(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function pm(s,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new Xo(s,e),t.set(r,[l])):o>=a.length?(l=new Xo(s,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class mm extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gm extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _m=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vm(s,e,t){let n=new oa;const i=new ge,r=new ge,o=new it,a=new mm({depthPacking:lu}),l=new gm,c={},u=t.maxTextureSize,h={[Cn]:Lt,[Lt]:Cn,[Wt]:Wt},p=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:_m,fragmentShader:xm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new nt(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sl;let d=this.type;this.render=function(C,T,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;const Y=s.getRenderTarget(),v=s.getActiveCubeFace(),A=s.getActiveMipmapLevel(),K=s.state;K.setBlending(bn),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const Z=d!==un&&this.type===un,I=d===un&&this.type!==un;for(let V=0,G=C.length;V<G;V++){const q=C[V],W=q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const X=W.getFrameExtents();if(i.multiply(X),r.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/X.x),i.x=r.x*X.x,W.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/X.y),i.y=r.y*X.y,W.mapSize.y=r.y)),W.map===null||Z===!0||I===!0){const re=this.type!==un?{minFilter:_t,magFilter:_t}:{};W.map!==null&&W.map.dispose(),W.map=new qn(i.x,i.y,re),W.map.texture.name=q.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const ie=W.getViewportCount();for(let re=0;re<ie;re++){const de=W.getViewport(re);o.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),K.viewport(o),W.updateMatrices(q,re),n=W.getFrustum(),w(T,U,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===un&&E(W,U),W.needsUpdate=!1}d=this.type,f.needsUpdate=!1,s.setRenderTarget(Y,v,A)};function E(C,T){const U=e.update(y);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new qn(i.x,i.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(T,null,U,p,y,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(T,null,U,m,y,null)}function x(C,T,U,Y){let v=null;const A=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(A!==void 0)v=A;else if(v=U.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const K=v.uuid,Z=T.uuid;let I=c[K];I===void 0&&(I={},c[K]=I);let V=I[Z];V===void 0&&(V=v.clone(),I[Z]=V,T.addEventListener("dispose",L)),v=V}if(v.visible=T.visible,v.wireframe=T.wireframe,Y===un?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:h[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,U.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const K=s.properties.get(v);K.light=U}return v}function w(C,T,U,Y,v){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===un)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const Z=e.update(C),I=C.material;if(Array.isArray(I)){const V=Z.groups;for(let G=0,q=V.length;G<q;G++){const W=V[G],X=I[W.materialIndex];if(X&&X.visible){const ie=x(C,X,Y,v);C.onBeforeShadow(s,C,T,U,Z,ie,W),s.renderBufferDirect(U,null,Z,ie,C,W),C.onAfterShadow(s,C,T,U,Z,ie,W)}}}else if(I.visible){const V=x(C,I,Y,v);C.onBeforeShadow(s,C,T,U,Z,V,null),s.renderBufferDirect(U,null,Z,V,C,null),C.onAfterShadow(s,C,T,U,Z,V,null)}}const K=C.children;for(let Z=0,I=K.length;Z<I;Z++)w(K[Z],T,U,Y,v)}function L(C){C.target.removeEventListener("dispose",L);for(const U in c){const Y=c[U],v=C.target.uuid;v in Y&&(Y[v].dispose(),delete Y[v])}}}function ym(s,e,t){const n=t.isWebGL2;function i(){let P=!1;const ne=new it;let F=null;const Q=new it(0,0,0,0);return{setMask:function(ce){F!==ce&&!P&&(s.colorMask(ce,ce,ce,ce),F=ce)},setLocked:function(ce){P=ce},setClear:function(ce,ke,$e,Ke,at){at===!0&&(ce*=Ke,ke*=Ke,$e*=Ke),ne.set(ce,ke,$e,Ke),Q.equals(ne)===!1&&(s.clearColor(ce,ke,$e,Ke),Q.copy(ne))},reset:function(){P=!1,F=null,Q.set(-1,0,0,0)}}}function r(){let P=!1,ne=null,F=null,Q=null;return{setTest:function(ce){ce?fe(s.DEPTH_TEST):We(s.DEPTH_TEST)},setMask:function(ce){ne!==ce&&!P&&(s.depthMask(ce),ne=ce)},setFunc:function(ce){if(F!==ce){switch(ce){case zc:s.depthFunc(s.NEVER);break;case Bc:s.depthFunc(s.ALWAYS);break;case Gc:s.depthFunc(s.LESS);break;case zs:s.depthFunc(s.LEQUAL);break;case kc:s.depthFunc(s.EQUAL);break;case Hc:s.depthFunc(s.GEQUAL);break;case Vc:s.depthFunc(s.GREATER);break;case Wc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}F=ce}},setLocked:function(ce){P=ce},setClear:function(ce){Q!==ce&&(s.clearDepth(ce),Q=ce)},reset:function(){P=!1,ne=null,F=null,Q=null}}}function o(){let P=!1,ne=null,F=null,Q=null,ce=null,ke=null,$e=null,Ke=null,at=null;return{setTest:function(Xe){P||(Xe?fe(s.STENCIL_TEST):We(s.STENCIL_TEST))},setMask:function(Xe){ne!==Xe&&!P&&(s.stencilMask(Xe),ne=Xe)},setFunc:function(Xe,Qe,St){(F!==Xe||Q!==Qe||ce!==St)&&(s.stencilFunc(Xe,Qe,St),F=Xe,Q=Qe,ce=St)},setOp:function(Xe,Qe,St){(ke!==Xe||$e!==Qe||Ke!==St)&&(s.stencilOp(Xe,Qe,St),ke=Xe,$e=Qe,Ke=St)},setLocked:function(Xe){P=Xe},setClear:function(Xe){at!==Xe&&(s.clearStencil(Xe),at=Xe)},reset:function(){P=!1,ne=null,F=null,Q=null,ce=null,ke=null,$e=null,Ke=null,at=null}}}const a=new i,l=new r,c=new o,u=new WeakMap,h=new WeakMap;let p={},m={},g=new WeakMap,y=[],f=null,d=!1,E=null,x=null,w=null,L=null,C=null,T=null,U=null,Y=new Ve(0,0,0),v=0,A=!1,K=null,Z=null,I=null,V=null,G=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const ie=s.getParameter(s.VERSION);ie.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(ie)[1]),W=X>=1):ie.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),W=X>=2);let re=null,de={};const Ce=s.getParameter(s.SCISSOR_BOX),k=s.getParameter(s.VIEWPORT),ee=new it().fromArray(Ce),he=new it().fromArray(k);function Ae(P,ne,F,Q){const ce=new Uint8Array(4),ke=s.createTexture();s.bindTexture(P,ke),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let $e=0;$e<F;$e++)n&&(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)?s.texImage3D(ne,0,s.RGBA,1,1,Q,0,s.RGBA,s.UNSIGNED_BYTE,ce):s.texImage2D(ne+$e,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ce);return ke}const ve={};ve[s.TEXTURE_2D]=Ae(s.TEXTURE_2D,s.TEXTURE_2D,1),ve[s.TEXTURE_CUBE_MAP]=Ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ve[s.TEXTURE_2D_ARRAY]=Ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ve[s.TEXTURE_3D]=Ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),fe(s.DEPTH_TEST),l.setFunc(zs),De(!1),Ue(ba),fe(s.CULL_FACE),Me(bn);function fe(P){p[P]!==!0&&(s.enable(P),p[P]=!0)}function We(P){p[P]!==!1&&(s.disable(P),p[P]=!1)}function Te(P,ne){return m[P]!==ne?(s.bindFramebuffer(P,ne),m[P]=ne,n&&(P===s.DRAW_FRAMEBUFFER&&(m[s.FRAMEBUFFER]=ne),P===s.FRAMEBUFFER&&(m[s.DRAW_FRAMEBUFFER]=ne)),!0):!1}function N(P,ne){let F=y,Q=!1;if(P){F=g.get(ne),F===void 0&&(F=[],g.set(ne,F));const ce=P.textures;if(F.length!==ce.length||F[0]!==s.COLOR_ATTACHMENT0){for(let ke=0,$e=ce.length;ke<$e;ke++)F[ke]=s.COLOR_ATTACHMENT0+ke;F.length=ce.length,Q=!0}}else F[0]!==s.BACK&&(F[0]=s.BACK,Q=!0);if(Q)if(t.isWebGL2)s.drawBuffers(F);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(F);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function ht(P){return f!==P?(s.useProgram(P),f=P,!0):!1}const Se={[Hn]:s.FUNC_ADD,[Ec]:s.FUNC_SUBTRACT,[bc]:s.FUNC_REVERSE_SUBTRACT};if(n)Se[Ca]=s.MIN,Se[Ra]=s.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(Se[Ca]=P.MIN_EXT,Se[Ra]=P.MAX_EXT)}const Ie={[Tc]:s.ZERO,[Ac]:s.ONE,[wc]:s.SRC_COLOR,[Hr]:s.SRC_ALPHA,[Dc]:s.SRC_ALPHA_SATURATE,[Lc]:s.DST_COLOR,[Rc]:s.DST_ALPHA,[Cc]:s.ONE_MINUS_SRC_COLOR,[Vr]:s.ONE_MINUS_SRC_ALPHA,[Ic]:s.ONE_MINUS_DST_COLOR,[Pc]:s.ONE_MINUS_DST_ALPHA,[Nc]:s.CONSTANT_COLOR,[Uc]:s.ONE_MINUS_CONSTANT_COLOR,[Fc]:s.CONSTANT_ALPHA,[Oc]:s.ONE_MINUS_CONSTANT_ALPHA};function Me(P,ne,F,Q,ce,ke,$e,Ke,at,Xe){if(P===bn){d===!0&&(We(s.BLEND),d=!1);return}if(d===!1&&(fe(s.BLEND),d=!0),P!==Mc){if(P!==E||Xe!==A){if((x!==Hn||C!==Hn)&&(s.blendEquation(s.FUNC_ADD),x=Hn,C=Hn),Xe)switch(P){case Ai:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ta:s.blendFunc(s.ONE,s.ONE);break;case Aa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wa:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ai:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ta:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Aa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wa:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}w=null,L=null,T=null,U=null,Y.set(0,0,0),v=0,E=P,A=Xe}return}ce=ce||ne,ke=ke||F,$e=$e||Q,(ne!==x||ce!==C)&&(s.blendEquationSeparate(Se[ne],Se[ce]),x=ne,C=ce),(F!==w||Q!==L||ke!==T||$e!==U)&&(s.blendFuncSeparate(Ie[F],Ie[Q],Ie[ke],Ie[$e]),w=F,L=Q,T=ke,U=$e),(Ke.equals(Y)===!1||at!==v)&&(s.blendColor(Ke.r,Ke.g,Ke.b,at),Y.copy(Ke),v=at),E=P,A=!1}function He(P,ne){P.side===Wt?We(s.CULL_FACE):fe(s.CULL_FACE);let F=P.side===Lt;ne&&(F=!F),De(F),P.blending===Ai&&P.transparent===!1?Me(bn):Me(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const Q=P.stencilWrite;c.setTest(Q),Q&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),M(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?fe(s.SAMPLE_ALPHA_TO_COVERAGE):We(s.SAMPLE_ALPHA_TO_COVERAGE)}function De(P){K!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),K=P)}function Ue(P){P!==vc?(fe(s.CULL_FACE),P!==Z&&(P===ba?s.cullFace(s.BACK):P===yc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):We(s.CULL_FACE),Z=P}function Je(P){P!==I&&(W&&s.lineWidth(P),I=P)}function M(P,ne,F){P?(fe(s.POLYGON_OFFSET_FILL),(V!==ne||G!==F)&&(s.polygonOffset(ne,F),V=ne,G=F)):We(s.POLYGON_OFFSET_FILL)}function _(P){P?fe(s.SCISSOR_TEST):We(s.SCISSOR_TEST)}function H(P){P===void 0&&(P=s.TEXTURE0+q-1),re!==P&&(s.activeTexture(P),re=P)}function $(P,ne,F){F===void 0&&(re===null?F=s.TEXTURE0+q-1:F=re);let Q=de[F];Q===void 0&&(Q={type:void 0,texture:void 0},de[F]=Q),(Q.type!==P||Q.texture!==ne)&&(re!==F&&(s.activeTexture(F),re=F),s.bindTexture(P,ne||ve[P]),Q.type=P,Q.texture=ne)}function te(){const P=de[re];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{s.texSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ae(){try{s.texSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Pe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function se(){try{s.texStorage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function rt(){try{s.texStorage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Be(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ye(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(P){ee.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),ee.copy(P))}function _e(P){he.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),he.copy(P))}function b(P,ne){let F=h.get(ne);F===void 0&&(F=new WeakMap,h.set(ne,F));let Q=F.get(P);Q===void 0&&(Q=s.getUniformBlockIndex(ne,P.name),F.set(P,Q))}function j(P,ne){const Q=h.get(ne).get(P);u.get(ne)!==Q&&(s.uniformBlockBinding(ne,Q,P.__bindingPointIndex),u.set(ne,Q))}function me(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),p={},re=null,de={},m={},g=new WeakMap,y=[],f=null,d=!1,E=null,x=null,w=null,L=null,C=null,T=null,U=null,Y=new Ve(0,0,0),v=0,A=!1,K=null,Z=null,I=null,V=null,G=null,ee.set(0,0,s.canvas.width,s.canvas.height),he.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:fe,disable:We,bindFramebuffer:Te,drawBuffers:N,useProgram:ht,setBlending:Me,setMaterial:He,setFlipSided:De,setCullFace:Ue,setLineWidth:Je,setPolygonOffset:M,setScissorTest:_,activeTexture:H,bindTexture:$,unbindTexture:te,compressedTexImage2D:J,compressedTexImage3D:Re,texImage2D:Be,texImage3D:ye,updateUBOMapping:b,uniformBlockBinding:j,texStorage2D:se,texStorage3D:rt,texSubImage2D:Ee,texSubImage3D:ae,compressedTexSubImage2D:le,compressedTexSubImage3D:Pe,scissor:pe,viewport:_e,reset:me}}function Sm(s,e,t,n,i,r,o){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ge,h=new WeakMap;let p;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(M,_){return g?new OffscreenCanvas(M,_):Vs("canvas")}function f(M,_,H,$){let te=1;const J=Je(M);if((J.width>$||J.height>$)&&(te=$/Math.max(J.width,J.height)),te<1||_===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const Re=_?Zr:Math.floor,Ee=Re(te*J.width),ae=Re(te*J.height);p===void 0&&(p=y(Ee,ae));const le=H?y(Ee,ae):p;return le.width=Ee,le.height=ae,le.getContext("2d").drawImage(M,0,0,Ee,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Ee+"x"+ae+")."),le}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),M;return M}function d(M){const _=Je(M);return so(_.width)&&so(_.height)}function E(M){return a?!1:M.wrapS!==Xt||M.wrapT!==Xt||M.minFilter!==_t&&M.minFilter!==Pt}function x(M,_){return M.generateMipmaps&&_&&M.minFilter!==_t&&M.minFilter!==Pt}function w(M){s.generateMipmap(M)}function L(M,_,H,$,te=!1){if(a===!1)return _;if(M!==null){if(s[M]!==void 0)return s[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let J=_;if(_===s.RED&&(H===s.FLOAT&&(J=s.R32F),H===s.HALF_FLOAT&&(J=s.R16F),H===s.UNSIGNED_BYTE&&(J=s.R8)),_===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(J=s.R8UI),H===s.UNSIGNED_SHORT&&(J=s.R16UI),H===s.UNSIGNED_INT&&(J=s.R32UI),H===s.BYTE&&(J=s.R8I),H===s.SHORT&&(J=s.R16I),H===s.INT&&(J=s.R32I)),_===s.RG&&(H===s.FLOAT&&(J=s.RG32F),H===s.HALF_FLOAT&&(J=s.RG16F),H===s.UNSIGNED_BYTE&&(J=s.RG8)),_===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(J=s.RG8UI),H===s.UNSIGNED_SHORT&&(J=s.RG16UI),H===s.UNSIGNED_INT&&(J=s.RG32UI),H===s.BYTE&&(J=s.RG8I),H===s.SHORT&&(J=s.RG16I),H===s.INT&&(J=s.RG32I)),_===s.RGBA){const Re=te?Bs:je.getTransfer($);H===s.FLOAT&&(J=s.RGBA32F),H===s.HALF_FLOAT&&(J=s.RGBA16F),H===s.UNSIGNED_BYTE&&(J=Re===et?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function C(M,_,H){return x(M,H)===!0||M.isFramebufferTexture&&M.minFilter!==_t&&M.minFilter!==Pt?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function T(M){return M===_t||M===Pa||M===Oi?s.NEAREST:s.LINEAR}function U(M){const _=M.target;_.removeEventListener("dispose",U),v(_),_.isVideoTexture&&h.delete(_)}function Y(M){const _=M.target;_.removeEventListener("dispose",Y),K(_)}function v(M){const _=n.get(M);if(_.__webglInit===void 0)return;const H=M.source,$=m.get(H);if($){const te=$[_.__cacheKey];te.usedTimes--,te.usedTimes===0&&A(M),Object.keys($).length===0&&m.delete(H)}n.remove(M)}function A(M){const _=n.get(M);s.deleteTexture(_.__webglTexture);const H=M.source,$=m.get(H);delete $[_.__cacheKey],o.memory.textures--}function K(M){const _=n.get(M);if(M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let te=0;te<_.__webglFramebuffer[$].length;te++)s.deleteFramebuffer(_.__webglFramebuffer[$][te]);else s.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)s.deleteFramebuffer(_.__webglFramebuffer[$]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const H=M.textures;for(let $=0,te=H.length;$<te;$++){const J=n.get(H[$]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(H[$])}n.remove(M)}let Z=0;function I(){Z=0}function V(){const M=Z;return M>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+i.maxTextures),Z+=1,M}function G(M){const _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function q(M,_){const H=n.get(M);if(M.isVideoTexture&&De(M),M.isRenderTargetTexture===!1&&M.version>0&&H.__version!==M.version){const $=M.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(H,M,_);return}}t.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+_)}function W(M,_){const H=n.get(M);if(M.version>0&&H.__version!==M.version){he(H,M,_);return}t.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+_)}function X(M,_){const H=n.get(M);if(M.version>0&&H.__version!==M.version){he(H,M,_);return}t.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+_)}function ie(M,_){const H=n.get(M);if(M.version>0&&H.__version!==M.version){Ae(H,M,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+_)}const re={[Yr]:s.REPEAT,[Xt]:s.CLAMP_TO_EDGE,[$r]:s.MIRRORED_REPEAT},de={[_t]:s.NEAREST,[Pa]:s.NEAREST_MIPMAP_NEAREST,[Oi]:s.NEAREST_MIPMAP_LINEAR,[Pt]:s.LINEAR,[er]:s.LINEAR_MIPMAP_NEAREST,[Xn]:s.LINEAR_MIPMAP_LINEAR},Ce={[uu]:s.NEVER,[gu]:s.ALWAYS,[hu]:s.LESS,[Dl]:s.LEQUAL,[du]:s.EQUAL,[mu]:s.GEQUAL,[fu]:s.GREATER,[pu]:s.NOTEQUAL};function k(M,_,H){if(_.type===Zt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Pt||_.magFilter===er||_.magFilter===Oi||_.magFilter===Xn||_.minFilter===Pt||_.minFilter===er||_.minFilter===Oi||_.minFilter===Xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),H?(s.texParameteri(M,s.TEXTURE_WRAP_S,re[_.wrapS]),s.texParameteri(M,s.TEXTURE_WRAP_T,re[_.wrapT]),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,re[_.wrapR]),s.texParameteri(M,s.TEXTURE_MAG_FILTER,de[_.magFilter]),s.texParameteri(M,s.TEXTURE_MIN_FILTER,de[_.minFilter])):(s.texParameteri(M,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(M,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(_.wrapS!==Xt||_.wrapT!==Xt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(M,s.TEXTURE_MAG_FILTER,T(_.magFilter)),s.texParameteri(M,s.TEXTURE_MIN_FILTER,T(_.minFilter)),_.minFilter!==_t&&_.minFilter!==Pt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(s.texParameteri(M,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(M,s.TEXTURE_COMPARE_FUNC,Ce[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===_t||_.minFilter!==Oi&&_.minFilter!==Xn||_.type===Zt&&e.has("OES_texture_float_linear")===!1||a===!1&&_.type===Zi&&e.has("OES_texture_half_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");s.texParameterf(M,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ee(M,_){let H=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",U));const $=_.source;let te=m.get($);te===void 0&&(te={},m.set($,te));const J=G(_);if(J!==M.__cacheKey){te[J]===void 0&&(te[J]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),te[J].usedTimes++;const Re=te[M.__cacheKey];Re!==void 0&&(te[M.__cacheKey].usedTimes--,Re.usedTimes===0&&A(_)),M.__cacheKey=J,M.__webglTexture=te[J].texture}return H}function he(M,_,H){let $=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=s.TEXTURE_3D);const te=ee(M,_),J=_.source;t.bindTexture($,M.__webglTexture,s.TEXTURE0+H);const Re=n.get(J);if(J.version!==Re.__version||te===!0){t.activeTexture(s.TEXTURE0+H);const Ee=je.getPrimaries(je.workingColorSpace),ae=_.colorSpace===Mn?null:je.getPrimaries(_.colorSpace),le=_.colorSpace===Mn||Ee===ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const Pe=E(_)&&d(_.image)===!1;let se=f(_.image,Pe,!1,i.maxTextureSize);se=Ue(_,se);const rt=d(se)||a,Be=r.convert(_.format,_.colorSpace);let ye=r.convert(_.type),pe=L(_.internalFormat,Be,ye,_.colorSpace,_.isVideoTexture);k($,_,rt);let _e;const b=_.mipmaps,j=a&&_.isVideoTexture!==!0&&pe!==Ll,me=Re.__version===void 0||te===!0,P=J.dataReady,ne=C(_,se,rt);if(_.isDepthTexture)pe=s.DEPTH_COMPONENT,a?_.type===Zt?pe=s.DEPTH_COMPONENT32F:_.type===En?pe=s.DEPTH_COMPONENT24:_.type===Yn?pe=s.DEPTH24_STENCIL8:pe=s.DEPTH_COMPONENT16:_.type===Zt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===$n&&pe===s.DEPTH_COMPONENT&&_.type!==sa&&_.type!==En&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=En,ye=r.convert(_.type)),_.format===Li&&pe===s.DEPTH_COMPONENT&&(pe=s.DEPTH_STENCIL,_.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Yn,ye=r.convert(_.type))),me&&(j?t.texStorage2D(s.TEXTURE_2D,1,pe,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,pe,se.width,se.height,0,Be,ye,null));else if(_.isDataTexture)if(b.length>0&&rt){j&&me&&t.texStorage2D(s.TEXTURE_2D,ne,pe,b[0].width,b[0].height);for(let F=0,Q=b.length;F<Q;F++)_e=b[F],j?P&&t.texSubImage2D(s.TEXTURE_2D,F,0,0,_e.width,_e.height,Be,ye,_e.data):t.texImage2D(s.TEXTURE_2D,F,pe,_e.width,_e.height,0,Be,ye,_e.data);_.generateMipmaps=!1}else j?(me&&t.texStorage2D(s.TEXTURE_2D,ne,pe,se.width,se.height),P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,se.width,se.height,Be,ye,se.data)):t.texImage2D(s.TEXTURE_2D,0,pe,se.width,se.height,0,Be,ye,se.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){j&&me&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,pe,b[0].width,b[0].height,se.depth);for(let F=0,Q=b.length;F<Q;F++)_e=b[F],_.format!==Yt?Be!==null?j?P&&t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,F,0,0,0,_e.width,_e.height,se.depth,Be,_e.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,F,pe,_e.width,_e.height,se.depth,0,_e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?P&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,F,0,0,0,_e.width,_e.height,se.depth,Be,ye,_e.data):t.texImage3D(s.TEXTURE_2D_ARRAY,F,pe,_e.width,_e.height,se.depth,0,Be,ye,_e.data)}else{j&&me&&t.texStorage2D(s.TEXTURE_2D,ne,pe,b[0].width,b[0].height);for(let F=0,Q=b.length;F<Q;F++)_e=b[F],_.format!==Yt?Be!==null?j?P&&t.compressedTexSubImage2D(s.TEXTURE_2D,F,0,0,_e.width,_e.height,Be,_e.data):t.compressedTexImage2D(s.TEXTURE_2D,F,pe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?P&&t.texSubImage2D(s.TEXTURE_2D,F,0,0,_e.width,_e.height,Be,ye,_e.data):t.texImage2D(s.TEXTURE_2D,F,pe,_e.width,_e.height,0,Be,ye,_e.data)}else if(_.isDataArrayTexture)j?(me&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,pe,se.width,se.height,se.depth),P&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Be,ye,se.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,pe,se.width,se.height,se.depth,0,Be,ye,se.data);else if(_.isData3DTexture)j?(me&&t.texStorage3D(s.TEXTURE_3D,ne,pe,se.width,se.height,se.depth),P&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Be,ye,se.data)):t.texImage3D(s.TEXTURE_3D,0,pe,se.width,se.height,se.depth,0,Be,ye,se.data);else if(_.isFramebufferTexture){if(me)if(j)t.texStorage2D(s.TEXTURE_2D,ne,pe,se.width,se.height);else{let F=se.width,Q=se.height;for(let ce=0;ce<ne;ce++)t.texImage2D(s.TEXTURE_2D,ce,pe,F,Q,0,Be,ye,null),F>>=1,Q>>=1}}else if(b.length>0&&rt){if(j&&me){const F=Je(b[0]);t.texStorage2D(s.TEXTURE_2D,ne,pe,F.width,F.height)}for(let F=0,Q=b.length;F<Q;F++)_e=b[F],j?P&&t.texSubImage2D(s.TEXTURE_2D,F,0,0,Be,ye,_e):t.texImage2D(s.TEXTURE_2D,F,pe,Be,ye,_e);_.generateMipmaps=!1}else if(j){if(me){const F=Je(se);t.texStorage2D(s.TEXTURE_2D,ne,pe,F.width,F.height)}P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Be,ye,se)}else t.texImage2D(s.TEXTURE_2D,0,pe,Be,ye,se);x(_,rt)&&w($),Re.__version=J.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Ae(M,_,H){if(_.image.length!==6)return;const $=ee(M,_),te=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,M.__webglTexture,s.TEXTURE0+H);const J=n.get(te);if(te.version!==J.__version||$===!0){t.activeTexture(s.TEXTURE0+H);const Re=je.getPrimaries(je.workingColorSpace),Ee=_.colorSpace===Mn?null:je.getPrimaries(_.colorSpace),ae=_.colorSpace===Mn||Re===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const le=_.isCompressedTexture||_.image[0].isCompressedTexture,Pe=_.image[0]&&_.image[0].isDataTexture,se=[];for(let F=0;F<6;F++)!le&&!Pe?se[F]=f(_.image[F],!1,!0,i.maxCubemapSize):se[F]=Pe?_.image[F].image:_.image[F],se[F]=Ue(_,se[F]);const rt=se[0],Be=d(rt)||a,ye=r.convert(_.format,_.colorSpace),pe=r.convert(_.type),_e=L(_.internalFormat,ye,pe,_.colorSpace),b=a&&_.isVideoTexture!==!0,j=J.__version===void 0||$===!0,me=te.dataReady;let P=C(_,rt,Be);k(s.TEXTURE_CUBE_MAP,_,Be);let ne;if(le){b&&j&&t.texStorage2D(s.TEXTURE_CUBE_MAP,P,_e,rt.width,rt.height);for(let F=0;F<6;F++){ne=se[F].mipmaps;for(let Q=0;Q<ne.length;Q++){const ce=ne[Q];_.format!==Yt?ye!==null?b?me&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q,0,0,ce.width,ce.height,ye,ce.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q,_e,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):b?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q,0,0,ce.width,ce.height,ye,pe,ce.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q,_e,ce.width,ce.height,0,ye,pe,ce.data)}}}else{if(ne=_.mipmaps,b&&j){ne.length>0&&P++;const F=Je(se[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,P,_e,F.width,F.height)}for(let F=0;F<6;F++)if(Pe){b?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,se[F].width,se[F].height,ye,pe,se[F].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,_e,se[F].width,se[F].height,0,ye,pe,se[F].data);for(let Q=0;Q<ne.length;Q++){const ke=ne[Q].image[F].image;b?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q+1,0,0,ke.width,ke.height,ye,pe,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q+1,_e,ke.width,ke.height,0,ye,pe,ke.data)}}else{b?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,ye,pe,se[F]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,_e,ye,pe,se[F]);for(let Q=0;Q<ne.length;Q++){const ce=ne[Q];b?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q+1,0,0,ye,pe,ce.image[F]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+F,Q+1,_e,ye,pe,ce.image[F])}}}x(_,Be)&&w(s.TEXTURE_CUBE_MAP),J.__version=te.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function ve(M,_,H,$,te,J){const Re=r.convert(H.format,H.colorSpace),Ee=r.convert(H.type),ae=L(H.internalFormat,Re,Ee,H.colorSpace);if(!n.get(_).__hasExternalTextures){const Pe=Math.max(1,_.width>>J),se=Math.max(1,_.height>>J);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,J,ae,Pe,se,_.depth,0,Re,Ee,null):t.texImage2D(te,J,ae,Pe,se,0,Re,Ee,null)}t.bindFramebuffer(s.FRAMEBUFFER,M),He(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,te,n.get(H).__webglTexture,0,Me(_)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,te,n.get(H).__webglTexture,J),t.bindFramebuffer(s.FRAMEBUFFER,null)}function fe(M,_,H){if(s.bindRenderbuffer(s.RENDERBUFFER,M),_.depthBuffer&&!_.stencilBuffer){let $=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(H||He(_)){const te=_.depthTexture;te&&te.isDepthTexture&&(te.type===Zt?$=s.DEPTH_COMPONENT32F:te.type===En&&($=s.DEPTH_COMPONENT24));const J=Me(_);He(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,J,$,_.width,_.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,J,$,_.width,_.height)}else s.renderbufferStorage(s.RENDERBUFFER,$,_.width,_.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,M)}else if(_.depthBuffer&&_.stencilBuffer){const $=Me(_);H&&He(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,_.width,_.height):He(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,M)}else{const $=_.textures;for(let te=0;te<$.length;te++){const J=$[te],Re=r.convert(J.format,J.colorSpace),Ee=r.convert(J.type),ae=L(J.internalFormat,Re,Ee,J.colorSpace),le=Me(_);H&&He(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,ae,_.width,_.height):He(_)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,ae,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,ae,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function We(M,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const $=n.get(_.depthTexture).__webglTexture,te=Me(_);if(_.depthTexture.format===$n)He(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(_.depthTexture.format===Li)He(_)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Te(M){const _=n.get(M),H=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!_.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");We(_.__webglFramebuffer,M)}else if(H){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]=s.createRenderbuffer(),fe(_.__webglDepthbuffer[$],M,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=s.createRenderbuffer(),fe(_.__webglDepthbuffer,M,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function N(M,_,H){const $=n.get(M);_!==void 0&&ve($.__webglFramebuffer,M,M.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Te(M)}function ht(M){const _=M.texture,H=n.get(M),$=n.get(_);M.addEventListener("dispose",Y);const te=M.textures,J=M.isWebGLCubeRenderTarget===!0,Re=te.length>1,Ee=d(M)||a;if(Re||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=_.version,o.memory.textures++),J){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer[ae]=[];for(let le=0;le<_.mipmaps.length;le++)H.__webglFramebuffer[ae][le]=s.createFramebuffer()}else H.__webglFramebuffer[ae]=s.createFramebuffer()}else{if(a&&_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)H.__webglFramebuffer[ae]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(Re)if(i.drawBuffers)for(let ae=0,le=te.length;ae<le;ae++){const Pe=n.get(te[ae]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=s.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&M.samples>0&&He(M)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ae=0;ae<te.length;ae++){const le=te[ae];H.__webglColorRenderbuffer[ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);const Pe=r.convert(le.format,le.colorSpace),se=r.convert(le.type),rt=L(le.internalFormat,Pe,se,le.colorSpace,M.isXRRenderTarget===!0),Be=Me(M);s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,rt,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,H.__webglColorRenderbuffer[ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),M.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),fe(H.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),k(s.TEXTURE_CUBE_MAP,_,Ee);for(let ae=0;ae<6;ae++)if(a&&_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)ve(H.__webglFramebuffer[ae][le],M,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,le);else ve(H.__webglFramebuffer[ae],M,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);x(_,Ee)&&w(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ae=0,le=te.length;ae<le;ae++){const Pe=te[ae],se=n.get(Pe);t.bindTexture(s.TEXTURE_2D,se.__webglTexture),k(s.TEXTURE_2D,Pe,Ee),ve(H.__webglFramebuffer,M,Pe,s.COLOR_ATTACHMENT0+ae,s.TEXTURE_2D,0),x(Pe,Ee)&&w(s.TEXTURE_2D)}t.unbindTexture()}else{let ae=s.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(a?ae=M.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,$.__webglTexture),k(ae,_,Ee),a&&_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)ve(H.__webglFramebuffer[le],M,_,s.COLOR_ATTACHMENT0,ae,le);else ve(H.__webglFramebuffer,M,_,s.COLOR_ATTACHMENT0,ae,0);x(_,Ee)&&w(ae),t.unbindTexture()}M.depthBuffer&&Te(M)}function Se(M){const _=d(M)||a,H=M.textures;for(let $=0,te=H.length;$<te;$++){const J=H[$];if(x(J,_)){const Re=M.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ee=n.get(J).__webglTexture;t.bindTexture(Re,Ee),w(Re),t.unbindTexture()}}}function Ie(M){if(a&&M.samples>0&&He(M)===!1){const _=M.textures,H=M.width,$=M.height;let te=s.COLOR_BUFFER_BIT;const J=[],Re=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(M),ae=_.length>1;if(ae)for(let le=0;le<_.length;le++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let le=0;le<_.length;le++){J.push(s.COLOR_ATTACHMENT0+le),M.depthBuffer&&J.push(Re);const Pe=Ee.__ignoreDepthValues!==void 0?Ee.__ignoreDepthValues:!1;if(Pe===!1&&(M.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),M.stencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ae&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[le]),Pe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Re]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Re])),ae){const se=n.get(_[le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,se,0)}s.blitFramebuffer(0,0,H,$,0,0,H,$,te,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ae)for(let le=0;le<_.length;le++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[le]);const Pe=n.get(_[le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,Pe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}}function Me(M){return Math.min(i.maxSamples,M.samples)}function He(M){const _=n.get(M);return a&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function De(M){const _=o.render.frame;h.get(M)!==_&&(h.set(M,_),M.update())}function Ue(M,_){const H=M.colorSpace,$=M.format,te=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===jr||H!==Rn&&H!==Mn&&(je.getTransfer(H)===et?a===!1?e.has("EXT_sRGB")===!0&&$===Yt?(M.format=jr,M.minFilter=Pt,M.generateMipmaps=!1):_=Fl.sRGBToLinear(_):($!==Yt||te!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),_}function Je(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(u.width=M.naturalWidth||M.width,u.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(u.width=M.displayWidth,u.height=M.displayHeight):(u.width=M.width,u.height=M.height),u}this.allocateTextureUnit=V,this.resetTextureUnits=I,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=X,this.setTextureCube=ie,this.rebindTextures=N,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=He}function Mm(s,e,t){const n=t.isWebGL2;function i(r,o=Mn){let a;const l=je.getTransfer(o);if(r===An)return s.UNSIGNED_BYTE;if(r===Tl)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Al)return s.UNSIGNED_SHORT_5_5_5_1;if(r===eu)return s.BYTE;if(r===tu)return s.SHORT;if(r===sa)return s.UNSIGNED_SHORT;if(r===bl)return s.INT;if(r===En)return s.UNSIGNED_INT;if(r===Zt)return s.FLOAT;if(r===Zi)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===nu)return s.ALPHA;if(r===Yt)return s.RGBA;if(r===iu)return s.LUMINANCE;if(r===su)return s.LUMINANCE_ALPHA;if(r===$n)return s.DEPTH_COMPONENT;if(r===Li)return s.DEPTH_STENCIL;if(r===jr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===wl)return s.RED;if(r===Cl)return s.RED_INTEGER;if(r===ru)return s.RG;if(r===Rl)return s.RG_INTEGER;if(r===Pl)return s.RGBA_INTEGER;if(r===tr||r===nr||r===ir||r===sr)if(l===et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===tr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===nr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===tr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===nr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===sr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===La||r===Ia||r===Da||r===Na)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===La)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ia)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Da)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Na)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ll)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ua||r===Fa)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ua)return l===et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Fa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oa||r===za||r===Ba||r===Ga||r===ka||r===Ha||r===Va||r===Wa||r===Xa||r===Ya||r===$a||r===qa||r===ja||r===Ka)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Oa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===za)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ba)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ga)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ka)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ha)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Va)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Wa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Xa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ya)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===$a)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===qa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ja)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ka)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===rr||r===Za||r===Ja)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===rr)return l===et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Za)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ja)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===au||r===Qa||r===eo||r===to)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===rr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Qa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===eo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===to)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yn?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Em extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $t extends ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bm={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const f=t.getJointPose(y,n),d=this._getHandJoint(c,y);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Tm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Am=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class wm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Rt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new fn({extensions:{fragDepth:!0},vertexShader:Tm,fragmentShader:Am,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new nt(new qs(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class Cm extends Zn{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,p=null,m=null,g=null;const y=new wm,f=t.getContextAttributes();let d=null,E=null;const x=[],w=[],L=new ge;let C=null;const T=new Ft;T.layers.enable(1),T.viewport=new it;const U=new Ft;U.layers.enable(2),U.viewport=new it;const Y=[T,U],v=new Em;v.layers.enable(1),v.layers.enable(2);let A=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let ee=x[k];return ee===void 0&&(ee=new Lr,x[k]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(k){let ee=x[k];return ee===void 0&&(ee=new Lr,x[k]=ee),ee.getGripSpace()},this.getHand=function(k){let ee=x[k];return ee===void 0&&(ee=new Lr,x[k]=ee),ee.getHandSpace()};function Z(k){const ee=w.indexOf(k.inputSource);if(ee===-1)return;const he=x[ee];he!==void 0&&(he.update(k.inputSource,k.frame,c||o),he.dispatchEvent({type:k.type,data:k.inputSource}))}function I(){i.removeEventListener("select",Z),i.removeEventListener("selectstart",Z),i.removeEventListener("selectend",Z),i.removeEventListener("squeeze",Z),i.removeEventListener("squeezestart",Z),i.removeEventListener("squeezeend",Z),i.removeEventListener("end",I),i.removeEventListener("inputsourceschange",V);for(let k=0;k<x.length;k++){const ee=w[k];ee!==null&&(w[k]=null,x[k].disconnect(ee))}A=null,K=null,y.reset(),e.setRenderTarget(d),m=null,p=null,h=null,i=null,E=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",I),i.addEventListener("inputsourceschange",V),f.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(L),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:i.renderState.layers===void 0?f.antialias:!0,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new qn(m.framebufferWidth,m.framebufferHeight,{format:Yt,type:An,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let ee=null,he=null,Ae=null;f.depth&&(Ae=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=f.stencil?Li:$n,he=f.stencil?Yn:En);const ve={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};h=new XRWebGLBinding(i,t),p=h.createProjectionLayer(ve),i.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),E=new qn(p.textureWidth,p.textureHeight,{format:Yt,type:An,depthTexture:new $l(p.textureWidth,p.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0});const fe=e.properties.get(E);fe.__ignoreDepthValues=p.ignoreDepthValues}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ce.setContext(i),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function V(k){for(let ee=0;ee<k.removed.length;ee++){const he=k.removed[ee],Ae=w.indexOf(he);Ae>=0&&(w[Ae]=null,x[Ae].disconnect(he))}for(let ee=0;ee<k.added.length;ee++){const he=k.added[ee];let Ae=w.indexOf(he);if(Ae===-1){for(let fe=0;fe<x.length;fe++)if(fe>=w.length){w.push(he),Ae=fe;break}else if(w[fe]===null){w[fe]=he,Ae=fe;break}if(Ae===-1)break}const ve=x[Ae];ve&&ve.connect(he)}}const G=new R,q=new R;function W(k,ee,he){G.setFromMatrixPosition(ee.matrixWorld),q.setFromMatrixPosition(he.matrixWorld);const Ae=G.distanceTo(q),ve=ee.projectionMatrix.elements,fe=he.projectionMatrix.elements,We=ve[14]/(ve[10]-1),Te=ve[14]/(ve[10]+1),N=(ve[9]+1)/ve[5],ht=(ve[9]-1)/ve[5],Se=(ve[8]-1)/ve[0],Ie=(fe[8]+1)/fe[0],Me=We*Se,He=We*Ie,De=Ae/(-Se+Ie),Ue=De*-Se;ee.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ue),k.translateZ(De),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const Je=We+De,M=Te+De,_=Me-Ue,H=He+(Ae-Ue),$=N*Te/M*Je,te=ht*Te/M*Je;k.projectionMatrix.makePerspective(_,H,$,te,Je,M),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function X(k,ee){ee===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(ee.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;y.texture!==null&&(k.near=y.depthNear,k.far=y.depthFar),v.near=U.near=T.near=k.near,v.far=U.far=T.far=k.far,(A!==v.near||K!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),A=v.near,K=v.far,T.near=A,T.far=K,U.near=A,U.far=K,T.updateProjectionMatrix(),U.updateProjectionMatrix(),k.updateProjectionMatrix());const ee=k.parent,he=v.cameras;X(v,ee);for(let Ae=0;Ae<he.length;Ae++)X(he[Ae],ee);he.length===2?W(v,T,U):v.projectionMatrix.copy(T.projectionMatrix),ie(k,v,ee)};function ie(k,ee,he){he===null?k.matrix.copy(ee.matrixWorld):(k.matrix.copy(he.matrixWorld),k.matrix.invert(),k.matrix.multiply(ee.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(ee.projectionMatrix),k.projectionMatrixInverse.copy(ee.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Kr*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(k){l=k,p!==null&&(p.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)},this.hasDepthSensing=function(){return y.texture!==null};let re=null;function de(k,ee){if(u=ee.getViewerPose(c||o),g=ee,u!==null){const he=u.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Ae=!1;he.length!==v.cameras.length&&(v.cameras.length=0,Ae=!0);for(let fe=0;fe<he.length;fe++){const We=he[fe];let Te=null;if(m!==null)Te=m.getViewport(We);else{const ht=h.getViewSubImage(p,We);Te=ht.viewport,fe===0&&(e.setRenderTargetTextures(E,ht.colorTexture,p.ignoreDepthValues?void 0:ht.depthStencilTexture),e.setRenderTarget(E))}let N=Y[fe];N===void 0&&(N=new Ft,N.layers.enable(fe),N.viewport=new it,Y[fe]=N),N.matrix.fromArray(We.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(We.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(Te.x,Te.y,Te.width,Te.height),fe===0&&(v.matrix.copy(N.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Ae===!0&&v.cameras.push(N)}const ve=i.enabledFeatures;if(ve&&ve.includes("depth-sensing")){const fe=h.getDepthInformation(he[0]);fe&&fe.isValid&&fe.texture&&y.init(e,fe,i.renderState)}}for(let he=0;he<x.length;he++){const Ae=w[he],ve=x[he];Ae!==null&&ve!==void 0&&ve.update(Ae,ee,c||o)}y.render(e,v),re&&re(k,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Ce=new Xl;Ce.setAnimationLoop(de),this.setAnimationLoop=function(k){re=k},this.dispose=function(){}}}const Bn=new tn,Rm=new Ye;function Pm(s,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,Hl(s)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function i(f,d,E,x,w){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),h(f,d)):d.isMeshPhongMaterial?(r(f,d),u(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,w)):d.isMeshMatcapMaterial?(r(f,d),g(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),y(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(o(f,d),d.isLineDashedMaterial&&a(f,d)):d.isPointsMaterial?l(f,d,E,x):d.isSpriteMaterial?c(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Lt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Lt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const E=e.get(d),x=E.envMap,w=E.envMapRotation;if(x&&(f.envMap.value=x,Bn.copy(w),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),f.envMapRotation.value.setFromMatrix4(Rm.makeRotationFromEuler(Bn)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap){f.lightMap.value=d.lightMap;const L=s._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=d.lightMapIntensity*L,t(d.lightMap,f.lightMapTransform)}d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function o(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function a(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function l(f,d,E,x){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*E,f.scale.value=x*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function u(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function h(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),e.get(d).envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,E){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Lt&&f.clearcoatNormalScale.value.negate())),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function y(f,d){const E=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Lm(s,e,t,n){let i={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,x){const w=x.program;n.uniformBlockBinding(E,w)}function c(E,x){let w=i[E.id];w===void 0&&(g(E),w=u(E),i[E.id]=w,E.addEventListener("dispose",f));const L=x.program;n.updateUBOMapping(E,L);const C=e.render.frame;r[E.id]!==C&&(p(E),r[E.id]=C)}function u(E){const x=h();E.__bindingPointIndex=x;const w=s.createBuffer(),L=E.__size,C=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,L,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,w),w}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const x=i[E.id],w=E.uniforms,L=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let C=0,T=w.length;C<T;C++){const U=Array.isArray(w[C])?w[C]:[w[C]];for(let Y=0,v=U.length;Y<v;Y++){const A=U[Y];if(m(A,C,Y,L)===!0){const K=A.__offset,Z=Array.isArray(A.value)?A.value:[A.value];let I=0;for(let V=0;V<Z.length;V++){const G=Z[V],q=y(G);typeof G=="number"||typeof G=="boolean"?(A.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,K+I,A.__data)):G.isMatrix3?(A.__data[0]=G.elements[0],A.__data[1]=G.elements[1],A.__data[2]=G.elements[2],A.__data[3]=0,A.__data[4]=G.elements[3],A.__data[5]=G.elements[4],A.__data[6]=G.elements[5],A.__data[7]=0,A.__data[8]=G.elements[6],A.__data[9]=G.elements[7],A.__data[10]=G.elements[8],A.__data[11]=0):(G.toArray(A.__data,I),I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,K,A.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(E,x,w,L){const C=E.value,T=x+"_"+w;if(L[T]===void 0)return typeof C=="number"||typeof C=="boolean"?L[T]=C:L[T]=C.clone(),!0;{const U=L[T];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return L[T]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(E){const x=E.uniforms;let w=0;const L=16;for(let T=0,U=x.length;T<U;T++){const Y=Array.isArray(x[T])?x[T]:[x[T]];for(let v=0,A=Y.length;v<A;v++){const K=Y[v],Z=Array.isArray(K.value)?K.value:[K.value];for(let I=0,V=Z.length;I<V;I++){const G=Z[I],q=y(G),W=w%L;W!==0&&L-W<q.boundary&&(w+=L-W),K.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=w,w+=q.storage}}}const C=w%L;return C>0&&(w+=L-C),E.__size=w,E.__cache={},this}function y(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function f(E){const x=E.target;x.removeEventListener("dispose",f);const w=o.indexOf(x.__bindingPointIndex);o.splice(w,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function d(){for(const E in i)s.deleteBuffer(i[E]);o=[],i={},r={}}return{bind:l,update:c,dispose:d}}class Ql{constructor(e={}){const{canvas:t=yu(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let p;n!==null?p=n.getContextAttributes().alpha:p=o;const m=new Uint32Array(4),g=new Int32Array(4);let y=null,f=null;const d=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this._useLegacyLights=!1,this.toneMapping=Tn,this.toneMappingExposure=1;const x=this;let w=!1,L=0,C=0,T=null,U=-1,Y=null;const v=new it,A=new it;let K=null;const Z=new Ve(0);let I=0,V=t.width,G=t.height,q=1,W=null,X=null;const ie=new it(0,0,V,G),re=new it(0,0,V,G);let de=!1;const Ce=new oa;let k=!1,ee=!1,he=null;const Ae=new Ye,ve=new ge,fe=new R,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Te(){return T===null?q:1}let N=n;function ht(S,D){for(let z=0;z<S.length;z++){const B=S[z],O=t.getContext(B,D);if(O!==null)return O}return null}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ia}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",ne,!1),N===null){const D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),N=ht(D,S),N===null)throw ht(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Se,Ie,Me,He,De,Ue,Je,M,_,H,$,te,J,Re,Ee,ae,le,Pe,se,rt,Be,ye,pe,_e;function b(){Se=new Of(N),Ie=new Lf(N,Se,e),Se.init(Ie),ye=new Mm(N,Se,Ie),Me=new ym(N,Se,Ie),He=new Gf(N),De=new am,Ue=new Sm(N,Se,Me,De,Ie,ye,He),Je=new Df(x),M=new Ff(x),_=new Xu(N,Ie),pe=new Rf(N,Se,_,Ie),H=new zf(N,_,He,pe),$=new Wf(N,H,_,He),se=new Vf(N,Ie,Ue),ae=new If(De),te=new rm(x,Je,M,Se,Ie,pe,ae),J=new Pm(x,De),Re=new lm,Ee=new pm(Se,Ie),Pe=new Cf(x,Je,M,Me,$,p,l),le=new vm(x,$,Ie),_e=new Lm(N,He,Ie,Me),rt=new Pf(N,Se,He,Ie),Be=new Bf(N,Se,He,Ie),He.programs=te.programs,x.capabilities=Ie,x.extensions=Se,x.properties=De,x.renderLists=Re,x.shadowMap=le,x.state=Me,x.info=He}b();const j=new Cm(x,N);this.xr=j,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Se.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Se.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(V,G,!1))},this.getSize=function(S){return S.set(V,G)},this.setSize=function(S,D,z=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=S,G=D,t.width=Math.floor(S*q),t.height=Math.floor(D*q),z===!0&&(t.style.width=S+"px",t.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(V*q,G*q).floor()},this.setDrawingBufferSize=function(S,D,z){V=S,G=D,q=z,t.width=Math.floor(S*z),t.height=Math.floor(D*z),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(v)},this.getViewport=function(S){return S.copy(ie)},this.setViewport=function(S,D,z,B){S.isVector4?ie.set(S.x,S.y,S.z,S.w):ie.set(S,D,z,B),Me.viewport(v.copy(ie).multiplyScalar(q).round())},this.getScissor=function(S){return S.copy(re)},this.setScissor=function(S,D,z,B){S.isVector4?re.set(S.x,S.y,S.z,S.w):re.set(S,D,z,B),Me.scissor(A.copy(re).multiplyScalar(q).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){Me.setScissorTest(de=S)},this.setOpaqueSort=function(S){W=S},this.setTransparentSort=function(S){X=S},this.getClearColor=function(S){return S.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(S=!0,D=!0,z=!0){let B=0;if(S){let O=!1;if(T!==null){const ue=T.texture.format;O=ue===Pl||ue===Rl||ue===Cl}if(O){const ue=T.texture.type,xe=ue===An||ue===En||ue===sa||ue===Yn||ue===Tl||ue===Al,be=Pe.getClearColor(),we=Pe.getClearAlpha(),Ge=be.r,Le=be.g,Ne=be.b;xe?(m[0]=Ge,m[1]=Le,m[2]=Ne,m[3]=we,N.clearBufferuiv(N.COLOR,0,m)):(g[0]=Ge,g[1]=Le,g[2]=Ne,g[3]=we,N.clearBufferiv(N.COLOR,0,g))}else B|=N.COLOR_BUFFER_BIT}D&&(B|=N.DEPTH_BUFFER_BIT),z&&(B|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),Re.dispose(),Ee.dispose(),De.dispose(),Je.dispose(),M.dispose(),$.dispose(),pe.dispose(),_e.dispose(),te.dispose(),j.dispose(),j.removeEventListener("sessionstart",at),j.removeEventListener("sessionend",Xe),he&&(he.dispose(),he=null),Qe.stop()};function me(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const S=He.autoReset,D=le.enabled,z=le.autoUpdate,B=le.needsUpdate,O=le.type;b(),He.autoReset=S,le.enabled=D,le.autoUpdate=z,le.needsUpdate=B,le.type=O}function ne(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function F(S){const D=S.target;D.removeEventListener("dispose",F),Q(D)}function Q(S){ce(S),De.remove(S)}function ce(S){const D=De.get(S).programs;D!==void 0&&(D.forEach(function(z){te.releaseProgram(z)}),S.isShaderMaterial&&te.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,z,B,O,ue){D===null&&(D=We);const xe=O.isMesh&&O.matrixWorld.determinant()<0,be=mc(S,D,z,B,O);Me.setMaterial(B,xe);let we=z.index,Ge=1;if(B.wireframe===!0){if(we=H.getWireframeAttribute(z),we===void 0)return;Ge=2}const Le=z.drawRange,Ne=z.attributes.position;let lt=Le.start*Ge,It=(Le.start+Le.count)*Ge;ue!==null&&(lt=Math.max(lt,ue.start*Ge),It=Math.min(It,(ue.start+ue.count)*Ge)),we!==null?(lt=Math.max(lt,0),It=Math.min(It,we.count)):Ne!=null&&(lt=Math.max(lt,0),It=Math.min(It,Ne.count));const mt=It-lt;if(mt<0||mt===1/0)return;pe.setup(O,B,be,z,we);let nn,st=rt;if(we!==null&&(nn=_.get(we),st=Be,st.setIndex(nn)),O.isMesh)B.wireframe===!0?(Me.setLineWidth(B.wireframeLinewidth*Te()),st.setMode(N.LINES)):st.setMode(N.TRIANGLES);else if(O.isLine){let Fe=B.linewidth;Fe===void 0&&(Fe=1),Me.setLineWidth(Fe*Te()),O.isLineSegments?st.setMode(N.LINES):O.isLineLoop?st.setMode(N.LINE_LOOP):st.setMode(N.LINE_STRIP)}else O.isPoints?st.setMode(N.POINTS):O.isSprite&&st.setMode(N.TRIANGLES);if(O.isBatchedMesh)st.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)st.renderInstances(lt,mt,O.count);else if(z.isInstancedBufferGeometry){const Fe=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ks=Math.min(z.instanceCount,Fe);st.renderInstances(lt,mt,Ks)}else st.render(lt,mt)};function ke(S,D,z){S.transparent===!0&&S.side===Wt&&S.forceSinglePass===!1?(S.side=Lt,S.needsUpdate=!0,ns(S,D,z),S.side=Cn,S.needsUpdate=!0,ns(S,D,z),S.side=Wt):ns(S,D,z)}this.compile=function(S,D,z=null){z===null&&(z=S),f=Ee.get(z),f.init(),E.push(f),z.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),S!==z&&S.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights(x._useLegacyLights);const B=new Set;return S.traverse(function(O){const ue=O.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){const be=ue[xe];ke(be,z,O),B.add(be)}else ke(ue,z,O),B.add(ue)}),E.pop(),f=null,B},this.compileAsync=function(S,D,z=null){const B=this.compile(S,D,z);return new Promise(O=>{function ue(){if(B.forEach(function(xe){De.get(xe).currentProgram.isReady()&&B.delete(xe)}),B.size===0){O(S);return}setTimeout(ue,10)}Se.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let $e=null;function Ke(S){$e&&$e(S)}function at(){Qe.stop()}function Xe(){Qe.start()}const Qe=new Xl;Qe.setAnimationLoop(Ke),typeof self<"u"&&Qe.setContext(self),this.setAnimationLoop=function(S){$e=S,j.setAnimationLoop(S),S===null?Qe.stop():Qe.start()},j.addEventListener("sessionstart",at),j.addEventListener("sessionend",Xe),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(D),D=j.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,D,T),f=Ee.get(S,E.length),f.init(),E.push(f),Ae.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ce.setFromProjectionMatrix(Ae),ee=this.localClippingEnabled,k=ae.init(this.clippingPlanes,ee),y=Re.get(S,d.length),y.init(),d.push(y),St(S,D,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(W,X),this.info.render.frame++,k===!0&&ae.beginShadows();const z=f.state.shadowsArray;if(le.render(z,S,D),k===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1)&&Pe.render(y,S),f.setupLights(x._useLegacyLights),D.isArrayCamera){const B=D.cameras;for(let O=0,ue=B.length;O<ue;O++){const xe=B[O];Ln(y,S,xe,xe.viewport)}}else Ln(y,S,D);T!==null&&(Ue.updateMultisampleRenderTarget(T),Ue.updateRenderTargetMipmap(T)),S.isScene===!0&&S.onAfterRender(x,S,D),pe.resetDefaultState(),U=-1,Y=null,E.pop(),E.length>0?f=E[E.length-1]:f=null,d.pop(),d.length>0?y=d[d.length-1]:y=null};function St(S,D,z,B){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ce.intersectsSprite(S)){B&&fe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ae);const xe=$.update(S),be=S.material;be.visible&&y.push(S,xe,be,z,fe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ce.intersectsObject(S))){const xe=$.update(S),be=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),fe.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),fe.copy(xe.boundingSphere.center)),fe.applyMatrix4(S.matrixWorld).applyMatrix4(Ae)),Array.isArray(be)){const we=xe.groups;for(let Ge=0,Le=we.length;Ge<Le;Ge++){const Ne=we[Ge],lt=be[Ne.materialIndex];lt&&lt.visible&&y.push(S,xe,lt,z,fe.z,Ne)}}else be.visible&&y.push(S,xe,be,z,fe.z,null)}}const ue=S.children;for(let xe=0,be=ue.length;xe<be;xe++)St(ue[xe],D,z,B)}function Ln(S,D,z,B){const O=S.opaque,ue=S.transmissive,xe=S.transparent;f.setupLightsView(z),k===!0&&ae.setGlobalState(x.clippingPlanes,z),ue.length>0&&es(O,ue,D,z),B&&Me.viewport(v.copy(B)),O.length>0&&ts(O,D,z),ue.length>0&&ts(ue,D,z),xe.length>0&&ts(xe,D,z),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function es(S,D,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;const ue=Ie.isWebGL2;he===null&&(he=new qn(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?Zi:An,minFilter:Xn,samples:ue?4:0})),x.getDrawingBufferSize(ve),ue?he.setSize(ve.x,ve.y):he.setSize(Zr(ve.x),Zr(ve.y));const xe=x.getRenderTarget();x.setRenderTarget(he),x.getClearColor(Z),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();const be=x.toneMapping;x.toneMapping=Tn,ts(S,z,B),Ue.updateMultisampleRenderTarget(he),Ue.updateRenderTargetMipmap(he);let we=!1;for(let Ge=0,Le=D.length;Ge<Le;Ge++){const Ne=D[Ge],lt=Ne.object,It=Ne.geometry,mt=Ne.material,nn=Ne.group;if(mt.side===Wt&&lt.layers.test(B.layers)){const st=mt.side;mt.side=Lt,mt.needsUpdate=!0,va(lt,z,B,It,mt,nn),mt.side=st,mt.needsUpdate=!0,we=!0}}we===!0&&(Ue.updateMultisampleRenderTarget(he),Ue.updateRenderTargetMipmap(he)),x.setRenderTarget(xe),x.setClearColor(Z,I),x.toneMapping=be}function ts(S,D,z){const B=D.isScene===!0?D.overrideMaterial:null;for(let O=0,ue=S.length;O<ue;O++){const xe=S[O],be=xe.object,we=xe.geometry,Ge=B===null?xe.material:B,Le=xe.group;be.layers.test(z.layers)&&va(be,D,z,we,Ge,Le)}}function va(S,D,z,B,O,ue){S.onBeforeRender(x,D,z,B,O,ue),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(x,D,z,B,S,ue),O.transparent===!0&&O.side===Wt&&O.forceSinglePass===!1?(O.side=Lt,O.needsUpdate=!0,x.renderBufferDirect(z,D,B,O,S,ue),O.side=Cn,O.needsUpdate=!0,x.renderBufferDirect(z,D,B,O,S,ue),O.side=Wt):x.renderBufferDirect(z,D,B,O,S,ue),S.onAfterRender(x,D,z,B,O,ue)}function ns(S,D,z){D.isScene!==!0&&(D=We);const B=De.get(S),O=f.state.lights,ue=f.state.shadowsArray,xe=O.state.version,be=te.getParameters(S,O.state,ue,D,z),we=te.getProgramCacheKey(be);let Ge=B.programs;B.environment=S.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(S.isMeshStandardMaterial?M:Je).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Ge===void 0&&(S.addEventListener("dispose",F),Ge=new Map,B.programs=Ge);let Le=Ge.get(we);if(Le!==void 0){if(B.currentProgram===Le&&B.lightsStateVersion===xe)return Sa(S,be),Le}else be.uniforms=te.getUniforms(S),S.onBuild(z,be,x),S.onBeforeCompile(be,x),Le=te.acquireProgram(be,we),Ge.set(we,Le),B.uniforms=be.uniforms;const Ne=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ne.clippingPlanes=ae.uniform),Sa(S,be),B.needsLights=_c(S),B.lightsStateVersion=xe,B.needsLights&&(Ne.ambientLightColor.value=O.state.ambient,Ne.lightProbe.value=O.state.probe,Ne.directionalLights.value=O.state.directional,Ne.directionalLightShadows.value=O.state.directionalShadow,Ne.spotLights.value=O.state.spot,Ne.spotLightShadows.value=O.state.spotShadow,Ne.rectAreaLights.value=O.state.rectArea,Ne.ltc_1.value=O.state.rectAreaLTC1,Ne.ltc_2.value=O.state.rectAreaLTC2,Ne.pointLights.value=O.state.point,Ne.pointLightShadows.value=O.state.pointShadow,Ne.hemisphereLights.value=O.state.hemi,Ne.directionalShadowMap.value=O.state.directionalShadowMap,Ne.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ne.spotShadowMap.value=O.state.spotShadowMap,Ne.spotLightMatrix.value=O.state.spotLightMatrix,Ne.spotLightMap.value=O.state.spotLightMap,Ne.pointShadowMap.value=O.state.pointShadowMap,Ne.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Le,B.uniformsList=null,Le}function ya(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=Fs.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Sa(S,D){const z=De.get(S);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function mc(S,D,z,B,O){D.isScene!==!0&&(D=We),Ue.resetTextureUnits();const ue=D.fog,xe=B.isMeshStandardMaterial?D.environment:null,be=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Rn,we=(B.isMeshStandardMaterial?M:Je).get(B.envMap||xe),Ge=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Le=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ne=!!z.morphAttributes.position,lt=!!z.morphAttributes.normal,It=!!z.morphAttributes.color;let mt=Tn;B.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(mt=x.toneMapping);const nn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,st=nn!==void 0?nn.length:0,Fe=De.get(B),Ks=f.state.lights;if(k===!0&&(ee===!0||S!==Y)){const zt=S===Y&&B.id===U;ae.setState(B,S,zt)}let tt=!1;B.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Ks.state.version||Fe.outputColorSpace!==be||O.isBatchedMesh&&Fe.batching===!1||!O.isBatchedMesh&&Fe.batching===!0||O.isInstancedMesh&&Fe.instancing===!1||!O.isInstancedMesh&&Fe.instancing===!0||O.isSkinnedMesh&&Fe.skinning===!1||!O.isSkinnedMesh&&Fe.skinning===!0||O.isInstancedMesh&&Fe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Fe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Fe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Fe.instancingMorph===!1&&O.morphTexture!==null||Fe.envMap!==we||B.fog===!0&&Fe.fog!==ue||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==ae.numPlanes||Fe.numIntersection!==ae.numIntersection)||Fe.vertexAlphas!==Ge||Fe.vertexTangents!==Le||Fe.morphTargets!==Ne||Fe.morphNormals!==lt||Fe.morphColors!==It||Fe.toneMapping!==mt||Ie.isWebGL2===!0&&Fe.morphTargetsCount!==st)&&(tt=!0):(tt=!0,Fe.__version=B.version);let In=Fe.currentProgram;tt===!0&&(In=ns(B,D,O));let Ma=!1,Fi=!1,Zs=!1;const Mt=In.getUniforms(),Dn=Fe.uniforms;if(Me.useProgram(In.program)&&(Ma=!0,Fi=!0,Zs=!0),B.id!==U&&(U=B.id,Fi=!0),Ma||Y!==S){Mt.setValue(N,"projectionMatrix",S.projectionMatrix),Mt.setValue(N,"viewMatrix",S.matrixWorldInverse);const zt=Mt.map.cameraPosition;zt!==void 0&&zt.setValue(N,fe.setFromMatrixPosition(S.matrixWorld)),Ie.logarithmicDepthBuffer&&Mt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Mt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),Y!==S&&(Y=S,Fi=!0,Zs=!0)}if(O.isSkinnedMesh){Mt.setOptional(N,O,"bindMatrix"),Mt.setOptional(N,O,"bindMatrixInverse");const zt=O.skeleton;zt&&(Ie.floatVertexTextures?(zt.boneTexture===null&&zt.computeBoneTexture(),Mt.setValue(N,"boneTexture",zt.boneTexture,Ue)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Mt.setOptional(N,O,"batchingTexture"),Mt.setValue(N,"batchingTexture",O._matricesTexture,Ue));const Js=z.morphAttributes;if((Js.position!==void 0||Js.normal!==void 0||Js.color!==void 0&&Ie.isWebGL2===!0)&&se.update(O,z,In),(Fi||Fe.receiveShadow!==O.receiveShadow)&&(Fe.receiveShadow=O.receiveShadow,Mt.setValue(N,"receiveShadow",O.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Dn.envMap.value=we,Dn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),Fi&&(Mt.setValue(N,"toneMappingExposure",x.toneMappingExposure),Fe.needsLights&&gc(Dn,Zs),ue&&B.fog===!0&&J.refreshFogUniforms(Dn,ue),J.refreshMaterialUniforms(Dn,B,q,G,he),Fs.upload(N,ya(Fe),Dn,Ue)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Fs.upload(N,ya(Fe),Dn,Ue),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Mt.setValue(N,"center",O.center),Mt.setValue(N,"modelViewMatrix",O.modelViewMatrix),Mt.setValue(N,"normalMatrix",O.normalMatrix),Mt.setValue(N,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const zt=B.uniformsGroups;for(let Qs=0,xc=zt.length;Qs<xc;Qs++)if(Ie.isWebGL2){const Ea=zt[Qs];_e.update(Ea,In),_e.bind(Ea,In)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return In}function gc(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function _c(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(S,D,z){De.get(S.texture).__webglTexture=D,De.get(S.depthTexture).__webglTexture=z;const B=De.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=z===void 0,B.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,D){const z=De.get(S);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,z=0){T=S,L=D,C=z;let B=!0,O=null,ue=!1,xe=!1;if(S){const we=De.get(S);we.__useDefaultFramebuffer!==void 0?(Me.bindFramebuffer(N.FRAMEBUFFER,null),B=!1):we.__webglFramebuffer===void 0?Ue.setupRenderTarget(S):we.__hasExternalTextures&&Ue.rebindTextures(S,De.get(S.texture).__webglTexture,De.get(S.depthTexture).__webglTexture);const Ge=S.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(xe=!0);const Le=De.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Le[D])?O=Le[D][z]:O=Le[D],ue=!0):Ie.isWebGL2&&S.samples>0&&Ue.useMultisampledRTT(S)===!1?O=De.get(S).__webglMultisampledFramebuffer:Array.isArray(Le)?O=Le[z]:O=Le,v.copy(S.viewport),A.copy(S.scissor),K=S.scissorTest}else v.copy(ie).multiplyScalar(q).floor(),A.copy(re).multiplyScalar(q).floor(),K=de;if(Me.bindFramebuffer(N.FRAMEBUFFER,O)&&Ie.drawBuffers&&B&&Me.drawBuffers(S,O),Me.viewport(v),Me.scissor(A),Me.setScissorTest(K),ue){const we=De.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,we.__webglTexture,z)}else if(xe){const we=De.get(S.texture),Ge=D||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.__webglTexture,z||0,Ge)}U=-1},this.readRenderTargetPixels=function(S,D,z,B,O,ue,xe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=De.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(be=be[xe]),be){Me.bindFramebuffer(N.FRAMEBUFFER,be);try{const we=S.texture,Ge=we.format,Le=we.type;if(Ge!==Yt&&ye.convert(Ge)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ne=Le===Zi&&(Se.has("EXT_color_buffer_half_float")||Ie.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Le!==An&&ye.convert(Le)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===Zt&&(Ie.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-B&&z>=0&&z<=S.height-O&&N.readPixels(D,z,B,O,ye.convert(Ge),ye.convert(Le),ue)}finally{const we=T!==null?De.get(T).__webglFramebuffer:null;Me.bindFramebuffer(N.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(S,D,z=0){const B=Math.pow(2,-z),O=Math.floor(D.image.width*B),ue=Math.floor(D.image.height*B);Ue.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,z,0,0,S.x,S.y,O,ue),Me.unbindTexture()},this.copyTextureToTexture=function(S,D,z,B=0){const O=D.image.width,ue=D.image.height,xe=ye.convert(z.format),be=ye.convert(z.type);Ue.setTexture2D(z,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment),D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,B,S.x,S.y,O,ue,xe,be,D.image.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,B,S.x,S.y,D.mipmaps[0].width,D.mipmaps[0].height,xe,D.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,B,S.x,S.y,xe,be,D.image),B===0&&z.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),Me.unbindTexture()},this.copyTextureToTexture3D=function(S,D,z,B,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=Math.round(S.max.x-S.min.x),xe=Math.round(S.max.y-S.min.y),be=S.max.z-S.min.z+1,we=ye.convert(B.format),Ge=ye.convert(B.type);let Le;if(B.isData3DTexture)Ue.setTexture3D(B,0),Le=N.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)Ue.setTexture2DArray(B,0),Le=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const Ne=N.getParameter(N.UNPACK_ROW_LENGTH),lt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),It=N.getParameter(N.UNPACK_SKIP_PIXELS),mt=N.getParameter(N.UNPACK_SKIP_ROWS),nn=N.getParameter(N.UNPACK_SKIP_IMAGES),st=z.isCompressedTexture?z.mipmaps[O]:z.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,st.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,st.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,S.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,S.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,S.min.z),z.isDataTexture||z.isData3DTexture?N.texSubImage3D(Le,O,D.x,D.y,D.z,ue,xe,be,we,Ge,st.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Le,O,D.x,D.y,D.z,ue,xe,be,we,st.data):N.texSubImage3D(Le,O,D.x,D.y,D.z,ue,xe,be,we,Ge,st),N.pixelStorei(N.UNPACK_ROW_LENGTH,Ne),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,lt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,It),N.pixelStorei(N.UNPACK_SKIP_ROWS,mt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,nn),O===0&&B.generateMipmaps&&N.generateMipmap(Le),Me.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?Ue.setTextureCube(S,0):S.isData3DTexture?Ue.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ue.setTexture2DArray(S,0):Ue.setTexture2D(S,0),Me.unbindTexture()},this.resetState=function(){L=0,C=0,T=null,Me.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ra?"display-p3":"srgb",t.unpackColorSpace=je.workingColorSpace===$s?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Im extends Ql{}Im.prototype.isWebGL1Renderer=!0;class Dm extends ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Nm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qr,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Ul("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const At=new R;class Ws{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array),r=qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ws(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Um extends Pn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let vi;const Hi=new R,yi=new R,Si=new R,Mi=new ge,Vi=new ge,ec=new Ye,bs=new R,Wi=new R,Ts=new R,Yo=new ge,Ir=new ge,$o=new ge;class Fm extends ot{constructor(e=new Um){if(super(),this.isSprite=!0,this.type="Sprite",vi===void 0){vi=new yt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nm(t,5);vi.setIndex([0,1,2,0,2,3]),vi.setAttribute("position",new Ws(n,3,0,!1)),vi.setAttribute("uv",new Ws(n,2,3,!1))}this.geometry=vi,this.material=e,this.center=new ge(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yi.setFromMatrixScale(this.matrixWorld),ec.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Si.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yi.multiplyScalar(-Si.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;As(bs.set(-.5,-.5,0),Si,o,yi,i,r),As(Wi.set(.5,-.5,0),Si,o,yi,i,r),As(Ts.set(.5,.5,0),Si,o,yi,i,r),Yo.set(0,0),Ir.set(1,0),$o.set(1,1);let a=e.ray.intersectTriangle(bs,Wi,Ts,!1,Hi);if(a===null&&(As(Wi.set(-.5,.5,0),Si,o,yi,i,r),Ir.set(0,1),a=e.ray.intersectTriangle(bs,Ts,Wi,!1,Hi),a===null))return;const l=e.ray.origin.distanceTo(Hi);l<e.near||l>e.far||t.push({distance:l,point:Hi.clone(),uv:Gt.getInterpolation(Hi,bs,Wi,Ts,Yo,Ir,$o,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function As(s,e,t,n,i,r){Mi.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Vi.x=r*Mi.x-i*Mi.y,Vi.y=i*Mi.x+r*Mi.y):Vi.copy(Mi),s.copy(e),s.x+=Vi.x,s.y+=Vi.y,s.applyMatrix4(ec)}const ws=new R,qo=new R;class Om extends ot{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ws.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(ws);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){ws.setFromMatrixPosition(e.matrixWorld),qo.setFromMatrixPosition(this.matrixWorld);const n=ws.distanceTo(qo)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}class zm extends Rt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=_t,u=_t,h,p){super(null,o,a,l,c,u,i,r,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jo extends Ot{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ei=new Ye,Ko=new Ye,Cs=[],Zo=new Jn,Bm=new Ye,Xi=new nt,Yi=new Qn;class Gm extends nt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Bm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ei),Zo.copy(e.boundingBox).applyMatrix4(Ei),this.boundingBox.union(Zo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ei),Yi.copy(e.boundingSphere).applyMatrix4(Ei),this.boundingSphere.union(Yi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Xi.geometry=this.geometry,Xi.material=this.material,Xi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yi.copy(this.boundingSphere),Yi.applyMatrix4(n),e.ray.intersectsSphere(Yi)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ei),Ko.multiplyMatrices(n,Ei),Xi.matrixWorld=Ko,Xi.raycast(e,Cs);for(let o=0,a=Cs.length;o<a;o++){const l=Cs[o];l.instanceId=r,l.object=this,t.push(l)}Cs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new jo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new zm(new Float32Array(i*this.count),i,this.count,wl,Zt));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ji extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jo=new R,Qo=new R,el=new Ye,Dr=new Qi,Rs=new Qn;class tc extends ot{constructor(e=new yt,t=new Ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Jo.fromBufferAttribute(t,i-1),Qo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Jo.distanceTo(Qo);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(i),Rs.radius+=r,e.ray.intersectsSphere(Rs)===!1)return;el.copy(i).invert(),Dr.copy(e.ray).applyMatrix4(el);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,u=new R,h=new R,p=new R,m=this.isLineSegments?2:1,g=n.index,f=n.attributes.position;if(g!==null){const d=Math.max(0,o.start),E=Math.min(g.count,o.start+o.count);for(let x=d,w=E-1;x<w;x+=m){const L=g.getX(x),C=g.getX(x+1);if(c.fromBufferAttribute(f,L),u.fromBufferAttribute(f,C),Dr.distanceSqToSegment(c,u,p,h)>l)continue;p.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(p);U<e.near||U>e.far||t.push({distance:U,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),E=Math.min(f.count,o.start+o.count);for(let x=d,w=E-1;x<w;x+=m){if(c.fromBufferAttribute(f,x),u.fromBufferAttribute(f,x+1),Dr.distanceSqToSegment(c,u,p,h)>l)continue;p.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(p);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const tl=new R,nl=new R;class Os extends tc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)tl.fromBufferAttribute(t,i),nl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+tl.distanceTo(nl);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nc extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const il=new Ye,Qr=new Qi,Ps=new Qn,Ls=new R;class km extends ot{constructor(e=new yt,t=new nc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(i),Ps.radius+=r,e.ray.intersectsSphere(Ps)===!1)return;il.copy(i).invert(),Qr.copy(e.ray).applyMatrix4(il);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=p,y=m;g<y;g++){const f=c.getX(g);Ls.fromBufferAttribute(h,f),sl(Ls,f,l,i,e,t,this)}}else{const p=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=p,y=m;g<y;g++)Ls.fromBufferAttribute(h,g),sl(Ls,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function sl(s,e,t,n,i,r,o){const a=Qr.distanceSqToPoint(s);if(a<t){const l=new R;Qr.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Hm{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const u=n[i],p=n[i+1]-u,m=(o-u)/p;return(i+m)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ge:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,i=[],r=[],o=[],a=new R,l=new Ye;for(let m=0;m<=e;m++){const g=m/e;i[m]=this.getTangentAt(g,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),p=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(i[m-1],i[m]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(xt(i[m-1].dot(i[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(a,g))}o[m].crossVectors(i[m],r[m])}if(t===!0){let m=Math.acos(xt(r[0].dot(r[e]),-1,1));m/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(m=-m);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],m*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Vm extends Hm{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ge){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,m=c-this.aY;l=p*u-m*h+this.aX,c=p*h+m*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ci extends yt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],p=[],m=[];let g=0;const y=[],f=n/2;let d=0;E(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new ct(h,3)),this.setAttribute("normal",new ct(p,3)),this.setAttribute("uv",new ct(m,2));function E(){const w=new R,L=new R;let C=0;const T=(t-e)/n;for(let U=0;U<=r;U++){const Y=[],v=U/r,A=v*(t-e)+e;for(let K=0;K<=i;K++){const Z=K/i,I=Z*l+a,V=Math.sin(I),G=Math.cos(I);L.x=A*V,L.y=-v*n+f,L.z=A*G,h.push(L.x,L.y,L.z),w.set(V,T,G).normalize(),p.push(w.x,w.y,w.z),m.push(Z,1-v),Y.push(g++)}y.push(Y)}for(let U=0;U<i;U++)for(let Y=0;Y<r;Y++){const v=y[Y][U],A=y[Y+1][U],K=y[Y+1][U+1],Z=y[Y][U+1];u.push(v,A,Z),u.push(A,K,Z),C+=6}c.addGroup(d,C,0),d+=C}function x(w){const L=g,C=new ge,T=new R;let U=0;const Y=w===!0?e:t,v=w===!0?1:-1;for(let K=1;K<=i;K++)h.push(0,f*v,0),p.push(0,v,0),m.push(.5,.5),g++;const A=g;for(let K=0;K<=i;K++){const I=K/i*l+a,V=Math.cos(I),G=Math.sin(I);T.x=Y*G,T.y=f*v,T.z=Y*V,h.push(T.x,T.y,T.z),p.push(0,v,0),C.x=V*.5+.5,C.y=G*.5*v+.5,m.push(C.x,C.y),g++}for(let K=0;K<i;K++){const Z=L+K,I=A+K;w===!0?u.push(I,I+1,Z):u.push(I+1,I,Z),U+=3}c.addGroup(d,U,w===!0?1:2),d+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ji extends Ci{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new ji(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Is=new R,Ds=new R,Nr=new R,Ns=new Gt;class Wm extends yt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(qi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),p={},m=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:y,b:f,c:d}=Ns;if(y.fromBufferAttribute(a,c[0]),f.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),Ns.getNormal(Nr),h[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,h[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,h[2]=`${Math.round(d.x*i)},${Math.round(d.y*i)},${Math.round(d.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let E=0;E<3;E++){const x=(E+1)%3,w=h[E],L=h[x],C=Ns[u[E]],T=Ns[u[x]],U=`${w}_${L}`,Y=`${L}_${w}`;Y in p&&p[Y]?(Nr.dot(p[Y].normal)<=r&&(m.push(C.x,C.y,C.z),m.push(T.x,T.y,T.z)),p[Y]=null):U in p||(p[U]={index0:c[E],index1:c[x],normal:Nr.clone()})}}for(const g in p)if(p[g]){const{index0:y,index1:f}=p[g];Is.fromBufferAttribute(a,y),Ds.fromBufferAttribute(a,f),m.push(Is.x,Is.y,Is.z),m.push(Ds.x,Ds.y,Ds.z)}this.setAttribute("position",new ct(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Xs extends yt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],u=[];let h=e;const p=(t-e)/i,m=new R,g=new ge;for(let y=0;y<=i;y++){for(let f=0;f<=n;f++){const d=r+f/n*o;m.x=h*Math.cos(d),m.y=h*Math.sin(d),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,u.push(g.x,g.y)}h+=p}for(let y=0;y<i;y++){const f=y*(n+1);for(let d=0;d<n;d++){const E=d+f,x=E,w=E+n+1,L=E+n+2,C=E+1;a.push(x,w,C),a.push(w,L,C)}}this.setIndex(a),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Kn extends yt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new R,p=new R,m=[],g=[],y=[],f=[];for(let d=0;d<=n;d++){const E=[],x=d/n;let w=0;d===0&&o===0?w=.5/t:d===n&&l===Math.PI&&(w=-.5/t);for(let L=0;L<=t;L++){const C=L/t;h.x=-e*Math.cos(i+C*r)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(i+C*r)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),p.copy(h).normalize(),y.push(p.x,p.y,p.z),f.push(C+w,1-x),E.push(c++)}u.push(E)}for(let d=0;d<n;d++)for(let E=0;E<t;E++){const x=u[d][E+1],w=u[d][E],L=u[d+1][E],C=u[d+1][E+1];(d!==0||o>0)&&m.push(x,w,C),(d!==n-1||l<Math.PI)&&m.push(w,L,C)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ic extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Il,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ca extends ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ur=new Ye,rl=new R,al=new R;class sc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oa,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;rl.setFromMatrixPosition(e.matrixWorld),t.position.copy(rl),al.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(al),t.updateMatrixWorld(),Ur.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ur),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ur)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ol=new Ye,$i=new R,Fr=new R;class Xm extends sc{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$i.setFromMatrixPosition(e.matrixWorld),n.position.copy($i),Fr.copy(n.position),Fr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fr),n.updateMatrixWorld(),i.makeTranslation(-$i.x,-$i.y,-$i.z),ol.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ol)}}class Ym extends ca{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $m extends sc{constructor(){super(new Yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qm extends ca{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.shadow=new $m}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jm extends ca{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ll=new Ye;class Km{constructor(e,t,n=0,i=1/0){this.ray=new Qi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ll.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ll),this}intersectObject(e,t=!0,n=[]){return ea(e,this,n,t),n.sort(cl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)ea(e[i],this,n,t);return n.sort(cl),n}}function cl(s,e){return s.distance-e.distance}function ea(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,o=i.length;r<o;r++)ea(i[r],e,t,!0)}}class ul{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ua extends Os{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new yt;i.setAttribute("position",new ct(t,3)),i.setAttribute("color",new ct(n,3));const r=new Ji({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new Ve,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);const hl={type:"change"},Or={type:"start"},dl={type:"end"},Us=new Qi,fl=new yn,Zm=Math.cos(70*vu.DEG2RAD);class Jm extends Zn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ti.ROTATE,MIDDLE:ti.DOLLY,RIGHT:ti.PAN},this.touches={ONE:ni.ROTATE,TWO:ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(b){b.addEventListener("keydown",Ee),this._domElementKeyEvents=b},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ee),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(hl),n.update(),r=i.NONE},this.update=function(){const b=new R,j=new jn().setFromUnitVectors(e.up,new R(0,1,0)),me=j.clone().invert(),P=new R,ne=new jn,F=new R,Q=2*Math.PI;return function(ke=null){const $e=n.object.position;b.copy($e).sub(n.target),b.applyQuaternion(j),a.setFromVector3(b),n.autoRotate&&r===i.NONE&&K(v(ke)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Ke=n.minAzimuthAngle,at=n.maxAzimuthAngle;isFinite(Ke)&&isFinite(at)&&(Ke<-Math.PI?Ke+=Q:Ke>Math.PI&&(Ke-=Q),at<-Math.PI?at+=Q:at>Math.PI&&(at-=Q),Ke<=at?a.theta=Math.max(Ke,Math.min(at,a.theta)):a.theta=a.theta>(Ke+at)/2?Math.max(Ke,a.theta):Math.min(at,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Xe=!1;if(n.zoomToCursor&&C||n.object.isOrthographicCamera)a.radius=ie(a.radius);else{const Qe=a.radius;a.radius=ie(a.radius*c),Xe=Qe!=a.radius}if(b.setFromSpherical(a),b.applyQuaternion(me),$e.copy(n.target).add(b),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),n.zoomToCursor&&C){let Qe=null;if(n.object.isPerspectiveCamera){const St=b.length();Qe=ie(St*c);const Ln=St-Qe;n.object.position.addScaledVector(w,Ln),n.object.updateMatrixWorld(),Xe=!!Ln}else if(n.object.isOrthographicCamera){const St=new R(L.x,L.y,0);St.unproject(n.object);const Ln=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Xe=Ln!==n.object.zoom;const es=new R(L.x,L.y,0);es.unproject(n.object),n.object.position.sub(es).add(St),n.object.updateMatrixWorld(),Qe=b.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Qe!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Qe).add(n.object.position):(Us.origin.copy(n.object.position),Us.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Us.direction))<Zm?e.lookAt(n.target):(fl.setFromNormalAndCoplanarPoint(n.object.up,n.target),Us.intersectPlane(fl,n.target))))}else if(n.object.isOrthographicCamera){const Qe=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),Qe!==n.object.zoom&&(n.object.updateProjectionMatrix(),Xe=!0)}return c=1,C=!1,Xe||P.distanceToSquared(n.object.position)>o||8*(1-ne.dot(n.object.quaternion))>o||F.distanceToSquared(n.target)>o?(n.dispatchEvent(hl),P.copy(n.object.position),ne.copy(n.object.quaternion),F.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Pe),n.domElement.removeEventListener("pointerdown",Ue),n.domElement.removeEventListener("pointercancel",M),n.domElement.removeEventListener("wheel",$),n.domElement.removeEventListener("pointermove",Je),n.domElement.removeEventListener("pointerup",M),n.domElement.getRootNode().removeEventListener("keydown",J,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ee),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const o=1e-6,a=new ul,l=new ul;let c=1;const u=new R,h=new ge,p=new ge,m=new ge,g=new ge,y=new ge,f=new ge,d=new ge,E=new ge,x=new ge,w=new R,L=new ge;let C=!1;const T=[],U={};let Y=!1;function v(b){return b!==null?2*Math.PI/60*n.autoRotateSpeed*b:2*Math.PI/60/60*n.autoRotateSpeed}function A(b){const j=Math.abs(b*.01);return Math.pow(.95,n.zoomSpeed*j)}function K(b){l.theta-=b}function Z(b){l.phi-=b}const I=function(){const b=new R;return function(me,P){b.setFromMatrixColumn(P,0),b.multiplyScalar(-me),u.add(b)}}(),V=function(){const b=new R;return function(me,P){n.screenSpacePanning===!0?b.setFromMatrixColumn(P,1):(b.setFromMatrixColumn(P,0),b.crossVectors(n.object.up,b)),b.multiplyScalar(me),u.add(b)}}(),G=function(){const b=new R;return function(me,P){const ne=n.domElement;if(n.object.isPerspectiveCamera){const F=n.object.position;b.copy(F).sub(n.target);let Q=b.length();Q*=Math.tan(n.object.fov/2*Math.PI/180),I(2*me*Q/ne.clientHeight,n.object.matrix),V(2*P*Q/ne.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(I(me*(n.object.right-n.object.left)/n.object.zoom/ne.clientWidth,n.object.matrix),V(P*(n.object.top-n.object.bottom)/n.object.zoom/ne.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function q(b){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function W(b){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(b,j){if(!n.zoomToCursor)return;C=!0;const me=n.domElement.getBoundingClientRect(),P=b-me.left,ne=j-me.top,F=me.width,Q=me.height;L.x=P/F*2-1,L.y=-(ne/Q)*2+1,w.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function ie(b){return Math.max(n.minDistance,Math.min(n.maxDistance,b))}function re(b){h.set(b.clientX,b.clientY)}function de(b){X(b.clientX,b.clientX),d.set(b.clientX,b.clientY)}function Ce(b){g.set(b.clientX,b.clientY)}function k(b){p.set(b.clientX,b.clientY),m.subVectors(p,h).multiplyScalar(n.rotateSpeed);const j=n.domElement;K(2*Math.PI*m.x/j.clientHeight),Z(2*Math.PI*m.y/j.clientHeight),h.copy(p),n.update()}function ee(b){E.set(b.clientX,b.clientY),x.subVectors(E,d),x.y>0?q(A(x.y)):x.y<0&&W(A(x.y)),d.copy(E),n.update()}function he(b){y.set(b.clientX,b.clientY),f.subVectors(y,g).multiplyScalar(n.panSpeed),G(f.x,f.y),g.copy(y),n.update()}function Ae(b){X(b.clientX,b.clientY),b.deltaY<0?W(A(b.deltaY)):b.deltaY>0&&q(A(b.deltaY)),n.update()}function ve(b){let j=!1;switch(b.code){case n.keys.UP:b.ctrlKey||b.metaKey||b.shiftKey?Z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),j=!0;break;case n.keys.BOTTOM:b.ctrlKey||b.metaKey||b.shiftKey?Z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),j=!0;break;case n.keys.LEFT:b.ctrlKey||b.metaKey||b.shiftKey?K(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),j=!0;break;case n.keys.RIGHT:b.ctrlKey||b.metaKey||b.shiftKey?K(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),j=!0;break}j&&(b.preventDefault(),n.update())}function fe(b){if(T.length===1)h.set(b.pageX,b.pageY);else{const j=pe(b),me=.5*(b.pageX+j.x),P=.5*(b.pageY+j.y);h.set(me,P)}}function We(b){if(T.length===1)g.set(b.pageX,b.pageY);else{const j=pe(b),me=.5*(b.pageX+j.x),P=.5*(b.pageY+j.y);g.set(me,P)}}function Te(b){const j=pe(b),me=b.pageX-j.x,P=b.pageY-j.y,ne=Math.sqrt(me*me+P*P);d.set(0,ne)}function N(b){n.enableZoom&&Te(b),n.enablePan&&We(b)}function ht(b){n.enableZoom&&Te(b),n.enableRotate&&fe(b)}function Se(b){if(T.length==1)p.set(b.pageX,b.pageY);else{const me=pe(b),P=.5*(b.pageX+me.x),ne=.5*(b.pageY+me.y);p.set(P,ne)}m.subVectors(p,h).multiplyScalar(n.rotateSpeed);const j=n.domElement;K(2*Math.PI*m.x/j.clientHeight),Z(2*Math.PI*m.y/j.clientHeight),h.copy(p)}function Ie(b){if(T.length===1)y.set(b.pageX,b.pageY);else{const j=pe(b),me=.5*(b.pageX+j.x),P=.5*(b.pageY+j.y);y.set(me,P)}f.subVectors(y,g).multiplyScalar(n.panSpeed),G(f.x,f.y),g.copy(y)}function Me(b){const j=pe(b),me=b.pageX-j.x,P=b.pageY-j.y,ne=Math.sqrt(me*me+P*P);E.set(0,ne),x.set(0,Math.pow(E.y/d.y,n.zoomSpeed)),q(x.y),d.copy(E);const F=(b.pageX+j.x)*.5,Q=(b.pageY+j.y)*.5;X(F,Q)}function He(b){n.enableZoom&&Me(b),n.enablePan&&Ie(b)}function De(b){n.enableZoom&&Me(b),n.enableRotate&&Se(b)}function Ue(b){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(b.pointerId),n.domElement.addEventListener("pointermove",Je),n.domElement.addEventListener("pointerup",M)),!Be(b)&&(se(b),b.pointerType==="touch"?ae(b):_(b)))}function Je(b){n.enabled!==!1&&(b.pointerType==="touch"?le(b):H(b))}function M(b){switch(rt(b),T.length){case 0:n.domElement.releasePointerCapture(b.pointerId),n.domElement.removeEventListener("pointermove",Je),n.domElement.removeEventListener("pointerup",M),n.dispatchEvent(dl),r=i.NONE;break;case 1:const j=T[0],me=U[j];ae({pointerId:j,pageX:me.x,pageY:me.y});break}}function _(b){let j;switch(b.button){case 0:j=n.mouseButtons.LEFT;break;case 1:j=n.mouseButtons.MIDDLE;break;case 2:j=n.mouseButtons.RIGHT;break;default:j=-1}switch(j){case ti.DOLLY:if(n.enableZoom===!1)return;de(b),r=i.DOLLY;break;case ti.ROTATE:if(b.ctrlKey||b.metaKey||b.shiftKey){if(n.enablePan===!1)return;Ce(b),r=i.PAN}else{if(n.enableRotate===!1)return;re(b),r=i.ROTATE}break;case ti.PAN:if(b.ctrlKey||b.metaKey||b.shiftKey){if(n.enableRotate===!1)return;re(b),r=i.ROTATE}else{if(n.enablePan===!1)return;Ce(b),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Or)}function H(b){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;k(b);break;case i.DOLLY:if(n.enableZoom===!1)return;ee(b);break;case i.PAN:if(n.enablePan===!1)return;he(b);break}}function $(b){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(b.preventDefault(),n.dispatchEvent(Or),Ae(te(b)),n.dispatchEvent(dl))}function te(b){const j=b.deltaMode,me={clientX:b.clientX,clientY:b.clientY,deltaY:b.deltaY};switch(j){case 1:me.deltaY*=16;break;case 2:me.deltaY*=100;break}return b.ctrlKey&&!Y&&(me.deltaY*=10),me}function J(b){b.key==="Control"&&(Y=!0,n.domElement.getRootNode().addEventListener("keyup",Re,{passive:!0,capture:!0}))}function Re(b){b.key==="Control"&&(Y=!1,n.domElement.getRootNode().removeEventListener("keyup",Re,{passive:!0,capture:!0}))}function Ee(b){n.enabled===!1||n.enablePan===!1||ve(b)}function ae(b){switch(ye(b),T.length){case 1:switch(n.touches.ONE){case ni.ROTATE:if(n.enableRotate===!1)return;fe(b),r=i.TOUCH_ROTATE;break;case ni.PAN:if(n.enablePan===!1)return;We(b),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case ni.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;N(b),r=i.TOUCH_DOLLY_PAN;break;case ni.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ht(b),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Or)}function le(b){switch(ye(b),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Se(b),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Ie(b),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;He(b),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;De(b),n.update();break;default:r=i.NONE}}function Pe(b){n.enabled!==!1&&b.preventDefault()}function se(b){T.push(b.pointerId)}function rt(b){delete U[b.pointerId];for(let j=0;j<T.length;j++)if(T[j]==b.pointerId){T.splice(j,1);return}}function Be(b){for(let j=0;j<T.length;j++)if(T[j]==b.pointerId)return!0;return!1}function ye(b){let j=U[b.pointerId];j===void 0&&(j=new ge,U[b.pointerId]=j),j.set(b.pageX,b.pageY)}function pe(b){const j=b.pointerId===T[0]?T[1]:T[0];return U[j]}n.domElement.addEventListener("contextmenu",Pe),n.domElement.addEventListener("pointerdown",Ue),n.domElement.addEventListener("pointercancel",M),n.domElement.addEventListener("wheel",$,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",J,{passive:!0,capture:!0}),this.update()}}const Qm={cubesX:10},eg={showPickMeshes:!1},qt={initialPosition:{x:-12,y:12,z:0},lookAt:{x:0,y:0,z:0},fov:60,minDistance:.5,maxDistance:20,moveSpeed:.5},tg={maxUnits:1e4},Gn={systemEnterDistanceFactor:.5,systemExitDistanceFactor:2.5,planetEnterDistanceFactor:3,planetExitDistanceFactor:8,transitionCooldown:500};class ha{camera;controls;moveSpeed;keys={};initialPosition;initialTarget;targetToLerp=null;positionToLerp=null;dynamicTarget=null;trackedEntity=null;transitioning=!1;onTransitionComplete=null;constructor(e){this.moveSpeed=qt.moveSpeed,this.camera=new Ft(qt.fov,window.innerWidth/window.innerHeight,.1,2e3),this.initialPosition=new R(qt.initialPosition.x,qt.initialPosition.y,qt.initialPosition.z),this.initialTarget=new R(qt.lookAt.x,qt.lookAt.y,qt.lookAt.z),this.camera.position.copy(this.initialPosition),this.camera.lookAt(this.initialTarget),this.controls=new Jm(this.camera,e),this.controls.enableDamping=!0,this.controls.minDistance=qt.minDistance,this.controls.maxDistance=qt.maxDistance,this.controls.maxPolarAngle=Math.PI*.8,this.controls.target.copy(this.initialTarget),window.addEventListener("keydown",t=>this.keys[t.code]=!0),window.addEventListener("keyup",t=>this.keys[t.code]=!1),window.addEventListener("keydown",t=>{t.code==="KeyR"&&!t.repeat&&this.resetPosition()})}updateAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}get distance(){return this.controls.getDistance()}getCamera(){return this.camera}getTarget(){return this.controls.target.clone()}resetPosition(){this.targetToLerp=null,this.positionToLerp=null,this.onTransitionComplete=null,this.transitioning=!1,this.controls.enabled=!0,this.dynamicTarget=null,this.trackedEntity=null,this.camera.position.copy(this.initialPosition),this.controls.target.copy(this.initialTarget),this.controls.update(),console.log("[CameraManager] Position réinitialisée")}update(e){if(this.handleKeyboardMovement(),this.targetToLerp){this.controls.enabled&&(this.controls.enabled=!1,this.transitioning=!0);const t=.1;this.controls.target.lerp(this.targetToLerp,t),this.positionToLerp&&this.camera.position.lerp(this.positionToLerp,t);const n=this.controls.target.distanceTo(this.targetToLerp),i=this.positionToLerp?this.camera.position.distanceTo(this.positionToLerp):0;n<.01&&i<.01&&(this.controls.target.copy(this.targetToLerp),this.positionToLerp&&this.camera.position.copy(this.positionToLerp),this.targetToLerp=null,this.positionToLerp=null,this.controls.enabled=!0,this.transitioning=!1,this.onTransitionComplete&&(this.onTransitionComplete(),this.onTransitionComplete=null))}this.transitioning||(this.trackedEntity&&this.trackedEntity.isActive()?this.controls.target.copy(this.trackedEntity.getPosition()):this.dynamicTarget&&this.controls.target.copy(this.dynamicTarget.position)),this.controls.update()}isTransitioning(){return this.transitioning}getControlsTarget(){return this.controls.target.clone()}handleKeyboardMovement(){const e=new R;(this.keys.KeyW||this.keys.ArrowUp)&&(e.z-=this.moveSpeed,this.targetToLerp=null),(this.keys.KeyS||this.keys.ArrowDown)&&(e.z+=this.moveSpeed,this.targetToLerp=null),(this.keys.KeyA||this.keys.ArrowLeft)&&(e.x-=this.moveSpeed,this.targetToLerp=null),(this.keys.KeyD||this.keys.ArrowRight)&&(e.x+=this.moveSpeed,this.targetToLerp=null),e.lengthSq()>0&&(e.applyQuaternion(this.camera.quaternion),e.y=0,this.camera.position.add(e),this.controls.target.add(e))}setPosition(e,t,n){this.targetToLerp=null,this.camera.position.set(e,t,n),this.controls.update()}setTarget(e,t,n){let i;if(e instanceof R)i=e.clone();else if(typeof e=="number"&&typeof t=="number"&&typeof n=="number")i=new R(e,t,n);else return;this.trackedEntity=null,this.dynamicTarget=null,this.transitioning?this.targetToLerp=i:(this.controls.target.copy(i),this.controls.update())}static STANDARD_VIEW_DIRECTION=new R(0,.5,1).normalize();flyTo(e,t,n,i=!1){this.trackedEntity=null,this.dynamicTarget=null,this.onTransitionComplete=n||null;let r;i?r=ha.STANDARD_VIEW_DIRECTION.clone():(r=new R().subVectors(this.camera.position,this.controls.target).normalize(),r.lengthSq()<1e-4&&r.set(0,0,1));const o=e.clone().add(r.multiplyScalar(t));this.targetToLerp=e.clone(),this.positionToLerp=o,this.transitioning=!0,this.controls.enabled=!1}moveTo(e,t,n=1e3){if(this.transitioning)return;this.transitioning=!0;const i=this.camera.position.clone(),r=this.controls.target.clone(),o=performance.now(),a=()=>{const l=performance.now()-o,c=Math.min(l/n,1);this.camera.position.lerpVectors(i,e,c),this.controls.target.lerpVectors(r,t,c),this.controls.update(),c<1?requestAnimationFrame(a):(this.transitioning=!1,this.onTransitionComplete&&this.onTransitionComplete())};a()}setDynamicTarget(e){this.dynamicTarget=e,e&&!this.transitioning&&(this.targetToLerp=null,this.positionToLerp=null)}setTrackedEntity(e){this.trackedEntity=e,e&&!this.transitioning&&(this.targetToLerp=null,this.positionToLerp=null)}setControlsEnabled(e){this.controls.enabled=e}zoomToPosition(e,t=5){this.controls.target.copy(e);const n=new R().subVectors(this.camera.position,this.controls.target).normalize();this.camera.position.copy(e).add(n.multiplyScalar(t)),this.controls.update()}}const ng=5;class ig{mousePosition=new ge;domElement;pressedKeys=new Set;handlers=new Map;isDragging=!1;dragStart=null;dragButton=-1;boundHandlers;constructor(e){this.domElement=e;const t=["click","dblclick","contextmenu","dragstart","drag","dragend","keydown","keyup"];for(const n of t)this.handlers.set(n,new Set);this.boundHandlers={pointerMove:this.handlePointerMove.bind(this),pointerDown:this.handlePointerDown.bind(this),pointerUp:this.handlePointerUp.bind(this),click:this.handleClick.bind(this),dblClick:this.handleDblClick.bind(this),contextMenu:this.handleContextMenu.bind(this),keyDown:this.handleKeyDown.bind(this),keyUp:this.handleKeyUp.bind(this),blur:this.handleBlur.bind(this)},this.domElement.addEventListener("pointermove",this.boundHandlers.pointerMove,{passive:!0}),this.domElement.addEventListener("pointerdown",this.boundHandlers.pointerDown),this.domElement.addEventListener("pointerup",this.boundHandlers.pointerUp),this.domElement.addEventListener("click",this.boundHandlers.click),this.domElement.addEventListener("dblclick",this.boundHandlers.dblClick),this.domElement.addEventListener("contextmenu",this.boundHandlers.contextMenu),window.addEventListener("keydown",this.boundHandlers.keyDown),window.addEventListener("keyup",this.boundHandlers.keyUp),window.addEventListener("blur",this.boundHandlers.blur)}dispose(){this.domElement.removeEventListener("pointermove",this.boundHandlers.pointerMove),this.domElement.removeEventListener("pointerdown",this.boundHandlers.pointerDown),this.domElement.removeEventListener("pointerup",this.boundHandlers.pointerUp),this.domElement.removeEventListener("click",this.boundHandlers.click),this.domElement.removeEventListener("dblclick",this.boundHandlers.dblClick),this.domElement.removeEventListener("contextmenu",this.boundHandlers.contextMenu),window.removeEventListener("keydown",this.boundHandlers.keyDown),window.removeEventListener("keyup",this.boundHandlers.keyUp),window.removeEventListener("blur",this.boundHandlers.blur);for(const e of this.handlers.values())e.clear();this.pressedKeys.clear()}isKeyDown(e){return this.pressedKeys.has(e.toLowerCase())}on(e,t){const n=this.handlers.get(e);n&&n.add(t)}off(e,t){const n=this.handlers.get(e);n&&n.delete(t)}computeNDC(e,t){const n=this.domElement.getBoundingClientRect(),i=n.width||1,r=n.height||1;return new ge((e-n.left)/i*2-1,-((t-n.top)/r)*2+1)}emit(e,t){const n=this.handlers.get(e);if(n)for(const i of n)try{i(t)}catch{}}handlePointerMove(e){const t=this.computeNDC(e.clientX,e.clientY);this.mousePosition.copy(t),this.isDragging&&this.dragStart&&this.emit("drag",{start:this.dragStart.clone(),current:t,originalEvent:e})}handlePointerDown(e){this.dragStart=this.computeNDC(e.clientX,e.clientY),this.dragButton=e.button,this.isDragging=!1}handlePointerUp(e){if(this.isDragging&&this.dragStart){const t=this.computeNDC(e.clientX,e.clientY);this.emit("dragend",{start:this.dragStart.clone(),current:t,originalEvent:e})}this.isDragging=!1,this.dragStart=null,this.dragButton=-1}handleClick(e){if(this.isDragging)return;if(this.dragStart){const n=this.computeNDC(e.clientX,e.clientY),i=(n.x-this.dragStart.x)*this.domElement.clientWidth,r=(n.y-this.dragStart.y)*this.domElement.clientHeight;if(Math.sqrt(i*i+r*r)>ng&&!this.isDragging){this.isDragging=!0,this.emit("dragstart",{start:this.dragStart.clone(),current:n,originalEvent:e}),this.emit("dragend",{start:this.dragStart.clone(),current:n,originalEvent:e}),this.isDragging=!1,this.dragStart=null;return}}const t=this.computeNDC(e.clientX,e.clientY);this.mousePosition.copy(t),this.emit("click",{position:t,originalEvent:e})}handleDblClick(e){const t=this.computeNDC(e.clientX,e.clientY);this.mousePosition.copy(t),this.emit("dblclick",{position:t,originalEvent:e})}handleContextMenu(e){e.preventDefault();const t=this.computeNDC(e.clientX,e.clientY);this.mousePosition.copy(t),this.emit("contextmenu",{position:t,originalEvent:e})}handleKeyDown(e){const t=e.key.toLowerCase();this.pressedKeys.has(t)||(this.pressedKeys.add(t),this.emit("keydown",{key:e.key,originalEvent:e}))}handleKeyUp(e){const t=e.key.toLowerCase();this.pressedKeys.delete(t),this.emit("keyup",{key:e.key,originalEvent:e})}handleBlur(){this.pressedKeys.clear()}}class ta{mesh;innerRadius;outerRadius;color;opacity;constructor(e=1.3,t=.05,n=16777215,i=1){this.innerRadius=e,this.outerRadius=e+t,this.color=n,this.opacity=i;const r=new Xs(e,this.outerRadius,32),o=new Qt({color:n,transparent:!0,opacity:i,side:Wt});this.mesh=new nt(r,o),this.mesh.rotation.x=-Math.PI/2}getMesh(){return this.mesh}getParams(){return{innerRadius:this.innerRadius,outerRadius:this.outerRadius,color:this.color,opacity:this.opacity}}setPosition(e){this.mesh.position.copy(e)}setSize(e,t=.05){this.innerRadius=e,this.outerRadius=e+t;const n=new Xs(e,this.outerRadius,32);this.mesh.geometry.dispose(),this.mesh.geometry=n}setAppearance(e,t){this.color=e,this.opacity=t,this.mesh.material.color.setHex(e),this.mesh.material.opacity=t}updateRotation(e){this.mesh.rotation.z+=e*2}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}}function sg(s=1){const e=new $t;e.name="OriginHelper";const t=new Ci(s*.02,s*.02,s,8),n=new Qt({color:16711680}),i=new nt(t,n);i.rotation.z=-Math.PI/2,i.position.x=s/2,e.add(i);const r=new ji(s*.05,s*.15,8),o=new nt(r,n);o.rotation.z=-Math.PI/2,o.position.x=s,e.add(o);const a=new Ci(s*.02,s*.02,s,8),l=new Qt({color:65280}),c=new nt(a,l);c.position.y=s/2,e.add(c);const u=new ji(s*.05,s*.15,8),h=new nt(u,l);h.position.y=s,e.add(h);const p=new Ci(s*.02,s*.02,s,8),m=new Qt({color:255}),g=new nt(p,m);g.rotation.x=Math.PI/2,g.position.z=s/2,e.add(g);const y=new ji(s*.05,s*.15,8),f=new nt(y,m);f.rotation.x=Math.PI/2,f.position.z=s,e.add(f);const d=new Kn(s*.05,16,16),E=new Qt({color:16777215}),x=new nt(d,E);return e.add(x),e}class rg{group;sunMetadata;planets=[];sunMesh;selectionRing=null;selectedPlanetRing=null;optimalDistance;constructor(e){typeof e=="number"?this.sunMetadata=this.generateFakeMetadata(e):this.sunMetadata=e,this.optimalDistance=this.sunMetadata.optimalDistance||2,this.group=new $t;const t=new Kn(this.sunMetadata.radius*10,32,32),n=new Qt({color:this.sunMetadata.color});this.sunMesh=new nt(t,n),this.group.add(this.sunMesh);const i=new Ym(this.sunMetadata.color,1.5,100);this.group.add(i);const r=sg(.5);this.group.add(r),console.log("[SolarSystem] Repère 3D ajouté à l'origine (0,0,0)"),this.generatePlanets()}generateFakeMetadata(e){const t=e,n=()=>{const a=Math.sin(e++)*1e4;return a-Math.floor(a)},i=.005+n()*.015,r=[16776960,16766720,16753920,16761035,16777215],o=r[Math.floor(n()*r.length)];return{id:`SYSTEM_${t}`,name:`System ${t}`,globalCoords:{gx:0,gz:0},localPosition:{x:0,y:0,z:0},absolutePosition:{x:0,y:0,z:0},radius:i,mass:Math.pow(i*100,3),temperature:3e3+n()*5e3,color:o,createdAt:Date.now(),clusterId:"Generated",optimalDistance:2}}seededRandom(e){const t=Math.sin(e++)*1e4;return t-Math.floor(t)}generatePlanets(){let e=this.stringToSeed(this.sunMetadata.id);const t=Math.floor(this.seededRandom(e++)*8)+2;for(let n=0;n<t;n++){const i=.5+n*.3+this.seededRandom(e++)*.2,r=.02+this.seededRandom(e++)*.05,o=.2/i,a=this.seededRandom(e++)*Math.PI*2,l=Math.floor(this.seededRandom(e++)*16777215),c=new Kn(r,16,16),u=new ic({color:l,roughness:.7,metalness:.1}),h=new nt(c,u);h.userData.planetId=`PLANET_${n}`;const m=new Vm(0,0,i,i,0,2*Math.PI,!1,0).getPoints(64),g=new yt().setFromPoints(m),y=new Ji({color:16777215,transparent:!0,opacity:.6}),f=new tc(g,y);f.rotation.x=-Math.PI/2,this.group.add(f),this.group.add(h),this.planets.push({id:`PLANET_${n}`,distance:i,radius:r,speed:o,angle:a,color:l,mesh:h,orbitLine:f})}}stringToSeed(e){let t=0;for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);t=(t<<5)-t+i,t=t&t}return Math.abs(t)}update(e){if(this.planets.forEach(t=>{t.angle+=t.speed*e,t.mesh.position.x=Math.cos(t.angle)*t.distance,t.mesh.position.z=Math.sin(t.angle)*t.distance}),this.selectionRing&&this.selectionRing.updateRotation(e),this.selectedPlanetRing&&this.selectedPlanetRing.getMesh().visible){const t=this.planets.find(n=>{const i=this.selectedPlanetRing.getMesh().position;return Math.abs(n.mesh.position.x-i.x)<.01&&Math.abs(n.mesh.position.z-i.z)<.01});if(t){const n=t.mesh.position;this.selectedPlanetRing.getMesh().position.set(n.x,n.y,n.z)}}}selectSun(e){if(console.log("selectSun called with selected:",e),e){if(!this.selectionRing){const t=this.sunMetadata.radius*10;console.log("[SolarSystem DEBUG] Création anneau soleil:"),console.log(`  - Sun metadata radius: ${this.sunMetadata.radius}`),console.log(`  - Sun scaled radius: ${t}`),console.log(`  - Ring innerRadius: ${t*1.3}`),console.log(`  - Paramètres corrects passés: innerRadius=${t*1.3}, thickness=0.05, color=0xffffff`),this.selectionRing=new ta(t*1.3,.05,16777215,1),this.selectionRing.setPosition(this.sunMesh.position),this.group.add(this.selectionRing.getMesh())}}else this.selectionRing&&(this.group.remove(this.selectionRing.getMesh()),this.selectionRing.dispose(),this.selectionRing=null)}getGroup(){return this.group}getMesh(){return this.group}getMetadata(){return this.sunMetadata}getSunMesh(){return this.sunMesh}getPlanets(){return this.planets}selectPlanet(e,t){const n=this.planets.find(i=>i.id===e);if(n&&(t&&!this.selectedPlanetRing&&(this.selectedPlanetRing=new ta(n.radius*2,n.radius*.3,65280,.8),this.group.add(this.selectedPlanetRing.getMesh())),this.selectedPlanetRing))if(t){const i=n.mesh.position;this.selectedPlanetRing.getMesh().position.set(i.x,i.y,i.z),this.selectedPlanetRing.getMesh().visible=!0}else this.selectedPlanetRing.getMesh().visible=!1}dispose(){this.sunMesh.geometry.dispose(),this.sunMesh.material.dispose(),this.selectionRing&&this.selectionRing.dispose(),this.selectedPlanetRing&&this.selectedPlanetRing.dispose(),this.planets.forEach(e=>{e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.orbitLine.geometry.dispose(),e.orbitLine.material.dispose()}),this.group.clear()}}class zr{static getGLSLNoiseFunction(){return`
      // === Simplex Noise 3D (Ashima Arts) ===
      // Retourne valeur [-1, 1] pour position 3D donnée
      
      vec3 mod289(vec3 x) { 
        return x - floor(x * (1.0 / 289.0)) * 289.0; 
      }
      
      vec4 mod289(vec4 x) { 
        return x - floor(x * (1.0 / 289.0)) * 289.0; 
      }
      
      vec4 permute(vec4 x) { 
        return mod289(((x * 34.0) + 1.0) * x); 
      }
      
      vec4 taylorInvSqrt(vec4 r) { 
        return 1.79284291400159 - 0.85373472095314 * r; 
      }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // Premier coin (base grille simplexe)
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        // Autres coins (ordonnancement basé sur x0)
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        // Permutations
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        // Gradients (calcul optimisé)
        float n_ = 0.142857142857; // 1.0 / 7.0
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        // Normalisation
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; 
        p1 *= norm.y; 
        p2 *= norm.z; 
        p3 *= norm.w;
        
        // Mix contributions (kernel simplex)
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      // === FBM (Fractional Brownian Motion) ===
      // Superpose plusieurs octaves de noise pour détails multi-échelle
      // Paramètres:
      // - octaves: nombre couches (plus = plus détails, mais plus coûteux)
      // - lacunarity: facteur fréquence (typique: 2.0)
      // - gain: facteur amplitude (typique: 0.5 = diminution moitié par octave)
      float fbm(vec3 p, int octaves, float lacunarity, float gain) {
        float sum = 0.0;
        float amplitude = 1.0;
        float frequency = 1.0;
        
        // Boucle manuelle (GLSL ES 1.0 incompatible avec boucles dynamiques)
        for(int i = 0; i < 8; i++) {
          if(i >= octaves) break;
          sum += amplitude * snoise(p * frequency);
          amplitude *= gain;
          frequency *= lacunarity;
        }
        
        return sum;
      }
    `}static getGLSLBiomeColors(e){switch(e){case"telluric":return`
          // === Biomes Telluriques (type Terre) ===
          vec3 getBiomeColor(float height, float moisture) {
            // Océans profonds (height < 0.3)
            if(height < 0.3) {
              vec3 deepOcean = vec3(0.0, 0.1, 0.3);
              vec3 shallowOcean = vec3(0.0, 0.3, 0.5);
              return mix(deepOcean, shallowOcean, height / 0.3);
            }
            
            // Plages sable (height 0.3-0.35)
            if(height < 0.35) {
              return vec3(0.8, 0.7, 0.5);
            }
            
            // Végétation (height 0.35-0.7) selon moisture
            if(height < 0.7) {
              vec3 forest = vec3(0.1, 0.4, 0.1);  // Forêts denses
              vec3 plains = vec3(0.4, 0.5, 0.2);  // Plaines herbacées
              return mix(plains, forest, moisture);
            }
            
            // Montagnes rocheuses (height 0.7-0.85)
            if(height < 0.85) {
              return vec3(0.4, 0.3, 0.2);
            }
            
            // Neige sommets (height > 0.85)
            return vec3(0.9, 0.9, 0.95);
          }
        `;case"desert":return`
          // === Biomes Désertiques (type Mars) ===
          vec3 getBiomeColor(float height, float moisture) {
            vec3 sand = vec3(0.8, 0.7, 0.5);      // Sable clair
            vec3 rock = vec3(0.5, 0.4, 0.3);      // Rochers sombres
            vec3 dune = vec3(0.9, 0.75, 0.55);    // Dunes hautes
            
            // Mix selon height (rochers bas, dunes hautes)
            // moisture ajoute variation texture
            return mix(mix(sand, rock, height), dune, moisture * 0.5);
          }
        `;case"ice":return`
          // === Biomes Glacés (type Europa) ===
          vec3 getBiomeColor(float height, float moisture) {
            vec3 ice = vec3(0.8, 0.9, 1.0);        // Glace bleutée
            vec3 snow = vec3(0.95, 0.95, 0.98);    // Neige pure
            vec3 crevasse = vec3(0.6, 0.7, 0.8);   // Crevasses sombres
            
            // Crevasses dans zones basses (height faible)
            // Neige pure zones hautes (moisture élevée)
            return mix(mix(ice, crevasse, height * 0.5), snow, moisture);
          }
        `;case"gas":return`
          // === Bandes Atmosphériques (type Jupiter) ===
          vec3 getBiomeColor(float height, float moisture) {
            // Trois bandes colorées cycliques
            vec3 band1 = vec3(1.0, 0.6, 0.3);   // Orange clair
            vec3 band2 = vec3(0.9, 0.5, 0.2);   // Rouge-orange
            vec3 band3 = vec3(1.0, 0.7, 0.4);   // Jaune-orange
            
            // Index bande cyclique (5 répétitions sur sphere)
            // moisture ajoute turbulence
            float bandIndex = fract(height * 5.0 + moisture * 2.0);
            
            if(bandIndex < 0.33) {
              return mix(band1, band2, bandIndex * 3.0);
            }
            if(bandIndex < 0.66) {
              return mix(band2, band3, (bandIndex - 0.33) * 3.0);
            }
            return mix(band3, band1, (bandIndex - 0.66) * 3.0);
          }
        `;default:return`
          // === Fallback (type inconnu) ===
          vec3 getBiomeColor(float height, float moisture) {
            return vec3(0.5, 0.5, 0.5); // Gris neutre
          }
        `}}}class ag{group;lodGroup;geometries=[];materials=[];meshes=[];planetRef;createProceduralMaterial(e){const t=e.seed%1e4/1e4,n=`
            ${zr.getGLSLNoiseFunction()}

            uniform float seed;
            uniform float radius;
            uniform float displacementScale;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vHeight;
            
            void main() {
                vPosition = position;
                vNormal = normal;
                
                // Générer heightmap via FBM (5 octaves, lacunarity 2.0, gain 0.5)
                // Position normalisée pour cohérence sphérique
                vec3 noisePos = normalize(position) * seed * 10.0;
                float height = fbm(noisePos, 5, 2.0, 0.5);
                
                // Normaliser height [-1,1] -> [0,1]
                height = (height + 1.0) * 0.5;
                vHeight = height;
                
                // Appliquer displacement le long des normales (CRITÈRE SPHÉRICITÉ)
                // Préserve la forme sphérique en déplaçant radialement
                vec3 displacedPosition = position + normal * height * displacementScale;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
            }
        `,i=`
            ${zr.getGLSLNoiseFunction()}
            ${zr.getGLSLBiomeColors(e.type)}

            uniform float seed;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vHeight;
            
            void main() {
                // Générer moisture map (humidité) via noise secondaire
                // Seed différent pour décorrélation height/moisture
                vec3 moisturePos = normalize(vPosition) * seed * 15.0;
                float moisture = fbm(moisturePos, 3, 2.0, 0.5);
                
                // Normaliser moisture [-1,1] -> [0,1]
                moisture = (moisture + 1.0) * 0.5;
                
                // Calculer couleur biome (adapté au type planète)
                vec3 baseColor = getBiomeColor(vHeight, moisture);
                
                // Lighting simple (diffuse Lambert)
                // Direction lumière fixe (soleil au centre système)
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                float diff = max(dot(vNormal, lightDir), 0.0);
                
                // Terme ambient (0.3) + diffuse (0.7)
                vec3 finalColor = baseColor * (0.3 + 0.7 * diff);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `,r=e.radius*.05;return new fn({uniforms:{seed:{value:t},radius:{value:e.radius},displacementScale:{value:r}},vertexShader:n,fragmentShader:i,lights:!1})}constructor(e){this.planetRef=e,this.group=new $t,this.group.name=`PlanetSurface_${e.name}`,this.lodGroup=new Om,this.lodGroup.name=`Planet_${e.name}_LOD`;const t=[{segments:128,distance:e.radius*2},{segments:64,distance:e.radius*5},{segments:32,distance:e.radius*10},{segments:16,distance:e.radius*20}],n=this.createProceduralMaterial(e);this.materials.push(n),t.forEach((i,r)=>{const o=new Kn(e.radius,i.segments,i.segments);this.geometries.push(o);const a=new nt(o,n);a.name=`Planet_${e.name}_LOD${r}`,a.castShadow=!0,a.receiveShadow=!0,this.meshes.push(a),this.lodGroup.addLevel(a,i.distance)}),this.group.add(this.lodGroup),console.log(`[PlanetSurface] Created ${e.name} with procedural textures (Phase 2.3):`,{type:e.type,radius:e.radius,seed:e.seed,displacementScale:(e.radius*.05).toFixed(2),lodLevels:t.length,lod0:`${t[0].segments}×${t[0].segments} (< ${t[0].distance.toFixed(1)} units)`,lod1:`${t[1].segments}×${t[1].segments} (< ${t[1].distance.toFixed(1)} units)`,lod2:`${t[2].segments}×${t[2].segments} (< ${t[2].distance.toFixed(1)} units)`,lod3:`${t[3].segments}×${t[3].segments} (< ${t[3].distance.toFixed(1)} units)`})}getGroup(){return this.group}getPlanetReference(){return this.planetRef}update(e){this.group.rotation.y+=e*.1}updateLOD(e){this.lodGroup.update(e)}getCurrentLODLevel(){return this.lodGroup.getCurrentLevel()}dispose(){this.geometries.forEach(e=>e.dispose()),this.geometries=[],this.materials.forEach(e=>e.dispose()),this.materials=[],this.meshes=[],this.lodGroup.clear(),this.group.clear(),console.log(`[PlanetSurface] Disposed ${this.planetRef.name} (LOD system cleaned)`)}}class og{scene;galaxyGroup;currentSolarSystem=null;currentPlanetSurface=null;currentView="GALAXY";camera=null;constructor(e,t){this.scene=e,this.galaxyGroup=t,this.galaxyGroup.visible=!0}setView(e,t){const n=this.hasSystemChanged(t),i=this.hasPlanetChanged(t);if(!(e===this.currentView&&!n&&!i))switch(this.currentView=e,e){case"GALAXY":this.showGalaxyView();break;case"SYSTEM":this.showSystemView(t);break;case"PLANET":this.showPlanetView(t);break}}hasSystemChanged(e){return e.currentSystem?this.currentSolarSystem?e.currentSystem.metadata.id!==this.currentSolarSystem.getMetadata().id:!0:this.currentSolarSystem!==null}hasPlanetChanged(e){return e.currentPlanet?this.currentPlanetSurface?e.currentPlanet.id!==this.currentPlanetSurface.getPlanetReference().id:!0:this.currentPlanetSurface!==null}showGalaxyView(){this.galaxyGroup.visible=!0,this.disposePlanetSurface(),this.disposeSolarSystem()}showSystemView(e){this.galaxyGroup.visible=!1,this.disposePlanetSurface(),e.currentSystem?this.ensureSolarSystem(e.currentSystem.metadata):(console.warn("[ViewEntitiesManager] Vue SYSTEM sans currentSystem défini"),this.disposeSolarSystem())}showPlanetView(e){this.galaxyGroup.visible=!1,e.currentSystem&&this.ensureSolarSystem(e.currentSystem.metadata),e.currentPlanet?this.ensurePlanetSurface(e.currentPlanet):(console.warn("[ViewEntitiesManager] Vue PLANET sans currentPlanet défini"),this.disposePlanetSurface())}ensureSolarSystem(e){if(this.currentSolarSystem&&this.currentSolarSystem.getMetadata().id===e.id){this.currentSolarSystem.getGroup().visible=!0;return}this.disposeSolarSystem(),console.log(`[ViewEntitiesManager] Création SolarSystem: ${e.name}`),this.currentSolarSystem=new rg(e),this.scene.add(this.currentSolarSystem.getGroup())}ensurePlanetSurface(e){if(this.currentPlanetSurface&&this.currentPlanetSurface.getPlanetReference().id===e.id){this.currentPlanetSurface.getGroup().visible=!0;return}this.disposePlanetSurface(),console.log(`[ViewEntitiesManager] Création PlanetSurface: ${e.name}`),this.currentPlanetSurface=new ag(e);const t=this.currentPlanetSurface.getGroup();t.position.set(e.position.x,e.position.y,e.position.z);const n=new ua(e.radius*2);n.position.set(0,0,0),t.add(n),console.log(`[ViewEntitiesManager] AxesHelper ajouté à l'origine de PlanetSurface (taille: ${(e.radius*2).toFixed(2)})`),this.scene.add(t)}disposeSolarSystem(){this.currentSolarSystem&&(console.log(`[ViewEntitiesManager] Dispose SolarSystem: ${this.currentSolarSystem.getMetadata().name}`),this.scene.remove(this.currentSolarSystem.getGroup()),this.currentSolarSystem.dispose(),this.currentSolarSystem=null)}disposePlanetSurface(){this.currentPlanetSurface&&(console.log(`[ViewEntitiesManager] Dispose PlanetSurface: ${this.currentPlanetSurface.getPlanetReference().name}`),this.scene.remove(this.currentPlanetSurface.getGroup()),this.currentPlanetSurface.dispose(),this.currentPlanetSurface=null)}getSolarSystem(){return this.currentSolarSystem}getPlanetSurface(){return this.currentPlanetSurface}getCurrentView(){return this.currentView}setCamera(e){this.camera=e}update(e,t){this.currentSolarSystem&&(this.currentView==="SYSTEM"||this.currentView==="PLANET")&&this.currentSolarSystem.update(e),this.currentPlanetSurface&&this.currentView==="PLANET"&&(this.currentPlanetSurface.update(e),this.camera&&this.currentPlanetSurface.updateLOD(this.camera))}dispose(){this.disposePlanetSurface(),this.disposeSolarSystem(),this.camera=null,console.log("[ViewEntitiesManager] Disposed")}}function lg(){return{currentView:"GALAXY",currentSystem:null,currentPlanet:null,navigationHistory:[],currentOptimalDistance:null}}class cg{state;viewChangeCallbacks=[];constructor(){this.state=lg()}getCurrentView(){return this.state.currentView}getCurrentSystem(){return this.state.currentSystem}setGalaxySelection(e){if(this.state.currentView!=="GALAXY"){console.warn("[NavigationManager] setGalaxySelection ignored (not in GALAXY view)");return}this.state.currentSystem=e,this.state.currentOptimalDistance=e?e.metadata.optimalDistance:null}getNavigationHistory(){return this.state.navigationHistory}setViewMode(e,t){if(e==="SYSTEM"&&!t){console.error("[NavigationManager] SYSTEM mode requires a SystemReference");return}this.state.currentView==="SYSTEM"&&this.state.currentSystem&&(this.state.exitContext={fromView:"SYSTEM",exitedSystem:this.state.currentSystem}),this.state.currentView=e,e==="GALAXY"?this.state.currentOptimalDistance=null:e==="SYSTEM"&&t&&(this.state.currentSystem=t),this.notifyViewChange(e)}enterSystem(e){if(!e||!e.metadata){console.error("[NavigationManager] Invalid SystemReference (missing metadata)",e);return}this.state.currentView==="SYSTEM"&&this.state.currentSystem&&this.state.navigationHistory.push(this.state.currentSystem),this.setViewMode("SYSTEM",e),this.state.currentOptimalDistance=e.metadata.optimalDistance,console.log(`[NavigationManager] Entered system: ${e.metadata.id} (optimalDistance: ${e.metadata.optimalDistance.toFixed(1)})`,{historyDepth:this.state.navigationHistory.length})}exitSystemToHistory(){if(this.state.navigationHistory.length===0)return!1;const e=this.state.navigationHistory.pop();return this.state.currentSystem=e,this.state.currentView="SYSTEM",this.notifyViewChange("SYSTEM"),console.log(`[NavigationManager] Returned to previous system: ${e.metadata.id}`,{historyRemaining:this.state.navigationHistory.length}),!0}exitSystem(){if(this.state.currentView!=="SYSTEM")return console.warn("[NavigationManager] exitSystem called but not in SYSTEM view"),null;const e=this.state.currentSystem;return this.setViewMode("GALAXY"),this.state.currentOptimalDistance=null,console.log(`[NavigationManager] Exited system: ${e?.metadata.id}`,{historyRemaining:this.state.navigationHistory.length}),e}enterPlanet(e){if(this.state.currentView!=="SYSTEM"){console.warn("[NavigationManager] enterPlanet only allowed from SYSTEM view");return}if(!e||!e.id||!e.name){console.error("[NavigationManager] Invalid PlanetReference",e);return}this.state.currentView="PLANET",this.state.currentPlanet=e;const t=e.radius*2.5;this.state.currentOptimalDistance=t,console.log(`[NavigationManager] Entering planet: ${e.name} (radius: ${e.radius.toFixed(1)}, optimalDistance: ${t.toFixed(1)})`),this.notifyViewChange("PLANET")}exitPlanet(){if(this.state.currentView!=="PLANET"){console.warn("[NavigationManager] exitPlanet only from PLANET view");return}const e=this.state.currentPlanet;this.state.currentView="SYSTEM",this.state.currentPlanet=null,this.state.currentSystem&&(this.state.currentOptimalDistance=this.state.currentSystem.metadata.optimalDistance),console.log(`[NavigationManager] Exiting planet: ${e?.name||"unknown"}, returning to system: ${this.state.currentSystem?.metadata.name||"unknown"}`),this.notifyViewChange("SYSTEM")}setSystemSelection(e){if(this.state.currentView!=="SYSTEM"){console.warn("[NavigationManager] setSystemSelection ignored (not in SYSTEM view)");return}this.state.currentPlanet=e,console.log(`[NavigationManager] Planet selection: ${e?e.name:"cleared"}`)}getCurrentPlanet(){return this.state.currentPlanet}getState(){return this.state}onViewChange(e){this.viewChangeCallbacks.push(e)}notifyViewChange(e){this.viewChangeCallbacks.forEach(t=>t(e))}}class ug{points;rotationSpeed=5e-4;constructor(e=5e3){const t=new yt,n=new Float32Array(e*3);for(let r=0;r<e*3;r++)n[r]=(Math.random()-.5)*2e3;t.setAttribute("position",new Ot(n,3));const i=new nc({color:16777215,size:.7,transparent:!0,opacity:.8,sizeAttenuation:!0});this.points=new km(t,i)}getMesh(){return this.points}update(e){this.points.rotation.y+=this.rotationSpeed*e*60}assignStarIds(){const e=this.points.geometry.attributes.position;for(let t=0;t<e.count;t++){const n=new ot;n.position.set(e.getX(t),e.getY(t),e.getZ(t)),n.userData.id=t,this.points.add(n)}}}class hg{group;labelsGroup;clusterSize;spacing;MAX_LABEL_DISTANCE=50;hoveredCubeName=null;selectedCubeName=null;selectedSun=null;selectionRing=null;pickMeshes=[];pickGroup;suns=[];sunMetadata=new Map;DEFAULT_COLOR=16777215;SELECT_COLOR=26367;HOVER_COLOR=16750848;constructor(e=1){this.group=new $t,this.labelsGroup=new $t,this.group.add(this.labelsGroup),this.pickGroup=new $t,this.clusterSize=Qm.cubesX,this.spacing=e;const t=new ei(1,1,1),n=new Wm(t),i=new Ji({color:16777215});console.log("[ClusterGrid] Matériau de base créé:",{transparent:i.transparent,depthWrite:i.depthWrite,depthTest:i.depthTest});for(let r=0;r<this.clusterSize;r++)for(let o=0;o<this.clusterSize;o++){const a=new Ji({color:this.DEFAULT_COLOR,transparent:!0,opacity:.3,depthWrite:!1,depthTest:!0}),l=new Os(n,a);console.log(`[ClusterGrid] Matériau individu cube ${l.name}:`,{transparent:a.transparent,depthWrite:a.depthWrite,depthTest:a.depthTest,opacity:a.opacity});const c=this.getPosFromCoords(0,0,r,o);l.position.copy(c);const u=0*this.clusterSize+r,h=0*this.clusterSize+o;l.name=`C[${u}:${h}]`,console.log(`[ClusterGrid] Cube ${l.name} créé à la position:`,c),this.group.add(l);const p=new Qt({visible:eg.showPickMeshes,color:16711935,transparent:!0,opacity:.3,side:Wt}),m=new nt(t,p);m.position.copy(c),m.name=l.name,this.pickMeshes.push(m),this.pickGroup.add(m);const g=this.getSunsCountForCluster(u,h);this.generateSuns(u,h,g)}}getPickObjects(){return this.pickMeshes}getPickGroup(){return this.pickGroup}getSuns(){return this.suns}getSunMetadataFromMesh(e){const t=e.name;return this.sunMetadata.get(t)||null}getOptimalZoomDistance(e){const t=this.getSunMetadataFromMesh(e);if(!t)return 2;const n=2,i=Math.max(.5,Math.min(3,t.radius*200)),r=Math.max(.8,Math.min(2,Math.log10(t.mass+1)));return n*i*r}getSunMeshById(e){return this.suns.find(t=>t.name===e)||null}getSystemReference(e){const t=this.sunMetadata.get(e),n=this.getSunMeshById(e);return!t||!n?(console.warn(`[ClusterGrid] Impossible de construire SystemReference: sunId="${e}", metadata=${!!t}, mesh=${!!n}`),null):{metadata:t,sunMesh:n,pickMesh:n}}getPosFromCoords(e,t,n,i){const r=(e*this.clusterSize+n-(this.clusterSize/2-.5))*this.spacing,o=(t*this.clusterSize+i-(this.clusterSize/2-.5))*this.spacing;return new R(r,0,o)}getTotalDimensions(){const e=(this.clusterSize-1)*this.spacing,t=1,n=(this.clusterSize-1)*this.spacing;return{width:e,height:t,depth:n}}getIdFromPos(e){const t=this.getCoordsFromPos(e);return`C[${t.cx}:${t.cz}]-L[${t.lx}]-C[${t.lz}]`}getCoordsFromPos(e){const t=this.clusterSize,n=this.spacing,i=Math.floor(e.x/n+t/2),r=Math.floor(e.z/n+t/2),o=Math.floor(i/t),a=Math.floor(r/t),l=(i%t+t)%t,c=(r%t+t)%t;return{cx:o,cz:a,lx:l,lz:c}}getClusterIdFromName(e){return e}getGlobalCoordsFromName(e){if(!e)return null;const t=e.match(/^C\[(\-?\d+):(\-?\d+)\]$/);if(!t)return null;const n=parseInt(t[1],10),i=parseInt(t[2],10);return Number.isNaN(n)||Number.isNaN(i)?null:{gx:n,gz:i}}selectSun(e){if(this.selectedSun!==e&&(this.selectionRing&&(this.group.remove(this.selectionRing.getMesh()),this.selectionRing=null),this.selectedSun=e,e)){const t=this.getSunMetadataFromMesh(e),n=t?.radius||.01;this.selectionRing=new ta(n*1.3,.05,t?.color||65280,.8),this.selectionRing.setPosition(e.position),this.group.add(this.selectionRing.getMesh()),t&&console.log("⭐ Soleil sélectionné:",{nom:t.name,id:t.id,position:t.absolutePosition,taille:`${(t.radius*1e3).toFixed(2)}km`,masse:t.mass.toFixed(2),temperature:Math.round(t.temperature)+"K",cluster:t.clusterId})}}updateSelectionRing(e){this.selectionRing&&this.selectionRing.updateRotation(e)}getSunMetadata(e){return this.sunMetadata.get(e)||null}getAllSunMetadata(){return Array.from(this.sunMetadata.values())}generateSunName(e,t,n){const i=["Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu"],r=["Orion","Lyra","Cygnus","Andromeda","Pegasus","Aquila","Vulpecula","Lacerta","Scutum","Sagitta","Delphinus","Equuleus"],o=i[(e+50)%i.length],a=r[(t+50)%r.length],l=String.fromCharCode(65+n%26);return`${o}-${a}-${l}`}selectCubeByName(e){this.selectedCubeName!==e&&(this.selectedCubeName=e,this.group.children.forEach(t=>{if(!(t instanceof Os))return;const n=t.name||"",i=t.material;if(e&&n===e)i.color.setHex(this.SELECT_COLOR),i.opacity=1;else{const r=this.hoveredCubeName?n===this.hoveredCubeName:!1;i.color.setHex(r?this.HOVER_COLOR:this.DEFAULT_COLOR),i.opacity=r?1:.3}}))}setHoverCubeByName(e){this.hoveredCubeName!==e&&(this.hoveredCubeName=e,this.group.children.forEach(t=>{if(!(t instanceof Os))return;const n=t.name||"",i=t.material;if(this.selectedCubeName===n){i.color.setHex(this.SELECT_COLOR),i.opacity=1;return}e&&n===e?(i.color.setHex(this.HOVER_COLOR),i.opacity=1):(i.color.setHex(this.DEFAULT_COLOR),i.opacity=.3)}))}update(e,t){this.updateSelectionRing(e),t&&this.labelsGroup.children.forEach(n=>{if(n instanceof Fm){const i=n.position.distanceTo(t);if(i>this.MAX_LABEL_DISTANCE)n.visible=!1;else{n.visible=!0;const r=1-i/this.MAX_LABEL_DISTANCE;n.material.opacity=Math.max(0,r)}}})}getSunsCountForCluster(e,t){return Math.floor(Math.random()*16)+5}generateSuns(e,t,n){const i=this.getPosFromCoords(0,0,e,t),r=this.spacing/2,o=i.x-r,a=i.x+r,l=i.z-r,c=i.z+r,u=[16776960,16766720,16753920,16761035,16777215];for(let h=0;h<n;h++){const p=.005+Math.random()*.015,m=new Kn(p,8,8),g=Math.floor(Math.random()*u.length),y=new Qt({color:u[g]}),f=new nt(m,y),d=o+Math.random()*(a-o),E=(Math.random()-.5)*this.spacing,x=l+Math.random()*(c-l);f.position.set(d,E,x);const w=`SUN_${e}_${t}_${h}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,L=this.generateSunName(e,t,h),C=Math.pow(p*100,3),T=3e3+Math.random()*5e3,U={id:w,name:L,globalCoords:{gx:e,gz:t},localPosition:{x:f.position.x-i.x,y:f.position.y,z:f.position.z-i.z},absolutePosition:{x:d,y:E,z:x},radius:p,mass:C,temperature:T,color:u[g],createdAt:Date.now(),clusterId:`C[${e}:${t}]`,optimalDistance:2};U.optimalDistance=this.getOptimalZoomDistance(f),f.name=w,f.userData={metadata:U},this.suns.push(f),this.sunMetadata.set(w,U),this.group.add(f),console.log("[ClusterGrid] Soleil généré:",{id:w,name:L,position:{x:d.toFixed(3),y:E.toFixed(3),z:x.toFixed(3)},radius:p.toFixed(4),mass:C.toFixed(2),temperature:Math.round(T)+"K",clusterId:U.clusterId})}}getMesh(){return this.group}}class dg{axesHelper;constructor(e=5){this.axesHelper=new ua(e);const t=this.axesHelper.material,n=Array.isArray(t)?t:[t];n.length>=3&&(n[0].color.setHex(16711680),n[1].color.setHex(65280),n[2].color.setHex(255),n[0].transparent=!0,n[1].transparent=!0,n[2].transparent=!0,n[0].opacity=.7,n[1].opacity=.7,n[2].opacity=.7)}getMesh(){return this.axesHelper}update(e,t){if(!t)return;const n=t.length(),i=Math.max(.2,Math.min(.8,20/n)),r=this.axesHelper.material,o=Array.isArray(r)?r:[r];o.length>=3&&(o[0].opacity=i,o[1].opacity=i,o[2].opacity=i)}setVisible(e){this.axesHelper.visible=e}setPosition(e,t,n){this.axesHelper.position.set(e,t,n)}}const na=2,fg=4*3+4+1+1+1;function pg(s,e){const t=new Int32Array(s,0,na);let n=na*4;const i=new Float32Array(s,n,e);n+=e*4;const r=new Float32Array(s,n,e);n+=e*4;const o=new Float32Array(s,n,e);n+=e*4;const a=new Float32Array(s,n,e);n+=e*4;const l=new Uint8Array(s,n,e);n+=e;const c=new Uint8Array(s,n,e);n+=e;const u=new Uint8Array(s,n,e);return{control:t,posX:i,posY:r,posZ:o,rotation:a,type:l,owner:c,active:u}}class mg{buffer;maxUnits;control;posX;posY;posZ;rotation;type;owner;active;constructor(e=1e4){console.log("[MemoryManager] Initialisation..."),this.maxUnits=e;const n=na*4+e*fg;try{this.buffer=new SharedArrayBuffer(n),console.log("[MemoryManager] SharedArrayBuffer créé avec succès. Taille:",n)}catch(r){throw console.error("[MemoryManager] Erreur lors de la création de SharedArrayBuffer:",r),r}const i=pg(this.buffer,e);this.control=i.control,this.posX=i.posX,this.posY=i.posY,this.posZ=i.posZ,this.rotation=i.rotation,this.type=i.type,this.owner=i.owner,this.active=i.active}}class gg{memory;mesh;tempObj;constructor(e){this.memory=e;const t=new ei(.6,.6,.6),n=new ic({color:65484});this.mesh=new Gm(t,n,this.memory.maxUnits),this.mesh.instanceMatrix.setUsage(_u),this.mesh.count=0,this.tempObj=new ot}getMesh(){return this.mesh}update(e){const{posX:t,posY:n,posZ:i,active:r}=this.memory;let o=0;for(let a=0;a<this.memory.maxUnits;a++)r[a]===1&&(this.tempObj.position.set(t[a],n[a],i[a]),this.tempObj.rotation.set(0,0,0),this.tempObj.updateMatrix(),this.mesh.setMatrixAt(o,this.tempObj.matrix),o++);this.mesh.count=o,this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),Array.isArray(this.mesh.material)?this.mesh.material.forEach(e=>e.dispose()):this.mesh.material.dispose()}}class _g{helpPanel;infoPanel;debugPanel;logPanel;logMessages=[];maxLogMessages=10;constructor(){this.createHelpPanel(),this.createInfoPanel(),this.createDebugPanel(),this.createLogPanel(),this.createDevPanel()}createDevPanel(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ff00ff;
            z-index: 1000;
            display: flex;
            gap: 10px;
        `;const t=document.createElement("button");t.textContent="Entrer dans le système solaire",t.style.cssText=`
            background: #333;
            color: #fff;
            border: 1px solid #666;
            padding: 5px 10px;
            cursor: pointer;
            font-family: monospace;
        `,t.onmouseover=()=>t.style.background="#444",t.onmouseout=()=>t.style.background="#333",t.id="btn-enter-system",e.appendChild(t),document.body.appendChild(e)}onEnterSystem(e){const t=document.getElementById("btn-enter-system");t&&(t.onclick=()=>e(this))}setEnterSystemButtonVisible(e){const t=document.getElementById("btn-enter-system");t&&(t.style.display=e?"block":"none")}createHelpPanel(){this.helpPanel=document.createElement("div"),this.helpPanel.id="camera-help",this.helpPanel.style.cssText=`
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-width: 280px;
            border: 2px solid #00ff00;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `,this.helpPanel.innerHTML=`
            <div style="margin-bottom: 10px; font-weight: bold; color: #ffffff;">🎮 CONTRÔLES CAMÉRA</div>
            <div style="line-height: 1.6;">
                <div>🖱️ <strong>Molette:</strong> Zoom</div>
                <div>🖱️ <strong>Clic gauche + glisser:</strong> Rotation</div>
                <div>🖱️ <strong>Clic droit + glisser:</strong> Déplacement</div>
                <div>⌨️ <strong>W/A/S/D:</strong> Déplacement</div>
                <div>⌨️ <strong>R:</strong> Position optimale</div>
                <div>🎯 <strong>Survol:</strong> Highlight cube</div>
                <div style="margin-top: 8px; font-size: 10px; color: #ffaaaa;">🔴X 🔴 <span style="color: #00ff00;">Y</span> 🔵Z - Repère 3D</div>
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #00ff00;">
                <div style="margin-bottom: 8px; font-weight: bold; color: #ffffff;">🌟 NAVIGATION</div>
                <div style="line-height: 1.6; font-size: 11px;">
                    <div>⌨️ <strong>Entrée:</strong> Entrer dans un système</div>
                    <div>🖱️ <strong>Double-clic:</strong> Entrer dans un système</div>
                    <div>⌨️ <strong>Échap:</strong> Retour à la galaxie</div>
                </div>
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #00ff00; font-size: 10px; opacity: 0.8;">
                Sélectionnez un soleil (⭐) et appuyez sur <strong>Entrée</strong> ou <strong>double-cliquez</strong> pour explorer
            </div>
        `,document.body.appendChild(this.helpPanel)}createInfoPanel(){this.infoPanel=document.createElement("div"),this.infoPanel.id="cluster-info",this.infoPanel.style.cssText=`
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 10px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            border: 1px solid #00ff00;
            z-index: 1000;
            min-width: 200px;
            backdrop-filter: blur(5px);
        `,this.updateClusterInfo({clusters:1,cubes:100,size:"10x10"}),document.body.appendChild(this.infoPanel)}updateClusterInfo(e){this.infoPanel.innerHTML=`
            <div style="margin-bottom: 8px; font-weight: bold; color: #ffffff;">📊 GALAXIE</div>
            <div style="line-height: 1.5;">
                <div>🌌 Clusters d'étoiles: <span style="color: #ffff00;">${e.cubes}</span></div>
                <div>📦 Régions (clusters): <span style="color: #ffff00;">${e.clusters}</span></div>
                <div>📏 Taille: <span style="color: #ffff00;">${e.size}</span></div>
                <div style="margin-top:6px;">🔎 Sélection: <span id="selected-cluster" style="color:#00ffff;">-</span></div>
            </div>
        `}updateSelectedCluster(e,t){const n=document.getElementById("selected-cluster");n&&(e&&t?n.textContent=`C[${t.gx}:${t.gz}]`:n.textContent=e||"-")}updateSelectedSun(e){const t=document.getElementById("selected-cluster");t&&(e?t.textContent=`${e.name} (${e.clusterId})`:t.textContent="-"),this.updateSunDetailsPanel(e)}updateSelectedPlanet(e){e?this.updatePlanetDetailsPanel(e):this.hidePlanetDetailsPanel()}updatePlanetDetailsPanel(e){let t=document.getElementById("planet-details-panel");t||(t=document.createElement("div"),t.id="planet-details-panel",t.style.cssText=`
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: rgba(0, 20, 40, 0.95);
                border: 2px solid #4fc3f7;
                border-radius: 8px;
                padding: 20px;
                color: #fff;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                min-width: 280px;
                box-shadow: 0 4px 20px rgba(79, 195, 247, 0.3);
                z-index: 1000;
            `,document.body.appendChild(t));const n="#"+e.color.toString(16).padStart(6,"0"),i=(e.distance*100).toFixed(2),r=(e.radius*1e4).toFixed(0),o=(2*Math.PI/e.speed).toFixed(1),a=(e.angle*180/Math.PI).toFixed(1);t.innerHTML=`
            <h3 style="margin: 0 0 15px 0; color: #4fc3f7; font-size: 18px; border-bottom: 1px solid #4fc3f7; padding-bottom: 8px;">
                🪐 Planète ${e.id}
            </h3>
            <div style="line-height: 1.8;">
                <div><strong>Distance orbitale:</strong> ${i} UA</div>
                <div><strong>Rayon:</strong> ${r} km</div>
                <div><strong>Vitesse orbitale:</strong> ${e.speed.toFixed(3)} rad/s</div>
                <div><strong>Période orbitale:</strong> ${o}s</div>
                <div><strong>Position orbitale:</strong> ${a}°</div>
                <div style="margin-top: 10px;">
                    <strong>Couleur:</strong>
                    <span style="display: inline-block; width: 20px; height: 20px; background: ${n}; border: 1px solid #fff; vertical-align: middle; margin-left: 8px;"></span>
                    <span style="margin-left: 8px;">${n}</span>
                </div>
            </div>
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(79, 195, 247, 0.3); font-size: 12px; color: #aaa;">
                Cliquez ailleurs pour désélectionner
            </div>
        `,t.style.display="block"}hidePlanetDetailsPanel(){const e=document.getElementById("planet-details-panel");e&&(e.style.display="none")}updateSunDetailsPanel(e){let t=document.getElementById("sun-details-panel");if(!e){t&&(t.style.display="none");return}t||(t=document.createElement("div"),t.id="sun-details-panel",t.style.cssText=`
                position: fixed;
                bottom: 10px;
                left: 220px;
                background: rgba(0, 0, 0, 0.9);
                color: #ffff00;
                padding: 12px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 11px;
                border: 2px solid #ffff00;
                z-index: 1000;
                min-width: 280px;
                backdrop-filter: blur(5px);
            `,document.body.appendChild(t)),t.style.display="block";const n=(e.radius*1e3).toFixed(2),i=e.mass.toFixed(2),r=Math.round(e.temperature)+"K",o=`${e.absolutePosition.x.toFixed(2)}, ${e.absolutePosition.y.toFixed(2)}, ${e.absolutePosition.z.toFixed(2)}`;t.innerHTML=`
            <div style="margin-bottom: 10px; font-weight: bold; color: #ffffff;">⭐ SOLEIL SÉLECTIONNÉ</div>
            <div style="line-height: 1.4;">
                <div><strong>Nom:</strong> <span style="color: #00ffff;">${e.name}</span></div>
                <div><strong>ID:</strong> <span style="color: #cccccc;">${e.id.substring(0,20)}...</span></div>
                <div><strong>Cluster:</strong> <span style="color: #00ff00;">${e.clusterId}</span></div>
                <div><strong>Taille:</strong> <span style="color: #ffaa00;">${n} km</span></div>
                <div><strong>Masse:</strong> <span style="color: #ffaa00;">${i}</span></div>
                <div><strong>Température:</strong> <span style="color: #ff6600;">${r}</span></div>
                <div><strong>Position:</strong> <span style="color: #666666;">${o}</span></div>
                <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #ffff00; font-size: 10px; color: #888;">
                    Double-clic pour zoomer
                </div>
            </div>
        `}createDebugPanel(){this.debugPanel=document.createElement("div"),this.debugPanel.id="camera-debug",this.debugPanel.style.cssText=`
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.85);
            color: #ffffff;
            padding: 10px 12px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            border: 1px solid #666666;
            z-index: 1000;
            min-width: 220px;
            backdrop-filter: blur(4px);
        `,this.debugPanel.innerHTML=`
            <div style="font-weight: bold; color: #ffffff; margin-bottom:6px;">⚙️ DEBUG CAMERA</div>
            <div style="line-height:1.4; font-size:11px;">
                <div>Pos: <span id="dbg-cam-pos">-</span></div>
                <div>LookAt: <span id="dbg-cam-look">-</span></div>
            </div>
        `,document.body.appendChild(this.debugPanel)}createLogPanel(){this.logPanel=document.createElement("div"),this.logPanel.id="log-panel",this.logPanel.style.cssText=`
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 10px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            border: 1px solid #00ff00;
            z-index: 1000;
            max-width: 300px;
            max-height: 200px;
            overflow-y: auto;
            backdrop-filter: blur(5px);
        `,this.logPanel.innerHTML=`
            <div style="margin-bottom: 8px; font-weight: bold; color: #ffffff;">📝 LOG</div>
            <div id="log-content" style="line-height: 1.4;"></div>
        `,document.body.appendChild(this.logPanel)}updateCameraDebug(e,t){const n=document.getElementById("dbg-cam-pos"),i=document.getElementById("dbg-cam-look");n&&(n.textContent=`${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)}`),i&&(i.textContent=`${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}`);const r=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2));let o=document.getElementById("dbg-cam-distance");if(!o){const a=document.getElementById("camera-debug");if(a){const l=a.querySelector('div[style*="line-height"]');l&&(o=document.createElement("div"),o.id="dbg-cam-distance",l.appendChild(o))}}o&&(o.textContent=`Distance: ${r.toFixed(1)}`)}logMessage(e){const n=`[${new Date().toLocaleTimeString()}] ${e}`;this.logMessages.push(n),this.logMessages.length>this.maxLogMessages&&this.logMessages.shift(),this.updateLogDisplay()}updateLogDisplay(){const e=document.getElementById("log-content");e&&(e.innerHTML=this.logMessages.map(t=>`<div>${t}</div>`).join(""),e.scrollTop=e.scrollHeight)}showTemporaryMessage(e,t=2e3){this.logMessage(e)}dispose(){this.helpPanel&&this.helpPanel.parentNode&&this.helpPanel.parentNode.removeChild(this.helpPanel),this.infoPanel&&this.infoPanel.parentNode&&this.infoPanel.parentNode.removeChild(this.infoPanel),this.debugPanel&&this.debugPanel.parentNode&&this.debugPanel.parentNode.removeChild(this.debugPanel),this.logPanel&&this.logPanel.parentNode&&this.logPanel.parentNode.removeChild(this.logPanel);const e=document.getElementById("sun-details-panel");e&&e.parentNode&&e.parentNode.removeChild(e);const t=document.getElementById("planet-details-panel");t&&t.parentNode&&t.parentNode.removeChild(t)}}function xg(){return{credits:0,metal:0,crystal:0,fuel:0,population:0}}function vg(){return{credits:1e3,metal:500,crystal:100,fuel:200,population:0}}function yg(s,e){return{version:1,gameId:s,seed:e,createdAt:Date.now(),currentFrame:0,gameTime:0,simulationSpeed:1,isPaused:!1,lastTick:Date.now(),tickCount:0,units:new Map,structures:new Map,resourceSources:new Map,players:new Map,localPlayerId:null,selectedUnitIds:[],technologies:new Map,sync:{currentFrame:0,stateHash:"",confirmedFrame:0,pendingCommands:new Map,syncedPlayers:[]},nextEntityId:1}}function rc(s){const e=s.nextEntityId;return s.nextEntityId++,e}function Sg(s,e,t,n,i){return{id:rc(s),ownerId:e,shipClass:t,systemId:n,position:{...i},velocity:{x:0,y:0,z:0},rotation:0,destination:null,health:100,shield:50,targetId:null,combatStance:"DEFENSIVE",attackCooldown:0,state:"IDLE",formation:"NONE",formationOffset:{x:0,y:0,z:0},groupLeaderId:null,cargo:{},orderQueue:[],createdAtFrame:s.currentFrame,updatedAtFrame:s.currentFrame}}function Ki(){const s=`game-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,e=Date.now();return yg(s,e)}const vt={FIGHTER:{maxHealth:50,maxShield:20,shieldRegen:2,armor:1,speed:15,turnRate:4,sensorRange:50,attackRange:20,attackDamage:8,attackSpeed:2,cargoCapacity:0,cost:{credits:50,metal:30},buildTime:5,fuelConsumption:1},CORVETTE:{maxHealth:120,maxShield:50,shieldRegen:3,armor:3,speed:12,turnRate:3,sensorRange:60,attackRange:30,attackDamage:15,attackSpeed:1.5,cargoCapacity:0,cost:{credits:100,metal:60},buildTime:10,fuelConsumption:2},FRIGATE:{maxHealth:250,maxShield:100,shieldRegen:5,armor:5,speed:8,turnRate:2,sensorRange:80,attackRange:50,attackDamage:25,attackSpeed:1,cargoCapacity:0,cost:{credits:200,metal:120,crystal:20},buildTime:20,fuelConsumption:3},DESTROYER:{maxHealth:400,maxShield:150,shieldRegen:6,armor:8,speed:6,turnRate:1.5,sensorRange:100,attackRange:70,attackDamage:50,attackSpeed:.8,cargoCapacity:0,cost:{credits:400,metal:250,crystal:50},buildTime:35,fuelConsumption:5},CRUISER:{maxHealth:800,maxShield:300,shieldRegen:8,armor:12,speed:5,turnRate:1,sensorRange:120,attackRange:100,attackDamage:80,attackSpeed:.6,cargoCapacity:0,cost:{credits:800,metal:500,crystal:100},buildTime:60,fuelConsumption:8},BATTLESHIP:{maxHealth:1500,maxShield:500,shieldRegen:10,armor:20,speed:3,turnRate:.5,sensorRange:150,attackRange:150,attackDamage:150,attackSpeed:.4,cargoCapacity:0,cost:{credits:1500,metal:1e3,crystal:200},buildTime:120,fuelConsumption:15},CARRIER:{maxHealth:1e3,maxShield:400,shieldRegen:8,armor:15,speed:4,turnRate:.3,sensorRange:200,attackRange:0,attackDamage:0,attackSpeed:0,cargoCapacity:50,cost:{credits:2e3,metal:1200,crystal:300},buildTime:150,fuelConsumption:20},MOTHERSHIP:{maxHealth:3e3,maxShield:1e3,shieldRegen:15,armor:30,speed:2,turnRate:.2,sensorRange:300,attackRange:200,attackDamage:100,attackSpeed:.3,cargoCapacity:200,cost:{credits:5e3,metal:3e3,crystal:500,fuel:500},buildTime:300,fuelConsumption:50},HARVESTER:{maxHealth:150,maxShield:30,shieldRegen:2,armor:5,speed:6,turnRate:1.5,sensorRange:40,attackRange:0,attackDamage:0,attackSpeed:0,cargoCapacity:100,cost:{credits:150,metal:80},buildTime:15,fuelConsumption:2},REPAIR:{maxHealth:100,maxShield:40,shieldRegen:3,armor:3,speed:8,turnRate:2,sensorRange:60,attackRange:30,attackDamage:-20,attackSpeed:1,cargoCapacity:0,cost:{credits:200,metal:100,crystal:30},buildTime:20,fuelConsumption:2},SCOUT:{maxHealth:30,maxShield:10,shieldRegen:1,armor:0,speed:20,turnRate:5,sensorRange:200,attackRange:0,attackDamage:0,attackSpeed:0,cargoCapacity:0,cost:{credits:30,metal:15},buildTime:3,fuelConsumption:.5}};function ac(s,e){const t=vt[e].cost;for(const[n,i]of Object.entries(t))if(i&&s[n]<i)return!1;return!0}function oc(s,e){const t=vt[e].cost;for(const[n,i]of Object.entries(t))i&&(s[n]-=i)}function lc(s,e,t,n,i,r){const o=rc(s),a=vt[t];return{id:o,ownerId:e,shipClass:t,name:r,systemId:n,position:{...i},velocity:{x:0,y:0,z:0},rotation:0,destination:null,health:a.maxHealth,shield:a.maxShield,targetId:null,combatStance:"DEFENSIVE",attackCooldown:0,state:"IDLE",formation:"NONE",formationOffset:{x:0,y:0,z:0},groupLeaderId:null,cargo:{},orderQueue:[],createdAtFrame:s.currentFrame,updatedAtFrame:s.currentFrame}}function Mg(s,e,t,n,i){const r=s.players.get(e);if(!r)return console.warn(`[UnitFactory] Player not found: ${e}`),null;if(!ac(r.resources,t))return console.warn(`[UnitFactory] Insufficient resources for ${t}`),null;oc(r.resources,t);const o=lc(s,e,t,n,i);return s.units.set(o.id,o),console.log(`[UnitFactory] Spawned ${t} (ID: ${o.id}) for player ${e}`),o}function Br(s,e,t,n,i,r){const o=lc(s,e,t,n,i,r);return s.units.set(o.id,o),o}function Eg(s,e){const t=s.units.get(e);if(!t)return!1;t.state="DESTROYED",t.updatedAtFrame=s.currentFrame;for(const n of s.units.values())n.targetId===e&&(n.targetId=null),n.groupLeaderId===e&&(n.groupLeaderId=null);return s.units.delete(e),console.log(`[UnitFactory] Destroyed unit ${e}`),!0}function bg(s,e,t,n,i){const r=s.players.get(e);return r?Array.from(s.units.values()).filter(o=>{if(o.systemId!==t||o.ownerId===e)return!1;const a=r.diplomacy.get(o.ownerId);if(a!=="ENEMY"&&a!=="WAR")return!1;const l=o.position.x-n.x,c=o.position.y-n.y,u=o.position.z-n.z;return l*l+c*c+u*u<=i*i}):[]}function dn(s,e){const t=e.x-s.x,n=e.y-s.y,i=e.z-s.z;return Math.sqrt(t*t+n*n+i*i)}function Tg(s){return vt[s.shipClass].attackDamage>0&&s.attackCooldown<=0}function Di(s){return s.health>0&&s.state!=="DESTROYED"}const Ag=.5,Gr=.95,wg=.1;function Cg(s){const e=Math.sqrt(s.x*s.x+s.y*s.y+s.z*s.z);return e===0?{x:0,y:0,z:0}:{x:s.x/e,y:s.y/e,z:s.z/e}}function Rg(s,e){const t=e.x-s.x,n=e.z-s.z;return Math.atan2(t,n)}function pl(s){for(;s>Math.PI;)s-=2*Math.PI;for(;s<-Math.PI;)s+=2*Math.PI;return s}function cc(s,e,t){const n=vt[s.shipClass],i=Rg(s.position,e),r=pl(i-s.rotation),o=n.turnRate*t;return Math.abs(r)<=o?(s.rotation=i,!0):(s.rotation+=Math.sign(r)*o,s.rotation=pl(s.rotation),Math.abs(r)<=wg)}function Pg(s,e){if(!s.destination)return s.velocity.x*=Gr,s.velocity.y*=Gr,s.velocity.z*=Gr,!0;const t=vt[s.shipClass],n=dn(s.position,s.destination);if(n<Ag)return s.destination=null,s.velocity={x:0,y:0,z:0},!0;if(cc(s,s.destination,e)){const r=Cg({x:s.destination.x-s.position.x,y:s.destination.y-s.position.y,z:s.destination.z-s.position.z}),o=t.speed*2,a=n<o?n/o:1,l=t.speed*a;s.velocity.x=r.x*l,s.velocity.y=r.y*l,s.velocity.z=r.z*l}else s.velocity.x*=.9,s.velocity.y*=.9,s.velocity.z*=.9;return s.position.x+=s.velocity.x*e,s.position.y+=s.velocity.y*e,s.position.z+=s.velocity.z*e,!1}function Lg(s,e){const t=vt[s.shipClass];s.shield<t.maxShield&&(s.shield=Math.min(t.maxShield,s.shield+t.shieldRegen*e))}function Ig(s,e){s.attackCooldown>0&&(s.attackCooldown=Math.max(0,s.attackCooldown-e))}function Dg(s,e,t){if(s.health<=0){s.state="DESTROYED";return}switch(s.state){case"IDLE":s.destination?s.state="MOVING":s.targetId!==null&&(s.state="ATTACKING");break;case"MOVING":if(s.targetId!==null&&s.combatStance!=="HOLD_FIRE"){const o=e.units.get(s.targetId);if(o&&Di(o)){const a=vt[s.shipClass];if(dn(s.position,o.position)<=a.attackRange){s.state="ATTACKING";break}}}s.destination||(s.state="IDLE");break;case"ATTACKING":if(s.targetId===null){s.state=s.destination?"MOVING":"IDLE";break}const n=e.units.get(s.targetId);if(!n||!Di(n)){s.targetId=null,s.state=s.destination?"MOVING":"IDLE";break}const i=vt[s.shipClass];dn(s.position,n.position)>i.attackRange&&(s.destination={...n.position},s.state="MOVING");break;case"HARVESTING":break;case"DOCKING":break;case"REPAIRING":break;case"PATROLLING":break;case"DEFENDING":break;case"RETREATING":s.destination||(s.state="IDLE");break}}function Ng(s,e,t){if(s.state!=="DESTROYED"){if(Lg(s,t),Ig(s,t),(s.state==="MOVING"||s.state==="RETREATING")&&Pg(s,t),s.state==="ATTACKING"&&s.targetId!==null){const n=e.units.get(s.targetId);n&&cc(s,n.position,t)}Dg(s,e),s.updatedAtFrame=e.currentFrame}}function uc(s,e){for(const t of s.units.values())Ng(t,s,e)}function da(s,e){s.destination={...e},s.state="MOVING",s.combatStance!=="AGGRESSIVE"&&(s.targetId=null)}function fa(s,e){s.targetId=e,s.state="ATTACKING"}function pa(s){s.destination=null,s.targetId=null,s.state="IDLE",s.velocity={x:0,y:0,z:0}}function ma(s,e){e.length!==0&&(s.orderQueue=e.map((t,n)=>({type:"PATROL_POINT",data:{...t},index:n})),s.destination={...e[0]},s.state="PATROLLING",s.patrolIndex=0)}const Sn={distanceDamageFalloff:.5,minFalloffDistance:10,criticalMultiplier:2,criticalChance:.1,minimumDamage:1,shieldAbsorption:.8};function Ug(s,e,t){const n=vt[s.shipClass];let i=n.attackDamage;const r=dn(s.position,e.position);if(r>Sn.minFalloffDistance){const l=n.attackRange-Sn.minFalloffDistance,u=1-(r-Sn.minFalloffDistance)/l*Sn.distanceDamageFalloff;i*=Math.max(.2,u)}const a=Fg(t)<Sn.criticalChance;return a&&(i*=Sn.criticalMultiplier),{damage:i,isCritical:a}}function Fg(s){const e=Math.sin(s*9999)*1e4;return e-Math.floor(e)}function Og(s,e){const t=vt[s.shipClass],n=Math.max(Sn.minimumDamage,e-t.armor);let i=0,r=n;if(s.shield>0){const a=r*Sn.shieldAbsorption;i=Math.min(s.shield,a),s.shield-=i,r-=i}const o=Math.min(s.health,r);return s.health-=o,{shieldDamage:i,hullDamage:o}}function zg(s,e){if(!Di(s)||!Tg(s)||s.targetId===null)return null;const t=e.units.get(s.targetId);if(!t||!Di(t))return s.targetId=null,null;const n=vt[s.shipClass];if(dn(s.position,t.position)>n.attackRange)return null;const r=e.currentFrame*1e3+s.id*100+t.id,{damage:o,isCritical:a}=Ug(s,t,r),{shieldDamage:l,hullDamage:c}=Og(t,o);s.attackCooldown=1/n.attackSpeed;const u=t.health<=0;return u&&(t.state="DESTROYED",s.targetId=null),{attackerId:s.id,targetId:t.id,rawDamage:o,shieldDamage:l,hullDamage:c,isCritical:a,isKill:u,frame:e.currentFrame}}function Bg(s,e,t="CLOSEST"){const n=vt[s.shipClass];if(n.attackDamage<=0)return null;const i=bg(e,s.ownerId,s.systemId,s.position,n.sensorRange);if(i.length===0)return null;const r=i.filter(a=>dn(s.position,a.position)<=n.attackRange),o=r.length>0?r:i;switch(t){case"CLOSEST":o.sort((a,l)=>dn(s.position,a.position)-dn(s.position,l.position));break;case"WEAKEST":o.sort((a,l)=>a.health+a.shield-(l.health+l.shield));break;case"STRONGEST":o.sort((a,l)=>{const c=ml(a);return ml(l)-c});break;case"LOWEST_SHIELD":o.sort((a,l)=>a.shield-l.shield);break}return o[0]}function ml(s){const e=vt[s.shipClass],t=e.attackDamage*e.attackSpeed,n=e.maxHealth+e.maxShield+e.armor*10;return t*(1+n/1e3)}function Gg(s,e){if(s.combatStance==="PASSIVE"||s.combatStance==="HOLD_FIRE")return;if(s.targetId!==null){const i=e.units.get(s.targetId);if(i&&Di(i)){const r=vt[s.shipClass];if(dn(s.position,i.position)<=r.sensorRange)return}s.targetId=null}const t=(s.combatStance==="AGGRESSIVE","CLOSEST"),n=Bg(s,e,t);n&&(s.targetId=n.id)}function hc(s){const e=[];for(const t of s.units.values()){if(!Di(t)||t.state!=="ATTACKING")continue;Gg(t,s);const n=zg(t,s);n&&e.push(n)}return{attacks:e,frame:s.currentFrame}}const kg={spacing:15,depthSpacing:20,scale:1};class ga{formations=new Map;config;constructor(e={}){this.config={...kg,...e}}createFormation(e,t,n,i,r){const o={type:t,units:[...n],center:{...i},direction:this.normalize(r),spacing:this.config.spacing,scale:this.config.scale};return this.formations.set(e,o),o}removeFormation(e){this.formations.delete(e)}getFormation(e){return this.formations.get(e)}calculateSlotPositions(e){const t=this.generateSlots(e.type,e.units.length),n=new Map,i=e.direction,r={x:0,y:1,z:0},o=this.cross(i,r),a=this.cross(o,i);for(let l=0;l<e.units.length;l++){const c=e.units[l],u=t[l];if(!u)continue;const h={x:o.x*u.offset.x+a.x*u.offset.y+i.x*u.offset.z,y:o.y*u.offset.x+a.y*u.offset.y+i.y*u.offset.z,z:o.z*u.offset.x+a.z*u.offset.y+i.z*u.offset.z},p={x:h.x*e.spacing*e.scale,y:h.y*e.spacing*e.scale,z:h.z*e.spacing*e.scale};n.set(c,{x:e.center.x+p.x,y:e.center.y+p.y,z:e.center.z+p.z})}return n}generateSlots(e,t){switch(e){case"WEDGE":return this.generateWedgeSlots(t);case"SPHERE":return this.generateSphereSlots(t);case"WALL":return this.generateWallSlots(t);case"CLAW":return this.generateClawSlots(t);case"COLUMN":return this.generateColumnSlots(t);case"DELTA":return this.generateDeltaSlots(t);default:return this.generateWedgeSlots(t)}}generateWedgeSlots(e){const t=[];t.push({offset:{x:0,y:0,z:0},priority:0,role:"leader"});for(let n=1;n<e;n++){const i=Math.ceil(n/2),r=n%2===1?-1:1;t.push({offset:{x:r*i,y:0,z:-i*1.5},priority:n,role:r===-1?"flank_left":"flank_right"})}return t}generateSphereSlots(e){const t=[];if(e===0||(t.push({offset:{x:0,y:0,z:0},priority:0,role:"leader"}),e===1))return t;const n=(1+Math.sqrt(5))/2;for(let i=1;i<e;i++){const r=i/(e-1),o=Math.acos(1-2*r),a=2*Math.PI*i/n,l=Math.cbrt(i/e)*2;t.push({offset:{x:l*Math.sin(o)*Math.cos(a),y:l*Math.sin(o)*Math.sin(a),z:l*Math.cos(o)},priority:i,role:"support"})}return t}generateWallSlots(e){const t=[],n=(e-1)/2;for(let i=0;i<e;i++){const r=i-n;t.push({offset:{x:r,y:0,z:0},priority:Math.abs(r),role:i===Math.floor(e/2)?"leader":"front"})}return t}generateClawSlots(e){const t=[];if(t.push({offset:{x:0,y:0,z:-2},priority:0,role:"leader"}),e===1)return t;const n=[],i=[];for(let r=1;r<e;r++)r%2===1?n.push(r):i.push(r);for(let r=0;r<n.length;r++){const a=(r+1)/(n.length+1)*Math.PI*.4;t.push({offset:{x:-Math.sin(a)*(2+r*.5),y:0,z:Math.cos(a)*(1+r*.3)},priority:n[r],role:"flank_left"})}for(let r=0;r<i.length;r++){const a=(r+1)/(i.length+1)*Math.PI*.4;t.push({offset:{x:Math.sin(a)*(2+r*.5),y:0,z:Math.cos(a)*(1+r*.3)},priority:i[r],role:"flank_right"})}return t}generateColumnSlots(e){const t=[];for(let n=0;n<e;n++)t.push({offset:{x:0,y:0,z:-n},priority:n,role:n===0?"leader":"rear"});return t}generateDeltaSlots(e){const t=[];let n=0,i=0,r=1;for(let o=0;o<e;o++){const a=i-(r-1)/2,l=-n;t.push({offset:{x:a,y:0,z:l},priority:n,role:n===0?"leader":i===0||i===r-1?"flank_left":"front"}),i++,i>=r&&(n++,r++,i=0)}return t}moveFormation(e,t){const n=this.formations.get(e);n&&(n.center={...t})}rotateFormation(e,t){const n=this.formations.get(e);n&&(n.direction=this.normalize(t))}changeFormationType(e,t){const n=this.formations.get(e);n&&(n.type=t)}addUnitToFormation(e,t){const n=this.formations.get(e);n&&!n.units.includes(t)&&n.units.push(t)}removeUnitFromFormation(e,t){const n=this.formations.get(e);if(n){const i=n.units.indexOf(t);i!==-1&&n.units.splice(i,1)}}setFormationSpacing(e,t){const n=this.formations.get(e);n&&(n.spacing=t)}normalize(e){const t=Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z);return t===0?{x:0,y:0,z:1}:{x:e.x/t,y:e.y/t,z:e.z/t}}cross(e,t){return{x:e.y*t.z-e.z*t.y,y:e.z*t.x-e.x*t.z,z:e.x*t.y-e.y*t.x}}findFormationByUnit(e){for(const t of this.formations.values())if(t.units.includes(e))return t}getAllFormations(){return Array.from(this.formations.values())}get count(){return this.formations.size}}new ga;const Hg=[4886745,14240330,4905290,14276938,14240473,4905433];class Ut{static instance=null;static getInstance(){return Ut.instance||(Ut.instance=new Ut),Ut.instance}static dispose(){Ut.instance&&(Ut.instance.cleanup(),Ut.instance=null)}formationManager;scene=null;camera=null;gameState;phase="MENU";config={maxUnits:500};stats;isRunning=!1;eventListeners=new Map;constructor(){this.formationManager=new ga,this.gameState=Ki(),this.stats=this.createInitialStats(),console.log("[GameManager] Instance created")}setRenderContext(e,t){this.scene=e,this.camera=t,console.log("[GameManager] Render context set")}getScene(){return this.scene}getCamera(){return this.camera}configure(e){this.config={...this.config,...e}}startNewGame(e="Player"){this.gameState=Ki(),this.stats=this.createInitialStats();const t=this.createPlayer(e,!0);return this.phase="PLAYING",this.isRunning=!0,this.emit("phase_changed",{phase:this.phase}),console.log("[GameManager] New game started"),t}loadState(e){this.gameState=e,this.phase=e.isPaused?"PAUSED":"PLAYING",this.isRunning=!e.isPaused,console.log("[GameManager] State loaded")}pause(){this.phase==="PLAYING"&&(this.phase="PAUSED",this.isRunning=!1,this.gameState.isPaused=!0,this.emit("phase_changed",{phase:this.phase}))}resume(){this.phase==="PAUSED"&&(this.phase="PLAYING",this.isRunning=!0,this.gameState.isPaused=!1,this.emit("phase_changed",{phase:this.phase}))}endGame(e){this.phase=e?"VICTORY":"DEFEAT",this.isRunning=!1,this.emit("phase_changed",{phase:this.phase,victory:e})}update(e){if(!this.isRunning||this.phase!=="PLAYING")return;this.gameState.gameTime+=e,this.stats.gameTime+=e,this.gameState.currentFrame++,uc(this.gameState,e);const t=this.updateCombat();this.processCombatEvents(t)}updateCombat(){return hc(this.gameState)}processCombatEvents(e){for(const t of e.attacks)t.isKill&&this.handleUnitDestroyed(t.targetId)}handleUnitDestroyed(e){const t=this.gameState.selectedUnitIds.indexOf(e);t!==-1&&this.gameState.selectedUnitIds.splice(t,1),this.stats.unitsDestroyed++;const n=this.gameState.units.get(e);this.emit("unit_destroyed",{unitId:e,unit:n})}createPlayer(e,t=!1){const n=`player_${Date.now()}_${Math.random().toString(36).slice(2,9)}`,i=vg();this.config.startingResources&&Object.assign(i,this.config.startingResources);const r={id:n,displayName:e,color:this.generatePlayerColor(),resources:i,diplomacy:new Map,isConnected:!0,isAI:!t,homeSystemId:"system_0",controlledSystems:["system_0"],unlockedTechnologies:[],currentResearch:null,score:0,lastActiveFrame:this.gameState.currentFrame};return this.gameState.players.set(n,r),t&&(this.gameState.localPlayerId=n),this.emit("player_joined",{player:r}),r}generatePlayerColor(){const e=new Set([...this.gameState.players.values()].map(t=>t.color));return Hg.find(t=>!e.has(t))??Math.floor(Math.random()*16777215)}createUnit(e,t,n,i){if(this.gameState.units.size>=this.config.maxUnits)return console.warn("[GameManager] Max units reached"),null;if(!this.gameState.players.get(t))return console.error("[GameManager] Player not found:",t),null;const o=Mg(this.gameState,t,e,n,i);return o?(this.stats.unitsCreated++,this.emit("unit_created",{unit:o}),o):null}removeUnit(e){const t=this.gameState.units.get(e);if(!t)return;const n=this.gameState.selectedUnitIds.indexOf(e);n!==-1&&this.gameState.selectedUnitIds.splice(n,1),Eg(this.gameState,e),this.stats.unitsDestroyed++,this.emit("unit_destroyed",{unitId:e,unit:t})}selectUnits(e,t){const n=e.filter(i=>{const r=this.gameState.units.get(i);return r&&r.ownerId===t});this.gameState.selectedUnitIds=n}getSelectedUnits(){return this.gameState.selectedUnitIds.map(e=>this.gameState.units.get(e)).filter(e=>e!==void 0)}executeCommand(e){switch(e.type){case"MOVE":this.handleMoveCommand(e);break;case"ATTACK":this.handleAttackCommand(e);break;case"STOP":this.handleStopCommand(e);break;case"PATROL":this.handlePatrolCommand(e);break;case"SET_FORMATION":this.handleFormationCommand(e);break;case"BUILD_UNIT":this.handleBuildUnitCommand(e);break;default:console.warn("[GameManager] Unknown command type:",e.type)}}handleMoveCommand(e){for(const t of e.unitIds){const n=this.gameState.units.get(t);n&&da(n,e.target)}}handleAttackCommand(e){for(const t of e.unitIds){const n=this.gameState.units.get(t);n&&fa(n,e.targetId)}}handleStopCommand(e){for(const t of e.unitIds){const n=this.gameState.units.get(t);n&&pa(n)}}handlePatrolCommand(e){for(const t of e.unitIds){const n=this.gameState.units.get(t);n&&e.waypoints.length>0&&ma(n,e.waypoints[0])}}handleFormationCommand(e){const t=e.unitIds.map(n=>this.gameState.units.get(n)).filter(n=>n!==void 0);if(t.length>0){const n=this.calculateGroupCenter(t),i=`formation_${Date.now()}`;this.formationManager.createFormation(i,e.formation,e.unitIds,n,{x:0,y:0,z:1})}}calculateGroupCenter(e){if(e.length===0)return{x:0,y:0,z:0};const t=e.reduce((n,i)=>({x:n.x+i.position.x,y:n.y+i.position.y,z:n.z+i.position.z}),{x:0,y:0,z:0});return{x:t.x/e.length,y:t.y/e.length,z:t.z/e.length}}handleBuildUnitCommand(e){const t=this.gameState.structures.get(e.structureId);if(!t){console.warn("[GameManager] Structure not found:",e.structureId);return}const n=t.rallyPoint??t.position;this.createUnit(e.unitType,t.ownerId,t.systemId,n)}emit(e,t){const n={type:e,data:t,timestamp:Date.now()},i=this.eventListeners.get(e);if(i)for(const r of i)try{r(n)}catch(o){console.error("[GameManager] Event listener error:",o)}}on(e,t){return this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t),()=>{this.eventListeners.get(e)?.delete(t)}}getState(){return this.gameState}getPhase(){return this.phase}getStats(){return{...this.stats}}getConfig(){return{...this.config}}isGameRunning(){return this.isRunning}getLocalPlayer(){return this.gameState.players.get(this.gameState.localPlayerId||"")}getResources(e){return this.gameState.players.get(e)?.resources}getFormationManager(){return this.formationManager}createInitialStats(){return{unitsCreated:0,unitsDestroyed:0,resourcesCollected:xg(),gameTime:0}}cleanup(){this.eventListeners.clear(),this.gameState=Ki(),this.stats=this.createInitialStats(),this.scene=null,this.camera=null,this.isRunning=!1,console.log("[GameManager] Cleaned up")}}class Vg{scene;renderer;cameraManager;navigationManager;inputManager;viewEntitiesManager;galaxyGroup;starField;clusterGrid;coordinateSystem;memoryManager;unitManager;simulationWorker;updatables=[];lastTime=performance.now();lastAutoTransitionCheck=0;lastViewTransitionTime=0;VIEW_TRANSITION_GRACE_PERIOD=1e3;selectedClusterCoords=null;raycaster;mouse;cornerUI;constructor(){console.log("[SceneManager] Initialisation..."),this.scene=new Dm,this.scene.background=new Ve(0),this.renderer=new Ql({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),document.body.appendChild(this.renderer.domElement),this.galaxyGroup=new $t,this.galaxyGroup.name="GalaxyGroup",this.scene.add(this.galaxyGroup),this.cameraManager=new ha(this.renderer.domElement),this.navigationManager=new cg,this.inputManager=new ig(this.renderer.domElement),this.viewEntitiesManager=new og(this.scene,this.galaxyGroup),this.viewEntitiesManager.setCamera(this.cameraManager.getCamera()),this.starField=new ug,this.galaxyGroup.add(this.starField.getMesh()),this.clusterGrid=new hg,this.galaxyGroup.add(this.clusterGrid.getMesh()),this.galaxyGroup.add(this.clusterGrid.getPickGroup()),this.coordinateSystem=new dg(3),this.galaxyGroup.add(this.coordinateSystem.getMesh()),this.scene.add(new jm(16777215,.5));const e=new qm(16777215,1);e.position.set(5,10,7.5),this.scene.add(e),this.memoryManager=new mg(tg.maxUnits),this.simulationWorker=new Worker(new URL("/assets/SimulationWorker-CKl5zPEe.js",import.meta.url),{type:"module"}),this.simulationWorker.postMessage({type:"INIT",data:{buffer:this.memoryManager.buffer,maxUnits:this.memoryManager.maxUnits}}),this.unitManager=new gg(this.memoryManager),this.scene.add(this.unitManager.getMesh()),this.updatables.push(this.starField),this.updatables.push(this.unitManager),this.updatables.push(this.clusterGrid),this.updatables.push(this.coordinateSystem),this.raycaster=new Km,this.raycaster.params.Line={threshold:.05},this.mouse=new ge,this.cornerUI=new _g,this.updateGridInfo(),Ut.getInstance().setRenderContext(this.scene,this.cameraManager.getCamera()),this.setupInputHandlers(),window.addEventListener("resize",()=>this.onWindowResize())}setupInputHandlers(){this.inputManager.on("keydown",e=>{const t=e.key;t==="Enter"?this.handleEnter():t==="Escape"&&this.handleEscape()}),this.inputManager.on("click",e=>{this.mouse.copy(e.position),this.handleClick()}),this.inputManager.on("dblclick",e=>{this.mouse.copy(e.position),this.handleDoubleClick()})}onWindowResize(){this.cameraManager.updateAspect(window.innerWidth/window.innerHeight),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateGridInfo(){this.cornerUI.updateClusterInfo({clusters:1,cubes:this.clusterGrid.getMesh().children.length,size:`${this.clusterGrid.getTotalDimensions().width}x${this.clusterGrid.getTotalDimensions().depth}`})}updateHover(){this.mouse.copy(this.inputManager.mousePosition),this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera());const e=this.clusterGrid.getPickObjects(),t=this.raycaster.intersectObjects(e,!1),n=t.length>0&&t[0].object.name||null;this.clusterGrid.setHoverCubeByName(n)}handleEnter(){if(this.cameraManager.isTransitioning()){console.log("[SceneManager] handleEnter() blocked: camera transition in progress");return}const e=this.navigationManager.getState();e.currentView==="GALAXY"&&e.currentSystem?this.navigationManager.enterSystem(e.currentSystem):console.warn("[SceneManager] handleEnter() called in invalid state:",e)}handleEscape(){if(this.cameraManager.isTransitioning()){console.log("[SceneManager] handleEscape() blocked: camera transition in progress");return}const e=this.navigationManager.getState();e.currentView==="SYSTEM"?this.navigationManager.setViewMode("GALAXY"):console.warn("[SceneManager] handleEscape() called in invalid state:",e)}enterSystem(e){const t=e.metadata;if(!t){console.error("[SceneManager] enterSystem() ERREUR : metadata manquante dans systemRef");return}const n=!!e.sunMesh,i=n?e.sunMesh.position.clone():new R(t.absolutePosition.x,t.absolutePosition.y,t.absolutePosition.z);console.log("[SceneManager] enterSystem()",{systemName:t.name,systemId:t.id,hasSunMesh:n,targetPos:{x:i.x.toFixed(3),y:i.y.toFixed(3),z:i.z.toFixed(3)},optimalDistance:t.optimalDistance});const r=t.optimalDistance*Gn.systemEnterDistanceFactor;this.lastViewTransitionTime=performance.now(),this.cameraManager.flyTo(i,r,()=>{this.lastViewTransitionTime=performance.now(),this.navigationManager.enterSystem(e),this.viewEntitiesManager.setView("SYSTEM",this.navigationManager.getState());const o=this.viewEntitiesManager.getSolarSystem();if(o){const a=o.getSunMesh().position.clone();o.getGroup().localToWorld(a),this.cameraManager.setTarget(a);const l=new ua(2);l.position.set(0,0,0),o.getGroup().add(l),console.log("[SceneManager] AxesHelper ajouté à l'origine du SolarSystem (0,0,0)")}this.cornerUI.logMessage(`🚀 Entrée dans le système ${t.name}`),console.log("[SceneManager] Transition vers SYSTEM terminée",{systemName:t.name,cameraDistance:this.cameraManager.distance.toFixed(3),optimalDistance:t.optimalDistance.toFixed(3)})},!0)}enterPlanet(){console.log("[SceneManager] enterPlanet() appelé");const e=this.navigationManager.getState();if(!e.currentPlanet){console.warn("[SceneManager] enterPlanet() : pas de planète sélectionnée");return}const t=this.viewEntitiesManager.getSolarSystem();if(!t){console.error("[SceneManager] enterPlanet() : SolarSystem non disponible");return}const n=t.getPlanets();console.log("[SceneManager] enterPlanet() recherche planète",{searchId:e.currentPlanet.id,availablePlanets:n.map(a=>a.id)});const i=n.find(a=>a.id===e.currentPlanet.id);if(!i){console.error("[SceneManager] enterPlanet() : planète non trouvée dans SolarSystem");return}const r=i.mesh.position.clone(),o=e.currentPlanet.radius*2.5;console.log("[SceneManager] enterPlanet() démarrage flyTo",{planetId:i.id,targetPos:{x:r.x.toFixed(2),y:r.y.toFixed(2),z:r.z.toFixed(2)},entryDistance:o.toFixed(2)}),this.lastViewTransitionTime=performance.now(),this.cameraManager.flyTo(r,o,()=>{console.log("[SceneManager] enterPlanet() transition terminée"),this.lastViewTransitionTime=performance.now(),this.navigationManager.enterPlanet(e.currentPlanet),this.viewEntitiesManager.setView("PLANET",this.navigationManager.getState()),this.cornerUI.logMessage(`🌍 Entrée sur la planète ${e.currentPlanet.id}`)})}exitPlanet(){const e=this.navigationManager.getState();if(!e.currentPlanet)return;const t=e.currentPlanet;this.lastViewTransitionTime=performance.now(),this.navigationManager.exitPlanet(),this.viewEntitiesManager.setView("SYSTEM",this.navigationManager.getState());const n=new R(t.position.x,t.position.y,t.position.z),i=t.radius*2.5,r=new R().subVectors(this.cameraManager.getCamera().position,n).normalize();r.lengthSq()<1e-4&&r.set(0,0,1),this.cameraManager.setTarget(n),this.cameraManager.setPosition(n.x+r.x*i,n.y+r.y*i,n.z+r.z*i),this.cornerUI.logMessage(`⬅️ Retour au système depuis ${t.id}`)}exitSystem(){this.lastViewTransitionTime=performance.now();const e=this.navigationManager.exitSystem();if(!e)return;this.viewEntitiesManager.setView("GALAXY",this.navigationManager.getState());const t=e.metadata,n=new R(t.absolutePosition.x,t.absolutePosition.y,t.absolutePosition.z),i=new R().subVectors(this.cameraManager.getCamera().position,n).normalize();i.lengthSq()<1e-4&&i.set(0,0,1);const r=t.optimalDistance*Gn.systemExitDistanceFactor,o=n.clone().add(i.multiplyScalar(r));this.cameraManager.setTarget(n),this.cameraManager.setPosition(o.x,o.y,o.z),this.cornerUI.logMessage(`⬅️ Sortie du système ${t.name}`),console.log("[SceneManager] Sortie système effectuée",{systemName:t.name,newCameraDistance:this.cameraManager.distance.toFixed(3)})}handleClick(){this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera()),this.navigationManager.getState().currentView==="SYSTEM"?this.handleSystemClick():this.handleGalaxyClick()}handleSystemClick(){const e=this.viewEntitiesManager.getSolarSystem();if(!e)return;const t=e.getPlanets().map(i=>i.mesh),n=this.raycaster.intersectObjects(t,!1);if(n.length>0){const r=n[0].object.userData.planetId;if(r){e.selectPlanet(r,!0);const o=e.getPlanets().find(a=>a.id===r);if(o){const a={id:o.id,name:o.id,radius:o.radius,position:{x:o.mesh.position.x,y:o.mesh.position.y,z:o.mesh.position.z},seed:0,type:"telluric"};this.navigationManager.setSystemSelection(a),this.cameraManager.setTarget(o.mesh.position),this.cornerUI.logMessage(`🪐 Planète sélectionnée: ${a.name} (Enter pour entrer)`)}}}else e.selectPlanet("",!1),this.navigationManager.setSystemSelection(null)}handleGalaxyClick(){const e=this.clusterGrid.getPickObjects(),t=this.raycaster.intersectObjects(e,!1),n=this.raycaster.intersectObjects(this.clusterGrid.getSuns(),!1),i=t.length>0?t[0]:null,r=n.length>0?n[0]:null,o=i&&i.object.name||null,a=r?r.object:null,l=a?this.clusterGrid.getSunMetadataFromMesh(a):null;if((()=>{if(!a)return!1;if(!this.selectedClusterCoords)return!0;const u=l?.globalCoords||null;return u?Math.max(Math.abs(this.selectedClusterCoords.gx-u.gx),Math.abs(this.selectedClusterCoords.gz-u.gz))<=1:!1})()&&l&&a){this.clusterGrid.selectSun(a),this.clusterGrid.selectCubeByName(null),this.selectedClusterCoords=null,this.cornerUI.updateSelectedCluster(null,null),this.cornerUI.updateSelectedSun(l),this.cornerUI.logMessage(`⭐ Soleil sélectionné: ${l.name}`),this.cameraManager.setTarget(a.position);let u=this.clusterGrid.getSystemReference(l.id);u||(console.warn("[SceneManager] getSystemReference() retourne null pour",l.id,"→ utilisation du fallback"),u={metadata:l,sunMesh:a,pickMesh:a}),console.log("[SceneManager] handleGalaxyClick() → setGalaxySelection",{systemId:u.metadata.id,systemName:u.metadata.name,hasSunMesh:!!u.sunMesh,sunMeshPosition:u.sunMesh?{x:u.sunMesh.position.x.toFixed(3),y:u.sunMesh.position.y.toFixed(3),z:u.sunMesh.position.z.toFixed(3)}:"N/A"}),this.navigationManager.setGalaxySelection(u)}else if(o){const u=this.clusterGrid.getGlobalCoordsFromName(o);this.clusterGrid.selectCubeByName(o),this.clusterGrid.selectSun(null),this.cornerUI.updateSelectedSun(null),this.cornerUI.updateSelectedCluster(o,u),this.selectedClusterCoords=u,this.navigationManager.setGalaxySelection(null)}else this.clusterGrid.selectCubeByName(null),this.clusterGrid.selectSun(null),this.cornerUI.updateSelectedCluster(null,null),this.cornerUI.updateSelectedSun(null),this.selectedClusterCoords=null,this.navigationManager.setGalaxySelection(null)}handleDoubleClick(){this.handleClick(),this.handleEnter()}checkAutoTransitions(){const e=performance.now();if(e-this.lastAutoTransitionCheck<Gn.transitionCooldown||this.cameraManager.isTransitioning()||e-this.lastViewTransitionTime<this.VIEW_TRANSITION_GRACE_PERIOD)return;const t=this.navigationManager.getState(),n=this.cameraManager.distance;if(t.currentView==="GALAXY"&&t.currentOptimalDistance!==null&&t.currentSystem!==null){const i=t.currentOptimalDistance*Gn.systemEnterDistanceFactor;if(n<i){console.log("[SceneManager] Auto-transition GALAXY → SYSTEM",{currentDistance:n.toFixed(3),enterThreshold:i.toFixed(3)}),this.lastAutoTransitionCheck=e,this.lastViewTransitionTime=e,this.navigationManager.enterSystem(t.currentSystem),this.viewEntitiesManager.setView("SYSTEM",this.navigationManager.getState()),this.cornerUI.logMessage(`🚀 Entrée automatique dans ${t.currentSystem.metadata.name}`);return}}if(t.currentView==="SYSTEM"&&t.currentOptimalDistance!==null){const i=t.currentOptimalDistance*Gn.systemExitDistanceFactor;if(n>i){console.log("[SceneManager] Auto-transition SYSTEM → GALAXY",{currentDistance:n.toFixed(3),exitThreshold:i.toFixed(3),optimalDistance:t.currentOptimalDistance.toFixed(3)}),this.lastAutoTransitionCheck=e,this.exitSystem();return}}if(t.currentView==="SYSTEM"&&t.currentPlanet){const i=this.viewEntitiesManager.getSolarSystem();if(i){const r=i.getPlanets().find(o=>o.id===t.currentPlanet.id);if(r){const o=r.radius*Gn.planetEnterDistanceFactor;if(n<o){this.lastAutoTransitionCheck=e,this.enterPlanet();return}}}}if(t.currentView==="PLANET"&&t.currentPlanet){const i=t.currentPlanet.radius*Gn.planetExitDistanceFactor;n>i&&(this.lastAutoTransitionCheck=e,this.exitPlanet())}}animate(){requestAnimationFrame(()=>this.animate());const e=performance.now(),t=(e-this.lastTime)/1e3;this.lastTime=e,this.cameraManager.update(),this.viewEntitiesManager.update(t),Ut.getInstance().update(t);const n=this.cameraManager.getCamera().position;for(const r of this.updatables)try{r.update(t,n)}catch(o){console.error("[SceneManager] update error",o)}this.updateHover();const i=this.cameraManager.getTarget();try{this.cornerUI.updateCameraDebug({x:n.x,y:n.y,z:n.z},{x:i.x,y:i.y,z:i.z})}catch{}this.checkAutoTransitions(),this.renderer.render(this.scene,this.cameraManager.getCamera())}resetCameraToOptimal(){this.cameraManager.resetPosition(),this.cornerUI.logMessage("🎯 Caméra réinitialisée")}getNavigationState(){return this.navigationManager.getState()}getCamera(){return this.cameraManager.getCamera()}getScene(){return this.scene}}class Wg{listeners=new Map;emitCount=0;debugMode=!1;on(e,t){let n=this.listeners.get(e);return n||(n=new Set,this.listeners.set(e,n)),n.add(t),()=>{n.delete(t),n.size===0&&this.listeners.delete(e)}}once(e,t){const n=this.on(e,i=>{n(),t(i)});return n}emit(e,t){this.emitCount++,this.debugMode&&console.log(`[EventBus] ${e}`,t);const n=this.listeners.get(e);if(n)for(const i of[...n])try{i(t)}catch(r){console.error(`[EventBus] Error in listener for "${e}":`,r)}}off(e){this.listeners.delete(e)}clear(){this.listeners.clear()}setDebugMode(e){this.debugMode=e,console.log(`[EventBus] Debug mode ${e?"enabled":"disabled"}`)}getStats(){let e=0;for(const t of this.listeners.values())e+=t.size;return{eventTypes:this.listeners.size,totalListeners:e,emitCount:this.emitCount}}}const Ze=new Wg;function Ui(s,e,t){const n=[];for(const i of e){const r=s.units.get(i);r&&r.ownerId===t&&r.state!=="DESTROYED"&&n.push(i)}return n}function Xg(s,e){const t=s.units.get(e);return!t||t.state==="DESTROYED"?null:t}function Yg(s,e){const t=Ui(s,e.unitIds,e.playerId);if(t.length===0)return{success:!1,message:"No valid units to move"};for(const n of t){const i=s.units.get(n);i&&(e.queue?i.orderQueue.push({type:"MOVE",target:e.target}):da(i,e.target))}return{success:!0,affectedUnits:t}}function $g(s,e){const t=Ui(s,e.unitIds,e.playerId),n=Xg(s,e.targetId);if(t.length===0)return{success:!1,message:"No valid units to attack"};if(!n)return{success:!1,message:"Invalid target"};if(n.ownerId===e.playerId)return{success:!1,message:"Cannot attack own units"};for(const i of t){const r=s.units.get(i);r&&(e.queue?r.orderQueue.push({type:"ATTACK",targetId:e.targetId}):fa(r,e.targetId))}return Ze.emit("combat:started",{attackerIds:t,defenderIds:[e.targetId]}),{success:!0,affectedUnits:t}}function qg(s,e){const t=Ui(s,e.unitIds,e.playerId);for(const n of t){const i=s.units.get(n);i&&(pa(i),i.orderQueue=[])}return{success:!0,affectedUnits:t}}function jg(s,e){const t=Ui(s,e.unitIds,e.playerId);if(t.length===0)return{success:!1,message:"No valid units to patrol"};if(e.waypoints.length<2)return{success:!1,message:"Patrol requires at least 2 waypoints"};for(const n of t){const i=s.units.get(n);i&&ma(i,e.waypoints)}return{success:!0,affectedUnits:t}}function Kg(s,e){const n=Ui(s,e.unitIds,e.playerId).filter(r=>{const o=s.units.get(r);return o&&o.shipClass==="HARVESTER"});if(n.length===0)return{success:!1,message:"No harvesters selected"};if(!s.resourceSources?.get(e.targetId))return{success:!1,message:"Invalid harvest target"};for(const r of n){const o=s.units.get(r);o&&(o.state="HARVESTING",o.targetId=e.targetId,Ze.emit("harvest:started",{harvesterId:r,targetId:e.targetId}))}return{success:!0,affectedUnits:n}}function Zg(s,e){const t=s.players.get(e.playerId);if(!t)return{success:!1,message:"Player not found"};const n=s.structures?.get(e.structureId);if(!n||n.ownerId!==e.playerId)return{success:!1,message:"Invalid structure"};const i=e.unitType,r=s.SHIP_STATS?.[i];if(!r)return{success:!1,message:`Unknown unit type: ${e.unitType}`};if(!ac(t.resources,i))return{success:!1,message:"Insufficient resources"};oc(t.resources,i),n.productionQueue||(n.productionQueue=[]);for(let o=0;o<e.count;o++)n.productionQueue.push({unitType:i,progress:0,totalTime:r.buildTime});return Ze.emit("production:started",{structureId:e.structureId,unitType:e.unitType,duration:r.buildTime}),Ze.emit("resources:changed",{playerId:e.playerId,resources:t.resources,delta:r.cost}),{success:!0}}function Jg(s,e){const t=Ui(s,e.unitIds,e.playerId);if(t.length===0)return{success:!1,message:"No valid units for formation"};const n=t[0];for(const i of t){const r=s.units.get(i);r&&(r.formation=e.formation,r.groupLeaderId=i===n?null:n)}return{success:!0,affectedUnits:t}}function dc(s,e){switch(e.type){case"MOVE":return Yg(s,e);case"ATTACK":return $g(s,e);case"STOP":return qg(s,e);case"PATROL":return jg(s,e);case"HARVEST":return Kg(s,e);case"BUILD_UNIT":return Zg(s,e);case"SET_FORMATION":return Jg(s,e);case"CANCEL_BUILD":return{success:!0,message:"Not implemented yet"};case"MOVE_TO_SYSTEM":return{success:!0,message:"Not implemented yet"};case"ATTACK_MOVE":return{success:!0,message:"Not implemented yet"};case"HOLD_POSITION":return{success:!0,message:"Not implemented yet"};case"DEFEND":return{success:!0,message:"Not implemented yet"};case"BUILD_STRUCTURE":return{success:!0,message:"Not implemented yet"};case"SET_RALLY":return{success:!0,message:"Not implemented yet"};case"DOCK":return{success:!0,message:"Not implemented yet"};case"UNDOCK":return{success:!0,message:"Not implemented yet"};default:return console.warn(`[CommandProcessor] Unknown command type: ${e.type}`),{success:!1,message:"Unknown command type"}}}class Qg{commandLog=[];maxLogSize=1e3;process(e,t){const n=dc(e,t);return this.commandLog.push({command:t,result:n,frame:e.currentFrame,timestamp:Date.now()}),this.commandLog.length>this.maxLogSize&&this.commandLog.shift(),n}getCommandLog(){return this.commandLog}clearLog(){this.commandLog=[]}}const _a={passiveIncomePerSystem:1,maxConcurrentProduction:2,researchSpeedPerLab:.5},gl={SPACE_STATION:{maxHealth:5e3,maxShield:2e3,shieldRegen:10,cost:{credits:2e3,metal:1e3,crystal:200},buildTime:120,energyProduction:100,energyConsumption:0},SHIPYARD:{maxHealth:2e3,maxShield:500,shieldRegen:5,cost:{credits:1e3,metal:500,crystal:100},buildTime:60,energyProduction:0,energyConsumption:20},RESEARCH_LAB:{maxHealth:1e3,maxShield:300,shieldRegen:3,cost:{credits:800,metal:300,crystal:150},buildTime:45,energyProduction:0,energyConsumption:30},DEFENSE_PLATFORM:{maxHealth:1500,maxShield:800,shieldRegen:8,cost:{credits:500,metal:400,crystal:50},buildTime:30,energyProduction:0,energyConsumption:15},REFINERY:{maxHealth:1200,maxShield:200,shieldRegen:2,cost:{credits:600,metal:350,crystal:50},buildTime:40,energyProduction:0,energyConsumption:25},TRADE_HUB:{maxHealth:800,maxShield:200,shieldRegen:2,cost:{credits:1200,metal:200,crystal:100},buildTime:50,energyProduction:0,energyConsumption:10},SENSOR_ARRAY:{maxHealth:500,maxShield:100,shieldRegen:1,cost:{credits:400,metal:150,crystal:80},buildTime:25,energyProduction:0,energyConsumption:15},JUMP_GATE:{maxHealth:3e3,maxShield:1e3,shieldRegen:5,cost:{credits:3e3,metal:1500,crystal:500},buildTime:180,energyProduction:0,energyConsumption:50}};function e0(s,e){for(const[t,n]of Object.entries(e))n&&(s.resources[t]+=n)}function t0(s){return{credits:s.controlledSystems.length*_a.passiveIncomePerSystem}}function n0(s,e,t){if(!e.isOperational||e.productionQueue.length===0)return;const n=s.players.get(e.ownerId);if(!n)return;const i=e.productionQueue.slice(0,_a.maxConcurrentProduction);for(const r of i){const o=r.category==="unit"?vt[r.itemType].buildTime:gl[r.itemType].buildTime,a=t/o;r.progress+=a;const l=r.category==="unit"?vt[r.itemType].cost:gl[r.itemType].cost;for(const[c,u]of Object.entries(l)){if(!u)continue;const h=r.resourcesConsumed[c]||0,p=Math.min(u*a,u-h,n.resources[c]);p>0&&(n.resources[c]-=p,r.resourcesConsumed[c]=h+p)}if(r.progress>=1&&(i0(s,e,r),r.produced++,r.progress=0,r.resourcesConsumed={},r.produced>=r.count)){const c=e.productionQueue.indexOf(r);c!==-1&&e.productionQueue.splice(c,1)}}}function i0(s,e,t){if(t.category==="unit"){const n=e.rallyPoint||{x:e.position.x+10,y:e.position.y,z:e.position.z},i=Sg(s,e.ownerId,t.itemType,e.systemId,n);s.units.set(i.id,i),console.log(`[Economy] Produced ${t.itemType} at structure ${e.id}`)}else console.log(`[Economy] Structure ${t.itemType} ready for placement`)}function s0(s,e,t){if(!e.currentResearch)return;const n=s.technologies.get(e.currentResearch.technologyId);if(!n){e.currentResearch=null;return}const r=1+l0(s,e.id,"RESEARCH_LAB")*_a.researchSpeedPerLab,o=t/n.researchTime*r;e.currentResearch.progress+=o,e.currentResearch.estimatedTimeRemaining=(1-e.currentResearch.progress)*n.researchTime/r,e.currentResearch.progress>=1&&(r0(s,e,n),e.currentResearch=null)}function r0(s,e,t){e.unlockedTechnologies.push(t.id);for(const n of t.effects)a0(s,e,n);console.log(`[Economy] Research complete: ${t.name}`)}function a0(s,e,t){console.log(`[Economy] Applied effect: ${t.type} on ${t.target}`)}function o0(s,e){for(const t of s.players.values()){if(!t.isConnected)continue;const n=t0(t);e0(t,n),s0(s,t,e)}for(const t of s.structures.values())n0(s,t,e);for(const t of s.resourceSources.values())t.regenRate>0&&t.remaining<t.maxAmount&&(t.remaining=Math.min(t.maxAmount,t.remaining+t.regenRate*e))}function l0(s,e,t){let n=0;for(const i of s.structures.values())i.ownerId===e&&i.structureType===t&&i.isOperational&&n++;return n}const c0="modulepreload",u0=function(s){return"/"+s},_l={},h0=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=Promise.allSettled(t.map(l=>{if(l=u0(l),l in _l)return;_l[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":c0,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((p,m)=>{h.addEventListener("load",p),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},cn={peerServer:{host:"localhost",port:9e3,path:"/peejs",secure:!1},connectionTimeout:1e4,heartbeatInterval:1e3,heartbeatTimeout:5e3,maxPlayers:8,lockstepTimeout:100,lockstepInterval:50};class d0{localPlayerId="";localPlayerName="Player";connectionState="disconnected";roomState="none";peer=null;connections=new Map;currentRoom=null;peers=new Map;currentFrame=0;frames=new Map;localCommands=[];lockstepTimer=null;callbacks={};heartbeatTimer=null;constructor(){this.localPlayerId=this.generatePlayerId()}setCallbacks(e){this.callbacks={...this.callbacks,...e}}setPlayerName(e){this.localPlayerName=e}async connect(){if(this.connectionState==="connected")return!0;this.connectionState="connecting";try{const e=await this.loadPeerJS();return e?(this.peer=new e(this.localPlayerId,{...cn.peerServer,debug:2}),new Promise(t=>{const n=setTimeout(()=>{this.connectionState="error",this.callbacks.onError?.(new Error("Connection timeout")),t(!1)},cn.connectionTimeout);this.peer.on("open",i=>{clearTimeout(n),this.localPlayerId=i,this.connectionState="connected",this.startHeartbeat(),this.callbacks.onConnected?.(i),console.log(`[P2P] Connecté avec ID: ${i}`),t(!0)}),this.peer.on("error",i=>{clearTimeout(n),this.connectionState="error",this.callbacks.onError?.(i),console.error("[P2P] Erreur:",i),t(!1)}),this.peer.on("connection",i=>{this.handleIncomingConnection(i)})})):(console.warn("[P2P] PeerJS non disponible, mode offline"),this.connectionState="error",!1)}catch(e){return this.connectionState="error",this.callbacks.onError?.(e),!1}}async loadPeerJS(){if(typeof window<"u"&&window.Peer)return window.Peer;try{const e=await h0(()=>import("./bundler-DBqIhCiy.js"),[]);return e.default||e.Peer}catch{return console.warn("[P2P] PeerJS non trouvé"),null}}createRoom(e){const t=e||this.generateRoomId();return this.currentRoom={roomId:t,hostId:this.localPlayerId,players:[{peerId:this.localPlayerId,playerId:this.localPlayerId,playerName:this.localPlayerName,connectionState:"connected",latency:0,lastHeartbeat:Date.now()}],maxPlayers:cn.maxPlayers,gameState:"lobby"},this.roomState="hosting",console.log(`[P2P] Room créée: ${t}`),this.currentRoom}async joinRoom(e){if(this.peer||await this.connect(),this.connectionState!=="connected")return!1;this.roomState="joining";try{const t=this.peer.connect(e);return new Promise(n=>{const i=setTimeout(()=>{t.close(),this.roomState="none",n(!1)},cn.connectionTimeout);t.on("open",()=>{clearTimeout(i),this.handleConnection(t),this.sendTo(e,{type:"HELLO",senderId:this.localPlayerId,timestamp:Date.now(),payload:{playerName:this.localPlayerName}}),this.roomState="joined",n(!0)}),t.on("error",()=>{clearTimeout(i),this.roomState="none",n(!1)})})}catch{return this.roomState="none",!1}}leaveRoom(){for(const e of this.connections.values())e.close();this.connections.clear(),this.peers.clear(),this.currentRoom=null,this.roomState="none",this.stopLockstep(),console.log("[P2P] Room quittée")}handleIncomingConnection(e){console.log(`[P2P] Connexion entrante de: ${e.peer}`),e.on("open",()=>{this.handleConnection(e)})}handleConnection(e){const t=e.peer;this.connections.set(t,e),e.on("data",n=>{this.handleMessage(t,n)}),e.on("close",()=>{this.handleDisconnection(t)}),e.on("error",()=>{this.handleDisconnection(t)})}handleDisconnection(e){const t=this.peers.get(e);this.connections.delete(e),this.peers.delete(e),t&&(this.callbacks.onPeerLeft?.(t),Ze.emit("net:player-left",{playerId:e})),this.callbacks.onDisconnected?.(e),console.log(`[P2P] Peer déconnecté: ${e}`),this.currentRoom&&(this.currentRoom.players=this.currentRoom.players.filter(n=>n.peerId!==e),this.broadcastRoomUpdate())}handleMessage(e,t){switch(t.type){case"HELLO":this.handleHello(e,t);break;case"HEARTBEAT":this.handleHeartbeat(e);break;case"COMMAND":this.handleCommand(e,t);break;case"COMMANDS_BATCH":this.handleCommandsBatch(e,t);break;case"SNAPSHOT":this.handleSnapshot(t);break;case"READY":this.handleReady(e,t);break;case"CHAT":this.callbacks.onChat?.(t.payload,t.senderId);break;case"ROOM_UPDATE":this.handleRoomUpdate(t.payload);break;case"START_GAME":this.handleGameStart();break;case"END_GAME":this.handleGameEnd();break}}handleHello(e,t){const n=t.payload,i={peerId:e,playerId:e,playerName:n.playerName,connectionState:"connected",latency:0,lastHeartbeat:Date.now()};this.peers.set(e,i),this.callbacks.onPeerJoined?.(i),Ze.emit("net:player-joined",{playerId:e,playerName:n.playerName}),this.currentRoom&&this.roomState==="hosting"&&(this.currentRoom.players.push(i),this.broadcastRoomUpdate()),console.log(`[P2P] Joueur connecté: ${n.playerName}`)}handleHeartbeat(e){const t=this.peers.get(e);if(t){const n=Date.now();t.latency=n-t.lastHeartbeat,t.lastHeartbeat=n}}handleCommand(e,t){const{command:n,frameNumber:i}=t.payload;this.addCommandToFrame(i,e,n),this.callbacks.onCommand?.(n,e)}handleCommandsBatch(e,t){const{commands:n,frameNumber:i}=t.payload;for(const r of n)this.addCommandToFrame(i,e,r),this.callbacks.onCommand?.(r,e)}handleSnapshot(e){const{state:t,frameNumber:n}=e.payload;this.currentFrame=n,this.callbacks.onSnapshot?.(t,n)}handleReady(e,t){const n=t.payload,i=this.frames.get(n);i&&(i.ready.add(e),this.tryExecuteFrame(n))}handleRoomUpdate(e){this.currentRoom=e,this.callbacks.onRoomUpdate?.(e)}handleGameStart(){this.currentRoom&&(this.currentRoom.gameState="playing"),this.startLockstep(),this.callbacks.onGameStart?.(),Ze.emit("game:start",{playerId:this.localPlayerId,playerName:this.localPlayerName})}handleGameEnd(){this.currentRoom&&(this.currentRoom.gameState="ended"),this.stopLockstep(),this.callbacks.onGameEnd?.(),Ze.emit("game:end",{reason:"game_over"})}sendTo(e,t){const n=this.connections.get(e);n?.open&&n.send(t)}broadcast(e,t=!0){for(const[n,i]of this.connections)t&&n===this.localPlayerId||i.open&&i.send(e)}sendChat(e){this.broadcast({type:"CHAT",senderId:this.localPlayerId,timestamp:Date.now(),payload:e})}broadcastRoomUpdate(){this.currentRoom&&this.broadcast({type:"ROOM_UPDATE",senderId:this.localPlayerId,timestamp:Date.now(),payload:this.currentRoom})}startGame(){if(this.roomState!=="hosting"){console.warn("[P2P] Seul le host peut démarrer");return}this.currentRoom&&(this.currentRoom.gameState="starting"),this.broadcast({type:"START_GAME",senderId:this.localPlayerId,timestamp:Date.now(),payload:null}),this.handleGameStart()}startLockstep(){this.lockstepTimer===null&&(this.currentFrame=0,this.frames.clear(),this.lockstepTimer=window.setInterval(()=>{this.tickLockstep()},cn.lockstepInterval),console.log("[P2P] Lockstep démarré"))}stopLockstep(){this.lockstepTimer!==null&&(clearInterval(this.lockstepTimer),this.lockstepTimer=null)}tickLockstep(){const e=this.currentFrame+1;if(this.frames.has(e)||this.frames.set(e,{frameNumber:e,commands:new Map,ready:new Set,executed:!1}),this.localCommands.length>0){this.broadcast({type:"COMMANDS_BATCH",senderId:this.localPlayerId,timestamp:Date.now(),payload:{commands:this.localCommands,frameNumber:e}});for(const n of this.localCommands)this.addCommandToFrame(e,this.localPlayerId,n);this.localCommands=[]}this.frames.get(e).ready.add(this.localPlayerId),this.broadcast({type:"READY",senderId:this.localPlayerId,timestamp:Date.now(),payload:e}),this.tryExecuteFrame(e)}addCommandToFrame(e,t,n){let i=this.frames.get(e);i||(i={frameNumber:e,commands:new Map,ready:new Set,executed:!1},this.frames.set(e,i));let r=i.commands.get(t);r||(r=[],i.commands.set(t,r)),r.push(n)}tryExecuteFrame(e){const t=this.frames.get(e);if(!t||t.executed)return;if(!this.getAllPlayerIds().every(r=>t.ready.has(r))){const r=this.frames.get(e-1);if(r)if(Date.now()-r.frameNumber*cn.lockstepInterval>cn.lockstepTimeout)console.warn(`[P2P] Frame ${e} timeout, joueurs manquants`);else return}this.executeFrame(t)}executeFrame(e){e.executed=!0,this.currentFrame=e.frameNumber;const t=[],n=Array.from(e.commands.keys()).sort();for(const i of n){const r=e.commands.get(i)||[];for(const o of r)t.push({playerId:i,command:o})}for(const{command:i,playerId:r}of t)this.callbacks.onCommand?.(i,r);this.cleanupOldFrames()}cleanupOldFrames(){const e=this.currentFrame-10;for(const t of this.frames.keys())t<e&&this.frames.delete(t)}getAllPlayerIds(){const e=[this.localPlayerId];for(const t of this.peers.values())e.push(t.playerId);return e}queueCommand(e){this.localCommands.push(e)}sendSnapshot(e){this.broadcast({type:"SNAPSHOT",senderId:this.localPlayerId,timestamp:Date.now(),payload:{frameNumber:this.currentFrame,state:e}})}startHeartbeat(){this.heartbeatTimer===null&&(this.heartbeatTimer=window.setInterval(()=>{this.broadcast({type:"HEARTBEAT",senderId:this.localPlayerId,timestamp:Date.now(),payload:null});const e=Date.now();for(const[t,n]of this.peers)e-n.lastHeartbeat>cn.heartbeatTimeout&&(console.warn(`[P2P] Heartbeat timeout: ${t}`),this.handleDisconnection(t))},cn.heartbeatInterval))}stopHeartbeat(){this.heartbeatTimer!==null&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}generatePlayerId(){return`player-${Date.now()}-${Math.random().toString(36).substr(2,9)}`}generateRoomId(){return`room-${Math.random().toString(36).substr(2,6).toUpperCase()}`}get playerId(){return this.localPlayerId}get playerName(){return this.localPlayerName}get state(){return this.connectionState}get room(){return this.currentRoom}get isHost(){return this.roomState==="hosting"}get isConnected(){return this.connectionState==="connected"}get peerCount(){return this.peers.size}get frame(){return this.currentFrame}update(e){}sendCommand(e){this.queueCommand(e)}disconnect(){this.dispose()}onPeerConnected(e){this.callbacks.onConnected=e}onPeerDisconnected(e){this.callbacks.onDisconnected=e}onCommandReceived(e){this.callbacks.onCommand=e}dispose(){this.stopHeartbeat(),this.stopLockstep(),this.leaveRoom(),this.peer&&(this.peer.destroy(),this.peer=null),this.connectionState="disconnected"}}const dt=new d0,xl={tickInterval:50,maxFramesBehind:10};class fc{gameState;loopState="STOPPED";intervalId=null;lastTickTime=0;pendingCommands=[];localCommandsThisFrame=[];callbacks={};tickCount=0;frameTime=0;averageTickTime=0;constructor(){this.gameState=Ki(),this.setupNetworkCallbacks()}initializeGame(e,t){this.gameState=Ki(),this.gameState.players.set(e,{id:e,name:t,color:this.generatePlayerColor(e),isConnected:!0,isHost:!0,resources:{credits:5e3,metal:2e3,crystal:500,fuel:1e3,population:100},controlledSystems:[],unlockedTechnologies:[],currentResearch:null,diplomacy:new Map}),this.gameState.localPlayerId=e,this.log(`Partie initialisée pour ${t}`)}setupNetworkCallbacks(){dt.setCallbacks({onCommand:(e,t)=>{this.receiveNetworkCommand(e,t)},onSnapshot:(e,t)=>{this.applySyncState(e,t)},onGameStart:()=>{this.start()}})}start(){this.loopState!=="RUNNING"&&(this.loopState="RUNNING",this.lastTickTime=performance.now(),this.intervalId=setInterval(()=>{this.tick()},xl.tickInterval),this.log("Boucle de jeu démarrée"))}pause(){this.loopState==="RUNNING"&&(this.loopState="PAUSED",this.log("Boucle de jeu en pause"))}resume(){this.loopState==="PAUSED"&&(this.loopState="RUNNING",this.lastTickTime=performance.now(),this.log("Boucle de jeu reprise"))}stop(){this.loopState="STOPPED",this.intervalId!==null&&(clearInterval(this.intervalId),this.intervalId=null),this.log("Boucle de jeu arrêtée")}getState(){return this.loopState}tick(){if(this.loopState!=="RUNNING")return;const e=performance.now(),t=e,n=(t-this.lastTickTime)/1e3;this.lastTickTime=t;const i=this.collectCommands();this.localCommandsThisFrame.length>0&&dt.submitCommands(this.gameState.currentFrame,this.localCommandsThisFrame),this.localCommandsThisFrame=[],i.sort((r,o)=>{const a=(r.playerId||"").localeCompare(o.playerId||"");return a!==0?a:(r.timestamp||0)-(o.timestamp||0)});for(const r of i)dc(this.gameState,r);this.updateSystems(n),this.checkVictoryConditions(),this.gameState.currentFrame++,this.gameState.gameTime+=n,this.tickCount++,this.frameTime=performance.now()-e,this.averageTickTime=this.averageTickTime*.9+this.frameTime*.1,this.callbacks.onTick?.(this.gameState,n)}processLockstep(){const e=this.gameState.currentFrame,n=dt.frame-e;return n>xl.maxFramesBehind?(console.warn(`[GameLoop] Trop de frames de retard (${n}), resync nécessaire`),dt.sendSnapshot(this.getSnapshot()),this.loopState="WAITING_SYNC",!1):(this.loopState==="WAITING_SYNC"&&(this.loopState="RUNNING"),!0)}queueCommand(e){e.timestamp=Date.now(),e.playerId=this.gameState.localPlayerId||"",this.pendingCommands.push(e),this.localCommandsThisFrame.push(e)}receiveNetworkCommand(e,t){e.playerId=t,this.pendingCommands.push(e)}collectCommands(){const e=[...this.pendingCommands];return this.pendingCommands=[],e}updateSystems(e){uc(this.gameState,e);const t=hc(this.gameState);for(const n of t.attacks)n.isKill&&this.callbacks.onUnitDestroyed?.(n.targetId,this.gameState);o0(this.gameState,e),this.cleanupDestroyedUnits(),this.updateStructures(e)}cleanupDestroyedUnits(){const e=[];for(const[t,n]of this.gameState.units)n.state==="DESTROYED"&&e.push(t);for(const t of e)this.gameState.units.delete(t)}updateStructures(e){for(const t of this.gameState.structures.values()){const n=this.getStructureStats(t.structureType);n&&t.shield<n.maxShield&&(t.shield=Math.min(n.maxShield,t.shield+n.shieldRegen*e))}}getStructureStats(e){return{SPACE_STATION:{maxShield:2e3,shieldRegen:10},SHIPYARD:{maxShield:500,shieldRegen:5},RESEARCH_LAB:{maxShield:300,shieldRegen:3},DEFENSE_PLATFORM:{maxShield:800,shieldRegen:8},REFINERY:{maxShield:200,shieldRegen:2},TRADE_HUB:{maxShield:200,shieldRegen:2},SENSOR_ARRAY:{maxShield:100,shieldRegen:1},JUMP_GATE:{maxShield:1e3,shieldRegen:5}}[e]||null}checkVictoryConditions(){const e=[];for(const[t,n]of this.gameState.players){const i=this.countPlayerUnits(t)>0,r=this.countPlayerStructures(t)>0;(i||r)&&e.push(t)}e.length===1?(this.callbacks.onGameOver?.(e[0]),this.stop()):e.length===0&&(this.callbacks.onGameOver?.(null),this.stop())}countPlayerUnits(e){let t=0;for(const n of this.gameState.units.values())n.ownerId===e&&n.state!=="DESTROYED"&&t++;return t}countPlayerStructures(e){let t=0;for(const n of this.gameState.structures.values())n.ownerId===e&&n.isOperational&&t++;return t}applySyncState(e,t){this.log(`Sync reçue pour frame ${t}`),e.currentFrame!==void 0&&(this.gameState.currentFrame=e.currentFrame),e.gameTime!==void 0&&(this.gameState.gameTime=e.gameTime)}getSnapshot(){return{currentFrame:this.gameState.currentFrame,gameTime:this.gameState.gameTime}}setCallbacks(e){this.callbacks={...this.callbacks,...e}}getGameState(){return this.gameState}getStats(){return{tickCount:this.tickCount,averageTickTime:this.averageTickTime,frameTime:this.frameTime}}generatePlayerColor(e){const t=["#3498db","#e74c3c","#2ecc71","#f39c12","#9b59b6","#1abc9c","#e91e63","#ff9800"];let n=0;for(let i=0;i<e.length;i++)n=(n<<5)-n+e.charCodeAt(i),n|=0;return t[Math.abs(n)%t.length]}log(e){}}new fc;class kr{state;constructor(e){this.state=e}createUnit(e){const t=this.state.nextEntityId++,n={id:t,ownerId:e.ownerId,shipClass:e.shipClass,systemId:e.systemId,position:{...e.position},velocity:{x:0,y:0,z:0},rotation:0,destination:null,health:100,shield:50,targetId:null,combatStance:"DEFENSIVE",attackCooldown:0,state:"IDLE",formation:"NONE",formationOffset:{x:0,y:0,z:0},groupLeaderId:null,cargo:{},orderQueue:[],createdAtFrame:this.state.currentFrame,updatedAtFrame:this.state.currentFrame};return this.state.units.set(t,n),n}destroyUnit(e,t=!1){const n=this.state.units.get(e);n&&(t?this.state.units.delete(e):(n.state="DESTROYED",n.updatedAtFrame=this.state.currentFrame))}setSelected(e,t){const n=this.state.selectedUnitIds.indexOf(e);t&&n===-1?this.state.selectedUnitIds.push(e):!t&&n!==-1&&this.state.selectedUnitIds.splice(n,1)}clearSelection(){this.state.selectedUnitIds=[]}getSelectedUnits(){return this.state.selectedUnitIds.map(e=>this.state.units.get(e)).filter(e=>e!==void 0&&e.state!=="DESTROYED")}getActiveUnits(){const e=[];for(const t of this.state.units.values())t.state!=="DESTROYED"&&e.push(t);return e}getUnit(e){return this.state.units.get(e)}getPlayerUnits(e){const t=[];for(const n of this.state.units.values())n.ownerId===e&&n.state!=="DESTROYED"&&t.push(n);return t}moveUnits(e,t,n=2){const i=e.map(a=>this.state.units.get(a)).filter(a=>!!a);if(i.length===0)return;const r=i.length,o=Math.ceil(Math.sqrt(r));i.forEach((a,l)=>{const c=Math.floor(l/o),h=(l%o-o/2)*n,p=(c-Math.ceil(r/o)/2)*n;da(a,{x:t.x+h,y:t.y,z:t.z+p})})}attackWithUnits(e,t){for(const n of e){const i=this.state.units.get(n);i&&i.state!=="DESTROYED"&&fa(i,t)}}stopUnits(e){for(const t of e){const n=this.state.units.get(t);n&&pa(n)}}patrolUnits(e,t){for(const n of e){const i=this.state.units.get(n);i&&i.state!=="DESTROYED"&&ma(i,t)}}setFormation(e,t){if(e.length===0)return;const n=e[0];for(const i of e){const r=this.state.units.get(i);r&&(r.formation=t,r.groupLeaderId=i===n?null:n)}}getUnitsInRadius(e,t,n){const i=[],r=t*t;for(const o of this.state.units.values()){if(o.state==="DESTROYED"||n&&o.ownerId!==n)continue;const a=o.position.x-e.x,l=o.position.y-e.y,c=o.position.z-e.z;a*a+l*l+c*c<=r&&i.push(o)}return i}getUnitsByType(e,t){const n=[];for(const i of this.state.units.values())i.state!=="DESTROYED"&&i.shipClass===e&&(t&&i.ownerId!==t||n.push(i));return n}getUnitsInSystem(e,t){const n=[];for(const i of this.state.units.values())i.state!=="DESTROYED"&&i.systemId===e&&(t&&i.ownerId!==t||n.push(i));return n}getVisibleEnemies(e){const t=[];for(const i of this.state.units.values()){if(i.id===e.id||i.ownerId===e.ownerId||i.state==="DESTROYED"||i.systemId!==e.systemId)continue;const r=i.position.x-e.position.x,o=i.position.y-e.position.y,a=i.position.z-e.position.z;Math.sqrt(r*r+o*o+a*a)<=100&&t.push(i)}return t}getUnitCounts(e){const t=new Map;for(const n of this.state.units.values()){if(n.ownerId!==e||n.state==="DESTROYED")continue;const i=t.get(n.shipClass)??0;t.set(n.shipClass,i+1)}return t}getFleetValue(e){let t=0;for(const n of this.state.units.values())n.ownerId===e&&n.state!=="DESTROYED"&&(t+=100);return t}cleanupDestroyedUnits(){let e=0;for(const[t,n]of this.state.units.entries())n.state==="DESTROYED"&&(this.state.units.delete(t),e++);return e}}const Tt={systemsPerCluster:{min:3,max:8},systemSpacing:50,planetsPerSystem:{min:2,max:10},asteroidFieldChance:.4,orbitDistance:{min:30,max:300},starTypeProbabilities:{M_RED_DWARF:.4,K_ORANGE:.2,G_YELLOW:.15,F_YELLOW_WHITE:.1,A_WHITE:.06,B_BLUE:.04,O_BLUE_GIANT:.02,RED_GIANT:.02,WHITE_DWARF:.01,NEUTRON:.005},starColors:{O_BLUE_GIANT:10203391,B_BLUE:11190271,A_WHITE:13293567,F_YELLOW_WHITE:16316415,G_YELLOW:16774378,K_ORANGE:16765601,M_RED_DWARF:16764015,RED_GIANT:16739179,WHITE_DWARF:16777215,NEUTRON:8965375},planetColors:{TERRAN:4886313,OCEAN:1734143,DESERT:12756557,ICE:13955577,GAS_GIANT:15254378,VOLCANIC:9109504,BARREN:8421504,TOXIC:10145074}};class vl{seed;constructor(e){this.seed=e}next(){let e=this.seed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}nextInt(e,t){return Math.floor(this.next()*(t-e+1))+e}nextFloat(e,t){return this.next()*(t-e)+e}chance(e){return this.next()<e}pick(e){return e[this.nextInt(0,e.length-1)]}pickWeighted(e){const t=Object.entries(e),n=t.reduce((r,[o,a])=>r+a,0);let i=this.next()*n;for(const[r,o]of t)if(i-=o,i<=0)return r;return t[t.length-1][0]}}const yl=["Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Theta","Kappa","Nova","Proxima","Kepler","Gliese","Tau","Sigma","Omega","Cygni","Centauri","Lyrae","Draconis","Pegasi","Aquarii"],f0=["Prime","Major","Minor","Secundus","Tertius","Quartus","I","II","III","IV","V","VI","VII","VIII","IX","X"],p0=["Sol","Vega","Rigel","Sirius","Arcturus","Betelgeuse","Polaris","Aldebaran","Antares","Canopus","Capella","Deneb","Fomalhaut","Regulus","Spica","Achernar","Altair","Procyon","Pollux"],m0=["Terra","Aqua","Ignis","Ventus","Glacius","Ferrum","Aether","Nox","Lux","Umbra","Vita","Mors","Tempus","Chaos","Ordo"];function g0(s){return s.chance(.3)?s.pick(p0):s.chance(.5)?`${s.pick(yl)}-${s.nextInt(100,999)}`:`${s.pick(yl)} ${s.pick(f0)}`}function _0(s,e,t){return t.chance(.4)?`${s} ${["I","II","III","IV","V","VI","VII","VIII","IX","X"][e]||e+1}`:t.pick(m0)+"-"+t.nextInt(1,99)}class pc{galaxySeed;rng;constructor(e){this.galaxySeed=e??Date.now(),this.rng=new vl(this.galaxySeed)}generateGalaxy(e,t,n){const i=new Map;for(let r=0;r<e;r++)for(let o=0;o<t;o++){const a=this.generateCluster(r,o,n);for(const l of a)i.set(l.id,l)}return{seed:this.galaxySeed,name:this.generateGalaxyName(),systems:i,clusterSize:n,clustersX:e,clustersZ:t}}generateGalaxyName(){const e=["Andromeda","Milky","Spiral","Triangulum","Whirlpool","Sombrero"],t=["Galaxy","Cluster","Expanse","Nebula","Sector"];return`${this.rng.pick(e)} ${this.rng.pick(t)}`}generateCluster(e,t,n){const i=[],r=this.rng.nextInt(Tt.systemsPerCluster.min,Tt.systemsPerCluster.max),o=e*n*Tt.systemSpacing,a=t*n*Tt.systemSpacing;for(let l=0;l<r;l++){const c=this.rng.nextFloat(0,Math.PI*2),u=this.rng.nextFloat(0,n*Tt.systemSpacing*.4),h=o+Math.cos(c)*u,p=this.rng.nextFloat(-20,20),m=a+Math.sin(c)*u,g=this.galaxySeed+e*1e3+t*100+l,y=this.generateSystem(g,{x:h,y:p,z:m},e,t);i.push(y)}return i}generateSystem(e,t,n,i){const r=new vl(e),o=g0(r),a=`sys-${e}`,l=this.generateStar(a,o,t,r),c=r.nextInt(Tt.planetsPerSystem.min,Tt.planetsPerSystem.max),u=this.generatePlanets(a,o,l,c,r),h=this.generateAsteroidFields(a,u,r);return{id:a,seed:e,name:o,position:t,clusterX:n,clusterZ:i,star:l,planets:u,asteroidFields:h,discovered:!1,ownerId:null}}generateStar(e,t,n,i){const r=i.pickWeighted(Tt.starTypeProbabilities),o=Tt.starColors[r];let a,l,c;switch(r){case"O_BLUE_GIANT":a=i.nextFloat(10,15),l=i.nextInt(3e4,5e4),c=i.nextFloat(30,100);break;case"B_BLUE":a=i.nextFloat(5,10),l=i.nextInt(1e4,3e4),c=i.nextFloat(10,30);break;case"A_WHITE":a=i.nextFloat(2,5),l=i.nextInt(7500,1e4),c=i.nextFloat(5,10);break;case"F_YELLOW_WHITE":a=i.nextFloat(1.5,2.5),l=i.nextInt(6e3,7500),c=i.nextFloat(2,5);break;case"G_YELLOW":a=i.nextFloat(.9,1.5),l=i.nextInt(5200,6e3),c=i.nextFloat(.8,2);break;case"K_ORANGE":a=i.nextFloat(.7,.9),l=i.nextInt(3700,5200),c=i.nextFloat(.3,.8);break;case"M_RED_DWARF":a=i.nextFloat(.3,.7),l=i.nextInt(2400,3700),c=i.nextFloat(.01,.3);break;case"RED_GIANT":a=i.nextFloat(20,50),l=i.nextInt(3e3,5e3),c=i.nextFloat(50,200);break;case"WHITE_DWARF":a=i.nextFloat(.01,.02),l=i.nextInt(1e4,4e4),c=i.nextFloat(.001,.01);break;case"NEUTRON":a=1e-5,l=1e6,c=i.nextFloat(1e-4,.001);break;default:a=1,l=5800,c=1}return{id:`${e}-star`,name:t,type:r,radius:a,temperature:l,color:o,luminosity:c,position:n}}generatePlanets(e,t,n,i,r){const o=[],a=(Tt.orbitDistance.max-Tt.orbitDistance.min)/i;for(let l=0;l<i;l++){const c=Tt.orbitDistance.min+a*l+r.nextFloat(-5,5),u=this.generatePlanet(`${e}-planet-${l}`,_0(t,l,r),c,n,r);o.push(u)}return o}generatePlanet(e,t,n,i,r){const o=this.determinePlanetType(n,i,r),a=Tt.planetColors[o];let l,c,u;switch(o){case"GAS_GIANT":l=r.nextFloat(8,15),c=0,u=!0;break;case"TERRAN":l=r.nextFloat(.8,1.5),c=r.nextFloat(.6,1),u=!0;break;case"OCEAN":l=r.nextFloat(.9,1.4),c=r.nextFloat(.4,.8),u=!0;break;case"DESERT":l=r.nextFloat(.6,1.2),c=r.nextFloat(.1,.4),u=r.chance(.6);break;case"ICE":l=r.nextFloat(.5,1.3),c=r.nextFloat(0,.2),u=r.chance(.4);break;case"VOLCANIC":l=r.nextFloat(.4,.9),c=0,u=r.chance(.3);break;case"TOXIC":l=r.nextFloat(.6,1.1),c=0,u=!0;break;default:l=r.nextFloat(.3,.8),c=0,u=!1}const h=.1/Math.sqrt(n),p=r.nextFloat(.01,.1),m=r.nextFloat(0,Math.PI*2),g=this.generatePlanetResources(o,r),y=this.generateMoons(e,t,l,r);return{id:e,name:t,type:o,radius:l,orbitRadius:n,orbitSpeed:h,orbitPhase:m,rotationSpeed:p,hasAtmosphere:u,atmosphereColor:u?this.generateAtmosphereColor(o,r):void 0,surfaceColor:a,resources:g,habitability:c,moons:y}}determinePlanetType(e,t,n){const i=t.luminosity*.8*100,r=t.luminosity*1.2*100,o=e/Tt.orbitDistance.max;if(o<.15)return n.chance(.7)?"VOLCANIC":"BARREN";if(o<.3)return n.chance(.4)?"DESERT":n.chance(.3)?"TOXIC":"BARREN";if(e>=i&&e<=r){const a=n.next();return a<.4?"TERRAN":a<.7?"OCEAN":a<.85?"DESERT":"BARREN"}return o<.6?n.chance(.5)?"GAS_GIANT":n.chance(.3)?"ICE":"BARREN":n.chance(.6)?"GAS_GIANT":n.chance(.5)?"ICE":"BARREN"}generatePlanetResources(e,t){const n=[];return t.chance(.7)&&n.push({type:"METAL",amount:t.nextInt(1e3,1e4),richness:t.nextFloat(.3,1)}),t.chance(e==="VOLCANIC"?.5:.2)&&n.push({type:"CRYSTAL",amount:t.nextInt(500,3e3),richness:t.nextFloat(.2,.8)}),e==="GAS_GIANT"&&n.push({type:"FUEL",amount:t.nextInt(5e3,5e4),richness:t.nextFloat(.5,1)}),t.chance(.1)&&n.push({type:"RARE_ELEMENTS",amount:t.nextInt(100,1e3),richness:t.nextFloat(.1,.5)}),n}generateAtmosphereColor(e,t){switch(e){case"TERRAN":return 8900331;case"OCEAN":return 4286945;case"DESERT":return 14329120;case"TOXIC":return 10145074;case"GAS_GIANT":return t.pick([15254378,16752762,8900331,14524637]);default:return 13421772}}generateMoons(e,t,n,i){const r=[],o=Math.floor(n/2),a=i.chance(.5)?i.nextInt(0,o):0;for(let l=0;l<a;l++)r.push({id:`${e}-moon-${l}`,name:`${t} ${String.fromCharCode(97+l)}`,radius:i.nextFloat(.1,.4),orbitRadius:n*2+i.nextFloat(1,5)*(l+1),orbitSpeed:i.nextFloat(.5,2),color:i.pick([8421504,10526880,12632256,6316128])});return r}generateAsteroidFields(e,t,n){const i=[];if(t.length>=4&&n.chance(Tt.asteroidFieldChance)){const r=(t[2].orbitRadius+t[3].orbitRadius)/2;i.push({id:`${e}-belt-main`,position:{x:0,y:0,z:0},radius:r,density:n.nextInt(100,500),resources:[{type:"METAL",amount:n.nextInt(1e4,5e4),richness:n.nextFloat(.5,1)},{type:"CRYSTAL",amount:n.nextInt(2e3,1e4),richness:n.nextFloat(.3,.8)}]})}if(n.chance(.3)){const r=Tt.orbitDistance.max*1.2;i.push({id:`${e}-belt-outer`,position:{x:0,y:0,z:0},radius:r,density:n.nextInt(50,200),resources:[{type:"FUEL",amount:n.nextInt(5e3,2e4),richness:n.nextFloat(.4,.9)}]})}return i}regenerateSystem(e){return this.generateSystem(e.seed,e.position,e.clusterX,e.clusterZ)}getSeed(){return this.galaxySeed}}const x0=new pc;class xa{gameManager;gameLoop;commandProcessor;unitController=null;formationManager;galaxyGenerator;session=null;config;onSessionUpdate=null;onError=null;constructor(e){this.config={clustersX:3,clustersZ:3,debug:!1,...e},this.gameManager=Ut.getInstance(),this.gameLoop=new fc,this.commandProcessor=new Qg,this.formationManager=new ga,this.galaxyGenerator=new pc,this.setupNetworkCallbacks(),this.setupGameEvents(),console.log("[GameIntegration] Initialized")}setCallbacks(e){e.onSessionUpdate&&(this.onSessionUpdate=e.onSessionUpdate),e.onError&&(this.onError=e.onError)}setupNetworkCallbacks(){dt.setCallbacks({onConnected:e=>{console.log(`[GameIntegration] Connected as ${e}`)},onPeerJoined:e=>{console.log(`[GameIntegration] Player joined: ${e.playerName}`),Ze.emit("net:player-joined",{playerId:e.playerId,playerName:e.playerName})},onPeerLeft:e=>{console.log(`[GameIntegration] Player left: ${e.playerName}`),Ze.emit("net:player-left",{playerId:e.playerId})},onCommand:(e,t)=>{this.handleRemoteCommand(e,t)},onSnapshot:(e,t)=>{this.handleSnapshot(e,t)},onGameStart:()=>{this.handleGameStart()},onGameEnd:()=>{this.handleGameEnd()},onError:e=>{console.error("[GameIntegration] Network error:",e),this.onError?.(e)}})}setupGameEvents(){Ze.on("unit:destroyed",e=>{Ze.emit("ui:notification",{type:"warning",message:`Unit ${e.unitId} destroyed`})}),Ze.on("combat:started",e=>{}),Ze.on("resources:changed",e=>{})}async hostGame(e){if(console.log("[GameIntegration] Hosting new game..."),!await dt.connect())throw new Error("Failed to connect to signaling server");const n=dt.createRoom(e),i=this.config.galaxySeed??Date.now(),r=this.galaxyGenerator.generateGalaxy(i,`Galaxy-${i}`,this.config.clustersX,this.config.clustersZ),o=dt.getLocalPlayerId();this.gameLoop.initializeGame(o,this.config.playerName);const a=this.gameLoop.getGameState();return this.unitController=new kr(a),this.session={sessionId:n.roomId,isHost:!0,localPlayerId:o,galaxy:r,state:"lobby"},this.onSessionUpdate?.(this.session),console.log(`[GameIntegration] Game hosted: ${n.roomId}`),this.session}async joinGame(e){if(console.log(`[GameIntegration] Joining game: ${e}`),!await dt.connect())throw new Error("Failed to connect to signaling server");if(!await dt.joinRoom(e))throw new Error("Failed to join room");const i=dt.getLocalPlayerId();this.gameLoop.initializeGame(i,this.config.playerName);const r=this.gameLoop.getGameState();return this.unitController=new kr(r),this.session={sessionId:e,isHost:!1,localPlayerId:i,galaxy:null,state:"lobby"},this.onSessionUpdate?.(this.session),console.log("[GameIntegration] Joined game, waiting for host..."),this.session}startGame(){if(!this.session?.isHost){console.warn("[GameIntegration] Only host can start game");return}this.session.state="starting",this.spawnStartingUnits(),dt.startGame()}spawnStartingUnits(){const e=this.gameLoop.getGameState(),t=Array.from(this.session.galaxy.systems.values());let n=0;for(const[i,r]of e.players){const o=t[n%t.length];n++;const a={x:o.position.x,y:o.position.y+5,z:o.position.z};Br(e,i,"MOTHERSHIP",o.id,a,"Mothership");for(let l=0;l<5;l++){const c=l*3;Br(e,i,"FIGHTER",o.id,{x:a.x+c,y:a.y,z:a.z+10})}for(let l=0;l<2;l++)Br(e,i,"HARVESTER",o.id,{x:a.x-10,y:a.y,z:a.z+l*5});console.log(`[GameIntegration] Spawned starting units for ${r.name} in ${o.name}`)}}sendCommand(e){const t=this.gameLoop.getGameState(),n=this.commandProcessor.process(t,e);n.success?dt.sendCommand(e):console.warn("[GameIntegration] Command failed:",n.message)}handleRemoteCommand(e,t){if(e.playerId!==t){console.warn("[GameIntegration] Command sender mismatch");return}const n=this.gameLoop.getGameState();this.commandProcessor.process(n,e)}handleSnapshot(e,t){console.log(`[GameIntegration] Received snapshot for frame ${t}`);const n=this.gameLoop.getGameState();e.units&&(n.units=new Map(e.units)),e.players&&(n.players=new Map(e.players)),e.currentFrame&&(n.currentFrame=e.currentFrame),this.unitController=new kr(n)}handleGameStart(){this.session&&(this.session.state="playing",this.onSessionUpdate?.(this.session)),this.gameLoop.start(),console.log("[GameIntegration] Game started!"),Ze.emit("game:start",{playerId:this.session.localPlayerId,playerName:this.config.playerName})}handleGameEnd(){this.session&&(this.session.state="ended",this.onSessionUpdate?.(this.session)),this.gameLoop.stop(),console.log("[GameIntegration] Game ended")}moveSelectedUnits(e,t){e.length!==0&&this.sendCommand({type:"MOVE",unitIds:e,target:t,queue:!1,playerId:this.session.localPlayerId,timestamp:Date.now()})}attackWithSelectedUnits(e,t){e.length!==0&&this.sendCommand({type:"ATTACK",unitIds:e,targetId:t,queue:!1,playerId:this.session.localPlayerId,timestamp:Date.now()})}stopSelectedUnits(e){e.length!==0&&this.sendCommand({type:"STOP",unitIds:e,playerId:this.session.localPlayerId,timestamp:Date.now()})}setFormation(e,t){e.length!==0&&this.sendCommand({type:"SET_FORMATION",unitIds:e,formation:t,playerId:this.session.localPlayerId,timestamp:Date.now()})}getSession(){return this.session}getGameState(){return this.gameLoop.getGameState()}getUnitController(){return this.unitController}getFormationManager(){return this.formationManager}isHost(){return this.session?.isHost??!1}isPlaying(){return this.session?.state==="playing"}dispose(){this.gameLoop.stop(),dt.leaveRoom(),Ut.dispose(),this.session=null,console.log("[GameIntegration] Disposed")}}const Wn={notificationDuration:3e3,maxNotifications:5,minimapSize:200},v0=`
  .hud-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
    z-index: 1000;
  }
  
  .hud-container * {
    box-sizing: border-box;
  }
  
  /* Top bar - Resources */
  .hud-topbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4));
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 30px;
    pointer-events: auto;
  }
  
  .resource-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .resource-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  
  .resource-value {
    font-size: 14px;
    font-weight: bold;
    min-width: 60px;
  }
  
  .resource-label {
    font-size: 11px;
    opacity: 0.7;
    text-transform: uppercase;
  }
  
  /* Bottom panel - Selection */
  .hud-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6));
    display: flex;
    pointer-events: auto;
  }
  
  /* Selection panel */
  .selection-panel {
    flex: 1;
    padding: 10px;
    display: flex;
    gap: 10px;
  }
  
  .selected-unit {
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .selected-unit:hover {
    border-color: #4fc3f7;
    background: rgba(79,195,247,0.2);
  }
  
  .selected-unit.primary {
    border-color: #4caf50;
    background: rgba(76,175,80,0.2);
  }
  
  .unit-icon {
    font-size: 24px;
  }
  
  .unit-health-bar {
    width: 50px;
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    margin-top: 4px;
    overflow: hidden;
  }
  
  .unit-health-fill {
    height: 100%;
    background: linear-gradient(to right, #4caf50, #8bc34a);
    transition: width 0.3s;
  }
  
  .unit-health-fill.low {
    background: linear-gradient(to right, #ff5722, #ff9800);
  }
  
  .unit-health-fill.critical {
    background: linear-gradient(to right, #f44336, #e91e63);
  }
  
  /* Unit info panel */
  .unit-info-panel {
    width: 200px;
    padding: 10px;
    border-left: 1px solid rgba(255,255,255,0.2);
  }
  
  .unit-info-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .unit-info-type {
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 10px;
  }
  
  .unit-stat {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 3px;
  }
  
  .unit-stat-label {
    opacity: 0.7;
  }
  
  /* Orders panel */
  .orders-panel {
    width: 180px;
    padding: 10px;
    border-left: 1px solid rgba(255,255,255,0.2);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  
  .order-button {
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 10px;
    transition: all 0.2s;
  }
  
  .order-button:hover {
    background: rgba(79,195,247,0.3);
    border-color: #4fc3f7;
  }
  
  .order-button:active {
    transform: scale(0.95);
  }
  
  .order-button .icon {
    font-size: 18px;
    margin-bottom: 2px;
  }
  
  /* Minimap */
  .hud-minimap {
    position: absolute;
    bottom: 160px;
    right: 10px;
    width: ${Wn.minimapSize}px;
    height: ${Wn.minimapSize}px;
    background: rgba(0,0,0,0.8);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    pointer-events: auto;
    overflow: hidden;
  }
  
  .minimap-canvas {
    width: 100%;
    height: 100%;
  }
  
  .minimap-viewport {
    position: absolute;
    border: 1px solid #4fc3f7;
    background: rgba(79,195,247,0.1);
    pointer-events: none;
  }
  
  /* Notifications */
  .hud-notifications {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    pointer-events: none;
  }
  
  .notification {
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 13px;
    animation: notificationSlide 0.3s ease-out;
    pointer-events: auto;
  }
  
  @keyframes notificationSlide {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification.INFO {
    background: rgba(33,150,243,0.9);
    border-left: 4px solid #2196f3;
  }
  
  .notification.WARNING {
    background: rgba(255,152,0,0.9);
    border-left: 4px solid #ff9800;
  }
  
  .notification.ERROR {
    background: rgba(244,67,54,0.9);
    border-left: 4px solid #f44336;
  }
  
  .notification.SUCCESS {
    background: rgba(76,175,80,0.9);
    border-left: 4px solid #4caf50;
  }
  
  .notification.COMBAT {
    background: rgba(156,39,176,0.9);
    border-left: 4px solid #9c27b0;
  }
  
  /* Build menu */
  .hud-build-menu {
    position: absolute;
    bottom: 160px;
    left: 10px;
    width: 250px;
    background: rgba(0,0,0,0.9);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    pointer-events: auto;
    display: none;
  }
  
  .hud-build-menu.visible {
    display: block;
  }
  
  .build-menu-header {
    padding: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-weight: bold;
    font-size: 14px;
  }
  
  .build-menu-items {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }
  
  .build-item {
    width: 50px;
    height: 60px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .build-item:hover {
    background: rgba(79,195,247,0.3);
    border-color: #4fc3f7;
  }
  
  .build-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .build-item .icon {
    font-size: 24px;
  }
  
  .build-item .cost {
    font-size: 10px;
    opacity: 0.7;
  }
  
  /* Control groups */
  .hud-control-groups {
    position: absolute;
    top: 50px;
    left: 10px;
    display: flex;
    gap: 5px;
    pointer-events: auto;
  }
  
  .control-group {
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  
  .control-group:hover {
    border-color: #4fc3f7;
  }
  
  .control-group.active {
    border-color: #4caf50;
    background: rgba(76,175,80,0.3);
  }
  
  .control-group .count {
    font-size: 10px;
    opacity: 0.7;
  }
  
  /* Formation buttons */
  .hud-formations {
    position: absolute;
    top: 100px;
    left: 10px;
    display: flex;
    gap: 5px;
    pointer-events: auto;
  }
  
  .formation-button {
    width: 50px;
    height: 40px;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 10px;
    transition: all 0.2s;
  }
  
  .formation-button:hover {
    border-color: #4fc3f7;
    background: rgba(79,195,247,0.2);
  }
  
  .formation-button .icon {
    font-size: 16px;
    margin-bottom: 2px;
  }
  
  /* Game time */
  .hud-game-time {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 12px;
    opacity: 0.7;
  }
  
  /* FPS counter */
  .hud-fps {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 12px;
    opacity: 0.7;
  }
`;class y0{container;styleElement;topbar=null;selectionPanel=null;unitInfoPanel=null;ordersPanel=null;minimap=null;minimapCanvas=null;minimapCtx=null;notificationsContainer=null;buildMenu=null;controlGroups=null;formationsPanel=null;fpsDisplay=null;gameTimeDisplay=null;resources={credits:1e3,metal:500,crystal:100,fuel:200,population:0};selectedUnits=[];notifications=[];controlGroupsData=new Map;callbacks={};lastFrameTime=0;frameCount=0;currentFPS=60;gameStartTime=Date.now();buildMenuVisible=!1;constructor(){this.container=document.createElement("div"),this.container.className="hud-container",this.styleElement=document.createElement("style"),this.styleElement.textContent=v0,document.head.appendChild(this.styleElement),this.build(),document.body.appendChild(this.container)}build(){this.buildTopbar(),this.buildBottomPanel(),this.buildMinimap(),this.buildNotifications(),this.buildBuildMenu(),this.buildControlGroups(),this.buildFormations(),this.buildFPSDisplay(),this.buildGameTimeDisplay()}buildTopbar(){this.topbar=document.createElement("div"),this.topbar.className="hud-topbar",this.topbar.innerHTML=`
      <div class="resource-item">
        <div class="resource-icon">💰</div>
        <div>
          <div class="resource-value" id="res-credits">1000</div>
          <div class="resource-label">Crédits</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">🔩</div>
        <div>
          <div class="resource-value" id="res-metal">500</div>
          <div class="resource-label">Métal</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">💎</div>
        <div>
          <div class="resource-value" id="res-crystal">100</div>
          <div class="resource-label">Cristaux</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">⛽</div>
        <div>
          <div class="resource-value" id="res-fuel">200</div>
          <div class="resource-label">Carburant</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">👥</div>
        <div>
          <div class="resource-value" id="res-population">0/100</div>
          <div class="resource-label">Population</div>
        </div>
      </div>
    `,this.container.appendChild(this.topbar)}buildBottomPanel(){const e=document.createElement("div");e.className="hud-bottom",this.selectionPanel=document.createElement("div"),this.selectionPanel.className="selection-panel",this.selectionPanel.id="selection-panel",e.appendChild(this.selectionPanel),this.unitInfoPanel=document.createElement("div"),this.unitInfoPanel.className="unit-info-panel",this.unitInfoPanel.id="unit-info-panel",this.unitInfoPanel.innerHTML=`
      <div class="unit-info-name">Aucune sélection</div>
      <div class="unit-info-type">-</div>
    `,e.appendChild(this.unitInfoPanel),this.ordersPanel=document.createElement("div"),this.ordersPanel.className="orders-panel",this.ordersPanel.innerHTML=`
      <button class="order-button" id="order-move" title="Déplacer (M)">
        <span class="icon">➡️</span>
        <span>Move</span>
      </button>
      <button class="order-button" id="order-attack" title="Attaquer (A)">
        <span class="icon">⚔️</span>
        <span>Attack</span>
      </button>
      <button class="order-button" id="order-stop" title="Stop (S)">
        <span class="icon">🛑</span>
        <span>Stop</span>
      </button>
      <button class="order-button" id="order-patrol" title="Patrouiller (P)">
        <span class="icon">🔄</span>
        <span>Patrol</span>
      </button>
      <button class="order-button" id="order-defend" title="Défendre (D)">
        <span class="icon">🛡️</span>
        <span>Defend</span>
      </button>
      <button class="order-button" id="order-build" title="Construire (B)">
        <span class="icon">🏗️</span>
        <span>Build</span>
      </button>
    `,e.appendChild(this.ordersPanel),this.ordersPanel.querySelector("#order-move")?.addEventListener("click",()=>{this.callbacks.onOrderMove?.()}),this.ordersPanel.querySelector("#order-attack")?.addEventListener("click",()=>{this.callbacks.onOrderAttack?.()}),this.ordersPanel.querySelector("#order-stop")?.addEventListener("click",()=>{this.callbacks.onOrderStop?.()}),this.ordersPanel.querySelector("#order-patrol")?.addEventListener("click",()=>{this.callbacks.onOrderPatrol?.()}),this.ordersPanel.querySelector("#order-build")?.addEventListener("click",()=>{this.toggleBuildMenu()}),this.container.appendChild(e)}buildMinimap(){this.minimap=document.createElement("div"),this.minimap.className="hud-minimap",this.minimapCanvas=document.createElement("canvas"),this.minimapCanvas.className="minimap-canvas",this.minimapCanvas.width=Wn.minimapSize,this.minimapCanvas.height=Wn.minimapSize,this.minimapCtx=this.minimapCanvas.getContext("2d"),this.minimap.appendChild(this.minimapCanvas);const e=document.createElement("div");e.className="minimap-viewport",e.id="minimap-viewport",this.minimap.appendChild(e),this.minimapCanvas.addEventListener("click",t=>{const n=this.minimapCanvas.getBoundingClientRect(),i=(t.clientX-n.left)/n.width,r=(t.clientY-n.top)/n.height;this.callbacks.onMinimapClick?.(i,r)}),this.container.appendChild(this.minimap)}buildNotifications(){this.notificationsContainer=document.createElement("div"),this.notificationsContainer.className="hud-notifications",this.notificationsContainer.id="notifications",this.container.appendChild(this.notificationsContainer)}buildBuildMenu(){this.buildMenu=document.createElement("div"),this.buildMenu.className="hud-build-menu",this.buildMenu.innerHTML=`
      <div class="build-menu-header">Construction</div>
      <div class="build-menu-items">
        <div class="build-item" data-unit="FIGHTER">
          <span class="icon">🚀</span>
          <span class="cost">100💰</span>
        </div>
        <div class="build-item" data-unit="CORVETTE">
          <span class="icon">🛸</span>
          <span class="cost">250💰</span>
        </div>
        <div class="build-item" data-unit="FRIGATE">
          <span class="icon">🚢</span>
          <span class="cost">500💰</span>
        </div>
        <div class="build-item" data-unit="DESTROYER">
          <span class="icon">⚓</span>
          <span class="cost">800💰</span>
        </div>
        <div class="build-item" data-unit="CRUISER">
          <span class="icon">🛳️</span>
          <span class="cost">1200💰</span>
        </div>
        <div class="build-item" data-unit="HARVESTER">
          <span class="icon">⛏️</span>
          <span class="cost">300💰</span>
        </div>
        <div class="build-item" data-unit="REPAIR">
          <span class="icon">🔧</span>
          <span class="cost">400💰</span>
        </div>
        <div class="build-item disabled" data-unit="MOTHERSHIP">
          <span class="icon">🌟</span>
          <span class="cost">5000💰</span>
        </div>
      </div>
    `,this.buildMenu.querySelectorAll(".build-item").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-unit");e.classList.contains("disabled")||(this.callbacks.onBuildUnit?.(t),this.addNotification("INFO",`Construction de ${t} lancée`))})}),this.container.appendChild(this.buildMenu)}buildControlGroups(){this.controlGroups=document.createElement("div"),this.controlGroups.className="hud-control-groups";for(let e=1;e<=9;e++){const t=document.createElement("div");t.className="control-group",t.dataset.group=String(e),t.innerHTML=`
        <span>${e}</span>
        <span class="count">0</span>
      `,t.addEventListener("click",()=>{this.callbacks.onGroupSelect?.(e)}),t.addEventListener("dblclick",()=>{this.callbacks.onGroupCreate?.(e)}),this.controlGroups.appendChild(t)}this.container.appendChild(this.controlGroups)}buildFormations(){this.formationsPanel=document.createElement("div"),this.formationsPanel.className="hud-formations",this.formationsPanel.innerHTML=`
      <button class="formation-button" data-formation="WEDGE" title="Formation V">
        <span class="icon">▼</span>
        <span>Wedge</span>
      </button>
      <button class="formation-button" data-formation="SPHERE" title="Formation Sphère">
        <span class="icon">⬤</span>
        <span>Sphere</span>
      </button>
      <button class="formation-button" data-formation="WALL" title="Formation Mur">
        <span class="icon">▬</span>
        <span>Wall</span>
      </button>
      <button class="formation-button" data-formation="CLAW" title="Formation Pince">
        <span class="icon">⋔</span>
        <span>Claw</span>
      </button>
      <button class="formation-button" data-formation="COLUMN" title="Formation Colonne">
        <span class="icon">▮</span>
        <span>Column</span>
      </button>
    `,this.formationsPanel.querySelectorAll(".formation-button").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-formation");t&&(this.callbacks.onFormation?.(t),this.addNotification("INFO",`Formation: ${t}`))})}),this.container.appendChild(this.formationsPanel)}buildFPSDisplay(){this.fpsDisplay=document.createElement("div"),this.fpsDisplay.className="hud-fps",this.fpsDisplay.textContent="FPS: 60",this.container.appendChild(this.fpsDisplay)}buildGameTimeDisplay(){this.gameTimeDisplay=document.createElement("div"),this.gameTimeDisplay.className="hud-game-time",this.gameTimeDisplay.textContent="00:00:00",this.container.appendChild(this.gameTimeDisplay)}setCallbacks(e){this.callbacks={...this.callbacks,...e}}updateResources(e){this.resources=e;const t=document.getElementById("res-credits"),n=document.getElementById("res-metal"),i=document.getElementById("res-crystal"),r=document.getElementById("res-fuel"),o=document.getElementById("res-population");t&&(t.textContent=String(e.credits)),n&&(n.textContent=String(e.metal)),i&&(i.textContent=String(e.crystal)),r&&(r.textContent=String(e.fuel)),o&&(o.textContent=`${e.population}/100`)}updateSelection(e){if(this.selectedUnits=e,!(!this.selectionPanel||!this.unitInfoPanel))if(this.selectionPanel.innerHTML="",e.slice(0,15).forEach((t,n)=>{const i=document.createElement("div");i.className=`selected-unit ${n===0?"primary":""}`;const r=t.health/t.maxHealth;let o="";r<=.25?o="critical":r<=.5&&(o="low"),i.innerHTML=`
        <span class="unit-icon">${this.getUnitIcon(t.type)}</span>
        <div class="unit-health-bar">
          <div class="unit-health-fill ${o}" style="width: ${r*100}%"></div>
        </div>
      `,this.selectionPanel.appendChild(i)}),e.length>0){const t=e[0];this.unitInfoPanel.innerHTML=`
        <div class="unit-info-name">${t.name}</div>
        <div class="unit-info-type">${t.type}</div>
        <div class="unit-stat">
          <span class="unit-stat-label">Santé</span>
          <span>${t.health}/${t.maxHealth}</span>
        </div>
        ${t.shield!==void 0?`
          <div class="unit-stat">
            <span class="unit-stat-label">Bouclier</span>
            <span>${t.shield}/${t.maxShield}</span>
          </div>
        `:""}
        ${e.length>1?`
          <div class="unit-stat">
            <span class="unit-stat-label">Total sélectionné</span>
            <span>${e.length} unités</span>
          </div>
        `:""}
      `}else this.unitInfoPanel.innerHTML=`
        <div class="unit-info-name">Aucune sélection</div>
        <div class="unit-info-type">-</div>
      `}addNotification(e,t){const n=`notif-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,i={id:n,type:e,message:t,timestamp:Date.now()};for(this.notifications.push(i);this.notifications.length>Wn.maxNotifications;){const r=this.notifications.shift();r&&document.getElementById(r.id)?.remove()}if(this.notificationsContainer){const r=document.createElement("div");r.id=n,r.className=`notification ${e}`,r.textContent=t,this.notificationsContainer.appendChild(r),setTimeout(()=>{r.remove(),this.notifications=this.notifications.filter(o=>o.id!==n)},Wn.notificationDuration)}}updateMinimap(e,t,n,i,r){if(!this.minimapCtx||!this.minimapCanvas)return;const o=this.minimapCtx,a=Wn.minimapSize;o.fillStyle="rgba(0, 30, 60, 0.9)",o.fillRect(0,0,a,a),o.strokeStyle="rgba(255, 255, 255, 0.1)",o.lineWidth=1;for(let c=0;c<10;c++){const u=c/10*a;o.beginPath(),o.moveTo(u,0),o.lineTo(u,a),o.stroke(),o.beginPath(),o.moveTo(0,u),o.lineTo(a,u),o.stroke()}for(const c of e){const u=(c.x+500)/1e3*a,h=(c.z+500)/1e3*a;switch(c.type){case"friendly":o.fillStyle="#4caf50";break;case"enemy":o.fillStyle="#f44336";break;case"neutral":o.fillStyle="#9e9e9e";break;case"resource":o.fillStyle="#ffeb3b";break}o.beginPath(),o.arc(u,h,3,0,Math.PI*2),o.fill()}const l=document.getElementById("minimap-viewport");if(l){const c=(t+500)/1e3*a,u=(n+500)/1e3*a,h=i/1e3*a,p=r/1e3*a;l.style.left=`${c}px`,l.style.top=`${u}px`,l.style.width=`${h}px`,l.style.height=`${p}px`}}updateControlGroup(e,t){this.controlGroupsData.set(e,t);const n=this.controlGroups?.querySelector(`[data-group="${e}"]`);if(n){const i=n.querySelector(".count");i&&(i.textContent=String(t.length)),t.length>0?n.classList.add("active"):n.classList.remove("active")}}updateFPS(){const e=performance.now();this.frameCount++,e-this.lastFrameTime>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFrameTime=e,this.fpsDisplay&&(this.fpsDisplay.textContent=`FPS: ${this.currentFPS}`))}updateGameTime(){const e=Date.now()-this.gameStartTime,t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),i=Math.floor(e%6e4/1e3);this.gameTimeDisplay&&(this.gameTimeDisplay.textContent=`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`)}toggleBuildMenu(){this.buildMenuVisible=!this.buildMenuVisible,this.buildMenu?.classList.toggle("visible",this.buildMenuVisible)}setVisible(e){this.container.style.display=e?"block":"none"}connectToEventBus(){Ze.on("resources:changed",e=>{this.updateResources(e.resources)}),Ze.on("selection:changed",e=>{const t=e.unitIds.map((n,i)=>({id:n,type:"FIGHTER",name:`Unit ${n}`,health:100,maxHealth:100,shield:50,maxShield:50}));this.updateSelection(t)}),Ze.on("selection:cleared",()=>{this.updateSelection([])}),Ze.on("ui:notification",e=>{this.showNotification(e.type.toUpperCase(),e.message)}),Ze.on("unit:destroyed",e=>{this.showNotification("COMBAT",`Unité ${e.unitId} détruite!`)}),Ze.on("combat:started",e=>{this.showNotification("COMBAT","Combat engagé!")}),Ze.on("game:start",e=>{this.showNotification("SUCCESS",`Partie démarrée! Joueur: ${e.playerName}`),this.gameStartTime=Date.now()}),Ze.on("net:player-joined",e=>{this.showNotification("INFO",`${e.playerName} a rejoint la partie`)}),Ze.on("net:player-left",e=>{this.showNotification("WARNING",`${e.playerId} a quitté la partie`)}),console.log("[HUD] Connected to EventBus")}resetGameTime(){this.gameStartTime=Date.now()}getUnitIcon(e){return{FIGHTER:"🚀",CORVETTE:"🛸",FRIGATE:"🚢",DESTROYER:"⚓",CRUISER:"🛳️",MOTHERSHIP:"🌟",HARVESTER:"⛏️",REPAIR:"🔧",RESEARCH:"🔬"}[e]||"❓"}dispose(){this.container.remove(),this.styleElement.remove()}}const en=new y0,S0={playerName:"Commander",galaxySeed:Date.now(),clustersX:3,clustersZ:3,clusterSize:5,multiplayerEnabled:!1,roomToJoin:""},Ct={initialized:!1,galaxy:null,playerId:"",isHost:!1};async function M0(s={}){if(Ct.initialized)return console.warn("[GameBootstrap] Déjà initialisé"),!0;const e={...S0,...s};console.log("[GameBootstrap] Initialisation...",e);try{en.connectToEventBus(),en.showNotification("INFO","Initialisation du jeu...");const t=new x0.constructor(e.galaxySeed);Ct.galaxy=t.generateGalaxy(e.clustersX,e.clustersZ,e.clusterSize),console.log(`[GameBootstrap] Galaxie générée: ${Ct.galaxy.name}`,{systems:Ct.galaxy.systems.size,seed:Ct.galaxy.seed});const n=Ut.getInstance();return Ze.emit("navigation:changed",{from:"GALAXY",to:"GALAXY",systemId:void 0}),e.multiplayerEnabled&&await E0(e),Ct.initialized=!0,Ct.playerId=dt.playerId||`local-${Date.now()}`,en.showNotification("SUCCESS",`Bienvenue, ${e.playerName}!`),Ze.emit("game:start",{playerId:Ct.playerId,playerName:e.playerName}),console.log("[GameBootstrap] Initialisation terminée"),!0}catch(t){return console.error("[GameBootstrap] Erreur d'initialisation:",t),en.showNotification("ERROR","Erreur d'initialisation du jeu"),!1}}async function E0(s){if(dt.setPlayerName(s.playerName),!await dt.connect()){console.warn("[GameBootstrap] Connexion P2P échouée, mode solo"),en.showNotification("WARNING","Mode solo (connexion P2P échouée)");return}if(s.roomToJoin)await dt.joinRoom(s.roomToJoin)?(Ct.isHost=!1,en.showNotification("INFO",`Rejoint la room ${s.roomToJoin}`)):en.showNotification("ERROR","Impossible de rejoindre la room");else{const t=dt.createRoom();Ct.isHost=!0,en.showNotification("INFO",`Room créée: ${t.roomId}`)}}function b0(){if(!Ct.initialized){console.error("[GameBootstrap] Jeu non initialisé");return}xa.getInstance().startGame(),en.showNotification("SUCCESS","Partie lancée!")}async function T0(s){return xa.getInstance().hostGame(s)}async function A0(s,e){return xa.getInstance().joinGame(s,e)}function w0(){return Ct.galaxy}function C0(){return Ct.playerId}function R0(){return Ct.isHost}function P0(){return Ct.initialized}const L0={initialize:M0,start:b0,host:T0,join:A0,getGalaxy:w0,getPlayerId:C0,isHost:R0,isInitialized:P0};async function I0(){console.log(`🚀 PEEJS - Application démarrée - ${new Date().toLocaleTimeString()}`);try{const s=new Vg;if(!await L0.initialize({playerName:"Commander",clustersX:3,clustersZ:3,clusterSize:5,multiplayerEnabled:!1})){console.error("❌ PEEJS - Initialisation du jeu échouée");return}en.setVisible(!0),s.animate(),console.log("✅ PEEJS - Initialisation terminée")}catch(s){console.error("❌ PEEJS - Erreur lors de l'initialisation:",s)}}I0();
//# sourceMappingURL=index-YxzhhJe9.js.map
