// @deno-types="npm:@types/three"
import * as THREE from "npm:three";

class CardElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        
        let scene = new THREE.Scene();
    }
}