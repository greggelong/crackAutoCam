let grid = [];

let gsx;
let gsy;
let sz;
let crx;
let cry =0
let img;
let myvideo;
let greyscale = [0,32,64,96,128,160,192,224,255,255,255,255,255]
//let greyscale = [0,32,64,96,128,160,192,224,255]

 

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
  if (width < height) {
    sz = floor(width / 100); // vScale tied to window width so it can work on phone and computer
    console.log("by width");
    gsx = floor(width/sz)
    gsy = floor(height/sz)
    print(gsx,gsy)

  } else {

    sz = floor(height / 100);
    gsx = floor(width/sz)
    gsy = floor(height/sz)

    console.log("by height");
    print(gsx,gsy)
  }
  
  crx =floor(gsx/2);
  myvideo = createCapture(VIDEO)
  myvideo.size(gsx,gsy)
  myvideo.hide();
  frameRate(5)
  noStroke();
 
   
  //update();
  //showGrid();

}


function draw(){
  
  
  makeGrid3()
  cry =0;
  crx =floor(gsx/2)
  grid[cry][crx]="C"
  crackit();
  showGrid();
  }
  


  function makeGrid3() {
    myvideo.loadPixels();
    for (let j = 0; j < gsy; j++) {
      grid[j] = [];
      for (let i = 0; i < gsx; i++) {
        //print(img.get(i*sz,j*sz))
  
        //if (img.get(i*sz,j*sz)[0]<160) {
          //print(img.get(i*sz,j*sz)[0])
          // print("hello")
        //  grid[j][i] = 1;
        //} else {
        //  grid[j][i] = 0;
        //this mirrors the index for see note book
      let index = (gsx - i - 1 + (j * gsx)) * 4;
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
  
 
 

function showGrid() {

  for (let j = 0; j < gsy; j++) {
    
    for (let i = 0; i < gsx; i++) {
      if (grid[j][i] ==="C" ) {
        fill(255,0,0); 
      } else {
        fill(grid[j][i]);
      }
      rect(i * sz, j * sz, sz, sz);
      
    }
  }
}

function crackit(){
  // need only search through the y of grid and look for neighbors 
  for (let j = 0; j < gsy; j++) {
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
