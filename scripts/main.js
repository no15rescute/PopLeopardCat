        window.onload = () => {
            console.warn('我在幹嘛我怎麼還不去工作????');
            var no15_container = document.querySelector("#no15_container");
            var no15 = document.querySelector("#no15");
            var no15_pop = document.querySelector("#no15_pop");
            var pop_count = 0;
            var counter = document.querySelector("#counter");
            
            const sound_effect = new Howl({
                src: ['./sounds/A.mp3'],
                autoPlay: false,
                loop:false
            })

            function pop() {
                playSound();
                no15.setAttribute("style","visibility: hidden;");
                no15_pop.setAttribute("style","visibility: unset;");
            }

            function unpop() {
                no15_pop.setAttribute("style","visibility: hidden;");
                no15.setAttribute("style","visibility: unset;");
            }

            var storage = {};
            storage.load = function () {
                var count = localStorage.getItem("pop_count");
                if (count !== null) {
                    pop_count = parseInt(count);
                    counter.innerHTML = pop_count;
                }
            };
            storage.save = function () {
                localStorage.setItem("pop_count", pop_count);
            }

            function isMobile() {
                try{ document.createEvent("TouchEvent"); return true; }
                catch(e){ return false;}
            }

            function playSound(){
                sound_effect.currentTime = 0;
                sound_effect.play();
            }

            function count_up() {
                pop_count++;
                counter.innerHTML = pop_count;
                storage.save();
            }

            storage.load();

            if (isMobile()) {
                window.addEventListener("touchmove",function(e) {
                    e.preventDefault();
                }, { passive: false });
                no15.setAttribute("src","./images/characters/no15/up.png");
                no15_container.addEventListener('touchstart', function (e) {
                    count_up();
                    pop();
                });
                no15_container.addEventListener('touchend', function (e) {
                    unpop();
                });
            } else {
                no15_container.addEventListener('mouseover', function (e) {
                    no15.setAttribute("src","./images/characters/no15/up.png");
                });
                no15_container.addEventListener('mouseout', function (e) {
                    no15.setAttribute("src","./images/characters/no15/normal.png");
                });

                //  點擊事件
                no15_container.addEventListener('mousedown', function (e) {
                    count_up();
                    pop();
                });
                no15_container.addEventListener('mouseup', function (e) {
                    unpop();
                });

                //  鍵盤事件
                document.addEventListener('keydown', function (e) {
                    pop();
                });
                document.addEventListener('keyup', function (e) {
                    count_up();
                    no15.setAttribute("src","./images/characters/no15/up.png");
                    unpop();
                });
            }
        }