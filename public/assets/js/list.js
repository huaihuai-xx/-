var categoryId = getUrlParams('categoryId')
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(res) {
        var html = template('listTpl', { data: res })
        $('#listBox').html(html);
    }
})
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})