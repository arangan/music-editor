<script lang="ts">
import { defineComponent } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import UnderBracket from './UnderBracket.vue';

export default defineComponent({
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({ content: 'QDQD नि᳝ सा रे॒ म॔ प नि सां', extensions: [StarterKit, UnderBracket] }),
      dotBelow: '\u0323',
      lineBelow: '\u0332',
    };
  },
  mounted() {
    // this.editor = new Editor({
    //   content: '<p>I’m running tiptap with Vue.js. 🎉</p><br> नि᳝ सा रे॒ म॔ प नि सां',
    //   extensions: [
    //     StarterKit,
    //     UnderBracket,
    //   ],
    // });

    // this.editor.setOptions({
    //   onTransaction: ({ state }) => {
    //     console.log(state.selection.anchor);
    //   },
    // });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    AddDotBelow():void {
      const { from, to } = this.editor.view.state.selection;
      if (from > 1) {
        const prevText = this.editor.view.state.doc.textBetween(from - 2, to);
        if (!prevText.includes(this.dotBelow)) {
          this.editor.commands.insertContent(this.dotBelow);
        }
        // console.log(this.editor.view.state.selection.ranges);
      }
      this.editor.commands.focus(this.editor.state.selection.anchor);
    },
    AddLineBelow():void {
      const { from, to } = this.editor.view.state.selection;
      if (from > 1) {
        const prevText = this.editor.view.state.doc.textBetween(from - 2, to);
        if (!prevText.includes(this.lineBelow)) {
          this.editor.commands.insertContent(this.lineBelow);
        }
      }
      this.editor.commands.focus(this.editor.state.selection.anchor);
    },
  },
});
</script>
<template>
    <editor-content :editor="editor" />
</template>
