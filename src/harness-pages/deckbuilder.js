import deckbuilder from '../components/pages/deckbuilder'
import searchResults from '../components/utils/searchResults'
import deck from '../components/utils/deck'
import searchFilters from './utils/searchFilters'
import deckbuilderLoadData from './utils/deckbuilderLoadData'
import combatPotency from '@/components/insights/combatPotency'
import consistency from '@/components/insights/consistency'
import deckMakeup from '@/components/insights/deckMakeup'
import { components } from '@rtidatascience/harness-ui'

export default class Deckbuilder {
    title = 'Deckbuilder'
    key = 'Deckbuilder'
    pageComponent = deckbuilder
    pageProps = {}
    retrieveData = deckbuilderLoadData
    filters = function () {
        return {
            ...searchFilters,
            deck: {
                props: {
                    filterType: null,
                    multiple: true
                },
            },
            deck_title: {
                label: "Deck Title",
                component: components['HarnessUiInput'],
                props: {
                    type: 'text'
                }
            }
        }
    }

    charts = () => {
        return {
            results: {
                title: "Results",
                component: searchResults,
                props: {
                    deckbuilder: true
                }
            },
            deck: {
                title: "Deck",
                component: deck,
                props: {
                    deckbuilder: true
                }
            },
            combatPotency: {
                title:"Attack Stats",
                component: combatPotency,
            },
            consistency: {
                title: "Consistency",
                component: consistency
            },
            deckMakeup: {
                title: 'Deck Makeup',
                component: deckMakeup
            }
        }
    }
}