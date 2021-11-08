<template>
    <div class="attack-container">
        <img :src="getImgAtk()" class="attack-icon" :alt="`${zone} icon`" :title="`${zone}`" />
        <div class="attack-speed-text big-text">
            {{speed}}
        </div>
    </div>
</template>
<script>
export default {
    name: "attack",
    props: ["speed", "zone"],
    methods: {
        getImgAtk(){
            return require(`@/assets/attack-icons/${this.zone}.png`)
        }
    }
}
</script>