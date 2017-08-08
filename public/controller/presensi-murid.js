var fungsi = new Fungsi();
$(function(){
  var tableVal= [];
  var input_data = [];
  var data_pencarian = ""; // variabel untuk menyimpan data query untuk detail presensi
  var tableVal = $('.idclass').map(function(i,v) {
      return $(this).attr('name');
  }).toArray();

  $("#back-button").click(function(){
    parent.history.back();
  });

  // TODO: Event onclick tiap kolom bulan
  function redirect(data){
    $("."+data).each(function(){
      $("."+data).click(function(){
        var url;
        switch (parseInt(data)) {
          case 1:
            url = "Januari";
            break;
          case 2:
            url = "Februari";
            break;
          case 3:
            url = "Maret";
            break;
          case 4:
            url = "April";
            break;
          case 5:
            url = "Mei";
            break;
          case 6:
            url = "Juni";
            break;
          case 7:
            url = "Juli";
            break;
          case 8:
            url = "Agustus";
            break;
          case 9:
            url = "September";
            break;
          case 10:
            url = "Oktober";
            break;
          case 11:
            url = "November";
            break;
          case 12:
            url = "Desember";
            break;
        }
        window.location = window.location.pathname+"/"+url+"?id_mapel="+data_pencarian;
      });
    });
  }


  // TODO: event click untuk kolom pencarian
  $("#btn-cari").click(function(){
    data_pencarian = $("#mapel option:selected").attr("value");
    var data_nis = $("#nis_info").html();
    var d = new Date();
    var semester = fungsi.parseMonthToSemester(d.getMonth());
    $.ajax({
      method: "POST",
      beforeSend: function() {
        $(".loading").show();
        $("#hasil").hide();
      },
      url: "/checkPresensiSiswa",
      data: { nis: data_nis, id_mapel : data_pencarian, smt : semester},
    }).done(function(result) {
      $(".loading").hide();
      $("#hasil_table").empty();
      $("#hasil_table").append("<thead><tr id='header'></tr></thead>");

      console.log(result);
      for(var i = 0;i <= fungsi.parseSemesterToMonth(semester+"").length++; i++){
          if(i==0){
            $("#hasil_table thead #header").append('<th rowspan="2">NO</th>');
            $("#hasil_table thead #header").append('<th rowspan="2">NIS</th>');
            $("#hasil_table thead #header").append('<th rowspan="2">Nama</th>');
          }else{
            var a=i-1;
            var name = i;
            if(!fungsi.isGanjil()){
              name = i+6;
            }
            $("#hasil_table thead #header").append('<th colspan="3" class="idclass '+name+'" name="'+name+'" >'+fungsi.parseSemesterToMonth(semester+"")[a]+'</th>')
          }
      }
      $("#hasil_table thead").append("<tr id='header_status'></tr>");
      for(var i = 1;i <= fungsi.parseSemesterToMonth(semester+"").length; i++){
          if(fungsi.isGanjil()){
            var b = i;
          }else{
            var b = i+6;
          }
          $("#hasil_table thead #header_status").append('<th class="'+b+'">Sakit</th>');
          $("#hasil_table thead #header_status").append('<th class="'+b+'">Masuk</th>');
          $("#hasil_table thead #header_status").append('<th class="'+b+'">Bolos</th>');
      }

      $("#hasil_table").append("<tbody></tbody>");
      for(var x=0;x<fungsi.getNamePresensi(result).length;x++){
        var no = x+1;
        $("#hasil_table tbody").append("<tr id='"+x+"'></tr>");
        $("#hasil_table tbody #"+x).append("<td>"+no+"</td>");
        $("#hasil_table tbody #"+x).append("<td>"+fungsi.getNamePresensi(result)[x]+"</td>");
        $("#hasil_table tbody #"+x).append("<td>"+fungsi.getNISPresensi(result)[x]+"</td>");
        for(var a = 0;a < fungsi.parseSemesterToNumber(semester+"").length; a++){
          if(fungsi.isGanjil()){
            var b = i+1;
          }else{
            var b = i+7;
          }
          $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getSakitInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber(semester+"")[a])+"</td>");
          $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getMasukInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber(semester+"")[a])+"</td>");
          $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getBolosInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber(semester+"")[a])+"</td>");
        }
      }

      // TODO: variable ini digunakan untuk mengambil seluruh class bulan dengan memanfaatkan headernya di idclass
      tableVal = $('.idclass').map(function(i,v) {
        return $(this).attr('name');
      }).toArray();

      // TODO: semua fungsi dijalankan
      for(var i=0;i<=5;i++){ // diulang sebanyak jumlah bulan dalam 1 semester
        fungsi.loop(tableVal[i]);
        // TODO: memanggil fungsi redirect() untuk perintah click detail presensi
        redirect(tableVal[i]);
      }
      $("#hasil").show();

    });

  });
});
