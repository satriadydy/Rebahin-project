const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3000;

const TARGET_URL = "https://airkelapaasli.site/country/indonesia/";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(TARGET_URL);
    const $ = cheerio.load(response.data);

    // Hapus elemen yang mengandung tulisan/logo "Rebahin"
    $("header, footer, .logo, .branding, .navbar, .site-title, .copyright").remove();

    // Hapus elemen yang mengandung kata 'rebahin' (case insensitive)
    $("*").each(function () {
      if ($(this).text().toLowerCase().includes("rebahin")) {
        $(this).remove();
      }
    });

    // Ganti judul halaman
    $("title").text("Tampilan Bersih");

    res.setHeader("Content-Type", "text/html");
    res.send($.html());
  } catch (err) {
    res.status(500).send("Gagal memuat halaman: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy Cleaner aktif di http://localhost:${PORT}`);
});
