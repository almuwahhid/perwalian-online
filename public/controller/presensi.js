var fungsi = new Fungsi();
$(function(){
  var tableVal= [];
  var input_data = [];
  var key = [];
  var data_pencarian = "";
  var tableVal;

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
        window.location = "/presensi/"+url+"?"+data_pencarian;
      });
    });
  }

  // TODO: menjalankan fungsi seleksi untuk semua select
  for(var i=0;i<=3;i++){
    fungsi.seleksiGuru("input"+i, input_data);
  }
  // TODO: event click untuk print presensi
  $("#print_presensi").click(function(){
    console.log("ini pencarian", data_pencarian);
    window.open("/print?"+data_pencarian, '_blank');
  });
  // TODO: event click untuk kolom pencarian
  $("#btn-cari").click(function(){
    data_pencarian = "";
    for(var i=0;i<=3;i++){
      data_pencarian += ("input"+i+"="+$("#input"+i).val()+"&");
    }

    // TODO: Mengatur header tabel
    $("#hasil_table").empty();
    $(".loading").show("slow");
    $("#hasil_table").append("<thead><tr id='header'></tr></thead>");
    for(var i = 0;i <= fungsi.parseSemesterToMonth($("#input3").val()).length++; i++){
        if(i==0){
          $("#hasil_table thead #header").append('<th rowspan="2">NO</th>');
          $("#hasil_table thead #header").append('<th rowspan="2">NIS</th>');
          $("#hasil_table thead #header").append('<th rowspan="2">Nama</th>');
        }else{
          var a=i-1;
          var name = i;
          if($("#input3").val().charAt(0)%2==0){
            name = i+6;
          }
          $("#hasil_table thead #header").append('<th colspan="3" class="idclass '+name+'" name="'+name+'" >'+fungsi.parseSemesterToMonth($("#input3").val())[a]+'</th>')
        }
    }
    $("#hasil_table thead").append("<tr id='header_status'></tr>");
    for(var i = 1;i <= fungsi.parseSemesterToMonth($("#input3").val()).length; i++){
        if($("#input3").val().charAt(0)%2!=0){
          var b = i;
        }else{
          var b = i+6;
        }
        $("#hasil_table thead #header_status").append('<th class="'+b+'">Sakit</th>');
        $("#hasil_table thead #header_status").append('<th class="'+b+'">Masuk</th>');
        $("#hasil_table thead #header_status").append('<th class="'+b+'">Bolos</th>');
    }

    // fungsi.parseSemesterToMonth($("#input3").val());
    $("#hasil").hide();
    $.post(
      "/checkPresensiGuru",
      data_pencarian,
      function(result) {
        $(".loading").hide();
        $("#hasil_table").append("<tbody></tbody>");
        for(var x=0;x<fungsi.getNamePresensi(result).length;x++){
          var no = x+1;
          $("#hasil_table tbody").append("<tr id='"+x+"'></tr>");
          $("#hasil_table tbody #"+x).append("<td>"+no+"</td>");
          $("#hasil_table tbody #"+x).append("<td>"+fungsi.getNamePresensi(result)[x]+"</td>");
          $("#hasil_table tbody #"+x).append("<td>"+fungsi.getNISPresensi(result)[x]+"</td>");
          for(var a = 0;a < fungsi.parseSemesterToNumber($("#input3").val()).length; a++){
            if($("#input3").val().charAt(0)%2!=0){
              var b = a+1;
            }else{
              var b = a+7;
            }
            $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getSakitInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber($("#input3").val())[a])+"</td>");
            $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getMasukInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber($("#input3").val())[a])+"</td>");
            $("#hasil_table tbody #"+x).append("<td class='"+b+"'>"+fungsi.getBolosInMonth(result, fungsi.getNISPresensi(result)[x], fungsi.parseSemesterToNumber($("#input3").val())[a])+"</td>");
          }
        }
          console.log("ini dataku : ",result);
      }).done(function(){
        // TODO: variable ini digunakan untuk mengambil seluruh class bulan dengan memanfaatkan headernya di idclass
        tableVal = $('.idclass').map(function(i,v) {
          return $(this).attr('name');
        }).toArray();

        // TODO: semua fungsi dijalankan
        for(var i=0;i<=5;i++){
          fungsi.loop(tableVal[i]);
          // TODO: memanggil fungsi redirect() untuk perintah click detail presensi
          redirect(tableVal[i]);
        }
        $("#hasil").show();
      });

    //
    // setTimeout(function() {
    // }, 4000);
  });
});
