$(async () => {
    // Fetch all quizes
    var resp = await fetch('/api/dashboard/');
    resp = await resp.json();

    console.log(resp)
    console.log(resp.easyQuestions)
    console.log(resp.easyQuestions[0])

    $("#totalUsers").text(resp.totalUsers) 
    $("#contactCounter").text(resp.contactCounter)
    $("#totalSolvedQuizes").text((resp.totalSolvedQuizes[1].count))

    $("#easyQuestions").text((resp.easyQuestions[1].count))
    $("#mediumQuestions").text((resp.mediumQuestions[0].count))
    $("#hardQuestions").text((resp.hardQuestions[0].count))


  })