import SoundEffect from './Assets/SoundEffect.js';


let note = null;
let timing = null;
let idx = null;
let currentTime = null;
let self = null;
let judgeTime = null;
export default class Conductor {

  constructor(game, music, judgementLabel, noteIcon) {
    self = this;
    self._game = game;
    self._timing = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992];
    self._endTime = 80;
    self._timingIndex = 0;
    self._music = music;
    self._judgementLabel = judgementLabel;
    self._noteIcon = noteIcon;
    self._effectLeft = game.assets[SoundEffect['effect01']];
    self._effectRight = game.assets[SoundEffect['effect02']];
    self._notes = [];
    self._initNotes();

  }
  isNoteGenerateTiming() {
    timing = self._timing;
    idx = self._timingIndex;
    currentTime = self._music.currentTime;
    if (timing[idx] != null) {
      if (currentTime > timing[idx] - 1) {
        return true;
      }
      return false;
    }
  }
  _initNotes() {
    self._timing.forEach( function (elem, index) {
      let note = new enchant.Sprite(82, 82);
      note.image = self._noteIcon;
      note.soundEffect = self._effectRight.clone();
      note.opacity = 1;
      note.x = 100;
      note.y = -100;
      note.timing = self._timing[index];
      self._notes.push(note);
    });
  }
  generateNote() {
    let note = self._notes.shift();
    note.tl.setTimeBased();
    note.tl.moveY(380, (note.timing - self._music.currentTime) * 1000);
    note.addEventListener('touchstart', function (e) {
      note.clearTime = self._music.currentTime;
      note.clear = true;
      note.soundEffect.play();
    });
    note.addEventListener('enterframe', function (e) {
      if (self._music.currentTime > note.timing + 0.5) {
        self._game.rootScene.removeChild(note);
        self._judgementLabel.text = "BAD";
      }
      if (note.clear === true) {
        note.opacity -= 0.2;

        if (note.opacity <= 0) {
          self._game.rootScene.removeChild(0);
          judgeTime = note.clearTime - note.timing;
          if ( (-0.15 <= judgeTime) && ( judgeTime <= 0.15) ) {
            self._judgementLabel.text = "COOL";
          } else if ( -0.25 <= judgeTime ) {
            self._judgementLabel.text = "GOOD";
          } else if ( judgeTime <= 0.25 ) {
            self._judgementLabel.text = "GOOD";
          } else {
            self._judgementLabel.text = "BAD";
          }

        }
      }
    });
    self._game.rootScene.addChild(note);

  }
  incrementTimingIndex() {
    ++self._timingIndex;
  }
  getEndTime() {
    return self._endTime;
  }
}