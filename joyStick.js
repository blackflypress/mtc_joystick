
// BFP Joystick v.1.0
// Coded by Loroko 
// Created: 6/10/2024
// Last Updated: 6/10/2024
// blackflypress.com 

const tapThreshold = 150;
const swipeThreshold = 100

class Example extends Phaser.Scene{

    constructor(){
        super('Touchpad');
      }// end constructor 

      preload() {
        this.load.image('touchOrigin', 'touchpad.png'); // load touchpad assets
        this.load.image('touchCurrent', 'touchpad.png'); 
        this.load.bitmapFont('p2', 'PressStart2P.png', 'PressStart2P.xml');
      }// end preload

      create() {
        this.add.bitmapText(50, 25 , 'p2', `Analog Control`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.AngleText = this.add.bitmapText(50, 950 , 'p2', `Angle:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.DistanceText = this.add.bitmapText(50, 1000 , 'p2', `Distance:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.Origin = this.add.image(0, 0, 'touchOrigin'); // create touchpad assets
        this.Current = this.add.image(0, 0, 'touchCurrent');
        this.Origin.setScale(6);
        this.Current.setScale(6);
        this.Origin.alpha = 0; 
        this.Current.alpha = 0;
        }// end create
  
        update() {
          this.AngleText.setText('Angle: ' + this.Angle); // UI updates
          this.DistanceText.setText('Distance: ' + this.Distance);
            if (this.input.pointer1.active) { // handle analog control
              this.Origin.alpha = .6; // increase opacity
              this.Current.alpha = .6;
              this.Origin.setPosition(this.input.pointer1.downX, this.input.pointer1.downY); // assign coordinates
              this.Current.setPosition(this.input.pointer1.x, this.input.pointer1.y); 
              this.Angle = Math.trunc(this.input.pointer1.getAngle() * 180/Math.PI); // get data
              this.Distance = Math.trunc(this.input.pointer1.getDistance());
            }// end if (this.leftPointer.active...
      
            if (!this.input.pointer1.active) {      // handle analog control end
              this.Active = false;
              this.Origin.alpha = 0; // reduce opacity
              this.Current.alpha = 0;
            }// end if (!this.movePointer.active...
      
            if (!this.input.pointer1.active) { // handle all touch end
              this.touch = false;
            }// end if (!this.gesturePointer.active...

        }//end update
    //   } //end Touchpad scene
      
}
const config = {
    type: Phaser.AUTO,
    width: 2160,
    height: 1080,
    backgroundColor: 0xacabaf,
    input: {
      activePointers: 2
    },// end input
    physics: { 
        default: 'arcade',
        arcade: {
            
            debug: true,
            debugShowBody: true,
            debugBodyColor: 0x00ff00
        },// end arcade
    },// end physics
    render: {
        pixelArt: true
    },// end render
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },// end scale
    scene: [
        Example
    ]// end scene
    // seed: [ (Date.now() * Math.random()).toString() ]
  }; // end config
export default new Phaser.Game(config);

