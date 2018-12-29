module.exports = {
  proxy: {
    '/invoice-api': {    //将www.exaple.com印射为/apis
      target: 'http://ceshi4.sdykt.com.cn:1280',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true  //是否跨域
    }
  }
}
