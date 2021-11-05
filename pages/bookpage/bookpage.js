import { chapterURL, bookPageURL, staticURL, requestGet } from "../../utils/reqeust";
import Toast from "../../components/vant/toast/toast";
Page({
  data: {
    pages: {},//书籍内容页面
    chapters: [],//所有目录
    bookid: null,//书籍id
    chapterid: null,//章节id
    getMenu: true,//默认菜单不出现
    getCata: true,//默认目录不出现
    getScroll: false,//书籍内容页面，默认出现
    index: 0,//章节索引
    pageIndex: 1,//默认章节出现在第一页
    backgroundcolor: '',//背景颜色
    bgColorbai: '#eaeaea',//背景颜色为白色
    bgColorhui: '#666',
    bgColorlv: '#d5f6d6',
    color: '',//字体颜色
    fontcolorblack: '#000',//字体颜色为黑色
    fontcolorwhite: '#eee',
    fontsize: 14,//字体大小,
    clientWidth: "",
    clientHeight: "",

  },

  onLoad: function (options) {
    this.setData({
      bookid: this.options.bookId,
      chapterid: this.options.chapterId

    });
    this.getPagesData();
    this.getChapterData();
  },
  //书籍内容页面
  async getPagesData() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });

    const result = await requestGet(bookPageURL + `bookId=${this.data.bookid}&IsPreload=0&chapterId=${this.data.chapterid}`);
    const chapterindex = result.ResponseObject[0].module.chapterIndex;
    Toast.clear();
    this.setData({
      pages: result.ResponseObject[0].module,
      index: chapterindex,//目录页面索引
      bookid: this.options.bookId,
      chaterid: this.options.chapterId

    });
    // console.log(page, "iiiiiii")

  },
  //目录页面
  async getChapterData() {
    const result = await requestGet(chapterURL + this.data.bookid, { pageIndex: this.data.pageIndex, pageSize: 20 });
    const chapt = result.ResponseObject[0].module.ascList;//每页章节
    this.setData({
      chapters: [...this.data.chapters, ...chapt],
    })
  },
  //点击页面中央显示菜单页面,再次点击取消
  getMenu: function (event) {
    this.setData({
      getMenu: !this.data.getMenu
    })
  },
  //点击显示目录页面并隐藏原页面,取消隐藏菜单及目录
  getCata() {
    var value = !this.data.getCata;
    var pagevalue = !this.data.getScroll;
    this.setData({
      getCata: value,
      getMenu: !menuvalue,
      getScroll: pagevalue

    })
    var menuvalue = this.data.getMenu;
  },
  //点击下一章,菜单消失跳到下一章
  goNext() {
    if (this.data.index == this.data.pages.chapterCount) {  //当前在最后一章
      wx.showToast({
        title: '已到最新章节',
        icon: 'loading',
        mask: true
      });
      return;
    }
    var menuvalue = this.data.getMenu;
    this.setData({
      chapterid: this.data.pages.nextChapterId,
      getMenu: !menuvalue,

    });
    //点击下一章先跳转章节再回到顶部
    this.getPagesData().then(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    });
  },
  //点击下一章,菜单消失跳到下一章
  getNext() {
    if (this.data.index == this.data.pages.chapterCount) {  //当前在最后一章
      wx.showToast({
        title: '已到最新章节',
        icon: 'loading',
        mask: true
      });
      return;
    }
    // var menuvalue = this.data.getMenu;
    this.setData({
      chapterid: this.data.pages.nextChapterId,
      // getMenu: !menuvalue,

    });
    //点击下一章先跳转章节再回到顶部
    this.getPagesData().then(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    });
  },
  //上一章
  goPrev: function () {
    if (this.data.index == 1) {  //当前在第一章
      wx.showToast({
        title: '已经在第一章啦',
        icon: 'loading',
        mask: true
      });
      return;
    }
    //点击上一章取消菜单
    var menuvalue = this.data.getMenu;
    this.setData({
      chapterid: this.data.pages.prevChapterId,
      getMenu: !menuvalue,
    });
    //点击上一章先跳转章节再回到顶部
    this.getPagesData().then(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    });

  },
  //上一章
  getPrev: function () {
    if (this.data.index == 1) {  //当前在第一章
      wx.showToast({
        title: '已经在第一章啦',
        icon: 'loading',
        mask: true
      });
      return;
    }
    //点击上一章取消菜单
    // var menuvalue = this.data.getMenu;
    this.setData({
      chapterid: this.data.pages.prevChapterId,
      // getMenu: !menuvalue,
    });
    //点击上一章先跳转章节再回到顶部
    this.getPagesData().then(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    });

  },
  //点击目录跳转页面，同时让章节页面消失，书籍内容页面出现
  goPage(e) {
    const catavalue = !this.data.getCata;
    const value = !this.data.getScroll;
    const newId = e.target.dataset.index;
    this.setData({
      chapterid: newId,
      getScroll: value,
      getCata: catavalue
    });
    this.getPagesData();

  },
  //点击切换背景色为白色，字体黑色
  bgWhite: function () {
    var bgColor = this.data.bgColorbai;
    var fontcolor = this.data.fontcolorblack;
    this.setData({
      backgroundcolor: bgColor,
      color: fontcolor
    })

  },
  //点击切换背景色为灰黑色，字体白色
  bgColorhui: function () {
    var bgColor = this.data.bgColorhui;
    var fontcolor = this.data.fontcolorwhite;
    this.setData({
      backgroundcolor: bgColor,
      color: fontcolor
    })


  },
  //点击切换背景色为绿色，字体黑色
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
  //到达底部获取后面的目录
  onReachBottom: function () {
    this.setData({
      pageIndex: ++this.data.pageIndex,
    });
    this.getChapterData();
  },
  //当异步任务有了结果之后，就可以停止下拉刷新
  onPullDownRefresh: function () {
    this.getPagesData().then(() => {
      wx.stopPullDownRefresh();
    });
  },

})