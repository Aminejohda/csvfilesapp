$('#myfile').change(function xs(e) {
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append('myfile', file);
    $('#myfile').hide();
    $(".se-pre-con").show();
    $.ajax({
        url: 'http://localhost:8080/csv',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            $(".se-pre-con").hide();
            var result = res.donne
            var keys = Object.keys(result[1]);
            for (var i = 0; i < keys.length; i++) {
                $('#copyfirst').append("<td class='td" + i + "'>" + keys[i] + "</td>")
                $('#first').append("<td class='td" + i + "'>" + result[0][keys[i]] + "</td>");
                $('#second').append("<td class='td" + i + "'>" + result[1][keys[i]] + "</td>");
                $('#third').append("<td class='td" + i + "'>" + result[2][keys[i]] + "</td>");
                $('#fourth').append("<td class='td" + i + "'>" + result[3][keys[i]] + "</td>");
                $('#thead').append("<th class='th" + i + "'><input type='text' readonly value='" + keys[i] + "'id ='dob" + i + "' class='head' name='f" + i + "'/><button type='button' class='btn btn-warning okey'>Skip <input type='hidden' id='positionskip' value='" + i + "'/></button><button type='button' class='btn btn-info save'>Save <input type='hidden' id='positionsave' value='" + i + "'/></button></button><p class='skip text-center' id='skipped" + i + "'> Will not be imported <br><a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='" + i + "'/></a> </p> <p class='accept text-center' id='accepted" + i + "'> Will be imported <br> <a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='" + i + "'/></a></p></th> ")

            }
                $('#decription').append("")

            $('foot').append("<textarea name='description'></textarea><br><button type='submit' id='finish' disabled='true' class='btn btn-success'>Finish</button>");
        },
        crossDomain: true
    })
})
