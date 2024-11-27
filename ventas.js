// Datos de ejemplo (simulados)
const salesData = [
    { date: '2024-11-01', category: 'Electronics', totalSales: 200 },
    { date: '2024-11-02', category: 'Fashion', totalSales: 150 },
    { date: '2024-11-03', category: 'Home', totalSales: 120 },
    { date: '2024-11-04', category: 'Electronics', totalSales: 180 },
    { date: '2024-11-05', category: 'Fashion', totalSales: 200 },
    { date: '2024-11-06', category: 'Home', totalSales: 250 },
  ];
  
  let filteredSales = salesData; // Sales data after filter
  
  // Inicializa el gráfico
  function loadChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const chartData = {
      labels: filteredSales.map(sale => sale.date),
      datasets: [{
        label: 'Ventas Totales',
        data: filteredSales.map(sale => sale.totalSales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }],
    };
  
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Ventas Totales'
            }
          }
        }
      }
    });
  }
  
  // Filtro de ventas basado en parámetros
  function filterSales() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
  
    filteredSales = salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      const start = startDate ? new Date(startDate) : new Date('2000-01-01');
      const end = endDate ? new Date(endDate) : new Date();
  
      const categoryMatch = categoryFilter ? sale.category === categoryFilter : true;
      return saleDate >= start && saleDate <= end && categoryMatch;
    });
  
    loadChart(); // Recargar gráfico con datos filtrados
  }
  
  // Exportar datos a Excel
  function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredSales);
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.writeFile(wb, 'Ventas_Informe.xlsx');
  }
  
  // Exportar datos a PDF
  function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.text('Informe de Ventas', 20, 10);
    doc.autoTable({
      head: [['Fecha', 'Categoría', 'Ventas Totales']],
      body: filteredSales.map(sale => [sale.date, sale.category, sale.totalSales]),
    });
  
    doc.save('Ventas_Informe.pdf');
  }
  
  // Cargar el gráfico al iniciar la página
  document.addEventListener('DOMContentLoaded', loadChart);
  