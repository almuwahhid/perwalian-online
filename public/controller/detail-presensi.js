$(function(){
  $("#back-button").click(function(){
    parent.history.back();
  });
  $("#print_presensi").click(function(){
    console.log("ini pencarian", window.location.href);
    var param = window.location.href.split("/")[window.location.href.split("/").length - 1];
    console.log("ini parameter", param);
    // alert("hei");
    window.open("/print-detail/"+param, '_blank');
  });
});
