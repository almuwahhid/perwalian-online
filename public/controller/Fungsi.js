function Fungsi(){
  this.input_data = [];



  // TODO: untuk mematikan seleksi yang lain ketika yg sebelumnya diaktifkan
  function mematikan_select(a, b){
    for(var i = parseInt(a); i<=3; i++){
      var after = parseInt(a)+1;
      if(i <= after){
        // $("#"+b+i).removeClass('disabled');
        $("#"+b+after).prop("disabled", false);
        $("#"+b+after).material_select();
      }else{
        $("#"+b+i).material_select('destroy');
        if(i==3){
          $("#btn-cari").addClass("disabled");
        }
      }
    }
  }



// TODO: digunakan untuk mengenali jumlah masuk mahasiswa
  this.getMasukInMonth = function(data, nis, month){
    var sum = 0;
    for(var i in data){
      if(data[i].NIS == nis && data[i].bulan_absensi_harian == month && data[i].status == 1){
        sum++;
      }
    }
    return sum;
  }

// TODO: digunakan untuk mengenali jumlah bolos mahasiswa
  this.getBolosInMonth = function(data, nis, month){
    var sum = 0;
    for(var i in data){
      if(data[i].NIS == nis && data[i].bulan_absensi_harian == month && data[i].status == 3){
        sum++;
      }
    }
    return sum;
  }

// TODO: digunakan untuk mengenali jumlah izin mahasiswa
  this.getSakitInMonth = function(data, nis, month){
    var sum = 0;
    for(var i in data){
      if(data[i].NIS == nis && data[i].bulan_absensi_harian == month && data[i].status == 2){
        sum++;
      }
    }
    return sum;
  }

// TODO: digunakan untuk mengambil nama2 data presensi yang diambil berdasar nama saja
  this.getNamePresensi = function(data){
    var value = [];
    var temp=0;
    for(var i in data){
      if(i==0){
        value[i] = data[i].nama_siswa;
      }else{
        if(data[i].nama_siswa != value[temp]){
          temp++;
          value[temp] = data[i].nama_siswa;
        }
      }
    }
    return value;
  }

// TODO: digunakan untuk mengambil nama2 data presensi yang diambil berdasar nama saja
  this.getNISPresensi = function(data){
    var value = [];
    var temp=0;
    for(var i in data){
      if(i==0){
        value[i] = data[i].NIS;
      }else{
        if(data[i].NIS != value[temp]){
          temp++;
          value[temp] = data[i].NIS;
        }
      }
    }
    return value;
  }

  // TODO: fungsi digunakan untuk event on select tambah presensi
  this.seleksiTambahAbsen = function(data, data2){
    var a = data.charAt(5);
    var b = data.replace(a, '');
    $("#"+data).change(function(){
      data2[a] = $("#"+data).val();
      switch (parseInt(a)) {
        case 0:
        var link = document.location.href.split('/');
        if(link[3]=="add"){
          $.post(
            "/checkPresensiGuru",
            { jurusan2: $("#"+data).val()},
            function(result) {
              $("#"+b+(parseInt(a)+1)).empty();
              for (var i in result){
                $("#"+b+(parseInt(a)+1)).append( "<option>"+result[i].kelas+"</option>" );
              }
              mematikan_select(a, b);
            });
        }else{
          $.post(
            "/checkPresensiGuru",
            { jurusan: $("#"+data).val()},
            function(result) {
              $("#"+b+(parseInt(a)+1)).empty();
              for (var i in result){
                $("#"+b+(parseInt(a)+1)).append( "<option>"+result[i].kelas+"</option>" );
              }
              mematikan_select(a, b);
            });
        }

          break;
        case 1:
          $.post(
            "/checkPresensiGuru",
            { kelas: $("#"+data).val(), id_jurusan: data2[a-1]},
            function(result) {
              $("#"+b+(parseInt(a)+1)).empty();
              for (var i in result){
                $("#"+b+(parseInt(a)+1)).append( "<option value='"+result[i].id_mapel+"'>"+result[i].nama_mapel+"</option>" );
              }
              mematikan_select(a, b);
            });
          break;
        case 2:
          $("#btn-cari").removeClass("disabled");
        break;
      }
    });
  }

  // TODO: fungsi digunakan untuk event on select cari absensi guru
  this.seleksiGuru = function(data, data2){
    var a = data.charAt(5);
    var b = data.replace(a, '');
    $("#"+data).change(function(){
      data2[a] = $("#"+data).val();
      switch (parseInt(a)) {
        case 0:
        $.post(
          "/checkPresensiGuru",
          { jurusan: $("#"+data).val()},
          function(result) {
            $("#"+b+(parseInt(a)+1)).empty();
            for (var i in result){
              $("#"+b+(parseInt(a)+1)).append( "<option>"+result[i].kelas+"</option>" );
            }
            mematikan_select(a, b);
          });
          break;
        case 1:
        $.post(
          "/checkPresensiGuru",
          { kelas: $("#"+data).val(), id_jurusan: data2[a-1]},
          function(result) {
            $("#"+b+(parseInt(a)+1)).empty();
            for (var i in result){
              $("#"+b+(parseInt(a)+1)).append( "<option value='"+result[i].id_mapel+"'>"+result[i].nama_mapel+"</option>" );
            }
            mematikan_select(a, b);
          });
          break;
        case 2:
        $.post(
          "/checkPresensiGuru",
          { id_mapel: $("#"+data).val()},
          function(result) {
            $("#"+b+(parseInt(a)+1)).empty();
            for (var i in result){
              for(var x=1;x<=2;x++){
                var gj = "";
                if(x%2==0){
                  gj = "Genap";
                }else{
                  gj = "Ganjil";
                }
                $("#"+b+(parseInt(a)+1)).append( "<option value='"+x+result[i].tahun_ajaran_mapel_guru+"'>"+gj+" "+result[i].tahun_ajaran_mapel_guru+"</option>" );
              }
            }
            mematikan_select(a, b);
          });
        break;
        case 3:
        alert(data2[a]);
        $("#btn-cari").removeClass("disabled");
          break;
      }
    });
  }

  // TODO: fungsi digunakan untuk menghapus disabled pada pencarian
  this.seleksi = function(data, data2){
    var a = data.charAt(5);
    var b = data.replace(a, '');
    $("#"+data).change(function(){
      data2[a] = $("#"+data).val();
      if(parseInt(a)==3){
        $("#btn-cari").removeClass("disabled");
      }else{
        $("#"+b+(parseInt(a)+1)).prop("disabled", false);
        $("#"+b+(parseInt(a)+1)).material_select();
      }
    });
  }

  // TODO: fungsi digunakan untuk menampilkan bulan ini
  this.thisMonth = function(){
    var d = new Date();
    var month = new Array();
    month[0] = "Januari";
    month[1] = "Februari";
    month[2] = "Maret";
    month[3] = "April";
    month[4] = "Mei";
    month[5] = "Juni";
    month[6] = "Juli";
    month[7] = "Agustus";
    month[8] = "September";
    month[9] = "Oktober";
    month[10] = "November";
    month[11] = "Desember";
    return month[d.getMonth()];
  }

  // TODO: fungsi digunakan untuk menampilkan bulan ini
  this.isGanjil = function(){
    var d = new Date();
    var month = new Array();
    if(d.getMonth()>=0 && d.getMonth()<=5){
      return true;
    }else if(d.getMonth()>=6 && d.getMonth()<=11){
      return false;
    }
  }
  // TODO: Untuk mengubah warna tiap bulan dan berubah jadi pointer
  this.loop = function(data){
    $("."+data).each(function(){
      $("."+data).mouseover(function() {
        $("."+data).css("background-color", "#f2f2f2");
        $("."+data).css("border-radius", "0px");
        $("."+data).css("cursor", "pointer");
      });
      $("."+data).mouseout(function () {
        $("."+data).css({ "background-color" : "transparent" });
        $("."+data).css("border-radius", "2px");
      });
    });
  }

  // TODO: fungsi untuk mengetahui semester berapa pada bulan ini
  this.parseMonthToSemester = function(month){
    if(month>=0 && month<=5){
      return 1;
    }else{
      return 2;
    }
  }

  // TODO: fungsi ini digunakan untuk konversi input semester pencarian mahasiswa menjadi bulan
    this.parseSemesterToMonth = function(data){
      var month = [];
      var smt = data.charAt(0);
      if(smt == 1){
        month [0] = "Januari";
        month [1] = "Februari";
        month [2] = "Maret";
        month [3] = "April";
        month [4] = "Mei";
        month [5] = "Juni";
      }else if(smt == 2){
        month [0] = "Juli";
        month [1] = "Agustus";
        month [2] = "September";
        month [3] = "Oktober";
        month [4] = "November";
        month [5] = "Desember";
      }
      return month;
    }

  // TODO: fungsi ini digunakan untuk konversi input semester pencarian mahasiswa menjadi bulan
    this.parseSemesterToNumber = function(data){
      var month = [];
      var smt = data.charAt(0);
      if(smt == 1){
        month [0] = 1;
        month [1] = 2;
        month [2] = 3;
        month [3] = 4;
        month [4] = 5;
        month [5] = 6;
      }else if(smt == 2){
        month [0] = 7;
        month [1] = 8;
        month [2] = 9;
        month [3] = 10;
        month [4] = 11;
        month [5] = 12;
      }
      return month;
    }
}
