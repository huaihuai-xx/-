$('#userForm').on('submit', function() {
        var formData = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            successs: function(res) {
                location.reload();
            },
            error: function() {
                alert('添加失败')
            }
        })
        return false;
    })
    //当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
    //用户选择到的文件
    // this.file[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax不要解析构造函数
        processData: false,
        //告诉ajax不要设置请求参数类型
        contentType: false,
        success: function(response) {
            console.log(response);

            //设置头像预览功能，设置给页面元素即可
            $('#preview').attr('src', response[0].avatar);
            //设置隐藏域，地址发给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        //模版引擎将字符串拼接
        var html = template('userTpl', { data: response });
        $('#userBox').html(html)

    }
})
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
})
$('#modifyBox').on('submit', '#modifyForm', function() {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})
$('#userBox').on('click', '.delete', function() {
    if (confirm('您真的要删除此用户么')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})
var deleteMany = $('#deleteMany');
var selectAll = $('#selectAll');
selectAll.on('change', function() {
    //
    var status = $(this).prop('checked');
    $('#userBox').find('input').prop('checked', status);
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
})
deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您真要确定要进行批量删除操作吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }
})