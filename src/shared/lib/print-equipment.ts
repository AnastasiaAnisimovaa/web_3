import { Equipment } from '../types';

export const printEqupment = (equipmentList: Equipment[]) => {
  // Создаем HTML-шаблон с красивым оформлением
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Equipment Report</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
        
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3f51b5;
        }
        
        .title {
          font-size: 24px;
          font-weight: 500;
          color: #3f51b5;
          margin-bottom: 5px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #666;
        }
        
        .print-date {
          font-size: 12px;
          text-align: right;
          margin-bottom: 20px;
          color: #666;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        th {
          background-color: #3f51b5;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-weight: 500;
        }
        
        td {
          padding: 10px 8px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        tr:nth-child(even) {
          background-color: #f5f5f5;
        }
        
        tr:hover {
          background-color: #e8eaf6;
        }
        
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #3f51b5;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        
        .total {
          font-weight: 500;
          color: #3f51b5;
        }
        
        @media print {
          body {
            padding: 10px;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">Equipment Inventory Report</div>
        <div class="subtitle">Detailed equipment information</div>
      </div>
      
      <div class="print-date">
        Printed on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Release Date</th>
            <th>Software Start</th>
            <th>Software End</th>
            <th>Manufacturer</th>
            <th>Place</th>
            <th>Wave Radius</th>
          </tr>
        </thead>
        <tbody>
          ${equipmentList.map(equipment => `
            <tr>
              <td>${equipment.id}</td>
              <td>${equipment.name}</td>
              <td>${equipment.category}</td>
              <td>${formatDate(equipment.releaseDate)}</td>
              <td>${formatDate(equipment.sowftwareStartDate)}</td>
              <td>${formatDate(equipment.sowftwareEndDate)}</td>
              <td>${equipment.manufacturer}</td>
              <td>${equipment.place}</td>
              <td>${equipment.waveRadius ? equipment.waveRadius + ' m' : 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <div class="total">Total equipment: ${equipmentList.length}</div>
        <div class="print-actions no-print">
          <button onclick="window.print()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #3f51b5;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
          ">
            Print Report
          </button>
        </div>
      </div>
    </body>
    </html>
  `;

  // Функция для форматирования даты
  function formatDate(dateString: string) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString();
  }

  // Открываем новое окно с оформленным отчетом
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
};