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
    this.camera = new THREE.PerspectiveCamera(
      75, this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight, 0.1, 2000);
    this.camera.position.set(2, 1, 1);
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

  const textureLoader = new THREE.TextureLoader();
  const woodTexture = textureLoader.load('assets/wood.jpg');

  // Pallet dimensions (in arbitrary units)
  const plankLength = 2.4;
  const plankWidth = 0.2;
  const plankHeight = 0.05;
  const blockSize = 0.2;
  const palletHeight = plankHeight * 3 + blockSize;

  // Bottom planks (3)
  for (let i = -1; i <= 1; i++) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(plankLength, plankHeight, plankWidth),
      new THREE.MeshStandardMaterial({ map: woodTexture })
    );
    plank.position.set(0, plankHeight / 2, i * 0.6);
    plank.castShadow = true;
    plank.receiveShadow = true;
    this.palletGroup.add(plank);
  }

  // Top planks (5)
  for (let i = -2; i <= 2; i++) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(plankLength, plankHeight, plankWidth),
      new THREE.MeshStandardMaterial({ map: woodTexture })
    );
    plank.position.set(0, palletHeight - plankHeight / 2, i * 0.3);
    plank.castShadow = true;
    plank.receiveShadow = true;
    this.palletGroup.add(plank);
  }

  // Planks below top planks (3)
  for (let i = -1; i <= 1; i++) {
    const plankBelow = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, plankHeight, 1.4),
      new THREE.MeshStandardMaterial({ map: woodTexture })
    );
    plankBelow.position.set(i * 1.1, (plankHeight * 1.5 ) + blockSize, 0);
    plankBelow.castShadow = true;
    plankBelow.receiveShadow = true;
    this.palletGroup.add(plankBelow);
  }

  // Blocks (9)
  for (let xi = -1; xi <= 1; xi++) {
    for (let zi = -1; zi <= 1; zi++) {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(blockSize, blockSize, blockSize),
        new THREE.MeshStandardMaterial({ map: woodTexture })
      );
      block.position.set(xi * (plankLength / 2 - blockSize / 2), plankHeight + blockSize / 2, zi * 0.6);
      block.castShadow = true;
      block.receiveShadow = true;
      this.palletGroup.add(block);
    }
  }

  this.scene.add(this.palletGroup);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
