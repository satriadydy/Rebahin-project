app.get("/", async (req, res) => {
  try {
    const response = await axios.get(TARGET_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);

    $("header, footer, .logo, .branding, .navbar, .site-title, .copyright").remove();

    $("*").each(function () {
      if ($(this).text().toLowerCase().includes("rebahin")) {
        $(this).remove();
      }
    });

    $("title").text("Tampilan Bersih");

    res.setHeader("Content-Type", "text/html");
    res.send($.html());
  } catch (err) {
    res.status(500).send("Gagal memuat halaman: " + err.message);
  }
});
