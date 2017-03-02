import config from './config';

import Loader from 'shared/components/loader/0.1';

import iOSScreen from 'shared/components/ios_splash_screen/0.1';
import TitleScreen from './components/title_screen';
import InfoQuestionScreen from './components/info_question_screen';
import InfoPlantScreen from './components/info_plant_screen';
import FlushItScreen from './components/flush_it_screen';
import ResponsibleFlusherScreen from './components/responsible_flusher_screen';
import InfoReleasedScreen from './components/info_released_screen';
import LetsCleanUpScreen from './components/lets_clean_up_screen';
import CatchGameLvlOneScreen from './components/catch_game_lvl_one_screen';
import CatchGameLvlTwoScreen from './components/catch_game_lvl_two_screen';
import CatchGameLvlThreeScreen from './components/catch_game_lvl_three_screen';
import CatchGameLvlFourScreen from './components/catch_game_lvl_four_screen';
import CatchGameLvlFiveScreen from './components/catch_game_lvl_five_screen';
import MakeADifferenceScreen from './components/make_a_difference_screen';
import FlipScreen from './components/flip_screen';

import QuitScreen from 'shared/components/quit_screen/0.1';

skoash.start(
    <skoash.Game
        config={config}
        loader={<Loader />}
        screens={[
            iOSScreen,
            TitleScreen,
            InfoQuestionScreen,
            InfoPlantScreen,
            FlushItScreen,
            ResponsibleFlusherScreen,
            InfoReleasedScreen,
            LetsCleanUpScreen,
            CatchGameLvlOneScreen,
            CatchGameLvlTwoScreen,
            CatchGameLvlThreeScreen,
            CatchGameLvlFourScreen,
            CatchGameLvlFiveScreen,
            MakeADifferenceScreen,
            FlipScreen
        ]}
        menus={{
            quit: QuitScreen,
        }}
        assets={[
            <skoash.Audio ref="bkg-1" type="background" src={`${CMWN.MEDIA.EFFECT}background.mp3`} />,
            <skoash.Audio ref="bkg-2" type="background" src={`${CMWN.MEDIA.EFFECT}ts-game-theme.mp3`} />,
            <skoash.Audio ref="button" type="sfx" src={`${CMWN.MEDIA.EFFECT}button.mp3`} />,
            <skoash.Audio ref="close-sound" type="sfx" src={`${CMWN.MEDIA.EFFECT}button.mp3`} />,
            <skoash.Audio ref="screen-complete" type="sfx" src={`${CMWN.MEDIA.EFFECT}screen-complete.mp3`} />,
            <div className="background bkg-1" />,
            <div className="background bkg-2" />,
            <div className="background bkg-3" />,
            <div className="background bkg-4" />,
            <div className="background bkg-5" />,
            <div className="background bkg-6" />
        ]}
        getBackgroundIndex={function (index, id) {
            switch (id) {
                case 'ios-splash': return;
                case 'CatchGameLvlOneScreen':
                case 'CatchGameLvlTwoScreen':
                case 'CatchGameLvlThreeScreen':
                case 'CatchGameLvlFourScreen':
                case 'CatchGameLvlFiveScreen':
                    return 1;
                default:
                    return 0;
            }
        }}
    />
);

if (module.hot) module.hot.accept();
