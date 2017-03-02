export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="info-catch-game"
        >
            <skoash.Audio type="voiceOver" src={`${CMWN.MEDIA.VO}catchto-win.mp3`} />

            <skoash.Component data-ref="intro" className="frame">
                <span>
                    Catch the pollutants by<br />using the arrow keys or<br />swiping the touch screen.
                </span>
                <span>
                    Be sure not to catch any<br />animals or plants.
                </span>
            </skoash.Component>
        </skoash.Screen>
    );
}
