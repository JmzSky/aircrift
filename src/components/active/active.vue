<template>
  <div class="game-page" ref="Game" v-bind:style="{backgroundImage:'url(' + background + ')'}">
  </div>
</template>

<script>
import game from './game';
import background from "../../static/images/bg.jpg"

export default {
  name: "Active",
  data(){
    return {
      layer: true,
      layer2: false,
      background : background
    }
  },
  computed: {
  },
  mounted(){
    game.gameInit(this.$refs.Game,this.$comm);
  },
  methods:{}
}
</script>
<style>
canvas{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
