import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  palletGroup = new THREE.Group();

  ngOnInit() {}

  ngAfterViewInit() {
    this.initScene();
    this.createPallet();
    this.animate();

  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xc87802);
    this.camera = new THREE.PerspectiveCamera(75, this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight, 0.1, 1000);
    this.camera.position.set(1, 1, 2);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 3);
    this.scene.add(light);
  }

  createPallet() {
    this.palletGroup.clear();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff  } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
