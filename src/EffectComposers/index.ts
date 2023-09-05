import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposersParamsInterface } from "./_typings.ts";
import { effectComposersTable } from "./_db";
import { setParams } from "./_params";
import { setGui } from "./_gui";

class EffectComposers {
  renderScene!: RenderPass;
  bloomPass!: UnrealBloomPass;
  bloomComposer!: EffectComposer;
  finalPass!: ShaderPass;
  finalComposer!: EffectComposer;
  effectComposersParams!: EffectComposersParamsInterface;
  constructor(
    gui: dat.GUI,
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    effectComposersParams?: EffectComposersParamsInterface,
    hideGui?: boolean
  ) {
    setParams(effectComposersTable).then(
      (storeEffectComposersParams: EffectComposersParamsInterface) => {
        this.effectComposersParams =
          effectComposersParams || storeEffectComposersParams;
        this.init(scene, camera, renderer, this.effectComposersParams);
        let effectComposersGui = setGui(
          gui,
          this.effectComposersParams,
          this,
          (data: EffectComposersParamsInterface) => {
            effectComposersTable.add(data);
          }
        );
        if (hideGui) {
          effectComposersGui.hide();
        }
      }
    );
  }

  init(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    params: EffectComposersParamsInterface
  ) {
    // RenderPass：渲染通道，用于将场景渲染到屏幕上。
    // RenderPass本身并不进行任何特殊的后期处理，它仅仅是将场景渲染到一个缓冲区中。
    this.renderScene = new RenderPass(scene, camera);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.0,
      0.0
    );
    this.bloomPass.strength = params.bloomStrength;
    this.bloomPass.radius = params.bloomRadius;
    this.bloomPass.threshold = params.bloomThreshold;

    this.bloomComposer = new EffectComposer(renderer);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(this.renderScene);
    this.bloomComposer.addPass(this.bloomPass);

    // ShaderPass：后期处理通道，用于应用自定义着色器效果到场景渲染结果上。
    // ShaderPass允许你使用自定义的着色器来修改场景的渲染结果。
    this.finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv; 
          void main() {
            vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture; 
          uniform sampler2D bloomTexture; 
          varying vec2 vUv; 
          void main() {
            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
          }
        `,
        defines: {},
      }),
      "baseTexture"
    );
    this.finalPass.needsSwap = true;

    this.finalComposer = new EffectComposer(renderer);
    this.finalComposer.addPass(this.renderScene);
    this.finalComposer.addPass(this.finalPass);
  }

  setBloomPass() {
  }
}

export default EffectComposers;
