$(document).on('page:change', function(){
  $('#btn-gen-key').click(function(){
    $.ajax({
      url: '/generate_key',
      type: 'GET',
      data: {
        ec_name: $('#elliptic').val()
      },
      success: function(key) {
        $('#private-key').val(key.pri_key);
        $('#public-key').val(key.pub_key);
      }
    });
  });

  $('#btn-gen-signature').click(function(){
    if ($('#private-key').val() == '' || $('#public-key').val() == '') {
      alert('Chưa thực hiện thao tác tạo khóa!');
    }
    else if ($('#message').val() == '') {
      alert('Không có thông điệp!');
    }
    else {
      $.ajax({
        url: '/generate_signature',
        type: 'GET',
        data: {
          message: $('#message').val(),
          hash: $('#hash-function').val()
        },
        success: function(signature) {
          $('#hash-img').val(signature.hash_img);
          $('#signature').val(signature.signature);
          $('#signature-verify').val(signature.signature);
        }
      });
    }
  });

  $('#message').change(function(){
    $('#message-verify').val($(this).val());
  });

  $('#btn-vrf-signature').click(function(){
    if ($('#private-key').val() == '' || $('#public-key').val() == '') {
      alert('Chưa thực hiện thao tác tạo khóa!');
    }
    else if ($('#message').val() == '' || $('#signature').val() == '') {
      alert('Chưa thực hiện thao tác tạo chữ ký!');
    }
    else {
      $.ajax({
        url: '/verify_signature',
        type: 'GET',
        data: {
          message: $('#message-verify').val(),
          signature: $('#signature-verify').val(),
          hash: $('#hash-function').val()
        },
        success: function(text) {
          if (text == 'true') {
          	$('#danger-mess').hide();
            $('#success-mess').show();
          }
          else {
          	$('#success-mess').hide();
            $('#danger-mess').show();
          }
        }
      });
    }
  });

  $('.close-alert').click(function(){
    if ($(this).parent().attr('id') == 'success-mess') {
      $('#success-mess').hide();
    }
    if ($(this).parent().attr('id') == 'danger-mess') {
      $('#danger-mess').hide();
    }
  });
});
