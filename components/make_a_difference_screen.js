export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="make-a-difference"
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}screen-36.mp3`} />
            <skoash.Image className="toilet" src={`${CMWN.MEDIA.IMAGE}img-3-1.png`} />
            <skoash.Component className="message">
                <p>
                    Remember: YOU can make a<br />
                    difference in the environment<br />
                    and help keep waterways
                </p>
                <skoash.Image className="banner" src={`${CMWN.MEDIA.IMAGE}clean.png`} />
            </skoash.Component>
        </skoash.Screen>
    );
}
