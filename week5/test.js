let timer = null;

function calculateHealth() {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      bullets.forEach((el) => {
        if (getDistance(el.xpos, el.ypos, player.x + 20, player.y - 10 + player.height / 2) < CONTACTLENGTH) {
          console.log("heat");
          player.health -= player.damage;
          if (player.health < 0) player.health = 0;
        }
      });
    }, 500);
  }
}
