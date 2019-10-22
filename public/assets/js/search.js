//获取浏览器地址栏中搜索的关键字
var key = getUrlParams('key')
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(res) {
        var html = template('searchTpl', { data: res })
        $('#listBox').html(html)
    }
})