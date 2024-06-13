// BFP Joystick v.2.0
// Coded by Loroko 
// Created: 6/10/2024
// Last Updated: 6/12/2024
// blackflypress.com 

const threshold = 200;

class JoyStick extends Phaser.Scene{
  constructor(){
    super('JoyStick');
  }// end constructor 

  preload() {
    this.load.image('touchOrigin', 'touchpad.png'); // load touchpad assets
    this.load.image('touchCurrent', 'touchpad.png'); 
    this.load.bitmapFont('p2', 'PressStart2P.png', 'PressStart2P.xml'); // load font
  }// end preload

  create() {
    this.add.bitmapText(50, 25 , 'p2', `Analog Joystick`, 45).setOrigin(0,0).setTint(0x00ff00); // create UI
    this.angleText = this.add.bitmapText(50, 900 , 'p2', `Angle:`, 45).setOrigin(0,0).setTint(0x00ff00);
    this.forceText = this.add.bitmapText(50, 950 , 'p2', `Force:`, 45).setOrigin(0,0).setTint(0x00ff00);
    this.distanceText = this.add.bitmapText(50, 1000 , 'p2', `Distance:`, 45).setOrigin(0,0).setTint(0x00ff00);
    this.origin = this.add.image(0, 0, 'touchOrigin'); // create touchpad assets
    this.current = this.add.image(0, 0, 'touchCurrent');
    this.origin.setScale(10);
    this.current.setScale(10);
    this.origin.alpha = 0; 
    this.current.alpha = 0;
  }// end create
  
  update() {

    this.angleText.setText('Angle: ' + this.angle); // UI updates
    this.distanceText.setText('Force: ' + this.force);
    this.forceText.setText('Distance: ' + this.distance);

      if (this.input.pointer1.active) { // handle analog control
        this.origin.alpha = .25; // increase opacity
        this.current.alpha = .25;
        this.origin.setPosition(this.input.pointer1.downX, this.input.pointer1.downY); // assign coordinates
        this.current.setPosition(this.input.pointer1.x, this.input.pointer1.y); 
        this.angle = Math.trunc(this.input.pointer1.getAngle() * 180/Math.PI); // get data
        this.distance = Math.trunc(this.input.pointer1.getDistance());
        this.distance = Phaser.Math.Clamp(this.distance, 0, threshold);
        this.force = Math.trunc(this.distance / threshold*100);

          if (this.distance == threshold) { // limit distance of current visually
            Phaser.Math.RotateAroundDistance(this.current, this.origin.x, this.origin.y, 0, threshold);
          }// end if (this.distance

      }// end if (this.leftPointer.active...

      if (!this.input.pointer1.active) { // handle analog control end
        this.origin.setPosition(0, 0); // assign coordinates
        this.current.setPosition(0, 0); 
        this.origin.alpha = 0; // reduce opacity
        this.current.alpha = 0;
        this.angle = 0; // get data
        this.distance = 0;
        this.force = 0;
      }// end if (!this.movePointer.active...

  }// end update

}// end class JoyStick

const config = {
    type: Phaser.AUTO,
    width: 2376,
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
        JoyStick
    ]// end scene
  }; // end config
export default new Phaser.Game(config);

