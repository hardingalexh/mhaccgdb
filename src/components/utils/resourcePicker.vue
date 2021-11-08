<template>
    <div class="row">
        <div class="col-6">
            <legend
                class="col-form-label harness-ui-checkboxgroup-legend"
                :for="filter.key"
            >Resources</legend>
        </div>
        <div class="col-6">
            <fieldset>
                <div class="form-row">
                    <div v-for="option in getOptionsForFilter(filter.key)" :key="option.key" class="col-3">
                        <input
                            class="form-check-input harness-ui-checkboxgroup-input"
                            type="checkbox"
                            :name="filter.key + option.key"
                            :id="filter.key + option.key"
                            :value="option.key"
                            v-model="boundValue"
                            :aria-labelledby="filter.key + option.key + '-label'"
                        />
                        <label 
                            class="form-check-label harness-ui-checkboxgroup-label"
                            :id="filter.key + option.key + '-label'"
                            :for="filter.key + option.key"
                        >
                            <resource :resource="option.key" />
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</template>
<script>
    import resource from './resource'
    export default {
        name: 'resourcePicker',
        props: ['filter'],
        components: {resource},
        computed: {
            boundValue: {
                get () {
                    return this.getFilter(this.filter.key)
                },
                set (value) {
                    this.setFilterLoadData(this.filter.key, value)
                }
            }
        },
        methods: {
            setFilterLoadData (key, value) {
                this.setFilter(key, value)
                if (!this.synchronous && this.page.retrieveData) {
                    this.LOAD_DATA()
                }
            }
        }
    }
</script>