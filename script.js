// Add this to the existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    // ... (keep existing code)

    // Earnings functionality
    const viewDetailedEarnings = document.getElementById('viewDetailedEarnings');
    const earningsModal = new bootstrap.Modal(document.getElementById('earningsModal'));
    const exportReport = document.getElementById('exportReport');

    // Sample data (replace with actual data in a real application)
    const earningsData = {
        totalEarnings: 1000,
        totalCosts: 500,
        netBalance: 500,
        breakdown: {
            costs: [
                { name: 'LLM Usage', amount: 200 },
                { name: 'Tool Subscriptions', amount: 150 },
                { name: 'Infrastructure', amount: 150 }
            ],
            earnings: [
                { name: 'Affiliate Revenue', amount: 400 },
                { name: 'Agent Usage', amount: 600 }
            ]
        },
        monthlyData: [
            { month: 'Jan', earnings: 800, costs: 400 },
            { month: 'Feb', earnings: 900, costs: 450 },
            { month: 'Mar', earnings: 1000, costs: 500 }
        ]
    };

    function updateEarningsSummary() {
        document.getElementById('totalEarnings').textContent = `$${earningsData.totalEarnings.toFixed(2)}`;
        document.getElementById('totalCosts').textContent = `$${earningsData.totalCosts.toFixed(2)}`;
        document.getElementById('netBalance').textContent = `$${earningsData.netBalance.toFixed(2)}`;
    }

    function renderEarningsBreakdown() {
        const breakdownTab = document.getElementById('breakdown');
        let costsHtml = '<h6>Costs</h6><ul>';
        earningsData.breakdown.costs.forEach(item => {
            costsHtml += `<li>${item.name}: $${item.amount.toFixed(2)}</li>`;
        });
        costsHtml += '</ul>';

        let earningsHtml = '<h6>Earnings</h6><ul>';
        earningsData.breakdown.earnings.forEach(item => {
            earningsHtml += `<li>${item.name}: $${item.amount.toFixed(2)}</li>`;
        });
        earningsHtml += '</ul>';

        breakdownTab.innerHTML = costsHtml + earningsHtml;
    }

    function renderEarningsChart() {
        const ctx = document.getElementById('earningsChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: earningsData.monthlyData.map(d => d.month),
                datasets: [
                    {
                        label: 'Earnings',
                        data: earningsData.monthlyData.map(d => d.earnings),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Costs',
                        data: earningsData.monthlyData.map(d => d.costs),
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    viewDetailedEarnings.addEventListener('click', () => {
        renderEarningsBreakdown();
        renderEarningsChart();
        earningsModal.show();
    });

    exportReport.addEventListener('click', () => {
        // Implement report export functionality
        console.log('Exporting earnings report...');
        // You would typically generate a PDF or CSV here
    });

    // Initialize earnings summary
    updateEarningsSummary();

    // ... (keep the rest of the existing code)
});