<template>
  <div class="row">
    <div
      class="accordion col-12"
      id="filters-accordion"
    >
      <div
        class="card"
        v-for="(filterType, key) in filterTypes"
        :id="filterType + '-card'"
        :key="key"
      >
        <div
          class="card-header"
          :id="filterType + '-heading'"
          @click="toggle"
        >
          <h5 class="mb-0 align-middle">
            <div class="row">
              <div
                class="col-6 align-middle"
                :id="filterType + '-col1'"
              >
                <i :class="'bi bi-ui-checks ' + (dirtyFilterString(filterType).length ? 'active' : '')" />
                <button
                  class="btn btn-link align-middle"
                  :id="filterType + '-button'"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse-' + filterType"
                  aria-expanded="false"
                  :aria-controls="'collapse-' + filterType"
                >
                  {{ filterType.replace('_', ' ') }}
                </button>
                <small class="align-middle" v-if="dirtyFilterString(filterType).length">
                  {{ dirtyFilterString(filterType) }}
                </small>
              </div>
              <div
                class="col-6 text-right"
                :id="filterType + '-col2'"
              >
                <button
                  class="btn btn-link text-right"
                  :id="filterType + '-collapsebutton'"
                  @click="toggle"
                >
                  <i
                    class="bi bi-caret-down-square"
                    :id="filterType + '-icon'"
                    @click="toggle"
                  />
                </button>
              </div>
            </div>
          </h5>
        </div>
        <div
          :id="'collapse-' + filterType"
          class="collapse"
          :aria-labelledby="filterType+'-heading'"
          data-parent="#filters-accordion"
        >
          <div class="card-body">
            <FilterGrid
              :columns="filterType === 'Resources' ? 1 : 2"
              :label-position="'vertical'"
              :spread="true"
              :only="subsetFiltersByType(filterType)"
              :clear-button="false"
            />
            <div class="row button-row harness-ui-filtergrid-row harness-ui-filtergrid-buttonrow">
              <div class="col-md-12 text-center">
                <button
                  class="btn btn-primary btn-sm harness-ui-filtergrid-clearbutton"
                  role="button"
                  @click="clearFilterTypeFilters(filterType)"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'filtersAccordion',
  computed: {
    filterTypes () {
      return Object.keys(this.filters).reduce((acc, filter) => {
        filter = this.filters[filter]
        if (!acc.includes(filter.props.filterType) && filter.props.filterType !== 'internal' && filter.props.filterType) {
          acc.push(filter.props.filterType)
        }
        return acc
      }, [])
    }
  },
  methods: {
    subsetFiltersByType (type) {
      return Object.keys(this.filters).filter(
        function (filter) {
          return this.filters[filter].props.filterType === type
        }.bind(this)
      )
    },
    // syncs the bootstrap collapse lifecycle with icons
    toggle (event) {
      event.preventDefault()
      let filterType = event.target.id.split('-')[0]
      $('#collapse-' + filterType).collapse('toggle')

      // get icon
      let icon = document.getElementById(filterType + '-icon')
      // if icon is down, then we are opening this panel
      if (icon.classList.contains('bi-caret-down-square')) {
        // change from "down" to "up"
        icon.classList.remove('bi-caret-down-square')
        icon.classList.add('bi-caret-up-square')
        // ensure that all other icons are "down"
        this.filterTypes
          .filter(fType => fType !== filterType)
          .forEach(fType => {
            let icon = document.getElementById(fType + '-icon')
            if (icon.classList.contains('bi-caret-up-square')) {
              icon.classList.remove('bi-caret-up-square')
              icon.classList.add('bi-caret-down-square')
            }
          })
      // we are closing the only open panel
      } else if (icon.classList.contains('bi-caret-up-square')) {
        let icon = document.getElementById(filterType + '-icon')
        icon.classList.remove('bi-caret-up-square')
        icon.classList.add('bi-caret-down-square')
      }
    },
    dirtyFilterString (filterType) {
      let hs = this.hs
      return this.subsetFiltersByType(filterType)
        .filter((f) => hs.isFilterDirty(f))
        .map((f) => hs.getLabel(f))
        .join(', ')
    },
    clearFilterTypeFilters (filterType) {
      let filters = this.subsetFiltersByType(filterType)
      if (filters.includes('StartDate')) {
        filters.push('EndDate')
      }
      this.initializeDefaults(filters)
      this.loadData()
    }
  }
}
</script>