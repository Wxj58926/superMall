import BackTop from "../components/content/backTop/BackTop";


export const backTopMaxin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.Scroll.bscroll.scrollTo(0, 0, 300)
    },
  }
}
