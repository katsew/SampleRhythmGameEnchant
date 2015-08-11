// Constant values
import Constants from './Constants.js';

// Resource paths
import SoundEffect from './Assets/SoundEffect.js';
import BGM from './Assets/BackgroundMusic.js';
import Images from './Assets/Image.js';
import Conductor from './Conductor.js';

// Scenes
import Stage01 from './Scenes/Stage01.js';

// override default loading scene
// enchant.LoadingScene = enchant.Class.create(enchant.Scene, {
//     initialize: function() {
//         enchant.Scene.call(this);
//         var progress = 0, _progress = 0;
//         this.addEventListener('progress', function(e) {
//             console.log('progress', e);
//             progress = e.loaded / e.total * 1.0;
//         });
//         this.addEventListener('load', function(e) {
//             console.log('load', e);
//             var core = enchant.Core.instance;
//             core.removeScene(core.loadingScene);
//             core.dispatchEvent(e);
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
  enchant();
  let timingData = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992];
  let timingData2 = [5.486, 9.155, 12.977, 14.377, 19.611, 20.062, 23.123, 24.297, 25.303, 28.408, 30.110, 31.601, 33.305, 34.454, 35.960, 37.40, 39.402, 41.354, 42.151, 43.233, 44.261, 46.705, 48.448, 49.416, 50.407, 52.310, 53.231, 54.917, 56.288, 58.472, 59.190, 60.110, 61.993, 63.370, 64.072, 64.993, 65.211, 66.414, 67.222, 68.891, 69.209, 70.056, 73.111, 75.861, 77.090, 79.340];
  let SampleRhythmGame = new enchant.Core(Constants.DOCUMENT_WIDTH, Constants.DOCUMENT_HEIGHT);
  let stage01 = new Stage01();

  SampleRhythmGame.preload([
    SoundEffect['effect01'],
    SoundEffect['effect02'],
    // BGM['bgm01'],
    BGM['bgm02'],
    Images['note'],
    Images['judge']
  ]);
  SampleRhythmGame.fps = 30;

  SampleRhythmGame.onload = function () {
    let Music = {
      status: 'stop'
    };
    let JudgementLabel = null;
    let Note = null;
    let conductor = null;
    let conductor2 = null;
    let Judge = null;
    let Judge2 = null;

    // Background Music loaded
    Music = SampleRhythmGame.assets[BGM['bgm02']];

    // Timing judgement Label created
    JudgementLabel = new Label();
    JudgementLabel.font = "36px Arial";
    JudgementLabel.x = 100;
    JudgementLabel.y = 100;
    SampleRhythmGame.rootScene.addChild(JudgementLabel);

    // Note icon loaded
    Note = SampleRhythmGame.assets[Images['note']];

    // Instantiate conductor
    conductor = new Conductor(SampleRhythmGame, Music, JudgementLabel, Note, {X: 30}, SampleRhythmGame.assets[SoundEffect['effect01']], timingData);
    conductor2 = new Conductor(SampleRhythmGame, Music, JudgementLabel, Note, {X: Constants.DOCUMENT_WIDTH - 130}, SampleRhythmGame.assets[SoundEffect['effect02']], timingData2);


    Judge = new Sprite(82, 82);
    Judge.image = SampleRhythmGame.assets[Images['judge']];
    Judge.x = 30;
    Judge.y = Constants.DOCUMENT_HEIGHT * 0.8;
    SampleRhythmGame.rootScene.addChild(Judge);

    Judge2 = new Sprite(82, 82);
    Judge2.image = SampleRhythmGame.assets[Images['judge']];
    Judge2.x = Constants.DOCUMENT_WIDTH - 130;
    Judge2.y = Constants.DOCUMENT_HEIGHT * 0.8;
    SampleRhythmGame.rootScene.addChild(Judge2);

    SampleRhythmGame.rootScene.addEventListener('enterframe', function () {

      if (Music.status === "playing") {

        if (conductor.isNoteGenerateTiming()) {
          conductor.generateNote();
          conductor.incrementTimingIndex();
        }
        if (conductor2.isNoteGenerateTiming()) {
          conductor2.generateNote();
          conductor2.incrementTimingIndex();
        }
        if (Music.currentTime >= conductor.getEndTime()) {
          console.log(Music);
          Music._volume = Music._volume - 1;
          if (Music._volume <= 0) {
            Music.stop();
            Music.status = "end";
          }
        }
      }
    });
    Music.status = "playing";
    Music.play();
  };

  SampleRhythmGame.start();

});
