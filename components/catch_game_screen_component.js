import classNames from 'classnames';

import MediaCollection from 'shared/components/media_collection/0.1';
import RevealPrompt from 'shared/components/reveal_prompt/0.1';
import Score from 'shared/components/score/0.1';
import Catchable from 'shared/components/catchable/0.1';
import Dropper from 'shared/components/dropper/0.1';
import Catcher from 'shared/components/catcher/0.1';
import Randomizer from 'shared/components/randomizer/0.1';
import Timer from 'shared/components/timer/0.1';

export default function (props, ref, key, opts = {}) {
    var bin = [];
    var SFXOnPlay;
    var scoreOnComplete;
    var timerOnComplete;
    var timerOnCheckComplete;
    var revealPromptOnOpen;
    var revealPromptOnClose;
    var dropperGetClassNames;
    var dropperOnAddClassName;
    var dropperOnTransitionEnd;
    var dropperOnStop;
    var catcherOnMove;
    var catcherOnCorrect;
    var catcherOnIncorrect;
    var renderDropPoints;

    for (let i = 0; i < opts.bin.length; i++) {
        bin.push(
            <Catchable
                className={classNames(
                    opts.bin[i].className,
                    opts.dropSpeed,
                    {
                        PAUSED: _.get(props, 'gameState.paused', false)
                    }
                )}
                message={opts.bin[i].message}
            />
        );
    }

    SFXOnPlay = function () {
        this.updateGameState({
            path: 'sfx',
            data: {
                play: null
            }
        });
    };

    scoreOnComplete = function () {
        this.updateGameState({
            path: 'sfx',
            data: {
                countdown: null
            }
        });

        if (_.get(props, 'data.reveal.open') === 'level-complete') return;

        this.updateGameState({
            path: 'reveal',
            data: {
                open: 'try-again'
            }
        });
    };

    timerOnComplete = function () {
        this.updateGameState({
            path: 'sfx',
            data: {
                countdown: null
            }
        });

        this.updateGameState({
            path: 'score',
            data: {
                points: 0
            }
        });

        if (_.get(props, 'data.reveal.open') === 'level-complete') return;

        this.updateGameState({
            path: 'reveal',
            data: {
                open: 'try-again'
            }
        });
    };

    timerOnCheckComplete = function () {
        if (_.get(props, 'data.sfx.countdown') === 'countdown') return;
        if (this.props.timeout - this.state.time <= 10000) {
            this.updateGameState({
                path: 'sfx',
                data: {
                    countdown: 'countdown'
                }
            });
        }
    };

    revealPromptOnOpen = function () {
        this.updateGameState({
            path: 'game',
            data: {
                stop: true,
                start: false
            }
        });
    };

    revealPromptOnClose = function () {
        this.updateGameState({
            path: 'game',
            data: {
                stop: false,
                start: true
            }
        });
        this.updateGameState({
            path: 'sfx',
            data: {
                play: 'button'
            }
        });
        this.updateGameState({
            path: 'reveal',
            data: {
                open: null
            }
        });
    };

    dropperGetClassNames = function () {
        var index = this.state.itemCount;
        var classes = this.state.classes;
        classes[index] = _.sample(opts.dropPoints);
        return classes;
    };

    dropperOnAddClassName = function (className) {
        if (className === 'go') return;
        this.updateGameState({
            path: 'sfx',
            data: {
                play: 'drop'
            }
        });
    };

    dropperOnTransitionEnd = function (item) {
        if (_.get(props, 'data.reveal.open') ||
            _.get(props, 'data.catcher.miss') ||
            props.gameState.paused ||
            !item.state.canCatch) return;

        this.updateGameState({
            path: 'catcher',
            data: {
                miss: true
            }
        });

        setTimeout(() => {
            this.updateGameState({
                path: 'catcher',
                data: {
                    miss: false
                }
            });
        }, 1000);

        if (item.props.message === 'trash') {
            this.updateGameState({
                path: 'score',
                data: {
                    points: _.get(props, 'data.score.points', 0) + opts.points.incorrect,
                },
            });
            this.updateGameState({
                path: 'sfx',
                data: {
                    play: 'incorrect-miss',
                }
            });
        } else {
            this.updateGameState({
                path: 'sfx',
                data: {
                    play: 'splash',
                }
            });
        }
    };

    dropperOnStop = function () {
        this.setState({
            items: {}
        });
    };

    catcherOnMove = function (e) {
        var rect;
        var styles;
        if (e.target !== this.refs.catcher) return;
        if (e.targetTouches && e.targetTouches[0]) {
            rect = e.target.getBoundingClientRect();
            e = e.targetTouches[0];
            e.offsetX = e.pageX - rect.left;
        }

        styles = this.state.styles;

        styles[0] = {
            left: e.offsetX,
        };

        this.setState({
            styles,
        });
    };

    catcherOnCorrect = function (bucketRef, catchableRef) {
        bucketRef.addClassName('correct');
        catchableRef.addClassName('correct');

        setTimeout(() => {
            bucketRef.removeClassName('correct');
        }, 500);

        this.updateGameState({
            path: 'score',
            data: {
                points: _.get(props, 'data.score.points', 0) + opts.points.correct,
            },
        });

        this.updateGameState({
            path: 'sfx',
            data: {
                play: 'correct-catch',
            }
        });

        if (_.get(props, 'data.score.points') >= opts.points.goal) {
            this.updateGameState({
                path: 'game',
                data: {
                    complete: true,
                    start: false,
                    stop: true
                }
            });

            this.updateGameState({
                path: 'reveal',
                data: {
                    open: 'level-complete'
                }
            });
        }
    };

    catcherOnIncorrect = function (bucketRef, catchableRef) {
        bucketRef.addClassName('incorrect');
        catchableRef.addClassName('incorrect');

        setTimeout(() => {
            bucketRef.removeClassName('incorrect');
        }, 1000);
        this.updateGameState({
            path: 'score',
            data: {
                points: _.get(props, 'data.score.points', 0) + opts.points.incorrect,
            },
        });

        this.updateGameState({
            path: 'sfx',
            data: {
                play: 'incorrect-catch',
            }
        });
    };

    renderDropPoints = function () {
        return _.map(opts.dropPoints, (val) => {
            return (
                <skoash.Component className={`pipe ${val}`} />
            );
        });
    };

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id={opts.id}
        >
            <skoash.Component className="misc">
                <skoash.Component
                    className={classNames(
                        'fish-1', {
                            sad: _.get(props, 'data.sfx.countdown')
                        }
                    )}
                />
                <skoash.Component
                    className={classNames(
                        'fish-2', {
                            sad: _.get(props, 'data.sfx.countdown')
                        }
                    )}
                />
                <skoash.Component
                    className={classNames(
                        'fish-3', {
                            sad: _.get(props, 'data.sfx.countdown')
                        }
                    )}
                />
                <skoash.Component
                    className={classNames(
                        'fish-4', {
                            sad: _.get(props, 'data.sfx.countdown')
                        }
                    )}
                />
            </skoash.Component>

            <skoash.Component className="drop-points" children={renderDropPoints()} />

            <MediaCollection
                play={_.get(props, 'data.reveal.open')}
                children={opts.vos}
            />

            <MediaCollection
                play={_.get(props, 'data.sfx.countdown', null)}
                onPlay={SFXOnPlay}
            >
                <skoash.Audio
                    ref="countdown"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}timer-last-10-sec.mp3`}
                    silentOnStart
                    complete
                />
            </MediaCollection>


            <MediaCollection
                play={_.get(props, 'data.sfx.play', null)}
                onPlay={SFXOnPlay}
            >
                <skoash.Audio
                    ref="button"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}button.mp3`}
                    silentOnStart
                    complete
                />
                <skoash.Audio
                    ref="splash"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}drop-splash.mp3`}
                    complete
                />
                <skoash.MediaSequence ref="incorrect-miss" silentOnStart>
                    <skoash.Audio
                        ref="splash"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}drop-splash.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="miss"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}loose-points.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
                <skoash.MediaSequence ref="correct-catch" silentOnStart>
                    <skoash.Audio
                        ref="catch"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}basket.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="earn"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}gain-points.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
                <skoash.MediaSequence ref="incorrect-catch" silentOnStart>
                    <skoash.Audio
                        ref="catch"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}basket.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="lose"
                        type="sfx"
                        src={`${CMWN.MEDIA.EFFECT}loose-points.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
            </MediaCollection>

            <Score
                ref="score"
                className={`score lvl-${opts.level}`}
                max={opts.points}
                correct={_.get(props, 'data.score.points', 0)}
                checkComplete={false}
                complete={_.get(props, 'data.game.complete', false)}
                onComplete={scoreOnComplete}
            />

            <Timer
                ref="timer"
                countDown={true}
                timeout={opts.timeout}
                stop={_.get(props, 'data.game.complete', false)}
                complete={_.get(props, 'data.game.complete', false)}
                checkComplete={_.get(props, 'data.game.start', false)}
                onCheckComplete={timerOnCheckComplete}
                restart={_.get(props, 'data.game.start', false)}
                onComplete={timerOnComplete}
                className={classNames({TIMEOUT: _.get(props, 'data.sfx.countdown')})}
            />

            <RevealPrompt
                ref="reveal-prompt"
                openOnStart={opts.openOnStart}
                onOpen={revealPromptOnOpen}
                onClose={revealPromptOnClose}
                openReveal={_.get(props, 'data.reveal.open', null)}
                list={opts.revealPromptList}
            />

            <Dropper
                leftBound={70}
                rightBound={820}
                on={_.get(props, 'data.game.start', false) && !_.get(props, 'gameState.paused')}
                start={_.get(props, 'data.game.start', false)}
                stop={_.get(props, 'data.game.complete', false)}
                onStop={dropperOnStop}
                prepClasses={['ready', 'go']}
                prepTimeout={opts.dropTimeout}
                getClassNames={dropperGetClassNames}
                onAddClassName={dropperOnAddClassName}
                onTransitionEnd={dropperOnTransitionEnd}
                bin={
                    <Randomizer
                        completeOnStart
                        checkComplete={false}
                        bin={bin}
                        remain
                    />
                }
            />

            <Catcher
                completeOnStart
                checkComplete={false}
                start={_.get(props, 'data.game.start', false)}
                canCatch={_.get(props, 'data.game.start', false)}
                moveBuckets
                onMove={catcherOnMove}
                bucket={[
                    <skoash.Component className="bucket" message="trash" />,
                ]}
                catchableRefs={_.get(props, 'data.dropper.refs', [])}
                onCorrect={catcherOnCorrect}
                onIncorrect={catcherOnIncorrect}
            />
        </skoash.Screen>
    );
}
