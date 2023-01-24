$(function() {
    let sketch = function(p) {

        let symmetry = 6;   

        let angle = 360 / symmetry;
        
        p.setup = function() { 
          p.createCanvas(710, 710);
          p.angleMode(p.DEGREES);
          p.background(127);
        }
                
        p.draw = function() {

          if (!GLOBAL_POSES) {
            return;
          }
          p.translate(p.width / 2, p.height / 2);

          let new_n_x = GLOBAL_POSES[0].keypoints[1].x
          let new_n_y = GLOBAL_POSES[0].keypoints[1].y

          let new_n_x2 = GLOBAL_POSES[0].keypoints[2].x
          let new_n_y2 = GLOBAL_POSES[0].keypoints[2].y


          if (new_n_x > 0 && new_n_x < p.width && new_n_y > 0 && new_n_y < p.height) {
            let mx = new_n_x - p.width / 2;
            let my = new_n_y - p.height / 2;
            let pmx = new_n_x2 - p.width / 2;
            let pmy = new_n_y2 - p.height / 2;
            
            for (let i = 0; i < symmetry; i++) {
                p.rotate(angle);
                p.strokeWeight(1);
                p.line(mx, my, pmx, pmy);
                p.push();
                p.scale(1, -1);
                p.line(mx, my, pmx, pmy);
                p.pop();
            }
          }
        }

    };
    new p5(sketch, 'p5_stage');
})