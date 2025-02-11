-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Feb 2025 pada 02.49
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capex`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `datacapex`
--

CREATE TABLE `datacapex` (
  `Id` int(5) NOT NULL,
  `Category` text NOT NULL,
  `Budget` text NOT NULL,
  `Month_Plan` int(2) NOT NULL,
  `Actual` varchar(5) NOT NULL,
  `Invest` text NOT NULL,
  `Month` int(2) NOT NULL,
  `BFOS` varchar(25) NOT NULL,
  `activity_BFOS` int(3) NOT NULL,
  `Nominal_BFOS` varchar(25) NOT NULL,
  `Month_BFOS` int(2) NOT NULL,
  `BTOS` varchar(25) NOT NULL,
  `activity_BTOS` int(3) NOT NULL,
  `Nominal_BTOS` varchar(25) NOT NULL,
  `Month_BTOS` int(2) NOT NULL,
  `No_IA` varchar(50) NOT NULL,
  `shop` char(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `datacapex`
--

INSERT INTO `datacapex` (`Id`, `Category`, `Budget`, `Month_Plan`, `Actual`, `Invest`, `Month`, `BFOS`, `activity_BFOS`, `Nominal_BFOS`, `Month_BFOS`, `BTOS`, `activity_BTOS`, `Nominal_BTOS`, `Month_BTOS`, `No_IA`, `shop`) VALUES
(1, 'Filter UF Module Replacement', '1050', 1, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'TOSO1'),
(2, 'Spraygun ESG Renewal Type HBX2', '830', 3, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'TOSO1'),
(3, 'Replacement - Filter UF Module V62-7640HB', '', 0, '', 'Replacement', 0, 'TOSO1', 1, '936', 5, '', 0, '', 0, 'P5/PRD/IP/05/24/R.5 .25.D-00001', 'TOSO1'),
(4, 'Regular Replacement - ESHG HB5000 ASAHI SUNAC', '', 0, '', 'Replacement', 0, 'TOSO1', 2, '830', 5, '', 0, '', 0, 'P5/PRD/IP/05/24/R.5 .25.D-00003', 'TOSO1'),
(5, 'Regular Replacement - ESHG HB5000 ASAHI SUNAC', '', 0, '', 'Replacement', 0, 'TOSO1', 1, '80', 5, '', 0, '', 0, 'P5/PRD/IP/05/24/R.5 .25.D-00003', 'TOSO1'),
(6, 'Replacement - TV Andon Sealer, Quality, and TopCoat Area (Ignition Andon Migration)', '', 0, '', 'Replacement', 0, 'TOSO1', 1, '16', 6, '', 0, '', 0, 'P5/PRD/IP/06/24/R.5 .25.D-00004', 'TOSO1'),
(7, 'Portable Hoist - for Mixing 1 and Mixing 2 of Painting KAP', '', 0, '', 'Improvement', 0, 'TOSO1', 1, '18', 7, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.D-00001', 'TOSO1'),
(8, 'Portable Hoist - for Mixing 1 and Mixing 2 of Painting KAP', '', 0, '', 'Improvement', 0, 'BODY1', 1, '11', 7, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.D-00001', 'TOSO1'),
(9, 'Board Sliding 3 Pillar Procurement for FMDS implementation - Painting KAP', '', 0, '', 'Improvement', 0, 'BODY1', 1, '17', 7, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.D-00002', 'TOSO1'),
(10, 'Board Sliding 3 Pillar Procurement for FMDS implementation - Painting KAP', '', 0, '', 'Improvement', 0, 'ASSY1', 4, '21.8', 7, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.D-00002', 'TOSO1'),
(11, 'ENDO Air Hoist EHW-60 Wire Type', '', 0, '', 'Improvement', 0, 'BODY1', 2, '40.8', 9, '', 0, '', 0, 'P5/PRD/IP/09/24/I.5 .25.D-00003', 'TOSO1'),
(12, 'Procurement of Printer Laser Jet M706N for BackUp System', '', 0, '', 'Improvement', 0, 'BODY1', 2, '31.8', 10, '', 0, '', 0, 'P5/PRD/IP/10/24/I.5 .25.D-00004', 'TOSO1'),
(13, 'Replacement Automatic Shoes Cleaner Procurement - Painting 1 KAP', '', 0, '', 'Replacement', 0, 'PRESS', 89, '90', 1, '', 0, '', 0, 'P5/PRD/IP/01/25/R.5 .25.D-00005', 'TOSO1'),
(14, 'HP PC DESKTOP PRODESK 400 G9 - Reguler Computer Replacement', '', 0, '', 'Replacement', 0, 'PRESS', 89, '13.978', 1, '', 0, '', 0, 'P5/PRD/IP/01/25/R.5 .25.D-00002', 'TOSO1'),
(36, 'Improvement Musholla KAP 1 Step 2', '400', 11, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(37, 'Improvement Musholla KAP 1 Step 3', '200', 11, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(38, 'Improvement Expand TPA', '200', 5, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(39, 'Replacement Notebook HP Probook 440 G8 - Sudiarto', '', 0, '', 'Replacement', 0, 'GAOP3', 3, '21.219', 7, '', 0, '', 0, 'P5/GAD/IP/05/24/R.5 .14.B-00001', 'GAOP3'),
(40, 'Replacement PC HP EliteDesk 800 G3 DM 65W - Rafi Ammar', '', 0, '', 'Replacement', 0, 'GAOP3', 3, '21.219', 7, '', 0, '', 0, 'P5/GAD/IP/05/24/R.5 .14.B-00002	', 'GAOP3'),
(41, 'Purchase New Notebook Lenovo E14 for Erik Awan M', '', 0, '', 'Improvement', 0, 'GAOP3', 3, '21.354', 7, '', 0, '', 0, 'P5/GAD/IP/05/24/I.5 .14.B-00001', 'GAOP3'),
(42, 'Improvement Musholla Production KAP1 Step 2 and Step 3', '', 0, '', 'Improvement', 0, 'GAOP3', 1, '400', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00004', 'GAOP3'),
(43, 'Improvement Musholla Production KAP1 Step 2 and Step 3', '', 0, '', 'Improvement', 0, 'GAOP3', 2, '200', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00004', 'GAOP3'),
(44, 'Improvement Musholla Production KAP1 Step 2 and Step 3', '', 0, '', 'Improvement', 0, 'GAOP3', 3, '136.208', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00004', 'GAOP3'),
(45, 'Improvement Musholla Production KAP1 Step 2 and Step 3', '', 0, '', 'Improvement', 0, 'ASSY1', 4, '0.792', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00004', 'GAOP3'),
(46, 'Transfer Budget From RnD (Sinyal)', '120', 6, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(47, 'Improvement Perkuatan Sinyal KAP#1 dan RND', '', 0, '', 'Improvement', 0, 'GAOP3', 11, '120', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00005', 'GAOP3'),
(48, 'Improvement Perkuatan Sinyal KAP#1 dan RND', '', 0, '', 'Improvement', 0, 'BODY1', 2, '80', 9, '', 0, '', 0, 'P5/GAD/IP/09/24/I.5 .14.B-00005', 'GAOP3'),
(49, 'Purchase Golf Car for KAP (Transfer In)', '304', 8, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(50, 'Purchase Golf Car for KAP', '', 0, '', 'Improvement', 0, 'GAOP3', 14, '304', 11, '', 0, '', 0, 'P5/GAD/IP/11/24/I.5 .14.B-00006', 'GAOP3'),
(51, 'Transfer Budget From RnD (AC)', '691', 9, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'GAOP3'),
(52, 'Replacement AC Central RnD Styling Building 3 Unit (Material)', '', 0, '', 'Replacement', 0, 'GAOP3', 16, '411.6', 1, '', 0, '', 0, 'P5/GAD/IP/01/25/R.5 .14.B-00003', 'GAOP3'),
(53, 'Replacement AC Central RnD Styling Building 3 Unit (Jasa)', '', 0, '', 'Replacement', 0, 'GAOP3', 16, '218', 1, '', 0, '', 0, 'P5/GAD/IP/01/25/R.5 .14.B-00002', 'GAOP3'),
(54, 'Change methode supply junbiki bumper (Manual -> AGV)', '195', 5, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'LID1'),
(55, 'Procurement Replace Notebook for Operational', '', 0, '', 'Replacement', 0, 'LID1', 1, '63.657', 5, '', 0, '', 0, 'P5/PLK/IP/05/24/R.5 .22.A-00002', 'LID1'),
(56, 'Procurement Replace Notebook for Operational', '', 0, '', 'Replacement', 0, 'LID1', 1, '42.708', 7, '', 0, '', 0, 'P5/PLK/IP/07/24/R.5 .22.A-00003', 'LID1'),
(57, 'Replacement Notebook HP Probook 440 G6 Jajang Badrujaman', '', 0, '', 'Replacement', 0, 'LID1', 1, '20.353', 9, '', 0, '', 0, 'P5/PLK/IP/09/24/R.5 .22.A-00004', 'LID1'),
(58, 'Procurement Smart TV for replace Old TV Andon', '', 0, '', 'Replacement', 0, 'LID1', 1, '45', 9, '', 0, '', 0, 'P5/PLK/IP/09/24/R.5 .22.A-00005', 'LID1'),
(59, 'Replacement Scrubber Fiorentini', '', 0, '', 'Replacement', 0, 'PRESS', 89, '44.26', 1, '', 0, '', 0, 'P5/PLK/IP/01/25/R.5 .22.A-00008', 'LID1'),
(60, 'Replace Computer Equipment Already Broken', '', 0, '', 'Replacement', 0, 'PRESS', 88, '50.212', 1, '', 0, '', 0, 'P5/PLK/IP/01/25/R.5 .22.A-00009', 'LID1'),
(61, 'Procurement Tools & Equipment for Operational PLC-PCD-KAP2', '259.7', 1, '', 'Improvement', 0, '', 0, '', 0, '', 0, '', 0, '', 'PCD'),
(62, 'Pembelian Printer Zebra 220xi4', '', 0, '', 'Improvement', 0, 'PCD', 1, '78.2', 5, '', 0, '', 0, 'P5/PLK/IP/05/24/I.5 .22.A-00001', 'PCD'),
(63, 'Notebook dan PC untuk KAP 2', '', 0, '', 'Improvement', 0, 'PCD', 1, '62.157', 5, '', 0, '', 0, 'P5/PLK/IP/05/24/I.5 .22.A-00006', 'PCD'),
(64, 'Procurement Notebook For Daily Operational _Totoh and Ali M', '', 0, '', 'Replacement', 0, 'PCD', 1, '42.438', 5, '', 0, '', 0, 'P5/PLK/IP/05/24/R.5 .22.A-00001', 'PCD'),
(65, 'Procurement Notebook For Daily Operational _Zarkasi', '', 0, '', 'Improvement', 0, 'PCD', 1, '21.354', 10, '', 0, '', 0, 'P5/PLK/IP/10/24/I.5 .22.A-00008', 'PCD'),
(66, 'Procurement Notebook For Daily Operational _Ade Irvansyah', '', 0, '', 'Replacement', 0, 'PCD', 1, '21.354', 10, '', 0, '', 0, 'P5/PLK/IP/10/24/R.5 .22.A-00006', 'PCD'),
(67, 'Procurement Notebook For Daily Operational _Kardiono', '', 0, '', 'Replacement', 0, 'PCD', 1, '21.354', 11, '', 0, '', 0, 'P5/PLK/IP/11/24/R.5 .22.A-00007', 'PCD'),
(68, 'Procurement Notebook For Daily Operational _Gita Yoan', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/PLK/IP/01/25/R.5 .22.A-00003', 'PCD'),
(69, 'Procurement Notebook For Daily Operational_Ferdinanta Christyanjati', '', 0, '', 'Improvement', 0, 'PRESS', 88, '21.906', 1, '', 0, '', 0, 'P5/PLK/IP/01/25/I.5 .22.A-00002', 'PCD'),
(70, 'Replacement Air Supply Housing (Transferred by PE-TOSO)', '1800', 4, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'MTN1'),
(71, 'PROCUREMENT BOARD SLIDING TAMAN MAINTENANCE', '', 0, '', 'Improvement', 0, 'BODY1', 2, '38.8', 7, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.A-00001', 'MTN1'),
(72, 'PROCUREMENT BOARD SLIDING MAINTENANCE KAP 2', '', 0, '', 'Improvement', 0, 'BODY1', 2, '19.4', 8, '', 0, '', 0, 'P5/PRD/IP/07/24/I.5 .25.A-00002', 'MTN1'),
(73, 'REPLACEMENT NB LENOVO THINKPAD E14 - HADI.YANTO', '', 0, '', 'Replacement', 0, 'BODY1', 2, '21.4', 10, '', 0, '', 0, 'P5/PRD/IP/10/24/R.5 .25.A-00002', 'MTN1'),
(74, 'Renewal ASH Primer and Clear Painting KAP 1', '', 0, '', 'Replacement', 0, 'MTN1', 1, '1800', 10, '', 0, '', 0, 'P5/PRD/IP/10/24/R.5 .25.A-00003', 'MTN1'),
(75, 'Renewal ASH Primer and Clear Painting KAP 1', '', 0, '', 'Replacement', 0, 'PRESS', 89, '25', 10, '', 0, '', 0, 'P5/PRD/IP/10/24/R.5 .25.A-00003', 'MTN1'),
(76, 'REPLACEMENT NB LENOVO THINKPAD E14 - MTNP5.WELDING', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/PRD/IP/01/25/R.5 .25.A-00004', 'MTN1'),
(77, 'REPLACEMENT NB LENOVO THINKPAD E14 - ARIF.BUDIONO', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/PRD/IP/01/25/R.5 .25.A-00002', 'MTN1'),
(78, 'Special Tools for Function and Noise Analyze QE', '', 0, '', 'Improvement', 0, 'BODY1', 1, '48.881', 5, '', 0, '', 0, 'P5/PRD/IP/05/24/I.5 .25.I-00001', 'QUALITY1'),
(79, 'Procurement BOARD SLIDING 3 PILAR', '', 0, '', 'Improvement', 0, 'BODY1', 1, '19.4', 6, '', 0, '', 0, 'P5/PRD/IP/06/24/I.5 .25.I-00003', 'QUALITY1'),
(80, 'Replacement Notebook user : bayu.ariyanto', '', 0, '', 'Replacement', 0, 'BODY1', 1, '21.22', 7, '', 0, '', 0, 'P5/PRD/IP/06/24/R.5 .25.I-00001', 'QUALITY1'),
(81, 'Replacement Notebook user : bayu.ariyanto', '', 0, '', 'Replacement', 0, 'BODY1', 2, '0.14', 7, '', 0, '', 0, 'P5/PRD/IP/06/24/R.5 .25.I-00001', 'QUALITY1'),
(82, 'Procurement Notebook LENOVO THINKPAD E14', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/PRD/IP/11/24/R.5 .25.I-00004', 'QUALITY1'),
(83, 'Procurement Notebook LENOVO THINKPAD E14', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/QLK/IP/01/25/R.5 .29.A-00001', 'QUALITY1'),
(84, 'Procurement Notebook LENOVO THINKPAD E14', '', 0, '', 'Replacement', 0, 'PRESS', 89, '21.906', 1, '', 0, '', 0, 'P5/QLK/IP/01/25/R.5 .29.A-00002', 'QUALITY1'),
(85, 'Procurement Printer HP LASER JET M706N', '', 0, '', 'Replacement', 0, 'PRESS', 89, '15.9', 1, '', 0, '', 0, 'P5/QLK/IP/01/25/R.5 .29.A-00003', 'QUALITY1'),
(86, 'Procurement Notebook LENOVO THINKPAD E14', '', 0, '', 'Replacement', 0, 'PRESS', 89, '13.17', 1, '', 0, '', 0, 'P5/QLK/IP/01/25/R.5 .29.A-00004', 'QUALITY1'),
(87, 'Procurement Notebook LENOVO THINKPAD E14', '', 0, '', 'Replacement', 0, 'PRESS', 88, '8.736', 1, '', 0, '', 0, 'P5/QLK/IP/01/25/R.5 .29.A-00004', 'QUALITY1'),
(114, 'Filter UF Module Replacement', '1050', 4, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'PRESS'),
(115, 'Spraygun ESG Renewal Type HBX2', '830', 6, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'PRESS'),
(120, 'Filter UF Module Replacement', '1050', 4, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'BODY1'),
(121, 'Spraygun ESG Renewal Type HBX2', '830', 6, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'BODY1'),
(122, 'Filter UF Module Replacement', '1050', 4, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'TOSO2'),
(123, 'Spraygun ESG Renewal Type HBX2', '830', 6, '', 'Replacement', 0, '', 0, '', 0, '', 0, '', 0, '', 'TOSO2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `shop` char(25) DEFAULT NULL,
  `group_shop` char(25) DEFAULT NULL,
  `plant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `shop`
