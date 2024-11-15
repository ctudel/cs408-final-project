export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 490;

    // Background layers
    // layer1 is the same as getElementId("layer1");
    this.sky = new Layer(this.game, this.width, this.height, 0, layer1);
    this.cloud1 = new Layer(this.game, this.width, this.height, 0.2, layer2);
    this.cloud2 = new Layer(this.game, this.width, this.height, 0.1, layer3);
    this.cloud3 = new Layer(this.game, this.width, this.height, 0.25, layer4);
    this.mountain1 = new Layer(this.game, this.width, this.height, 0.3, layer5);
    this.mountain2 = new Layer(this.game, this.width, this.height, 0.3, layer6);
    this.trees = new Layer(this.game, this.width, this.height, 1, layer7);

    this.backgroundLayers = [this.sky, this.cloud2, this.cloud1, this.cloud3, this.mountain2, this.mountain1, this.trees];
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

class Layer {
  constructor(game, width, height, speedFactor, image) {
    this.game = game,
      this.width = width,
      this.height = height,
      this.speedFactor = speedFactor,
      this.image = image,
      this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedFactor;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}
