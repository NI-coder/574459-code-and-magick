'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT_LIMIT = 150;
var BAR_BASE_Y = 240;
var PLAYERNAME_Y = 260;

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 100, y - 10);
  ctx.lineTo(x + 180, y);
  ctx.lineTo(x + 260, y - 10);
  ctx.lineTo(x + 340, y);
  ctx.lineTo(x + 420, y - 10);
  ctx.lineTo(x + 410, y + 50);
  ctx.lineTo(x + 420, y + 110);
  ctx.lineTo(x + 410, y + 160);
  ctx.lineTo(x + 420, y + 210);
  ctx.lineTo(x + 410, y + 260);
  ctx.lineTo(x + 340, y + 270);
  ctx.lineTo(x + 260, y + 260);
  ctx.lineTo(x + 180, y + 270);
  ctx.lineTo(x + 100, y + 260);
  ctx.lineTo(x + 10, y + 270);
  ctx.lineTo(x, y + 210);
  ctx.lineTo(x + 10, y + 160);
  ctx.lineTo(x, y + 110);
  ctx.lineTo(x + 10, y + 50);
  ctx.lineTo(x, y);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

  var getMaxElement = function (arr) {
    if (arr.length > 0) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
    }
    return maxElement;
  };

  var maxTime = getMaxElement(times);
  var firstBarX = CLOUD_X + 55;

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 140, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 125, CLOUD_Y + FONT_GAP * 2);

  for (var j = 0; j < players.length; j++) {
    var currentX = firstBarX + (BAR_WIDTH + BAR_GAP) * j;
    var barHeight = BAR_HEIGHT_LIMIT * times[j] / maxTime;
    var currentBarY = BAR_BASE_Y - barHeight;
    var currentTimeY = currentBarY - 10;

    var getToneBlue = function () {
      var b = Math.floor(Math.random() * 256);
      var toneBlue = 'rgb(0, 0, ' + b + ')';
      return toneBlue;
    };

    ctx.fillStyle = getToneBlue();

    var currentNameX = currentX;
    if (players[j] === 'Вы') {
      currentNameX += 10;
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillText(Math.round(times[j]) + ' ms', currentX - 10, currentTimeY);
    ctx.fillRect(currentX, currentBarY, BAR_WIDTH, barHeight);
    ctx.fillText(players[j], currentNameX, PLAYERNAME_Y);
  }
};
