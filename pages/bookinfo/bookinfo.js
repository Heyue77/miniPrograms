import { requestGet, bookInfoURL } from "../../utils/reqeust";
Page({
  data: {
    bookinfos: {},
    fold: true,//默认简介折叠
    id: null,
    value: "",
    hobits: [],//相似推荐
    comments: [],//书评
  },
  //简介折叠
  fold: function () {
    var value = !this.data.fold;
    this.setData({
      fold: value
    })
  },
  onLoad: function (options) {
    this.id = this.options.id;
    this.getBookInfoData();
  },
  async getBookInfoData() {
    const result = await requestGet(bookInfoURL + this.id);
    const books = result.ResponseObject[0].module.book;
    const score = books.score;
    const hobitlist = books.hobitList.Data;
    const commentlist = result.ResponseObject[0].module.commentList;
    this.setData({
      bookinfos: books,
      value: score,
      hobits: hobitlist,
      comments: commentlist,
    });
  },

})