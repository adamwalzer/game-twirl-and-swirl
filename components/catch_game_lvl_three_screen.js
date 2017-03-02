import CatchGameScreenComponent from './catch_game_screen_component';

export default function (props, ref, key) {
    return CatchGameScreenComponent(props, ref, key, {
        id: 'catch-game-lvl-3',
        level: 3,
        timeout: 60000,
        dropTimeout: 1000,
        dropSpeed: 'medium',
        points: {
            goal: 50,
            correct: 5,
            incorrect: -10
        },
        dropPoints: ['left', 'middle', 'right'],
        bin: [
            {
                className: 'fish',
                message: ''
            },
            {
                className: 'turtle',
                message: ''
            },
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
                ref="level-complete"
                silentOnStart
            >
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}level-complete.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}lvl-3-complete.mp3`}
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
            <skoash.Component data-ref="level-complete" className="level-three-complete">
                <skoash.Component className="frame">
                    <skoash.Component className="banner" />
                    <span>
                        You're halfway there! Thanks for<br />
                        being a responsible flusher!
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
