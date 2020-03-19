// //const fs = require("fs");
// const PDFDocument = require("pdfkit");



// const invoice = {
//     shipping: {
//       name: "John Doe",
//       address: "1234 Main Street",
//       city: "San Francisco",
//       state: "CA",
//       country: "US",
//       postal_code: 94111
//     },
//     items: [
//       {
//         item: "TC 100",
//         description: "Toner Cartridge",
//         quantity: 2,
//         amount: 6000
//       },
//       {
//         item: "USB_EXT",
//         description: "USB Cable Extender",
//         quantity: 1,
//         amount: 2000
//       }
//     ],
//     subtotal: 8000,
//     paid: 0,
//     invoice_nr: 1234
//   };



// function createInvoice(invoice, path) {
//   let doc = new PDFDocument({ margin: 50 });

//   generateHeader(doc);
//   generateCustomerInformation(doc, invoice);
//   generateInvoiceTable(doc, invoice);
//   generateFooter(doc);

//   doc.end();
//   doc.pipe(fs.createWriteStream(path));
// }



// function generateHeader(doc) {
//     doc
//       .image("logo.png", 50, 45, { width: 50 })
//       .fillColor("#444444")
//       .fontSize(20)
//       .text("ACME Inc.", 110, 57)
//       .fontSize(10)
//       .text("123 Main Street", 200, 65, { align: "right" })
//       .text("New York, NY, 10025", 200, 80, { align: "right" })
//       .moveDown();
//   }
  
//   function generateFooter(doc) {
//     doc
//       .fontSize(10)
//       .text(
//         "Payment is due within 15 days. Thank you for your business.",
//         50,
//         780,
//         { align: "center", width: 500 }
//       );
//   }

// $(document).ready(function(){

//     $('#show-receipt-button').click(function(){

//         // $('#ticket').addClass('fade in')
//         // $("#ticket").css({ display: "block" });
//         createInvoice(invoice,'./')
    
//     })

// })
