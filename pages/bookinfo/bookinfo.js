import { requestGet, bookInfoURL } from "../../utils/reqeust";
Page({
  data: {
    bookinfos: {},
    fold: true,
    id: null,
    value: "",
    hobits: [],
    comments: []
  },
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
    console.log(commentlist, "kkkkkkk")
    this.setData({
      bookinfos: books,
      value: score,
      hobits: hobitlist,
      comments: commentlist
    });
  },

})