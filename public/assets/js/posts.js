//向服务端发送请求，获取文章列表数据
$.ajax({
        type: 'get',
        url: '/posts',
        success: function(res) {

            var html = template('postsTpl', res)
            $('#postsBox').html(html)
            var page = template('pageTpl', res)
            $('#page').html(page)

        }
    })
    //处理日期时间格式
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(res) {

            var html = template('postsTpl', res)
            $('#postsBox').html(html)
            var page = template('pageTpl', res)
            $('#page').html(page)

        }
    })
}
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {

            var html = template('categoryTpl', { data: res })
            $('#categoryBox').html(html)

        }
    })
    //当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
        //获取到管理员选择的过滤条件
        var formData = $(this).serialize()
            //向服务端发送请求 根据条件索要文章列表数据
        $.ajax({
            type: 'get',
            url: '/posts',
            data: formData,
            success: function(res) {

                var html = template('postsTpl', res)
                $('#postsBox').html(html)
                var page = template('pageTpl', res)
                $('#page').html(page)

            }
        })
        return false;
    })
    //当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function() {
    //弹出确认删除框
    if (confirm('您确定删除此用户么')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})