--

INSERT INTO `shop` (`id`, `shop`, `group_shop`, `plant`) VALUES
(1, 'PRESS', 'PRESS', 1),
(2, 'BODY1', 'BODY', 1),
(3, 'BODY2', 'BODY', 2),
(4, 'TOSO1', 'TOSO', 1),
(5, 'TOSO2', 'TOSO', 2),
(6, 'ASSY1', 'ASSY', 1),
(7, 'ASSY2', 'ASSY', 2),
(8, 'QUALITY1', 'QUALITY', 1),
(9, 'QUALITY2', 'QUALITY', 2),
(10, 'LID1', 'LID', 1),
(11, 'LID2', 'LID', 2),
(12, 'MTN1', 'MTN', 1),
(13, 'MTN2', 'MTN', 2),
(14, 'GAOP3', 'GAOP3', 1),
(15, 'PCD', 'PCD', 1),
(16, 'QSS', 'QSS', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tahun`
--

CREATE TABLE `tahun` (
  `Id` int(1) NOT NULL,
  `Tahun_1` int(5) NOT NULL,
  `Tahun_2` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `tahun`
--

INSERT INTO `tahun` (`Id`, `Tahun_1`, `Tahun_2`) VALUES
(1, 2024, 2025);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `datacapex`
--
ALTER TABLE `datacapex`
  ADD PRIMARY KEY (`Id`);

--
-- Indeks untuk tabel `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tahun`
--
ALTER TABLE `tahun`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `datacapex`
--
ALTER TABLE `datacapex`
  MODIFY `Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT untuk tabel `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
