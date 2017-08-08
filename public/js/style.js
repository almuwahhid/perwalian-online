$(function(){
  var tinggi = $(window).height();
  var lebar = $(window).width();
  // TODO: JS - Pengaturan Tata Letak
  $(".full-height").css("height", tinggi);
  $(".tinggi-tengah").each(function(){
    $(this).css("margin-top", (tinggi/2)-($(".tinggi-tengah").height()/2));
  });
  $(".lebar-tengah").each(function(){
    $(this).css("margin-left", (lebar/2)-($(".lebar-tengah").width()/2));
  });
  $('.form-control').keypress(function(){
    $('.log-status').removeClass('wrong-entry');
  });
  $(".body").css("min-height", tinggi-112);
});
