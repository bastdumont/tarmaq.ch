/**
 * Dashboard Module
 * Handles dashboard data visualization and real-time updates
 */

class Dashboard {
  constructor() {
    this.charts = {};
    this.data = {};
    this.updateInterval = null;
    this.updateFrequency = 60000; // 1 minute
  }

  /**
   * Initialize dashboard
   */
  async init() {
    // Initialize countdown timer
    this.initCountdown();

    // Initialize all KPIs to zero first
    this.initializeMetricsToZero();
    this.hideLoading();

    // Try to initialize Airtable API (optional for now)
    const initialized = await airtableAPI.init();
    
    // Setup event listeners
    this.setupEventListeners();

    // Load data if API is initialized, otherwise use zeros
    if (initialized) {
      await this.loadData();
      // Start auto-refresh only if API is working
      this.startAutoRefresh();
    } else {
      // Show error but allow dashboard to work with zero values
      console.warn('Airtable API not initialized - using zero values');
      // Initialize charts with zero data
      this.updateCharts();
    }

    return true;
  }

  /**
   * Initialize countdown timer to February 1, 2026
   */
  initCountdown() {
    const targetDate = new Date('2026-02-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // Target date has passed
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        document.getElementById('countdown-seconds').textContent = '0';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('countdown-days').textContent = days;
      document.getElementById('countdown-hours').textContent = hours;
      document.getElementById('countdown-minutes').textContent = minutes;
      document.getElementById('countdown-seconds').textContent = seconds;
    };

    // Update immediately
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
  }

  /**
   * Initialize all metrics to zero
   */
  initializeMetricsToZero() {
    // Set all metric cards to zero
    document.getElementById('participantsCount').textContent = '0';
    document.getElementById('programsCount').textContent = '0';
    document.getElementById('partnersCount').textContent = '0';
    document.getElementById('fundingAmount').textContent = '0 CHF';

    // Clear trends
    document.getElementById('participantsTrend').textContent = '';
    document.getElementById('programsTrend').textContent = '';
    document.getElementById('partnersTrend').textContent = '';
    document.getElementById('fundingTrend').textContent = '';

    // Initialize empty data structure
    this.data = {
      participants: [],
      programs: [],
      partners: [],
      donations: [],
      applications: [],
      events: [],
      kpis: [],
    };
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Refresh button
    document.getElementById('refreshData').addEventListener('click', () => {
      this.loadData();
    });

    // Export PDF
    document.getElementById('exportPDF').addEventListener('click', () => {
      this.exportPDF();
    });

    // Export CSV
    document.getElementById('exportCSV').addEventListener('click', () => {
      this.exportCSV();
    });
  }

  /**
   * Show error message
   */
  showError(message) {
    const errorEl = document.getElementById('errorMessage');
    const errorTextEl = document.getElementById('errorText');
    errorTextEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  /**
   * Hide error message
   */
  hideError() {
    document.getElementById('errorMessage').classList.add('hidden');
  }

  /**
   * Show loading state
   */
  showLoading() {
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('dashboardContent').classList.add('hidden');
  }

  /**
   * Hide loading state
   */
  hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('dashboardContent').classList.remove('hidden');
  }

  /**
   * Load all dashboard data from Airtable
   */
  async loadData() {
    this.hideError();

    try {
      // Load KPIs table first (primary data source)
      const kpisData = await this.loadKPIs();

      // Load data from multiple tables
      const [
        participants,
        programs,
        partners,
        donations,
        applications,
        events,
      ] = await Promise.all([
        this.loadParticipants(),
        this.loadPrograms(),
        this.loadPartners(),
        this.loadDonations(),
        this.loadApplications(),
        this.loadEvents(),
      ]);

      // Store data
      this.data = {
        participants,
        programs,
        partners,
        donations,
        applications,
        events,
        kpis: kpisData,
      };

      // Update metrics
      this.updateMetrics();

      // Update charts
      this.updateCharts();

      // Update data table
      this.updateDataTable();
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Don't show error, just use zero values
      console.log('Using zero values due to error');
      this.initializeMetricsToZero();
      this.updateCharts();
    }
  }

