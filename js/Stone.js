class Stone{
    constructor(x, y, w,h) {
        var options = {
          restitution: 0.8,
          friction: 1.0,
          density: 1.0,
          isStatic: true
        };
    this.body = Bodies.rectangle(x,y,w,h);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
}
show() {
    let pos = this.body.position;

    push();
    rectMode(CENTER);
    stroke(255);
    fill(127);
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }
}