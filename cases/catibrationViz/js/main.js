(function () {

    (function noDebuger() {
        function testDebuger() {
            var d = new Date();
            debugger;
            if (new Date() - d > 10) {
                document.body.innerHTML = '<div></div>';
                return true;
            }
            return false;
        }

        function start() {
            while (testDebuger()) {
                testDebuger();
            }
        }

        if (!testDebuger()) {
            window.onblur = function () {
                setTimeout(function () {
                    start();
                }, 500)
            }
        } else {
            start();
        }
    })()

    // data 数据格式
    let carData = {
        "info": [
            {
                "text": "消息日志....",
                "color": "#FF0000"
            }
        ],
        "scene": {
            "car": {
                "size": {
                    "x": 5.022,
                    "y": 2.268,
                    "z": 1.756
                },
                "offset": {
                    "x": 1.4140000000000001,
                    "y": 0,
                    "z": 0
                }
            },
            "camera": {
                "front_narrow": {
                    "size": {
                        "radius": 3.2153903091734723,
                        "height": 12
                    },
                    "position": {
                        "x": 2.028,
                        "y": 0.083,
                        "z": 1.278
                    },
                    "rotation": {
                        "x": 0.9998749394275523,
                        "y": -0.009445054883865822,
                        "z": -0.012684496166166515
                    },
                    "color": "#ff9f2b"
                },
                "front_left": {
                    "size": {
                        "radius": 10.39230484541326,
                        "height": 6
                    },
                    "position": {
                        "x": 1.7259944677352905,
                        "y": 0.6133446097373962,
                        "z": 1.6677093505859375
                    },
                    "rotation": {
                        "x": 0.762244262263402,
                        "y": 0.6471723459625085,
                        "z": 0.01231418969746878
                    },
                    "color": "#00F5FF"
                },
                "front_right": {
                    "size": {
                        "radius": 10.39230484541326,
                        "height": 6
                    },
                    "position": {
                        "x": 1.7204934358596802,
                        "y": -0.5818726420402527,
                        "z": 1.6846823692321777
                    },
                    "rotation": {
                        "x": 0.7556665778955312,
                        "y": -0.6547491265747643,
                        "z": 0.016480421755538543
                    },
                    "color": "#00F5FF"
                },
                "front_wide": {
                    "size": {
                        "radius": 10.39230484541326,
                        "height": 6
                    },
                    "position": {
                        "x": 2.070744752883911,
                        "y": -0.182173490524292,
                        "z": 1.53648042678833
                    },
                    "rotation": {
                        "x": 0.9998503080699863,
                        "y": -0.016307889593052738,
                        "z": -0.0057805007892031135
                    },
                    "color": "#ff9f2b"
                },
                "rear_left": {
                    "size": {
                        "radius": 10.39230484541326,
                        "height": 6
                    },
                    "position": {
                        "x": 2.5759880542755127,
                        "y": 0.9725189805030823,
                        "z": 0.8257842659950256
                    },
                    "rotation": {
                        "x": -0.5631151704742257,
                        "y": 0.8262539170033651,
                        "z": 0.014344665153982028
                    },
                    "color": "#c72dff"
                },
                "rear_right": {
                    "size": {
                        "radius": 10.39230484541326,
                        "height": 6
                    },
                    "position": {
                        "x": 2.5711348056793213,
                        "y": -0.9743624925613403,
                        "z": 0.817512571811676
                    },
                    "rotation": {
                        "x": -0.5630011429567312,
                        "y": -0.8260603404410536,
                        "z": 0.02557395119696515
                    },
                    "color": "#c72dff"
                },
                "rear_narrow": {
                    "size": {
                        "radius": 7.999999999999999,
                        "height": 8
                    },
                    "position": {
                        "x": -0.666,
                        "y": -0.024,
                        "z": 1.718
                    },
                    "rotation": {
                        "x": -0.9997613101704123,
                        "y": 0.001400559686184466,
                        "z": -0.021802777779587945
                    },
                    "color": "#00FF7F"
                }
            }
        }
    }


    let OrbitControls = THREE.OrbitControls
    let CarSize = 5
    let camera, scene, renderer, renderDiv, stats;
    let mainContainer3d, coneContainer, carContainer;


    function init() {
        setup3d();
        animate();
        loadCarModule()
            .then(() => {
                // carData.scene.camera = []
                 reload(carData)
                $(".form-inline").hide();
                //loadQuery()

            });

        initUI();
    }

    function bootstrapAlert(title) {
        $(".alertContainer strong").html(title.split('\n').join('<br/>'))
        $('.alert .close').click(() => {
            $('.alertContainer').hide()
        })
        $('.alertContainer').show()
    }

    function initUI() {
        $('.alertContainer').hide()
        $('#getDataBtn').click(clickReloadBtn);
        //
        $(".info").hide();
        $('#infoBtn').click(() => {
            $(".info").toggle()
        });

        ['perspect', 'top', 'right', 'front', 'left', 'back'].forEach(
            (n, i) => {
                $(`<button type="button" class="btn btn-default">${n}</button>`)
                    .click(() => {
                        if (i === 0) {
                            camera.to(9.64590759354284, 8.261831360975027, 9.388472703368462)
                        } else if (i === 1) {
                            camera.to(0, 28.399546461969503, 3.3471405510374117)
                        } else if (i === 2) {
                            camera.to(0, 0, 15.411939996406803)
                        } else if (i === 3) {
                            camera.to(12.583183372098851, 0, 0)
                        } else if (i === 4) {
                            camera.to(0, 0, -15.411939996406803)
                        } else if (i === 5) {
                            camera.to(-12.583183372098851, 0, 0)
                        }
                    }).appendTo($('.foot .camera'))
            })
        //
        initDebugUI();
    }

    function clickReloadBtn() {
        $('.loading').show()
        coneContainer.clear()
        $('.filter-btn').remove()
        $.get('/api/start', {car: $('#car').val(), ip: $("#ip").val()})
            .done(json => {
                $('.loading').hide()
                try {
                    if (json.err === undefined) {
                        reload(JSON.parse(atob(json.data)))
                    } else {
                        bootstrapAlert((atob(json.msg)))
                    }
                } catch (e) {
                    // console.log(res, json, json.msg)
                    bootstrapAlert('数据错误...' + json)
                }
            })
            .fail(() => {
                $('.loading').hide()
                bootstrapAlert('网络错误...')
            })
    }

    function loadQuery() {
        $('.loading').show()
        coneContainer.clear()
        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams);

        const packageId = urlParams.get('packageId')
        $.get('//api-calibration-viz.nioint.com/checkresult', {packageId: packageId})
            .done(json => {
                json = JSON.parse(atob(json))
                $('.loading').hide()
                try {
                    if (json.err === undefined || json.err === '') {
                        reload(((json.data)))
                    } else {
                        bootstrapAlert(json.msg)
                    }
                } catch (e) {
                    bootstrapAlert('数据错误...')
                    console.log(json, json.msg)
                }
            })
            .fail(() => {
                $('.loading').hide()
                bootstrapAlert('网络错误...')
            })
    }

    function initDebugUI() {
        ///------debug-----------
        document.getElementById('fileUpload').addEventListener('change', function (event) {
            var file = event.target.files[0];
            if (window.FileReader) {
                var fr = new FileReader();
                fr.onload = function (e) {
                    document.getElementById('json').value = e.target.result;
                };
                fr.readAsText(file);
            } else {
                alert('使用chrome最新版')
            }
        })
        document.getElementById('reload').addEventListener('click', function () {
            let str = document.getElementById('json').value || ""
            let json = JSON.parse(str)
            reload(json)
        })
        //
        let debugUI = location.href.indexOf('debugUI') !== -1
        // console.log('debugUI', debugUI)
        if (debugUI) {
            $('.debug').show();
        } else {
            $('.debug').hide();
            window.console.log = window.console.warn = () => {
            }
        }
    }

    function setup3d() {
        renderDiv = document.getElementsByClassName('scene3d')[0];
        console.log("renderDiv", renderDiv.clientWidth, renderDiv.clientHeight)
        window.camera = camera = new THREE.PerspectiveCamera(45, renderDiv.clientWidth / renderDiv.clientHeight, 1, 10000);
        // camera.position.set(0, 30, 10);
        // camera.lookAt(0, 0, 0)
        // camera.position.set(2.5, 15, 8)
        // camera.rotation.set(-0.3364672443036142, -0.19607727503056352, -0.06803757776935956, "XYZ")

        camera.position.set(0.0013874464911437362, 28.399546461969503, 3.3471405510374117)
        camera.rotation.set(-1.143323221847035, 0.0033314747596423335, 0.007312679072765154, "XYZ")
        //

        camera.to = (x, y, z, due = 0.3) => {
            camera.t = 0;
            gsap.killTweensOf(camera);
            let p = camera.position.clone();
            let to = new THREE.Vector3(x, y, z), look = new THREE.Vector3(0, 0, 0);
            gsap.to(camera, {
                t: 1, onUpdate: () => {
                    let pos = p.clone().lerp(to, camera.t)
                    camera.position.copy(pos)
                    camera.lookAt(look)
                }, immediateRender: due <= 0
            })
        }

        //
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(renderDiv.clientWidth, renderDiv.clientHeight);
        // renderer.shadowMap.enabled = true;
        renderDiv.appendChild(renderer.domElement);


        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x999999);
        // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();


        //
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 200, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 200, 100);
        /*dirLight.castShadow = true;
        dirLight.shadow.camera.top = 180;
        dirLight.shadow.camera.bottom = - 100;
        dirLight.shadow.camera.left = - 120;
        dirLight.shadow.camera.right = 120;*/
        scene.add(dirLight);

        // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
        // ground
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false,
            transparent: true,
            opacity: 0.2
        }));
        mesh.rotation.x = -Math.PI / 2;
        //mesh.receiveShadow = true;
        scene.add(mesh);


        ///------------------
        // container3d
        mainContainer3d = new THREE.Group()
        scene.add(mainContainer3d)
        mainContainer3d.rotation.x = -Math.PI / 2

        const grid = new THREE.GridHelper(20, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        const i = new THREE.AxisHelper(100)
        // mainContainer3d.add(i)

        carContainer = new THREE.Group()
        mainContainer3d.add(carContainer)

        coneContainer = new THREE.Group()
        mainContainer3d.add(coneContainer)
        //

        /*let m = new THREE.Matrix4().makeBasis(
                new THREE.Vector3(-1, 1, 0),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(0, 0, 1)
        )
        coneContainer.matrixAutoUpdate = false
        coneContainer.matrix.copy(m)
        coneContainer.matrixWorldNeedsUpdate = true*/
        /*coneContainer.rotation.x = Math.PI / 2
        coneContainer.scale.z = -1
        console.log('hhhh', coneContainer.matrix)*/

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onMouseMove)
        // stats
        /*stats = new Stats();
        container.appendChild(stats.dom);*/
    }

    function onWindowResize() {

        camera.aspect = renderDiv.clientWidth / renderDiv.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(renderDiv.clientWidth, renderDiv.clientHeight);
    }

    let raycaster = new THREE.Raycaster(), last

    function onMouseMove(event) {

        let x = event.clientX, y = event.clientY
        let rect = renderDiv.getBoundingClientRect();
        let p = {x: (x - rect.left) / rect.width, y: (y - rect.top) / rect.height};
        // console.log(p)
        p = {x: (p.x * 2) - 1, y: -(p.y * 2) + 1};
        // console.log(p)
        raycaster.setFromCamera(p, camera);

        let objects = coneContainer.children.filter(c => c.opacity != undefined)
        // console.log("coneContainer",coneContainer)
        let i = raycaster.intersectObjects(objects);
        if (last) {
            last.opacity()
        }
        if (i.length) {
            let o = i[0].object;
            o.opacity(0.7)
            last = o;
        }
    }


    function loadCarModule() {
        return new Promise((resolve) => {
            const loader = new THREE.GLTFLoader();
            loader.load(
                // resource URL
                '../assets/m.dat',
                // called when the resource is loaded
                (gltf) => {
                    //
                    let es8 = car = gltf.scene
                    scene.add(es8);
                    es8.updateMatrixWorld(true)

                    const box = new THREE.Box3();
                    //
                    let c = [{r: 1, g: 0, b: 0},
                        {r: 1, g: 1, b: 1},
                        {r: 1, g: 1, b: 0},
                        {r: 0, g: 0, b: 1},
                        {r: 0, g: 1, b: 1}]
                    c = c[Math.floor(c.length * Math.random())]
                    console.log(c)
                    es8.traverse(mesh => {
                        if (mesh.geometry) {
                            mesh.geometry.computeBoundingBox();
                            let b = new THREE.Box3().copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
                            box.union(b)
                        }
                        if (mesh instanceof THREE.Mesh && mesh.material) {
                            if (mesh.material.color.r == 1 && mesh.material.color.g == 0 && mesh.material.color.b == 0) {
                                mesh.material.color.r = c.r;
                                mesh.material.color.g = c.g;
                                mesh.material.color.b = c.b;
                                mesh.material.needsUpdate = true
                            }
                        }
                    })
                    //
                    var max = box.max;
                    var min = box.min;
                    let center = new THREE.Vector3().add(max).add(min).multiplyScalar(1 / 2);
                    console.log(center)
                    es8.children.forEach(c => {
                        c.position.sub(center)
                    })
                    //
                    let size = max.clone().sub(min)
                    let scale = new THREE.Vector3(CarSize / size.x, CarSize / size.y, CarSize / size.z)//.divide(size))
                    es8.scale.copy(scale)
                    //wrapper功能：矫正模型坐标系
                    const wrapper = new THREE.Group()
                    const geometry = new THREE.BoxGeometry(CarSize, CarSize, CarSize);
                    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
                    const cub = new THREE.Mesh(geometry, material);
                    wrapper.add(es8);
                    wrapper.add(cub);
                    es8.position.y = cub.position.y = CarSize / 2
                    //
                    wrapper.rotation.x = Math.PI / 2
                    wrapper.rotation.y = -Math.PI / 2
                    carContainer.add(wrapper)
                    carContainer.visible = false
                    setTimeout(() => {
                        resolve(carContainer)
                    }, 10)

                    setInterval(() => {
                        let cc = es8.children[0].children[0].children[0];
                        [0, 1, 2, 10].forEach(i => cc.children[i].rotation.z -= Math.PI / 180 * 6)
                    }, 1000 / 25)
                }
            )
        })
    }


    function reload(json = {info: [], scene: {}}) {
        $('.loading').hide()

        //
        console.log("json:", json, (json.info || []))
        //3d场景
        loadSceneData(json.scene)
        //
        let info = (json.info || [])
            .map(i => `<span style="color:${i.color}">${i.text}</span>`)
            .join('<br/>')
        console.log("*info", info)
        $('.info').html(info)
        //
        $('#json').val(JSON.stringify(json))
    }

    function loadSceneData(scene) {
        carContainer.visible = true
        coneContainer.clear()

        camera.to(0, 28.399546461969503, 3.3471405510374117, 2000)

        setTimeout(() => {
            addCarCube(scene.car)
            var tl = gsap.timeline({
                autoRemoveChildren: false, onComplete: () => {
                    tl.getChildren().forEach(c => {
                        tl.remove(c)
                    })
                }
            });

            let keys = Object.keys(scene.camera)
            if (keys.length) {
                keys.forEach((k, i) => {
                    createFilterBtn(k)
                    let [cone, sphere] = addCameraCone(k, scene.camera[k])
                    tl.add(() => cone.tween.play(), 0.2 * i);

                })
                createAllFilterBtn()
            }
        })
    }

