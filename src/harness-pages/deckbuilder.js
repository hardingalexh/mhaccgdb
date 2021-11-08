import deckbuilder from '../components/pages/deckbuilder'
import searchResults from '../components/utils/searchResults'
import deck from '../components/utils/deck'
import searchFilters from './utils/searchFilters'
import deckbuilderLoadData from './utils/deckbuilderLoadData'

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
            }
        }
    }
}