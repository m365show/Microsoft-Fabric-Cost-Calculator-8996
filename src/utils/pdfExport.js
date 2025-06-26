import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, filename = 'fabric-cost-estimate.pdf', options = {}) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: options.darkMode ? '#1f2937' : '#ffffff',
      ...options.canvasOptions
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateCostReportPDF = async (data, darkMode = false) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set colors based on theme
    const primaryColor = darkMode ? '#ffffff' : '#1f2937';
    const secondaryColor = darkMode ? '#9ca3af' : '#6b7280';
    const accentColor = '#3b82f6';

    // Add logo
    const logoUrl = 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1750769009303-httpssubstack-post-media.s3.amaz.jpg';
    try {
      pdf.addImage(logoUrl, 'PNG', 15, 15, 20, 20);
    } catch (e) {
      console.warn('Could not add logo to PDF');
    }

    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(accentColor);
    pdf.text('Microsoft Fabric Cost Estimate', 45, 25);

    // Subtitle
    pdf.setFontSize(12);
    pdf.setTextColor(secondaryColor);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 45, 32);

    let yPos = 50;

    // Configuration Section
    pdf.setFontSize(16);
    pdf.setTextColor(primaryColor);
    pdf.text('Configuration', 15, yPos);
    yPos += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(secondaryColor);
    pdf.text(`Capacity: ${data.capacity}`, 20, yPos);
    yPos += 7;
    pdf.text(`Region: ${data.region}`, 20, yPos);
    yPos += 15;

    // Cost Summary
    pdf.setFontSize(16);
    pdf.setTextColor(primaryColor);
    pdf.text('Cost Summary', 15, yPos);
    yPos += 10;

    // Capacity Cost
    pdf.setFontSize(12);
    pdf.setTextColor(secondaryColor);
    pdf.text(`Capacity Cost: $${data.capacityCost.toLocaleString()}`, 20, yPos);
    yPos += 7;

    // Workload Costs
    if (data.workloads && data.workloads.length > 0) {
      pdf.text('Workload Costs:', 20, yPos);
      yPos += 7;

      data.workloads.forEach(workload => {
        const workloadName = workload.name.replace(/([A-Z])/g, ' $1').trim();
        pdf.text(`  • ${workloadName}: $${workload.cost.toLocaleString()} (${workload.usage.toLocaleString()} units)`, 25, yPos);
        yPos += 6;
      });
      yPos += 5;
    }

    // Total Cost
    pdf.setFontSize(14);
    pdf.setTextColor(accentColor);
    pdf.text(`Total Monthly Cost: $${data.totalCost.toLocaleString()}`, 20, yPos);
    yPos += 15;

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(secondaryColor);
    pdf.text('This estimate is based on current Microsoft Fabric pricing and may vary.', 15, 280);
    pdf.text('Please consult official Microsoft documentation for the most accurate pricing.', 15, 285);

    // Save
    const filename = `fabric-cost-estimate-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating cost report PDF:', error);
    throw error;
  }
};