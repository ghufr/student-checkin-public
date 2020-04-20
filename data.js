require("dotenv").config();

const matkul = {
  weekend: {
    note: "Weekend",
    type: "Tugas",
    start: "12.00 am",
    end: "12.00 am",
  },
  tubes: {
    note: "Pengerjaan Tubes",
    type: "Tugas",
    start: "12.00 am",
    end: "12.00 am",
  },
  manjarkom: {
    note: "Melakukan test di netacad",
    type: "Kuliah Daring",
    start: "6.30 am",
    end: "10.00 am",
  },
  pi: {
    note: "Perancangan Interaksi",
    type: "Kuliah Daring",
    start: "7.00 am",
    end: "8.30 am",
  },
  rpb: {
    note: "Rekayasa Proses Bisnis",
    type: "Kuliah Daring",
    start: "10.00 am",
    end: "12.00 pm",
  },
  pkn: {
    note: "Pancasila dan Kewarganegaraan, diskusi di classroom",
    type: "Kuliah Daring",
    start: "6.30 am",
    end: "8.00 am",
  },
  apsi: {
    note: "APSI, merangkum slide",
    type: "Tugas",
    start: "10.30 am",
    end: "12.00 pm",
  },
  basdat: {
    note: "BASDAT, mengerjakan TUBES",
    type: "Tugas",
    start: "2.00 pm",
    end: "3.30 pm",
  },
  scm: {
    note: "SCM, mengerjakan Tugas lms",
    type: "Tugas",
    start: "10.30 am",
    end: "12.00 pm",
  },
};

const schedules = [
  [matkul.weekend], // Minggu
  [matkul.tubes], // Senin
  [matkul.manjarkom], // Selasa
  [matkul.pi, matkul.rpb], // Rabu
  [matkul.pkn, matkul.apsi], // Kamis
  [matkul.basdat], // Jumat
  [matkul.scm], // Sabtu
];
//  TODO, select based on day
const dayOfWeek = () => new Date().getDay();
// {
//   note: "Perkuliahan",
//   type: "Tugas", // Tugas / Kuliah Daring
//   start: "1.30 pm", // [1-12].[00-55, interval 5] am/pm
//   end: "4.00 pm", // [1-12].[00-55, interval 5] am/pm
// },
module.exports = {
  username: process.env.IGRACIAS_USERNAME,
  password: process.env.IGRACIAS_PASSWORD,
  lectures: schedules[dayOfWeek()],
  tempatTinggal: "Non Asrama", // Jenis Tempat Tinggal
  houseType: "Rumah Keluarga", // Tempat Tinggal
  famhouseDestination: "Rumah Orang Tua", // Sub Jenis Tempat Tinggal
  famhouseCity: "Kota Bandung", // Kota
  health: 1, // 1 = Sehat, 0 = Sakit
};
