import searchPage from '../components/pages/searchPage'
import searchResults from '../components/utils/searchResults'
import searchFilters from './utils/searchFilters'
import search from './utils/search'
export default class Search {
    title = 'Search'
    key = 'Search'
    pageComponent = searchPage
    pageProps = {}
    retrieveData = async (state, pageObject, hs) => {
        return {
            results: await search(hs)
        }
    }
    filters = function () {
        return {...searchFilters}
    }

    charts = () => {
        return {
            results: {
                title: "Results",
                component: searchResults
            }
        }
    }
}