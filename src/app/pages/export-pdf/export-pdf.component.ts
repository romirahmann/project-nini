import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
})
export class ExportPdfComponent {
  userLogin!: any;
  dataTpDoc!: any;
  dataThreshold!: any;
  tp_id!: number;

  @ViewChild('pdfContent') pdfContent!: ElementRef<HTMLDivElement>;
  @ViewChild('table') table!: ElementRef<HTMLTableElement>;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getParamsId();
    this.getUserLogin();
  }
  getParamsId() {
    this.activeRoute.params.subscribe((params) => {
      const param_id = params['id'];
      this.tp_id = parseInt(param_id);
      this.getDetailFaktor();
    });
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }
  getDetailFaktor() {
    this.apiService.getDetailTp(this.tp_id).subscribe((res: any) => {
      // console.log(res.data);
      this.dataTpDoc = res.data[0][0];
      this.dataThreshold = res.data[1];
      // console.log(this.dataThreshold);
    });
  }
  exportToPdf(filename: string) {
    const pdfContent = this.pdfContent.nativeElement;

    html2canvas(pdfContent, { scale: 0.9 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Lebar halaman A4
      const imgHeight = ((canvas.height / 2) * imgWidth) / (canvas.width / 2);
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      let positionX = 0; // Padding dari sisi kiri
      let positionY = 0; // Padding dari sisi atas
      const pageHeight = 295; // Tinggi halaman A4
      let pageCount = 0; // Hitung jumlah halaman yang telah ditambahkan

      // Tambahkan gambar ke halaman PDF
      const addImageToPDF = () => {
        doc.addImage(imgData, 'PNG', positionX, positionY, imgWidth, imgHeight);
        positionY -= pageHeight;
        pageCount++;
      };

      addImageToPDF(); // Tambahkan gambar ke halaman pertama

      // Tambahkan halaman baru jika kontennya lebih besar dari satu halaman
      while (positionY > -canvas.height && pageCount < 4) {
        doc.addPage();
        addImageToPDF();
      }

      doc.save(filename + '.pdf');
    });
  }
}
