$(async () => {
    // Fetch all quizes
    var resp = await fetch('/api/dashboard/');
    resp = await resp.json();

    $("#totalUsers").text(resp.totalUsers) 
    $("#contactCounter").text(resp.contactCounter)


  })