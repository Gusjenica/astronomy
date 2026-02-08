    // once everything is loaded, we run our Three.js stuff.
    (function () {

        var stats = initStats();
      
        const webGlOutPUt = document.getElementById("WebGL-output");
        const statsOutput = document.getElementById("Stats-output");

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        var webGLRenderer = new THREE.WebGLRenderer();
      
        // webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = false;

        camera.position.x = -50;
        camera.position.y = 50;
        camera.position.z = 50;
        camera.lookAt(new THREE.Vector3(10, 10, 10));

        webGlOutPUt.append(webGLRenderer.domElement);
    
        var stepx = 0;
        var stepy = 0;
        var stepz = 0;

        var knot;


        var controls = new function () {

            this.radius = 70;
            this.tube = 40;
            this.radialSegments = 55;
            this.tubularSegments = 22;
            this.p = 5;
            this.q = 1;
            this.heightScale = 4;
            this.asParticles = true;
            this.rotate = true;

            this.redraw = function () {
                // remove the old plane
                if (knot) scene.remove(knot);
                // create a new one
                var geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale);
                knot = createParticleSystem(geom);
                scene.add(knot);
            };

        }

        var gui = new dat.GUI();
        gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
        gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
        gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
        gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
        gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
        gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);
        gui.add(controls, 'heightScale', 0, 5).onChange(controls.redraw);
        gui.add(controls, 'asParticles').onChange(controls.redraw);
        gui.add(controls, 'rotate').onChange(controls.redraw);
      
        gui.close();

        controls.redraw();

        render();

        function generateSprite() {

            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;

            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;

        }

        function createParticleSystem(geom) {
            var material = new THREE.ParticleBasicMaterial({
                color: 0xffffff,
                size: 2,
                transparent: true,
                blending: THREE.AdditiveBlending,
                map: generateSprite()
            });

            var system = new THREE.ParticleSystem(geom, material);
            system.sortParticles = true;
            return system;
        }

        function render() {
            stats.update();

            if (controls.rotate) {
                knot.rotation.y = stepy += 0.0015;
                knot.rotation.x = stepx += 0.0015;
                knot.rotation.z = stepz += 0.0015;
            }

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }

        function initStats() {

            var stats = new stats();
            stats.setMode(0);
            return stats;
        }
    })();