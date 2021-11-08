<template>
    <div id="search-page">
        <div class="card">
            <div class="card-header">
                <filtersAccordion />
            </div>
            <div class="card-body">
                <chartGrid />
            </div>
        </div>
    </div>
    
</template>
<script>
import filtersAccordion from '@/components/utils/filtersAccordion'
export default {
  name: 'search',
  components: {filtersAccordion}
}
</script>