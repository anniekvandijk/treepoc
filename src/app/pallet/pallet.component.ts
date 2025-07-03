import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

@Component({
  selector: 'app-pallet',
  imports: [],
  templateUrl: './pallet.component.html',
  styleUrl: './pallet.component.scss'
})
export class PalletComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  palletGroup = new THREE.Group();

  ngOnInit() {}

  ngAfterViewInit() {
    this.initScene();
    this.createPallet();
    this.animate();

  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(75, this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight, 0.1, 1000);
    this.camera.position.set(1, 1, 2);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 4, 5);
    this.scene.add(light);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  createPallet() {
    this.palletGroup.clear();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load('assets/wood.jpg');
    const material = new THREE.MeshStandardMaterial( { map: woodTexture  } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
