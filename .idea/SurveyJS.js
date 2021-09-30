function startTimer(duration, display) {

    let timer = duration, minutes, seconds;

    setInterval(function () {

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            window.location.href = "TimeUp.html";
        }
    }, 1000);
}

window.onload = function () {
    let fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};


function removeNextButton(button)
{
    button.disabled=true;
    button.hidden=true;
}

function look_for_Questions(questionBoxes,buttons)
{
    let complete;
    let questionNum=0;
    let Qanswers = Math.trunc(buttons.length/questionBoxes.length);

    switch (sectionsCompleted)
    {
        case 8:
            Qanswers=2;

            for(let i=0; i<=buttons.length-Qanswers; i+=Qanswers)
            {
                questionNum++;
                complete=false;

                findUnanswered(i,i+Qanswers,buttons,complete,questionBoxes,questionNum,sectionsCompleted);
            }
            break;

        case 4:
            for(let i=0; i<=buttons.length-Qanswers; i+=Qanswers)
            {
                questionNum++;
                complete=false;

                if(questionNum<3)
                {
                    findUnanswered(i, i+Qanswers,buttons,complete,questionBoxes,questionNum)
                }
                else if(questionNum===3)
                {
                    findUnanswered(i,7,buttons,complete,questionBoxes,questionNum)
                }
                else
                {
                    findUnanswered(i+1, i+Qanswers+1,buttons,complete,questionBoxes,questionNum)
                }
            }
            break;

        default :
            for(let i=0; i<=buttons.length-Qanswers; i+=Qanswers)
            {
                questionNum++;
                complete=false;

                findUnanswered(i,i+Qanswers,buttons,complete,questionBoxes,questionNum)
            }
            break;
    }
}

function findUnanswered(i,stop,buttons,complete,questionBoxes,qNum,sectionsCompleted)
{
    for(let j=i; j<stop; j++)
    {
        if(buttons[j].checked===true)
        {
            complete=true;
            break;
        }
    }
    if(sectionsCompleted===8 && complete===false)
    {
        if(qNum<=4)
        {
            highlight(questionBoxes[0]);
        }
        else
        {
            highlight(questionBoxes[qNum-4]);
        }
    }
    else if(complete===false)
    {
        highlight(questionBoxes[qNum-1]);
    }
}

function highlight(questionBox)
{
    if(questionBox.style.backgroundColor !=='red')
        questionBox.style.backgroundColor ='red';
}

function lightsOff(questionBoxes)
{
    for(let i=0; i<questionBoxes.length; i++)
    {
        if(questionBoxes[i].style.backgroundColor==='red')
            questionBoxes[i].style.backgroundColor='transparent';

        if(sectionsCompleted!==8 && sectionsCompleted!==9 && sectionsCompleted!==10)
            if(questionBoxes[i].style.fontWeight==='bold')
                questionBoxes[i].style.fontWeight='normal';
    }
}

function loadSummary()
{
    alert(`Your score is ${totalScore}`);
    comments.push(totalScore);

    localStorage.setItem('Summary', JSON.stringify(comments));
}

function calculateSectionScore(buttons)
{
    let score=0;

    for(let i=0; i<buttons.length; i++)
    {
        if(buttons[i].checked===true)
            score+=Number(buttons[i].value);
    }
    totalScore+=score;
    return score;
}

