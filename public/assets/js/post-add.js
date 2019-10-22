// 向服务器端发送请求 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {

        var html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function() {
    // 获取到管理员选择到的文件
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {

            $('#thumbnail').val(response[0].cover);
        }
    })
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })

    return false;
});
getUrlParams('id')
    //从浏览器的地址栏获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')

        if (tmp[0] = name) {
            return tmp[1]

        }
    }
    return -1
}

var id = getUrlParams('id');


if (id != -1) {
    $.ajax({
        url: '/posts/' + id,
        type: 'get',
        success: function(res) {
            $('#save').hide();
            $('#pEdit').show();
            $('h1').text('修改文章')
            $('#title').val(res.title)
            $('#content').val(res.content)
            $('.thumbnail').attr('src', res.thumbnail).show()
            $('#thumbnail').val(res.thumbnail)

            $('#category > option').each(function(value, item) {
                    if ($(item).val() == res.category) {
                        $(item).prop("selected", true)
                    }
                })
                //显示修改的状态
            $("#status > option").each((index, item) => {
                    //判断option里面的value属性值与res.category的值是否相等 如果相等 就表示是这个分类 给其设置一个selected
                    if ($(item).attr("value") == res.state) {
                        $(item).prop("selected", true)

                    }
                })
                //显示时间
            res.createAt && $("#created").val(res.createAt.substr(0, 10))
        }
    })
}
//找到pEdit这个 添加点击事件发送ajax请求
$('#pEdit').on('click', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    })
})