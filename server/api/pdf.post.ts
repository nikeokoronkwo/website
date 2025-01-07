// export default defineEventHandler(async (event) => {
//   const body = event.node.req.read() as Buffer;
//   const html = body.toString();

//   // console.log(html);

//   const pdf = await htmlToPdf("resume", html);

//   event.res.setHeader("Content-Type", "application/pdf");
//   event.res.setHeader(
//     "Content-Disposition",
//     'attachment; filename="resume.pdf"',
//   );

//   // Send PDF buffer to client
//   return pdf;
// });

// async function htmlToPdf(name: string, html: string) {
//   const puppeteer = await import("puppeteer");
//   console.trace();

//   const browser = await puppeteer.launch();
//   console.trace();

//   const page = await browser.newPage();
//   console.trace();

//   await page.setContent(html, { waitUntil: "domcontentloaded" });
//   console.trace();

//   await page.emulateMediaType("screen");
//   console.trace();

//   const pdf = await page.pdf({
//     path: `${name}.pdf`,
//     margin: { top: "10px", right: "5px", bottom: "10px", left: "40px" },
//     printBackground: true,
//     format: "A4",
//   });

//   console.trace();

//   await browser.close();
//   console.trace();

//   return pdf;
// }
