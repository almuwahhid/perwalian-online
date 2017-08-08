-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2017 at 09:04 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `presensi_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensi_harian`
--

CREATE TABLE IF NOT EXISTS `absensi_harian` (
  `id_absensi_harian` int(3) NOT NULL AUTO_INCREMENT,
  `NIP` varchar(120) NOT NULL,
  `id_mapel` int(2) NOT NULL,
  `tanggal_absensi_harian` int(2) NOT NULL,
  `bulan_absensi_harian` int(2) NOT NULL,
  `tahun_absensi_harian` int(4) NOT NULL,
  PRIMARY KEY (`id_absensi_harian`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=64 ;

--
-- Dumping data for table `absensi_harian`
--

INSERT INTO `absensi_harian` (`id_absensi_harian`, `NIP`, `id_mapel`, `tanggal_absensi_harian`, `bulan_absensi_harian`, `tahun_absensi_harian`) VALUES
(59, '135410025', 7, 27, 6, 2017),
(60, '19750223 200801 1 007', 38, 7, 7, 2017),
(61, '19640812 200604 1 004', 15, 7, 7, 2017),
(62, '19640812 200604 1 004', 12, 7, 7, 2017),
(63, '19640812 200604 1 004', 13, 8, 7, 2017);

-- --------------------------------------------------------

--
-- Table structure for table `absensi_siswa`
--

CREATE TABLE IF NOT EXISTS `absensi_siswa` (
  `id_absensi_siswa` int(3) NOT NULL AUTO_INCREMENT,
  `id_absensi_harian` int(3) NOT NULL,
  `id_kelas_siswa` int(3) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id_absensi_siswa`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `absensi_siswa`
--

INSERT INTO `absensi_siswa` (`id_absensi_siswa`, `id_absensi_harian`, `id_kelas_siswa`, `status`) VALUES
(1, 1, 2, 1),
(2, 60, 7, 1),
(3, 60, 8, 1),
(4, 60, 9, 1),
(5, 60, 10, 1),
(6, 60, 11, 1),
(7, 61, 17, 1),
(8, 61, 18, 1),
(9, 61, 19, 1),
(10, 61, 20, 2),
(11, 61, 21, 1),
(12, 62, 2, 1),
(13, 62, 3, 1),
(14, 62, 4, 1),
(15, 62, 5, 1),
(16, 62, 6, 3),
(17, 63, 7, 1),
(18, 63, 8, 1),
(19, 63, 9, 1),
(20, 63, 10, 1),
(21, 63, 11, 3);

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE IF NOT EXISTS `guru` (
  `NIP` varchar(50) NOT NULL,
  `nama_guru` varchar(150) NOT NULL,
  `alamat_guru` text NOT NULL,
  `jenis_kelamin` varchar(12) NOT NULL,
  `no_telp` varchar(15) NOT NULL,
  `tgl_masuk_guru` date NOT NULL,
  `tgl_lahir_guru` date NOT NULL,
  `tmp_lahir_guru` varchar(60) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`NIP`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`NIP`, `nama_guru`, `alamat_guru`, `jenis_kelamin`, `no_telp`, `tgl_masuk_guru`, `tgl_lahir_guru`, `tmp_lahir_guru`, `password`) VALUES
('19640812 200604 1 004', 'Dwi Harta, S.Pd', 'Klaten', 'Laki Laki', '08786774', '2006-06-04', '1975-06-04', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19650116 200701 1 009', 'Drs. Agus Budiyono', 'Klaten', 'Laki Laki', '08786774', '2007-01-01', '1965-01-16', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19710714 199603 2 001', 'Rustati Rokhana, S.Pd', 'Klaten', 'Laki Laki', '087678483', '1996-03-02', '1971-07-14', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19750223 200801 1 007', 'Darmono, S.Pd', 'Klaten', 'Laki Laki', '08786774', '2008-01-01', '1975-02-23', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19750424 200801 2 010', 'Gadis Mulyani, S.Pd', 'Klaten', 'Perempuan', '087678483', '2008-01-02', '1975-04-24', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19810111 200903 1 002', 'Joko Prihatin, S.Kom', 'Klaten', 'Laki Laki', '087678483', '2009-03-01', '1981-01-11', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19810206 201001 1 015', 'Yuliana Respatiningsih, S.Pd', 'Klaten', 'Perempuan', '08786774', '2010-01-01', '1981-02-06', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19810618 200904 2 002', 'Sri Wahyuni, S.Pd', 'Klaten', 'Perempuan', '08786774', '2009-04-02', '1981-06-18', 'Klaten', '202cb962ac59075b964b07152d234b70'),
('19821005 200903 1 006', 'Kusworo, S.Pd.T', 'Klaten', 'Laki Laki', '087678483', '2009-03-01', '1982-10-05', 'Klaten', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE IF NOT EXISTS `jurusan` (
  `id_jurusan` int(2) NOT NULL AUTO_INCREMENT,
  `nama_jurusan` varchar(25) NOT NULL,
  PRIMARY KEY (`id_jurusan`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id_jurusan`, `nama_jurusan`) VALUES
(3, 'Farmasi'),
(4, 'KI'),
(5, 'Otomotif'),
(6, 'TKJ'),
(7, 'TKR');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_siswa`
--

CREATE TABLE IF NOT EXISTS `kelas_siswa` (
  `id_kelas_siswa` int(3) NOT NULL AUTO_INCREMENT,
  `NIS` varchar(10) NOT NULL,
  `tahun_ajaran` int(4) NOT NULL,
  `kelas` varchar(10) NOT NULL,
  PRIMARY KEY (`id_kelas_siswa`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `kelas_siswa`
--

INSERT INTO `kelas_siswa` (`id_kelas_siswa`, `NIS`, `tahun_ajaran`, `kelas`) VALUES
(2, '3277', 2017, 'X FAR 1'),
(3, '3278', 2017, 'X FAR 1'),
(4, '3279', 2017, 'X FAR 1'),
(5, '3280', 2017, 'X FAR 1'),
(6, '3281', 2017, 'X FAR 1'),
(7, '3035', 2017, 'X KI 1'),
(8, '3036', 2017, 'X KI 1'),
(9, '3037', 2017, 'X KI 1'),
(10, '3038', 2017, 'X KI 1'),
(11, '3039', 2017, 'X KI 1'),
(12, '3099', 2017, 'X OTO 1'),
(13, '3100', 2017, 'X OTO 1'),
(14, '3101', 2017, 'X OTO 1'),
(15, '3102', 2017, 'X OTO 1'),
(16, '3103', 2017, 'X OTO 1'),
(17, '3170', 2017, 'X TKJ 1'),
(18, '3171', 2017, 'X TKJ 1'),
(19, '3172', 2017, 'X TKJ 1'),
(20, '3173', 2017, 'X TKJ 1'),
(21, '3174', 2017, 'X TKJ 1'),
(22, '2956', 2017, 'X TKR 1'),
(23, '2957', 2017, 'X TKR 1'),
(24, '2958', 2017, 'X TKR 1'),
(25, '2959', 2017, 'X TKR 1'),
(26, '2960', 2017, 'X TKR 1');

-- --------------------------------------------------------

--
-- Table structure for table `matapelajaran`
--

CREATE TABLE IF NOT EXISTS `matapelajaran` (
  `id_mapel` int(3) NOT NULL AUTO_INCREMENT,
  `id_jurusan` int(3) NOT NULL,
  `nama_mapel` varchar(250) NOT NULL,
  `kelas` varchar(10) NOT NULL,
  PRIMARY KEY (`id_mapel`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `matapelajaran`
--

INSERT INTO `matapelajaran` (`id_mapel`, `id_jurusan`, `nama_mapel`, `kelas`) VALUES
(2, 3, 'Matematika', 'X FAR 1'),
(3, 4, 'Matematika', 'X KI 1'),
(4, 5, 'Matematika', 'X OTO 1'),
(5, 6, 'Matematika', 'X TKJ 1'),
(6, 7, 'Matematika', 'X TKR 1'),
(7, 3, 'Bahasa Inggris', 'X FAR 1'),
(8, 4, 'Bahasa Inggris', 'X KI 1'),
(9, 5, 'Bahasa Inggris', 'X OTO 1'),
(10, 6, 'Bahasa Inggris', 'X TKJ 1'),
(11, 7, 'Bahasa Inggris', 'X TKR 1'),
(12, 3, 'Bahasa Indonesia', 'X FAR 1'),
(13, 4, 'Bahasa Indonesia', 'X KI 1'),
(14, 5, 'Bahasa Indonesia', 'X OTO 1'),
(15, 6, 'Bahasa Indonesia', 'X TKJ 1'),
(16, 7, 'Bahasa Indonesia', 'X TKR 1'),
(17, 3, 'Pkn', 'X FAR 1'),
(18, 4, 'Pkn', 'X KI 1'),
(19, 5, 'Pkn', 'X OTO 1'),
(20, 6, 'Pkn', 'X TKJ 1'),
(21, 7, 'Pkn', 'X TKR 1'),
(22, 3, 'Pend. Agama Islam', 'X FAR 1'),
(23, 4, 'Pend. Agama Islam', 'X KI 1'),
(24, 5, 'Pend. Agama Islam', 'X OTO 1'),
(25, 6, 'Pend. Agama Islam', 'X TKJ 1'),
(26, 7, 'Pend. Agama Islam', 'X TKR 1'),
(27, 3, 'IPA', 'X FAR 1'),
(28, 4, 'IPA', 'X KI 1'),
(29, 5, 'IPA', 'X OTO 1'),
(30, 6, 'IPA', 'X TKJ 1'),
(31, 7, 'IPA', 'X TKR 1'),
(32, 3, 'Fisika', 'X FAR 1'),
(33, 4, 'Fisika', 'X KI 1'),
(34, 5, 'Fisika', 'X OTO 1'),
(35, 6, 'Fisika', 'X TKJ 1'),
(36, 7, 'Fisika', 'X TKR 1'),
(37, 3, 'Kimia', 'X FAR 1'),
(38, 4, 'Kimia', 'X KI 1'),
(39, 5, 'Kimia', 'X OTO 1'),
(40, 6, 'Kimia', 'X TKJ 1'),
(41, 7, 'Kimia', 'X TKR 1'),
(42, 6, 'Keahlian TKJ', 'X TKJ 1'),
(43, 7, 'Keahlian TKR', 'X TKR 1'),
(44, 5, 'Keahlian TO', 'X OTO 1'),
(45, 4, 'KWU', 'X KI 1');

-- --------------------------------------------------------

--
-- Table structure for table `matapelajaranguru`
--

CREATE TABLE IF NOT EXISTS `matapelajaranguru` (
  `id_mapel_guru` int(3) NOT NULL AUTO_INCREMENT,
  `NIP` varchar(50) NOT NULL,
  `id_mapel` int(3) NOT NULL,
  `tahun_ajaran_mapel_guru` int(4) NOT NULL,
  PRIMARY KEY (`id_mapel_guru`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `matapelajaranguru`
--

INSERT INTO `matapelajaranguru` (`id_mapel_guru`, `NIP`, `id_mapel`, `tahun_ajaran_mapel_guru`) VALUES
(1, '19710714 199603 2 001', 2, 2017),
(2, '19710714 199603 2 001', 3, 2017),
(3, '19710714 199603 2 001', 4, 2017),
(4, '19710714 199603 2 001', 5, 2017),
(5, '19710714 199603 2 001', 6, 2017),
(6, '19750424 200801 2 010', 7, 2017),
(7, '19750424 200801 2 010', 8, 2017),
(8, '19750424 200801 2 010', 9, 2017),
(9, '19750424 200801 2 010', 10, 2017),
(10, '19750424 200801 2 010', 11, 2017),
(11, '19640812 200604 1 004', 12, 2017),
(12, '19640812 200604 1 004', 13, 2017),
(13, '19640812 200604 1 004', 14, 2017),
(14, '19640812 200604 1 004', 15, 2017),
(15, '19640812 200604 1 004', 16, 2017),
(16, '19650116 200701 1 009', 17, 2017),
(17, '19650116 200701 1 009', 18, 2017),
(18, '19650116 200701 1 009', 19, 2017),
(19, '19650116 200701 1 009', 20, 2017),
(20, '19650116 200701 1 009', 21, 2017),
(21, '19810206 201001 1 015', 22, 2017),
(22, '19810206 201001 1 015', 23, 2017),
(23, '19810206 201001 1 015', 24, 2017),
(24, '19810206 201001 1 015', 25, 2017),
(25, '19810206 201001 1 015', 26, 2017),
(26, '19810206 201001 1 015', 27, 2017),
(27, '19810206 201001 1 015', 28, 2017),
(28, '19810206 201001 1 015', 29, 2017),
(29, '19810206 201001 1 015', 30, 2017),
(30, '19810206 201001 1 015', 31, 2017),
(31, '19810618 200904 2 002', 32, 2017),
(32, '19810618 200904 2 002', 33, 2017),
(33, '19810618 200904 2 002', 34, 2017),
(34, '19810618 200904 2 002', 35, 2017),
(35, '19810618 200904 2 002', 36, 2017),
(36, '19750223 200801 1 007', 37, 2017),
(37, '19750223 200801 1 007', 38, 2017),
(38, '19750223 200801 1 007', 39, 2017),
(39, '19750223 200801 1 007', 40, 2017),
(40, '19750223 200801 1 007', 41, 2017),
(41, '19810111 200903 1 002', 42, 2017),
(42, '19821005 200903 1 006', 43, 2017),
(43, '19821005 200903 1 006', 44, 2017),
(44, '19810618 200904 2 002', 45, 2017);

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE IF NOT EXISTS `siswa` (
  `NIS` varchar(120) NOT NULL,
  `id_jurusan` int(3) NOT NULL,
  `nama_siswa` varchar(120) NOT NULL,
  `nama_ayah` varchar(100) NOT NULL,
  `tgl_lahir_siswa` date NOT NULL,
  `tmp_lahir_siswa` varchar(60) NOT NULL,
  `jk_siswa` varchar(10) NOT NULL,
  `alamat` text NOT NULL,
  `agama` varchar(15) NOT NULL,
  PRIMARY KEY (`NIS`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`NIS`, `id_jurusan`, `nama_siswa`, `nama_ayah`, `tgl_lahir_siswa`, `tmp_lahir_siswa`, `jk_siswa`, `alamat`, `agama`) VALUES
('2956', 7, 'Muhammad Yoga Pratama', 'Taryanto', '2001-04-03', 'Surakarta', 'Laki Laki', 'Morodipan, Gonilan, Kec. Kartasura', 'Islam'),
('2957', 7, 'Muhammad Rizky Pradana', 'Tulus Widodo', '2000-02-08', 'Klaten', 'Laki Laki', 'Tegalan, Keprabon, Polanharjo', 'Islam'),
('2958', 7, 'Muhammad Bayu Aldi Nugroho', 'Parmadi', '2001-07-01', 'Boyolali', 'Laki Laki', 'Kebonturi, Kateguhan, Kec. Sawit', 'Islam'),
('2959', 7, 'Muhammad Effendi', 'Qodri Wasono', '2001-06-18', 'Boyolali', 'Laki Laki', 'Garen, Gombang, Kec. Sawit', 'Islam'),
('2960', 7, 'Muhammad Rosyid', 'Wiranto', '2001-03-06', 'Boyolali', 'Laki Laki', 'Ngoro - oro, Tegalrejo, Kec. Sawit', 'Islam'),
('3035', 4, 'Adilia Novita Rahmadani', 'Slamet Raharjo', '2001-11-24', 'Klaten', 'Perempuan', 'Keprabon, Keprabon, Kec. Polanharjo', 'Islam'),
('3036', 4, 'Akiria Trisnani', 'Supardo', '2001-05-14', 'Klaten', 'Perempuan', 'Madugondo, Tegalgondo, Kec. Wonosari', 'Islam'),
('3037', 4, 'Andi Purwanto', 'Supadi', '2001-09-22', 'Boyolali', 'Laki Laki', 'Lenatem, Jenengan, Kec. Sawit', 'Islam'),
('3038', 4, 'Ardan Fajar Yunanto', 'Harjono', '2001-06-02', 'Sukoharjo', 'Laki Laki', 'Kagokan, Kagokan, Kec. Gatak', 'Islam'),
('3039', 4, 'Arjuan Akbar Budiaji', 'Parjo', '2001-03-04', 'Boyolali', 'Laki Laki', '<amglini,em. Tega; Rejo, Kec. Sawit', 'Islam'),
('3099', 5, 'Adam Arjuna Saifudin', 'Wuryanto', '2001-06-10', 'Klaten', 'Laki Laki', 'Sidomulyo, Glagahwangi, Kec. Polanharjo', 'Islam'),
('3100', 5, 'Adetya Rizky Mahendra', 'Sunarto', '2001-06-14', 'Boyolali', 'Laki Laki', 'Mojowetan, Tegalrejo, Kec. Sawit', 'Islam'),
('3101', 5, 'Aditya Dwi Cahyo', 'Eko Buidiyanto', '2001-06-23', 'Boyolali', 'Laki Laki', 'Mojowetan, Tegalrejo, Kec. Sawit', 'Islam'),
('3102', 5, 'Agus Setiyawan', 'Endratno', '2000-08-18', 'Surakarta', 'Laki Laki', 'Jerukan, Sekaran, Kec. Wonosari', 'Islam'),
('3103', 5, 'Ahmad Abimanyu', 'Giyarso', '2001-04-03', 'Klaten', 'Laki Laki', 'Tegalduwur, Wadunggetas, Kec. Wonosari', 'Islam'),
('3170', 6, 'Adela Nut Solikhah', 'Sulasno', '2001-12-01', 'Boyolali', 'Perempuan', 'Craken, Jipangan, Kec. banyudono', 'Islam'),
('3171', 6, 'Andhika Yoga Widyan Bagaskara', 'Slamet Widodo', '2001-04-28', 'Klaten', 'Laki Laki', 'Gentan, Tlobong, Kec. Delanggu', 'Islam'),
('3172', 6, 'Aulia Lola Adelafia', 'Budi Setiawan', '2001-04-08', 'Klaten', 'Perempuan', 'Teloyo Wetan, Teloyo, Kec. Wonosari', 'Islam'),
('3173', 6, 'Bima Ristiady Pratama', 'Tedy Setiady', '2001-03-22', 'Boyolali', 'Laki Laki', 'Kebonan, Kertonatan, Kec. Kartasura', 'Islam'),
('3174', 6, 'Cintana Istifa Yulinda Devi', 'Agus Margiono', '2000-07-25', 'Sukoharjo', 'Perempuan', 'Soditan, Gumpang, Kec. Kartasura', 'Islam'),
('3277', 3, 'Agustin Sri Lestari', 'Slamer', '2001-08-12', 'Klaten', 'Perempuan', 'GUmul, Kahuman, Kec. Polanharjo', 'Islam'),
('3278', 3, 'Ananda Meyrika Arthama', 'Dwi Harjanto', '2001-05-11', 'Klaten', 'Perempuan', 'Pokaan, Dukuh, Kec. Delanggu', 'Islam'),
('3279', 3, 'Citra Ayu Widyastuti', 'Bambang Rujito', '2001-08-02', 'Klaten', 'Perempuan', 'Bitaran, Keprabon, Kec. Polanharjo', 'Islam'),
('3280', 3, 'Dwi Nur Astuti', 'Hardoyo', '2000-10-21', 'Boyolali', 'Perempuan', 'Banjarejo, Kategunan, Kec. Sawit', 'Islam'),
('3281', 3, 'Erica Puspitasari', 'Siswanto', '2000-10-02', 'Klaten', 'Perempuan', 'Miliran, Medak, Kec. Delanggu', 'Islam');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
