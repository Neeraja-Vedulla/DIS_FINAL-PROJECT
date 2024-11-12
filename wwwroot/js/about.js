document.addEventListener("DOMContentLoaded", function() {
    // Ensure modal is hidden initially on page load
    document.getElementById("chartModal").style.display = "none";

    // Attach click event listeners to chart wrappers to open the modal on click
    document.querySelectorAll(".chart-wrapper").forEach(chart => {
        chart.addEventListener("click", function() {
            const chartId = this.querySelector("canvas").id;
            openChartModal(chartId);
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to chart wrappers to open the modal on click
    document.querySelectorAll(".chart-wrapper").forEach(chart => {
        chart.addEventListener("click", function() {
            const chartId = this.querySelector("canvas").id;
            openChartModal(chartId);
        });
    });
});

// Function to create charts with realistic data
function createChart(canvasId, chartType, chartData, chartLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: chartType,
        data: {
            labels: chartData.labels,
            datasets: [{
                label: chartLabel,
                data: chartData.data,
                backgroundColor: chartData.colors,
                borderColor: chartData.borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: chartType === 'pie' ? {} : {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Realistic data for tourism-related visualizations
const monthlyArrivalsData = {
    label: "Monthly Tourist Arrivals",
    labels: ["January", "February", "March", "April", "May", "June"],
    data: [1500, 2000, 1800, 2200, 2500, 2700],
    colors: ["rgba(75, 192, 192, 0.2)"],
    borderColors: ["rgba(75, 192, 192, 1)"]
};

const topDestinationsData = {
    label: "Top Destinations by Visitors",
    labels: ["Paris", "New York", "Tokyo", "London"],
    data: [500, 450, 300, 250],
    colors: ["rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
    borderColors: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"]
};

const quarterlyRevenueData = {
    label: "Revenue Distribution",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    data: [30000, 45000, 50000, 60000],
    colors: ["rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 99, 132, 0.2)"],
    borderColors: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 99, 132, 1)"]
};

// Initialize small charts
createChart("chart1", "bar", monthlyArrivalsData, "Monthly Tourist Arrivals");
createChart("chart2", "line", topDestinationsData, "Top Destinations by Visitors");
createChart("chart3", "pie", quarterlyRevenueData, "Quarterly Revenue Distribution");

let modalChart = null;

function openChartModal(chartId) {
    const chartData = chartId === "chart1" ? monthlyArrivalsData :
                      chartId === "chart2" ? topDestinationsData :
                      quarterlyRevenueData;

    // Log the chartData to verify the structure
    console.log(chartData);

    if (modalChart) {
        modalChart.destroy();
    }

    modalChart = new Chart(document.getElementById("modalChart").getContext("2d"), {
        type: chartId === "chart1" ? "bar" : chartId === "chart2" ? "line" : "pie",
        data: {
            labels: chartData.labels,
            datasets: [{
                label: chartData.label,
                data: chartData.data,
                backgroundColor: chartData.colors,
                borderColor: chartData.borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: chartId === "pie" ? {} : {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById("chartModal").style.display = "flex";
}

function closeChartModal() {
    document.getElementById("chartModal").style.display = "none";

    if (modalChart) {
        modalChart.destroy();
        modalChart = null;
    }
}
