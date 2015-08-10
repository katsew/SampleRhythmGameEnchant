export default class Conductor {
  constructor(game, music, judgementLabel, noteIcon) {
    this._game = game;
    this._timing = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992];
    this._endTime = 80;
    this._timingIndex = 0;
    this._music = music;
    this._judgementLabel = judgementLabel;
    this._noteIcon = noteIcon;
  }
  isNoteGenerateTiming() {
    let timing = this._timing;
    let idx = this._timingIndex;
    let currentTime = this._music.currentTime;
    if (timing[idx] != null) {
      if (currentTime > timing[idx] - 1) {
        return true;
      }
      return false;
    }
  }
  generateNote() {

    console.log(this._game);
    console.log(enchant);
    console.log(enchant.Sprite);
    console.log (this._timingIndex);
    let note = new enchant.Sprite(82, 82);
    let self = this;
    note.image = this._noteIcon;
    note.number = this._timingIndex;
    note.x = 100;
    note.y = -100;
    note.timing = this._timing[this._timingIndex];
    this._game.rootScene.addChild(note);
    note.tl.setTimeBased();
    note.tl.moveY(380, (this._timing[this._timingIndex] - this._music.currentTime) * 1000);
    note.addEventListener('touchstart', function (e) {
      note.clearTime = self._music.currentTime;
      note.clear = true;
    });
    note.addEventListener('enterframe', function (e) {
      if (self._music.currentTime > self._timing[note.number] + 1) {
        self._game.rootScene.removeChild(note);
      }
      if (note.clear === true) {
        note.opacity -= 0.2;
        if (note.opacity <= 0) {
          self._game.rootScene.removeChild(0);
          let judgeTime = note.clearTime - self._timing[note.number];
          if ( (-0.2 <= judgeTime) && ( judgeTime <= 0.2) ) {
            self._judgementLabel.text = "COOL";
          } else if ( (-0.5 <= judgeTime) && (judgeTime <= 0.5) ) {
            self._judgementLabel.text = "GOOD";
          } else {
            self._judgementLabel.text = "BAD";
          }

        }
      }
    });
  }
  incrementTimingIndex() {
    ++this._timingIndex;
  }
  getEndTime() {
    return this._endTime;
  }
}