  /**
   * Load KPIs from Airtable
   */
  async loadKPIs() {
    try {
      const data = await airtableAPI.getRecords('KPIs', {
        sort: [{ field: 'date', direction: 'desc' }],
        maxRecords: 100,
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load KPIs:', error);
      return [];
    }
  }

  /**
   * Load participants data
   */
  async loadParticipants() {
    try {
      // Try to get from KPIs table, or calculate from applications
      const data = await airtableAPI.getRecords('KPIs', {
        filterByFormula: "{Type} = 'Participants'",
        sort: [{ field: 'Date', direction: 'desc' }],
      });
      return data.records || [];
    } catch (error) {
      // Fallback: try Applications table
      try {
        const data = await airtableAPI.getRecords('Applications', {
          maxRecords: 1000,
        });
        return data.records || [];
      } catch (e) {
        console.warn('Could not load participants:', e);
        return [];
      }
    }
  }

  /**
   * Load programs data
   */
  async loadPrograms() {
    try {
      const data = await airtableAPI.getRecords('Programs', {
        sort: [{ field: 'Created', direction: 'desc' }],
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load programs:', error);
      return [];
    }
  }

  /**
   * Load partners data
   */
  async loadPartners() {
    try {
      const data = await airtableAPI.getRecords('Partners', {
        sort: [{ field: 'Created', direction: 'desc' }],
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load partners:', error);
      return [];
    }
  }

  /**
   * Load donations data
   */
  async loadDonations() {
    try {
      const data = await airtableAPI.getRecords('Donations', {
        sort: [{ field: 'Date', direction: 'desc' }],
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load donations:', error);
      return [];
    }
  }

  /**
   * Load applications data
   */
  async loadApplications() {
    try {
      const data = await airtableAPI.getRecords('Applications', {
        sort: [{ field: 'Created', direction: 'desc' }],
        maxRecords: 100,
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load applications:', error);
      return [];
    }
  }

  /**
   * Load events data
   */
  async loadEvents() {
    try {
      const data = await airtableAPI.getRecords('Events', {
        sort: [{ field: 'Date', direction: 'desc' }],
      });
      return data.records || [];
    } catch (error) {
      console.warn('Could not load events:', error);
      return [];
    }
  }

  /**
   * Update metric cards
   */
  updateMetrics() {
    // Try to get values from KPIs table first, then fallback to counting records
    const kpis = this.data.kpis || [];

    // Find KPI values
    const participantsKPI = kpis.find(
      (k) => k.fields?.metric_name?.toLowerCase().includes('participant') ||
            k.fields?.category === 'Community'
    );
    const programsKPI = kpis.find(
      (k) => k.fields?.metric_name?.toLowerCase().includes('program') ||
            k.fields?.category === 'Programs'
    );
    const partnersKPI = kpis.find(
      (k) => k.fields?.metric_name?.toLowerCase().includes('partner')
    );
    const fundingKPI = kpis.find(
      (k) => k.fields?.metric_name?.toLowerCase().includes('funding') ||
            k.fields?.metric_name?.toLowerCase().includes('donation')
    );

    // Participants count
    const participantsCount = participantsKPI?.fields?.value ||
      this.data.participants?.length ||
      this.data.applications?.length ||
      0;
    document.getElementById('participantsCount').textContent =
      participantsCount.toLocaleString();

    // Programs count
    const programsCount = programsKPI?.fields?.value ||
      this.data.programs?.length ||
      0;
    document.getElementById('programsCount').textContent =
      programsCount.toLocaleString();

    // Partners count
    const partnersCount = partnersKPI?.fields?.value ||
      this.data.partners?.length ||
      0;
    document.getElementById('partnersCount').textContent =
      partnersCount.toLocaleString();

    // Funding amount
    const fundingAmount = fundingKPI?.fields?.value || this.calculateFunding();
    document.getElementById('fundingAmount').textContent =
      fundingAmount > 0
        ? `${fundingAmount.toLocaleString()} CHF`
        : '0 CHF';

    // Show trends if available
    if (participantsKPI?.fields?.trend) {
      const trend = participantsKPI.fields.trend;
      const icon = trend === 'Up' ? '↑' : trend === 'Down' ? '↓' : '→';
      document.getElementById('participantsTrend').textContent = icon;
    }

    if (programsKPI?.fields?.trend) {
      const trend = programsKPI.fields.trend;
      const icon = trend === 'Up' ? '↑' : trend === 'Down' ? '↓' : '→';
      document.getElementById('programsTrend').textContent = icon;
    }

    if (partnersKPI?.fields?.trend) {
      const trend = partnersKPI.fields.trend;
      const icon = trend === 'Up' ? '↑' : trend === 'Down' ? '↓' : '→';
      document.getElementById('partnersTrend').textContent = icon;
    }

    if (fundingKPI?.fields?.trend) {
      const trend = fundingKPI.fields.trend;
      const icon = trend === 'Up' ? '↑' : trend === 'Down' ? '↓' : '→';
      document.getElementById('fundingTrend').textContent = icon;
    }
  }

  /**
   * Calculate total funding from donations
   */
  calculateFunding() {
    if (!this.data.donations || this.data.donations.length === 0) {
      return 0;
    }

    return this.data.donations.reduce((total, record) => {
      const amount = record.fields?.Amount || record.fields?.Montant || 0;
      return total + (typeof amount === 'number' ? amount : 0);
    }, 0);
  }

  /**
   * Update all charts
   */
  updateCharts() {
    this.updateCommunityGrowthChart();
    this.updateProgramPerformanceChart();
    this.updateEngagementChart();
    this.updateFundingChart();
    this.updateMonthlyTrendsChart();
  }

  /**
   * Community Growth Chart (Line Chart)
   */
  updateCommunityGrowthChart() {
    const ctx = document.getElementById('communityGrowthChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (this.charts.communityGrowth) {
      this.charts.communityGrowth.destroy();
    }

    // Prepare data
    const labels = this.generateMonthLabels(6);
    const data = this.data.participants?.length > 0 || this.data.applications?.length > 0
      ? this.generateMonthlyData(
          this.data.participants || this.data.applications || [],
          labels
        )
      : new Array(labels.length).fill(0); // Initialize with zeros

    this.charts.communityGrowth = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Nouveaux participants',
            data,
            borderColor: '#DA2F2C',
            backgroundColor: 'rgba(218, 47, 44, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Program Performance Chart (Bar Chart)
   */
  updateProgramPerformanceChart() {
    const ctx = document.getElementById('programPerformanceChart');
    if (!ctx) return;

    if (this.charts.programPerformance) {
      this.charts.programPerformance.destroy();
    }

    const programs = this.data.programs || [];
    const labels = programs.length > 0
      ? programs.slice(0, 5).map((p) => p.fields?.title || p.fields?.Name || 'Programme')
      : ['Programme A', 'Programme B', 'Programme C'];
    const data = programs.length > 0
      ? programs.slice(0, 5).map(() => 0) // Initialize with zeros
      : [0, 0, 0];

    this.charts.programPerformance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Participants',
            data,
            backgroundColor: '#DA2F2C',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Engagement Chart (Doughnut Chart)
   */
  updateEngagementChart() {
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;

    if (this.charts.engagement) {
      this.charts.engagement.destroy();
    }

    const participants = this.data.participants?.length || this.data.applications?.length || 0;
    const programs = this.data.programs?.length || 0;
    const events = this.data.events?.length || 0;

    this.charts.engagement = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Participants', 'Programmes', 'Événements'],
        datasets: [
          {
            data: [participants, programs, events],
            backgroundColor: [
              '#DA2F2C',
              '#111827',
              '#F3F4F6',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  /**
   * Funding Progress Chart (Line Chart)
   */
  updateFundingChart() {
    const ctx = document.getElementById('fundingChart');
    if (!ctx) return;

    if (this.charts.funding) {
      this.charts.funding.destroy();
    }

    const labels = this.generateMonthLabels(6);
    const donations = this.data.donations || [];
    const data = donations.length > 0
      ? this.generateMonthlyFundingData(donations, labels)
      : new Array(labels.length).fill(0); // Initialize with zeros

    this.charts.funding = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Financement (CHF)',
            data,
            borderColor: '#DA2F2C',
            backgroundColor: 'rgba(218, 47, 44, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Monthly Trends Chart (Multi-line Chart)
   */
  updateMonthlyTrendsChart() {
    const ctx = document.getElementById('monthlyTrendsChart');
    if (!ctx) return;

    if (this.charts.monthlyTrends) {
      this.charts.monthlyTrends.destroy();
    }

    const labels = this.generateMonthLabels(12);
    const participantsData = this.data.participants?.length > 0 || this.data.applications?.length > 0
      ? this.generateMonthlyData(
          this.data.participants || this.data.applications || [],
          labels
        )
      : new Array(labels.length).fill(0); // Initialize with zeros
    const programsData = this.data.programs?.length > 0
      ? this.generateMonthlyData(this.data.programs || [], labels)
      : new Array(labels.length).fill(0); // Initialize with zeros

    this.charts.monthlyTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Participants',
            data: participantsData,
            borderColor: '#DA2F2C',
            backgroundColor: 'rgba(218, 47, 44, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Programmes',
            data: programsData,
            borderColor: '#111827',
            backgroundColor: 'rgba(17, 24, 39, 0.1)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /**
   * Generate month labels
   */
  generateMonthLabels(count) {
    const labels = [];
    const now = new Date();
    const monthNames = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jun',
      'Juil',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];

    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(
        `${monthNames[date.getMonth()]} ${date.getFullYear()}`
      );
    }

    return labels;
  }

  /**
   * Generate monthly data from records
   */
  generateMonthlyData(records, labels) {
    const data = new Array(labels.length).fill(0);
    const now = new Date();

    records.forEach((record) => {
      const dateStr =
        record.fields?.Date ||
        record.fields?.Created ||
        record.createdTime;
      if (!dateStr) return;

      const recordDate = new Date(dateStr);
      const monthDiff =
        (now.getFullYear() - recordDate.getFullYear()) * 12 +
        (now.getMonth() - recordDate.getMonth());

      if (monthDiff >= 0 && monthDiff < labels.length) {
        data[labels.length - 1 - monthDiff]++;
      }
    });

    return data;
  }

  /**
   * Generate monthly funding data
   */
  generateMonthlyFundingData(donations, labels) {
    const data = new Array(labels.length).fill(0);
    const now = new Date();

    donations.forEach((record) => {
      const dateStr = record.fields?.Date || record.createdTime;
      if (!dateStr) return;

      const recordDate = new Date(dateStr);
      const monthDiff =
        (now.getFullYear() - recordDate.getFullYear()) * 12 +
        (now.getMonth() - recordDate.getMonth());

      if (monthDiff >= 0 && monthDiff < labels.length) {
        const amount = record.fields?.Amount || record.fields?.Montant || 0;
        data[labels.length - 1 - monthDiff] +=
          typeof amount === 'number' ? amount : 0;
      }
    });

    return data;
  }

  /**
   * Update data table
   */
  updateDataTable() {
    const tbody = document.getElementById('dataTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Combine recent data
    const allRecords = [
      ...(this.data.donations?.slice(0, 10) || []),
      ...(this.data.applications?.slice(0, 10) || []),
      ...(this.data.events?.slice(0, 10) || []),
      ...(this.data.kpis?.slice(0, 10) || []),
    ];

    if (allRecords.length === 0) {
      // Show empty state
      const row = document.createElement('tr');
      row.innerHTML = `
        <td colspan="4" class="px-4 py-8 text-center text-gray-500">
          Aucune donnée disponible pour le moment
        </td>
      `;
      tbody.appendChild(row);
      return;
    }

    allRecords
      .sort((a, b) => {
        const dateA = new Date(
          a.fields?.date || a.fields?.Date || a.fields?.donation_date || a.createdTime
        ).getTime();
        const dateB = new Date(
          b.fields?.date || b.fields?.Date || b.fields?.donation_date || b.createdTime
        ).getTime();
        return dateB - dateA;
      })
      .slice(0, 20)
      .forEach((record) => {
        const row = document.createElement('tr');
        const date = new Date(
          record.fields?.date || record.fields?.Date || record.fields?.donation_date || record.createdTime
        ).toLocaleDateString('fr-FR');
        const type =
          record.fields?.metric_name ||
          record.fields?.Type ||
          (record.fields?.applicant_name ? 'Application' : 'KPI');
        const value =
          record.fields?.value ||
          record.fields?.amount ||
          record.fields?.amount_chf ||
          record.fields?.applicant_name ||
          '—';
        const status = record.fields?.status || record.fields?.Status || 'Actif';

        row.innerHTML = `
          <td class="px-4 py-3">${date}</td>
          <td class="px-4 py-3">${type}</td>
          <td class="px-4 py-3">${value}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded-full text-xs ${
              status === 'Actif' || status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }">${status}</span>
          </td>
        `;

        tbody.appendChild(row);
      });
  }

  /**
   * Start auto-refresh
   */
  startAutoRefresh() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      this.loadData();
    }, this.updateFrequency);
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Export dashboard as PDF
   */
  async exportPDF() {
    const button = document.getElementById('exportPDF');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Génération...';

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('landscape', 'mm', 'a4');

      // Capture dashboard content
      const element = document.getElementById('dashboardContent');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`tarmaq-dashboard-${new Date().toISOString().split('T')[0]}.pdf`);

      button.innerHTML = '<i class="fas fa-file-pdf mr-2"></i>Export PDF';
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Erreur lors de l\'export PDF');
      button.innerHTML = '<i class="fas fa-file-pdf mr-2"></i>Export PDF';
    } finally {
      button.disabled = false;
    }
  }

  /**
   * Export dashboard data as CSV
   */
  exportCSV() {
    const button = document.getElementById('exportCSV');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Génération...';

    try {
      // Collect all data
      const csvData = [];
      csvData.push(['Type', 'Date', 'Valeur', 'Statut']);

      // Add donations
      (this.data.donations || []).forEach((record) => {
        csvData.push([
          'Donation',
          new Date(record.fields?.Date || record.createdTime).toLocaleDateString('fr-FR'),
          record.fields?.Amount || record.fields?.Montant || 0,
          record.fields?.Status || 'Actif',
        ]);
      });

      // Add applications
      (this.data.applications || []).forEach((record) => {
        csvData.push([
          'Application',
          new Date(record.createdTime).toLocaleDateString('fr-FR'),
          record.fields?.Name || '—',
          record.fields?.Status || 'Actif',
        ]);
      });

      // Convert to CSV string
      const csvContent = csvData
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n');

      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `tarmaq-dashboard-${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      button.innerHTML = '<i class="fas fa-file-csv mr-2"></i>Export CSV';
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Erreur lors de l\'export CSV');
      button.innerHTML = '<i class="fas fa-file-csv mr-2"></i>Export CSV';
    } finally {
      button.disabled = false;
    }
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const dashboard = new Dashboard();
  await dashboard.init();
});

