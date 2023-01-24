$(function() {
    console.log("Hello World!")

    var vid = $("#video")
    var count = 0
    var duration = 0
    var duration_ms = 0
    var frame_count = 1800
    var tick_time = 0
    var timeout_id

    var playing = false

    var xoff = 0.0
    var xincrement = 0.01

    console.log(vid)
    vid.on('canplay', function() {
        console.log('Can play video!')
    })

    vid.on('canplaythrough', function() {
        duration = vid[0].duration
        duration_ms = duration * 1000
        tick_time = duration_ms / frame_count
        console.log('Can play video through! Duration: ' + duration)
        console.log('Tick time calculated: ' + tick_time)
    
    })

    vid.on('playing', function() {
        console.log('Playing video!')
        playing = true

        timeout_id = setInterval(function() {
            count += 1
            //console.log(count)
        }, tick_time)


    })

    vid.on('pause', function() {
        console.log('Pausing video!')
        clearInterval(timeout_id)
        playing = false
    })

    /*
    vid.on('timeupdate', function() {
        console.log('Playing video: ' + vid[0].currentTime)
        //count += 1
        //console.log(count)
    })
    */

    let sketch = function(p) {

        p.setup = function() {
            p.createCanvas(960, 540);
            p.background(0);
            p.noStroke();
        }
        
        p.draw = function() {
            // Create an alpha blended background
            p.fill(0, 10);
            p.rect(0, 0, p.width, p.height);

            if (playing) {

                let new_n_x = DATA.positions[count][1]
                new_n_x = new_n_x / 2000

                let new_n_y = DATA.positions[count][0]
                new_n_y = new_n_y / 2000

                let new_n_z = DATA.positions[count][2]
                new_n_z = new_n_z / 20000
                
                p.fill(200);

                p.ellipse(
                    (p.width / 2) + new_n_x * p.width,
                    (p.height / 2) + new_n_y * p.height,
                    64 + 64 * new_n_z,
                    64 + 64 * new_n_z
                );

                let new_n_x2 = DATA2.positions[count][1]
                new_n_x2 = new_n_x2 / 2000

                let new_n_y2 = DATA2.positions[count][0]
                new_n_y2 = new_n_y2 / 2000

                let new_n_z2 = DATA2.positions[count][2]
                new_n_z2 = new_n_z2 / 20000
                
                p.fill(200);

                p.ellipse(
                    (p.width / 2) + new_n_x2 * p.width,
                    (p.height / 2) + new_n_y2 * p.height,
                    64 + 64 * new_n_z2,
                    64 + 64 * new_n_z2
                );

            }
        }
    };
    new p5(sketch, 'p5_stage');


    let sketch2 = function(p) {

        p.setup = function() {
            p.createCanvas(960, 540, p.WEBGL);
        }
        
        p.draw = function() {

            p.background(250)

            if (playing) {

                let new_n_x = DATA.positions[count][0]
                new_n_x = new_n_x / 8

                let new_n_y = DATA.positions[count][1]
                new_n_y = new_n_y / 8

                let new_n_z = DATA.positions[count][2]
                new_n_z = new_n_z / 80

                p.translate(new_n_y, new_n_z, new_n_x);
                p.push();
                p.box(70, 70, 70);
                p.pop();


                let new_n_x2 = DATA2.positions[count][0]
                new_n_x2 = new_n_x2 / 8

                let new_n_y2 = DATA2.positions[count][1]
                new_n_y2 = new_n_y2 / 8

                let new_n_z2 = DATA2.positions[count][2]
                new_n_z2 = new_n_z2 / 80

                p.translate(new_n_y2, new_n_z2, new_n_x2);
                p.push();
                p.box(70, 70, 70);
                p.pop();


            }
        }
    };
    new p5(sketch2, 'p5_stage_2');


})
