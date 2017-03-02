export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="flip"
            emitOnComplete={{
                name: 'flip',
            }}
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}vo-8-1.mp3`} />
            <skoash.Component className="message">
                <skoash.Image className="banner" src={`${CMWN.MEDIA.IMAGE}img-8-1.png`} />
                    <p>You flushed out a brand new</p><br />
                <skoash.Image className="flip" src={`${CMWN.MEDIA.IMAGE}flip.png`} />
            </skoash.Component>
            <skoash.Image className="flip-coin" src={`${CMWN.MEDIA.SPRITE}twirln-swirl-earned-flip.gif`} />
        </skoash.Screen>
    );
}
