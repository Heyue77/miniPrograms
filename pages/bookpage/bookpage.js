import { chapterURL, bookPageURL, staticURL, requestGet } from "../../utils/reqeust";
import Toast from "../../components/vant/toast/toast";
Page({
  data: {
    pages: {},
    nodes: '',
    chapters: [],
    bookid: null,
    chapterid: null,
    getMenu: true,
    getCata: true,
    getScroll: false,
    index: 0,
    nextId: 0,
    pageIndex: 1,
    next: 0,
    backgroundcolor: '',
    bgColorbai: '#eaeaea',//背景颜色为白色
    bgColorhui: '#666',
    bgColorlv: '#d5f6d6',
    color: '',
    fontcolorblack: '#000',//字体颜色为黑色
    fontcolorwhite: '#eee',
    fontsize: 14,
    // fontsize16: '20px'

  },

  onLoad: function (options) {
    this.setData({
      bookid: this.options.bookId,
      chapterid: this.options.chapterId

    });
    this.getPagesData();
    this.getChapterData();
  },
  async getPagesData() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });

    const result = await requestGet(bookPageURL + `bookId=${this.data.bookid}&IsPreload=0&chapterId=${this.data.chapterid}`);
    const page = result.ResponseObject[0].module;
    const chapterindex = page.chapterIndex;
    // console.log(page)
    Toast.clear();
    this.setData({
      pages: page,
      index: chapterindex,
      bookid: this.options.bookId,
      chaterid: this.options.chapterId

    });
    // console.log(page, "iiiiiii")

  },
  async getChapterData() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });
    const result = await requestGet(chapterURL + this.data.bookid, { pageIndex: this.data.pageIndex, pageSize: 20 });
    const chapt = result.ResponseObject[0].module.ascList;//每页章节
    // console.log(result)
    // const chaterList = result.ResponseObject[0].module.pages;//章节页面
    Toast.clear();
    this.setData({
      chapters: [...this.data.chapters, ...chapt],
      bookid: this.options.bookId

    })
  },

  // async getNextURL() {
  //   const
  // },
  //点击页面显示菜单页面,再次点击取消
  getMenu: function () {
    var value = !this.data.getMenu;
    this.setData({
      getMenu: value

    })

  },
  //点击显示目录页面并隐藏原页面,取消隐藏菜单及目录
  getCata() {
    // var value = !this.data.getCata;
    // this.setData({
    //   getCata: value,
    //   getMenu: !menuvalue,
    //   getScroll: !this.data.getScroll
    //   // getMenu: !this.data.getMenu

    // })
    wx.reLaunch({
      url:`/pages/catalog/catalog?bookId=${this.data.bookid}&chapterid=${this.data.chapterid}`
    })
    // console.log(this.data.getScroll)
    // var menuvalue = this.data.getMenu;
  },
  //下一章
  goNext() {
    this.setData({
      chapterid: this.data.pages.nextChapterId
    });
    this.getPagesData();

  },
  //上一章
  goPrev: function () {
    if (this.data.index == 1) {  //当前在第一章
      wx.showToast({
        title: '已到最新章节',
        icon: 'loading',
        mask: true
      });
      return;
    }
    this.setData({
      chapterid: this.data.pages.prevChapterId
    });
    this.getPagesData();

  },
  goPage(e) {
    // const newID = e.target.dataset.index;
    console.log(e.target.dataset.index)
    this.setData({
      chapterid: e.target.dataset.index
    });
    console.log(this.data.chapterid)
    this.getPagesData();

    // console.log(this.data.chapters)
  },
  bgWhite: function () {
    var bgColor = this.data.bgColorbai;
    var fontcolor = this.data.fontcolorblack;
    this.setData({
      backgroundcolor: bgColor,
      color: fontcolor
    })

  },
  bgColorhui: function () {
    var bgColor = this.data.bgColorhui;
    var fontcolor = this.data.fontcolorwhite;
    this.setData({
      backgroundcolor: bgColor,
      color: fontcolor
    })


  },
  bgColorlv: function () {
    var bgColor = this.data.bgColorlv;
    var fontcolor = this.data.fontcolorblack;
    this.setData({
      backgroundcolor: bgColor,
      color: fontcolor
    })
  },
  //字体变大
  fontbig: function () {
    var font = this.data.fontsize + 1;
    if (font > 20) {
      font = 20;
      wx.showToast({
        title: '已经是最大了'
      });
    }
    this.setData({
      fontsize: font
    })
  },
  //字体变小
  fontsmall: function () {
    var font = this.data.fontsize - 1;
    if (font < 8) {
      font = 8;
      wx.showToast({
        title: '不能再小了'
      });
    }
    this.setData({
      fontsize: font
    })
  },
  onReachBottom: function () {
    this.setData({
      pageIndex: ++this.data.pageIndex,
    });
    console.log("oooooo")
    console.log(this.data.pageIndex);
    this.getChapterData();
  },
  onPullDownRefresh: function () {
    //当异步任务有了结果之后，就可以停止下拉刷新
    this.getPagesData().then(() => {
      wx.stopPullDownRefresh();
    });
  },

})