window.addEventListener('load', function() {
    document.getElementById('tedy-bear').appendChild(app.view);
})

window.addEventListener('resize', function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  
    dude.x = app.screen.width / 2;
    dude.y = app.screen.height / 2;
})

const app = new PIXI.Application({
    resizeTo: window,
    transparent: false,
    width: window.innerWidth,
    height: window.innerHeight 
});

// graphics.alpha = 0;
// PIXI.loader.add('');

//Scale to fit and center
// var size = new PIXI.Rectangle(0,0,window.innerWidth, window.innerHeight);
// var s = app.width/this.gameArea.width;
// if(s > app.height/this.gameArea.height) s = app.height/this.gameArea.height;
// this.gameArea.scale.x = this.gameArea.scale.y = s;
// this.gameArea.x = Math.round((app.width-this.gameArea.width)/2);

//app.renderer.resize(window.innerWidth, window.innerHeight);

let tapCounter = 0;



// create a texture from an image path
const texture = PIXI.Texture.from('images/bunny1.png');

// create a second texture
const secondTexture = PIXI.Texture.from('images/bunny2.png');
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

// create a new Sprite using the texture
const dude = new PIXI.Sprite(texture);

dude.interactive = true;
dude.buttonMode = true;
dude.scale.set(1);
dude.anchor.set(0.5);
dude.x = app.screen.width / 2;
dude.y = app.screen.height / 2;



 dude.on('pointertap', onPointerTap)
  // events for drag start
 dude.on('mousedown', onDragStart)
 dude.on('touchstart', onDragStart)
 // events for drag end
 dude .on('mouseup', onDragEnd)
 dude .on('mouseupoutside', onDragEnd)
 dude.on('touchend', onDragEnd)
 dude.on('touchendoutside', onDragEnd)
 // events for drag move
 dude.on('mousemove', onDragMove)
 dude .on('touchmove', onDragMove);

//  app.renderer.autoResize = false;
 app.stage.addChild(dude);


 app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    dude.rotation += 0.1;
});


PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// ----------------- helper functions --------------------------------

let switchTexture = false;

function onPointerTap() {
    if(tapCounter == 0){
        // first click, start timer
        setTimeout(resetCounter, 300)
    }

    if(++tapCounter >= 2){
        // second click, change dude texture
        changeTexture();
        tapCounter = 0;
    }
}

function resetCounter(){
    tapCounter = 0;
}

function changeTexture() {
    switchTexture = !switchTexture;
    if (switchTexture) {
        dude.texture = secondTexture;
        dude.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    } else {
        dude.texture = texture;
        dude.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }
}

function animate() {

    requestAnimationFrame(animate);

    // render the stage
    renderer.render(stage);
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}