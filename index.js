var ubahh    = require("kelas");
var express = require("express");
var app     = express();
var crypto = require('crypto-js');
var path    = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');
var model = require('model');

app.use(session({
  secret: 'SkripsiKu',
  resave: false,
  saveUninitialized: true,
}));

var auth, mapel;

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

// TODO: index.js - pengaturan static file root

app.use('/controller', express.static(path.join(__dirname+'/public/controller')));
app.use('/gambar', express.static(path.join(__dirname+'/public/img')));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// ======================================== ADMIN =========================================== //
// ======================================== ADMIN =========================================== //
app.get('/login-admin', function(req, res) {
			res.render('login-admin');
});

// TODO: Autorisasi login admin
app.post('/authAdmin', function(req, res) {
	if (!req.session.admin){
		var data = {
	    text : "SELECT * FROM admin WHERE ? AND ?",
	    placeholder : [{username : req.body.uname}, {password : crypto.MD5(req.body.pw).toString()}],
	  };
		model.mySQLQuery(data).then(successCallback).catch(errorCallback);
		function successCallback(result){
				if(result.length){
					req.session.admin = req.body.uname;
					res.send('success');
				}else{
					res.send('fail');
				}
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }

	}else{
		res.redirect('/admin');
	}
});


// TODO: PAGE : Dashboard
app.get('/admin', function(req, res) {
	// console.log(model.getGuru("135410025"));
	if(req.session.admin){
		var data1 = {
	    text : "SELECT * FROM admin WHERE ?",
	    placeholder : {username : req.session.admin},
	  };
		var data2 = {
	    text : "SELECT * from siswa"
	  };

		var query_arr = [model.mySQLQuery(data1), model.mySQLQuery(data2)];
		Promise.all(query_arr).then(successCallback,errorCallback);
		// model.mySQLQuery(data1).then(model.mySQLQuery(data2)).then(successCallback).catch(errorCallback);
		function successCallback(result){
			res.render('pages/admin-utama', {data_admin : result[0], data_siswa : result[1]});
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('login-admin');
	}
});

// TODO: PAGE : Dashboard
app.get('/tambah-siswa', function(req, res) {
	// console.log(model.getGuru("135410025"));
	if(req.session.admin){
    var data={
      text : "SELECT * FROM jurusan"
    }
    model.mySQLQuery(data).then(function(result){
      res.render('pages/admin-tambahSiswa', {jurusan : result});
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
	}else{
		res.redirect('login-admin');
	}
});

// TODO: PAGE : Dashboard
app.get('/edit-siswa', function(req, res) {
	// console.log(model.getGuru("135410025"));
	if (req.query.nis != undefined){
    var data = {
			text :
      "SELECT * FROM siswa WHERE ?",
      placeholder : {NIS : req.query.nis},
		};
    var data2={
      text : "SELECT * FROM jurusan"
    }
    var query_arr = [model.mySQLQuery(data), model.mySQLQuery(data2)];
		Promise.all(query_arr).then(successCallback,errorCallback);
		// model.mySQLQuery(data1).then(model.mySQLQuery(data2)).then(successCallback).catch(errorCallback);
		function successCallback(result){
			res.render('pages/admin-edit', {siswa : result[0], jurusan : result[1]});
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('/admin');
	}
});

// TODO: Autorisasi login guru
app.post('/proseseditSiswa', function(req, res) {
	if (req.body.nis != undefined){
    console.log("UPDATE siswa SET nama_siswa = '"+req.body.nama_siswa+"', nama_ayah = '"+req.body.nama_ayah+"', tgl_lahir_siswa='"+req.body.tgl_lahir_siswa+"', tmp_lahir_siswa='"+req.body.tmp_lahir_siswa+"', jk_siswa = '"+req.body.jk_siswa+"', alamat = '"+req.body.alamat+"', agama = '"+req.body.agama+"' WHERE NIS = '"+req.body.nis+"'");
    var data = {
			text :
      "UPDATE siswa SET nama_siswa = '"+req.body.nama_siswa+"', nama_ayah = '"+req.body.nama_ayah+"', tgl_lahir_siswa='"+req.body.tgl_lahir_siswa+"', tmp_lahir_siswa='"+req.body.tmp_lahir_siswa+"', jk_siswa = '"+req.body.jk_siswa+"', alamat = '"+req.body.alamat+"', agama = '"+req.body.agama+"' WHERE NIS = '"+req.body.nis+"'"
		};
		model.mySQLQuery(data).then(successCallback).catch(errorCallback);
		function successCallback(result){
				if(result){
          res.redirect('/admin');
				}else{
					res.send('fail');
				}
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('/admin');
	}
});

// TODO: Autorisasi login guru
app.post('/prosestambahSiswa', function(req, res) {
	if (req.body.nis != undefined){
    var data = {
			text :
      "INSERT INTO siswa ("+
      "nis, id_jurusan, nama_siswa, nama_ayah, tgl_lahir_siswa, tmp_lahir_siswa, jk_siswa, alamat, agama)"+
      "VALUES ('"+req.body.nis+"',  '"+req.body.id_jurusan+"',  '"+req.body.nama_siswa+"',  '"+req.body.nama_ayah+"',  '"+req.body.tgl_lahir_siswa+"',  '"+req.body.tmp_lahir_siswa+"',  '"+req.body.jk_siswa+"',  '"+req.body.alamat+"',  '"+req.body.agama+"')",
		};
		model.mySQLQuery(data).then(successCallback).catch(errorCallback);
		function successCallback(result){
				if(result){
          res.redirect('/admin');
				}else{
					res.send('fail');
				}
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('/admin');
	}
});

// TODO: Autorisasi login guru
app.get('/hapusSiswa', function(req, res) {
  if (req.query.nis != undefined){
    var data = {
			text :
      "DELETE FROM siswa "+
      "WHERE ?",
			placeholder : {NIS : req.query.nis},
		};
		model.mySQLQuery(data).then(successCallback).catch(errorCallback);
		function successCallback(result){
				if(result){
          res.redirect('/admin');
				}else{
					res.send('fail');
				}
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('/admin');
	}
});

// ====================================================== END OF ADMIN ====================================== //

app.get('/', function(req, res) {
			res.render('index');
});
app.get('/login', function(req, res) {
			res.render('login');
});

// TODO: PAGE : Dashboard
app.get('/dashboard', function(req, res) {
	// console.log(model.getGuru("135410025"));
	if(req.session.admin){
		var data1 = {
	    text : "SELECT * FROM guru WHERE ?",
	    placeholder : {nip : req.session.admin},
	  };
		var data2 = {
	    text : "SELECT * from matapelajaranguru "+
      "JOIN matapelajaran ON matapelajaranguru.id_mapel = matapelajaran.id_mapel "+
      "JOIN jurusan ON jurusan.id_jurusan = matapelajaran.id_jurusan "+
      "WHERE ?",
	    placeholder : {nip : req.session.admin},
	  };

		var query_arr = [model.mySQLQuery(data1), model.mySQLQuery(data2)];
		Promise.all(query_arr).then(successCallback,errorCallback);
		// model.mySQLQuery(data1).then(model.mySQLQuery(data2)).then(successCallback).catch(errorCallback);
		function successCallback(result){
			res.render('pages/utamaGuru', {data_dosen : result[0], data_mapel : result[1]});
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }
	}else{
		res.redirect('login');
	}
});

// TODO: PAGE : PRESENSI GURU
app.get('/presensi', function(req, res) {
	if(req.session.admin){

    var data = {
	    text : "SELECT DISTINCT jurusan.id_jurusan, jurusan.nama_jurusan "+
      "FROM jurusan "+
      "JOIN matapelajaran ON jurusan.id_jurusan = matapelajaran.id_jurusan "+
      "JOIN matapelajaranguru ON matapelajaranguru.id_mapel = matapelajaran.id_mapel "+
      "WHERE ?",
	    placeholder : {nip : req.session.admin},
	  };
		model.mySQLQuery(data).then(model.mySQLQuery(data)).then(function(result){
			res.render('pages/presensi', {data_jurusan : result});
		}).catch(function(err){
	    console.log('Error while executing SQL Query',err);
	  });

	}else{
		res.redirect('login');
	}
});

// TODO: halaman print laporan presensi
app.get('/print', function(req, res) {
	if(req.session.admin){
    var max, min;
    if(ubahh.parseInputToSemester(req.query.input3)==1){
      min = 1;
      max = 6;
    }else if(ubahh.parseInputToSemester(req.query.input3)==2){
      min = 7;
      max = 12;
    }
    var data1 = {
			text :
      "SELECT siswa.nama_siswa, siswa.NIS, absensi_siswa.status, absensi_harian.bulan_absensi_harian "+
      "FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE bulan_absensi_harian >= "+min+
      " AND bulan_absensi_harian <= "+max+
      " AND ? AND ? AND ? "+
      "ORDER BY siswa.NIS",
			placeholder : [{nip : req.session.admin},
                    {tahun_absensi_harian : ubahh.parseInputToYear(req.query.input3)},
                    {id_mapel : req.query.input2}],
		};
    var data2 = {
      text :
      "SELECT nama_jurusan "+
      "FROM jurusan "+
      "WHERE ?",
			placeholder : [{id_jurusan : req.query.input0}],
    }
    var data3 = {
      text :
      "SELECT nama_mapel "+
      "FROM matapelajaran "+
      "WHERE ?",
			placeholder : [{id_mapel : req.query.input2}],
    }
    var query_arr = [model.mySQLQuery(data1), model.mySQLQuery(data2), model.mySQLQuery(data3)];
    Promise.all(query_arr).then(function(result){
      console.log(result[2][0].nama_mapel);
      console.log(result[1]);
			res.render('pages/presensi-print', {datas : result[0], jurusan_name : result[1][0].nama_jurusan, mapel_name : result[2][0].nama_mapel, semester : ubahh.parseKodeToSemester(req.query.input3), tanggal : ubahh.fullDateText()});
    }, function(err){
      console.log('Error while executing SQL Query',err);
    });
    // console.log("dataku nih", req.query);
	}else{
		res.redirect('login');
	}
});

app.get('/print-detail/:bulan', function(req, res) {
  if(req.session.admin){
    var data1 = {
			text :
      "SELECT siswa.nama_siswa, absensi_harian.tanggal_absensi_harian, siswa.NIS, absensi_siswa.status, absensi_harian.bulan_absensi_harian "+
      "FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE ? AND ? AND ? AND ? "+
      "ORDER BY siswa.NIS",
			placeholder : [
        {nip : req.session.admin},
        {tahun_absensi_harian : ubahh.parseInputToYear(req.query.input3)},
        {id_mapel : req.query.input2},
        {bulan_absensi_harian : ubahh.getMonth(req.params.bulan)}],
		};
    var data2 = {
      text :
      "SELECT nama_jurusan "+
      "FROM jurusan "+
      "WHERE ?",
			placeholder : [{id_jurusan : req.query.input0}],
    }
    var data3 = {
      text :
      "SELECT nama_mapel "+
      "FROM matapelajaran "+
      "WHERE ?",
			placeholder : [{id_mapel : req.query.input2}],
    }
    var query_arr = [model.mySQLQuery(data1), model.mySQLQuery(data2), model.mySQLQuery(data3)];
    Promise.all(query_arr).then(function(result){
      res.render('pages/detail-presensi-print', { data :result[0],
                                            jurusan_name : result[1][0].nama_jurusan, mapel_name : result[2][0].nama_mapel,
                                            semester : ubahh.parseKodeToSemester(req.query.input3),
                                            bulan: req.params.bulan,
                                            sum: ubahh.daysInMonth(ubahh.getMonth(req.params.bulan), ubahh.getFullYear()),
                                            tanggal : ubahh.fullDateText()});
    }, function(err){
      console.log('Error while executing SQL Query',err);
    });
  }else{
    res.redirect('login');
  }
});


// TODO: penyaringan presensi guru
app.post('/checkPresensiGuru', function(req, res){
  if(req.body.jurusan != undefined){
    var data = {
			text : "SELECT DISTINCT matapelajaran.kelas from matapelajaran JOIN matapelajaranguru ON matapelajaranguru.id_mapel = matapelajaran.id_mapel WHERE ? AND ?",
			placeholder : [{nip : req.session.admin}, {id_jurusan : req.body.jurusan}],
		};
		model.mySQLQuery(data).then(function(result){
    	res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});

	}else if(req.body.jurusan2 != undefined){
    var data = {
			text : "SELECT DISTINCT matapelajaran.kelas from matapelajaran JOIN matapelajaranguru ON matapelajaranguru.id_mapel = matapelajaran.id_mapel WHERE ? AND ? AND ?",
			placeholder : [{nip : req.session.admin},
                     {id_jurusan : req.body.jurusan2},
                     {tahun_ajaran_mapel_guru : ubahh.getFullYear()}],
		};
    console.log(data);
		model.mySQLQuery(data).then(function(result){
    	res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});

	}else if(req.body.kelas != undefined){
    var data = {
			text :  "SELECT DISTINCT matapelajaran.id_mapel, matapelajaran.nama_mapel from matapelajaran"+
              " JOIN matapelajaranguru ON matapelajaranguru.id_mapel = matapelajaran.id_mapel "+
              "WHERE ? AND ? AND ?",
			placeholder : [{nip : req.session.admin}, {id_jurusan : req.body.id_jurusan}, {kelas : req.body.kelas}],
		};
		model.mySQLQuery(data).then(function(result){
			res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
	}else if(req.body.id_mapel != undefined){
    var data = {
			text :  "SELECT DISTINCT matapelajaranguru.tahun_ajaran_mapel_guru "+
              "FROM matapelajaranguru "+
              "WHERE ? AND ?",
			placeholder : [{nip : req.session.admin}, {id_mapel : req.body.id_mapel}],
		};
		model.mySQLQuery(data).then(function(result){
			res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});

	}else if(req.body.input0 != undefined){
    var max, min;
    if(ubahh.parseInputToSemester(req.body.input3)==1){
      min = 1;
      max = 6;
    }else if(ubahh.parseInputToSemester(req.body.input3)==2){
      min = 7;
      max = 12;
    }
    var data = {
			text :
      "SELECT siswa.nama_siswa, siswa.NIS, absensi_siswa.status, absensi_harian.bulan_absensi_harian "+
      "FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE bulan_absensi_harian >= "+min+
      " AND bulan_absensi_harian <= "+max+
      " AND ? AND ? AND ? "+
      "ORDER BY siswa.NIS",
			placeholder : [{nip : req.session.admin},
                    {tahun_absensi_harian : ubahh.parseInputToYear(req.body.input3)},
                    {id_mapel : req.body.input2}],
		};
    model.mySQLQuery(data).then(function(result){
			res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }
  // fungsi untuk perintah2 di tambahPresensi.js
  else if(req.body.addP_idmapel != undefined){
    console.log("tambah presensi hari ini");
    var tgl = new Date();
    var data = {
			text :
      "INSERT INTO  absensi_harian ("+
      "NIP ,id_mapel ,tanggal_absensi_harian ,bulan_absensi_harian ,tahun_absensi_harian)"+
      "VALUES ('"+req.session.admin+"',  '"+req.body.addP_idmapel+"',  "+tgl.getDate()+",  "+(parseInt(tgl.getMonth()+1))+",  "+tgl.getFullYear()+")",
		};
    model.mySQLQuery(data).then(function(result){
      if(result.length){
        res.send("done");
      }else{
        res.send("fail");
      }
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }else if(req.body.cekP_idmapel != undefined){
    console.log("cek presensi hari ini");
    var tgl = new Date();
    var data = {
			text :
      "SELECT * FROM absensi_harian "+
      "WHERE ? AND ? AND ? AND ? AND ?",
			placeholder : [{nip : req.session.admin},
                     {id_mapel : req.body.cekP_idmapel},
                     {tanggal_absensi_harian : tgl.getDate()},
                     {bulan_absensi_harian : (parseInt(tgl.getMonth()+1))},
                     {tahun_absensi_harian : tgl.getFullYear()}],
		};
    model.mySQLQuery(data).then(function(result){
      if(result.length){
        res.send("done");
      }else{
        res.send("fail");
      }
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }else if(req.body.cariP_idmapel != undefined){
    var data = {
      text :
            "SELECT siswa.nama_siswa, siswa.NIS, kelas_siswa.id_kelas_siswa "+
            "FROM siswa "+
            "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
            "JOIN mataPelajaran ON kelas_siswa.kelas = mataPelajaran.kelas AND siswa.id_jurusan = mataPelajaran.id_jurusan "+
            "WHERE ? AND ? AND ?",
      placeholder : [{"siswa.id_jurusan" : req.body.cariP_jurusan},
                     {"mataPelajaran.kelas" : req.body.cariP_kelas},
                     {id_mapel : req.body.cariP_idmapel}],

    };
    model.mySQLQuery(data).then(function(result){
      res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }else if(req.body.get_presensi_today != undefined){
    var data={
      text : "SELECT id_absensi_harian FROM absensi_harian ORDER BY id_absensi_harian DESC LIMIT 1"
    }
    model.mySQLQuery(data).then(function(result){
      res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }else if(req.body.data_absensi_siswa){
    var query = "INSERT INTO absensi_siswa (id_absensi_harian, id_kelas_siswa, status) VALUES ";
    for(var i=0; i<req.body.data_absensi_siswa.length; i++){
      query+="("+req.body.id_absensi_harian+","+
                       req.body.data_absensi_siswa[i].id_kelas_siswa+","+
                       req.body.data_absensi_siswa[i].status+")";
      if(i!=(req.body.data_absensi_siswa.length-1))
        query+=", ";
    }
    console.log(query);
    var data = {
        text : query,
    };
    model.mySQLQuery(data).then(function(result){
      res.send("success");
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }else{
    res.send("pret");
  }
});

// TODO: PAGE : Presensi Guru Per bulan
app.get('/presensi/:bulan', function(req, res) {
	if(req.session.admin){
    var data = {
			text :
      "SELECT siswa.nama_siswa, absensi_harian.tanggal_absensi_harian, siswa.NIS, absensi_siswa.status, absensi_harian.bulan_absensi_harian "+
      "FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE ? AND ? AND ? AND ? "+
      "ORDER BY siswa.NIS",
			placeholder : [
        {nip : req.session.admin},
        {tahun_absensi_harian : ubahh.parseInputToYear(req.query.input3)},
        {id_mapel : req.query.input2},
        {bulan_absensi_harian : ubahh.getMonth(req.params.bulan)}],
		};



    model.mySQLQuery(data).then(function(result){
      res.render('pages/detail-presensi', { data :result,
                                            bulan: req.params.bulan,
                                            sum: ubahh.daysInMonth(ubahh.getMonth(req.params.bulan), ubahh.getFullYear()),
                                            tahun: ubahh.parseInputToYear(req.query.input3)});
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
	}else{
		res.redirect('../login');
	}
});

// TODO: PAGE : Tambah Presensi Guru
app.get('/add', function(req, res) {
	if(req.session.admin){
    var tgl = new Date();
		var tanggal_string = tgl.getDate()+" "+ubahh.bulanIni()+" "+tgl.getFullYear();
    var data = {
	    text : "SELECT DISTINCT jurusan.id_jurusan, jurusan.nama_jurusan "+
      "FROM jurusan "+
      "JOIN matapelajaran ON jurusan.id_jurusan = matapelajaran.id_jurusan "+
      "JOIN matapelajaranguru ON matapelajaranguru.id_mapel = matapelajaran.id_mapel "+
      "WHERE ? AND ?",
	    placeholder : [{nip : req.session.admin},
                     {tahun_ajaran_mapel_guru : ubahh.getFullYear()}]
	  };
		model.mySQLQuery(data).then(model.mySQLQuery(data)).then(function(result){
			res.render('pages/tambahPresensi', {data_jurusan : result, now : tanggal_string});
		}).catch(function(err){
	    console.log('Error while executing SQL Query',err);
	  });
	}else{
		res.redirect('login');
	}
});

// TODO: Autorisasi login guru
app.post('/auth', function(req, res) {
	if (!req.session.admin){
		var data = {
	    text : "SELECT * FROM guru WHERE ? AND ?",
	    placeholder : [{nip : req.body.nip}, {password : crypto.MD5(req.body.pw).toString()}],
	  };
		model.mySQLQuery(data).then(successCallback).catch(errorCallback);
		function successCallback(result){
				if(result.length){
					req.session.admin = req.body.nip;
					res.send('success');
				}else{
					res.send('fail');
				}
	  }
		function errorCallback(err){
	    console.log('Error while executing SQL Query',err);
	  }

	}else{
		res.redirect('/dashboard');
	}
});

// digunakan untuk logout
app.get('/logout', function(req, res){
  req.session.destroy(function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.redirect('/login');
		}
	});
});

// TODO: PAGE : Detail Pencarian Siswa
app.post('/checkPresensiSiswa', function(req, res) {
  if(req.body.cari_nis != undefined){
    var data = {
      text : "SELECT * FROM siswa WHERE ?",
      placeholder : {NIS : req.body.cari_nis},
    };
    model.mySQLQuery(data).then(function(result){
      if(result.length){
        res.send('success');
      }else{
        res.send('fail');
      }
    }).catch(function(err){
      res.send('fail');
    });
  }else if(req.body.id_mapel != undefined){
    var max, min;
    if(ubahh.parseInputToSemester(req.body.smt)==1){
      min = 1;
      max = 6;
    }else if(ubahh.parseInputToSemester(req.body.smt)==2){
      min = 7;
      max = 12;
    }
    var data = {
			text :
      "SELECT * "+
      "FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE bulan_absensi_harian >= "+min+
      " AND bulan_absensi_harian <= "+max+
      " AND ? AND ? AND ? "+
      "ORDER BY siswa.NIS",
			placeholder : [{tahun_absensi_harian : ubahh.getFullYear()},
                    {id_mapel : req.body.id_mapel},
                    {"siswa.NIS" : req.body.nis}],
		};
    console.log(data);
    model.mySQLQuery(data).then(function(result){
			res.send(result);
		}).catch(function(err){
			console.log('Error while executing SQL Query',err);
		});
  }
});

// TODO: PAGE : Detail Pencarian Siswa per bulan
app.get('/:siswa/:bulan', function(req, res) {
  var data = {
    text : "SELECT * "+
            "FROM siswa "+
            "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
            "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
            "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
            "WHERE ? AND ? AND ? AND ?"
            ,
    placeholder : [
                  {bulan_absensi_harian : ubahh.getMonth(req.params.bulan)},
                  {tahun_absensi_harian : ubahh.getFullYear()},
                  {"siswa.NIS" : req.params.siswa},
                  {id_mapel : req.query.id_mapel},
                  ],
  };

  model.mySQLQuery(data).then(function(result){
    if(result.length){
      res.render('pages/detail-presensi-murid',
                  { data :result,
                    bulan: req.params.bulan,
                    sum: ubahh.daysInMonth(ubahh.getMonth(req.params.bulan), ubahh.getFullYear()),
                    tahun: ubahh.getFullYear()});
    }else{
      res.redirect('../'+req.params.siswa);
    }
  }).catch(function(err){
    console.log(err);
    res.send('fail');
  });


});

// TODO: PAGE : Detail Pencarian Siswa
app.get('/:siswa', function(req, res) {
  if(req.params.siswa != "favicon.ico"){
    var tgl = new Date();
    var tgl_date = parseInt(tgl.getDate());
    var bln = (parseInt(tgl.getMonth()+1));
    var thn = tgl.getFullYear();

    var data2 = {
      text : "SELECT * FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN jurusan ON siswa.id_jurusan = jurusan.id_jurusan "+
      "JOIN absensi_siswa ON kelas_siswa.id_kelas_siswa = absensi_siswa.id_kelas_siswa "+
      "JOIN absensi_harian ON absensi_siswa.id_absensi_harian = absensi_harian.id_absensi_harian "+
      "WHERE ? AND ? AND ? AND ?",
      placeholder : [{"siswa.NIS" : req.params.siswa},
      {"bulan_absensi_harian" : bln},
      {"tahun_absensi_harian" : thn},
      {"tanggal_absensi_harian" : tgl_date}],
    };

    var data1 = {
      text : "SELECT * FROM siswa "+
      "JOIN kelas_siswa ON siswa.NIS = kelas_siswa.NIS "+
      "JOIN jurusan ON siswa.id_jurusan = jurusan.id_jurusan "+
      "JOIN matapelajaran ON siswa.id_jurusan = matapelajaran.id_jurusan "+
      "AND matapelajaran.kelas = kelas_siswa.kelas "+
      "WHERE ? AND ?",
      placeholder : [{"siswa.NIS" : req.params.siswa},
      {"tahun_ajaran" : ubahh.getFullYear()}],
    };
    var query_arr = [model.mySQLQuery(data1), model.mySQLQuery(data2)];
    Promise.all(query_arr).then(successCallback,errorCallback);

    function successCallback(result){
      res.render('pages/presensi-murid', { data :result[0], data_absen : result[1]});
    }
    function errorCallback(err){
      console.log('Error while executing SQL Query',err);
    }

    /**model.mySQLQuery(data).then(function(result){
      if(result.length){
        console.log(result);
        res.render('pages/presensi-murid', { data :result});
      }else{
        res.redirect('../');
      }
    }).catch(function(err){
      console.log(err);
      res.send('fail');
    }); **/

  }
});

app.listen(5000);
console.log("Berjalan di 8000");
