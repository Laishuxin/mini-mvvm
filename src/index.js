import Vue from 'vue'
const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello vue',
      person: {
        name: 'Foo',
        age: 18
      },
      arr: [1, 2, 3]
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(e) {
      console.log('我被点击了')
      console.log(e.target)
    }
  }
})

window.vm = vm
window.Vue = Vue
