const gen = (totalUsers) => {

  
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';
    
    // Pie Chart Example
    var ctx = document.getElementById("totalUsers");
    
      var totalUsers = totalUsers
};

$(async () => {
    // Fetch all quizes
    var resp = await fetch('/api/dashboard/');
    resp = await resp.json();
    console.log(resp);
    resp.totalMale
    console.log( resp.totalMale)
    gen(resp.totalMale);
  })