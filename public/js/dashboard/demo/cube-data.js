$(async () => {
    // Fetch all quizes
    var resp = await fetch('/api/dashboard/');
    resp = await resp.json();

    const easyQuestions = Number(resp.easyQuestions[1].count)
    const mediumQuestions = Number(resp.mediumQuestions[0].count)
    const hardQuestions = Number(resp.hardQuestions[0].count)
    const totalQuestions = easyQuestions + mediumQuestions + hardQuestions

    const widthEasy = (easyQuestions / totalQuestions ) * 100
    const widthMedium = (mediumQuestions / totalQuestions ) * 100
    const widthHard = (hardQuestions / totalQuestions ) * 100







    $("#totalUsers").text(resp.totalUsers) 
    $("#contactCounter").text(resp.contactCounter)
    $("#totalSolvedQuizes").text((resp.totalSolvedQuizes[1].count))

    $("#easyQuestions").text(easyQuestions)
    $("#mediumQuestions").text(mediumQuestions)
    $("#hardQuestions").text(hardQuestions)
    
    $("#widthEasy").css('width',String(widthEasy) +'%')
    $("#widthMedium").css('width',String(widthMedium) +'%')
    $("#widthHard").css('width',String(widthHard) +'%')
  
  })