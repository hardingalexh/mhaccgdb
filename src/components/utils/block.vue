<template>
    <div class="block-container">
        <img :src="getImg()" class="block-icon" :alt="`${zone} icon`" :title="`${zone}`" />
        <div class="block-modifier-text big-text">
            {{modifier}}
        </div>
    </div>
</template>
<script>
export default {
    name: "block",
    props: ["modifier", "zone"],
    methods: {
        getImg(){
            return require(`@/assets/block-icons/${this.zone}.png`)
        }
    }
}
</script>