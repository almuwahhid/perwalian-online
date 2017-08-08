$(function(){
  $("#btn-cari").click(function(){
    var data_nis = $("#input-nis").val();

    $.ajax({
      method: "POST",
      beforeSend: function() {
        $(".loading").show();
      },
      url: "/checkPresensiSiswa",
      data: { cari_nis: data_nis},
    }).done(function(result) {
      $(".loading").show();
      if(result=="success"){
        window.location = window.location.pathname+data_nis;
      }else{
        alert("NIS tidak ada");
        $(".loading").hide();
      }
    });

  });
});
