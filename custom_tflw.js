// Fire Effect
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/103-fire-effect.html
// https://youtu.be/X0kjv0MozuY

// Algorithm: https://web.archive.org/web/20160418004150/http://freespace.virgin.net/hugo.elias/models/m_fire.htm


$(function() {
    let sketch = function(p) {

        let symmetry = 6;   

        let angle = 360 / symmetry;
        
        p.setup = function() { 
          p.createCanvas(640, 480);
          p.angleMode(p.DEGREES);
          p.background(127);
        }
                
        p.draw = function() {

          if (!GLOBAL_POSES) {
            return;
          }
          p.translate(p.width / 2, p.height / 2);

          let new_n_x = GLOBAL_POSES[0].keypoints[20].x
          let new_n_y = GLOBAL_POSES[0].keypoints[20].y

          let new_n_x2 = GLOBAL_POSES[0].keypoints[22].x
          let new_n_y2 = GLOBAL_POSES[0].keypoints[22].y


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

    let sketch2 = function(p) {
        
        let buffer1;
        let buffer2;
        let cooling;
        const w = 320;
        const h = 480;

        let ystart = 0.0;

        p.setup = function() {
            p.pixelDensity(1);
            p.createCanvas(w * 2, h);
            buffer1 = p.createGraphics(w, h);
            buffer2 = p.createGraphics(w, h);
            cooling = p.createImage(w, h);
        }

        function cool() {
            cooling.loadPixels();
            let xoff = 0.0; // Start xoff at 0
            let increment = 0.02;
            // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
            for (let x = 0; x < w; x++) {
                xoff += increment; // Increment xoff
                let yoff = ystart; // For every xoff, start yoff at 0
                for (let y = 0; y < h; y++) {
                    yoff += increment; // Increment yoff
          
                    // Calculate noise and scale by 255
                    let n = p.noise(xoff, yoff);
                    let bright = p.pow(n, 3) * 255;
            
                    // Try using this line instead
                    //let bright = random(0,255);
            
                    // Set each pixel onscreen to a grayscale value
                    let index = (x + y * w) * 4;
                    cooling.pixels[index] = bright;
                    cooling.pixels[index + 1] = bright;
                    cooling.pixels[index + 2] = bright;
                    cooling.pixels[index + 3] = 255;
                }
            }
          
            cooling.updatePixels();
            ystart += increment;
        }

        function fire(rows) {
            buffer1.loadPixels();
            for (let x = 0; x < w; x++) {
                for (let j = 0; j < rows; j++) {
                    let y = h - (j + 1);
                    let index = (x + y * w) * 4;
                    buffer1.pixels[index] = 255;
                    buffer1.pixels[index + 1] = 255;
                    buffer1.pixels[index + 2] = 255;
                    buffer1.pixels[index + 3] = 255;
                }
            }
            buffer1.updatePixels();
        }

        p.draw = function() {
            fire(2);

            if (GLOBAL_POSES && GLOBAL_POSES[0].keypoints3D[20].score > 0.8) {
                buffer1.fill(255);
                buffer1.noStroke();
                let x = GLOBAL_POSES[0].keypoints3D[20].x * -2 * w + 0.5 * w;
                let y = GLOBAL_POSES[0].keypoints3D[20].y * h + h;
                let z = (GLOBAL_POSES[0].keypoints3D[20].z * 20) * (GLOBAL_POSES[0].keypoints3D[20].z * 20);
                console.log(x,y,z);
                buffer1.ellipse(
                    x,
                    y,
                    z,
                    z
                )
            }

            cool();
            p.background(0);
            buffer1.loadPixels();
            buffer2.loadPixels();
            for (let x = 1; x < w - 1; x++) {
              for (let y = 1; y < h - 1; y++) {
                let index0 = (x + y * w) * 4; // x, y
                let index1 = (x + 1 + y * w) * 4; // (x + 1), y
                let index2 = (x - 1 + y * w) * 4; // (x - 1), y
                let index3 = (x + (y + 1) * w) * 4; // x, (y + 1)
                let index4 = (x + (y - 1) * w) * 4; // x, (y - 1)
          
                // Because we are using only gray colors, the value of the color
                // components are the same, and we can use that as brightness.
                let c1 = buffer1.pixels[index1];
                let c2 = buffer1.pixels[index2];
                let c3 = buffer1.pixels[index3];
                let c4 = buffer1.pixels[index4];
          
                let c5 = cooling.pixels[index0];
                let newC = c1 + c2 + c3 + c4;
                newC = newC * 0.25 - c5;
          
                buffer2.pixels[index4] = newC;
                buffer2.pixels[index4 + 1] = newC;
                buffer2.pixels[index4 + 2] = newC;
                buffer2.pixels[index4 + 3] = 255;
              }
            }
            buffer2.updatePixels();
          
            // Swap
            let temp = buffer1;
            buffer1 = buffer2;
            buffer2 = temp;
          
            p.image(buffer2, 0, 0);
            p.image(cooling, w, 0);
        }
    }

    new p5(sketch2, 'p5_stage_2');

})