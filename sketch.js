let grid = [];

let gsz = 200;
let sz = 3;
let crx;
let cry =0
let img;
let myvideo;
let greyscale = [0,32,64,96,128,160,192,224,255,255,255,255,255]
//let greyscale = [0,32,64,96,128,160,192,224,255]

 

function setup() {
  cnv = createCanvas(600, 600);
  pixelDensity(1);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;

  cnv.position(cx, cy);
  
  crx =floor(gsz/2);
  myvideo = createCapture(VIDEO)
  myvideo.size(gsz,gsz)
  myvideo.hide();
  frameRate(5)
  noStroke();
 
   
  //update();
  //showGrid();

}


function draw(){
  
  
  makeGrid3()
  cry =0;
  crx =floor(gsz/2)
  grid[cry][crx]="C"
  crackit();
  showGrid();
  }
  


  function makeGrid3() {
    myvideo.loadPixels();
    for (let j = 0; j < gsz; j++) {
      grid[j] = [];
      for (let i = 0; i < gsz; i++) {
        //print(img.get(i*sz,j*sz))
  
        //if (img.get(i*sz,j*sz)[0]<160) {
          //print(img.get(i*sz,j*sz)[0])
          // print("hello")
        //  grid[j][i] = 1;
        //} else {
        //  grid[j][i] = 0;
        //this mirrors the index for see note book
      let index = (gsz - i - 1 + (j * gsz)) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];

      let bright = floor((r + g + b) / 3) // the brightness or greyscale 0-255 is the average of the rgb
      let gscale = floor(map(bright,0,255,0,greyscale.length-1))
      //print(bright, gscale)
      grid[j][i]=greyscale[gscale];
        
        }
      }
    }
  

function makeGrid2() {
  for (let j = 0; j < gsz; j++) {
    grid[j] = [];
    for (let i = 0; i < gsz; i++) {
      //print(img.get(i*sz,j*sz))

      //if (img.get(i*sz,j*sz)[0]<160) {
        //print(img.get(i*sz,j*sz)[0])
        // print("hello")
      //  grid[j][i] = 1;
      //} else {
      //  grid[j][i] = 0;
      grid[j][i]=img.get(i*sz,j*sz)[0]
      
      }
    }
  }


function makeGrid() {
  for (let j = 0; j < gsz; j++) {
    grid[j] = [];
    for (let i = 0; i < gsz; i++) {
      //print(img.get(i*sz,j*sz))

      if (random(1)>0.5) {
        // print("hello")
        grid[j][i] =157;
      } else {
        grid[j][i] = 255;
      }
    }
  }
}


function showGrid() {

  for (let j = 0; j < gsz; j++) {
    let clr = 167 //color(random(30,255),random(30,255),random(30,255))
    for (let i = 0; i < gsz; i++) {
      if (grid[j][i] ==="C" ) {
        fill(255,0,0); // fill(117,200,174);
      } else {
        fill(grid[j][i]);
      }
      rect(i * sz, j * sz, sz, sz);
      
    }
  }
}

function crackit(){
  // need only search through the y of grid and look for neighbors 
  for (let j = 0; j < gsz; j++) {
    cry = j
    let left = grid[cry][crx-1]
    let right = grid[cry][crx+1]
    //print(left+right)
    //if (left===1 && left + right ===1){  // only left
    if (left >right){
      crx-=1
      //print("left")
      
      
    }
    else if(right>left){
      crx+=1
    }
    grid[cry][crx]="C"
  

  }
  

}
