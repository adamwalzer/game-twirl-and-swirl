export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="info-question"
            completeDelay={1000}
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}vo-3-1.mp3`} />
            <skoash.Audio ref="button" type="sfx" src={`${CMWN.MEDIA.EFFECT}s-6-2.mp3`} complete />
            <skoash.Image className="toilet" src={`${CMWN.MEDIA.IMAGE}img-3-1.png`} />
            <skoash.Component className="message">
                <h3>Did you ever wonder<br />what happens when<br />you flush?</h3>
            </skoash.Component>
        </skoash.Screen>
    );
}
