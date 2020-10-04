
const gen = (male ,female) => {

  
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");

  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["גברים", "נשים"],
      datasets: [{
        data: [male, female],
        backgroundColor: ['#4e73df', '#f50ca7'],
        hoverBackgroundColor: ['#2e59d9', '#c9168d'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });

}

$(async () => {
  // Fetch all quizes
  var resp = await fetch('/api/dashboard/');
  resp = await resp.json();
  console.log(resp);
  resp.totalMale
  console.log( resp.totalMale)
  gen(resp.totalMales,resp.totalFemales);
})
