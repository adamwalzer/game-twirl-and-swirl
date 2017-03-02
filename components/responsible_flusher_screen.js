export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="responsible-flusher"
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}vo-7-1.mp3`} />
            <skoash.Image className="toilet" src={`${CMWN.MEDIA.IMAGE}img-3-1.png`} />
            <skoash.Component className="message">
                <p>Now that you know how<br />harmful these things can be,<br />make a difference and be a</p>
                <skoash.Image className="banner" src={`${CMWN.MEDIA.IMAGE}img-7-1.png`} />
            </skoash.Component>
        </skoash.Screen>
    );
}
