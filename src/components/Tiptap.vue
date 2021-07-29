<script lang="ts">
import { defineComponent } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import { Heading } from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/core';
// import Document from '@tiptap/extension-document'
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import UnderBracket from './UnderBracket.vue';
import DoubleUnderLine from './DoubleUnderLine.vue';

export default defineComponent({
  components: {
    EditorContent,
  },
  props: {
    data: String,
  },
  data() {
    return {
      editor: new Editor({
        // content: 'உ <br /> QDQD नि᳝ सा रे॒ म॔ प नि सां',
        editorProps: {
          attributes: {
            class: 'focus:outline-none',
          },
        },
        extensions: [
          StarterKit,
          // .configure({
          //   heading: false,
          // }),
          Paragraph.extend({
            parseHTML() {
              return [{ tag: 'div' }];
            },
            renderHTML({ HTMLAttributes }) {
              return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
            },
          }),
          Heading.configure({
            HTMLAttributes: {
              class: 'h11',
            },
          }),
          UnderBracket,
          DoubleUnderLine,
          Underline,
          TextAlign.configure({
            types: ['paragraph', 'heading', 'div'],
          }),
          Table.configure({ resizable: true }),
          TableRow,
          TableHeader,
          TableCell,
        ],
      }),
      dotBelow: '\u0323',
      lineBelow: '\u0332',
      editorData: this.data ?? '',
    };
  },
  mounted() {
    this.editor.commands.setContent(this.editorData);

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
    // this.editor.setOptions({
    //   extensions: [Table.configure({ resizable: true }),
    //     TableRow, TableHeader, TableCell],
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
          this.editor.chain().focus().insertContent(this.dotBelow).run();
        }
        // console.log(this.editor.view.state.selection.ranges);
      }
      // this.editor.commands.focus(this.editor.state.selection.anchor);
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
    AddTable(rowCount:number, colCount:number, withHeader:boolean) {
      this.editor.commands.insertTable({
        rows: rowCount, cols: colCount, withHeaderRow: withHeader,
      });
    },
    AlignText(align:string):void {
      console.log(`aligning - ${align}`);
      this.editor.chain().focus().setTextAlign(align).run();
    },
    GetData() {
      const json = this.editor.getHTML(); // .getJSON();
      return json;
    },
    TestMethods():void {
      console.log('Test Method');
    },
  },
});
</script>
<template>
    <button @click="editor.commands.toggleBold()"
    :disabled="!editor.can().toggleBold()">Bold</button>
    <button @click="editor.chain().focus().toggleUnderline().run()"
    :class="{ 'is-active': editor.isActive('underline') }">_</button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">H1</button>
    <button @click="this.editor.commands.toggleDoubleUnderLine()"
    :disabled="!editor.can().toggleDoubleUnderLine()" title="Double Underline">=</button>
    <button @click="AlignText('left')" title="Left Align">L</button>
    <button @click="AlignText('center')" title="Center Align"
    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">C</button>
    <button @click="AlignText('right')" title="Right Align">R</button>

    <br />

    <button @click="AddTable(4,4,true)">Add Table</button>
    <button @click="editor.chain().focus().deleteTable().run()"
    :disabled="!editor.can().deleteTable()">Delete-Table</button>
    <br />
    <button @click="editor.chain().focus().addRowBefore().run()"
    :disabled="!editor.can().addRowBefore()">Add Row Above</button>
    <button @click="editor.chain().focus().addRowAfter().run()"
    :disabled="!editor.can().addRowAfter()">Add Row Below</button>
    <button @click="editor.chain().focus().deleteRow().run()"
    :disabled="!editor.can().deleteRow()">Delete-Row</button>
    <br />

    <button @click="editor.chain().focus().addColumnBefore().run()"
    :disabled="!editor.can().addColumnBefore()">Add Column Left</button>
    <button @click="editor.chain().focus().addColumnAfter().run()"
    :disabled="!editor.can().addRowAfter()">Add Column Right</button>
    <button @click="editor.chain().focus().deleteColumn().run()"
    :disabled="!editor.can().deleteColumn()">Delete-Column</button>
    <button @click="editor.chain().focus().mergeCells().run()"
    :disabled="!editor.can().mergeCells()">Merge Cell</button>
    <button @click="editor.chain().focus().splitCell().run()"
    :disabled="!editor.can().splitCell()">Split Cell</button>
    <br />
    <editor-content :editor="editor" />
</template>
