<template>
    <img :src="getImg()" class="rounded mx-auto d-block resource-icon" :alt="`${resource} icon`" :title="`${resource}`" />
</template>
<script>
export default {
    title: "resource",
    props: {
        resource: {
            type: String,
            required: true
        }
    },
    methods: {
        getImg(){
            return require(`@/assets/resource-icons/${this.resource}.png`)
        }
    }
}
</script>