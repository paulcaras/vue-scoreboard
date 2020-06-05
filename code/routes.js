import Main from './frames/Main.vue'
import Auth from './frames/Auth.vue'

import LoadScreen from './modules/LoadScreen.vue'
import HomeIndex from './modules/HomeIndex.vue'

import GameSetup from './modules/GameSetup.vue'
import GameCourtChange from './modules/GameCourtChange.vue'

import NameEntrySubmit from './modules/NameEntrySubmit.vue'
import TestPage from './modules/TestPage.vue'

export default [
    { path: '/', component: Auth,
        children: [
            { path: '', component: LoadScreen, name: 'load' },
            { path: 'index.html', component: LoadScreen, name: 'load-screen' }
        ]
    },
    { path: '/home', component: Main,
        children: [
            { path: 'index', component: HomeIndex, name: 'home' }
        ]
    },
    { path: '/game', component: Main,
        children: [
            { path: 'setup', component: GameSetup, name: 'game-setup' },
            { path: 'court-change', component: GameCourtChange, name: 'game-court-change' }
        ]
    },
    { path: '/name', component: Main,
        children: [
            { path: 'entry-submit', component: NameEntrySubmit, name: 'name-entry-submit' }
        ]
    },
    { path: '', component: Main,
        children: [
            { path: 'test-page', component: TestPage, name: 'test-page' }
        ]
    }

]