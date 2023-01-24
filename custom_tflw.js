$(function() {
    let sketch = function(p) {

        p.setup = function() {
            p.createCanvas(640, 480);
            p.background(0);
            p.noStroke();
        }
        
        p.draw = function() {
            // Create an alpha blended background
            p.fill(0, 10);
            p.rect(0, 0, p.width, p.height);

            if (playing) {

                let new_n_x = GLOBAL_POSES[0].keypoints[1].x
                let new_n_y = GLOBAL_POSES[0].keypoints[1].y
                let new_n_z = GLOBAL_POSES[0].keypoints[1].score

                console.log(new_n_x, new_n_y, new_n_z)

                p.fill(200);

                p.ellipse(
                    new_n_x,
                    new_n_y,
                    64 + 64 * new_n_z,
                    64 + 64 * new_n_z
                );

                let new_n_x2 = GLOBAL_POSES[0].keypoints[2].x
                let new_n_y2 = GLOBAL_POSES[0].keypoints[2].y
                let new_n_z2 = GLOBAL_POSES[0].keypoints[2].score
                
                p.fill(200);

                p.ellipse(
                    new_n_x2,
                    new_n_y2,
                    64 + 64 * new_n_z2,
                    64 + 64 * new_n_z2
                );

            }
        }
    };
    new p5(sketch, 'p5_stage');
})