function displayComment(section,score)
{
    let comment="";
    let commentBox;

    switch (section)
    {
        case 'verification':
            if(score < 10)
                comment = "The face to face training session will be a great opportunity for you to get" +
                          " guidance on progressing the universability of your organisation"
            else if(score > 9 && score < 16)
                comment = "With a little more thought you will see more opportunities for increasing the universability of your services"
            else
                comment = "Well done you are clearly being proactive in considering making your services more universal"
            break;

        case 'valueProp':
            if(score < 12)
                comment = "The face to face training session will be a great opportunity for you to gain some" +
                          " perspective of the benefits of universability to your organisation and its members"
            else if(score > 11 && score < 20)
                comment = "You have some sense of the benefits of a universal organisation"
            else
                comment = "You have a very high level of appreciation of the mutual benefits for all stakeholders in an inclusive organisation"
            break;

        case 'vision':
            if(score < 6)
                comment = "The face to face session has great scope to convince you of the feasibility of" +
                          " promoting inclusion - just keep your mind open to the possibility"
            else
                comment = "You can see an inclusive future for your organisation and its members, the challenge" +
                          " is now to ensure that your decisions and resource allocations make this happen"
            break;

        case 'philosophy':
            if(score < 11)
                comment = "The face to face training session will only be of value to progressing your universability" +
                    " if you are willing to challenge your belief system about access to fitness services being a fundamental "
            else if(score===20)
                comment = "While there is some openness to equity in your organisation the commitment is not yet wholly embraced by all. Belief systems within the organisation may be confused and possibly conflicting." +
                          " It would be desirable to promote dialogue amongst your stakeholders around the topic of inclusion"
            else
                comment = "You have a very high level of appreciation of the mutual benefits for all stakeholders in an inclusive organisation"
            break;

        case 'policy':
            if(score===0)
                comment = "Universability is not something with which you have yet engaged, so the face to face" +
                          " training session will be an opportunity for significant learning in this respect"
            else if(score===10)
                comment = "Your policies are confused and possibly conflicting. Some guidance will be needed to bring greater coherency to your efforts to date"
            else if(score >19 && score <31)
                comment = "Your journey of making organisational policies inclusive has started well and this may be" +
                          " the catalyst for enhanced universability – if you are open to progressive change"
            else
                comment = "Your intentions are very sound in respect of inclusion and you have the potential to be a high achiever in this respect"
            break;

        case 'processes':
            if(score===0)
                comment = "You have great scope for learning during the face to face training session," +
                          " once you have an open mind to the possibilities that an inclusive approach can offer"
            else if(score >0 && score<21)
                comment = "You have made a positive start upon which your organisation can build sound relationships with people with disabilities." +
                          " Unit three will offer you more ideas in respect of forging alliances with people with disabilities"
            else
                comment = "You are already a potential resource for people with disabilities in your community," +
                          " as your networks are an essential element in the UFIT approach"
            break;

        case 'perception':
            if(score===0)
                comment = "Your organisation has yet to learn the power of dialogue as a means of providing" +
                          " desirable fitness services to all members of the community"
            else
                comment = "As a listening organisation you have important information that can guide your journey towards universability." +
                          " Your challenge is to interpret what is being said and to translate it into inclusive actions"
            break;

        case 'programmes':
            if(score===0)
                comment = "You have great scope for learning during the face to face training session," +
                    " once you have an open mind to the possibilities that an inclusive approach can offer"
            else if(score >9 && score<21)
                comment = "You have made a positive start – you can use the questions here to reflect on how you can make more progress in this respect"
            else
                comment = "You have the potential to be a role model of provision in the fitness sector. Programming is the basic unit of service delivery" +
                          " – where this is inclusive, your relevance to the wider community is enhanced"
            break;

        case 'people':
            if(score===0)
                comment = "Universability is not something with which you have yet engaged, so the face to face" +
                    " training session will be an opportunity for significant learning in this respect"
            else if(score===10)
                comment = "Depending on the strength of influence of those with some perspective on inclusion, " +
                          "you may have scope to drive improvements from within. Consider the scope for repositioning" +
                          " those with training and knowledge in the area of inclusion to optimise their influence"
            else if(score >19 && score <31)
                comment = "There is some scope within your organisation to promote universability principles and broaden" +
                          " your organisation’s relevance in the wider community "
            else
                comment = "You have invested in your organisation’s most important asset. Your potential to offer inclusive services is vast. " +
                          "The challenge is to make sure that you optimally" +
                          " deploy this wisdom to make all aspects of your service provision truly inclusive"
            break;

        case 'access':
            if(score===0)
                comment = "The face to face training session will provide you with wonderful ideas for making small" +
                          " (and inexpensive) changes to enhance the universability of the facility."
            else if(score===10)
                comment = "While you have made a start in the direction of universability there is considerable scope for improvements. "
            else if(score >19 && score <31)
                comment = "While some aspects of your facility are accessible there is scope for enhancement. " +
                          "The face to face training session will offer you some suggestions for improvement here."
            else
                comment = "The facility is largely accessible and hence there is significant scope for promoting universability. "
            break;

        case 'promotion':
            if(score===0)
                comment = "The face to face training session will offer you many ideas for inclusivizing your promotion materials"
            else if(score===10)
                comment = "Your organisation has some appreciation of the need for have diversity to be represented in your promotional materials. With a little more" +
                          " thoughtfulness your promotional campaigns will speak louder to a wider audience"
            else
                comment = "You clearly understand the power of imagery and language and your materials may" +
                          " be potential templates for others in the promotion of fitness services"
            break;

        default:
            alert("Error !!!")
    }
    //window.alert("Your score is " + score + " and advice is : " + "\n" + comment);
    comments.push(comment);
    commentBox = document.createElement('p');
    commentBox.style.cssText = 'padding-left: 240px; padding-top: 20px; color: white; font-size: 1vw;'
    commentBox.innerText = `Your score is ${score}. ${comment}`;
    document.getElementById(section).appendChild(commentBox);

}

function disableButtons(buttons)
{
    for(let i=0; i<buttons.length; i++)
    {
        buttons[i].disabled=true;
    }
}

function loadNextPart(index)
{
    document.getElementById(section[index]).style.display='block';
}

function enableElements(buttons,selects)
{
    for(let i=0; i<buttons.length; i++)
    {
        if(buttons[i].disabled===true)
            buttons[i].disabled = false;
    }
    if(selects !==undefined)
    {
        for(let i=0; i<buttons.length; i++)
        {
            if(selects[i].disabled===true)
                selects[i].disabled = false;
        }
    }
}

