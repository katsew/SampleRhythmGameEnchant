import SoundEffect from './Assets/SoundEffect.js';
import BGM from './Assets/BackgroundMusic.js';
import Images from './Assets/Image.js';
import Conductor from './Conductor.js';
enchant();

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

let SampleRhythmGame = new enchant.Core(320, 568);
SampleRhythmGame.preload([
  SoundEffect['effect01'],
  SoundEffect['effect02'],
  // BGM['bgm01'],
  BGM['bgm02'],
  Images['note'],
  Images['judge']
]);
SampleRhythmGame.fps = 60;

SampleRhythmGame.onload = function () {
  let Music = {
    status: 'stop'
  };
  let JudgementLabel = null;
  let Note = null;
  let conductor = null;
  let Judge = null;

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
  conductor = new Conductor(SampleRhythmGame, Music, JudgementLabel, Note);


  Judge = new Sprite(82, 82);
  Judge.image = SampleRhythmGame.assets[Images['judge']];
  Judge.x = 100;
  Judge.y = 380;
  SampleRhythmGame.rootScene.addChild(Judge);

  SampleRhythmGame.rootScene.addEventListener('enterframe', function () {

    if (Music.status === "playing") {

      if (conductor.isNoteGenerateTiming()) {
        conductor.generateNote();
        conductor.incrementTimingIndex();
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
