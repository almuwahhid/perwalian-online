$(function(){
  var nip,pass;
  $("#submit").click(function(){
    nip=$("#nip").val();
    pass=$("#pw").val();
    $.post("http://localhost:8000/auth",{nip:nip,pw:pass},function(data){
      if(data==='success')
      {
        window.location.href="/dashboard";
      }else{
        $('.log-status').addClass('wrong-entry');
        $('#wait').fadeOut();
        setTimeout( "$('#failed').fadeIn(1500);",1000 );
        setTimeout( "$('#failed').fadeOut(1500);",3000 );
      }
    });
  });
  $('.log-btn').click(function(){
    // $('.log-status').addClass('wrong-entry');
    $('#wait').fadeIn(500);
    // setTimeout( "$('.alert').fadeOut(1500);",3000 );
  });
});