function disableElements(buttons, selects)
{
    for(let i=0; i<buttons.length; i++)
    {
        if(buttons[i].id ==='q4yes')
            continue;

        if(buttons[i].disabled===false)
        {
            buttons[i].checked=false;
            buttons[i].disabled=true;
        }
    }
    if(selects !== undefined)
    {
        for(let i=0; i<selects.length; i++)
        {
            if(selects[i].disabled === false)
            {
                selects[i].checked=false;
                selects[i].disabled = true;
            }
        }
    }
}

function toggleTypeSelector(select)
{
    if(select.disabled===true)
        select.disabled=false;
    else
        select.disabled=true;
}

let totalScore=0;
let sectionsCompleted=0;
let section=['verification','valueProp','vision','philosophy','policy','processes','perception','programmes','people','access','promotion','processBtn'];
let comments=[];

function allDone(section,questions,buttons,nextButton,questionBoxes)
{
    let answered=0;
    lightsOff(questionBoxes);

    if(section === 'philosophy' && document.getElementById('question4no').checked === true)
    {
        displayComment(section,0);
        disableButtons(buttons);

        document.getElementById('question4no').disabled=true;

        removeNextButton(nextButton);

        sectionsCompleted ++;

        lightsOff(questionBoxes);
        loadNextPart(sectionsCompleted);
    }
    else
    {
        let listBoxes=[];
        let buttonArr = Array.from(buttons);

        if(section==='programmes')
        {
            for(let i=0; i<buttonArr.length; i++)
            {
                if(buttonArr[i].className==='section8select')
                {
                    listBoxes.push(buttonArr[i]);
                    buttonArr.splice(i,1)
                }
            }
        }
        for(let i=0; i<buttonArr.length; i++)
        {
            if(buttonArr[i].checked === true)
                answered++;
        }
        if(answered >= questions)
        {
            let score = Number(calculateSectionScore(buttonArr));
            displayComment(section,score);

            if(listBoxes.length)
            {
                for(let i=0; i<listBoxes.length; i++)
                {
                    buttonArr.push(listBoxes[i]);
                }
            }
            disableButtons(buttonArr);
            removeNextButton(nextButton);

            sectionsCompleted++;

            lightsOff(questionBoxes);
            loadNextPart(sectionsCompleted);
        }
        else
        {
            look_for_Questions(questionBoxes,buttonArr);
            window.alert(`You did not complete section  ${sectionsCompleted +1} ,please answer all questions`)
        }
    }
}


function getLocalStorage() {
    if (localStorage) {
        let localStorageText = JSON.parse(localStorage.getItem('Summary'));
        document.getElementById('one').innerHTML = localStorageText[0];
        document.getElementById('two').innerHTML = localStorageText[1];
        document.getElementById('three').innerHTML = localStorageText[2];
        document.getElementById('four').innerHTML = localStorageText[3];
        document.getElementById('five').innerHTML = localStorageText[4];
        document.getElementById('six').innerHTML = localStorageText[5];
        document.getElementById('seven').innerHTML = localStorageText[6];
        document.getElementById('eight').innerHTML = localStorageText[7];
        document.getElementById('nine').innerHTML = localStorageText[8];
        document.getElementById('ten').innerHTML = localStorageText[9];
        document.getElementById('eleven').innerHTML = localStorageText[10];
        document.getElementById('twelve').innerHTML = localStorageText[11];
        getFinalSummary(localStorageText[11])
    } else {
        alert('no data');
    }
}

function getFinalSummary(score){
   // alert(score); //delete me
    if (score >= 340){
        document.getElementById('twelve').innerHTML =
        'Your organisation is evidently committed to inclusion. Your perspective will be most valuable at the face to face training session' +
            ' as both an advocate and a guide for inclusive fitness service provision. You are highly relevant in your community and hence the organisation' +
            ' is sustainable and will remain so once your current commitment is supported and enhanced over time.';
    }else if (score >= 245 && score <= 339){
        document.getElementById('twelve').innerHTML =
        ' Your organisation is making genuine and meaningful efforts in the direction of universability.' +
            ' However provision is probably patchy and inconsistent, which may cause some confusion among members and potential members.' +
            ' Promotion of inclusive opportunities as an organisational priority has the potential to broaden your relevance to an even greater number of community members.';
    }else if (socre >= 150 && score <=244){
        document.getElementById('twelve').innerHTML =
        'While some work is being done to enhance inclusive provision, there is scope for significant gains in this aspect. Building on what you are doing' +
            ' well and embracing new ideas will see your organisation make the transitions to inclusivity with some ease.' +
            ' The face to face training session will be a unique opportunity to learn from others in your sector.';
    }else{
        document.getElementById('twelve').innerHTML =
        'The face to face training session will be of immense value to your organisation. An exciting challenge awaits as you move towards universability.' +
            ' It will take some time but the secret is to keep doing what you are doing well and gradually add other initiatives to make your services more inclusive.' +
            ' The face to face training session will lead to significant learning for your organisation.';
    }
}


