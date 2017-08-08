$(function(){
  var username,pass;
  $("#submit").click(function(){
    username = $("#username").val();
    pass = $("#pw").val();
    $.post("http://localhost:8000/authAdmin",{uname:username,pw:pass},function(data){
      if(data==='success')
      {
        window.location.href="/admin";
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
