<template>
    <div class="damage-container">
        <img :src="getImgDmg()" class="damage-icon" :alt="`damage icon`" :title="`damage`" />
        <div class="damage-text big-text">
            {{damage}}
        </div>
    </div>
</template>
<script>
export default {
    name: "damage",
    props: ["damage"],
    methods: {
        getImgDmg(){
            return require(`@/assets/attack-icons/damage.png`)
        }
    }
}
</script>