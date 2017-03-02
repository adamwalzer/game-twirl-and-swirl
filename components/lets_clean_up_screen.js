export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="lets-clean-up"
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}screen-24.mp3`} />
            <skoash.Image className="toilet" src={`${CMWN.MEDIA.IMAGE}img-3-1.png`} />
            <skoash.Component className="message">
                <p>Help keep the contaminants<br />out of the water supply</p>
                <skoash.Image className="banner" src={`${CMWN.MEDIA.IMAGE}text-letscleanup.png`} />
            </skoash.Component>
        </skoash.Screen>
    );
}
