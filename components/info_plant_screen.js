export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="info-plant"
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}vo-4-1.mp3`} />
            <skoash.Component>
                <h2>
                    Whatever you flush goes down into the pipe that<br />
                    leads out of your house and into the system.<br />
                    From there it travels, mostly by gravity,<br />
                    to a treatment plant.
                </h2>
            </skoash.Component>
        </skoash.Screen>
    );
}
