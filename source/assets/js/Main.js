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

let Game = new enchant.Core(320, 480);
Game.preload([
  SoundEffect['effect01'],
  SoundEffect['effect02'],
  // BGM['bgm01'],
  BGM['bgm02'],
  Images['note'],
  Images['judge']
]);
Game.fps = 60;

Game.onload = function () {
  let Music = {
    status: 'stop'
  };
  let JudgementLabel = null;
  let Note = null;
  let conductor = null;
  let Judge = null;

  // Background Music loaded
  Music = Game.assets[BGM['bgm02']];

  // Timing judgement Label created
  JudgementLabel = new Label();
  JudgementLabel.font = "36px Arial";
  JudgementLabel.x = 100;
  JudgementLabel.y = 100;
  Game.rootScene.addChild(JudgementLabel);

  // Note icon loaded
  Note = Game.assets[Images['note']];

  // Instantiate conductor
  conductor = new Conductor(Game, Music, JudgementLabel, Note);


  Judge = new Sprite(82, 82);
  Judge.image = Game.assets[Images['judge']];
  Judge.x = 100;
  Judge.y = 380;
  Game.rootScene.addChild(Judge);

  Game.rootScene.addEventListener('enterframe', function () {

    console.log(' --- enterframe --- ');
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

Game.start();