// 添加相机视角
    function addCameraCone(name, camera) {
        let {radius, height} = camera.size, t = 0
        const geometry = new THREE.ConeGeometry(radius * 1, height * 1, 24);
        const material = new THREE.MeshPhongMaterial({
            color: camera.color || 0xff0000, wireframe: false,
            transparent: true, opacity: 0.4,
            // side: THREE.DoubleSide,
        });
        const cone = new THREE.Mesh(geometry, material);
        cone.name = name
        cone.t = 0;
        cone.scale.set(t, 1, t)
        cone.opacity = (v=0.4) => {
            material.opacity = v
            material.needsUpdate = true
        }
        cone.tween = gsap.to(cone, {
            t: 1, paused: true, onUpdate: () => {
                let t = cone.t
                let p1 = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
                let r = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z).normalize()
                let p2 = p1.clone().add(r.clone().multiplyScalar(height / 2))
                cone.position.copy(p2)
                //
                let n = new THREE.Vector3(0, -1, 0)
                let q = new THREE.Quaternion().setFromUnitVectors(n, r)
                cone.quaternion.copy(q)
                //
                cone.scale.set(t, 1, t)
            }
        })
        //
        coneContainer.add(cone);
        //
        const lightGeo = new THREE.IcosahedronGeometry(0.05, 1)
        const material2 = new THREE.MeshPhongMaterial({
            color: camera.color || 0xff0000, wireframe: false,
        });
        const sphere = new THREE.Mesh(lightGeo, material2);
        sphere.name = name
        sphere.position.set(camera.position.x, camera.position.y, camera.position.z)
        coneContainer.add(sphere);
        sphere.t = 0
        gsap.to(sphere, {
            t: 1, onUpdate: () => {
                sphere.scale.set(sphere.t, sphere.t, sphere.t)
            }
        })
        //
        return [cone, sphere]
    }

    function createAllFilterBtn() {
        let $btn = $(`<button type="button" class="btn btn-success filter-btn all-btn">all</button>`)
        $btn.click(function () {
            let flag = !updateAllBtn()
            $('.filter-btn:not(.all-btn)').each(function () {
                filter($(this), flag)
            })
        }).prependTo($('.foot .filter'))
    }

    function updateAllBtn() {
        let allSelected = true
        $('.filter-btn:not(.all-btn)').each(function () {
            allSelected = allSelected && $(this).data('selected')
        })
        let $btn = $('.all-btn')
        allSelected ? $btn.addClass('btn-success') : $btn.removeClass('btn-success')
        !allSelected ? $btn.addClass('btn-default') : $btn.removeClass('btn-default')
        return allSelected
    }

    function createFilterBtn(name) {
        let $btn = $(`<button type="button" class="btn btn-success filter-btn">${name}</button>`)
        $btn.data('selected', true)
            .click(function () {
                let flag = !$btn.data('selected')
                filter($btn, flag)
            }).prependTo($('.foot .filter'))
    }

    function filter($btn, flag) {
        flag ? $btn.addClass('btn-success') : $btn.removeClass('btn-success')
        !flag ? $btn.addClass('btn-default') : $btn.removeClass('btn-default')
        $btn.data('selected', flag)
        coneContainer.children.forEach(c => {
            if (c.name === $btn.text() && c.tween) {
                console.log(c.tween)
                if (flag) {
                    c.tween.play(0)
                } else {
                    c.tween.reverse()
                }
            }
        })
        updateAllBtn();
    }

    function addCarCube(carInfo) {
        carContainer.position.copy(carInfo.offset);
        let scale = new THREE.Vector3().copy(carInfo.size).multiplyScalar(1 / CarSize)
        carContainer.scale.copy(scale);
    }


    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }


    init();
})()
