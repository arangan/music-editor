<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media print {
  button {
    display: none !important;
  }
    body{
        width: 21cm;
        height: 29.7cm;
        margin: 30mm 45mm 30mm 45mm;
        /* change the margins as you want them to be. */
   }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
// import fs from 'fs';

import Tiptap from './components/Tiptap.vue';
import './assets/App.scss';
import './assets/RichEditor.scss';

// compile
// ./node_modules/.bin/vue-cli-service electron:build --windows
export default defineComponent({
  name: 'App',
  components: {
    // Tiptap,
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
    Export():void {
      const edt = this.$refs.editor as typeof Tiptap;
      const data = edt.GetData();
      console.log(data);
      // console.log(JSON.stringify(data));
    },
    Import() {
      console.log('Importing');
      if (window) {
        const fs1 = window.require('fs');

        // eslint-disable-next-line no-undef
        fs1.readFile('./dataFile.dat', 'utf8', (e:NodeJS.ErrnoException, d:string) => {
          console.log(d);
          console.log(process.cwd());
        });
      }
      // const exists = fs.existsSync('./datafile.dat');
      // console.log(`file exists- ${exists}`);

      // fs.readFile('./datafile.dat', 'utf8', (e, d) => {
      //   console.log(d);
      // });
    },
    Print2Pdf():void {
      window.print();
      // const edt = this.$refs.editor as typeof Tiptap;
      // const data = edt.GetData();
      // console.log(data);

      // let windowContent = '<!DOCTYPE html>';
      // windowContent += '<html>';
      // windowContent += '<head><title>Print canvas</title></head>';
      // windowContent += '<body>';
      // windowContent += `${data}`;
      // windowContent += '</body>';
      // windowContent += '</html>';

      // const printWin = window.open('', '') ?? new Window();
      // `width=${screen.availWidth},height=${screen.availHeight}`);
      // printWin.document.open();
      // printWin.document.write(windowContent);

      // printWin.document.addEventListener('load', () => {
      //   printWin.focus();
      //   printWin.print();
      //   printWin.document.close();
      //   printWin.close();
      // }, true);
    },
  },
});

</script>

<template>
<div>
  <button @click="Print2Pdf">Print</button>
  <button @click="Export">Export</button>
  <button @click="Import">Import</button>
  <button @click="AddDotBelow"> Add Dot Below </button>
  <button @click="AddLineBelow"> Add Line Below </button>
</div>
<!-- <tiptap ref="editor" :data="docData" /> -->
</template>
