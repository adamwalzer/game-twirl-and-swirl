export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="title"
            checkComplete={false}
            completeDelay={2000}
            completeOnStart
            nextDelay={4000}
            hidePrev
        >
            <skoash.Component className="center animated">
                <skoash.Image className="logo animated" src={`${CMWN.MEDIA.IMAGE}logo.png`} />
            </skoash.Component>
        </skoash.Screen>
    );
}
