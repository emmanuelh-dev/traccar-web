import React, { useCallback, useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { CircularProgress, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const PDFDownloadButton = ({ positions, deviceName }) => {
  const [generando, setGenerando] = useState(false);

  const handleDownload = useCallback(() => {
    setGenerando(true);
    const doc = new jsPDF();
    const totalPositions = positions.length;

    doc.setFontSize(24);
    doc.setTextColor(0, 0, 255);
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Reporte GPS", 10, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${totalPositions} Movimientos.`, 10, 40);
    doc.text(`Unidad: ${deviceName}`, 10, 46);

    const pageWidth = doc.internal.pageSize.width;
    doc.text(`${new Date(positions[0].fixTime).toLocaleString()}`, pageWidth - 10, 40, { align: 'right' });
    doc.text("al", pageWidth - 10, 46, { align: 'right' });
    doc.text(`${new Date(positions[positions.length - 1].fixTime).toLocaleString()}`, pageWidth - 10, 52, { align: 'right' });

    const tableData = positions.map(position => [
      String(position.speed),
      new Date(position.fixTime).toLocaleString(),
      `${position.latitude}, ${position.longitude}`,
      position.attributes.bleTemp1 ?
        `${Math.round(position.attributes.bleTemp1)}° / ${Math.round((Math.round(position.attributes.bleTemp1) * (9 / 5)) + 32)}°` :
        '',
      String(position.attributes.totalDistance)
    ]);

    autoTable(doc, {
      head: [['KM/H', 'Fecha/Hora', 'Lat, Lon', 'Temp', 'Km']],
      body: tableData,
      startY: 60,
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          const cell = data.cell;
          const cellText = String(cell.text);
          doc.setTextColor(0, 0, 255);
          doc.textWithLink(cellText, cell.x + 1, cell.y + 3.2, {
            url: `https://www.google.com.mx/maps/place/${cellText}`
          });
          doc.setTextColor(0, 0, 0);
        }
      },
      didDrawPage: function(data) {
        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        
        // Logo/company name on the left
        doc.text('byxmax.com', 10, pageHeight - 10);
        
        // Pages on the right
        const pages = ['Inicio', 'Nosotros', 'Servicios', 'Contacto'];
        const pageWidth = doc.internal.pageSize.width;
        const pagesText = pages.join(' | ');
        doc.text(pagesText, pageWidth - 10, pageHeight - 10, { align: 'right' });
        
        // Page number in center (optional - you can remove if not needed)
        doc.text(`${data.pageNumber} / ${doc.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }
    });

    doc.save(`Reporte ${new Date(positions[0].fixTime).toLocaleString()} - ${new Date(positions[positions.length - 1].fixTime).toLocaleString()} .pdf`);
    setGenerando(false);
  }, [positions, deviceName]);

  return (
    <IconButton onClick={handleDownload} disabled={generando}>
      {generando ? <CircularProgress /> : <DownloadIcon />}
    </IconButton>
  );
};

export default PDFDownloadButton;