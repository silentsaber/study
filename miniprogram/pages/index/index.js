//index.js
// import '../../style/pagefonter.wxss';
// import '../../style/normal.wxss';
const app = getApp()
var windowW = wx.getSystemInfoSync().windowWidth;
var centerPointX = windowW / 2;
var centerPointY = wx.getSystemInfoSync().windowHeight/8*5;
// console.log(3**2);
//adapt window size wechat size unit rpx
function rpx(param) {
  return Number((windowW / 750 * param).toFixed(2));
}
Page({
  data: {
    res:0,
    col:1,
    clickFlag: false,//返回标志，返回到最初界面
    radius: centerPointX - rpx(200),//半径，减去的部分为文字留空位
    radarData: [
      { desc: "文献检索", value: "0.6" },
      { desc: "时间规划", value: "0.5" },
      { desc: "科研创新", value: "0.8" },
      { desc: "实验动手", value: "0.5" },
      { desc: "心理抗压", value: "0.3" },
      { desc: "学术毅力", value: "0.3" }
    ],
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    canvastop:'0px',
    btntop:0,//按钮高度
    H:'250rpx',
    idx:0,//题号
    confirmbox:true,//引导用户接入信息
    hid:true,//隐藏开始测试
    hidbtn:false,//A,B选项隐藏
    canvasHidden:false,//画布隐藏
    hidbtnx:false,//C,D选项隐藏
    end:false,//做题结束标记
    wxjs:0,   //文献检索
    sjgh:0,   //时间规划
    kycx:0,  //科研创新
    syds:0,  //实验动手
    xlky:0,  //心理抗压
    xsyl:0,  //学术毅力
    totval:0, //总价值
    con1:'', //总结性评语
    con2: '', //总结性评语
    modalHidden: true,//显示弹窗
    selectA:'选项',
    selectB: '选项',
    selectC: '选项',
    selectD: '选项',
    data:[
      {
        A:'果断拒绝，我的心里只有实验',
        B:'匆忙做完，过一会儿赶去帮忙',
        C:'不做实验了，ta最重要',
        D:'我是单身狗没有烦恼'
      },
      {
        A:'我的天呐，好紧张啊',
        B:'那就跑呗，反正躲不过',
        C:'好希望明天雾霾啊',
        D:'终于要跑一千五了，开心！',
      },
      {
        A:"水果可能是要加入酒中",
        B:"水果打成汁之后要加一点儿酒",
        C:"水果和酒根本就没有什么关系",
        D:"吃完水果后喝酒或喝完酒后吃水果",
      },
      {
        A:"如果你具有思辨能力，你就应该进行科研",
        B:"如果你进行科研，你就要具备思辨能力",
        C:"除了进行科研，你不应具备思辨能力",
        D:"除非你具备思辨能力，否则你不应该进行科研",
      },
      {
        A:"箭头",
        B:"人像",
        C:"",
        D:"",
      },
      {
        A:"人脸",
        B:"月亮",
        C: "",
        D: "",
      },
      {
        A:"自学",
        B:"白学",
        C:"自觉",
        D:"白觉",
      },
      {
        A:"自己的幸运数字",
        B:"自己的生日",
        C:"今天的日期",
        D:"瞎XX选一个",
      },
      {
        A:"她长得真好看",
        B:"天啊，逼死强迫症",
        C:"让我找找最后一个在哪里",
        D:"for（i=1；i> 0；i＋＋）",
      },
      {
        A:"牛",
        B:"鸟",
        C:"猹",
        D:"鲅",
      }
    ]
  },
  emitStart: function (e) {
    var touch = e.touches[0];
    var that = this;
    if (touch.clientY >= wx.getSystemInfoSync().windowHeight * 0.835 && touch.clientY <= wx.getSystemInfoSync().windowHeight * 0.905) {
      if (touch.clientX >= wx.getSystemInfoSync().windowWidth * 0.19 && touch.clientX <= wx.getSystemInfoSync().windowWidth * 0.44)
      {
          this.saveImg();
      }
      else if (touch.clientX >= wx.getSystemInfoSync().windowWidth * 0.52 && touch.clientX <= wx.getSystemInfoSync().windowWidth * 0.78)
      {
          this.join();
      }
    }
    else {
      console.log(touch.clientX);
      console.log(touch.clientY);
    }
  },

  emitEnd: function () {
    console.log('Emitting ended.');
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      // title: 'xx小程序',
      path: 'pages/start/start',
      desc:'快来测试你的科研属性',
      imageUrl:'../../images/end.jpg',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  addVal:function(id,val)
  {
    var val1,val2;
    // var totvalx=this.data.totval;
    if(id==0)
    {
      val1 = this.data.xsyl;
      val2 = this.data.sjgh;
      if(val==0)
      {
        val1+=20;
        val2+=5;
      }
      else if(val==1)
      {
        val1+=10;
        val2+=20;
      }
      else if (val == 2) {
        val1 += 5;
        val2 += 10;
      }
      else 
      {
        val1 += 15;
        val2 += 15;
      }
      this.setData(
        {
          xsyl:val1,
          sjgh:val2,
        }
      )
    }
    else if(id==1)
    {
      val1 = this.data.xlky;
      val2 = this.data.xsyl;
      if (val == 0) 
      {
        val1 += 10;
        val2 += 5;
      }
      else if (val == 1) {
        val1 += 20;
        val2 += 15;
      }
      else if (val == 2) {
        val1 += 5;
        val2 += 10;
      }
      else {
        val1 += 15;
        val2 += 20;
      }
      this.setData(
        {
          xlky:val1,
          xsyl:val2,
        }
      )
    }
    else if(id==2)
    {
      val1 = this.data.syds;
      val2 = this.data.kycx;
      if (val == 0) {
        val1 += 15;
        val2 += 20;
      }
      else if (val == 1) {
        val1 += 20;
        val2 += 15;
      }
      else if (val == 2) {
        val1 += 5;
        val2 += 10;
      }
      else {
        val1 += 10;
        val2 += 5;
      }
      this.setData(
        {
          syds: val1,
          kycx: val2,
        }
      )
    }
    else if(id==3)
    {
      val1 = this.data.wxjs;
      val2 = this.data.xsyl;
      if (val == 0) {
        val1 += 10;
        val2 += 5;
      }
      else if (val == 1) {
        val1 += 15;
        val2 += 10;
      }
      else if (val == 2) {
        val1 += 5;
        val2 += 20;
      }
      else {
        val1 += 20;
        val2 += 15;
      }
      this.setData(
        {
          wxjs: val1,
          xsyl: val2
        }
      )
    }
    else if(id==4)
    {
      val1 = this.data.kycx;
      val2 =this.data.syds;
      if (val == 0) {
        val1 += 15;
        val2 += 15;
      }
      else if (val == 1) {
        val1 += 10;
        val2 += 10;
      }
      this.setData(
        {
          kycx: val1,
          syds: val2
        }
      )
    }
    else if(id==5)
    {
      val1 = this.data.kycx;
      val2 =this.data.syds;
      if (val == 0) {
        val1 += 15;
        val2 += 10;
      }
      else if (val == 1) {
        val1 += 10;
        val2 += 15;
      }
      this.setData(
        {
          kycx: val1,
          syds:val2
        }
      )
    }
    else if(id==6)
    {
      val1 = this.data.sjgh;
      val2 =this.data.wxjs;
      if (val == 0) {
        val1 += 10;
        val2 += 5;
      }
      else if (val == 1) {
        val1 += 15;
        val2 += 15;
      }
      else if (val == 2) {
        val1 += 20;
        val2 += 10;
      }
      else {
        val1 += 5;
        val2 += 20;
      }
      this.setData(
        {
          sjgh: val1,
          wxjs:val2
        }
      )
    }
    else if (id == 7) {
      val1 = this.data.wxjs;
      val2 = this.data.syds;
      if (val == 0) {
        val1 += 10;
        val2 += 20;
      }
      else if (val == 1) {
        val1 += 15;
        val2 += 10;
      }
      else if (val == 2) {
        val1 += 20;
        val2 += 5;
      }
      else {
        val1 += 5;
        val2 += 15;
      }
      this.setData(
        {
          wxjs: val1,
          syds: val2
        }
      )
    }
    else if (id == 8) {
      val1 = this.data.kycx;
      val2 = this.data.xlky;
      if (val == 0) {
        val1 += 10;
        val2 += 10;
      }
      else if (val == 1) {
        val1 += 5;
        val2 += 5;
      }
      else if (val == 2) {
        val1 += 15;
        val2 += 20;
      }
      else {
        val1 += 20;
        val2 += 15;
      }
      this.setData(
        {
          kycx: val1,
          xlky: val2
        }
      )
    }
    else if (id == 9) {
      val1 = this.data.xlky;
      val2 = this.data.sjgh;
      if (val == 0) {
        val1 += 20;
        val2 += 15;
      }
      else if (val == 1) {
        val1 += 5;
        val2 += 10;
      }
      else if (val == 2) {
        val1 += 10;
        val2 += 5;
      }
      else {
        val1 += 15;
        val2 += 20;
      }
      this.setData(
        {
          xlky: val1,
          sjgh: val2
        }
      )
    }

    // totvalx+=VAL;
    this.setData(
      {
        // totval:totvalx,
        btntop: (id >= 3&&id<=4 ? '100rpx' : '0rpx'),
        // H:(id>=3?'780rpx':'400rpx'),
      }
    );
    
  },
  startTest:function()
  {
    var xa = this.data.data[this.data.idx].A;
    var xb = this.data.data[this.data.idx].B;
    var xc = this.data.data[this.data.idx].C;
    var xd = this.data.data[this.data.idx].D;
    this.setData(
      {
        hid : true,
        hidbtnx : false,
        hidbtn : false,
        selectA: xa,
        selectB: xb,
        selectC: xc,
        selectD: xd,
      }
    )
    
  },
  sortv:function(a,b)
  {
    return b.v-a.v;
  },
  showResult:function()
  {
      // this.join();
      var A=new Array();
      for(var i=0;i<6;i++)A[i]=new Object();
      A[0].name=1;
      A[0].v=this.data.wxjs;
      A[1].name=2;
      A[1].v=this.data.sjgh;
      A[2].name =3;
      A[2].v=this.data.kycx;
      A[3].name = 4;
      A[3].v=this.data.syds;
      A[4].name = 5; 
      A[4].v=this.data.xlky;
      A[5].name = 6;
      A[5].v=this.data.xsyl;

      A.sort(this.sortv);
      console.log(A);

      // var totvalx=this.data.totval;
      var cons1=this.data.con1;
      var cons2 = this.data.con2;
    if ((A[0].name == 5 && A[1].name == 2) || (A[0].name == 2 && A[1].name == 5) || (A[0].name == 5 && A[1].name == 3) || (A[0].name == 3 && A[1].name == 5))
      {
        cons1 ='佛系科研小神仙';
        cons2 ='一个枕头睡一宿，管他结果有没有。'
        this.data.res=5;
      this.data.col = 4;
      }
    else if ((A[0].name == 5 && A[1].name == 4) || (A[0].name == 4 && A[1].name == 5) || (A[0].name == 4 && A[1].name == 2) || (A[0].name == 2 && A[1].name == 4))
      {
        cons1 ='操作满分细节帝';
        cons2 ='上帝赋予你一双巧手，而你正好用它来做科研。'
        this.data.res = 1;
      this.data.col = 3;  
      }
    else if ((A[0].name == 5 && A[1].name == 1) || (A[0].name == 1 && A[1].name == 5) || (A[0].name == 4 && A[1].name == 6) || (A[0].name == 6 && A[1].name == 4))
      {
        cons1 ='一丝不苟数据帝'
        cons2 ='数据背后的隐秘，让你兴奋不已。'
      this.data.res = 4;
      this.data.col = 3;
      }
    else if ((A[0].name == 6 && A[1].name == 1) || (A[0].name == 1 && A[1].name == 6) || (A[0].name == 6 && A[1].name == 3) || (A[0].name == 3 && A[1].name == 6))
      {
        cons1 ='硬肝刷夜科研狂魔'
         cons2 ='一盏灯，一壶酒，一个bug调一宿。'
      this.data.res = 6;
      this.data.col = 1;
      }
    else if ((A[0].name == 2 && A[1].name == 3) || (A[0].name == 3 && A[1].name == 2) || (A[0].name == 3 && A[1].name == 4) || (A[0].name == 4 && A[1].name == 3))
      {
        cons1 ='全能背锅科研巨佬'
        cons2 ='这世上本没有巨佬，背的锅多了，也便有了巨佬。'
      this.data.res = 3;
      this.data.col = 1;
      }
    else if ((A[0].name == 1 && A[1].name == 2) || (A[0].name == 2 && A[1].name == 1) || (A[0].name == 1 && A[1].name == 3) || (A[0].name == 3 && A[1].name == 1))
    {
      cons1 = '科研文献沼跃鱼'
      cons2 = '你深知科研工作前期调研的重要性，对浩如烟海的文献资料，你总是能一眼将最关键的部分看穿。'
      this.data.res = 2;
      this.data.col = 4;
    }
    else if ((A[0].name == 4 && A[1].name == 1) || (A[0].name == 1 && A[1].name == 4) || (A[0].name == 5 && A[1].name == 6) || (A[0].name == 6 && A[1].name == 5))
    {
      cons1 = '实验锦鲤欧气王'
      cons2 = '实验bug的绝缘体。'
      this.data.res = 8;
      this.data.col=2;
    }
    else 
    {
      //2&6
      cons1 = '科研黑脸非酋长'
      cons2 = '脸黑不多说，非酋求偷渡。'
      this.data.res = 7;
      this.data.col = 2;
    }
    //   var databas=0.4;
    //   var x1=this.data.wxjs/100;
    // x1 += (Math.random() - 0.5) * databas;
    //   var x2=this.data.sjgh/100;
    // x2 += (Math.random() - 0.5) * databas;
    //   var x3=this.data.kycx/100;
    // x3 += (Math.random() - 0.5) * databas;
    //   var x4=this.data.syds/100;
    // x4 += (Math.random() - 0.5) * databas;
    //   var x5=this.data.xlky/100;
    // x5 += (Math.random() - 0.5) * databas;
    //   var x6=this.data.xsyl/100;
    // x6 += (Math.random() - 0.5) * databas;
    //   var dataarray=this.data.radarData;
    //   dataarray[0].value=x1;
    //   dataarray[1].value = x2;
    //   dataarray[2].value = x3;
    //   dataarray[3].value = x4;
    //   dataarray[4].value = x5;
    //   dataarray[5].value = x6;
      this.setData(
        {
          con1:cons1,
          con2:cons2,
          col:this.data.col,
          // radarData:dataarray,
        }
      )
      // console.log(totvalx);
    this.drawPic();
    this.drawPicfinal();
    wx.showModal({
      title: '欢迎报名学推论坛',
      content: '欢迎报名参加12月的学推论坛，请点击下方"点击报名"，扫描二维码填写问卷参与报名。记得先保存图片哦!!!',
      showCancel: false
    })
    this.setData(
    {
      canvastop:'0rpx'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    // wx.scanCode({
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  idxAdd: function()
  {
    this.data.col++;
    if(this.data.col==5)this.data.col=1;
    this.setData(
      {
        col:this.data.col,
      }
    )
    // console.log(this.data.idx);
      var ids=this.data.idx;
      ids=ids+1;
      if(ids==10)
      {
        this.setData(
          {
            hidbtnx:true,
            hidbtn:true,
            end:true,
          }
        )
        //调用显示结果的雷达
        this.showResult();
        return ;
      }
      var xa = this.data.data[ids].A;
      var xb = this.data.data[ids].B;
      var xc = this.data.data[ids].C;
      var xd = this.data.data[ids].D;
    // console.log(x);
      var HIDBTNX;
      if(ids==4||ids==5)HIDBTNX=true;
      else HIDBTNX=false;
    console.log(ids);
    setTimeout(()=>
    {
      this.setData(
        {
          idx: ids,
          hidbtnx: HIDBTNX,
          selectA: xa,
          selectB: xb,
          selectC: xc,
          selectD: xd,  
          
          
        }
      )
    },0)
  },
  idxAddA: function () {
    var ids = this.data.idx;
    this.addVal(ids,0);//第几个值进行增加A
    this.idxAdd();
  },
  idxAddB: function () {
    var ids = this.data.idx;
    this.addVal(ids,1);//第几个值进行增加B
    this.idxAdd();
  },
  idxAddC: function () {
    var ids = this.data.idx;
    this.addVal(ids,2);//第几个值进行增加C
    this.idxAdd();
  },
  idxAddD: function () {
    var ids = this.data.idx;
    this.addVal(ids,3);//第几个值进行增加D
    this.idxAdd();
  },
  
  // onHide:function()
  // {
  //   wx.redirectTo({
  //     url: 'index'
  //   })
  //   this.setData(
  //     {
  //       wxjs: 0,   //文献检索
  //       sjgh: 0,   //时间规划
  //       kycx: 0,  //科研创新
  //       syds: 0,  //实验动手
  //       xlky: 0,  //心理抗压
  //       xsyl: 0,  //学术毅力
  //       totval: 0, //总价值
  //     }
  //   )
    
  // },
  onUnload:function()
  {
    // wx.navigateTo({
    //   url: '../start/start'
    // })
  },
  onLoad: function() {
    // this.onGetUserInfo();
    // console.log(this.idx);
    this.setData(
      {
        wxjs: 0,   //文献检索
        sjgh: 0,   //时间规划
        kycx: 0,  //科研创新
        syds: 0,  //实验动手
        xlky: 0,  //心理抗压
        xsyl: 0,  //学术毅力
        totval: 0, //总价值
      }
    )
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.startTest();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                confirmbox:true,
                hid:false,
              })
              // console.log(res.userInfo);
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        confirmbox: true,
        hid: false,
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },


  drawPolygon:function(ctx, sideNum, angle) {
      ctx.setStrokeStyle("rgb(0,0,1)");
      var r = this.data.radius / 6; //单位半径
      for (var i = 1; i < 6; i++) {
        ctx.beginPath();
        var currR = r * (i + 1); //当前半径
        for (var j = 0; j < sideNum; j++) {
          var x = centerPointX + currR * Math.cos(angle * j );
          //Math.PI/3.3是为了调整图形的偏移量，可自行设置
          var y = centerPointY + currR * Math.sin(angle * j );
          ctx.lineTo(x, y);
        }
        // ctx.setLineDash([2, 2]); //虚线
        ctx.closePath();
        ctx.stroke();
      }
    },
    drawRib:function(ctx, sideNum, angle) {
      ctx.setStrokeStyle("#cdcdcd");
      ctx.beginPath();
      for (var i = 0; i < sideNum; i++) {
        var x = centerPointX + this.data.radius * Math.cos(angle * i );
        var y = centerPointY + this.data.radius * Math.sin(angle * i );
        ctx.moveTo(centerPointX, centerPointY);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    },
    //add radar description
    addTags:function (ctx, radarData, sideNum, angle) {
      var angle = Math.PI * 2 / 6;
      var currentAngle = 0;
      ctx.setFontSize(rpx(30));
      // ctx.setFillStyle("rgb(95, 153, 32)");
      if (this.data.col == 1) ctx.setFillStyle("rgb(113, 162, 226)");//填充色
      else if (this.data.col == 2) ctx.setFillStyle("rgb(95, 153, 32)");//填充色
      else if (this.data.col == 3) ctx.setFillStyle("rgb(252, 188, 198)");//填充色
      else if (this.data.col == 4) ctx.setFillStyle("rgb(240, 243, 62)");//填充色
      //确定文本位置，可以根据微信小程序文档中的具体方法来设置
      for (var i = 0; i < sideNum; i++) {
        var posX = centerPointX + this.data.radius * Math.cos(currentAngle);
        var posY = centerPointY + this.data.radius * Math.sin(currentAngle);
        if (posX < centerPointX) ctx.setTextAlign("right");
        else ctx.setTextAlign("left");
        if (posY > centerPointY) ctx.setTextBaseline("top");
        else ctx.setTextBaseline("bottom");
        ctx.fillText(radarData[i].desc, posX, posY);
        currentAngle += angle;
      }
    },
    //add dataPoint
    addDataPoint:function(ctx, radarData, sideNum, angle) {
      for (var i = 0; i < sideNum; i++) {
        var x = centerPointX + this.data.radius * Math.cos(angle * i ) * radarData[i].value;
        var y = centerPointY + this.data.radius * Math.sin(angle * i ) * radarData[i].value;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        if (this.data.col == 1) ctx.setFillStyle("rgb(113, 162, 226)");//填充色
        else if (this.data.col == 2) ctx.setFillStyle("rgb(95, 153, 32)");//填充色
        else if (this.data.col == 3) ctx.setFillStyle("rgb(252, 188, 198)");//填充色
        else if (this.data.col == 4) ctx.setFillStyle("rgb(240, 243, 62)");//填充色
        // ctx.setFillStyle("rgb(177, 206, 245)");
        ctx.fill();
        ctx.closePath();
      }
    },
    //line point
    linePoint:function(ctx, radarData, sideNum, angle){
      ctx.setStrokeStyle("rgb(177, 206, 245)");
      ctx.beginPath();
      for (var i = 0; i < sideNum; i++) {
        var x =
          centerPointX +
          this.data.radius * Math.cos(angle * i ) * radarData[i].value;
        var y =
          centerPointY +
          this.data.radius * Math.sin(angle * i ) * radarData[i].value;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      if(this.data.col==1)ctx.setFillStyle("rgba(113, 162, 226,0.5)");//填充色
      else if (this.data.col == 2) ctx.setFillStyle("rgba(95, 153, 32,0.5)");//填充色
      else if (this.data.col == 3) ctx.setFillStyle("rgba(252, 188, 198,0.5)");//填充色
      else if (this.data.col == 4) ctx.setFillStyle("rgba(240, 243, 62,0.5)");//填充色
      ctx.fill();//填充
      ctx.stroke();
    }, 
    drawtext:function(ctx)
    {
      ctx.setFontSize(24);
      ctx.setFillStyle('#333333');
      ctx.setTextAlign('center');
      // var fontfamily=wx.loadFontFace(
      //   {
      //     family:'HYZhuZiTongNianTiW',
      //     source: 'url("http://149.28.95.1:8081/HYZhuZiTongNianTiW.ttf")',
      //     // family: 'Bitstream Vera Serif Bold',
      //     // source: 'url("https://sungd.github.io/Pacifico.ttf")',
      //     success:console.log,
      //     fail:console.log
      //   }
      // )
      // ctx.font='normal normal 24px'+'SimHei';
      ctx.fillText(this.data.con1, centerPointX, 80);
      // //绘制分享的第二行标题文字
      // ctx.fillText(this.data.con2, centerPointX, 100);
      this.drawt(ctx);
      // var maxY=wx.getSystemInfoSync().windowHeight-50;
      // ctx.fillText(this.data.con1, centerPointX, );
      // centerPointY += 70;
    },
  drawBackground:function(ctx, color = 'white', width = 1000, height = 3000, x = 0, y = 0) {
    ctx.rect(x, y, width, height)
    ctx.setFillStyle(color)
    ctx.fill()
  },
    drawPic: function ()  //绘制雷达图
    {
      var ctx = wx.createCanvasContext("radarCanvas");
      ctx.fillStyle = "white";
      // this.drawBackground(ctx, '#fff')
      //http://149.28.95.1:8081/res2.png
      // ctx.drawImage('http://149.28.95.1:8081/res' + this.data.res + '.png', 0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
      ctx.drawImage('../../images/res'+this.data.res+'.jpg', 0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
      // ctx.drawImage('../../images/6.jpg', wx.getSystemInfoSync().windowWidth - 95, wx.getSystemInfoSync().windowHeight-95, 50, 50)
      var sideNum = this.data.radarData.length;
      var angle = Math.PI * 2 / sideNum;
      // this.drawtext(ctx);
      this.drawPolygon(ctx, sideNum, angle);
      this.drawRib(ctx, sideNum, angle);
      this.addTags(ctx, this.data.radarData, sideNum, angle);
      this.addDataPoint(ctx, this.data.radarData, sideNum, angle);
      this.linePoint(ctx, this.data.radarData, sideNum, angle);
      ctx.fillStyle = "white";
      ctx.draw(false, setTimeout(() => {
        // 将生成的canvas图片，转为真实图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'radarCanvas',
          success: (res)=> {

            let shareImg = res.tempFilePath;
            this.setData({
              shareImg: shareImg,
              showModal: true,
              showShareModal: false
            });
            console.log(shareImg);
              wx.hideLoading();
          },
          fail: function (res) {
            console.log(res);
          }
        },this)
      }, 5000));

      


      //draw polygon
    },
  drawPicfinal: function ()  //绘制雷达图
  {
    var ctx = wx.createCanvasContext("radarCanvasfinal");
    ctx.fillStyle = "white";
    // this.drawBackground(ctx, '#fff')
    //http://149.28.95.1:8081/res2.png
    // ctx.drawImage('http://149.28.95.1:8081/res' + this.data.res + '.png', 0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
    ctx.drawImage('../../images/res' + this.data.res + '.jpg', 0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
    ctx.drawImage('../../images/code.jpg', wx.getSystemInfoSync().windowWidth - 95, wx.getSystemInfoSync().windowHeight - 95, 50, 50)
    var sideNum = this.data.radarData.length;
    var angle = Math.PI * 2 / sideNum;
    // this.drawtext(ctx);
    this.drawPolygon(ctx, sideNum, angle);
    this.drawRib(ctx, sideNum, angle);
    this.addTags(ctx, this.data.radarData, sideNum, angle);
    this.addDataPoint(ctx, this.data.radarData, sideNum, angle);
    this.linePoint(ctx, this.data.radarData, sideNum, angle);
    ctx.fillStyle = "white";
    ctx.draw(false, setTimeout(() => {
      // 将生成的canvas图片，转为真实图片
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'radarCanvasfinal',
        success: (res) => {

          let shareImg = res.tempFilePath;
          this.setData({
            shareImg: shareImg,
            showModal: true,
            showShareModal: false
          });
          console.log(shareImg);
          wx.hideLoading();
        },
        fail: function (res) {
          console.log(res);
        }
      }, this)
    }, 5000));




    //draw polygon
  },
    

  // 长按保存事件
  saveImg:function() {
      setTimeout(()=>
      {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        fileType:'jpg',
        canvasId: 'radarCanvasfinal',
        success: function (res) {

          let shareImg = res.tempFilePath;
          that.setData({
            shareImg: shareImg,
            showModal: true,
            showShareModal: false
          },
            wx.hideLoading());
        },
        fail: function (res) {
          console.log(res);
        }
      }, this)
      
      
    let that = this;
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {
              // 如果用户拒绝过或没有授权，则再次打开授权窗口
              //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
              that.setData({
                openSet: true
              })
            }
          })
        } else {
          // 有则直接保存
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
    }, 2000);
  },

    
  drawt: function (context) {
    var text = this.data.con2;//这是要绘制的文本';

    var chr = text.split("");//这个方法是将一个字符串分割成字符串数组 var temp = "";
    var temp = "";
    var row = [];

    context.setFontSize(16)

    context.setFillStyle("#000")
    var x=0;
    var cnt=0;
    for(var i=0;i<chr.length;i++)
    {
      temp+=chr[i];
      x++;
      if(x==16)
      {
        x=0;
        row[cnt++]=temp;
        temp="";
      }
    }
    if(temp!="")row[cnt++]=temp;
    context.setTextAlign('left');
    for (var b = 0; b < row.length; b++) {

      context.fillText(row[b], 40, 110 + b * 30, 300);

    }

  },
  

  join:function()     //显示报名
  {
    console.log('1');
    this.setData({
      modalHidden: false,
      canvasHidden:true,
      canvastop:'0px',
    })
   
  },
  // modalCandel: function () {
  //   // do something
  //   this.setData({
  //     modalHidden: true,
  //     canvasHidden: false,
  //   })
  // },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    console.log('!!');
    this.setData({
      modalHidden: true,
      canvasHidden: false,
      canvastop:'0rpx',
    })
  },
  wenjuan:function()
  {
    console.log('11!');
    wx.previewImage({
      current: ' http://149.28.95.1:8081/', // 当前显示图片的http链接
      urls: ['http://149.28.95.1:8081/'] // 需要预览的图片http链接列表
    })
    
  }
})
