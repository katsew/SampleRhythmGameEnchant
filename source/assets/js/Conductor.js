import SoundEffect from './Assets/SoundEffect.js';
import Constants from './Constants.js';

export default class Conductor {

  constructor(game, music, judgementLabel, noteIcon, notePos, soundEffect, timingData) {
    this._game = game;
    this._timing = timingData;
    this._endTime = 80;
    this._timingIndex = 0;
    this._music = music;
    this._judgementLabel = judgementLabel;
    this._noteIcon = noteIcon;
    this._soundEffect = soundEffect;
    this._notes = [];
    this._initNotes(notePos);

  }
  isNoteGenerateTiming() {
    let self = this;
    let timing = self._timing;
    let idx = self._timingIndex;
    let currentTime = self._music.currentTime;
    if (timing[idx] != null) {
      if (currentTime > timing[idx] - 1) {
        return true;
      }
      return false;
    }
  }
  _initNotes(notePos) {
    let self = this;
    self._timing.forEach( function (elem, index) {
      let note = new enchant.Sprite(82, 82);
      note.image = self._noteIcon;
      note.soundEffect = self._soundEffect.clone();
      note.opacity = 1;
      note.x = notePos.X;
      note.y = -100;
      note.timing = self._timing[index];
      self._notes.push(note);
    });
  }
  generateNote() {
    let self = this;
    let note = self._notes.shift();
    note.tl.setTimeBased();
    note.tl.moveY(Constants.DOCUMENT_HEIGHT * 0.8, (note.timing - self._music.currentTime) * 1000);
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
          let judgeTime = note.clearTime - note.timing;
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
    ++this._timingIndex;
  }
  getEndTime() {
    return this._endTime;
  }
}