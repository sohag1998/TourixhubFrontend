$(document).ready(function () {
  $("#hamburMenuIcon").click(function () {
    $(".sm-nav-bar").toggleClass("smNav");
  });
  $("#hamburMenuIconClose").click(function () {
    $(".sm-nav-bar").toggleClass("smNav");
  });
  //Call api to get questions
  $.get(
    "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&page=1&pagesize=100",
    function (data, status) {
      const questions = data.items;
      $.each(questions, function (key, question) {
        let diffTimeDate = "";
        const timestmp = question.creation_date;
        const givenDate = new Date(timestmp * 1000);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - givenDate.getTime();
        const differenceInDays = Math.abs(
          differenceInTime / (1000 * 3600 * 24)
        );
        // console.log(`Difference in days: ${Math.abs(differenceInDays)}`);

        if (differenceInDays >= 365) {
          if (Math.round(differenceInDays / 365) > 1)
            diffTimeDate += Math.round(differenceInDays / 365) + " Years ago";
          else diffTimeDate += Math.round(differenceInDays / 365) + " Year ago";
        } else if (differenceInDays < 365 && differenceInDays >= 30) {
          if (Math.round(differenceInDays / 30) > 1)
            diffTimeDate += Math.round(differenceInDays / 30) + " Months ago";
          else diffTimeDate += Math.round(differenceInDays / 30) + " Month ago";
        } else if (differenceInDays >= 7) {
          if (Math.round(differenceInDays / 7) > 1)
            diffTimeDate += Math.round(differenceInDays / 7) + " Weeks ago";
          else diffTimeDate += Math.round(differenceInDays / 7) + " Week ago";
        } else if (differenceInDays < 7 && differenceInDays >= 1) {
          if (Math.round(differenceInDays) > 1)
            diffTimeDate += Math.round(differenceInDays) + " Days ago";
          else diffTimeDate += Math.round(differenceInDays) + " Day ago";
        } else if (differenceInDays * 24 >= 1 && differenceInDays * 24 < 24) {
          if (Math.round(differenceInDays * 24) > 1)
            diffTimeDate += Math.round(differenceInDays * 24) + " Hours ago";
          else diffTimeDate += Math.round(differenceInDays * 24) + " Hour ago";
        } else if (differenceInDays * 24 * 60 < 60) {
          if (Math.round(differenceInDays * 24 * 60) > 1)
            diffTimeDate +=
              Math.round(differenceInDays * 24 * 60) + " Minutes ago";
          else
            diffTimeDate +=
              Math.round(differenceInDays * 24 * 60) + " Minute ago";
        }
        let tagsHTML = "";
        $.each(question.tags, function (key, tag) {
          tagsHTML += `<button class="tagBtn smTagBtn">${tag}</button>`;
        });
        $(".question-area").append(`
        <div class="question-card">
           <a href="${question.link}"> <h3>${question.title}</h3></a>
            <div class="single-question-tags">
                ${tagsHTML}
            </div>
            <div
                class="question-identity"
            >
                <div class="user-info d-flex align-items-center justify-content-between">
                <img src="${question.owner["profile_image"]}"/>
                <span class="user-name">${question.owner["display_name"]}</span>
                -
                <span>asked ${diffTimeDate}</span>
                </div>
                <div class="question-info d-flex align-items-center justify-content-between">
                <span class="votes"
                    ><i class="bi bi-hand-thumbs-up"></i> ${question.score} Score</span
                >
                <span class="anwers"><i class="bi bi-chat"></i> ${question.answer_count} Answers</span>
                <span class="views"><i class="bi bi-eye"></i> ${question.view_count} Views</span>
                </div>
            </div>
        </div>
            
            `);
      });
    }
  );
  //call api to get top 4 questions
  $.get(
    "https://api.stackexchange.com/2.3/questions?pagesize=4&order=desc&sort=hot&site=stackoverflow",
    function (data, status) {
      const questions = data.items;
      $.each(questions, function (key, question) {
        $(".tpquestion-wraper").append(`
          <div class="sp-top-question">
            <a href="${question.link}">
              <p class="qtext">
                ${question.title}
              </p>
              <i class="bi bi-arrow-right-short"></i>
            </a>
          </div>
          `);
      });
    }
  );

  $.get(
    "https://api.stackexchange.com/2.3/tags?pagesize=5&order=desc&sort=popular&site=stackoverflow",
    function (data, status) {
      const tags = data.items;
      $.each(tags, function (key, tag) {
        $(".pptag-warper").append(`
          <div class="pps-tag">
            <div>
              <button class="tagBtn smTagBtn">${tag.name}</button>
            </div>
            <span>${tag.count}</span>
          </div>
          
          `);
      });
    }
  );
});
