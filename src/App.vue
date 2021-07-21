<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Tiptap from './components/Tiptap.vue';
// import RichEditor from './components/RichEditor.vue';
import './assets/App.scss';
import './assets/RichEditor.scss';

export default defineComponent({
  name: 'App',
  components: {
    // RichEditor,
    Tiptap,
  },
  data() {
    return {
      docData: 'Hello World',
    };
  },
  methods: {
    AddDotBelow():void {
      const edt = this.$refs.editor as typeof Tiptap;
      edt.AddDotBelow();
    },
    AddLineBelow():void {
      const edt = this.$refs.editor as typeof Tiptap;
      edt.AddLineBelow();
    },
  },
});

</script>

<template>
<h1>Editor</h1>
<button @click="AddDotBelow"> Add Dot Below </button>
<button @click="AddLineBelow"> Add Line Below </button>
<!-- <rich-editor v-model="docData"/> -->
<tiptap ref="editor" />
</template>
