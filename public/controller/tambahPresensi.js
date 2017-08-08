$(function(){
  var input_data = []; // variable untuk menyimpan data select
  var id_kelas_siswa_hasil = [] // variabel untuk menyimpan data nis siswa yang ditampilkan
  var jumlah_siswa; // variable untuk menyimpan jumlah data siswa
  absensi_siswa_arr = [];
  var fungsi = new Fungsi();

  function setJumlah(data){
    this.jumlah_siswa = data;
  }
  function getJumlah(){
    return this.jumlah_siswa;
  }
  function setIdKelas(data, index){
    id_kelas_siswa_hasil[index] = data;
  }
  function getIdKelas(index){
    return id_kelas_siswa_hasil[index];
  }

  // TODO: fungsi digunakan untuk menyimpan array absen sesuai NIS
  function set_absensi_array(data){
    absensi_siswa_arr=[];
    for(var i=0;i<getJumlah();i++){
      absensi_siswa_arr.push({
        status : data[i].charAt(0),
        id_kelas_siswa : getIdKelas(i),
      });
    }
  }

  // TODO: menjalankan fungsi seleksi untuk semua select
  for(var i=0;i<=3;i++){
    fungsi.seleksiTambahAbsen("input"+i, input_data); //memanggil fungsi seleksiTambahAbsen dari kelas fungsi untuk seleksi semua select
  }


  $("#btn-cari").click(function(){
    var d = new Date();
    var semester = fungsi.parseMonthToSemester(d.getMonth());
    $(".loading").show();
    $("#hasil").hide();
    $.when(
      $.ajax({
        method: "POST",
        url: "/checkPresensiGuru",
        data: {cekP_idmapel : input_data[2]},
      })
    ).then(function(response){
      if(response=="done"){
        alert("Maaf Anda sudah melakukan absensi hari ini");
        $(".loading").hide();
      }else{
        $.post(
          "/checkPresensiGuru",
          {addP_idmapel : input_data[2]}
          ).done(function(result){
            $.ajax({
              method: "POST",
              url: "/checkPresensiGuru",
              data: {cariP_jurusan : input_data[0],
                     cariP_kelas : input_data[1],
                     cariP_idmapel : input_data[2],
                     cariP_semester : semester},
            }).done(function(result){
              setJumlah(result.length);
              console.log(result);
              $("#hasil_table").empty();
              $("#hasil_table").append("<thead><tr></tr></thead>");
              $("#hasil_table thead tr").append('<th>NO</th>');
              $("#hasil_table thead tr").append('<th>NIS</th>');
              $("#hasil_table thead tr").append('<th>Nama</th>');
              $("#hasil_table thead tr").append('<th>Pilihan</th>');

              $("#hasil_table").append("<tbody></tbody>");
              var nomor=0;
              this.nis_hasil=[];

              for(var i=0;i<result.length;i++){
                setIdKelas(result[i].id_kelas_siswa, i);
                nomor++;
                $("#hasil_table tbody").append('<tr id="'+i+'"></tr>');
                $("#hasil_table tbody #"+i).append('<td>'+nomor+'</td>');
                $("#hasil_table tbody #"+i).append('<td>'+result[i].NIS+'</td>');
                $("#hasil_table tbody #"+i).append('<td>'+result[i].nama_siswa+'</td>');
                $("#hasil_table tbody #"+i).append('<td class="'+i+'"></td>');
                $("#hasil_table tbody #"+i+" ."+i).append('<div class="col-md-4"><input class="with-gap" name="'+(result[i].NIS)+'" type="radio" id="'+(1+result[i].NIS)+'"/><label for="'+(1+result[i].NIS)+'">Hadir</label></div>');
                $("#hasil_table tbody #"+i+" ."+i).append('<div class="col-md-4"><input class="with-gap" name="'+(result[i].NIS)+'" type="radio" id="'+(2+result[i].NIS)+'"/><label for="'+(2+result[i].NIS)+'">Izin</label></div>');
                $("#hasil_table tbody #"+i+" ."+i).append('<div class="col-md-4"><input class="with-gap" name="'+(result[i].NIS)+'" type="radio" id="'+(3+result[i].NIS)+'"/><label for="'+(3+result[i].NIS)+'">Alfa</label></div>');
              }
              $(".loading").hide();
              $("#hasil").show();
            })
        });
      }
    });
  });

  $("#submit").click(function(){
    var all_data = $("#hasil_table > tbody > tr > td > div > input:radio:checked").get();
    var data_absensi_siswa = $.map(all_data, function(element) {
        return $(element).attr("id");
    });
    if(data_absensi_siswa.length < getJumlah()){
      alert("isi seluruh absensi terlebih dahulu");
    }else{
        set_absensi_array(data_absensi_siswa);
        // console.log(absensi_siswa_arr);
        // console.log(getNis(1));
        $(".loading").show();
        $.post(
          "/checkPresensiGuru",
          {get_presensi_today : true}
        ).done(function(result){
          $.ajax({
            method: "POST",
            url: "/checkPresensiGuru",
            data: {id_absensi_harian : result[0].id_absensi_harian,
                   data_absensi_siswa : absensi_siswa_arr,
                   },
          }).done(function(result){
            $(".loading").hide();
            if(result=="success"){
              alert("Presensi berhasil diinput");
              // window.location = "/presensi/"+fungsi.thisMonth()+"?"+data_pencarian;
              window.location = "/dashboard";
            }else{
              alert("Ada yang bermasalah");
            }
          });
        });
    }
    // window.location = "/presensi/"+fungsi.thisMonth()+"?"+data_pencarian;
  });
});
