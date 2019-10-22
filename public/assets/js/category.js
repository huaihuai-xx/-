//当添加分类表单发生提交提交行为时
$('#addCategory').on('submit', function() {
        //获取用户在表单中输入的内容
        var formData = $(this).serialize()
            //向服务器端发送请求 添加分类
        $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function() {
                location.reload();

            }

        })
        return false;
    })
    //发送ajax请求 向服务器端所有分类列表数据
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            //将服务端的字符串和模版进行拼接
            var html = template('categoryListTpl', { data: response });
            //将字符串显示在网页中
            $('#categoryBox').html(html);
        }
    })
    //为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    //获取要修改的分类数据的id
    var id = $(this).attr('data-id')
        //根据id分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html)

        }
    })
})
$('#formBox').on('submit', '#modifyCategory', function() {
        //获取管理员在表单中输入的内容
        var formData = $(this).serialize();
        //发送请求 修改分类数据
        var id = $(this).attr('data-id');
        $.ajax({
                type: 'put',
                url: '/categories/' + id,
                data: formData,
                success: function() {
                    location.reload();
                }
            })
            //阻止表单默认提交
        return false
    })
    //当删除按钮被点击的时候
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要删除吗？')) {
        //获取要删除的分类数据id
        var id = $(this).attr('data-id');
        //向服务器发送删除数据的请求
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })

    }
})