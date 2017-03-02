import CatchGameScreenComponent from './catch_game_screen_component';

export default function (props, ref, key) {
    return CatchGameScreenComponent(props, ref, key, {
        id: 'catch-game-lvl-1',
        level: 1,
        timeout: 30000,
        dropTimeout: 1000,
        dropSpeed: 'slow',
        openOnStart: 'instructions',
        points: {
            goal: 50,
            correct: 5,
            incorrect: -10
        },
        dropPoints: ['left', 'right'],
        bin: [
            {
                className: 'trash floss',
                message: 'trash'
            },
            {
                className: 'trash medicine',
                message: 'trash'
            },
            {
                className: 'trash diaper',
                message: 'trash'
            },
            {
                className: 'trash bandaid',
                message: 'trash'
            },
            {
                className: 'trash oil',
                message: 'trash'
            },
            {
                className: 'trash gum',
                message: 'trash'
            }
        ],
        vos: [
            <skoash.MediaSequence
              ref="instructions"
            >
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}catchto-win.mp3`}
                />
            </skoash.MediaSequence>,
            <skoash.MediaSequence
                ref="level-complete"
                silentOnStart
            >
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}level-complete.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}lvl-1-complete.mp3`}
                />
            </skoash.MediaSequence>,
            <skoash.MediaSequence
                ref="try-again"
                silentOnStart
            >
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}level-fail.mp3`}
                    complete
                />
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}try-again.mp3`}
                    complete
                />
            </skoash.MediaSequence>
        ],
        revealPromptList: [
            <skoash.Component data-ref="instructions">
                <skoash.Component className="frame">
                    <skoash.Image className="fish-left" src={`${CMWN.MEDIA.IMAGE}fish-ins.png`} />
                    <skoash.Component className="fish-right" />
                    <span>
                        Catch the pollutants by<br />
                        using the arrow keys or<br />
                        swiping the touch screen.
                    </span>
                    <span>
                        Be sure not to catch any<br />
                        animals or plants.
                    </span>
                </skoash.Component>
            </skoash.Component>,
            <skoash.Component data-ref="level-complete" className="level-one-complete">
                <skoash.Component className="frame">
                    <skoash.Component className="banner" />
                    <span>
                        Good Job! You are on the way<br />
                        to saving fish lives!
                    </span>
                </skoash.Component>
            </skoash.Component>,
            <skoash.Component data-ref="try-again">
                <skoash.Component className="frame">
                    <span>
                        The water is polluted<br />
                        and the fish are sad!<br />
                        But you have another chance<br />
                        to save the day and clean their water.
                    </span>
                </skoash.Component>
            </skoash.Component>
        ]
    });
}
